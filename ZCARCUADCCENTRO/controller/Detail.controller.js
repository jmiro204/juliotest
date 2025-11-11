/*global location */
sap.ui.define([
	"app/inetum/ZCARCUADCENTRO/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"app/inetum/ZCARCUADCENTRO/model/formatter",
	"sap/ui/Device",
	"sap/ui/util/Storage"
], function(BaseController, JSONModel, formatter, Device, Storage) {
	"use strict";

	return BaseController.extend("app.inetum.ZCARCUADCENTRO.controller.Detail", {

		formatter: formatter,
		gAttachDR : false,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading")
			});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			this.setModel(oViewModel, "detailView");

			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));

		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onShareEmailPress: function() {
			var oViewModel = this.getModel("detailView");

			sap.m.URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("detailView"),
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

		/**
		 * Updates the item count within the line item table's header
		 * @param {object} oEvent an event containing the total number of items in the list
		 * @private
		 */
		onListUpdateFinished: function(oEvent) {
			var sTitle,
				iTotalItems = oEvent.getParameter("total"),
				oViewModel = this.getModel("detailView");
			this.getView().setBusy(false);
			// only update the counter if the length is final
			if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
				if (iTotalItems) {
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeadingCount", [iTotalItems]);
				} else {
					//Display 'Line Items' instead of 'Line items (0)'
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeading");
				}
				oViewModel.setProperty("/lineItemListTitle", sTitle);
			}
		},

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId,
				oViewModel = this.getModel("detailView");
			oViewModel.setProperty("/busy", true);
			this._bindView("/" + sObjectId);
			this.getView().setBusy(false);
		},

		/**
		 * Binds the view to the object path. Makes sure that detail view displays
		 * a busy indicator while data for the corresponding element binding is loaded.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound to the view.
		 * @private
		 */
		_bindView: function(sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("detailView");
			/*var aFilters = [
				new sap.ui.model.Filter("ValordescTpv", sap.ui.model.FilterOperator.EQ, 0)
			];*/

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: sObjectPath,
				//filters: aFilters,
				parameters: {
					expand: "to_Positiontpv"
				},
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function() {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				// if object could not be found, the selection in the master list
				// does not make sense anymore.
				this.getOwnerComponent().oListSelector.clearMasterListSelection();
				return;
			}
			this._deseleccionarTodo();
			var sPath = oElementBinding.getPath(),
				oResourceBundle = this.getResourceBundle(),
				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.Retailstoreid,
				sObjectName = oObject.Retailstoreid,
				oViewModel = this.getModel("detailView");

			this.getOwnerComponent().oListSelector.selectAListItem(sPath);

			/*var oNavModel = sap.ui.getCore().getModel("navObject"),
				oNavObject = oNavModel ? oNavModel.getData() : {};
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			if (oNavModel && oNavObject.Auditbusinessdaydate) {
				oRouter.navTo("master", {}, true);
			}*/

			oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("shareSaveTileAppTitle", [sObjectName]));
			oViewModel.setProperty("/shareOnJamTitle", sObjectName);
			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		},

		onUpdateFinished: function(oEvent) {
			var oItems = oEvent.getSource().getItems(),
				oNavModel = sap.ui.getCore().getModel("navObject"),
				oNavObject = oNavModel ? oNavModel.getData() : null,
				vGet,
				oItemSel;
			if (oItems.length > 0 && oNavObject && oNavObject.Workstationid) {
				this.getView().setBusy(true);
				oItems.forEach(function(item) {
					var oObject = item.getBindingContext().getObject(),
						vTpv = oObject.Workstationid;
					if (vTpv === oNavObject.Workstationid) {
						vGet = true;
						oItemSel = item;
					}
				});
				if (!vGet) {
					this.getView().byId("lineItemsList-trigger").firePress();
				} else {
					oNavObject.Workstationid = null;
					setTimeout(function() {
						oItemSel.firePress();
						this.getView().setBusy(false);
					}.bind(this), 1000);
				}
			} else {
				this.getView().setBusy(false);
			}
		},

		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getModel("detailView"),
				oLineItemTable = this.byId("lineItemsList"),
				iOriginalLineItemTableBusyDelay = oLineItemTable.getBusyIndicatorDelay();

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/lineItemTableDelay", 0);

			oLineItemTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for line item table
				oViewModel.setProperty("/lineItemTableDelay", iOriginalLineItemTableBusyDelay);
			});

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			//oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},
		/**
		 * Event handler for the list selection event
		 * @param {sap.ui.base.Event} oEvent the list selectionChange event
		 * @public
		 */
		onListItemPress: function(oEvent) {
			this._showDetailInfo([oEvent.getSource().getBindingContext().getPath()] || oEvent.getSource());
		},
		onSelectionChangeDetail: function(oEvent) {
			// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
			this._showDetailInfo(oEvent.getSource().getSelectedContextPaths() || oEvent.getSource());
		},
		_showDetailInfo: function(Path) {
			//var bReplace = !Device.system.phone;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var spath = Path[0].slice(1);
			this.getView().setBusy(true);
			oRouter.navTo("object1", {
				objectDetailId: spath
			}, true);
		},

		onSearchTPV: function(oEvent) {
			// Obténer el valor de búsqueda ingresado por el usuario
			var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");

			// Obténer la referencia de la lista
			var oList = this.byId("lineItemsList");

			// Obtén el binding de los items de la lista
			var oBinding = oList.getBinding("items");

			// Crear un array de filtros
			var aFilters = [];

			// Si hay un valor en el campo de búsqueda, añade un filtro
			if (sQuery && sQuery.length > 0) {
				// Filtrar por el campo "Workstationid"
				aFilters.push(new sap.ui.model.Filter("WorkstationidView", sap.ui.model.FilterOperator.Contains, sQuery));
			}

			// Aplica el filtro (también aplicamos el filtro de ValordescTpv > 0)
			//aFilters.push(new sap.ui.model.Filter("ValordescTpv", sap.ui.model.FilterOperator.EQ, 0));

			// Filtrar los items en la lista
			oBinding.filter(aFilters);
		},

		_deseleccionarTodo: function() {
			var oList = this.byId("lineItemsList"); // Obtén la referencia al control List
			var aItems = oList.getItems(); // Obtiene todos los elementos de la lista

			// Recorre todos los elementos y deselecciónalos
			aItems.forEach(function(oItem) {
				oList.setSelectedItem(oItem, false); // Deselecciona el elemento
			});
		},
		onButtonPress: function(oEvent) {
			var oButton = oEvent.getSource();
			this.gObjectSelect = oEvent.getSource().getBindingContext().getObject();
			this.byId("actionSheet").openBy(oButton);
		},
		onNavtoCuadTerm: function(oEvent) {
			var oMyStorage = new Storage(Storage.Type.session, "filtersDescCentro"),
				ObjTpv = this.gObjectSelect;
			/*oMyStorage.put("stored_data", {
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate()))
			});*/
			sap.ui.getCore().setModel(new JSONModel({
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate()))
			}), "navObject");
			if (sap.ushell.Container) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zcuadvtatrx",
							action: "display"
						},
						params: {
							retailstoreid: ObjTpv.Retailstoreid,
							workstationid: ObjTpv.Workstationid,
							Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
								ObjTpv.Auditbusinessdaydate
								.getDate()))
						}
					});
			}

		},

		onNavtoGestTrx: function(oEvent) {
			var oMyStorage = new Storage(Storage.Type.session, "filtersDescCentro"),
				ObjTpv = this.gObjectSelect;
			/*oMyStorage.put("stored_data", {
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate()))
			});*/
			sap.ui.getCore().setModel(new JSONModel({
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate()))
			}), "navObject");

			if (sap.ushell.Container) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zgestiontxt",
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

		},
		onNavtoAltaObserv: function(oEvent) {
			var oMyStorage = new Storage(Storage.Type.session, "filtersDescCentro"),
				ObjTpv = this.gObjectSelect;
			/*	oMyStorage.put("stored_data", {
					retailstoreid: ObjTpv.Retailstoreid,
					Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
						ObjTpv.Auditbusinessdaydate
						.getDate()))
				});*/
			sap.ui.getCore().setModel(new JSONModel({
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate()))
			}), "navObject");

			if (sap.ushell.Container) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zobservaudit",
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

		},
		onNavtoAltaTrx: function(oEvent) {
			var oMyStorage = new Storage(Storage.Type.session, "filtersDescCentro"),
				ObjTpv = this.gObjectSelect;
			sap.ui.getCore().setModel(new JSONModel({
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate()))
			}), "navObject");

			if (sap.ushell.Container) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zaltatrx",
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
		},
			onNavtoAltaVtt: function(oEvent) {
			var oMyStorage = new Storage(Storage.Type.session, "filtersDescCentro"),
				ObjTpv = this.gObjectSelect;
			sap.ui.getCore().setModel(new JSONModel({
				retailstoreid: ObjTpv.Retailstoreid,
				Auditbusinessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
					ObjTpv.Auditbusinessdaydate
					.getDate()))
			}), "navObject");

			if (sap.ushell.Container) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zaltacorvtt",
							action: "manage"
						},
						params: {
							Retailstoreid: ObjTpv.Retailstoreid,
							Workstationid: ObjTpv.Workstationid,
							Businessdaydate: new Date(Date.UTC(ObjTpv.Auditbusinessdaydate.getFullYear(), ObjTpv.Auditbusinessdaydate.getMonth(),
								ObjTpv.Auditbusinessdaydate
								.getDate()))
						}
					});
			}
		}

	});

});