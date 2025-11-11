/*global location */
sap.ui.define([
	"app/inetum/ZCARDESCENTRO/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"app/inetum/ZCARDESCENTRO/model/formatter",
	"sap/ui/Device",
	"sap/ui/core/routing/History",
	"sap/ui/util/Storage",
	'sap/ui/model/Sorter'
], function(BaseController, JSONModel, formatter, Device, History, Storage, Sorter) {
	"use strict";

	return BaseController.extend("app.inetum.ZCARDESCENTRO.controller.DetailInfo", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		sObjectId: "",
		// Dentro del método onInit de tu controlador
		onInit: function() {

			this.getRouter().getRoute("object1").attachPatternMatched(this._onObjectMatched, this);
			// Crear una instancia del modelo OData
			//var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZCAR_CDS_HT_TLOG_QRY_CDS", true);
			/*var oModel = this.getOwnerComponent().getModel("Hardtotal");
			// Establecer el modelo en tu vista
			this.getView().setModel(oModel);*/

			// // Obtener los datos de la entidad en el evento 'MetadataLoaded' del modelo
			// oModel.attachMetadataLoaded(function() {
			// 	// Path a la entidad en el servicio OData
			// //	var sPath = "/ZCAR_CDS_HT_TLOG_QRY";
			// 	// Realizar la solicitud al servicio OData para obtener los datos
			// 	oModel.read(sPath, {
			// 		success: function(oData, oResponse) {
			// 			// Los datos se han leído correctamente
			// 			var a = oData;
			// 		},
			// 		error: function(oError) {
			// 			// Se produjo un error al leer los datos
			// 			var o = oError;
			// 		}
			// 	});
			// });

		},
		onBeforeRebindTable: function(oSource) {
			var oColumns = this.getView().byId("SmartTable").getTable().getColumns();
			if (oSource.getParameters().id.endsWith("SmartTable")) {
				var binding = oSource.getParameter("bindingParams");

				if (this.sObjectId) {
					var ObjTpv = this.getOwnerComponent().getModel().getObject("/" + this.sObjectId);
					if (ObjTpv) {
						this.getView().byId("idHardTotal").setText("Hard Total: " + (ObjTpv.DescStatusHardTotal ? ObjTpv.DescStatusHardTotal :
							'SIN HARDTOTAL'));
						var tpvDate = ObjTpv.Auditbusinessdaydate;
						var year = tpvDate.getFullYear();
						var month = (tpvDate.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 al mes ya que en JavaScript los meses van de 0 a 11
						var day = tpvDate.getDate().toString().padStart(2, '0');
						var formatDate = year + month + day;

						/*if (binding.filters[0]) {
							binding.filters[0].oValue1 = ObjTpv.Retailstoreid;
						}*/
						binding.filters.push(new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, ObjTpv.Retailstoreid));
						binding.filters.push(new sap.ui.model.Filter("Workstationid", sap.ui.model.FilterOperator.EQ, ObjTpv.Workstationid));
						//binding.filters.push(new sap.ui.model.Filter("Businessdaydate", sap.ui.model.FilterOperator.EQ, formatDate));
						binding.filters.push(new sap.ui.model.Filter("Auditbusinessdaydate", sap.ui.model.FilterOperator.EQ, ObjTpv.Auditbusinessdaydate));
						if (this.applyFilterFlag) {
							binding.filters.push(new sap.ui.model.Filter("Descvalue", sap.ui.model.FilterOperator.GT, 0));
						}
						//this.getView().byId(oSource.getParameters().id)._oTable.getBinding("rows").filter(binding.filters);
						/*var oTable = this.getView().byId("SmartTable").getTable(); //this.getView().byId("application-Test-url-component---detailInfo--SmartTable-ui5table");
						oTable.setSelectionMode("Single");
						if (oTable.getBinding("rows")) {
							oTable.getBinding("rows").filter(binding.filters);
						}*/

					} else {
						this.getRouter().navTo("master");
					}

				}
			}
			//oColumns.forEach(function(item) {
			/*if(item.getId().includes("ConceptoCar") || item.getId().includes("OperacionesMpagoCAR")  || item.getId().includes("TotalMpagoMedioPagoCAR") || item.getId().includes("TotalMpagoMedioPagoCAR") ){
				item.setWidth("10em");
			}*/
			//item.setWidth("8em");
			//});

		},
		_onObjectMatched: function(oEvent) {
			var oModel = this.getView().getModel(),
				oObject;
			this.getView().byId("SmartTable").getTable().setGrowingThreshold(200);
			this.sObjectId = oEvent.getParameter("arguments").objectDetailId;
			var oSmartTable = this.getView().byId("SmartTable");
			oObject = oModel.getObject("/" + this.sObjectId);
			if (oObject) {
				oSmartTable.rebindTable(true);
				this.getView().setModel(new JSONModel(this.getModel().getObject("/" + this.sObjectId)), "Tpv");

				oSmartTable._oCurrentVariant = {
					"group": {
						"groupItems": [{
							"columnKey": "ConceptoCar",
							"operation": "GroupAscending",
							"showIfGrouped": true
						}]
					}
				};
				this.getView().byId("idObjectRangeTrx").setIntro("( " + oObject.Transnumbermin + "-" + oObject.Transnumbermax + " )");
				//this._loadTableDetail();
			} else {
				/*Se ha realizado un navback de otra aplicación*/
				sap.ui.getCore().setModel(new JSONModel({
					object: "/" + this.sObjectId
				}), "navObject");
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
					oModel.read("/Desgtpv", {
						filters: oFilters,
						success: function(data) {
							var oData = data.results;
							this.getView().setModel(new JSONModel(oData), "modelDetail");
							this._handleGroupTable();
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
					text: name
				};
			}.bind(this)));
			oBinding.sort(aGroups);
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
			this.applyFilterFlag = applyFilter;
			var oSmartTable = this.getView().byId("SmartTable");
			oSmartTable.rebindTable();
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
								.getDate()))
						}
					});
			}
		}

	});
});