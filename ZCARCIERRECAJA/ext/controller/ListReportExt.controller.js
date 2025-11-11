sap.ui.controller("zcarcierrecaja.ext.controller.ListReportExt", {

	gAttachOpen: false,

	onAfterRendering: function(oEvent) {
		var sTable = this.getView().byId("responsiveTable");
		sTable.setMode("MultiSelect");
		sTable.getHeaderToolbar().getContent()[3].attachPress(function(oEvent) {
			debugger;
			if (!this.getView().byId("actionConfirmationDialog")) {
				this.getView().setBusy(true);
				setTimeout(function(oEvent) {
					this.getView().setBusy(false);
					this._UpdateModelDialog();
				}.bind(this), 1000)
			}
		}.bind(this));
	},
	_UpdateModelDialog: function() {
		var oTable = this.getView().byId("responsiveTable"),
			oSelItems = oTable.getSelectedContexts(),
			oDialog = this.getView().byId("actionConfirmationDialog"),
			oContentDialog = oDialog.getContent()[1],
			oItems = oContentDialog.getItems(),
			oItem = oItems[0],
			oModelItems = oItem.getBinding("items").getModel(),
			oModelItemsData = oModelItems.getData(),
			oListSelec = [];
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
});