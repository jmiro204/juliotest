sap.ui.define(["sap/ui/test/Opa5"], function(t) {
	"use strict";
	return t.extend("inetum.ZSO_GEST_HUECOS.test.integration.arrangements.Startup", {
		iStartMyApp: function(t) {
			var a = t || {};
			a.delay = a.delay || 50;
			this.iStartMyUIComponent({
				componentConfig: {
					name: "inetum.ZSO_GEST_HUECOS",
					async: true
				},
				hash: a.hash,
				autoWait: a.autoWait
			})
		}
	})
});
//# sourceMappingURL=Startup.js.map