sap.ui.controller("zcargestauditv2.ext.controller.ListReportExt", {

	rDateHoy: {
		init: null,
		end: null
	},
	rDatePend: {
		typeErr: null
	},

	onInit: function(oEvent) {

		this.getView().setBusy(true);
		this._customModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCAR_CDS_SB_AUDIT_HEAD/", true);
		this._customModel.setSizeLimit(9999);
		this.gResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
		this.gDataReceived = false;
		//ASEASE
		/*var sFiltrosGuardados = this._getFiltersStorage();//sessionStorage.getItem("misFiltrosGTrx");

		if (sFiltrosGuardados) {

			//var oFilterData = JSON.parse(sFiltrosGuardados);
			var oSmartFilterBar = this.byId("listReportFilter");

			// Aplicar los filtros recuperados al SmartFilterBar
			oSmartFilterBar.setFilterData(sFiltrosGuardados);

			// Ejecutar el filtrado automáticamente
			this._triggerSearch();

		}*/

	},
	onBeforeRendering: function(oControl) {
		debugger;
	},
	onListNavigationExtension: function(oEvent, oBindingContext, bReplace) {
		/*zconsultrx-manage&/Head(Retailstoreid='10001',Businessdaydate=datetime'2024-06-12T00%253A00%253A00',Transindex=1,Transnumber='800',Workstationid='100',IsActiveEntity=true)*/
		var
			oPropSelected = oEvent.getParameter("listItem").getBindingContext().getProperty(),
			vRetailstoreid = oPropSelected.Retailstoreid,
			vDate = oPropSelected.Businessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%3A00%3A00"),
			//vDate = oPropSelected.Businessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%253A00%253A00")
			// OLD
			vRoute = "Head(Retailstoreid='" + vRetailstoreid.padStart(10, "0") +
			"',Businessdaydate=datetime'" + vDate +
			"',Transindex=" + oPropSelected.Transindex + ",Transnumber='" + oPropSelected.TransnumberView.replace(/^0+/, '') +
			"',Workstationid='" + oPropSelected.WorkstationidView.replace(/^0+/, '') + "',IsActiveEntity=true)",
			//oModel = this.getView().getModel(),
			//oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCAR_SB_CDS_TRANS_HEAD/", true);
			oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCAR_SB_CDS_TRANS_HEAD_V2/", true);

		var oFilters = [
			new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, vRetailstoreid.padStart(10, "0")),
			new sap.ui.model.Filter("Businessdaydate", sap.ui.model.FilterOperator.EQ, oPropSelected.Businessdaydate),
			new sap.ui.model.Filter("Transindex", sap.ui.model.FilterOperator.EQ, oPropSelected.Transindex)
		];

		//ASE INI
		var oFilterData = this.byId("listReportFilter").getFilterData();
		sessionStorage.setItem("misFiltrosGTrx", JSON.stringify(oFilterData));
		sessionStorage.setItem("misFiltrosGTrxTime", new Date());
		//ASE END

		this._onNavigateWithoutDraft(
			oPropSelected.Retailstoreid,
			vDate,
			oPropSelected.Transindex,
			oPropSelected.Transnumber.replace(/^0+/, ''),
			oPropSelected.Workstationid.replace(/^0+/, ''));
		/*oModel.read("/Head", {
			filters: oFilters,
			urlParameters: {
				"$expand": "DraftAdministrativeData"
			},
			success: function(data, resp) {
				debugger;
				var isActive = true,
					vUserDraft = "",
					vUserLogin = sap.ushell.Container.getService("UserInfo").getUser().getId(),
					vFullNameLogin = sap.ushell.Container.getService("UserInfo").getUser().getFullName();
				data.results.forEach(function(item) {
					if (item.DraftAdministrativeData) {
						isActive = false;
						vUserDraft = item.DraftAdministrativeData.CreatedByUser;
					}
				});
				if (vUserDraft === vUserLogin || vUserDraft === "") {
					this._onNavigate(
						data.results[0].Retailstoreid,
						vDate,
						data.results[0].Transindex,
						data.results[0].Transnumber,
						data.results[0].Workstationid,
						isActive);
				} else {
					sap.m.MessageBox.alert("La transacción esta siendo editada por usuario: " + vUserDraft + ", ¿Desea visualizar?", {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function(sAction) {
							if (sAction === "OK") {
								this._onNavigate(
									data.results[0].Retailstoreid,
									vDate,
									data.results[0].Transindex,
									data.results[0].Transnumber,
									data.results[0].Workstationid,
									!isActive);
							}
						}.bind(this),
						dependentOn: this.getView()
					});
				}
			}.bind(this)

		});*/
		/*if (sap.ushell.Container) {
			sap.ushell.Container
				.getService("CrossApplicationNavigation")
				.toExternal({
					target: {
						semanticObject: "zconsultrx",
						action: "manage"
					},
					appSpecificRoute: vRoute
				});
		}*/
		return true;
	},
	_onNavigateWithoutDraft: function(pStoreid, pDate, pIndex, pTransNumber, pWorkstation) {
		var vRoute = "Head/Head(Retailstoreid='" + pStoreid +
			"',Businessdaydate=datetime'" + pDate +
			"',Transindex=" + pIndex + ",Transnumber='" + pTransNumber +
			"',Workstationid='" + pWorkstation + "')";
		// var vRoute = "Head/Head(Retailstoreid='" + pStoreid +
		// "',Businessdaydate=datetime'" + pDate +
		// "',Transindex=" + pIndex   + ")";
		if (sap.ushell.Container) {
			sap.ushell.Container
				.getService("CrossApplicationNavigation")
				.toExternal({
					target: {
						semanticObject: "zconsultrx",
						action: "manage"
					},
					appSpecificRoute: vRoute
				});
		}
	},

	_onNavigate: function(pStoreid, pDate, pIndex, pTransNumber, pWorkstation, pActive) {
		var vRoute = "Head(Retailstoreid='" + pStoreid.padStart(10, "0") +
			"',Businessdaydate=datetime'" + pDate +
			"',Transindex=" + pIndex + ",Transnumber='" + pTransNumber +
			"',Workstationid='" + pWorkstation + "',IsActiveEntity=" + pActive + ")";

		if (sap.ushell.Container) {
			sap.ushell.Container
				.getService("CrossApplicationNavigation")
				.toExternal({
					target: {
						semanticObject: "zconsultrx",
						action: "manage"
					},
					appSpecificRoute: vRoute
				});
		}
	},
	onBeforeRendering: function(oEvent) {},

	onAfterRendering: function(oEvent) {
		var
			sTable = this.getView().byId("responsiveTable"),
			oListReport = this.getView().byId("responsiveTable").getParent();
		sTable.setMode("MultiSelect");
		//sTable.getParent().setEnableAutoBinding(true);
		/*this.byId("listReportFilter-btnGo").firePress();*/
		this.getView().byId("responsiveTable").attachSelectionChange(function(oEvnet) {

		});
		this._getUrlParameters();
		sTable.getParent().attachBeforeRebindTable(function(oEvent) {
			var oTable = this.getView().byId("responsiveTable"),
				oListReport = oTable.getParent(),
				oTabHeader = oListReport.getItems()[0],
				vKeySelectedStatus = oTabHeader.getSelectedKey(),
				mBindingParams = oEvent.getParameter("bindingParams"),
				oModel = this.getView().getModel(),
				vBusDate = null,
				ofilter = [],
				vChangeTaskFilter = false,
				oFilterRetailStore;

			if (!this.gDataReceived) {
				mBindingParams.events = {
					"dataReceived": function(oEvent) {
						var aReceivedData = oEvent.getParameter('data');
						this._setValueIndicatorValue();
					}.bind(this)
				};
			}

			if (mBindingParams.filters.length > 0 && !mBindingParams.filters[0]._bMultiFilter) { //Si no es multifilters
				mBindingParams.filters[0] = new sap.ui.model.Filter({
					filters: [
						mBindingParams.filters[0],
						new sap.ui.model.Filter(
							"Status",
							sap.ui.model.FilterOperator.EQ,
							vKeySelectedStatus === 'A' ? 'I' : vKeySelectedStatus
						)
					]
				});
				mBindingParams.filters[0].bAnd = true;
			} else {
				mBindingParams.filters[0].aFilters.push(new sap.ui.model.Filter(
					"Status",
					sap.ui.model.FilterOperator.EQ,
					vKeySelectedStatus === 'A' ? 'I' : vKeySelectedStatus
				));
			}

			var oFunctionChangeFilter = function(item) {
				var oItem = Object.assign({}, item);
				if (item.sPath && item.sPath === "Auditbusinessdaydate") {
					/*item.oValue1 = item.oValue1 ? new Date(item.oValue1.getTime() - item.oValue1.getTimezoneOffset() * 60000) : item.oValue1;
					item.oValue2 = item.oValue2 ? new Date(item.oValue2.getTime() - item.oValue2.getTimezoneOffset() * 60000) : item.oValue2;*/
					ofilter.push(item);
				}
				/*if (item.sPath && item.sPath === "Taskerror" && item.oValue1 !== "" && item.oValue1 !== null) { 
					vChangeTaskFilter = true;
					item.sOperator = item.sOperator === "EQ" ? sap.ui.model.FilterOperator.Contains : item.sOperator === "NE" ? sap.ui.model.FilterOperator
						.NotContains : item.sOperator;
				}*/
				if (item.sPath === "Retailstoreid") {
					var oItemChange = Object.assign({}, item);
					oItemChange.oValue1 = oItemChange.oValue1.padStart(10, "0");
					oItemChange.oValue2 = oItemChange.oValue2 ? oItemChange.oValue2.padStart(10, "0") : oItemChange.oValue2;
					oItemChange.sPath = "Retailstoreid";
					ofilter.push(oItemChange);

				}
				if (item.sPath === "WorkstationidView") {
					oItemChange = Object.assign({}, item);
					oItemChange.sPath = "Workstationid";
					oItemChange.oValue1 = oItemChange.oValue1.padStart(10, "0");
					oItemChange.oValue2 = oItemChange.oValue2 ? oItemChange.oValue2.padStart(10, "0") : oItemChange.oValue2;
					ofilter.push(oItemChange);
				}
				if ((!ofilter || !vChangeTaskFilter) && item.aFilters) {
					oFunctionChangeFilter(item.aFilters);
				}
				if (item.length && item.length > 0) {
					item.forEach(function(item2) {
						oFunctionChangeFilter(item2);
					}.bind(this));
				}
			}.bind(this);
			mBindingParams.filters.forEach(function(item) {
				oFunctionChangeFilter(item);
			}.bind(this));
			this.gFilters = ofilter;
		}.bind(this), this);
		oListReport.removeItem();
		oListReport.insertItem(new sap.m.IconTabHeader({
			id: "iconStatusHeader",
			selectedKey: "E",
			items: [
				new sap.m.IconTabFilter({
					key: "E",
					text: this.gResourceBundle.getText("txtErrores") + " {modelKPI>/countError}",
					iconColor: "Negative"

				}),
				new sap.m.IconTabFilter({
					key: "B",
					text: this.gResourceBundle.getText("txtErrorBaja") + " {modelKPI>/countBaja}",
					iconColor: "Negative"

				}),
				new sap.m.IconTabFilter({
					key: "C",
					text: this.gResourceBundle.getText("txtCorr") + " {modelKPI>/countCorr}",
					iconColor: "Positive"
				}),
				new sap.m.IconTabFilter({
					key: "I",
					text: this.gResourceBundle.getText("txtWarni") + " {modelKPI>/countAlert}",
					iconColor: "Critical"
				})
			],
			select: function(oEvent) {
				var sButtonGo = this.getView().byId("listReportFilter-btnGo");
				this.gSelectedTab = true;
				sButtonGo.firePress();
			}.bind(this)
		}), 0);
		this.getView().setModel(new sap.ui.model.json.JSONModel({
			countError: 0,
			countCorr: 0,
			countAlert: 0
		}), "modelKPI");
		this.getView().byId("ActionHead1button").setIcon("sap-icon://customer-order-entry");

	},
	_setValueIndicatorValue: function() {
		var oTable = this.getView().byId("responsiveTable"),
			oListReport = oTable.getParent();
		var tmpModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZCAR_CDS_SB_AUDIT_HEAD/", true);
		tmpModel.setSizeLimit(9999);
		tmpModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		tmpModel.setUseBatch(true);
		this.getView().setModel(tmpModel, "tmpModel");
		tmpModel.setDeferredGroups(["foo"]);
		var oModelKPI = this.getView().getModel("modelKPI");
		if (!this.gSelectedTab) {
			oModelKPI.setProperty("/countError", 0);
			oModelKPI.setProperty("/countBaja", 0);
			oModelKPI.setProperty("/countCorr", 0);
			oModelKPI.setProperty("/countAlert", 0);
		}

		var mParameters = {
			groupId: "foo",
			filters: [this.gFilters],
			urlParameters: {
				"$top": 9999
			},
			success: function(data) {
				var lv_count = 0;
				if (data.results && data.results.length > 0 && data.results[0].CountError) {
					data.results.forEach(function(data) {
						lv_count = lv_count + data.CountError;
					});
					oModelKPI.setProperty("/countError", lv_count);
				}
				if (data.results && data.results.length > 0 && data.results[0].CountInfo) {
					data.results.forEach(function(data) {
						lv_count = lv_count + data.CountInfo;
					});
					oModelKPI.setProperty("/countAlert", lv_count);
				}
				if (data.results && data.results.length > 0 && data.results[0].CountCorr) {
					data.results.forEach(function(data) {
						lv_count = lv_count + data.CountCorr
					});
					oModelKPI.setProperty("/countCorr", lv_count);
				}
				if (data.results && data.results.length > 0 && data.results[0].CountBaja) {
					data.results.forEach(function(data) {
						lv_count = lv_count + data.CountBaja
					});
					oModelKPI.setProperty("/countBaja", lv_count);
				}

			}.bind(this)
		};

		if (!this.gSelectedTab) {
			tmpModel.read("/Counterror", mParameters);
			tmpModel.read("/Countinfo", mParameters);
			tmpModel.read("/Countcorr", mParameters);
			tmpModel.read("/Countbaja", mParameters);
			tmpModel.submitChanges(mParameters);
		}
		this.gSelectedTab = false;
	},

	onClickActionHead1: function(oEvent) {
		this.getView().byId("responsiveTable").removeSelections();
	},
	onNavegateActionHead2: function(oEvent) { // Valores de los filtros que quieres pasar
		var oSmartFilter = this.getView().byId("listReportFilter").getFilterData(),
			oModel = this.getView().getModel(),
			sTable = this.getView().byId("responsiveTable"),
			oSelectContext = sTable.getSelectedContexts();
		if (oSelectContext.length === 1) {
			let vPath = oSelectContext[0].getPath();
			oModel.read(vPath, {
				success: function(data) {
					// Navegación utilizando CrossAppNavigation
					var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
					if (sap.ushell.Container) {
						sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({
							Retailstoreid: data.Retailstoreid,
							Businessdaydate: data.beginFecha,
							WorkstationidView: data.Workstationid.replace(/^(0+)/g, '').padStart(4, "0"),
							TransnumberView: data.Transnumber.replace(/^(0+)/g, '').padStart(4, "0")
						}), "modelNavVtt")
						sap.ushell.Container
							.getService("CrossApplicationNavigation")
							.toExternal({
								target: {
									semanticObject: "zaltacorvtt",
									action: "manage"
								},
								params: {
									preferredMode: "create"
								}
							});
					}
				}.bind(this)
			});
		} else {
			sap.m.MessageBox.alert(this.gResourceBundle.getText("txtSeleOne"))
		}

		// oCrossAppNavigator.toExternal({
		// 	target: {
		// 		shellHash: sTargetApp
		// 	}
		// });
	},
	onNavegateActionHead3: function(oEvent) {
		// Navegación utilizando CrossAppNavigation
		var oFilterData = this.byId("listReportFilter").getFilterData();
		var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation"),
			oParam = {
				Auditbusinessdaydate: new Date(Date.UTC(oFilterData.Auditbusinessdaydate.getFullYear(), oFilterData.Auditbusinessdaydate.getMonth(),
					oFilterData.Auditbusinessdaydate
					.getDate())),
				preferredMode: "create"
			};
		if (sap.ushell.Container) {

			sessionStorage.setItem("misFiltrosGTrx", JSON.stringify(oFilterData));
			sessionStorage.setItem("misFiltrosGTrxTime", new Date());
			for (var prop in oFilterData) {
				if (prop === "Retailstoreid") {
					var oItems = oFilterData[prop].items,
						oFilter = Object.groupBy(oItems, ({
							key
						}) => key),
						vCount = 0,
						vStoreid = "";
					for (var store in oFilter) {
						vStoreid = vStoreid === "" ? store.toString() : vStoreid;
						vCount = vCount + 1
					}
					if (vCount === 1) {
						oParam.Retailstoreid = vStoreid;
					}
				}
			}
			sap.ushell.Container
				.getService("CrossApplicationNavigation")
				.toExternal({
					target: {
						semanticObject: "zobservaudit",
						action: "manage"
					},
					params: oParam
				});
		}
	},
	//ASEASE
	_triggerSearch: function() {
		// Obtener la instancia del SmartFilterBar
		var oSmartFilterBar = this.byId("listReportFilter");

		// Ejecuta la búsqueda automáticamente
		oSmartFilterBar.search();
	},
	_getUrlParameters: function(pFilters) {
		/*this.getView().setBusy(true);*/
		var oCurrentApp = sap.ushell.services.AppConfiguration.getCurrentApplication(),
			vHash = oCurrentApp.sFixedShellHash,
			oHistory = sap.ui.core.routing.History.getInstance(),
			oListHist = oHistory.aHistory,
			vClearFilterStorage = oListHist.length > 2 ? true : false,
			sFiltrosGuardados = this._getFiltersStorage(vClearFilterStorage);
		setTimeout(function() {
			var //vUrl = window.location.href,
				vDate = new Date(),
				vDiaToSeg = 1000 * 60 * 60 * 24 * 1,
				vTime = vDate.getTime(),
				res = vTime - vDiaToSeg,
				vDateAyer = new Date(res).toString(),
				vFind = false,
				//aUrl = vUrl.split("?"),
				oFiltersBar = this.getView().byId("listReportFilter"),
				vFilterContain = oFiltersBar.getFilterData() && oFiltersBar.getFilterData().Auditbusinessdaydate ? true : false,
				/*oDefaultFilter = {
					"Businessdaydate": {
						"high": vDate,
						"low": vDate
					}
				},
				oDefaultFilterAyer = {
					"Businessdaydate": {
						"high": vDateAyer,
						"low": vDateAyer
					}
				}*/
				oDefaultFilter = {
					"Auditbusinessdaydate": vDate
				},
				oDefaultFilterAyer = {
					"Auditbusinessdaydate": vDateAyer
				};
			this.getView().setBusy(false);
			/*aUrl.forEach(function(item) {
				if (item.includes("zgestionhoy")) {
					vFind = true;
				}
			});*/
			vFind = vHash.includes("zgestionhoy") ? true : false;

			if (sFiltrosGuardados && !vFilterContain && !vClearFilterStorage) {
				oFiltersBar.setFilterData(sFiltrosGuardados);
			} else if (!vFilterContain) {
				if (vFind) {
					oFiltersBar.setFilterData(oDefaultFilter);
				} else {
					oFiltersBar.setFilterData(oDefaultFilterAyer);
				}
			}

			if (vFind) {
				var oFilterItems = oFiltersBar.getAllFilterItems();
				oFilterItems.forEach(function(item) {
					var oControl = item.getControl(),
						vName = item.getName();
					if (vName === "Auditbusinessdaydate") {
						oControl.setEnabled(false);
					}

				})
			}

			this.byId("listReportFilter-btnGo").firePress();
		}.bind(this), 1000);

	},
	_getFiltersStorage: function(pClearFilter) {
		var sFiltrosGuardados = sessionStorage.getItem("misFiltrosGTrx"),
			sFiltersDateTime = sessionStorage.getItem("misFiltrosGTrxTime"),
			vDateDif = sFiltersDateTime ? (new Date() - new Date(sFiltersDateTime)) / 1000 / 60 : null;
		if (vDateDif > 30 || !vDateDif || pClearFilter) {
			sFiltrosGuardados = null;
			sessionStorage.removeItem("misFiltrosGTrx");
			sessionStorage.removeItem("misFiltrosGTrxTime");
		} else {
			sFiltrosGuardados = JSON.parse(sFiltrosGuardados);
			if (sFiltrosGuardados.Businessdaydate) {
				sFiltrosGuardados.Businessdaydate = new Date(sFiltrosGuardados.Businessdaydate);
			}

		}
		return sFiltrosGuardados;

	}

});