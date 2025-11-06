sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/core/util/File",
	"sap/ui/generic/app/navigation/service/NavigationHandler", "inetum/ZSO_GEST_HUECOS/libs/xlsx", "inetum/ZSO_GEST_HUECOS/model/Formatter",
	"sap/ui/Device", 'sap/m/Token', 'sap/m/MessageBox', 'sap/m/MessageToast'
], function(e, t, i, r, a, n, s, Device, Token, MessageBox, MessageToast) {
	"use strict";
	var o, l, m;
	return e.extend("inetum.ZSO_GEST_HUECOS.controller.Main", {
		formatter: s,
		pathLogoInetum: "/sap/public/bc/ui2/logon/img/inetum_t.png",
		onInit: function() {
			sap.ui.core.BusyIndicator.hide();
			o = new sap.ui.model.json.JSONModel({}, true);
			this.getView().setModel(o, "modelFilter");
			l = new sap.ui.model.json.JSONModel({}, true);
			this.getView().setModel(l, "modelTabla");
			m = new sap.ui.model.json.JSONModel({}, true);
			this.getView().setModel(m, "scanModel");
			this.i18n = this.getView().getModel("i18n").getResourceBundle();
			//this.getView().byId("oScroll").setHeight(this.getView().getModel("device").getData().resize.height * .8 + "px");
			this.oNavigationHandler = new a(this);
			this.oNavigationHandler.parseNavigation().done(this.onNavigationDone.bind(this));
			this._oAppState = {
				filter: o.getData()
			};
			//this._renderTable();
			/*var oModel = this.getView().getModel("huecos_Model");
			oModel.read("/ProductSet", {
				success: function(oData) {
					var iNumberOfItems = oData.results.length;
					var oText = this.getView().byId("numberOfItemsText");
					oText.setText("Items: " + iNumberOfItems.toString());
				}.bind(this),
				error: function(oError) {}
			});*/

		},
		onAfterRendering: function() {
			var a = [];
			var e = this.getView().byId("imgInetum");
			e.setSrc(window.location.origin + this.pathLogoInetum);
			var t = this.byId("tablePrincipal");
			var i = new sap.ui.model.Sorter("Matkl", false);
			a.push(new sap.ui.model.Sorter("Matkl", false));
			a.push(new sap.ui.model.Sorter("Matnr", false));
			t.getBinding("items").sort(a);
			if (Device.system.phone) {
				var oButton = this.getView().byId("toggleButton");
				oButton.setVisible(true);
			}

		},
		resetFilters: function() {
			this.getView().byId("INGrArti2").setTokens([]);
			o.getData().grupArti = "";
			jQuery.proxy(this.generateQuery(), this)
		},
		onSearch: function() {
			var e = 500;
			var t = this;
			if (this.liveChangeTimer) {
				window.clearTimeout(this.liveChangeTimer)
			}
			this.liveChangeTimer = window.setTimeout(function() {
				jQuery.proxy(t.generateQuery(), t)
			}, e)
		},
		onSearchLive: function() {
			var e = 1e3;
			var t = this;
			if (this.liveChangeTimer) {
				window.clearTimeout(this.liveChangeTimer)
			}
			this.liveChangeTimer = window.setTimeout(function() {
				t.checkCompleteFilters();
				jQuery.proxy(t.generateQuery(), t)
			}, e)
		},
		generateQuery: function() {
			var e = this.generateFitlers();
			this.getView().setBusy(true);
			this.getView().byId("tablePrincipal").getBinding("items").filter(e)
		},
		onCountriesReceived: function(oEvent) {
			this.getView().setBusy(false);
			var oBinding = oEvent.getSource();
            var iTotalCount = oBinding.getLength(); 
            var oText = this.getView().byId("numberOfItemsText");
            oText.setText("Items: " + iTotalCount.toString());
 
            /*var oTable = this.byId("tablePrincipal");
            if(oBinding.aFilters.length == 0){
            	oTable.setNoDataText('Debe introducir un filtro para buscar');
            }else{
            	oTable.setNoDataText('No se han encontrado datos');
            }*/
		},
		handleValueHelpGrupArti: function() {
			if (!this.F4_GrupArti) {
				this.F4_GrupArti = new sap.ui.xmlfragment("inetum.ZSO_GEST_HUECOS.view.fragments.VH_GrupArti", this);
				this.getView().addDependent(this.F4_GrupArti)
			}
			this.F4_GrupArti.open()
		},
		handleHelpCloseGrupArti: function(e) {},
		handleHelpConfirmGrupArti: function(evt) {
			var aSelectedItems = evt.getParameter("selectedItems"),
				oMultiInput = this.byId("INGrArti2"); //INGrArti2

			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function(oItem) {
					oMultiInput.addToken(new Token({
						key: oItem.getDescription(),
						text: oItem.getTitle()
					}));
				});
			}
			jQuery.proxy(this.onSearchLive(), this);
			/*	var t = e.getParameter("selectedItems");
				var i = new Map;
				this.getView().byId("INGrArti").getTokens().forEach(function(e) {
					i.set(e.getKey(), e)
				});
				for (var r = 0; r < t.length; r++) {
					if (!i.get(t[r].getTitle())) {
						this.getView().byId("INGrArti").addToken(new sap.m.Token({
							text: t[r].getDescription(),
							key: t[r].getTitle()
						}))
					}
				}
				jQuery.proxy(this.onSearchLive(), this)*/
		},
		handleSearchGrupArti: function(e) {
			var t = e.getParameter("value");
			var i = [];
			var r = new sap.ui.model.Filter("Familia", sap.ui.model.FilterOperator.Contains, t);
			r = new sap.ui.model.Filter("Descripcion", sap.ui.model.FilterOperator.Contains, t);
			i.push(r);
			e.getSource().getBinding("items").filter(new sap.ui.model.Filter(i, false))
		},
		onAdjust: function(e) {
			if (e.getSource().getSelectedItems().length === 1) {
				var t = undefined;
				if (sap.ushell.Container) {
					t = sap.ushell.Container.getService("CrossApplicationNavigation")
				}
				var i = jQuery.sap.storage(jQuery.sap.storage.Type.local);
				var r = {
					GrArt: ""
				};
				this.getView().byId("INGrArti2").getTokens().forEach(function(e) {
					r.GrArt = r.GrArt + e.getText() + "-" + e.getKey() + ","
				});
				i.put("filters", r);
				var a = e.getSource().getSelectedItems()[0].getBindingContext("huecos_Model").getObject().Matnr;
				//	n = "#Article-zcorrectStock&/count/Products('" + a + "')";
				this.gShellHash = {
					Material: a,
					target: "#Article-ZCorrectStock2&/count/Products('" + a + "')"
				};
				/*this.gShellHash = {
					Material: a,
					target: "#Article-countStock&/count/Products('" + a + "')"
				};
				this.gShellHash = {
					Material: a,
					target: "#Article-countStock"
				};*/
				if (sap.ushell.Container) {
					if (t) {
						//sap.ui.core.BusyIndicator.show();
						jQuery.sap.storage.put("NavRepStock", true);
						t.toExternal({
							target: {
								shellHash: this.gShellHash.target
							}
						});
					}
				} else {
					if (t) {
						t.backToPreviousApp();
					}
				}
				/*this.getView().byId("scanBtn").fireOpendialog();
				setTimeout(function() {
					this.getView().byId("scanBtn").gDialogScan.getAggregation("beginButton").attachPress(function(oEvent) {
						if (this.byId("tablePrincipal").getSelectedItems().length === 1) {
							this.byId("tablePrincipal").getSelectedItems()[0].setSelected(false);
						}

					}.bind(this));
				}.bind(this), "500");*/
			}
		},
		onNavigationDone: function(e, t, i) {
			var r = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			if (r.get("filters")) {
				var a = r.get("filters").GrArt;
				if (a && a.split(",")) {
					if (a.split(",").length > 0) {
						a.split(",").forEach(jQuery.proxy(function(e) {
							if (e && e.split("-").length > 0) {
								this.getView().byId("INGrArti2").addToken(new sap.m.Token({
									text: e.split("-")[0].trim(" "),
									key: e.split("-")[1].trim(" ")
								}));
							}
						}, this));
					}
				}
				r.removeAll();
				jQuery.proxy(this.onSearch(), this);
			}
		},
		generateFitlers: function() {
			var e = [];
			if (this.getView().byId("INGrArti2").getTokens().length > 0) {
				var t = [];
				for (var r = 0; r < this.getView().byId("INGrArti2").getTokens().length; r++) {
					t.push(new i("Familia", "EQ", this.getView().byId("INGrArti2").getTokens()[r].getText(), false))
				}
				e.push(new i(t))
			}
			return e;
		},
		checkCompleteFilters: function() {
			if (this.getView().getModel("device").getData().system.phone) {
				this.getView().byId("INGrArti2").closeSuggestions();
			}
			if (this.getView().byId("INGrArti2").getValue() !== "") {
				this.getView().byId("INGrArti2").addToken(new sap.m.Token({
					text: this.getView().byId("INGrArti2").getValue(),
					key: this.getView().byId("INGrArti2").getValue()
				}));
				this.getView().byId("INGrArti2").setValue("");
			}
		},
		exportExcel: function() {
			sap.ui.core.BusyIndicator.show();
			this.getView().getModel("huecos_Model").read("/ProductSet", {
				filters: this.generateFitlers(),
				success: jQuery.proxy(function(e, t) {
					if (e && e.results && e.results.length > 0) {
						var i = [];
						e.results.forEach(function(e) {
							i.push({
								Articulo: e.Matnr,
								Marca: e.Marca,
								Stock: e.Stock,
								Descripcion: e.Descripcion,
								"Fecha de Ultima Venta": e.UltVenta,
								"Fecha de Ultima entrada de Mercancias": e.UltEm,
								"Fecha de Ultimo inventario": e.UltInv,
								"Grupo de articulo": e.Matkl,
								"Cantidad contada": e.Cantidad,
								"Unidad": e.Unidad
							})
						});
						var r = XLSX.utils.book_new();
						var a = XLSX.utils.json_to_sheet(i);
						XLSX.utils.book_append_sheet(r, a, "Export");
						XLSX.writeFile(r, "Huecos_" + (new Date).toLocaleString() + ".xlsx", {
							type: "file"
						});
					}
					sap.ui.core.BusyIndicator.hide();
				}, this),
				error: function(e) {
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},
		onSubmitGrArt: function(e) {
			if (e.getParameter("value") !== "") {
				this.getView().byId("INGrArti2").addToken(new sap.m.Token({
					text: e.getParameter("value"),
					key: e.getParameter("value")
				}));
				e.getSource().setValue("");
				jQuery.proxy(this.onSearchLive(), this);
			}
		},
		scanOpenDialog: function(e) {
			e.getSource().fireOpendialog();
		},
		scanGetData: function(e) {
			var oTable = this.byId("tablePrincipal");
			var aColumns = oTable.getColumns();
			var t = e.getParameter("results") && e.getParameter("results").length > 0 ? t = e.getParameter("results")[0] : null,
				i = undefined;
			if (sap.ushell.Container) {
				i = sap.ushell.Container.getService("CrossApplicationNavigation");
			}
			if (t && t.Material === this.gShellHash.Material) {
				if (sap.ushell.Container) {
					if (i) {
						sap.ui.core.BusyIndicator.show();
						jQuery.sap.storage.put("NavRepStock", true);
						i.toExternal({
							target: {
								shellHash: this.gShellHash.target
							}
						});
					}
				} else {
					if (i) {
						i.backToPreviousApp();
					}
				}
			} else {
				// for (var j = 0; j < aColumns.length; j++) {
				// 	var oColumn = aColumns[j];
				// 	oColumn.setSelected(false);
				// }
				oTable.getSelectedItems()[0].setSelected(false);
				sap.m.MessageBox.alert("El material escaneado no corresponde con el seleccionado");
			}
		},
		onToggleColumnsVisibility: function() {
			var oTable = this.getView().byId("tablePrincipal");
			var aColumns = oTable.getColumns();
			var oButton = this.getView().byId("toggleButton");

			if (oTable.getAutoPopinMode()) {
				for (var j = 0; j < aColumns.length; j++) {
					var oColumn = aColumns[j];
					if (!(oColumn.getId().endsWith("Articulo") || oColumn.getId().endsWith("Descripcion") || oColumn.getId().endsWith("canStock"))) {
						oColumn.setMinScreenWidth("600px");
						oColumn.setDemandPopin(false);
					} else {
						oColumn.setMinScreenWidth("30px");
						oColumn.setDemandPopin(false);
					}
				}
			}
			oTable.setAutoPopinMode(oTable.getAutoPopinMode() ? null : !oTable.getAutoPopinMode());
			if (oButton.getIcon() === "sap-icon://show") {
				oButton.setIcon("sap-icon://hide");
			} else {
				oButton.setIcon("sap-icon://show");
			}

		},
		openScan: function(oEvent) {
			if (!this.Custom_Scan) {
				this.Custom_Scan = new sap.ui.xmlfragment("inetum.ZSO_GEST_HUECOS.view.fragments.Custom_Scan", this);
				this.getView().addDependent(this.Custom_Scan);
			}
			this.Custom_Scan.open();
			var delay = 500;
			var that = this;
			window.clearTimeout(this.liveChangeTimer);
			this.liveChangeTimer = window.setTimeout(jQuery.proxy(function() {
				//sap.ui.getCore().byId(this.Custom_Scan.getAggregation("content")[0].getId()).focus();
				sap.ui.getCore().byId("inputEan").focus();
			}, that), delay);
		},
		closeCustomScan: function(oEvent) {
			if (this.Custom_Scan) {
				this.Custom_Scan.close();
			}
			this.getView().getModel("scanModel").setData({});
			sap.ui.getCore().byId("inputEan").setValue("");
		},
		liveChangeScan: function(oEvent) {
			var oModel = this.getView().getModel("huecos_Model");
			var sEan = oEvent.getSource().getValue();
			var oFilter = new sap.ui.model.Filter({
				path: "Ean",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: sEan
			});
			oModel.read("/Materials", {
				filters: [oFilter],
				success: function(oData) {
					if (oData.results) {
						if (oData.results && oData.results.length === 1) {
							var oMaterial = oData.results[0];
							this.getView().getModel("scanModel").setData(oMaterial);
						} else {
							this.getView().getModel("scanModel").setData({});
							if (oData.results && oData.results.length > 1) {
								sap.m.MessageToast.show("EAN no es único: Se encontraron " + oData.results.length + " resultados.");
							} else {
								sap.m.MessageToast.show("EAN no encontrado.");
							}
						}
					}
				}.bind(this),
				error: function(oError) {}
			});
		},
		confirmCustomScan: function(oEvent) {
			var that = this;
			var oModel = this.getView().getModel("huecos_Model");
			var oScanData = this.getView().getModel("scanModel").getData();

			if (!oScanData || !oScanData.Matnr){// || !oScanData.Cantidad) {
				sap.m.MessageToast.show(this.i18n.getText("msg.no.mat"));
				return;
			}

			var oPayload = {
				Matnr: oScanData.Matnr,
				Werks: oScanData.Werks,
				Marca: '',
				Descripcion: '',
				Familia: '',
				Stock: '0',
				NivImp: '0',
				UltVenta: new Date(),
				UltEm: new Date(),
				UltInv: new Date(),
				Mtart: '',
				Mtarttext: '',
				Matkl: '',
				Cantidad: oScanData.Cantidad,
				Unidad: oScanData.Meins
			};
			var fnDoCreate = function() {
				oModel.create("/ProductSet", oPayload, {
					success: function(oData) {
						sap.m.MessageToast.show(that.i18n.getText("msg.ok.prod"));
						oModel.refresh();
						that.getView().getModel("scanModel").setData({});
						sap.ui.getCore().byId("inputEan").setValue("");
						sap.ui.getCore().byId("inputEan").focus();
					},
					error: function(oError) {
						try {
							var sErrorMsg = JSON.parse(oError.responseText).error.message.value;
							MessageBox.error(sErrorMsg);
						} catch (o) {
							MessageBox.error(that.i18n.getText("msg.ko.reg"));
						}
					}
				});
			};
			if (oScanData.ExistsInZ === true) {
				MessageBox.confirm(that.i18n.getText("msg.ask.reg"), {
					title: that.i18n.getText("msg.confirm"),
					onClose: function(sAction) {
						if (sAction === MessageBox.Action.OK) {
							fnDoCreate();
						} else {
							MessageToast.show(that.i18n.getText("msg.canc"));
						}
					}
				});

			} else {
				fnDoCreate();
			}
		},
		onContarRow: function(oEvent) {
			var t = undefined;
			if (sap.ushell.Container) {
				t = sap.ushell.Container.getService("CrossApplicationNavigation");
			}
			var a = oEvent.getSource().getBindingContext("huecos_Model").getObject().Matnr;
			this.gShellHash = {
				Material: a,
				target: "#Article-ZCorrectStock2&/count/Products('" + a + "')"
			};
			if (sap.ushell.Container) {
				if (t) {
					t.toExternal({
						target: {
							shellHash: this.gShellHash.target
						}
					});
				}
			}
		},
		onAjustarRow: function(oEvent) {
			var t = undefined;
			if (sap.ushell.Container) {
				t = sap.ushell.Container.getService("CrossApplicationNavigation");
			}
			var a = oEvent.getSource().getBindingContext("huecos_Model").getObject().Matnr;
			this.gShellHash = {
				Material: a,
				target: "#Article-ZCorrectStock2&/shrink/Products('" + a + "')"
			};
			if (sap.ushell.Container) {
				if (t) {
					t.toExternal({
						target: {
							shellHash: this.gShellHash.target
						}
					});
				}
			}
		},
		onDeleteRow: function(oEvent) {
			//var a = oEvent.getSource().getBindingContext("huecos_Model").getObject();
			var that = this;
			var oModel = this.getView().getModel("huecos_Model");
			var sPath = oEvent.getSource().getBindingContext("huecos_Model").getPath();
			oModel.remove(sPath, {
				success: function() {
					sap.m.MessageToast.show(that.i18n.getText("msg.ok.reg"));
					oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageBox.error(that.i18n.getText("msg.ko.del"));
				}
			});
		}

	})
});
//# sourceMappingURL=Main.controller.js.map