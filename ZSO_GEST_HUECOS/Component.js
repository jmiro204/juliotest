//sap.ui.getCore().loadLibrary("com.inetum.zcustomlibraryscan", "/sap/bc/ui5_ui5/sap/zcustomlibscan");
sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "inetum/ZSO_GEST_HUECOS/model/models"], function(e, i, t) {
	"use strict";
	return e.extend("inetum.ZSO_GEST_HUECOS.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			e.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			this.setModel(t.createDeviceModel(), "device")
		}
	})
});
//# sourceMappingURL=Component.js.map