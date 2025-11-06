/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"inetum/ZSO_GEST_HUECOS/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});