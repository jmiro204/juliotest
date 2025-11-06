sap.ui.define([], function() {
	"use strict";
	var F = {
		formatIDCajero: function(r) {
			var oValue = "";
			if(r){
				oValue = parseFloat(r, 10);
			}
			return oValue;
		},
		formatHora: function(r) {
			var a = r.ms;
			var t = a % 1e3;
			a = (a - t) / 1e3;
			var e = a % 60;
			a = (a - e) / 60;
			var n = a % 60;
			var s = a / 60;
			s = parseInt(s, 10) < 10 ? "0" + parseInt(s, 10) : parseInt(s, 10);
			n = parseInt(n, 10) < 10 ? "0" + parseInt(n, 10) : parseInt(n, 10);
			e = parseInt(e, 10) < 10 ? "0" + parseInt(e, 10) : parseInt(e, 10);
			return s + ":" + n + ":" + e;
		},
		formatAmount: function(oValue) {
			var oFloatNumberFormat = F.formatNumberFloat();
			return oFloatNumberFormat.format(oValue);
		},
		formatNumberFloat: function(){
			return sap.ui.core.format.NumberFormat.getFloatInstance({
                    maxFractionDigits: 1,
                    minFractionDigits : 1,
                    groupingEnabled: true
                } , sap.ui.getCore().getConfiguration().getLocale());
		}
		

	};
	return F;
});