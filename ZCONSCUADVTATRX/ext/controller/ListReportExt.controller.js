sap.ui.controller("app.inetum.zconscuadvtatrx.ext.controller.ListReportExt", {
	onAfterRendering: function(oEvent) {
		var oTollbars = this.getView().byId("template::ListReport::TableToolbar"),
			sTable = this.getView().byId("responsiveTable"),
			oListReport = sTable.getParent();

		this.getView().setModel(new sap.ui.model.json.JSONModel({
			TrxBegin: "",
			Trxend: ""
		}), "modelRange");
		oTollbars.insertContent(new sap.m.Text({
			text: "Rango de transacciones: {modelRange>/TrxBegin} - {modelRange>/Trxend}"
		}), 2);
		sTable.attachUpdateFinished(function(oEvent) {
			var oModel = this.getView().getModel(),
				oSmartFilter = this.getView().byId("listReportFilter"),
				oFilterData = oSmartFilter.getFilterData(),
				oFilters = [],
				oModelRange = this.getView().getModel("modelRange"),
				oTable = oEvent.getSource(),
				oItems = oTable.getItems(),
				oPath;
			if (oItems.length > 0) {
				oPath = oItems[0].getBindingContext().getPath();
				oModel.read(oPath, {
				success: function(data) {
					if (data) {
						oModelRange.setProperty("/TrxBegin", data.Trxinit);
						oModelRange.setProperty("/Trxend", data.Trxend);
					} else {
						oModelRange.setProperty("/TrxBegin", "");
						oModelRange.setProperty("/Trxend", "");
					}
					oModelRange.refresh(true);
				}.bind(this),
				error: function(resp) {
					oModelRange.setProperty("/TrxBegin", "");
					oModelRange.setProperty("/Trxend", "");
					oModelRange.refresh(true);
				}.bind(this)
			});
			}	
				
			/*oFilters.push(new sap.ui.model.Filter(
				"Retailstoreid",
				sap.ui.model.FilterOperator.EQ,
				oFilterData.retailstoreid
			));
			oFilters.push(new sap.ui.model.Filter(
				"Businessdaydate",
				sap.ui.model.FilterOperator.EQ,
				 new Date(oFilterData.businessdaydate.getTime() - oFilterData.businessdaydate.getTimezoneOffset() * 60000) 
				//oFilterData.businessdaydate
			));
			oFilters.push(new sap.ui.model.Filter(
				"Workstationid",
				sap.ui.model.FilterOperator.EQ,
				oFilterData.workstationidview.replace(/^(0+)/g, '')
			));
			oModel.read("/Trxmaxmin", {
				filters: [oFilters],
				success: function(data) {
					if (data.results.length > 0) {
						oModelRange.setProperty("/TrxBegin", data.results[0].Transnumbermin);
						oModelRange.setProperty("/Trxend", data.results[0].Transnumbermax);
					} else {
						oModelRange.setProperty("/TrxBegin", "");
						oModelRange.setProperty("/Trxend", "");
					}
					oModelRange.refresh(true);
				}.bind(this),
				error: function(resp) {
					oModelRange.setProperty("/TrxBegin", "");
					oModelRange.setProperty("/Trxend", "");
					oModelRange.refresh(true);
				}.bind(this)
			});*/
		}.bind(this));
	},
	onListNavigationExtension: function(oEvent, oBindingContext, bReplace) {
		var
			oPropSelected = oEvent.getParameter("listItem").getBindingContext().getProperty(),
			vDate = oPropSelected.businessdaydate.toISOString().replaceAll("T00:00:00.000Z", "T00%3A00%3A00");

		this._onNavigateWithoutDraft(
			oPropSelected.retailstoreid,
			vDate,
			oPropSelected.transindex,
			oPropSelected.transnumber.replace(/^0+/, ''),
			oPropSelected.workstationid.replace(/^0+/, ''));

		return true;
	},
	_onNavigateWithoutDraft: function(pStoreid, pDate, pIndex, pTransNumber, pWorkstation) {
		var vRoute = "Head/Head(Retailstoreid='" + pStoreid +
			"',Businessdaydate=datetime'" + pDate +
			"',Transindex=" + pIndex + ",Transnumber='" + pTransNumber +
			"',Workstationid='" + pWorkstation + "')";

		if (sap.ushell.Container) {
			sap.ushell.Container
				.getService("CrossApplicationNavigation")
				.toExternal({
					target: {
						semanticObject: "zconsultrx",
						action: "manage"
					},
					appSpecificRoute: vRoute
				});
		}
	}

});