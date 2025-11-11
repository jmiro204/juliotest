/*global location history */
sap.ui.define([
	"app/inetum/zcarauditinciv2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/inetum/zcarauditinciv2/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/odata/v2/ODataModel"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, ODataModel) {
	"use strict";

	return BaseController.extend("app.inetum.zcarauditinciv2.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			var oViewModel,
				iOriginalBusyDelay;
			//oTable = this.byId("table");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			//iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			// keeps the search state
			this._aTableSearchState = [];

			this.getRouter().getRoute("worklist").attachPatternMatched(this._onObjectMatched, this);

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				saveAsTileTitle: this.getResourceBundle().getText("saveAsTileTitle", this.getResourceBundle().getText("worklistViewTitle")),
				shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");

			this.getView().byId("smarTableInci").attachDataReceived(function(oEvent) {
				var oParameters = oEvent.getParameters(),
					oParamet = oParameters.mParameters ? oParameters.mParameters : null,
					oResult = oParamet.data.results,
					vLength = oResult.length,
					vPath;
				if (vLength > 0 && !this.gCallSatusButton) {
					this.gCallSatusButton = true;
					this.getView().getModel().read("/Incidencias", {
						urlParameters: {
							$top: 2
						},
						success: function(data) {
							this._setStatusButtonAction(data.results[0]);
						}.bind(this),
						error: function(resp) {
							this._setStatusButtonAction();
						}.bind(this)
					})
				} else {
					this.gCallSatusButton = true;
					this._setStatusButtonAction();
				}

			}.bind(this));

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			/*	oTable.attachEventOnce("updateFinished", function(){
					// Restore original busy indicator delay for worklist's table
					oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
				});*/
			// Add the worklist page to the flp routing history
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("worklistViewTitle"),
				icon: "sap-icon://table-view",
				intent: "#Incidenciaauditoria-display"
			}, true);
		},
		_setStatusButtonAction: function(oObject) {
			var vBorrar = false,
				vProv = false;
			if (oObject) {
				vBorrar = oObject.Delete_mc;
				vProv = oObject.actionAprovInci_ac;
			}
			this.gCallSatusButton = false;
			this.getView().byId("deleteButton").setEnabled(vBorrar);
			this.getView().byId("aproveButton").setEnabled(vProv);
		},

		_onObjectMatched: function(oEvent) {
			this.getView().byId("smartFilterBar").fireSearch();
			this._deseleccionarTodo();
		},

		onCreate: function(oEvent) {
			this._showObject();
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onRowSelectTable: function(oEvent) {
			// The source is the list item that got pressed
			if (this.getView().byId("btnSave")) {
				this.getView().byId("btnSave").setEnabled(true);
			}

			this._showObject(oEvent.getSource());
		},
		onDelete: function(oEvent) {
			sap.m.MessageBox.confirm("Confirmar eliminación", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(sAction) {
					if (sAction === "OK") {
						this.onDeleteConfirm();
					}
				}.bind(this)
			});
		},
		onDeleteConfirm: function() {
			var oTable = this.getView().byId("table"),
				oDataModel = this.getModel(),
				oItems = oTable.getItems(),
				oObjectsSelected = [],
				oExecBatch = false,
				vCountCall = 0,
				vCount = 0,
				vViewError = false,
				mParameters = {
					method: "POST",
					groupId: "foo",
					success: function(data, resp) {
						vCountCall = vCountCall + 1;
						if (vCountCall === vCount) {
							this.getView().getModel().refresh(true);
							this.getView().setBusy(false);
							sap.m.MessageBox.confirm(this.getResourceBundle().getText("confirDelete"));
						}
					}.bind(this),
					error: function(data, resp) {
						var oMessage,
							oObject = [];
						if (!vViewError && data["headers"]['Content-Type'] && data["headers"]['Content-Type'].includes("json")) {
							oMessage = JSON.parse(data.responseText);
						}

						if (oMessage && !vViewError) {
							vViewError = true;
							this.getView().setModel(new sap.ui.model.json.JSONModel([]), "modelMessage");
							oMessage.error.innererror.errordetails.forEach(function(message) {
								oObject.push({
									message: message.message
								});
							}.bind(this));
							this.getView().getModel("modelMessage").setData(oObject);
							this.oOpenFragmentMessage();
							this.getView().getModel().refresh(true);
						}
						this.getView().setBusy(false);
					}.bind(this)
				};

			oItems.forEach(function(item) {
				let vPath = item.getBindingContext().getPath();
				if (item.getSelected()) {
					oExecBatch = true;
					vCount = vCount + 1;
					oDataModel.remove(vPath, mParameters);

				}
			}.bind(this));

			if (oExecBatch) {
				this.getView().setBusy(true);
				oDataModel.submitChanges(mParameters);
			}
		},
		onAprov: function(oEvent) {
			sap.m.MessageBox.confirm("Confirmar aprobación", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(sAction) {
					if (sAction === "OK") {
						this.onAprovConfirm();
					}
				}.bind(this)
			});
		},
		onAprovConfirm: function() {
			var oTable = this.getView().byId("table"),
				oDataModel = this.getModel(),
				oItems = oTable.getItems(),
				oObjectsSelected = [],
				oExecBatch = false,
				oModelTemp = new ODataModel("/sap/opu/odata/sap/ZCAR_SB_INCIDENCIAS_AUDIT/", true),
				vCount = 1,
				vCountCall = 0,
				vViewError = false,
				mParameters = {
					method: "POST",
					groupId: "changes",
					success: function(data, resp) {
						var oErrors, oObject = [];
						vCountCall = vCountCall + 1;
						if (vCountCall === vCount) {
							this.getView().getModel().refresh(true);
							this.getView().setBusy(false);
							if (
								data.__batchResponses.length > 0 && data.__batchResponses[0].__changeResponses && data.__batchResponses[0].__changeResponses.length >
								0 && data.__batchResponses[0].__changeResponses[0]['headers'] && data.__batchResponses[0].__changeResponses[0]['headers'][
									'sap-message'
								]
							) {
								oErrors = JSON.parse(data.__batchResponses[0].__changeResponses[0]['headers']['sap-message']);
								oObject.push(oErrors);
								oErrors.details.forEach(function(message) {
									oObject.push(message);
								}.bind(this));
							}
							if (!oObject) {
								sap.m.MessageBox.confirm(this.getResourceBundle().getText("confirAprov"));
							} else {
								this.getView().setModel(new sap.ui.model.json.JSONModel([]), "modelMessage");
								this.getView().getModel("modelMessage").setData(oObject);
								this.oOpenFragmentMessage();
							}

							this.getView().getModel().refresh(true);
						}
					}.bind(this),
					error: function(data, resp) {
						var oMessage,
							oObject = [];
						if (!vViewError && data["headers"]['Content-Type'] && data["headers"]['Content-Type'].includes("json")) {
							oMessage = JSON.parse(data.responseText);
						}

						if (oMessage && !vViewError) {
							vViewError = true;
							this.getView().setModel(new sap.ui.model.json.JSONModel([]), "modelMessage");
							oMessage.error.innererror.errordetails.forEach(function(message) {
								oObject.push({
									message: message.message
								});
							}.bind(this));
							this.getView().getModel("modelMessage").setData(oObject);
							this.oOpenFragmentMessage();
						}
						vCountCall = vCountCall + 1;
						if (vCountCall === vCount) {
							this.getView().getModel().refresh(true);
						}
						this.getView().setBusy(false);
					}.bind(this)
				};
			oItems.forEach(function(item) {
				let oObject = {...item.getBindingContext().getObject()
				};
				if (item.getSelected()) {
					oExecBatch = true;
					delete oObject.to_Motivo;
					delete oObject.to_Position;
					delete oObject.to_PositionMp;
					delete oObject.__metadata;
					mParameters.urlParameters = {
						Retailstoreid: oObject.Retailstoreid,
						Businessdaydate: oObject.Businessdaydate,
						Workstationid: oObject.WorkstationidView.replace(/^(0+)/g, ''),
						Transnumber: oObject.TransnumberView.replace(/^(0+)/g, '')
					};
					vCount = vCount + 1;
					oModelTemp.callFunction("/actionAprovInci", mParameters);
				}
			}.bind(this));

			if (oExecBatch) {
				this.getView().setBusy(true);
				oModelTemp.submitChanges(mParameters);
			}
		},

		oOpenFragmentMessage: function() {
			if (!this.loadFragmentMessage) {
				this.loadFragmentMessage = sap.ui.core.Fragment.load({
					name: "app.inetum.zcarauditinciv2.view.fragment.Message",
					controller: this
				});
			}
			this.loadFragmentMessage.then(function(oDialog) {
				oDialog.setModel(this.getView().getModel("modelMessage"), "modelMessage");
				this._oDialogMessage = oDialog;
				oDialog.open();
			}.bind(this));

		},
		_onActionCancel: function(oEvent) {
			if (this._oDialogMessage) {
				this._oDialogMessage.close();
			}
		},

		_deseleccionarTodo: function() {
			var oTable = this.getView().byId("table"); // Cambia "myTableId" por el ID de tu tabla
			if (oTable) {
				oTable.removeSelections();
			}
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function(oItem) {

			/*this.getRouter().navTo("object", {
				objectId: oItem ? oItem.getSelectedContexts()[0].getPath().slice(1) : "C"
			});*/
			this.getRouter().navTo("object", {
				objectId: oItem ? oItem.getBindingContext().getPath().slice(1) : "C"
			});
			if (oItem) {
				oItem.getParent().removeSelections();
			}

		}

	});
});