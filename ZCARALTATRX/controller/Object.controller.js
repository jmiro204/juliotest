/*global location*/
sap.ui.define([
	"app/eci/zcaraltatrx2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/eci/zcaraltatrx2/model/formatter",
	"sap/ui/core/util/MockServer",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/BindingMode",
	'sap/m/SearchField',
	'sap/ui/model/type/String',
	'sap/ui/table/Column',
	'sap/ui/model/Sorter'
], function(
	BaseController,
	JSONModel,
	History,
	formatter,
	MockServer,
	ODataModel,
	BindingMode,
	SearchField,
	TypeString,
	UIColumn,
	Sorter
) {
	"use strict";

	return BaseController.extend("app.eci.zcaraltatrx2.controller.Object", {

		formatter: formatter,
		gOpenMessage: true,

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
					delay: 0,
					displayDate: false,
					disabled: [],
					ZzimptransOrg: "0.00",
					minDate: new Date()
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
		onAfterRendering: function(oEvent) {
			var oModel = this.getView().getModel();
			if (!sap.ui.getCore().getModel("FormpagCard")) {
				this.getView().setBusy(true);
				oModel.read("/FormpagCard", {
					success: function(data, resp) {
						sap.ui.getCore().setModel(new JSONModel(data.results), "FormpagCard");
						this.getView().setBusy(false);
					}.bind(this),
					error: function(error) {

					}.bind(this)
				});
			}
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
			var oHistory = History.getInstance(),
				sPrev = oHistory.getPreviousHash();
			if (sPrev !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("worklist");
			}
			/*this.getView().getModel().callFunction("/HeadDiscard", {
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
			});*/

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
			oViewModel.setProperty("/Zzformpag", "");
			oViewModel.setProperty("/ZzformpagText", "");
			//Modelo local view
			this.setModel(new JSONModel({
				//"Zzimptrans": "1245.456",
				"Transtypecode": "0101",
				"Businessdaydate": new Date(),
				"Simulate": "",
				"Zzimptranscalc": "0.00",
				"Actualizarht": true,
				"to_Position": [],
				"to_Positionmp": []
			}), "modelCreate");
			this.getView().setBusy(true);
			this.getView().getModel().setSizeLimit(9999);
			this.getView().getModel().refresh();
			this._onValidateForm(true, sAction === "C" ? true : false);
			this.getModel().read("/Mandatory", {
				success: function(data) {
					this.setModel(new JSONModel(data.results), "modelField");
					this.getView().setBusy(false);
					this.setMandatoryFieldFromTypeCode("0101");
					this.getView().byId("Businessdaydate-icon").setVisible(false);
				}.bind(this)
			});
			//this._bindView("/" + sObjectId);
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
			this.getView().getModel().setSizeLimit(9999);
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
		onSelectBajaEst: function(oEvent) {
			var oViewModel = this.getModel("objectView"),
				oViewCreate = this.getModel("modelCreate"),
				vSelected = oEvent.getSource().getSelected(),
				vPath = oEvent.getSource().getBinding("selected").getPath()

			;
			if (vSelected && vPath.includes("BajaEst")) {
				oViewCreate.setProperty("/Actualizarht", !vSelected);
				oViewCreate.setProperty("/BajaEst", vSelected);
			} else if (vSelected && vPath.includes("Actualizarht")) {
				oViewCreate.setProperty("/Actualizarht", vSelected);
				oViewCreate.setProperty("/BajaEst", !vSelected);
			}
			oViewCreate.refresh(true);
		},

		onChangeValue: function(oEvent) {
			var sModel = this.getModel("modelCreate"),
				sBindPath = oEvent.getSource().getBinding("value") ? oEvent.getSource().getBinding("value").getPath() : oEvent.getSource().getBinding(
					"selectedKey").getPath(),
				sBindDescPath = oEvent.getSource().getBinding("description") ? oEvent.getSource().getBinding("description").getPath() : "",
				sValue = oEvent.getSource().getBinding("value") ? oEvent.getSource().getProperty("value") : oEvent.getParameter("selectedItem").getKey(),
				sValue2 = "",
				oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(),
				oModelView = this.getView().getModel("objectView"),
				oViewData = oModelView.getData(),
				oDateDiabled = oViewData.disabled,
				oCurrentDate = oViewData.minDate ? oViewData.minDate : new Date(),
				sFindDate;
			if (sBindPath === "/BegintimestampCreate" || sBindPath === "/Origbusinessdate" || sBindPath === "/Businessdaydate") {
				sValue = oEvent.getSource().getDateValue();
				sValue = sValue;
				if (sValue && sBindPath === "/Businessdaydate") {
					sFindDate = oDateDiabled.find(
						(d) => new Date(Date.UTC(sValue.getFullYear(), sValue.getMonth(), sValue.getDate())).toString() ===
						new Date(Date.UTC(d.FperiodoClose.getFullYear(), d.FperiodoClose.getMonth(), d.FperiodoClose.getDate())).toString()
					);
				}

				if (
					sValue && sFindDate && sBindPath === "/Businessdaydate"
				) {
					oEvent.getSource().setDateValue();
					oEvent.getSource().setValueState("Error");
					oEvent.getSource().setValueStateText("Error - Fecha periodo cerrada");
				} else if (!sValue) {
					oEvent.getSource().setDateValue();
					oEvent.getSource().setValueState("Error");
					oEvent.getSource().setValueStateText("Error formato de fecha, formato permitido: DD-MM-YYYY");
				} else {
					oEvent.getSource().setValueState("None");
					oEvent.getSource().setValueStateText();
				}
			} else if (sBindPath === "/Zzimptrans") {
				/*var oFormatOptions = oEvent.getSource().getBinding("value").getType().oOutputFormat.oFormatOptions;
				sValue2 = sValue;
				sValue = oFloatFormat.parse(sValue).toString();*/
				//sValue = sValue !== "" ? oFloatFormat.parse(sValue).toString() : "0.00";
				sValue =
					(sModel.getProperty("/Transtypecode") === '0102' || sModel.getProperty("/Transtypecode") === '0104') && !sValue.includes("-") ?
					"-" + sValue :
					(sModel.getProperty("/Transtypecode") === '0102' || sModel.getProperty("/Transtypecode") === '0104') && sValue.includes("-") ?
					sValue :
					sValue.includes("-") ? sValue.replaceAll("-", "") : sValue;
				sValue = sValue === "-" ? "" : sValue;
				var oFormatOptions = oEvent.getSource().getBinding("value").getType().oOutputFormat.oFormatOptions;
				if (sValue !== "") {
					sValue2 = oFloatFormat.parse(sValue.toString()).toString();
				}

			}
			if (((sBindPath === "/Zzimptrans" && !isNaN(sValue2)) || (sBindPath === "/Zzimptrans" && sValue === "")) || sBindPath !==
				"/Zzimptrans" && !sBindPath === "/Retailstoreid") {
				if (sBindPath === "/Zzimptrans") {
					sModel.setProperty(sBindPath,
						sValue2);
				} else {
					sModel.setProperty(sBindPath, sValue);
				}
				oEvent.getSource().setValue(sValue.toString());
				oEvent.getSource().setValueState("None");
			} else if (sBindPath === "/Retailstoreid" || sBindPath === "/Origstoreid") {
				this._setValueSuggestion(oEvent, sBindPath, sBindDescPath);
			} else if (!sBindPath === "/Transtypecode") {
				sModel.setProperty(sBindPath, "");
				oEvent.getSource().setValueState("Error");
				oEvent.getSource().setValueStateText("Error valor: " + sValue);
			} else if (sBindPath !== "/Businessdaydate" && sBindPath !== "/BegintimestampCreate" && sBindPath !== "/Origbusinessdate") {
				oEvent.getSource().setValueState("None");
				oEvent.getSource().setValueStateText();
			}
			if (sBindPath === "/Transtypecode") {
				this.getView().byId("objectStatError").setVisible(false);
				//sModel.setProperty(sBindPath, sValue);
				this.setMandatoryFieldFromTypeCode(sValue);
				//this._onValidateForm(true, true);
				this.setSignAmountTransation();
			}
			if (sBindPath === "/Retailstoreid") {
				this._getUltFechaPeriodCerrada(sValue);
				this.getView().byId("Businessdaydate-icon").setVisible(false);
			}
			this._setImporteOriginal(oEvent.getSource());
			setTimeout(function() {
				sModel.refresh(true);
				this.getView().byId("Businessdaydate-icon").setVisible(false);
			}.bind(this), 100);

		},
		_setImporteOriginal: function(oObject) {
			var oInput = oObject,
				oContext = oInput.getBindingContext(),
				oBindValue = oInput.getBinding("value"),
				oModel = this.getView().getModel("Consulta"),
				oModelCreate = this.getView().getModel("modelCreate"),
				oCreateData = oModelCreate.getData(),
				oViewModel = this.getModel("objectView"),
				oViewData = oViewModel.getData(),
				vPath = oBindValue ? oBindValue.getPath() : "",
				vPath = vPath.includes("/") ? vPath.slice(1) : vPath,
				vStoreid, bBusiness, vTpv, vTrx, vImptrans, oFilters;
			if (vPath.includes("Origbusinessdate") || vPath.includes("Origstoreid") || vPath.includes("Origwrkstid") || vPath.includes(
					"Origtransnumber") || vPath.includes("Zzimptrans")) {
				vStoreid = oModelCreate.getProperty("/Origstoreid") ? parseInt(oModelCreate.getProperty("/Origstoreid")).toString() : null;
				bBusiness = oModelCreate.getProperty("/Origbusinessdate") ? this._convertDateUtc(oModelCreate.getProperty("/Origbusinessdate")) :
					null;
				vTpv = oModelCreate.getProperty("/Origwrkstid") ? parseInt(oModelCreate.getProperty("/Origwrkstid")).toString() : null;
				vTrx = oModelCreate.getProperty("/Origtransnumber") ? parseInt(oModelCreate.getProperty("/Origtransnumber")).toString() : null;
				vImptrans = oModelCreate.getProperty("/Zzimptrans") ? oModelCreate.getProperty("/Zzimptrans") : null;
				oFilters = [
						new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, vStoreid),
						/*	new sap.ui.model.Filter("Auditbusinessdaydate", sap.ui.model.FilterOperator.EQ, bBusiness),*/
						new sap.ui.model.Filter("beginFecha", sap.ui.model.FilterOperator.EQ, bBusiness),
						new sap.ui.model.Filter("Workstationid", sap.ui.model.FilterOperator.EQ, vTpv),
						new sap.ui.model.Filter("Transnumber", sap.ui.model.FilterOperator.EQ, vTrx),
						new sap.ui.model.Filter("Transtypecode", sap.ui.model.FilterOperator.EQ, oModelCreate.getProperty("/Transtypecode").includes(
							'102') ? "101" : "111")
					]
					/*if (Math.abs(parseFloat(vImptrans)) > 0) {
						oFilters.push(new sap.ui.model.Filter("Zzimptrans", sap.ui.model.FilterOperator.EQ, vImptrans.replaceAll('-', '')))
					}*/
				var oFechaActual = this._convertDateUtc(new Date()),
					oFechaTrx = bBusiness,
					diff = bBusiness ? oFechaActual - bBusiness : null,
					vDif = bBusiness ? diff / (1000 * 60 * 60 * 24) : null;
				if (vStoreid && bBusiness && vTpv && vTrx) {
					this.getView().setBusy(true);
					oModel.read("/Head", {
						filters: oFilters,
						urlParameters: {
							"$expand": "to_Position" //,to_PositionMp,to_Typecode,to_PositionRepVale"
						},
						success: function(data) {
							var oPosition = [];
							if (data.results.length > 0) {
								oViewModel.setProperty("/ZzimptransOrg", data.results[0].Zzimptotal);
								oModelCreate.setProperty("/SenDescuento", data.results[0].SenDescuentoV);
								oModelCreate.setProperty("/FechaCompromiso", data.results[0].FechaCompromisoV);
								oModelCreate.setProperty("/FormaretirMerc", data.results[0].FormaretirMercV);
								oViewModel.setProperty("/Zzformpag", data.results[0].Zzformpagv);
								oViewModel.setProperty("/ZzformpagText", data.results[0].zzFormpagvtext);
								//this.getView().byId("Zzformpag").setText(data.results[0].zzFormpagvtext + " (" + data.results[0].Zzformpagv + ")");
								this.getView().byId("Origbusinessdate").setValueState("None");
								this.getView().byId("Origstoreid").setValueState("None");
								this.getView().byId("Origwrkstid").setValueState("None");
								this.getView().byId("Origtransnumber").setValueState("None");
								this.getView().byId("objectStatError").setVisible(false);
								if (data.results[0].to_Position && data.results[0].to_Position.results) {
									data.results[0].to_Position.results.forEach(function(item) {
										delete item.to_Header;
										oPosition.push({
											Retailnumber: item.Retailnumber,
											RetailnumberView: item.Retailnumber,
											Zzcoddpto: item.Zzcoddpto,
											Zzarthost: item.Zzarthost,
											Zztalla: item.Zztalla,
											Retailquantity: item.Retailquantity,
											Zzecunimed: item.Zzecunimed,
											Salesamount: item.Salesamount,
											Zzlvimpneto: item.Zzlvimpneto,
											Zzlvimpbruto: item.Zzlvimpbruto,
											ZzCalifArtic: item.ZzCalifArtic,
											Zzcampoc: item.Zzcampoc === "" ? '0' : item.Zzcampoc
										})
									}.bind(this));
									oModelCreate.setProperty("/to_Position", oPosition)
								}
							} else {
								/*sap.m.MessageBox.error(this.getResourceBundle().getText("errorOrgNoExist"));*/
								this.getView().byId("objectStatError").setVisible(vDif >= 790 ? false : true );
								oViewModel.setProperty("/ZzimptransOrg", "0.00");
								oViewModel.setProperty("/Zzformpag", "");
								oViewModel.setProperty("/ZzformpagText", "");
								delete oCreateData.SenDescuento;
								delete oCreateData.FechaCompromiso;
								delete oCreateData.FormaretirMerc;
								this.getView().byId("Origbusinessdate").setValueState( vDif >= 790 ? "None" : "Error");
								this.getView().byId("Origstoreid").setValueState( vDif >= 790 ? "None" : "Error");
								this.getView().byId("Origwrkstid").setValueState( vDif >= 790 ? "None" : "Error");
								this.getView().byId("Origtransnumber").setValueState( vDif >= 790 ? "None" : "Error");
								this.getView().byId("Zzformpag").setText("");
								oModelCreate.setProperty("/to_Position", [])
							}
							oViewModel.refresh(true);
							oModelCreate.refresh(true);
							this.getView().setBusy(false);
						}.bind(this)
					})
				} else {
					oViewModel.setProperty("/ZzimptransOrg", "0.00")
				}
			}

		},
		_getUltFechaPeriodCerrada: function(oStore) {
			var oModel = this.getView().getModel(),
				oModelView = this.getView().getModel("objectView");
			this.getView().setBusy(true);
			if (!this._oValueHelpCaledar) {
				this._oValueHelpCaledar = sap.ui.core.Fragment.load({
					name: "app.eci.zcaraltatrx2.view.fragments.Calendar",
					controller: this
				});
			}
			oModel.read("/CloseDateStore", {
				filters: [new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, oStore)],
				soert: [new Sorter("FperiodoClose", false)],
				success: function(data) {
					this.getView().setBusy(false);
					if (data.results.length > 0) {
						var vDate = data.results[0].FperiodoClose;
						oModelView.setProperty("/minDate", vDate);
						oModelView.setProperty("/disabled", data.results);
						oModelView.refresh(true);
					} else {
						oModelView.setProperty("/minDate", null);
						oModelView.setProperty("/disabled", []);
					}

				}.bind(this)
			})
		},
		onCalendarOpen: function(oEvent) {
			var oButton = oEvent.getSource(),
				oView = this.getView(),
				oModel = this.getView().getModel("objectView");
			if (this._oValueHelpCaledar) {
				this._oValueHelpCaledar.then(function(oDialog) {
					this._oValueHelpCaledarDialog = oDialog;
					this._oValueHelpCaledarDialog.setModel(oModel);
					this._oValueHelpCaledarDialog.openBy(oButton);
				}.bind(this));
			}
		},
		onHandleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.getSource(),
				oSelDate = oCalendar.getSelectedDates(),
				oModel = this.getModel("modelCreate"),
				oDate;
			if (oSelDate.length > 0) {
				oDate = oSelDate[0].getStartDate();
				oModel.setProperty("/Businessdaydate", oDate);
			}
			oModel.refresh(true);
			this._oValueHelpCaledarDialog.close();
			this.getView().byId("Businessdaydate").setBusy(true);
			this.getView().byId("Businessdaydate").setValueState("None");
			setTimeout(function() {
				this.getView().byId("Businessdaydate-icon").setVisible(false);
				this.getView().byId("Businessdaydate").setBusy(false);
			}.bind(this), 100)
		},
		_getUltFechaPeriodCerrada_old: function(oStore) {
			var oModel = this.getView().getModel(),
				oModelView = this.getView().getModel("objectView");
			this.getView().setBusy(true);
			oModel.read("/StorePeriod", {
				filters: [new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, oStore)],
				success: function(data) {
					if (data.results.length > 0) {
						var vDate = data.results[0].FperiodoOpen;
						oModelView.setProperty("/minDate", vDate);
						oModelView.refresh(true);
					}
					this.getView().setBusy(false);
				}.bind(this)
			})
		},
		setSignAmountTransation: function() {
			var sModel = this.getModel("modelCreate"),
				sTipeCode = sModel.getProperty("/Transtypecode"),
				oModelData = sModel.getData(),
				positions = oModelData.to_Position,
				positionsMp = oModelData.to_Positionmp;
			//Cabecera
			oModelData.Zzimptrans = sTipeCode === "0102" || sTipeCode === "0104" ? (-Math.abs(oModelData.Zzimptrans)).toString() : (Math.abs(
				oModelData.Zzimptrans)).toString();
			//Medios de pago
			positionsMp.forEach(function(mp) {
				mp.Tenderamount = sTipeCode === "0102" || sTipeCode === "0104" ? (-Math.abs(mp.Tenderamount)).toString() : (Math.abs(mp.Tenderamount))
					.toString();
			});
			//Linea de venta
			positions.forEach(function(pos) {
				pos.Salesamount = (Math.abs(pos.Salesamount)).toString();
				pos.Retailquantity = sTipeCode === "0102" ? (-Math.abs(pos.Retailquantity)).toString() : (Math.abs(pos.Retailquantity))
					.toString();
				pos.Zzlvimpneto = (Math.abs(pos.Zzlvimpneto)).toString();
				pos.Zzlvimpbruto = sTipeCode === "0102" ? (-Math.abs(pos.Zzlvimpbruto)).toString() : (Math.abs(pos.Zzlvimpbruto))
					.toString();
			});

			sModel.setData(oModelData);
			sModel.refresh(true);

		},
		_setValueSuggestion: function(oEvent, oBindPath, oBindPathDesc) {
			var oInput = oEvent.getSource(),
				sModel = this.getModel("modelCreate"),
				oModelView = this.getModel("objectView"),
				oViewData = oModelView.getData(),
				sValue = oInput.getValue(),
				vSelectedKey, oObjectItem, oObject, vPath, vPath2;
			if (oInput.getSelectedItem() || sValue === "" || oInput.getSuggestionItemByKey(oInput.getValue())) {

				let sKey =
					oInput.getSelectedKey() !== "" ? oInput.getSuggestionItemByKey(oInput.getSelectedKey()).getKey() :
					oInput.getValue() !== "" ? oInput.getSuggestionItemByKey(oInput.getValue()).getKey() : "",
					sText =
					oInput.getSelectedKey() !== "" ? oInput.getSuggestionItemByKey(oInput.getSelectedKey()).getText() :
					oInput.getValue() !== "" ? oInput.getSuggestionItemByKey(oInput.getValue()).getText() : "";

				vSelectedKey = sValue !== "" ? sKey : "";
				oObjectItem = sValue !== "" ? oInput.getSuggestionItemByKey(sKey) : "";
				oObject = sValue !== "" ? oObjectItem.getBindingContext().getObject() : "";
				vPath = oInput.getBindingContext("modelCreate") ? oInput.getBindingContext("modelCreate").getPath() : "";
				oInput.setValueState("None");
				oInput.setValueStateText("");
				vPath2 = vPath !== "" ? vPath.concat("/").concat(oBindPath) : oBindPath;
				sModel.setProperty(vPath2,
					sValue !== "" && oBindPath.includes("Zzecunimed") ? oObject.UnitOfMeasure :
					sValue !== "" && oBindPath.includes("Medpgsubtip") ? oObject.Mediopago :
					sValue !== "" && oBindPath.includes("Retailstoreid") ? oObject.Retailstoreid :
					sValue !== "" && oBindPath.includes("Origstoreid") ? oObject.Retailstoreid : ""
				);
				if (oBindPathDesc && oBindPathDesc !== "") {
					vPath2 = vPath !== "" ? vPath.concat("/").concat(oBindPathDesc) : oBindPathDesc;
					sModel.setProperty(vPath2,
						sValue !== "" && oBindPath.includes("Zzecunimed") ? oObject.UnitOfMeasure_Text :
						sValue !== "" && oBindPath.includes("Medpgsubtip") ? oObject.Mediopagotext :
						sValue !== "" && oBindPath.includes("Retailstoreid") ? oObject.RetailstoreidText : ""

					);
				} else if (oBindPath.includes("Origstoreid")) {
					oInput.setDescription(oObject.RetailstoreidText);
				}
				if (oBindPath.includes("Medpgsubtip")) {
					this._getDeterminationFormPag();
					sModel.setProperty(vPath + "/ZzcodepagoNeg", sValue !== "" ? oObject.Mediopago : "");
					sModel.setProperty(vPath + "/ZzcodpagoDesg", sValue !== "" ? oObject.Desgloce : "");
					sModel.setProperty(vPath + "/Medpgsubtip", sValue !== "" ? oObject.Mediopagosub : "");
					sModel.setProperty(vPath + "/Tipomedpago", sValue !== "" ? oObject.Mediopagosub.substring(0, 3) : "");
					sModel.setProperty(vPath + "/Subtipo", sValue !== "" ? oObject.Mediopagosub.substring(4, 7) : "");
					this._StatusFieldTarjet(oObject, oEvent.getSource())
				} else if (oBindPath.includes("Retailstoreid")) {
					this._getUltFechaPeriodCerrada(sKey);
					oViewData.displayDate = true;
				}
				oEvent.getSource().setValueState("None");
				oEvent.getSource().setValueStateText();
				sModel.refresh(true);
			} else if (sValue !== "") {
				oInput.setValueState("Error");
				oInput.setValueStateText("Indicar valor correcto - Error ");
				if (oBindPath.includes("Retailstoreid")) {
					oViewData.displayDate = false;
				}

			}
			oModelView.refresh(true);

		},
		_StatusFieldTarjet: function(oObjectMedpago, oInputMedPago) {
			var oContext = oInputMedPago.getBindingContext("modelCreate"),
				oCells = oInputMedPago.getParent().getCells(),
				oBindValue,
				oProperty;
			oCells.forEach(function(cell) {
				oBindValue = cell.getBinding("value");
				oProperty = oBindValue ? oBindValue.getPath() : "";
				if (oProperty === "Cardnumber" && oObjectMedpago.Istajeta !== "" && oObjectMedpago.Mediopagosub !== "15400007") {
					cell.setRequired(oObjectMedpago.Istajeta === "B" ? true : false);
					cell.setEnabled(true);
				} else if (oProperty === "Cardnumber") {
					cell.setRequired(false);
					cell.setEnabled(false);
				}
				if (oProperty === "Zzfechacadnac" && oObjectMedpago.Istajeta !== "" && oObjectMedpago.Mediopagosub !== "15400007") {
					cell.setRequired(oObjectMedpago.Vindfechavenc === "O" ? true : false);
					cell.setEnabled(true);
				} else if (oProperty === "Zzfechacadnac") {
					cell.setRequired(false);
					cell.setEnabled(false);
				}
				if (oProperty === "zzpaypal" && oObjectMedpago.Mediopagosub === "15400007") {
					cell.setRequired(true);
					cell.setEnabled(true);
				} else if (oProperty === "zzpaypal") {
					cell.setRequired(false);
					cell.setEnabled(false);
				}
			});
		},
		setMandatoryFieldFromTypeCode: function(pTypeCode) {
			var oModelField = this.getModel("modelField"),
				oTableP = this.getView().byId("tablePos"),
				oTableMp = this.getView().byId("tablePosMp"),
				vTypeCode = pTypeCode,
				oArray = {},
				oCreateModel = this.getView().getModel("modelCreate"),
				oCreateData = oCreateModel.getData();

			delete oCreateData.Origbusinessdate;
			delete oCreateData.Origstoreid;
			delete oCreateData.Origwrkstid;
			delete oCreateData.Origtransnumber;
			delete oCreateData.FechaCompromiso;
			delete oCreateData.FormaretirMerc;
			this.getView().byId("Origstoreid").setDescription("");

			oModelField.getData().forEach(function(item) {
				if ((item.Transtypecode.padStart(4, "0") === vTypeCode || item.Transtypecode === '') && item.Tipo === "C" && this.getView().byId(
						item.Fieldname)) {
					this.getView().byId(item.Fieldname).setRequired(true);
					oArray[item.Fieldname] = true;
				} else if ((item.Transtypecode.padStart(4, "0") !== vTypeCode) && item.Tipo === "C" && this.getView().byId(item.Fieldname) && !
					oArray[item.Fieldname]) {
					this.getView().byId(item.Fieldname).setRequired(false);
				}
			}.bind(this));
			oArray = {};
			oTableMp.getRows().forEach(function(row) {
				row.getCells().forEach(function(cell) {
					if (cell.getBinding("value")) {
						var sPath = cell.getBinding("value").getPath();
						var sField = oModelField.getData().filter(field => field.Fieldname === sPath && field.Tipo === "T" && (field.Transtypecode.padStart(
								4, "0") ===
							vTypeCode || field.Transtypecode === ''));
						if (sField.length && sField.length > 0) {
							cell.setRequired(true);
							oArray[sPath] = true;
						} else if (!oArray[sPath]) {
							cell.setRequired(false);
						}
					}

				}.bind(this));
			}.bind(this));
			oArray = {};
			oTableP.getRows().forEach(function(row) {
				row.getCells().forEach(function(cell) {
					if (cell.getBinding("value")) {
						var sPath = cell.getBinding("value").getPath();
						var sField = oModelField.getData().filter(field => field.Fieldname === sPath && field.Tipo === "P" && (field.Transtypecode.padStart(
								4, "0") ===
							vTypeCode || field.Transtypecode === ''));
						if (sField.length && sField.length > 0) {
							cell.setRequired(true);
							oArray[sPath] = true;
						} else if (!oArray[sPath]) {
							cell.setRequired(false);
						}
					}
				}.bind(this));
			}.bind(this));
		},
		onChangeValuePosition: function(oEvent) {
			var sModel = this.getModel("modelCreate"),
				sInput = oEvent.getParameter("changeEvent") ? oEvent.getParameter("changeEvent").getSource() : oEvent.getSource(),
				sBindContextView = sInput.getBindingContext(),
				sBindPath = oEvent.getSource().getBinding("value") ? oEvent.getSource().getBinding("value").getPath() : oEvent.getSource().getBinding(
					"selectedKey").getPath(),
				sBindDescPath = oEvent.getSource().getBinding("description") ? oEvent.getSource().getBinding("description").getPath() : "",
				sValue = oEvent.getSource().getBinding("value") ? oEvent.getParameter("newValue") : oEvent.getParameter("selectedItem").getKey(),
				sProp = {},
				oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(),
				vSelectedKey, oObjectItem,
				vPath = sInput.getBindingContext("modelCreate").getPath(),
				oObject = {},
				sValue2,
				oDataCreate = sInput.getBindingContext("modelCreate").getModel().getData(),
				oContext = oEvent.getSource().getBindingContext("modelCreate"),
				vState = "None";
			if (
				(sBindPath !== "Medpgsubtip" && sBindPath !== "Zzecunimed")
			) {

				if (sBindPath === "Tenderamount") {
					sValue =
						(sModel.getProperty("/Transtypecode") === '0102' || sModel.getProperty("/Transtypecode") === '0104') && !sValue.includes("-") ?
						"-" + sValue :
						(sModel.getProperty("/Transtypecode") === '0102' || sModel.getProperty("/Transtypecode") === '0104') && sValue.includes("-") ?
						sValue :
						sValue.includes("-") ? sValue.replaceAll("-", "") : sValue;
					sValue = sValue.toString();
				} else if (sBindPath === "Retailquantity") {
					sValue = sModel.getProperty("/Transtypecode") === '0102' ? -sValue :
						sValue.includes("-") ? sValue.replaceAll("-", "") : sValue;
					sValue = sValue.toString();
				} else if (sBindPath === "Salesamount") {
					sValue = sValue.includes("-") ? sValue.replaceAll("-", "") : sValue;
					sValue = sValue.toString();
				}

				if (sBindPath === "Retailquantity" || sBindPath === "Salesamount" || sBindPath === "Tenderamount" || sBindPath === "Zzlvimpneto" ||
					sBindPath === "Zzlvimpbruto") {
					var oFormatOptions = oEvent.getSource().getBinding("value").getType().oOutputFormat.oFormatOptions;
					sValue2 = oFloatFormat.parse(sValue).toString();
				}

				if (sBindPath !== "Cardnumber" &&
					(
						(
							((sBindPath === "Retailquantity" || sBindPath === "Salesamount" || sBindPath === "Tenderamount") && !isNaN(sValue2)) ||
							((sBindPath === "Retailquantity" || sBindPath === "Salesamount" || sBindPath === "Tenderamount") && sValue === "")
						) ||
						!(sBindPath === "Retailquantity" || sBindPath === "Salesamount" || sBindPath === "Tenderamount")
					)
				) {
					if (sBindPath === "Retailquantity" || sBindPath === "Salesamount" || sBindPath === "Tenderamount") {
						sModel.setProperty(vPath + "/" + sBindPath, sValue === "" ? "0" : sValue2);
					} else {
						sModel.setProperty(vPath + "/" + sBindPath, sValue === "" ? "0" : sValue);
					}

					if (sBindPath === "Salesamount" && (!sModel.getProperty(vPath + "/Zzlvimpneto") || parseFloat(sModel.getProperty(vPath +
							"/Zzlvimpneto")) === 0)) {
						//Infomrar IMP.NETO e IMP.BRUTO
						sModel.setProperty(vPath + "/Zzlvimpneto", sValue === "" ? "0" : sValue2);
					}
					if (sBindPath === "Salesamount" && (!sModel.getProperty(vPath + "/Zzlvimpbruto") || parseFloat(sModel.getProperty(vPath +
							"/Zzlvimpbruto")) === 0)) {
						//Infomrar IMP.NETO e IMP.BRUTO
						sValue2 = sModel.getProperty("/Transtypecode") === '0102' && !sValue2.includes("-") ? -sValue2 : sValue2;
						sValue2 = sValue2.toString();
						sModel.setProperty(vPath + "/Zzlvimpbruto", sValue === "" ? "0" : sValue2);
					}
					if (sBindPath === "Tenderamount") {
						//Actualizar importe calculado total de cabecera      
						var vImporte = 0;
						oDataCreate.to_Positionmp.forEach(function(item, index) {
							vImporte = vImporte + parseFloat(item.Tenderamount);
						});
						sModel.setProperty("/Zzimptranscalc", vImporte.toString());
					}
					if (sBindPath === "Zzarthost" && !isNaN(sValue) === true && sValue.length === 14) {
						sModel.setProperty(oContext.getPath() + "/Zzcoddpto", Number(sValue.substring(0, 6)).toString().padStart(4, "0"), oContext)
					} else if (sBindPath === "Zzarthost" && sValue.length > 0) {
						sModel.setProperty(oContext.getPath() + "/Zzcoddpto", "", oContext)
						vState = "Error"
					}
					oEvent.getSource().setValue(sValue.toString());
					oEvent.getSource().setValueState(vState);
				} else if (sBindPath === "Cardnumber" || sBindPath === "Zzfechacadnac" || sBindPath === "zzpaypal") {
					//this.onChangeCardNumber(oEvent);
					oEvent.getSource().setValueState("None");
				}
			} else if (sBindPath === "Medpgsubtip") { //|| sBindPath === "Zzecunimed") {
				this._setValueSuggestion(oEvent, sBindPath, sBindDescPath);
			} else {
				sInput.setValueState("Error");
				sInput.setValueStateText("Indicar valor correcto");
			}
			sModel.refresh(true);
		},
		onLiveChangeNumber: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				vLength = vValue.length;
			if (isNaN(vValue)) {
				oInput.setValue(vLength > 1 ? vValue.substring(0, (vLength - 1)) : "");
				oEvent.getSource().setValueState("None");
			}

		},

		onChangeCardNumber: function(oEvent) {
			/*Validar forma de pago de medio de pago por tarjeta*/
			/*	var oModelFormCard = sap.ui.getCore().getModel("FormpagCard"),
					oDataModelFormCard = oModelFormCard.getData(),
					oModel = this.getView().getModel("modelCreate"),
					oContext = oEvent.getSource().getBindingContext("modelCreate"),
					vValueCard = oEvent.getSource().getValue(),
					vLengthCard = vValueCard.length.toString(),
					oFormPag,
					vLongitud,
					vSubtringCard;

				oDataModelFormCard.forEach(function(item) {
					if (item.Clongtar === vLengthCard) {
						vLongitud = item.Clongide;
						vSubtringCard = vValueCard.substr(0, parseInt(vLongitud));
						if (parseInt(vSubtringCard) >= parseInt(item.Ciddesde) && parseInt(vSubtringCard) <= parseInt(item.Cidhasta) && !oFormPag) {
							oFormPag = item;
						}
					}
				}.bind(this));
				if (oFormPag) {
					oModel.setProperty(oContext.getPath() + "/ZzcodepagoNeg", oFormPag.Cforpago, oContext);
				} else {
					oModel.setProperty(oContext.getPath() + "/ZzcodepagoNeg", oContext.getObject().Medpgsubtip.substr(6, 2), oContext);
				}*/
		},
		_getDeterminationFormPag: function() {
			//this._callCreateEntity(true);
			/*Determinaro forma de pogo por priodidad*/
			/*var oModelCreate = this.getModel("modelCreate"),
				oDataCreate = oModelCreate.getData(),
				oModel = this.getModel(),
				vMediopagotarteja
				;
			oDataCreate.to_Positionmp.forEach(function(item) {
				vMediopagotarteja = !vMediopagotarteja ? item.Medpgsubtip.concat(",").concat(item.Cardnumber) : vMediopagotarteja.concat(",").concat(item.Medpgsubtip.concat(",").concat(item.Cardnumber));                         
			});
			oModel.callFunction("/setMediopagoD",{
				method:"GET",
				urlParameters:{
					Mediopagotarteja: vMediopagotarteja
				},
				success: function(data,resp){
					debugger;
				}.bind(this)
			});*/
		},
		onValueHelpRequest: function(oEvent) {
			var oInput = oEvent.getSource(),
				vPathValue = oInput.getSuggestionItems()[0].getBinding("key").getPath(),
				vPathDesc = oInput.getSuggestionItems()[0].getBinding("text").getPath(),
				vPathValueHelpEntity = oInput.getBinding("suggestionItems").getPath().slice(1),
				oModel = this.getModel(),
				vVHEnd = "";
			this.gButtonRequest = oInput;
			this._oBasicSearchField = new SearchField();
			if (!this._oValueHelpDialogF) {
				vVHEnd = vPathValue === 'Mediopagosub' ? 'MP' : '';
				this._oValueHelpDialogF = sap.ui.core.Fragment.load({
					name: "app.eci.zcaraltatrx2.view.fragments.ValueHelpDialog" + vVHEnd,
					controller: this
				});
			}
			this._oValueHelpDialogF.then(function(oDialog) {
				var oFilterBar = oDialog.getFilterBar(),
					oColumnProductCode, oColumnProductName;
				this._oVHD = oDialog;

				var sFilters = this._oVHD.getFilterBar().getAllFilterItems();
				sFilters.forEach(function(filter, index) {
					if (index === 0) {
						filter.setName()
					}
				});

				this._oVHD.setTitle(oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label"));
				this._oVHD.setKey(vPathValue);
				this._oVHD.setDescriptionKey(vPathDesc);
				this.getView().addDependent(oDialog);

				// Set key fields for filtering in the Define Conditions Tab
				oDialog.setRangeKeyFields([{
					label: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label"),
					key: vPathValue,
					type: "string",
					typeInstance: new TypeString({}, {
						maxLength: 7
					})
				}]);

				// Set Basic Search for FilterBar
				/*oFilterBar.setFilterBarExpanded(false);
				oFilterBar.setBasicSearch(this._oBasicSearchField);*/

				// Trigger filter bar search when the basic search is fired
				/*	this._oBasicSearchField.attachSearch(function() {
						oFilterBar.search();
					});*/

				oDialog.getTableAsync().then(function(oTable) {
					oTable.removeAllColumns();
					oTable.setModel(this.oProductsModel);
					oTable.setSelectionMode("Single");
					// For Desktop and tabled the default table is sap.ui.table.Table
					if (oTable.bindRows) {
						// Bind rows to the ODataModel and add columns
						oTable.bindAggregation("rows", {
							path: "/" + vPathValueHelpEntity,
							events: {
								dataReceived: function() {
									oDialog.update();
								}
							}
						});
						if (vPathValue !== "Mediopagosub") {
							oColumnProductCode = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + vPathValue + "}"
								})
							});
							oColumnProductCode.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label")
							});
						}

						oColumnProductName = new UIColumn({
							label: new sap.m.Label({
								text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label")
							}),
							template: new sap.m.Text({
								wrapping: false,
								text: "{" + vPathDesc + "}"
							})
						});
						oColumnProductName.data({
							fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label")
						});
						oTable.addColumn(oColumnProductCode);
						oTable.addColumn(oColumnProductName);
						if (vPathValue === "Mediopagosub") {
							var oColumn1 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Tipomp" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Tipomp" + "}"
								})
							});
							oColumn1.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Tipomp" + "/@sap:label")
							});
							var oColumn2 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Subtipmp" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Subtipmp" + "}"
								})
							});
							oColumn2.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Subtipmp" + "/@sap:label")
							});
							var oColumn3 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Mediopago" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Mediopago" + "}"
								})
							});
							oColumn3.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Mediopago" + "/@sap:label")
							});
							var oColumn4 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Desgloce" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Desgloce" + "}"
								})
							});
							oColumn4.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Desgloce" + "/@sap:label")
							});
							/*	oTable.addColumn(oColumn1);
								oTable.addColumn(oColumn2);
								oTable.addColumn(oColumn3);
								oTable.addColumn(oColumn4);*/
							oTable.addColumn(oColumn3);
							oTable.addColumn(oColumn4);
							oTable.addColumn(oColumn2);
						}
						oDialog.getFilterBar().getAllFilterItems().forEach(function(item) {
							item.getControl().setValue("");
						});
					}

					// For Mobile the default table is sap.m.Table
					if (oTable.bindItems) {
						// Bind items to the ODataModel and add columns
						oTable.bindAggregation("items", {
							path: "/" + vPathValueHelpEntity,
							template: new ColumnListItem({
								cells: [new Label({
									text: "{" + vPathValue + "}"
								}), new Label({
									text: "{" + vPathDesc + "}"
								})]
							}),
							events: {
								dataReceived: function() {
									oDialog.update();
								}
							}
						});
						oTable.addColumn(new MColumn({
							header: new Label({
								text: "Product Code"
							})
						}));
						oTable.addColumn(new MColumn({
							header: new Label({
								text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label")
							})
						}));
					}
					oDialog.update();
				}.bind(this));

				oDialog.setTokens([]);
				oDialog.open();
			}.bind(this));
		},
		onValueHelpCancelPress: function() {
			this._oVHD.close();
		},
		onValueHelpOkPress: function(oEvent) {
			var aTokens = oEvent.getParameter("tokens"),
				oModel = this.getModel(),
				oModelView = this.getView().getModel("objectView"),
				oViewData = oModelView.getData(),
				oModelCreate = this.getModel("modelCreate"),
				vPath = this.gButtonRequest.getBindingContext("modelCreate") ? this.gButtonRequest.getBindingContext("modelCreate").getPath() :
				this.gButtonRequest.getBindingInfo("value") && this.gButtonRequest.getBindingInfo("value").binding && this.gButtonRequest.getBindingInfo(
					"value").binding.getPath() && this.gButtonRequest.getBindingInfo("value").binding.getPath().includes("/") ? this.gButtonRequest.getBindingInfo(
					"value").binding.getPath().slice(1) : this.gButtonRequest.getBindingInfo("value").binding.getPath();

			if (aTokens.length > 0) {
				var
					tPath = "/" + aTokens[0].getCustomData()[1].getValue(),
					oObject = oModel.getObject(tPath);
				if (tPath.includes("mediopago")) {
					oModelCreate.setProperty(vPath + "/ZzcodepagoNeg", oObject.Mediopago);
					oModelCreate.setProperty(vPath + "/ZzcodpagoDesg", oObject.Desgloce);
					oModelCreate.setProperty(vPath + "/Medpgsubtip", oObject.Mediopagosub);
					oModelCreate.setProperty(vPath + "/Mediopagotexts", oObject.Mediopagotext);
					this._StatusFieldTarjet(oObject, this.gButtonRequest)

				} else if (tPath.includes("UnitOfMeasure")) {
					oModelCreate.setProperty(vPath + "/Zzecunimed", oObject.UnitOfMeasure);
					oModelCreate.setProperty(vPath + "/ZzecunimedText", oObject.UnitOfMeasure_Text);
				} else if (tPath.includes("storeid_vh") && vPath.includes("Retailstoreid")) {
					oModelCreate.setProperty("/Retailstoreid", oObject.Retailstoreid);
					oModelCreate.setProperty("/RetailstoreidText", oObject.RetailstoreidText);
					this._getUltFechaPeriodCerrada(oObject.Retailstoreid);
					oViewData.displayDate = true;

				} else if (tPath.includes("storeid_vh") && vPath.includes("Origstoreid")) {
					oModelCreate.setProperty("/Origstoreid", oObject.Retailstoreid);
					this.gButtonRequest.setDescription(oObject.RetailstoreidText)
				}
				this.gButtonRequest.setValueState("None");
				this.gButtonRequest.setValueStateText();
				this._setImporteOriginal(this.gButtonRequest);
			}
			if (vPath.includes("Retailstoreid")) {
				this.getView().byId("Businessdaydate").setBusy(true);
				setTimeout(function() {
					this.getView().byId("Businessdaydate-icon").setVisible(false);
					this.getView().byId("Businessdaydate").setBusy(false);
				}.bind(this), 100)
			}
			this._oVHD.close();
		},
		onFilterBarSearch: function(oEvent) {
			var sSearchQuery = this._oBasicSearchField.getValue(),
				aFilters = [],
				aSelectionSet = oEvent.getParameter("selectionSet"),
				aFilters = aSelectionSet && aSelectionSet.reduce(function(aResult, oControl) {
					if (oControl.getValue()) {
						aResult.push(new sap.ui.model.Filter({
							path: oControl.getName(),
							operator: sap.ui.model.FilterOperator.Contains,
							value1: oControl.getValue()
						}));
					}

					return aResult;
				}, []);

			/*	aFilters.push(new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter({
							path: this._oVHD.getKey(),
							operator: sap.ui.model.FilterOperator.Contains,
							value1: sSearchQuery
						}),
						new sap.ui.model.Filter({
							path: this._oVHD.getDescriptionKey(),
							operator: sap.ui.model.FilterOperator.Contains,
							value1: sSearchQuery
						})
					],
					and: false
				}));*/

			this._filterTable(new sap.ui.model.Filter({
				filters: aFilters,
				and: true
			}));
		},
		_filterTable: function(oFilter) {
			var oVHD = this._oVHD;

			oVHD.getTableAsync().then(function(oTable) {
				if (oTable.bindRows) {
					oTable.getBinding("rows").filter(oFilter);
				}
				if (oTable.bindItems) {
					oTable.getBinding("items").filter(oFilter);
				}

				// This method must be called after binding update of the table.
				oVHD.update();
			});
		},
		onSaveTransaction: function(oEvent) {
			this._callCreateEntity(false);
		},
		_callCreateEntity: function(pSimulate) {
			var oModelCreate = this.getModel("modelCreate"),
				oCreateData = oModelCreate.getData(),
				oModel = this.getModel(),
				oModelTemp = new ODataModel("/sap/opu/odata/sap/ZCAR_CDS_SB_ALTA_TRX/", true),
				vSimulate = pSimulate;
			this.gError = false;
			this.gOpenMessage = false;
			if (!this._onValidateForm(false, false)) {
				this.getView().setBusy(true);
				oModelTemp.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
				oModelTemp.setUseBatch(true);
				oModelTemp.setDeferredGroups(["foo"]);
				var mParameters = {
					groupId: "foo",
					success: function(data, resp) {
						this.getView().setBusy(false);
						if (!this.gError && !vSimulate) {
							sap.m.MessageBox.success("Se ha creado la transacción satisfactoriamente", {
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function(sAction) {
									sap.ui.getCore().setModel(new JSONModel({
										Retailstoreid: oCreateData.Retailstoreid,
										Auditbusinessdaydate: oCreateData.Businessdaydate,
										Transnumber: oCreateData.Transnumber,
										Workstationid: oCreateData.Workstationid,
									}), "modelCreateTrx");
									this.getRouter().navTo("worklist");
								}.bind(this)
							});
							//this.getRouter().navTo("worklist");
						}
					}.bind(this),
					error: function(data, resp) {
						var vCnt = 0,
							vText = "",
							oErrors;
						this.getView().setBusy(false);
						if (data.responseText && !data.headers['Content-Type'].includes("xml")) {
							var oErrors = JSON.parse(data.responseText);
							vText = vText + "* " + oErrors.error.message.value + "\n"
							if (oErrors.error.innererror && oErrors.error.innererror.errordetails) {
								oErrors.error.innererror.errordetails.forEach(function(item) {
									if (!vText.includes(item.message)) {
										vText = vText + "* " + item.message + "\n"
									}
								});
							}
						} else {
							vText = data.responseText && data.responseText !== "" ? data.responseText : data.statusText;
						}
						if (vText !== "" && !vSimulate && !this.gOpenMessage) {
							this.gError = this.gOpenMessage = true;
							sap.m.MessageBox.error(vText);
							this.getView().setBusy(false);
						}
					}.bind(this)
				};
				oCreateData.to_Position.forEach(function(item) {
					delete item.ZzecunimedText;
					if (item.Zzlvimpneto) {
						item.Zzlvimpneto = item.Zzlvimpneto.toString();
					}
					if (item.Zzlvimpbruto) {
						item.Zzlvimpbruto = item.Zzlvimpbruto.toString();
					}
					item.Retailnumber = item.RetailnumberView;
				});
				oCreateData.Simulate = vSimulate;
				oCreateData.Businessdaydate = this._convertDateUtc(oCreateData.Businessdaydate);
				if (oCreateData.Origbusinessdate) {
					oCreateData.Origbusinessdate = this._convertDateUtc(oCreateData.Origbusinessdate);
				}
				if (oCreateData.FechaCompromiso) {
					oCreateData.FechaCompromiso = this._convertDateUtc(oCreateData.FechaCompromiso);
				}
				var oDate = oCreateData.BegintimestampCreate.toISOString().replaceAll("-", "");
				oDate = oDate.replaceAll(".000Z", "");
				oDate = oDate.replaceAll(":", "");
				oDate = oDate.replaceAll("T", "");
				oDate = oDate.replaceAll("Z", "");
				oCreateData.Begintimestamp = oDate;
				oModelTemp.create("/Head", oCreateData, mParameters);
				oModelTemp.submitChanges(mParameters);
			} else {
				sap.m.MessageBox.error(this.getResourceBundle().getText("txtMandatory"));
			}
		},
		_convertDateUtc: function(oDate) {
			return new Date(Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate()));
		},

		_onValidateForm: function(pClearState, pClearValue) {
			var oControlFieldAll = this.getView().getControlsByFieldGroupId("fgDG"), //Header
				oControlTableMP = this.getView().getControlsByFieldGroupId("fgDGMP"),
				oControlTableP = this.getView().getControlsByFieldGroupId("fgDGP"),
				oModelCreate = this.getModel("modelCreate"),
				oCreateData = oModelCreate ? oModelCreate.getData() : null,
				sError = false,
				sValue = "",
				sRequired = false,
				sValueState = "",
				vClassName,
				vPathField, vIndexTable,
				vTotalIndexMp = oCreateData ? oCreateData.to_Positionmp.length : 0,
				vTotalIndexP = oCreateData ? oCreateData.to_Position.length : 0;

			oControlFieldAll.forEach(function(item, index) {
				vClassName = item.getMetadata()._sClassName;
				/**/
				if (vClassName === "sap.m.Input" || vClassName === "sap.m.DatePicker" || vClassName === "sap.m.Select" || vClassName ===
					"sap.m.DateTimePicker" || vClassName === "sap.m.TextArea") {
					sValue = vClassName.includes("Input") || vClassName.includes("TextArea") ? item.getValue() :
						vClassName.includes("DatePicker") || vClassName.includes("DateTimePicker") ? item.getDateValue() :
						vClassName.includes("Select") ? item.getSelectedKey() : null;
					sRequired = item.getRequired()
					vPathField = vClassName.includes("Input") || vClassName.includes("DateTimePicker") || vClassName.includes("DateTimePicker") ?
						item.getBindingInfo("value").parts[0].path :
						vClassName.includes("Select") ? item.getBindingInfo("selectedKey").parts[0].path : null;
					if (sRequired && (!sValue || sValue === "") && !pClearState) {
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

			/*&& item.getBindingContext("modelCreate")*/
			if (
				(oCreateData.Transtypecode.includes("101") || oCreateData.Transtypecode.includes("102")) ||
				(oCreateData.to_Positionmp && oCreateData.to_Positionmp.length > 0) || pClearValue || pClearState
			) {
				oControlTableMP.forEach(function(item, index) {
					vClassName = item.getMetadata()._sClassName;
					if ((vClassName === "sap.m.Input" || vClassName === "sap.m.DatePicker" || vClassName === "sap.m.Select" || vClassName ===
							"sap.m.DateTimePicker")) {
						vIndexTable = item.getParent().getIndex() + 1;
						if ((vIndexTable <= vTotalIndexMp || pClearState)) {
							sValue = vClassName.includes("Input") ? item.getValue() :
								vClassName.includes("DatePicker") || vClassName.includes("DateTimePicker") ? item.getDateValue() :
								vClassName.includes("Select") ? item.getSelectedKey() : null;
							sRequired = item.getRequired();
							sValueState = item.getValueState();
							vPathField = vClassName.includes("Input") || vClassName.includes("DateTimePicker") || vClassName.includes("DateTimePicker") ?
								item.getBindingInfo("value").parts[0].path :
								vClassName.includes("Select") ? item.getBindingInfo("selectedKey").parts[0].path : null;
							if (sRequired && sValue && sValue !== "" && sValueState !== "None" && !pClearState) {
								sError = true;
							} else if (sRequired && (!sValue || sValue === "") && !pClearState) {
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
					}
				});
			}

			/*&& item.getBindingContext("modelCreate")*/
			vIndexTable = 0;
			oControlTableP.forEach(function(item, index) {
				vClassName = item.getMetadata()._sClassName;
				if ((vClassName === "sap.m.Input" || vClassName === "sap.m.DatePicker" || vClassName === "sap.m.Select" || vClassName ===
						"sap.m.DateTimePicker") && (vIndexTable <= vTotalIndexP || oCreateData || pClearState)) {

					vIndexTable = item.getParent().getIndex() + 1;
					if ((vIndexTable <= vTotalIndexP || pClearState)) {
						sValue = vClassName.includes("Input") ? item.getValue() :
							vClassName.includes("DatePicker") || vClassName.includes("DateTimePicker") ? item.getDateValue() :
							vClassName.includes("Select") ? item.getSelectedKey() : null;
						sRequired = item.getRequired();
						sValueState = item.getValueState();
						vPathField = vClassName.includes("Input") || vClassName.includes("DateTimePicker") || vClassName.includes("DateTimePicker") ?
							item.getBindingInfo("value").parts[0].path :
							vClassName.includes("Select") ? item.getBindingInfo("selectedKey").parts[0].path : null;
						if (sRequired && sValue && sValue !== "" && sValueState !== "None" && !pClearState) {
							sError = true;
						} else if (sRequired && (!sValue || sValue === "") && !pClearState) {
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
				}
			});

			return sError;
		},
		onCancelTransaction: function(oEvent) {
			this._onNavBack(oEvent);
		},

		_onAddPosition: function(oEvent) {
			var oModel = this.getModel("modelCreate"),
				oData = oModel.getData();
			oData.to_Position.push({
				Zzecunimed: "01",
				Retailquantity: "0",
				Salesamount: "0",
				ZzCalifArtic: "00",
				Zzcampoc: "0"
			});
			oModel.refresh(true);
		},
		_onRemovePosition: function(oEvent) {
			var oIndices = oEvent.getSource().getParent().getParent().getSelectedIndices(),
				oModel = this.getModel("modelCreate"),
				oData = oModel.getData(),
				oDataNew = [],
				vFind;
			oData.to_Position.forEach(function(pos,index) {
				vFind = oIndices.find(item => item === index );
				if(vFind === undefined){
					oDataNew.push(pos);
				}
			})
			oData.to_Position = oDataNew;
			oModel.refresh(true);
			oEvent.getSource().getParent().getParent().clearSelection()
		},
		_onAddPositionMP: function(oEvent) {
			var oModel = this.getModel("modelCreate"),
				oData = oModel.getData();
			oData.to_Positionmp.push({
				Tenderamount: "0"
			});
			oModel.refresh(true);
		},
		_onRemovePositionMP: function(oEvent) {
			var oIndices = oEvent.getSource().getParent().getParent().getSelectedIndices(),
				oModel = this.getModel("modelCreate"),
				oData = oModel.getData(),
				vImporte = 0;
			oIndices.forEach(function(item) {
				oData.to_Positionmp.splice(item, 1)
			});
			oModel.refresh(true);
			oEvent.getSource().getParent().getParent().clearSelection();
			oData.to_Positionmp.forEach(function(item, index) {
				vImporte = vImporte + parseFloat(item.Tenderamount);
			});
			oModel.setProperty("/Zzimptranscalc", vImporte.toString());
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