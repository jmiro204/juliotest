/*global location*/
sap.ui.define([
	"app/inetum/zcarauditinciv2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/inetum/zcarauditinciv2/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text"
], function(
	BaseController,
	JSONModel,
	History,
	formatter,
	Filter,
	FilterOperator,
	Dialog,
	Button,
	Text
) {
	"use strict";

	return BaseController.extend("app.inetum.zcarauditinciv2.controller.Object", {

		formatter: formatter,
		fCountDataReceived: 0,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0,
					mod: false,
					cre: false,
					vis: false
				});

			/*this.setModel(new JSONModel({
				mod: false,
				cre: false,
				vis: false
			}), "objectView");*/
			this.setModel(new JSONModel({}), "Motivo");
			if (!this.gPropertyReadTransaction) {
				this.gPropertyReadTransaction = {
					"to_PositionMp": {
						"results": []
					},
					"to_Position": {
						"results": []
					}
				};
			}

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId,
				oModel = this.getModel("objectView"),
				oContext;
			this.getView().unbindElement();
			this.getView().setBusy(false);
			if (sObjectId !== "C") {
				this._initializeEditable(false);
				oModel.setProperty("/mod", false);
				oModel.setProperty("/cre", false);
				oModel.setProperty("/vis", true);
				oModel.refresh(true);
				this.getModel().metadataLoaded().then(function() {
					this._bindView("/" + sObjectId);
				}.bind(this));
			} else {
				this._initializeEditable(true);
				oModel.setProperty("/mod", false);
				oModel.setProperty("/cre", true);
				oModel.setProperty("/vis", false);
				oModel.refresh(true);
				oContext = this.getView().getModel().createEntry("/Incidencias", {
					properties: {
						Businessdaydate: new Date(),
						Fecha: new Date(),
						Instancia: true,
						Transcurrency: "EUR",
						StatusInci: '01',
						to_Position: []
					},
					success: function(oData) {
						debugger;
					}.bind(this)
				});

				this.getView().setBindingContext(oContext);
				/*this.getView().byId("smartTablePosE").setTableBindingPath(oContext.getPath() + "/to_Position");
				this.getView().byId("smartTablePosE").rebindTable(true);*/

				// this.getView().byId("smartTablePosMp").setTableBindingPath(oContext.getPath() + "/to_PositionMp");
				// this.getView().byId("smartTablePosMp").rebindTable(true);

				// this.getView().byId("smartTablePosE").setTableBindingPath(oContext.getPath() + "/to_Position");
				// this.getView().byId("smartTablePosE").rebindTable(true);

				this.setModel(new JSONModel([]), "modelPositionMp");
				this.setModel(new JSONModel([]), "modelPositionMLv");
				oModel.setProperty("/busy", false);

			}
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function(sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				parameters: {
					expand: "to_Position,to_PositionMp"
				},
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.metadataLoaded().then(function() {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function() {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding(),
				oModel = this.getModel();
			this.onHandleCencelToggled();
			this._initializeEditable(false);
			//this.getView().byId("smartTablePos").insertCustomData(new sap.ui.core.CustomData({key:"useSmartToggle", value: true }),1);
			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				//this.getRouter().getTargets().display("objectNotFound");
				return;
			}
			/*	this.getView().byId("Transtypecodemodif").onAfterRendering(function(oEvent) {
					debugger;
				}.bind(this));*/
			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.Retailstoreid,
				sObjectName = oObject.Transnumber,
				sBindContextView = this.getView().getBindingContext(),
				oObjectPosition = [];
			/*this.getView().byId("smartTablePosE").setTableBindingPath(this.getView().getBindingContext().getPath() + "/to_Position");
			this.getView().byId("smartTablePosE").rebindTable(true);*/
			// this.getView().byId("smartTablePosMp").setTableBindingPath(this.getView().getBindingContext().getPath() + "/to_PositionMp");
			// this.getView().byId("smartTablePosMp").rebindTable(true);
			//this.getView().byId("smartTablePosE").setTableBindingPath(this.getView().getBindingContext().getPath() + "/to_Position");
			//this.getView().byId("smartTablePosE").rebindTable(true);
			this.gPropertyReadTransaction.to_Position.results = [];
			this.gPropertyReadTransaction.to_PositionMp.results = [];

			if (oObject.to_PositionMp.__list) {
				oObject.to_PositionMp.__list.forEach(function(path) {
					var oProp = oModel.getObject("/" + path);
					oProp.Path = "/" + path;
					this.gPropertyReadTransaction.to_PositionMp.results.push(Object.assign([], oProp));
				}.bind(this));
				if (this.getModel("modelPositionMp")) {
					this.getModel("modelPositionMp").setData(this.gPropertyReadTransaction.to_PositionMp.results);
				} else {
					this.setModel(new JSONModel(this.gPropertyReadTransaction.to_PositionMp.results), "modelPositionMp");
				}

			}
			if (oObject.to_Position.__list) {
				oObject.to_Position.__list.forEach(function(path) {
					var oProp = oModel.getObject("/" + path);
					oProp.Path = "/" + path;
					this.gPropertyReadTransaction.to_Position.results.push(Object.assign([], oProp));
				}.bind(this));
				if (this.getModel("modelPositionMLv")) {
					this.getModel("modelPositionMLv").setData(this.gPropertyReadTransaction.to_Position.results);
				} else {
					this.setModel(new JSONModel(this.gPropertyReadTransaction.to_Position.results), "modelPositionMLv");
				}

			}

			//this.gPropertyReadTransaction.to_PositionMp.results = 

			oViewModel.setProperty("/busy", false);
			// Add the object page to the flp routing history
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("objectTitle") + " - " + sObjectName,
				icon: "sap-icon://enter-more",
				intent: "#Incidenciaauditoria-display&/Incidencias/" + sObjectId
			});

		},
		onBeforeRebindTable: function(oEvent) {
			var that = this;
			var oBindingParams = oEvent.getParameter("bindingParams");
			//this.getView().setBusy(true);
			oBindingParams.events = {
				"dataReceived": function(oEvent) {
					that._changeValueVisibleEditableMotivo();
					// 		// this.fCountDataReceived = this.fCountDataReceived + 1;
					// 		// if (this.fCountDataReceived === 2) {
					//this.getView().setBusy(false);
					// 		// 	this.fCountDataReceived = 0;
					// 		// }
				}

			};
			this._setFieldEditableForMot(false);
		},
		onChangeValueHeader: function(oEvent) {
			var oChangeEvent = oEvent.getParameter("changeEvent"),
				oSource = oChangeEvent ? oChangeEvent.getSource() : oEvent.getSource(),
				vValue = oSource.getBinding("value").getPath() !== "Auditbusinessdaydate" || oSource.getBinding("value").getPath() !== "Fecha" ?
				oSource.getValue() : oSource.getContent().getDateValue(),
				oContext = oSource.getBindingContext(),
				oModel = oSource.getModel(),
				vPath = oSource.getBinding("value").getPath(),
				sBindObjectView, // = this.getView().getBindingContext().getObject(),
				oModelTransaction = this.getModel("Transaction"),
				oCorrectDateValue;
			if (vPath === "Retailstoreid") {
				var StoreName = this.getView().getModel().getObject("/zcds_audit_storeid_vh('" + vValue + "')");
				if (StoreName) {
					oModel.setProperty('RetailstoreidText', StoreName.RetailstoreidText, oContext);
				}
			}
			if (vPath === "Auditbusinessdaydate" || vPath === "Fecha") {
				oCorrectDateValue = new Date(Date.UTC(vValue.getFullYear(), vValue.getMonth(), vValue.getDate()));
				vValue = oCorrectDateValue;
				//vValue = new Date(vValue);
				//vValue = new Date(vValue.getTime() - vValue.getTimezoneOffset() * 180000);
			}
			oModel.setProperty(vPath, vValue, oContext);
			sBindObjectView = this.getView().getBindingContext().getObject();
			if (
				((sBindObjectView.Retailstoreid && sBindObjectView.Auditbusinessdaydate && sBindObjectView.Workstationid && sBindObjectView.Transnumber) &&
					(sBindObjectView.Retailstoreid !== "" && sBindObjectView.Auditbusinessdaydate !== "" && sBindObjectView.Workstationid !== "" &&
						sBindObjectView.Transnumber !== "")) && (vPath === "Retailstoreid" || vPath === "Auditbusinessdaydate" || vPath ===
					"Workstationid" ||
					vPath ===
					"Transnumber")
			) {
				sBindObjectView.Auditbusinessdaydate = this.getView().byId("Auditbusinessdaydate").getContent().getDateValue();
				oCorrectDateValue = new Date(Date.UTC(sBindObjectView.Auditbusinessdaydate.getFullYear(), sBindObjectView.Auditbusinessdaydate.getMonth(),
					sBindObjectView.Auditbusinessdaydate.getDate()));
				this.getView().setBusy(true);
				oModelTransaction.read("/Head", {
					urlParameters: {
						"$expand": "to_Position,to_PositionMp,to_Typecode,to_PositionRepVale"
					},
					filters: [
						new Filter("Retailstoreid", FilterOperator.EQ, sBindObjectView.Retailstoreid.padStart(10, '0')),
						new Filter("Auditbusinessdaydate", FilterOperator.EQ, oCorrectDateValue),
						new Filter("Workstationid", FilterOperator.EQ, sBindObjectView.Workstationid.padStart(10, '0')),
						new Filter("Transnumber", FilterOperator.EQ, sBindObjectView.Transnumber.padStart(20, '0'))
					],
					success: function(data, resp) {
						// if data.transtipcode hacer NORMAL, else esa transaccion no es permitida para incidencias y deshabilitAR BOTON GUARDADO
						var transactions = data.results;
						if (transactions.length > 0 &&
							(transactions[0].Transtypecode === '103' || transactions[0].Transtypecode === '104')) {
							this.getView().setBusy(false);
							if (data.results.length > 0) {
								this.gPropertyReadTransaction = data.results[0];
								oModel.setProperty("transindex", this.gPropertyReadTransaction.Transindex, oContext);
								oModel.setProperty("AuditbusinessdaydateModif", this.gPropertyReadTransaction.AuditbusinessdaydateCalc, oContext);
								oModel.setProperty("Auditbusinessdaydate", this.gPropertyReadTransaction.Auditbusinessdaydate, oContext);
								oModel.setProperty("Businessdaydate", this.gPropertyReadTransaction.Businessdaydate, oContext);
								oModel.setProperty("Transtypecode", this.gPropertyReadTransaction.Transtypecode, oContext);
								oModel.setProperty("Transtypecodetext", this.gPropertyReadTransaction.to_Typecode.Description, oContext);
								oModel.setProperty("Begindate", this.gPropertyReadTransaction.beginFecha, oContext);
								oModel.setProperty("Salesamount", this.gPropertyReadTransaction.Zzimptrans, oContext);
								oModel.setProperty("origbusinessdate", this.gPropertyReadTransaction.AuditbusinessdaydateOrg, oContext);
								oModel.setProperty("Origstoreid", this.gPropertyReadTransaction.Origstoreid, oContext);
								oModel.setProperty("origwrkstid", this.gPropertyReadTransaction.Origwrkstid, oContext);
								oModel.setProperty("origtransnumber", this.gPropertyReadTransaction.Origtransnumber, oContext);
								oModel.setProperty("Orgimptrans", this.gPropertyReadTransaction.Orgimptrans, oContext);
								this.getView().byId("btnSave").setEnabled(true);
								this._setTransactionPositionMp();
								//this._changeValueVisibleEditableMotivo();

							}
							this._changeValueVisibleEditableMotivo(false, true)
							oModel.refresh(true);
						} else {
							oModel.setProperty("AuditbusinessdaydateModif", "", oContext);
							oModel.setProperty("origbusinessdate", "", oContext);
							oModel.setProperty("Origstoreid", "", oContext);
							oModel.setProperty("origwrkstid", "", oContext);
							oModel.setProperty("origtransnumber", "", oContext);
							oModel.setProperty("Orgimptrans", "0", oContext);
							oModel.setProperty("Motivo", "", oContext);
							this.getView().byId("btnSave").setEnabled(false);
							this.getView().getModel("modelPositionMp").setData([]);
							this.getView().getModel("modelPositionMLv").setData([]);
							sap.m.MessageBox.alert("Transaccion no permitida o no encontrada")

							this.getView().byId("btnSave").setEnabled(false);
							// Crear el popup si hay mensajes de error
							/*var oDialog1 = new sap.m.Dialog({
								title: 'Error Messages',
								type: 'Message',
								state: 'Error',
								content: new sap.m.Text({
									text: 'Transaccion no permitida o no encontrada'
								}),
								beginButton: new sap.m.Button({
									text: 'Close',
									press: function() {
										oDialog1.close();
									}
								}),
								afterClose: function() {
									oDialog1.destroy();

								}
							});
							// Mostrar el popup
							oDialog1.open();*/

						}
						this.getView().setBusy(false);
					}.bind(this),
					error: function() {
						this.getView().setBusy(false);
					}.bind(this)
				});
			} else if ((vPath === "Retailstoreid" || vPath === "Auditbusinessdaydate" || vPath === "Workstationid" || vPath === "Transnumber") &&
				vValue === '') {
				//Se ha borrado algun campo de transacción
				oModel.setProperty("AuditbusinessdaydateModif", "", oContext);
				oModel.setProperty("Transtypecode", "", oContext);
				oModel.setProperty("Transtypecodetext", "", oContext);
				oModel.setProperty("Salesamount", "", oContext);
				oModel.setProperty("origbusinessdate", "", oContext);
				oModel.setProperty("Origstoreid", "", oContext);
				oModel.setProperty("origwrkstid", "", oContext);
				oModel.setProperty("origtransnumber", "", oContext);
				oModel.setProperty("Orgimptrans", "0", oContext);
				oModel.setProperty("Motivo", "", oContext);
				this.getView().getModel("modelPositionMp").setData([]);
				this.getView().getModel("modelPositionMLv").setData([]);
				this.getView().getModel("modelPositionMp").refresh(true);
				this.getView().getModel("modelPositionMLv").refresh(true);
				oModel.refresh(true);
				this.getView().byId("btnSave").setEnabled(false);

			} else if (vPath === "Motivo") {
				this._setTransactionPositionMp(true);
				if (!this.gFieldValidate || this.gFieldValidate.Motivo !== vValue) {
					this._setFieldEditableForMot(false);
				} else {
					this._changeValueVisibleEditableMotivo(false);
				}

			} else if (vPath === "Salesamountmodif") {
				var vSalesAmount = parseFloat(oContext.getObject().Salesamount.replaceAll(",", ".")),
					vSalesAmountModif = parseFloat(oContext.getObject().Salesamountmodif.replaceAll(",", ".")),
					vSalesCalc = vSalesAmount + vSalesAmountModif;
				oModel.setProperty("Salesamountcalc", vSalesCalc.toFixed(2).toString(), oContext);
				oModel.setProperty("Salesamountmodif", vSalesAmountModif.toString(), oContext);
			}
			oModel.refresh();
		},
		_setTransactionPositionMp: function(pChangeMotivo) {
			var oContext = this.getView().getBindingContext(),
				oObject = oContext.getObject(),
				oTableVLP = this.getView().byId("smartTablePosLVE"),
				oTableV = this.getView().byId("smartTablePosE"), //oTableSmartV.getTable(),
				oItemV = oTableV.getItems(),
				oItemVLP = oTableVLP.getItems(),
				oModel = this.getModel(),
				vTenderline = 0,
				oPositionMpGroup = [],
				oPositionEfectivoNegativo,
				oPositionEfectivoPositivo,
				oContextChild;
			//Si se cambio de transacción se debe borrar lo anterior en la tabla de posición en TLOG
			if (!pChangeMotivo) {
				oObject.to_PositionMp = [];
				oObject.to_Position = [];
				/*Agrupación de importes de efectivo*/
				oPositionEfectivoNegativo = (oObject.Transtypecode === '101' || oObject.Transtypecode === '111' || oObject.Transtypecode ===
						'103') ? this.gPropertyReadTransaction.to_PositionMp.results.find((o) => o.TipomedpagoV === '010' && parseFloat(o.Tenderamount) <=
						0) :
					oPositionEfectivoNegativo;
				oPositionEfectivoPositivo = this.gPropertyReadTransaction.to_PositionMp.results.find((o) => o.TipomedpagoV === '010' && parseFloat(
					o.Tenderamount) > 0);
				if (oPositionEfectivoNegativo) {
					oObject.to_PositionMp.push({
						Retailstoreid: oPositionEfectivoNegativo.Retailstoreid,
						Businessdaydate: oPositionEfectivoNegativo.Businessdaydate,
						Workstationid: oPositionEfectivoNegativo.Workstationid,
						Tendernumber: oPositionEfectivoNegativo.Tendernumber,
						Transnumber: oPositionEfectivoNegativo.Transnumber,
						Mediopago: oPositionEfectivoNegativo.ZzcodepagoNegV,
						Desgloce: oPositionEfectivoNegativo.ZzcodpagoDesgV,
						Subtipo: oPositionEfectivoNegativo.SubtipoV,
						Cardnumber: oPositionEfectivoNegativo.CardnumberV,
						Tenderamount: ( parseFloat(oPositionEfectivoNegativo.Tenderamount) + parseFloat(
							oPositionEfectivoPositivo.Tenderamount) ).toString(),
						Tendercurrency: oPositionEfectivoNegativo.Tendercurrency
					});
					vTenderline = vTenderline + 1;
				}
				//Actualizamos table de positión MP RQ21
				this.gPropertyReadTransaction.to_PositionMp.results.forEach(function(item) {
					if (
						(item.TipomedpagoV !== '010' && oPositionEfectivoNegativo) || !oPositionEfectivoNegativo
					) {
						oObject.to_PositionMp.push({
							Retailstoreid: item.Retailstoreid,
							Businessdaydate: item.Businessdaydate,
							Workstationid: item.Workstationid,
							Tendernumber: item.Tendernumber,
							Transnumber: item.Transnumber,
							Mediopago: item.ZzcodepagoNegV,
							Desgloce: item.ZzcodpagoDesgV,
							Subtipo: item.SubtipoV,
							Cardnumber: item.CardnumberV,
							Tenderamount: item.Tenderamount,
							Tendercurrency: item.Tendercurrency
						});
						vTenderline = vTenderline + 1;
					}
				}.bind(this));
				this.gPropertyReadTransaction.to_PositionMp.results = oObject.to_PositionMp;

				//Actualizamos table de positión MP - Extensiones AUX12
				this.gPropertyReadTransaction.to_PositionRepVale.results.forEach(function(item) {
					vTenderline = vTenderline + 1;
					oObject.to_PositionMp.push({
						Retailstoreid: item.Retailstoreid,
						Businessdaydate: item.Businessdaydate,
						Workstationid: item.Workstationid,
						Tendernumber: vTenderline.toString(),
						Transnumber: item.Transnumber,
						Mediopago: item.ZzcodepagoNeg,
						Desgloce: item.ZzcodpagoDesg,
						Subtipo: item.Subtipo,
						Tenderamount: item.Tenderamount
					});
					/*this.gPropertyReadTransaction.to_PositionMp.results.push({
						Retailstoreid: item.Retailstoreid,
						Businessdaydate: item.Businessdaydate,
						Workstationid: item.Workstationid,
						Tendernumber: vTenderline.toString(),
						Transnumber: item.Transnumber,
						Mediopago: item.ZzcodepagoNeg,
						Desgloce: item.ZzcodpagoDesg,
						Subtipo: item.Subtipo,
						Tenderamount: item.Tenderamount
					})*/
				}.bind(this));

				//Actualizamos table de positión LV Articulos
				this.gPropertyReadTransaction.to_Position.results.forEach(function(item) {
					oObject.to_Position.push({
						Retailstoreid: item.Retailstoreid,
						Businessdaydate: item.Businessdaydate,
						Workstationid: item.workstationid,
						Retailnumber: item.Retailnumber,
						Transnumber: item.Transnumber,
						Zzcoddpto: item.Zzcoddpto,
						Zzarthost: item.Zzarthost,
						ZzCalifArtic: item.ZzCalifArtic,
						Retailquantity: item.Retailquantity,
						Salesamount: item.Salesamount,
						Zzlvimpneto: item.Zzlvimpneto,
						Zzlvimpbruto: item.Zzlvimpbruto,
						Zzcampoc: item.Zzcampoc,
						Salesuom: item.Salesuom,
						Transcurrency: item.Transcurrency,
						Salesamountmodif2: "0.00"
					});
				}.bind(this));
				this.getModel("modelPositionMp").setData(oObject.to_PositionMp);
				this.getModel("modelPositionMp").refresh(true);
				this.getModel("modelPositionMLv").setData(oObject.to_Position);
				this.getModel("modelPositionMLv").refresh(true);
			}
		},
		onHandleDeleteToggled: function(oEvent) {

		},
		onHandleCencelToggled: function(oEvent) {
			//var sEditableForm = this.getView().byId("smartFormHeader").getEditable();
			var oModel = this.getModel("objectView");
			oModel.setProperty("/cre", false);
			oModel.setProperty("/mod", false);
			oModel.setProperty("/vis", true);
			this._initializeEditable(false);
			this._setFieldEditableForMot(true);
			oModel.refresh(true);
		},
		onHandleEditToggled: function(oEvent) {
			//var sTypeCodeModif = this.getView().byId("Transtypecodemodif").getValue();
			//var sEditableForm = this.getView().byId("smartFormHeader").getEditable();
			var oModel = this.getModel("objectView");
			oModel.setProperty("/cre", false);
			oModel.setProperty("/mod", true);
			oModel.setProperty("/vis", false);
			this._initializeEditable(true);
			this._setFieldEditableForMot(false);
			oModel.refresh(true);

		},
		_setFieldEditableForMot: function(pCancelEdit) {
			var
			//oTableSmart = this.getView().byId("smartTablePosE"),
				oModel = this.getModel(),
				oModelView = this.getView().getBindingContext().getObject(),
				//oTable = oTableSmart.getTable(),
				//oItems = oTable.getItems(),
				vCancelEdit = pCancelEdit;
			oModel.read("/zcar_cds_motivo_inci_vh", {
				filters: [
					new Filter("Motivo", FilterOperator.EQ, oModelView.Motivo.padStart(2, "0"))
				],
				success: function(data, resp) {
					if (data.results.length > 0) {
						var oMotivo = data.results[0];
						this.gFieldValidate = oMotivo;
						this.setModel(new JSONModel(oMotivo), "Motivo");
						this.getModel("Motivo").refresh(true);
						if (pCancelEdit) {
							this._changeValueVisibleEditableMotivo(vCancelEdit);
						}

					}
				}.bind(this)

			});
		},
		_changeValueVisibleEditableMotivo: function(pCancelEdit, pPositions) {
			/*var
				oModel = this.getModel("objectView"),
				oEdit = oModel.getProperty("/mod") ? oModel.getProperty("/mod") : oModel.getProperty("/vis"),
				oTable = this.getView().byId("smartTablePosE"),
				oTableLVE = this.getView().byId("smartTablePosLVE"),
				oItems = oTable.getItems(),
				oItemsLVE = oTableLVE.getItems();
			if (!pPositions && this.gFieldValidate) {
				if (!oEdit) {
					this.getView().byId("TranstypecodemodifSM").setValue();
				}
				this.getView().byId("TranstypecodemodifSM").setEditable(this.gFieldValidate["Transtypecodemodif"] && this.gFieldValidate[
						"Transtypecodemodif"] ===
					"SI" && !pCancelEdit ? true : false);
				this.getView().byId("TranstypecodemodifSM").setVisible(this.gFieldValidate["Transtypecodemodif"] && this.gFieldValidate[
						"Transtypecodemodif"] ===
					"SI" && !pCancelEdit ? false : false);
				this.getView().byId("TranstypecodemodifTXT").setVisible(this.gFieldValidate["Transtypecodemodif"] && this.gFieldValidate[
						"Transtypecodemodif"] ===
					"SI" && !pCancelEdit ? false : true);

				this.getView().byId("ImptransModif").setEditable(this.gFieldValidate["Salesamountmodif"] && this.gFieldValidate[
						"Salesamountmodif"] ===
					"SI" && !pCancelEdit ? true : false);

			}

			//Actualizar estado de items MP
			oItems.forEach(function(item) {
				var oCells = item.getCells();
				oCells.forEach(function(cells) {
					var sPath = cells.getBinding("value") ? cells.getBinding("value").getPath() : "";
					if (sPath !== "") {
						if (sPath.includes("Medpgsubtip")) {
							cells.setEditable(true);
						} else if (this.gFieldValidate && this.gFieldValidate[sPath] && this.gFieldValidate[sPath] === "SI" && !pCancelEdit) {
							cells.setEditable(true);
							if (!oEdit) {
							}

						} else if (this.gFieldValidate && this.gFieldValidate[sPath] && this.gFieldValidate[sPath] === "NO" && !pCancelEdit) {
							cells.setEditable(false);
							if (!oEdit) {
								cells.setValue();
							}
						} else if (sPath.includes("Tenderamountmodif2") || sPath.includes("Tenderamountmodif")) {
							cells.setEditable(false);
							if (!oEdit) {
								cells.setValue();
							}
						} else {
							cells.setEditable(false);
							if (!oEdit) {
							}
						}
					}
				}.bind(this));
			}.bind(this));*/
			//Actualizar estado de items Linea de Venta
			/*	oItemsLVE.forEach(function(item) {
					var oCells = item.getCells();
					oCells.forEach(function(cells) {
						var sPath = cells.getBinding("value") ? cells.getBinding("value").getPath() : "";
						if (sPath !== "") {
							if (this.gFieldValidate && this.gFieldValidate[sPath] && this.gFieldValidate[sPath] === "SI" && !pCancelEdit) {
								cells.setEditable(true);
								if (!oEdit) {
									cells.setValue();
								}
							} else {
								cells.setEditable(false);
							}
						}
					}.bind(this));
				}.bind(this));*/
		},
		_initializeEditable: function(pEditable) {

			/*	if (pEditable === false) {
					var oView = this.getView();

					oView.byId("Fecha").setEditable(false);
					oView.byId("Auditbusinessdaydate").setEditable(false);
					oView.byId("Retailstoreid").setEditable(false);
					oView.byId("Workstationid").setEditable(false);
					oView.byId("Transnumber").setEditable(false);
					oView.byId("Begindate").setEditable(false);
					oView.byId("origbusinessdate").setEditable(false);
					oView.byId("Origstoreid").setEditable(false);
					oView.byId("origwrkstid").setEditable(false);
					oView.byId("origtransnumber").setEditable(false);
					oView.byId("MotivoSM").setEditable(false);
					oView.byId("Observacion").setEditable(false);
					oView.byId("TranstypecodemodifSM").setEditable(false);
					//Posicion
					oView.byId("Tendernumber").setEditable(false);
					oView.byId("Custcardnumbermodif").setEditable(false);
					oView.byId("Cardnumber").setEditable(false);
					oView.byId("Tenderamount").setEditable(false);
					oView.byId("Tenderamountmodif").setEditable(false);
					oView.byId("Tenderamountmodif2").setEditable(false);
					oView.byId("Mediopago").setEditable(false);
					oView.byId("Mediopago1").setEditable(false);
					this._changeValueVisibleEditableMotivo(true);
				}*/
			//this.getView().byId("smartFormHeader").setEditable(pEditable);
		},
		onChangeSalesAmount: function(oEvent) {
			var vValue = oEvent.getSource().getValue(),
				oContext = this.getView().getBindingContext();
			this._setValueAmount(vValue, "Salesamountcalc", oContext, null, oEvent.getSource());
		},
		onChangeValuePosition: function(oEvent) {
			var oChangeEvent = oEvent.getParameter("changeEvent") ? oEvent.getParameter("changeEvent") : oEvent,
				vValue = oChangeEvent.getSource().getValue(),
				oContext = oEvent.getSource().getBinding("value").getContext(), //oChangeEvent.getSource().getBindingContext("modelPositionMp"),
				oModel = oChangeEvent.getSource().getModel("modelPositionMp"),
				vPath = oChangeEvent.getSource().getBinding("value").getPath(),
				vFindMP = false;
			oChangeEvent.getSource().setValueState("None");
			if (vPath === "Tenderamountmodif" || vPath === "Salesamountmodif") {
				this._setValueAmount(vValue, vPath, oContext, null, oChangeEvent.getSource());
			} else if (vPath === "Medpgsubtip") {
				var sPath = "/zcar_cds_i_mediopago_vh(Mediopagosub='" + vValue + "',Mediopago='" + vValue.substring(6, 9) + "')";
				var sObject = this.getModel().getObject(sPath);
				oModel.setProperty(oContext.getPath() + "/" + vPath, vValue.toString());
				oModel.setProperty(oContext.getPath() + "/" + "Mediopagotexts", sObject.Mediopagotext);
				oModel.setProperty(oContext.getPath() + "/" + "Mediopago", sObject.Mediopago);
				oModel.setProperty(oContext.getPath() + "/" + "Desgloce", sObject.Desgloce);
				this.gPropertyReadTransaction.to_PositionMp.results.forEach(function(item) {
					if (item.ZzcodepagoNeg === sObject.Mediopago && item.ZzcodpagoDesg === sObject.Desgloce) {
						oModel.setProperty(oContext.getPath() + "/" + "Tendernumber", item.Tendernumber);
						vFindMP = true;
					}
				}.bind(this));
				if (!vFindMP) {
					sap.m.MessageBox.alert("El medio de pago indicado no se encuentra en la transacción")
				} else if (vFindMP && oContext.getObject().Tenderamountmodif && oContext.getObject().Tenderamountmodif !== "") {
					this._setValueAmount(oContext.getObject().Tenderamountmodif, "Tenderamountmodif", oContext, null, null);
				}
			} else {
				oModel.setProperty(oContext.getPath() + "/" + vPath, vValue.toString());
			}
		},
		_setValueAmount: function(pValue, pPoperty, pContext, pProperty, oInput) {
			var oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(),
				oContext = pContext,
				oContextView = this.getView().getBindingContext().getObject(),
				oModel = oContext.getModel(), //this.getModel("modelPositionMp"),
				vPattern1 = /^[0-9]+(\.)?[0-9]$/,
				vPattern2 = /^[0-9]+(\.)?[0-9][0-9]$/,
				vPattern3 = /^[0-9]+(\.)?[0-9][0-9][0-9]$/,
				vPatterNumber = /^-?[0-9]+(?:\.[0-9]+)?$/,
				vFormateValue;
			if (pValue.includes(",")) {
				pValue = pValue.replace(".", "");
				pValue = pValue.replace(",", ".");
				pValue = parseFloat(pValue).toFixed(2);
				vFormateValue = vPatterNumber.test(pValue) ? oFloatFormat.format(pValue) : null;
			} else if (!isNaN(pValue)) {
				pValue = parseFloat(pValue).toFixed(2);
				vFormateValue = oFloatFormat.format(pValue);
			}
			if (vFormateValue) {
				var sChangeValue = parseFloat(pValue).toFixed(2),
					sValueOrig = oContextView.Salesamount ? parseFloat(oContextView.Salesamount) : 0,
					sValueCalculate = sValueOrig + parseFloat(sChangeValue)
				if (pPoperty === "Salesamountmodif") {
					/*	oModel.setProperty(oContext.getPath() + "/" + pPoperty, sValueCalculate.toString());
						oModel.setProperty(oContext.getPath() + "/Salesamountmodif", sChangeValue.toString(), oContext);
						if (!oContextView.Salesamount) {
							oModel.setProperty(oContext.getPath() + "/Salesamount", sValueOrig.toString(), oContext);
						}*/
					if (this.gPropertyReadTransaction) {
						this.gPropertyReadTransaction.to_Position.results.forEach(function(item) {
							if (
								item.Retailnumber === oContext.getObject().Retailnumber
							) {
								var sTotalS = parseFloat(parseFloat(item.Salesamount).toFixed(2)) + parseFloat(parseFloat(sChangeValue).toFixed(2));

								oModel.setProperty(oContext.getPath() + "/Salesamountmodif2", sTotalS.toString(), oContext);
								oModel.setProperty(oContext.getPath() + "/" + pPoperty, sChangeValue.toString());
								oModel.refresh(true);
							}
						}.bind(this));
					}
				} else if (pPoperty === "Tenderamountmodif") {
					if (this.gPropertyReadTransaction) {
						this.gPropertyReadTransaction.to_PositionMp.results.forEach(function(item) {
							if (
								item.Tendernumber === oContext.getObject().Tendernumber
							) {
								var sTotal = parseFloat(parseFloat(item.Tenderamount).toFixed(2)) + parseFloat(parseFloat(sChangeValue).toFixed(2));

								oModel.setProperty(oContext.getPath() + "/Tenderamountmodif2", sTotal.toFixed(2).toString(), oContext);
								oModel.setProperty(oContext.getPath() + "/" + pPoperty, sChangeValue.toString());

								oModel.refresh(true);
							}
							/*if (
								(
									item.ZzcodepagoNegV === oContext.getObject().Mediopago && item.ZzcodpagoDesgV === oContext.getObject().Desgloce
								) || (
									item.Mediopago === oContext.getObject().Mediopago && item.Desgloce === oContext.getObject().Desgloce
								) && (item.Tendernumber === oContext.getObject().Tendernumber)
							) {
								var sTotal = parseFloat(parseFloat(item.Tenderamount).toFixed(2)) + parseFloat(parseFloat(sChangeValue).toFixed(2));

								oModel.setProperty(oContext.getPath() + "/Tenderamountmodif2", sTotal.toString(), oContext);
								oModel.setProperty(oContext.getPath() + "/" + pPoperty, sChangeValue.toString());

								oModel.refresh(true);
							}*/
						}.bind(this));
					}
				}
			} else {
				oInput.setValueState("Error");
			}
		},
		onAddItems: function(oEvent) {
			/*var oContext = this.getView().getBindingContext(),
				oObject = oContext.getObject(),
				oModel = this.getModel(),
				oPosition = oObject.to_Position,
				oContextChild;
			if (oObject.to_Position.__list) {
				oObject.to_Position = oObject.to_Position.__list;
			}
			if (oObject.Motivo && oObject.Motivo !== "") {
				oContextChild = this.getView().getModel().createEntry("/Inciposact", {
					properties: {
						Businessdaydate: new Date()
					}
				});
				oObject.to_Position.push(oContextChild.getPath().slice(1));
				oModel.setProperty("to_Position", oObject.to_Position, oContext);
				this._changeValueVisibleEditableMotivo(false, true)
			} else {
				sap.m.MessageBox.alert("Debe indicar un motivo");
			}*/

		},
		onDeleteItems: function(oEvent) {
			/*var oTableSmart = this.getView().byId("smartTablePosE"),
				oTable = oTableSmart.getTable(),
				oContextSelected = oTable.getSelectedContexts(),
				oModel = this.getModel(),
				oContextView = this.getView().getBindingContext(),
				oObjectViewPosition = oContextView.getObject().to_Position;
			oContextSelected.forEach(function(item) {
				var vPath = item.getPath().slice(1);
				oModel.deleteCreatedEntry(item);
				oObjectViewPosition.forEach(function(pos, index) {
					if (pos === vPath) {
						oObjectViewPosition.splice(index, 1);
					}
				});
			});
			oModel.setProperty("to_Position", oObjectViewPosition, oContextView);*/
		},
		onHandleDeleteToggled: function(oEvent) {
			sap.m.MessageBox.confirm("Confirmar eliminación", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(sAction) {
					if (sAction === "OK") {
						this.onHandleDeleteToggledConfirm();
					}
				}.bind(this)
			});
		},
		onHandleDeleteToggledConfirm: function() {
			this._setSubMitBatchProces("D");
		},
		onSave: function(oEvent) {
			var oModel = this.getModel("objectView"),
				oAction = oModel.getProperty("/cre") ? "CRE" : "MOD",
				oContext = this.getView().getBindingContext(),
				oContextView = this.getView().getBindingContext().getObject(), // JSON.parse(JSON.stringify(this.getView().getBindingContext().getObject())) ,
				oModelView = this.getModel("objectView"),
				oModel = oContext.getModel(),
				oObjectPosition = [];
			if (this._validateFields()) {
				if (oAction === "CRE") {
					this._setSubMitBatchProces("C");
					// this._setCreate();
				} else {
					this._setSubMitBatchProces("M");
				}
			}
		},
		_setCreate: function() {
			var oModelView = this.getModel("objectView"),
				oContextView = this.getView().getBindingContext().getObject(),
				oModel = this.getModel(),
				oModelPos = this.getModel("modelPositionMp"),
				oPosition = [],
				vTenderNumber = true;
			/*oContextView.to_Position.forEach(function(item) {
				var sProp = this.getModel().getObject("/" + item);
				if (!sProp.Tendernumber || (sProp.Tendernumber && sProp.Tendernumber === "")) {
					vTenderNumber = false;
				}
				oPosition.push(sProp);
			}.bind(this));*/
			if (vTenderNumber) {
				oContextView.to_Position = oModelPos.getData();
				oContextView.Instancia = false;
				this.getView().setBusy(true);
				delete oContextView.__metadata;
				oContextView.to_PositionMp.forEach(function(item) {
					delete item.__metadata;
				});
				oModel.create("/Incidencias", oContextView, {
					success: function(data, resp) {
						//ASE
						if (resp.headers['sap-message']) {
							var response = JSON.parse(resp.headers['sap-message']);
							const errorMessages = response.details.filter(detail => detail.severity === 'error').map(detail => detail.message);

							// Incluir el mensaje principal si su severity es 'error'
							if (response.severity === 'error') {
								errorMessages.unshift(response.message);
							}

							// Crear el contenido del popup
							const errorMessagesText = errorMessages.join('\n');

							// Crear el popup si hay mensajes de error
							if (errorMessages.length > 0) {
								const oDialog = new sap.m.Dialog({
									title: 'Error Messages',
									type: 'Message',
									state: 'Error',
									content: new sap.m.Text({
										text: errorMessagesText
									}),
									beginButton: new sap.m.Button({
										text: 'Close',
										press: function() {
											oDialog.close();
										}
									}),
									afterClose: function() {
										oDialog.destroy();

									}
								});

								// Mostrar el popup
								oDialog.open();
							}
						} else {
							oModelView.setProperty("/cre", false);
							oModelView.setProperty("/mod", false);
							oModelView.setProperty("/vis", true);
							oModelView.refresh(true);
							this._initializeEditable(false);
							this._changeValueVisibleEditableMotivo(true);
							this.getModel().metadataLoaded().then(function() {
								var sObjectPath = this.getModel().createKey("Incidencias", {
									Retailstoreid: data.Retailstoreid,
									Businessdaydate: data.Businessdaydate,
									Workstationid: data.Workstationid,
									Transnumber: data.Transnumber
								});
								this._bindView("/" + sObjectPath);
							}.bind(this));
							this.getView().setBusy(false);
						}
						this.getView().setBusy(false);
					}.bind(this),
					error: function(resp) {
						this.getView().setBusy(false);
					}.bind(this)

				});
			} else {
				sap.m.MessageBox.alert("Una de las posiciones no corresponde con algún medio de pago indicado de la transacción")
			}
		},
		_setSubMitBatchProces: function(pAction) {
			var vAction = pAction,
				oModelView = this.getModel("objectView"),
				oContext = this.getView().getBindingContext(),
				oContextView = oContext.getObject(),
				oModelPos = this.getModel("modelPositionMp"),
				oDataPos = Object.assign([], oModelPos.getData()),
				oModelPosLV = this.getModel("modelPositionMLv"),
				oDataPosLV = Object.assign([], oModelPosLV.getData());
			//this.getView().setBusy(true);
			var tmpModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZCAR_SB_INCIDENCIAS_AUDIT/", true);
			tmpModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			tmpModel.setUseBatch(true);
			this.getView().setModel(tmpModel, "tmpModel");
			tmpModel.setDeferredGroups(["foo"]);
			this.gCOunt = 0;
			var mParameters = {
				groupId: "foo",
				success: function(odata, resp) {
					//ASEASE
					var errorMessagesTextModif,
						vError = "";
					if (resp && resp.data && resp.data.__batchResponses) {
						var responses = resp.data.__batchResponses[0].__changeResponses;
						// Array para almacenar todos los mensajes de error
						let errorMessagesModif = [];
						if (responses) {

							// Recorrer cada respuesta en el array
							responses.forEach(response => {
								if (response.headers["sap-message"]) {
									// Extraer y parsear el mensaje de `sap-message`
									var sapMessage = JSON.parse(response.headers["sap-message"]);

									// Filtrar los mensajes de error de `details`
									var detailErrorsModif = sapMessage.details.filter(detail => detail.severity === 'error');

									// Incluir el mensaje principal si su severidad es 'error'
									if (sapMessage.severity === 'error') {
										detailErrorsModif.unshift({
											message: sapMessage.message,
											severity: sapMessage.severity
										});
									}

									// Añadir los mensajes de error al array de errorMessages
									errorMessagesModif = errorMessagesModif.concat(detailErrorsModif);
								}
							});
						} else if (resp.data.__batchResponses && resp.data.__batchResponses.length &&
							resp.data.__batchResponses.length > 0 && resp.data.__batchResponses[0].response && resp.data.__batchResponses[0].response.body
						) {
							responses = JSON.parse(resp.data.__batchResponses[0].response.body);
							if (responses.error) {
								vError = responses.error.message.value;
							}
						}

						// Crear el contenido del popup
						if (vError !== "") {
							errorMessagesTextModif = vError;
						} else if (errorMessagesModif.length > 0) {
							errorMessagesTextModif = errorMessagesModif.map(detail => detail.message).join('\n');
						} else {
							errorMessagesTextModif = "";
						}

						// Crear el popup si hay mensajes de error
						if (errorMessagesTextModif !== "") {
							var oDialogModif = new sap.m.Dialog({
								title: 'Error Messages',
								type: 'Message',
								state: 'Error',
								content: new sap.m.Text({
									text: errorMessagesTextModif
								}),
								beginButton: new sap.m.Button({
									text: 'Close',
									press: function() {
										oDialogModif.close();
									}
								}),
								afterClose: function() {
									oDialogModif.destroy();
								}
							});

							// Mostrar el popup
							oDialogModif.open();
						}

						if (vAction === "C" && errorMessagesTextModif === "") {
							var oContext = this.getView().getBindingContext(),
								oProperty = oContext.getObject();
							oModelView.setProperty("/cre", false);
							oModelView.setProperty("/mod", false);
							oModelView.setProperty("/vis", true);
							oModelView.refresh(true);
							this._initializeEditable(false);
							this._changeValueVisibleEditableMotivo(true);
							this.getView().setBusy(true);
							this.getModel().metadataLoaded().then(function() {
								var sObjectPath = this.getModel().createKey("Incidencias", {
									Retailstoreid: oProperty.Retailstoreid,
									Businessdaydate: oProperty.Businessdaydate,
									Workstationid: oProperty.Workstationid,
									Transnumber: oProperty.Transnumber
								});
								this._bindView("/" + sObjectPath);
							}.bind(this));
						} else if (vAction === "D" && errorMessagesTextModif === "") {
							oModelView.setProperty("/cre", false);
							oModelView.setProperty("/mod", false);
							oModelView.setProperty("/vis", true);
							this._initializeEditable(false);
							this._changeValueVisibleEditableMotivo(true);
							this.getView().setBusy(false);
						} else if (vAction === "M" && errorMessagesTextModif === "") {
							this.getView().byId("btnCancel").firePress();
							this.getView().getModel().refresh();
							this.getView().setBusy(false);
						}
						this.getView().setBusy(false);
						if (errorMessagesTextModif === "") {
							var dialogaction = '';
							if (vAction === "C") {
								dialogaction = "creado";
							} else if (vAction === "D") {
								dialogaction = "eliminado";
							} else if (vAction === "M") {
								dialogaction = "modificado";
							}
							var oDialog = new sap.m.Dialog({
								title: dialogaction + ' correctamente',
								type: 'Message',
								state: 'Success',
								content: new sap.m.Text({
									text: 'La incidencia se ha ' + dialogaction + ' correctamente'
								}),

								beginButton: new sap.m.Button({
									text: 'Close',
									press: function() {
										oDialog.close();
									}
								}),
								afterClose: function() {
									oDialog.destroy();
									window.history.go(-1);
								}
							});
							oDialog.open();
						}
					}

				}.bind(this),
				error: function(odata, resp) {
					this.getView().setBusy(false);
				}.bind(this)
			};

			/*if (oContextView.to_Position.__list && vAction !== "D") {
				oContextView.to_Position.__list.forEach(function(item) {
					var sProp = this.getModel().getObject("/" + item);
					delete sProp.to_Header;
					if (vAction === "M") {
						tmpModel.update("/" + item, sProp, mParameters);
					} else if (vAction === "C") {
						tmpModel.create("/Inciposact", sProp, mParameters);
					}

				}.bind(this));
			} else if (oContextView.to_Position.length && vAction !== "D") {
				oContextView.to_Position.forEach(function(item) {
					var sProp = this.getModel().getObject("/" + item);
					delete sProp.to_Header;
					if (vAction === "M") {
						tmpModel.update("/" + item, sProp, mParameters);
					} else if (vAction === "C") {
						tmpModel.create("/Inciposact", sProp, mParameters);
					}

				}.bind(this));
			}*/
			if (oDataPos.length > 0 && vAction !== "D") {
				oDataPos.forEach(function(item) {
					let oItem = Object.assign({}, item);
					delete oItem.Path;
					delete oItem.to_Header;
					if (vAction === "M") {
						tmpModel.update(item.Path, oItem, mParameters);
					} else if (vAction === "C") {
						tmpModel.create("/Incimp", oItem, mParameters);
					}

				}.bind(this));
			}
			if (oDataPosLV.length > 0 && vAction !== "D") {
				oDataPosLV.forEach(function(item) {
					let oItem = Object.assign({}, item);
					delete oItem.Path;
					delete oItem.to_Header;
					if (vAction === "M") {
						tmpModel.update(item.Path, oItem, mParameters);
					} else if (vAction === "C") {
						tmpModel.create("/Incipos", oItem, mParameters);
					}

				}.bind(this));
			}
			var oContextViewCopy = {...oContextView
			};
			oContextViewCopy.Instancia = false;
			oContextViewCopy.AuditbusinessdaydateModif = this._converDateUtc(oContextViewCopy.AuditbusinessdaydateModif);
			oContextViewCopy.Auditbusinessdaydate = this._converDateUtc(oContextViewCopy.Auditbusinessdaydate);
			if (oContextViewCopy.origbusinessdate) {
				oContextViewCopy.origbusinessdate = this._converDateUtc(oContextViewCopy.origbusinessdate);
			}
			delete oContextViewCopy.to_Position;
			delete oContextViewCopy.to_PositionMp;
			if (vAction === "M") {
				tmpModel.update(oContext.getPath(), oContextViewCopy, mParameters);
			} else if (vAction === "C") {
				tmpModel.create("/Incidencias", oContextViewCopy, mParameters);
			} else if (vAction === "D") {
				tmpModel.remove(oContext.getPath(), mParameters);
			}
			this.getView().setBusy(true);
			tmpModel.submitChanges(mParameters);

			// tmpModel.submitChanges({
			// 	groupId: "foo",
			// 	success: function(oData, response) {
			// 		if (response.data.__batchResponses) {
			// 			var batchResponses = response.data.__batchResponses;
			// 			batchResponses.forEach(function(batchResponse) {
			// 				if (batchResponse.__changeResponses) {
			// 					batchResponse.__changeResponses.forEach(function(changeResponse) {
			// 						if (changeResponse.statusCode >= 400) {
			// 							console.error(changeResponse.message);
			// 						}
			// 					});
			// 				}
			// 			});
			// 		}
			// 	},
			// 	error: function(oError) {
			// 		console.error(oError);
			// 	}
			// });

		},
		_converDateUtc: function(oDate) {
			return new Date(Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate()));
		},
		//ASE
		// onOpenDialog: function(mesageError) {
		// 	// Crea el List con los mensajes de error
		// 	var oList = new List({
		// 		items: {
		// 			path: "/details",
		// 			template: new StandardListItem({
		// 				title: "{message}"
		// 			})
		// 		}
		// 	});

		// 	// Crea el Dialog
		// 	var oDialog = new Dialog({
		// 		title: "Error Messages",
		// 		content: oList,
		// 		beginButton: new Button({
		// 			text: "Close",
		// 			press: function() {
		// 				oDialog.close();
		// 			}
		// 		})
		// 	});

		// 	// Configura el modelo en el List
		// 	oList.setModel(mesageError);

		// 	// Añade el Dialog como dependiente de la vista y ábrelo
		// 	this.getView().addDependent(oDialog);
		// 	oDialog.open();
		// },
		_validateFields: function(pClearState, pClearValue) {
			var vIsValid = true,
				sValue = "",
				sRequired = false,
				sValueState = "",
				oControlFieldAll = this.getView().getControlsByFieldGroupId("fgDG"),
				oControlTabledAll = this.getView().getControlsByFieldGroupId("fgDGP");
			/*this.gFieldValidate*/
			oControlFieldAll.forEach(function(item) {
				if (item.getMetadata()._sClassName === "sap.ui.comp.smartfield.SmartField") {
					sValue = item.getValue() !== "" ? item.getValue() : null;
					sRequired = item.getMandatory();
					if (sRequired && !sValue && !pClearState) {
						item.setValueState("Error");
						vIsValid = false;
					} else if (pClearState) {
						if (pClearValue) {
							item.setValue();
						}
						item.setValueState("None");
					} else {
						item.setValueState("None");
					}
				}
			});

			oControlTabledAll.forEach(function(item) {
				if (item.getMetadata()._sClassName === "sap.ui.comp.smartfield.SmartField") {
					sValue = item.getValue() !== "" ? item.getValue() : null;
					sRequired = item.getMandatory();
					if (sRequired && !sValue && !pClearState) {
						item.setValueState("Error");
						vIsValid = false;
					} else if (pClearState) {
						if (pClearValue) {
							item.setValue();
						}
						item.setValueState("None");
					} else {
						item.setValueState("None");
					}
				}
			});

			return vIsValid;

		}

	});

});