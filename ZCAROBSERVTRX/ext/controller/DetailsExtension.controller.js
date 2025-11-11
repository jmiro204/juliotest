sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/base/util/UriParameters"
], function(Controller, JSONModel, UriParameters) {
	"use strict";
	var oController = {
		onAfterRendering: function(oEvent) {
			var oUrl = window.location.href,
				oSplitUrl = oUrl.split("?"),
				oModel = this.getView().getModel(),
				oContextView = this.getView().getBindingContext(),
				vPath = oContextView.getPath(),
				oParam;
			oSplitUrl.forEach(function(item, index) {
				var oParams = item.split("&");
				oParams.forEach(function(param, pindex) {
					if (param.includes("Auditbusinessdaydate")) {
						oModel.setProperty("Auditbusinessdaydate", new Date(param.split("=")[1].replaceAll("%253A", ":")), oContextView);
					} else if (param.includes("Retailstoreid")) {
						oModel.setProperty("Retailstoreid", param.split("=")[1], oContextView);
					}
				}.bind(this));
			}.bind(this));
		}
	};
	return oController;
});