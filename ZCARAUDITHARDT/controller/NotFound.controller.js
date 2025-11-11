sap.ui.define([
		"app/inetum/zcaraudithardt/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("app.inetum.zcaraudithardt.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);