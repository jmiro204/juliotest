sap.ui.define([
		"app/inetum/zcarauditest/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("app.inetum.zcarauditest.controller.NotFound", {

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