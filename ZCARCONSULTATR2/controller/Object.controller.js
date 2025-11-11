/*global location*/
sap.ui.define([
	"app/inetum/zcarconsulta2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"app/inetum/zcarconsulta2/model/formatter",
	'sap/m/SearchField',
	'sap/ui/model/type/String',
	"sap/ui/model/odata/v2/ODataModel",
	'sap/ui/table/Column',
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(
	BaseController,
	JSONModel,
	History, 
	formatter,
	SearchField,
	TypeString,
	ODataModel,
	UIColumn,
	Sorter,
	Filter,
	FilterOperator
) {
	"use strict";

	return BaseController.extend("app.inetum.zcarconsulta2.controller.Object", {

		formatter: formatter,

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
					editable: false,
					btnEdit: true,
					visibleTextRepercValue: false,
					Original: false,
					Actual: true,
					Salesamount: 0,
					Zzlvimpneto: 0,
					Zzlvimpbruto: 0,
					total: [{
						Salesamount: 0,
						Zzlvimpneto: 0,
						Zzlvimpbruto: 0,
					}]
				});
			this.setModel(oViewModel, "objectView");
			this.setModel(new JSONModel({}), "modelCreate");
			this.setModel(new JSONModel({}), "modelDataTrx");

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});
		},
		onAfterRendering: function(oEvent) {
			var oModel = this.getView().getModel();
			this.getModel().setSizeLimit(9999);
			this.setInitialSortOrder()
			if (!sap.ui.getCore().getModel("FormpagCard")) {
				this.getView().setBusy(true);
				oModel.read("/FormpagCard", {
					success: function(data, resp) {
						sap.ui.getCore().setModel(new JSONModel(data.results), "FormpagCard");
						this.getView().setBusy(false);
					}.bind(this),
					error: function(error) {

					}.bind(this)
				});
			}
			this.getView().byId("Auditbusinessdaydate").setMinDate(new Date());
		},
		setInitialSortOrder: function() {
			var oSmartTable = this.getView().byId("smError"),
				oSmartTable2 = this.getView().byId("smError2"),
				oSmartTable3 = this.getView().byId("positionMp2");
			oSmartTable.applyVariant({
				sort: {
					sortItems: [{
						columnKey: "Tmstcreate",
						operation: "Descending"
					}, {
						columnKey: "Infoerror",
						operation: "Ascending"
					}]
				},
				group: {
					groupItems: [{
						columnKey: "Infoerror",
						operation: "GroupAscending",
						showIfGrouped: true
					}]
				}

			});
			oSmartTable2.applyVariant({
				sort: {
					sortItems: [{
						columnKey: "Tmstcreate",
						operation: "Descending"
					}, {
						columnKey: "Infoerror",
						operation: "Ascending"
					}]
				},
				group: {
					groupItems: [{
						columnKey: "Infoerror",
						operation: "GroupAscending",
						showIfGrouped: true
					}]
				}

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
				oModelView = this.getView().getModel("objectView"),
				oDataView = oModelView.getData();
			this.onCancelTransaction();
			this.getView().unbindContext();
			this._bindView("/" + sObjectId);
			this.getView().byId("btnActual").firePress();
		/*	oDataView.Salesamount = 0;
			oDataView.Zzlvimpneto = 0;
			oDataView.Zzlvimpbruto = 0;
			oDataView.total = [{
				Salesamount: 0,
				Zzlvimpneto: 0,
				Zzlvimpbruto: 0,
			}];*/
			oModelView.refresh(true);
			/*this.getModel().metadataLoaded().then( function() {
				var sObjectPath = this.getModel().createKey("Head", {
					Transnumber :  sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));*/
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
			oViewModel.setProperty("/busy", true);
			this.getView().bindElement({
				path: sObjectPath,
				parameters: {
					expand: "to_Position,to_PositionMp,to_PositionRepVale,to_HeadOrig,to_HeadOrig/to_MedioPago,to_HeadOrig/to_Posvta"
				},
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						/*oDataModel.metadataLoaded().then(function() {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});*/
					},
					dataReceived: function(data) {
						/*	var aObject = data.getParameter("data");
							this._setDataModelTransaction(aObject);*/
						/*var aObject = {...data.getParameter("data")
							},
							oModel = this.getModel("modelCreate"),
							oModelView = this.getModel("objectView"),
							oDataView = oModelView.getData(),
							oModelDatTrx = this.getModel("modelDataTrx"),
							oHora = aObject ? new Date(aObject.beginHora.ms) : null,
							oPositionMpGroup = [],
							oPositionEfectivoNegativo,
							oPositionEfectivoPositivo,
							vAdd010 = false,
							vEnabledCard = false,
							vEnabledPaypal = false,
							vEnabledFecha = false;
						if (!aObject) {
							this._errorGetTrx();
						} else if (aObject) {
							oViewModel.setProperty("/btnEdit", aObject.Update_mc);
							delete aObject.to_Error;
							delete aObject.to_Positionoldvalue;
							delete aObject.to_Typecode;
							delete aObject.__metadata;
							if (aObject.to_Position && aObject.to_Position.length > 0) {
								aObject.to_Position.forEach(function(pos) {
									pos.Retailnumber = parseInt(pos.Retailnumber);
								});
							}
							this._setFooterTotalsPosV(aObject.to_Position);
							this._setFooterPosVentaEdit();
							if (aObject.to_PositionMp && aObject.to_PositionMp.length > 0) {
								oPositionEfectivoNegativo = (aObject.Transtypecode === '101' || aObject.Transtypecode === '111' || aObject.Transtypecode ===
										'103') ? aObject.to_PositionMp.find((o) => o.TipomedpagoV === '010' && parseFloat(o.Tenderamount) <= 0) :
									oPositionEfectivoNegativo;
								oPositionEfectivoPositivo = aObject.to_PositionMp.find((o) => o.TipomedpagoV === '010' && parseFloat(o.Tenderamount) > 0);
								if (oPositionEfectivoNegativo) {
									oPositionEfectivoNegativo.Cardnumber = oPositionEfectivoNegativo.CardnumberV;
									oPositionEfectivoNegativo.Medpgsubtip = oPositionEfectivoNegativo.MedpgsubtipV;
									oPositionEfectivoNegativo.Tipomedpago = oPositionEfectivoNegativo.TipomedpagoV;
									oPositionEfectivoNegativo.Subtipo = oPositionEfectivoNegativo.SubtipoV;
									oPositionEfectivoNegativo.ZzcodepagoNeg = oPositionEfectivoNegativo.ZzcodepagoNegV;
									oPositionEfectivoNegativo.ZzcodpagoDesg = oPositionEfectivoNegativo.ZzcodpagoDesgV;
									oPositionEfectivoNegativo.Mediopagotexts = oPositionEfectivoNegativo.MediopagotextsV;
									oPositionEfectivoNegativo.Tenderamount = parseFloat(oPositionEfectivoNegativo.Tenderamount) + parseFloat(
										oPositionEfectivoPositivo.Tenderamount);
									oPositionMpGroup.push(oPositionEfectivoNegativo);
								}
								aObject.to_PositionMp.forEach(function(posmp) {
									if (
										(posmp.TipomedpagoV !== '010' && oPositionEfectivoNegativo) || !oPositionEfectivoNegativo
									) {
										posmp.Cardnumber = posmp.CardnumberV;
										posmp.Medpgsubtip = posmp.MedpgsubtipV;
										posmp.Tipomedpago = posmp.TipomedpagoV;
										posmp.Subtipo = posmp.SubtipoV;
										posmp.ZzcodepagoNeg = posmp.ZzcodepagoNegV;
										posmp.ZzcodpagoDesg = posmp.ZzcodpagoDesgV;
										posmp.Mediopagotexts = posmp.MediopagotextsV;
										oPositionMpGroup.push(posmp);
									}
								});
								aObject.to_PositionMp = oPositionMpGroup;
							}
							if (aObject.to_PositionRepVale && aObject.to_PositionRepVale.length > 0) {
								aObject.to_PositionRepVale.forEach(function(value) {
									let oObject = {...value
									};
									if (aObject.Transtypecode.includes("102") || aObject.Transtypecode.includes("104")) {
										oObject.Tenderamount = parseFloat(oObject.Tenderamount);
										oObject.Tenderamount = oObject.Tenderamount.toString();

									}
									aObject.to_PositionMp.push(oObject);
								}.bind(this));
							}
							aObject.BajaEst = aObject.VBajaEst;
							aObject.ActHT = aObject.vActHT;
							aObject.BajaEst = aObject.vBajaEst;
							aObject.Comentario = aObject.ComentarioV;
							aObject.Origbusinessdate = aObject.OrigbusinessdateV;
							aObject.SenDescuento = aObject.SenDescuentoV;
							aObject.FechaCompromiso = aObject.FechaCompromisoV;
							aObject.FormaretirMerc = aObject.FormaretirMercV;
							aObject.Zzformpag = aObject.Zzformpagv;
							if (aObject.Transtypecode.includes("105")) {
								aObject.Origstoreid = aObject.vRetailstoreid;
								aObject.Origbusinessdate = aObject.vBusinessdaydate;
								aObject.OrigbusinessdateV = aObject.vBusinessdaydate;
								aObject.Origwrkstid = aObject.vWorkstationid;
								aObject.Origtransnumber = aObject.vTransnumber;
							} else {
								aObject.Origbusinessdate = aObject.OrigbusinessdateV;
							}
							oModel.setData(aObject);
							oModel.refresh(true);
							//Copy Object
							var oOBjectCopy = JSON.parse(JSON.stringify(aObject));
							for (var prop in oOBjectCopy) {
								if (!prop.includes("to_") && oOBjectCopy[prop] !== null && oOBjectCopy[prop].toString().includes("000Z")) {
									oOBjectCopy[prop] = new Date(oOBjectCopy[prop]) ? new Date(oOBjectCopy[prop]) : oOBjectCopy[prop]
								} else if (prop.includes("to_")) {
									for (var index in oOBjectCopy[prop]) {
										for (var prop2 in oOBjectCopy[prop][index]) {
											if (!prop2.includes("to_") && oOBjectCopy[prop][index][prop2] !== null && oOBjectCopy[prop][index][prop2].toString().includes(
													"000Z")) {
												oOBjectCopy[prop][index][prop2] = new Date(oOBjectCopy[prop][index][prop2]) ? new Date(oOBjectCopy[prop][index][prop2]) :
													oOBjectCopy[prop][index][prop2]
											}
										}
									}
								}

							}
							oModelDatTrx.setData({...oOBjectCopy
							});
							this.setInitialSortOrder();
							setTimeout(function() {
								this.getView().byId("tablePosMp").getRows().forEach(function(rows, r) {
									vEnabledCard = false;
									vEnabledFecha = false;
									vEnabledPaypal = false;
									rows.getCells().forEach(function(cells, c) {
										var vPath = cells.getBinding("value") ? cells.getBinding("value").getPath() : null,
											vMedpagSubtip = "",
											oItem,
											oSuggestion;
										if (vPath && vPath.includes("Medpgsubtip") && aObject.to_PositionMp[r] && aObject.to_PositionMp[r].Medpgsubtip &&
											aObject.to_PositionMp[r].Medpgsubtip !== "") {
											vMedpagSubtip = aObject.to_PositionMp[r].Medpgsubtip;
											oItem = cells.getSuggestionItemByKey(vMedpagSubtip);
											oSuggestion = oItem ? oItem.getBindingContext().getObject() : null;
											if (oSuggestion && oSuggestion.Istajeta !== "" && oSuggestion.Mediopagosub !== "15400007") {
												vEnabledCard = true;
											}
											if (oSuggestion && oSuggestion.Mediopagosub === "15400007") {
												vEnabledPaypal = true;
											}
										} else if (vPath && vPath.includes("Cardnumber") && aObject.to_PositionMp[r]) {
											cells.setEnabled(vEnabledCard);
										} else if (vPath && vPath.includes("Tipotarj") && aObject.to_PositionMp[r]) {
											cells.setEnabled(vEnabledCard);
										} else if (vPath && vPath.includes("Zzfechacadnac") && aObject.to_PositionMp[r]) {
											cells.setEnabled(vEnabledCard);
										} else if (vPath && vPath.includes("Zzpaypal") && aObject.to_PositionMp[r]) {
											cells.setEnabled(vEnabledPaypal);
										} else if (aObject.to_PositionMp[r] && aObject.to_PositionMp[r].Fieldname && aObject.to_PositionMp[r].Fieldname !==
											'') {
											oViewModel.setProperty("/visibleTextRepercValue", true);
										}
									}.bind(this));
								}.bind(this));
							}.bind(this), 1000);
						}*/
					}.bind(this)
				}
			});
		},
		_onBindingChange: function() {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				//this.getRouter().getTargets().display("objectNotFound");
				this._errorGetTrx();
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.Transnumber,
				sObjectName = oObject.Workstationid;

			oObject = this._getDataBinding(oObject);
			oViewModel.setProperty("/busy", false);
			if (oObject) {
				this._setDataModelTransaction(oObject);

				// Add the object page to the flp routing history
				this.addHistoryEntry({
					title: this.getResourceBundle().getText("objectTitle") + " - " + sObjectName,
					icon: "sap-icon://enter-more",
					intent: "#Consultadetransacción-display&/Head/" + sObjectId
				});

				this.getModel().read("/Mandatory", {
					success: function(data) {
						this.setModel(new JSONModel(data.results), "modelField");
						this.setMandatoryFieldFromTypeCode(oObject.Transtypecode);
					}.bind(this)
				});
			}
		},
		_getDataBinding: function(oObject) {
			var oModel = this.getView().getModel();
			for (var prop1 in oObject) {
				if (prop1.includes("to_") && oObject[prop1].__list) {
					const oList = {
						...oObject[prop1].__list
					};
					oObject[prop1] = [];
					for (var list in oList) {
						const oProperty = oModel.getProperty("/" + oList[list]);
						oObject[prop1].push(oProperty);
					}
				}
			}
			return oObject;
		},
		_setDataModelTransaction: function(pDatatransaction) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel(),
				aObject = {...pDatatransaction
				},
				oModel = this.getModel("modelCreate"),
				oModelView = this.getModel("objectView"),
				oDataView = oModelView.getData(),
				oModelDatTrx = this.getModel("modelDataTrx"),
				oHora = aObject ? new Date(aObject.beginHora.ms) : null,
				oPositionMpGroup = [],
				oPositionEfectivoNegativo,
				oPositionEfectivoPositivo,
				vAdd010 = false,
				vEnabledCard = false,
				vEnabledPaypal = false,
				vEnabledFecha = false;
			if (!aObject) {
				this._errorGetTrx();
			} else if (aObject) {
				oViewModel.setProperty("/btnEdit", aObject.Update_mc);
				delete aObject.to_Error;
				delete aObject.to_Positionoldvalue;
				delete aObject.to_Typecode;
				delete aObject.__metadata;
				if (aObject.to_Position && aObject.to_Position.length > 0) {
					aObject.to_Position.forEach(function(pos) {
						pos.Retailnumber = parseInt(pos.Retailnumber);
						pos.Zzcampoc = pos.Zzcampoc === '' || !pos.Zzcampoc ? '0' : pos.Zzcampoc;
					});
				}
				this._setFooterTotalsPosV(aObject.to_Position);
				this._setFooterPosVentaEdit();
				oViewModel.refresh(true);
				if (aObject.to_PositionMp && aObject.to_PositionMp.length > 0) {
					oPositionEfectivoNegativo = (aObject.Transtypecode === '101' || aObject.Transtypecode === '111' || aObject.Transtypecode ===
							'103') ? {...aObject.to_PositionMp.find((o) => o.TipomedpagoV === '010' && parseFloat(o.Tenderamount) <= 0)
						} :
						oPositionEfectivoNegativo;
					oPositionEfectivoPositivo = {...aObject.to_PositionMp.find((o) => o.TipomedpagoV === '010' && parseFloat(o.Tenderamount) > 0)
					};
					if (oPositionEfectivoNegativo && oPositionEfectivoNegativo.Retailstoreid) {
						oPositionEfectivoNegativo.Cardnumber = oPositionEfectivoNegativo.CardnumberV;
						oPositionEfectivoNegativo.Medpgsubtip = oPositionEfectivoNegativo.MedpgsubtipV;
						oPositionEfectivoNegativo.Tipomedpago = oPositionEfectivoNegativo.TipomedpagoV;
						oPositionEfectivoNegativo.Subtipo = oPositionEfectivoNegativo.SubtipoV;
						oPositionEfectivoNegativo.ZzcodepagoNeg = oPositionEfectivoNegativo.ZzcodepagoNegV;
						oPositionEfectivoNegativo.ZzcodpagoDesg = oPositionEfectivoNegativo.ZzcodpagoDesgV;
						oPositionEfectivoNegativo.Mediopagotexts = oPositionEfectivoNegativo.MediopagotextsV;
						oPositionEfectivoNegativo.Tenderamount = parseFloat(oPositionEfectivoNegativo.Tenderamount) + parseFloat(
							oPositionEfectivoPositivo.Tenderamount);
						oPositionMpGroup.push(oPositionEfectivoNegativo);
					}
					aObject.to_PositionMp.forEach(function(posmp) {
						if (
							(posmp.TipomedpagoV !== '010' && oPositionEfectivoNegativo && oPositionEfectivoNegativo.Retailstoreid) || (
								oPositionEfectivoNegativo && !oPositionEfectivoNegativo.Retailstoreid) || !oPositionEfectivoNegativo
						) {
							posmp.Cardnumber = posmp.CardnumberV;
							posmp.Medpgsubtip = posmp.MedpgsubtipV;
							posmp.Tipomedpago = posmp.TipomedpagoV;
							posmp.Subtipo = posmp.SubtipoV;
							posmp.ZzcodepagoNeg = posmp.ZzcodepagoNegV;
							posmp.ZzcodpagoDesg = posmp.ZzcodpagoDesgV;
							posmp.Mediopagotexts = posmp.MediopagotextsV;
							oPositionMpGroup.push({...posmp
							});
						}
					});
					aObject.to_PositionMp = oPositionMpGroup;
				}
				if (aObject.to_PositionRepVale && aObject.to_PositionRepVale.length > 0) {
					aObject.to_PositionRepVale.forEach(function(value) {
						let oObject = {...value
						};
						if (aObject.Transtypecode.includes("102") || aObject.Transtypecode.includes("104")) {
							oObject.Tenderamount = parseFloat(oObject.Tenderamount);
							oObject.Tenderamount = oObject.Tenderamount.toString();

						}
						aObject.to_PositionMp.push(oObject);
					}.bind(this));
				}
				aObject.BajaEst = aObject.VBajaEst;
				aObject.ActHT = aObject.vActHT;
				aObject.BajaEst = aObject.vBajaEst;
				aObject.Comentario = aObject.ComentarioV;
				aObject.Origbusinessdate = aObject.OrigbusinessdateV;
				aObject.SenDescuento = aObject.SenDescuentoV;
				aObject.FechaCompromiso = aObject.FechaCompromisoV;
				aObject.FormaretirMerc = aObject.FormaretirMercV;
				aObject.Zzformpag = aObject.Zzformpagv;
				if (aObject.Transtypecode.includes("105")) {
					aObject.Origstoreid = aObject.vRetailstoreid;
					aObject.Origbusinessdate = aObject.vBusinessdaydate;
					aObject.OrigbusinessdateV = aObject.vBusinessdaydate;
					aObject.Origwrkstid = aObject.vWorkstationid;
					aObject.Origtransnumber = aObject.vTransnumber;
				} else {
					aObject.Origbusinessdate = aObject.OrigbusinessdateV;
				}
				/*aObject.CabTarjEdit = aObject.TarjCab;*/
				oModel.setData(aObject);
				oModel.refresh(true);
				//Copy Object
				var oOBjectCopy = JSON.parse(JSON.stringify(aObject));
				for (var prop in oOBjectCopy) {
					if (!prop.includes("to_") && oOBjectCopy[prop] !== null && oOBjectCopy[prop].toString().includes("000Z")) {
						oOBjectCopy[prop] = new Date(oOBjectCopy[prop]) ? new Date(oOBjectCopy[prop]) : oOBjectCopy[prop]
					} else if (prop.includes("to_")) {
						for (var index in oOBjectCopy[prop]) {
							for (var prop2 in oOBjectCopy[prop][index]) {
								if (!prop2.includes("to_") && oOBjectCopy[prop][index][prop2] !== null && oOBjectCopy[prop][index][prop2].toString().includes(
										"000Z")) {
									oOBjectCopy[prop][index][prop2] = new Date(oOBjectCopy[prop][index][prop2]) ? new Date(oOBjectCopy[prop][index][prop2]) :
										oOBjectCopy[prop][index][prop2]
								}
							}
						}
					}

				}
				oModelDatTrx.setData({...oOBjectCopy
				});
				this.setInitialSortOrder();
				setTimeout(function() {
					this.getView().byId("tablePosMp").getRows().forEach(function(rows, r) {
						vEnabledCard = false;
						vEnabledFecha = false;
						vEnabledPaypal = false;
						rows.getCells().forEach(function(cells, c) {
							var vPath = cells.getBinding("value") ? cells.getBinding("value").getPath() : null,
								vMedpagSubtip = "",
								oItem,
								oSuggestion;
							if (vPath && vPath.includes("Medpgsubtip") && aObject.to_PositionMp[r] && aObject.to_PositionMp[r].Medpgsubtip &&
								aObject.to_PositionMp[r].Medpgsubtip !== "") {
								vMedpagSubtip = aObject.to_PositionMp[r].Medpgsubtip;
								oItem = cells.getSuggestionItemByKey(vMedpagSubtip);
								oSuggestion = oItem ? oItem.getBindingContext().getObject() : null;
								if (oSuggestion && oSuggestion.Istajeta !== "" && oSuggestion.Mediopagosub !== "15400007") {
									vEnabledCard = true;
								}
								/*if (oSuggestion && oSuggestion.Vindfechavenc !== "") {
									vEnabledFecha = true;
								}*/
								if (oSuggestion && oSuggestion.Mediopagosub === "15400007") {
									vEnabledPaypal = true;
								}
							} else if (vPath && vPath.includes("Cardnumber") && aObject.to_PositionMp[r]) {
								cells.setEnabled(vEnabledCard);
							} else if (vPath && vPath.includes("Tipotarj") && aObject.to_PositionMp[r]) {
								cells.setEnabled(vEnabledCard);
							} else if (vPath && vPath.includes("Zzfechacadnac") && aObject.to_PositionMp[r]) {
								cells.setEnabled(vEnabledCard);
							} else if (vPath && vPath.includes("Zzpaypal") && aObject.to_PositionMp[r]) {
								cells.setEnabled(vEnabledPaypal);
							} else if (aObject.to_PositionMp[r] && aObject.to_PositionMp[r].Fieldname && aObject.to_PositionMp[r].Fieldname !==
								'') {
								oViewModel.setProperty("/visibleTextRepercValue", true);
							}
						}.bind(this));
					}.bind(this));
				}.bind(this), 1000);
				/*this.getView().byId("tablePosMp").getBindingContext().getModel().refresh(true);
				this.getView().byId("tablePos").getBindingContext().getModel().refresh(true);*/
			}
		},
		_setFooterTotalsPosV: function(pData) {
			var oModelView = this.getModel("objectView"),
				oDataView = oModelView.getData();
			oDataView.Salesamount = parseFloat("0").toFixed(2);
			oDataView.Zzlvimpneto = parseFloat("0").toFixed(2);
			oDataView.Zzlvimpbruto = parseFloat("0").toFixed(2);

			if (pData && pData.length > 0) {
				pData.forEach(function(pos) {
					oDataView.Salesamount = parseFloat(oDataView.Salesamount) + parseFloat(pos.Salesamount);
					oDataView.Zzlvimpneto = parseFloat(oDataView.Zzlvimpneto) + parseFloat(pos.Zzlvimpneto);
					oDataView.Zzlvimpbruto = parseFloat(oDataView.Zzlvimpbruto) + parseFloat(pos.Zzlvimpbruto);
				});
				oDataView.Salesamount = parseFloat(oDataView.Salesamount).toFixed(2);
				oDataView.Zzlvimpneto = parseFloat(oDataView.Zzlvimpneto).toFixed(2);
				oDataView.Zzlvimpbruto = parseFloat(oDataView.Zzlvimpbruto).toFixed(2);
			}
			oDataView.total[0].Salesamount = oDataView.Salesamount;
			oDataView.total[0].Zzlvimpneto = oDataView.Zzlvimpneto;
			oDataView.total[0].Zzlvimpbruto = oDataView.Zzlvimpbruto;

			oModelView.refresh(true);

			setTimeout(function() {
				var oFooter = this.getView().byId("tablePos").getFooter(),
					oScroll = oFooter._getScrollExtension().getHorizontalScrollbar(),
					oStyle = oScroll ? oScroll.getAttribute("style") : oScroll;
				if (oScroll) {
					oScroll.setAttribute("style", oStyle + "visibility: hidden;");
				}

			}.bind(this), 100);
		},
		_setFooterPosVentaEdit: function() {
			var oTablePos = this.getView().byId("tablePos"),
				oViewModel = this.getView().getModel(),
				oViewData = oViewModel.getData(),
				oModel = new sap.ui.model.json.JSONModel(),
				oTable = new sap.ui.table.Table({
					visibleRowCount: 1,
					selectionMode: "None",
				});

			var oFooter = oTable;
			oFooter.addStyleClass("sapUiTableCnt");
			oFooter.setModel(oViewModel);
			oFooter.bindRows("objectView>/total");
			oFooter.addColumn(new sap.ui.table.Column({
				template: new sap.m.Text(),
				width: "4rem",
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				template: new sap.m.Text(),
				width: "10.9rem",
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				template: new sap.m.Text(),
				width: "10.9rem",
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				width: "10.9rem",
				template: new sap.m.Text(),
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				width: "11rem",
				template: new sap.m.Text(),
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				width: "11rem",
				template: new sap.m.Text(),
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				width: "11.4rem",
				template: new sap.m.Text(),
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({
					text: "{/#PositionType/Salesamount/@sap:label}"
				}),
				template: new sap.m.Text({
					text: "{objectView>Salesamount}"
				}),
				width: "10.9rem",
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({
					text: "{/#PositionType/Zzlvimpneto/@sap:label}"
				}),
				template: new sap.m.Text({
					text: "{objectView>Zzlvimpneto}"
				}),
				width: "10.9rem",
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				label: new sap.m.Label({
					text: "{/#PositionType/Zzlvimpbruto/@sap:label}"
				}),
				template: new sap.m.Text({
					text: "{objectView>Zzlvimpbruto}"
				}),
				width: "10.9rem",
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				width: "10.9rem",
				template: new sap.m.Text(),
			}));
			oFooter.addColumn(new sap.ui.table.Column({
				width: "10.9rem",
				template: new sap.m.Text(),
			}));
			oTablePos.setFooter(oFooter);

		},
		onChangeDataActual: function(vAction) {
			var oViewModel = this.getModel("objectView");
			oViewModel.setProperty("/Actual", vAction ? true : false);
			oViewModel.setProperty("/Original", vAction ? false : true);
			oViewModel.refresh(true);
		},
		_errorGetTrx: function(oEvent) {
			this.getView().unbindContext();
			sap.m.MessageBox.error(this.getResourceBundle().getText("erroGetTransac"), {
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function(sAction) {
					if (sAction === "OK") {
						this.onNavBack();
					}
				}.bind(this)
			});
		},
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("worklist", {}, true);
			}
		},

		setMandatoryFieldFromTypeCode: function(pTypeCode) {
			var oModelField = this.getModel("modelField"),
				oTableP = this.getView().byId("tablePos"),
				oTableMp = this.getView().byId("tablePosMp"),
				vTypeCode = pTypeCode,
				oArray = {};
			oModelField.getData().forEach(function(item) {
				if ((item.Transtypecode.padStart(4, "0") === vTypeCode || item.Transtypecode === '') && item.Tipo === "C" && this.getView().byId(
						item.Fieldname)) {
					this.getView().byId(item.Fieldname).setRequired(true);
					oArray[item.Fieldname] = true;
				} else if ((item.Transtypecode.padStart(4, "0") !== vTypeCode) && item.Tipo === "C" && this.getView().byId(item.Fieldname) &&
					!
					oArray[item.Fieldname]) {
					this.getView().byId(item.Fieldname).setRequired(false);
				}
				if (
					item.Fieldname.startsWith("Orig") &&
					(vTypeCode === "102" || vTypeCode === "103" || vTypeCode === "104")
				) {
					this.getView().byId(item.Fieldname).setEditable(true);
				} else if (item.Fieldname.startsWith("Orig")) {
					this.getView().byId(item.Fieldname).setEditable(false);
				}
			}.bind(this));
			oArray = {};
			oTableMp.getRows().forEach(function(row) {
				row.getCells().forEach(function(cell) {
					if (cell.getBinding("value")) {
						var sPath = cell.getBinding("value").getPath();
						var sField = oModelField.getData().filter(field => field.Fieldname === sPath && field.Tipo === "T" && (field.Transtypecode
							.padStart(
								4, "0") ===
							vTypeCode || field.Transtypecode === ''));
						if (sField.length && sField.length > 0) {
							cell.setRequired(true);
							oArray[sPath] = true;
						} else if (!oArray[sPath]) {
							cell.setRequired(false);
						}
					}

				}.bind(this));
			}.bind(this));
			oArray = {};
			oTableP.getRows().forEach(function(row) {
				row.getCells().forEach(function(cell) {
					if (cell.getBinding("value")) {
						var sPath = cell.getBinding("value").getPath();
						var sField = oModelField.getData().filter(field => field.Fieldname === sPath && field.Tipo === "P" && (field.Transtypecode
							.padStart(
								4, "0") ===
							vTypeCode || field.Transtypecode === ''));
						if (sField.length && sField.length > 0) {
							cell.setRequired(true);
							oArray[sPath] = true;
						} else if (!oArray[sPath]) {
							cell.setRequired(false);
						}
					}
				}.bind(this));
			}.bind(this));
		},

		onSelectBajaEst: function(oEvent) {
			var oViewModel = this.getModel("objectView"),
				oViewCreate = this.getModel("modelCreate"),
				vSelected = oEvent.getSource().getSelected(),
				vPath = oEvent.getSource().getBinding("selected").getPath()

			;
			if (vSelected && vPath.includes("BajaEst")) {
				oViewCreate.setProperty("/ActHT", !vSelected);
				oViewCreate.setProperty("/BajaEst", vSelected);
			} else if (vSelected && vPath.includes("ActHT")) {
				oViewCreate.setProperty("/ActHT", vSelected);
				oViewCreate.setProperty("/BajaEst", !vSelected);
			}
			oViewCreate.refresh(true);
		},

		onEdit: function(oEvent) {
			var oViewModel = this.getModel("objectView"),
				oModel = this.getModel("modelCreate"),
				oModelDatTrx = this.getModel("modelDataTrx");
			if (oEvent) {
				this._setVisibleVisFragment(false);
				oViewModel.setProperty("/editable", true);
				oViewModel.setProperty("/btnEdit", false);
				oViewModel.refresh(true);
			}

			/*var oObject = {...oModelDatTrx.getData() };
			oModel.setData(oObject);
			oModel.refresh(true);*/
			//Copy Object
			var oOBjectCopy = JSON.parse(JSON.stringify(oModelDatTrx.getData()));
			for (var prop in oOBjectCopy) {
				if (!prop.includes("to_") && oOBjectCopy[prop] !== null && oOBjectCopy[prop].toString().includes("000Z")) {
					oOBjectCopy[prop] = new Date(oOBjectCopy[prop]) ? new Date(oOBjectCopy[prop]) : oOBjectCopy[prop]
				} else if (prop.includes("to_")) {
					for (var index in oOBjectCopy[prop]) {
						for (var prop2 in oOBjectCopy[prop][index]) {
							if (!prop2.includes("to_") && oOBjectCopy[prop][index][prop2] !== null && oOBjectCopy[prop][index][prop2].toString().includes(
									"000Z")) {
								oOBjectCopy[prop][index][prop2] = new Date(oOBjectCopy[prop][index][prop2]) ? new Date(oOBjectCopy[prop][index][prop2]) :
									oOBjectCopy[prop][index][prop2]
							}
						}
					}
				}
			}
			oModel.setData(oOBjectCopy);
			oModel.refresh(true);
			this._setFooterTotalsPosV(oOBjectCopy.to_Position);
		},
		_returnValueAnterior: function() {
			var oOBjectCopy = JSON.parse(JSON.stringify(oModelDatTrx.getData())),
				oModel = this.getModel("modelCreate");
			for (var prop in oOBjectCopy) {
				if (!prop.includes("to_") && oOBjectCopy[prop] !== null && oOBjectCopy[prop].toString().includes("000Z")) {
					oOBjectCopy[prop] = new Date(oOBjectCopy[prop]) ? new Date(oOBjectCopy[prop]) : oOBjectCopy[prop]
				} else if (prop.includes("to_")) {
					for (var index in oOBjectCopy[prop]) {
						for (var prop2 in oOBjectCopy[prop][index]) {
							if (!prop2.includes("to_") && oOBjectCopy[prop][index][prop2] !== null && oOBjectCopy[prop][index][prop2].toString().includes(
									"000Z")) {
								oOBjectCopy[prop][index][prop2] = new Date(oOBjectCopy[prop][index][prop2]) ? new Date(oOBjectCopy[prop][index][prop2]) :
									oOBjectCopy[prop][index][prop2]
							}
						}
					}
				}
			}
			oModel.setData(oOBjectCopy);
			oModel.refresh(true);
		},
		onSaveTransaction: function(oEvemt) {
			var oViewModel = this.getModel("objectView"),
				oModel = this.getModel(),
				oViewContext = this.getView().getBindingContext(),
				vViewPath = oViewContext.getPath(),
				oObjectView = {...oViewContext.getObject()
				}, //Object.assign({}, oViewContext.getObject()),
				oModelTemp = new ODataModel("/sap/opu/odata/sap/ZCAR_SB_CDS_TRANS_HEAD_V2/", true),
				oModelCreate = this.getModel("modelCreate"),
				oModelData = {...oModelCreate.getData()
				}; //Object.assign({}, oModelCreate.getData());

			if (this._onValidateFormError()) {
				sap.m.MessageBox.alert("Verificar errores existentes");
			} else {
				oModelTemp.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
				oModelTemp.setUseBatch(true);
				this.getView().setModel(oModelTemp, "tmpModel");
				oModelTemp.setDeferredGroups(["foo"]);
				delete oModelData.to_Error;
				delete oModelData.to_Positionoldvalue;
				delete oModelData.to_StoreId;
				delete oModelData.to_Typecode;
				delete oModelData.to_HeadOrig;
				this.gErrorSave = false;
				var mParameters = {
					groupId: "foo",
					success: function(data, resp) {
						var vError = false,
							vMessage = "";
						if (data && data.__batchResponses && !this.gErrorSave) {
							data.__batchResponses.forEach(function(resp) {
								if (resp.__changeResponses) {
									resp.__changeResponses.forEach(function(item) {
										if (item["headers"] && item["headers"]["sap-message"]) {
											var oMessageList = JSON.parse(item["headers"]["sap-message"]),
												vMessageEnd = oMessageList.message;
											oMessageList.details.forEach(function(det) {
												vMessage = vMessage === "" ? det.message : vMessage + "\n" + det.message
											}.bind(this));
											vMessage = vMessage + "\n" + vMessageEnd;
											vError = true;
										}
									}.bind(this));
								}
							}.bind(this));
							if (vError) {
								sap.m.MessageBox.error(vMessage);
							} else {
								if (this.getView().byId("positionMp").getBindingContext()) {
									this.getView().byId("positionMp").getBindingContext().getModel().refresh(true);
								}
								if (this.getView().byId("position").getBindingContext()) {
									this.getView().byId("position").getBindingContext().getModel().refresh(true);
								}
								/*var sPath = this.getView().getBindingContext().getPath();
								this._bindView(sPath);*/
								this.onCancelTransaction();
							}
							oViewModel.setProperty("/busy", false);
						}
					}.bind(this),
					error: function(data, resp) {
						var oMessage;
						if (data.responseText && !this.gErrorSave && !data.responseText.includes("xml")) {
							oMessage = JSON.parse(data.responseText);
							sap.m.MessageBox.error(oMessage.error.message.value);
							oViewModel.setProperty("/busy", false);
						} else if (data.responseText && !this.gErrorSave && data.responseText.includes("xml")) {
							var parser = new DOMParser(),
								xmlDoc = parser.parseFromString(data.responseText, "text/xml");
							oMessage = xmlDoc.getElementsByTagName("message")[0].childNodes[0].nodeValue;
							sap.m.MessageBox.error(oMessage);
							oViewModel.setProperty("/busy", false);
						}
						this.gErrorSave = true;
					}.bind(this)
				};

				oModelData.to_Position.forEach(function(pos) {
					if (pos.Rowkey) {
						oObjectView.to_Position.__list.forEach(function(list) {
							if (pos.__metadata.id.includes(list)) {
								delete pos.ZzecunimedText;
								pos.Retailquantity = pos.Retailquantity.toString();
								pos.Salesamount = pos.Salesamount.toString();
								pos.Zzlvimpneto = pos.Zzlvimpneto.toString();
								pos.Zzlvimpbruto = pos.Zzlvimpbruto.toString();
								pos.Retailnumber = pos.Retailnumber.toString().padStart(10, "0");
								oModelTemp.update("/" + list, pos, mParameters);
							}
						}.bind(this));
					} else {
						var sPath = this.getView().getBindingContext().getPath() + "/to_Position";
						pos.Retailquantity = pos.Retailquantity.toString();
						pos.Salesamount = pos.Salesamount.toString();
						pos.Zzlvimpneto = pos.Zzlvimpneto.toString();
						pos.Zzlvimpbruto = pos.Zzlvimpbruto.toString();
						oModelTemp.create(sPath, pos, mParameters);
					}

				}.bind(this));

				oModelData.to_PositionMp.forEach(function(posmp) {
					if (posmp.Fieldgroup && posmp.Fieldgroup !== "") {
						//Posición imnporte repercutido vale
						oObjectView.to_PositionRepVale.__list.forEach(function(list, index) {
							if (posmp.__metadata.id.includes(list)) {
								delete posmp.to_Header;
								posmp.Tenderamount = posmp.Tenderamount.toString();
								oModelTemp.update("/" + list, posmp, mParameters);
							}
						}.bind(this));

					} else if (typeof posmp.Tendernumber !== 'undefined') {
						oObjectView.to_PositionMp.__list.forEach(function(list) {
							if (posmp.__metadata.id.includes(list)) {
								posmp.Tenderamount = posmp.Tenderamount.toString();
								oModelTemp.update("/" + list, posmp, mParameters);
							}
						}.bind(this));
					} else {
						var sPath;
						posmp.Subtipo = posmp.Medpgsubtip.substring(0, 3);
						posmp.Tipomedpago = posmp.Medpgsubtip.substring(3, 6);
						posmp.Tenderamount = posmp.Tenderamount.toString();
						if (
							((posmp.Tipomedpago === '009' && posmp.Subtipo === '000') || posmp.Tipomedpago !== '009')
						) {
							sPath = this.getView().getBindingContext().getPath() + "/to_PositionMp";
						} else {
							sPath = this.getView().getBindingContext().getPath() + "/to_PositionRepVale";
						}

						oModelTemp.create(sPath, posmp, mParameters);
					}
				}.bind(this));

				delete oModelData.to_Position;
				delete oModelData.to_PositionMp;
				delete oModelData.to_PositionRepVale;
				oModelData.Zzformpag = oModelData.Zzformpagv;
				oModelData.ImpTotaChange = oModelData.ImpTotaChange.toString();
				oModelData.Zzimptrans = oModelData.Zzimptrans.toString();
				oModelData.Auditbusinessdaydate = this._setConvertUtc(oModelData.Auditbusinessdaydate);
				if (oModelData.Origbusinessdate) {
					oModelData.Origbusinessdate = this._setConvertUtc(oModelData.Origbusinessdate);
				}
				if (oModelData.FechaCompromiso) {
					oModelData.FechaCompromiso = this._setConvertUtc(oModelData.FechaCompromiso);
				}
				oModelTemp.update(vViewPath, oModelData, mParameters);
				oViewModel.setProperty("/busy", true);
				oModelTemp.submitChanges(mParameters);
			}
			oViewModel.refresh(true);
		},
		_setConvertUtc: function(oDate) {
			return new Date(Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate()));
		},
		onCancelTransaction: function(oEvent) {
			var oViewModel = this.getModel("objectView"),
				oContext = this.getView().getBindingContext(),
				oPathView = oContext ? this.getView().getBindingContext().getPath() : oContext,
				oModel = this.getModel();
			this._setVisibleVisFragment(true);
			oViewModel.setProperty("/editable", false);
			oViewModel.setProperty("/btnEdit", true);
			if (oContext) {
				//this._bindView(oPathView);
				this.onEdit();
			}

			oViewModel.refresh(true);
			//this.getView().getModel().refresh(true);
			/*	if (this.getView().byId("tablePosMp").getBindingContext()) {
					this.getView().byId("tablePosMp").getBindingContext().getModel().refresh(true);
				}
				if (this.getView().byId("tablePos").getBindingContext()) {
					this.getView().byId("tablePos").getBindingContext().getModel().refresh(true);
				}*/

		},
		_setVisibleVisFragment: function(vVisible) {
			this.getView().byId("smartForm").setVisible(vVisible);
			this.getView().byId("positionMp").setVisible(vVisible);
			this.getView().byId("position").setVisible(vVisible);
		},
		onChangeValue: function(oEvent) {
			/*Validación required*/
			if (this._validateRequiredField(oEvent)) {
				this._verifyInputType(oEvent);
				this._setValuFromSuggestionKey(oEvent);
				this._setImporteOriginal(oEvent.getSource());
			}

		},
		_setImporteOriginal: function(oObject) {
			var oInput = oObject,
				oContext = oInput.getBindingContext(),
				oBindValue = oInput.getBinding("value"),
				oModel = this.getView().getModel(),
				oModelCreate = this.getView().getModel("modelCreate"),
				vPath = oBindValue.getPath(),
				vPath = vPath.includes("/") ? vPath.slice(1) : vPath,
				vStoreid, bBusiness, vTpv, vTrx, vImpTran, oFilters;
			if (vPath.includes("Origbusinessdate") || vPath.includes("Origstoreid") || vPath.includes("Origwrkstid") || vPath.includes(
					"Origtransnumber") || vPath.includes("Zzimptrans")) {
				vStoreid = oModelCreate.getProperty("/Origstoreid") ? parseInt(oModelCreate.getProperty("/Origstoreid")).toString() : null;
				bBusiness = oModelCreate.getProperty("/Origbusinessdate") ? this._setConvertUtc(oModelCreate.getProperty("/Origbusinessdate")) :
					null;
				vTpv = oModelCreate.getProperty("/Origwrkstid") ? parseInt(oModelCreate.getProperty("/Origwrkstid")).toString() : null;
				vTrx = oModelCreate.getProperty("/Origtransnumber") ? parseInt(oModelCreate.getProperty("/Origtransnumber")).toString() : null;
				vImpTran = oModelCreate.getProperty("/Zzimptrans") ? oModelCreate.getProperty("/Zzimptrans") : null;
				oFilters = [
					new sap.ui.model.Filter("Retailstoreid", sap.ui.model.FilterOperator.EQ, vStoreid),
					new sap.ui.model.Filter("beginFecha", sap.ui.model.FilterOperator.EQ, bBusiness),
					new sap.ui.model.Filter("Workstationid", sap.ui.model.FilterOperator.EQ, vTpv),
					new sap.ui.model.Filter("Transnumber", sap.ui.model.FilterOperator.EQ, vTrx)
				]
			/*	if (parseFloat(vImpTran) > 0) {
					oFilters.push(new sap.ui.model.Filter("Zzimptrans", sap.ui.model.FilterOperator.EQ, vImpTran))
				}*/
				if (vStoreid && bBusiness && vTpv && vTrx) {
					this.getView().setBusy(true);
					var oFilterTypecode = oModelCreate.getProperty("/Transtypecode") === '102' ? new sap.ui.model.Filter("Transtypecode", sap.ui.model
						.FilterOperator.EQ, "101") : new sap.ui.model.Filter("Transtypecode", sap.ui.model.FilterOperator.EQ, "111")
					oFilters.push(oFilterTypecode)
					oModel.read("/Head", {
						filters: oFilters,
						success: function(data) {
							if (data.results.length > 0) {
								oModelCreate.setProperty("/Orgimptrans", data.results[0].Zzimptotal);
								this.getView().byId("Origbusinessdate").setValueState("None");
								this.getView().byId("Origstoreid").setValueState("None");
								this.getView().byId("Origwrkstid").setValueState("None");
								this.getView().byId("Origtransnumber").setValueState("None");
								this.getView().byId("objectStatError").setVisible(false);
							} else {
								this.getView().byId("objectStatError").setVisible(true);
								//sap.m.MessageBox.error(this.getResourceBundle().getText("errorOrgNoExist"));
								oModelCreate.setProperty("/Orgimptrans", "0");
								this.getView().byId("Origbusinessdate").setValueState("Error");
								this.getView().byId("Origstoreid").setValueState("Error");
								this.getView().byId("Origwrkstid").setValueState("Error");
								this.getView().byId("Origtransnumber").setValueState("Error");
							}
							oModelCreate.refresh(true)
							this.getView().setBusy(false);
						}.bind(this)
					})
				} else {
					oModelCreate.setProperty("/Orgimptrans", "0.00")
				}
			}

		},
		onChangeValuePosition: function(oEvent) {
			var oModel = this.getModel("modelCreate");
			/*Validación required*/
			if (this._validateRequiredField(oEvent)) {
				this._verifyInputType(oEvent);
				/*Tabla de Medio de pago*/
				this._verifyFechaCad(oEvent);
				this._setValuFromSuggestionKey(oEvent);
				this._setValueImpCalcMp(oEvent);
				/*Tabla de Posición de Venta*/
				this._setValueImporteSalesAmount(oEvent);
				/*Ser value Linea de Venta*/
				this._setValueLineaVenta(oEvent);
				oModel.refresh(true);
			}

		},
		onLiveChangeNumber: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				vLength = vValue.length;
			if (isNaN(vValue)) {
				oInput.setValue(vLength > 1 ? vValue.substring(0, (vLength - 1)) : "");
			}

		},
		onChangeCardNumber: function(oEvent) {
			/*Validar forma de pago de medio de pago por tarjeta*/
			/*var oModelFormCard = sap.ui.getCore().getModel("FormpagCard"),
				oDataModelFormCard = oModelFormCard.getData(),
				oModel = this.getView().getModel("modelCreate"),
				oContext = oEvent.getSource().getBindingContext("modelCreate"),
				vValueCard = oEvent.getSource().getValue(),
				vLengthCard = vValueCard.length.toString(),
				oFormPag,
				vLongitud,
				vSubtringCard;

			oDataModelFormCard.forEach(function(item) {
				if (item.Clongtar === vLengthCard) {
					vLongitud = item.Clongide;
					vSubtringCard = vValueCard.substr(0, parseInt(vLongitud));
					if (parseInt(vSubtringCard) >= parseInt(item.Ciddesde) && parseInt(vSubtringCard) <= parseInt(item.Cidhasta) && !oFormPag) {
						oFormPag = item;
					}
				}
			}.bind(this));
			if (oFormPag) {
				oModel.setProperty(oContext.getPath() + "/ZzcodepagoNeg", oFormPag.Cforpago, oContext);
			} else {
				oModel.setProperty(oContext.getPath() + "/ZzcodepagoNeg", "", oContext);
			}*/
		},
		_setValueLineaVenta: function(oEvent) {
			var oBindingInfo = oEvent.getSource().getBindingInfo("value"),
				vValue = oEvent.getSource().getValue(),
				oParts = oEvent.getSource().getBindingInfo("value").parts ? oEvent.getSource().getBindingInfo("value").parts : null,
				oModel = this.getView().getModel("modelCreate"),
				oBindingCotext = oEvent.getSource().getParent().getBindingContext("modelCreate"),
				vPathContext = oBindingCotext.getPath(),
				vPath;
			for (var i in oParts) {
				if (oParts[i].path === "ZzCalifArtic" || oParts[i].path === "Zzcampoc") {
					vPath = oParts[i].path
				}
				if (oParts[i].path === "Zzarthost") {
					oModel.setProperty(oBindingCotext.getPath() + "/Zzcoddpto", Number(vValue.substring(0, 6)).toString().padStart(4, "0"),
						oBindingCotext)
				}
			}
			if (vPath) {
				oModel.setProperty(vPath, vValue, oBindingCotext);
			}
			oModel.refresh(true);
		},
		_validateRequiredField: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				vError = true;
			if (oInput.getRequired() && vValue === "") {
				oInput.setValueState("Error");
				vError = false;
			} else if (oInput.getRequired() && vValue !== "") {
				oInput.setValueState("None");
			}
			return vError;
		},
		_verifyInputType: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				oBindingValue = oInput.getBinding("value"),
				oContext = oInput.getBindingContext("modelCreate"),
				vPath = oBindingValue.getPath(),
				oBindType = oBindingValue.getType() ? oBindingValue.getType().getName() : "",
				oModel = this.getModel("modelCreate");
			//regexp = /^[-+]?[0-9]*(\.[0-9]{0,2})?$/,;
			/*	if (oBindType === "Float" && !regexp.test(vValue)) {
					oInput.setValueState("Error");
					oModel.setProperty(vPath, vValue.toString(), oContext);
				} else if (oBindType === "Float" && regexp.test(vValue)) {
					oInput.setValueState("None");
				}*/

		},
		_setValuFromSuggestionKey: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				oBindingValue = oInput.getBinding("value"),
				vPath = oBindingValue.getPath(),
				oContext = oInput.getBindingContext("modelCreate"),
				oObject = oContext ? oContext.getObject() : null,
				oModel = this.getModel("modelCreate");
			if (vPath === "Medpgsubtip") {
				let vKeySug = oInput.getSelectedKey(),
					oSuggSelect = oInput.getSuggestionItemByKey(vKeySug),
					oObject = oSuggSelect.getBindingContext().getObject();
				oModel.setProperty("Medpgsubtip", oObject.Mediopagosub, oContext);
				oModel.setProperty("ZzcodepagoNeg", oObject.Mediopago, oContext);
				oModel.setProperty("ZzcodpagoDesg", oObject.Desgloce, oContext);
				oModel.setProperty("Subtipo", oObject.Subtipmp, oContext);
				oModel.setProperty("Tipomedpago", oObject.Tipomp, oContext);
				oModel.setProperty("zzcodpago", oObject.Tipomp, oContext);
				oInput.setDescription(oObject.Mediopagotext);
				oInput.getParent().getCells().forEach(function(cell) {
					var vPath = cell.getBinding("value") ? cell.getBinding("value").getPath() : "";
					if (vPath === "Cardnumber" && (oObject.Istajeta !== "" || oObject.Tipomp === '008') && vPath !== "") {
						cell.setRequired(true);
						cell.setEnabled(true);
					} else if (vPath === "Cardnumber" && oObject.Istajeta === "" && vPath !== "") {
						cell.setRequired(false);
						cell.setEnabled(false);
						oModel.setProperty("Cardnumber", "", oContext);
					}
					if (vPath === "Tipotarj" && oObject.Istajeta !== "" && vPath !== "") {
						cell.setRequired(true);
						cell.setEnabled(true);
					} else if (vPath === "Tipotarj" && oObject.Istajeta === "" && vPath !== "") {
						cell.setRequired(false);
						cell.setEnabled(false);
						oModel.setProperty("Tipotarj", "", oContext);
					}
					if (vPath === "ZzPaypal" && oObject.Mediopagosub === "15400007" && vPath !== "") {
						cell.setRequired(true);
						cell.setEnabled(true);
					} else if (vPath === "ZzPaypal" && oObject.Mediopagosub !== "15400007" && vPath !== "") {
						cell.setRequired(false);
						cell.setEnabled(false);
						oModel.setProperty("ZzPaypal", "", oContext);
					}
					/*	if (vPath === "Zzfechacadnac" && oObject.Vindfechavenc === "O" && vPath !== "") {
							cell.setRequired(true);
							cell.setEnabled(true);
						} else if (vPath === "Zzfechacadnac") {
							cell.setRequired(false);
							cell.setEnabled(oObject.Vindfechavenc === "P" ? true : false);
							oModel.setProperty("Zzfechacadnac", "", oContext);
						}*/
				}.bind(this));
			} else if (oInput.getAggregation("suggestionItems") && oInput.getSuggestionItems() && oInput.getSuggestionItems().length > 0 && !oContext) {
				let vKey = oInput.getSelectedKey() ? oInput.getSelectedKey() : vValue,
					oItem = oInput.getSuggestionItemByKey(vKey),
					oObject = oItem && oItem.getBindingContext() ? oItem.getBindingContext().getObject() : null;

				if (oObject) {
					oModel.setProperty(vPath,
						vPath.includes("Origstoreid") ? oObject.Retailstoreid : ""
					);
					oInput.setDescription(
						vPath.includes("Origstoreid") ? oObject.RetailstoreidText : ""
					);
				}

			} else if (oInput.getAggregation("suggestionItems") && oInput.getSuggestionItems() && oInput.getSuggestionItems().length > 0 && oContext) {
				let vKey = oInput.getSelectedKey(),
					oItem = oInput.getSuggestionItemByKey(vKey),
					oObject = oItem.getBindingContext() ? oItem.getBindingContext().getObject() : null;

				if (oObject) {
					oModel.setProperty(vPath,
						vPath.includes("Zzecunimed") ? oObject.UnitOfMeasure :
						vPath.includes("Tipotarj") ? oObject.Country : "",
						oContext
					);
					oInput.setDescription(
						vPath.includes("Zzecunimed") ? oObject.UnitOfMeasure_Text : ""
					);
				}

			} else if (oModel.getData().Transtypecode.includes("102") ) {
				var zimptrans = oModel.getData().Zzimptrans;

				// Si Zzimptrans es positivo, lo conviertes a negativo
				if (zimptrans > 0) {
					oModel.setProperty("/Zzimptrans", -zimptrans);
				}

				// Obtienes el array de posiciones de to_PositionMp
				var positionsMp = oModel.getData().to_PositionMp;

				// Iteras sobre cada posición y aseguras que Tenderamount sea negativo
				positionsMp.forEach(position => {
					position.Tenderamount = -Math.abs(position.Tenderamount);
				});

				// Actualizas el array completo en el modelo
				oModel.setProperty("/to_PositionMp", positionsMp);

				// Obtienes el array de posiciones de to_Position (para Salesamount, Zzlvimpbruto, Zzlvimpneto y Retailquantity)
				var positions = oModel.getData().to_Position;

				// Iteras sobre cada posición y aseguras que los valores sean negativos
				positions.forEach(position => {
					position.Salesamount = Math.abs(position.Salesamount); // Convierte Salesamount a positivo
					position.Zzlvimpbruto = -Math.abs(position.Zzlvimpbruto); // Convierte Zzlvimpbruto a negativo
					position.Zzlvimpneto = Math.abs(position.Zzlvimpneto); // Convierte Zzlvimpneto a positivo
					position.Retailquantity = -Math.abs(position.Retailquantity); // Convierte Retailquantity a negativo
				});

				// Actualizas el array completo en el modelo
				oModel.setProperty("/to_Position", positions);

			} else if (oModel.getData().Transtypecode.includes("104") ) {
				var zimptrans = oModel.getData().Zzimptrans;

				// Si Zzimptrans es positivo, lo conviertes a negativo
				if (zimptrans > 0) {
					oModel.setProperty("/Zzimptrans", -zimptrans);
				}

				// Obtienes el array de posiciones de to_PositionMp
				var positionsMp = oModel.getData().to_PositionMp;

				// Iteras sobre cada posición y aseguras que Tenderamount sea negativo
				positionsMp.forEach(position => {
					position.Tenderamount = -Math.abs(position.Tenderamount);
				});

				// Actualizas el array completo en el modelo
				oModel.setProperty("/to_PositionMp", positionsMp);

				// Obtienes el array de posiciones de to_Position (para Salesamount, Zzlvimpbruto, Zzlvimpneto y Retailquantity)
				var positions = oModel.getData().to_Position;

				// Iteras sobre cada posición y aseguras que los valores sean negativos
				positions.forEach(position => {
					position.Salesamount = Math.abs(position.Salesamount); // Convierte Salesamount a positivo
					position.Zzlvimpbruto = Math.abs(position.Zzlvimpbruto); // Convierte Zzlvimpbruto a positivo
					position.Zzlvimpneto = Math.abs(position.Zzlvimpneto); // Convierte Zzlvimpneto a positivo
					position.Retailquantity = Math.abs(position.Retailquantity); // Convierte Retailquantity a positivo
				});

				// Actualizas el array completo en el modelo
				oModel.setProperty("/to_Position", positions);
			}

			/*else if(vPath === "Zzecunimed"){
				
			}else if (vPath.includes8("Origstoreid") ) {
				
			}*/
		},
		_verifyFechaCad: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				oBindingValue = oInput.getBinding("value"),
				vPath = oBindingValue.getPath(),
				oContext = oInput.getBindingContext("modelCreate"),
				oObject = oContext.getObject(),
				oModel = this.getModel("modelCreate"),
				vValid = true;
			if (vPath === "Zzfechacadnac") {
				if (vValue === "" || isNaN(vValue)) {
					vValid = false;
				} else if (vValue.length < 4) {
					vValid = false;
				} else {
					vValid = parseInt(vValue.substring(0, 2)) > 12 || parseInt(vValue.substring(0, 2)) === 0 ? false : vValid;
				}

				if (!vValid) {
					oInput.setValueState("Error");
				} else {
					oInput.setValueState("None");
				}
			}
		},
		_setValueImporteSalesAmount: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				oBindingValue = oInput.getBinding("value"),
				vPath = oBindingValue.getPath(),
				oContext = oInput.getBindingContext("modelCreate"),
				oObject = oContext.getObject(),
				oModel = this.getModel("modelCreate"),
				vValid = true;
			if (vPath === "Salesamount" && oInput.getValueState() === "None") {
				oModel.setProperty("Zzlvimpneto",
					parseFloat(oObject.Zzlvimpneto) === 0 || !oObject.Zzlvimpneto ? oObject.Salesamount : oObject.Zzlvimpneto,
					oContext);
				oModel.setProperty("Zzlvimpbruto",
					parseFloat(oObject.Zzlvimpbruto) === 0 || !oObject.Zzlvimpbruto ? oObject.Salesamount : oObject.Zzlvimpbruto,
					oContext);
				oModel.setProperty("Salesamount", oObject.Salesamount.toString(), oContext);
				this._setFooterTotalsPosV(oContext.getModel().getData().to_Position);
			} else if ((vPath === "Zzlvimpneto" || vPath === "Zzlvimpbruto") && oInput.getValueState() === "None") {
				oModel.setProperty(vPath,
					vValue === "" ? "0" : vPath === "Zzlvimpneto" ? oObject.Zzlvimpneto.toString() : vPath === "Zzlvimpbruto" ? oObject.Zzlvimpbruto
					.toString() : "0",
					oContext);
				this._setFooterTotalsPosV(oContext.getModel().getData().to_Position);
			}
		},
		_setValueImpCalcMp: function(oEvent) {
			var oInput = oEvent.getSource(),
				vValue = oInput.getValue(),
				oBindingValue = oInput.getBinding("value"),
				vPath = oBindingValue.getPath(),
				oContext = oInput.getBindingContext("modelCreate"),
				oObject = oContext.getObject(),
				oModel = this.getModel("modelCreate"),
				oModelData = oModel.getData(),
				vImpCalc = 0;
			oModelData.to_PositionMp.forEach(function(item) {
				vImpCalc = parseFloat(item.Tenderamount) + vImpCalc;
			}.bind(this))
			oModel.setProperty("/ImpTotaChange", vImpCalc);
		},
		_onValidateFormError: function() {
			var oControlFieldAll = this.getView().getControlsByFieldGroupId("fgDG"),
				oControlTableMP = this.getView().getControlsByFieldGroupId("fgDGMP"),
				oControlTableP = this.getView().getControlsByFieldGroupId("fgDGP"),
				vError = false;

			oControlFieldAll.forEach(function(item) {
				if ((item.getMetadata()._sClassName === "sap.m.Input" || item.getMetadata()._sClassName === "sap.m.TextArea") && item.getValueState() !==
					"None") {
					vError = true;
				}
			});
			oControlTableMP.forEach(function(item) {
				if (item.getMetadata()._sClassName === "sap.m.Input" && item.getValueState() !== "None") {
					vError = true;
				}
			});
			oControlTableP.forEach(function(item) {
				if (item.getMetadata()._sClassName === "sap.m.Input" && item.getValueState() !== "None") {
					vError = true;
				}
			});
			return vError;
		},
		onValueHelpRequest: function(oEvent) {
			var oInput = oEvent.getSource(),
				vPathValue = oInput.getSuggestionItems()[0].getBinding("key").getPath(),
				vPathDesc = oInput.getSuggestionItems()[0].getBinding("text").getPath(),
				vPathValueHelpEntity = oInput.getBinding("suggestionItems").getPath().slice(1),
				oModel = this.getModel(),
				vVHEnd = "";
			this.gButtonRequest = oInput;
			this._oBasicSearchField = new SearchField();
			vVHEnd = vPathValue === 'Mediopagosub' ? 'MP' : '';
			this._oValueHelpDialogF = sap.ui.core.Fragment.load({
				name: "app.inetum.zcarconsulta2.view.fragments.ValueHelpDialog", // + vVHEnd,
				controller: this
			});
			this._oValueHelpDialogF.then(function(oDialog) {
				var oFilterBar = oDialog.getFilterBar(),
					oColumnProductCode, oColumnProductName;
				this._oVHD = oDialog;

				var sFilters = this._oVHD.getFilterBar().getAllFilterItems();
				sFilters.forEach(function(filter, index) {
					if (index === 0) {
						filter.setName()
					}
				});

				this._oVHD.setTitle(oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label"));
				this._oVHD.setKey(vPathValue);
				this._oVHD.setDescriptionKey(vPathDesc);
				this.getView().addDependent(oDialog);

				// Set key fields for filtering in the Define Conditions Tab
				oDialog.setRangeKeyFields([{
					label: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label"),
					key: vPathValue,
					type: "string",
					typeInstance: new TypeString({}, {
						maxLength: 7
					})
				}]);

				// Set Filters

				oDialog.getTableAsync().then(function(oTable) {
					oTable.removeAllColumns();
					oTable.setModel(this.oProductsModel);
					oTable.setSelectionMode("Single");
					// For Desktop and tabled the default table is sap.ui.table.Table
					if (oTable.bindRows) {

						// Bind rows to the ODataModel and add columns
						oTable.bindAggregation("rows", {
							path: "/" + vPathValueHelpEntity,
							events: {
								dataReceived: function() {
									oDialog.update();
								}
							}
						});
						if (vPathValue !== "Mediopagosub") {
							oColumnProductCode = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + vPathValue + "}"
								})
							});
							oColumnProductCode.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label")
							});
						}

						oColumnProductName = new UIColumn({
							label: new sap.m.Label({
								text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label")
							}),
							template: new sap.m.Text({
								wrapping: false,
								text: "{" + vPathDesc + "}"
							})
						});
						oColumnProductName.data({
							fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label")
						});
						oTable.addColumn(oColumnProductCode);
						oTable.addColumn(oColumnProductName);
						if (vPathValue === "Mediopagosub") {
							/*var oColumn1 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Tipomp" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Tipomp" + "}"
								})
							});
							oColumn1.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Tipomp" + "/@sap:label")
							});*/
							var oColumn3 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Mediopago" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Mediopago" + "}"
								})
							});
							oColumn3.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Mediopago" + "/@sap:label")
							});
							var oColumn4 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Desgloce" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Desgloce" + "}"
								})
							});
							oColumn4.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Desgloce" + "/@sap:label")
							});
							var oColumn2 = new UIColumn({
								label: new sap.m.Label({
									text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Subtipmp" + "/@sap:label")
								}),
								template: new sap.m.Text({
									wrapping: false,
									text: "{" + "Subtipmp" + "}"
								})
							});
							oColumn2.data({
								fieldName: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + "Subtipmp" + "/@sap:label")
							});
							//oTable.addColumn(oColumn1);
							oTable.addColumn(oColumn3);
							oTable.addColumn(oColumn4);
							oTable.addColumn(oColumn2);

						}
						if (vPathValue !== "Mediopagosub") {
							oDialog.getFilterBar().getAllFilterItems().forEach(function(item, index) {
								if (index === 0) {
									item.setLabel(oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathValue + "/@sap:label"))
									item.getControl().setName(vPathValue);
								} else if (index === 1) {
									item.setLabel(oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label"))
									item.getControl().setName(vPathDesc);
								}
								item.getControl().setValue("");
							});
						} {
							oDialog.getFilterBar().getAllFilterItems().forEach(function(item, index) {
								if (index === 0) {
									item.setLabel(oModel.getObject("/#" + vPathValueHelpEntity + "Type/Desgloce/@sap:label"))
									item.getControl().setName("Desgloce");
								} else if (index === 1) {
									item.setLabel(oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label"))
									item.getControl().setName(vPathDesc);
								}
								item.getControl().setValue("");
							});
						}

					}

					// For Mobile the default table is sap.m.Table
					if (oTable.bindItems) {
						// Bind items to the ODataModel and add columns
						oTable.bindAggregation("items", {
							path: "/" + vPathValueHelpEntity,
							template: new ColumnListItem({
								cells: [new Label({
									text: "{" + vPathValue + "}"
								}), new Label({
									text: "{" + vPathDesc + "}"
								})]
							}),
							events: {
								dataReceived: function() {
									oDialog.update();
								}
							}
						});
						oTable.addColumn(new MColumn({
							header: new Label({
								text: "Product Code"
							})
						}));
						oTable.addColumn(new MColumn({
							header: new Label({
								text: oModel.getObject("/#" + vPathValueHelpEntity + "Type/" + vPathDesc + "/@sap:label")
							})
						}));
					}
					oDialog.update();
				}.bind(this));

				oDialog.setTokens([]);
				oDialog.open();
			}.bind(this));
		},
		onValueHelpCancelPress: function() {
			this._oVHD.close();
		},
		onValueHelpOkPress: function(oEvent) {
			var aTokens = oEvent.getParameter("tokens"),
				oModel = this.getModel(),
				oModelCreate = this.getModel("modelCreate"),
				oContext = this.gButtonRequest.getBindingContext("modelCreate"),
				vPath = this.gButtonRequest.getBindingContext("modelCreate") ? this.gButtonRequest.getBindingContext("modelCreate").getPath() :
				this.gButtonRequest.getBindingInfo("value") && this.gButtonRequest.getBindingInfo("value").binding && this.gButtonRequest.getBindingInfo(
					"value").binding.getPath() && this.gButtonRequest.getBindingInfo("value").binding.getPath().includes("/") ? this.gButtonRequest.getBindingInfo(
					"value").binding.getPath().slice(1) : this.gButtonRequest.getBindingInfo("value").binding.getPath();

			if (aTokens.length > 0) {
				var
					tPath = "/" + aTokens[0].getCustomData()[1].getValue(),
					oObject = oModel.getObject(tPath);
				if (tPath.includes("mediopago")) {
					oModelCreate.setProperty(vPath + "/ZzcodepagoNeg", oObject.Mediopago);
					oModelCreate.setProperty(vPath + "/ZzcodpagoDesg", oObject.Desgloce);
					oModelCreate.setProperty(vPath + "/Subtipo", oObject.Subtipmp);
					oModelCreate.setProperty(vPath + "/Tipomedpago", oObject.Tipomp);
					oModelCreate.setProperty(vPath + "/zzcodpago", oObject.Tipomp);
					oModelCreate.setProperty(vPath + "/Medpgsubtip", oObject.Mediopagosub);
					oModelCreate.setProperty(vPath + "/Mediopagotexts", oObject.Mediopagotext);
					this.gButtonRequest.getParent().getCells().forEach(function(cell) {
						var vPath = cell.getBinding("value") ? cell.getBinding("value").getPath() : "";
						if (vPath === "Cardnumber" && (oObject.Istajeta !== "" || oObject.Tipomp === '008') && vPath !== "") {
							cell.setRequired(true);
							cell.setEnabled(true);
						} else if (vPath === "Cardnumber" && oObject.Istajeta === "" && vPath !== "") {
							cell.setRequired(false);
							cell.setEnabled(false);
							oModel.setProperty("Cardnumber", "", oContext);
						}
						if (vPath === "Tipotarj" && oObject.Istajeta !== "" && vPath !== "") {
							cell.setRequired(true);
							cell.setEnabled(true);
						} else if (vPath === "Tipotarj" && oObject.Istajeta === "" && vPath !== "") {
							cell.setRequired(false);
							cell.setEnabled(false);
							oModel.setProperty("Tipotarj", "", oContext);
						}
						if (vPath === "ZzPaypal" && oObject.Mediopagosub === "15400007" && vPath !== "") {
							cell.setRequired(true);
							cell.setEnabled(true);
						} else if (vPath === "ZzPaypal" && oObject.Mediopagosub !== "15400007" && vPath !== "") {
							cell.setRequired(false);
							cell.setEnabled(false);
							oModel.setProperty("ZzPaypal", "", oContext);
						}
					}.bind(this));
					/*	//Activar tarjeta
						if (oObject.Istajeta !== "" ||  oObject.Tipomp === '008') {
							this.gButtonRequest.getParent().getCells()[6].setEnabled(true);
							this.gButtonRequest.getParent().getCells()[6].setRequired(true);
						} else {
							this.gButtonRequest.getParent().getCells()[6].setEnabled(false);
							this.gButtonRequest.getParent().getCells()[6].setRequired(false);
							this.gButtonRequest.getParent().getCells()[6].setValue("");
						}
						//Activar paypal
						if (oObject.Mediopagosub === "15400007") {
							this.gButtonRequest.getParent().getCells()[8].setEnabled(true);
							this.gButtonRequest.getParent().getCells()[8].setRequired(true);
							this.gButtonRequest.getParent().getCells()[6].setValue("");
						} else {
							this.gButtonRequest.getParent().getCells()[8].setEnabled(false);
							this.gButtonRequest.getParent().getCells()[8].setRequired(false);
							this.gButtonRequest.getParent().getCells()[8].setValue("");
						}
						//Activar fecha de vencimiento si corresponde
						if (oObject.Istajeta !== "") {
							this.gButtonRequest.getParent().getCells()[7].setEnabled(true);
						} else {
							this.gButtonRequest.getParent().getCells()[7].setEnabled(false);
							this.gButtonRequest.getParent().getCells()[7].setValue("");
						}*/
				} else if (tPath.includes("UnitOfMeasure")) {
					oModelCreate.setProperty(vPath + "/Zzecunimed", oObject.UnitOfMeasure);
					//oModelCreate.setProperty(vPath + "/ZzecunimedText", oObject.UnitOfMeasure_Text);
					this.gButtonRequest.setDescription(oObject.UnitOfMeasure_Text)
				} else if (tPath.includes("storeid")) {
					oModelCreate.setProperty("/Origstoreid", oObject.Retailstoreid);
					//this.gButtonRequest.setValue(oObject.Retailstoreid);
					this.gButtonRequest.setDescription(oObject.RetailstoreidText)
				} else if (tPath.includes("I_Country")) {
					oModelCreate.setProperty(vPath + "/Tipotarj", oObject.Country);
				}
				this.gButtonRequest.setValueState("None");
				this.gButtonRequest.setValueStateText();
				this._setImporteOriginal(this.gButtonRequest);
			}
			oModelCreate.refresh(true);
			this._oVHD.close();
		},
		onFilterBarSearch: function(oEvent) {
			var sSearchQuery = this._oBasicSearchField.getValue(),
				aFilters = [],
				aSelectionSet = oEvent.getParameter("selectionSet"),
				aFilters = aSelectionSet && aSelectionSet.reduce(function(aResult, oControl) {
					if (oControl.getValue()) {
						aResult.push(new sap.ui.model.Filter({
							path: oControl.getName(),
							operator: sap.ui.model.FilterOperator.Contains,
							value1: oControl.getValue()
						}));
					}

					return aResult;
				}, []);

			this._filterTable(new sap.ui.model.Filter({
				filters: aFilters,
				and: true
			}));
		},
		onAddRowMP: function(oEvent) {
			var
				oViewContext = this.getView().getBindingContext(),
				oViewObject = oViewContext.getObject(),
				oTable = this.byId("tablePosMp"),
				oModel = oTable.getBinding("rows").getModel();
			var oEmptyPosition = {
				Retailstoreid: oViewObject.Retailstoreid,
				Businessdaydate: oViewObject.Businessdaydate,
				Transnumber: oViewObject.Transnumber,
				Workstationid: oViewObject.Workstationid,
				Transindex: oViewObject.Transindex,

			};
			var aPositionMp = oModel.getProperty("/to_PositionMp");
			aPositionMp.push(oEmptyPosition);
			oModel.setProperty("/to_PositionMp", aPositionMp);
			oModel.refresh();
		},
		onDeleteRowMP: function(oEvent) {
			var oTable = this.byId("tablePosMp");
			var oModel = this.getView().getModel("modelCreate");
			var aPositionMp = oModel.getProperty("/to_PositionMp"),
				aPositionMpNew = [];
			var oModelDatTrxOriginal = this.getModel("modelDataTrx"),
				oPositionMpOriginal = oModelDatTrxOriginal.getProperty("/to_PositionMp"),
				oIndices = oTable.getSelectedIndices();

			if (oIndices.length > 0) {
				oIndices.forEach(function(indice) {
					var oObject = aPositionMp[indice];
					if (oObject && !oObject.Tendernumber && !oObject.Fieldgroup) {
						//Nuevo registros - Remover el elemento seleccionado del array - Marcar por campo deleteItem
						oObject.deleteItem = true;
					} else if (oObject.Tendernumber || oObject.Fieldgroup) {
						oModel.setProperty("/to_PositionMp/" + indice + "/IndUpdate", !oObject.IndUpdate ? "D" : oObject.IndUpdate === "D" ?
							"" :
							"");
					}
				}.bind(this));
				aPositionMpNew = aPositionMp.filter(item => !item.deleteItem);
				oModel.setProperty("/to_PositionMp", aPositionMpNew);
			} else {
				sap.m.MessageToast.show("Por favor, selecciona una fila para eliminar.");
			}
		},
		onAddRowPV: function() {
			var
				oViewContext = this.getView().getBindingContext(),
				oViewObject = oViewContext.getObject(),
				oTable = this.byId("tablePos"),
				oModel = oTable.getBinding("rows").getModel();
			var oEmptyPosition = {
				Retailstoreid: oViewObject.Retailstoreid,
				Businessdaydate: oViewObject.Businessdaydate,
				Transnumber: oViewObject.Transnumber,
				workstationid: oViewObject.Workstationid,
				Transindex: oViewObject.Transindex

			};
			var aPositionMp = oModel.getProperty("/to_Position");
			aPositionMp.push(oEmptyPosition);
			oModel.setProperty("/to_Position", aPositionMp);
			oModel.refresh();
		},
		onDeleteRowPV: function() {
			var oTable = this.byId("tablePos");
			var oModel = this.getView().getModel("modelCreate");
			var aPosition = oModel.getProperty("/to_Position"),
				aPositionNew = [];
			var oModelDatTrxOriginal = this.getModel("modelDataTrx"),
				oPositionOriginal = oModelDatTrxOriginal.getProperty("/to_Position"),
				oIndices = oTable.getSelectedIndices();

			if (oIndices.length > 0) {
				oIndices.forEach(function(indice) {
					var oObject = aPosition[indice];
					if (oObject && !oObject.Retailnumber) {
						//Nuevo registros - Remover el elemento seleccionado del array - Marcar por campo deleteItem
						oObject.deleteItem = true;
					} else if(oObject && oObject.Retailnumber) {
						oModel.setProperty("/to_Position/" + indice + "/IndUpdate", !oObject.IndUpdate ? "D" : oObject.IndUpdate === "D" ?
							"" :
							"");
					}
				}.bind(this));
				aPositionNew = aPosition.filter(item => !item.deleteItem);
				oModel.setProperty("/to_Position", aPositionNew);
			} else {
				sap.m.MessageToast.show("Por favor, selecciona una fila para eliminar.");
			}
			/*// Obtener el índice de la fila seleccionada
			var iSelectedIndex = oTable.getSelectedIndex();
			var oObject = iSelectedIndex >= 0 ? aPosition[iSelectedIndex] : null;

			if (iSelectedIndex >= 0 && !oObject.Retailnumber) {
				//Nuevo registros - Remover el elemento seleccionado del array
				aPosition.splice(iSelectedIndex, 1);
				oModel.setProperty("/to_Position", aPosition);
				oModel.refresh();
				oTable.clearSelection();
			} else if (iSelectedIndex >= 0 && oObject.Retailnumber) {
				var vIndex = oPositionOriginal.findIndex((item) => item.Tendernumber === oObject.Tendernumber),
					oObjectOriginal = oPositionOriginal[vIndex];
				for (var prop in oObjectOriginal) {
					if (prop !== "IndUpdate") {
						oModel.setProperty("/to_Position/" + iSelectedIndex + "/" + prop, oObjectOriginal[prop]);
					}
				}
				oModel.setProperty("/to_Position/" + iSelectedIndex + "/IndUpdate", !oObject.IndUpdate ? "D" : oObject.IndUpdate === "D" ? "" :
					"");
				oModel.refresh();
				oTable.clearSelection();
			} else {
				// Si no hay una fila seleccionada, mostrar un mensaje
				sap.m.MessageToast.show("Por favor, selecciona una fila para eliminar.");
			}*/
		},
		_filterTable: function(oFilter) {
			var oVHD = this._oVHD;

			oVHD.getTableAsync().then(function(oTable) {
				if (oTable.bindRows) {
					oTable.getBinding("rows").filter(oFilter);
				}
				if (oTable.bindItems) {
					oTable.getBinding("items").filter(oFilter);
				}

				// This method must be called after binding update of the table.
				oVHD.update();
			});
		},
		onNavigateLog: function(oEvent) {
			var oContext = this.getView().getBindingContext(),
				oObject = oContext.getObject();
			if (sap.ushell.Container) {
				sap.ushell.Container
					.getService("CrossApplicationNavigation")
					.toExternal({
						target: {
							semanticObject: "zcarplogtrans",
							action: "display"
						},
						params: {
							Retailstoreid: oObject.Retailstoreid,
							BeginFecha: new Date(Date.UTC(oObject.beginFecha.getFullYear(), oObject.beginFecha.getMonth(), oObject.beginFecha.getDate())),
							WorkstationidView: oObject.WorkstationidView,
							TransnumberView: oObject.TransnumberView
						}
					});
			}
		}

	});

});