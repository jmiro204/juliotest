sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/base/util/UriParameters"
], function(Controller, JSONModel, UriParameters) {
	"use strict";
	var oController = {
		onAfterRendering: function(oEvent) {
			var oModelNavVtt = sap.ui.getCore().getModel("modelNavVtt"),
				oDataVtt = oModelNavVtt ? oModelNavVtt.getData() : null,
				vRetailstoreid = oModelNavVtt ? oDataVtt.Retailstoreid : null,
				vDateTransaction = oModelNavVtt ? oDataVtt.Businessdaydate : null,
				vWorkstationid = oModelNavVtt ? oDataVtt.WorkstationidView : null,
				vTransnumber = oModelNavVtt ? oDataVtt.TransnumberView : null,
				vNav = vRetailstoreid ? true : false,
				vExecuteUpdate = false;
			let oSmTable = this.getView().byId("dataHeadPos::Table");
			var oModel = this.getView().getModel();
			oModel.attachRequestCompleted(function(oEvent) {
				if (!vExecuteUpdate && vNav && this.getView().getBindingContext()) {
					let
						oBindContext = this.getView().getBindingContext(),
						oModel = oBindContext.getModel(),
						vPath = oBindContext.getPath(),
						oObject = oBindContext.getObject();
					oModel.update(vPath, {
						Retailstoreid: vRetailstoreid,
						Businessdaydate: vDateTransaction,
						WorkstationidView: vWorkstationid,
						TransnumberView: vTransnumber
					}, {
						success: function(data) {
							oModel.refresh(true);
						}.bind(this)
					});
					oDataVtt.Retailstoreid = null;
					oDataVtt.Businessdaydate = null;
					oDataVtt.WorkstationidView = null;
					oDataVtt.TransnumberView = null;
					vExecuteUpdate = true;
				}
			}.bind(this));
			oSmTable.getToolbar().insertContent(new sap.m.Button({
				text: "Crear",
				visible: "{ui>/editable}",
				press: function() {
					var oModel = this.getView().getModel(),
						oViewBindPath = this.getView().getBindingContext().getPath(),
						oObjectView = this.getView().getBindingContext().getObject();
					this.getView().setBusy(true);
					oModel.create(oViewBindPath + "/to_Position", {
						//Guidreg: oObjectView.Guidreg,
						ModifOper: true,
						Transnumber: oObjectView.TransnumberView,
						Retailstoreid: oObjectView.Retailstoreid,
						Workstationid: oObjectView.WorkstationidView,
						Transactiontypecode: oObjectView.Transactiontypecode,
						Businessdaydate: oObjectView.Businessdaydate,
					}, {
						success: function(data) {
							oModel.refresh(true);
							setTimeout(function() {
								var oSmTable = this.getView().byId("dataHeadPos::Table"),
									oTable = oSmTable.getTable(),
									oItems = oTable.getItems(),
									oItemCreate = oItems[oItems.length - 1],
									vItemCreateId = oItemCreate.getId(),
									i, j;
								var oElement = document.getElementById(vItemCreateId),
									oImputs = oElement.getElementsByTagName("input");
								for (i = 0, j = oImputs.length; i < j; ++i) {
									var oInput = oImputs[i];
									var vPropLabel = oInput.getAttribute("aria-labelledby");
									if (vPropLabel && vPropLabel.includes("Tenderamount")) {
										oInput.focus();
									}
								}
								this.getView().setBusy(false);
							}.bind(this), 500);
						}.bind(this)
					});
					oModel.refresh(true);
				}.bind(this)
			}), 2);
		},
		onDataReceived: function(oEvent) {
			debugger;
		}
	};
	return oController;
});