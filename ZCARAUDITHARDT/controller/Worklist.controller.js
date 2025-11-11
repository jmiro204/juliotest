/*global location history */
sap.ui.define([
	"app/inetum/zcaraudithardt/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/inetum/zcaraudithardt/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("app.inetum.zcaraudithardt.controller.Worklist", {

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
				iOriginalBusyDelay
				//oTable = this.byId("table");

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
				Businessdaydate: new Date(),
				Retailstoreid: "",
				selectTab: "vtan",
				Original: true
			});
			this.setModel(oViewModel, "worklistView");
			this.setModel(new JSONModel([]), "modelVtaNeta");
			this.setModel(new JSONModel([]), "modelVtaMov");

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			//oTable.attachEventOnce("updateFinished", function(){
			// Restore original busy indicator delay for worklist's table
			//	oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			//});
			// Add the worklist page to the flp routing history
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("worklistViewTitle"),
				icon: "sap-icon://table-view",
				intent: "#-display"
			}, true);
		},
		onAfterRendering: function(oEvent) {
			var oTable = this.getView().byId("tableVtaNeta");

			this.getView().getModel().setSizeLimit(9999);
		},

		onSearch: function(oEvent) {
			var oModelView = this.getModel("worklistView"),
				oDataModel = oModelView.getData(),
				//	oIconTab = this.getView().byId("idIconTabBarFiori2")
				//	oKeySelected = oIconTab.getSelectedKey(),
				vDate = new Date(Date.UTC(oDataModel.Businessdaydate.getFullYear(), oDataModel.Businessdaydate.getMonth(),
					oDataModel.Businessdaydate.getDate())),
				vStore = oDataModel.Retailstoreid;
			this._oListFilterState = [
				new Filter("Businessdaydate", FilterOperator.EQ, vDate),
				new Filter("Retailstoreid", FilterOperator.EQ, vStore),
				new Filter("Orig", FilterOperator.EQ, oDataModel.Original ? 'X' : ''  ),
				new Filter("Workstationid", FilterOperator.EQ, oDataModel.Workstationid ? oDataModel.Workstationid : ''),
				new Filter("Edificio", FilterOperator.EQ, oDataModel.Edificio ? oDataModel.Edificio : ''),
				new Filter("Planta", FilterOperator.EQ, oDataModel.Planta ? oDataModel.Planta : '')
			];
			this._getSetModelTable();
			this._getSetModelTableMovi();
		},
		onChangeValue: function(oEvent){
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue();
			if(isNaN(vValue)){
				oInput.setValue(vValue.substr(0,vValue.length - 1));
			}	
		},
		_getSetModelTable: function() {
			this.getView().setBusy(true);
			this.getModel().read("/Hardtotal", {
				filters: this._oListFilterState,
				success: function(data, resp) {
					this.getModel("modelVtaNeta").setData(data.results);
					this.getModel("modelVtaNeta").refresh(true);
					this.getView().setBusy(false);
					this.getView().byId("tableVtaNeta").setVisibleRowCount(data.results.length);
					this.getView().byId("tableVtaOrg").setVisibleRowCount(data.results.length);
				/*	setTimeout(function() {
						this._mergeCells("tableVtaNeta", [0]);
					}.bind(this), 500);*/
				}.bind(this),
				error: function() {
					this.getView().setBusy(false);
				}.bind(this)
			});
		},
		_getSetModelTableMovi: function() {
			this.getView().setBusy(true);
			this.getModel().read("/MovimientosSet", {
				filters: this._oListFilterState,
				success: function(data, resp) {
					this.getModel("modelVtaMov").setData(data.results);
					this.getModel("modelVtaMov").refresh(true);
					this.getView().setBusy(false);
					this.getView().byId("tableVtaMov").setVisibleRowCount(data.results.length);
				}.bind(this),
				error: function() {
					this.getView().setBusy(false);
				}.bind(this)
			});
		},
		onFirstChange: function(oEvent) {
			setTimeout(function() {
				this._mergeCells("tableVtaNeta", [0]);
			}.bind(this), 500);
		},
		_mergeCells: function(sTableId, aColumns) {
			var oTable = this.getView().byId(sTableId);
			var aRows = oTable.getRows();
			var byCols = aColumns;
			var aRows = oTable.getRows();
			var theCols = [0, 1, 2];
			if (aRows && aRows.length > 0) {
				let pRow;
				aRows.map((aRow, i) => {
					if (i > 0) {
						let cCells = aRow.getCells();
						let pCells = pRow.getCells();

						// if theCols is empty we use aggregation for all cells in a row
						if (theCols.length < 1) byCols = cCells.map((x, i) => i);

						if (byCols.filter(x => pCells[x].getText() == cCells[x].getText()).length == byCols.length) {
							theCols.forEach(i => {
								if (pCells[i].getText() == cCells[i].getText()) {
									$("#" + cCells[i].getId()).css("visibility", "hidden");
									$("#" + pRow.getId() + "-col" + i).css("border-bottom-style", "hidden");
								}
							});
						}

					}
					pRow = aRow;
				});
			}
		},
		_mergeCells2: function(sTableId, aColumns) {
			var oTable = this.getView().byId(sTableId);
			var aRows = oTable.getRows();
			for (var j = 0; j < aColumns.length; j++) {
				var iColIndex = aColumns[j];
				var sPreviousValue = "";
				var iRowSpan = 1;
				for (var i = 0; i < aRows.length; i++) {
					var oRow = aRows[i];
					var oCell = oRow.getCells()[iColIndex];
					var sValue = oCell.getText();
					if (sValue === sPreviousValue) {
						iRowSpan++;
						oCell.setVisible(false);
					} else {
						if (iRowSpan > 1) {
							aRows[i - iRowSpan].getCells()[iColIndex].setVisible(true);
							aRows[i - iRowSpan].getCells()[iColIndex].getDomRef().setAttribute("rowspan", iRowSpan);
						}
						sPreviousValue = sValue;
						iRowSpan = 1;
					}
				}
				if (iRowSpan > 1) {
					aRows[aRows.length - iRowSpan].getCells()[iColIndex].setVisible(true);
					aRows[aRows.length - iRowSpan].getCells()[iColIndex].getDomRef().setAttribute("rowspan", iRowSpan);
				}
			}
		},
		onChangeStoreId: function(oEvent){
			var oCombo = oEvent.getSource(),
				oSelectableItem = oCombo.getSelectableItems();
			if(oSelectableItem.length === 1){
				let oItem = oSelectableItem[0];
				oCombo.setSelectedItem(oItem)
			}
		},
		onChangeModiBox: function(oEvent){
			var oModel = this.getModel("worklistView");
			oModel.setProperty("/Original", !oEvent.getSource().getSelected());
		}

	});
});