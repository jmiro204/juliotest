sap.ui.controller("app.inetumzcarapobhardtot.ext.controller.ListReportExt", {
	onInit: function(oEvent) {
		this.getView().byId("listReport").setIgnoredFields("Workstationid");
	},
	onAfterRendering: function(oEvent) {

	}
});