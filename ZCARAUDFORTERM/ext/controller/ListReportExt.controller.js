sap.ui.controller("app.inetumzcaraudforzaterm.ext.controller.ListReportExt", {
	gAttachOpen: false,

	onAfterRendering: function(oEvent) {
		/*var sTable = this.getView().byId("responsiveTable");
		sTable.setMode("MultiSelect");
		this.getView().byId("listReport")._oToolbar.getContent()[3].attachPress(function(oEvent) {
			debugger;
			if (!this.getView().byId("actionConfirmationDialog")) {
				this.getView().setBusy(true);
				setTimeout(function(oEvent) {
					this.getView().setBusy(false);
					this._UpdateModelDialog();
				}.bind(this), 1000)
			}
		}.bind(this));*/
	},
	_UpdateModelDialog: function() {
		var oTable = this.getView().byId("responsiveTable"),
			oSelItems = oTable.getSelectedContexts(),
			oDialog = this.getView().byId("actionConfirmationDialog"),
			oContentDialog = oDialog ? oDialog.getContent()[1] : null,
			oItems = oContentDialog ? oContentDialog.getItems() : null,
			oItem = oContentDialog ? oItems[0] : null,
			oModelItems = oContentDialog ? oItem.getBinding("items").getModel() : null,
			oModelItemsData = oContentDialog ? oModelItems.getData() : null,
			oListSelec = [];
		if (oContentDialog) {
			oSelItems.forEach(function(item) {
				var oObject = item.getObject(),
					vPath = item.getPath();
				var oList = oModelItemsData.aApplicableContexts.filter(contx => contx.getPath() === vPath);
				if (oList.length === 0) {
					oListSelec.push({
						sKey: oObject.Retailstoreid.concat("-").concat(oObject.RetailstoreidText)
					});
				}
			}.bind(this));
			oModelItems.setProperty("/aInApplicableItems", oListSelec);
			oModelItems.refresh(true);
			if (!this.gAttachOpen) {
				this.gAttachOpen = true;
				this.getView().byId("actionConfirmationDialog").attachAfterOpen(function(oEvent) {
					this._UpdateModelDialog();
				}.bind(this));
			}
		}
	},
	onClickActionHardtotal1: function(oEvent) {
		/*var arr = this.getView().byId("listReportFilter").getFilters()[0].aFilters[0].aFilters;
		Businessdaydate = this.getView().byId("listReportFilter").getFilters()[0].aFilters[1].oValue1;

		var retailStoreIds = arr.map(function(filter) {
			return filter.oValue1;
		}); // Unir los valores en una cadena separada por comas si es necesario */
		var 
			oTableItems = this.getView().byId("responsiveTable").getSelectedItems(),
			oItem = oTableItems.length > 0 ? oTableItems[0] : "",
			oObject = oItem ? oTableItems[0].getBindingContext().getObject() : "",
			Businessdaydate = oObject ? oObject.Auditbusinessdaydate : "",
			retailStoreIds = oObject ? oObject.Retailstoreid : ""
			;

		if (sap.ushell.Container && (Businessdaydate !== "" && retailStoreIds !== "")) {
			sap.ushell.Container
				.getService("CrossApplicationNavigation")
				.toExternal({
					target: {
						semanticObject: "zobservaudit",
						action: "manage"
					},
					params: {
						Retailstoreid: retailStoreIds,
						Auditbusinessdaydate: new Date(Date.UTC(Businessdaydate.getFullYear(), Businessdaydate.getMonth(), Businessdaydate.getDate()))
					}
				});
		}
	}
});