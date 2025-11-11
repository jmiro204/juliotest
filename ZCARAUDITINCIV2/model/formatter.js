sap.ui.define([

], function() {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},
		
		convertTpv: function(sValue){
			return sValue ? parseInt(sValue).toString().padStart(4,"0"): sValue;
		},
		convertTrx: function(sValue){
			return sValue ? parseInt(sValue).toString().padStart(4,"0"): sValue;
		},
		convertStore: function(sValue){
			return sValue ? parseInt(sValue).toString(): sValue;
		}

		// formatNumber: function(fValue) {
		// 	if (fValue === null || fValue === undefined) {
		// 		return "";
		// 	}
		// 	var sTotal = fValue.replace('.', ',');

		// 	return sTotal.toString() ;
		// }

	};

});