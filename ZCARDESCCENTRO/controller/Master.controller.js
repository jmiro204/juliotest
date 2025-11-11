/*global history */
sap.ui.define([
	"app/inetum/ZCARDESCENTRO/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	'sap/m/MessageToast',
	"sap/ui/Device",
	"app/inetum/ZCARDESCENTRO/model/formatter",
	"sap/m/MessageBox",
	"sap/ui/util/Storage"
], function(BaseController, JSONModel, History, Filter, FilterOperator, GroupHeaderListItem, MessageToast, Device, formatter, MessageBox,
	Storage) {
	"use strict";
	var StoreDate = new Date();
	return BaseController.extend("app.inetum.ZCARDESCENTRO.controller.Master", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
		 * @public
		 */
		onInit: function() {
			// Control state model
			var oList = this.byId("list"),
				oViewModel = this._createViewModel(),
				// Put down master list's original value for busy indicator delay,
				// so it can be restored later on. Busy handling on the master list is
				// taken care of by the master list itself.
				iOriginalBusyDelay = oList.getBusyIndicatorDelay();

			this._oList = oList;
			// keeps the filter and search state
			this._oListFilterState = {
				aFilter: [],
				aSearch: []
			};

			/*sap.ui.getCore().setModel(new JSONModel({
				object: "/Positiontpv(Retailstoreid='10037',Auditbusinessdaydate=datetime'2025-01-31T00%3A00%3A00',Workstationid='15')"
			}), "navObject");*/

			this.setModel(oViewModel, "masterView");
			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			oList.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for the list
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});

			this.getView().addEventDelegate({
				onBeforeFirstShow: function() {
					this.getOwnerComponent().oListSelector.setBoundMasterList(oList);
				}.bind(this)
			});
			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			this.getRouter().attachBypassed(this.onBypassed, this);

		},
		onAfterRendering: function() {
			this.onCloseDatePicker();
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * After list data is available, this handler method updates the
		 * master list counter and hides the pull to refresh control, if
		 * necessary.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		onUpdateFinished: function(oEvent) {

			var vActual = oEvent.getParameter("actual"),
				vTotal = oEvent.getParameter("total");
			var
			/*oMyStorage = new Storage(Storage.Type.session, "filtersDescCentro"),
				oDataFilter = oMyStorage.get("stored_data"),*/
				oHistory = sap.ui.core.routing.History.getInstance(),
				oListHist = oHistory.aHistory,
				vNavFrom = oListHist[oHistory.iHistoryPosition],
				oModelNav = sap.ui.getCore().getModel("navObject"),
				oModelNavData = oModelNav ? oModelNav.getData() : {},
				vSelected = false;

			if (!this.gTotalStore || (this.gTotalStore && this.gTotalStore === 0)) {
				this.gTotalStore = vTotal;
			}
			this.gTotalStoreTotal = vTotal;
			this.gTotalStoreActual = vActual;

			// update the master list object counter after new data is loaded
			this._updateListItemCount(oEvent.getParameter("total"));
			// hide pull to refresh if necessary
			this.byId("pullToRefresh").hide();

			//this._getDataStoreAsociation(this.gIndexFinished, vActual);

			if (
				(vNavFrom.includes("Shell-home") || vNavFrom === "")
			) {
				this._onMasterMatched();
			} else if (oModelNav && oModelNavData.retailstoreid) {
				this.getView().setBusy(true);
				this._oList.getItems().forEach(function(item) {
					var oObjject = item.getBindingContext().getObject(),
						sObjectId = item.getBindingContext().getPath().slice(1);
					if (oObjject.Retailstoreid === oModelNavData.retailstoreid) {
						vSelected = true;
						item.setSelected(true);
						this.handleSelectChange(item);
					}
				}.bind(this));
				if (!vSelected) {
					this.getView().byId("list-trigger").firePress()
				} else {
					this.getView().setBusy(false);
					oModelNavData.retailstoreid = null;
				}

			} else if (vTotal === 0 || (this.gTotalStore && this.gTotalStore > 1)) {
				this._oList.removeSelections(true);
				this.getRouter().getTargets().display("detailObjectNotFound");
			}

			/*	if(!this.gMarterMatched && vTotal === 0){
					this.getRouter().getTargets().display("detailObjectNotFound");
				}
				this.gMarterMatched = false;*/

		},
		handleSelectChange: function(item) {
			var sRetailstoreid = item.getBindingContext().getObject().Retailstoreid;
			var oList = this.getView().byId("list");
			var aListItems = oList.getItems();
			var oListItem, vindex;
			aListItems.forEach(function(element, index) {
				var vRetailstoreid = element.getBindingContext().getObject().Retailstoreid;
				if (sRetailstoreid === vRetailstoreid) {
					oListItem = element;
					vindex = index;
				}
			})
			window.setTimeout(function() {
				oList.setSelectedItem(oListItem);
				oList.scrollToIndex(vindex);
			}, 0);

		},
		_getDataStoreAsociation: function(pIndex, pActual) {
			var oItems = this.getView().byId("list").getItems(),
				vIndexForm = !this.gIndexFinished ? 0 : this.gItemsActual !== pActual ? (this.gIndexFinished * 10) - 10 : this.gFrom,
				vIndexTo = !this.gIndexFinished ? 9 : this.gItemsActual !== pActual ? (this.gIndexFinished * 10) - 1 : this.gTo,
				oFilters = [];
			if (!this.gIndexFinished) {
				this.gIndexFinished = 2;
				this.gItemsActual = pActual;
				this.gFrom = vIndexForm;
				this.gTo = vIndexTo;
			} else if (this.gItemsActual !== pActual) {
				this.gItemsActual = pActual;
				this.gIndexFinished = this.gIndexFinished + 1;
				this.gFrom = vIndexForm;
				this.gTo = vIndexTo;
			}
			oItems.forEach(function(item, index) {
				var oItem = item,
					oObject = oItem.getBindingContext().getObject();
				if (index >= vIndexForm && index <= vIndexTo) {
					oFilters.push(new Filter("Retailstoreid", FilterOperator.EQ, oObject.Retailstoreid))
				}
			});

			this._getTerminalesDescuadrados(oFilters);
		},
		_getTerminalesDescuadrados: function(pFilters) {
			this.getView().setBusy(true);
			var oModel = this.getModel();
			var StoreDate = new Date();
			var oFilters = Object.assign([], pFilters);
			StoreDate.setDate(StoreDate.getDate() - 1);
			if (this.gDatePicker) {
				StoreDate = this.gDatePicker;
			}
			pFilters.push(new Filter("Auditbusinessdaydate", FilterOperator.EQ, StoreDate));
			this._getOperacionesRechazadas(StoreDate, oFilters);
			/*	oModel.read("/Tpv", {
					filters: pFilters,
					success: function(data) {
						var oItems = this.getView().byId("list").getItems(),
							oDataResult = data.results;
						oItems.forEach(function(item) {
							var oItem = item;
							item.getAttributes().forEach(function(att) {
								var oPath = att.getBinding("text").getPath(),
									oObject = oItem.getBindingContext().getObject(),
									oValeTpv = oDataResult.find((item) => item.Retailstoreid === oObject.Retailstoreid);
								if (oPath === "Zzcount1" && oValeTpv) {
									att.setText(oValeTpv.Canttpvdesc);
								}
							})
						});
						this._getOperacionesRechazadas(StoreDate, oFilters);
					}.bind(this),
					error: function() {
						this.getView().setBusy(false);
					}.bind(this)
				});*/
		},
		_getOperacionesRechazadas: function(StoreDate, pFilters) {
			var oModel = this.getModel();
			pFilters.push(new Filter("Auditbusinessdaydate", FilterOperator.EQ, StoreDate));
			oModel.read("/Tpvrech", {
				filters: pFilters,
				success: function(data) {
					var oItems = this.getView().byId("list").getItems(),
						oDataResult = data.results;
					oItems.forEach(function(item) {
						var oItem = item;
						item.getAttributes().forEach(function(att) {
							var oPath = att.getBinding("text").getPath(),
								oObject = oItem.getBindingContext().getObject(),
								oValeTpv = oDataResult.find((item) => item.Retailstoreid === oObject.Retailstoreid);
							if (oPath === "Zzcount2" && oValeTpv) {
								att.setText(oValeTpv.Zzcount);
							}
						})
					});
					this.getView().setBusy(false);
				}.bind(this),
				error: function() {
					this.getView().setBusy(false);
				}.bind(this)
			});
		},

		/**
		 * Event handler for the master search field. Applies current
		 * filter value and triggers a new search. If the search field's
		 * 'refresh' button has been pressed, no new search is triggered
		 * and the list binding is refresh instead.
		 * @param {sap.ui.base.Event} oEvent the search event
		 * @public
		 */
		onSearch: function(oEvent) {

			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				//this.gIndexFinished = null;
				this.onRefresh();
				return;
			}

			var sQuery = oEvent.getParameter("query"),
				sRefresh = oEvent.getParameter("refreshButtonPressed"),
				vDateFilter = new Date(Date.UTC(this.gDatePicker.getFullYear(), this.gDatePicker.getMonth(), this.gDatePicker.getDate())),
				oFIlterStore;

			/*if (sQuery) {
				if (!isNaN(sQuery)) {
					this._oListFilterState.aSearch = [new Filter("Retailstoreid", FilterOperator.Contains, sQuery)];
				} else {
					this._oListFilterState.aSearch = [new Filter("RetailstoreidText", FilterOperator.Contains, sQuery)];
				}
				this._oListFilterState.aSearch.push(new Filter("Auditbusinessdaydate", FilterOperator.EQ, vDateFilter));
			} else {
				this._oListFilterState.aSearch = [(new Filter("Auditbusinessdaydate", FilterOperator.EQ, vDateFilter))];
			}*/
			if (sQuery) {
				oFIlterStore = !isNaN(sQuery) ? new Filter("Retailstoreid", FilterOperator.Contains, sQuery) : new Filter("RetailstoreidText",
					FilterOperator.Contains, sQuery);
				this._oListFilterState.aSearch = [
					new sap.ui.model.Filter({
						filters: [
							oFIlterStore,
							new sap.ui.model.Filter("Auditbusinessdaydate", sap.ui.model.FilterOperator.EQ, vDateFilter),
							new sap.ui.model.Filter({
								filters: [
									new sap.ui.model.Filter("Valordesc", sap.ui.model.FilterOperator.GT, 0),
									new sap.ui.model.Filter("ValorDescTot", sap.ui.model.FilterOperator.GT, 0),
									new sap.ui.model.Filter("DescTrxTerm", sap.ui.model.FilterOperator.GT, 0)
								],
								and: false // Combina ambos filtros con un operador AND
							})
						],
						and: true // Combina ambos filtros con un operador AND
					})
				];
			} else {
				this._oListFilterState.aSearch = [
					new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("Auditbusinessdaydate", sap.ui.model.FilterOperator.EQ, vDateFilter),
							new sap.ui.model.Filter({
								filters: [
									new sap.ui.model.Filter("Valordesc", sap.ui.model.FilterOperator.GT, 0),
									new sap.ui.model.Filter("ValorDescTot", sap.ui.model.FilterOperator.GT, 0),
									new sap.ui.model.Filter("DescTrxTerm", sap.ui.model.FilterOperator.GT, 0)
								],
								and: false // Combina ambos filtros con un operador AND
							})
						],
						and: true // Combina ambos filtros con un operador AND
					})
				];
			}
			this._applyFilterSearch();

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function() {
			this._oList.getBinding("items").refresh();
		},

		/**
		 * Event handler for the list selection event
		 * @param {sap.ui.base.Event} oEvent the list selectionChange event
		 * @public
		 */
		onSelectionChange: function(oEvent) {
			// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
			this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		},

		/**
		 * Event handler for the bypassed event, which is fired when no routing pattern matched.
		 * If there was an object selected in the master list, that selection is removed.
		 * @public
		 */
		onBypassed: function() {
			this._oList.removeSelections(true);
		},

		/**
		 * Used to create GroupHeaders with non-capitalized caption.
		 * These headers are inserted into the master list to
		 * group the master list's items.
		 * @param {Object} oGroup group whose text is to be displayed
		 * @public
		 * @returns {sap.m.GroupHeaderListItem} group header with non-capitalized caption.
		 */
		createGroupHeader: function(oGroup) {
			return new GroupHeaderListItem({
				title: oGroup.text,
				upperCase: false
			});
		},

		/**
		 * Event handler for navigating back.
		 * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history
		 * If not, it will navigate to the shell home
		 * @public
		 */
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

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		_createViewModel: function() {
			return new JSONModel({
				isFilterBarVisible: false,
				filterBarLabel: "",
				delay: 0,
				title: this.getResourceBundle().getText("masterTitleCount", [0]),
				noDataText: this.getResourceBundle().getText("masterListNoDataText"),
				sortBy: "Retailstoreid",
				groupBy: "None"
			});
		},

		/**
		 * If the master route was hit (empty hash) we have to set
		 * the hash to to the first item in the list as soon as the
		 * listLoading is done and the first item in the list is known
		 * @private
		 */
		_onMasterMatched: function() {
			var oMyStorage = new Storage(Storage.Type.session, "filtersDescCentro"),
				/*oDataFilter = oMyStorage.get("stored_data"),*/
				oCurrentApp = sap.ushell.services.AppConfiguration.getCurrentApplication(),
				vHash = oCurrentApp.sFixedShellHash,
				oHistory = sap.ui.core.routing.History.getInstance(),
				oListHist = oHistory.aHistory,
				vNavFrom = oListHist[oHistory.iHistoryPosition],
				vClearFilterStorage = oListHist.length > 2 ? true : false,
				oModelNav = sap.ui.getCore().getModel("navObject"),
				oModelNavData = oModelNav ? oModelNav.getData() : {};
			if (!vNavFrom.includes("Shell-home") && !vNavFrom !== "") {
				if (this.gTotalStore === 1) {
					this.getOwnerComponent().oListSelector.oWhenListLoadingIsDone.then(
						function(mParams) {
							if (mParams.list.getMode() === "None" || (this.gTotalStore && this.gTotalStore > 1)) {
								return;
							}
							var sObjectId = mParams.firstListitem.getBindingContext().getPath().slice(1);
							var oNavModel = sap.ui.getCore().getModel("navObject");
							var oNavObject = oNavModel ? oNavModel.getData() : null;
							if (oNavObject && oNavObject.object) {
								this._setFiltersByNavBackOtherApp()
								return;
							}
							this.getRouter().getTargets().display("object");
							this.getRouter().navTo("object", {
								objectId: sObjectId
							}, true);

						}.bind(this),
						function(mParams) {
							var oNavModel = sap.ui.getCore().getModel("navObject");
							var oNavObject = oNavModel ? oNavModel.getData() : null;
							if (oNavObject && oNavObject.object && !mParams.error && mParams.list.getItems().length === 0) {
								this._setFiltersByNavBackOtherApp()
								return;
							} else if (mParams.list.getItems().length > 0 && oNavObject && oNavObject.Retailstoreid) {
								mParams.list.getItems()[0].setSelected(true);
								mParams.list.getItems()[0].firePress();
								this.getView().byId("searchField").setValue(oNavObject.Retailstoreid);
								this.getView().byId("searchField").fireSearch({
									query: oNavObject.Retailstoreid
								});
								oNavObject.Retailstoreid = null;
								return;
							}
							if (mParams.error) {
								return;
							}
							if (mParams.list.getItems().length === 0) {
								this.getRouter().getTargets().display("detailNoObjectsAvailable");
							} else {
								var oPath = this._oList.getItems()[0].getBindingContextPath().slice(1);
								this._oList.setSelectedItem(this._oList.getItems()[0]);
								this.getRouter().getTargets().display("object");
								this.getRouter().navTo("object", {
									objectId: oPath
								}, true);
							}

						}.bind(this)
					);
				} else {
					this._oList.removeSelections(true);
					this.getRouter().getTargets().display("detailObjectNotFound");
				}

			} else {
				this._oList.removeSelections(true);
				this.getRouter().getTargets().display("detailObjectNotFound");
			}
		},

		_setFiltersByNavBackOtherApp: function() {
			var oNavModel = sap.ui.getCore().getModel("navObject"),
				oNavObject = oNavModel ? oNavModel.getData().object : null;
			this.getView().setBusy(true)
			this.getView().getModel().read(oNavObject, {
				success: function(data) {
					sap.ui.getCore().setModel(new JSONModel({
						object: null,
						Retailstoreid: data.Retailstoreid,
						Auditbusinessdaydate: data.Auditbusinessdaydate,
						Workstationid: data.Workstationid,
						execute: null
					}), "navObject");
					var dayformat = data.Auditbusinessdaydate.getDate();
					var monthformat = data.Auditbusinessdaydate.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1
					var yearformat = data.Auditbusinessdaydate.getFullYear() % 100; // Obtener solo los últimos dos dígitos del año
					var formattedDate1 = dayformat + "/" + monthformat + "/" + yearformat;
					this.getView().byId("page").setTitle("Tiendas | Fecha: " + formattedDate1);
					this.gDatePicker = data.Auditbusinessdaydate;
					this.getView().byId("searchField").setValue(data.Retailstoreid);
					this._oListFilterState.aSearch = [
						new sap.ui.model.Filter({
							filters: [
								new sap.ui.model.Filter("Auditbusinessdaydate", sap.ui.model.FilterOperator.EQ, data.Auditbusinessdaydate),
								new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, data.Retailstoreid),
								new sap.ui.model.Filter({
									filters: [
										new sap.ui.model.Filter("Valordesc", sap.ui.model.FilterOperator.GT, 0),
										new sap.ui.model.Filter("ValorDescTot", sap.ui.model.FilterOperator.GT, 0),
										new sap.ui.model.Filter("DescTrxTerm", sap.ui.model.FilterOperator.GT, 0)
									],
									and: false // Combina ambos filtros con un operador AND
								})
							],
							and: true // Combina ambos filtros con un operador AND
						})
					];
					this._applyFilterSearch();
					this.getView().setBusy(false)
				}.bind(this)
			})
		},

		/**
		 * Shows the selected item on the detail page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showDetail: function(oItem) {
			var bReplace = !Device.system.phone;
			var spath = oItem.getBindingContext().getPath().slice(1);
			this.getRouter().getTargets().display("object");
			this.getRouter().navTo("object", {
				objectId: spath
			}, bReplace);
		},

		/**
		 * Sets the item count on the master list header
		 * @param {integer} iTotalItems the total number of items in the list
		 * @private
		 */
		_updateListItemCount: function(iTotalItems) {
			var sTitle;
			// only update the counter if the length is final
			if (this._oList.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("masterTitleCount", [iTotalItems]);
				this.getModel("masterView").setProperty("/title", sTitle);
			}
		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @private
		 */
		_applyFilterSearch: function() {
			var aFilters = this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),
				oViewModel = this.getModel("masterView");
			this._oList.getBinding("items").filter(aFilters, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aFilters.length !== 0) {
				oViewModel.setProperty("/noDataText", this.getResourceBundle().getText("masterListNoDataWithFilterOrSearchText"));
			} else if (this._oListFilterState.aSearch.length > 0) {
				// only reset the no data text to default when no new search was triggered
				oViewModel.setProperty("/noDataText", this.getResourceBundle().getText("masterListNoDataText"));
			}
		},

		/**
		 * Internal helper method to apply both group and sort state together on the list binding
		 * @param {sap.ui.model.Sorter[]} aSorters an array of sorters
		 * @private
		 */
		_applyGroupSort: function(aSorters) {
			this._oList.getBinding("items").sort(aSorters);
		},

		/**
		 * Internal helper method that sets the filter bar visibility property and the label's caption to be shown
		 * @param {string} sFilterBarText the selected filter value
		 * @private
		 */
		_updateFilterBar: function(sFilterBarText) {
			var oViewModel = this.getModel("masterView");
			oViewModel.setProperty("/isFilterBarVisible", (this._oListFilterState.aFilter.length > 0));
			oViewModel.setProperty("/filterBarLabel", this.getResourceBundle().getText("masterFilterBarText", [sFilterBarText]));
		},

		onOpenDatePicker: function() {
			/*var oView = this.getView();
			if (!this._oDatePickerDialog) {
				this._oDatePickerDialog = sap.ui.xmlfragment(oView.getId(), "app.inetum.ZCARDESCENTRO.Fragments.MasterDate", this);
				oView.addDependent(this._oDatePickerDialog);
			}
			this._oDatePickerDialog.open();*/
			var oView = this.getView();
			if (!this._oDatePickerDialog) {
				this._oDatePickerDialog = sap.ui.xmlfragment(oView.getId(), "app.inetum.ZCARDESCENTRO.Fragments.MasterDate", this);
				oView.addDependent(this._oDatePickerDialog);
				var oDatePicker = this._oDatePickerDialog.getContent()[0]; // Obtener el control DatePicker del diálogo

				var yesterday = new Date();

				// yesterday.setDate(yesterday.getDate() - 1);
				// //	oDatePicker.setMaxDate(yesterday.getFullYear(),new Date().getMonth() + 1,new Date().getDate() - 1);
				// oDatePicker.setMinDate(new Date(1999, 0, 1));
				oDatePicker.setMaxDate(yesterday);

			}
			this._oDatePickerDialog.open();
		},

		onCloseDatePicker: function(oEvent) {
			/*var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
				pattern: "dd/MM/yyyy"
			});
			if (oEvent) {
				if (oEvent.getParameter("value")) {
					StoreDate = oEvent.getSource().getDateValue();
					if (StoreDate) {
						this._oListFilterState.aSearch = [new Filter("Businessdaydate", FilterOperator.EQ, new Date(StoreDate.getTime() - StoreDate.getTimezoneOffset() *
							180000))];
					}
				}
				this._oDatePickerDialog.close();
				this.getView().byId("page").setTitle("Tiendas | Fecha: " + oDateFormat.format(StoreDate));
				//MessageToast.show("Date selected: " + oEvent.getParameter("value"));
			} else {
				this.getView().byId("page").setTitle("Tiendas | Fecha: " + oDateFormat.format(StoreDate));
				this._oListFilterState.aSearch = [new Filter("Businessdaydate", FilterOperator.EQ, new Date(StoreDate.getTime() - StoreDate.getTimezoneOffset() *
					180000))];
			}
			this._applyFilterSearch();*/
			var oCorrectDateValue,
				oModelNav = sap.ui.getCore().getModel("navObject"),
				oModelNavData = oModelNav ? oModelNav.getData() : {},
				oCurrentApp = sap.ushell.services.AppConfiguration.getCurrentApplication(),
				vHash = oCurrentApp.sFixedShellHash,
				oHistory = sap.ui.core.routing.History.getInstance(),
				oListHist = oHistory.aHistory,
				vNavFrom = oListHist[oHistory.iHistoryPosition];
			if (oEvent) {
				if (oEvent.getParameter("value")) {
					// Obtener la fecha actual
					var currentDate = new Date();
					currentDate.setHours(0, 0, 0, 0);
					// Crear una fecha a partir de la cadena "24/4/24"
					var dateString = oEvent.getParameter("value");
					var parts = dateString.split("/"); // Dividir la cadena en partes: día, mes, año
					var year = parseInt(parts[2], 10) + 2000; // Convertir los últimos dos dígitos del año a un número y sumarle 2000 para obtener el año completo
					var month = parseInt(parts[1], 10) - 1; // Convertir el mes a un número (restar 1 porque los meses van de 0 a 11)
					var day = parseInt(parts[0], 10); // Obtener el día como un número

					var targetDate = new Date(year, month, day);

					// Verificar si la fecha actual es igual a la fecha objetivo
					if (currentDate.getTime() === targetDate.getTime()) {
						MessageBox.warning("No es posible seleccionar la fecha actual.", {
							actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
							emphasizedAction: MessageBox.Action.OK,
							onClose: function(sAction) {}
						});
					} else {
						StoreDate = oEvent.getSource().getDateValue();
						if (StoreDate) {
							oCorrectDateValue = new Date(Date.UTC(StoreDate.getFullYear(), StoreDate.getMonth(), StoreDate.getDate()));
							StoreDate = oCorrectDateValue;
							this.gDatePicker = oCorrectDateValue;
							// this._oListFilterState.aSearch = [new Filter("Businessdaydate", FilterOperator.EQ, new Date(StoreDate.getTime() - StoreDate.getTimezoneOffset() *
							// 	180000))];
							this._oListFilterState.aSearch = [
								new sap.ui.model.Filter({
									filters: [
										new Filter("Auditbusinessdaydate", FilterOperator.EQ, new Date(StoreDate.getTime() - StoreDate.getTimezoneOffset() *
											180000)),
										new sap.ui.model.Filter({
											filters: [
												new sap.ui.model.Filter("Valordesc", sap.ui.model.FilterOperator.GT, 0),
												new sap.ui.model.Filter("ValorDescTot", sap.ui.model.FilterOperator.GT, 0),
												new sap.ui.model.Filter("DescTrxTerm", sap.ui.model.FilterOperator.GT, 0)
											],
											and: false // Combina ambos filtros con un operador AND
										})
									],
									and: true // Combina ambos filtros con un operador AND
								})
							];
						}
						var oValue = oEvent.getParameter("value");
						this.getView().byId("page").setTitle("Tiendas | Fecha: " + oValue);
						MessageToast.show("Date selected: " + oEvent.getParameter("value"));
					}
				}
				this._oDatePickerDialog.close();
				this._applyFilterSearch();

			} else {
				//else if(!vNavFrom.includes("Shell-home") && !vNavFrom !== "") {

				var yesterday = vNavFrom.includes("Shell-home") || vNavFrom === "" ? new Date() : oModelNav && oModelNavData.Auditbusinessdaydate ?
					new Date(oModelNavData.Auditbusinessdaydate) : new Date(),
					vNav = vNavFrom.includes("Shell-home") || vNavFrom === "" ? false : oModelNav && oModelNavData.Auditbusinessdaydate ?
					true : false;
				if (!vNav) {
					yesterday.setDate(yesterday.getDate() - 1);
				}
				this.gDatePicker = yesterday;
				var dayformat = yesterday.getDate();
				var monthformat = yesterday.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1
				var yearformat = yesterday.getFullYear() % 100; // Obtener solo los últimos dos dígitos del año

				// Formato "24/4/1"
				var formattedDate1 = dayformat + "/" + monthformat + "/" + yearformat;
				oCorrectDateValue = new Date(Date.UTC(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()));
				this._oListFilterState.aSearch = [
					new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("Auditbusinessdaydate", sap.ui.model.FilterOperator.EQ, yesterday),
							new sap.ui.model.Filter({
								filters: [
									new sap.ui.model.Filter("Valordesc", sap.ui.model.FilterOperator.GT, 0),
									new sap.ui.model.Filter("ValorDescTot", sap.ui.model.FilterOperator.GT, 0),
									new sap.ui.model.Filter("DescTrxTerm", sap.ui.model.FilterOperator.GT, 0)
								],
								and: false // Combina ambos filtros con un operador AND
							})
						],
						and: true // Combina ambos filtros con un operador AND
					})
				];
				this.getView().byId("page").setTitle("Fecha de auditoria: " + formattedDate1);
				oModelNavData.Auditbusinessdaydate = null;
				this._applyFilterSearch();
			}

		}

	});

});