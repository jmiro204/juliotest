sap.ui.define([
		"app/inetum/zcarauditinciv2/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("app.inetum.zcarauditinciv2.controller.NotFound", {

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