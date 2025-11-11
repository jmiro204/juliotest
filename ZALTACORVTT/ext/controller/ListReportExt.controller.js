sap.ui.controller("app.inetumzarcorrvtt.ext.controller.ListReportExt", {

	onAfterRendering: function(oEvent) {
		var oButtonCreate = this.getView().byId("addEntry"),
		   oButtonCreateDef = this.getView().byId("action::cds_zcar_sd_corr_vtt.cds_zcar_sd_corr_vtt_Entities::createDefault"),
			oModel = this.getView().getModel("Auth");
	    oButtonCreate.setVisible(false);
		oModel.read("/Auths", {
			success: function(data) {
				var	oObjectAll = data.results.find((o) => o.Objct === "ZAUDSTORE" && o.Von === '*'),
					oObjectCreate = data.results.find((o) => o.Objct === "ZAUDSTORE" && o.Von  === '01');
				oButtonCreateDef.setEnabled(oObjectAll || oObjectCreate ? true : false);
				//oButtonCreateDef.setEnabled(false);
			}.bind(this),
			error: function(resp) {
				oButtonCreate.setEnabled(false);
			}.bind(this)
		});
	}
});