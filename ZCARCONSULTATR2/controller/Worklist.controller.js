/*global location history */
sap.ui.define([
	"app/inetum/zcarconsulta2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/inetum/zcarconsulta2/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/odata/v2/ODataModel",
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, ODataModel) {
	"use strict";

	return BaseController.extend("app.inetum.zcarconsulta2.controller.Worklist", {

		formatter: formatter,
		gErrorDetail: [],

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			var oViewModel;

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");

			this.addHistoryEntry({
				title: this.getResourceBundle().getText("worklistViewTitle"),
				icon: "sap-icon://table-view",
				intent: "#Consultadetransacción-display"
			}, true);
		},
		onAfterRendering: function(oEvent) {
			var oModel = this.getView().getModel();
			this.getView().setBusy(true);
			oModel.read("/FormpagCard", {
				success: function(data, resp) {
					sap.ui.getCore().setModel(new JSONModel(data.results), "FormpagCard");
					this.getView().setBusy(false);
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});
		},
		onBeforeRendering: function() {
			var oSmartFilterBar = this.byId("filterBar");

			// Verifica si hay filtros aplicados y ejecuta la búsqueda
			if (oSmartFilterBar) {
				oSmartFilterBar.search();
			}
			setTimeout(function() {
				this._getUrlParameters();
			}.bind(this), 1000);
		},
		_getUrlParameters: function(oEvent) {
			var oParameters = this.getOwnerComponent().getComponentData().startupParameters,
				oSmartFilterBar = this.getView().byId("smartFilterBar"),
				oDefaultFilter = JSON.stringify(oParameters) !== '{}' ? {
					"Auditbusinessdaydate": new Date(oParameters.Businessdaydate[0]),
					"Retailstoreid": {
						"items": [{
							"key": oParameters.RetailstoreidShow[0],
							"text": oParameters.RetailstoreidShow[0]
						}],
						"ranges": [],
						"value": null
					},
					"Status": oParameters.Status[0]
				} : null;

			if (oDefaultFilter) {
				oSmartFilterBar.setFilterData(oDefaultFilter);
				this.getView().byId("smartFilterBar-btnGo").firePress();
			}
		},
		onBeforeRebindTable: function(oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams"),
				vMFilter = false;
			//Empresas relevantes para auditoria - Tabla zcar_ctrl_arran
			mBindingParams.filters[0].aFilters.push(
				new sap.ui.model.Filter("vEmpresa", sap.ui.model.FilterOperator.EQ, "X")
			)

			/*	mBindingParams.filters[0].aFilters.push(new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("AltaManual", sap.ui.model.FilterOperator.EQ, true),
						new sap.ui.model.Filter("BajaManual", sap.ui.model.FilterOperator.EQ, false)
					],
					and: true
				}));
				mBindingParams.filters[0].aFilters.push(new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("AltaManual", sap.ui.model.FilterOperator.EQ, false),
						new sap.ui.model.Filter("BajaManual", sap.ui.model.FilterOperator.EQ, false)
					],
					and: true
				}));*/

			/*mBindingParams.filters[0] = new sap.ui.model.Filter({
				filters: [
					mBindingParams.filters[0],
					new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("AltaManual", sap.ui.model.FilterOperator.EQ, true),
							new sap.ui.model.Filter("BajaManual", sap.ui.model.FilterOperator.EQ, false)
						],
						and: true
					}),
					new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("AltaManual", sap.ui.model.FilterOperator.EQ, false),
							new sap.ui.model.Filter("BajaManual", sap.ui.model.FilterOperator.EQ, false)
						],
						and: true
					})
				]
			});
			mBindingParams.filters[0].bAnd = true;*/
			/*mBindingParams.filters.forEach(function(filter) {
				if (filter.aFilters) {
					vMFilter = true;
					filter.aFilters.forEach(function(afilter) {
						if (afilter.sPath === "TrxCorregida") {
							afilter.sPath = "StatusTrx";
						}
					});
				}
			});*/

			/*if (mBindingParams.filters.length > 0 && !mBindingParams.filters[0]._bMultiFilter) { //Si no es multifilters
				mBindingParams.filters[0] = new sap.ui.model.Filter({
					filters: [
						mBindingParams.filters[0],
						new sap.ui.model.Filter("TrxanulV", sap.ui.model.FilterOperator.NE, "A")
					]
				});
				mBindingParams.filters[0].bAnd = true;
			} else {
				mBindingParams.filters[0].aFilters.push(
					new sap.ui.model.Filter("TrxanulV", sap.ui.model.FilterOperator.NE, "A")
				);
			}*/

			/*	if (oBinding.filters.length === 0) {
					oBinding.filters.push(new sap.ui.model.Filter("Trxanul", sap.ui.model.FilterOperator.NE, "A"));
				} else {
					oBinding.filters[0].aFilters.push(new sap.ui.model.Filter("Trxanul", sap.ui.model.FilterOperator.NE, "A"));
				}*/
		},

		onExecuteDeshacer: function(oEvent) {
			sap.m.MessageBox.alert(this.getResourceBundle().getText("txtBoxConfirm"), {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(sAction) {
					if (sAction === "OK") {
						this._onActionConfirmDeshacer("/dehacerTransac");
					}
				}.bind(this)
			});
		},
		onExecuteBajaTrx: function(oEvent) {
			sap.m.MessageBox.alert(this.getResourceBundle().getText("txtBoxConfirmBaja"), {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(sAction) {
					if (sAction === "OK") {
						this._onActionConfirm("/BajaTransaction");
					}
				}.bind(this)
			});
		},
		onExecuteDeshacerBaja: function(oEvent) {
			sap.m.MessageBox.alert(this.getResourceBundle().getText("txtBoxConfirm"), {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(sAction) {
					if (sAction === "OK") {
						this._onActionConfirm("/dehacerBaja");
					}
				}.bind(this)
			});
		},
		_onActionConfirm: function(pAction) {
			var oModel = new ODataModel("/sap/opu/odata/sap/ZCAR_SB_CDS_TRANS_HEAD_V2/", true),
				oTable = this.getView().byId("table"),
				oContextSelected = oTable.getSelectedContexts(),
				mParameters = {
					groupId: "foo",
					success: function(data, resp) {
						if (resp.data.__batchResponses.length > 0) {
							resp.data.__batchResponses.forEach(function(resp) {
								if (resp.response && resp.response.body) {
									let oErrorDetail = JSON.parse(resp.response.body).error.innererror.errordetails;
									oErrorDetail.forEach(function(detail) {
										this.gErrorDetail.push({
											message: detail.message,
											type: detail.severity
										})
									}.bind(this));
								}
							}.bind(this));
						}
						if (this.gErrorDetail.length > 0) {
							this._FunctionPopUpError(this.gErrorDetail);
						} else {
							this.getView().byId("smartFilterBar").fireSearch()
							sap.m.MessageBox.confirm(this.getResourceBundle().getText("txtCondirmAction"));
						}
						this.getView().setBusy(false);
					}.bind(this),
					error: function(data, resp) {
						this.getView().setBusy(false);
					}.bind(this)
				};
			this.gErrorDetail = [];
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			oModel.setUseBatch(true);
			oModel.setDeferredGroups(["foo"]);

			if (oContextSelected.length > 0) {
				let vPath = oTable.getSelectedContexts()[0].getPath(),
					oObject = oTable.getSelectedContexts()[0].getObject(),
					aMatches = vPath.match(/\((.*?)\)/)[1].split(','),
					oKeys = {};
				aMatches.forEach(function(sPair) {
					const [sKey, sValue] = sPair.split('=');
					oKeys[sKey.trim()] = sValue.replace(/'/g, '');
				});
				this.getView().setBusy(true);
				oModel.callFunction(pAction, {
					method: "POST",
					urlParameters: {
						"Retailstoreid": oObject.Retailstoreid,
						"Businessdaydate": new Date(oKeys.Businessdaydate.replace("datetime", '').split("T")[0]),
						"Transindex": parseInt(oKeys.Transindex),
						"Transnumber": oKeys.Transnumber,
						"Workstationid": oKeys.Workstationid
					},
					groupId: "foo"
				});
				oModel.submitChanges(mParameters);
			}
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		onRowSelectTable: function(oItem) {
			this.getRouter().navTo("object", {
				objectId: oItem.getSource().getBindingContext().getPath().slice(1)
			});
		},
		_FunctionPopUpError: function(oErrorsList) {
			this.getView().setModel(new JSONModel(oErrorsList), "ModelErrors");
			if (!this.oDefaultDialog) {
				this.oDefaultDialog = new sap.m.Dialog({
					title: this.getResourceBundle().getText("tableDialogError"), //"Errores de ejecución",
					resizable: false,
					content: new sap.m.List({
						items: {
							path: "ModelErrors>/",
							template: new sap.m.StandardListItem({
								title: "{ModelErrors>message}",
								info: "{ModelErrors>type}"
							})
						}
					}),
					beginButton: new sap.m.Button({
						type: sap.m.ButtonType.Emphasized,
						text: this.getResourceBundle().getText("tableDialogOk"),
						press: function() {
							this.oDefaultDialog.close();
						}.bind(this)
					})
				});
				this.getView().addDependent(this.oDefaultDialog);
			}

			this.oDefaultDialog.open();

		}

	});
});