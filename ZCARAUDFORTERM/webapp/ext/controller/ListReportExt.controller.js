sap.ui.controller("app.inetumzcaraudforzaterm.ext.controller.ListReportExt", {

	onClickActionHardtotal1: function(oEvent) {
		var oModelView = this.getModel(),
				oDataView = oModelView.getData();
			if (sap.ushell.Container && (oDataView.Businessdaydate !== "" && oDataView.Retailstoreid !== "")) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zobservaudit",
							action: "manage"
						},
						params: {
							Retailstoreid: oDataView.Retailstoreid,
							Businessdaydate: new Date(Date.UTC(oDataView.Businessdaydate.getFullYear(),oDataView.Businessdaydate.getMonth(),oDataView.Businessdaydate.getDate()))
						}
					});
	}
	}
});