/*global location history */
sap.ui.define([
	"app/inetum/zcarauditest/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/inetum/zcarauditest/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/format/NumberFormat"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, NumberFormat) {
	"use strict";

	return BaseController.extend("app.inetum.zcarauditest.controller.Worklist", {

		formatter: formatter,
		gModelTabViewVT: "modelEstVentaVT",
		gModelTabViewVTO: "modelEstVentaVT",
		gModelTabViewVP: "modelEstVentaVP",
		gModelTabViewVPO: "modelEstVentaVP",
		gModelTabViewOTC: "modelEstVentaOTC",
		gModelTabViewOTCO: "modelEstVentaOTC",
		//Inicial
		gEntityView: "/Estvtaactual",
		gModelView: "modelEstVentaVT",

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
			//oTable = this.byId("tableEstadillo");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			//iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			// keeps the search state
			this._aTableSearchState = [];

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				saveAsTileTitle: this.getResourceBundle().getText("saveAsTileTitle", this.getResourceBundle().getText("worklistViewTitle")),
				shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0,
				totalEfectivoPorVent: 0,
				Businessdaydate: new Date(),
				Retailstoreid: "",
				Formpago: "",
				DesgloceSelect: 1,
				Total: {},
				Desgloce: [{
					id: 1,
					text: "Vista principal"
				}, {
					id: 2,
					text: "Desg. Venta"
				}, {
					id: 3,
					text: "Desg. Entrega a cuenta"
				}, {
					id: 4,
					text: "Desg. Dev.Ent.Cuenta"
				}],
				DesgloceVP: [{
					id: 1,
					text: "Vista principal"
				}, {
					id: 2,
					text: "Desg. Entrega a cuenta"
				}]

			});
			this.setModel(oViewModel, "worklistView");
			this.getRouter().getRoute("worklist").attachPatternMatched(this._onObjectMatched, this);
			/*this.setModel(new JSONModel([]), this.gModelTabViewVT);
			this.setModel(new JSONModel([]), this.gModelTabViewVTO);
			this.setModel(new JSONModel([]), this.gModelTabViewVP);
			this.setModel(new JSONModel([]), this.gModelTabViewVPO);
			this.setModel(new JSONModel([]), this.gModelTabViewOTC);
			this.setModel(new JSONModel([]), this.gModelTabViewOTCO);*/
			this._setModelData();
			this.setModel(new JSONModel({}), "modelDataCentro");
			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			/*oTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});*/
			// Add the worklist page to the flp routing history
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("worklistViewTitle"),
				icon: "sap-icon://table-view",
				intent: "#Estadillo-display"
			}, true);
		},

		_setModelData: function() {
			this.setModel(new JSONModel([]), this.gModelTabViewVT);
			this.setModel(new JSONModel([]), this.gModelTabViewVTO);
			this.setModel(new JSONModel([]), this.gModelTabViewVP);
			this.setModel(new JSONModel([]), this.gModelTabViewVPO);
			this.setModel(new JSONModel([]), this.gModelTabViewOTC);
			this.setModel(new JSONModel([]), this.gModelTabViewOTCO);
		},

		_onObjectMatched: function(oEvent) {
			var oModelView = sap.ui.getCore().getModel("worklistView");
			if (oModelView) {
				this.setModel(oModelView, "worklistView");
				this.getModel("worklistView").refresh(true);
				this.getView().byId("filterbar").fireSearch();
			}

		},
		onAfterRendering: function(oEvent) {
			this.getView().getModel().setSizeLimit(9999);
			this.oFragmentVentaTerminada = [
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.textUptableDesg", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermAct", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermActDesg2", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermActDesg3", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermActDesg4", this)
			];
			this.oFragmentVentaTerminadaOrg = [
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.textUptableDesg", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermAct", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermActDesg2", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermActDesg3", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaTerminada.tabEstVtaTermActDesg4", this)
			];
			this.oFragmentVentaProceso = [
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaEnProceso.textUptableDesg", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaEnProceso.tabEstVtaProcAct", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaEnProceso.tabEstVtaProcActDesg2", this)
			];
			this.oFragmentVentaProcesoOrg = [
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaEnProceso.textUptableDesg", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaEnProceso.tabEstVtaProcAct", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaEnProceso.tabEstVtaProcActDesg2", this)
			];
			this.oFragmentVentaOtc = [
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaOtc.textUptableDesg", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaOtc.tabOtc", this)
			];
			this.oFragmentVentaOtcOrg = [
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaOtc.textUptableDesg", this),
				sap.ui.xmlfragment("app.inetum.zcarauditest.view.fragments.ventaOtc.tabOtc", this)
			];
			/*this.oFragmentVentaProceso[0][3].setVisible(false);
			this.oFragmentVentaOtc[0][3].setVisible(false);*/
			this._iniTializedIconTabBar("ievta", this.oFragmentVentaTerminada);
		},
		onSelect: function(oEvent) {
			var oModelView = this.getModel("worklistView");
			oModelView.setProperty("/DesgloceSelect", parseInt(oEvent.getSource().getSelectedKey()));
			oModelView.refresh(true);
		},
		onChangeTabBar: function(oEvent) {
			var vId = oEvent.getParameter("key"),
				oModelView = this.getModel("worklistView");
			oModelView.setProperty("/DesgloceSelect", 1);
			oModelView.refresh(true);
			if (vId === "ievta" || vId === "ievto") {
				//Venta terminada actual - original
				this.gModelView = vId === "ievta" ? this.gModelTabViewVT : this.gModelTabViewVTO;
				this.gEntityView = vId === "ievta" ? "/Estvtaactual" : "/Estvtaorg";
				this._iniTializedIconTabBar(vId, vId === "ievta" ? this.oFragmentVentaTerminada : this.oFragmentVentaTerminadaOrg);
				/*	let oModel = this.getModel(this.gModelView),
						oDatamodel = oModel.getData();
					if(oDatamodel.length === 0){
						this._getSetModelTable(this.gModelTabViewVT, this._oListFilterState, this.gEntityView);
					}*/
			} else if (vId === "evpa" || vId === "evpo") {
				//Venta en proceso actual - original
				this.gModelView = vId === "evpa" ? this.gModelTabViewVP : this.gModelTabViewVPO;
				this.gEntityView = vId === "evpa" ? "/Estvtaprocactual" : "/Estvtaprocorg";
				this._iniTializedIconTabBar(vId, vId === "evpa" ? this.oFragmentVentaProceso : this.oFragmentVentaProcesoOrg);
				/*let oModel = this.getModel(this.gModelView),
					oDatamodel = oModel.getData();
				if(oDatamodel.length === 0){
					this._getSetModelTable(this.gModelTabViewVP, this._oListFilterState, this.gEntityView);
				}*/
			} else if (vId === "eotca" || vId === "eotco") {
				this.gModelView = vId === "eotca" ? this.gModelTabViewOTC : this.gModelTabViewOTCO;
				this.gEntityView = vId === "eotca" ? "/Estotcactual" : "/Estotcorg";
				this._iniTializedIconTabBar(vId, vId === "eotca" ? this.oFragmentVentaOtc : this.oFragmentVentaOtcOrg);
			}

			/*if (this.getModel(this.gModelView).getData().length === 0) {
				this._getSetModelTable(this.gModelView, this._oListFilterState, this.gEntityView);
			}*/
			this._getSetModelTable(this.gModelView, this._oListFilterState, this.gEntityView);

		},
		onSearch: function(oEvent) {
			var oModelView = this.getModel("worklistView"),
				oDataModel = oModelView.getData(),
				//	oIconTab = this.getView().byId("idIconTabBarFiori2")
				//	oKeySelected = oIconTab.getSelectedKey(),
				vDate = new Date(Date.UTC(oDataModel.Businessdaydate.getFullYear(), oDataModel.Businessdaydate.getMonth(),
					oDataModel.Businessdaydate.getDate())),
				vStore = oDataModel.Retailstoreid,
				vFormpago = oDataModel.Formpago,
				oModel = this.getModel();
			this._setModelData();
			this._oListFilterState = [
				new Filter("Businessdaydate", FilterOperator.EQ, vDate),
				new Filter("Retailstoreid", FilterOperator.EQ, vStore)
			];
			/*	if( vFormpago && vFormpago !== "" ){
					this._oListFilterState.push(new Filter("Formpag", FilterOperator.EQ, vFormpago));
				}*/
			this._oListFilterStateDatCent = [
				new Filter("Businessdaydate", FilterOperator.EQ, vDate),
				new Filter("Retailstoreid", FilterOperator.EQ, vStore)
			];
			this._getSetModelTable(
				this.gModelView,
				this._oListFilterState,
				this.gEntityView); //Datos de estadillo
			this._getDataCentro(this._oListFilterStateDatCent); //Datos de centros Aprob/Cierre/Modif
		},
		_iniTializedIconTabBar: function(pKey, pFragments) {
			var oIconTab = this.getView().byId("idIconTabBarFiori2"),
				vKey = pKey,
				oFragments = pFragments,
				oCount = 0;
			oIconTab.setSelectedKey(vKey);
			var onInsertContent = function(content, item) {
				if (content.length && content.length > 0) {
					content.forEach(function(cont) {
						onInsertContent(cont, item);
					});

				} else {
					item.insertContent(content, oCount);
					oCount = oCount + 1;
				}
			}.bind(this)
			oIconTab.getItems().forEach(function(item) {
				if (item.getKey() === vKey) {
					item.removeAllContent()
					oFragments.forEach(function(frag, id) {
						onInsertContent(frag, item)
					});

				} else {
					item.removeAllContent()
				}
			}.bind(this));
		},
		_getSetModelTable: function(pModel, pFilter, pEntity) {
			var vModelId = pModel;
			this.getView().setBusy(true);
			this.getModel().read(pEntity, {
				filters: pFilter,
				success: function(data, resp) {
					var oMessage,
						vTotal = 0;
					if (data.results.length > 0) {
						var oObject01 = data.results.filter((item) => item.Formpag === '01'),
							oObjectTotal = data.results.filter((item) => item.Formpag === 'T'),
							oModelView = this.getModel("worklistView"),
							oFormat = NumberFormat.getFloatInstance({
								"groupingEnabled": true,
								"groupingSeparator": ".",
								"decimalSeparator": ",",
								"minFractionDigits": 2,
								"maxFractionDigits": 2,
							});
						if (oObject01 && oObject01.length > 0 && vModelId.includes("modelEstVentaVT")) {
							var oObject = oObject01[0],
								oObjectT = oObjectTotal[0];
							var oEfectPorVenta = parseFloat(oObject.Totalimpvta) + parseFloat(oObject.Impdev) - parseFloat(oObjectT.Totalecta) -
								parseFloat(oObjectT.Impentdevec);
							oModelView.setProperty("/totalEfectivoPorVent", oFormat.format(oEfectPorVenta.toString()));
						} else if (vModelId === "modelEstVentaOTC") {
							data.results.map((item) => vTotal = vTotal + parseFloat(item.Totalimpneto));
							oModelView.setProperty("/totalotc", oFormat.format(vTotal.toString()));
						}
						this._stFiltersTableWithFormPag();
						this.getModel(vModelId).setData(data.results);
						this.getModel(vModelId).refresh(true);
					}
					if (resp['headers'] && resp['headers']['sap-message']) {
						oMessage = JSON.parse(resp['headers']['sap-message']).message;
						sap.m.MessageBox.alert(oMessage);
					}
					this.getView().setBusy(false);
				}.bind(this),
				error: function() {
					this.getView().setBusy(false);
				}.bind(this)
			});
		},
		_stFiltersTableWithFormPag: function() {
			var
				oIconTab = this.getView().byId("idIconTabBarFiori2"),
				vSelKey = oIconTab.getSelectedKey(),
				oModel = this.getModel("worklistView"),
				oDataModel = oModel.getData(),
				vFormpago = oDataModel.Formpago,
				oFilter = null,
				oTable1, oTable2, oTable3, oTable4,
				oTable1Bind, oTable2Bind, oTable3Bind, oTable4Bind;
			if (vSelKey === "ievta" || vSelKey === "ievto") { //Venta Terminada
				oTable1 = vSelKey === "ievta" ? this.oFragmentVentaTerminada[1] : this.oFragmentVentaTerminadaOrg[1];
				oTable2 = vSelKey === "ievta" ? this.oFragmentVentaTerminada[2] : this.oFragmentVentaTerminadaOrg[2];
				oTable3 = vSelKey === "ievta" ? this.oFragmentVentaTerminada[3] : this.oFragmentVentaTerminadaOrg[3];
				oTable4 = vSelKey === "ievta" ? this.oFragmentVentaTerminada[4] : this.oFragmentVentaTerminadaOrg[4];
				oTable1Bind = oTable1 ? oTable1.getBinding("items") : null;
				oTable2Bind = oTable2 ? oTable2.getBinding("items") : null;
				oTable3Bind = oTable3 ? oTable3.getBinding("items") : null;
				oTable4Bind = oTable4 ? oTable4.getBinding("items") : null;
				if (vFormpago && vFormpago !== "") {
					oFilter = new Filter("Formpag", FilterOperator.EQ, vFormpago);
					oTable1Bind.filter(oFilter);
					oTable2Bind.filter(oFilter);
					oTable3Bind.filter(oFilter);
					oTable4Bind.filter(oFilter);
				} else {
					oTable1Bind.filter([]);
					oTable2Bind.filter([]);
					oTable3Bind.filter([]);
					oTable4Bind.filter([]);
				}

			} else if (vSelKey === "evpa" || vSelKey === "evpo") { //Venta proceso
				oTable1 = vSelKey === "evpa" ? this.oFragmentVentaProceso[1] : this.oFragmentVentaProcesoOrg[1];
				oTable2 = vSelKey === "evpa" ? this.oFragmentVentaProceso[2] : this.oFragmentVentaProcesoOrg[2];
				oTable1Bind = oTable1 ? oTable1.getBinding("items") : null;
				oTable2Bind = oTable2 ? oTable2.getBinding("items") : null;
				if (vFormpago && vFormpago !== "") {
					oFilter = new Filter("Formpag", FilterOperator.EQ, vFormpago);
					oTable1Bind.filter(oFilter);
					oTable2Bind.filter(oFilter);
				} else {
					oTable1Bind.filter([]);
					oTable2Bind.filter([]);
				}
			}
			/*else if (vSelKey === "eotca" || vSelKey === "eotco") { //OTC
				oTable1 = this.oFragmentVentaOtc[1];
				oTable1Bind = oTable1 ? oTable1.getBinding("items") : null;
				if (vFormpago && vFormpago !== "") {
					oFilter = new Filter("Formpag", FilterOperator.EQ, vFormpago);
					oTable1Bind.filter(oFilter);
				} else {
					oTable1Bind.filter([]);
				}
			}*/
		},
		_getDataCentro: function(pFilter) {
			this.getModel().read("/Datoscentro", {
				filters: pFilter,
				success: function(data, resp) {
					if (data.results.length > 0) {
						this.getModel("modelDataCentro").setData(data.results[0]);
						this.getModel("modelDataCentro").refresh(true);
					} else {
						this.getModel("modelDataCentro").setData({});
						this.getModel("modelDataCentro").refresh(true);
					}
					this.getView().setBusy(false);
				}.bind(this),
				error: function() {
					this.getView().setBusy(false);
				}.bind(this)
			});
		},
		onNavigateConsulaTrx: function(oEvent) {
			var oModelView = this.getModel("worklistView"),
				oDataView = oModelView.getData();
			if (sap.ushell.Container && (oDataView.Businessdaydate !== "" && oDataView.Retailstoreid !== "")) {
				sap.ui.getCore().setModel(this.getModel("worklistView"), "worklistView");
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zconsultrx",
							action: "manage"
						},
						params: {
							RetailstoreidShow: oDataView.Retailstoreid,
							Businessdaydate: new Date(Date.UTC(oDataView.Businessdaydate.getFullYear(), oDataView.Businessdaydate.getMonth(), oDataView.Businessdaydate
								.getDate())),
							Status: "C"
						}
					});
			}
		},
		onNavigateObserv: function(oEvent) {
			var oModelView = this.getModel("worklistView"),
				oDataView = oModelView.getData();
			if (sap.ushell.Container && (oDataView.Businessdaydate !== "" && oDataView.Retailstoreid !== "")) {
				sap.ui.getCore().setModel(this.getModel("worklistView"), "worklistView");
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zobservaudit",
							action: "manage"
						},
						params: {
							Retailstoreid: oDataView.Retailstoreid,
							Businessdaydate: new Date(Date.UTC(oDataView.Businessdaydate.getFullYear(), oDataView.Businessdaydate.getMonth(), oDataView.Businessdaydate
								.getDate())),
						}
					});
			}
		},
		onChangeStoreId: function(oEvent){
			var oCombo = oEvent.getSource(),
				oSelectableItem = oCombo.getSelectableItems();
			if(oSelectableItem.length === 1){
				let oItem = oSelectableItem[0];
				oCombo.setSelectedItem(oItem)
			}
		}

	});
});