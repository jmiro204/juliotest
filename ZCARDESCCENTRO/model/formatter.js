sap.ui.define([], function() {
	"use strict";

	return {
		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		currencyValue: function(sValue) {
			if (!sValue) {
				return "";
			}

			return parseFloat(sValue).toFixed(2);
		},
		formatDate: function(date) {
			if (!date) return ""; // Si no hay fecha, devuelve cadena vacía

			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/yyyy" // Define el formato de fecha deseado
			});
			return oDateFormat.format(date); // Formatea la fecha y devuelve como cadena
		},
		formatStore: function(store){
			return Number(store).toString();
		},
		formCount: function(vCount){
			if(!vCount){
				return '0';
			}else{
				return vCount;
			}
		}
	};

});