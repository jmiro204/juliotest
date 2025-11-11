sap.ui.controller("ZCARMONEDAS.ext.controller.ListReportExt", {

	onAfterRendering: function(oEvent) {
		var oButtonCreate = this.getView().byId("addEntry"),
			oModel = this.getView().getModel("Auth");
		oModel.read("/Auths", {
			success: function(data) {
				var oObjectAll = data.results.find((o) => o.Objct === "ZAUDGSTTAB" && o.Von === '*'),
					oObjectCreate = data.results.find((o) => o.Objct === "ZAUDGSTTAB" && o.Von === '01');
				oButtonCreate.setEnabled(oObjectAll || oObjectCreate ? true : false);
			}.bind(this),
			error: function(resp) {
				oButtonCreate.setEnabled(false);
			}.bind(this)
		});
	}
});