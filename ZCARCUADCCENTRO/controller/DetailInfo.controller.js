/*global location */
sap.ui.define([
	"app/inetum/ZCARCUADCENTRO/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"app/inetum/ZCARCUADCENTRO/model/formatter",
	"sap/ui/Device",
	"sap/ui/core/routing/History",
	"sap/ui/util/Storage",
	'sap/ui/model/Sorter'
], function(BaseController, JSONModel, formatter, Device, History, Storage, Sorter) {
	"use strict";

	return BaseController.extend("app.inetum.ZCARCUADCENTRO.controller.DetailInfo", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		sObjectId: "",
		// Dentro del método onInit de tu controlador
		onInit: function() {

			this.getRouter().getRoute("object1").attachPatternMatched(this._onObjectMatched, this);

		},
		onAfterRendering: function(oEvent) {
			/*	if (!this.sObjectId) {
					window.setTimeout(function() {
						this.onNavBack();
					}.bind(this), 0);
				}*/
		},

		_onObjectMatched: function(oEvent) {
			var oModel = this.getView().getModel(),
				oRouter = sap.ui.core.UIComponent.getRouterFor(this),
				oObject;
			this.sObjectId = oEvent.getParameter("arguments").objectDetailId;
			oObject = oModel.getObject("/" + this.sObjectId);
			this.getView().setModel(new JSONModel([]), "modelDetail");
			this.getView().setModel(new JSONModel({
				key: "org"
			}), "modelTab");
			if (oObject) {
				this.getView().setModel(new JSONModel(this.getModel().getObject("/" + this.sObjectId)), "Tpv");
				this.getView().byId("idObjectRangeTrx").setIntro("( " + oObject.TrxInit + "-" + oObject.TrxEnd + " )");
				/*this.getView().byId("idHardTotal").setText("Hard Total: " + (oObject.DescStatusHardTotal ? oObject.DescStatusHardTotal :
					'SIN HARDTOTAL'));*/
				if (oObject.StatusHardTotal !== 'A') {
					this.getView().byId("idHardTotal").setText("Hard Total: " + (oObject.DescStatusHardTotal ? oObject.DescStatusHardTotal :
						'SIN HARDTOTAL'));
				} else if (oObject.StatusHardTotal === 'A') {
					this.getView().byId("idHardTotal").setText("Hard Total: TEMPORAL");
				}
				this._loadTableDetail();
			} else {
				/*	oRouter.navTo("master", {
						NavBackOtherApp: true
					}, true);*/
				this.getView().byId("page").fireNavButtonPress();
				/*	window.setTimeout(function() {
						this.onNavBack();
					}.bind(this), 0);*/
				/*this.onNavBack();*/
				/*oModel.read("/" + this.sObjectId, {
					success: function(data) {
						this.getView().setModel(new JSONModel(data), "Tpv");
						this.getView().byId("idObjectRangeTrx").setIntro("( " + data.Transnumbermin + "-" + data.Transnumbermax + " )");
						this.getView().byId("idHardTotal").setText("Hard Total: " + (data.DescStatusHardTotal ? data.DescStatusHardTotal :
							'SIN HARDTOTAL'));
						this._loadTableDetail();
						this.onNavBack();
					}.bind(this)
				});*/

			}

		},
		_loadTableDetail: function() {
			var oModel = this.getView().getModel();
			if (this.sObjectId) {
				var ObjTpv = this.getOwnerComponent().getModel().getObject("/" + this.sObjectId);
				if (ObjTpv) {
					var tpvDate = ObjTpv.Auditbusinessdaydate;
					var year = tpvDate.getFullYear();
					var month = (tpvDate.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 al mes ya que en JavaScript los meses van de 0 a 11
					var day = tpvDate.getDate().toString().padStart(2, '0');
					var formatDate = year + month + day;
					var oFilters = [];

					/*if (binding.filters[0]) {
						binding.filters[0].oValue1 = ObjTpv.Retailstoreid;
					}*/
					oFilters.push(new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, ObjTpv.Retailstoreid));
					oFilters.push(new sap.ui.model.Filter("Workstationid", sap.ui.model.FilterOperator.EQ, ObjTpv.Workstationid));
					//binding.filters.push(new sap.ui.model.Filter("Businessdaydate", sap.ui.model.FilterOperator.EQ, formatDate));
					oFilters.push(new sap.ui.model.Filter("Auditbusinessdaydate", sap.ui.model.FilterOperator.EQ, ObjTpv.Auditbusinessdaydate));
					if (this.applyFilterFlag) {
						oFilters.push(new sap.ui.model.Filter("Descvalue", sap.ui.model.FilterOperator.GT, 0));
					}
					this.getView().setBusy(true);
					oModel.read("/Desgtpv", {
						filters: oFilters,
						success: function(data) {
							var oData = data.results;
							this.getView().setModel(new JSONModel(oData), "modelDetail");
							this._handleGroupTable();
							this._handleFIltersTable();
							this.getView().setBusy(false);
						}.bind(this)
					});

				}
			}
		},
		_handleGroupTable: function() {
			var oTable = this.byId("detailTeminal"),
				oBinding = oTable.getBinding("items"),
				sPath,
				aGroups = [];
			sPath = "ConceptoCar";
			aGroups.push(new Sorter("ConceptoCar", false, function(oContext) {
				var name = oContext.getProperty("ConceptoCarDesc");
				return {
					key: name,
					text: "Concepto: " + name
				};
			}.bind(this)));
			oBinding.sort(aGroups);
		},
		_handleFIltersTable: function() {
			var oFilters = [],
				oTable = this.byId("detailTeminal"),
				oBinding = oTable.getBinding("items"),
				oTab = this.getView().byId("idIconTabBar"),
				vKey = oTab.getSelectedKey(),
				oObject = this.getView().getModel().getObject("/" + this.sObjectId);
			oFilters.push(new sap.ui.model.Filter("Original", sap.ui.model.FilterOperator.EQ, vKey === "org" ? true : false));
			oBinding.filter(oFilters);
			if (vKey === "org" && oObject.StatusHardTotal === "A") {
				this.getView().byId("idHardTotal").setText("Hard Total: TEMPORAL");
			} else if (vKey === "act" && oObject.StatusHardTotal === "A") {
				this.getView().byId("idHardTotal").setText("Hard Total: " + oObject.DescStatusHardTotal);
			}
		},
		onFilterSelectTab: function(oEvent) {
			this._handleFIltersTable();
		},
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
				history.go(-1);
			} else {
				oCrossAppNavigator.toExternal({
					target: {
						shellHash: "#Shell-home"
					}
				});
			}
		},
		onBackPress: function(oEvent) {
			var bReplace = !Device.system.phone;
			var spath = this.sObjectId.replace(/Positiontpv/g, "Header").replace(/,Workstationid='[0-9]+'/, "");
			this.getRouter().navTo("object", {
				objectId: spath
			}, bReplace);
		},
		onCollapseAll: function() {
			var oSmartTable = this.byId("SmartTable");
			var oAnalyticalTable = oSmartTable.getTable();

			// Verifica si la tabla interna es del tipo AnalyticalTable
			if (oAnalyticalTable instanceof sap.ui.table.AnalyticalTable) {
				oAnalyticalTable.collapseAll();
			}
		},

		onExpandAll: function() {
			var oTable = this.byId("SmartTable");
			var oAnalyticalTable = oTable.getTable();
			// Verifica si la tabla interna es del tipo AnalyticalTable
			if (oAnalyticalTable instanceof sap.ui.table.AnalyticalTable) {
				oAnalyticalTable.expandAll();
			}
		},
		onShowTrxDesc: function(applyFilter) {
			/*this.applyFilterFlag = applyFilter;
			var oSmartTable = this.getView().byId("SmartTable");
			oSmartTable.rebindTable();*/
			var oFilters = [],
				oTable = this.byId("detailTeminal"),
				oBinding = oTable.getBinding("items"),
				oTab = this.getView().byId("idIconTabBar"),
				vKey = oTab.getSelectedKey();
			if (!applyFilter) {
				oFilters.push(new sap.ui.model.Filter("Original", sap.ui.model.FilterOperator.EQ, vKey === "org" ? true : false));
				oBinding.filter(oFilters);
			} else {
				oFilters.push(new sap.ui.model.Filter("Descvalue", sap.ui.model.FilterOperator.NE, 0));
				oFilters.push(new sap.ui.model.Filter("Original", sap.ui.model.FilterOperator.EQ, vKey === "org" ? true : false));
				oBinding.filter(oFilters);
			}
		},
		// Función de navegación
		onNavigateToOtherView: function(oEvent) {
			var sObject = "";
			var cadenaId = oEvent.getParameters().id;
			var index1 = cadenaId.lastIndexOf("-");
			var Id = cadenaId.substring(index1 + 1);
			if (Id === "ForzTerm") {
				sObject = "zforzterm";
			} else {
				sObject = "zcierrecentro";
			}
			var ObjTpv = this.getOwnerComponent().getModel().getObject("/" + this.sObjectId);
			sap.ui.getCore().setModel(new JSONModel({
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate())),
				Workstationid: ObjTpv.Workstationid
			}), "navObject");
			if (sap.ushell.Container && (ObjTpv.Auditbusinessdaydate !== "" && ObjTpv.Retailstoreid !== "" && ObjTpv.Workstationid !== "")) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: sObject,
							action: "manage"
						},
						params: {
							Retailstoreid: ObjTpv.Retailstoreid,
							Workstationid: ObjTpv.Workstationid,
							Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
								ObjTpv.Auditbusinessdaydate
								.getDate())),
							Businessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
								ObjTpv.Auditbusinessdaydate
								.getDate()))
						}
					});
			}
		}

	});
});