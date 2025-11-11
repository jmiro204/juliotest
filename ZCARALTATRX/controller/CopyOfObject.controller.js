/*global location*/
sap.ui.define([
	"app/eci/zcaraltatrx2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/eci/zcaraltatrx2/model/formatter",
	"sap/ui/core/util/MockServer",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/BindingMode"
], function(
	BaseController,
	JSONModel,
	History,
	formatter,
	MockServer,
	ODataModel,
	BindingMode
) {
	"use strict";

	return BaseController.extend("app.eci.zcaraltatrx2.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0
				});
				
			

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});
		},

		onBeforeRendering: function() {
			//Sobreescribir función de navegación hacia atrás
			/*	this.getOwnerComponent().getService("ShellUIService").then(function(oShellService) {
					oShellService.setBackNavigation(function() {
						this._onNavBack();
					}.bind(this));
				}.bind(this));*/
			
		},
		_onNavBack: function(oEvent) {
			this.getView().getModel().callFunction("/HeadDiscard", {
				method: "POST",
				urlParameters: {
					Transactions: this.getView().getBindingContext().getProperty().Transactions,
					IsActiveEntity: false
				},
				success: function(data, resp) {
					if (resp.statusCode.startsWith("2")) {
						this.getRouter().navTo("worklist");
					} else {
						sap.m.MessageBox.error("Error borrando el registros de borrador");
					}
				}.bind(this),
				error: function(error) {
					sap.m.MessageBox.error("Error borrando el registros de borrador");
				}.bind(this)
			});

		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId,
				sAction = oEvent.getParameter("arguments").actionC,
				oViewModel = this.getModel("objectView");
			this.getView().unbindElement();
			this.setModel(new JSONModel({}), "modelCreate");
			this._onValidateForm(true, sAction === "C" ? true : false);
			this._bindView("/" + sObjectId);
			/*if (sObjectId === "C") {
				this.getView().getModel().callFunction("/createInstance", {
					method: "POST",
					urlParameters: {
						ResultIsActiveEntity: false,
						Operatorid: ""
					},
					success: function(data, resp) {
						if (resp.statusCode.startsWith("2")) {
							var mBindPath = "/Head(Transactions='" + encodeURIComponent(data.Transactions)  + "',IsActiveEntity=false)";
							this.setModel(new JSONModel(data), "modelCreate");
							this._bindView(mBindPath);
						} else {
							sap.m.MessageBox.error("Error creando el registros de borrador");
							this.getRouter().navTo("worklist");
						}
					}.bind(this),
					error: function(error) {
						sap.m.MessageBox.error("Error creando el registros de borrador");
						this.getRouter().navTo("worklist");
					}.bind(this)
				});
				oViewModel.setProperty("/busy", false);
			}*/
		},
			_bindView: function(sObjectPath) {
			var oViewModel = this.getModel("objectView");
			oViewModel.setProperty("/busy", true);
			this.getView().bindElement({
				aysnc: false,
				path: sObjectPath,
				parameters: {
					expand: "to_Position,to_Positionmp"
				},
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function(oEvent) {}.bind(this),
					dataReceived: function(oEvent) {
						oViewModel.setProperty("/busy", false);
					}.bind(this)
				}
			});
		},
		_onBindingChange: function(oEvent) {
			var oViewModel = this.getModel("objectView"),
				sBindContextView = this.getView().getBindingContext();

			if (!sBindContextView) {
				oViewModel.setProperty("/busy", false);
				sap.m.MessageBox.error("No se ha creado la instancia satisfactoriamente", {
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
					onClose: function(sAction) {
						this.getRouter().navTo("worklist");
					}.bind(this)
				});
			} else {
				var sBindPropertyPosition = sBindContextView.getObject().to_Position,
					sBindPropertyPositionMP = sBindContextView.getObject().to_Positionmp,
					oObjectPosition = [];

				this.getView().byId("LineItemsSmartTable").setEditable(true);
				this.getView().byId("LineItemsSmartTable").setTableBindingPath(this.getView().getBindingContext().getPath() + "/to_Position");
				this.getView().byId("LineItemsSmartTableMP").setEditable(true);
				this.getView().byId("LineItemsSmartTableMP").setTableBindingPath(this.getView().getBindingContext().getPath() + "/to_Positionmp");
				if (sBindPropertyPosition.__list) {
					this.getView().setBusy(true);
					oObjectPosition = this._getObjectPosition(sBindPropertyPosition);
					sBindPropertyPosition = oObjectPosition;
					this.getView().getModel().refresh();
					this.getView().byId("LineItemsSmartTable").rebindTable(true);
				}
				if (sBindPropertyPositionMP.__list) {
					oObjectPosition = this._getObjectPosition(sBindPropertyPositionMP);
					sBindPropertyPositionMP = oObjectPosition;
					this.getView().getModel().refresh();
					this.getView().byId("LineItemsSmartTableMP").rebindTable(true);
				}
				oViewModel.setProperty("/busy", false);
			}
		},
		onChangeValue: function(oEvent) {
			var sModel = this.getModel(),
				sBindContextView = this.getView().getBindingContext(),
				sBindProperty = sBindContextView.getProperty(),
				sBindPath = oEvent.getSource().getBinding("value").getPath(),
				sValue = oEvent.getSource().getValue(),
				sProp = {},
				oInput = oEvent.getSource(),
				oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance();
			if (oEvent.getSource().getValueState() === "None" || sBindProperty[sBindPath] !== sValue) {
				oEvent.getSource().setValueState("None");
				if (sBindPath === "BegintimestampCreate" || sBindPath === "Origbusinessdate" || sBindPath === "Businessdaydate") {
					sValue = oEvent.getSource().getContent().getDateValue();
					sValue = new Date(sValue.getTime() - sValue.getTimezoneOffset() * 180000);
					//sProp[sBindPath] = new Date(sValue.getTime() - sValue.getTimezoneOffset() * 180000);
				} else if (sBindPath === "Zzimptrans") {
					//sProp[sBindPath] = sValue;
					sValue = sValue !== "" ? oFloatFormat.parse(sValue).toString() : "0.00";
				}
				if (sValue !== 'NaN') {
					sProp[sBindPath] = sValue;
					//oInput.setValue(sValue);
					sModel.setProperty(sBindPath, sValue, sBindContextView);
					//this.getView().setBusy(true);
					oInput.setValueState("None");
					sModel.update(sBindContextView.getPath(), sProp, {
						async: false,
						success: function(data, resp) {
							var vCnt = 0,
								vText = "",
								oErrors;
							//this.getView().getModel().refresh(true);
							this.getView().setBusy(false);
							if (resp.headers && resp.headers['sap-message']) {
								oErrors = JSON.parse(resp.headers['sap-message']);
								if (oErrors.message !== "Error forma de pago") {
									vCnt = 1;
									vText = "<p><strong>Errores:</strong></p><ul>";
									vText = vText + "<li>" + oErrors.message + "</li>";
								}
								oErrors.details.forEach(function(detail) {
									if (detail.message !== "Error forma de pago") {
										vText = vCnt === 0 ? "<p><strong>Errores:</strong></p><ul>" : vText;
										vText = vText + "<li>" + detail.message + "</li>";
										vCnt = 1;
									}
								});
								vText = vText !== "" ? vText + "</ul>" : vText;
								if (vText !== "") {
									sap.m.MessageBox.error("", {
										title: "Errores",
										id: "messageBoxId2",
										details: vText,
										contentWidth: "40em"
									});
								}
							}
						}.bind(this),
						error: function(resp) {
							this.getView().setBusy(false);
						}.bind(this)
					});
				} else {
					oInput.setValueState("Error");
				}
			}
		},
		onChangeValuePosition: function(oEvent) {
			var sModel = this.getModel(),
				sInput = oEvent.getParameter("changeEvent") ? oEvent.getParameter("changeEvent").getSource() : oEvent.getSource(),
				sBindContextView = sInput.getBindingContext(),
				sBindPath = sInput.getBinding("value").getPath(),
				sValue = oEvent.getParameter("changeEvent") ? oEvent.getParameter("changeEvent").getParameter("value") : oEvent.getParameter(
					"value"),
				sProp = {},
				oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance();
			if (sInput.getValueState() === "None" || sBindPath === "Retailquantity" || sBindPath === "Salesamount" || sBindPath ===
				"Tenderamount" || sBindPath === "Zzlvimpneto" || sBindPath === "Zzlvimpneto") {
				if (sBindPath === "Retailquantity" || sBindPath === "Salesamount" || sBindPath === "Zzlvimpneto" || sBindPath === "Zzlvimpbruto" ||
					sBindPath ===
					"Tenderamount") {
					sValue = sValue !== "" ? oFloatFormat.parse(sValue).toString() : "0.00";
				}
				if (sValue !== 'NaN') {
					sInput.setValueState("None");
					sModel.setProperty(sBindPath, sValue, sBindContextView);
					sProp[sBindPath] = sValue;
					//this.getView().setBusy(true);
					sModel.update(sBindContextView.getPath(), sProp, {
						async: false,
						success: function(data, resp) {
							var vCnt = 0,
								vText = "",
								oErrors;
							if (sBindPath === "Salesamount" || sBindPath === "Medpgsubtip") {
								////this._setValueZZImpTran();
								//this._bindView(this.getView().getBindingContext().getPath());
								////this.getView().setBusy(false);
								this.getView().getModel().refresh(true);
							}
							this.getView().setBusy(false);
							if (resp.headers && resp.headers['sap-message']) {
								oErrors = JSON.parse(resp.headers['sap-message']);
								if (oErrors.message !== "Error forma de pago") {
									vCnt = 1;
									vText = "<p><strong>Errores:</strong></p><ul>";
									vText = vText + "<li>" + oErrors.message + "</li>";
								}
								oErrors.details.forEach(function(detail) {
									if (detail.message !== "Error forma de pago") {
										vText = vCnt === 0 ? "<p><strong>Errores:</strong></p><ul>" : vText;
										vText = vText + "<li>" + detail.message + "</li>";
										vCnt = 1;
									}
								});
								vText = vText !== "" ? vText + "</ul>" : vText;
								if (vText !== "") {
									sap.m.MessageBox.error("", {
										title: "Errores",
										id: "messageBoxId2",
										details: vText,
										contentWidth: "40em"
									});
								}
							}
						}.bind(this),
						error: function(resp) {
							this.getView().setBusy(false);
						}.bind(this)
					});
				} else {
					sInput.setValueState("Error");
				}

			}
		},
		_setValueZZImpTran: function(oEvent) {
			var sModel = this.getModel(),
				sBindViewContext = this.getView().getBindingContext(),
				sPathPositionBindView = sBindViewContext.getPath() + "/to_Position",
				sContextsPosition = sModel.getContext(sPathPositionBindView).getObject(),
				lv_total = 0,
				sProp = {};
			sContextsPosition.forEach(function(item) {
				var oProperty = sModel.getObject("/" + item);
				lv_total = lv_total + parseFloat(oProperty.Salesamount);
			});
			lv_total = lv_total.toString();
			sProp["Zzimptrans"] = lv_total.padStart(10, '0');
			sModel.setProperty("Zzimptrans", lv_total, sBindViewContext.getPath());
			sModel.update(sBindViewContext.getPath(), sProp, {
				success: function(data, resp) {}.bind(this),
				error: function(resp) {}.bind(this)
			});

		},
		onSaveTransaction: function(oEvent) {
			var oModel = this.getModel(),
				sBindViewContext = this.getView().getBindingContext(),
				sProperty = sBindViewContext.getProperty();
			if (!this._onValidateForm(false)) {
				this.getView().setBusy(true);
				oModel.callFunction("/HeadPrepare", {
					method: "POST",
					urlParameters: {
						Transactions: sProperty.Transactions,
						IsActiveEntity: false
					},
					success: function(data, resp) {
						var vCnt = 0,
							vText = "",
							oErrors;
						if (resp.headers && resp.headers['sap-message']) {
							oErrors = JSON.parse(resp.headers['sap-message']);
							if (oErrors.message !== "Error forma de pago") {
								vCnt = 1;
								vText = "<p><strong>Errores:</strong></p><ul>";
								vText = vText + "<li>" + oErrors.message + "</li>";
							}
							oErrors.details.forEach(function(detail) {
								if (detail.message !== "Error forma de pago") {
									vText = vCnt === 0 ? "<p><strong>Errores:</strong></p><ul>" : vText;
									vText = vText + "<li>" + detail.message + "</li>";
									vCnt = 1;
								}
							});
							vText = vText !== "" ? vText + "</ul>" : vText;
							if (vText !== "") {
								sap.m.MessageBox.error("", {
									title: "Errores",
									id: "messageBoxId2",
									details: vText,
									contentWidth: "40em"
								});
							}

							/*	if (oErrors.message !== "Error forma de pago") {
									vCnt = vCnt + 1;
									vText = vText + "<p><strong>Errores:</strong></p>" + "<ul>";
									vText = vText + "<li>" + oErrors.message + "</li>";
									oErrors.details.forEach(function(det) {
										if (det.message !== "Error forma de pago") {
											vCnt = vCnt + 1;
											vText = vText + "<li>" + det.message + "</li>";
										}

									});
									vText = vText + "</ul>";
									sap.m.MessageBox.error("", {
										title: "Errores",
										id: "messageBoxId2",
										details: vText,
										contentWidth: "40em"
									});
								}*/

						}
						this.getView().setBusy(false);
						if (vText === "") {
							this._onHeadActiveTrx(oModel, sProperty);
						}
						/*if (resp.statusCode.startsWith("2")) {
							//sap.m.MessageBox.error("Se ha grabando la transacción satisfactoriamente");
							//this.getRouter().navTo("worklist");
							this._onHeadActiveTrx(oModel, sProperty);
						} else {
							sap.m.MessageBox.error("Error grabando la transacción");
							this.getView().setBusy(false);
						}*/

					}.bind(this),
					error: function(error) {
						this.getView().setBusy(false);
						sap.m.MessageBox.error("Error grabando la transacción");
					}.bind(this)
				});
			}

		},
		_onHeadActiveTrx: function(pModel, pProperty) {
			this.getView().setBusy(true);
			pModel.callFunction("/HeadActivate", {
				method: "POST",
				urlParameters: {
					Transactions: pProperty.Transactions,
					IsActiveEntity: false
				},
				success: function(data, resp) {
					if (resp.statusCode.startsWith("2")) {
						//sap.m.MessageBox.success("Se ha grabando la transacción satisfactoriamente");
						this.getRouter().navTo("worklist");
					} else {
						sap.m.MessageBox.error("Error grabando la transacción");
					}
					this.getView().setBusy(false);
				}.bind(this),
				error: function(error) {
					this.getView().setBusy(false);
					sap.m.MessageBox.error("Error grabando la transacción");
				}.bind(this)
			});
		},
		_onValidateForm: function(pClearState, pClearValue) {
			var oControlFieldAll = this.getView().getControlsByFieldGroupId("fgDG"),
				oControlTabledAll = this.getView().getControlsByFieldGroupId("fgDGT"),
				sError = false,
				sValue = "",
				sRequired = false,
				sValueState = "";

			oControlFieldAll.forEach(function(item) {
				if (item.getMetadata()._sClassName === "sap.ui.comp.smartfield.SmartField") {
					sValue = item.getValue() !== "" ? item.getValue() : null;
					sRequired = item.getMandatory();
					if (sRequired && !sValue && !pClearState) {
						item.setValueState("Error");
						sError = true;
					} else if (pClearState) {
						if (pClearValue) {
							item.setValue();
						}
						item.setValueState("None");
					} else {
						item.setValueState("None");
					}
				}
			});
			oControlTabledAll.forEach(function(item) {
				if (item.getMetadata()._sClassName === "sap.ui.comp.smartfield.SmartField") {
					sValue = item.getValue() !== "" ? item.getValue() : null;
					sRequired = item.getMandatory();
					sValueState = item.getValueState();
					if (sRequired && sValue && sValue !== "" && sValueState !== "None" && !pClearState) {
						sError = true;
					} else if (sRequired && !sValue && sValue === "" && !pClearState) {
						item.setValueState("Error");
						sError = true;
					} else if (pClearState) {
						if (pClearValue) {
							item.setValue();
						}
						item.setValueState("None");
					} else {
						item.setValueState("None");
					}
				}
			});

			return sError;
		},
		onCancelTransaction: function(oEvent) {
			this._onNavBack(oEvent);
		},
	
		_getObjectPosition: function(sBindPropertyPosition, sBindPropertyPositionMP) {
			var oModel = this.getModel(),
				oObjectPosition = [];
			if (sBindPropertyPosition && sBindPropertyPosition.__list) {
				sBindPropertyPosition.__list.forEach(function(item) {
					oObjectPosition.push(oModel.getObject("/" + item));
				}.bind(this));
				oObjectPosition = oObjectPosition;
			}
			if (sBindPropertyPositionMP && sBindPropertyPositionMP.__list) {
				sBindPropertyPositionMP.__list.forEach(function(item) {
					oObjectPosition.push(oModel.getObject("/" + item));
				}.bind(this));
				oObjectPosition = oObjectPosition;
			}
			return oObjectPosition;
		},
		_onAddPosition: function(oEvent) {
			var sModel = this.getModel(),
				sBindContextView = this.getView().getBindingContext()
				//sObjectPos = Object.assign({}, this._returnObjectPosition())
			;
			//delete sObjectPos.Businessdaydate;
			//this.getView().setBusy(true);
			sModel.create(sBindContextView.getPath() + "/to_Position", {}, {
				aysnc: false,
				success: function(oEvent) {
					//this.getView().byId("LineItemsSmartTable").rebindTable(true);
					//this.getView().getModel().refresh(true);
					this.getView().setBusy(false);
				}.bind(this),
				error: function(oEvent) {
					this.getView().setBusy(false);
				}.bind(this)
			});
		},
		_onRemovePosition: function(oEvent) {
			var sTable = this.byId("LineItemsSmartTable").getTable(),
				sContext = sTable.getSelectedContexts(),
				sPath = sContext.length > 0 ? sContext[0].getPath() : "",
				sModel = this.getModel();
			if (sPath !== "") {
				//this.getView().setBusy(true);
				sModel.remove(sPath, {
					aysnc: false,
					success: function(data, resp) {
						//this.getView().byId("LineItemsSmartTable").rebindTable(true);
						//this.getView().getModel().refresh(true);
						this.getView().setBusy(false);
					}.bind(this),
					error: function(resp) {
						this.getView().setBusy(false);
					}.bind(this)
				});
			}
		},
		_onAddPositionMP: function(oEvent) {
			var sModel = this.getModel(),
				sBindContextView = this.getView().getBindingContext()
				//sObjectPos = Object.assign({}, this._returnObjectPosition())
			;
			//delete sObjectPos.Businessdaydate;
			//this.getView().setBusy(true);
			sModel.create(sBindContextView.getPath() + "/to_Positionmp", {}, {
				aysnc: false,
				success: function(oEvent) {
					//this.getView().byId("LineItemsSmartTableMP").rebindTable(true);
					//this.getView().getModel().refresh(true);
					this.getView().setBusy(false);
				}.bind(this),
				error: function(oEvent) {
					this.getView().setBusy(false);
				}.bind(this)
			});
		},
		_onRemovePositionMP: function(oEvent) {
			var sTable = this.byId("LineItemsSmartTableMP").getTable(),
				sContext = sTable.getSelectedContexts(),
				sPath = sContext.length > 0 ? sContext[0].getPath() : "",
				sModel = this.getModel();
			if (sPath !== "") {
				//this.getView().setBusy(true);
				sModel.remove(sPath, {
					aysnc: false,
					success: function(data, resp) {
						//this.getView().byId("LineItemsSmartTableMP").rebindTable(true);
						//this.getView().getModel().refresh(true);
						this.getView().setBusy(false);
					}.bind(this),
					error: function(resp) {
						this.getView().setBusy(false);
					}.bind(this)
				});
			}
		},

		onBeforeRebindTablePos: function(oEvent) {
			var oBindingParams = oEvent.getParameter("bindingParams");
			this.getView().setBusy(true);
			oBindingParams.events = {
				"dataReceived": function(oEvent) {
					this.getView().setBusy(false);
				}.bind(this)

			};
		}

	});

});