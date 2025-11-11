/*global location history */
sap.ui.define([
	"app/eci/zcaraltatrx2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/eci/zcaraltatrx2/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/odata/v2/ODataModel"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, ODataModel) {
	"use strict";

	return BaseController.extend("app.eci.zcaraltatrx2.controller.Worklist", {

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
				iOriginalBusyDelay,
				oTable = this.byId("table");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
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

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			oTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});
			// Add the worklist page to the flp routing history
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("worklistViewTitle"),
				icon: "sap-icon://table-view",
				intent: "#Altadetransacciones-display"
			}, true);

		},
		onAfterRendering: function(oEvent) {
			var oModel = this.getView().getModel(),
				oFiltersBar = this.getView().byId("smartFilterBar");
			this.getView().getModel().setSizeLimit(9999);
			this.getView().setBusy(true);
			this._oDelegateEvent = {
				"onAfterRendering": function() {
					this._setFiters();
				}.bind(this)
			};
			oFiltersBar.addEventDelegate(this._oDelegateEvent, this);
			oModel.read("/FormpagCard", {
				success: function(data, resp) {
					sap.ui.getCore().setModel(new JSONModel(data.results), "FormpagCard");
					this.getView().setBusy(false);
				}.bind(this),
				error: function(error) {

				}.bind(this)
			});
		},
		_setFiters: function() {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				vDirection = oHistory ? oHistory.getDirection() : null,
				oFiltersBar = this.getView().byId("smartFilterBar"),
				oFltersCache;
			if (vDirection && vDirection === 'Backwards') {
				oFltersCache = this._getFiltersStorage(false);
				if (oFltersCache) {
					oFiltersBar.setFilterData(oFltersCache);
					oFiltersBar.fireSearch();
				}
			} else {
				this._getFiltersStorage(true);
			}

		},
		_getFiltersStorage: function(pClearFilter) {
			var sFiltrosGuardados = sessionStorage.getItem("filtrosAltaTrx");
			if (pClearFilter) {
				sFiltrosGuardados = null;
				sessionStorage.removeItem("misFiltrosGTrx");
			} else {
				sFiltrosGuardados = JSON.parse(sFiltrosGuardados);
				if (sFiltrosGuardados.Businessdaydate) {
					sFiltrosGuardados.Businessdaydate = new Date(sFiltrosGuardados.Businessdaydate);
				}
				if (sFiltrosGuardados.Auditbusinessdaydate) {
					sFiltrosGuardados.Auditbusinessdaydate = new Date(sFiltrosGuardados.Auditbusinessdaydate);
				}

			}
			return sFiltrosGuardados;

		},

		_onObjectMatched: function(oEvent) {
			//this.getView().byId("smartFilterBar").fireSearch();
			this._getParametersUrlFilters();
			this._setFilterDataCreate();
		},
		_getParametersUrlFilters: function() {
			this.getView().byId("smartFilterBar").attachInitialise(function(oEvent) {
					var vUrl = window.location.href;
					var vPiece = vUrl.split("?");
					var vSetFilters = false;
					vPiece.forEach(function(param) {
						var oParams = param.split("&");
						var oGroupItems = oEvent.getSource().getFilterGroupItems();
						$.each(oParams, function(key, value) {
							var OParameter = value.split("="),
								vKey = OParameter[0],
								vValue = OParameter[1];
							if (vValue) {
								oGroupItems.forEach(function(item) {
									var oControl = item.getControl(),
										oMetadata = oControl.getMetadata();
									if (oMetadata._sClassName.includes("Date") && oControl.getId().includes(vKey)) {
										oControl.setDateValue(new Date(vValue.substr(0, 10)));
										vSetFilters = true;
									} else if (oControl.getId().includes(vKey)) {
										oControl.setValue(vValue);
										vSetFilters = true;
									}
								});
							}

						});
					}.bind(this))
					if (vSetFilters) {
						this.getView().byId("smartFilterBar").fireSearch()
					}
				}.bind(this))
				/*this.getView().byId("smartFilterBar").attachInitialise(function(oEvent) {
					var vUrl = window.location.href;
					var vPiece = vUrl.split("?");
					var oParams = vPiece[1].split("&");
					var oGroupItems = oEvent.getSource().getFilterGroupItems();
					$.each(oParams, function(key, value) {
						var OParameter = value.split("="),
							vKey = OParameter[0],
							vValue = OParameter[1];
						oGroupItems.forEach(function(item){
							var oControl = item.getControl(),
								oMetadata = oControl.getMetadata();
							if(oMetadata._sClassName.includes("Date") && oControl.getId().includes(vKey)){
								oControl.setDateValue(new Date(vValue.substr(0,10)));
							}else if(oControl.getId().includes(vKey)){
								oControl.setValue(vValue);
							}
						});
					});
				}.bind(this))*/

		},
		_setFilterDataCreate: function() {
			var oFilter = this.getView().byId("smartFilterBar"),
				oDataCreate = sap.ui.getCore().getModel("modelCreateTrx") ? sap.ui.getCore().getModel("modelCreateTrx").getData() : {};
			if (oDataCreate.Retailstoreid) {
				oFilter.setFilterData(oDataCreate);
				oFilter.fireSearch();
				setTimeout(function() {
					sap.ui.getCore().setModel(new JSONModel(), "modelCreateTrx");
				}.bind(this), 100);

			}

		},
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		onUpdateFinished: function(oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
				oTable = oEvent.getSource(),
				iTotalItems = oEvent.getParameter("total");
			// only update the counter if the length is final and
			// the table is not empty
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
			} else {
				sTitle = this.getResourceBundle().getText("worklistTableTitle");
			}
			this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function(oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("worklistView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});
			oShareDialog.open();
		},

		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var aTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					aTableSearchState = [new Filter("Workstationid", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(aTableSearchState);
			}

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function() {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
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
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("Transactions")
			});
		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
		 * @private
		 */
		_applySearch: function(aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		},

		//ACCIONES
		onCreate: function(oEvent) {
			/*this.getView().setBusy(true);
			this.getView().getModel().callFunction("/createInstance", {
				method: "POST",
				urlParameters: {
					ResultIsActiveEntity: false,
					Operatorid: ""
				},
				success: function(data, resp) {
					if (resp.statusCode.startsWith("2") && data.Transactions !== "") {
						var mBindPath = "Head(Transactions='" + encodeURIComponent(data.Transactions) + "',IsActiveEntity=false)";
						this.getRouter().navTo("object", {
							objectId: mBindPath,
							actionC: "C"
						});
					} else {
						sap.m.MessageBox.error("Error creando el registros de borrador");
					}
					this.getView().setBusy(false);
				}.bind(this),
				error: function(error) {
					sap.m.MessageBox.error("Error creando el registros de borrador");
					this.getView().setBusy(false);
				}.bind(this)
			});*/
			this.getRouter().navTo("object", {
				objectId: 'C',
				actionC: "C"
			});
		},
		onBeforeRebindTable: function(oEvent) {
			/*	var mBindingParams = oEvent.getParameter("bindingParams");
				mBindingParams.filters.push(
					new sap.ui.model.Filter(
						"IsActiveEntity",
						sap.ui.model.FilterOperator.EQ,
						true
					)
				);
				mBindingParams.filters.push(
					new sap.ui.model.Filter(
						"IsActiveEntity",
						sap.ui.model.FilterOperator.EQ,
						false
					)
				);*/
		},
		_onNavigate: function(pStoreid, pDate, pIndex, pTransNumber, pWorkstation, pActive) {
			var vRoute = "Head(Retailstoreid='" + pStoreid.padStart(10, "0") +
				"',Businessdaydate=datetime'" + pDate +
				"',Transindex=" + pIndex + ",Transnumber='" + pTransNumber +
				"',Workstationid='" + pWorkstation + "',IsActiveEntity=" + pActive + ")";
			if (sap.ushell.Container) {
				var oFilterData = this.byId("smartFilterBar").getFilterData();
				sessionStorage.setItem("filtrosAltaTrx", JSON.stringify(oFilterData));
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
		onRowSelectTable1: function(oEvent) {

			var oBindContext = oEvent.getSource().getBindingContext(), //oEvent.getParameter("listItem").getBindingContext(),
				oPath = oBindContext.getPath().substring(1, oBindContext.getPath().length),
				oNav = sap.ushell.Container.getService("CrossApplicationNavigation"),
				oModel = this.getModel();
			var oFilterData = this.byId("smartFilterBar").getFilterData();
			sessionStorage.setItem("filtrosAltaTrx", JSON.stringify(oFilterData));
			this.getView().byId("table").removeSelections();
			this.getView().setBusy(true);
			oModel.read("/" + oPath, {
				success: function(data, resp) {
					this.getView().setBusy(false);
					var vRetailstoreid = data.Retailstoreid,
						vDate = data.Businessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%3A00%3A00"),
						vTransindext = data.Transindex,
						oshellHash =
						"#zconsultrx-manage&/Head(Retailstoreid='" + vRetailstoreid + "',Businessdaydate=datetime'" + vDate + "',Transindex=" +
						vTransindext +
						",IsActiveEntity=true)";
					oNav.toExternal({
						target: {
							shellHash: oshellHash
						}
					});
				}.bind(this),
				error: function(rest) {
					this.getView().setBusy(false);
				}.bind(this)
			});
			/*			if (oBindContext.getPath().split("=")[2].includes("false")) {
							this.getRouter().navTo("object", {
								objectId: oPath,
								actionC: "V"
							});
						} else if (sap.ushell.Container && oNav) {
							this.getView().setBusy(true);
							oModel.read("/" + oPath, {
								success: function(data, resp) {
									this.getView().setBusy(false);
									var vRetailstoreid = data.Retailstoreid,
										vDate = data.Businessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%3A00%3A00"),
										vTransindext = data.Transindex,
										oshellHash =
										"#zconsultrx-manage&/Head(Retailstoreid='" + vRetailstoreid + "',Businessdaydate=datetime'" + vDate + "',Transindex=" +
										vTransindext +
										",IsActiveEntity=true)";
									oNav.toExternal({
										target: {
											shellHash: oshellHash
										}
									});
								}.bind(this),
								error: function(rest) {
									this.getView().setBusy(false);
								}.bind(this)
							});

						}
			*/

		},

		onRowSelectTable2: function(oEvent) {
			var oBindContext = oEvent.getSource().getBindingContext(), //oEvent.getParameter("listItem").getBindingContext(),
				oPath = oBindContext.getPath().substring(1, oBindContext.getPath().length),
				oNav = sap.ushell.Container.getService("CrossApplicationNavigation"),
				oModel = this.getModel();

			this.getView().byId("table").removeSelections();
			this.getView().setBusy(true);

			oModel.read("/" + oPath, {
				success: function(data, resp) {
					this.getView().setBusy(false);
					var vRetailstoreid = data.Retailstoreid,
						vDate = data.Businessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%3A00%3A00"),
						vTransindex = data.Transindex,
						//     oshellHash =
						//     "#zconsultrx-manage&/Head(Retailstoreid='" + vRetailstoreid + "',Businessdaydate=datetime'" + vDate + "',Transindex=" +
						//     vTransindex +
						//     ",IsActiveEntity=true)";
						// oNav.toExternal({
						//     target: {
						//         shellHash: oshellHash
						//     }
						// });

						oModelHead = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCAR_SB_CDS_TRANS_HEAD/", true);
					var oFilters = [
						new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, vRetailstoreid.padStart(10, "0")),
						new sap.ui.model.Filter("Businessdaydate", sap.ui.model.FilterOperator.EQ, data.Businessdaydate),
						new sap.ui.model.Filter("Transindex", sap.ui.model.FilterOperator.EQ, vTransindex)
					];

					oModelHead.read("/Head", {
						filters: oFilters,
						urlParameters: {
							"$expand": "DraftAdministrativeData"
						},
						success: function(data, resp) {
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
												data.results[0].Workstationid, !isActive);
										}
									}.bind(this),
									dependentOn: this.getView()
								});
							}
						}.bind(this),
						error: function(err) {
							this.getView().setBusy(false);
							sap.m.MessageToast.show("Error al leer los datos de la cabecera.");
						}.bind(this)
					});
				}.bind(this),
				error: function(err) {
					this.getView().setBusy(false);
					sap.m.MessageToast.show("Error al leer los datos de la transacción.");
				}.bind(this)
			});

			return true;
		},

		onRowSelectTable: function(oEvent) {
			var oBindContext = oEvent.getSource().getBindingContext(), //oEvent.getParameter("listItem").getBindingContext(),
				oPath = oBindContext.getPath().substring(1, oBindContext.getPath().length),
				oNav = sap.ushell.Container.getService("CrossApplicationNavigation"),
				oModel = this.getModel(),
				oObject = oBindContext.getObject(),
				oSplit = oPath.split("'"),
				vDate = oObject.Auditbusinessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%3A00%3A00");
			var oFilterData = this.byId("smartFilterBar").getFilterData();
			sessionStorage.setItem("filtrosAltaTrx", JSON.stringify(oFilterData));
			this.getView().byId("table").removeSelections();
			this.getView().setBusy(true);
			oModel.read(oBindContext.getPath(), {
				success: function(data) {
					vDate = data.Businessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%3A00%3A00");
					this._onNavigateWithoutDraft(
						data.Retailstoreid,
						vDate,
						data.Transindex,
						data.Transnumber,
						data.Workstationid);
				}.bind(this),
				error: function(resp) {
					this.getView().setBusy(false);
				}.bind(this)
			});

			return true;
		},
		_onNavigateWithoutDraft: function(pStoreid, pDate, pIndex, pTransNumber, pWorkstation) {
			var vRoute = "Head/Head(Retailstoreid='" + pStoreid +
				"',Businessdaydate=datetime'" + pDate +
				"',Transindex=" + pIndex + ",Transnumber='" + pTransNumber +
				"',Workstationid='" + pWorkstation + "')";
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
			this.getView().setBusy(false);
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
		_onActionConfirm: function(pAction) {
			var
				oTable = this.getView().byId("table"),
				oContextSelected = oTable.getSelectedContexts(),
				oModelApp = this.getView().getModel(),
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

			if (oContextSelected.length > 0) {
				let vPath = oTable.getSelectedContexts()[0].getPath(),
					oObject = oTable.getSelectedContexts()[0].getObject(),
					oKeys = {};
				this.getView().setBusy(true);
				oModelApp.read(vPath, {
					success: function(data) {
						this._callFunction(data, mParameters);
						this.getView().setBusy(false);
					}.bind(this),
					error: function(resp) {
						this.getView().setBusy(false);
					}.bind(this)
				})
			}
		},
		_callFunction: function(data, mParameters) {
			var oModel = new ODataModel("/sap/opu/odata/sap/ZCAR_SB_CDS_TRANS_HEAD_V2/", true);
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			oModel.setUseBatch(true);
			oModel.setDeferredGroups(["foo"]);
			oModel.callFunction("/BajaTransaction", {
				method: "POST",
				urlParameters: {
					"Retailstoreid": data.Retailstoreid,
					"Businessdaydate": data.Businessdaydate,
					"Transindex": parseInt(data.Transindex),
					"Transnumber": data.Transnumber,
					"Workstationid": data.Workstationid
				},
				groupId: "foo"
			});
			oModel.submitChanges(mParameters);

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