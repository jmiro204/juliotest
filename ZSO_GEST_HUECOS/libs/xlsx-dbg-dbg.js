/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var DO_NOT_EXPORT_CODEPAGE = true;
var DO_NOT_EXPORT_JSZIP = true;
(function (e) {
	if ("object" == typeof exports && "undefined" != typeof module && "undefined" == typeof DO_NOT_EXPORT_JSZIP) module.exports = e();
	else if ("function" == typeof define && define.amd && "undefined" == typeof DO_NOT_EXPORT_JSZIP) {
		JSZipSync = e();
		define([], e)
	} else {
		var r;
		"undefined" != typeof window ? r = window : "undefined" != typeof global ? r = global : "undefined" != typeof $ && $.global ? r = $.global :
			"undefined" != typeof self && (r = self), r.JSZipSync = e()
	}
})(function () {
	var e, r, t;
	return function e(r, t, n) {
		function a(s, o) {
			if (!t[s]) {
				if (!r[s]) {
					var l = typeof require == "function" && require;
					if (!o && l) return l(s, !0);
					if (i) return i(s, !0);
					throw new Error("Cannot find module '" + s + "'")
				}
				var f = t[s] = {
					exports: {}
				};
				r[s][0].call(f.exports, function (e) {
					var t = r[s][1][e];
					return a(t ? t : e)
				}, f, f.exports, e, r, t, n)
			}
			return t[s].exports
		}
		var i = typeof require == "function" && require;
		for (var s = 0; s < n.length; s++) a(n[s]);
		return a
	}({
		1: [function (e, r, t) {
			"use strict";
			var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			t.encode = function (e, r) {
				var t = "";
				var a, i, s, o, l, f, c;
				var u = 0;
				while (u < e.length) {
					a = e.charCodeAt(u++);
					i = e.charCodeAt(u++);
					s = e.charCodeAt(u++);
					o = a >> 2;
					l = (a & 3) << 4 | i >> 4;
					f = (i & 15) << 2 | s >> 6;
					c = s & 63;
					if (isNaN(i)) {
						f = c = 64
					} else if (isNaN(s)) {
						c = 64
					}
					t = t + n.charAt(o) + n.charAt(l) + n.charAt(f) + n.charAt(c)
				}
				return t
			};
			t.decode = function (e, r) {
				var t = "";
				var a, i, s;
				var o, l, f, c;
				var u = 0;
				e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while (u < e.length) {
					o = n.indexOf(e.charAt(u++));
					l = n.indexOf(e.charAt(u++));
					f = n.indexOf(e.charAt(u++));
					c = n.indexOf(e.charAt(u++));
					a = o << 2 | l >> 4;
					i = (l & 15) << 4 | f >> 2;
					s = (f & 3) << 6 | c;
					t = t + String.fromCharCode(a);
					if (f != 64) {
						t = t + String.fromCharCode(i)
					}
					if (c != 64) {
						t = t + String.fromCharCode(s)
					}
				}
				return t
			}
		}, {}],
		2: [function (e, r, t) {
			"use strict";

			function n() {
				this.compressedSize = 0;
				this.uncompressedSize = 0;
				this.crc32 = 0;
				this.compressionMethod = null;
				this.compressedContent = null
			}
			n.prototype = {
				getContent: function () {
					return null
				},
				getCompressedContent: function () {
					return null
				}
			};
			r.exports = n
		}, {}],
		3: [function (e, r, t) {
			"use strict";
			t.STORE = {
				magic: "\0\0",
				compress: function (e) {
					return e
				},
				uncompress: function (e) {
					return e
				},
				compressInputType: null,
				uncompressInputType: null
			};
			t.DEFLATE = e("./flate")
		}, {
			"./flate": 8
		}],
		4: [function (e, r, t) {
			"use strict";
			var n = e("./utils");
			var a = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230,
				2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603,
				4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096,
				1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728,
				853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
				3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534,
				2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763,
				141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223,
				1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092,
				3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277,
				2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
				702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842,
				3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743,
				2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920,
				282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985,
				2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161,
				3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
				1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151,
				1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012,
				4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116,
				2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301,
				1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130,
				1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
				3272380065, 1510334235, 755167117
			];
			r.exports = function e(r, t) {
				if (typeof r === "undefined" || !r.length) {
					return 0
				}
				var i = n.getTypeOf(r) !== "string";
				if (typeof t == "undefined") {
					t = 0
				}
				var e = 0;
				var s = 0;
				var o = 0;
				t = t ^ -1;
				for (var l = 0, f = r.length; l < f; l++) {
					o = i ? r[l] : r.charCodeAt(l);
					s = (t ^ o) & 255;
					e = a[s];
					t = t >>> 8 ^ e
				}
				return t ^ -1
			}
		}, {
			"./utils": 21
		}],
		5: [function (e, r, t) {
			"use strict";
			var n = e("./utils");

			function a(e) {
				this.data = null;
				this.length = 0;
				this.index = 0
			}
			a.prototype = {
				checkOffset: function (e) {
					this.checkIndex(this.index + e)
				},
				checkIndex: function (e) {
					if (this.length < e || e < 0) {
						throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
					}
				},
				setIndex: function (e) {
					this.checkIndex(e);
					this.index = e
				},
				skip: function (e) {
					this.setIndex(this.index + e)
				},
				byteAt: function (e) {},
				readInt: function (e) {
					var r = 0,
						t;
					this.checkOffset(e);
					for (t = this.index + e - 1; t >= this.index; t--) {
						r = (r << 8) + this.byteAt(t)
					}
					this.index += e;
					return r
				},
				readString: function (e) {
					return n.transformTo("string", this.readData(e))
				},
				readData: function (e) {},
				lastIndexOfSignature: function (e) {},
				readDate: function () {
					var e = this.readInt(4);
					return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1)
				}
			};
			r.exports = a
		}, {
			"./utils": 21
		}],
		6: [function (e, r, t) {
			"use strict";
			t.base64 = false;
			t.binary = false;
			t.dir = false;
			t.createFolders = false;
			t.date = null;
			t.compression = null;
			t.comment = null
		}, {}],
		7: [function (e, r, t) {
			"use strict";
			var n = e("./utils");
			t.string2binary = function (e) {
				return n.string2binary(e)
			};
			t.string2Uint8Array = function (e) {
				return n.transformTo("uint8array", e)
			};
			t.uint8Array2String = function (e) {
				return n.transformTo("string", e)
			};
			t.string2Blob = function (e) {
				var r = n.transformTo("arraybuffer", e);
				return n.arrayBuffer2Blob(r)
			};
			t.arrayBuffer2Blob = function (e) {
				return n.arrayBuffer2Blob(e)
			};
			t.transformTo = function (e, r) {
				return n.transformTo(e, r)
			};
			t.getTypeOf = function (e) {
				return n.getTypeOf(e)
			};
			t.checkSupport = function (e) {
				return n.checkSupport(e)
			};
			t.MAX_VALUE_16BITS = n.MAX_VALUE_16BITS;
			t.MAX_VALUE_32BITS = n.MAX_VALUE_32BITS;
			t.pretty = function (e) {
				return n.pretty(e)
			};
			t.findCompression = function (e) {
				return n.findCompression(e)
			};
			t.isRegExp = function (e) {
				return n.isRegExp(e)
			}
		}, {
			"./utils": 21
		}],
		8: [function (e, r, t) {
			"use strict";
			var n = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
			var a = e("pako");
			t.uncompressInputType = n ? "uint8array" : "array";
			t.compressInputType = n ? "uint8array" : "array";
			t.magic = "\b\0";
			t.compress = function (e) {
				return a.deflateRaw(e)
			};
			t.uncompress = function (e) {
				return a.inflateRaw(e)
			}
		}, {
			pako: 24
		}],
		9: [function (e, r, t) {
			"use strict";
			var n = e("./base64");

			function a(e, r) {
				if (!(this instanceof a)) return new a(e, r);
				this.files = {};
				this.comment = null;
				this.root = "";
				if (e) {
					this.load(e, r)
				}
				this.clone = function () {
					var e = new a;
					for (var r in this) {
						if (typeof this[r] !== "function") {
							e[r] = this[r]
						}
					}
					return e
				}
			}
			a.prototype = e("./object");
			a.prototype.load = e("./load");
			a.support = e("./support");
			a.defaults = e("./defaults");
			a.utils = e("./deprecatedPublicUtils");
			a.base64 = {
				encode: function (e) {
					return n.encode(e)
				},
				decode: function (e) {
					return n.decode(e)
				}
			};
			a.compressions = e("./compressions");
			r.exports = a
		}, {
			"./base64": 1,
			"./compressions": 3,
			"./defaults": 6,
			"./deprecatedPublicUtils": 7,
			"./load": 10,
			"./object": 13,
			"./support": 17
		}],
		10: [function (e, r, t) {
			"use strict";
			var n = e("./base64");
			var a = e("./zipEntries");
			r.exports = function (e, r) {
				var t, i, s, o;
				r = r || {};
				if (r.base64) {
					e = n.decode(e)
				}
				i = new a(e, r);
				t = i.files;
				for (s = 0; s < t.length; s++) {
					o = t[s];
					this.file(o.fileName, o.decompressed, {
						binary: true,
						optimizedBinaryString: true,
						date: o.date,
						dir: o.dir,
						comment: o.fileComment.length ? o.fileComment : null,
						createFolders: r.createFolders
					})
				}
				if (i.zipComment.length) {
					this.comment = i.zipComment
				}
				return this
			}
		}, {
			"./base64": 1,
			"./zipEntries": 22
		}],
		11: [function (e, r, t) {
			(function (e) {
				"use strict";
				var t = function () {};
				if (typeof e !== "undefined") {
					var n = !e.from;
					if (!n) try {
						e.from("foo", "utf8")
					} catch (e) {
						n = true
					}
					t = n ? function (r, t) {
						return t ? new e(r, t) : new e(r)
					} : e.from.bind(e);
					if (!e.alloc) e.alloc = function (r) {
						return new e(r)
					}
				}
				r.exports = function (r, n) {
					return typeof r == "number" ? e.alloc(r) : t(r, n)
				};
				r.exports.test = function (r) {
					return e.isBuffer(r)
				}
			}).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
		}, {}],
		12: [function (e, r, t) {
			"use strict";
			var n = e("./uint8ArrayReader");

			function a(e) {
				this.data = e;
				this.length = this.data.length;
				this.index = 0
			}
			a.prototype = new n;
			a.prototype.readData = function (e) {
				this.checkOffset(e);
				var r = this.data.slice(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = a
		}, {
			"./uint8ArrayReader": 18
		}],
		13: [function (e, r, t) {
			"use strict";
			var n = e("./support");
			var a = e("./utils");
			var i = e("./crc32");
			var s = e("./signature");
			var o = e("./defaults");
			var l = e("./base64");
			var f = e("./compressions");
			var c = e("./compressedObject");
			var u = e("./nodeBuffer");
			var h = e("./utf8");
			var d = e("./stringWriter");
			var p = e("./uint8ArrayWriter");
			var v = function (e) {
				if (e._data instanceof c) {
					e._data = e._data.getContent();
					e.options.binary = true;
					e.options.base64 = false;
					if (a.getTypeOf(e._data) === "uint8array") {
						var r = e._data;
						e._data = new Uint8Array(r.length);
						if (r.length !== 0) {
							e._data.set(r, 0)
						}
					}
				}
				return e._data
			};
			var g = function (e) {
				var r = v(e),
					t = a.getTypeOf(r);
				if (t === "string") {
					if (!e.options.binary) {
						if (n.nodebuffer) {
							return u(r, "utf-8")
						}
					}
					return e.asBinary()
				}
				return r
			};
			var m = function (e) {
				var r = v(this);
				if (r === null || typeof r === "undefined") {
					return ""
				}
				if (this.options.base64) {
					r = l.decode(r)
				}
				if (e && this.options.binary) {
					r = B.utf8decode(r)
				} else {
					r = a.transformTo("string", r)
				}
				if (!e && !this.options.binary) {
					r = a.transformTo("string", B.utf8encode(r))
				}
				return r
			};
			var b = function (e, r, t) {
				this.name = e;
				this.dir = t.dir;
				this.date = t.date;
				this.comment = t.comment;
				this._data = r;
				this.options = t;
				this._initialMetadata = {
					dir: t.dir,
					date: t.date
				}
			};
			b.prototype = {
				asText: function () {
					return m.call(this, true)
				},
				asBinary: function () {
					return m.call(this, false)
				},
				asNodeBuffer: function () {
					var e = g(this);
					return a.transformTo("nodebuffer", e)
				},
				asUint8Array: function () {
					var e = g(this);
					return a.transformTo("uint8array", e)
				},
				asArrayBuffer: function () {
					return this.asUint8Array().buffer
				}
			};
			var C = function (e, r) {
				var t = "",
					n;
				for (n = 0; n < r; n++) {
					t += String.fromCharCode(e & 255);
					e = e >>> 8
				}
				return t
			};
			var E = function () {
				var e = {},
					r, t;
				for (r = 0; r < arguments.length; r++) {
					for (t in arguments[r]) {
						if (arguments[r].hasOwnProperty(t) && typeof e[t] === "undefined") {
							e[t] = arguments[r][t]
						}
					}
				}
				return e
			};
			var k = function (e) {
				e = e || {};
				if (e.base64 === true && (e.binary === null || e.binary === undefined)) {
					e.binary = true
				}
				e = E(e, o);
				e.date = e.date || new Date;
				if (e.compression !== null) e.compression = e.compression.toUpperCase();
				return e
			};
			var S = function (e, r, t) {
				var n = a.getTypeOf(r),
					i;
				t = k(t);
				if (t.createFolders && (i = w(e))) {
					A.call(this, i, true)
				}
				if (t.dir || r === null || typeof r === "undefined") {
					t.base64 = false;
					t.binary = false;
					r = null
				} else if (n === "string") {
					if (t.binary && !t.base64) {
						if (t.optimizedBinaryString !== true) {
							r = a.string2binary(r)
						}
					}
				} else {
					t.base64 = false;
					t.binary = true;
					if (!n && !(r instanceof c)) {
						throw new Error("The data of '" + e + "' is in an unsupported format !")
					}
					if (n === "arraybuffer") {
						r = a.transformTo("uint8array", r)
					}
				}
				var s = new b(e, r, t);
				this.files[e] = s;
				return s
			};
			var w = function (e) {
				if (e.slice(-1) == "/") {
					e = e.substring(0, e.length - 1)
				}
				var r = e.lastIndexOf("/");
				return r > 0 ? e.substring(0, r) : ""
			};
			var A = function (e, r) {
				if (e.slice(-1) != "/") {
					e += "/"
				}
				r = typeof r !== "undefined" ? r : false;
				if (!this.files[e]) {
					S.call(this, e, null, {
						dir: true,
						createFolders: r
					})
				}
				return this.files[e]
			};
			var _ = function (e, r) {
				var t = new c,
					n;
				if (e._data instanceof c) {
					t.uncompressedSize = e._data.uncompressedSize;
					t.crc32 = e._data.crc32;
					if (t.uncompressedSize === 0 || e.dir) {
						r = f["STORE"];
						t.compressedContent = "";
						t.crc32 = 0
					} else if (e._data.compressionMethod === r.magic) {
						t.compressedContent = e._data.getCompressedContent()
					} else {
						n = e._data.getContent();
						t.compressedContent = r.compress(a.transformTo(r.compressInputType, n))
					}
				} else {
					n = g(e);
					if (!n || n.length === 0 || e.dir) {
						r = f["STORE"];
						n = ""
					}
					t.uncompressedSize = n.length;
					t.crc32 = i(n);
					t.compressedContent = r.compress(a.transformTo(r.compressInputType, n))
				}
				t.compressedSize = t.compressedContent.length;
				t.compressionMethod = r.magic;
				return t
			};
			var R = function (e, r, t, n) {
				var o = t.compressedContent,
					l = a.transformTo("string", h.utf8encode(r.name)),
					f = r.comment || "",
					c = a.transformTo("string", h.utf8encode(f)),
					u = l.length !== r.name.length,
					d = c.length !== f.length,
					p = r.options,
					v, g, m = "",
					b = "",
					E = "",
					k, S;
				if (r._initialMetadata.dir !== r.dir) {
					k = r.dir
				} else {
					k = p.dir
				}
				if (r._initialMetadata.date !== r.date) {
					S = r.date
				} else {
					S = p.date
				}
				v = S.getHours();
				v = v << 6;
				v = v | S.getMinutes();
				v = v << 5;
				v = v | S.getSeconds() / 2;
				g = S.getFullYear() - 1980;
				g = g << 4;
				g = g | S.getMonth() + 1;
				g = g << 5;
				g = g | S.getDate();
				if (u) {
					b = C(1, 1) + C(i(l), 4) + l;
					m += "up" + C(b.length, 2) + b
				}
				if (d) {
					E = C(1, 1) + C(this.crc32(c), 4) + c;
					m += "uc" + C(E.length, 2) + E
				}
				var w = "";
				w += "\n\0";
				w += u || d ? "\0\b" : "\0\0";
				w += t.compressionMethod;
				w += C(v, 2);
				w += C(g, 2);
				w += C(t.crc32, 4);
				w += C(t.compressedSize, 4);
				w += C(t.uncompressedSize, 4);
				w += C(l.length, 2);
				w += C(m.length, 2);
				var A = s.LOCAL_FILE_HEADER + w + l + m;
				var _ = s.CENTRAL_FILE_HEADER + "\0" + w + C(c.length, 2) + "\0\0" + "\0\0" + (k === true ? "\0\0\0" : "\0\0\0\0") + C(n, 4) +
					l + m + c;
				return {
					fileRecord: A,
					dirRecord: _,
					compressedObject: t
				}
			};
			var B = {
				load: function (e, r) {
					throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
				},
				filter: function (e) {
					var r = [],
						t, n, a, i;
					for (t in this.files) {
						if (!this.files.hasOwnProperty(t)) {
							continue
						}
						a = this.files[t];
						i = new b(a.name, a._data, E(a.options));
						n = t.slice(this.root.length, t.length);
						if (t.slice(0, this.root.length) === this.root && e(n, i)) {
							r.push(i)
						}
					}
					return r
				},
				file: function (e, r, t) {
					if (arguments.length === 1) {
						if (a.isRegExp(e)) {
							var n = e;
							return this.filter(function (e, r) {
								return !r.dir && n.test(e)
							})
						} else {
							return this.filter(function (r, t) {
								return !t.dir && r === e
							})[0] || null
						}
					} else {
						e = this.root + e;
						S.call(this, e, r, t)
					}
					return this
				},
				folder: function (e) {
					if (!e) {
						return this
					}
					if (a.isRegExp(e)) {
						return this.filter(function (r, t) {
							return t.dir && e.test(r)
						})
					}
					var r = this.root + e;
					var t = A.call(this, r);
					var n = this.clone();
					n.root = t.name;
					return n
				},
				remove: function (e) {
					e = this.root + e;
					var r = this.files[e];
					if (!r) {
						if (e.slice(-1) != "/") {
							e += "/"
						}
						r = this.files[e]
					}
					if (r && !r.dir) {
						delete this.files[e]
					} else {
						var t = this.filter(function (r, t) {
							return t.name.slice(0, e.length) === e
						});
						for (var n = 0; n < t.length; n++) {
							delete this.files[t[n].name]
						}
					}
					return this
				},
				generate: function (e) {
					e = E(e || {}, {
						base64: true,
						compression: "STORE",
						type: "base64",
						comment: null
					});
					a.checkSupport(e.type);
					var r = [],
						t = 0,
						n = 0,
						i, o, c = a.transformTo("string", this.utf8encode(e.comment || this.comment || ""));
					for (var u in this.files) {
						if (!this.files.hasOwnProperty(u)) {
							continue
						}
						var h = this.files[u];
						var v = h.options.compression || e.compression.toUpperCase();
						var g = f[v];
						if (!g) {
							throw new Error(v + " is not a valid compression method !")
						}
						var m = _.call(this, h, g);
						var b = R.call(this, u, h, m, t);
						t += b.fileRecord.length + m.compressedSize;
						n += b.dirRecord.length;
						r.push(b)
					}
					var k = "";
					k = s.CENTRAL_DIRECTORY_END + "\0\0" + "\0\0" + C(r.length, 2) + C(r.length, 2) + C(n, 4) + C(t, 4) + C(c.length, 2) + c;
					var S = e.type.toLowerCase();
					if (S === "uint8array" || S === "arraybuffer" || S === "blob" || S === "nodebuffer") {
						i = new p(t + n + k.length)
					} else {
						i = new d(t + n + k.length)
					}
					for (o = 0; o < r.length; o++) {
						i.append(r[o].fileRecord);
						i.append(r[o].compressedObject.compressedContent)
					}
					for (o = 0; o < r.length; o++) {
						i.append(r[o].dirRecord)
					}
					i.append(k);
					var w = i.finalize();
					switch (e.type.toLowerCase()) {
					case "uint8array":
						;
					case "arraybuffer":
						;
					case "nodebuffer":
						return a.transformTo(e.type.toLowerCase(), w);
					case "blob":
						return a.arrayBuffer2Blob(a.transformTo("arraybuffer", w));
					case "base64":
						return e.base64 ? l.encode(w) : w;
					default:
						return w
					}
				},
				crc32: function (e, r) {
					return i(e, r)
				},
				utf8encode: function (e) {
					return a.transformTo("string", h.utf8encode(e))
				},
				utf8decode: function (e) {
					return h.utf8decode(e)
				}
			};
			r.exports = B
		}, {
			"./base64": 1,
			"./compressedObject": 2,
			"./compressions": 3,
			"./crc32": 4,
			"./defaults": 6,
			"./nodeBuffer": 11,
			"./signature": 14,
			"./stringWriter": 16,
			"./support": 17,
			"./uint8ArrayWriter": 19,
			"./utf8": 20,
			"./utils": 21
		}],
		14: [function (e, r, t) {
			"use strict";
			t.LOCAL_FILE_HEADER = "PK";
			t.CENTRAL_FILE_HEADER = "PK";
			t.CENTRAL_DIRECTORY_END = "PK";
			t.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK";
			t.ZIP64_CENTRAL_DIRECTORY_END = "PK";
			t.DATA_DESCRIPTOR = "PK\b"
		}, {}],
		15: [function (e, r, t) {
			"use strict";
			var n = e("./dataReader");
			var a = e("./utils");

			function i(e, r) {
				this.data = e;
				if (!r) {
					this.data = a.string2binary(this.data)
				}
				this.length = this.data.length;
				this.index = 0
			}
			i.prototype = new n;
			i.prototype.byteAt = function (e) {
				return this.data.charCodeAt(e)
			};
			i.prototype.lastIndexOfSignature = function (e) {
				return this.data.lastIndexOf(e)
			};
			i.prototype.readData = function (e) {
				this.checkOffset(e);
				var r = this.data.slice(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = i
		}, {
			"./dataReader": 5,
			"./utils": 21
		}],
		16: [function (e, r, t) {
			"use strict";
			var n = e("./utils");
			var a = function () {
				this.data = []
			};
			a.prototype = {
				append: function (e) {
					e = n.transformTo("string", e);
					this.data.push(e)
				},
				finalize: function () {
					return this.data.join("")
				}
			};
			r.exports = a
		}, {
			"./utils": 21
		}],
		17: [function (e, r, t) {
			(function (e) {
				"use strict";
				t.base64 = true;
				t.array = true;
				t.string = true;
				t.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
				t.nodebuffer = typeof e !== "undefined";
				t.uint8array = typeof Uint8Array !== "undefined";
				if (typeof ArrayBuffer === "undefined") {
					t.blob = false
				} else {
					var r = new ArrayBuffer(0);
					try {
						t.blob = new Blob([r], {
							type: "application/zip"
						}).size === 0
					} catch (e) {
						try {
							var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
							var a = new n;
							a.append(r);
							t.blob = a.getBlob("application/zip").size === 0
						} catch (e) {
							t.blob = false
						}
					}
				}
			}).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
		}, {}],
		18: [function (e, r, t) {
			"use strict";
			var n = e("./dataReader");

			function a(e) {
				if (e) {
					this.data = e;
					this.length = this.data.length;
					this.index = 0
				}
			}
			a.prototype = new n;
			a.prototype.byteAt = function (e) {
				return this.data[e]
			};
			a.prototype.lastIndexOfSignature = function (e) {
				var r = e.charCodeAt(0),
					t = e.charCodeAt(1),
					n = e.charCodeAt(2),
					a = e.charCodeAt(3);
				for (var i = this.length - 4; i >= 0; --i) {
					if (this.data[i] === r && this.data[i + 1] === t && this.data[i + 2] === n && this.data[i + 3] === a) {
						return i
					}
				}
				return -1
			};
			a.prototype.readData = function (e) {
				this.checkOffset(e);
				if (e === 0) {
					return new Uint8Array(0)
				}
				var r = this.data.subarray(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = a
		}, {
			"./dataReader": 5
		}],
		19: [function (e, r, t) {
			"use strict";
			var n = e("./utils");
			var a = function (e) {
				this.data = new Uint8Array(e);
				this.index = 0
			};
			a.prototype = {
				append: function (e) {
					if (e.length !== 0) {
						e = n.transformTo("uint8array", e);
						this.data.set(e, this.index);
						this.index += e.length
					}
				},
				finalize: function () {
					return this.data
				}
			};
			r.exports = a
		}, {
			"./utils": 21
		}],
		20: [function (e, r, t) {
			"use strict";
			var n = e("./utils");
			var a = e("./support");
			var i = e("./nodeBuffer");
			var s = new Array(256);
			for (var o = 0; o < 256; o++) {
				s[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1
			}
			s[254] = s[254] = 1;
			var l = function (e) {
				var r, t, n, i, s, o = e.length,
					l = 0;
				for (i = 0; i < o; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						n = e.charCodeAt(i + 1);
						if ((n & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (n - 56320);
							i++
						}
					}
					l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
				}
				if (a.uint8array) {
					r = new Uint8Array(l)
				} else {
					r = new Array(l)
				}
				for (s = 0, i = 0; s < l; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						n = e.charCodeAt(i + 1);
						if ((n & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (n - 56320);
							i++
						}
					}
					if (t < 128) {
						r[s++] = t
					} else if (t < 2048) {
						r[s++] = 192 | t >>> 6;
						r[s++] = 128 | t & 63
					} else if (t < 65536) {
						r[s++] = 224 | t >>> 12;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					} else {
						r[s++] = 240 | t >>> 18;
						r[s++] = 128 | t >>> 12 & 63;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					}
				}
				return r
			};
			var f = function (e, r) {
				var t;
				r = r || e.length;
				if (r > e.length) {
					r = e.length
				}
				t = r - 1;
				while (t >= 0 && (e[t] & 192) === 128) {
					t--
				}
				if (t < 0) {
					return r
				}
				if (t === 0) {
					return r
				}
				return t + s[e[t]] > r ? t : r
			};
			var c = function (e) {
				var r, t, a, i, o;
				var l = e.length;
				var f = new Array(l * 2);
				for (a = 0, t = 0; t < l;) {
					i = e[t++];
					if (i < 128) {
						f[a++] = i;
						continue
					}
					o = s[i];
					if (o > 4) {
						f[a++] = 65533;
						t += o - 1;
						continue
					}
					i &= o === 2 ? 31 : o === 3 ? 15 : 7;
					while (o > 1 && t < l) {
						i = i << 6 | e[t++] & 63;
						o--
					}
					if (o > 1) {
						f[a++] = 65533;
						continue
					}
					if (i < 65536) {
						f[a++] = i
					} else {
						i -= 65536;
						f[a++] = 55296 | i >> 10 & 1023;
						f[a++] = 56320 | i & 1023
					}
				}
				if (f.length !== a) {
					if (f.subarray) {
						f = f.subarray(0, a)
					} else {
						f.length = a
					}
				}
				return n.applyFromCharCode(f)
			};
			t.utf8encode = function e(r) {
				if (a.nodebuffer) {
					return i(r, "utf-8")
				}
				return l(r)
			};
			t.utf8decode = function e(r) {
				if (a.nodebuffer) {
					return n.transformTo("nodebuffer", r).toString("utf-8")
				}
				r = n.transformTo(a.uint8array ? "uint8array" : "array", r);
				var t = [],
					i = 0,
					s = r.length,
					o = 65536;
				while (i < s) {
					var l = f(r, Math.min(i + o, s));
					if (a.uint8array) {
						t.push(c(r.subarray(i, l)))
					} else {
						t.push(c(r.slice(i, l)))
					}
					i = l
				}
				return t.join("")
			}
		}, {
			"./nodeBuffer": 11,
			"./support": 17,
			"./utils": 21
		}],
		21: [function (e, r, t) {
			"use strict";
			var n = e("./support");
			var a = e("./compressions");
			var i = e("./nodeBuffer");
			t.string2binary = function (e) {
				var r = "";
				for (var t = 0; t < e.length; t++) {
					r += String.fromCharCode(e.charCodeAt(t) & 255)
				}
				return r
			};
			t.arrayBuffer2Blob = function (e) {
				t.checkSupport("blob");
				try {
					return new Blob([e], {
						type: "application/zip"
					})
				} catch (t) {
					try {
						var r = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
						var n = new r;
						n.append(e);
						return n.getBlob("application/zip")
					} catch (e) {
						throw new Error("Bug : can't construct the Blob.")
					}
				}
			};

			function s(e) {
				return e
			}

			function o(e, r) {
				for (var t = 0; t < e.length; ++t) {
					r[t] = e.charCodeAt(t) & 255
				}
				return r
			}

			function l(e) {
				var r = 65536;
				var n = [],
					a = e.length,
					s = t.getTypeOf(e),
					o = 0,
					l = true;
				try {
					switch (s) {
					case "uint8array":
						String.fromCharCode.apply(null, new Uint8Array(0));
						break;
					case "nodebuffer":
						String.fromCharCode.apply(null, i(0));
						break
					}
				} catch (e) {
					l = false
				}
				if (!l) {
					var f = "";
					for (var c = 0; c < e.length; c++) {
						f += String.fromCharCode(e[c])
					}
					return f
				}
				while (o < a && r > 1) {
					try {
						if (s === "array" || s === "nodebuffer") {
							n.push(String.fromCharCode.apply(null, e.slice(o, Math.min(o + r, a))))
						} else {
							n.push(String.fromCharCode.apply(null, e.subarray(o, Math.min(o + r, a))))
						}
						o += r
					} catch (e) {
						r = Math.floor(r / 2)
					}
				}
				return n.join("")
			}
			t.applyFromCharCode = l;

			function f(e, r) {
				for (var t = 0; t < e.length; t++) {
					r[t] = e[t]
				}
				return r
			}
			var c = {};
			c["string"] = {
				string: s,
				array: function (e) {
					return o(e, new Array(e.length))
				},
				arraybuffer: function (e) {
					return c["string"]["uint8array"](e).buffer
				},
				uint8array: function (e) {
					return o(e, new Uint8Array(e.length))
				},
				nodebuffer: function (e) {
					return o(e, i(e.length))
				}
			};
			c["array"] = {
				string: l,
				array: s,
				arraybuffer: function (e) {
					return new Uint8Array(e).buffer
				},
				uint8array: function (e) {
					return new Uint8Array(e)
				},
				nodebuffer: function (e) {
					return i(e)
				}
			};
			c["arraybuffer"] = {
				string: function (e) {
					return l(new Uint8Array(e))
				},
				array: function (e) {
					return f(new Uint8Array(e), new Array(e.byteLength))
				},
				arraybuffer: s,
				uint8array: function (e) {
					return new Uint8Array(e)
				},
				nodebuffer: function (e) {
					return i(new Uint8Array(e))
				}
			};
			c["uint8array"] = {
				string: l,
				array: function (e) {
					return f(e, new Array(e.length))
				},
				arraybuffer: function (e) {
					return e.buffer
				},
				uint8array: s,
				nodebuffer: function (e) {
					return i(e)
				}
			};
			c["nodebuffer"] = {
				string: l,
				array: function (e) {
					return f(e, new Array(e.length))
				},
				arraybuffer: function (e) {
					return c["nodebuffer"]["uint8array"](e).buffer
				},
				uint8array: function (e) {
					return f(e, new Uint8Array(e.length))
				},
				nodebuffer: s
			};
			t.transformTo = function (e, r) {
				if (!r) {
					r = ""
				}
				if (!e) {
					return r
				}
				t.checkSupport(e);
				var n = t.getTypeOf(r);
				var a = c[n][e](r);
				return a
			};
			t.getTypeOf = function (e) {
				if (typeof e === "string") {
					return "string"
				}
				if (Object.prototype.toString.call(e) === "[object Array]") {
					return "array"
				}
				if (n.nodebuffer && i.test(e)) {
					return "nodebuffer"
				}
				if (n.uint8array && e instanceof Uint8Array) {
					return "uint8array"
				}
				if (n.arraybuffer && e instanceof ArrayBuffer) {
					return "arraybuffer"
				}
			};
			t.checkSupport = function (e) {
				var r = n[e.toLowerCase()];
				if (!r) {
					throw new Error(e + " is not supported by this browser")
				}
			};
			t.MAX_VALUE_16BITS = 65535;
			t.MAX_VALUE_32BITS = -1;
			t.pretty = function (e) {
				var r = "",
					t, n;
				for (n = 0; n < (e || "").length; n++) {
					t = e.charCodeAt(n);
					r += "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase()
				}
				return r
			};
			t.findCompression = function (e) {
				for (var r in a) {
					if (!a.hasOwnProperty(r)) {
						continue
					}
					if (a[r].magic === e) {
						return a[r]
					}
				}
				return null
			};
			t.isRegExp = function (e) {
				return Object.prototype.toString.call(e) === "[object RegExp]"
			}
		}, {
			"./compressions": 3,
			"./nodeBuffer": 11,
			"./support": 17
		}],
		22: [function (e, r, t) {
			"use strict";
			var n = e("./stringReader");
			var a = e("./nodeBufferReader");
			var i = e("./uint8ArrayReader");
			var s = e("./utils");
			var o = e("./signature");
			var l = e("./zipEntry");
			var f = e("./support");
			var c = e("./object");

			function u(e, r) {
				this.files = [];
				this.loadOptions = r;
				if (e) {
					this.load(e)
				}
			}
			u.prototype = {
				checkSignature: function (e) {
					var r = this.reader.readString(4);
					if (r !== e) {
						throw new Error("Corrupted zip or bug : unexpected signature " + "(" + s.pretty(r) + ", expected " + s.pretty(e) + ")")
					}
				},
				readBlockEndOfCentral: function () {
					this.diskNumber = this.reader.readInt(2);
					this.diskWithCentralDirStart = this.reader.readInt(2);
					this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
					this.centralDirRecords = this.reader.readInt(2);
					this.centralDirSize = this.reader.readInt(4);
					this.centralDirOffset = this.reader.readInt(4);
					this.zipCommentLength = this.reader.readInt(2);
					this.zipComment = this.reader.readString(this.zipCommentLength);
					this.zipComment = c.utf8decode(this.zipComment)
				},
				readBlockZip64EndOfCentral: function () {
					this.zip64EndOfCentralSize = this.reader.readInt(8);
					this.versionMadeBy = this.reader.readString(2);
					this.versionNeeded = this.reader.readInt(2);
					this.diskNumber = this.reader.readInt(4);
					this.diskWithCentralDirStart = this.reader.readInt(4);
					this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
					this.centralDirRecords = this.reader.readInt(8);
					this.centralDirSize = this.reader.readInt(8);
					this.centralDirOffset = this.reader.readInt(8);
					this.zip64ExtensibleData = {};
					var e = this.zip64EndOfCentralSize - 44,
						r = 0,
						t, n, a;
					while (r < e) {
						t = this.reader.readInt(2);
						n = this.reader.readInt(4);
						a = this.reader.readString(n);
						this.zip64ExtensibleData[t] = {
							id: t,
							length: n,
							value: a
						}
					}
				},
				readBlockZip64EndOfCentralLocator: function () {
					this.diskWithZip64CentralDirStart = this.reader.readInt(4);
					this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
					this.disksCount = this.reader.readInt(4);
					if (this.disksCount > 1) {
						throw new Error("Multi-volumes zip are not supported")
					}
				},
				readLocalFiles: function () {
					var e, r;
					for (e = 0; e < this.files.length; e++) {
						r = this.files[e];
						this.reader.setIndex(r.localHeaderOffset);
						this.checkSignature(o.LOCAL_FILE_HEADER);
						r.readLocalPart(this.reader);
						r.handleUTF8()
					}
				},
				readCentralDir: function () {
					var e;
					this.reader.setIndex(this.centralDirOffset);
					while (this.reader.readString(4) === o.CENTRAL_FILE_HEADER) {
						e = new l({
							zip64: this.zip64
						}, this.loadOptions);
						e.readCentralPart(this.reader);
						this.files.push(e)
					}
				},
				readEndOfCentral: function () {
					var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
					if (e === -1) {
						throw new Error("Corrupted zip : can't find end of central directory")
					}
					this.reader.setIndex(e);
					this.checkSignature(o.CENTRAL_DIRECTORY_END);
					this.readBlockEndOfCentral();
					if (this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk ===
						s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset ===
						s.MAX_VALUE_32BITS) {
						this.zip64 = true;
						e = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
						if (e === -1) {
							throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")
						}
						this.reader.setIndex(e);
						this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
						this.readBlockZip64EndOfCentralLocator();
						this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
						this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END);
						this.readBlockZip64EndOfCentral()
					}
				},
				prepareReader: function (e) {
					var r = s.getTypeOf(e);
					if (r === "string" && !f.uint8array) {
						this.reader = new n(e, this.loadOptions.optimizedBinaryString)
					} else if (r === "nodebuffer") {
						this.reader = new a(e)
					} else {
						this.reader = new i(s.transformTo("uint8array", e))
					}
				},
				load: function (e) {
					this.prepareReader(e);
					this.readEndOfCentral();
					this.readCentralDir();
					this.readLocalFiles()
				}
			};
			r.exports = u
		}, {
			"./nodeBufferReader": 12,
			"./object": 13,
			"./signature": 14,
			"./stringReader": 15,
			"./support": 17,
			"./uint8ArrayReader": 18,
			"./utils": 21,
			"./zipEntry": 23
		}],
		23: [function (e, r, t) {
			"use strict";
			var n = e("./stringReader");
			var a = e("./utils");
			var i = e("./compressedObject");
			var s = e("./object");

			function o(e, r) {
				this.options = e;
				this.loadOptions = r
			}
			o.prototype = {
				isEncrypted: function () {
					return (this.bitFlag & 1) === 1
				},
				useUTF8: function () {
					return (this.bitFlag & 2048) === 2048
				},
				prepareCompressedContent: function (e, r, t) {
					return function () {
						var n = e.index;
						e.setIndex(r);
						var a = e.readData(t);
						e.setIndex(n);
						return a
					}
				},
				prepareContent: function (e, r, t, n, i) {
					return function () {
						var e = a.transformTo(n.uncompressInputType, this.getCompressedContent());
						var r = n.uncompress(e);
						if (r.length !== i) {
							throw new Error("Bug : uncompressed data size mismatch")
						}
						return r
					}
				},
				readLocalPart: function (e) {
					var r, t;
					e.skip(22);
					this.fileNameLength = e.readInt(2);
					t = e.readInt(2);
					this.fileName = e.readString(this.fileNameLength);
					e.skip(t);
					if (this.compressedSize == -1 || this.uncompressedSize == -1) {
						throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " +
							"(compressedSize == -1 || uncompressedSize == -1)")
					}
					r = a.findCompression(this.compressionMethod);
					if (r === null) {
						throw new Error("Corrupted zip : compression " + a.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName +
							")")
					}
					this.decompressed = new i;
					this.decompressed.compressedSize = this.compressedSize;
					this.decompressed.uncompressedSize = this.uncompressedSize;
					this.decompressed.crc32 = this.crc32;
					this.decompressed.compressionMethod = this.compressionMethod;
					this.decompressed.getCompressedContent = this.prepareCompressedContent(e, e.index, this.compressedSize, r);
					this.decompressed.getContent = this.prepareContent(e, e.index, this.compressedSize, r, this.uncompressedSize);
					if (this.loadOptions.checkCRC32) {
						this.decompressed = a.transformTo("string", this.decompressed.getContent());
						if (s.crc32(this.decompressed) !== this.crc32) {
							throw new Error("Corrupted zip : CRC32 mismatch")
						}
					}
				},
				readCentralPart: function (e) {
					this.versionMadeBy = e.readString(2);
					this.versionNeeded = e.readInt(2);
					this.bitFlag = e.readInt(2);
					this.compressionMethod = e.readString(2);
					this.date = e.readDate();
					this.crc32 = e.readInt(4);
					this.compressedSize = e.readInt(4);
					this.uncompressedSize = e.readInt(4);
					this.fileNameLength = e.readInt(2);
					this.extraFieldsLength = e.readInt(2);
					this.fileCommentLength = e.readInt(2);
					this.diskNumberStart = e.readInt(2);
					this.internalFileAttributes = e.readInt(2);
					this.externalFileAttributes = e.readInt(4);
					this.localHeaderOffset = e.readInt(4);
					if (this.isEncrypted()) {
						throw new Error("Encrypted zip are not supported")
					}
					this.fileName = e.readString(this.fileNameLength);
					this.readExtraFields(e);
					this.parseZIP64ExtraField(e);
					this.fileComment = e.readString(this.fileCommentLength);
					this.dir = this.externalFileAttributes & 16 ? true : false
				},
				parseZIP64ExtraField: function (e) {
					if (!this.extraFields[1]) {
						return
					}
					var r = new n(this.extraFields[1].value);
					if (this.uncompressedSize === a.MAX_VALUE_32BITS) {
						this.uncompressedSize = r.readInt(8)
					}
					if (this.compressedSize === a.MAX_VALUE_32BITS) {
						this.compressedSize = r.readInt(8)
					}
					if (this.localHeaderOffset === a.MAX_VALUE_32BITS) {
						this.localHeaderOffset = r.readInt(8)
					}
					if (this.diskNumberStart === a.MAX_VALUE_32BITS) {
						this.diskNumberStart = r.readInt(4)
					}
				},
				readExtraFields: function (e) {
					var r = e.index,
						t, n, a;
					this.extraFields = this.extraFields || {};
					while (e.index < r + this.extraFieldsLength) {
						t = e.readInt(2);
						n = e.readInt(2);
						a = e.readString(n);
						this.extraFields[t] = {
							id: t,
							length: n,
							value: a
						}
					}
				},
				handleUTF8: function () {
					if (this.useUTF8()) {
						this.fileName = s.utf8decode(this.fileName);
						this.fileComment = s.utf8decode(this.fileComment)
					} else {
						var e = this.findExtraFieldUnicodePath();
						if (e !== null) {
							this.fileName = e
						}
						var r = this.findExtraFieldUnicodeComment();
						if (r !== null) {
							this.fileComment = r
						}
					}
				},
				findExtraFieldUnicodePath: function () {
					var e = this.extraFields[28789];
					if (e) {
						var r = new n(e.value);
						if (r.readInt(1) !== 1) {
							return null
						}
						if (s.crc32(this.fileName) !== r.readInt(4)) {
							return null
						}
						return s.utf8decode(r.readString(e.length - 5))
					}
					return null
				},
				findExtraFieldUnicodeComment: function () {
					var e = this.extraFields[25461];
					if (e) {
						var r = new n(e.value);
						if (r.readInt(1) !== 1) {
							return null
						}
						if (s.crc32(this.fileComment) !== r.readInt(4)) {
							return null
						}
						return s.utf8decode(r.readString(e.length - 5))
					}
					return null
				}
			};
			r.exports = o
		}, {
			"./compressedObject": 2,
			"./object": 13,
			"./stringReader": 15,
			"./utils": 21
		}],
		24: [function (e, r, t) {
			"use strict";
			var n = e("./lib/utils/common").assign;
			var a = e("./lib/deflate");
			var i = e("./lib/inflate");
			var s = e("./lib/zlib/constants");
			var o = {};
			n(o, a, i, s);
			r.exports = o
		}, {
			"./lib/deflate": 25,
			"./lib/inflate": 26,
			"./lib/utils/common": 27,
			"./lib/zlib/constants": 30
		}],
		25: [function (e, r, t) {
			"use strict";
			var n = e("./zlib/deflate.js");
			var a = e("./utils/common");
			var i = e("./utils/strings");
			var s = e("./zlib/messages");
			var o = e("./zlib/zstream");
			var l = 0;
			var f = 4;
			var c = 0;
			var u = 1;
			var h = -1;
			var d = 0;
			var p = 8;
			var v = function (e) {
				this.options = a.assign({
					level: h,
					method: p,
					chunkSize: 16384,
					windowBits: 15,
					memLevel: 8,
					strategy: d,
					to: ""
				}, e || {});
				var r = this.options;
				if (r.raw && r.windowBits > 0) {
					r.windowBits = -r.windowBits
				} else if (r.gzip && r.windowBits > 0 && r.windowBits < 16) {
					r.windowBits += 16
				}
				this.err = 0;
				this.msg = "";
				this.ended = false;
				this.chunks = [];
				this.strm = new o;
				this.strm.avail_out = 0;
				var t = n.deflateInit2(this.strm, r.level, r.method, r.windowBits, r.memLevel, r.strategy);
				if (t !== c) {
					throw new Error(s[t])
				}
				if (r.header) {
					n.deflateSetHeader(this.strm, r.header)
				}
			};
			v.prototype.push = function (e, r) {
				var t = this.strm;
				var s = this.options.chunkSize;
				var o, h;
				if (this.ended) {
					return false
				}
				h = r === ~~r ? r : r === true ? f : l;
				if (typeof e === "string") {
					t.input = i.string2buf(e)
				} else {
					t.input = e
				}
				t.next_in = 0;
				t.avail_in = t.input.length;
				do {
					if (t.avail_out === 0) {
						t.output = new a.Buf8(s);
						t.next_out = 0;
						t.avail_out = s
					}
					o = n.deflate(t, h);
					if (o !== u && o !== c) {
						this.onEnd(o);
						this.ended = true;
						return false
					}
					if (t.avail_out === 0 || t.avail_in === 0 && h === f) {
						if (this.options.to === "string") {
							this.onData(i.buf2binstring(a.shrinkBuf(t.output, t.next_out)))
						} else {
							this.onData(a.shrinkBuf(t.output, t.next_out))
						}
					}
				} while ((t.avail_in > 0 || t.avail_out === 0) && o !== u);
				if (h === f) {
					o = n.deflateEnd(this.strm);
					this.onEnd(o);
					this.ended = true;
					return o === c
				}
				return true
			};
			v.prototype.onData = function (e) {
				this.chunks.push(e)
			};
			v.prototype.onEnd = function (e) {
				if (e === c) {
					if (this.options.to === "string") {
						this.result = this.chunks.join("")
					} else {
						this.result = a.flattenChunks(this.chunks)
					}
				}
				this.chunks = [];
				this.err = e;
				this.msg = this.strm.msg
			};

			function g(e, r) {
				var t = new v(r);
				t.push(e, true);
				if (t.err) {
					throw t.msg
				}
				return t.result
			}

			function m(e, r) {
				r = r || {};
				r.raw = true;
				return g(e, r)
			}

			function b(e, r) {
				r = r || {};
				r.gzip = true;
				return g(e, r)
			}
			t.Deflate = v;
			t.deflate = g;
			t.deflateRaw = m;
			t.gzip = b
		}, {
			"./utils/common": 27,
			"./utils/strings": 28,
			"./zlib/deflate.js": 32,
			"./zlib/messages": 37,
			"./zlib/zstream": 39
		}],
		26: [function (e, r, t) {
			"use strict";
			var n = e("./zlib/inflate.js");
			var a = e("./utils/common");
			var i = e("./utils/strings");
			var s = e("./zlib/constants");
			var o = e("./zlib/messages");
			var l = e("./zlib/zstream");
			var f = e("./zlib/gzheader");
			var c = function (e) {
				this.options = a.assign({
					chunkSize: 16384,
					windowBits: 0,
					to: ""
				}, e || {});
				var r = this.options;
				if (r.raw && r.windowBits >= 0 && r.windowBits < 16) {
					r.windowBits = -r.windowBits;
					if (r.windowBits === 0) {
						r.windowBits = -15
					}
				}
				if (r.windowBits >= 0 && r.windowBits < 16 && !(e && e.windowBits)) {
					r.windowBits += 32
				}
				if (r.windowBits > 15 && r.windowBits < 48) {
					if ((r.windowBits & 15) === 0) {
						r.windowBits |= 15
					}
				}
				this.err = 0;
				this.msg = "";
				this.ended = false;
				this.chunks = [];
				this.strm = new l;
				this.strm.avail_out = 0;
				var t = n.inflateInit2(this.strm, r.windowBits);
				if (t !== s.Z_OK) {
					throw new Error(o[t])
				}
				this.header = new f;
				n.inflateGetHeader(this.strm, this.header)
			};
			c.prototype.push = function (e, r) {
				var t = this.strm;
				var o = this.options.chunkSize;
				var l, f;
				var c, u, h;
				if (this.ended) {
					return false
				}
				f = r === ~~r ? r : r === true ? s.Z_FINISH : s.Z_NO_FLUSH;
				if (typeof e === "string") {
					t.input = i.binstring2buf(e)
				} else {
					t.input = e
				}
				t.next_in = 0;
				t.avail_in = t.input.length;
				do {
					if (t.avail_out === 0) {
						t.output = new a.Buf8(o);
						t.next_out = 0;
						t.avail_out = o
					}
					l = n.inflate(t, s.Z_NO_FLUSH);
					if (l !== s.Z_STREAM_END && l !== s.Z_OK) {
						this.onEnd(l);
						this.ended = true;
						return false
					}
					if (t.next_out) {
						if (t.avail_out === 0 || l === s.Z_STREAM_END || t.avail_in === 0 && f === s.Z_FINISH) {
							if (this.options.to === "string") {
								c = i.utf8border(t.output, t.next_out);
								u = t.next_out - c;
								h = i.buf2string(t.output, c);
								t.next_out = u;
								t.avail_out = o - u;
								if (u) {
									a.arraySet(t.output, t.output, c, u, 0)
								}
								this.onData(h)
							} else {
								this.onData(a.shrinkBuf(t.output, t.next_out))
							}
						}
					}
				} while (t.avail_in > 0 && l !== s.Z_STREAM_END);
				if (l === s.Z_STREAM_END) {
					f = s.Z_FINISH
				}
				if (f === s.Z_FINISH) {
					l = n.inflateEnd(this.strm);
					this.onEnd(l);
					this.ended = true;
					return l === s.Z_OK
				}
				return true
			};
			c.prototype.onData = function (e) {
				this.chunks.push(e)
			};
			c.prototype.onEnd = function (e) {
				if (e === s.Z_OK) {
					if (this.options.to === "string") {
						this.result = this.chunks.join("")
					} else {
						this.result = a.flattenChunks(this.chunks)
					}
				}
				this.chunks = [];
				this.err = e;
				this.msg = this.strm.msg
			};

			function u(e, r) {
				var t = new c(r);
				t.push(e, true);
				if (t.err) {
					throw t.msg
				}
				return t.result
			}

			function h(e, r) {
				r = r || {};
				r.raw = true;
				return u(e, r)
			}
			t.Inflate = c;
			t.inflate = u;
			t.inflateRaw = h;
			t.ungzip = u
		}, {
			"./utils/common": 27,
			"./utils/strings": 28,
			"./zlib/constants": 30,
			"./zlib/gzheader": 33,
			"./zlib/inflate.js": 35,
			"./zlib/messages": 37,
			"./zlib/zstream": 39
		}],
		27: [function (e, r, t) {
			"use strict";
			var n = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
			t.assign = function (e) {
				var r = Array.prototype.slice.call(arguments, 1);
				while (r.length) {
					var t = r.shift();
					if (!t) {
						continue
					}
					if (typeof t !== "object") {
						throw new TypeError(t + "must be non-object")
					}
					for (var n in t) {
						if (t.hasOwnProperty(n)) {
							e[n] = t[n]
						}
					}
				}
				return e
			};
			t.shrinkBuf = function (e, r) {
				if (e.length === r) {
					return e
				}
				if (e.subarray) {
					return e.subarray(0, r)
				}
				e.length = r;
				return e
			};
			var a = {
				arraySet: function (e, r, t, n, a) {
					if (r.subarray && e.subarray) {
						e.set(r.subarray(t, t + n), a);
						return
					}
					for (var i = 0; i < n; i++) {
						e[a + i] = r[t + i]
					}
				},
				flattenChunks: function (e) {
					var r, t, n, a, i, s;
					n = 0;
					for (r = 0, t = e.length; r < t; r++) {
						n += e[r].length
					}
					s = new Uint8Array(n);
					a = 0;
					for (r = 0, t = e.length; r < t; r++) {
						i = e[r];
						s.set(i, a);
						a += i.length
					}
					return s
				}
			};
			var i = {
				arraySet: function (e, r, t, n, a) {
					for (var i = 0; i < n; i++) {
						e[a + i] = r[t + i]
					}
				},
				flattenChunks: function (e) {
					return [].concat.apply([], e)
				}
			};
			t.setTyped = function (e) {
				if (e) {
					t.Buf8 = Uint8Array;
					t.Buf16 = Uint16Array;
					t.Buf32 = Int32Array;
					t.assign(t, a)
				} else {
					t.Buf8 = Array;
					t.Buf16 = Array;
					t.Buf32 = Array;
					t.assign(t, i)
				}
			};
			t.setTyped(n)
		}, {}],
		28: [function (e, r, t) {
			"use strict";
			var n = e("./common");
			var a = true;
			var i = true;
			try {
				String.fromCharCode.apply(null, [0])
			} catch (e) {
				a = false
			}
			try {
				String.fromCharCode.apply(null, new Uint8Array(1))
			} catch (e) {
				i = false
			}
			var s = new n.Buf8(256);
			for (var o = 0; o < 256; o++) {
				s[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1
			}
			s[254] = s[254] = 1;
			t.string2buf = function (e) {
				var r, t, a, i, s, o = e.length,
					l = 0;
				for (i = 0; i < o; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						a = e.charCodeAt(i + 1);
						if ((a & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (a - 56320);
							i++
						}
					}
					l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
				}
				r = new n.Buf8(l);
				for (s = 0, i = 0; s < l; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						a = e.charCodeAt(i + 1);
						if ((a & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (a - 56320);
							i++
						}
					}
					if (t < 128) {
						r[s++] = t
					} else if (t < 2048) {
						r[s++] = 192 | t >>> 6;
						r[s++] = 128 | t & 63
					} else if (t < 65536) {
						r[s++] = 224 | t >>> 12;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					} else {
						r[s++] = 240 | t >>> 18;
						r[s++] = 128 | t >>> 12 & 63;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					}
				}
				return r
			};

			function l(e, r) {
				if (r < 65537) {
					if (e.subarray && i || !e.subarray && a) {
						return String.fromCharCode.apply(null, n.shrinkBuf(e, r))
					}
				}
				var t = "";
				for (var s = 0; s < r; s++) {
					t += String.fromCharCode(e[s])
				}
				return t
			}
			t.buf2binstring = function (e) {
				return l(e, e.length)
			};
			t.binstring2buf = function (e) {
				var r = new n.Buf8(e.length);
				for (var t = 0, a = r.length; t < a; t++) {
					r[t] = e.charCodeAt(t)
				}
				return r
			};
			t.buf2string = function (e, r) {
				var t, n, a, i;
				var o = r || e.length;
				var f = new Array(o * 2);
				for (n = 0, t = 0; t < o;) {
					a = e[t++];
					if (a < 128) {
						f[n++] = a;
						continue
					}
					i = s[a];
					if (i > 4) {
						f[n++] = 65533;
						t += i - 1;
						continue
					}
					a &= i === 2 ? 31 : i === 3 ? 15 : 7;
					while (i > 1 && t < o) {
						a = a << 6 | e[t++] & 63;
						i--
					}
					if (i > 1) {
						f[n++] = 65533;
						continue
					}
					if (a < 65536) {
						f[n++] = a
					} else {
						a -= 65536;
						f[n++] = 55296 | a >> 10 & 1023;
						f[n++] = 56320 | a & 1023
					}
				}
				return l(f, n)
			};
			t.utf8border = function (e, r) {
				var t;
				r = r || e.length;
				if (r > e.length) {
					r = e.length
				}
				t = r - 1;
				while (t >= 0 && (e[t] & 192) === 128) {
					t--
				}
				if (t < 0) {
					return r
				}
				if (t === 0) {
					return r
				}
				return t + s[e[t]] > r ? t : r
			}
		}, {
			"./common": 27
		}],
		29: [function (e, r, t) {
			"use strict";

			function n(e, r, t, n) {
				var a = e & 65535 | 0,
					i = e >>> 16 & 65535 | 0,
					s = 0;
				while (t !== 0) {
					s = t > 2e3 ? 2e3 : t;
					t -= s;
					do {
						a = a + r[n++] | 0;
						i = i + a | 0
					} while (--s);
					a %= 65521;
					i %= 65521
				}
				return a | i << 16 | 0
			}
			r.exports = n
		}, {}],
		30: [function (e, r, t) {
			r.exports = {
				Z_NO_FLUSH: 0,
				Z_PARTIAL_FLUSH: 1,
				Z_SYNC_FLUSH: 2,
				Z_FULL_FLUSH: 3,
				Z_FINISH: 4,
				Z_BLOCK: 5,
				Z_TREES: 6,
				Z_OK: 0,
				Z_STREAM_END: 1,
				Z_NEED_DICT: 2,
				Z_ERRNO: -1,
				Z_STREAM_ERROR: -2,
				Z_DATA_ERROR: -3,
				Z_BUF_ERROR: -5,
				Z_NO_COMPRESSION: 0,
				Z_BEST_SPEED: 1,
				Z_BEST_COMPRESSION: 9,
				Z_DEFAULT_COMPRESSION: -1,
				Z_FILTERED: 1,
				Z_HUFFMAN_ONLY: 2,
				Z_RLE: 3,
				Z_FIXED: 4,
				Z_DEFAULT_STRATEGY: 0,
				Z_BINARY: 0,
				Z_TEXT: 1,
				Z_UNKNOWN: 2,
				Z_DEFLATED: 8
			}
		}, {}],
		31: [function (e, r, t) {
			"use strict";

			function n() {
				var e, r = [];
				for (var t = 0; t < 256; t++) {
					e = t;
					for (var n = 0; n < 8; n++) {
						e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1
					}
					r[t] = e
				}
				return r
			}
			var a = n();

			function i(e, r, t, n) {
				var i = a,
					s = n + t;
				e = e ^ -1;
				for (var o = n; o < s; o++) {
					e = e >>> 8 ^ i[(e ^ r[o]) & 255]
				}
				return e ^ -1
			}
			r.exports = i
		}, {}],
		32: [function (e, r, t) {
			"use strict";
			var n = e("../utils/common");
			var a = e("./trees");
			var i = e("./adler32");
			var s = e("./crc32");
			var o = e("./messages");
			var l = 0;
			var f = 1;
			var c = 3;
			var u = 4;
			var h = 5;
			var d = 0;
			var p = 1;
			var v = -2;
			var g = -3;
			var m = -5;
			var b = -1;
			var C = 1;
			var E = 2;
			var k = 3;
			var S = 4;
			var w = 0;
			var A = 2;
			var _ = 8;
			var R = 9;
			var B = 15;
			var T = 8;
			var y = 29;
			var x = 256;
			var I = x + 1 + y;
			var D = 30;
			var F = 19;
			var O = 2 * I + 1;
			var P = 15;
			var N = 3;
			var L = 258;
			var M = L + N + 1;
			var W = 32;
			var U = 42;
			var H = 69;
			var V = 73;
			var z = 91;
			var X = 103;
			var G = 113;
			var j = 666;
			var K = 1;
			var Y = 2;
			var $ = 3;
			var Z = 4;
			var Q = 3;

			function J(e, r) {
				e.msg = o[r];
				return r
			}

			function q(e) {
				return (e << 1) - (e > 4 ? 9 : 0)
			}

			function ee(e) {
				var r = e.length;
				while (--r >= 0) {
					e[r] = 0
				}
			}

			function re(e) {
				var r = e.state;
				var t = r.pending;
				if (t > e.avail_out) {
					t = e.avail_out
				}
				if (t === 0) {
					return
				}
				n.arraySet(e.output, r.pending_buf, r.pending_out, t, e.next_out);
				e.next_out += t;
				r.pending_out += t;
				e.total_out += t;
				e.avail_out -= t;
				r.pending -= t;
				if (r.pending === 0) {
					r.pending_out = 0
				}
			}

			function te(e, r) {
				a._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, r);
				e.block_start = e.strstart;
				re(e.strm)
			}

			function ne(e, r) {
				e.pending_buf[e.pending++] = r
			}

			function ae(e, r) {
				e.pending_buf[e.pending++] = r >>> 8 & 255;
				e.pending_buf[e.pending++] = r & 255
			}

			function ie(e, r, t, a) {
				var o = e.avail_in;
				if (o > a) {
					o = a
				}
				if (o === 0) {
					return 0
				}
				e.avail_in -= o;
				n.arraySet(r, e.input, e.next_in, o, t);
				if (e.state.wrap === 1) {
					e.adler = i(e.adler, r, o, t)
				} else if (e.state.wrap === 2) {
					e.adler = s(e.adler, r, o, t)
				}
				e.next_in += o;
				e.total_in += o;
				return o
			}

			function se(e, r) {
				var t = e.max_chain_length;
				var n = e.strstart;
				var a;
				var i;
				var s = e.prev_length;
				var o = e.nice_match;
				var l = e.strstart > e.w_size - M ? e.strstart - (e.w_size - M) : 0;
				var f = e.window;
				var c = e.w_mask;
				var u = e.prev;
				var h = e.strstart + L;
				var d = f[n + s - 1];
				var p = f[n + s];
				if (e.prev_length >= e.good_match) {
					t >>= 2
				}
				if (o > e.lookahead) {
					o = e.lookahead
				}
				do {
					a = r;
					if (f[a + s] !== p || f[a + s - 1] !== d || f[a] !== f[n] || f[++a] !== f[n + 1]) {
						continue
					}
					n += 2;
					a++;
					do {} while (f[++n] === f[++a] && f[++n] === f[++a] && f[++n] === f[++a] && f[++n] === f[++a] && f[++n] === f[++a] && f[++n] ===
						f[++a] && f[++n] === f[++a] && f[++n] === f[++a] && n < h);
					i = L - (h - n);
					n = h - L;
					if (i > s) {
						e.match_start = r;
						s = i;
						if (i >= o) {
							break
						}
						d = f[n + s - 1];
						p = f[n + s]
					}
				} while ((r = u[r & c]) > l && --t !== 0);
				if (s <= e.lookahead) {
					return s
				}
				return e.lookahead
			}

			function oe(e) {
				var r = e.w_size;
				var t, a, i, s, o;
				do {
					s = e.window_size - e.lookahead - e.strstart;
					if (e.strstart >= r + (r - M)) {
						n.arraySet(e.window, e.window, r, r, 0);
						e.match_start -= r;
						e.strstart -= r;
						e.block_start -= r;
						a = e.hash_size;
						t = a;
						do {
							i = e.head[--t];
							e.head[t] = i >= r ? i - r : 0
						} while (--a);
						a = r;
						t = a;
						do {
							i = e.prev[--t];
							e.prev[t] = i >= r ? i - r : 0
						} while (--a);
						s += r
					}
					if (e.strm.avail_in === 0) {
						break
					}
					a = ie(e.strm, e.window, e.strstart + e.lookahead, s);
					e.lookahead += a;
					if (e.lookahead + e.insert >= N) {
						o = e.strstart - e.insert;
						e.ins_h = e.window[o];
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask;
						while (e.insert) {
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + N - 1]) & e.hash_mask;
							e.prev[o & e.w_mask] = e.head[e.ins_h];
							e.head[e.ins_h] = o;
							o++;
							e.insert--;
							if (e.lookahead + e.insert < N) {
								break
							}
						}
					}
				} while (e.lookahead < M && e.strm.avail_in !== 0)
			}

			function le(e, r) {
				var t = 65535;
				if (t > e.pending_buf_size - 5) {
					t = e.pending_buf_size - 5
				}
				for (;;) {
					if (e.lookahead <= 1) {
						oe(e);
						if (e.lookahead === 0 && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					e.strstart += e.lookahead;
					e.lookahead = 0;
					var n = e.block_start + t;
					if (e.strstart === 0 || e.strstart >= n) {
						e.lookahead = e.strstart - n;
						e.strstart = n;
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
					if (e.strstart - e.block_start >= e.w_size - M) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.strstart > e.block_start) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return K
			}

			function fe(e, r) {
				var t;
				var n;
				for (;;) {
					if (e.lookahead < M) {
						oe(e);
						if (e.lookahead < M && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					t = 0;
					if (e.lookahead >= N) {
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
						t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
						e.head[e.ins_h] = e.strstart
					}
					if (t !== 0 && e.strstart - t <= e.w_size - M) {
						e.match_length = se(e, t)
					}
					if (e.match_length >= N) {
						n = a._tr_tally(e, e.strstart - e.match_start, e.match_length - N);
						e.lookahead -= e.match_length;
						if (e.match_length <= e.max_lazy_match && e.lookahead >= N) {
							e.match_length--;
							do {
								e.strstart++;
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
								t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
								e.head[e.ins_h] = e.strstart
							} while (--e.match_length !== 0);
							e.strstart++
						} else {
							e.strstart += e.match_length;
							e.match_length = 0;
							e.ins_h = e.window[e.strstart];
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask
						}
					} else {
						n = a._tr_tally(e, 0, e.window[e.strstart]);
						e.lookahead--;
						e.strstart++
					}
					if (n) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = e.strstart < N - 1 ? e.strstart : N - 1;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}

			function ce(e, r) {
				var t;
				var n;
				var i;
				for (;;) {
					if (e.lookahead < M) {
						oe(e);
						if (e.lookahead < M && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					t = 0;
					if (e.lookahead >= N) {
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
						t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
						e.head[e.ins_h] = e.strstart
					}
					e.prev_length = e.match_length;
					e.prev_match = e.match_start;
					e.match_length = N - 1;
					if (t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - M) {
						e.match_length = se(e, t);
						if (e.match_length <= 5 && (e.strategy === C || e.match_length === N && e.strstart - e.match_start > 4096)) {
							e.match_length = N - 1
						}
					}
					if (e.prev_length >= N && e.match_length <= e.prev_length) {
						i = e.strstart + e.lookahead - N;
						n = a._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - N);
						e.lookahead -= e.prev_length - 1;
						e.prev_length -= 2;
						do {
							if (++e.strstart <= i) {
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
								t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
								e.head[e.ins_h] = e.strstart
							}
						} while (--e.prev_length !== 0);
						e.match_available = 0;
						e.match_length = N - 1;
						e.strstart++;
						if (n) {
							te(e, false);
							if (e.strm.avail_out === 0) {
								return K
							}
						}
					} else if (e.match_available) {
						n = a._tr_tally(e, 0, e.window[e.strstart - 1]);
						if (n) {
							te(e, false)
						}
						e.strstart++;
						e.lookahead--;
						if (e.strm.avail_out === 0) {
							return K
						}
					} else {
						e.match_available = 1;
						e.strstart++;
						e.lookahead--
					}
				}
				if (e.match_available) {
					n = a._tr_tally(e, 0, e.window[e.strstart - 1]);
					e.match_available = 0
				}
				e.insert = e.strstart < N - 1 ? e.strstart : N - 1;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}

			function ue(e, r) {
				var t;
				var n;
				var i, s;
				var o = e.window;
				for (;;) {
					if (e.lookahead <= L) {
						oe(e);
						if (e.lookahead <= L && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					e.match_length = 0;
					if (e.lookahead >= N && e.strstart > 0) {
						i = e.strstart - 1;
						n = o[i];
						if (n === o[++i] && n === o[++i] && n === o[++i]) {
							s = e.strstart + L;
							do {} while (n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n ===
								o[++i] && i < s);
							e.match_length = L - (s - i);
							if (e.match_length > e.lookahead) {
								e.match_length = e.lookahead
							}
						}
					}
					if (e.match_length >= N) {
						t = a._tr_tally(e, 1, e.match_length - N);
						e.lookahead -= e.match_length;
						e.strstart += e.match_length;
						e.match_length = 0
					} else {
						t = a._tr_tally(e, 0, e.window[e.strstart]);
						e.lookahead--;
						e.strstart++
					}
					if (t) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}

			function he(e, r) {
				var t;
				for (;;) {
					if (e.lookahead === 0) {
						oe(e);
						if (e.lookahead === 0) {
							if (r === l) {
								return K
							}
							break
						}
					}
					e.match_length = 0;
					t = a._tr_tally(e, 0, e.window[e.strstart]);
					e.lookahead--;
					e.strstart++;
					if (t) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}
			var de = function (e, r, t, n, a) {
				this.good_length = e;
				this.max_lazy = r;
				this.nice_length = t;
				this.max_chain = n;
				this.func = a
			};
			var pe;
			pe = [new de(0, 0, 0, 0, le), new de(4, 4, 8, 4, fe), new de(4, 5, 16, 8, fe), new de(4, 6, 32, 32, fe), new de(4, 4, 16, 16, ce),
				new de(8, 16, 32, 32, ce), new de(8, 16, 128, 128, ce), new de(8, 32, 128, 256, ce), new de(32, 128, 258, 1024, ce), new de(32,
					258, 258, 4096, ce)
			];

			function ve(e) {
				e.window_size = 2 * e.w_size;
				ee(e.head);
				e.max_lazy_match = pe[e.level].max_lazy;
				e.good_match = pe[e.level].good_length;
				e.nice_match = pe[e.level].nice_length;
				e.max_chain_length = pe[e.level].max_chain;
				e.strstart = 0;
				e.block_start = 0;
				e.lookahead = 0;
				e.insert = 0;
				e.match_length = e.prev_length = N - 1;
				e.match_available = 0;
				e.ins_h = 0
			}

			function ge() {
				this.strm = null;
				this.status = 0;
				this.pending_buf = null;
				this.pending_buf_size = 0;
				this.pending_out = 0;
				this.pending = 0;
				this.wrap = 0;
				this.gzhead = null;
				this.gzindex = 0;
				this.method = _;
				this.last_flush = -1;
				this.w_size = 0;
				this.w_bits = 0;
				this.w_mask = 0;
				this.window = null;
				this.window_size = 0;
				this.prev = null;
				this.head = null;
				this.ins_h = 0;
				this.hash_size = 0;
				this.hash_bits = 0;
				this.hash_mask = 0;
				this.hash_shift = 0;
				this.block_start = 0;
				this.match_length = 0;
				this.prev_match = 0;
				this.match_available = 0;
				this.strstart = 0;
				this.match_start = 0;
				this.lookahead = 0;
				this.prev_length = 0;
				this.max_chain_length = 0;
				this.max_lazy_match = 0;
				this.level = 0;
				this.strategy = 0;
				this.good_match = 0;
				this.nice_match = 0;
				this.dyn_ltree = new n.Buf16(O * 2);
				this.dyn_dtree = new n.Buf16((2 * D + 1) * 2);
				this.bl_tree = new n.Buf16((2 * F + 1) * 2);
				ee(this.dyn_ltree);
				ee(this.dyn_dtree);
				ee(this.bl_tree);
				this.l_desc = null;
				this.d_desc = null;
				this.bl_desc = null;
				this.bl_count = new n.Buf16(P + 1);
				this.heap = new n.Buf16(2 * I + 1);
				ee(this.heap);
				this.heap_len = 0;
				this.heap_max = 0;
				this.depth = new n.Buf16(2 * I + 1);
				ee(this.depth);
				this.l_buf = 0;
				this.lit_bufsize = 0;
				this.last_lit = 0;
				this.d_buf = 0;
				this.opt_len = 0;
				this.static_len = 0;
				this.matches = 0;
				this.insert = 0;
				this.bi_buf = 0;
				this.bi_valid = 0
			}

			function me(e) {
				var r;
				if (!e || !e.state) {
					return J(e, v)
				}
				e.total_in = e.total_out = 0;
				e.data_type = A;
				r = e.state;
				r.pending = 0;
				r.pending_out = 0;
				if (r.wrap < 0) {
					r.wrap = -r.wrap
				}
				r.status = r.wrap ? U : G;
				e.adler = r.wrap === 2 ? 0 : 1;
				r.last_flush = l;
				a._tr_init(r);
				return d
			}

			function be(e) {
				var r = me(e);
				if (r === d) {
					ve(e.state)
				}
				return r
			}

			function Ce(e, r) {
				if (!e || !e.state) {
					return v
				}
				if (e.state.wrap !== 2) {
					return v
				}
				e.state.gzhead = r;
				return d
			}

			function Ee(e, r, t, a, i, s) {
				if (!e) {
					return v
				}
				var o = 1;
				if (r === b) {
					r = 6
				}
				if (a < 0) {
					o = 0;
					a = -a
				} else if (a > 15) {
					o = 2;
					a -= 16
				}
				if (i < 1 || i > R || t !== _ || a < 8 || a > 15 || r < 0 || r > 9 || s < 0 || s > S) {
					return J(e, v)
				}
				if (a === 8) {
					a = 9
				}
				var l = new ge;
				e.state = l;
				l.strm = e;
				l.wrap = o;
				l.gzhead = null;
				l.w_bits = a;
				l.w_size = 1 << l.w_bits;
				l.w_mask = l.w_size - 1;
				l.hash_bits = i + 7;
				l.hash_size = 1 << l.hash_bits;
				l.hash_mask = l.hash_size - 1;
				l.hash_shift = ~~((l.hash_bits + N - 1) / N);
				l.window = new n.Buf8(l.w_size * 2);
				l.head = new n.Buf16(l.hash_size);
				l.prev = new n.Buf16(l.w_size);
				l.lit_bufsize = 1 << i + 6;
				l.pending_buf_size = l.lit_bufsize * 4;
				l.pending_buf = new n.Buf8(l.pending_buf_size);
				l.d_buf = l.lit_bufsize >> 1;
				l.l_buf = (1 + 2) * l.lit_bufsize;
				l.level = r;
				l.strategy = s;
				l.method = t;
				return be(e)
			}

			function ke(e, r) {
				return Ee(e, r, _, B, T, w)
			}

			function Se(e, r) {
				var t, n;
				var i, o;
				if (!e || !e.state || r > h || r < 0) {
					return e ? J(e, v) : v
				}
				n = e.state;
				if (!e.output || !e.input && e.avail_in !== 0 || n.status === j && r !== u) {
					return J(e, e.avail_out === 0 ? m : v)
				}
				n.strm = e;
				t = n.last_flush;
				n.last_flush = r;
				if (n.status === U) {
					if (n.wrap === 2) {
						e.adler = 0;
						ne(n, 31);
						ne(n, 139);
						ne(n, 8);
						if (!n.gzhead) {
							ne(n, 0);
							ne(n, 0);
							ne(n, 0);
							ne(n, 0);
							ne(n, 0);
							ne(n, n.level === 9 ? 2 : n.strategy >= E || n.level < 2 ? 4 : 0);
							ne(n, Q);
							n.status = G
						} else {
							ne(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (!n.gzhead.extra ? 0 : 4) + (!n.gzhead.name ? 0 : 8) + (!n.gzhead.comment ?
								0 : 16));
							ne(n, n.gzhead.time & 255);
							ne(n, n.gzhead.time >> 8 & 255);
							ne(n, n.gzhead.time >> 16 & 255);
							ne(n, n.gzhead.time >> 24 & 255);
							ne(n, n.level === 9 ? 2 : n.strategy >= E || n.level < 2 ? 4 : 0);
							ne(n, n.gzhead.os & 255);
							if (n.gzhead.extra && n.gzhead.extra.length) {
								ne(n, n.gzhead.extra.length & 255);
								ne(n, n.gzhead.extra.length >> 8 & 255)
							}
							if (n.gzhead.hcrc) {
								e.adler = s(e.adler, n.pending_buf, n.pending, 0)
							}
							n.gzindex = 0;
							n.status = H
						}
					} else {
						var g = _ + (n.w_bits - 8 << 4) << 8;
						var b = -1;
						if (n.strategy >= E || n.level < 2) {
							b = 0
						} else if (n.level < 6) {
							b = 1
						} else if (n.level === 6) {
							b = 2
						} else {
							b = 3
						}
						g |= b << 6;
						if (n.strstart !== 0) {
							g |= W
						}
						g += 31 - g % 31;
						n.status = G;
						ae(n, g);
						if (n.strstart !== 0) {
							ae(n, e.adler >>> 16);
							ae(n, e.adler & 65535)
						}
						e.adler = 1
					}
				}
				if (n.status === H) {
					if (n.gzhead.extra) {
						i = n.pending;
						while (n.gzindex < (n.gzhead.extra.length & 65535)) {
							if (n.pending === n.pending_buf_size) {
								if (n.gzhead.hcrc && n.pending > i) {
									e.adler = s(e.adler, n.pending_buf, n.pending - i, i)
								}
								re(e);
								i = n.pending;
								if (n.pending === n.pending_buf_size) {
									break
								}
							}
							ne(n, n.gzhead.extra[n.gzindex] & 255);
							n.gzindex++
						}
						if (n.gzhead.hcrc && n.pending > i) {
							e.adler = s(e.adler, n.pending_buf, n.pending - i, i)
						}
						if (n.gzindex === n.gzhead.extra.length) {
							n.gzindex = 0;
							n.status = V
						}
					} else {
						n.status = V
					}
				}
				if (n.status === V) {
					if (n.gzhead.name) {
						i = n.pending;
						do {
							if (n.pending === n.pending_buf_size) {
								if (n.gzhead.hcrc && n.pending > i) {
									e.adler = s(e.adler, n.pending_buf, n.pending - i, i)
								}
								re(e);
								i = n.pending;
								if (n.pending === n.pending_buf_size) {
									o = 1;
									break
								}
							}
							if (n.gzindex < n.gzhead.name.length) {
								o = n.gzhead.name.charCodeAt(n.gzindex++) & 255
							} else {
								o = 0
							}
							ne(n, o)
						} while (o !== 0);
						if (n.gzhead.hcrc && n.pending > i) {
							e.adler = s(e.adler, n.pending_buf, n.pending - i, i)
						}
						if (o === 0) {
							n.gzindex = 0;
							n.status = z
						}
					} else {
						n.status = z
					}
				}
				if (n.status === z) {
					if (n.gzhead.comment) {
						i = n.pending;
						do {
							if (n.pending === n.pending_buf_size) {
								if (n.gzhead.hcrc && n.pending > i) {
									e.adler = s(e.adler, n.pending_buf, n.pending - i, i)
								}
								re(e);
								i = n.pending;
								if (n.pending === n.pending_buf_size) {
									o = 1;
									break
								}
							}
							if (n.gzindex < n.gzhead.comment.length) {
								o = n.gzhead.comment.charCodeAt(n.gzindex++) & 255
							} else {
								o = 0
							}
							ne(n, o)
						} while (o !== 0);
						if (n.gzhead.hcrc && n.pending > i) {
							e.adler = s(e.adler, n.pending_buf, n.pending - i, i)
						}
						if (o === 0) {
							n.status = X
						}
					} else {
						n.status = X
					}
				}
				if (n.status === X) {
					if (n.gzhead.hcrc) {
						if (n.pending + 2 > n.pending_buf_size) {
							re(e)
						}
						if (n.pending + 2 <= n.pending_buf_size) {
							ne(n, e.adler & 255);
							ne(n, e.adler >> 8 & 255);
							e.adler = 0;
							n.status = G
						}
					} else {
						n.status = G
					}
				}
				if (n.pending !== 0) {
					re(e);
					if (e.avail_out === 0) {
						n.last_flush = -1;
						return d
					}
				} else if (e.avail_in === 0 && q(r) <= q(t) && r !== u) {
					return J(e, m)
				}
				if (n.status === j && e.avail_in !== 0) {
					return J(e, m)
				}
				if (e.avail_in !== 0 || n.lookahead !== 0 || r !== l && n.status !== j) {
					var C = n.strategy === E ? he(n, r) : n.strategy === k ? ue(n, r) : pe[n.level].func(n, r);
					if (C === $ || C === Z) {
						n.status = j
					}
					if (C === K || C === $) {
						if (e.avail_out === 0) {
							n.last_flush = -1
						}
						return d
					}
					if (C === Y) {
						if (r === f) {
							a._tr_align(n)
						} else if (r !== h) {
							a._tr_stored_block(n, 0, 0, false);
							if (r === c) {
								ee(n.head);
								if (n.lookahead === 0) {
									n.strstart = 0;
									n.block_start = 0;
									n.insert = 0
								}
							}
						}
						re(e);
						if (e.avail_out === 0) {
							n.last_flush = -1;
							return d
						}
					}
				}
				if (r !== u) {
					return d
				}
				if (n.wrap <= 0) {
					return p
				}
				if (n.wrap === 2) {
					ne(n, e.adler & 255);
					ne(n, e.adler >> 8 & 255);
					ne(n, e.adler >> 16 & 255);
					ne(n, e.adler >> 24 & 255);
					ne(n, e.total_in & 255);
					ne(n, e.total_in >> 8 & 255);
					ne(n, e.total_in >> 16 & 255);
					ne(n, e.total_in >> 24 & 255)
				} else {
					ae(n, e.adler >>> 16);
					ae(n, e.adler & 65535)
				}
				re(e);
				if (n.wrap > 0) {
					n.wrap = -n.wrap
				}
				return n.pending !== 0 ? d : p
			}

			function we(e) {
				var r;
				if (!e || !e.state) {
					return v
				}
				r = e.state.status;
				if (r !== U && r !== H && r !== V && r !== z && r !== X && r !== G && r !== j) {
					return J(e, v)
				}
				e.state = null;
				return r === G ? J(e, g) : d
			}
			t.deflateInit = ke;
			t.deflateInit2 = Ee;
			t.deflateReset = be;
			t.deflateResetKeep = me;
			t.deflateSetHeader = Ce;
			t.deflate = Se;
			t.deflateEnd = we;
			t.deflateInfo = "pako deflate (from Nodeca project)"
		}, {
			"../utils/common": 27,
			"./adler32": 29,
			"./crc32": 31,
			"./messages": 37,
			"./trees": 38
		}],
		33: [function (e, r, t) {
			"use strict";

			function n() {
				this.text = 0;
				this.time = 0;
				this.xflags = 0;
				this.os = 0;
				this.extra = null;
				this.extra_len = 0;
				this.name = "";
				this.comment = "";
				this.hcrc = 0;
				this.done = false
			}
			r.exports = n
		}, {}],
		34: [function (e, r, t) {
			"use strict";
			var n = 30;
			var a = 12;
			r.exports = function e(r, t) {
				var i;
				var e;
				var s;
				var o;
				var l;
				var f;
				var c;
				var u;
				var h;
				var d;
				var p;
				var v;
				var g;
				var m;
				var b;
				var C;
				var E;
				var k;
				var S;
				var w;
				var A;
				var _;
				var R;
				var B, T;
				i = r.state;
				e = r.next_in;
				B = r.input;
				s = e + (r.avail_in - 5);
				o = r.next_out;
				T = r.output;
				l = o - (t - r.avail_out);
				f = o + (r.avail_out - 257);
				c = i.dmax;
				u = i.wsize;
				h = i.whave;
				d = i.wnext;
				p = i.window;
				v = i.hold;
				g = i.bits;
				m = i.lencode;
				b = i.distcode;
				C = (1 << i.lenbits) - 1;
				E = (1 << i.distbits) - 1;
				e: do {
					if (g < 15) {
						v += B[e++] << g;
						g += 8;
						v += B[e++] << g;
						g += 8
					}
					k = m[v & C];
					r: for (;;) {
						S = k >>> 24;
						v >>>= S;
						g -= S;
						S = k >>> 16 & 255;
						if (S === 0) {
							T[o++] = k & 65535
						} else if (S & 16) {
							w = k & 65535;
							S &= 15;
							if (S) {
								if (g < S) {
									v += B[e++] << g;
									g += 8
								}
								w += v & (1 << S) - 1;
								v >>>= S;
								g -= S
							}
							if (g < 15) {
								v += B[e++] << g;
								g += 8;
								v += B[e++] << g;
								g += 8
							}
							k = b[v & E];
							t: for (;;) {
								S = k >>> 24;
								v >>>= S;
								g -= S;
								S = k >>> 16 & 255;
								if (S & 16) {
									A = k & 65535;
									S &= 15;
									if (g < S) {
										v += B[e++] << g;
										g += 8;
										if (g < S) {
											v += B[e++] << g;
											g += 8
										}
									}
									A += v & (1 << S) - 1;
									if (A > c) {
										r.msg = "invalid distance too far back";
										i.mode = n;
										break e
									}
									v >>>= S;
									g -= S;
									S = o - l;
									if (A > S) {
										S = A - S;
										if (S > h) {
											if (i.sane) {
												r.msg = "invalid distance too far back";
												i.mode = n;
												break e
											}
										}
										_ = 0;
										R = p;
										if (d === 0) {
											_ += u - S;
											if (S < w) {
												w -= S;
												do {
													T[o++] = p[_++]
												} while (--S);
												_ = o - A;
												R = T
											}
										} else if (d < S) {
											_ += u + d - S;
											S -= d;
											if (S < w) {
												w -= S;
												do {
													T[o++] = p[_++]
												} while (--S);
												_ = 0;
												if (d < w) {
													S = d;
													w -= S;
													do {
														T[o++] = p[_++]
													} while (--S);
													_ = o - A;
													R = T
												}
											}
										} else {
											_ += d - S;
											if (S < w) {
												w -= S;
												do {
													T[o++] = p[_++]
												} while (--S);
												_ = o - A;
												R = T
											}
										}
										while (w > 2) {
											T[o++] = R[_++];
											T[o++] = R[_++];
											T[o++] = R[_++];
											w -= 3
										}
										if (w) {
											T[o++] = R[_++];
											if (w > 1) {
												T[o++] = R[_++]
											}
										}
									} else {
										_ = o - A;
										do {
											T[o++] = T[_++];
											T[o++] = T[_++];
											T[o++] = T[_++];
											w -= 3
										} while (w > 2);
										if (w) {
											T[o++] = T[_++];
											if (w > 1) {
												T[o++] = T[_++]
											}
										}
									}
								} else if ((S & 64) === 0) {
									k = b[(k & 65535) + (v & (1 << S) - 1)];
									continue t
								} else {
									r.msg = "invalid distance code";
									i.mode = n;
									break e
								}
								break
							}
						} else if ((S & 64) === 0) {
							k = m[(k & 65535) + (v & (1 << S) - 1)];
							continue r
						} else if (S & 32) {
							i.mode = a;
							break e
						} else {
							r.msg = "invalid literal/length code";
							i.mode = n;
							break e
						}
						break
					}
				} while (e < s && o < f);
				w = g >> 3;
				e -= w;
				g -= w << 3;
				v &= (1 << g) - 1;
				r.next_in = e;
				r.next_out = o;
				r.avail_in = e < s ? 5 + (s - e) : 5 - (e - s);
				r.avail_out = o < f ? 257 + (f - o) : 257 - (o - f);
				i.hold = v;
				i.bits = g;
				return
			}
		}, {}],
		35: [function (e, r, t) {
			"use strict";
			var n = e("../utils/common");
			var a = e("./adler32");
			var i = e("./crc32");
			var s = e("./inffast");
			var o = e("./inftrees");
			var l = 0;
			var f = 1;
			var c = 2;
			var u = 4;
			var h = 5;
			var d = 6;
			var p = 0;
			var v = 1;
			var g = 2;
			var m = -2;
			var b = -3;
			var C = -4;
			var E = -5;
			var k = 8;
			var S = 1;
			var w = 2;
			var A = 3;
			var _ = 4;
			var R = 5;
			var B = 6;
			var T = 7;
			var y = 8;
			var x = 9;
			var I = 10;
			var D = 11;
			var F = 12;
			var O = 13;
			var P = 14;
			var N = 15;
			var L = 16;
			var M = 17;
			var W = 18;
			var U = 19;
			var H = 20;
			var V = 21;
			var z = 22;
			var X = 23;
			var G = 24;
			var j = 25;
			var K = 26;
			var Y = 27;
			var $ = 28;
			var Z = 29;
			var Q = 30;
			var J = 31;
			var q = 32;
			var ee = 852;
			var re = 592;
			var te = 15;
			var ne = te;

			function ae(e) {
				return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24)
			}

			function ie() {
				this.mode = 0;
				this.last = false;
				this.wrap = 0;
				this.havedict = false;
				this.flags = 0;
				this.dmax = 0;
				this.check = 0;
				this.total = 0;
				this.head = null;
				this.wbits = 0;
				this.wsize = 0;
				this.whave = 0;
				this.wnext = 0;
				this.window = null;
				this.hold = 0;
				this.bits = 0;
				this.length = 0;
				this.offset = 0;
				this.extra = 0;
				this.lencode = null;
				this.distcode = null;
				this.lenbits = 0;
				this.distbits = 0;
				this.ncode = 0;
				this.nlen = 0;
				this.ndist = 0;
				this.have = 0;
				this.next = null;
				this.lens = new n.Buf16(320);
				this.work = new n.Buf16(288);
				this.lendyn = null;
				this.distdyn = null;
				this.sane = 0;
				this.back = 0;
				this.was = 0
			}

			function se(e) {
				var r;
				if (!e || !e.state) {
					return m
				}
				r = e.state;
				e.total_in = e.total_out = r.total = 0;
				e.msg = "";
				if (r.wrap) {
					e.adler = r.wrap & 1
				}
				r.mode = S;
				r.last = 0;
				r.havedict = 0;
				r.dmax = 32768;
				r.head = null;
				r.hold = 0;
				r.bits = 0;
				r.lencode = r.lendyn = new n.Buf32(ee);
				r.distcode = r.distdyn = new n.Buf32(re);
				r.sane = 1;
				r.back = -1;
				return p
			}

			function oe(e) {
				var r;
				if (!e || !e.state) {
					return m
				}
				r = e.state;
				r.wsize = 0;
				r.whave = 0;
				r.wnext = 0;
				return se(e)
			}

			function le(e, r) {
				var t;
				var n;
				if (!e || !e.state) {
					return m
				}
				n = e.state;
				if (r < 0) {
					t = 0;
					r = -r
				} else {
					t = (r >> 4) + 1;
					if (r < 48) {
						r &= 15
					}
				}
				if (r && (r < 8 || r > 15)) {
					return m
				}
				if (n.window !== null && n.wbits !== r) {
					n.window = null
				}
				n.wrap = t;
				n.wbits = r;
				return oe(e)
			}

			function fe(e, r) {
				var t;
				var n;
				if (!e) {
					return m
				}
				n = new ie;
				e.state = n;
				n.window = null;
				t = le(e, r);
				if (t !== p) {
					e.state = null
				}
				return t
			}

			function ce(e) {
				return fe(e, ne)
			}
			var ue = true;
			var he, de;

			function pe(e) {
				if (ue) {
					var r;
					he = new n.Buf32(512);
					de = new n.Buf32(32);
					r = 0;
					while (r < 144) {
						e.lens[r++] = 8
					}
					while (r < 256) {
						e.lens[r++] = 9
					}
					while (r < 280) {
						e.lens[r++] = 7
					}
					while (r < 288) {
						e.lens[r++] = 8
					}
					o(f, e.lens, 0, 288, he, 0, e.work, {
						bits: 9
					});
					r = 0;
					while (r < 32) {
						e.lens[r++] = 5
					}
					o(c, e.lens, 0, 32, de, 0, e.work, {
						bits: 5
					});
					ue = false
				}
				e.lencode = he;
				e.lenbits = 9;
				e.distcode = de;
				e.distbits = 5
			}

			function ve(e, r, t, a) {
				var i;
				var s = e.state;
				if (s.window === null) {
					s.wsize = 1 << s.wbits;
					s.wnext = 0;
					s.whave = 0;
					s.window = new n.Buf8(s.wsize)
				}
				if (a >= s.wsize) {
					n.arraySet(s.window, r, t - s.wsize, s.wsize, 0);
					s.wnext = 0;
					s.whave = s.wsize
				} else {
					i = s.wsize - s.wnext;
					if (i > a) {
						i = a
					}
					n.arraySet(s.window, r, t - a, i, s.wnext);
					a -= i;
					if (a) {
						n.arraySet(s.window, r, t - a, a, 0);
						s.wnext = a;
						s.whave = s.wsize
					} else {
						s.wnext += i;
						if (s.wnext === s.wsize) {
							s.wnext = 0
						}
						if (s.whave < s.wsize) {
							s.whave += i
						}
					}
				}
				return 0
			}

			function ge(e, r) {
				var t;
				var ee, re;
				var te;
				var ne;
				var ie, se;
				var oe;
				var le;
				var fe, ce;
				var ue;
				var he;
				var de;
				var ge = 0;
				var me, be, Ce;
				var Ee, ke, Se;
				var we;
				var Ae;
				var _e = new n.Buf8(4);
				var Re;
				var Be;
				var Te = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
				if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) {
					return m
				}
				t = e.state;
				if (t.mode === F) {
					t.mode = O
				}
				ne = e.next_out;
				re = e.output;
				se = e.avail_out;
				te = e.next_in;
				ee = e.input;
				ie = e.avail_in;
				oe = t.hold;
				le = t.bits;
				fe = ie;
				ce = se;
				Ae = p;
				e: for (;;) {
					switch (t.mode) {
					case S:
						if (t.wrap === 0) {
							t.mode = O;
							break
						}
						while (le < 16) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (t.wrap & 2 && oe === 35615) {
							t.check = 0;
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							t.check = i(t.check, _e, 2, 0);
							oe = 0;
							le = 0;
							t.mode = w;
							break
						}
						t.flags = 0;
						if (t.head) {
							t.head.done = false
						}
						if (!(t.wrap & 1) || (((oe & 255) << 8) + (oe >> 8)) % 31) {
							e.msg = "incorrect header check";
							t.mode = Q;
							break
						}
						if ((oe & 15) !== k) {
							e.msg = "unknown compression method";
							t.mode = Q;
							break
						}
						oe >>>= 4;
						le -= 4;
						we = (oe & 15) + 8;
						if (t.wbits === 0) {
							t.wbits = we
						} else if (we > t.wbits) {
							e.msg = "invalid window size";
							t.mode = Q;
							break
						}
						t.dmax = 1 << we;
						e.adler = t.check = 1;
						t.mode = oe & 512 ? I : F;
						oe = 0;
						le = 0;
						break;
					case w:
						while (le < 16) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						t.flags = oe;
						if ((t.flags & 255) !== k) {
							e.msg = "unknown compression method";
							t.mode = Q;
							break
						}
						if (t.flags & 57344) {
							e.msg = "unknown header flags set";
							t.mode = Q;
							break
						}
						if (t.head) {
							t.head.text = oe >> 8 & 1
						}
						if (t.flags & 512) {
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							t.check = i(t.check, _e, 2, 0)
						}
						oe = 0;
						le = 0;
						t.mode = A;
					case A:
						while (le < 32) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (t.head) {
							t.head.time = oe
						}
						if (t.flags & 512) {
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							_e[2] = oe >>> 16 & 255;
							_e[3] = oe >>> 24 & 255;
							t.check = i(t.check, _e, 4, 0)
						}
						oe = 0;
						le = 0;
						t.mode = _;
					case _:
						while (le < 16) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (t.head) {
							t.head.xflags = oe & 255;
							t.head.os = oe >> 8
						}
						if (t.flags & 512) {
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							t.check = i(t.check, _e, 2, 0)
						}
						oe = 0;
						le = 0;
						t.mode = R;
					case R:
						if (t.flags & 1024) {
							while (le < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.length = oe;
							if (t.head) {
								t.head.extra_len = oe
							}
							if (t.flags & 512) {
								_e[0] = oe & 255;
								_e[1] = oe >>> 8 & 255;
								t.check = i(t.check, _e, 2, 0)
							}
							oe = 0;
							le = 0
						} else if (t.head) {
							t.head.extra = null
						}
						t.mode = B;
					case B:
						if (t.flags & 1024) {
							ue = t.length;
							if (ue > ie) {
								ue = ie
							}
							if (ue) {
								if (t.head) {
									we = t.head.extra_len - t.length;
									if (!t.head.extra) {
										t.head.extra = new Array(t.head.extra_len)
									}
									n.arraySet(t.head.extra, ee, te, ue, we)
								}
								if (t.flags & 512) {
									t.check = i(t.check, ee, ue, te)
								}
								ie -= ue;
								te += ue;
								t.length -= ue
							}
							if (t.length) {
								break e
							}
						}
						t.length = 0;
						t.mode = T;
					case T:
						if (t.flags & 2048) {
							if (ie === 0) {
								break e
							}
							ue = 0;
							do {
								we = ee[te + ue++];
								if (t.head && we && t.length < 65536) {
									t.head.name += String.fromCharCode(we)
								}
							} while (we && ue < ie);
							if (t.flags & 512) {
								t.check = i(t.check, ee, ue, te)
							}
							ie -= ue;
							te += ue;
							if (we) {
								break e
							}
						} else if (t.head) {
							t.head.name = null
						}
						t.length = 0;
						t.mode = y;
					case y:
						if (t.flags & 4096) {
							if (ie === 0) {
								break e
							}
							ue = 0;
							do {
								we = ee[te + ue++];
								if (t.head && we && t.length < 65536) {
									t.head.comment += String.fromCharCode(we)
								}
							} while (we && ue < ie);
							if (t.flags & 512) {
								t.check = i(t.check, ee, ue, te)
							}
							ie -= ue;
							te += ue;
							if (we) {
								break e
							}
						} else if (t.head) {
							t.head.comment = null
						}
						t.mode = x;
					case x:
						if (t.flags & 512) {
							while (le < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							if (oe !== (t.check & 65535)) {
								e.msg = "header crc mismatch";
								t.mode = Q;
								break
							}
							oe = 0;
							le = 0
						}
						if (t.head) {
							t.head.hcrc = t.flags >> 9 & 1;
							t.head.done = true
						}
						e.adler = t.check = 0;
						t.mode = F;
						break;
					case I:
						while (le < 32) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						e.adler = t.check = ae(oe);
						oe = 0;
						le = 0;
						t.mode = D;
					case D:
						if (t.havedict === 0) {
							e.next_out = ne;
							e.avail_out = se;
							e.next_in = te;
							e.avail_in = ie;
							t.hold = oe;
							t.bits = le;
							return g
						}
						e.adler = t.check = 1;
						t.mode = F;
					case F:
						if (r === h || r === d) {
							break e
						};
					case O:
						if (t.last) {
							oe >>>= le & 7;
							le -= le & 7;
							t.mode = Y;
							break
						}
						while (le < 3) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						t.last = oe & 1;
						oe >>>= 1;
						le -= 1;
						switch (oe & 3) {
						case 0:
							t.mode = P;
							break;
						case 1:
							pe(t);
							t.mode = H;
							if (r === d) {
								oe >>>= 2;
								le -= 2;
								break e
							}
							break;
						case 2:
							t.mode = M;
							break;
						case 3:
							e.msg = "invalid block type";
							t.mode = Q
						}
						oe >>>= 2;
						le -= 2;
						break;
					case P:
						oe >>>= le & 7;
						le -= le & 7;
						while (le < 32) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if ((oe & 65535) !== (oe >>> 16 ^ 65535)) {
							e.msg = "invalid stored block lengths";
							t.mode = Q;
							break
						}
						t.length = oe & 65535;
						oe = 0;
						le = 0;
						t.mode = N;
						if (r === d) {
							break e
						};
					case N:
						t.mode = L;
					case L:
						ue = t.length;
						if (ue) {
							if (ue > ie) {
								ue = ie
							}
							if (ue > se) {
								ue = se
							}
							if (ue === 0) {
								break e
							}
							n.arraySet(re, ee, te, ue, ne);
							ie -= ue;
							te += ue;
							se -= ue;
							ne += ue;
							t.length -= ue;
							break
						}
						t.mode = F;
						break;
					case M:
						while (le < 14) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						t.nlen = (oe & 31) + 257;
						oe >>>= 5;
						le -= 5;
						t.ndist = (oe & 31) + 1;
						oe >>>= 5;
						le -= 5;
						t.ncode = (oe & 15) + 4;
						oe >>>= 4;
						le -= 4;
						if (t.nlen > 286 || t.ndist > 30) {
							e.msg = "too many length or distance symbols";
							t.mode = Q;
							break
						}
						t.have = 0;
						t.mode = W;
					case W:
						while (t.have < t.ncode) {
							while (le < 3) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.lens[Te[t.have++]] = oe & 7;
							oe >>>= 3;
							le -= 3
						}
						while (t.have < 19) {
							t.lens[Te[t.have++]] = 0
						}
						t.lencode = t.lendyn;
						t.lenbits = 7;
						Re = {
							bits: t.lenbits
						};
						Ae = o(l, t.lens, 0, 19, t.lencode, 0, t.work, Re);
						t.lenbits = Re.bits;
						if (Ae) {
							e.msg = "invalid code lengths set";
							t.mode = Q;
							break
						}
						t.have = 0;
						t.mode = U;
					case U:
						while (t.have < t.nlen + t.ndist) {
							for (;;) {
								ge = t.lencode[oe & (1 << t.lenbits) - 1];
								me = ge >>> 24;
								be = ge >>> 16 & 255;
								Ce = ge & 65535;
								if (me <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							if (Ce < 16) {
								oe >>>= me;
								le -= me;
								t.lens[t.have++] = Ce
							} else {
								if (Ce === 16) {
									Be = me + 2;
									while (le < Be) {
										if (ie === 0) {
											break e
										}
										ie--;
										oe += ee[te++] << le;
										le += 8
									}
									oe >>>= me;
									le -= me;
									if (t.have === 0) {
										e.msg = "invalid bit length repeat";
										t.mode = Q;
										break
									}
									we = t.lens[t.have - 1];
									ue = 3 + (oe & 3);
									oe >>>= 2;
									le -= 2
								} else if (Ce === 17) {
									Be = me + 3;
									while (le < Be) {
										if (ie === 0) {
											break e
										}
										ie--;
										oe += ee[te++] << le;
										le += 8
									}
									oe >>>= me;
									le -= me;
									we = 0;
									ue = 3 + (oe & 7);
									oe >>>= 3;
									le -= 3
								} else {
									Be = me + 7;
									while (le < Be) {
										if (ie === 0) {
											break e
										}
										ie--;
										oe += ee[te++] << le;
										le += 8
									}
									oe >>>= me;
									le -= me;
									we = 0;
									ue = 11 + (oe & 127);
									oe >>>= 7;
									le -= 7
								}
								if (t.have + ue > t.nlen + t.ndist) {
									e.msg = "invalid bit length repeat";
									t.mode = Q;
									break
								}
								while (ue--) {
									t.lens[t.have++] = we
								}
							}
						}
						if (t.mode === Q) {
							break
						}
						if (t.lens[256] === 0) {
							e.msg = "invalid code -- missing end-of-block";
							t.mode = Q;
							break
						}
						t.lenbits = 9;
						Re = {
							bits: t.lenbits
						};
						Ae = o(f, t.lens, 0, t.nlen, t.lencode, 0, t.work, Re);
						t.lenbits = Re.bits;
						if (Ae) {
							e.msg = "invalid literal/lengths set";
							t.mode = Q;
							break
						}
						t.distbits = 6;
						t.distcode = t.distdyn;
						Re = {
							bits: t.distbits
						};
						Ae = o(c, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, Re);
						t.distbits = Re.bits;
						if (Ae) {
							e.msg = "invalid distances set";
							t.mode = Q;
							break
						}
						t.mode = H;
						if (r === d) {
							break e
						};
					case H:
						t.mode = V;
					case V:
						if (ie >= 6 && se >= 258) {
							e.next_out = ne;
							e.avail_out = se;
							e.next_in = te;
							e.avail_in = ie;
							t.hold = oe;
							t.bits = le;
							s(e, ce);
							ne = e.next_out;
							re = e.output;
							se = e.avail_out;
							te = e.next_in;
							ee = e.input;
							ie = e.avail_in;
							oe = t.hold;
							le = t.bits;
							if (t.mode === F) {
								t.back = -1
							}
							break
						}
						t.back = 0;
						for (;;) {
							ge = t.lencode[oe & (1 << t.lenbits) - 1];
							me = ge >>> 24;
							be = ge >>> 16 & 255;
							Ce = ge & 65535;
							if (me <= le) {
								break
							}
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (be && (be & 240) === 0) {
							Ee = me;
							ke = be;
							Se = Ce;
							for (;;) {
								ge = t.lencode[Se + ((oe & (1 << Ee + ke) - 1) >> Ee)];
								me = ge >>> 24;
								be = ge >>> 16 & 255;
								Ce = ge & 65535;
								if (Ee + me <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							oe >>>= Ee;
							le -= Ee;
							t.back += Ee
						}
						oe >>>= me;
						le -= me;
						t.back += me;
						t.length = Ce;
						if (be === 0) {
							t.mode = K;
							break
						}
						if (be & 32) {
							t.back = -1;
							t.mode = F;
							break
						}
						if (be & 64) {
							e.msg = "invalid literal/length code";
							t.mode = Q;
							break
						}
						t.extra = be & 15;
						t.mode = z;
					case z:
						if (t.extra) {
							Be = t.extra;
							while (le < Be) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.length += oe & (1 << t.extra) - 1;
							oe >>>= t.extra;
							le -= t.extra;
							t.back += t.extra
						}
						t.was = t.length;
						t.mode = X;
					case X:
						for (;;) {
							ge = t.distcode[oe & (1 << t.distbits) - 1];
							me = ge >>> 24;
							be = ge >>> 16 & 255;
							Ce = ge & 65535;
							if (me <= le) {
								break
							}
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if ((be & 240) === 0) {
							Ee = me;
							ke = be;
							Se = Ce;
							for (;;) {
								ge = t.distcode[Se + ((oe & (1 << Ee + ke) - 1) >> Ee)];
								me = ge >>> 24;
								be = ge >>> 16 & 255;
								Ce = ge & 65535;
								if (Ee + me <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							oe >>>= Ee;
							le -= Ee;
							t.back += Ee
						}
						oe >>>= me;
						le -= me;
						t.back += me;
						if (be & 64) {
							e.msg = "invalid distance code";
							t.mode = Q;
							break
						}
						t.offset = Ce;
						t.extra = be & 15;
						t.mode = G;
					case G:
						if (t.extra) {
							Be = t.extra;
							while (le < Be) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.offset += oe & (1 << t.extra) - 1;
							oe >>>= t.extra;
							le -= t.extra;
							t.back += t.extra
						}
						if (t.offset > t.dmax) {
							e.msg = "invalid distance too far back";
							t.mode = Q;
							break
						}
						t.mode = j;
					case j:
						if (se === 0) {
							break e
						}
						ue = ce - se;
						if (t.offset > ue) {
							ue = t.offset - ue;
							if (ue > t.whave) {
								if (t.sane) {
									e.msg = "invalid distance too far back";
									t.mode = Q;
									break
								}
							}
							if (ue > t.wnext) {
								ue -= t.wnext;
								he = t.wsize - ue
							} else {
								he = t.wnext - ue
							}
							if (ue > t.length) {
								ue = t.length
							}
							de = t.window
						} else {
							de = re;
							he = ne - t.offset;
							ue = t.length
						}
						if (ue > se) {
							ue = se
						}
						se -= ue;
						t.length -= ue;
						do {
							re[ne++] = de[he++]
						} while (--ue);
						if (t.length === 0) {
							t.mode = V
						}
						break;
					case K:
						if (se === 0) {
							break e
						}
						re[ne++] = t.length;
						se--;
						t.mode = V;
						break;
					case Y:
						if (t.wrap) {
							while (le < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe |= ee[te++] << le;
								le += 8
							}
							ce -= se;
							e.total_out += ce;
							t.total += ce;
							if (ce) {
								e.adler = t.check = t.flags ? i(t.check, re, ce, ne - ce) : a(t.check, re, ce, ne - ce)
							}
							ce = se;
							if ((t.flags ? oe : ae(oe)) !== t.check) {
								e.msg = "incorrect data check";
								t.mode = Q;
								break
							}
							oe = 0;
							le = 0
						}
						t.mode = $;
					case $:
						if (t.wrap && t.flags) {
							while (le < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							if (oe !== (t.total & 4294967295)) {
								e.msg = "incorrect length check";
								t.mode = Q;
								break
							}
							oe = 0;
							le = 0
						}
						t.mode = Z;
					case Z:
						Ae = v;
						break e;
					case Q:
						Ae = b;
						break e;
					case J:
						return C;
					case q:
						;
					default:
						return m
					}
				}
				e.next_out = ne;
				e.avail_out = se;
				e.next_in = te;
				e.avail_in = ie;
				t.hold = oe;
				t.bits = le;
				if (t.wsize || ce !== e.avail_out && t.mode < Q && (t.mode < Y || r !== u)) {
					if (ve(e, e.output, e.next_out, ce - e.avail_out)) {
						t.mode = J;
						return C
					}
				}
				fe -= e.avail_in;
				ce -= e.avail_out;
				e.total_in += fe;
				e.total_out += ce;
				t.total += ce;
				if (t.wrap && ce) {
					e.adler = t.check = t.flags ? i(t.check, re, ce, e.next_out - ce) : a(t.check, re, ce, e.next_out - ce)
				}
				e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === F ? 128 : 0) + (t.mode === H || t.mode === N ? 256 : 0);
				if ((fe === 0 && ce === 0 || r === u) && Ae === p) {
					Ae = E
				}
				return Ae
			}

			function me(e) {
				if (!e || !e.state) {
					return m
				}
				var r = e.state;
				if (r.window) {
					r.window = null
				}
				e.state = null;
				return p
			}

			function be(e, r) {
				var t;
				if (!e || !e.state) {
					return m
				}
				t = e.state;
				if ((t.wrap & 2) === 0) {
					return m
				}
				t.head = r;
				r.done = false;
				return p
			}
			t.inflateReset = oe;
			t.inflateReset2 = le;
			t.inflateResetKeep = se;
			t.inflateInit = ce;
			t.inflateInit2 = fe;
			t.inflate = ge;
			t.inflateEnd = me;
			t.inflateGetHeader = be;
			t.inflateInfo = "pako inflate (from Nodeca project)"
		}, {
			"../utils/common": 27,
			"./adler32": 29,
			"./crc32": 31,
			"./inffast": 34,
			"./inftrees": 36
		}],
		36: [function (e, r, t) {
			"use strict";
			var n = e("../utils/common");
			var a = 15;
			var i = 852;
			var s = 592;
			var o = 0;
			var l = 1;
			var f = 2;
			var c = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
			var u = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
			var h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193,
				12289, 16385, 24577, 0, 0
			];
			var d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64,
				64
			];
			r.exports = function e(r, t, p, v, g, m, b, C) {
				var E = C.bits;
				var k = 0;
				var S = 0;
				var w = 0,
					A = 0;
				var _ = 0;
				var R = 0;
				var B = 0;
				var T = 0;
				var y = 0;
				var x = 0;
				var I;
				var D;
				var F;
				var O;
				var P;
				var N = null;
				var L = 0;
				var M;
				var W = new n.Buf16(a + 1);
				var U = new n.Buf16(a + 1);
				var H = null;
				var V = 0;
				var z, X, G;
				for (k = 0; k <= a; k++) {
					W[k] = 0
				}
				for (S = 0; S < v; S++) {
					W[t[p + S]]++
				}
				_ = E;
				for (A = a; A >= 1; A--) {
					if (W[A] !== 0) {
						break
					}
				}
				if (_ > A) {
					_ = A
				}
				if (A === 0) {
					g[m++] = 1 << 24 | 64 << 16 | 0;
					g[m++] = 1 << 24 | 64 << 16 | 0;
					C.bits = 1;
					return 0
				}
				for (w = 1; w < A; w++) {
					if (W[w] !== 0) {
						break
					}
				}
				if (_ < w) {
					_ = w
				}
				T = 1;
				for (k = 1; k <= a; k++) {
					T <<= 1;
					T -= W[k];
					if (T < 0) {
						return -1
					}
				}
				if (T > 0 && (r === o || A !== 1)) {
					return -1
				}
				U[1] = 0;
				for (k = 1; k < a; k++) {
					U[k + 1] = U[k] + W[k]
				}
				for (S = 0; S < v; S++) {
					if (t[p + S] !== 0) {
						b[U[t[p + S]]++] = S
					}
				}
				if (r === o) {
					N = H = b;
					M = 19
				} else if (r === l) {
					N = c;
					L -= 257;
					H = u;
					V -= 257;
					M = 256
				} else {
					N = h;
					H = d;
					M = -1
				}
				x = 0;
				S = 0;
				k = w;
				P = m;
				R = _;
				B = 0;
				F = -1;
				y = 1 << _;
				O = y - 1;
				if (r === l && y > i || r === f && y > s) {
					return 1
				}
				var j = 0;
				for (;;) {
					j++;
					z = k - B;
					if (b[S] < M) {
						X = 0;
						G = b[S]
					} else if (b[S] > M) {
						X = H[V + b[S]];
						G = N[L + b[S]]
					} else {
						X = 32 + 64;
						G = 0
					}
					I = 1 << k - B;
					D = 1 << R;
					w = D;
					do {
						D -= I;
						g[P + (x >> B) + D] = z << 24 | X << 16 | G | 0
					} while (D !== 0);
					I = 1 << k - 1;
					while (x & I) {
						I >>= 1
					}
					if (I !== 0) {
						x &= I - 1;
						x += I
					} else {
						x = 0
					}
					S++;
					if (--W[k] === 0) {
						if (k === A) {
							break
						}
						k = t[p + b[S]]
					}
					if (k > _ && (x & O) !== F) {
						if (B === 0) {
							B = _
						}
						P += w;
						R = k - B;
						T = 1 << R;
						while (R + B < A) {
							T -= W[R + B];
							if (T <= 0) {
								break
							}
							R++;
							T <<= 1
						}
						y += 1 << R;
						if (r === l && y > i || r === f && y > s) {
							return 1
						}
						F = x & O;
						g[F] = _ << 24 | R << 16 | P - m | 0
					}
				}
				if (x !== 0) {
					g[P + x] = k - B << 24 | 64 << 16 | 0
				}
				C.bits = _;
				return 0
			}
		}, {
			"../utils/common": 27
		}],
		37: [function (e, r, t) {
			"use strict";
			r.exports = {
				2: "need dictionary",
				1: "stream end",
				0: "",
				"-1": "file error",
				"-2": "stream error",
				"-3": "data error",
				"-4": "insufficient memory",
				"-5": "buffer error",
				"-6": "incompatible version"
			}
		}, {}],
		38: [function (e, r, t) {
			"use strict";
			var n = e("../utils/common");
			var a = 4;
			var i = 0;
			var s = 1;
			var o = 2;

			function l(e) {
				var r = e.length;
				while (--r >= 0) {
					e[r] = 0
				}
			}
			var f = 0;
			var c = 1;
			var u = 2;
			var h = 3;
			var d = 258;
			var p = 29;
			var v = 256;
			var g = v + 1 + p;
			var m = 30;
			var b = 19;
			var C = 2 * g + 1;
			var E = 15;
			var k = 16;
			var S = 7;
			var w = 256;
			var A = 16;
			var _ = 17;
			var R = 18;
			var B = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
			var T = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
			var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
			var x = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
			var I = 512;
			var D = new Array((g + 2) * 2);
			l(D);
			var F = new Array(m * 2);
			l(F);
			var O = new Array(I);
			l(O);
			var P = new Array(d - h + 1);
			l(P);
			var N = new Array(p);
			l(N);
			var L = new Array(m);
			l(L);
			var M = function (e, r, t, n, a) {
				this.static_tree = e;
				this.extra_bits = r;
				this.extra_base = t;
				this.elems = n;
				this.max_length = a;
				this.has_stree = e && e.length
			};
			var W;
			var U;
			var H;
			var V = function (e, r) {
				this.dyn_tree = e;
				this.max_code = 0;
				this.stat_desc = r
			};

			function z(e) {
				return e < 256 ? O[e] : O[256 + (e >>> 7)]
			}

			function X(e, r) {
				e.pending_buf[e.pending++] = r & 255;
				e.pending_buf[e.pending++] = r >>> 8 & 255
			}

			function G(e, r, t) {
				if (e.bi_valid > k - t) {
					e.bi_buf |= r << e.bi_valid & 65535;
					X(e, e.bi_buf);
					e.bi_buf = r >> k - e.bi_valid;
					e.bi_valid += t - k
				} else {
					e.bi_buf |= r << e.bi_valid & 65535;
					e.bi_valid += t
				}
			}

			function j(e, r, t) {
				G(e, t[r * 2], t[r * 2 + 1])
			}

			function K(e, r) {
				var t = 0;
				do {
					t |= e & 1;
					e >>>= 1;
					t <<= 1
				} while (--r > 0);
				return t >>> 1
			}

			function Y(e) {
				if (e.bi_valid === 16) {
					X(e, e.bi_buf);
					e.bi_buf = 0;
					e.bi_valid = 0
				} else if (e.bi_valid >= 8) {
					e.pending_buf[e.pending++] = e.bi_buf & 255;
					e.bi_buf >>= 8;
					e.bi_valid -= 8
				}
			}

			function $(e, r) {
				var t = r.dyn_tree;
				var n = r.max_code;
				var a = r.stat_desc.static_tree;
				var i = r.stat_desc.has_stree;
				var s = r.stat_desc.extra_bits;
				var o = r.stat_desc.extra_base;
				var l = r.stat_desc.max_length;
				var f;
				var c, u;
				var h;
				var d;
				var p;
				var v = 0;
				for (h = 0; h <= E; h++) {
					e.bl_count[h] = 0
				}
				t[e.heap[e.heap_max] * 2 + 1] = 0;
				for (f = e.heap_max + 1; f < C; f++) {
					c = e.heap[f];
					h = t[t[c * 2 + 1] * 2 + 1] + 1;
					if (h > l) {
						h = l;
						v++
					}
					t[c * 2 + 1] = h;
					if (c > n) {
						continue
					}
					e.bl_count[h]++;
					d = 0;
					if (c >= o) {
						d = s[c - o]
					}
					p = t[c * 2];
					e.opt_len += p * (h + d);
					if (i) {
						e.static_len += p * (a[c * 2 + 1] + d)
					}
				}
				if (v === 0) {
					return
				}
				do {
					h = l - 1;
					while (e.bl_count[h] === 0) {
						h--
					}
					e.bl_count[h]--;
					e.bl_count[h + 1] += 2;
					e.bl_count[l]--;
					v -= 2
				} while (v > 0);
				for (h = l; h !== 0; h--) {
					c = e.bl_count[h];
					while (c !== 0) {
						u = e.heap[--f];
						if (u > n) {
							continue
						}
						if (t[u * 2 + 1] !== h) {
							e.opt_len += (h - t[u * 2 + 1]) * t[u * 2];
							t[u * 2 + 1] = h
						}
						c--
					}
				}
			}

			function Z(e, r, t) {
				var n = new Array(E + 1);
				var a = 0;
				var i;
				var s;
				for (i = 1; i <= E; i++) {
					n[i] = a = a + t[i - 1] << 1
				}
				for (s = 0; s <= r; s++) {
					var o = e[s * 2 + 1];
					if (o === 0) {
						continue
					}
					e[s * 2] = K(n[o]++, o)
				}
			}

			function Q() {
				var e;
				var r;
				var t;
				var n;
				var a;
				var i = new Array(E + 1);
				t = 0;
				for (n = 0; n < p - 1; n++) {
					N[n] = t;
					for (e = 0; e < 1 << B[n]; e++) {
						P[t++] = n
					}
				}
				P[t - 1] = n;
				a = 0;
				for (n = 0; n < 16; n++) {
					L[n] = a;
					for (e = 0; e < 1 << T[n]; e++) {
						O[a++] = n
					}
				}
				a >>= 7;
				for (; n < m; n++) {
					L[n] = a << 7;
					for (e = 0; e < 1 << T[n] - 7; e++) {
						O[256 + a++] = n
					}
				}
				for (r = 0; r <= E; r++) {
					i[r] = 0
				}
				e = 0;
				while (e <= 143) {
					D[e * 2 + 1] = 8;
					e++;
					i[8]++
				}
				while (e <= 255) {
					D[e * 2 + 1] = 9;
					e++;
					i[9]++
				}
				while (e <= 279) {
					D[e * 2 + 1] = 7;
					e++;
					i[7]++
				}
				while (e <= 287) {
					D[e * 2 + 1] = 8;
					e++;
					i[8]++
				}
				Z(D, g + 1, i);
				for (e = 0; e < m; e++) {
					F[e * 2 + 1] = 5;
					F[e * 2] = K(e, 5)
				}
				W = new M(D, B, v + 1, g, E);
				U = new M(F, T, 0, m, E);
				H = new M(new Array(0), y, 0, b, S)
			}

			function J(e) {
				var r;
				for (r = 0; r < g; r++) {
					e.dyn_ltree[r * 2] = 0
				}
				for (r = 0; r < m; r++) {
					e.dyn_dtree[r * 2] = 0
				}
				for (r = 0; r < b; r++) {
					e.bl_tree[r * 2] = 0
				}
				e.dyn_ltree[w * 2] = 1;
				e.opt_len = e.static_len = 0;
				e.last_lit = e.matches = 0
			}

			function q(e) {
				if (e.bi_valid > 8) {
					X(e, e.bi_buf)
				} else if (e.bi_valid > 0) {
					e.pending_buf[e.pending++] = e.bi_buf
				}
				e.bi_buf = 0;
				e.bi_valid = 0
			}

			function ee(e, r, t, a) {
				q(e);
				if (a) {
					X(e, t);
					X(e, ~t)
				}
				n.arraySet(e.pending_buf, e.window, r, t, e.pending);
				e.pending += t
			}

			function re(e, r, t, n) {
				var a = r * 2;
				var i = t * 2;
				return e[a] < e[i] || e[a] === e[i] && n[r] <= n[t]
			}

			function te(e, r, t) {
				var n = e.heap[t];
				var a = t << 1;
				while (a <= e.heap_len) {
					if (a < e.heap_len && re(r, e.heap[a + 1], e.heap[a], e.depth)) {
						a++
					}
					if (re(r, n, e.heap[a], e.depth)) {
						break
					}
					e.heap[t] = e.heap[a];
					t = a;
					a <<= 1
				}
				e.heap[t] = n
			}

			function ne(e, r, t) {
				var n;
				var a;
				var i = 0;
				var s;
				var o;
				if (e.last_lit !== 0) {
					do {
						n = e.pending_buf[e.d_buf + i * 2] << 8 | e.pending_buf[e.d_buf + i * 2 + 1];
						a = e.pending_buf[e.l_buf + i];
						i++;
						if (n === 0) {
							j(e, a, r)
						} else {
							s = P[a];
							j(e, s + v + 1, r);
							o = B[s];
							if (o !== 0) {
								a -= N[s];
								G(e, a, o)
							}
							n--;
							s = z(n);
							j(e, s, t);
							o = T[s];
							if (o !== 0) {
								n -= L[s];
								G(e, n, o)
							}
						}
					} while (i < e.last_lit)
				}
				j(e, w, r)
			}

			function ae(e, r) {
				var t = r.dyn_tree;
				var n = r.stat_desc.static_tree;
				var a = r.stat_desc.has_stree;
				var i = r.stat_desc.elems;
				var s, o;
				var l = -1;
				var f;
				e.heap_len = 0;
				e.heap_max = C;
				for (s = 0; s < i; s++) {
					if (t[s * 2] !== 0) {
						e.heap[++e.heap_len] = l = s;
						e.depth[s] = 0
					} else {
						t[s * 2 + 1] = 0
					}
				}
				while (e.heap_len < 2) {
					f = e.heap[++e.heap_len] = l < 2 ? ++l : 0;
					t[f * 2] = 1;
					e.depth[f] = 0;
					e.opt_len--;
					if (a) {
						e.static_len -= n[f * 2 + 1]
					}
				}
				r.max_code = l;
				for (s = e.heap_len >> 1; s >= 1; s--) {
					te(e, t, s)
				}
				f = i;
				do {
					s = e.heap[1];
					e.heap[1] = e.heap[e.heap_len--];
					te(e, t, 1);
					o = e.heap[1];
					e.heap[--e.heap_max] = s;
					e.heap[--e.heap_max] = o;
					t[f * 2] = t[s * 2] + t[o * 2];
					e.depth[f] = (e.depth[s] >= e.depth[o] ? e.depth[s] : e.depth[o]) + 1;
					t[s * 2 + 1] = t[o * 2 + 1] = f;
					e.heap[1] = f++;
					te(e, t, 1)
				} while (e.heap_len >= 2);
				e.heap[--e.heap_max] = e.heap[1];
				$(e, r);
				Z(t, l, e.bl_count)
			}

			function ie(e, r, t) {
				var n;
				var a = -1;
				var i;
				var s = r[0 * 2 + 1];
				var o = 0;
				var l = 7;
				var f = 4;
				if (s === 0) {
					l = 138;
					f = 3
				}
				r[(t + 1) * 2 + 1] = 65535;
				for (n = 0; n <= t; n++) {
					i = s;
					s = r[(n + 1) * 2 + 1];
					if (++o < l && i === s) {
						continue
					} else if (o < f) {
						e.bl_tree[i * 2] += o
					} else if (i !== 0) {
						if (i !== a) {
							e.bl_tree[i * 2]++
						}
						e.bl_tree[A * 2]++
					} else if (o <= 10) {
						e.bl_tree[_ * 2]++
					} else {
						e.bl_tree[R * 2]++
					}
					o = 0;
					a = i;
					if (s === 0) {
						l = 138;
						f = 3
					} else if (i === s) {
						l = 6;
						f = 3
					} else {
						l = 7;
						f = 4
					}
				}
			}

			function se(e, r, t) {
				var n;
				var a = -1;
				var i;
				var s = r[0 * 2 + 1];
				var o = 0;
				var l = 7;
				var f = 4;
				if (s === 0) {
					l = 138;
					f = 3
				}
				for (n = 0; n <= t; n++) {
					i = s;
					s = r[(n + 1) * 2 + 1];
					if (++o < l && i === s) {
						continue
					} else if (o < f) {
						do {
							j(e, i, e.bl_tree)
						} while (--o !== 0)
					} else if (i !== 0) {
						if (i !== a) {
							j(e, i, e.bl_tree);
							o--
						}
						j(e, A, e.bl_tree);
						G(e, o - 3, 2)
					} else if (o <= 10) {
						j(e, _, e.bl_tree);
						G(e, o - 3, 3)
					} else {
						j(e, R, e.bl_tree);
						G(e, o - 11, 7)
					}
					o = 0;
					a = i;
					if (s === 0) {
						l = 138;
						f = 3
					} else if (i === s) {
						l = 6;
						f = 3
					} else {
						l = 7;
						f = 4
					}
				}
			}

			function oe(e) {
				var r;
				ie(e, e.dyn_ltree, e.l_desc.max_code);
				ie(e, e.dyn_dtree, e.d_desc.max_code);
				ae(e, e.bl_desc);
				for (r = b - 1; r >= 3; r--) {
					if (e.bl_tree[x[r] * 2 + 1] !== 0) {
						break
					}
				}
				e.opt_len += 3 * (r + 1) + 5 + 5 + 4;
				return r
			}

			function le(e, r, t, n) {
				var a;
				G(e, r - 257, 5);
				G(e, t - 1, 5);
				G(e, n - 4, 4);
				for (a = 0; a < n; a++) {
					G(e, e.bl_tree[x[a] * 2 + 1], 3)
				}
				se(e, e.dyn_ltree, r - 1);
				se(e, e.dyn_dtree, t - 1)
			}

			function fe(e) {
				var r = 4093624447;
				var t;
				for (t = 0; t <= 31; t++, r >>>= 1) {
					if (r & 1 && e.dyn_ltree[t * 2] !== 0) {
						return i
					}
				}
				if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0) {
					return s
				}
				for (t = 32; t < v; t++) {
					if (e.dyn_ltree[t * 2] !== 0) {
						return s
					}
				}
				return i
			}
			var ce = false;

			function ue(e) {
				if (!ce) {
					Q();
					ce = true
				}
				e.l_desc = new V(e.dyn_ltree, W);
				e.d_desc = new V(e.dyn_dtree, U);
				e.bl_desc = new V(e.bl_tree, H);
				e.bi_buf = 0;
				e.bi_valid = 0;
				J(e)
			}

			function he(e, r, t, n) {
				G(e, (f << 1) + (n ? 1 : 0), 3);
				ee(e, r, t, true)
			}

			function de(e) {
				G(e, c << 1, 3);
				j(e, w, D);
				Y(e)
			}

			function pe(e, r, t, n) {
				var i, s;
				var l = 0;
				if (e.level > 0) {
					if (e.strm.data_type === o) {
						e.strm.data_type = fe(e)
					}
					ae(e, e.l_desc);
					ae(e, e.d_desc);
					l = oe(e);
					i = e.opt_len + 3 + 7 >>> 3;
					s = e.static_len + 3 + 7 >>> 3;
					if (s <= i) {
						i = s
					}
				} else {
					i = s = t + 5
				}
				if (t + 4 <= i && r !== -1) {
					he(e, r, t, n)
				} else if (e.strategy === a || s === i) {
					G(e, (c << 1) + (n ? 1 : 0), 3);
					ne(e, D, F)
				} else {
					G(e, (u << 1) + (n ? 1 : 0), 3);
					le(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1);
					ne(e, e.dyn_ltree, e.dyn_dtree)
				}
				J(e);
				if (n) {
					q(e)
				}
			}

			function ve(e, r, t) {
				e.pending_buf[e.d_buf + e.last_lit * 2] = r >>> 8 & 255;
				e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = r & 255;
				e.pending_buf[e.l_buf + e.last_lit] = t & 255;
				e.last_lit++;
				if (r === 0) {
					e.dyn_ltree[t * 2]++
				} else {
					e.matches++;
					r--;
					e.dyn_ltree[(P[t] + v + 1) * 2]++;
					e.dyn_dtree[z(r) * 2]++
				}
				return e.last_lit === e.lit_bufsize - 1
			}
			t._tr_init = ue;
			t._tr_stored_block = he;
			t._tr_flush_block = pe;
			t._tr_tally = ve;
			t._tr_align = de
		}, {
			"../utils/common": 27
		}],
		39: [function (e, r, t) {
			"use strict";

			function n() {
				this.input = null;
				this.next_in = 0;
				this.avail_in = 0;
				this.total_in = 0;
				this.output = null;
				this.next_out = 0;
				this.avail_out = 0;
				this.total_out = 0;
				this.msg = "";
				this.state = null;
				this.data_type = 2;
				this.adler = 0
			}
			r.exports = n
		}, {}]
	}, {}, [9])(9)
});
var cptable = {
	version: "1.14.0"
};
cptable[437] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã‡Ã¼Ã©Ã¢Ã¤Ã Ã¥Ã§ÃªÃ«Ã¨Ã¯Ã®Ã¬Ã„Ã…Ã‰Ã¦Ã†Ã´Ã¶Ã²Ã»Ã¹Ã¿Ã–ÃœÂ¢Â£Â¥â‚§Æ’Ã¡Ã­Ã³ÃºÃ±Ã‘ÂªÂºÂ¿âŒÂ¬Â½Â¼Â¡Â«Â»â–‘â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜â”Œâ–ˆâ–„â–Œâ–â–€Î±ÃŸÎ“Ï€Î£ÏƒÂµÏ„Î¦Î˜Î©Î´âˆžÏ†Îµâˆ©â‰¡Â±â‰¥â‰¤âŒ âŒ¡Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[620] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã‡Ã¼Ã©Ã¢Ã¤Ã Ä…Ã§ÃªÃ«Ã¨Ã¯Ã®Ä‡Ã„Ä„Ä˜Ä™Å‚Ã´Ã¶Ä†Ã»Ã¹ÅšÃ–ÃœÂ¢ÅÂ¥Å›Æ’Å¹Å»Ã³Ã“Å„ÅƒÅºÅ¼Â¿âŒÂ¬Â½Â¼Â¡Â«Â»â–‘â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜â”Œâ–ˆâ–„â–Œâ–â–€Î±ÃŸÎ“Ï€Î£ÏƒÂµÏ„Î¦Î˜Î©Î´âˆžÏ†Îµâˆ©â‰¡Â±â‰¥â‰¤âŒ âŒ¡Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[737] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Î‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡Î£Î¤Î¥Î¦Î§Î¨Î©Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ‚Ï„Ï…Ï†Ï‡Ïˆâ–‘â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜â”Œâ–ˆâ–„â–Œâ–â–€Ï‰Î¬Î­Î®ÏŠÎ¯ÏŒÏÏ‹ÏŽÎ†ÎˆÎ‰ÎŠÎŒÎŽÎÂ±â‰¥â‰¤ÎªÎ«Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[850] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã‡Ã¼Ã©Ã¢Ã¤Ã Ã¥Ã§ÃªÃ«Ã¨Ã¯Ã®Ã¬Ã„Ã…Ã‰Ã¦Ã†Ã´Ã¶Ã²Ã»Ã¹Ã¿Ã–ÃœÃ¸Â£Ã˜Ã—Æ’Ã¡Ã­Ã³ÃºÃ±Ã‘ÂªÂºÂ¿Â®Â¬Â½Â¼Â¡Â«Â»â–‘â–’â–“â”‚â”¤ÃÃ‚Ã€Â©â•£â•‘â•—â•Â¢Â¥â”â””â”´â”¬â”œâ”€â”¼Ã£Ãƒâ•šâ•”â•©â•¦â• â•â•¬Â¤Ã°ÃÃŠÃ‹ÃˆÄ±ÃÃŽÃâ”˜â”Œâ–ˆâ–„Â¦ÃŒâ–€Ã“ÃŸÃ”Ã’ÃµÃ•ÂµÃ¾ÃžÃšÃ›Ã™Ã½ÃÂ¯Â´Â­Â±â€—Â¾Â¶Â§Ã·Â¸Â°Â¨Â·Â¹Â³Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[852] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã‡Ã¼Ã©Ã¢Ã¤Å¯Ä‡Ã§Å‚Ã«ÅÅ‘Ã®Å¹Ã„Ä†Ã‰Ä¹ÄºÃ´Ã¶Ä½Ä¾ÅšÅ›Ã–ÃœÅ¤Å¥ÅÃ—ÄÃ¡Ã­Ã³ÃºÄ„Ä…Å½Å¾Ä˜Ä™Â¬ÅºÄŒÅŸÂ«Â»â–‘â–’â–“â”‚â”¤ÃÃ‚ÄšÅžâ•£â•‘â•—â•Å»Å¼â”â””â”´â”¬â”œâ”€â”¼Ä‚Äƒâ•šâ•”â•©â•¦â• â•â•¬Â¤Ä‘ÄÄŽÃ‹ÄÅ‡ÃÃŽÄ›â”˜â”Œâ–ˆâ–„Å¢Å®â–€Ã“ÃŸÃ”ÅƒÅ„ÅˆÅ Å¡Å”ÃšÅ•Å°Ã½ÃÅ£Â´Â­ËË›Ë‡Ë˜Â§Ã·Â¸Â°Â¨Ë™Å±Å˜Å™â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[857] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã‡Ã¼Ã©Ã¢Ã¤Ã Ã¥Ã§ÃªÃ«Ã¨Ã¯Ã®Ä±Ã„Ã…Ã‰Ã¦Ã†Ã´Ã¶Ã²Ã»Ã¹Ä°Ã–ÃœÃ¸Â£Ã˜ÅžÅŸÃ¡Ã­Ã³ÃºÃ±Ã‘ÄžÄŸÂ¿Â®Â¬Â½Â¼Â¡Â«Â»â–‘â–’â–“â”‚â”¤ÃÃ‚Ã€Â©â•£â•‘â•—â•Â¢Â¥â”â””â”´â”¬â”œâ”€â”¼Ã£Ãƒâ•šâ•”â•©â•¦â• â•â•¬Â¤ÂºÂªÃŠÃ‹Ãˆï¿½ÃÃŽÃâ”˜â”Œâ–ˆâ–„Â¦ÃŒâ–€Ã“ÃŸÃ”Ã’ÃµÃ•Âµï¿½Ã—ÃšÃ›Ã™Ã¬Ã¿Â¯Â´Â­Â±ï¿½Â¾Â¶Â§Ã·Â¸Â°Â¨Â·Â¹Â³Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[861] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã‡Ã¼Ã©Ã¢Ã¤Ã Ã¥Ã§ÃªÃ«Ã¨ÃÃ°ÃžÃ„Ã…Ã‰Ã¦Ã†Ã´Ã¶Ã¾Ã»ÃÃ½Ã–ÃœÃ¸Â£Ã˜â‚§Æ’Ã¡Ã­Ã³ÃºÃÃÃ“ÃšÂ¿âŒÂ¬Â½Â¼Â¡Â«Â»â–‘â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜â”Œâ–ˆâ–„â–Œâ–â–€Î±ÃŸÎ“Ï€Î£ÏƒÂµÏ„Î¦Î˜Î©Î´âˆžÏ†Îµâˆ©â‰¡Â±â‰¥â‰¤âŒ âŒ¡Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[865] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã‡Ã¼Ã©Ã¢Ã¤Ã Ã¥Ã§ÃªÃ«Ã¨Ã¯Ã®Ã¬Ã„Ã…Ã‰Ã¦Ã†Ã´Ã¶Ã²Ã»Ã¹Ã¿Ã–ÃœÃ¸Â£Ã˜â‚§Æ’Ã¡Ã­Ã³ÃºÃ±Ã‘ÂªÂºÂ¿âŒÂ¬Â½Â¼Â¡Â«Â¤â–‘â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜â”Œâ–ˆâ–„â–Œâ–â–€Î±ÃŸÎ“Ï€Î£Ïƒï¿½ï¿½Ï„Î¦Î˜Î©Î´âˆžÏ†Îµâˆ©â‰¡Â±â‰¥â‰¤âŒ âŒ¡Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[866] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÐÐ‘Ð’Ð“Ð”Ð•Ð–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯Ð°Ð±Ð²Ð³Ð´ÐµÐ¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿â–‘â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜â”Œâ–ˆâ–„â–Œâ–â–€Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÑÐÑ‘Ð„Ñ”Ð‡Ñ—ÐŽÑžÂ°âˆ™Â·âˆšâ„–Â¤â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[874] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½ï¿½ï¿½ï¿½â€¦ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â€˜â€™â€œâ€â€¢â€“â€”ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ à¸à¸‚à¸ƒà¸„à¸…à¸†à¸‡à¸ˆà¸‰à¸Šà¸‹à¸Œà¸à¸Žà¸à¸à¸‘à¸’à¸“à¸”à¸•à¸–à¸—à¸˜à¸™à¸šà¸›à¸œà¸à¸žà¸Ÿà¸ à¸¡à¸¢à¸£à¸¤à¸¥à¸¦à¸§à¸¨à¸©à¸ªà¸«à¸¬à¸­à¸®à¸¯à¸°à¸±à¸²à¸³à¸´à¸µà¸¶à¸·à¸¸à¸¹à¸ºï¿½ï¿½ï¿½ï¿½à¸¿à¹€à¹à¹‚à¹ƒà¹„à¹…à¹†à¹‡à¹ˆà¹‰à¹Šà¹‹à¹Œà¹à¹Žà¹à¹à¹‘à¹’à¹“à¹”à¹•à¹–à¹—à¹˜à¹™à¹šà¹›ï¿½ï¿½ï¿½ï¿½",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[895] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄŒÃ¼Ã©ÄÃ¤ÄŽÅ¤ÄÄ›ÄšÄ¹ÃÄ¾ÇªÃ„ÃÃ‰Å¾Å½Ã´Ã¶Ã“Å¯ÃšÃ½Ã–ÃœÅ Ä½ÃÅ˜Å¥Ã¡Ã­Ã³ÃºÅˆÅ‡Å®Ã”Å¡Å™Å•Å”Â¼Â§Â«Â»â–‘â–’â–“â”‚â”¤â•¡â•¢â•–â••â•£â•‘â•—â•â•œâ•›â”â””â”´â”¬â”œâ”€â”¼â•žâ•Ÿâ•šâ•”â•©â•¦â• â•â•¬â•§â•¨â•¤â•¥â•™â•˜â•’â•“â•«â•ªâ”˜â”Œâ–ˆâ–„â–Œâ–â–€Î±ÃŸÎ“Ï€Î£ÏƒÂµÏ„Î¦Î˜Î©Î´âˆžÏ†Îµâˆ©â‰¡Â±â‰¥â‰¤âŒ âŒ¡Ã·â‰ˆÂ°âˆ™Â·âˆšâ¿Â²â–  ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[932] = function () {
	var e = [],
		r = {},
		t = [],
		n;
	t[0] =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï½¡ï½¢ï½£ï½¤ï½¥ï½¦ï½§ï½¨ï½©ï½ªï½«ï½¬ï½­ï½®ï½¯ï½°ï½±ï½²ï½³ï½´ï½µï½¶ï½·ï½¸ï½¹ï½ºï½»ï½¼ï½½ï½¾ï½¿ï¾€ï¾ï¾‚ï¾ƒï¾„ï¾…ï¾†ï¾‡ï¾ˆï¾‰ï¾Šï¾‹ï¾Œï¾ï¾Žï¾ï¾ï¾‘ï¾’ï¾“ï¾”ï¾•ï¾–ï¾—ï¾˜ï¾™ï¾šï¾›ï¾œï¾ï¾žï¾Ÿï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[0].length; ++n)
		if (t[0][n].charCodeAt(0) !== 65533) {
			r[t[0][n]] = 0 + n;
			e[0 + n] = t[0][n]
		}
	t[129] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã€€ã€ã€‚ï¼Œï¼Žãƒ»ï¼šï¼›ï¼Ÿï¼ã‚›ã‚œÂ´ï½€Â¨ï¼¾ï¿£ï¼¿ãƒ½ãƒ¾ã‚ã‚žã€ƒä»ã€…ã€†ã€‡ãƒ¼â€•â€ï¼ï¼¼ï½žâˆ¥ï½œâ€¦â€¥â€˜â€™â€œâ€ï¼ˆï¼‰ã€”ã€•ï¼»ï¼½ï½›ï½ã€ˆã€‰ã€Šã€‹ã€Œã€ã€Žã€ã€ã€‘ï¼‹ï¼Â±Ã—ï¿½Ã·ï¼â‰ ï¼œï¼žâ‰¦â‰§âˆžâˆ´â™‚â™€Â°â€²â€³â„ƒï¿¥ï¼„ï¿ ï¿¡ï¼…ï¼ƒï¼†ï¼Šï¼ Â§â˜†â˜…â—‹â—â—Žâ—‡â—†â–¡â– â–³â–²â–½â–¼â€»ã€’â†’â†â†‘â†“ã€“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½âˆˆâˆ‹âŠ†âŠ‡âŠ‚âŠƒâˆªâˆ©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½âˆ§âˆ¨ï¿¢â‡’â‡”âˆ€âˆƒï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½âˆ âŠ¥âŒ’âˆ‚âˆ‡â‰¡â‰’â‰ªâ‰«âˆšâˆ½âˆâˆµâˆ«âˆ¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â„«â€°â™¯â™­â™ªâ€ â€¡Â¶ï¿½ï¿½ï¿½ï¿½â—¯ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[129].length; ++n)
		if (t[129][n].charCodeAt(0) !== 65533) {
			r[t[129][n]] = 33024 + n;
			e[33024 + n] = t[129][n]
		}
	t[130] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¼ï¼‘ï¼’ï¼“ï¼”ï¼•ï¼–ï¼—ï¼˜ï¼™ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¼¡ï¼¢ï¼£ï¼¤ï¼¥ï¼¦ï¼§ï¼¨ï¼©ï¼ªï¼«ï¼¬ï¼­ï¼®ï¼¯ï¼°ï¼±ï¼²ï¼³ï¼´ï¼µï¼¶ï¼·ï¼¸ï¼¹ï¼ºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï½ï½‚ï½ƒï½„ï½…ï½†ï½‡ï½ˆï½‰ï½Šï½‹ï½Œï½ï½Žï½ï½ï½‘ï½’ï½“ï½”ï½•ï½–ï½—ï½˜ï½™ï½šï¿½ï¿½ï¿½ï¿½ãã‚ãƒã„ã…ã†ã‡ãˆã‰ãŠã‹ãŒããŽããã‘ã’ã“ã”ã•ã–ã—ã˜ã™ãšã›ãœããžãŸã ã¡ã¢ã£ã¤ã¥ã¦ã§ã¨ã©ãªã«ã¬ã­ã®ã¯ã°ã±ã²ã³ã´ãµã¶ã·ã¸ã¹ãºã»ã¼ã½ã¾ã¿ã‚€ã‚ã‚‚ã‚ƒã‚„ã‚…ã‚†ã‚‡ã‚ˆã‚‰ã‚Šã‚‹ã‚Œã‚ã‚Žã‚ã‚ã‚‘ã‚’ã‚“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[130].length; ++n)
		if (t[130][n].charCodeAt(0) !== 65533) {
			r[t[130][n]] = 33280 + n;
			e[33280 + n] = t[130][n]
		}
	t[131] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã‚¡ã‚¢ã‚£ã‚¤ã‚¥ã‚¦ã‚§ã‚¨ã‚©ã‚ªã‚«ã‚¬ã‚­ã‚®ã‚¯ã‚°ã‚±ã‚²ã‚³ã‚´ã‚µã‚¶ã‚·ã‚¸ã‚¹ã‚ºã‚»ã‚¼ã‚½ã‚¾ã‚¿ãƒ€ãƒãƒ‚ãƒƒãƒ„ãƒ…ãƒ†ãƒ‡ãƒˆãƒ‰ãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒãƒ‘ãƒ’ãƒ“ãƒ”ãƒ•ãƒ–ãƒ—ãƒ˜ãƒ™ãƒšãƒ›ãƒœãƒãƒžãƒŸï¿½ãƒ ãƒ¡ãƒ¢ãƒ£ãƒ¤ãƒ¥ãƒ¦ãƒ§ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ®ãƒ¯ãƒ°ãƒ±ãƒ²ãƒ³ãƒ´ãƒµãƒ¶ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡Î£Î¤Î¥Î¦Î§Î¨Î©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[131].length; ++n)
		if (t[131][n].charCodeAt(0) !== 65533) {
			r[t[131][n]] = 33536 + n;
			e[33536 + n] = t[131][n]
		}
	t[132] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ÐÐ‘Ð’Ð“Ð”Ð•ÐÐ–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ð°Ð±Ð²Ð³Ð´ÐµÑ‘Ð¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½ï¿½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÑï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â”€â”‚â”Œâ”â”˜â””â”œâ”¬â”¤â”´â”¼â”â”ƒâ”â”“â”›â”—â”£â”³â”«â”»â•‹â” â”¯â”¨â”·â”¿â”â”°â”¥â”¸â•‚ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[132].length; ++n)
		if (t[132][n].charCodeAt(0) !== 65533) {
			r[t[132][n]] = 33792 + n;
			e[33792 + n] = t[132][n]
		}
	t[135] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â‘ â‘¡â‘¢â‘£â‘¤â‘¥â‘¦â‘§â‘¨â‘©â‘ªâ‘«â‘¬â‘­â‘®â‘¯â‘°â‘±â‘²â‘³â… â…¡â…¢â…£â…¤â…¥â…¦â…§â…¨â…©ï¿½ã‰ãŒ”ãŒ¢ããŒ˜ãŒ§ãŒƒãŒ¶ã‘ã—ãŒãŒ¦ãŒ£ãŒ«ãŠãŒ»ãŽœãŽãŽžãŽŽãŽã„ãŽ¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã»ï¿½ã€ã€Ÿâ„–ãâ„¡ãŠ¤ãŠ¥ãŠ¦ãŠ§ãŠ¨ãˆ±ãˆ²ãˆ¹ã¾ã½ã¼â‰’â‰¡âˆ«âˆ®âˆ‘âˆšâŠ¥âˆ âˆŸâŠ¿âˆµâˆ©âˆªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[135].length; ++n)
		if (t[135][n].charCodeAt(0) !== 65533) {
			r[t[135][n]] = 34560 + n;
			e[34560 + n] = t[135][n]
		}
	t[136] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½äºœå”–å¨ƒé˜¿å“€æ„›æŒ¨å§¶é€¢è‘µèŒœç©æ‚ªæ¡æ¸¥æ—­è‘¦èŠ¦é¯µæ¢“åœ§æ–¡æ‰±å®›å§è™»é£´çµ¢ç¶¾é®Žæˆ–ç²Ÿè¢·å®‰åºµæŒ‰æš—æ¡ˆé—‡éžæä»¥ä¼Šä½ä¾å‰å›²å¤·å§”å¨å°‰æƒŸæ„æ…°æ˜“æ¤…ç‚ºç•ç•°ç§»ç¶­ç·¯èƒƒèŽè¡£è¬‚é•éºåŒ»äº•äº¥åŸŸè‚²éƒç£¯ä¸€å£±æº¢é€¸ç¨²èŒ¨èŠ‹é°¯å…å°å’½å“¡å› å§»å¼•é£²æ·«èƒ¤è”­ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[136].length; ++n)
		if (t[136][n].charCodeAt(0) !== 65533) {
			r[t[136][n]] = 34816 + n;
			e[34816 + n] = t[136][n]
		}
	t[137] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é™¢é™°éš éŸ»å‹å³å®‡çƒç¾½è¿‚é›¨å¯éµœçªºä¸‘ç¢“è‡¼æ¸¦å˜˜å”„æ¬è”šé°»å§¥åŽ©æµ¦ç“œé–å™‚äº‘é‹é›²èé¤Œå¡å–¶å¬°å½±æ˜ æ›³æ „æ°¸æ³³æ´©ç‘›ç›ˆç©Žé ´è‹±è¡›è© é‹­æ¶²ç–«ç›Šé§…æ‚¦è¬è¶Šé–²æ¦ŽåŽ­å††ï¿½åœ’å °å¥„å®´å»¶æ€¨æŽ©æ´æ²¿æ¼”ç‚Žç„”ç…™ç‡•çŒ¿ç¸è‰¶è‹‘è–—é é‰›é´›å¡©æ–¼æ±šç”¥å‡¹å¤®å¥¥å¾€å¿œæŠ¼æ—ºæ¨ªæ¬§æ®´çŽ‹ç¿è¥–é´¬é´Žé»„å²¡æ²–è»å„„å±‹æ†¶è‡†æ¡¶ç‰¡ä¹™ä¿ºå¸æ©æ¸©ç©éŸ³ä¸‹åŒ–ä»®ä½•ä¼½ä¾¡ä½³åŠ å¯å˜‰å¤å«å®¶å¯¡ç§‘æš‡æžœæž¶æ­Œæ²³ç«ç‚ç¦ç¦¾ç¨¼ç®‡èŠ±è‹›èŒ„è·è¯è“è¦èª²å˜©è²¨è¿¦éŽéœžèšŠä¿„å³¨æˆ‘ç‰™ç”»è‡¥èŠ½è›¾è³€é›…é¤“é§•ä»‹ä¼šè§£å›žå¡Šå£Šå»»å¿«æ€ªæ‚”æ¢æ‡æˆ’æ‹æ”¹ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[137].length; ++n)
		if (t[137][n].charCodeAt(0) !== 65533) {
			r[t[137][n]] = 35072 + n;
			e[35072 + n] = t[137][n]
		}
	t[138] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é­æ™¦æ¢°æµ·ç°ç•Œçš†çµµèŠ¥èŸ¹é–‹éšŽè²å‡±åŠ¾å¤–å’³å®³å´–æ…¨æ¦‚æ¶¯ç¢è“‹è¡—è©²éŽ§éª¸æµ¬é¦¨è›™åž£æŸ¿è›ŽéˆŽåŠƒåš‡å„å»“æ‹¡æ’¹æ ¼æ ¸æ®»ç²ç¢ºç©«è¦šè§’èµ«è¼ƒéƒ­é–£éš”é©å­¦å²³æ¥½é¡é¡ŽæŽ›ç¬ æ¨«ï¿½æ©¿æ¢¶é°æ½Ÿå‰²å–æ°æ‹¬æ´»æ¸‡æ»‘è‘›è¤è½„ä¸”é°¹å¶æ¤›æ¨ºéž„æ ªå…œç«ƒè’²é‡œéŽŒå™›é´¨æ ¢èŒ…è±ç²¥åˆˆè‹…ç“¦ä¹¾ä¾ƒå† å¯’åˆŠå‹˜å‹§å·»å–šå ªå§¦å®Œå®˜å¯›å¹²å¹¹æ‚£æ„Ÿæ…£æ†¾æ›æ•¢æŸ‘æ¡“æ£ºæ¬¾æ­“æ±—æ¼¢æ¾—æ½…ç’°ç”˜ç›£çœ‹ç«¿ç®¡ç°¡ç·©ç¼¶ç¿°è‚è‰¦èŽžè¦³è«Œè²«é‚„é‘‘é–“é–‘é–¢é™¥éŸ“é¤¨èˆ˜ä¸¸å«å²¸å·ŒçŽ©ç™Œçœ¼å²©ç¿«è´‹é›é ‘é¡”é¡˜ä¼ä¼Žå±å–œå™¨åŸºå¥‡å¬‰å¯„å²å¸Œå¹¾å¿Œæ®æœºæ——æ—¢æœŸæ£‹æ£„ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[138].length; ++n)
		if (t[138][n].charCodeAt(0) !== 65533) {
			r[t[138][n]] = 35328 + n;
			e[35328 + n] = t[138][n]
		}
	t[139] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ©Ÿå¸°æ¯…æ°—æ±½ç•¿ç¥ˆå­£ç¨€ç´€å¾½è¦è¨˜è²´èµ·è»Œè¼é£¢é¨Žé¬¼äº€å½å„€å¦“å®œæˆ¯æŠ€æ“¬æ¬ºçŠ ç–‘ç¥‡ç¾©èŸ»èª¼è­°æŽ¬èŠéž å‰åƒå–«æ¡”æ©˜è©°ç §æµé»å´å®¢è„šè™é€†ä¸˜ä¹…ä»‡ä¼‘åŠå¸å®®å¼“æ€¥æ•‘ï¿½æœ½æ±‚æ±²æ³£ç¸çƒç©¶çª®ç¬ˆç´šç³¾çµ¦æ—§ç‰›åŽ»å±…å·¨æ‹’æ‹ æŒ™æ¸ è™šè¨±è·é‹¸æ¼ç¦¦é­šäº¨äº«äº¬ä¾›ä¾ åƒ‘å…‡ç«¶å…±å‡¶å”åŒ¡å¿å«å–¬å¢ƒå³¡å¼·å½Šæ€¯ææ­æŒŸæ•™æ©‹æ³ç‹‚ç‹­çŸ¯èƒ¸è„…èˆˆè•Žéƒ·é¡éŸ¿é¥—é©šä»°å‡å°­æšæ¥­å±€æ›²æ¥µçŽ‰æ¡ç²åƒ…å‹¤å‡å·¾éŒ¦æ–¤æ¬£æ¬½ç´ç¦ç¦½ç­‹ç·ŠèŠ¹èŒè¡¿è¥Ÿè¬¹è¿‘é‡‘åŸéŠ€ä¹å€¶å¥åŒºç‹—çŽ–çŸ©è‹¦èº¯é§†é§ˆé§’å…·æ„šè™žå–°ç©ºå¶å¯“é‡éš…ä¸²æ«›é‡§å±‘å±ˆï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[139].length; ++n)
		if (t[139][n].charCodeAt(0) !== 65533) {
			r[t[139][n]] = 35584 + n;
			e[35584 + n] = t[139][n]
		}
	t[140] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æŽ˜çªŸæ²“é´è½¡çªªç†Šéšˆç²‚æ —ç¹°æ¡‘é¬å‹²å›è–«è¨“ç¾¤è»éƒ¡å¦è¢ˆç¥ä¿‚å‚¾åˆ‘å…„å•“åœ­çªåž‹å¥‘å½¢å¾„æµæ…¶æ…§æ†©æŽ²æºæ•¬æ™¯æ¡‚æ¸“ç•¦ç¨½ç³»çµŒç¶™ç¹‹ç½«èŒŽèŠè›è¨ˆè©£è­¦è»½é šé¶èŠ¸è¿Žé¯¨ï¿½åŠ‡æˆŸæ’ƒæ¿€éš™æ¡å‚‘æ¬ æ±ºæ½”ç©´çµè¡€è¨£æœˆä»¶å€¹å€¦å¥å…¼åˆ¸å‰£å–§åœå …å«Œå»ºæ†²æ‡¸æ‹³æ²æ¤œæ¨©ç‰½çŠ¬çŒ®ç ”ç¡¯çµ¹çœŒè‚©è¦‹è¬™è³¢è»’é£éµé™ºé¡•é¨“é¹¸å…ƒåŽŸåŽ³å¹»å¼¦æ¸›æºçŽ„ç¾çµƒèˆ·è¨€è«ºé™ä¹Žå€‹å¤å‘¼å›ºå§‘å­¤å·±åº«å¼§æˆ¸æ•…æž¯æ¹–ç‹ç³Šè¢´è‚¡èƒ¡è°è™Žèª‡è·¨éˆ·é›‡é¡§é¼“äº”äº’ä¼åˆå‘‰å¾å¨¯å¾Œå¾¡æ‚Ÿæ¢§æªŽç‘šç¢èªžèª¤è­·é†ä¹žé¯‰äº¤ä½¼ä¾¯å€™å€–å…‰å…¬åŠŸåŠ¹å‹¾åŽšå£å‘ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[140].length; ++n)
		if (t[140][n].charCodeAt(0) !== 65533) {
			r[t[140][n]] = 35840 + n;
			e[35840 + n] = t[140][n]
		}
	t[141] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åŽå–‰å‘åž¢å¥½å­”å­å®å·¥å·§å··å¹¸åºƒåºšåº·å¼˜æ’æ…ŒæŠ—æ‹˜æŽ§æ”»æ˜‚æ™ƒæ›´æ­æ ¡æ¢—æ§‹æ±Ÿæ´ªæµ©æ¸¯æºç”²çš‡ç¡¬ç¨¿ç³ ç´…ç´˜çµžç¶±è€•è€ƒè‚¯è‚±è…”è†èˆªè’è¡Œè¡¡è¬›è²¢è³¼éƒŠé…µé‰±ç ¿é‹¼é–¤é™ï¿½é …é¦™é«˜é´»å‰›åŠ«å·åˆå£•æ‹·æ¿ è±ªè½Ÿéº¹å…‹åˆ»å‘Šå›½ç©€é…·éµ é»’ç„æ¼‰è…°ç”‘å¿½æƒšéª¨ç‹›è¾¼æ­¤é ƒä»Šå›°å¤å¢¾å©šæ¨æ‡‡æ˜æ˜†æ ¹æ¢±æ··ç—•ç´ºè‰®é­‚äº›ä½å‰å”†åµ¯å·¦å·®æŸ»æ²™ç‘³ç ‚è©éŽ–è£Ÿååº§æŒ«å‚µå‚¬å†æœ€å“‰å¡žå¦»å®°å½©æ‰æŽ¡æ ½æ­³æ¸ˆç½é‡‡çŠ€ç •ç ¦ç¥­æ–Žç´°èœè£è¼‰éš›å‰¤åœ¨æç½ªè²¡å†´å‚é˜ªå ºæ¦Šè‚´å’²å´ŽåŸ¼ç¢•é·ºä½œå‰Šå’‹æ¾æ˜¨æœ”æŸµçª„ç­–ç´¢éŒ¯æ¡œé®­ç¬¹åŒ™å†Šåˆ·ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[141].length; ++n)
		if (t[141][n].charCodeAt(0) !== 65533) {
			r[t[141][n]] = 36096 + n;
			e[36096 + n] = t[141][n]
		}
	t[142] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¯Ÿæ‹¶æ’®æ“¦æœ­æ®ºè–©é›‘çšé¯–æŒéŒ†é®«çš¿æ™’ä¸‰å‚˜å‚å±±æƒ¨æ’’æ•£æ¡Ÿç‡¦çŠç”£ç®—çº‚èš•è®ƒè³›é…¸é¤æ–¬æš«æ®‹ä»•ä»”ä¼ºä½¿åˆºå¸å²å—£å››å£«å§‹å§‰å§¿å­å±å¸‚å¸«å¿—æ€æŒ‡æ”¯å­œæ–¯æ–½æ—¨æžæ­¢ï¿½æ­»æ°ç…ç¥‰ç§ç³¸ç´™ç´«è‚¢è„‚è‡³è¦–è©žè©©è©¦èªŒè«®è³‡è³œé›Œé£¼æ­¯äº‹ä¼¼ä¾å…å­—å¯ºæ…ˆæŒæ™‚æ¬¡æ»‹æ²»çˆ¾ç’½ç—”ç£ç¤ºè€Œè€³è‡ªè’”è¾žæ±é¹¿å¼è­˜é´«ç«ºè»¸å®é›«ä¸ƒå±åŸ·å¤±å«‰å®¤æ‚‰æ¹¿æ¼†ç–¾è³ªå®Ÿè”€ç¯ å²æŸ´èŠå±¡è•Šç¸žèˆŽå†™å°„æ¨èµ¦æ–œç…®ç¤¾ç´—è€…è¬è»Šé®è›‡é‚ªå€Ÿå‹ºå°ºæ“ç¼çˆµé…Œé‡ˆéŒ«è‹¥å¯‚å¼±æƒ¹ä¸»å–å®ˆæ‰‹æœ±æ®Šç‹©ç ç¨®è…«è¶£é…’é¦–å„’å—å‘ªå¯¿æŽˆæ¨¹ç¶¬éœ€å›šåŽå‘¨ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[142].length; ++n)
		if (t[142][n].charCodeAt(0) !== 65533) {
			r[t[142][n]] = 36352 + n;
			e[36352 + n] = t[142][n]
		}
	t[143] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å®—å°±å·žä¿®æ„æ‹¾æ´²ç§€ç§‹çµ‚ç¹ç¿’è‡­èˆŸè’è¡†è¥²è®è¹´è¼¯é€±é…‹é…¬é›†é†œä»€ä½å……åå¾“æˆŽæŸ”æ±æ¸‹ç£ç¸¦é‡éŠƒå”å¤™å®¿æ·‘ç¥ç¸®ç²›å¡¾ç†Ÿå‡ºè¡“è¿°ä¿Šå³»æ˜¥çž¬ç«£èˆœé§¿å‡†å¾ªæ—¬æ¥¯æ®‰æ·³ï¿½æº–æ½¤ç›¾ç´”å·¡éµé†‡é †å‡¦åˆæ‰€æš‘æ›™æ¸šåº¶ç·’ç½²æ›¸è–¯è—·è«¸åŠ©å™å¥³åºå¾æ•é‹¤é™¤å‚·å„Ÿå‹åŒ å‡å¬å“¨å•†å”±å˜—å¥¨å¦¾å¨¼å®µå°†å°å°‘å°šåº„åºŠå» å½°æ‰¿æŠ„æ‹›æŽŒæ·æ˜‡æ˜Œæ˜­æ™¶æ¾æ¢¢æ¨Ÿæ¨µæ²¼æ¶ˆæ¸‰æ¹˜ç„¼ç„¦ç…§ç—‡çœç¡ç¤ç¥¥ç§°ç« ç¬‘ç²§ç´¹è‚–è–è’‹è•‰è¡è£³è¨Ÿè¨¼è©”è©³è±¡è³žé†¤é‰¦é¾é˜éšœéž˜ä¸Šä¸ˆä¸žä¹—å†—å‰°åŸŽå ´å£Œå¬¢å¸¸æƒ…æ“¾æ¡æ–æµ„çŠ¶ç•³ç©£è’¸è­²é†¸éŒ å˜±åŸ´é£¾ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[143].length; ++n)
		if (t[143][n].charCodeAt(0) !== 65533) {
			r[t[143][n]] = 36608 + n;
			e[36608 + n] = t[143][n]
		}
	t[144] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ‹­æ¤æ®–ç‡­ç¹”è·è‰²è§¦é£Ÿè•è¾±å°»ä¼¸ä¿¡ä¾µå”‡å¨ å¯å¯©å¿ƒæ…ŽæŒ¯æ–°æ™‹æ£®æ¦›æµ¸æ·±ç”³ç–¹çœŸç¥žç§¦ç´³è‡£èŠ¯è–ªè¦ªè¨ºèº«è¾›é€²é‡éœ‡äººä»åˆƒå¡µå£¬å°‹ç”šå°½è…Žè¨Šè¿…é™£é­ç¬¥è«é ˆé…¢å›³åŽ¨ï¿½é€—å¹åž‚å¸¥æŽ¨æ°´ç‚Šç¡ç²‹ç¿ è¡°é‚é…”éŒéŒ˜éšç‘žé«„å´‡åµ©æ•°æž¢è¶¨é››æ®æ‰æ¤™è…é —é›€è£¾æ¾„æ‘ºå¯¸ä¸–ç€¬ç•æ˜¯å‡„åˆ¶å‹¢å§“å¾æ€§æˆæ”¿æ•´æ˜Ÿæ™´æ£²æ –æ­£æ¸…ç‰²ç”Ÿç››ç²¾è–å£°è£½è¥¿èª èª“è«‹é€é†’é’é™æ–‰ç¨Žè„†éš»å¸­æƒœæˆšæ–¥æ˜”æžçŸ³ç©ç±ç¸¾è„Šè²¬èµ¤è·¡è¹Ÿç¢©åˆ‡æ‹™æŽ¥æ‘‚æŠ˜è¨­çªƒç¯€èª¬é›ªçµ¶èˆŒè‰ä»™å…ˆåƒå å®£å°‚å°–å·æˆ¦æ‰‡æ’°æ “æ ´æ³‰æµ…æ´—æŸ“æ½œç…Žç…½æ—‹ç©¿ç®­ç·šï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[144].length; ++n)
		if (t[144][n].charCodeAt(0) !== 65533) {
			r[t[144][n]] = 36864 + n;
			e[36864 + n] = t[144][n]
		}
	t[145] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¹Šç¾¨è…ºèˆ›èˆ¹è–¦è©®è³Žè·µé¸é·éŠ­éŠ‘é–ƒé®®å‰å–„æ¼¸ç„¶å…¨ç¦…ç¹•è†³ç³Žå™Œå¡‘å²¨æŽªæ›¾æ›½æ¥šç‹™ç–ç–Žç¤Žç¥–ç§Ÿç²—ç´ çµ„è˜‡è¨´é˜»é¡é¼ åƒ§å‰µåŒå¢å€‰å–ªå£®å¥çˆ½å®‹å±¤åŒæƒ£æƒ³æœæŽƒæŒ¿æŽ»ï¿½æ“æ—©æ›¹å·£æ§æ§½æ¼•ç‡¥äº‰ç—©ç›¸çª“ç³Ÿç·ç¶œè¡è‰è˜è‘¬è’¼è—»è£…èµ°é€é­éŽ—éœœé¨’åƒå¢—æ†Žè‡“è”µè´ˆé€ ä¿ƒå´å‰‡å³æ¯æ‰æŸæ¸¬è¶³é€Ÿä¿—å±žè³Šæ—ç¶šå’è¢–å…¶æƒå­˜å­«å°Šææ‘éœä»–å¤šå¤ªæ±°è©‘å”¾å •å¦¥æƒ°æ‰“æŸèˆµæ¥•é™€é§„é¨¨ä½“å †å¯¾è€å²±å¸¯å¾…æ€ æ…‹æˆ´æ›¿æ³°æ»žèƒŽè…¿è‹”è¢‹è²¸é€€é€®éšŠé»›é¯›ä»£å°å¤§ç¬¬é†é¡Œé·¹æ»ç€§å“å•„å®…æ‰˜æŠžæ‹“æ²¢æ¿¯ç¢è¨—é¸æ¿è«¾èŒ¸å‡§è›¸åªï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[145].length; ++n)
		if (t[145][n].charCodeAt(0) !== 65533) {
			r[t[145][n]] = 37120 + n;
			e[37120 + n] = t[145][n]
		}
	t[146] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å©ä½†é”è¾°å¥ªè„±å·½ç«ªè¾¿æ£šè°·ç‹¸é±ˆæ¨½èª°ä¸¹å˜å˜†å¦æ‹…æŽ¢æ—¦æ­Žæ·¡æ¹›ç‚­çŸ­ç«¯ç®ªç¶»è€½èƒ†è›‹èª•é›å›£å£‡å¼¾æ–­æš–æª€æ®µç”·è«‡å€¤çŸ¥åœ°å¼›æ¥æ™ºæ± ç—´ç¨šç½®è‡´èœ˜é…é¦³ç¯‰ç•œç«¹ç­‘è“„ï¿½é€ç§©çª’èŒ¶å«¡ç€ä¸­ä»²å®™å¿ æŠ½æ˜¼æŸ±æ³¨è™«è¡·è¨»é…Žé‹³é§æ¨—ç€¦çŒªè‹§è‘—è²¯ä¸å…†å‡‹å–‹å¯µå¸–å¸³åºå¼”å¼µå½«å¾´æ‡²æŒ‘æš¢æœæ½®ç‰’ç”ºçœºè´è„¹è…¸è¶èª¿è«œè¶…è·³éŠšé•·é ‚é³¥å‹…æ—ç›´æœ•æ²ˆçè³ƒéŽ®é™³æ´¥å¢œæ¤Žæ§Œè¿½éŽšç—›é€šå¡šæ ‚æŽ´æ§»ä½ƒæ¼¬æŸ˜è¾»è”¦ç¶´é”æ¤¿æ½°åªå£·å¬¬ç´¬çˆªåŠé‡£é¶´äº­ä½Žåœåµå‰ƒè²žå‘ˆå ¤å®šå¸åº•åº­å»·å¼Ÿæ‚ŒæŠµæŒºææ¢¯æ±€ç¢‡ç¦Žç¨‹ç· è‰‡è¨‚è«¦è¹„é€“ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[146].length; ++n)
		if (t[146][n].charCodeAt(0) !== 65533) {
			r[t[146][n]] = 37376 + n;
			e[37376 + n] = t[146][n]
		}
	t[147] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é‚¸é„­é‡˜é¼Žæ³¥æ‘˜æ“¢æ•µæ»´çš„ç¬›é©é‘æººå“²å¾¹æ’¤è½è¿­é‰„å…¸å¡«å¤©å±•åº—æ·»çºç”œè²¼è»¢é¡›ç‚¹ä¼æ®¿æ¾±ç”°é›»å…Žåå µå¡—å¦¬å± å¾’æ–—æœæ¸¡ç™»èŸè³­é€”éƒ½éç ¥ç ºåŠªåº¦åœŸå¥´æ€’å€’å…šå†¬ï¿½å‡åˆ€å”å¡”å¡˜å¥—å®•å³¶å¶‹æ‚¼æŠ•æ­æ±æ¡ƒæ¢¼æ£Ÿç›—æ·˜æ¹¯æ¶›ç¯ç‡ˆå½“ç—˜ç¥·ç­‰ç­”ç­’ç³–çµ±åˆ°è‘£è•©è—¤è¨Žè¬„è±†è¸é€ƒé€é™é™¶é ­é¨°é—˜åƒå‹•åŒå ‚å°Žæ†§æ’žæ´žçž³ç«¥èƒ´è„é“éŠ…å³ é´‡åŒ¿å¾—å¾³æ¶œç‰¹ç£ç¦¿ç¯¤æ¯’ç‹¬èª­æ ƒæ©¡å‡¸çªæ¤´å±Šé³¶è‹«å¯…é…‰ç€žå™¸å±¯æƒ‡æ•¦æ²Œè±šéé “å‘‘æ›‡éˆå¥ˆé‚£å†…ä¹å‡ªè–™è¬Žç˜æºé‹æ¥¢é¦´ç¸„ç•·å—æ¥ è»Ÿé›£æ±äºŒå°¼å¼è¿©åŒ‚è³‘è‚‰è™¹å»¿æ—¥ä¹³å…¥ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[147].length; ++n)
		if (t[147][n].charCodeAt(0) !== 65533) {
			r[t[147][n]] = 37632 + n;
			e[37632 + n] = t[147][n]
		}
	t[148] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¦‚å°¿éŸ®ä»»å¦Šå¿èªæ¿¡ç¦°ç¥¢å¯§è‘±çŒ«ç†±å¹´å¿µæ»æ’šç‡ƒç²˜ä¹ƒå»¼ä¹‹åŸœåš¢æ‚©æ¿ƒç´èƒ½è„³è†¿è¾²è¦—èš¤å·´æŠŠæ’­è¦‡æ·æ³¢æ´¾ç¶ç ´å©†ç½µèŠ­é¦¬ä¿³å»ƒæ‹æŽ’æ•—æ¯ç›ƒç‰ŒèƒŒè‚ºè¼©é…å€åŸ¹åª’æ¢…ï¿½æ¥³ç…¤ç‹½è²·å£²è³ é™ªé€™è¿ç§¤çŸ§è©ä¼¯å‰¥åšæ‹æŸæ³Šç™½ç®”ç²•èˆ¶è–„è¿«æ›æ¼ çˆ†ç¸›èŽ«é§éº¦å‡½ç®±ç¡²ç®¸è‚‡ç­ˆæ«¨å¹¡è‚Œç•‘ç• å…«é‰¢æºŒç™ºé†—é«ªä¼ç½°æŠœç­é–¥é³©å™ºå¡™è›¤éš¼ä¼´åˆ¤åŠåå›å¸†æ¬æ–‘æ¿æ°¾æ±Žç‰ˆçŠ¯ç­ç•”ç¹èˆ¬è—©è²©ç¯„é‡†ç…©é ’é£¯æŒ½æ™©ç•ªç›¤ç£è•ƒè›®åŒªå‘å¦å¦ƒåº‡å½¼æ‚²æ‰‰æ‰¹æŠ«æ–æ¯”æ³Œç–²çš®ç¢‘ç§˜ç·‹ç½·è‚¥è¢«èª¹è²»é¿éžé£›æ¨‹ç°¸å‚™å°¾å¾®æž‡æ¯˜çµçœ‰ç¾Žï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[148].length; ++n)
		if (t[148][n].charCodeAt(0) !== 65533) {
			r[t[148][n]] = 37888 + n;
			e[37888 + n] = t[148][n]
		}
	t[149] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¼»æŸŠç¨—åŒ¹ç–‹é«­å½¦è†è±è‚˜å¼¼å¿…ç•¢ç­†é€¼æ¡§å§«åª›ç´ç™¾è¬¬ä¿µå½ªæ¨™æ°·æ¼‚ç“¢ç¥¨è¡¨è©•è±¹å»Ÿæç—…ç§’è‹—éŒ¨é‹²è’œè›­é°­å“å½¬æ–Œæµœç€•è²§è³“é »æ•ç“¶ä¸ä»˜åŸ å¤«å©¦å¯Œå†¨å¸ƒåºœæ€–æ‰¶æ•·ï¿½æ–§æ™®æµ®çˆ¶ç¬¦è…è†šèŠ™è­œè² è³¦èµ´é˜œé™„ä¾®æ’«æ­¦èˆžè‘¡è•ªéƒ¨å°æ¥“é¢¨è‘ºè•—ä¼å‰¯å¾©å¹…æœç¦è…¹è¤‡è¦†æ·µå¼—æ‰•æ²¸ä»ç‰©é®’åˆ†å»å™´å¢³æ†¤æ‰®ç„šå¥®ç²‰ç³žç´›é›°æ–‡èžä¸™ä½µå…µå¡€å¹£å¹³å¼ŠæŸ„ä¸¦è”½é–‰é™›ç±³é åƒ»å£ç™–ç¢§åˆ¥çž¥è”‘ç®†åå¤‰ç‰‡ç¯‡ç·¨è¾ºè¿”éä¾¿å‹‰å¨©å¼éž­ä¿èˆ—é‹ªåœƒæ•æ­©ç”«è£œè¼”ç©‚å‹Ÿå¢“æ…•æˆŠæš®æ¯ç°¿è©å€£ä¿¸åŒ…å‘†å ±å¥‰å®å³°å³¯å´©åº–æŠ±æ§æ”¾æ–¹æœ‹ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[149].length; ++n)
		if (t[149][n].charCodeAt(0) !== 65533) {
			r[t[149][n]] = 38144 + n;
			e[38144 + n] = t[149][n]
		}
	t[150] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ³•æ³¡çƒ¹ç ²ç¸«èƒžèŠ³èŒè“¬èœ‚è¤’è¨ªè±Šé‚¦é‹’é£½é³³éµ¬ä¹äº¡å‚å‰–åŠå¦¨å¸½å¿˜å¿™æˆ¿æš´æœ›æŸæ£’å†’ç´¡è‚ªè†¨è¬€è²Œè²¿é‰¾é˜²å é ¬åŒ—åƒ•åœå¢¨æ’²æœ´ç‰§ç¦ç©†é‡¦å‹ƒæ²¡æ®†å €å¹Œå¥”æœ¬ç¿»å‡¡ç›†ï¿½æ‘©ç£¨é­”éº»åŸ‹å¦¹æ˜§æžšæ¯Žå“©æ§™å¹•è†œæž•é®ªæŸ¾é±’æ¡äº¦ä¿£åˆæŠ¹æœ«æ²«è¿„ä¾­ç¹­éº¿ä¸‡æ…¢æº€æ¼«è”“å‘³æœªé­…å·³ç®•å²¬å¯†èœœæ¹Šè“‘ç¨”è„ˆå¦™ç²æ°‘çœ å‹™å¤¢ç„¡ç‰ŸçŸ›éœ§éµ¡æ¤‹å©¿å¨˜å†¥åå‘½æ˜Žç›Ÿè¿·éŠ˜é³´å§ªç‰æ»…å…æ£‰ç¶¿ç·¬é¢éººæ‘¸æ¨¡èŒ‚å¦„å­Ÿæ¯›çŒ›ç›²ç¶²è€—è’™å„²æœ¨é»™ç›®æ¢å‹¿é¤…å°¤æˆ»ç±¾è²°å•æ‚¶ç´‹é–€åŒä¹Ÿå†¶å¤œçˆºè€¶é‡Žå¼¥çŸ¢åŽ„å½¹ç´„è–¬è¨³èºé–æŸ³è–®é‘“æ„‰æ„ˆæ²¹ç™’ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[150].length; ++n)
		if (t[150][n].charCodeAt(0) !== 65533) {
			r[t[150][n]] = 38400 + n;
			e[38400 + n] = t[150][n]
		}
	t[151] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è«­è¼¸å”¯ä½‘å„ªå‹‡å‹å®¥å¹½æ‚ æ†‚æ–æœ‰æŸšæ¹§æ¶ŒçŒ¶çŒ·ç”±ç¥è£•èª˜éŠé‚‘éƒµé›„èžå¤•äºˆä½™ä¸Žèª‰è¼¿é å‚­å¹¼å¦–å®¹åº¸æšæºæ“æ›œæ¥Šæ§˜æ´‹æº¶ç†”ç”¨çª¯ç¾Šè€€è‘‰è“‰è¦è¬¡è¸Šé¥é™½é¤Šæ…¾æŠ‘æ¬²ï¿½æ²ƒæµ´ç¿Œç¿¼æ·€ç¾…èžºè£¸æ¥èŽ±é ¼é›·æ´›çµ¡è½é…ªä¹±åµåµæ¬„æ¿«è—è˜­è¦§åˆ©åå±¥æŽæ¢¨ç†ç’ƒç—¢è£è£¡é‡Œé›¢é™¸å¾‹çŽ‡ç«‹è‘ŽæŽ ç•¥åŠ‰æµæºœç‰ç•™ç¡«ç²’éš†ç«œé¾ä¾¶æ…®æ—…è™œäº†äº®åƒšä¸¡å‡Œå¯®æ–™æ¢æ¶¼çŒŸç™‚çž­ç¨œç³§è‰¯è«’é¼é‡é™µé ˜åŠ›ç·‘å€«åŽ˜æž—æ·‹ç‡ç³è‡¨è¼ªéš£é±—éºŸç‘ å¡æ¶™ç´¯é¡žä»¤ä¼¶ä¾‹å†·åŠ±å¶ºæ€œçŽ²ç¤¼è‹“éˆ´éš·é›¶éœŠéº—é½¢æš¦æ­´åˆ—åŠ£çƒˆè£‚å»‰æ‹æ†æ¼£ç…‰ç°¾ç·´è¯ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[151].length; ++n)
		if (t[151][n].charCodeAt(0) !== 65533) {
			r[t[151][n]] = 38656 + n;
			e[38656 + n] = t[151][n]
		}
	t[152] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è“®é€£éŒ¬å‘‚é­¯æ«“ç‚‰è³‚è·¯éœ²åŠ´å©å»Šå¼„æœ—æ¥¼æ¦”æµªæ¼ç‰¢ç‹¼ç¯­è€è¾è‹éƒŽå…­éº“ç¦„è‚‹éŒ²è«–å€­å’Œè©±æ­ªè³„è„‡æƒ‘æž é·²äº™äº˜é°è©«è—è•¨æ¤€æ¹¾ç¢—è…•ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¼Œä¸ä¸•ä¸ªä¸±ä¸¶ä¸¼ä¸¿ä¹‚ä¹–ä¹˜äº‚äº…è±«äºŠèˆ’å¼äºŽäºžäºŸäº äº¢äº°äº³äº¶ä»Žä»ä»„ä»†ä»‚ä»—ä»žä»­ä»Ÿä»·ä¼‰ä½šä¼°ä½›ä½ä½—ä½‡ä½¶ä¾ˆä¾ä¾˜ä½»ä½©ä½°ä¾‘ä½¯ä¾†ä¾–å„˜ä¿”ä¿Ÿä¿Žä¿˜ä¿›ä¿‘ä¿šä¿ä¿¤ä¿¥å€šå€¨å€”å€ªå€¥å€…ä¼œä¿¶å€¡å€©å€¬ä¿¾ä¿¯å€‘å€†åƒå‡æœƒå•ååˆåšå–å¬å¸å‚€å‚šå‚…å‚´å‚²ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[152].length; ++n)
		if (t[152][n].charCodeAt(0) !== 65533) {
			r[t[152][n]] = 38912 + n;
			e[38912 + n] = t[152][n]
		}
	t[153] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åƒ‰åƒŠå‚³åƒ‚åƒ–åƒžåƒ¥åƒ­åƒ£åƒ®åƒ¹åƒµå„‰å„å„‚å„–å„•å„”å„šå„¡å„ºå„·å„¼å„»å„¿å…€å…’å…Œå…”å…¢ç«¸å…©å…ªå…®å†€å†‚å›˜å†Œå†‰å†å†‘å†“å†•å†–å†¤å†¦å†¢å†©å†ªå†«å†³å†±å†²å†°å†µå†½å‡…å‡‰å‡›å‡ è™•å‡©å‡­ï¿½å‡°å‡µå‡¾åˆ„åˆ‹åˆ”åˆŽåˆ§åˆªåˆ®åˆ³åˆ¹å‰å‰„å‰‹å‰Œå‰žå‰”å‰ªå‰´å‰©å‰³å‰¿å‰½åŠåŠ”åŠ’å‰±åŠˆåŠ‘è¾¨è¾§åŠ¬åŠ­åŠ¼åŠµå‹å‹å‹—å‹žå‹£å‹¦é£­å‹ å‹³å‹µå‹¸å‹¹åŒ†åŒˆç”¸åŒåŒåŒåŒ•åŒšåŒ£åŒ¯åŒ±åŒ³åŒ¸å€å†å…ä¸—å‰åå‡–åžå©å®å¤˜å»å·åŽ‚åŽ–åŽ åŽ¦åŽ¥åŽ®åŽ°åŽ¶åƒç°’é›™åŸæ›¼ç‡®å®å¨å­åºåå½å‘€å¬å­å¼å®å¶å©åå‘Žå’å‘µå’Žå‘Ÿå‘±å‘·å‘°å’’å‘»å’€å‘¶å’„å’å’†å“‡å’¢å’¸å’¥å’¬å“„å“ˆå’¨ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[153].length; ++n)
		if (t[153][n].charCodeAt(0) !== 65533) {
			r[t[153][n]] = 39168 + n;
			e[39168 + n] = t[153][n]
		}
	t[154] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å’«å“‚å’¤å’¾å’¼å“˜å“¥å“¦å”å””å“½å“®å“­å“ºå“¢å”¹å•€å•£å•Œå”®å•œå•…å•–å•—å”¸å”³å•å–™å–€å’¯å–Šå–Ÿå•»å•¾å–˜å–žå–®å•¼å–ƒå–©å–‡å–¨å—šå—…å—Ÿå—„å—œå—¤å—”å˜”å—·å˜–å—¾å—½å˜›å—¹å™Žå™ç‡Ÿå˜´å˜¶å˜²å˜¸ï¿½å™«å™¤å˜¯å™¬å™ªåš†åš€åšŠåš åš”åšåš¥åš®åš¶åš´å›‚åš¼å›å›ƒå›€å›ˆå›Žå›‘å›“å›—å›®å›¹åœ€å›¿åœ„åœ‰åœˆåœ‹åœåœ“åœ˜åœ–å—‡åœœåœ¦åœ·åœ¸åŽåœ»å€åå©åŸ€åžˆå¡å¿åž‰åž“åž åž³åž¤åžªåž°åŸƒåŸ†åŸ”åŸ’åŸ“å ŠåŸ–åŸ£å ‹å ™å å¡²å ¡å¡¢å¡‹å¡°æ¯€å¡’å ½å¡¹å¢…å¢¹å¢Ÿå¢«å¢ºå£žå¢»å¢¸å¢®å£…å£“å£‘å£—å£™å£˜å£¥å£œå£¤å£Ÿå£¯å£ºå£¹å£»å£¼å£½å¤‚å¤Šå¤å¤›æ¢¦å¤¥å¤¬å¤­å¤²å¤¸å¤¾ç«’å¥•å¥å¥Žå¥šå¥˜å¥¢å¥ å¥§å¥¬å¥©ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[154].length; ++n)
		if (t[154][n].charCodeAt(0) !== 65533) {
			r[t[154][n]] = 39424 + n;
			e[39424 + n] = t[154][n]
		}
	t[155] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¥¸å¦å¦ä½žä¾«å¦£å¦²å§†å§¨å§œå¦å§™å§šå¨¥å¨Ÿå¨‘å¨œå¨‰å¨šå©€å©¬å©‰å¨µå¨¶å©¢å©ªåªšåª¼åª¾å«‹å«‚åª½å«£å«—å«¦å«©å«–å«ºå«»å¬Œå¬‹å¬–å¬²å«å¬ªå¬¶å¬¾å­ƒå­…å­€å­‘å­•å­šå­›å­¥å­©å­°å­³å­µå­¸æ–ˆå­ºå®€ï¿½å®ƒå®¦å®¸å¯ƒå¯‡å¯‰å¯”å¯å¯¤å¯¦å¯¢å¯žå¯¥å¯«å¯°å¯¶å¯³å°…å°‡å°ˆå°å°“å° å°¢å°¨å°¸å°¹å±å±†å±Žå±“å±å±å­±å±¬å±®ä¹¢å±¶å±¹å²Œå²‘å²”å¦›å²«å²»å²¶å²¼å²·å³…å²¾å³‡å³™å³©å³½å³ºå³­å¶Œå³ªå´‹å´•å´—åµœå´Ÿå´›å´‘å´”å´¢å´šå´™å´˜åµŒåµ’åµŽåµ‹åµ¬åµ³åµ¶å¶‡å¶„å¶‚å¶¢å¶å¶¬å¶®å¶½å¶å¶·å¶¼å·‰å·å·“å·’å·–å·›å·«å·²å·µå¸‹å¸šå¸™å¸‘å¸›å¸¶å¸·å¹„å¹ƒå¹€å¹Žå¹—å¹”å¹Ÿå¹¢å¹¤å¹‡å¹µå¹¶å¹ºéº¼å¹¿åº å»å»‚å»ˆå»å»ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[155].length; ++n)
		if (t[155][n].charCodeAt(0) !== 65533) {
			r[t[155][n]] = 39680 + n;
			e[39680 + n] = t[155][n]
		}
	t[156] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å»–å»£å»å»šå»›å»¢å»¡å»¨å»©å»¬å»±å»³å»°å»´å»¸å»¾å¼ƒå¼‰å½å½œå¼‹å¼‘å¼–å¼©å¼­å¼¸å½å½ˆå½Œå½Žå¼¯å½‘å½–å½—å½™å½¡å½­å½³å½·å¾ƒå¾‚å½¿å¾Šå¾ˆå¾‘å¾‡å¾žå¾™å¾˜å¾ å¾¨å¾­å¾¼å¿–å¿»å¿¤å¿¸å¿±å¿æ‚³å¿¿æ€¡æ ï¿½æ€™æ€æ€©æ€Žæ€±æ€›æ€•æ€«æ€¦æ€æ€ºæšææªæ·æŸæŠæ†ææ£æƒæ¤æ‚æ¬æ«æ™æ‚æ‚æƒ§æ‚ƒæ‚šæ‚„æ‚›æ‚–æ‚—æ‚’æ‚§æ‚‹æƒ¡æ‚¸æƒ æƒ“æ‚´å¿°æ‚½æƒ†æ‚µæƒ˜æ…æ„•æ„†æƒ¶æƒ·æ„€æƒ´æƒºæ„ƒæ„¡æƒ»æƒ±æ„æ„Žæ…‡æ„¾æ„¨æ„§æ…Šæ„¿æ„¼æ„¬æ„´æ„½æ…‚æ…„æ…³æ…·æ…˜æ…™æ…šæ…«æ…´æ…¯æ…¥æ…±æ…Ÿæ…æ…“æ…µæ†™æ†–æ†‡æ†¬æ†”æ†šæ†Šæ†‘æ†«æ†®æ‡Œæ‡Šæ‡‰æ‡·æ‡ˆæ‡ƒæ‡†æ†ºæ‡‹ç½¹æ‡æ‡¦æ‡£æ‡¶æ‡ºæ‡´æ‡¿æ‡½æ‡¼æ‡¾æˆ€æˆˆæˆ‰æˆæˆŒæˆ”æˆ›ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[156].length; ++n)
		if (t[156][n].charCodeAt(0) !== 65533) {
			r[t[156][n]] = 39936 + n;
			e[39936 + n] = t[156][n]
		}
	t[157] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æˆžæˆ¡æˆªæˆ®æˆ°æˆ²æˆ³æ‰æ‰Žæ‰žæ‰£æ‰›æ‰ æ‰¨æ‰¼æŠ‚æŠ‰æ‰¾æŠ’æŠ“æŠ–æ‹”æŠƒæŠ”æ‹—æ‹‘æŠ»æ‹æ‹¿æ‹†æ“”æ‹ˆæ‹œæ‹Œæ‹Šæ‹‚æ‹‡æŠ›æ‹‰æŒŒæ‹®æ‹±æŒ§æŒ‚æŒˆæ‹¯æ‹µææŒ¾ææœææŽ–æŽŽæŽ€æŽ«æ¶æŽ£æŽæŽ‰æŽŸæŽµæ«ï¿½æ©æŽ¾æ©æ€æ†æ£æ‰æ’æ¶æ„æ–æ´æ†æ“æ¦æ¶æ”æ—æ¨ææ‘§æ‘¯æ‘¶æ‘Žæ”ªæ’•æ’“æ’¥æ’©æ’ˆæ’¼æ“šæ“’æ“…æ“‡æ’»æ“˜æ“‚æ“±æ“§èˆ‰æ“ æ“¡æŠ¬æ“£æ“¯æ”¬æ“¶æ“´æ“²æ“ºæ”€æ“½æ”˜æ”œæ”…æ”¤æ”£æ”«æ”´æ”µæ”·æ”¶æ”¸ç•‹æ•ˆæ•–æ••æ•æ•˜æ•žæ•æ•²æ•¸æ–‚æ–ƒè®Šæ–›æ–Ÿæ–«æ–·æ—ƒæ—†æ—æ—„æ—Œæ—’æ—›æ—™æ— æ—¡æ—±æ²æ˜Šæ˜ƒæ—»æ³æ˜µæ˜¶æ˜´æ˜œæ™æ™„æ™‰æ™æ™žæ™æ™¤æ™§æ™¨æ™Ÿæ™¢æ™°æšƒæšˆæšŽæš‰æš„æš˜æšæ›æš¹æ›‰æš¾æš¼ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[157].length; ++n)
		if (t[157][n].charCodeAt(0) !== 65533) {
			r[t[157][n]] = 40192 + n;
			e[40192 + n] = t[157][n]
		}
	t[158] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ›„æš¸æ›–æ›šæ› æ˜¿æ›¦æ›©æ›°æ›µæ›·æœæœ–æœžæœ¦æœ§éœ¸æœ®æœ¿æœ¶ææœ¸æœ·æ†æžæ æ™æ£æ¤æž‰æ°æž©æ¼æªæžŒæž‹æž¦æž¡æž…æž·æŸ¯æž´æŸ¬æž³æŸ©æž¸æŸ¤æŸžæŸæŸ¢æŸ®æž¹æŸŽæŸ†æŸ§æªœæ žæ¡†æ ©æ¡€æ¡æ ²æ¡Žï¿½æ¢³æ «æ¡™æ¡£æ¡·æ¡¿æ¢Ÿæ¢æ¢­æ¢”æ¢æ¢›æ¢ƒæª®æ¢¹æ¡´æ¢µæ¢ æ¢ºæ¤æ¢æ¡¾æ¤æ£Šæ¤ˆæ£˜æ¤¢æ¤¦æ£¡æ¤Œæ£æ£”æ£§æ£•æ¤¶æ¤’æ¤„æ£—æ££æ¤¥æ£¹æ£ æ£¯æ¤¨æ¤ªæ¤šæ¤£æ¤¡æ£†æ¥¹æ¥·æ¥œæ¥¸æ¥«æ¥”æ¥¾æ¥®æ¤¹æ¥´æ¤½æ¥™æ¤°æ¥¡æ¥žæ¥æ¦æ¥ªæ¦²æ¦®æ§æ¦¿æ§æ§“æ¦¾æ§Žå¯¨æ§Šæ§æ¦»æ§ƒæ¦§æ¨®æ¦‘æ¦ æ¦œæ¦•æ¦´æ§žæ§¨æ¨‚æ¨›æ§¿æ¬Šæ§¹æ§²æ§§æ¨…æ¦±æ¨žæ§­æ¨”æ§«æ¨Šæ¨’æ«æ¨£æ¨“æ©„æ¨Œæ©²æ¨¶æ©¸æ©‡æ©¢æ©™æ©¦æ©ˆæ¨¸æ¨¢æªæªæª æª„æª¢æª£ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[158].length; ++n)
		if (t[158][n].charCodeAt(0) !== 65533) {
			r[t[158][n]] = 40448 + n;
			e[40448 + n] = t[158][n]
		}
	t[159] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æª—è˜—æª»æ«ƒæ«‚æª¸æª³æª¬æ«žæ«‘æ«Ÿæªªæ«šæ«ªæ«»æ¬…è˜–æ«ºæ¬’æ¬–é¬±æ¬Ÿæ¬¸æ¬·ç›œæ¬¹é£®æ­‡æ­ƒæ­‰æ­æ­™æ­”æ­›æ­Ÿæ­¡æ­¸æ­¹æ­¿æ®€æ®„æ®ƒæ®æ®˜æ®•æ®žæ®¤æ®ªæ®«æ®¯æ®²æ®±æ®³æ®·æ®¼æ¯†æ¯‹æ¯“æ¯Ÿæ¯¬æ¯«æ¯³æ¯¯ï¿½éº¾æ°ˆæ°“æ°”æ°›æ°¤æ°£æ±žæ±•æ±¢æ±ªæ²‚æ²æ²šæ²æ²›æ±¾æ±¨æ±³æ²’æ²æ³„æ³±æ³“æ²½æ³—æ³…æ³æ²®æ²±æ²¾æ²ºæ³›æ³¯æ³™æ³ªæ´Ÿè¡æ´¶æ´«æ´½æ´¸æ´™æ´µæ´³æ´’æ´Œæµ£æ¶“æµ¤æµšæµ¹æµ™æ¶Žæ¶•æ¿¤æ¶…æ·¹æ¸•æ¸Šæ¶µæ·‡æ·¦æ¶¸æ·†æ·¬æ·žæ·Œæ·¨æ·’æ·…æ·ºæ·™æ·¤æ·•æ·ªæ·®æ¸­æ¹®æ¸®æ¸™æ¹²æ¹Ÿæ¸¾æ¸£æ¹«æ¸«æ¹¶æ¹æ¸Ÿæ¹ƒæ¸ºæ¹Žæ¸¤æ»¿æ¸æ¸¸æº‚æºªæº˜æ»‰æº·æ»“æº½æº¯æ»„æº²æ»”æ»•æºæº¥æ»‚æºŸæ½æ¼‘çŒæ»¬æ»¸æ»¾æ¼¿æ»²æ¼±æ»¯æ¼²æ»Œï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[159].length; ++n)
		if (t[159][n].charCodeAt(0) !== 65533) {
			r[t[159][n]] = 40704 + n;
			e[40704 + n] = t[159][n]
		}
	t[224] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¼¾æ¼“æ»·æ¾†æ½ºæ½¸æ¾æ¾€æ½¯æ½›æ¿³æ½­æ¾‚æ½¼æ½˜æ¾Žæ¾‘æ¿‚æ½¦æ¾³æ¾£æ¾¡æ¾¤æ¾¹æ¿†æ¾ªæ¿Ÿæ¿•æ¿¬æ¿”æ¿˜æ¿±æ¿®æ¿›ç€‰ç€‹æ¿ºç€‘ç€ç€æ¿¾ç€›ç€šæ½´ç€ç€˜ç€Ÿç€°ç€¾ç€²ç‘ç£ç‚™ç‚’ç‚¯çƒ±ç‚¬ç‚¸ç‚³ç‚®çƒŸçƒ‹çƒï¿½çƒ™ç„‰çƒ½ç„œç„™ç…¥ç…•ç†ˆç…¦ç…¢ç…Œç…–ç…¬ç†ç‡»ç†„ç†•ç†¨ç†¬ç‡—ç†¹ç†¾ç‡’ç‡‰ç‡”ç‡Žç‡ ç‡¬ç‡§ç‡µç‡¼ç‡¹ç‡¿çˆçˆçˆ›çˆ¨çˆ­çˆ¬çˆ°çˆ²çˆ»çˆ¼çˆ¿ç‰€ç‰†ç‰‹ç‰˜ç‰´ç‰¾çŠ‚çŠçŠ‡çŠ’çŠ–çŠ¢çŠ§çŠ¹çŠ²ç‹ƒç‹†ç‹„ç‹Žç‹’ç‹¢ç‹ ç‹¡ç‹¹ç‹·å€çŒ—çŒŠçŒœçŒ–çŒçŒ´çŒ¯çŒ©çŒ¥çŒ¾çŽçé»˜ç—çªç¨ç°ç¸çµç»çºçˆçŽ³çŽçŽ»ç€ç¥ç®çžç’¢ç…ç‘¯ç¥ç¸ç²çºç‘•ç¿ç‘Ÿç‘™ç‘ç‘œç‘©ç‘°ç‘£ç‘ªç‘¶ç‘¾ç’‹ç’žç’§ç“Šç“ç“”ç±ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[224].length; ++n)
		if (t[224][n].charCodeAt(0) !== 65533) {
			r[t[224][n]] = 57344 + n;
			e[57344 + n] = t[224][n]
		}
	t[225] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç“ ç“£ç“§ç“©ç“®ç“²ç“°ç“±ç“¸ç“·ç”„ç”ƒç”…ç”Œç”Žç”ç”•ç”“ç”žç”¦ç”¬ç”¼ç•„ç•ç•Šç•‰ç•›ç•†ç•šç•©ç•¤ç•§ç•«ç•­ç•¸ç•¶ç–†ç–‡ç•´ç–Šç–‰ç–‚ç–”ç–šç–ç–¥ç–£ç—‚ç–³ç—ƒç–µç–½ç–¸ç–¼ç–±ç—ç—Šç—’ç—™ç—£ç—žç—¾ç—¿ï¿½ç—¼ç˜ç—°ç—ºç—²ç—³ç˜‹ç˜ç˜‰ç˜Ÿç˜§ç˜ ç˜¡ç˜¢ç˜¤ç˜´ç˜°ç˜»ç™‡ç™ˆç™†ç™œç™˜ç™¡ç™¢ç™¨ç™©ç™ªç™§ç™¬ç™°ç™²ç™¶ç™¸ç™¼çš€çšƒçšˆçš‹çšŽçš–çš“çš™çššçš°çš´çš¸çš¹çšºç›‚ç›ç›–ç›’ç›žç›¡ç›¥ç›§ç›ªè˜¯ç›»çœˆçœ‡çœ„çœ©çœ¤çœžçœ¥çœ¦çœ›çœ·çœ¸ç‡çšç¨ç«ç›ç¥ç¿ç¾ç¹çžŽçž‹çž‘çž çžžçž°çž¶çž¹çž¿çž¼çž½çž»çŸ‡çŸçŸ—çŸšçŸœçŸ£çŸ®çŸ¼ç Œç ’ç¤¦ç  ç¤ªç¡…ç¢Žç¡´ç¢†ç¡¼ç¢šç¢Œç¢£ç¢µç¢ªç¢¯ç£‘ç£†ç£‹ç£”ç¢¾ç¢¼ç£…ç£Šç£¬ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[225].length; ++n)
		if (t[225][n].charCodeAt(0) !== 65533) {
			r[t[225][n]] = 57600 + n;
			e[57600 + n] = t[225][n]
		}
	t[226] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç£§ç£šç£½ç£´ç¤‡ç¤’ç¤‘ç¤™ç¤¬ç¤«ç¥€ç¥ ç¥—ç¥Ÿç¥šç¥•ç¥“ç¥ºç¥¿ç¦Šç¦ç¦§é½‹ç¦ªç¦®ç¦³ç¦¹ç¦ºç§‰ç§•ç§§ç§¬ç§¡ç§£ç¨ˆç¨ç¨˜ç¨™ç¨ ç¨Ÿç¦€ç¨±ç¨»ç¨¾ç¨·ç©ƒç©—ç©‰ç©¡ç©¢ç©©é¾ç©°ç©¹ç©½çªˆçª—çª•çª˜çª–çª©ç«ˆçª°ï¿½çª¶ç«…ç«„çª¿é‚ƒç«‡ç«Šç«ç«ç«•ç«“ç«™ç«šç«ç«¡ç«¢ç«¦ç«­ç«°ç¬‚ç¬ç¬Šç¬†ç¬³ç¬˜ç¬™ç¬žç¬µç¬¨ç¬¶ç­ç­ºç¬„ç­ç¬‹ç­Œç­…ç­µç­¥ç­´ç­§ç­°ç­±ç­¬ç­®ç®ç®˜ç®Ÿç®ç®œç®šç®‹ç®’ç®ç­ç®™ç¯‹ç¯ç¯Œç¯ç®´ç¯†ç¯ç¯©ç°‘ç°”ç¯¦ç¯¥ç± ç°€ç°‡ç°“ç¯³ç¯·ç°—ç°ç¯¶ç°£ç°§ç°ªç°Ÿç°·ç°«ç°½ç±Œç±ƒç±”ç±ç±€ç±ç±˜ç±Ÿç±¤ç±–ç±¥ç±¬ç±µç²ƒç²ç²¤ç²­ç²¢ç²«ç²¡ç²¨ç²³ç²²ç²±ç²®ç²¹ç²½ç³€ç³…ç³‚ç³˜ç³’ç³œç³¢é¬»ç³¯ç³²ç³´ç³¶ç³ºç´†ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[226].length; ++n)
		if (t[226][n].charCodeAt(0) !== 65533) {
			r[t[226][n]] = 57856 + n;
			e[57856 + n] = t[226][n]
		}
	t[227] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç´‚ç´œç´•ç´Šçµ…çµ‹ç´®ç´²ç´¿ç´µçµ†çµ³çµ–çµŽçµ²çµ¨çµ®çµçµ£ç¶“ç¶‰çµ›ç¶çµ½ç¶›ç¶ºç¶®ç¶£ç¶µç·‡ç¶½ç¶«ç¸½ç¶¢ç¶¯ç·œç¶¸ç¶Ÿç¶°ç·˜ç·ç·¤ç·žç·»ç·²ç·¡ç¸…ç¸Šç¸£ç¸¡ç¸’ç¸±ç¸Ÿç¸‰ç¸‹ç¸¢ç¹†ç¹¦ç¸»ç¸µç¸¹ç¹ƒç¸·ï¿½ç¸²ç¸ºç¹§ç¹ç¹–ç¹žç¹™ç¹šç¹¹ç¹ªç¹©ç¹¼ç¹»çºƒç·•ç¹½è¾®ç¹¿çºˆçº‰çºŒçº’çºçº“çº”çº–çºŽçº›çºœç¼¸ç¼ºç½…ç½Œç½ç½Žç½ç½‘ç½•ç½”ç½˜ç½Ÿç½ ç½¨ç½©ç½§ç½¸ç¾‚ç¾†ç¾ƒç¾ˆç¾‡ç¾Œç¾”ç¾žç¾ç¾šç¾£ç¾¯ç¾²ç¾¹ç¾®ç¾¶ç¾¸è­±ç¿…ç¿†ç¿Šç¿•ç¿”ç¿¡ç¿¦ç¿©ç¿³ç¿¹é£œè€†è€„è€‹è€’è€˜è€™è€œè€¡è€¨è€¿è€»èŠè†è’è˜èšèŸè¢è¨è³è²è°è¶è¹è½è¿è‚„è‚†è‚…è‚›è‚“è‚šè‚­å†è‚¬èƒ›èƒ¥èƒ™èƒèƒ„èƒšèƒ–è„‰èƒ¯èƒ±è„›è„©è„£è„¯è…‹ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[227].length; ++n)
		if (t[227][n].charCodeAt(0) !== 65533) {
			r[t[227][n]] = 58112 + n;
			e[58112 + n] = t[227][n]
		}
	t[228] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éš‹è…†è„¾è…“è…‘èƒ¼è…±è…®è…¥è…¦è…´è†ƒè†ˆè†Šè†€è†‚è† è†•è†¤è†£è…Ÿè†“è†©è†°è†µè†¾è†¸è†½è‡€è‡‚è†ºè‡‰è‡è‡‘è‡™è‡˜è‡ˆè‡šè‡Ÿè‡ è‡§è‡ºè‡»è‡¾èˆèˆ‚èˆ…èˆ‡èˆŠèˆèˆèˆ–èˆ©èˆ«èˆ¸èˆ³è‰€è‰™è‰˜è‰è‰šè‰Ÿè‰¤ï¿½è‰¢è‰¨è‰ªè‰«èˆ®è‰±è‰·è‰¸è‰¾èŠèŠ’èŠ«èŠŸèŠ»èŠ¬è‹¡è‹£è‹Ÿè‹’è‹´è‹³è‹ºèŽ“èŒƒè‹»è‹¹è‹žèŒ†è‹œèŒ‰è‹™èŒµèŒ´èŒ–èŒ²èŒ±è€èŒ¹èè…èŒ¯èŒ«èŒ—èŒ˜èŽ…èŽšèŽªèŽŸèŽ¢èŽ–èŒ£èŽŽèŽ‡èŽŠè¼èŽµè³èµèŽ èŽ‰èŽ¨è´è“è«èŽè½èƒè˜è‹èè·è‡è è²èè¢è èŽ½è¸è”†è»è‘­èªè¼è•šè’„è‘·è‘«è’­è‘®è’‚è‘©è‘†è¬è‘¯è‘¹èµè“Šè‘¢è’¹è’¿è’Ÿè“™è“è’»è“šè“è“è“†è“–è’¡è”¡è“¿è“´è”—è”˜è”¬è”Ÿè”•è””è“¼è•€è•£è•˜è•ˆï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[228].length; ++n)
		if (t[228][n].charCodeAt(0) !== 65533) {
			r[t[228][n]] = 58368 + n;
			e[58368 + n] = t[228][n]
		}
	t[229] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è•è˜‚è•‹è••è–€è–¤è–ˆè–‘è–Šè–¨è•­è–”è–›è—ªè–‡è–œè•·è•¾è–è—‰è–ºè—è–¹è—è—•è—è—¥è—œè—¹è˜Šè˜“è˜‹è—¾è—ºè˜†è˜¢è˜šè˜°è˜¿è™ä¹•è™”è™Ÿè™§è™±èš“èš£èš©èšªèš‹èšŒèš¶èš¯è›„è›†èš°è›‰è £èš«è›”è›žè›©è›¬ï¿½è›Ÿè››è›¯èœ’èœ†èœˆèœ€èœƒè›»èœ‘èœ‰èœè›¹èœŠèœ´èœ¿èœ·èœ»èœ¥èœ©èœšè èŸè¸èŒèŽè´è—è¨è®è™è“è£èªè …èž¢èžŸèž‚èž¯èŸ‹èž½èŸ€èŸé›–èž«èŸ„èž³èŸ‡èŸ†èž»èŸ¯èŸ²èŸ è è èŸ¾èŸ¶èŸ·è ŽèŸ’è ‘è –è •è ¢è ¡è ±è ¶è ¹è §è »è¡„è¡‚è¡’è¡™è¡žè¡¢è¡«è¢è¡¾è¢žè¡µè¡½è¢µè¡²è¢‚è¢—è¢’è¢®è¢™è¢¢è¢è¢¤è¢°è¢¿è¢±è£ƒè£„è£”è£˜è£™è£è£¹è¤‚è£¼è£´è£¨è£²è¤„è¤Œè¤Šè¤“è¥ƒè¤žè¤¥è¤ªè¤«è¥è¥„è¤»è¤¶è¤¸è¥Œè¤è¥ è¥žï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[229].length; ++n)
		if (t[229][n].charCodeAt(0) !== 65533) {
			r[t[229][n]] = 58624 + n;
			e[58624 + n] = t[229][n]
		}
	t[230] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¥¦è¥¤è¥­è¥ªè¥¯è¥´è¥·è¥¾è¦ƒè¦ˆè¦Šè¦“è¦˜è¦¡è¦©è¦¦è¦¬è¦¯è¦²è¦ºè¦½è¦¿è§€è§šè§œè§è§§è§´è§¸è¨ƒè¨–è¨è¨Œè¨›è¨è¨¥è¨¶è©è©›è©’è©†è©ˆè©¼è©­è©¬è©¢èª…èª‚èª„èª¨èª¡èª‘èª¥èª¦èªšèª£è«„è«è«‚è«šè««è«³è«§ï¿½è«¤è«±è¬”è« è«¢è«·è«žè«›è¬Œè¬‡è¬šè«¡è¬–è¬è¬—è¬ è¬³éž«è¬¦è¬«è¬¾è¬¨è­è­Œè­è­Žè­‰è­–è­›è­šè­«è­Ÿè­¬è­¯è­´è­½è®€è®Œè®Žè®’è®“è®–è®™è®šè°ºè±è°¿è±ˆè±Œè±Žè±è±•è±¢è±¬è±¸è±ºè²‚è²‰è²…è²Šè²è²Žè²”è±¼è²˜æˆè²­è²ªè²½è²²è²³è²®è²¶è³ˆè³è³¤è³£è³šè³½è³ºè³»è´„è´…è´Šè´‡è´è´è´é½Žè´“è³è´”è´–èµ§èµ­èµ±èµ³è¶è¶™è·‚è¶¾è¶ºè·è·šè·–è·Œè·›è·‹è·ªè·«è·Ÿè·£è·¼è¸ˆè¸‰è·¿è¸è¸žè¸è¸Ÿè¹‚è¸µè¸°è¸´è¹Šï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[230].length; ++n)
		if (t[230][n].charCodeAt(0) !== 65533) {
			r[t[230][n]] = 58880 + n;
			e[58880 + n] = t[230][n]
		}
	t[231] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¹‡è¹‰è¹Œè¹è¹ˆè¹™è¹¤è¹ è¸ªè¹£è¹•è¹¶è¹²è¹¼èºèº‡èº…èº„èº‹èºŠèº“èº‘èº”èº™èºªèº¡èº¬èº°è»†èº±èº¾è»…è»ˆè»‹è»›è»£è»¼è»»è»«è»¾è¼Šè¼…è¼•è¼’è¼™è¼“è¼œè¼Ÿè¼›è¼Œè¼¦è¼³è¼»è¼¹è½…è½‚è¼¾è½Œè½‰è½†è½Žè½—è½œï¿½è½¢è½£è½¤è¾œè¾Ÿè¾£è¾­è¾¯è¾·è¿šè¿¥è¿¢è¿ªè¿¯é‚‡è¿´é€…è¿¹è¿ºé€‘é€•é€¡é€é€žé€–é€‹é€§é€¶é€µé€¹è¿¸ééé‘é’é€Žé‰é€¾é–é˜éžé¨é¯é¶éš¨é²é‚‚é½é‚é‚€é‚Šé‚‰é‚é‚¨é‚¯é‚±é‚µéƒ¢éƒ¤æ‰ˆéƒ›é„‚é„’é„™é„²é„°é…Šé…–é…˜é…£é…¥é…©é…³é…²é†‹é†‰é†‚é†¢é†«é†¯é†ªé†µé†´é†ºé‡€é‡é‡‰é‡‹é‡é‡–é‡Ÿé‡¡é‡›é‡¼é‡µé‡¶éˆžé‡¿éˆ”éˆ¬éˆ•éˆ‘é‰žé‰—é‰…é‰‰é‰¤é‰ˆéŠ•éˆ¿é‰‹é‰éŠœéŠ–éŠ“éŠ›é‰šé‹éŠ¹éŠ·é‹©éŒé‹ºé„éŒ®ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[231].length; ++n)
		if (t[231][n].charCodeAt(0) !== 65533) {
			r[t[231][n]] = 59136 + n;
			e[59136 + n] = t[231][n]
		}
	t[232] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŒ™éŒ¢éŒšéŒ£éŒºéŒµéŒ»éœé é¼é®é–éŽ°éŽ¬éŽ­éŽ”éŽ¹é–é—é¨é¥é˜éƒéééˆé¤éšé”é“éƒé‡éé¶é«éµé¡éºé‘é‘’é‘„é‘›é‘ é‘¢é‘žé‘ªéˆ©é‘°é‘µé‘·é‘½é‘šé‘¼é‘¾é’é‘¿é–‚é–‡é–Šé–”é––é–˜é–™ï¿½é– é–¨é–§é–­é–¼é–»é–¹é–¾é—Šæ¿¶é—ƒé—é—Œé—•é—”é—–é—œé—¡é—¥é—¢é˜¡é˜¨é˜®é˜¯é™‚é™Œé™é™‹é™·é™œé™žé™é™Ÿé™¦é™²é™¬éšéš˜éš•éš—éšªéš§éš±éš²éš°éš´éš¶éš¸éš¹é›Žé›‹é›‰é›è¥é›œéœé›•é›¹éœ„éœ†éœˆéœ“éœŽéœ‘éœéœ–éœ™éœ¤éœªéœ°éœ¹éœ½éœ¾é„é†éˆé‚é‰éœé é¤é¦é¨å‹’é«é±é¹éž…é¼éžéºéž†éž‹éžéžéžœéž¨éž¦éž£éž³éž´éŸƒéŸ†éŸˆéŸ‹éŸœéŸ­é½éŸ²ç«ŸéŸ¶éŸµé é Œé ¸é ¤é ¡é ·é ½é¡†é¡é¡‹é¡«é¡¯é¡°ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[232].length; ++n)
		if (t[232][n].charCodeAt(0) !== 65533) {
			r[t[232][n]] = 59392 + n;
			e[59392 + n] = t[232][n]
		}
	t[233] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¡±é¡´é¡³é¢ªé¢¯é¢±é¢¶é£„é£ƒé£†é£©é£«é¤ƒé¤‰é¤’é¤”é¤˜é¤¡é¤é¤žé¤¤é¤ é¤¬é¤®é¤½é¤¾é¥‚é¥‰é¥…é¥é¥‹é¥‘é¥’é¥Œé¥•é¦—é¦˜é¦¥é¦­é¦®é¦¼é§Ÿé§›é§é§˜é§‘é§­é§®é§±é§²é§»é§¸é¨é¨é¨…é§¢é¨™é¨«é¨·é©…é©‚é©€é©ƒï¿½é¨¾é©•é©é©›é©—é©Ÿé©¢é©¥é©¤é©©é©«é©ªéª­éª°éª¼é«€é«é«‘é«“é«”é«žé«Ÿé«¢é«£é«¦é«¯é««é«®é«´é«±é«·é«»é¬†é¬˜é¬šé¬Ÿé¬¢é¬£é¬¥é¬§é¬¨é¬©é¬ªé¬®é¬¯é¬²é­„é­ƒé­é­é­Žé­‘é­˜é­´é®“é®ƒé®‘é®–é®—é®Ÿé® é®¨é®´é¯€é¯Šé®¹é¯†é¯é¯‘é¯’é¯£é¯¢é¯¤é¯”é¯¡é°ºé¯²é¯±é¯°é°•é°”é°‰é°“é°Œé°†é°ˆé°’é°Šé°„é°®é°›é°¥é°¤é°¡é°°é±‡é°²é±†é°¾é±šé± é±§é±¶é±¸é³§é³¬é³°é´‰é´ˆé³«é´ƒé´†é´ªé´¦é¶¯é´£é´Ÿéµ„é´•é´’éµé´¿é´¾éµ†éµˆï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[233].length; ++n)
		if (t[233][n].charCodeAt(0) !== 65533) {
			r[t[233][n]] = 59648 + n;
			e[59648 + n] = t[233][n]
		}
	t[234] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éµéµžéµ¤éµ‘éµéµ™éµ²é¶‰é¶‡é¶«éµ¯éµºé¶šé¶¤é¶©é¶²é·„é·é¶»é¶¸é¶ºé·†é·é·‚é·™é·“é·¸é·¦é·­é·¯é·½é¸šé¸›é¸žé¹µé¹¹é¹½éºéºˆéº‹éºŒéº’éº•éº‘éºéº¥éº©éº¸éºªéº­é¡é»Œé»Žé»é»é»”é»œé»žé»é» é»¥é»¨é»¯ï¿½é»´é»¶é»·é»¹é»»é»¼é»½é¼‡é¼ˆçš·é¼•é¼¡é¼¬é¼¾é½Šé½’é½”é½£é½Ÿé½ é½¡é½¦é½§é½¬é½ªé½·é½²é½¶é¾•é¾œé¾ å ¯æ§‡é™ç‘¤å‡œç†™ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[234].length; ++n)
		if (t[234][n].charCodeAt(0) !== 65533) {
			r[t[234][n]] = 59904 + n;
			e[59904 + n] = t[234][n]
		}
	t[237] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çºŠè¤œéˆéŠˆè“œä¿‰ç‚»æ˜±æ£ˆé‹¹æ›»å½…ä¸¨ä»¡ä»¼ä¼€ä¼ƒä¼¹ä½–ä¾’ä¾Šä¾šä¾”ä¿å€å€¢ä¿¿å€žå†å°å‚å‚”åƒ´åƒ˜å…Šå…¤å†å†¾å‡¬åˆ•åŠœåŠ¦å‹€å‹›åŒ€åŒ‡åŒ¤å²åŽ“åŽ²åï¨Žå’œå’Šå’©å“¿å–†å™å¥åž¬åŸˆåŸ‡ï¨ï¿½ï¨å¢žå¢²å¤‹å¥“å¥›å¥å¥£å¦¤å¦ºå­–å¯€ç”¯å¯˜å¯¬å°žå²¦å²ºå³µå´§åµ“ï¨‘åµ‚åµ­å¶¸å¶¹å·å¼¡å¼´å½§å¾·å¿žææ‚…æ‚Šæƒžæƒ•æ„ æƒ²æ„‘æ„·æ„°æ†˜æˆ“æŠ¦æµæ‘ æ’æ“Žæ•Žæ˜€æ˜•æ˜»æ˜‰æ˜®æ˜žæ˜¤æ™¥æ™—æ™™ï¨’æ™³æš™æš æš²æš¿æ›ºæœŽï¤©æ¦æž»æ¡’æŸ€æ æ¡„æ£ï¨“æ¥¨ï¨”æ¦˜æ§¢æ¨°æ©«æ©†æ©³æ©¾æ«¢æ«¤æ¯–æ°¿æ±œæ²†æ±¯æ³šæ´„æ¶‡æµ¯æ¶–æ¶¬æ·æ·¸æ·²æ·¼æ¸¹æ¹œæ¸§æ¸¼æº¿æ¾ˆæ¾µæ¿µç€…ç€‡ç€¨ç‚…ç‚«ç„ç„„ç…œç…†ç…‡ï¨•ç‡ç‡¾çŠ±ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[237].length; ++n)
		if (t[237][n].charCodeAt(0) !== 65533) {
			r[t[237][n]] = 60672 + n;
			e[60672 + n] = t[237][n]
		}
	t[238] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çŠ¾çŒ¤ï¨–ç·çŽ½ç‰ç–ç£ç’ç‡çµç¦çªç©ç®ç‘¢ç’‰ç’Ÿç”ç•¯çš‚çšœçšžçš›çš¦ï¨—ç†åŠ¯ç ¡ç¡Žç¡¤ç¡ºç¤°ï¨˜ï¨™ï¨šç¦”ï¨›ç¦›ç«‘ç«§ï¨œç««ç®žï¨çµˆçµœç¶·ç¶ ç·–ç¹’ç½‡ç¾¡ï¨žèŒè¢è¿è‡è¶è‘ˆè’´è•“è•™ï¿½è•«ï¨Ÿè–°ï¨ ï¨¡è ‡è£µè¨’è¨·è©¹èª§èª¾è«Ÿï¨¢è«¶è­“è­¿è³°è³´è´’èµ¶ï¨£è»ï¨¤ï¨¥é§éƒžï¨¦é„•é„§é‡šé‡—é‡žé‡­é‡®é‡¤é‡¥éˆ†éˆéˆŠéˆºé‰€éˆ¼é‰Žé‰™é‰‘éˆ¹é‰§éŠ§é‰·é‰¸é‹§é‹—é‹™é‹ï¨§é‹•é‹ é‹“éŒ¥éŒ¡é‹»ï¨¨éŒžé‹¿éŒéŒ‚é°é—éŽ¤é†éžé¸é±é‘…é‘ˆé–’ï§œï¨©éšéš¯éœ³éœ»éƒééé‘é•é¡—é¡¥ï¨ªï¨«é¤§ï¨¬é¦žé©Žé«™é«œé­µé­²é®é®±é®»é°€éµ°éµ«ï¨­é¸™é»‘ï¿½ï¿½â…°â…±â…²â…³â…´â…µâ…¶â…·â…¸â…¹ï¿¢ï¿¤ï¼‡ï¼‚ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[238].length; ++n)
		if (t[238][n].charCodeAt(0) !== 65533) {
			r[t[238][n]] = 60928 + n;
			e[60928 + n] = t[238][n]
		}
	t[250] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â…°â…±â…²â…³â…´â…µâ…¶â…·â…¸â…¹â… â…¡â…¢â…£â…¤â…¥â…¦â…§â…¨â…©ï¿¢ï¿¤ï¼‡ï¼‚ãˆ±â„–â„¡âˆµçºŠè¤œéˆéŠˆè“œä¿‰ç‚»æ˜±æ£ˆé‹¹æ›»å½…ä¸¨ä»¡ä»¼ä¼€ä¼ƒä¼¹ä½–ä¾’ä¾Šä¾šä¾”ä¿å€å€¢ä¿¿å€žå†å°å‚å‚”åƒ´åƒ˜å…Šï¿½å…¤å†å†¾å‡¬åˆ•åŠœåŠ¦å‹€å‹›åŒ€åŒ‡åŒ¤å²åŽ“åŽ²åï¨Žå’œå’Šå’©å“¿å–†å™å¥åž¬åŸˆåŸ‡ï¨ï¨å¢žå¢²å¤‹å¥“å¥›å¥å¥£å¦¤å¦ºå­–å¯€ç”¯å¯˜å¯¬å°žå²¦å²ºå³µå´§åµ“ï¨‘åµ‚åµ­å¶¸å¶¹å·å¼¡å¼´å½§å¾·å¿žææ‚…æ‚Šæƒžæƒ•æ„ æƒ²æ„‘æ„·æ„°æ†˜æˆ“æŠ¦æµæ‘ æ’æ“Žæ•Žæ˜€æ˜•æ˜»æ˜‰æ˜®æ˜žæ˜¤æ™¥æ™—æ™™ï¨’æ™³æš™æš æš²æš¿æ›ºæœŽï¤©æ¦æž»æ¡’æŸ€æ æ¡„æ£ï¨“æ¥¨ï¨”æ¦˜æ§¢æ¨°æ©«æ©†æ©³æ©¾æ«¢æ«¤æ¯–æ°¿æ±œæ²†æ±¯æ³šæ´„æ¶‡æµ¯ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[250].length; ++n)
		if (t[250][n].charCodeAt(0) !== 65533) {
			r[t[250][n]] = 64e3 + n;
			e[64e3 + n] = t[250][n]
		}
	t[251] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¶–æ¶¬æ·æ·¸æ·²æ·¼æ¸¹æ¹œæ¸§æ¸¼æº¿æ¾ˆæ¾µæ¿µç€…ç€‡ç€¨ç‚…ç‚«ç„ç„„ç…œç…†ç…‡ï¨•ç‡ç‡¾çŠ±çŠ¾çŒ¤ï¨–ç·çŽ½ç‰ç–ç£ç’ç‡çµç¦çªç©ç®ç‘¢ç’‰ç’Ÿç”ç•¯çš‚çšœçšžçš›çš¦ï¨—ç†åŠ¯ç ¡ç¡Žç¡¤ç¡ºç¤°ï¨˜ï¨™ï¿½ï¨šç¦”ï¨›ç¦›ç«‘ç«§ï¨œç««ç®žï¨çµˆçµœç¶·ç¶ ç·–ç¹’ç½‡ç¾¡ï¨žèŒè¢è¿è‡è¶è‘ˆè’´è•“è•™è•«ï¨Ÿè–°ï¨ ï¨¡è ‡è£µè¨’è¨·è©¹èª§èª¾è«Ÿï¨¢è«¶è­“è­¿è³°è³´è´’èµ¶ï¨£è»ï¨¤ï¨¥é§éƒžï¨¦é„•é„§é‡šé‡—é‡žé‡­é‡®é‡¤é‡¥éˆ†éˆéˆŠéˆºé‰€éˆ¼é‰Žé‰™é‰‘éˆ¹é‰§éŠ§é‰·é‰¸é‹§é‹—é‹™é‹ï¨§é‹•é‹ é‹“éŒ¥éŒ¡é‹»ï¨¨éŒžé‹¿éŒéŒ‚é°é—éŽ¤é†éžé¸é±é‘…é‘ˆé–’ï§œï¨©éšéš¯éœ³éœ»éƒééé‘é•é¡—é¡¥ï¨ªï¨«é¤§ï¨¬é¦žé©Žé«™ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[251].length; ++n)
		if (t[251][n].charCodeAt(0) !== 65533) {
			r[t[251][n]] = 64256 + n;
			e[64256 + n] = t[251][n]
		}
	t[252] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é«œé­µé­²é®é®±é®»é°€éµ°éµ«ï¨­é¸™é»‘ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[252].length; ++n)
		if (t[252][n].charCodeAt(0) !== 65533) {
			r[t[252][n]] = 64512 + n;
			e[64512 + n] = t[252][n]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[936] = function () {
	var e = [],
		r = {},
		t = [],
		n;
	t[0] =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[0].length; ++n)
		if (t[0][n].charCodeAt(0) !== 65533) {
			r[t[0][n]] = 0 + n;
			e[0 + n] = t[0][n]
		}
	t[129] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¸‚ä¸„ä¸…ä¸†ä¸ä¸’ä¸—ä¸Ÿä¸ ä¸¡ä¸£ä¸¦ä¸©ä¸®ä¸¯ä¸±ä¸³ä¸µä¸·ä¸¼ä¹€ä¹ä¹‚ä¹„ä¹†ä¹Šä¹‘ä¹•ä¹—ä¹šä¹›ä¹¢ä¹£ä¹¤ä¹¥ä¹§ä¹¨ä¹ªä¹«ä¹¬ä¹­ä¹®ä¹¯ä¹²ä¹´ä¹µä¹¶ä¹·ä¹¸ä¹¹ä¹ºä¹»ä¹¼ä¹½ä¹¿äº€äºäº‚äºƒäº„äº…äº‡äºŠï¿½äºäº–äº—äº™äºœäºäºžäº£äºªäº¯äº°äº±äº´äº¶äº·äº¸äº¹äº¼äº½äº¾ä»ˆä»Œä»ä»ä»’ä»šä»›ä»œä» ä»¢ä»¦ä»§ä»©ä»­ä»®ä»¯ä»±ä»´ä»¸ä»¹ä»ºä»¼ä»¾ä¼€ä¼‚ä¼ƒä¼„ä¼…ä¼†ä¼‡ä¼ˆä¼‹ä¼Œä¼’ä¼“ä¼”ä¼•ä¼–ä¼œä¼ä¼¡ä¼£ä¼¨ä¼©ä¼¬ä¼­ä¼®ä¼±ä¼³ä¼µä¼·ä¼¹ä¼»ä¼¾ä¼¿ä½€ä½ä½‚ä½„ä½…ä½‡ä½ˆä½‰ä½Šä½‹ä½Œä½’ä½”ä½–ä½¡ä½¢ä½¦ä½¨ä½ªä½«ä½­ä½®ä½±ä½²ä½µä½·ä½¸ä½¹ä½ºä½½ä¾€ä¾ä¾‚ä¾…ä¾†ä¾‡ä¾Šä¾Œä¾Žä¾ä¾’ä¾“ä¾•ä¾–ä¾˜ä¾™ä¾šä¾œä¾žä¾Ÿä¾¡ä¾¢ï¿½"
		.split("");
	for (n = 0; n != t[129].length; ++n)
		if (t[129][n].charCodeAt(0) !== 65533) {
			r[t[129][n]] = 33024 + n;
			e[33024 + n] = t[129][n]
		}
	t[130] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¾¤ä¾«ä¾­ä¾°ä¾±ä¾²ä¾³ä¾´ä¾¶ä¾·ä¾¸ä¾¹ä¾ºä¾»ä¾¼ä¾½ä¾¾ä¿€ä¿ä¿‚ä¿†ä¿‡ä¿ˆä¿‰ä¿‹ä¿Œä¿ä¿’ä¿“ä¿”ä¿•ä¿–ä¿™ä¿›ä¿ ä¿¢ä¿¤ä¿¥ä¿§ä¿«ä¿¬ä¿°ä¿²ä¿´ä¿µä¿¶ä¿·ä¿¹ä¿»ä¿¼ä¿½ä¿¿å€€å€å€‚å€ƒå€„å€…å€†å€‡å€ˆå€‰å€Šï¿½å€‹å€Žå€å€‘å€“å€•å€–å€—å€›å€å€žå€ å€¢å€£å€¤å€§å€«å€¯å€°å€±å€²å€³å€´å€µå€¶å€·å€¸å€¹å€»å€½å€¿å€åå‚å„å…å†å‰åŠå‹ååå‘å’å“å”å–å—å˜å™å›ååžåŸå å¡å¢å£å¤å¦å§å¨å©åªå«å­å®å¯å°å±å²å³å´åµå¸å¹åºå¼å½å‚å‚‚å‚ƒå‚„å‚†å‚‡å‚‰å‚Šå‚‹å‚Œå‚Žå‚å‚å‚‘å‚’å‚“å‚”å‚•å‚–å‚—å‚˜å‚™å‚šå‚›å‚œå‚å‚žå‚Ÿå‚ å‚¡å‚¢å‚¤å‚¦å‚ªå‚«å‚­å‚®å‚¯å‚°å‚±å‚³å‚´å‚µå‚¶å‚·å‚¸å‚¹å‚¼ï¿½"
		.split("");
	for (n = 0; n != t[130].length; ++n)
		if (t[130][n].charCodeAt(0) !== 65533) {
			r[t[130][n]] = 33280 + n;
			e[33280 + n] = t[130][n]
		}
	t[131] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å‚½å‚¾å‚¿åƒ€åƒåƒ‚åƒƒåƒ„åƒ…åƒ†åƒ‡åƒˆåƒ‰åƒŠåƒ‹åƒŒåƒåƒŽåƒåƒ‘åƒ’åƒ“åƒ”åƒ•åƒ—åƒ˜åƒ™åƒ›åƒœåƒåƒžåƒŸåƒ åƒ¡åƒ¢åƒ£åƒ¤åƒ¥åƒ¨åƒ©åƒªåƒ«åƒ¯åƒ°åƒ±åƒ²åƒ´åƒ¶åƒ·åƒ¸åƒ¹åƒºåƒ¼åƒ½åƒ¾åƒ¿å„€å„å„‚å„ƒå„„å„…å„ˆï¿½å„‰å„Šå„Œå„å„Žå„å„å„‘å„“å„”å„•å„–å„—å„˜å„™å„šå„›å„œå„å„žå„Ÿå„ å„¢å„£å„¤å„¥å„¦å„§å„¨å„©å„ªå„«å„¬å„­å„®å„¯å„°å„±å„²å„³å„´å„µå„¶å„·å„¸å„¹å„ºå„»å„¼å„½å„¾å…‚å…‡å…Šå…Œå…Žå…å…å…’å…“å…—å…˜å…™å…›å…å…žå…Ÿå… å…¡å…£å…¤å…¦å…§å…©å…ªå…¯å…²å…ºå…¾å…¿å†ƒå†„å††å†‡å†Šå†‹å†Žå†å†å†‘å†“å†”å†˜å†šå†å†žå†Ÿå†¡å†£å†¦å†§å†¨å†©å†ªå†­å†®å†´å†¸å†¹å†ºå†¾å†¿å‡å‡‚å‡ƒå‡…å‡ˆå‡Šå‡å‡Žå‡å‡’å‡“å‡”å‡•å‡–å‡—ï¿½"
		.split("");
	for (n = 0; n != t[131].length; ++n)
		if (t[131][n].charCodeAt(0) !== 65533) {
			r[t[131][n]] = 33536 + n;
			e[33536 + n] = t[131][n]
		}
	t[132] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å‡˜å‡™å‡šå‡œå‡žå‡Ÿå‡¢å‡£å‡¥å‡¦å‡§å‡¨å‡©å‡ªå‡¬å‡®å‡±å‡²å‡´å‡·å‡¾åˆ„åˆ…åˆ‰åˆ‹åˆŒåˆåˆåˆ“åˆ”åˆ•åˆœåˆžåˆŸåˆ¡åˆ¢åˆ£åˆ¥åˆ¦åˆ§åˆªåˆ¬åˆ¯åˆ±åˆ²åˆ´åˆµåˆ¼åˆ¾å‰„å‰…å‰†å‰‡å‰ˆå‰‰å‰‹å‰Žå‰å‰’å‰“å‰•å‰—å‰˜ï¿½å‰™å‰šå‰›å‰å‰Ÿå‰ å‰¢å‰£å‰¤å‰¦å‰¨å‰«å‰¬å‰­å‰®å‰°å‰±å‰³å‰´å‰µå‰¶å‰·å‰¸å‰¹å‰ºå‰»å‰¼å‰¾åŠ€åŠƒåŠ„åŠ…åŠ†åŠ‡åŠ‰åŠŠåŠ‹åŠŒåŠåŠŽåŠåŠ‘åŠ’åŠ”åŠ•åŠ–åŠ—åŠ˜åŠ™åŠšåŠœåŠ¤åŠ¥åŠ¦åŠ§åŠ®åŠ¯åŠ°åŠ´åŠµåŠ¶åŠ·åŠ¸åŠ¹åŠºåŠ»åŠ¼åŠ½å‹€å‹å‹‚å‹„å‹…å‹†å‹ˆå‹Šå‹Œå‹å‹Žå‹å‹‘å‹“å‹”å‹•å‹—å‹™å‹šå‹›å‹œå‹å‹žå‹ å‹¡å‹¢å‹£å‹¥å‹¦å‹§å‹¨å‹©å‹ªå‹«å‹¬å‹­å‹®å‹¯å‹±å‹²å‹³å‹´å‹µå‹¶å‹·å‹¸å‹»å‹¼å‹½åŒåŒ‚åŒƒåŒ„åŒ‡åŒ‰åŒŠåŒ‹åŒŒåŒŽï¿½"
		.split("");
	for (n = 0; n != t[132].length; ++n)
		if (t[132][n].charCodeAt(0) !== 65533) {
			r[t[132][n]] = 33792 + n;
			e[33792 + n] = t[132][n]
		}
	t[133] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åŒ‘åŒ’åŒ“åŒ”åŒ˜åŒ›åŒœåŒžåŒŸåŒ¢åŒ¤åŒ¥åŒ§åŒ¨åŒ©åŒ«åŒ¬åŒ­åŒ¯åŒ°åŒ±åŒ²åŒ³åŒ´åŒµåŒ¶åŒ·åŒ¸åŒ¼åŒ½å€å‚å„å†å‹åŒååå”å˜å™å›åå¥å¨åªå¬å­å²å¶å¹å»å¼å½å¾åŽ€åŽåŽƒåŽ‡åŽˆåŽŠåŽŽåŽï¿½åŽåŽ‘åŽ’åŽ“åŽ”åŽ–åŽ—åŽ™åŽ›åŽœåŽžåŽ åŽ¡åŽ¤åŽ§åŽªåŽ«åŽ¬åŽ­åŽ¯åŽ°åŽ±åŽ²åŽ³åŽ´åŽµåŽ·åŽ¸åŽ¹åŽºåŽ¼åŽ½åŽ¾å€åƒå„å…å†å‡åŽååå’å“å•åšåœååžå¡å¢å§å´åºå¾å¿å€å‚å…å‡å‹å”å˜å™åšåœå¢å¤å¥åªå°å³å¶å·åºå½å¿å‘å‘‚å‘„å‘…å‘‡å‘‰å‘Œå‘å‘Žå‘å‘‘å‘šå‘å‘žå‘Ÿå‘ å‘¡å‘£å‘¥å‘§å‘©å‘ªå‘«å‘¬å‘­å‘®å‘¯å‘°å‘´å‘¹å‘ºå‘¾å‘¿å’å’ƒå’…å’‡å’ˆå’‰å’Šå’å’‘å’“å’—å’˜å’œå’žå’Ÿå’ å’¡ï¿½"
		.split("");
	for (n = 0; n != t[133].length; ++n)
		if (t[133][n].charCodeAt(0) !== 65533) {
			r[t[133][n]] = 34048 + n;
			e[34048 + n] = t[133][n]
		}
	t[134] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å’¢å’¥å’®å’°å’²å’µå’¶å’·å’¹å’ºå’¼å’¾å“ƒå“…å“Šå“‹å“–å“˜å“›å“ å“¡å“¢å“£å“¤å“«å“¬å“¯å“°å“±å“´å“µå“¶å“·å“¸å“¹å“»å“¾å”€å”‚å”ƒå”„å”…å”ˆå”Šå”‹å”Œå”å”Žå”’å”“å”•å”–å”—å”˜å”™å”šå”œå”å”žå”Ÿå”¡å”¥å”¦ï¿½å”¨å”©å”«å”­å”²å”´å”µå”¶å”¸å”¹å”ºå”»å”½å•€å•‚å•…å•‡å•ˆå•‹å•Œå•å•Žå•å•‘å•’å•“å•”å•—å•˜å•™å•šå•›å•å•žå•Ÿå• å•¢å•£å•¨å•©å•«å•¯å•°å•±å•²å•³å•´å•¹å•ºå•½å•¿å–…å–†å–Œå–å–Žå–å–’å–“å–•å––å–—å–šå–›å–žå– å–¡å–¢å–£å–¤å–¥å–¦å–¨å–©å–ªå–«å–¬å–­å–®å–¯å–°å–²å–´å–¶å–¸å–ºå–¼å–¿å—€å—å—‚å—ƒå—†å—‡å—ˆå—Šå—‹å—Žå—å—å—•å——å—˜å—™å—šå—›å—žå— å—¢å—§å—©å—­å—®å—°å—±å—´å—¶å—¸å—¹å—ºå—»å—¼å—¿å˜‚å˜ƒå˜„å˜…ï¿½"
		.split("");
	for (n = 0; n != t[134].length; ++n)
		if (t[134][n].charCodeAt(0) !== 65533) {
			r[t[134][n]] = 34304 + n;
			e[34304 + n] = t[134][n]
		}
	t[135] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å˜†å˜‡å˜Šå˜‹å˜å˜å˜‘å˜’å˜“å˜”å˜•å˜–å˜—å˜™å˜šå˜œå˜å˜ å˜¡å˜¢å˜¥å˜¦å˜¨å˜©å˜ªå˜«å˜®å˜¯å˜°å˜³å˜µå˜·å˜¸å˜ºå˜¼å˜½å˜¾å™€å™å™‚å™ƒå™„å™…å™†å™‡å™ˆå™‰å™Šå™‹å™å™å™‘å™’å™“å™•å™–å™šå™›å™å™žå™Ÿå™ å™¡ï¿½å™£å™¥å™¦å™§å™­å™®å™¯å™°å™²å™³å™´å™µå™·å™¸å™¹å™ºå™½å™¾å™¿åš€åšåš‚åšƒåš„åš‡åšˆåš‰åšŠåš‹åšŒåšåšåš‘åš’åš”åš•åš–åš—åš˜åš™åššåš›åšœåšåšžåšŸåš åš¡åš¢åš¤åš¥åš¦åš§åš¨åš©åšªåš«åš¬åš­åš®åš°åš±åš²åš³åš´åšµåš¶åš¸åš¹åšºåš»åš½åš¾åš¿å›€å›å›‚å›ƒå›„å›…å›†å›‡å›ˆå›‰å›‹å›Œå›å›Žå›å›å›‘å›’å›“å›•å›–å›˜å›™å›œå›£å›¥å›¦å›§å›¨å›©å›ªå›¬å›®å›¯å›²å›³å›¶å›·å›¸å›»å›¼åœ€åœåœ‚åœ…åœ‡åœ‹åœŒåœåœŽåœåœåœ‘ï¿½"
		.split("");
	for (n = 0; n != t[135].length; ++n)
		if (t[135][n].charCodeAt(0) !== 65533) {
			r[t[135][n]] = 34560 + n;
			e[34560 + n] = t[135][n]
		}
	t[136] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åœ’åœ“åœ”åœ•åœ–åœ—åœ˜åœ™åœšåœ›åœåœžåœ åœ¡åœ¢åœ¤åœ¥åœ¦åœ§åœ«åœ±åœ²åœ´åœµåœ¶åœ·åœ¸åœ¼åœ½åœ¿ååƒå„å…å†åˆå‰å‹å’å“å”å•å–å˜å™å¢å£å¥å§å¬å®å°å±å²å´åµå¸å¹åºå½å¾å¿åž€ï¿½åžåž‡åžˆåž‰åžŠåžåžŽåžåžåž‘åž”åž•åž–åž—åž˜åž™åžšåžœåžåžžåžŸåž¥åž¨åžªåž¬åž¯åž°åž±åž³åžµåž¶åž·åž¹åžºåž»åž¼åž½åž¾åž¿åŸ€åŸåŸ„åŸ…åŸ†åŸ‡åŸˆåŸ‰åŸŠåŸŒåŸåŸåŸ‘åŸ“åŸ–åŸ—åŸ›åŸœåŸžåŸ¡åŸ¢åŸ£åŸ¥åŸ¦åŸ§åŸ¨åŸ©åŸªåŸ«åŸ¬åŸ®åŸ°åŸ±åŸ²åŸ³åŸµåŸ¶åŸ·åŸ»åŸ¼åŸ¾åŸ¿å å ƒå „å …å ˆå ‰å Šå Œå Žå å å ’å “å ”å –å —å ˜å šå ›å œå å Ÿå ¢å £å ¥å ¦å §å ¨å ©å «å ¬å ­å ®å ¯å ±å ²å ³å ´å ¶å ·å ¸å ¹å ºå »å ¼å ½ï¿½"
		.split("");
	for (n = 0; n != t[136].length; ++n)
		if (t[136][n].charCodeAt(0) !== 65533) {
			r[t[136][n]] = 34816 + n;
			e[34816 + n] = t[136][n]
		}
	t[137] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å ¾å ¿å¡€å¡å¡‚å¡ƒå¡…å¡†å¡‡å¡ˆå¡‰å¡Šå¡‹å¡Žå¡å¡å¡’å¡“å¡•å¡–å¡—å¡™å¡šå¡›å¡œå¡å¡Ÿå¡ å¡¡å¡¢å¡£å¡¤å¡¦å¡§å¡¨å¡©å¡ªå¡­å¡®å¡¯å¡°å¡±å¡²å¡³å¡´å¡µå¡¶å¡·å¡¸å¡¹å¡ºå¡»å¡¼å¡½å¡¿å¢‚å¢„å¢†å¢‡å¢ˆå¢Šå¢‹å¢Œï¿½å¢å¢Žå¢å¢å¢‘å¢”å¢•å¢–å¢—å¢˜å¢›å¢œå¢å¢ å¢¡å¢¢å¢£å¢¤å¢¥å¢¦å¢§å¢ªå¢«å¢¬å¢­å¢®å¢¯å¢°å¢±å¢²å¢³å¢´å¢µå¢¶å¢·å¢¸å¢¹å¢ºå¢»å¢½å¢¾å¢¿å£€å£‚å£ƒå£„å£†å£‡å£ˆå£‰å£Šå£‹å£Œå£å£Žå£å£å£’å£“å£”å£–å£—å£˜å£™å£šå£›å£œå£å£žå£Ÿå£ å£¡å£¢å££å£¥å£¦å£§å£¨å£©å£ªå£­å£¯å£±å£²å£´å£µå£·å£¸å£ºå£»å£¼å£½å£¾å£¿å¤€å¤å¤ƒå¤…å¤†å¤ˆå¤‰å¤Šå¤‹å¤Œå¤Žå¤å¤‘å¤’å¤“å¤—å¤˜å¤›å¤å¤žå¤ å¤¡å¤¢å¤£å¤¦å¤¨å¤¬å¤°å¤²å¤³å¤µå¤¶å¤»ï¿½"
		.split("");
	for (n = 0; n != t[137].length; ++n)
		if (t[137][n].charCodeAt(0) !== 65533) {
			r[t[137][n]] = 35072 + n;
			e[35072 + n] = t[137][n]
		}
	t[138] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¤½å¤¾å¤¿å¥€å¥ƒå¥…å¥†å¥Šå¥Œå¥å¥å¥’å¥“å¥™å¥›å¥œå¥å¥žå¥Ÿå¥¡å¥£å¥¤å¥¦å¥§å¥¨å¥©å¥ªå¥«å¥¬å¥­å¥®å¥¯å¥°å¥±å¥²å¥µå¥·å¥ºå¥»å¥¼å¥¾å¥¿å¦€å¦…å¦‰å¦‹å¦Œå¦Žå¦å¦å¦‘å¦”å¦•å¦˜å¦šå¦›å¦œå¦å¦Ÿå¦ å¦¡å¦¢å¦¦ï¿½å¦§å¦¬å¦­å¦°å¦±å¦³å¦´å¦µå¦¶å¦·å¦¸å¦ºå¦¼å¦½å¦¿å§€å§å§‚å§ƒå§„å§…å§‡å§ˆå§‰å§Œå§å§Žå§å§•å§–å§™å§›å§žå§Ÿå§ å§¡å§¢å§¤å§¦å§§å§©å§ªå§«å§­å§®å§¯å§°å§±å§²å§³å§´å§µå§¶å§·å§¸å§ºå§¼å§½å§¾å¨€å¨‚å¨Šå¨‹å¨å¨Žå¨å¨å¨’å¨”å¨•å¨–å¨—å¨™å¨šå¨›å¨å¨žå¨¡å¨¢å¨¤å¨¦å¨§å¨¨å¨ªå¨«å¨¬å¨­å¨®å¨¯å¨°å¨³å¨µå¨·å¨¸å¨¹å¨ºå¨»å¨½å¨¾å¨¿å©å©‚å©ƒå©„å©…å©‡å©ˆå©‹å©Œå©å©Žå©å©å©‘å©’å©“å©”å©–å©—å©˜å©™å©›å©œå©å©žå©Ÿå© ï¿½"
		.split("");
	for (n = 0; n != t[138].length; ++n)
		if (t[138][n].charCodeAt(0) !== 65533) {
			r[t[138][n]] = 35328 + n;
			e[35328 + n] = t[138][n]
		}
	t[139] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å©¡å©£å©¤å©¥å©¦å©¨å©©å©«å©¬å©­å©®å©¯å©°å©±å©²å©³å©¸å©¹å©»å©¼å©½å©¾åª€åªåª‚åªƒåª„åª…åª†åª‡åªˆåª‰åªŠåª‹åªŒåªåªŽåªåªåª‘åª“åª”åª•åª–åª—åª˜åª™åªœåªåªžåªŸåª åª¡åª¢åª£åª¤åª¥åª¦åª§åª¨åª©åª«åª¬ï¿½åª­åª®åª¯åª°åª±åª´åª¶åª·åª¹åªºåª»åª¼åª½åª¿å«€å«ƒå«„å«…å«†å«‡å«ˆå«Šå«‹å«å«Žå«å«å«‘å«“å«•å«—å«™å«šå«›å«å«žå«Ÿå«¢å«¤å«¥å«§å«¨å«ªå«¬å«­å«®å«¯å«°å«²å«³å«´å«µå«¶å«·å«¸å«¹å«ºå«»å«¼å«½å«¾å«¿å¬€å¬å¬‚å¬ƒå¬„å¬…å¬†å¬‡å¬ˆå¬Šå¬‹å¬Œå¬å¬Žå¬å¬å¬‘å¬’å¬“å¬”å¬•å¬˜å¬™å¬šå¬›å¬œå¬å¬žå¬Ÿå¬ å¬¡å¬¢å¬£å¬¤å¬¥å¬¦å¬§å¬¨å¬©å¬ªå¬«å¬¬å¬­å¬®å¬¯å¬°å¬±å¬³å¬µå¬¶å¬¸å¬¹å¬ºå¬»å¬¼å¬½å¬¾å¬¿å­å­‚å­ƒå­„å­…å­†å­‡ï¿½"
		.split("");
	for (n = 0; n != t[139].length; ++n)
		if (t[139][n].charCodeAt(0) !== 65533) {
			r[t[139][n]] = 35584 + n;
			e[35584 + n] = t[139][n]
		}
	t[140] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å­ˆå­‰å­Šå­‹å­Œå­å­Žå­å­’å­–å­žå­ å­¡å­§å­¨å­«å­­å­®å­¯å­²å­´å­¶å­·å­¸å­¹å­»å­¼å­¾å­¿å®‚å®†å®Šå®å®Žå®å®‘å®’å®”å®–å®Ÿå®§å®¨å®©å®¬å®­å®®å®¯å®±å®²å®·å®ºå®»å®¼å¯€å¯å¯ƒå¯ˆå¯‰å¯Šå¯‹å¯å¯Žå¯ï¿½å¯‘å¯”å¯•å¯–å¯—å¯˜å¯™å¯šå¯›å¯œå¯ å¯¢å¯£å¯¦å¯§å¯©å¯ªå¯«å¯¬å¯­å¯¯å¯±å¯²å¯³å¯´å¯µå¯¶å¯·å¯½å¯¾å°€å°‚å°ƒå°…å°‡å°ˆå°‹å°Œå°å°Žå°å°’å°“å°—å°™å°›å°žå°Ÿå° å°¡å°£å°¦å°¨å°©å°ªå°«å°­å°®å°¯å°°å°²å°³å°µå°¶å°·å±ƒå±„å±†å±‡å±Œå±å±’å±“å±”å±–å±—å±˜å±šå±›å±œå±å±Ÿå±¢å±¤å±§å±¨å±©å±ªå±«å±¬å±­å±°å±²å±³å±´å±µå±¶å±·å±¸å±»å±¼å±½å±¾å²€å²ƒå²„å²…å²†å²‡å²‰å²Šå²‹å²Žå²å²’å²“å²•å²å²žå²Ÿå² å²¡å²¤å²¥å²¦å²§å²¨ï¿½"
		.split("");
	for (n = 0; n != t[140].length; ++n)
		if (t[140][n].charCodeAt(0) !== 65533) {
			r[t[140][n]] = 35840 + n;
			e[35840 + n] = t[140][n]
		}
	t[141] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å²ªå²®å²¯å²°å²²å²´å²¶å²¹å²ºå²»å²¼å²¾å³€å³‚å³ƒå³…å³†å³‡å³ˆå³‰å³Šå³Œå³å³Žå³å³å³‘å³“å³”å³•å³–å³—å³˜å³šå³›å³œå³å³žå³Ÿå³ å³¢å³£å³§å³©å³«å³¬å³®å³¯å³±å³²å³³å³´å³µå³¶å³·å³¸å³¹å³ºå³¼å³½å³¾å³¿å´€ï¿½å´å´„å´…å´ˆå´‰å´Šå´‹å´Œå´å´å´å´‘å´’å´“å´•å´—å´˜å´™å´šå´œå´å´Ÿå´ å´¡å´¢å´£å´¥å´¨å´ªå´«å´¬å´¯å´°å´±å´²å´³å´µå´¶å´·å´¸å´¹å´ºå´»å´¼å´¿åµ€åµåµ‚åµƒåµ„åµ…åµ†åµˆåµ‰åµåµŽåµåµåµ‘åµ’åµ“åµ”åµ•åµ–åµ—åµ™åµšåµœåµžåµŸåµ åµ¡åµ¢åµ£åµ¤åµ¥åµ¦åµ§åµ¨åµªåµ­åµ®åµ°åµ±åµ²åµ³åµµåµ¶åµ·åµ¸åµ¹åµºåµ»åµ¼åµ½åµ¾åµ¿å¶€å¶å¶ƒå¶„å¶…å¶†å¶‡å¶ˆå¶‰å¶Šå¶‹å¶Œå¶å¶Žå¶å¶å¶‘å¶’å¶“å¶”å¶•å¶–å¶—å¶˜å¶šå¶›å¶œå¶žå¶Ÿå¶ ï¿½"
		.split("");
	for (n = 0; n != t[141].length; ++n)
		if (t[141][n].charCodeAt(0) !== 65533) {
			r[t[141][n]] = 36096 + n;
			e[36096 + n] = t[141][n]
		}
	t[142] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¶¡å¶¢å¶£å¶¤å¶¥å¶¦å¶§å¶¨å¶©å¶ªå¶«å¶¬å¶­å¶®å¶¯å¶°å¶±å¶²å¶³å¶´å¶µå¶¶å¶¸å¶¹å¶ºå¶»å¶¼å¶½å¶¾å¶¿å·€å·å·‚å·ƒå·„å·†å·‡å·ˆå·‰å·Šå·‹å·Œå·Žå·å·å·‘å·’å·“å·”å·•å·–å·—å·˜å·™å·šå·œå·Ÿå· å·£å·¤å·ªå·¬å·­ï¿½å·°å·µå·¶å·¸å·¹å·ºå·»å·¼å·¿å¸€å¸„å¸‡å¸‰å¸Šå¸‹å¸å¸Žå¸’å¸“å¸—å¸žå¸Ÿå¸ å¸¡å¸¢å¸£å¸¤å¸¥å¸¨å¸©å¸ªå¸«å¸¬å¸¯å¸°å¸²å¸³å¸´å¸µå¸¶å¸¹å¸ºå¸¾å¸¿å¹€å¹å¹ƒå¹†å¹‡å¹ˆå¹‰å¹Šå¹‹å¹å¹Žå¹å¹å¹‘å¹’å¹“å¹–å¹—å¹˜å¹™å¹šå¹œå¹å¹Ÿå¹ å¹£å¹¤å¹¥å¹¦å¹§å¹¨å¹©å¹ªå¹«å¹¬å¹­å¹®å¹¯å¹°å¹±å¹µå¹·å¹¹å¹¾åºåº‚åºƒåº…åºˆåº‰åºŒåºåºŽåº’åº˜åº›åºåº¡åº¢åº£åº¤åº¨åº©åºªåº«åº¬åº®åº¯åº°åº±åº²åº´åººåº»åº¼åº½åº¿å»€å»å»‚å»ƒå»„å»…ï¿½"
		.split("");
	for (n = 0; n != t[142].length; ++n)
		if (t[142][n].charCodeAt(0) !== 65533) {
			r[t[142][n]] = 36352 + n;
			e[36352 + n] = t[142][n]
		}
	t[143] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å»†å»‡å»ˆå»‹å»Œå»å»Žå»å»å»”å»•å»—å»˜å»™å»šå»œå»å»žå»Ÿå» å»¡å»¢å»£å»¤å»¥å»¦å»§å»©å»«å»¬å»­å»®å»¯å»°å»±å»²å»³å»µå»¸å»¹å»»å»¼å»½å¼…å¼†å¼‡å¼‰å¼Œå¼å¼Žå¼å¼’å¼”å¼–å¼™å¼šå¼œå¼å¼žå¼¡å¼¢å¼£å¼¤ï¿½å¼¨å¼«å¼¬å¼®å¼°å¼²å¼³å¼´å¼µå¼¶å¼·å¼¸å¼»å¼½å¼¾å¼¿å½å½‚å½ƒå½„å½…å½†å½‡å½ˆå½‰å½Šå½‹å½Œå½å½Žå½å½‘å½”å½™å½šå½›å½œå½žå½Ÿå½ å½£å½¥å½§å½¨å½«å½®å½¯å½²å½´å½µå½¶å½¸å½ºå½½å½¾å½¿å¾ƒå¾†å¾å¾Žå¾å¾‘å¾“å¾”å¾–å¾šå¾›å¾å¾žå¾Ÿå¾ å¾¢å¾£å¾¤å¾¥å¾¦å¾§å¾©å¾«å¾¬å¾¯å¾°å¾±å¾²å¾³å¾´å¾¶å¾¸å¾¹å¾ºå¾»å¾¾å¾¿å¿€å¿å¿‚å¿‡å¿ˆå¿Šå¿‹å¿Žå¿“å¿”å¿•å¿šå¿›å¿œå¿žå¿Ÿå¿¢å¿£å¿¥å¿¦å¿¨å¿©å¿¬å¿¯å¿°å¿²å¿³å¿´å¿¶å¿·å¿¹å¿ºå¿¼æ€‡ï¿½"
		.split("");
	for (n = 0; n != t[143].length; ++n)
		if (t[143][n].charCodeAt(0) !== 65533) {
			r[t[143][n]] = 36608 + n;
			e[36608 + n] = t[143][n]
		}
	t[144] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ€ˆæ€‰æ€‹æ€Œæ€æ€‘æ€“æ€—æ€˜æ€šæ€žæ€Ÿæ€¢æ€£æ€¤æ€¬æ€­æ€®æ€°æ€±æ€²æ€³æ€´æ€¶æ€·æ€¸æ€¹æ€ºæ€½æ€¾æ€æ„æ…æ†æ‡æˆæ‰æŠæŒæŽææ‘æ“æ”æ–æ—æ˜æ›æœæžæŸæ æ¡æ¥æ¦æ®æ±æ²æ´æµæ·æ¾æ‚€ï¿½æ‚æ‚‚æ‚…æ‚†æ‚‡æ‚ˆæ‚Šæ‚‹æ‚Žæ‚æ‚æ‚‘æ‚“æ‚•æ‚—æ‚˜æ‚™æ‚œæ‚žæ‚¡æ‚¢æ‚¤æ‚¥æ‚§æ‚©æ‚ªæ‚®æ‚°æ‚³æ‚µæ‚¶æ‚·æ‚¹æ‚ºæ‚½æ‚¾æ‚¿æƒ€æƒæƒ‚æƒƒæƒ„æƒ‡æƒˆæƒ‰æƒŒæƒæƒŽæƒæƒæƒ’æƒ“æƒ”æƒ–æƒ—æƒ™æƒ›æƒžæƒ¡æƒ¢æƒ£æƒ¤æƒ¥æƒªæƒ±æƒ²æƒµæƒ·æƒ¸æƒ»æƒ¼æƒ½æƒ¾æƒ¿æ„‚æ„ƒæ„„æ„…æ„‡æ„Šæ„‹æ„Œæ„æ„‘æ„’æ„“æ„”æ„–æ„—æ„˜æ„™æ„›æ„œæ„æ„žæ„¡æ„¢æ„¥æ„¨æ„©æ„ªæ„¬æ„­æ„®æ„¯æ„°æ„±æ„²æ„³æ„´æ„µæ„¶æ„·æ„¸æ„¹æ„ºæ„»æ„¼æ„½æ„¾æ…€æ…æ…‚æ…ƒæ…„æ……æ…†ï¿½"
		.split("");
	for (n = 0; n != t[144].length; ++n)
		if (t[144][n].charCodeAt(0) !== 65533) {
			r[t[144][n]] = 36864 + n;
			e[36864 + n] = t[144][n]
		}
	t[145] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ…‡æ…‰æ…‹æ…æ…æ…æ…’æ…“æ…”æ…–æ…—æ…˜æ…™æ…šæ…›æ…œæ…žæ…Ÿæ… æ…¡æ…£æ…¤æ…¥æ…¦æ…©æ…ªæ…«æ…¬æ…­æ…®æ…¯æ…±æ…²æ…³æ…´æ…¶æ…¸æ…¹æ…ºæ…»æ…¼æ…½æ…¾æ…¿æ†€æ†æ†‚æ†ƒæ†„æ†…æ††æ†‡æ†ˆæ†‰æ†Šæ†Œæ†æ†æ†æ†‘æ†’æ†“æ†•ï¿½æ†–æ†—æ†˜æ†™æ†šæ†›æ†œæ†žæ†Ÿæ† æ†¡æ†¢æ†£æ†¤æ†¥æ†¦æ†ªæ†«æ†­æ†®æ†¯æ†°æ†±æ†²æ†³æ†´æ†µæ†¶æ†¸æ†¹æ†ºæ†»æ†¼æ†½æ†¿æ‡€æ‡æ‡ƒæ‡„æ‡…æ‡†æ‡‡æ‡‰æ‡Œæ‡æ‡Žæ‡æ‡æ‡“æ‡•æ‡–æ‡—æ‡˜æ‡™æ‡šæ‡›æ‡œæ‡æ‡žæ‡Ÿæ‡ æ‡¡æ‡¢æ‡£æ‡¤æ‡¥æ‡§æ‡¨æ‡©æ‡ªæ‡«æ‡¬æ‡­æ‡®æ‡¯æ‡°æ‡±æ‡²æ‡³æ‡´æ‡¶æ‡·æ‡¸æ‡¹æ‡ºæ‡»æ‡¼æ‡½æ‡¾æˆ€æˆæˆ‚æˆƒæˆ„æˆ…æˆ‡æˆ‰æˆ“æˆ”æˆ™æˆœæˆæˆžæˆ æˆ£æˆ¦æˆ§æˆ¨æˆ©æˆ«æˆ­æˆ¯æˆ°æˆ±æˆ²æˆµæˆ¶æˆ¸æˆ¹æˆºæˆ»æˆ¼æ‰‚æ‰„æ‰…æ‰†æ‰Šï¿½"
		.split("");
	for (n = 0; n != t[145].length; ++n)
		if (t[145][n].charCodeAt(0) !== 65533) {
			r[t[145][n]] = 37120 + n;
			e[37120 + n] = t[145][n]
		}
	t[146] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ‰æ‰æ‰•æ‰–æ‰—æ‰™æ‰šæ‰œæ‰æ‰žæ‰Ÿæ‰ æ‰¡æ‰¢æ‰¤æ‰¥æ‰¨æ‰±æ‰²æ‰´æ‰µæ‰·æ‰¸æ‰ºæ‰»æ‰½æŠæŠ‚æŠƒæŠ…æŠ†æŠ‡æŠˆæŠ‹æŠŒæŠæŠŽæŠæŠæŠ”æŠ™æŠœæŠæŠžæŠ£æŠ¦æŠ§æŠ©æŠªæŠ­æŠ®æŠ¯æŠ°æŠ²æŠ³æŠ´æŠ¶æŠ·æŠ¸æŠºæŠ¾æ‹€æ‹ï¿½æ‹ƒæ‹‹æ‹æ‹‘æ‹•æ‹æ‹žæ‹ æ‹¡æ‹¤æ‹ªæ‹«æ‹°æ‹²æ‹µæ‹¸æ‹¹æ‹ºæ‹»æŒ€æŒƒæŒ„æŒ…æŒ†æŒŠæŒ‹æŒŒæŒæŒæŒæŒ’æŒ“æŒ”æŒ•æŒ—æŒ˜æŒ™æŒœæŒ¦æŒ§æŒ©æŒ¬æŒ­æŒ®æŒ°æŒ±æŒ³æŒ´æŒµæŒ¶æŒ·æŒ¸æŒ»æŒ¼æŒ¾æŒ¿æ€ææ„æ‡æˆæŠæ‘æ’æ“æ”æ–æ—æ˜æ™æšæ›æœææ æ¤æ¥æ¦æ¨æªæ«æ¬æ¯æ°æ²æ³æ´æµæ¸æ¹æ¼æ½æ¾æ¿æŽæŽƒæŽ„æŽ…æŽ†æŽ‹æŽæŽ‘æŽ“æŽ”æŽ•æŽ—æŽ™æŽšæŽ›æŽœæŽæŽžæŽŸæŽ¡æŽ¤æŽ¦æŽ«æŽ¯æŽ±æŽ²æŽµæŽ¶æŽ¹æŽ»æŽ½æŽ¿æ€ï¿½"
		.split("");
	for (n = 0; n != t[146].length; ++n)
		if (t[146][n].charCodeAt(0) !== 65533) {
			r[t[146][n]] = 37376 + n;
			e[37376 + n] = t[146][n]
		}
	t[147] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ææ‚æƒæ…æ‡æˆæŠæ‹æŒæ‘æ“æ”æ•æ—æ˜æ™æšæ›æœææŸæ¢æ¤æ¥æ¦æ§æ¨æ«æ¬æ®æ¯æ°æ±æ³æµæ·æ¹æºæ»æ¼æ¾æƒæ„æ†æ‡æˆæ‰æŠææŽæ‘æ’æ•æ–æ—æ˜æ™æšææŸæ¢æ£æ¤ï¿½æ¥æ§æ¨æ©æ«æ®æ¯æ°æ±æ²æ³æµæ¶æ·æ¸æ¹æ»æ¼æ¾æ‘€æ‘‚æ‘ƒæ‘‰æ‘‹æ‘Œæ‘æ‘Žæ‘æ‘æ‘‘æ‘“æ‘•æ‘–æ‘—æ‘™æ‘šæ‘›æ‘œæ‘æ‘Ÿæ‘ æ‘¡æ‘¢æ‘£æ‘¤æ‘¥æ‘¦æ‘¨æ‘ªæ‘«æ‘¬æ‘®æ‘¯æ‘°æ‘±æ‘²æ‘³æ‘´æ‘µæ‘¶æ‘·æ‘»æ‘¼æ‘½æ‘¾æ‘¿æ’€æ’æ’ƒæ’†æ’ˆæ’‰æ’Šæ’‹æ’Œæ’æ’Žæ’æ’æ’“æ’”æ’—æ’˜æ’šæ’›æ’œæ’æ’Ÿæ’ æ’¡æ’¢æ’£æ’¥æ’¦æ’§æ’¨æ’ªæ’«æ’¯æ’±æ’²æ’³æ’´æ’¶æ’¹æ’»æ’½æ’¾æ’¿æ“æ“ƒæ“„æ“†æ“‡æ“ˆæ“‰æ“Šæ“‹æ“Œæ“æ“‘æ““æ“”æ“•æ“–æ“™æ“šï¿½"
		.split("");
	for (n = 0; n != t[147].length; ++n)
		if (t[147][n].charCodeAt(0) !== 65533) {
			r[t[147][n]] = 37632 + n;
			e[37632 + n] = t[147][n]
		}
	t[148] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ“›æ“œæ“æ“Ÿæ“ æ“¡æ“£æ“¥æ“§æ“¨æ“©æ“ªæ“«æ“¬æ“­æ“®æ“¯æ“°æ“±æ“²æ“³æ“´æ“µæ“¶æ“·æ“¸æ“¹æ“ºæ“»æ“¼æ“½æ“¾æ“¿æ”æ”‚æ”ƒæ”„æ”…æ”†æ”‡æ”ˆæ”Šæ”‹æ”Œæ”æ”Žæ”æ”æ”‘æ”“æ””æ”•æ”–æ”—æ”™æ”šæ”›æ”œæ”æ”žæ”Ÿæ” æ”¡ï¿½æ”¢æ”£æ”¤æ”¦æ”§æ”¨æ”©æ”ªæ”¬æ”­æ”°æ”±æ”²æ”³æ”·æ”ºæ”¼æ”½æ•€æ•æ•‚æ•ƒæ•„æ•†æ•‡æ•Šæ•‹æ•æ•Žæ•æ•’æ•“æ•”æ•—æ•˜æ•šæ•œæ•Ÿæ• æ•¡æ•¤æ•¥æ•§æ•¨æ•©æ•ªæ•­æ•®æ•¯æ•±æ•³æ•µæ•¶æ•¸æ•¹æ•ºæ•»æ•¼æ•½æ•¾æ•¿æ–€æ–æ–‚æ–ƒæ–„æ–…æ–†æ–ˆæ–‰æ–Šæ–æ–Žæ–æ–’æ–”æ–•æ––æ–˜æ–šæ–æ–žæ– æ–¢æ–£æ–¦æ–¨æ–ªæ–¬æ–®æ–±æ–²æ–³æ–´æ–µæ–¶æ–·æ–¸æ–ºæ–»æ–¾æ–¿æ—€æ—‚æ—‡æ—ˆæ—‰æ—Šæ—æ—æ—‘æ—“æ—”æ—•æ—˜æ—™æ—šæ—›æ—œæ—æ—žæ—Ÿæ—¡æ—£æ—¤æ—ªæ—«ï¿½"
		.split("");
	for (n = 0; n != t[148].length; ++n)
		if (t[148][n].charCodeAt(0) !== 65533) {
			r[t[148][n]] = 37888 + n;
			e[37888 + n] = t[148][n]
		}
	t[149] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ—²æ—³æ—´æ—µæ—¸æ—¹æ—»æ—¼æ—½æ—¾æ—¿æ˜æ˜„æ˜…æ˜‡æ˜ˆæ˜‰æ˜‹æ˜æ˜æ˜‘æ˜’æ˜–æ˜—æ˜˜æ˜šæ˜›æ˜œæ˜žæ˜¡æ˜¢æ˜£æ˜¤æ˜¦æ˜©æ˜ªæ˜«æ˜¬æ˜®æ˜°æ˜²æ˜³æ˜·æ˜¸æ˜¹æ˜ºæ˜»æ˜½æ˜¿æ™€æ™‚æ™„æ™…æ™†æ™‡æ™ˆæ™‰æ™Šæ™æ™Žæ™æ™‘æ™˜ï¿½æ™™æ™›æ™œæ™æ™žæ™ æ™¢æ™£æ™¥æ™§æ™©æ™ªæ™«æ™¬æ™­æ™±æ™²æ™³æ™µæ™¸æ™¹æ™»æ™¼æ™½æ™¿æš€æšæšƒæš…æš†æšˆæš‰æšŠæš‹æšæšŽæšæšæš’æš“æš”æš•æš˜æš™æššæš›æšœæšžæšŸæš æš¡æš¢æš£æš¤æš¥æš¦æš©æšªæš«æš¬æš­æš¯æš°æš±æš²æš³æšµæš¶æš·æš¸ï¿½ï¿½ï¿½æš»æš¼æš½æš¿æ›€æ›æ›‚æ›ƒæ›„æ›…æ›†æ›‡æ›ˆæ›‰æ›Šæ›‹æ›Œæ›æ›Žæ›æ›æ›‘æ›’æ›“æ›”æ›•æ›–æ›—æ›˜æ›šæ›žæ›Ÿæ› æ›¡æ›¢æ›£æ›¤æ›¥æ›§æ›¨æ›ªæ›«æ›¬æ›­æ›®æ›¯æ›±æ›µæ›¶æ›¸æ›ºæ›»æ›½æœæœ‚æœƒï¿½"
		.split("");
	for (n = 0; n != t[149].length; ++n)
		if (t[149][n].charCodeAt(0) !== 65533) {
			r[t[149][n]] = 38144 + n;
			e[38144 + n] = t[149][n]
		}
	t[150] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æœ„æœ…æœ†æœ‡æœŒæœŽæœæœ‘æœ’æœ“æœ–æœ˜æœ™æœšæœœæœžæœ æœ¡æœ¢æœ£æœ¤æœ¥æœ§æœ©æœ®æœ°æœ²æœ³æœ¶æœ·æœ¸æœ¹æœ»æœ¼æœ¾æœ¿ææ„æ…æ‡æŠæ‹ææ’æ”æ•æ—æ˜æ™æšæ›ææ¢æ£æ¤æ¦æ§æ«æ¬æ®æ±æ´æ¶ï¿½æ¸æ¹æºæ»æ½æž€æž‚æžƒæž…æž†æžˆæžŠæžŒæžæžŽæžæž‘æž’æž“æž”æž–æž™æž›æžŸæž æž¡æž¤æž¦æž©æž¬æž®æž±æž²æž´æž¹æžºæž»æž¼æž½æž¾æž¿æŸ€æŸ‚æŸ…æŸ†æŸ‡æŸˆæŸ‰æŸŠæŸ‹æŸŒæŸæŸŽæŸ•æŸ–æŸ—æŸ›æŸŸæŸ¡æŸ£æŸ¤æŸ¦æŸ§æŸ¨æŸªæŸ«æŸ­æŸ®æŸ²æŸµæŸ¶æŸ·æŸ¸æŸ¹æŸºæŸ»æŸ¼æŸ¾æ æ ‚æ ƒæ „æ †æ æ æ ’æ ”æ •æ ˜æ ™æ šæ ›æ œæ žæ Ÿæ  æ ¢æ £æ ¤æ ¥æ ¦æ §æ ¨æ «æ ¬æ ­æ ®æ ¯æ °æ ±æ ´æ µæ ¶æ ºæ »æ ¿æ¡‡æ¡‹æ¡æ¡æ¡’æ¡–æ¡—æ¡˜æ¡™æ¡šæ¡›ï¿½"
		.split("");
	for (n = 0; n != t[150].length; ++n)
		if (t[150][n].charCodeAt(0) !== 65533) {
			r[t[150][n]] = 38400 + n;
			e[38400 + n] = t[150][n]
		}
	t[151] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¡œæ¡æ¡žæ¡Ÿæ¡ªæ¡¬æ¡­æ¡®æ¡¯æ¡°æ¡±æ¡²æ¡³æ¡µæ¡¸æ¡¹æ¡ºæ¡»æ¡¼æ¡½æ¡¾æ¡¿æ¢€æ¢‚æ¢„æ¢‡æ¢ˆæ¢‰æ¢Šæ¢‹æ¢Œæ¢æ¢Žæ¢æ¢‘æ¢’æ¢”æ¢•æ¢–æ¢˜æ¢™æ¢šæ¢›æ¢œæ¢æ¢žæ¢Ÿæ¢ æ¢¡æ¢£æ¢¤æ¢¥æ¢©æ¢ªæ¢«æ¢¬æ¢®æ¢±æ¢²æ¢´æ¢¶æ¢·æ¢¸ï¿½æ¢¹æ¢ºæ¢»æ¢¼æ¢½æ¢¾æ¢¿æ£æ£ƒæ£„æ£…æ£†æ£‡æ£ˆæ£Šæ£Œæ£Žæ£æ£æ£‘æ£“æ£”æ£–æ£—æ£™æ£›æ£œæ£æ£žæ£Ÿæ£¡æ£¢æ£¤æ£¥æ£¦æ£§æ£¨æ£©æ£ªæ£«æ£¬æ£­æ£¯æ£²æ£³æ£´æ£¶æ£·æ£¸æ£»æ£½æ£¾æ£¿æ¤€æ¤‚æ¤ƒæ¤„æ¤†æ¤‡æ¤ˆæ¤‰æ¤Šæ¤Œæ¤æ¤‘æ¤“æ¤”æ¤•æ¤–æ¤—æ¤˜æ¤™æ¤šæ¤›æ¤œæ¤æ¤žæ¤¡æ¤¢æ¤£æ¤¥æ¤¦æ¤§æ¤¨æ¤©æ¤ªæ¤«æ¤¬æ¤®æ¤¯æ¤±æ¤²æ¤³æ¤µæ¤¶æ¤·æ¤¸æ¤ºæ¤»æ¤¼æ¤¾æ¥€æ¥æ¥ƒæ¥„æ¥…æ¥†æ¥‡æ¥ˆæ¥‰æ¥Šæ¥‹æ¥Œæ¥æ¥Žæ¥æ¥æ¥‘æ¥’æ¥“æ¥•æ¥–æ¥˜æ¥™æ¥›æ¥œæ¥Ÿï¿½"
		.split("");
	for (n = 0; n != t[151].length; ++n)
		if (t[151][n].charCodeAt(0) !== 65533) {
			r[t[151][n]] = 38656 + n;
			e[38656 + n] = t[151][n]
		}
	t[152] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¥¡æ¥¢æ¥¤æ¥¥æ¥§æ¥¨æ¥©æ¥ªæ¥¬æ¥­æ¥¯æ¥°æ¥²æ¥³æ¥´æ¥µæ¥¶æ¥ºæ¥»æ¥½æ¥¾æ¥¿æ¦æ¦ƒæ¦…æ¦Šæ¦‹æ¦Œæ¦Žæ¦æ¦æ¦‘æ¦’æ¦“æ¦–æ¦—æ¦™æ¦šæ¦æ¦žæ¦Ÿæ¦ æ¦¡æ¦¢æ¦£æ¦¤æ¦¥æ¦¦æ¦©æ¦ªæ¦¬æ¦®æ¦¯æ¦°æ¦²æ¦³æ¦µæ¦¶æ¦¸æ¦¹æ¦ºæ¦¼æ¦½ï¿½æ¦¾æ¦¿æ§€æ§‚æ§ƒæ§„æ§…æ§†æ§‡æ§ˆæ§‰æ§‹æ§æ§æ§‘æ§’æ§“æ§•æ§–æ§—æ§˜æ§™æ§šæ§œæ§æ§žæ§¡æ§¢æ§£æ§¤æ§¥æ§¦æ§§æ§¨æ§©æ§ªæ§«æ§¬æ§®æ§¯æ§°æ§±æ§³æ§´æ§µæ§¶æ§·æ§¸æ§¹æ§ºæ§»æ§¼æ§¾æ¨€æ¨æ¨‚æ¨ƒæ¨„æ¨…æ¨†æ¨‡æ¨ˆæ¨‰æ¨‹æ¨Œæ¨æ¨Žæ¨æ¨æ¨‘æ¨’æ¨“æ¨”æ¨•æ¨–æ¨™æ¨šæ¨›æ¨œæ¨æ¨žæ¨ æ¨¢æ¨£æ¨¤æ¨¥æ¨¦æ¨§æ¨©æ¨«æ¨¬æ¨­æ¨®æ¨°æ¨²æ¨³æ¨´æ¨¶æ¨·æ¨¸æ¨¹æ¨ºæ¨»æ¨¼æ¨¿æ©€æ©æ©‚æ©ƒæ©…æ©†æ©ˆæ©‰æ©Šæ©‹æ©Œæ©æ©Žæ©æ©‘æ©’æ©“æ©”æ©•æ©–æ©—æ©šï¿½"
		.split("");
	for (n = 0; n != t[152].length; ++n)
		if (t[152][n].charCodeAt(0) !== 65533) {
			r[t[152][n]] = 38912 + n;
			e[38912 + n] = t[152][n]
		}
	t[153] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ©œæ©æ©žæ©Ÿæ© æ©¢æ©£æ©¤æ©¦æ©§æ©¨æ©©æ©ªæ©«æ©¬æ©­æ©®æ©¯æ©°æ©²æ©³æ©´æ©µæ©¶æ©·æ©¸æ©ºæ©»æ©½æ©¾æ©¿æªæª‚æªƒæª…æª†æª‡æªˆæª‰æªŠæª‹æªŒæªæªæª’æª“æª”æª•æª–æª˜æª™æªšæª›æªœæªæªžæªŸæª¡æª¢æª£æª¤æª¥æª¦ï¿½æª§æª¨æªªæª­æª®æª¯æª°æª±æª²æª³æª´æªµæª¶æª·æª¸æª¹æªºæª»æª¼æª½æª¾æª¿æ«€æ«æ«‚æ«ƒæ«„æ«…æ«†æ«‡æ«ˆæ«‰æ«Šæ«‹æ«Œæ«æ«Žæ«æ«æ«‘æ«’æ«“æ«”æ«•æ«–æ«—æ«˜æ«™æ«šæ«›æ«œæ«æ«žæ«Ÿæ« æ«¡æ«¢æ«£æ«¤æ«¥æ«¦æ«§æ«¨æ«©æ«ªæ««æ«¬æ«­æ«®æ«¯æ«°æ«±æ«²æ«³æ«´æ«µæ«¶æ«·æ«¸æ«¹æ«ºæ«»æ«¼æ«½æ«¾æ«¿æ¬€æ¬æ¬‚æ¬ƒæ¬„æ¬…æ¬†æ¬‡æ¬ˆæ¬‰æ¬Šæ¬‹æ¬Œæ¬æ¬Žæ¬æ¬æ¬‘æ¬’æ¬“æ¬”æ¬•æ¬–æ¬—æ¬˜æ¬™æ¬šæ¬›æ¬œæ¬æ¬žæ¬Ÿæ¬¥æ¬¦æ¬¨æ¬©æ¬ªæ¬«æ¬¬æ¬­æ¬®ï¿½"
		.split("");
	for (n = 0; n != t[153].length; ++n)
		if (t[153][n].charCodeAt(0) !== 65533) {
			r[t[153][n]] = 39168 + n;
			e[39168 + n] = t[153][n]
		}
	t[154] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¬¯æ¬°æ¬±æ¬³æ¬´æ¬µæ¬¶æ¬¸æ¬»æ¬¼æ¬½æ¬¿æ­€æ­æ­‚æ­„æ­…æ­ˆæ­Šæ­‹æ­æ­Žæ­æ­æ­‘æ­’æ­“æ­”æ­•æ­–æ­—æ­˜æ­šæ­›æ­œæ­æ­žæ­Ÿæ­ æ­¡æ­¨æ­©æ­«æ­¬æ­­æ­®æ­¯æ­°æ­±æ­²æ­³æ­´æ­µæ­¶æ­·æ­¸æ­ºæ­½æ­¾æ­¿æ®€æ®…æ®ˆï¿½æ®Œæ®Žæ®æ®æ®‘æ®”æ®•æ®—æ®˜æ®™æ®œæ®æ®žæ®Ÿæ® æ®¢æ®£æ®¤æ®¥æ®¦æ®§æ®¨æ®©æ®«æ®¬æ®­æ®®æ®¯æ®°æ®±æ®²æ®¶æ®¸æ®¹æ®ºæ®»æ®¼æ®½æ®¾æ¯€æ¯ƒæ¯„æ¯†æ¯‡æ¯ˆæ¯‰æ¯Šæ¯Œæ¯Žæ¯æ¯‘æ¯˜æ¯šæ¯œæ¯æ¯žæ¯Ÿæ¯ æ¯¢æ¯£æ¯¤æ¯¥æ¯¦æ¯§æ¯¨æ¯©æ¯¬æ¯­æ¯®æ¯°æ¯±æ¯²æ¯´æ¯¶æ¯·æ¯¸æ¯ºæ¯»æ¯¼æ¯¾æ¯¿æ°€æ°æ°‚æ°ƒæ°„æ°ˆæ°‰æ°Šæ°‹æ°Œæ°Žæ°’æ°—æ°œæ°æ°žæ° æ°£æ°¥æ°«æ°¬æ°­æ°±æ°³æ°¶æ°·æ°¹æ°ºæ°»æ°¼æ°¾æ°¿æ±ƒæ±„æ±…æ±ˆæ±‹æ±Œæ±æ±Žæ±æ±‘æ±’æ±“æ±–æ±˜ï¿½"
		.split("");
	for (n = 0; n != t[154].length; ++n)
		if (t[154][n].charCodeAt(0) !== 65533) {
			r[t[154][n]] = 39424 + n;
			e[39424 + n] = t[154][n]
		}
	t[155] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ±™æ±šæ±¢æ±£æ±¥æ±¦æ±§æ±«æ±¬æ±­æ±®æ±¯æ±±æ±³æ±µæ±·æ±¸æ±ºæ±»æ±¼æ±¿æ²€æ²„æ²‡æ²Šæ²‹æ²æ²Žæ²‘æ²’æ²•æ²–æ²—æ²˜æ²šæ²œæ²æ²žæ² æ²¢æ²¨æ²¬æ²¯æ²°æ²´æ²µæ²¶æ²·æ²ºæ³€æ³æ³‚æ³ƒæ³†æ³‡æ³ˆæ³‹æ³æ³Žæ³æ³‘æ³’æ³˜ï¿½æ³™æ³šæ³œæ³æ³Ÿæ³¤æ³¦æ³§æ³©æ³¬æ³­æ³²æ³´æ³¹æ³¿æ´€æ´‚æ´ƒæ´…æ´†æ´ˆæ´‰æ´Šæ´æ´æ´æ´‘æ´“æ´”æ´•æ´–æ´˜æ´œæ´æ´Ÿæ´ æ´¡æ´¢æ´£æ´¤æ´¦æ´¨æ´©æ´¬æ´­æ´¯æ´°æ´´æ´¶æ´·æ´¸æ´ºæ´¿æµ€æµ‚æµ„æµ‰æµŒæµæµ•æµ–æµ—æµ˜æµ›æµæµŸæµ¡æµ¢æµ¤æµ¥æµ§æµ¨æµ«æµ¬æµ­æµ°æµ±æµ²æµ³æµµæµ¶æµ¹æµºæµ»æµ½æµ¾æµ¿æ¶€æ¶æ¶ƒæ¶„æ¶†æ¶‡æ¶Šæ¶‹æ¶æ¶æ¶æ¶’æ¶–æ¶—æ¶˜æ¶™æ¶šæ¶œæ¶¢æ¶¥æ¶¬æ¶­æ¶°æ¶±æ¶³æ¶´æ¶¶æ¶·æ¶¹æ¶ºæ¶»æ¶¼æ¶½æ¶¾æ·æ·‚æ·ƒæ·ˆæ·‰æ·Šï¿½"
		.split("");
	for (n = 0; n != t[155].length; ++n)
		if (t[155][n].charCodeAt(0) !== 65533) {
			r[t[155][n]] = 39680 + n;
			e[39680 + n] = t[155][n]
		}
	t[156] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ·æ·Žæ·æ·æ·’æ·“æ·”æ·•æ·—æ·šæ·›æ·œæ·Ÿæ·¢æ·£æ·¥æ·§æ·¨æ·©æ·ªæ·­æ·¯æ·°æ·²æ·´æ·µæ·¶æ·¸æ·ºæ·½æ·¾æ·¿æ¸€æ¸æ¸‚æ¸ƒæ¸„æ¸†æ¸‡æ¸ˆæ¸‰æ¸‹æ¸æ¸’æ¸“æ¸•æ¸˜æ¸™æ¸›æ¸œæ¸žæ¸Ÿæ¸¢æ¸¦æ¸§æ¸¨æ¸ªæ¸¬æ¸®æ¸°æ¸±æ¸³æ¸µï¿½æ¸¶æ¸·æ¸¹æ¸»æ¸¼æ¸½æ¸¾æ¸¿æ¹€æ¹æ¹‚æ¹…æ¹†æ¹‡æ¹ˆæ¹‰æ¹Šæ¹‹æ¹Œæ¹æ¹æ¹‘æ¹’æ¹•æ¹—æ¹™æ¹šæ¹œæ¹æ¹žæ¹ æ¹¡æ¹¢æ¹£æ¹¤æ¹¥æ¹¦æ¹§æ¹¨æ¹©æ¹ªæ¹¬æ¹­æ¹¯æ¹°æ¹±æ¹²æ¹³æ¹´æ¹µæ¹¶æ¹·æ¹¸æ¹¹æ¹ºæ¹»æ¹¼æ¹½æº€æºæº‚æº„æº‡æºˆæºŠæº‹æºŒæºæºŽæº‘æº’æº“æº”æº•æº–æº—æº™æºšæº›æºæºžæº æº¡æº£æº¤æº¦æº¨æº©æº«æº¬æº­æº®æº°æº³æºµæº¸æº¹æº¼æº¾æº¿æ»€æ»ƒæ»„æ»…æ»†æ»ˆæ»‰æ»Šæ»Œæ»æ»Žæ»æ»’æ»–æ»˜æ»™æ»›æ»œæ»æ»£æ»§æ»ªæ»«æ»¬æ»­æ»®æ»¯ï¿½"
		.split("");
	for (n = 0; n != t[156].length; ++n)
		if (t[156][n].charCodeAt(0) !== 65533) {
			r[t[156][n]] = 39936 + n;
			e[39936 + n] = t[156][n]
		}
	t[157] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ»°æ»±æ»²æ»³æ»µæ»¶æ»·æ»¸æ»ºæ»»æ»¼æ»½æ»¾æ»¿æ¼€æ¼æ¼ƒæ¼„æ¼…æ¼‡æ¼ˆæ¼Šæ¼‹æ¼Œæ¼æ¼Žæ¼æ¼‘æ¼’æ¼–æ¼—æ¼˜æ¼™æ¼šæ¼›æ¼œæ¼æ¼žæ¼Ÿæ¼¡æ¼¢æ¼£æ¼¥æ¼¦æ¼§æ¼¨æ¼¬æ¼®æ¼°æ¼²æ¼´æ¼µæ¼·æ¼¸æ¼¹æ¼ºæ¼»æ¼¼æ¼½æ¼¿æ½€æ½æ½‚ï¿½æ½ƒæ½„æ½…æ½ˆæ½‰æ½Šæ½Œæ½Žæ½æ½æ½‘æ½’æ½“æ½”æ½•æ½–æ½—æ½™æ½šæ½›æ½æ½Ÿæ½ æ½¡æ½£æ½¤æ½¥æ½§æ½¨æ½©æ½ªæ½«æ½¬æ½¯æ½°æ½±æ½³æ½µæ½¶æ½·æ½¹æ½»æ½½æ½¾æ½¿æ¾€æ¾æ¾‚æ¾ƒæ¾…æ¾†æ¾‡æ¾Šæ¾‹æ¾æ¾æ¾‘æ¾’æ¾“æ¾”æ¾•æ¾–æ¾—æ¾˜æ¾™æ¾šæ¾›æ¾æ¾žæ¾Ÿæ¾ æ¾¢æ¾£æ¾¤æ¾¥æ¾¦æ¾¨æ¾©æ¾ªæ¾«æ¾¬æ¾­æ¾®æ¾¯æ¾°æ¾±æ¾²æ¾´æ¾µæ¾·æ¾¸æ¾ºæ¾»æ¾¼æ¾½æ¾¾æ¾¿æ¿æ¿ƒæ¿„æ¿…æ¿†æ¿‡æ¿ˆæ¿Šæ¿‹æ¿Œæ¿æ¿Žæ¿æ¿æ¿“æ¿”æ¿•æ¿–æ¿—æ¿˜æ¿™æ¿šæ¿›æ¿œæ¿æ¿Ÿæ¿¢æ¿£æ¿¤æ¿¥ï¿½"
		.split("");
	for (n = 0; n != t[157].length; ++n)
		if (t[157][n].charCodeAt(0) !== 65533) {
			r[t[157][n]] = 40192 + n;
			e[40192 + n] = t[157][n]
		}
	t[158] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¿¦æ¿§æ¿¨æ¿©æ¿ªæ¿«æ¿¬æ¿­æ¿°æ¿±æ¿²æ¿³æ¿´æ¿µæ¿¶æ¿·æ¿¸æ¿¹æ¿ºæ¿»æ¿¼æ¿½æ¿¾æ¿¿ç€€ç€ç€‚ç€ƒç€„ç€…ç€†ç€‡ç€ˆç€‰ç€Šç€‹ç€Œç€ç€Žç€ç€ç€’ç€“ç€”ç€•ç€–ç€—ç€˜ç€™ç€œç€ç€žç€Ÿç€ ç€¡ç€¢ç€¤ç€¥ç€¦ç€§ç€¨ç€©ç€ªï¿½ç€«ç€¬ç€­ç€®ç€¯ç€°ç€±ç€²ç€³ç€´ç€¶ç€·ç€¸ç€ºç€»ç€¼ç€½ç€¾ç€¿ç€çç‚çƒç„ç…ç†ç‡çˆç‰çŠç‹ççŽçç‘ç’ç“ç”ç•ç–ç—ç˜ç™çšç›çœççŸç ç¡ç¢ç£ç¤ç¥ç¦ç§ç¨ç©çªç®ç±ç²ç³ç´ç·ç¹çºç»ç½ç‚ç‚‚ç‚ƒç‚„ç‚†ç‚‡ç‚ˆç‚‹ç‚Œç‚ç‚ç‚ç‚‘ç‚“ç‚—ç‚˜ç‚šç‚›ç‚žç‚Ÿç‚ ç‚¡ç‚¢ç‚£ç‚¤ç‚¥ç‚¦ç‚§ç‚¨ç‚©ç‚ªç‚°ç‚²ç‚´ç‚µç‚¶ç‚ºç‚¾ç‚¿çƒ„çƒ…çƒ†çƒ‡çƒ‰çƒ‹çƒŒçƒçƒŽçƒçƒçƒ‘çƒ’çƒ“çƒ”çƒ•çƒ–çƒ—çƒšï¿½"
		.split("");
	for (n = 0; n != t[158].length; ++n)
		if (t[158][n].charCodeAt(0) !== 65533) {
			r[t[158][n]] = 40448 + n;
			e[40448 + n] = t[158][n]
		}
	t[159] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çƒœçƒçƒžçƒ çƒ¡çƒ¢çƒ£çƒ¥çƒªçƒ®çƒ°çƒ±çƒ²çƒ³çƒ´çƒµçƒ¶çƒ¸çƒºçƒ»çƒ¼çƒ¾çƒ¿ç„€ç„ç„‚ç„ƒç„„ç„…ç„†ç„‡ç„ˆç„‹ç„Œç„ç„Žç„ç„‘ç„’ç„”ç„—ç„›ç„œç„ç„žç„Ÿç„ ç„¡ç„¢ç„£ç„¤ç„¥ç„§ç„¨ç„©ç„ªç„«ç„¬ç„­ç„®ç„²ç„³ç„´ï¿½ç„µç„·ç„¸ç„¹ç„ºç„»ç„¼ç„½ç„¾ç„¿ç…€ç…ç…‚ç…ƒç…„ç…†ç…‡ç…ˆç…‰ç…‹ç…ç…ç…ç…‘ç…’ç…“ç…”ç…•ç…–ç…—ç…˜ç…™ç…šç…›ç…ç…Ÿç… ç…¡ç…¢ç…£ç…¥ç…©ç…ªç…«ç…¬ç…­ç…¯ç…°ç…±ç…´ç…µç…¶ç…·ç…¹ç…»ç…¼ç…¾ç…¿ç†€ç†ç†‚ç†ƒç†…ç††ç†‡ç†ˆç†‰ç†‹ç†Œç†ç†Žç†ç†‘ç†’ç†“ç†•ç†–ç†—ç†šç†›ç†œç†ç†žç†¡ç†¢ç†£ç†¤ç†¥ç†¦ç†§ç†©ç†ªç†«ç†­ç†®ç†¯ç†°ç†±ç†²ç†´ç†¶ç†·ç†¸ç†ºç†»ç†¼ç†½ç†¾ç†¿ç‡€ç‡ç‡‚ç‡„ç‡…ç‡†ç‡‡ç‡ˆç‡‰ç‡Šç‡‹ç‡Œç‡ç‡ç‡ç‡‘ç‡’ç‡“ï¿½"
		.split("");
	for (n = 0; n != t[159].length; ++n)
		if (t[159][n].charCodeAt(0) !== 65533) {
			r[t[159][n]] = 40704 + n;
			e[40704 + n] = t[159][n]
		}
	t[160] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç‡–ç‡—ç‡˜ç‡™ç‡šç‡›ç‡œç‡ç‡žç‡Ÿç‡¡ç‡¢ç‡£ç‡¤ç‡¦ç‡¨ç‡©ç‡ªç‡«ç‡¬ç‡­ç‡¯ç‡°ç‡±ç‡²ç‡³ç‡´ç‡µç‡¶ç‡·ç‡¸ç‡ºç‡»ç‡¼ç‡½ç‡¾ç‡¿çˆ€çˆçˆ‚çˆƒçˆ„çˆ…çˆ‡çˆˆçˆ‰çˆŠçˆ‹çˆŒçˆçˆŽçˆçˆçˆ‘çˆ’çˆ“çˆ”çˆ•çˆ–çˆ—çˆ˜çˆ™çˆšï¿½çˆ›çˆœçˆžçˆŸçˆ çˆ¡çˆ¢çˆ£çˆ¤çˆ¥çˆ¦çˆ§çˆ©çˆ«çˆ­çˆ®çˆ¯çˆ²çˆ³çˆ´çˆºçˆ¼çˆ¾ç‰€ç‰ç‰‚ç‰ƒç‰„ç‰…ç‰†ç‰‰ç‰Šç‰‹ç‰Žç‰ç‰ç‰‘ç‰“ç‰”ç‰•ç‰—ç‰˜ç‰šç‰œç‰žç‰ ç‰£ç‰¤ç‰¥ç‰¨ç‰ªç‰«ç‰¬ç‰­ç‰°ç‰±ç‰³ç‰´ç‰¶ç‰·ç‰¸ç‰»ç‰¼ç‰½çŠ‚çŠƒçŠ…çŠ†çŠ‡çŠˆçŠ‰çŠŒçŠŽçŠçŠ‘çŠ“çŠ”çŠ•çŠ–çŠ—çŠ˜çŠ™çŠšçŠ›çŠœçŠçŠžçŠ çŠ¡çŠ¢çŠ£çŠ¤çŠ¥çŠ¦çŠ§çŠ¨çŠ©çŠªçŠ«çŠ®çŠ±çŠ²çŠ³çŠµçŠºçŠ»çŠ¼çŠ½çŠ¾çŠ¿ç‹€ç‹…ç‹†ç‹‡ç‹‰ç‹Šç‹‹ç‹Œç‹ç‹‘ç‹“ç‹”ç‹•ç‹–ç‹˜ç‹šç‹›ï¿½"
		.split("");
	for (n = 0; n != t[160].length; ++n)
		if (t[160][n].charCodeAt(0) !== 65533) {
			r[t[160][n]] = 40960 + n;
			e[40960 + n] = t[160][n]
		}
	t[161] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã€€ã€ã€‚Â·Ë‰Ë‡Â¨ã€ƒã€…â€”ï½žâ€–â€¦â€˜â€™â€œâ€ã€”ã€•ã€ˆã€‰ã€Šã€‹ã€Œã€ã€Žã€ã€–ã€—ã€ã€‘Â±Ã—Ã·âˆ¶âˆ§âˆ¨âˆ‘âˆâˆªâˆ©âˆˆâˆ·âˆšâŠ¥âˆ¥âˆ âŒ’âŠ™âˆ«âˆ®â‰¡â‰Œâ‰ˆâˆ½âˆâ‰ â‰®â‰¯â‰¤â‰¥âˆžâˆµâˆ´â™‚â™€Â°â€²â€³â„ƒï¼„Â¤ï¿ ï¿¡â€°Â§â„–â˜†â˜…â—‹â—â—Žâ—‡â—†â–¡â– â–³â–²â€»â†’â†â†‘â†“ã€“ï¿½"
		.split("");
	for (n = 0; n != t[161].length; ++n)
		if (t[161][n].charCodeAt(0) !== 65533) {
			r[t[161][n]] = 41216 + n;
			e[41216 + n] = t[161][n]
		}
	t[162] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â…°â…±â…²â…³â…´â…µâ…¶â…·â…¸â…¹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â’ˆâ’‰â’Šâ’‹â’Œâ’â’Žâ’â’â’‘â’’â’“â’”â’•â’–â’—â’˜â’™â’šâ’›â‘´â‘µâ‘¶â‘·â‘¸â‘¹â‘ºâ‘»â‘¼â‘½â‘¾â‘¿â’€â’â’‚â’ƒâ’„â’…â’†â’‡â‘ â‘¡â‘¢â‘£â‘¤â‘¥â‘¦â‘§â‘¨â‘©ï¿½ï¿½ãˆ ãˆ¡ãˆ¢ãˆ£ãˆ¤ãˆ¥ãˆ¦ãˆ§ãˆ¨ãˆ©ï¿½ï¿½â… â…¡â…¢â…£â…¤â…¥â…¦â…§â…¨â…©â…ªâ…«ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[162].length; ++n)
		if (t[162][n].charCodeAt(0) !== 65533) {
			r[t[162][n]] = 41472 + n;
			e[41472 + n] = t[162][n]
		}
	t[163] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¼ï¼‚ï¼ƒï¿¥ï¼…ï¼†ï¼‡ï¼ˆï¼‰ï¼Šï¼‹ï¼Œï¼ï¼Žï¼ï¼ï¼‘ï¼’ï¼“ï¼”ï¼•ï¼–ï¼—ï¼˜ï¼™ï¼šï¼›ï¼œï¼ï¼žï¼Ÿï¼ ï¼¡ï¼¢ï¼£ï¼¤ï¼¥ï¼¦ï¼§ï¼¨ï¼©ï¼ªï¼«ï¼¬ï¼­ï¼®ï¼¯ï¼°ï¼±ï¼²ï¼³ï¼´ï¼µï¼¶ï¼·ï¼¸ï¼¹ï¼ºï¼»ï¼¼ï¼½ï¼¾ï¼¿ï½€ï½ï½‚ï½ƒï½„ï½…ï½†ï½‡ï½ˆï½‰ï½Šï½‹ï½Œï½ï½Žï½ï½ï½‘ï½’ï½“ï½”ï½•ï½–ï½—ï½˜ï½™ï½šï½›ï½œï½ï¿£ï¿½"
		.split("");
	for (n = 0; n != t[163].length; ++n)
		if (t[163][n].charCodeAt(0) !== 65533) {
			r[t[163][n]] = 41728 + n;
			e[41728 + n] = t[163][n]
		}
	t[164] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ãã‚ãƒã„ã…ã†ã‡ãˆã‰ãŠã‹ãŒããŽããã‘ã’ã“ã”ã•ã–ã—ã˜ã™ãšã›ãœããžãŸã ã¡ã¢ã£ã¤ã¥ã¦ã§ã¨ã©ãªã«ã¬ã­ã®ã¯ã°ã±ã²ã³ã´ãµã¶ã·ã¸ã¹ãºã»ã¼ã½ã¾ã¿ã‚€ã‚ã‚‚ã‚ƒã‚„ã‚…ã‚†ã‚‡ã‚ˆã‚‰ã‚Šã‚‹ã‚Œã‚ã‚Žã‚ã‚ã‚‘ã‚’ã‚“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[164].length; ++n)
		if (t[164][n].charCodeAt(0) !== 65533) {
			r[t[164][n]] = 41984 + n;
			e[41984 + n] = t[164][n]
		}
	t[165] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã‚¡ã‚¢ã‚£ã‚¤ã‚¥ã‚¦ã‚§ã‚¨ã‚©ã‚ªã‚«ã‚¬ã‚­ã‚®ã‚¯ã‚°ã‚±ã‚²ã‚³ã‚´ã‚µã‚¶ã‚·ã‚¸ã‚¹ã‚ºã‚»ã‚¼ã‚½ã‚¾ã‚¿ãƒ€ãƒãƒ‚ãƒƒãƒ„ãƒ…ãƒ†ãƒ‡ãƒˆãƒ‰ãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒãƒ‘ãƒ’ãƒ“ãƒ”ãƒ•ãƒ–ãƒ—ãƒ˜ãƒ™ãƒšãƒ›ãƒœãƒãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ£ãƒ¤ãƒ¥ãƒ¦ãƒ§ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ®ãƒ¯ãƒ°ãƒ±ãƒ²ãƒ³ãƒ´ãƒµãƒ¶ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[165].length; ++n)
		if (t[165][n].charCodeAt(0) !== 65533) {
			r[t[165][n]] = 42240 + n;
			e[42240 + n] = t[165][n]
		}
	t[166] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡Î£Î¤Î¥Î¦Î§Î¨Î©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¸µï¸¶ï¸¹ï¸ºï¸¿ï¹€ï¸½ï¸¾ï¹ï¹‚ï¹ƒï¹„ï¿½ï¿½ï¸»ï¸¼ï¸·ï¸¸ï¸±ï¿½ï¸³ï¸´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[166].length; ++n)
		if (t[166][n].charCodeAt(0) !== 65533) {
			r[t[166][n]] = 42496 + n;
			e[42496 + n] = t[166][n]
		}
	t[167] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ÐÐ‘Ð’Ð“Ð”Ð•ÐÐ–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ð°Ð±Ð²Ð³Ð´ÐµÑ‘Ð¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÑï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[167].length; ++n)
		if (t[167][n].charCodeAt(0) !== 65533) {
			r[t[167][n]] = 42752 + n;
			e[42752 + n] = t[167][n]
		}
	t[168] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ËŠË‹Ë™â€“â€•â€¥â€µâ„…â„‰â†–â†—â†˜â†™âˆ•âˆŸâˆ£â‰’â‰¦â‰§âŠ¿â•â•‘â•’â•“â•”â••â•–â•—â•˜â•™â•šâ•›â•œâ•â•žâ•Ÿâ• â•¡â•¢â•£â•¤â•¥â•¦â•§â•¨â•©â•ªâ•«â•¬â•­â•®â•¯â•°â•±â•²â•³â–â–‚â–ƒâ–„â–…â–†â–‡ï¿½â–ˆâ–‰â–Šâ–‹â–Œâ–â–Žâ–â–“â–”â–•â–¼â–½â—¢â—£â—¤â—¥â˜‰âŠ•ã€’ã€ã€žï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ÄÃ¡ÇŽÃ Ä“Ã©Ä›Ã¨Ä«Ã­ÇÃ¬ÅÃ³Ç’Ã²Å«ÃºÇ”Ã¹Ç–Ç˜ÇšÇœÃ¼ÃªÉ‘ï¿½Å„Åˆï¿½É¡ï¿½ï¿½ï¿½ï¿½ã„…ã„†ã„‡ã„ˆã„‰ã„Šã„‹ã„Œã„ã„Žã„ã„ã„‘ã„’ã„“ã„”ã„•ã„–ã„—ã„˜ã„™ã„šã„›ã„œã„ã„žã„Ÿã„ ã„¡ã„¢ã„£ã„¤ã„¥ã„¦ã„§ã„¨ã„©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[168].length; ++n)
		if (t[168][n].charCodeAt(0) !== 65533) {
			r[t[168][n]] = 43008 + n;
			e[43008 + n] = t[168][n]
		}
	t[169] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã€¡ã€¢ã€£ã€¤ã€¥ã€¦ã€§ã€¨ã€©ãŠ£ãŽŽãŽãŽœãŽãŽžãŽ¡ã„ãŽã‘ã’ã•ï¸°ï¿¢ï¿¤ï¿½â„¡ãˆ±ï¿½â€ï¿½ï¿½ï¿½ãƒ¼ã‚›ã‚œãƒ½ãƒ¾ã€†ã‚ã‚žï¹‰ï¹Šï¹‹ï¹Œï¹ï¹Žï¹ï¹ï¹‘ï¹’ï¹”ï¹•ï¹–ï¹—ï¹™ï¹šï¹›ï¹œï¹ï¹žï¹Ÿï¹ ï¹¡ï¿½ï¹¢ï¹£ï¹¤ï¹¥ï¹¦ï¹¨ï¹©ï¹ªï¹«ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã€‡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â”€â”â”‚â”ƒâ”„â”…â”†â”‡â”ˆâ”‰â”Šâ”‹â”Œâ”â”Žâ”â”â”‘â”’â”“â””â”•â”–â”—â”˜â”™â”šâ”›â”œâ”â”žâ”Ÿâ” â”¡â”¢â”£â”¤â”¥â”¦â”§â”¨â”©â”ªâ”«â”¬â”­â”®â”¯â”°â”±â”²â”³â”´â”µâ”¶â”·â”¸â”¹â”ºâ”»â”¼â”½â”¾â”¿â•€â•â•‚â•ƒâ•„â•…â•†â•‡â•ˆâ•‰â•Šâ•‹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[169].length; ++n)
		if (t[169][n].charCodeAt(0) !== 65533) {
			r[t[169][n]] = 43264 + n;
			e[43264 + n] = t[169][n]
		}
	t[170] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç‹œç‹ç‹Ÿç‹¢ç‹£ç‹¤ç‹¥ç‹¦ç‹§ç‹ªç‹«ç‹µç‹¶ç‹¹ç‹½ç‹¾ç‹¿çŒ€çŒ‚çŒ„çŒ…çŒ†çŒ‡çŒˆçŒ‰çŒ‹çŒŒçŒçŒçŒçŒ‘çŒ’çŒ”çŒ˜çŒ™çŒšçŒŸçŒ çŒ£çŒ¤çŒ¦çŒ§çŒ¨çŒ­çŒ¯çŒ°çŒ²çŒ³çŒµçŒ¶çŒºçŒ»çŒ¼çŒ½ç€çç‚çƒç„ç…ç†ç‡çˆï¿½ç‰çŠç‹çŒçŽçç‘ç“ç”ç•ç–ç˜ç™çšç›çœççžçŸç¡ç¢ç£ç¤ç¥ç¦ç§ç¨ç©çªç«ç®ç°ç±ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[170].length; ++n)
		if (t[170][n].charCodeAt(0) !== 65533) {
			r[t[170][n]] = 43520 + n;
			e[43520 + n] = t[170][n]
		}
	t[171] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç²ç³ç´çµç¶ç·ç¸ç¹çºç»ç¼ç½ç¿çŽ€çŽçŽ‚çŽƒçŽ…çŽ†çŽˆçŽŠçŽŒçŽçŽçŽçŽ’çŽ“çŽ”çŽ•çŽ—çŽ˜çŽ™çŽšçŽœçŽçŽžçŽ çŽ¡çŽ£çŽ¤çŽ¥çŽ¦çŽ§çŽ¨çŽªçŽ¬çŽ­çŽ±çŽ´çŽµçŽ¶çŽ¸çŽ¹çŽ¼çŽ½çŽ¾çŽ¿ççƒç„ç…ç†ç‡ï¿½ç‹çŒçŽç’ç“ç”ç•ç–ç—ç˜çšç›çœççŸç¡ç¢ç£ç¤ç¦ç¨çªç«ç¬ç®ç¯ç°ç±ç³ç´çµç¶ç·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[171].length; ++n)
		if (t[171][n].charCodeAt(0) !== 65533) {
			r[t[171][n]] = 43776 + n;
			e[43776 + n] = t[171][n]
		}
	t[172] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¸ç¹çºç»ç¼ç½ç¾ç¿ç€çç‚ç„ç‡çˆç‹çŒççŽç‘ç’ç“ç”ç•ç–ç—ç˜ç™çœççžçŸç ç¡ç£ç¤ç§ç©ç«ç­ç¯ç±ç²ç·ç¸ç¹çºç»ç½ç¾ç¿ç‘€ç‘‚ç‘ƒç‘„ç‘…ç‘†ç‘‡ç‘ˆç‘‰ç‘Šç‘‹ç‘Œç‘ï¿½ç‘Žç‘ç‘ç‘‘ç‘’ç‘“ç‘”ç‘–ç‘˜ç‘ç‘ ç‘¡ç‘¢ç‘£ç‘¤ç‘¥ç‘¦ç‘§ç‘¨ç‘©ç‘ªç‘«ç‘¬ç‘®ç‘¯ç‘±ç‘²ç‘³ç‘´ç‘µç‘¸ç‘¹ç‘ºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[172].length; ++n)
		if (t[172][n].charCodeAt(0) !== 65533) {
			r[t[172][n]] = 44032 + n;
			e[44032 + n] = t[172][n]
		}
	t[173] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç‘»ç‘¼ç‘½ç‘¿ç’‚ç’„ç’…ç’†ç’ˆç’‰ç’Šç’Œç’ç’ç’‘ç’’ç’“ç’”ç’•ç’–ç’—ç’˜ç’™ç’šç’›ç’ç’Ÿç’ ç’¡ç’¢ç’£ç’¤ç’¥ç’¦ç’ªç’«ç’¬ç’­ç’®ç’¯ç’°ç’±ç’²ç’³ç’´ç’µç’¶ç’·ç’¸ç’¹ç’»ç’¼ç’½ç’¾ç’¿ç“€ç“ç“‚ç“ƒç“„ç“…ç“†ç“‡ï¿½ç“ˆç“‰ç“Šç“‹ç“Œç“ç“Žç“ç“ç“‘ç““ç“”ç“•ç“–ç“—ç“˜ç“™ç“šç“›ç“ç“Ÿç“¡ç“¥ç“§ç“¨ç“©ç“ªç“«ç“¬ç“­ç“°ç“±ç“²ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[173].length; ++n)
		if (t[173][n].charCodeAt(0) !== 65533) {
			r[t[173][n]] = 44288 + n;
			e[44288 + n] = t[173][n]
		}
	t[174] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç“³ç“µç“¸ç“¹ç“ºç“»ç“¼ç“½ç“¾ç”€ç”ç”‚ç”ƒç”…ç”†ç”‡ç”ˆç”‰ç”Šç”‹ç”Œç”Žç”ç”’ç””ç”•ç”–ç”—ç”›ç”ç”žç” ç”¡ç”¢ç”£ç”¤ç”¦ç”§ç”ªç”®ç”´ç”¶ç”¹ç”¼ç”½ç”¿ç•ç•‚ç•ƒç•„ç•†ç•‡ç•‰ç•Šç•ç•ç•‘ç•’ç•“ç••ç•–ç•—ç•˜ï¿½ç•ç•žç•Ÿç• ç•¡ç•¢ç•£ç•¤ç•§ç•¨ç•©ç•«ç•¬ç•­ç•®ç•¯ç•°ç•±ç•³ç•µç•¶ç•·ç•ºç•»ç•¼ç•½ç•¾ç–€ç–ç–‚ç–„ç–…ç–‡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[174].length; ++n)
		if (t[174][n].charCodeAt(0) !== 65533) {
			r[t[174][n]] = 44544 + n;
			e[44544 + n] = t[174][n]
		}
	t[175] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç–ˆç–‰ç–Šç–Œç–ç–Žç–ç–“ç–•ç–˜ç–›ç–œç–žç–¢ç–¦ç–§ç–¨ç–©ç–ªç–­ç–¶ç–·ç–ºç–»ç–¿ç—€ç—ç—†ç—‹ç—Œç—Žç—ç—ç—‘ç—“ç——ç—™ç—šç—œç—ç—Ÿç— ç—¡ç—¥ç—©ç—¬ç—­ç—®ç—¯ç—²ç—³ç—µç—¶ç—·ç—¸ç—ºç—»ç—½ç—¾ç˜‚ç˜„ç˜†ç˜‡ï¿½ç˜ˆç˜‰ç˜‹ç˜ç˜Žç˜ç˜‘ç˜’ç˜“ç˜”ç˜–ç˜šç˜œç˜ç˜žç˜¡ç˜£ç˜§ç˜¨ç˜¬ç˜®ç˜¯ç˜±ç˜²ç˜¶ç˜·ç˜¹ç˜ºç˜»ç˜½ç™ç™‚ç™„ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[175].length; ++n)
		if (t[175][n].charCodeAt(0) !== 65533) {
			r[t[175][n]] = 44800 + n;
			e[44800 + n] = t[175][n]
		}
	t[176] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç™…ç™†ç™‡ç™ˆç™‰ç™Šç™‹ç™Žç™ç™ç™‘ç™’ç™“ç™•ç™—ç™˜ç™™ç™šç™›ç™ç™Ÿç™ ç™¡ç™¢ç™¤ç™¥ç™¦ç™§ç™¨ç™©ç™ªç™¬ç™­ç™®ç™°ç™±ç™²ç™³ç™´ç™µç™¶ç™·ç™¹ç™ºç™¼ç™¿çš€çšçšƒçš…çš‰çšŠçšŒçšçšçšçš’çš”çš•çš—çš˜çššçš›ï¿½çšœçšçšžçšŸçš çš¡çš¢çš£çš¥çš¦çš§çš¨çš©çšªçš«çš¬çš­çš¯çš°çš³çšµçš¶çš·çš¸çš¹çšºçš»çš¼çš½çš¾ç›€ç›ç›ƒå•Šé˜¿åŸƒæŒ¨å“Žå”‰å“€çš‘ç™Œè”¼çŸ®è‰¾ç¢çˆ±éš˜éžæ°¨å®‰ä¿ºæŒ‰æš—å²¸èƒºæ¡ˆè‚®æ˜‚ç›Žå‡¹æ•–ç†¬ç¿±è¢„å‚²å¥¥æ‡Šæ¾³èŠ­æŒæ‰’å­å§ç¬†å…«ç–¤å·´æ‹”è·‹é¶æŠŠè€™åéœ¸ç½¢çˆ¸ç™½æŸç™¾æ‘†ä½°è´¥æ‹œç¨—æ–‘ç­æ¬æ‰³èˆ¬é¢æ¿ç‰ˆæ‰®æ‹Œä¼´ç“£åŠåŠžç»Šé‚¦å¸®æ¢†æ¦œè†€ç»‘æ£’ç£…èšŒé•‘å‚è°¤è‹žèƒžåŒ…è¤’å‰¥ï¿½"
		.split("");
	for (n = 0; n != t[176].length; ++n)
		if (t[176][n].charCodeAt(0) !== 65533) {
			r[t[176][n]] = 45056 + n;
			e[45056 + n] = t[176][n]
		}
	t[177] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç›„ç›‡ç›‰ç›‹ç›Œç›“ç›•ç›™ç›šç›œç›ç›žç› ç›¡ç›¢ç›£ç›¤ç›¦ç›§ç›¨ç›©ç›ªç›«ç›¬ç›­ç›°ç›³ç›µç›¶ç›·ç›ºç›»ç›½ç›¿çœ€çœ‚çœƒçœ…çœ†çœŠçœŒçœŽçœçœçœ‘çœ’çœ“çœ”çœ•çœ–çœ—çœ˜çœ›çœœçœçœžçœ¡çœ£çœ¤çœ¥çœ§çœªçœ«ï¿½çœ¬çœ®çœ°çœ±çœ²çœ³çœ´çœ¹çœ»çœ½çœ¾çœ¿ç‚ç„ç…ç†çˆç‰çŠç‹çŒççŽçç’ç“ç”ç•ç–ç—ç˜ç™çœè–„é›¹ä¿å ¡é¥±å®æŠ±æŠ¥æš´è±¹é²çˆ†æ¯ç¢‘æ‚²å‘åŒ—è¾ˆèƒŒè´é’¡å€ç‹ˆå¤‡æƒ«ç„™è¢«å¥”è‹¯æœ¬ç¬¨å´©ç»·ç”­æ³µè¹¦è¿¸é€¼é¼»æ¯”é„™ç¬”å½¼ç¢§è“–è”½æ¯•æ¯™æ¯–å¸åº‡ç—¹é—­æ•å¼Šå¿…è¾Ÿå£è‡‚é¿é™›éž­è¾¹ç¼–è´¬æ‰ä¾¿å˜åžè¾¨è¾©è¾«éæ ‡å½ªè†˜è¡¨é³–æ†‹åˆ«ç˜ªå½¬æ–Œæ¿’æ»¨å®¾æ‘ˆå…µå†°æŸ„ä¸™ç§‰é¥¼ç‚³ï¿½"
		.split("");
	for (n = 0; n != t[177].length; ++n)
		if (t[177][n].charCodeAt(0) !== 65533) {
			r[t[177][n]] = 45312 + n;
			e[45312 + n] = t[177][n]
		}
	t[178] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ççžçŸç ç¤ç§ç©çªç­ç®ç¯ç°ç±ç²ç³ç´çµç¶ç·ç¸çºç»ç¼çžçž‚çžƒçž†çž‡çžˆçž‰çžŠçž‹çžçžçž“çž”çž•çž–çž—çž˜çž™çžšçž›çžœçžçžžçž¡çž£çž¤çž¦çž¨çž«çž­çž®çž¯çž±çž²çž´çž¶çž·çž¸çž¹çžºï¿½çž¼çž¾çŸ€çŸçŸ‚çŸƒçŸ„çŸ…çŸ†çŸ‡çŸˆçŸ‰çŸŠçŸ‹çŸŒçŸŽçŸçŸçŸ‘çŸ’çŸ“çŸ”çŸ•çŸ–çŸ˜çŸ™çŸšçŸçŸžçŸŸçŸ çŸ¡çŸ¤ç—…å¹¶çŽ»è æ’­æ‹¨é’µæ³¢åšå‹ƒæé“‚ç®”ä¼¯å¸›èˆ¶è„–è†Šæ¸¤æ³Šé©³æ•åœå“ºè¡¥åŸ ä¸å¸ƒæ­¥ç°¿éƒ¨æ€–æ“¦çŒœè£ææ‰è´¢ç¬è¸©é‡‡å½©èœè”¡é¤å‚èš•æ®‹æƒ­æƒ¨ç¿è‹èˆ±ä»“æ²§è—æ“ç³™æ§½æ›¹è‰åŽ•ç­–ä¾§å†Œæµ‹å±‚è¹­æ’å‰èŒ¬èŒ¶æŸ¥ç¢´æ½å¯Ÿå²”å·®è¯§æ‹†æŸ´è±ºæ€æŽºè‰é¦‹è°—ç¼ é“²äº§é˜é¢¤æ˜ŒçŒ–ï¿½"
		.split("");
	for (n = 0; n != t[178].length; ++n)
		if (t[178][n].charCodeAt(0) !== 65533) {
			r[t[178][n]] = 45568 + n;
			e[45568 + n] = t[178][n]
		}
	t[179] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çŸ¦çŸ¨çŸªçŸ¯çŸ°çŸ±çŸ²çŸ´çŸµçŸ·çŸ¹çŸºçŸ»çŸ¼ç ƒç „ç …ç †ç ‡ç ˆç Šç ‹ç Žç ç ç “ç •ç ™ç ›ç žç  ç ¡ç ¢ç ¤ç ¨ç ªç «ç ®ç ¯ç ±ç ²ç ³ç µç ¶ç ½ç ¿ç¡ç¡‚ç¡ƒç¡„ç¡†ç¡ˆç¡‰ç¡Šç¡‹ç¡ç¡ç¡‘ç¡“ç¡”ç¡˜ç¡™ç¡šï¿½ç¡›ç¡œç¡žç¡Ÿç¡ ç¡¡ç¡¢ç¡£ç¡¤ç¡¥ç¡¦ç¡§ç¡¨ç¡©ç¡¯ç¡°ç¡±ç¡²ç¡³ç¡´ç¡µç¡¶ç¡¸ç¡¹ç¡ºç¡»ç¡½ç¡¾ç¡¿ç¢€ç¢ç¢‚ç¢ƒåœºå°å¸¸é•¿å¿è‚ åŽ‚æ•žç•…å”±å€¡è¶…æŠ„é’žæœå˜²æ½®å·¢åµç‚’è½¦æ‰¯æ’¤æŽ£å½»æ¾ˆéƒ´è‡£è¾°å°˜æ™¨å¿±æ²‰é™ˆè¶è¡¬æ’‘ç§°åŸŽæ©™æˆå‘ˆä¹˜ç¨‹æƒ©æ¾„è¯šæ‰¿é€žéª‹ç§¤åƒç—´æŒåŒ™æ± è¿Ÿå¼›é©°è€»é½¿ä¾ˆå°ºèµ¤ç¿…æ–¥ç‚½å……å†²è™«å´‡å® æŠ½é…¬ç•´è¸Œç¨ æ„ç­¹ä»‡ç»¸çž…ä¸‘è‡­åˆå‡ºæ©±åŽ¨èº‡é”„é›æ»é™¤æ¥šï¿½"
		.split("");
	for (n = 0; n != t[179].length; ++n)
		if (t[179][n].charCodeAt(0) !== 65533) {
			r[t[179][n]] = 45824 + n;
			e[45824 + n] = t[179][n]
		}
	t[180] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¢„ç¢…ç¢†ç¢ˆç¢Šç¢‹ç¢ç¢ç¢’ç¢”ç¢•ç¢–ç¢™ç¢ç¢žç¢ ç¢¢ç¢¤ç¢¦ç¢¨ç¢©ç¢ªç¢«ç¢¬ç¢­ç¢®ç¢¯ç¢µç¢¶ç¢·ç¢¸ç¢ºç¢»ç¢¼ç¢½ç¢¿ç£€ç£‚ç£ƒç£„ç£†ç£‡ç£ˆç£Œç£ç£Žç£ç£‘ç£’ç£“ç£–ç£—ç£˜ç£šç£›ç£œç£ç£žç£Ÿç£ ç£¡ç£¢ç££ï¿½ç£¤ç£¥ç£¦ç£§ç£©ç£ªç£«ç£­ç£®ç£¯ç£°ç£±ç£³ç£µç£¶ç£¸ç£¹ç£»ç£¼ç£½ç£¾ç£¿ç¤€ç¤‚ç¤ƒç¤„ç¤†ç¤‡ç¤ˆç¤‰ç¤Šç¤‹ç¤Œç¡€å‚¨çŸ—æè§¦å¤„æ£å·ç©¿æ¤½ä¼ èˆ¹å–˜ä¸²ç–®çª—å¹¢åºŠé—¯åˆ›å¹ç‚Šæ¶é”¤åž‚æ˜¥æ¤¿é†‡å”‡æ·³çº¯è ¢æˆ³ç»°ç–µèŒ¨ç£é›Œè¾žæ…ˆç“·è¯æ­¤åˆºèµæ¬¡èªè‘±å›±åŒ†ä»Žä¸›å‡‘ç²—é†‹ç°‡ä¿ƒè¹¿ç¯¡çªœæ‘§å´”å‚¬è„†ç˜ç²¹æ·¬ç¿ æ‘å­˜å¯¸ç£‹æ’®æ“æŽªæŒ«é”™æ­è¾¾ç­”ç˜©æ‰“å¤§å‘†æ­¹å‚£æˆ´å¸¦æ®†ä»£è´·è¢‹å¾…é€®ï¿½"
		.split("");
	for (n = 0; n != t[180].length; ++n)
		if (t[180][n].charCodeAt(0) !== 65533) {
			r[t[180][n]] = 46080 + n;
			e[46080 + n] = t[180][n]
		}
	t[181] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¤ç¤Žç¤ç¤ç¤‘ç¤’ç¤”ç¤•ç¤–ç¤—ç¤˜ç¤™ç¤šç¤›ç¤œç¤ç¤Ÿç¤ ç¤¡ç¤¢ç¤£ç¤¥ç¤¦ç¤§ç¤¨ç¤©ç¤ªç¤«ç¤¬ç¤­ç¤®ç¤¯ç¤°ç¤±ç¤²ç¤³ç¤µç¤¶ç¤·ç¤¸ç¤¹ç¤½ç¤¿ç¥‚ç¥ƒç¥„ç¥…ç¥‡ç¥Šç¥‹ç¥Œç¥ç¥Žç¥ç¥ç¥‘ç¥’ç¥”ç¥•ç¥˜ç¥™ç¥¡ç¥£ï¿½ç¥¤ç¥¦ç¥©ç¥ªç¥«ç¥¬ç¥®ç¥°ç¥±ç¥²ç¥³ç¥´ç¥µç¥¶ç¥¹ç¥»ç¥¼ç¥½ç¥¾ç¥¿ç¦‚ç¦ƒç¦†ç¦‡ç¦ˆç¦‰ç¦‹ç¦Œç¦ç¦Žç¦ç¦‘ç¦’æ€ è€½æ‹…ä¸¹å•éƒ¸æŽ¸èƒ†æ—¦æ°®ä½†æƒ®æ·¡è¯žå¼¹è›‹å½“æŒ¡å…šè¡æ¡£åˆ€æ£è¹ˆå€’å²›ç¥·å¯¼åˆ°ç¨»æ‚¼é“ç›—å¾·å¾—çš„è¹¬ç¯ç™»ç­‰çžªå‡³é‚“å ¤ä½Žæ»´è¿ªæ•Œç¬›ç‹„æ¶¤ç¿Ÿå«¡æŠµåº•åœ°è’‚ç¬¬å¸å¼Ÿé€’ç¼”é¢ æŽ‚æ»‡ç¢˜ç‚¹å…¸é›åž«ç”µä½ƒç”¸åº—æƒ¦å¥ æ·€æ®¿ç¢‰å¼é›•å‡‹åˆæŽ‰åŠé’“è°ƒè·Œçˆ¹ç¢Ÿè¶è¿­è°å ï¿½"
		.split("");
	for (n = 0; n != t[181].length; ++n)
		if (t[181][n].charCodeAt(0) !== 65533) {
			r[t[181][n]] = 46336 + n;
			e[46336 + n] = t[181][n]
		}
	t[182] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¦“ç¦”ç¦•ç¦–ç¦—ç¦˜ç¦™ç¦›ç¦œç¦ç¦žç¦Ÿç¦ ç¦¡ç¦¢ç¦£ç¦¤ç¦¥ç¦¦ç¦¨ç¦©ç¦ªç¦«ç¦¬ç¦­ç¦®ç¦¯ç¦°ç¦±ç¦²ç¦´ç¦µç¦¶ç¦·ç¦¸ç¦¼ç¦¿ç§‚ç§„ç§…ç§‡ç§ˆç§Šç§Œç§Žç§ç§ç§“ç§”ç§–ç§—ç§™ç§šç§›ç§œç§ç§žç§ ç§¡ç§¢ç§¥ç§¨ç§ªï¿½ç§¬ç§®ç§±ç§²ç§³ç§´ç§µç§¶ç§·ç§¹ç§ºç§¼ç§¾ç§¿ç¨ç¨„ç¨…ç¨‡ç¨ˆç¨‰ç¨Šç¨Œç¨ç¨ç¨‘ç¨’ç¨“ç¨•ç¨–ç¨˜ç¨™ç¨›ç¨œä¸ç›¯å®é’‰é¡¶é¼Žé”­å®šè®¢ä¸¢ä¸œå†¬è‘£æ‡‚åŠ¨æ ‹ä¾—æ«å†»æ´žå…œæŠ–æ–—é™¡è±†é€—ç—˜éƒ½ç£æ¯’çŠŠç‹¬è¯»å µç¹èµŒæœé•€è‚šåº¦æ¸¡å¦’ç«¯çŸ­é”»æ®µæ–­ç¼Žå †å…‘é˜Ÿå¯¹å¢©å¨è¹²æ•¦é¡¿å›¤é’ç›¾éæŽ‡å“†å¤šå¤ºåž›èº²æœµè·ºèˆµå‰æƒ°å •è›¾å³¨é¹…ä¿„é¢è®¹å¨¥æ¶åŽ„æ‰¼éé„‚é¥¿æ©è€Œå„¿è€³å°”é¥µæ´±äºŒï¿½"
		.split("");
	for (n = 0; n != t[182].length; ++n)
		if (t[182][n].charCodeAt(0) !== 65533) {
			r[t[182][n]] = 46592 + n;
			e[46592 + n] = t[182][n]
		}
	t[183] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¨ç¨Ÿç¨¡ç¨¢ç¨¤ç¨¥ç¨¦ç¨§ç¨¨ç¨©ç¨ªç¨«ç¨¬ç¨­ç¨®ç¨¯ç¨°ç¨±ç¨²ç¨´ç¨µç¨¶ç¨¸ç¨ºç¨¾ç©€ç©ç©‚ç©ƒç©„ç©…ç©‡ç©ˆç©‰ç©Šç©‹ç©Œç©ç©Žç©ç©ç©’ç©“ç©”ç©•ç©–ç©˜ç©™ç©šç©›ç©œç©ç©žç©Ÿç© ç©¡ç©¢ç©£ç©¤ç©¥ç©¦ç©§ç©¨ï¿½ç©©ç©ªç©«ç©¬ç©­ç©®ç©¯ç©±ç©²ç©³ç©µç©»ç©¼ç©½ç©¾çª‚çª…çª‡çª‰çªŠçª‹çªŒçªŽçªçªçª“çª”çª™çªšçª›çªžçª¡çª¢è´°å‘ç½šç­ä¼ä¹é˜€æ³•çè—©å¸†ç•ªç¿»æ¨ŠçŸ¾é’’ç¹å‡¡çƒ¦åè¿”èŒƒè´©çŠ¯é¥­æ³›åŠèŠ³æ–¹è‚ªæˆ¿é˜²å¦¨ä»¿è®¿çººæ”¾è²éžå•¡é£žè‚¥åŒªè¯½å è‚ºåºŸæ²¸è´¹èŠ¬é…šå©æ°›åˆ†çº·åŸç„šæ±¾ç²‰å¥‹ä»½å¿¿æ„¤ç²ªä¸°å°æž«èœ‚å³°é”‹é£Žç–¯çƒ½é€¢å†¯ç¼è®½å¥‰å‡¤ä½›å¦å¤«æ•·è‚¤å­µæ‰¶æ‹‚è¾å¹…æ°Ÿç¬¦ä¼ä¿˜æœï¿½"
		.split("");
	for (n = 0; n != t[183].length; ++n)
		if (t[183][n].charCodeAt(0) !== 65533) {
			r[t[183][n]] = 46848 + n;
			e[46848 + n] = t[183][n]
		}
	t[184] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çª£çª¤çª§çª©çªªçª«çª®çª¯çª°çª±çª²çª´çªµçª¶çª·çª¸çª¹çªºçª»çª¼çª½çª¾ç«€ç«ç«‚ç«ƒç«„ç«…ç«†ç«‡ç«ˆç«‰ç«Šç«Œç«ç«Žç«ç«ç«‘ç«’ç«“ç«”ç«•ç«—ç«˜ç«šç«›ç«œç«ç«¡ç«¢ç«¤ç«§ç«¨ç«©ç«ªç««ç«¬ç«®ç«°ç«±ç«²ç«³ï¿½ç«´ç«µç«¶ç«·ç«¸ç«»ç«¼ç«¾ç¬€ç¬ç¬‚ç¬…ç¬‡ç¬‰ç¬Œç¬ç¬Žç¬ç¬’ç¬“ç¬–ç¬—ç¬˜ç¬šç¬œç¬ç¬Ÿç¬¡ç¬¢ç¬£ç¬§ç¬©ç¬­æµ®æ¶ªç¦è¢±å¼—ç”«æŠšè¾…ä¿¯é‡œæ–§è„¯è…‘åºœè…èµ´å‰¯è¦†èµ‹å¤å‚…ä»˜é˜œçˆ¶è…¹è´Ÿå¯Œè®£é™„å¦‡ç¼šå’å™¶å˜Žè¯¥æ”¹æ¦‚é’™ç›–æº‰å¹²ç”˜æ†æŸ‘ç«¿è‚èµ¶æ„Ÿç§†æ•¢èµ£å†ˆåˆšé’¢ç¼¸è‚›çº²å²—æ¸¯æ ç¯™çš‹é«˜è†ç¾”ç³•æžé•ç¨¿å‘Šå“¥æ­Œææˆˆé¸½èƒ³ç–™å‰²é©è‘›æ ¼è›¤é˜éš”é“¬ä¸ªå„ç»™æ ¹è·Ÿè€•æ›´åºšç¾¹ï¿½"
		.split("");
	for (n = 0; n != t[184].length; ++n)
		if (t[184][n].charCodeAt(0) !== 65533) {
			r[t[184][n]] = 47104 + n;
			e[47104 + n] = t[184][n]
		}
	t[185] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¬¯ç¬°ç¬²ç¬´ç¬µç¬¶ç¬·ç¬¹ç¬»ç¬½ç¬¿ç­€ç­ç­‚ç­ƒç­„ç­†ç­ˆç­Šç­ç­Žç­“ç­•ç­—ç­™ç­œç­žç­Ÿç­¡ç­£ç­¤ç­¥ç­¦ç­§ç­¨ç­©ç­ªç­«ç­¬ç­­ç­¯ç­°ç­³ç­´ç­¶ç­¸ç­ºç­¼ç­½ç­¿ç®ç®‚ç®ƒç®„ç®†ç®‡ç®ˆç®‰ç®Šç®‹ç®Œç®Žç®ï¿½ç®‘ç®’ç®“ç®–ç®˜ç®™ç®šç®›ç®žç®Ÿç® ç®£ç®¤ç®¥ç®®ç®¯ç®°ç®²ç®³ç®µç®¶ç®·ç®¹ç®ºç®»ç®¼ç®½ç®¾ç®¿ç¯€ç¯‚ç¯ƒç¯„åŸ‚è€¿æ¢—å·¥æ”»åŠŸæ­é¾šä¾›èº¬å…¬å®«å¼“å·©æ±žæ‹±è´¡å…±é’©å‹¾æ²Ÿè‹Ÿç‹—åž¢æž„è´­å¤Ÿè¾œè‡å’•ç®ä¼°æ²½å­¤å§‘é¼“å¤è›Šéª¨è°·è‚¡æ•…é¡¾å›ºé›‡åˆ®ç“œå‰å¯¡æŒ‚è¤‚ä¹–æ‹æ€ªæ£ºå…³å®˜å† è§‚ç®¡é¦†ç½æƒ¯çŒè´¯å…‰å¹¿é€›ç‘°è§„åœ­ç¡…å½’é¾Ÿé—ºè½¨é¬¼è¯¡ç™¸æ¡‚æŸœè·ªè´µåˆ½è¾Šæ»šæ£é”…éƒ­å›½æžœè£¹è¿‡å“ˆï¿½"
		.split("");
	for (n = 0; n != t[185].length; ++n)
		if (t[185][n].charCodeAt(0) !== 65533) {
			r[t[185][n]] = 47360 + n;
			e[47360 + n] = t[185][n]
		}
	t[186] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¯…ç¯ˆç¯‰ç¯Šç¯‹ç¯ç¯Žç¯ç¯ç¯’ç¯”ç¯•ç¯–ç¯—ç¯˜ç¯›ç¯œç¯žç¯Ÿç¯ ç¯¢ç¯£ç¯¤ç¯§ç¯¨ç¯©ç¯«ç¯¬ç¯­ç¯¯ç¯°ç¯²ç¯³ç¯´ç¯µç¯¶ç¯¸ç¯¹ç¯ºç¯»ç¯½ç¯¿ç°€ç°ç°‚ç°ƒç°„ç°…ç°†ç°ˆç°‰ç°Šç°ç°Žç°ç°‘ç°’ç°“ç°”ç°•ç°—ç°˜ç°™ï¿½ç°šç°›ç°œç°ç°žç° ç°¡ç°¢ç°£ç°¤ç°¥ç°¨ç°©ç°«ç°¬ç°­ç°®ç°¯ç°°ç°±ç°²ç°³ç°´ç°µç°¶ç°·ç°¹ç°ºç°»ç°¼ç°½ç°¾ç±‚éª¸å­©æµ·æ°¦äº¥å®³éª‡é…£æ†¨é‚¯éŸ©å«æ¶µå¯’å‡½å–Šç½•ç¿°æ’¼ææ—±æ†¾æ‚ç„Šæ±—æ±‰å¤¯æ­èˆªå£•åšŽè±ªæ¯«éƒå¥½è€—å·æµ©å‘µå–è·èæ ¸ç¦¾å’Œä½•åˆç›’è²‰é˜‚æ²³æ¶¸èµ«è¤é¹¤è´ºå˜¿é»‘ç—•å¾ˆç‹ æ¨å“¼äº¨æ¨ªè¡¡æ’è½°å“„çƒ˜è™¹é¸¿æ´ªå®å¼˜çº¢å–‰ä¾¯çŒ´å¼åŽšå€™åŽå‘¼ä¹Žå¿½ç‘šå£¶è‘«èƒ¡è´ç‹ç³Šæ¹–ï¿½"
		.split("");
	for (n = 0; n != t[186].length; ++n)
		if (t[186][n].charCodeAt(0) !== 65533) {
			r[t[186][n]] = 47616 + n;
			e[47616 + n] = t[186][n]
		}
	t[187] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç±ƒç±„ç±…ç±†ç±‡ç±ˆç±‰ç±Šç±‹ç±Œç±Žç±ç±ç±‘ç±’ç±“ç±”ç±•ç±–ç±—ç±˜ç±™ç±šç±›ç±œç±ç±žç±Ÿç± ç±¡ç±¢ç±£ç±¤ç±¥ç±¦ç±§ç±¨ç±©ç±ªç±«ç±¬ç±­ç±®ç±¯ç±°ç±±ç±²ç±µç±¶ç±·ç±¸ç±¹ç±ºç±¾ç±¿ç²€ç²ç²‚ç²ƒç²„ç²…ç²†ç²‡ï¿½ç²ˆç²Šç²‹ç²Œç²ç²Žç²ç²ç²“ç²”ç²–ç²™ç²šç²›ç² ç²¡ç²£ç²¦ç²§ç²¨ç²©ç²«ç²¬ç²­ç²¯ç²°ç²´ç²µç²¶ç²·ç²¸ç²ºç²»å¼§è™Žå”¬æŠ¤äº’æ²ªæˆ·èŠ±å“—åŽçŒ¾æ»‘ç”»åˆ’åŒ–è¯æ§å¾Šæ€€æ·®åæ¬¢çŽ¯æ¡“è¿˜ç¼“æ¢æ‚£å”¤ç—ªè±¢ç„•æ¶£å®¦å¹»è’æ…Œé»„ç£ºè—ç°§çš‡å‡°æƒ¶ç…Œæ™ƒå¹Œæè°Žç°æŒ¥è¾‰å¾½æ¢è›”å›žæ¯æ‚”æ…§å‰æƒ æ™¦è´¿ç§½ä¼šçƒ©æ±‡è®³è¯²ç»˜è¤æ˜å©šé­‚æµ‘æ··è±æ´»ä¼™ç«èŽ·æˆ–æƒ‘éœè´§ç¥¸å‡»åœ¾åŸºæœºç•¸ç¨½ç§¯ç®•ï¿½"
		.split("");
	for (n = 0; n != t[187].length; ++n)
		if (t[187][n].charCodeAt(0) !== 65533) {
			r[t[187][n]] = 47872 + n;
			e[47872 + n] = t[187][n]
		}
	t[188] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç²¿ç³€ç³‚ç³ƒç³„ç³†ç³‰ç³‹ç³Žç³ç³ç³‘ç³’ç³“ç³”ç³˜ç³šç³›ç³ç³žç³¡ç³¢ç³£ç³¤ç³¥ç³¦ç³§ç³©ç³ªç³«ç³¬ç³­ç³®ç³°ç³±ç³²ç³³ç³´ç³µç³¶ç³·ç³¹ç³ºç³¼ç³½ç³¾ç³¿ç´€ç´ç´‚ç´ƒç´„ç´…ç´†ç´‡ç´ˆç´‰ç´‹ç´Œç´ç´Žç´ç´ï¿½ç´‘ç´’ç´“ç´”ç´•ç´–ç´—ç´˜ç´™ç´šç´›ç´œç´ç´žç´Ÿç´¡ç´£ç´¤ç´¥ç´¦ç´¨ç´©ç´ªç´¬ç´­ç´®ç´°ç´±ç´²ç´³ç´´ç´µç´¶è‚Œé¥¥è¿¹æ¿€è®¥é¸¡å§¬ç»©ç¼‰å‰æžæ£˜è¾‘ç±é›†åŠæ€¥ç–¾æ±²å³å«‰çº§æŒ¤å‡ è„Šå·±è“ŸæŠ€å†€å­£ä¼Žç¥­å‰‚æ‚¸æµŽå¯„å¯‚è®¡è®°æ—¢å¿Œé™…å¦“ç»§çºªå˜‰æž·å¤¹ä½³å®¶åŠ èšé¢Šè´¾ç”²é’¾å‡ç¨¼ä»·æž¶é©¾å«æ­¼ç›‘åšå°–ç¬ºé—´ç…Žå…¼è‚©è‰°å¥¸ç¼„èŒ§æ£€æŸ¬ç¢±ç¡·æ‹£æ¡ç®€ä¿­å‰ªå‡èæ§›é‰´è·µè´±è§é”®ç®­ä»¶ï¿½"
		.split("");
	for (n = 0; n != t[188].length; ++n)
		if (t[188][n].charCodeAt(0) !== 65533) {
			r[t[188][n]] = 48128 + n;
			e[48128 + n] = t[188][n]
		}
	t[189] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç´·ç´¸ç´¹ç´ºç´»ç´¼ç´½ç´¾ç´¿çµ€çµçµ‚çµƒçµ„çµ…çµ†çµ‡çµˆçµ‰çµŠçµ‹çµŒçµçµŽçµçµçµ‘çµ’çµ“çµ”çµ•çµ–çµ—çµ˜çµ™çµšçµ›çµœçµçµžçµŸçµ çµ¡çµ¢çµ£çµ¤çµ¥çµ¦çµ§çµ¨çµ©çµªçµ«çµ¬çµ­çµ¯çµ°çµ±çµ²çµ³çµ´çµµçµ¶ï¿½çµ¸çµ¹çµºçµ»çµ¼çµ½çµ¾çµ¿ç¶€ç¶ç¶‚ç¶ƒç¶„ç¶…ç¶†ç¶‡ç¶ˆç¶‰ç¶Šç¶‹ç¶Œç¶ç¶Žç¶ç¶ç¶‘ç¶’ç¶“ç¶”ç¶•ç¶–ç¶—ç¶˜å¥èˆ°å‰‘é¥¯æ¸æº…æ¶§å»ºåƒµå§œå°†æµ†æ±Ÿç–†è’‹æ¡¨å¥–è®²åŒ é…±é™è•‰æ¤’ç¤ç„¦èƒ¶äº¤éƒŠæµ‡éª„å¨‡åš¼æ…é“°çŸ«ä¾¥è„šç‹¡è§’é¥ºç¼´ç»žå‰¿æ•™é…µè½¿è¾ƒå«çª–æ­æŽ¥çš†ç§¸è¡—é˜¶æˆªåŠ«èŠ‚æ¡”æ°æ·ç«ç«­æ´ç»“è§£å§æˆ’è—‰èŠ¥ç•Œå€Ÿä»‹ç–¥è¯«å±Šå·¾ç­‹æ–¤é‡‘ä»Šæ´¥è¥Ÿç´§é”¦ä»…è°¨è¿›é³æ™‹ç¦è¿‘çƒ¬æµ¸ï¿½"
		.split("");
	for (n = 0; n != t[189].length; ++n)
		if (t[189][n].charCodeAt(0) !== 65533) {
			r[t[189][n]] = 48384 + n;
			e[48384 + n] = t[189][n]
		}
	t[190] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¶™ç¶šç¶›ç¶œç¶ç¶žç¶Ÿç¶ ç¶¡ç¶¢ç¶£ç¶¤ç¶¥ç¶§ç¶¨ç¶©ç¶ªç¶«ç¶¬ç¶­ç¶¯ç¶°ç¶±ç¶²ç¶³ç¶´ç¶µç¶¶ç¶·ç¶¸ç¶¹ç¶ºç¶»ç¶¼ç¶½ç¶¾ç¶¿ç·€ç·ç·‚ç·ƒç·„ç·…ç·†ç·‡ç·ˆç·‰ç·Šç·‹ç·Œç·ç·Žç·ç·ç·‘ç·’ç·“ç·”ç·•ç·–ç·—ç·˜ç·™ï¿½ç·šç·›ç·œç·ç·žç·Ÿç· ç·¡ç·¢ç·£ç·¤ç·¥ç·¦ç·§ç·¨ç·©ç·ªç·«ç·¬ç·­ç·®ç·¯ç·°ç·±ç·²ç·³ç·´ç·µç·¶ç··ç·¸ç·¹ç·ºå°½åŠ²è†å…¢èŒŽç›æ™¶é²¸äº¬æƒŠç²¾ç²³ç»äº•è­¦æ™¯é¢ˆé™å¢ƒæ•¬é•œå¾„ç—‰é–ç«Ÿç«žå‡€ç‚¯çª˜æªç©¶çº çŽ–éŸ­ä¹…ç¸ä¹é…’åŽ©æ•‘æ—§è‡¼èˆ…å’Žå°±ç–šéž æ‹˜ç‹™ç–½å±…é©¹èŠå±€å’€çŸ©ä¸¾æ²®èšæ‹’æ®å·¨å…·è·è¸žé”¯ä¿±å¥æƒ§ç‚¬å‰§æé¹ƒå¨Ÿå€¦çœ·å·ç»¢æ’…æ”«æŠ‰æŽ˜å€”çˆµè§‰å†³è¯€ç»å‡èŒé’§å†›å›å³»ï¿½"
		.split("");
	for (n = 0; n != t[190].length; ++n)
		if (t[190][n].charCodeAt(0) !== 65533) {
			r[t[190][n]] = 48640 + n;
			e[48640 + n] = t[190][n]
		}
	t[191] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç·»ç·¼ç·½ç·¾ç·¿ç¸€ç¸ç¸‚ç¸ƒç¸„ç¸…ç¸†ç¸‡ç¸ˆç¸‰ç¸Šç¸‹ç¸Œç¸ç¸Žç¸ç¸ç¸‘ç¸’ç¸“ç¸”ç¸•ç¸–ç¸—ç¸˜ç¸™ç¸šç¸›ç¸œç¸ç¸žç¸Ÿç¸ ç¸¡ç¸¢ç¸£ç¸¤ç¸¥ç¸¦ç¸§ç¸¨ç¸©ç¸ªç¸«ç¸¬ç¸­ç¸®ç¸¯ç¸°ç¸±ç¸²ç¸³ç¸´ç¸µç¸¶ç¸·ç¸¸ç¸¹ï¿½ç¸ºç¸¼ç¸½ç¸¾ç¸¿ç¹€ç¹‚ç¹ƒç¹„ç¹…ç¹†ç¹ˆç¹‰ç¹Šç¹‹ç¹Œç¹ç¹Žç¹ç¹ç¹‘ç¹’ç¹“ç¹”ç¹•ç¹–ç¹—ç¹˜ç¹™ç¹šç¹›ç¹œç¹ä¿Šç«£æµšéƒ¡éªå–€å’–å¡å’¯å¼€æ©æ¥·å‡¯æ…¨åˆŠå ªå‹˜åŽç çœ‹åº·æ…·ç³ æ‰›æŠ—äº¢ç‚•è€ƒæ‹·çƒ¤é å·è‹›æŸ¯æ£µç£•é¢—ç§‘å£³å’³å¯æ¸´å…‹åˆ»å®¢è¯¾è‚¯å•ƒåž¦æ³å‘å­ç©ºæå­”æŽ§æŠ å£æ‰£å¯‡æž¯å“­çªŸè‹¦é…·åº“è£¤å¤¸åž®æŒŽè·¨èƒ¯å—ç­·ä¾©å¿«å®½æ¬¾åŒ¡ç­ç‹‚æ¡†çŸ¿çœ¶æ—·å†µäºç›”å²¿çª¥è‘µå¥Žé­å‚€ï¿½"
		.split("");
	for (n = 0; n != t[191].length; ++n)
		if (t[191][n].charCodeAt(0) !== 65533) {
			r[t[191][n]] = 48896 + n;
			e[48896 + n] = t[191][n]
		}
	t[192] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¹žç¹Ÿç¹ ç¹¡ç¹¢ç¹£ç¹¤ç¹¥ç¹¦ç¹§ç¹¨ç¹©ç¹ªç¹«ç¹¬ç¹­ç¹®ç¹¯ç¹°ç¹±ç¹²ç¹³ç¹´ç¹µç¹¶ç¹·ç¹¸ç¹¹ç¹ºç¹»ç¹¼ç¹½ç¹¾ç¹¿çº€çºçºƒçº„çº…çº†çº‡çºˆçº‰çºŠçº‹çºŒçºçºŽçºçºçº‘çº’çº“çº”çº•çº–çº—çº˜çº™çºšçºœçºçºžï¿½çº®çº´çº»çº¼ç»–ç»¤ç»¬ç»¹ç¼Šç¼ç¼žç¼·ç¼¹ç¼»ç¼¼ç¼½ç¼¾ç¼¿ç½€ç½ç½ƒç½†ç½‡ç½ˆç½‰ç½Šç½‹ç½Œç½ç½Žç½ç½’ç½“é¦ˆæ„§æºƒå¤æ˜†æ†å›°æ‹¬æ‰©å»“é˜”åžƒæ‹‰å–‡èœ¡è…Šè¾£å•¦èŽ±æ¥èµ–è“å©ªæ æ‹¦ç¯®é˜‘å…°æ¾œè°°æ½è§ˆæ‡’ç¼†çƒ‚æ»¥ç…æ¦”ç‹¼å»ŠéƒŽæœ—æµªæžåŠ³ç‰¢è€ä½¬å§¥é…ªçƒ™æ¶å‹’ä¹é›·é•­è•¾ç£Šç´¯å„¡åž’æ“‚è‚‹ç±»æ³ªæ£±æ¥žå†·åŽ˜æ¢¨çŠé»Žç¯±ç‹¸ç¦»æ¼“ç†æŽé‡Œé²¤ç¤¼èŽ‰è”åæ —ä¸½åŽ‰åŠ±ç ¾åŽ†åˆ©å‚ˆä¾‹ä¿ï¿½"
		.split("");
	for (n = 0; n != t[192].length; ++n)
		if (t[192][n].charCodeAt(0) !== 65533) {
			r[t[192][n]] = 49152 + n;
			e[49152 + n] = t[192][n]
		}
	t[193] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç½–ç½™ç½›ç½œç½ç½žç½ ç½£ç½¤ç½¥ç½¦ç½§ç½«ç½¬ç½­ç½¯ç½°ç½³ç½µç½¶ç½·ç½¸ç½ºç½»ç½¼ç½½ç½¿ç¾€ç¾‚ç¾ƒç¾„ç¾…ç¾†ç¾‡ç¾ˆç¾‰ç¾‹ç¾ç¾ç¾ç¾‘ç¾’ç¾“ç¾•ç¾–ç¾—ç¾˜ç¾™ç¾›ç¾œç¾ ç¾¢ç¾£ç¾¥ç¾¦ç¾¨ç¾©ç¾ªç¾«ç¾¬ç¾­ç¾®ç¾±ï¿½ç¾³ç¾´ç¾µç¾¶ç¾·ç¾ºç¾»ç¾¾ç¿€ç¿‚ç¿ƒç¿„ç¿†ç¿‡ç¿ˆç¿‰ç¿‹ç¿ç¿ç¿ç¿‘ç¿’ç¿“ç¿–ç¿—ç¿™ç¿šç¿›ç¿œç¿ç¿žç¿¢ç¿£ç—¢ç«‹ç²’æ²¥éš¶åŠ›ç’ƒå“©ä¿©è”èŽ²è¿žé•°å»‰æ€œæ¶Ÿå¸˜æ•›è„¸é“¾æ‹ç‚¼ç»ƒç²®å‡‰æ¢ç²±è‰¯ä¸¤è¾†é‡æ™¾äº®è°…æ’©èŠåƒšç–—ç‡Žå¯¥è¾½æ½¦äº†æ’‚é•£å»–æ–™åˆ—è£‚çƒˆåŠ£çŒŽç³æž—ç£·éœ–ä¸´é‚»é³žæ·‹å‡›èµåæ‹ŽçŽ²è±é›¶é¾„é“ƒä¼¶ç¾šå‡Œçµé™µå²­é¢†å¦ä»¤æºœç‰æ¦´ç¡«é¦ç•™åˆ˜ç˜¤æµæŸ³å…­é¾™è‹å’™ç¬¼çª¿ï¿½"
		.split("");
	for (n = 0; n != t[193].length; ++n)
		if (t[193][n].charCodeAt(0) !== 65533) {
			r[t[193][n]] = 49408 + n;
			e[49408 + n] = t[193][n]
		}
	t[194] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¿¤ç¿§ç¿¨ç¿ªç¿«ç¿¬ç¿­ç¿¯ç¿²ç¿´ç¿µç¿¶ç¿·ç¿¸ç¿¹ç¿ºç¿½ç¿¾ç¿¿è€‚è€‡è€ˆè€‰è€Šè€Žè€è€‘è€“è€šè€›è€è€žè€Ÿè€¡è€£è€¤è€«è€¬è€­è€®è€¯è€°è€²è€´è€¹è€ºè€¼è€¾è€èè„è…è‡èˆè‰èŽèèè‘è“è•è–è—ï¿½è™è›èœèèžèŸè è¡è¢è£è¤è¥è¦è§è¨è«è¬è­è®è¯è°è²è³è´èµè¶è·è¸è¹èºè»è¼è½éš†åž„æ‹¢é™‡æ¥¼å¨„æ‚ç¯“æ¼é™‹èŠ¦å¢é¢…åºç‚‰æŽ³å¤è™é²éº“ç¢Œéœ²è·¯èµ‚é¹¿æ½žç¦„å½•é™†æˆ®é©´å•é“ä¾£æ—…å±¥å±¡ç¼•è™‘æ°¯å¾‹çŽ‡æ»¤ç»¿å³¦æŒ›å­ªæ»¦åµä¹±æŽ ç•¥æŠ¡è½®ä¼¦ä»‘æ²¦çº¶è®ºèèžºç½—é€»é”£ç®©éª¡è£¸è½æ´›éª†ç»œå¦ˆéº»çŽ›ç èš‚é©¬éª‚å˜›å—åŸ‹ä¹°éº¦å–è¿ˆè„‰çž’é¦’è›®æ»¡è”“æ›¼æ…¢æ¼«ï¿½"
		.split("");
	for (n = 0; n != t[194].length; ++n)
		if (t[194][n].charCodeAt(0) !== 65533) {
			r[t[194][n]] = 49664 + n;
			e[49664 + n] = t[194][n]
		}
	t[195] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¾è‚è‚‚è‚…è‚ˆè‚Šè‚è‚Žè‚è‚è‚‘è‚’è‚”è‚•è‚—è‚™è‚žè‚£è‚¦è‚§è‚¨è‚¬è‚°è‚³è‚µè‚¶è‚¸è‚¹è‚»èƒ…èƒ‡èƒˆèƒ‰èƒŠèƒ‹èƒèƒèƒ‘èƒ’èƒ“èƒ”èƒ•èƒ˜èƒŸèƒ èƒ¢èƒ£èƒ¦èƒ®èƒµèƒ·èƒ¹èƒ»èƒ¾èƒ¿è„€è„è„ƒè„„è„…è„‡è„ˆè„‹ï¿½è„Œè„•è„—è„™è„›è„œè„è„Ÿè„ è„¡è„¢è„£è„¤è„¥è„¦è„§è„¨è„©è„ªè„«è„­è„®è„°è„³è„´è„µè„·è„¹è„ºè„»è„¼è„½è„¿è°©èŠ’èŒ«ç›²æ°“å¿™èŽ½çŒ«èŒ…é”šæ¯›çŸ›é“†å¯èŒ‚å†’å¸½è²Œè´¸ä¹ˆçŽ«æžšæ¢…é…¶éœ‰ç…¤æ²¡çœ‰åª’é•æ¯ç¾Žæ˜§å¯å¦¹åªšé—¨é—·ä»¬èŒè’™æª¬ç›Ÿé”°çŒ›æ¢¦å­Ÿçœ¯é†šé¡ç³œè¿·è°œå¼¥ç±³ç§˜è§…æ³Œèœœå¯†å¹‚æ£‰çœ ç»µå†•å…å‹‰å¨©ç¼…é¢è‹—æçž„è—ç§’æ¸ºåº™å¦™è”‘ç­æ°‘æŠ¿çš¿æ•æ‚¯é—½æ˜ŽèžŸé¸£é“­åå‘½è°¬æ‘¸ï¿½"
		.split("");
	for (n = 0; n != t[195].length; ++n)
		if (t[195][n].charCodeAt(0) !== 65533) {
			r[t[195][n]] = 49920 + n;
			e[49920 + n] = t[195][n]
		}
	t[196] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è…€è…è…‚è…ƒè…„è……è…‡è…‰è…è…Žè…è…’è…–è…—è…˜è…›è…œè…è…žè…Ÿè…¡è…¢è…£è…¤è…¦è…¨è…ªè…«è…¬è…¯è…²è…³è…µè…¶è…·è…¸è†è†ƒè†„è†…è††è†‡è†‰è†‹è†Œè†è†Žè†è†’è†“è†”è†•è†–è†—è†™è†šè†žè†Ÿè† è†¡è†¢è†¤è†¥ï¿½è†§è†©è†«è†¬è†­è†®è†¯è†°è†±è†²è†´è†µè†¶è†·è†¸è†¹è†¼è†½è†¾è†¿è‡„è‡…è‡‡è‡ˆè‡‰è‡‹è‡è‡Žè‡è‡è‡‘è‡’è‡“æ‘¹è˜‘æ¨¡è†œç£¨æ‘©é­”æŠ¹æœ«èŽ«å¢¨é»˜æ²«æ¼ å¯žé™Œè°‹ç‰ŸæŸæ‹‡ç‰¡äº©å§†æ¯å¢“æš®å¹•å‹Ÿæ…•æœ¨ç›®ç¦ç‰§ç©†æ‹¿å“ªå‘é’ é‚£å¨œçº³æ°–ä¹ƒå¥¶è€å¥ˆå—ç”·éš¾å›ŠæŒ è„‘æ¼é—¹æ·–å‘¢é¦å†…å«©èƒ½å¦®éœ“å€ªæ³¥å°¼æ‹Ÿä½ åŒ¿è…»é€†æººè”«æ‹ˆå¹´ç¢¾æ’µæ»å¿µå¨˜é…¿é¸Ÿå°¿æè‚å­½å•®é•Šé•æ¶…æ‚¨æŸ ç‹žå‡å®ï¿½"
		.split("");
	for (n = 0; n != t[196].length; ++n)
		if (t[196][n].charCodeAt(0) !== 65533) {
			r[t[196][n]] = 50176 + n;
			e[50176 + n] = t[196][n]
		}
	t[197] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‡”è‡•è‡–è‡—è‡˜è‡™è‡šè‡›è‡œè‡è‡žè‡Ÿè‡ è‡¡è‡¢è‡¤è‡¥è‡¦è‡¨è‡©è‡«è‡®è‡¯è‡°è‡±è‡²è‡µè‡¶è‡·è‡¸è‡¹è‡ºè‡½è‡¿èˆƒèˆ‡èˆˆèˆ‰èˆŠèˆ‹èˆŽèˆèˆ‘èˆ“èˆ•èˆ–èˆ—èˆ˜èˆ™èˆšèˆèˆ èˆ¤èˆ¥èˆ¦èˆ§èˆ©èˆ®èˆ²èˆºèˆ¼èˆ½èˆ¿ï¿½è‰€è‰è‰‚è‰ƒè‰…è‰†è‰ˆè‰Šè‰Œè‰è‰Žè‰è‰‘è‰’è‰“è‰”è‰•è‰–è‰—è‰™è‰›è‰œè‰è‰žè‰ è‰¡è‰¢è‰£è‰¤è‰¥è‰¦è‰§è‰©æ‹§æ³žç‰›æ‰­é’®çº½è„“æµ“å†œå¼„å¥´åŠªæ€’å¥³æš–è™ç–ŸæŒªæ‡¦ç³¯è¯ºå“¦æ¬§é¸¥æ®´è—•å‘•å¶æ²¤å•ªè¶´çˆ¬å¸•æ€•ç¶æ‹æŽ’ç‰Œå¾˜æ¹ƒæ´¾æ”€æ½˜ç›˜ç£ç›¼ç•”åˆ¤å›ä¹“åºžæ—è€ªèƒ–æŠ›å’†åˆ¨ç‚®è¢è·‘æ³¡å‘¸èƒšåŸ¹è£´èµ”é™ªé…ä½©æ²›å–·ç›†ç °æŠ¨çƒ¹æ¾Žå½­è“¬æ£šç¡¼ç¯·è†¨æœ‹é¹æ§ç¢°å¯ç ’éœ¹æ‰¹æŠ«åŠˆçµæ¯—ï¿½"
		.split("");
	for (n = 0; n != t[197].length; ++n)
		if (t[197][n].charCodeAt(0) !== 65533) {
			r[t[197][n]] = 50432 + n;
			e[50432 + n] = t[197][n]
		}
	t[198] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‰ªè‰«è‰¬è‰­è‰±è‰µè‰¶è‰·è‰¸è‰»è‰¼èŠ€èŠèŠƒèŠ…èŠ†èŠ‡èŠ‰èŠŒèŠèŠ“èŠ”èŠ•èŠ–èŠšèŠ›èŠžèŠ èŠ¢èŠ£èŠ§èŠ²èŠµèŠ¶èŠºèŠ»èŠ¼èŠ¿è‹€è‹‚è‹ƒè‹…è‹†è‹‰è‹è‹–è‹™è‹šè‹è‹¢è‹§è‹¨è‹©è‹ªè‹¬è‹­è‹®è‹°è‹²è‹³è‹µè‹¶è‹¸ï¿½è‹ºè‹¼è‹½è‹¾è‹¿èŒ€èŒŠèŒ‹èŒèŒèŒ’èŒ“èŒ–èŒ˜èŒ™èŒèŒžèŒŸèŒ èŒ¡èŒ¢èŒ£èŒ¤èŒ¥èŒ¦èŒ©èŒªèŒ®èŒ°èŒ²èŒ·èŒ»èŒ½å•¤è„¾ç–²çš®åŒ¹ç—žåƒ»å±è­¬ç¯‡åç‰‡éª—é£˜æ¼‚ç“¢ç¥¨æ’‡çž¥æ‹¼é¢‘è´«å“è˜ä¹’åªè‹¹èå¹³å‡­ç“¶è¯„å±å¡æ³¼é¢‡å©†ç ´é­„è¿«ç²•å‰–æ‰‘é“ºä»†èŽ†è‘¡è©è’²åŸ”æœ´åœƒæ™®æµ¦è°±æ›ç€‘æœŸæ¬ºæ –æˆšå¦»ä¸ƒå‡„æ¼†æŸ’æ²å…¶æ£‹å¥‡æ­§ç•¦å´Žè„é½æ——ç¥ˆç¥éª‘èµ·å²‚ä¹žä¼å¯å¥‘ç Œå™¨æ°”è¿„å¼ƒæ±½æ³£è®«æŽï¿½"
		.split("");
	for (n = 0; n != t[198].length; ++n)
		if (t[198][n].charCodeAt(0) !== 65533) {
			r[t[198][n]] = 50688 + n;
			e[50688 + n] = t[198][n]
		}
	t[199] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èŒ¾èŒ¿èè‚è„è…èˆèŠè‹èŒèèŽè“è•è–è—è˜è™èè¢è°è±è²è³è´èµè¶è¹èºè¾è¿èŽ€èŽèŽ‚èŽƒèŽ„èŽ‡èŽˆèŽŠèŽ‹èŽŒèŽèŽèŽèŽ‘èŽ”èŽ•èŽ–èŽ—èŽ™èŽšèŽèŽŸèŽ¡èŽ¢èŽ£èŽ¤èŽ¥èŽ¦èŽ§èŽ¬èŽ­èŽ®ï¿½èŽ¯èŽµèŽ»èŽ¾èŽ¿è‚èƒè„è†èˆè‰è‹èèŽèè‘è’è“è•è—è™èšè›èžè¢è£è¤è¦è§è¨è«è¬è­æ°æ´½ç‰µæ‰¦é’Žé“…åƒè¿ç­¾ä»Ÿè°¦ä¹¾é»”é’±é’³å‰æ½œé£æµ…è°´å ‘åµŒæ¬ æ­‰æžªå‘›è…”ç¾Œå¢™è”·å¼ºæŠ¢æ©‡é”¹æ•²æ‚„æ¡¥çž§ä¹”ä¾¨å·§éž˜æ’¬ç¿˜å³­ä¿çªåˆ‡èŒ„ä¸”æ€¯çªƒé’¦ä¾µäº²ç§¦ç´å‹¤èŠ¹æ“’ç¦½å¯æ²é’è½»æ°¢å€¾å¿æ¸…æ“Žæ™´æ°°æƒ…é¡·è¯·åº†ç¼ç©·ç§‹ä¸˜é‚±çƒæ±‚å›šé…‹æ³…è¶‹åŒºè›†æ›²èº¯å±ˆé©±æ¸ ï¿½"
		.split("");
	for (n = 0; n != t[199].length; ++n)
		if (t[199][n].charCodeAt(0) !== 65533) {
			r[t[199][n]] = 50944 + n;
			e[50944 + n] = t[199][n]
		}
	t[200] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è®è¯è³è´èµè¶è·èºè»è¼è¾è¿è€è‚è…è‡èˆè‰èŠèè’è“è”è•è–è—è™èšè›èžèŸè è¡è¢è£è©èªè«è¬è­è®è¯è°è²è³è´èµè¶è·è¹èºè»è¾è¿è‘€è‘è‘‚è‘ƒè‘„è‘…è‘‡è‘ˆè‘‰ï¿½è‘Šè‘‹è‘Œè‘è‘Žè‘è‘è‘’è‘“è‘”è‘•è‘–è‘˜è‘è‘žè‘Ÿè‘ è‘¢è‘¤è‘¥è‘¦è‘§è‘¨è‘ªè‘®è‘¯è‘°è‘²è‘´è‘·è‘¹è‘»è‘¼å–å¨¶é¾‹è¶£åŽ»åœˆé¢§æƒé†›æ³‰å…¨ç—Šæ‹³çŠ¬åˆ¸åŠç¼ºç‚”ç˜¸å´é¹Šæ¦·ç¡®é›€è£™ç¾¤ç„¶ç‡ƒå†‰æŸ“ç“¤å£¤æ”˜åš·è®©é¥¶æ‰°ç»•æƒ¹çƒ­å£¬ä»äººå¿éŸ§ä»»è®¤åˆƒå¦Šçº«æ‰”ä»æ—¥æˆŽèŒ¸è“‰è£èžç†”æº¶å®¹ç»’å†—æ‰æŸ”è‚‰èŒ¹è •å„’å­ºå¦‚è¾±ä¹³æ±å…¥è¤¥è½¯é˜®è•Šç‘žé”é—°æ¶¦è‹¥å¼±æ’’æ´’è¨è…®é³ƒå¡žèµ›ä¸‰åï¿½"
		.split("");
	for (n = 0; n != t[200].length; ++n)
		if (t[200][n].charCodeAt(0) !== 65533) {
			r[t[200][n]] = 51200 + n;
			e[51200 + n] = t[200][n]
		}
	t[201] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‘½è‘¾è‘¿è’€è’è’ƒè’„è’…è’†è’Šè’è’è’è’‘è’’è’“è’”è’•è’–è’˜è’šè’›è’è’žè’Ÿè’ è’¢è’£è’¤è’¥è’¦è’§è’¨è’©è’ªè’«è’¬è’­è’®è’°è’±è’³è’µè’¶è’·è’»è’¼è’¾è“€è“‚è“ƒè“…è“†è“‡è“ˆè“‹è“Œè“Žè“è“’è“”è“•è“—ï¿½è“˜è“™è“šè“›è“œè“žè“¡è“¢è“¤è“§è“¨è“©è“ªè“«è“­è“®è“¯è“±è“²è“³è“´è“µè“¶è“·è“¸è“¹è“ºè“»è“½è“¾è”€è”è”‚ä¼žæ•£æ¡‘å—“ä¸§æ”éªšæ‰«å«‚ç‘Ÿè‰²æ¶©æ£®åƒ§èŽŽç ‚æ€åˆ¹æ²™çº±å‚»å•¥ç…žç­›æ™’çŠè‹«æ‰å±±åˆ ç…½è¡«é—ªé™•æ“…èµ¡è†³å–„æ±•æ‰‡ç¼®å¢’ä¼¤å•†èµæ™Œä¸Šå°šè£³æ¢¢æŽç¨çƒ§èŠå‹ºéŸ¶å°‘å“¨é‚µç»å¥¢èµŠè›‡èˆŒèˆèµ¦æ‘„å°„æ…‘æ¶‰ç¤¾è®¾ç ·ç”³å‘»ä¼¸èº«æ·±å¨ ç»…ç¥žæ²ˆå®¡å©¶ç”šè‚¾æ…Žæ¸—å£°ç”Ÿç”¥ç‰²å‡ç»³ï¿½"
		.split("");
	for (n = 0; n != t[201].length; ++n)
		if (t[201][n].charCodeAt(0) !== 65533) {
			r[t[201][n]] = 51456 + n;
			e[51456 + n] = t[201][n]
		}
	t[202] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è”ƒè”„è”…è”†è”‡è”ˆè”‰è”Šè”‹è”è”Žè”è”è”’è””è”•è”–è”˜è”™è”›è”œè”è”žè” è”¢è”£è”¤è”¥è”¦è”§è”¨è”©è”ªè”­è”®è”¯è”°è”±è”²è”³è”´è”µè”¶è”¾è”¿è•€è•è•‚è•„è•…è•†è•‡è•‹è•Œè•è•Žè•è•è•‘è•’è•“è•”è••ï¿½è•—è•˜è•šè•›è•œè•è•Ÿè• è•¡è•¢è•£è•¥è•¦è•§è•©è•ªè•«è•¬è•­è•®è•¯è•°è•±è•³è•µè•¶è•·è•¸è•¼è•½è•¿è–€è–çœç››å‰©èƒœåœ£å¸ˆå¤±ç‹®æ–½æ¹¿è¯—å°¸è™±åçŸ³æ‹¾æ—¶ä»€é£Ÿèš€å®žè¯†å²çŸ¢ä½¿å±Žé©¶å§‹å¼ç¤ºå£«ä¸–æŸ¿äº‹æ‹­èª“é€åŠ¿æ˜¯å—œå™¬é€‚ä»•ä¾é‡Šé¥°æ°å¸‚æƒå®¤è§†è¯•æ”¶æ‰‹é¦–å®ˆå¯¿æŽˆå”®å—ç˜¦å…½è”¬æž¢æ¢³æ®ŠæŠ’è¾“å”èˆ’æ·‘ç–ä¹¦èµŽå­°ç†Ÿè–¯æš‘æ›™ç½²èœ€é»é¼ å±žæœ¯è¿°æ ‘æŸæˆç«–å¢…åº¶æ•°æ¼±ï¿½"
		.split("");
	for (n = 0; n != t[202].length; ++n)
		if (t[202][n].charCodeAt(0) !== 65533) {
			r[t[202][n]] = 51712 + n;
			e[51712 + n] = t[202][n]
		}
	t[203] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è–‚è–ƒè–†è–ˆè–‰è–Šè–‹è–Œè–è–Žè–è–‘è–’è–“è–”è–•è––è–—è–˜è–™è–šè–è–žè–Ÿè– è–¡è–¢è–£è–¥è–¦è–§è–©è–«è–¬è–­è–±è–²è–³è–´è–µè–¶è–¸è–ºè–»è–¼è–½è–¾è–¿è—€è—‚è—ƒè—„è—…è—†è—‡è—ˆè—Šè—‹è—Œè—è—Žè—‘è—’ï¿½è—”è—–è——è—˜è—™è—šè—›è—è—žè—Ÿè— è—¡è—¢è—£è—¥è—¦è—§è—¨è—ªè—«è—¬è—­è—®è—¯è—°è—±è—²è—³è—´è—µè—¶è—·è—¸æ•åˆ·è€æ‘”è¡°ç”©å¸…æ “æ‹´éœœåŒçˆ½è°æ°´ç¡ç¨Žå®çž¬é¡ºèˆœè¯´ç¡•æœ”çƒæ–¯æ’•å˜¶æ€ç§å¸ä¸æ­»è‚†å¯ºå—£å››ä¼ºä¼¼é¥²å·³æ¾è€¸æ€‚é¢‚é€å®‹è®¼è¯µæœè‰˜æ“žå—½è‹é…¥ä¿—ç´ é€Ÿç²Ÿåƒ³å¡‘æº¯å®¿è¯‰è‚ƒé…¸è’œç®—è™½éš‹éšç»¥é«“ç¢Žå²ç©—é‚éš§ç¥Ÿå­™æŸç¬‹è“‘æ¢­å”†ç¼©çç´¢é”æ‰€å¡Œä»–å®ƒå¥¹å¡”ï¿½"
		.split("");
	for (n = 0; n != t[203].length; ++n)
		if (t[203][n].charCodeAt(0) !== 65533) {
			r[t[203][n]] = 51968 + n;
			e[51968 + n] = t[203][n]
		}
	t[204] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è—¹è—ºè—¼è—½è—¾è˜€è˜è˜‚è˜ƒè˜„è˜†è˜‡è˜ˆè˜‰è˜Šè˜‹è˜Œè˜è˜Žè˜è˜è˜’è˜“è˜”è˜•è˜—è˜˜è˜™è˜šè˜›è˜œè˜è˜žè˜Ÿè˜ è˜¡è˜¢è˜£è˜¤è˜¥è˜¦è˜¨è˜ªè˜«è˜¬è˜­è˜®è˜¯è˜°è˜±è˜²è˜³è˜´è˜µè˜¶è˜·è˜¹è˜ºè˜»è˜½è˜¾è˜¿è™€ï¿½è™è™‚è™ƒè™„è™…è™†è™‡è™ˆè™‰è™Šè™‹è™Œè™’è™“è™•è™–è™—è™˜è™™è™›è™œè™è™Ÿè™ è™¡è™£è™¤è™¥è™¦è™§è™¨è™©è™ªç­æŒžè¹‹è¸èƒŽè‹”æŠ¬å°æ³°é…žå¤ªæ€æ±°åæ‘Šè´ªç˜«æ»©å›æª€ç—°æ½­è°­è°ˆå¦æ¯¯è¢’ç¢³æŽ¢å¹ç‚­æ±¤å¡˜æªå ‚æ£ è†›å”ç³–å€˜èººæ·Œè¶Ÿçƒ«æŽæ¶›æ»”ç»¦è„æ¡ƒé€ƒæ·˜é™¶è®¨å¥—ç‰¹è—¤è…¾ç–¼èªŠæ¢¯å‰”è¸¢é”‘æé¢˜è¹„å•¼ä½“æ›¿åšæƒ•æ¶•å‰ƒå±‰å¤©æ·»å¡«ç”°ç”œæ¬èˆ”è…†æŒ‘æ¡è¿¢çœºè·³è´´é“å¸–åŽ…å¬çƒƒï¿½"
		.split("");
	for (n = 0; n != t[204].length; ++n)
		if (t[204][n].charCodeAt(0) !== 65533) {
			r[t[204][n]] = 52224 + n;
			e[52224 + n] = t[204][n]
		}
	t[205] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è™­è™¯è™°è™²è™³è™´è™µè™¶è™·è™¸èšƒèš„èš…èš†èš‡èšˆèš‰èšŽèšèšèš‘èš’èš”èš–èš—èš˜èš™èššèš›èšžèšŸèš èš¡èš¢èš¥èš¦èš«èš­èš®èš²èš³èš·èš¸èš¹èš»èš¼èš½èš¾èš¿è›è›‚è›ƒè›…è›ˆè›Œè›è›’è›“è›•è›–è›—è›šè›œï¿½è›è› è›¡è›¢è›£è›¥è›¦è›§è›¨è›ªè›«è›¬è›¯è›µè›¶è›·è›ºè›»è›¼è›½è›¿èœèœ„èœ…èœ†èœ‹èœŒèœŽèœèœèœ‘èœ”èœ–æ±€å»·åœäº­åº­æŒºè‰‡é€šæ¡é…®çž³åŒé“œå½¤ç«¥æ¡¶æ…ç­’ç»Ÿç—›å·æŠ•å¤´é€å‡¸ç§ƒçªå›¾å¾’é€”æ¶‚å± åœŸåå…”æ¹å›¢æŽ¨é¢“è…¿èœ•è¤ªé€€åžå±¯è‡€æ‹–æ‰˜è„±é¸µé™€é©®é©¼æ¤­å¦¥æ‹“å”¾æŒ–å“‡è›™æ´¼å¨ƒç“¦è¢œæ­ªå¤–è±Œå¼¯æ¹¾çŽ©é¡½ä¸¸çƒ·å®Œç¢—æŒ½æ™šçš–æƒ‹å®›å©‰ä¸‡è…•æ±ªçŽ‹äº¡æž‰ç½‘å¾€æ—ºæœ›å¿˜å¦„å¨ï¿½"
		.split("");
	for (n = 0; n != t[205].length; ++n)
		if (t[205][n].charCodeAt(0) !== 65533) {
			r[t[205][n]] = 52480 + n;
			e[52480 + n] = t[205][n]
		}
	t[206] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èœ™èœ›èœèœŸèœ èœ¤èœ¦èœ§èœ¨èœªèœ«èœ¬èœ­èœ¯èœ°èœ²èœ³èœµèœ¶èœ¸èœ¹èœºèœ¼èœ½è€èè‚èƒè„è…è†èŠè‹èèèè‘è’è”è•è–è˜èšè›èœèèžèŸè¡è¢è¦è§è¨è©èªè«è¬è­è¯è±è²è³èµï¿½è·è¸è¹èºè¿èž€èžèž„èž†èž‡èž‰èžŠèžŒèžŽèžèžèž‘èž’èž”èž•èž–èž˜èž™èžšèž›èžœèžèžžèž èž¡èž¢èž£èž¤å·å¾®å±éŸ¦è¿æ¡…å›´å”¯æƒŸä¸ºæ½ç»´è‹‡èŽå§”ä¼Ÿä¼ªå°¾çº¬æœªè”šå‘³ç•èƒƒå–‚é­ä½æ¸­è°“å°‰æ…°å«ç˜Ÿæ¸©èšŠæ–‡é—»çº¹å»ç¨³ç´Šé—®å—¡ç¿ç“®æŒèœ—æ¶¡çªæˆ‘æ–¡å§æ¡æ²ƒå·«å‘œé’¨ä¹Œæ±¡è¯¬å±‹æ— èŠœæ¢§å¾å´æ¯‹æ­¦äº”æ‚åˆèˆžä¼ä¾®åžæˆŠé›¾æ™¤ç‰©å‹¿åŠ¡æ‚Ÿè¯¯æ˜”ç†™æžè¥¿ç¡’çŸ½æ™°å˜»å¸é”¡ç‰ºï¿½"
		.split("");
	for (n = 0; n != t[206].length; ++n)
		if (t[206][n].charCodeAt(0) !== 65533) {
			r[t[206][n]] = 52736 + n;
			e[52736 + n] = t[206][n]
		}
	t[207] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èž¥èž¦èž§èž©èžªèž®èž°èž±èž²èž´èž¶èž·èž¸èž¹èž»èž¼èž¾èž¿èŸèŸ‚èŸƒèŸ„èŸ…èŸ‡èŸˆèŸ‰èŸŒèŸèŸŽèŸèŸèŸ”èŸ•èŸ–èŸ—èŸ˜èŸ™èŸšèŸœèŸèŸžèŸŸèŸ¡èŸ¢èŸ£èŸ¤èŸ¦èŸ§èŸ¨èŸ©èŸ«èŸ¬èŸ­èŸ¯èŸ°èŸ±èŸ²èŸ³èŸ´èŸµèŸ¶èŸ·èŸ¸ï¿½èŸºèŸ»èŸ¼èŸ½èŸ¿è €è è ‚è „è …è †è ‡è ˆè ‰è ‹è Œè è Žè è è ‘è ’è ”è —è ˜è ™è šè œè è žè Ÿè  è £ç¨€æ¯å¸Œæ‚‰è†å¤•æƒœç†„çƒ¯æºªæ±çŠ€æª„è¢­å¸­ä¹ åª³å–œé“£æ´—ç³»éš™æˆç»†çžŽè™¾åŒ£éœžè¾–æš‡å³¡ä¾ ç‹­ä¸‹åŽ¦å¤å“æŽ€é”¨å…ˆä»™é²œçº¤å’¸è´¤è¡”èˆ·é—²æ¶Žå¼¦å«Œæ˜¾é™©çŽ°çŒ®åŽ¿è…ºé¦…ç¾¡å®ªé™·é™çº¿ç›¸åŽ¢é•¶é¦™ç®±è¥„æ¹˜ä¹¡ç¿”ç¥¥è¯¦æƒ³å“äº«é¡¹å··æ©¡åƒå‘è±¡è§ç¡éœ„å‰Šå“®åš£é”€æ¶ˆå®µæ·†æ™“ï¿½"
		.split("");
	for (n = 0; n != t[207].length; ++n)
		if (t[207][n].charCodeAt(0) !== 65533) {
			r[t[207][n]] = 52992 + n;
			e[52992 + n] = t[207][n]
		}
	t[208] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è ¤è ¥è ¦è §è ¨è ©è ªè «è ¬è ­è ®è ¯è °è ±è ³è ´è µè ¶è ·è ¸è ºè »è ½è ¾è ¿è¡è¡‚è¡ƒè¡†è¡‡è¡ˆè¡‰è¡Šè¡‹è¡Žè¡è¡è¡‘è¡’è¡“è¡•è¡–è¡˜è¡šè¡›è¡œè¡è¡žè¡Ÿè¡ è¡¦è¡§è¡ªè¡­è¡¯è¡±è¡³è¡´è¡µè¡¶è¡¸è¡¹è¡ºï¿½è¡»è¡¼è¢€è¢ƒè¢†è¢‡è¢‰è¢Šè¢Œè¢Žè¢è¢è¢‘è¢“è¢”è¢•è¢—è¢˜è¢™è¢šè¢›è¢è¢žè¢Ÿè¢ è¢¡è¢£è¢¥è¢¦è¢§è¢¨è¢©è¢ªå°å­æ ¡è‚–å•¸ç¬‘æ•ˆæ¥”äº›æ­‡èŽéž‹åæŒŸæºé‚ªæ–œèƒè°å†™æ¢°å¸èŸ¹æ‡ˆæ³„æ³»è°¢å±‘è–ªèŠ¯é”Œæ¬£è¾›æ–°å¿»å¿ƒä¿¡è¡…æ˜Ÿè…¥çŒ©æƒºå…´åˆ‘åž‹å½¢é‚¢è¡Œé†’å¹¸ææ€§å§“å…„å‡¶èƒ¸åŒˆæ±¹é›„ç†Šä¼‘ä¿®ç¾žæœ½å—…é”ˆç§€è¢–ç»£å¢ŸæˆŒéœ€è™šå˜˜é¡»å¾è®¸è“„é…—å™æ—­åºç•œæ¤çµ®å©¿ç»ªç»­è½©å–§å®£æ‚¬æ—‹çŽ„ï¿½"
		.split("");
	for (n = 0; n != t[208].length; ++n)
		if (t[208][n].charCodeAt(0) !== 65533) {
			r[t[208][n]] = 53248 + n;
			e[53248 + n] = t[208][n]
		}
	t[209] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¢¬è¢®è¢¯è¢°è¢²è¢³è¢´è¢µè¢¶è¢¸è¢¹è¢ºè¢»è¢½è¢¾è¢¿è£€è£ƒè£„è£‡è£ˆè£Šè£‹è£Œè£è£è£è£‘è£“è£–è£—è£šè£›è£œè£è£žè£ è£¡è£¦è£§è£©è£ªè£«è£¬è£­è£®è£¯è£²è£µè£¶è£·è£ºè£»è£½è£¿è¤€è¤è¤ƒè¤„è¤…è¤†è¤‡è¤ˆï¿½è¤‰è¤‹è¤Œè¤è¤Žè¤è¤‘è¤”è¤•è¤–è¤—è¤˜è¤œè¤è¤žè¤Ÿè¤ è¤¢è¤£è¤¤è¤¦è¤§è¤¨è¤©è¤¬è¤­è¤®è¤¯è¤±è¤²è¤³è¤µè¤·é€‰ç™£çœ©ç»šé´è–›å­¦ç©´é›ªè¡€å‹‹ç†å¾ªæ—¬è¯¢å¯»é©¯å·¡æ®‰æ±›è®­è®¯é€Šè¿…åŽ‹æŠ¼é¸¦é¸­å‘€ä¸«èŠ½ç‰™èšœå´–è¡™æ¶¯é›…å“‘äºšè®¶ç„‰å’½é˜‰çƒŸæ·¹ç›ä¸¥ç ”èœ’å²©å»¶è¨€é¢œé˜Žç‚Žæ²¿å¥„æŽ©çœ¼è¡æ¼”è‰³å °ç‡•åŽŒç šé›å”å½¦ç„°å®´è°šéªŒæ®ƒå¤®é¸¯ç§§æ¨æ‰¬ä½¯ç–¡ç¾Šæ´‹é˜³æ°§ä»°ç—’å…»æ ·æ¼¾é‚€è…°å¦–ç‘¶ï¿½"
		.split("");
	for (n = 0; n != t[209].length; ++n)
		if (t[209][n].charCodeAt(0) !== 65533) {
			r[t[209][n]] = 53504 + n;
			e[53504 + n] = t[209][n]
		}
	t[210] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¤¸è¤¹è¤ºè¤»è¤¼è¤½è¤¾è¤¿è¥€è¥‚è¥ƒè¥…è¥†è¥‡è¥ˆè¥‰è¥Šè¥‹è¥Œè¥è¥Žè¥è¥è¥‘è¥’è¥“è¥”è¥•è¥–è¥—è¥˜è¥™è¥šè¥›è¥œè¥è¥ è¥¡è¥¢è¥£è¥¤è¥¥è¥§è¥¨è¥©è¥ªè¥«è¥¬è¥­è¥®è¥¯è¥°è¥±è¥²è¥³è¥´è¥µè¥¶è¥·è¥¸è¥¹è¥ºè¥¼ï¿½è¥½è¥¾è¦€è¦‚è¦„è¦…è¦‡è¦ˆè¦‰è¦Šè¦‹è¦Œè¦è¦Žè¦è¦è¦‘è¦’è¦“è¦”è¦•è¦–è¦—è¦˜è¦™è¦šè¦›è¦œè¦è¦žè¦Ÿè¦ è¦¡æ‘‡å°§é¥çª‘è°£å§šå’¬èˆ€è¯è¦è€€æ¤°å™Žè€¶çˆ·é‡Žå†¶ä¹Ÿé¡µæŽ–ä¸šå¶æ›³è…‹å¤œæ¶²ä¸€å£¹åŒ»æ–é“±ä¾ä¼Šè¡£é¢å¤·é—ç§»ä»ªèƒ°ç–‘æ²‚å®œå§¨å½æ¤…èšå€šå·²ä¹™çŸ£ä»¥è‰ºæŠ‘æ˜“é‚‘å±¹äº¿å½¹è‡†é€¸è‚„ç–«äº¦è£”æ„æ¯…å¿†ä¹‰ç›Šæº¢è¯£è®®è°Šè¯‘å¼‚ç¿¼ç¿Œç»ŽèŒµè«å› æ®·éŸ³é˜´å§»åŸé“¶æ·«å¯…é¥®å°¹å¼•éšï¿½"
		.split("");
	for (n = 0; n != t[210].length; ++n)
		if (t[210][n].charCodeAt(0) !== 65533) {
			r[t[210][n]] = 53760 + n;
			e[53760 + n] = t[210][n]
		}
	t[211] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¦¢è¦£è¦¤è¦¥è¦¦è¦§è¦¨è¦©è¦ªè¦«è¦¬è¦­è¦®è¦¯è¦°è¦±è¦²è¦³è¦´è¦µè¦¶è¦·è¦¸è¦¹è¦ºè¦»è¦¼è¦½è¦¾è¦¿è§€è§ƒè§è§“è§”è§•è§—è§˜è§™è§›è§è§Ÿè§ è§¡è§¢è§¤è§§è§¨è§©è§ªè§¬è§­è§®è§°è§±è§²è§´è§µè§¶è§·è§¸è§¹è§ºï¿½è§»è§¼è§½è§¾è§¿è¨è¨‚è¨ƒè¨„è¨…è¨†è¨ˆè¨‰è¨Šè¨‹è¨Œè¨è¨Žè¨è¨è¨‘è¨’è¨“è¨”è¨•è¨–è¨—è¨˜è¨™è¨šè¨›è¨œè¨å°è‹±æ¨±å©´é¹°åº”ç¼¨èŽ¹è¤è¥è§è‡è¿Žèµ¢ç›ˆå½±é¢–ç¡¬æ˜ å“Ÿæ‹¥ä½£è‡ƒç—ˆåº¸é›è¸Šè›¹å’æ³³æ¶Œæ°¸æ¿å‹‡ç”¨å¹½ä¼˜æ‚ å¿§å°¤ç”±é‚®é“€çŠ¹æ²¹æ¸¸é…‰æœ‰å‹å³ä½‘é‡‰è¯±åˆå¹¼è¿‚æ·¤äºŽç›‚æ¦†è™žæ„šèˆ†ä½™ä¿žé€¾é±¼æ„‰æ¸æ¸”éš…äºˆå¨±é›¨ä¸Žå±¿ç¦¹å®‡è¯­ç¾½çŽ‰åŸŸèŠ‹éƒåé‡å–»å³ªå¾¡æ„ˆæ¬²ç‹±è‚²èª‰ï¿½"
		.split("");
	for (n = 0; n != t[211].length; ++n)
		if (t[211][n].charCodeAt(0) !== 65533) {
			r[t[211][n]] = 54016 + n;
			e[54016 + n] = t[211][n]
		}
	t[212] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¨žè¨Ÿè¨ è¨¡è¨¢è¨£è¨¤è¨¥è¨¦è¨§è¨¨è¨©è¨ªè¨«è¨¬è¨­è¨®è¨¯è¨°è¨±è¨²è¨³è¨´è¨µè¨¶è¨·è¨¸è¨¹è¨ºè¨»è¨¼è¨½è¨¿è©€è©è©‚è©ƒè©„è©…è©†è©‡è©‰è©Šè©‹è©Œè©è©Žè©è©è©‘è©’è©“è©”è©•è©–è©—è©˜è©™è©šè©›è©œè©è©žï¿½è©Ÿè© è©¡è©¢è©£è©¤è©¥è©¦è©§è©¨è©©è©ªè©«è©¬è©­è©®è©¯è©°è©±è©²è©³è©´è©µè©¶è©·è©¸è©ºè©»è©¼è©½è©¾è©¿èª€æµ´å¯“è£•é¢„è±«é©­é¸³æ¸Šå†¤å…ƒåž£è¢åŽŸæ´è¾•å›­å‘˜åœ†çŒ¿æºç¼˜è¿œè‹‘æ„¿æ€¨é™¢æ›°çº¦è¶Šè·ƒé’¥å²³ç²¤æœˆæ‚¦é˜…è€˜äº‘éƒ§åŒ€é™¨å…è¿è•´é…æ™•éŸµå­•åŒç ¸æ‚æ ½å“‰ç¾å®°è½½å†åœ¨å’±æ”’æš‚èµžèµƒè„è‘¬é­ç³Ÿå‡¿è—»æž£æ—©æ¾¡èš¤èºå™ªé€ çš‚ç¶ç‡¥è´£æ‹©åˆ™æ³½è´¼æ€Žå¢žæ†Žæ›¾èµ æ‰Žå–³æ¸£æœ­è½§ï¿½"
		.split("");
	for (n = 0; n != t[212].length; ++n)
		if (t[212][n].charCodeAt(0) !== 65533) {
			r[t[212][n]] = 54272 + n;
			e[54272 + n] = t[212][n]
		}
	t[213] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èªèª‚èªƒèª„èª…èª†èª‡èªˆèª‹èªŒèªèªŽèªèªèª‘èª’èª”èª•èª–èª—èª˜èª™èªšèª›èªœèªèªžèªŸèª èª¡èª¢èª£èª¤èª¥èª¦èª§èª¨èª©èªªèª«èª¬èª­èª®èª¯èª°èª±èª²èª³èª´èªµèª¶èª·èª¸èª¹èªºèª»èª¼èª½èª¾èª¿è«€è«è«‚ï¿½è«ƒè«„è«…è«†è«‡è«ˆè«‰è«Šè«‹è«Œè«è«Žè«è«è«‘è«’è«“è«”è«•è«–è«—è«˜è«™è«šè«›è«œè«è«žè«Ÿè« è«¡è«¢è«£é“¡é—¸çœ¨æ …æ¦¨å’‹ä¹ç‚¸è¯ˆæ‘˜æ–‹å®…çª„å€ºå¯¨çž»æ¯¡è©¹ç²˜æ²¾ç›æ–©è¾—å´­å±•è˜¸æ ˆå æˆ˜ç«™æ¹›ç»½æ¨Ÿç« å½°æ¼³å¼ æŽŒæ¶¨æ–ä¸ˆå¸è´¦ä»—èƒ€ç˜´éšœæ‹›æ˜­æ‰¾æ²¼èµµç…§ç½©å…†è‚‡å¬é®æŠ˜å“²è›°è¾™è€…é”—è”—è¿™æµ™çæ–ŸçœŸç”„ç §è‡»è´žé’ˆä¾¦æž•ç–¹è¯Šéœ‡æŒ¯é•‡é˜µè’¸æŒ£çå¾ç‹°äº‰æ€”æ•´æ‹¯æ­£æ”¿ï¿½"
		.split("");
	for (n = 0; n != t[213].length; ++n)
		if (t[213][n].charCodeAt(0) !== 65533) {
			r[t[213][n]] = 54528 + n;
			e[54528 + n] = t[213][n]
		}
	t[214] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è«¤è«¥è«¦è«§è«¨è«©è«ªè««è«¬è«­è«®è«¯è«°è«±è«²è«³è«´è«µè«¶è«·è«¸è«¹è«ºè«»è«¼è«½è«¾è«¿è¬€è¬è¬‚è¬ƒè¬„è¬…è¬†è¬ˆè¬‰è¬Šè¬‹è¬Œè¬è¬Žè¬è¬è¬‘è¬’è¬“è¬”è¬•è¬–è¬—è¬˜è¬™è¬šè¬›è¬œè¬è¬žè¬Ÿè¬ è¬¡è¬¢è¬£ï¿½è¬¤è¬¥è¬§è¬¨è¬©è¬ªè¬«è¬¬è¬­è¬®è¬¯è¬°è¬±è¬²è¬³è¬´è¬µè¬¶è¬·è¬¸è¬¹è¬ºè¬»è¬¼è¬½è¬¾è¬¿è­€è­è­‚è­ƒè­„è­…å¸§ç—‡éƒ‘è¯èŠæžæ”¯å±èœ˜çŸ¥è‚¢è„‚æ±ä¹‹ç»‡èŒç›´æ¤æ®–æ‰§å€¼ä¾„å€æŒ‡æ­¢è¶¾åªæ—¨çº¸å¿—æŒšæŽ·è‡³è‡´ç½®å¸œå³™åˆ¶æ™ºç§©ç¨šè´¨ç‚™ç—”æ»žæ²»çª’ä¸­ç›…å¿ é’Ÿè¡·ç»ˆç§è‚¿é‡ä»²ä¼—èˆŸå‘¨å·žæ´²è¯Œç²¥è½´è‚˜å¸šå’’çš±å®™æ˜¼éª¤ç æ ªè››æœ±çŒªè¯¸è¯›é€ç«¹çƒ›ç…®æ‹„çž©å˜±ä¸»è‘—æŸ±åŠ©è›€è´®é“¸ç­‘ï¿½"
		.split("");
	for (n = 0; n != t[214].length; ++n)
		if (t[214][n].charCodeAt(0) !== 65533) {
			r[t[214][n]] = 54784 + n;
			e[54784 + n] = t[214][n]
		}
	t[215] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è­†è­‡è­ˆè­‰è­Šè­‹è­Œè­è­Žè­è­è­‘è­’è­“è­”è­•è­–è­—è­˜è­™è­šè­›è­œè­è­žè­Ÿè­ è­¡è­¢è­£è­¤è­¥è­§è­¨è­©è­ªè­«è­­è­®è­¯è­°è­±è­²è­³è­´è­µè­¶è­·è­¸è­¹è­ºè­»è­¼è­½è­¾è­¿è®€è®è®‚è®ƒè®„è®…è®†ï¿½è®‡è®ˆè®‰è®Šè®‹è®Œè®è®Žè®è®è®‘è®’è®“è®”è®•è®–è®—è®˜è®™è®šè®›è®œè®è®žè®Ÿè®¬è®±è®»è¯‡è¯è¯ªè°‰è°žä½æ³¨ç¥é©»æŠ“çˆªæ‹½ä¸“ç –è½¬æ’°èµšç¯†æ¡©åº„è£…å¦†æ’žå£®çŠ¶æ¤Žé”¥è¿½èµ˜å ç¼€è°†å‡†æ‰æ‹™å“æ¡Œç¢èŒé…Œå•„ç€ç¼æµŠå…¹å’¨èµ„å§¿æ»‹æ·„å­œç´«ä»”ç±½æ»“å­è‡ªæ¸å­—é¬ƒæ£•è¸ªå®—ç»¼æ€»çºµé‚¹èµ°å¥æç§Ÿè¶³å’æ—ç¥–è¯…é˜»ç»„é’»çº‚å˜´é†‰æœ€ç½ªå°Šéµæ˜¨å·¦ä½æŸžåšä½œååº§ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[215].length; ++n)
		if (t[215][n].charCodeAt(0) !== 65533) {
			r[t[215][n]] = 55040 + n;
			e[55040 + n] = t[215][n]
		}
	t[216] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è°¸è°¹è°ºè°»è°¼è°½è°¾è°¿è±€è±‚è±ƒè±„è±…è±ˆè±Šè±‹è±è±Žè±è±è±‘è±’è±“è±”è±–è±—è±˜è±™è±›è±œè±è±žè±Ÿè± è±£è±¤è±¥è±¦è±§è±¨è±©è±¬è±­è±®è±¯è±°è±±è±²è±´è±µè±¶è±·è±»è±¼è±½è±¾è±¿è²€è²è²ƒè²„è²†è²‡ï¿½è²ˆè²‹è²è²Žè²è²è²‘è²’è²“è²•è²–è²—è²™è²šè²›è²œè²è²žè²Ÿè² è²¡è²¢è²£è²¤è²¥è²¦è²§è²¨è²©è²ªè²«è²¬è²­äºä¸Œå…€ä¸å»¿å…ä¸•äº˜ä¸žé¬²å­¬å™©ä¸¨ç¦ºä¸¿åŒ•ä¹‡å¤­çˆ»å®æ°å›Ÿèƒ¤é¦—æ¯“ç¾é¼—ä¸¶äºŸé¼ä¹œä¹©äº“èŠˆå­›å•¬å˜ä»„åŽåŽåŽ£åŽ¥åŽ®é¥èµåŒšåµåŒ¦åŒ®åŒ¾èµœå¦å£åˆ‚åˆˆåˆŽåˆ­åˆ³åˆ¿å‰€å‰Œå‰žå‰¡å‰œè’¯å‰½åŠ‚åŠåŠåŠ“å†‚ç½”äº»ä»ƒä»‰ä»‚ä»¨ä»¡ä»«ä»žä¼›ä»³ä¼¢ä½¤ä»µä¼¥ä¼§ä¼‰ä¼«ä½žä½§æ”¸ä½šä½ï¿½"
		.split("");
	for (n = 0; n != t[216].length; ++n)
		if (t[216][n].charCodeAt(0) !== 65533) {
			r[t[216][n]] = 55296 + n;
			e[55296 + n] = t[216][n]
		}
	t[217] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è²®è²¯è²°è²±è²²è²³è²´è²µè²¶è²·è²¸è²¹è²ºè²»è²¼è²½è²¾è²¿è³€è³è³‚è³ƒè³„è³…è³†è³‡è³ˆè³‰è³Šè³‹è³Œè³è³Žè³è³è³‘è³’è³“è³”è³•è³–è³—è³˜è³™è³šè³›è³œè³è³žè³Ÿè³ è³¡è³¢è³£è³¤è³¥è³¦è³§è³¨è³©è³ªè³«è³¬ï¿½è³­è³®è³¯è³°è³±è³²è³³è³´è³µè³¶è³·è³¸è³¹è³ºè³»è³¼è³½è³¾è³¿è´€è´è´‚è´ƒè´„è´…è´†è´‡è´ˆè´‰è´Šè´‹è´Œè´ä½Ÿä½—ä¼²ä¼½ä½¶ä½´ä¾‘ä¾‰ä¾ƒä¾ä½¾ä½»ä¾ªä½¼ä¾¬ä¾”ä¿¦ä¿¨ä¿ªä¿…ä¿šä¿£ä¿œä¿‘ä¿Ÿä¿¸å€©åŒä¿³å€¬å€å€®å€­ä¿¾å€œå€Œå€¥å€¨å¾åƒå•åˆåŽå¬å»å‚¥å‚§å‚©å‚ºåƒ–å„†åƒ­åƒ¬åƒ¦åƒ®å„‡å„‹ä»æ°½ä½˜ä½¥ä¿Žé¾ æ±†ç±´å…®å·½é»‰é¦˜å†å¤”å‹¹åŒè¨‡åŒå‡«å¤™å…•äº å…–äº³è¡®è¢¤äºµè„”è£’ç¦€å¬´è ƒç¾¸å†«å†±å†½å†¼ï¿½"
		.split("");
	for (n = 0; n != t[217].length; ++n)
		if (t[217][n].charCodeAt(0) !== 65533) {
			r[t[217][n]] = 55552 + n;
			e[55552 + n] = t[217][n]
		}
	t[218] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è´Žè´è´è´‘è´’è´“è´”è´•è´–è´—è´˜è´™è´šè´›è´œè´ èµ‘èµ’èµ—èµŸèµ¥èµ¨èµ©èµªèµ¬èµ®èµ¯èµ±èµ²èµ¸èµ¹èµºèµ»èµ¼èµ½èµ¾èµ¿è¶€è¶‚è¶ƒè¶†è¶‡è¶ˆè¶‰è¶Œè¶è¶Žè¶è¶è¶’è¶“è¶•è¶–è¶—è¶˜è¶™è¶šè¶›è¶œè¶è¶žè¶ è¶¡ï¿½è¶¢è¶¤è¶¥è¶¦è¶§è¶¨è¶©è¶ªè¶«è¶¬è¶­è¶®è¶¯è¶°è¶²è¶¶è¶·è¶¹è¶»è¶½è·€è·è·‚è·…è·‡è·ˆè·‰è·Šè·è·è·’è·“è·”å‡‡å†–å†¢å†¥è® è®¦è®§è®ªè®´è®µè®·è¯‚è¯ƒè¯‹è¯è¯Žè¯’è¯“è¯”è¯–è¯˜è¯™è¯œè¯Ÿè¯ è¯¤è¯¨è¯©è¯®è¯°è¯³è¯¶è¯¹è¯¼è¯¿è°€è°‚è°„è°‡è°Œè°è°‘è°’è°”è°•è°–è°™è°›è°˜è°è°Ÿè° è°¡è°¥è°§è°ªè°«è°®è°¯è°²è°³è°µè°¶å©åºé˜é˜¢é˜¡é˜±é˜ªé˜½é˜¼é™‚é™‰é™”ï¿½ï¿½ï¿½é™§é™¬é™²é™´éšˆéšéš—éš°é‚—é‚›é‚é‚™é‚¬é‚¡é‚´é‚³é‚¶é‚ºï¿½"
		.split("");
	for (n = 0; n != t[218].length; ++n)
		if (t[218][n].charCodeAt(0) !== 65533) {
			r[t[218][n]] = 55808 + n;
			e[55808 + n] = t[218][n]
		}
	t[219] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è·•è·˜è·™è·œè· è·¡è·¢è·¥è·¦è·§è·©è·­è·®è·°è·±è·²è·´è·¶è·¼è·¾è·¿è¸€è¸è¸‚è¸ƒè¸„è¸†è¸‡è¸ˆè¸‹è¸è¸Žè¸è¸‘è¸’è¸“è¸•è¸–è¸—è¸˜è¸™è¸šè¸›è¸œè¸ è¸¡è¸¤è¸¥è¸¦è¸§è¸¨è¸«è¸­è¸°è¸²è¸³è¸´è¸¶è¸·è¸¸è¸»è¸¼è¸¾ï¿½è¸¿è¹ƒè¹…è¹†è¹Œè¹è¹Žè¹è¹è¹“è¹”è¹•ï¿½ï¿½è¹—è¹˜è¹šè¹›è¹œè¹è¹žè¹Ÿè¹ è¹¡è¹¢è¹£è¹¤è¹¥è¹§è¹¨è¹ªè¹«è¹®è¹±é‚¸é‚°éƒéƒ…é‚¾éƒéƒ„éƒ‡éƒ“éƒ¦éƒ¢éƒœéƒ—éƒ›éƒ«éƒ¯éƒ¾é„„é„¢é„žé„£é„±é„¯é„¹é…ƒé…†åˆå¥‚åŠ¢åŠ¬åŠ­åŠ¾å“¿å‹å‹–å‹°åŸç‡®çŸå»´å‡µå‡¼é¬¯åŽ¶å¼ç•šå·¯åŒåž©åž¡å¡¾å¢¼å£…å£‘åœ©åœ¬åœªåœ³åœ¹åœ®åœ¯åœåœ»å‚å©åž…å«åž†å¼å»å¨å­å¶å³åž­åž¤åžŒåž²åŸåž§åž´åž“åž åŸ•åŸ˜åŸšåŸ™åŸ’åž¸åŸ´åŸ¯åŸ¸åŸ¤åŸï¿½"
		.split("");
	for (n = 0; n != t[219].length; ++n)
		if (t[219][n].charCodeAt(0) !== 65533) {
			r[t[219][n]] = 56064 + n;
			e[56064 + n] = t[219][n]
		}
	t[220] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¹³è¹µè¹·è¹¸è¹¹è¹ºè¹»è¹½è¹¾èº€èº‚èºƒèº„èº†èºˆèº‰èºŠèº‹èºŒèºèºŽèº‘èº’èº“èº•èº–èº—èº˜èº™èºšèº›èºèºŸèº èº¡èº¢èº£èº¤èº¥èº¦èº§èº¨èº©èºªèº­èº®èº°èº±èº³èº´èºµèº¶èº·èº¸èº¹èº»èº¼èº½èº¾èº¿è»€è»è»‚ï¿½è»ƒè»„è»…è»†è»‡è»ˆè»‰è»Šè»‹è»Œè»è»è»è»‘è»’è»“è»”è»•è»–è»—è»˜è»™è»šè»›è»œè»è»žè»Ÿè» è»¡è»¢è»£è»¤å ‹å åŸ½åŸ­å €å žå ™å¡„å  å¡¥å¡¬å¢å¢‰å¢šå¢€é¦¨é¼™æ‡¿è‰¹è‰½è‰¿èŠèŠŠèŠ¨èŠ„èŠŽèŠ‘èŠ—èŠ™èŠ«èŠ¸èŠ¾èŠ°è‹ˆè‹Šè‹£èŠ˜èŠ·èŠ®è‹‹è‹Œè‹èŠ©èŠ´èŠ¡èŠªèŠŸè‹„è‹ŽèŠ¤è‹¡èŒ‰è‹·è‹¤èŒèŒ‡è‹œè‹´è‹’è‹˜èŒŒè‹»è‹“èŒ‘èŒšèŒ†èŒ”èŒ•è‹ è‹•èŒœè‘è›èœèŒˆèŽ’èŒ¼èŒ´èŒ±èŽ›èžèŒ¯èè‡èƒèŸè€èŒ—è èŒ­èŒºèŒ³è¦è¥ï¿½"
		.split("");
	for (n = 0; n != t[220].length; ++n)
		if (t[220][n].charCodeAt(0) !== 65533) {
			r[t[220][n]] = 56320 + n;
			e[56320 + n] = t[220][n]
		}
	t[221] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è»¥è»¦è»§è»¨è»©è»ªè»«è»¬è»­è»®è»¯è»°è»±è»²è»³è»´è»µè»¶è»·è»¸è»¹è»ºè»»è»¼è»½è»¾è»¿è¼€è¼è¼‚è¼ƒè¼„è¼…è¼†è¼‡è¼ˆè¼‰è¼Šè¼‹è¼Œè¼è¼Žè¼è¼è¼‘è¼’è¼“è¼”è¼•è¼–è¼—è¼˜è¼™è¼šè¼›è¼œè¼è¼žè¼Ÿè¼ è¼¡è¼¢è¼£ï¿½è¼¤è¼¥è¼¦è¼§è¼¨è¼©è¼ªè¼«è¼¬è¼­è¼®è¼¯è¼°è¼±è¼²è¼³è¼´è¼µè¼¶è¼·è¼¸è¼¹è¼ºè¼»è¼¼è¼½è¼¾è¼¿è½€è½è½‚è½ƒè½„è¨èŒ›è©è¬èªè­è®èŽ°è¸èŽ³èŽ´èŽ èŽªèŽ“èŽœèŽ…è¼èŽ¶èŽ©è½èŽ¸è»èŽ˜èŽžèŽ¨èŽºèŽ¼èèè¥è˜å ‡è˜è‹èè½è–èœè¸è‘è†è”èŸèèƒè¸è¹èªè…è€è¦è°è¡è‘œè‘‘è‘šè‘™è‘³è’‡è’ˆè‘ºè’‰è‘¸è¼è‘†è‘©è‘¶è’Œè’Žè±è‘­è“è“è“è“¦è’½è““è“Šè’¿è’ºè“ è’¡è’¹è’´è’—è“¥è“£è”Œç”è”¸è“°è”¹è”Ÿè”ºï¿½"
		.split("");
	for (n = 0; n != t[221].length; ++n)
		if (t[221][n].charCodeAt(0) !== 65533) {
			r[t[221][n]] = 56576 + n;
			e[56576 + n] = t[221][n]
		}
	t[222] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è½…è½†è½‡è½ˆè½‰è½Šè½‹è½Œè½è½Žè½è½è½‘è½’è½“è½”è½•è½–è½—è½˜è½™è½šè½›è½œè½è½žè½Ÿè½ è½¡è½¢è½£è½¤è½¥è½ªè¾€è¾Œè¾’è¾è¾ è¾¡è¾¢è¾¤è¾¥è¾¦è¾§è¾ªè¾¬è¾­è¾®è¾¯è¾²è¾³è¾´è¾µè¾·è¾¸è¾ºè¾»è¾¼è¾¿è¿€è¿ƒè¿†ï¿½è¿‰è¿Šè¿‹è¿Œè¿è¿è¿’è¿–è¿—è¿šè¿ è¿¡è¿£è¿§è¿¬è¿¯è¿±è¿²è¿´è¿µè¿¶è¿ºè¿»è¿¼è¿¾è¿¿é€‡é€ˆé€Œé€Žé€“é€•é€˜è•–è”»è“¿è“¼è•™è•ˆè•¨è•¤è•žè•ºçž¢è•ƒè•²è•»è–¤è–¨è–‡è–è•¹è–®è–œè–…è–¹è–·è–°è—“è—è—œè—¿è˜§è˜…è˜©è˜–è˜¼å»¾å¼ˆå¤¼å¥è€·å¥•å¥šå¥˜åŒå°¢å°¥å°¬å°´æ‰Œæ‰ªæŠŸæŠ»æ‹Šæ‹šæ‹—æ‹®æŒ¢æ‹¶æŒ¹æ‹æƒæŽ­æ¶æ±æºæŽŽæŽ´æ­æŽ¬æŽŠæ©æŽ®æŽ¼æ²æ¸æ æ¿æ„æžæŽæ‘’æ†æŽ¾æ‘…æ‘æ‹æ›æ æŒæ¦æ¡æ‘žæ’„æ‘­æ’–ï¿½"
		.split("");
	for (n = 0; n != t[222].length; ++n)
		if (t[222][n].charCodeAt(0) !== 65533) {
			r[t[222][n]] = 56832 + n;
			e[56832 + n] = t[222][n]
		}
	t[223] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é€™é€œé€£é€¤é€¥é€§é€¨é€©é€ªé€«é€¬é€°é€±é€²é€³é€´é€·é€¹é€ºé€½é€¿é€éƒé…é†éˆé‰éŠé‹éŒéŽé”é•é–é™éšéœééžéŸé é¡é¤é¦é§é©éªé«é¬é¯é°é±é²é³é¶é·é¸é¹éºé»é¼é¾é‚ï¿½é‚„é‚…é‚†é‚‡é‚‰é‚Šé‚Œé‚é‚Žé‚é‚é‚’é‚”é‚–é‚˜é‚šé‚œé‚žé‚Ÿé‚ é‚¤é‚¥é‚§é‚¨é‚©é‚«é‚­é‚²é‚·é‚¼é‚½é‚¿éƒ€æ‘ºæ’·æ’¸æ’™æ’ºæ“€æ“æ“—æ“¤æ“¢æ”‰æ”¥æ”®å¼‹å¿’ç”™å¼‘åŸå±å½å©å¨å»å’å–å†å‘‹å‘’å‘“å‘”å‘–å‘ƒå¡å‘—å‘™å£å²å’‚å’”å‘·å‘±å‘¤å’šå’›å’„å‘¶å‘¦å’å“å’­å“‚å’´å“’å’§å’¦å““å“”å‘²å’£å“•å’»å’¿å“Œå“™å“šå“œå’©å’ªå’¤å“å“å“žå”›å“§å” å“½å””å“³å”¢å”£å”å”‘å”§å”ªå•§å–å–µå•‰å•­å•å••å”¿å•å”¼ï¿½"
		.split("");
	for (n = 0; n != t[223].length; ++n)
		if (t[223][n].charCodeAt(0) !== 65533) {
			r[t[223][n]] = 57088 + n;
			e[57088 + n] = t[223][n]
		}
	t[224] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éƒ‚éƒƒéƒ†éƒˆéƒ‰éƒ‹éƒŒéƒéƒ’éƒ”éƒ•éƒ–éƒ˜éƒ™éƒšéƒžéƒŸéƒ éƒ£éƒ¤éƒ¥éƒ©éƒªéƒ¬éƒ®éƒ°éƒ±éƒ²éƒ³éƒµéƒ¶éƒ·éƒ¹éƒºéƒ»éƒ¼éƒ¿é„€é„é„ƒé„…é„†é„‡é„ˆé„‰é„Šé„‹é„Œé„é„Žé„é„é„‘é„’é„“é„”é„•é„–é„—é„˜é„šé„›é„œï¿½é„é„Ÿé„ é„¡é„¤é„¥é„¦é„§é„¨é„©é„ªé„«é„¬é„­é„®é„°é„²é„³é„´é„µé„¶é„·é„¸é„ºé„»é„¼é„½é„¾é„¿é…€é…é…‚é…„å”·å•–å•µå•¶å•·å”³å”°å•œå–‹å—’å–ƒå–±å–¹å–ˆå–å–Ÿå•¾å—–å–‘å•»å—Ÿå–½å–¾å–”å–™å—ªå—·å—‰å˜Ÿå—‘å—«å—¬å—”å—¦å—å—„å—¯å—¥å—²å—³å—Œå—å—¨å—µå—¤è¾”å˜žå˜ˆå˜Œå˜å˜¤å˜£å—¾å˜€å˜§å˜­å™˜å˜¹å™—å˜¬å™å™¢å™™å™œå™Œå™”åš†å™¤å™±å™«å™»å™¼åš…åš“åš¯å›”å›—å›å›¡å›µå›«å›¹å›¿åœ„åœŠåœ‰åœœå¸å¸™å¸”å¸‘å¸±å¸»å¸¼ï¿½"
		.split("");
	for (n = 0; n != t[224].length; ++n)
		if (t[224][n].charCodeAt(0) !== 65533) {
			r[t[224][n]] = 57344 + n;
			e[57344 + n] = t[224][n]
		}
	t[225] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é……é…‡é…ˆé…‘é…“é…”é…•é…–é…˜é…™é…›é…œé…Ÿé… é…¦é…§é…¨é…«é…­é…³é…ºé…»é…¼é†€é†é†‚é†ƒé†„é††é†ˆé†Šé†Žé†é†“é†”é†•é†–é†—é†˜é†™é†œé†é†žé†Ÿé† é†¡é†¤é†¥é†¦é†§é†¨é†©é†«é†¬é†°é†±é†²é†³é†¶é†·é†¸é†¹é†»ï¿½é†¼é†½é†¾é†¿é‡€é‡é‡‚é‡ƒé‡„é‡…é‡†é‡ˆé‡‹é‡é‡’é‡“é‡”é‡•é‡–é‡—é‡˜é‡™é‡šé‡›é‡é‡žé‡Ÿé‡ é‡¡é‡¢é‡£é‡¤é‡¥å¸·å¹„å¹”å¹›å¹žå¹¡å²Œå±ºå²å²å²–å²ˆå²˜å²™å²‘å²šå²œå²µå²¢å²½å²¬å²«å²±å²£å³å²·å³„å³’å³¤å³‹å³¥å´‚å´ƒå´§å´¦å´®å´¤å´žå´†å´›åµ˜å´¾å´´å´½åµ¬åµ›åµ¯åµåµ«åµ‹åµŠåµ©åµ´å¶‚å¶™å¶è±³å¶·å·…å½³å½·å¾‚å¾‡å¾‰å¾Œå¾•å¾™å¾œå¾¨å¾­å¾µå¾¼è¡¢å½¡çŠ­çŠ°çŠ´çŠ·çŠ¸ç‹ƒç‹ç‹Žç‹ç‹’ç‹¨ç‹¯ç‹©ç‹²ç‹´ç‹·çŒç‹³çŒƒç‹ºï¿½"
		.split("");
	for (n = 0; n != t[225].length; ++n)
		if (t[225][n].charCodeAt(0) !== 65533) {
			r[t[225][n]] = 57600 + n;
			e[57600 + n] = t[225][n]
		}
	t[226] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é‡¦é‡§é‡¨é‡©é‡ªé‡«é‡¬é‡­é‡®é‡¯é‡°é‡±é‡²é‡³é‡´é‡µé‡¶é‡·é‡¸é‡¹é‡ºé‡»é‡¼é‡½é‡¾é‡¿éˆ€éˆéˆ‚éˆƒéˆ„éˆ…éˆ†éˆ‡éˆˆéˆ‰éˆŠéˆ‹éˆŒéˆéˆŽéˆéˆéˆ‘éˆ’éˆ“éˆ”éˆ•éˆ–éˆ—éˆ˜éˆ™éˆšéˆ›éˆœéˆéˆžéˆŸéˆ éˆ¡éˆ¢éˆ£éˆ¤ï¿½éˆ¥éˆ¦éˆ§éˆ¨éˆ©éˆªéˆ«éˆ¬éˆ­éˆ®éˆ¯éˆ°éˆ±éˆ²éˆ³éˆ´éˆµéˆ¶éˆ·éˆ¸éˆ¹éˆºéˆ»éˆ¼éˆ½éˆ¾éˆ¿é‰€é‰é‰‚é‰ƒé‰„é‰…ç‹»çŒ—çŒ“çŒ¡çŒŠçŒžçŒçŒ•çŒ¢çŒ¹çŒ¥çŒ¬çŒ¸çŒ±ççç—ç ç¬ç¯ç¾èˆ›å¤¥é£§å¤¤å¤‚é¥£é¥§é¥¨é¥©é¥ªé¥«é¥¬é¥´é¥·é¥½é¦€é¦„é¦‡é¦Šé¦é¦é¦‘é¦“é¦”é¦•åº€åº‘åº‹åº–åº¥åº åº¹åºµåº¾åº³èµ“å»’å»‘å»›å»¨å»ªè†ºå¿„å¿‰å¿–å¿æ€ƒå¿®æ€„å¿¡å¿¤å¿¾æ€…æ€†å¿ªå¿­å¿¸æ€™æ€µæ€¦æ€›æ€æ€æ€©æ€«æ€Šæ€¿æ€¡æ¸æ¹æ»æºæ‚ï¿½"
		.split("");
	for (n = 0; n != t[226].length; ++n)
		if (t[226][n].charCodeAt(0) !== 65533) {
			r[t[226][n]] = 57856 + n;
			e[57856 + n] = t[226][n]
		}
	t[227] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é‰†é‰‡é‰ˆé‰‰é‰Šé‰‹é‰Œé‰é‰Žé‰é‰é‰‘é‰’é‰“é‰”é‰•é‰–é‰—é‰˜é‰™é‰šé‰›é‰œé‰é‰žé‰Ÿé‰ é‰¡é‰¢é‰£é‰¤é‰¥é‰¦é‰§é‰¨é‰©é‰ªé‰«é‰¬é‰­é‰®é‰¯é‰°é‰±é‰²é‰³é‰µé‰¶é‰·é‰¸é‰¹é‰ºé‰»é‰¼é‰½é‰¾é‰¿éŠ€éŠéŠ‚éŠƒéŠ„éŠ…ï¿½éŠ†éŠ‡éŠˆéŠ‰éŠŠéŠ‹éŠŒéŠéŠéŠéŠ‘éŠ’éŠ“éŠ”éŠ•éŠ–éŠ—éŠ˜éŠ™éŠšéŠ›éŠœéŠéŠžéŠŸéŠ éŠ¡éŠ¢éŠ£éŠ¤éŠ¥éŠ¦éŠ§æªæ½æ‚–æ‚šæ‚­æ‚æ‚ƒæ‚’æ‚Œæ‚›æƒ¬æ‚»æ‚±æƒæƒ˜æƒ†æƒšæ‚´æ„ æ„¦æ„•æ„£æƒ´æ„€æ„Žæ„«æ…Šæ…µæ†¬æ†”æ†§æ†·æ‡”æ‡µå¿éš³é—©é—«é—±é—³é—µé—¶é—¼é—¾é˜ƒé˜„é˜†é˜ˆé˜Šé˜‹é˜Œé˜é˜é˜’é˜•é˜–é˜—é˜™é˜šä¸¬çˆ¿æˆ•æ°µæ±”æ±œæ±Šæ²£æ²…æ²æ²”æ²Œæ±¨æ±©æ±´æ±¶æ²†æ²©æ³æ³”æ²­æ³·æ³¸æ³±æ³—æ²²æ³ æ³–æ³ºæ³«æ³®æ²±æ³“æ³¯æ³¾ï¿½"
		.split("");
	for (n = 0; n != t[227].length; ++n)
		if (t[227][n].charCodeAt(0) !== 65533) {
			r[t[227][n]] = 58112 + n;
			e[58112 + n] = t[227][n]
		}
	t[228] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŠ¨éŠ©éŠªéŠ«éŠ¬éŠ­éŠ¯éŠ°éŠ±éŠ²éŠ³éŠ´éŠµéŠ¶éŠ·éŠ¸éŠ¹éŠºéŠ»éŠ¼éŠ½éŠ¾éŠ¿é‹€é‹é‹‚é‹ƒé‹„é‹…é‹†é‹‡é‹‰é‹Šé‹‹é‹Œé‹é‹Žé‹é‹é‹‘é‹’é‹“é‹”é‹•é‹–é‹—é‹˜é‹™é‹šé‹›é‹œé‹é‹žé‹Ÿé‹ é‹¡é‹¢é‹£é‹¤é‹¥é‹¦é‹§é‹¨ï¿½é‹©é‹ªé‹«é‹¬é‹­é‹®é‹¯é‹°é‹±é‹²é‹³é‹´é‹µé‹¶é‹·é‹¸é‹¹é‹ºé‹»é‹¼é‹½é‹¾é‹¿éŒ€éŒéŒ‚éŒƒéŒ„éŒ…éŒ†éŒ‡éŒˆéŒ‰æ´¹æ´§æ´Œæµƒæµˆæ´‡æ´„æ´™æ´Žæ´«æµæ´®æ´µæ´šæµæµ’æµ”æ´³æ¶‘æµ¯æ¶žæ¶ æµžæ¶“æ¶”æµœæµ æµ¼æµ£æ¸šæ·‡æ·…æ·žæ¸Žæ¶¿æ· æ¸‘æ·¦æ·æ·™æ¸–æ¶«æ¸Œæ¶®æ¸«æ¹®æ¹Žæ¹«æº²æ¹Ÿæº†æ¹“æ¹”æ¸²æ¸¥æ¹„æ»Ÿæº±æº˜æ» æ¼­æ»¢æº¥æº§æº½æº»æº·æ»—æº´æ»æºæ»‚æºŸæ½¢æ½†æ½‡æ¼¤æ¼•æ»¹æ¼¯æ¼¶æ½‹æ½´æ¼ªæ¼‰æ¼©æ¾‰æ¾æ¾Œæ½¸æ½²æ½¼æ½ºæ¿‘ï¿½"
		.split("");
	for (n = 0; n != t[228].length; ++n)
		if (t[228][n].charCodeAt(0) !== 65533) {
			r[t[228][n]] = 58368 + n;
			e[58368 + n] = t[228][n]
		}
	t[229] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŒŠéŒ‹éŒŒéŒéŒŽéŒéŒéŒ‘éŒ’éŒ“éŒ”éŒ•éŒ–éŒ—éŒ˜éŒ™éŒšéŒ›éŒœéŒéŒžéŒŸéŒ éŒ¡éŒ¢éŒ£éŒ¤éŒ¥éŒ¦éŒ§éŒ¨éŒ©éŒªéŒ«éŒ¬éŒ­éŒ®éŒ¯éŒ°éŒ±éŒ²éŒ³éŒ´éŒµéŒ¶éŒ·éŒ¸éŒ¹éŒºéŒ»éŒ¼éŒ½éŒ¿é€éé‚éƒé„é…é†é‡éˆé‰ï¿½éŠé‹éŒééŽééé‘é’é“é”é•é–é—é˜é™éšé›éœééžéŸé é¡é¢é£é¤é¥é¦é§é¨é©é«æ¿‰æ¾§æ¾¹æ¾¶æ¿‚æ¿¡æ¿®æ¿žæ¿ æ¿¯ç€šç€£ç€›ç€¹ç€µççžå®€å®„å®•å®“å®¥å®¸ç”¯éªžæ´å¯¤å¯®è¤°å¯°è¹‡è¬‡è¾¶è¿“è¿•è¿¥è¿®è¿¤è¿©è¿¦è¿³è¿¨é€…é€„é€‹é€¦é€‘é€é€–é€¡é€µé€¶é€­é€¯é„é‘é’éé¨é˜é¢é›æš¹é´é½é‚‚é‚ˆé‚ƒé‚‹å½å½—å½–å½˜å°»å’«å±å±™å­±å±£å±¦ç¾¼å¼ªå¼©å¼­è‰´å¼¼é¬»å±®å¦å¦ƒå¦å¦©å¦ªå¦£ï¿½"
		.split("");
	for (n = 0; n != t[229].length; ++n)
		if (t[229][n].charCodeAt(0) !== 65533) {
			r[t[229][n]] = 58624 + n;
			e[58624 + n] = t[229][n]
		}
	t[230] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¬é­é®é¯é°é±é²é³é´éµé¶é·é¸é¹éºé»é¼é½é¾é¿éŽ€éŽéŽ‚éŽƒéŽ„éŽ…éŽ†éŽ‡éŽˆéŽ‰éŽŠéŽ‹éŽŒéŽéŽŽéŽéŽ‘éŽ’éŽ“éŽ”éŽ•éŽ–éŽ—éŽ˜éŽ™éŽšéŽ›éŽœéŽéŽžéŽŸéŽ éŽ¡éŽ¢éŽ£éŽ¤éŽ¥éŽ¦éŽ§éŽ¨éŽ©éŽªéŽ«ï¿½éŽ¬éŽ­éŽ®éŽ¯éŽ°éŽ±éŽ²éŽ³éŽ´éŽµéŽ¶éŽ·éŽ¸éŽ¹éŽºéŽ»éŽ¼éŽ½éŽ¾éŽ¿é€éé‚éƒé„é…é†é‡éˆé‰é‹éŒéå¦—å§Šå¦«å¦žå¦¤å§’å¦²å¦¯å§—å¦¾å¨…å¨†å§å¨ˆå§£å§˜å§¹å¨Œå¨‰å¨²å¨´å¨‘å¨£å¨“å©€å©§å©Šå©•å¨¼å©¢å©µèƒ¬åªªåª›å©·å©ºåª¾å««åª²å«’å«”åª¸å« å«£å«±å«–å«¦å«˜å«œå¬‰å¬—å¬–å¬²å¬·å­€å°•å°œå­šå­¥å­³å­‘å­“å­¢é©µé©·é©¸é©ºé©¿é©½éª€éªéª…éªˆéªŠéªéª’éª“éª–éª˜éª›éªœéªéªŸéª éª¢éª£éª¥éª§çºŸçº¡çº£çº¥çº¨çº©ï¿½"
		.split("");
	for (n = 0; n != t[230].length; ++n)
		if (t[230][n].charCodeAt(0) !== 65533) {
			r[t[230][n]] = 58880 + n;
			e[58880 + n] = t[230][n]
		}
	t[231] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŽééé‘é’é“é”é•é—é˜é™éšé›éœééžéŸé é¡é¢é£é¤é¥é¦é§é¨é©éªé«é¬é­é®é¯é°é±é²é³é´éµé¶é·é¸é¹éºé»é¼é½é¾é¿é€éé‚éƒé„é…é†é‡éˆé‰éŠé‹éŒéï¿½éŽééé‘é’é“é”é•é–é—é˜é™éšé›éœééžéŸé é¡é¢é£é¤é¥é¦é§é¨é©éªé«é¬é­é®çº­çº°çº¾ç»€ç»ç»‚ç»‰ç»‹ç»Œç»ç»”ç»—ç»›ç» ç»¡ç»¨ç»«ç»®ç»¯ç»±ç»²ç¼ç»¶ç»ºç»»ç»¾ç¼ç¼‚ç¼ƒç¼‡ç¼ˆç¼‹ç¼Œç¼ç¼‘ç¼’ç¼—ç¼™ç¼œç¼›ç¼Ÿç¼¡ç¼¢ç¼£ç¼¤ç¼¥ç¼¦ç¼§ç¼ªç¼«ç¼¬ç¼­ç¼¯ç¼°ç¼±ç¼²ç¼³ç¼µå¹ºç•¿å·›ç”¾é‚•çŽŽçŽ‘çŽ®çŽ¢çŽŸçç‚ç‘çŽ·çŽ³ç€ç‰çˆç¥ç™é¡¼çŠç©ç§çžçŽºç²ççªç‘›ç¦ç¥ç¨ç°ç®ç¬ï¿½"
		.split("");
	for (n = 0; n != t[231].length; ++n)
		if (t[231][n].charCodeAt(0) !== 65533) {
			r[t[231][n]] = 59136 + n;
			e[59136 + n] = t[231][n]
		}
	t[232] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¯é°é±é²é³é´éµé¶é·é¸é¹éºé»é¼é½é¿é‘€é‘é‘‚é‘ƒé‘„é‘…é‘†é‘‡é‘ˆé‘‰é‘Šé‘‹é‘Œé‘é‘Žé‘é‘é‘‘é‘’é‘“é‘”é‘•é‘–é‘—é‘˜é‘™é‘šé‘›é‘œé‘é‘žé‘Ÿé‘ é‘¡é‘¢é‘£é‘¤é‘¥é‘¦é‘§é‘¨é‘©é‘ªé‘¬é‘­é‘®é‘¯ï¿½é‘°é‘±é‘²é‘³é‘´é‘µé‘¶é‘·é‘¸é‘¹é‘ºé‘»é‘¼é‘½é‘¾é‘¿é’€é’é’‚é’ƒé’„é’‘é’–é’˜é“‡é“é““é“”é“šé“¦é“»é”œé” ç›çšç‘ç‘œç‘—ç‘•ç‘™ç‘·ç‘­ç‘¾ç’œç’Žç’€ç’ç’‡ç’‹ç’žç’¨ç’©ç’ç’§ç“’ç’ºéŸªéŸ«éŸ¬æŒæ“æžæˆæ©æž¥æž‡æªæ³æž˜æž§æµæž¨æžžæž­æž‹æ·æ¼æŸ°æ ‰æŸ˜æ ŠæŸ©æž°æ ŒæŸ™æžµæŸšæž³æŸæ €æŸƒæž¸æŸ¢æ ŽæŸæŸ½æ ²æ ³æ¡ æ¡¡æ¡Žæ¡¢æ¡„æ¡¤æ¢ƒæ æ¡•æ¡¦æ¡æ¡§æ¡€æ ¾æ¡Šæ¡‰æ ©æ¢µæ¢æ¡´æ¡·æ¢“æ¡«æ£‚æ¥®æ£¼æ¤Ÿæ¤ æ£¹ï¿½"
		.split("");
	for (n = 0; n != t[232].length; ++n)
		if (t[232][n].charCodeAt(0) !== 65533) {
			r[t[232][n]] = 59392 + n;
			e[59392 + n] = t[232][n]
		}
	t[233] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é”§é”³é”½é•ƒé•ˆé•‹é••é•šé• é•®é•´é•µé•·é•¸é•¹é•ºé•»é•¼é•½é•¾é–€é–é–‚é–ƒé–„é–…é–†é–‡é–ˆé–‰é–Šé–‹é–Œé–é–Žé–é–é–‘é–’é–“é–”é–•é––é–—é–˜é–™é–šé–›é–œé–é–žé–Ÿé– é–¡é–¢é–£é–¤é–¥é–¦é–§é–¨é–©é–ªï¿½é–«é–¬é–­é–®é–¯é–°é–±é–²é–³é–´é–µé–¶é–·é–¸é–¹é–ºé–»é–¼é–½é–¾é–¿é—€é—é—‚é—ƒé—„é—…é—†é—‡é—ˆé—‰é—Šé—‹æ¤¤æ£°æ¤‹æ¤æ¥—æ££æ¤æ¥±æ¤¹æ¥ æ¥‚æ¥æ¦„æ¥«æ¦€æ¦˜æ¥¸æ¤´æ§Œæ¦‡æ¦ˆæ§Žæ¦‰æ¥¦æ¥£æ¥¹æ¦›æ¦§æ¦»æ¦«æ¦­æ§”æ¦±æ§æ§Šæ§Ÿæ¦•æ§ æ¦æ§¿æ¨¯æ§­æ¨—æ¨˜æ©¥æ§²æ©„æ¨¾æª æ©æ©›æ¨µæªŽæ©¹æ¨½æ¨¨æ©˜æ©¼æª‘æªæª©æª—æª«çŒ·ç’æ®æ®‚æ®‡æ®„æ®’æ®“æ®æ®šæ®›æ®¡æ®ªè½«è½­è½±è½²è½³è½µè½¶è½¸è½·è½¹è½ºè½¼è½¾è¾è¾‚è¾„è¾‡è¾‹ï¿½"
		.split("");
	for (n = 0; n != t[233].length; ++n)
		if (t[233][n].charCodeAt(0) !== 65533) {
			r[t[233][n]] = 59648 + n;
			e[59648 + n] = t[233][n]
		}
	t[234] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é—Œé—é—Žé—é—é—‘é—’é—“é—”é—•é—–é——é—˜é—™é—šé—›é—œé—é—žé—Ÿé— é—¡é—¢é—£é—¤é—¥é—¦é—§é—¬é—¿é˜‡é˜“é˜˜é˜›é˜žé˜ é˜£é˜¤é˜¥é˜¦é˜§é˜¨é˜©é˜«é˜¬é˜­é˜¯é˜°é˜·é˜¸é˜¹é˜ºé˜¾é™é™ƒé™Šé™Žé™é™‘é™’é™“é™–é™—ï¿½é™˜é™™é™šé™œé™é™žé™ é™£é™¥é™¦é™«é™­é™®é™¯é™°é™±é™³é™¸é™¹é™ºé™»é™¼é™½é™¾é™¿éš€éšéš‚éšƒéš„éš‡éš‰éšŠè¾è¾Žè¾è¾˜è¾šè»Žæˆ‹æˆ—æˆ›æˆŸæˆ¢æˆ¡æˆ¥æˆ¤æˆ¬è‡§ç“¯ç“´ç“¿ç”ç”‘ç”“æ”´æ—®æ—¯æ—°æ˜Šæ˜™æ²æ˜ƒæ˜•æ˜€ç‚…æ›·æ˜æ˜´æ˜±æ˜¶æ˜µè€†æ™Ÿæ™”æ™æ™æ™–æ™¡æ™—æ™·æš„æšŒæš§æšæš¾æ››æ›œæ›¦æ›©è´²è´³è´¶è´»è´½èµ€èµ…èµ†èµˆèµ‰èµ‡èµèµ•èµ™è§‡è§Šè§‹è§Œè§Žè§è§è§‘ç‰®çŠŸç‰ç‰¦ç‰¯ç‰¾ç‰¿çŠ„çŠ‹çŠçŠçŠ’æŒˆæŒ²æŽ°ï¿½"
		.split("");
	for (n = 0; n != t[234].length; ++n)
		if (t[234][n].charCodeAt(0) !== 65533) {
			r[t[234][n]] = 59904 + n;
			e[59904 + n] = t[234][n]
		}
	t[235] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éšŒéšŽéš‘éš’éš“éš•éš–éššéš›éšéšžéšŸéš éš¡éš¢éš£éš¤éš¥éš¦éš¨éš©éšªéš«éš¬éš­éš®éš¯éš±éš²éš´éšµéš·éš¸éšºéš»éš¿é›‚é›ƒé›ˆé›Šé›‹é›é›‘é›“é›”é›–é›—é›˜é›™é›šé››é›œé›é›žé›Ÿé›¡é›¢é›£é›¤é›¥é›¦é›§é›«ï¿½é›¬é›­é›®é›°é›±é›²é›´é›µé›¸é›ºé›»é›¼é›½é›¿éœ‚éœƒéœ…éœŠéœ‹éœŒéœéœ‘éœ’éœ”éœ•éœ—éœ˜éœ™éœšéœ›éœéœŸéœ æ¿æ“˜è€„æ¯ªæ¯³æ¯½æ¯µæ¯¹æ°…æ°‡æ°†æ°æ°•æ°˜æ°™æ°šæ°¡æ°©æ°¤æ°ªæ°²æ”µæ••æ•«ç‰ç‰’ç‰–çˆ°è™¢åˆ–è‚Ÿè‚œè‚“è‚¼æœŠè‚½è‚±è‚«è‚­è‚´è‚·èƒ§èƒ¨èƒ©èƒªèƒ›èƒ‚èƒ„èƒ™èƒèƒ—æœèƒèƒ«èƒ±èƒ´èƒ­è„è„Žèƒ²èƒ¼æœ•è„’è±šè„¶è„žè„¬è„˜è„²è…ˆè…Œè…“è…´è…™è…šè…±è… è…©è…¼è…½è…­è…§å¡åªµè†ˆè†‚è†‘æ»•è†£è†ªè‡Œæœ¦è‡Šè†»ï¿½"
		.split("");
	for (n = 0; n != t[235].length; ++n)
		if (t[235][n].charCodeAt(0) !== 65533) {
			r[t[235][n]] = 60160 + n;
			e[60160 + n] = t[235][n]
		}
	t[236] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éœ¡éœ¢éœ£éœ¤éœ¥éœ¦éœ§éœ¨éœ©éœ«éœ¬éœ®éœ¯éœ±éœ³éœ´éœµéœ¶éœ·éœºéœ»éœ¼éœ½éœ¿é€éé‚éƒé„é…é†é‡éˆé‰éŠé‹éŒééŽééé‘é”é•é—é˜éšéœééŸé£é¤é¦é§é¨éªé«é¬é­é®é¯é°é±ï¿½é²éµé·é¸é¹éºé»é½é¾é¿éž€éžéž‚éžƒéž„éž†éž‡éžˆéž‰éžŠéžŒéžŽéžéžéž“éž•éž–éž—éž™éžšéž›éžœéžè‡è†¦æ¬¤æ¬·æ¬¹æ­ƒæ­†æ­™é£‘é£’é£“é£•é£™é£šæ®³å½€æ¯‚è§³æ–é½‘æ–“æ–¼æ—†æ—„æ—ƒæ—Œæ—Žæ—’æ—–ç‚€ç‚œç‚–ç‚ç‚»çƒ€ç‚·ç‚«ç‚±çƒ¨çƒŠç„ç„“ç„–ç„¯ç„±ç…³ç…œç…¨ç……ç…²ç…Šç…¸ç…ºç†˜ç†³ç†µç†¨ç† ç‡ ç‡”ç‡§ç‡¹çˆçˆ¨ç¬ç„˜ç…¦ç†¹æˆ¾æˆ½æ‰ƒæ‰ˆæ‰‰ç¤»ç¥€ç¥†ç¥‰ç¥›ç¥œç¥“ç¥šç¥¢ç¥—ç¥ ç¥¯ç¥§ç¥ºç¦…ç¦Šç¦šç¦§ç¦³å¿‘å¿ï¿½"
		.split("");
	for (n = 0; n != t[236].length; ++n)
		if (t[236][n].charCodeAt(0) !== 65533) {
			r[t[236][n]] = 60416 + n;
			e[60416 + n] = t[236][n]
		}
	t[237] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éžžéžŸéž¡éž¢éž¤éž¥éž¦éž§éž¨éž©éžªéž¬éž®éž°éž±éž³éžµéž¶éž·éž¸éž¹éžºéž»éž¼éž½éž¾éž¿éŸ€éŸéŸ‚éŸƒéŸ„éŸ…éŸ†éŸ‡éŸˆéŸ‰éŸŠéŸ‹éŸŒéŸéŸŽéŸéŸéŸ‘éŸ’éŸ“éŸ”éŸ•éŸ–éŸ—éŸ˜éŸ™éŸšéŸ›éŸœéŸéŸžéŸŸéŸ éŸ¡éŸ¢éŸ£ï¿½éŸ¤éŸ¥éŸ¨éŸ®éŸ¯éŸ°éŸ±éŸ²éŸ´éŸ·éŸ¸éŸ¹éŸºéŸ»éŸ¼éŸ½éŸ¾éŸ¿é €é é ‚é ƒé „é …é †é ‡é ˆé ‰é Šé ‹é Œé é Žæ€¼ææšæ§ææ™æ£æ‚«æ„†æ„æ…æ†©æ†æ‡‹æ‡‘æˆ†è‚€è¿æ²“æ³¶æ·¼çŸ¶çŸ¸ç €ç ‰ç —ç ˜ç ‘æ–«ç ­ç œç ç ¹ç ºç »ç Ÿç ¼ç ¥ç ¬ç £ç ©ç¡Žç¡­ç¡–ç¡—ç ¦ç¡ç¡‡ç¡Œç¡ªç¢›ç¢“ç¢šç¢‡ç¢œç¢¡ç¢£ç¢²ç¢¹ç¢¥ç£”ç£™ç£‰ç£¬ç£²ç¤…ç£´ç¤“ç¤¤ç¤žç¤´é¾›é»¹é»»é»¼ç›±çœ„çœç›¹çœ‡çœˆçœšçœ¢çœ™çœ­çœ¦çœµçœ¸çç‘ç‡çƒçšç¨ï¿½"
		.split("");
	for (n = 0; n != t[237].length; ++n)
		if (t[237][n].charCodeAt(0) !== 65533) {
			r[t[237][n]] = 60672 + n;
			e[60672 + n] = t[237][n]
		}
	t[238] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é é é ‘é ’é “é ”é •é –é —é ˜é ™é šé ›é œé é žé Ÿé  é ¡é ¢é £é ¤é ¥é ¦é §é ¨é ©é ªé «é ¬é ­é ®é ¯é °é ±é ²é ³é ´é µé ¶é ·é ¸é ¹é ºé »é ¼é ½é ¾é ¿é¡€é¡é¡‚é¡ƒé¡„é¡…é¡†é¡‡é¡ˆé¡‰é¡Šé¡‹é¡Œé¡ï¿½é¡Žé¡é¡é¡‘é¡’é¡“é¡”é¡•é¡–é¡—é¡˜é¡™é¡šé¡›é¡œé¡é¡žé¡Ÿé¡ é¡¡é¡¢é¡£é¡¤é¡¥é¡¦é¡§é¡¨é¡©é¡ªé¡«é¡¬é¡­é¡®ç¢ç¥ç¿çžç½çž€çžŒçž‘çžŸçž çž°çžµçž½ç”ºç•€ç•Žç•‹ç•ˆç•›ç•²ç•¹ç–ƒç½˜ç½¡ç½Ÿè©ˆç½¨ç½´ç½±ç½¹ç¾ç½¾ç›ç›¥è ²é’…é’†é’‡é’‹é’Šé’Œé’é’é’é’”é’—é’•é’šé’›é’œé’£é’¤é’«é’ªé’­é’¬é’¯é’°é’²é’´é’¶é’·é’¸é’¹é’ºé’¼é’½é’¿é“„é“ˆé“‰é“Šé“‹é“Œé“é“Žé“é“‘é“’é“•é“–é“—é“™é“˜é“›é“žé“Ÿé“ é“¢é“¤é“¥é“§é“¨é“ªï¿½"
		.split("");
	for (n = 0; n != t[238].length; ++n)
		if (t[238][n].charCodeAt(0) !== 65533) {
			r[t[238][n]] = 60928 + n;
			e[60928 + n] = t[238][n]
		}
	t[239] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¡¯é¡°é¡±é¡²é¡³é¡´é¢‹é¢Žé¢’é¢•é¢™é¢£é¢¨é¢©é¢ªé¢«é¢¬é¢­é¢®é¢¯é¢°é¢±é¢²é¢³é¢´é¢µé¢¶é¢·é¢¸é¢¹é¢ºé¢»é¢¼é¢½é¢¾é¢¿é£€é£é£‚é£ƒé£„é£…é£†é£‡é£ˆé£‰é£Šé£‹é£Œé£é£é£é£”é£–é£—é£›é£œé£é£ é£¡é£¢é££é£¤ï¿½é£¥é£¦é£©é£ªé£«é£¬é£­é£®é£¯é£°é£±é£²é£³é£´é£µé£¶é£·é£¸é£¹é£ºé£»é£¼é£½é£¾é£¿é¤€é¤é¤‚é¤ƒé¤„é¤…é¤†é¤‡é“©é“«é“®é“¯é“³é“´é“µé“·é“¹é“¼é“½é“¿é”ƒé”‚é”†é”‡é”‰é”Šé”é”Žé”é”’é”“é””é”•é”–é”˜é”›é”é”žé”Ÿé”¢é”ªé”«é”©é”¬é”±é”²é”´é”¶é”·é”¸é”¼é”¾é”¿é•‚é”µé•„é•…é•†é•‰é•Œé•Žé•é•’é•“é•”é•–é•—é•˜é•™é•›é•žé•Ÿé•é•¡é•¢é•¤é•¥é•¦é•§é•¨é•©é•ªé•«é•¬é•¯é•±é•²é•³é”ºçŸ§çŸ¬é›‰ç§•ç§­ç§£ç§«ç¨†åµ‡ç¨ƒç¨‚ç¨žç¨”ï¿½"
		.split("");
	for (n = 0; n != t[239].length; ++n)
		if (t[239][n].charCodeAt(0) !== 65533) {
			r[t[239][n]] = 61184 + n;
			e[61184 + n] = t[239][n]
		}
	t[240] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¤ˆé¤‰é¤Šé¤‹é¤Œé¤Žé¤é¤‘é¤’é¤“é¤”é¤•é¤–é¤—é¤˜é¤™é¤šé¤›é¤œé¤é¤žé¤Ÿé¤ é¤¡é¤¢é¤£é¤¤é¤¥é¤¦é¤§é¤¨é¤©é¤ªé¤«é¤¬é¤­é¤¯é¤°é¤±é¤²é¤³é¤´é¤µé¤¶é¤·é¤¸é¤¹é¤ºé¤»é¤¼é¤½é¤¾é¤¿é¥€é¥é¥‚é¥ƒé¥„é¥…é¥†é¥‡é¥ˆé¥‰ï¿½é¥Šé¥‹é¥Œé¥é¥Žé¥é¥é¥‘é¥’é¥“é¥–é¥—é¥˜é¥™é¥šé¥›é¥œé¥é¥žé¥Ÿé¥ é¥¡é¥¢é¥¤é¥¦é¥³é¥¸é¥¹é¥»é¥¾é¦‚é¦ƒé¦‰ç¨¹ç¨·ç©‘é»é¦¥ç©°çšˆçšŽçš“çš™çš¤ç“žç“ ç”¬é¸ é¸¢é¸¨é¸©é¸ªé¸«é¸¬é¸²é¸±é¸¶é¸¸é¸·é¸¹é¸ºé¸¾é¹é¹‚é¹„é¹†é¹‡é¹ˆé¹‰é¹‹é¹Œé¹Žé¹‘é¹•é¹—é¹šé¹›é¹œé¹žé¹£é¹¦é¹§é¹¨é¹©é¹ªé¹«é¹¬é¹±é¹­é¹³ç–’ç–”ç––ç– ç–ç–¬ç–£ç–³ç–´ç–¸ç—„ç–±ç–°ç—ƒç—‚ç—–ç—ç—£ç—¨ç—¦ç—¤ç—«ç—§ç˜ƒç—±ç—¼ç—¿ç˜ç˜€ç˜…ç˜Œç˜—ç˜Šç˜¥ç˜˜ç˜•ç˜™ï¿½"
		.split("");
	for (n = 0; n != t[240].length; ++n)
		if (t[240][n].charCodeAt(0) !== 65533) {
			r[t[240][n]] = 61440 + n;
			e[61440 + n] = t[240][n]
		}
	t[241] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¦Œé¦Žé¦šé¦›é¦œé¦é¦žé¦Ÿé¦ é¦¡é¦¢é¦£é¦¤é¦¦é¦§é¦©é¦ªé¦«é¦¬é¦­é¦®é¦¯é¦°é¦±é¦²é¦³é¦´é¦µé¦¶é¦·é¦¸é¦¹é¦ºé¦»é¦¼é¦½é¦¾é¦¿é§€é§é§‚é§ƒé§„é§…é§†é§‡é§ˆé§‰é§Šé§‹é§Œé§é§Žé§é§é§‘é§’é§“é§”é§•é§–é§—é§˜ï¿½é§™é§šé§›é§œé§é§žé§Ÿé§ é§¡é§¢é§£é§¤é§¥é§¦é§§é§¨é§©é§ªé§«é§¬é§­é§®é§¯é§°é§±é§²é§³é§´é§µé§¶é§·é§¸é§¹ç˜›ç˜¼ç˜¢ç˜ ç™€ç˜­ç˜°ç˜¿ç˜µç™ƒç˜¾ç˜³ç™ç™žç™”ç™œç™–ç™«ç™¯ç¿Šç«¦ç©¸ç©¹çª€çª†çªˆçª•çª¦çª çª¬çª¨çª­çª³è¡¤è¡©è¡²è¡½è¡¿è¢‚è¢¢è£†è¢·è¢¼è£‰è£¢è£Žè££è£¥è£±è¤šè£¼è£¨è£¾è£°è¤¡è¤™è¤“è¤›è¤Šè¤´è¤«è¤¶è¥è¥¦è¥»ç–‹èƒ¥çš²çš´çŸœè€’è€”è€–è€œè€ è€¢è€¥è€¦è€§è€©è€¨è€±è€‹è€µèƒè†èè’è©è±è¦ƒé¡¸é¢€é¢ƒï¿½"
		.split("");
	for (n = 0; n != t[241].length; ++n)
		if (t[241][n].charCodeAt(0) !== 65533) {
			r[t[241][n]] = 61696 + n;
			e[61696 + n] = t[241][n]
		}
	t[242] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é§ºé§»é§¼é§½é§¾é§¿é¨€é¨é¨‚é¨ƒé¨„é¨…é¨†é¨‡é¨ˆé¨‰é¨Šé¨‹é¨Œé¨é¨Žé¨é¨é¨‘é¨’é¨“é¨”é¨•é¨–é¨—é¨˜é¨™é¨šé¨›é¨œé¨é¨žé¨Ÿé¨ é¨¡é¨¢é¨£é¨¤é¨¥é¨¦é¨§é¨¨é¨©é¨ªé¨«é¨¬é¨­é¨®é¨¯é¨°é¨±é¨²é¨³é¨´é¨µé¨¶é¨·é¨¸ï¿½é¨¹é¨ºé¨»é¨¼é¨½é¨¾é¨¿é©€é©é©‚é©ƒé©„é©…é©†é©‡é©ˆé©‰é©Šé©‹é©Œé©é©Žé©é©é©‘é©’é©“é©”é©•é©–é©—é©˜é©™é¢‰é¢Œé¢é¢é¢”é¢šé¢›é¢žé¢Ÿé¢¡é¢¢é¢¥é¢¦è™è™”è™¬è™®è™¿è™ºè™¼è™»èš¨èšèš‹èš¬èšèš§èš£èšªèš“èš©èš¶è›„èšµè›Žèš°èšºèš±èš¯è›‰è›èš´è›©è›±è›²è›­è›³è›èœ“è›žè›´è›Ÿè›˜è›‘èœƒèœ‡è›¸èœˆèœŠèœèœ‰èœ£èœ»èœžèœ¥èœ®èœšèœ¾èˆèœ´èœ±èœ©èœ·èœ¿èž‚èœ¢è½è¾è»è è°èŒè®èž‹è“è£è¼è¤è™è¥èž“èž¯èž¨èŸ’ï¿½"
		.split("");
	for (n = 0; n != t[242].length; ++n)
		if (t[242][n].charCodeAt(0) !== 65533) {
			r[t[242][n]] = 61952 + n;
			e[61952 + n] = t[242][n]
		}
	t[243] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é©šé©›é©œé©é©žé©Ÿé© é©¡é©¢é©£é©¤é©¥é©¦é©§é©¨é©©é©ªé©«é©²éªƒéª‰éªéªŽéª”éª•éª™éª¦éª©éªªéª«éª¬éª­éª®éª¯éª²éª³éª´éªµéª¹éª»éª½éª¾éª¿é«ƒé«„é«†é«‡é«ˆé«‰é«Šé«é«Žé«é«é«’é«”é«•é«–é«—é«™é«šé«›é«œï¿½é«é«žé« é«¢é«£é«¤é«¥é«§é«¨é«©é«ªé«¬é«®é«°é«±é«²é«³é«´é«µé«¶é«·é«¸é«ºé«¼é«½é«¾é«¿é¬€é¬é¬‚é¬„é¬…é¬†èŸ†èžˆèž…èž­èž—èžƒèž«èŸ¥èž¬èžµèž³èŸ‹èŸ“èž½èŸ‘èŸ€èŸŠèŸ›èŸªèŸ èŸ®è –è “èŸ¾è Šè ›è ¡è ¹è ¼ç¼¶ç½‚ç½„ç½…èˆç«ºç«½ç¬ˆç¬ƒç¬„ç¬•ç¬Šç¬«ç¬ç­‡ç¬¸ç¬ªç¬™ç¬®ç¬±ç¬ ç¬¥ç¬¤ç¬³ç¬¾ç¬žç­˜ç­šç­…ç­µç­Œç­ç­ ç­®ç­»ç­¢ç­²ç­±ç®ç®¦ç®§ç®¸ç®¬ç®ç®¨ç®…ç®ªç®œç®¢ç®«ç®´ç¯‘ç¯ç¯Œç¯ç¯šç¯¥ç¯¦ç¯ªç°Œç¯¾ç¯¼ç°ç°–ç°‹ï¿½"
		.split("");
	for (n = 0; n != t[243].length; ++n)
		if (t[243][n].charCodeAt(0) !== 65533) {
			r[t[243][n]] = 62208 + n;
			e[62208 + n] = t[243][n]
		}
	t[244] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¬‡é¬‰é¬Šé¬‹é¬Œé¬é¬Žé¬é¬‘é¬’é¬”é¬•é¬–é¬—é¬˜é¬™é¬šé¬›é¬œé¬é¬žé¬ é¬¡é¬¢é¬¤é¬¥é¬¦é¬§é¬¨é¬©é¬ªé¬«é¬¬é¬­é¬®é¬°é¬±é¬³é¬´é¬µé¬¶é¬·é¬¸é¬¹é¬ºé¬½é¬¾é¬¿é­€é­†é­Šé­‹é­Œé­Žé­é­’é­“é­•é­–é­—é­˜é­™é­šï¿½é­›é­œé­é­žé­Ÿé­ é­¡é­¢é­£é­¤é­¥é­¦é­§é­¨é­©é­ªé­«é­¬é­­é­®é­¯é­°é­±é­²é­³é­´é­µé­¶é­·é­¸é­¹é­ºé­»ç°Ÿç°ªç°¦ç°¸ç±ç±€è‡¾èˆèˆ‚èˆ„è‡¬è¡„èˆ¡èˆ¢èˆ£èˆ­èˆ¯èˆ¨èˆ«èˆ¸èˆ»èˆ³èˆ´èˆ¾è‰„è‰‰è‰‹è‰è‰šè‰Ÿè‰¨è¡¾è¢…è¢ˆè£˜è£Ÿè¥žç¾ç¾Ÿç¾§ç¾¯ç¾°ç¾²ç±¼æ•‰ç²‘ç²ç²œç²žç²¢ç²²ç²¼ç²½ç³ç³‡ç³Œç³ç³ˆç³…ç³—ç³¨è‰®æš¨ç¾¿ç¿Žç¿•ç¿¥ç¿¡ç¿¦ç¿©ç¿®ç¿³ç³¸çµ·ç¶¦ç¶®ç¹‡çº›éº¸éº´èµ³è¶„è¶”è¶‘è¶±èµ§èµ­è±‡è±‰é…Šé…é…Žé…é…¤ï¿½"
		.split("");
	for (n = 0; n != t[244].length; ++n)
		if (t[244][n].charCodeAt(0) !== 65533) {
			r[t[244][n]] = 62464 + n;
			e[62464 + n] = t[244][n]
		}
	t[245] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é­¼é­½é­¾é­¿é®€é®é®‚é®ƒé®„é®…é®†é®‡é®ˆé®‰é®Šé®‹é®Œé®é®Žé®é®é®‘é®’é®“é®”é®•é®–é®—é®˜é®™é®šé®›é®œé®é®žé®Ÿé® é®¡é®¢é®£é®¤é®¥é®¦é®§é®¨é®©é®ªé®«é®¬é®­é®®é®¯é®°é®±é®²é®³é®´é®µé®¶é®·é®¸é®¹é®ºï¿½é®»é®¼é®½é®¾é®¿é¯€é¯é¯‚é¯ƒé¯„é¯…é¯†é¯‡é¯ˆé¯‰é¯Šé¯‹é¯Œé¯é¯Žé¯é¯é¯‘é¯’é¯“é¯”é¯•é¯–é¯—é¯˜é¯™é¯šé¯›é…¢é…¡é…°é…©é…¯é…½é…¾é…²é…´é…¹é†Œé†…é†é†é†‘é†¢é†£é†ªé†­é†®é†¯é†µé†´é†ºè±•é¹¾è¶¸è·«è¸…è¹™è¹©è¶µè¶¿è¶¼è¶ºè·„è·–è·—è·šè·žè·Žè·è·›è·†è·¬è··è·¸è·£è·¹è·»è·¤è¸‰è·½è¸”è¸è¸Ÿè¸¬è¸®è¸£è¸¯è¸ºè¹€è¸¹è¸µè¸½è¸±è¹‰è¹è¹‚è¹‘è¹’è¹Šè¹°è¹¶è¹¼è¹¯è¹´èº…èºèº”èºèºœèºžè±¸è²‚è²Šè²…è²˜è²”æ–›è§–è§žè§šè§œï¿½"
		.split("");
	for (n = 0; n != t[245].length; ++n)
		if (t[245][n].charCodeAt(0) !== 65533) {
			r[t[245][n]] = 62720 + n;
			e[62720 + n] = t[245][n]
		}
	t[246] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¯œé¯é¯žé¯Ÿé¯ é¯¡é¯¢é¯£é¯¤é¯¥é¯¦é¯§é¯¨é¯©é¯ªé¯«é¯¬é¯­é¯®é¯¯é¯°é¯±é¯²é¯³é¯´é¯µé¯¶é¯·é¯¸é¯¹é¯ºé¯»é¯¼é¯½é¯¾é¯¿é°€é°é°‚é°ƒé°„é°…é°†é°‡é°ˆé°‰é°Šé°‹é°Œé°é°Žé°é°é°‘é°’é°“é°”é°•é°–é°—é°˜é°™é°šï¿½é°›é°œé°é°žé°Ÿé° é°¡é°¢é°£é°¤é°¥é°¦é°§é°¨é°©é°ªé°«é°¬é°­é°®é°¯é°°é°±é°²é°³é°´é°µé°¶é°·é°¸é°¹é°ºé°»è§¥è§«è§¯è¨¾è¬¦é“é›©é›³é›¯éœ†éœéœˆéœéœŽéœªéœ­éœ°éœ¾é¾€é¾ƒé¾…é¾†é¾‡é¾ˆé¾‰é¾Šé¾Œé»¾é¼‹é¼éš¹éš¼éš½é›Žé›’çž¿é› éŠŽéŠ®é‹ˆéŒ¾éªéŠéŽé¾é‘«é±¿é²‚é²…é²†é²‡é²ˆç¨£é²‹é²Žé²é²‘é²’é²”é²•é²šé²›é²žé²Ÿé² é²¡é²¢é²£é²¥é²¦é²§é²¨é²©é²«é²­é²®é²°é²±é²²é²³é²´é²µé²¶é²·é²ºé²»é²¼é²½é³„é³…é³†é³‡é³Šé³‹ï¿½"
		.split("");
	for (n = 0; n != t[246].length; ++n)
		if (t[246][n].charCodeAt(0) !== 65533) {
			r[t[246][n]] = 62976 + n;
			e[62976 + n] = t[246][n]
		}
	t[247] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é°¼é°½é°¾é°¿é±€é±é±‚é±ƒé±„é±…é±†é±‡é±ˆé±‰é±Šé±‹é±Œé±é±Žé±é±é±‘é±’é±“é±”é±•é±–é±—é±˜é±™é±šé±›é±œé±é±žé±Ÿé± é±¡é±¢é±£é±¤é±¥é±¦é±§é±¨é±©é±ªé±«é±¬é±­é±®é±¯é±°é±±é±²é±³é±´é±µé±¶é±·é±¸é±¹é±ºï¿½é±»é±½é±¾é²€é²ƒé²„é²‰é²Šé²Œé²é²“é²–é²—é²˜é²™é²é²ªé²¬é²¯é²¹é²¾é²¿é³€é³é³‚é³ˆé³‰é³‘é³’é³šé³›é³ é³¡é³Œé³é³Žé³é³é³“é³”é³•é³—é³˜é³™é³œé³é³Ÿé³¢é¼éž…éž‘éž’éž”éž¯éž«éž£éž²éž´éª±éª°éª·é¹˜éª¶éªºéª¼é«é«€é«…é«‚é«‹é«Œé«‘é­…é­ƒé­‡é­‰é­ˆé­é­‘é£¨é¤é¤®é¥•é¥”é«Ÿé«¡é«¦é«¯é««é«»é«­é«¹é¬ˆé¬é¬“é¬Ÿé¬£éº½éº¾ç¸»éº‚éº‡éºˆéº‹éº’é–éºéºŸé»›é»œé»é» é»Ÿé»¢é»©é»§é»¥é»ªé»¯é¼¢é¼¬é¼¯é¼¹é¼·é¼½é¼¾é½„ï¿½"
		.split("");
	for (n = 0; n != t[247].length; ++n)
		if (t[247][n].charCodeAt(0) !== 65533) {
			r[t[247][n]] = 63232 + n;
			e[63232 + n] = t[247][n]
		}
	t[248] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é³£é³¤é³¥é³¦é³§é³¨é³©é³ªé³«é³¬é³­é³®é³¯é³°é³±é³²é³³é³´é³µé³¶é³·é³¸é³¹é³ºé³»é³¼é³½é³¾é³¿é´€é´é´‚é´ƒé´„é´…é´†é´‡é´ˆé´‰é´Šé´‹é´Œé´é´Žé´é´é´‘é´’é´“é´”é´•é´–é´—é´˜é´™é´šé´›é´œé´é´žé´Ÿé´ é´¡ï¿½é´¢é´£é´¤é´¥é´¦é´§é´¨é´©é´ªé´«é´¬é´­é´®é´¯é´°é´±é´²é´³é´´é´µé´¶é´·é´¸é´¹é´ºé´»é´¼é´½é´¾é´¿éµ€éµéµ‚ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[248].length; ++n)
		if (t[248][n].charCodeAt(0) !== 65533) {
			r[t[248][n]] = 63488 + n;
			e[63488 + n] = t[248][n]
		}
	t[249] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éµƒéµ„éµ…éµ†éµ‡éµˆéµ‰éµŠéµ‹éµŒéµéµŽéµéµéµ‘éµ’éµ“éµ”éµ•éµ–éµ—éµ˜éµ™éµšéµ›éµœéµéµžéµŸéµ éµ¡éµ¢éµ£éµ¤éµ¥éµ¦éµ§éµ¨éµ©éµªéµ«éµ¬éµ­éµ®éµ¯éµ°éµ±éµ²éµ³éµ´éµµéµ¶éµ·éµ¸éµ¹éµºéµ»éµ¼éµ½éµ¾éµ¿é¶€é¶ï¿½é¶‚é¶ƒé¶„é¶…é¶†é¶‡é¶ˆé¶‰é¶Šé¶‹é¶Œé¶é¶Žé¶é¶é¶‘é¶’é¶“é¶”é¶•é¶–é¶—é¶˜é¶™é¶šé¶›é¶œé¶é¶žé¶Ÿé¶ é¶¡é¶¢ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[249].length; ++n)
		if (t[249][n].charCodeAt(0) !== 65533) {
			r[t[249][n]] = 63744 + n;
			e[63744 + n] = t[249][n]
		}
	t[250] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¶£é¶¤é¶¥é¶¦é¶§é¶¨é¶©é¶ªé¶«é¶¬é¶­é¶®é¶¯é¶°é¶±é¶²é¶³é¶´é¶µé¶¶é¶·é¶¸é¶¹é¶ºé¶»é¶¼é¶½é¶¾é¶¿é·€é·é·‚é·ƒé·„é·…é·†é·‡é·ˆé·‰é·Šé·‹é·Œé·é·Žé·é·é·‘é·’é·“é·”é·•é·–é·—é·˜é·™é·šé·›é·œé·é·žé·Ÿé· é·¡ï¿½é·¢é·£é·¤é·¥é·¦é·§é·¨é·©é·ªé·«é·¬é·­é·®é·¯é·°é·±é·²é·³é·´é·µé·¶é··é·¸é·¹é·ºé·»é·¼é·½é·¾é·¿é¸€é¸é¸‚ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[250].length; ++n)
		if (t[250][n].charCodeAt(0) !== 65533) {
			r[t[250][n]] = 64e3 + n;
			e[64e3 + n] = t[250][n]
		}
	t[251] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¸ƒé¸„é¸…é¸†é¸‡é¸ˆé¸‰é¸Šé¸‹é¸Œé¸é¸Žé¸é¸é¸‘é¸’é¸“é¸”é¸•é¸–é¸—é¸˜é¸™é¸šé¸›é¸œé¸é¸žé¸¤é¸§é¸®é¸°é¸´é¸»é¸¼é¹€é¹é¹é¹’é¹“é¹”é¹–é¹™é¹é¹Ÿé¹ é¹¡é¹¢é¹¥é¹®é¹¯é¹²é¹´é¹µé¹¶é¹·é¹¸é¹¹é¹ºé¹»é¹¼é¹½éº€ï¿½éºéºƒéº„éº…éº†éº‰éºŠéºŒéºéºŽéºéºéº‘éº”éº•éº–éº—éº˜éº™éºšéº›éºœéºžéº éº¡éº¢éº£éº¤éº¥éº§éº¨éº©éºªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[251].length; ++n)
		if (t[251][n].charCodeAt(0) !== 65533) {
			r[t[251][n]] = 64256 + n;
			e[64256 + n] = t[251][n]
		}
	t[252] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éº«éº¬éº­éº®éº¯éº°éº±éº²éº³éºµéº¶éº·éº¹éººéº¼éº¿é»€é»é»‚é»ƒé»…é»†é»‡é»ˆé»Šé»‹é»Œé»é»’é»“é»•é»–é»—é»™é»šé»žé»¡é»£é»¤é»¦é»¨é»«é»¬é»­é»®é»°é»±é»²é»³é»´é»µé»¶é»·é»¸é»ºé»½é»¿é¼€é¼é¼‚é¼ƒé¼„é¼…ï¿½é¼†é¼‡é¼ˆé¼‰é¼Šé¼Œé¼é¼‘é¼’é¼”é¼•é¼–é¼˜é¼šé¼›é¼œé¼é¼žé¼Ÿé¼¡é¼£é¼¤é¼¥é¼¦é¼§é¼¨é¼©é¼ªé¼«é¼­é¼®é¼°é¼±ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[252].length; ++n)
		if (t[252][n].charCodeAt(0) !== 65533) {
			r[t[252][n]] = 64512 + n;
			e[64512 + n] = t[252][n]
		}
	t[253] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¼²é¼³é¼´é¼µé¼¶é¼¸é¼ºé¼¼é¼¿é½€é½é½‚é½ƒé½…é½†é½‡é½ˆé½‰é½Šé½‹é½Œé½é½Žé½é½’é½“é½”é½•é½–é½—é½˜é½™é½šé½›é½œé½é½žé½Ÿé½ é½¡é½¢é½£é½¤é½¥é½¦é½§é½¨é½©é½ªé½«é½¬é½­é½®é½¯é½°é½±é½²é½³é½´é½µé½¶é½·é½¸ï¿½é½¹é½ºé½»é½¼é½½é½¾é¾é¾‚é¾é¾Žé¾é¾é¾‘é¾’é¾“é¾”é¾•é¾–é¾—é¾˜é¾œé¾é¾žé¾¡é¾¢é¾£é¾¤é¾¥ï¤¬ï¥¹ï¦•ï§§ï§±ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[253].length; ++n)
		if (t[253][n].charCodeAt(0) !== 65533) {
			r[t[253][n]] = 64768 + n;
			e[64768 + n] = t[253][n]
		}
	t[254] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¨Œï¨ï¨Žï¨ï¨‘ï¨“ï¨”ï¨˜ï¨Ÿï¨ ï¨¡ï¨£ï¨¤ï¨§ï¨¨ï¨©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[254].length; ++n)
		if (t[254][n].charCodeAt(0) !== 65533) {
			r[t[254][n]] = 65024 + n;
			e[65024 + n] = t[254][n]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[949] = function () {
	var e = [],
		r = {},
		t = [],
		n;
	t[0] =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[0].length; ++n)
		if (t[0][n].charCodeAt(0) !== 65533) {
			r[t[0][n]] = 0 + n;
			e[0 + n] = t[0][n]
		}
	t[129] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê°‚ê°ƒê°…ê°†ê°‹ê°Œê°ê°Žê°ê°˜ê°žê°Ÿê°¡ê°¢ê°£ê°¥ê°¦ê°§ê°¨ê°©ê°ªê°«ê°®ê°²ê°³ê°´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê°µê°¶ê°·ê°ºê°»ê°½ê°¾ê°¿ê±ê±‚ê±ƒê±„ê±…ê±†ê±‡ê±ˆê±‰ê±Šê±Œê±Žê±ê±ê±‘ê±’ê±“ê±•ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê±–ê±—ê±™ê±šê±›ê±ê±žê±Ÿê± ê±¡ê±¢ê±£ê±¤ê±¥ê±¦ê±§ê±¨ê±©ê±ªê±«ê±¬ê±­ê±®ê±¯ê±²ê±³ê±µê±¶ê±¹ê±»ê±¼ê±½ê±¾ê±¿ê²‚ê²‡ê²ˆê²ê²Žê²ê²‘ê²’ê²“ê²•ê²–ê²—ê²˜ê²™ê²šê²›ê²žê²¢ê²£ê²¤ê²¥ê²¦ê²§ê²«ê²­ê²®ê²±ê²²ê²³ê²´ê²µê²¶ê²·ê²ºê²¾ê²¿ê³€ê³‚ê³ƒê³…ê³†ê³‡ê³‰ê³Šê³‹ê³ê³Žê³ê³ê³‘ê³’ê³“ê³”ê³–ê³˜ê³™ê³šê³›ê³œê³ê³žê³Ÿê³¢ê³£ê³¥ê³¦ê³©ê³«ê³­ê³®ê³²ê³´ê³·ê³¸ê³¹ê³ºê³»ê³¾ê³¿ê´ê´‚ê´ƒê´…ê´‡ê´ˆê´‰ê´Šê´‹ê´Žê´ê´’ê´“ï¿½"
		.split("");
	for (n = 0; n != t[129].length; ++n)
		if (t[129][n].charCodeAt(0) !== 65533) {
			r[t[129][n]] = 33024 + n;
			e[33024 + n] = t[129][n]
		}
	t[130] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê´”ê´•ê´–ê´—ê´™ê´šê´›ê´ê´žê´Ÿê´¡ê´¢ê´£ê´¤ê´¥ê´¦ê´§ê´¨ê´ªê´«ê´®ê´¯ê´°ê´±ê´²ê´³ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê´¶ê´·ê´¹ê´ºê´»ê´½ê´¾ê´¿êµ€êµêµ‚êµƒêµ†êµˆêµŠêµ‹êµŒêµêµŽêµêµ‘êµ’êµ“êµ•êµ–êµ—ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½êµ™êµšêµ›êµœêµêµžêµŸêµ êµ¢êµ¤êµ¥êµ¦êµ§êµ¨êµ©êµªêµ«êµ®êµ¯êµ±êµ²êµ·êµ¸êµ¹êµºêµ¾ê¶€ê¶ƒê¶„ê¶…ê¶†ê¶‡ê¶Šê¶‹ê¶ê¶Žê¶ê¶‘ê¶’ê¶“ê¶”ê¶•ê¶–ê¶—ê¶˜ê¶™ê¶šê¶›ê¶žê¶Ÿê¶ ê¶¡ê¶¢ê¶£ê¶¥ê¶¦ê¶§ê¶¨ê¶©ê¶ªê¶«ê¶¬ê¶­ê¶®ê¶¯ê¶°ê¶±ê¶²ê¶³ê¶´ê¶µê¶¶ê¶¸ê¶¹ê¶ºê¶»ê¶¼ê¶½ê¶¾ê¶¿ê·‚ê·ƒê·…ê·†ê·‡ê·‰ê·Šê·‹ê·Œê·ê·Žê·ê·’ê·”ê·•ê·–ê·—ê·˜ê·™ê·šê·›ê·ê·žê·Ÿê·¡ê·¢ê·£ê·¥ê·¦ê·§ê·¨ê·©ê·ªê·«ê·¬ê·­ê·®ê·¯ê·°ê·±ê·²ê·³ê·´ê·µê·¶ê··ï¿½"
		.split("");
	for (n = 0; n != t[130].length; ++n)
		if (t[130][n].charCodeAt(0) !== 65533) {
			r[t[130][n]] = 33280 + n;
			e[33280 + n] = t[130][n]
		}
	t[131] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê·ºê·»ê·½ê·¾ê¸‚ê¸ƒê¸„ê¸…ê¸†ê¸‡ê¸Šê¸Œê¸Žê¸ê¸ê¸‘ê¸’ê¸“ê¸•ê¸–ê¸—ê¸˜ê¸™ê¸šê¸›ê¸œï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê¸ê¸žê¸Ÿê¸ ê¸¡ê¸¢ê¸£ê¸¤ê¸¥ê¸¦ê¸§ê¸¨ê¸©ê¸ªê¸«ê¸¬ê¸­ê¸®ê¸¯ê¸²ê¸³ê¸µê¸¶ê¸¹ê¸»ê¸¼ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê¸½ê¸¾ê¸¿ê¹‚ê¹„ê¹‡ê¹ˆê¹‰ê¹‹ê¹ê¹‘ê¹’ê¹“ê¹•ê¹—ê¹˜ê¹™ê¹šê¹›ê¹žê¹¢ê¹£ê¹¤ê¹¦ê¹§ê¹ªê¹«ê¹­ê¹®ê¹¯ê¹±ê¹²ê¹³ê¹´ê¹µê¹¶ê¹·ê¹ºê¹¾ê¹¿êº€êºêº‚êºƒêº†êº‡êºˆêº‰êºŠêº‹êºêºŽêºêºêº‘êº’êº“êº”êº•êº–êº—êº˜êº™êºšêº›êºœêºêºžêºŸêº êº¡êº¢êº£êº¤êº¥êº¦êº§êº¨êº©êºªêº«êº¬êº­êº®êº¯êº°êº±êº²êº³êº´êºµêº¶êº·êº¸êº¹êººêº»êº¿ê»ê»‚ê»ƒê»…ê»†ê»‡ê»ˆê»‰ê»Šê»‹ê»Žê»’ê»“ê»”ê»•ê»–ê»—ê»šê»›ê»ê»žê»Ÿê» ê»¡ê»¢ê»£ê»¤ê»¥ï¿½"
		.split("");
	for (n = 0; n != t[131].length; ++n)
		if (t[131][n].charCodeAt(0) !== 65533) {
			r[t[131][n]] = 33536 + n;
			e[33536 + n] = t[131][n]
		}
	t[132] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê»¦ê»§ê»©ê»ªê»¬ê»®ê»¯ê»°ê»±ê»²ê»³ê»µê»¶ê»·ê»¹ê»ºê»»ê»½ê»¾ê»¿ê¼€ê¼ê¼‚ê¼ƒê¼„ê¼…ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê¼†ê¼‰ê¼Šê¼‹ê¼Œê¼Žê¼ê¼‘ê¼’ê¼“ê¼”ê¼•ê¼–ê¼—ê¼˜ê¼™ê¼šê¼›ê¼œê¼ê¼žê¼Ÿê¼ ê¼¡ê¼¢ê¼£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê¼¤ê¼¥ê¼¦ê¼§ê¼¨ê¼©ê¼ªê¼«ê¼®ê¼¯ê¼±ê¼³ê¼µê¼¶ê¼·ê¼¸ê¼¹ê¼ºê¼»ê¼¾ê½€ê½„ê½…ê½†ê½‡ê½Šê½‹ê½Œê½ê½Žê½ê½‘ê½’ê½“ê½”ê½•ê½–ê½—ê½˜ê½™ê½šê½›ê½žê½Ÿê½ ê½¡ê½¢ê½£ê½¦ê½§ê½¨ê½©ê½ªê½«ê½¬ê½­ê½®ê½¯ê½°ê½±ê½²ê½³ê½´ê½µê½¶ê½·ê½¸ê½ºê½»ê½¼ê½½ê½¾ê½¿ê¾ê¾‚ê¾ƒê¾…ê¾†ê¾‡ê¾‰ê¾Šê¾‹ê¾Œê¾ê¾Žê¾ê¾’ê¾“ê¾”ê¾–ê¾—ê¾˜ê¾™ê¾šê¾›ê¾ê¾žê¾Ÿê¾ ê¾¡ê¾¢ê¾£ê¾¤ê¾¥ê¾¦ê¾§ê¾¨ê¾©ê¾ªê¾«ê¾¬ê¾­ê¾®ê¾¯ê¾°ê¾±ê¾²ê¾³ê¾´ê¾µê¾¶ê¾·ê¾ºê¾»ê¾½ê¾¾ï¿½"
		.split("");
	for (n = 0; n != t[132].length; ++n)
		if (t[132][n].charCodeAt(0) !== 65533) {
			r[t[132][n]] = 33792 + n;
			e[33792 + n] = t[132][n]
		}
	t[133] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê¾¿ê¿ê¿‚ê¿ƒê¿„ê¿…ê¿†ê¿Šê¿Œê¿ê¿ê¿‘ê¿’ê¿“ê¿•ê¿–ê¿—ê¿˜ê¿™ê¿šê¿›ê¿ê¿žê¿Ÿê¿ ê¿¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ê¿¢ê¿£ê¿¤ê¿¥ê¿¦ê¿§ê¿ªê¿«ê¿¬ê¿­ê¿®ê¿¯ê¿²ê¿³ê¿µê¿¶ê¿·ê¿¹ê¿ºê¿»ê¿¼ê¿½ê¿¾ê¿¿ë€‚ë€ƒï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë€…ë€†ë€‡ë€ˆë€‰ë€Šë€‹ë€ë€Žë€ë€‘ë€’ë€“ë€•ë€–ë€—ë€˜ë€™ë€šë€›ë€žë€Ÿë€ ë€¡ë€¢ë€£ë€¤ë€¥ë€¦ë€§ë€©ë€ªë€«ë€¬ë€­ë€®ë€¯ë€°ë€±ë€²ë€³ë€´ë€µë€¶ë€·ë€¸ë€¹ë€ºë€»ë€¼ë€½ë€¾ë€¿ë€ëë‚ï¿½ï¿½ï¿½ë†ë‡ë‰ë‹ëëëë‘ë’ë–ë˜ëšë›ëœëžëŸë ë¡ë¢ë£ë¤ë¥ë¦ë§ë¨ë©ëªë«ë¬ë­ë®ë¯ë°ë±ë²ë³ë´ëµë¶ë·ë¸ë¹ëºë»ë¾ë¿ë‚ë‚‚ë‚ƒë‚…ë‚†ë‚‡ë‚ˆë‚‰ë‚Šë‚‹ë‚Žë‚ë‚’ë‚“ë‚”ë‚•ë‚–ë‚—ë‚›ë‚ë‚žë‚£ë‚¤ï¿½"
		.split("");
	for (n = 0; n != t[133].length; ++n)
		if (t[133][n].charCodeAt(0) !== 65533) {
			r[t[133][n]] = 34048 + n;
			e[34048 + n] = t[133][n]
		}
	t[134] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë‚¥ë‚¦ë‚§ë‚ªë‚°ë‚²ë‚¶ë‚·ë‚¹ë‚ºë‚»ë‚½ë‚¾ë‚¿ëƒ€ëƒëƒ‚ëƒƒëƒ†ëƒŠëƒ‹ëƒŒëƒëƒŽëƒëƒ’ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëƒ“ëƒ•ëƒ–ëƒ—ëƒ™ëƒšëƒ›ëƒœëƒëƒžëƒŸëƒ¡ëƒ¢ëƒ£ëƒ¤ëƒ¦ëƒ§ëƒ¨ëƒ©ëƒªëƒ«ëƒ¬ëƒ­ëƒ®ëƒ¯ëƒ°ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëƒ±ëƒ²ëƒ³ëƒ´ëƒµëƒ¶ëƒ·ëƒ¸ëƒ¹ëƒºëƒ»ëƒ¼ëƒ½ëƒ¾ëƒ¿ë„€ë„ë„‚ë„ƒë„„ë„…ë„†ë„‡ë„Šë„ë„Žë„ë„‘ë„”ë„•ë„–ë„—ë„šë„žë„Ÿë„ ë„¡ë„¢ë„¦ë„§ë„©ë„ªë„«ë„­ë„®ë„¯ë„°ë„±ë„²ë„³ë„¶ë„ºë„»ë„¼ë„½ë„¾ë„¿ë…‚ë…ƒë……ë…†ë…‡ë…‰ë…Šë…‹ë…Œë…ë…Žë…ë…’ë…“ë…–ë…—ë…™ë…šë…›ë…ë…žë…Ÿë…¡ë…¢ë…£ë…¤ë…¥ë…¦ë…§ë…¨ë…©ë…ªë…«ë…¬ë…­ë…®ë…¯ë…°ë…±ë…²ë…³ë…´ë…µë…¶ë…·ë…ºë…»ë…½ë…¾ë…¿ë†ë†ƒë†„ë†…ë††ë†‡ë†Šë†Œë†Žë†ë†ë†‘ë†•ë†–ë†—ë†™ë†šë†›ë†ï¿½"
		.split("");
	for (n = 0; n != t[134].length; ++n)
		if (t[134][n].charCodeAt(0) !== 65533) {
			r[t[134][n]] = 34304 + n;
			e[34304 + n] = t[134][n]
		}
	t[135] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë†žë†Ÿë† ë†¡ë†¢ë†£ë†¤ë†¥ë†¦ë†§ë†©ë†ªë†«ë†¬ë†­ë†®ë†¯ë†°ë†±ë†²ë†³ë†´ë†µë†¶ë†·ë†¸ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë†¹ë†ºë†»ë†¼ë†½ë†¾ë†¿ë‡€ë‡ë‡‚ë‡ƒë‡„ë‡…ë‡†ë‡‡ë‡ˆë‡‰ë‡Šë‡‹ë‡ë‡Žë‡ë‡‘ë‡’ë‡“ë‡•ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë‡–ë‡—ë‡˜ë‡™ë‡šë‡›ë‡žë‡ ë‡¡ë‡¢ë‡£ë‡¤ë‡¥ë‡¦ë‡§ë‡ªë‡«ë‡­ë‡®ë‡¯ë‡±ë‡²ë‡³ë‡´ë‡µë‡¶ë‡·ë‡¸ë‡ºë‡¼ë‡¾ë‡¿ëˆ€ëˆëˆ‚ëˆƒëˆ†ëˆ‡ëˆ‰ëˆŠëˆëˆŽëˆëˆëˆ‘ëˆ’ëˆ“ëˆ–ëˆ˜ëˆšëˆ›ëˆœëˆëˆžëˆŸëˆ¡ëˆ¢ëˆ£ëˆ¤ëˆ¥ëˆ¦ëˆ§ëˆ¨ëˆ©ëˆªëˆ«ëˆ¬ëˆ­ëˆ®ëˆ¯ëˆ°ëˆ±ëˆ²ëˆ³ëˆµëˆ¶ëˆ·ëˆ¸ëˆ¹ëˆºëˆ»ëˆ½ëˆ¾ëˆ¿ë‰€ë‰ë‰‚ë‰ƒë‰„ë‰…ë‰†ë‰‡ë‰ˆë‰‰ë‰Šë‰‹ë‰Œë‰ë‰Žë‰ë‰ë‰‘ë‰’ë‰“ë‰”ë‰•ë‰–ë‰—ë‰™ë‰šë‰›ë‰ë‰žë‰Ÿë‰¡ë‰¢ë‰£ë‰¤ë‰¥ë‰¦ë‰§ë‰ªë‰«ë‰¬ë‰­ë‰®ï¿½"
		.split("");
	for (n = 0; n != t[135].length; ++n)
		if (t[135][n].charCodeAt(0) !== 65533) {
			r[t[135][n]] = 34560 + n;
			e[34560 + n] = t[135][n]
		}
	t[136] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë‰¯ë‰°ë‰±ë‰²ë‰³ë‰¶ë‰·ë‰¸ë‰¹ë‰ºë‰»ë‰½ë‰¾ë‰¿ëŠ€ëŠëŠ‚ëŠƒëŠ†ëŠ‡ëŠˆëŠŠëŠ‹ëŠŒëŠëŠŽï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëŠëŠ’ëŠ“ëŠ•ëŠ–ëŠ—ëŠ›ëŠœëŠëŠžëŠŸëŠ¢ëŠ¤ëŠ§ëŠ¨ëŠ©ëŠ«ëŠ­ëŠ®ëŠ¯ëŠ±ëŠ²ëŠ³ëŠµëŠ¶ëŠ·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëŠ¸ëŠ¹ëŠºëŠ»ëŠ¼ëŠ½ëŠ¾ëŠ¿ë‹€ë‹ë‹‚ë‹ƒë‹„ë‹…ë‹†ë‹‡ë‹Šë‹‹ë‹ë‹Žë‹ë‹‘ë‹“ë‹”ë‹•ë‹–ë‹—ë‹šë‹œë‹žë‹Ÿë‹ ë‹¡ë‹£ë‹§ë‹©ë‹ªë‹°ë‹±ë‹²ë‹¶ë‹¼ë‹½ë‹¾ëŒ‚ëŒƒëŒ…ëŒ†ëŒ‡ëŒ‰ëŒŠëŒ‹ëŒŒëŒëŒŽëŒëŒ’ëŒ–ëŒ—ëŒ˜ëŒ™ëŒšëŒ›ëŒëŒžëŒŸëŒ ëŒ¡ëŒ¢ëŒ£ëŒ¤ëŒ¥ëŒ¦ëŒ§ëŒ¨ëŒ©ëŒªëŒ«ëŒ¬ëŒ­ëŒ®ëŒ¯ëŒ°ëŒ±ëŒ²ëŒ³ëŒ´ëŒµëŒ¶ëŒ·ëŒ¸ëŒ¹ëŒºëŒ»ëŒ¼ëŒ½ëŒ¾ëŒ¿ë€ëë‚ëƒë„ë…ë†ë‡ëˆë‰ëŠë‹ëŒëëŽëëë‘ë’ë“ë—ë™ëšëë ë¡ë¢ë£ï¿½"
		.split("");
	for (n = 0; n != t[136].length; ++n)
		if (t[136][n].charCodeAt(0) !== 65533) {
			r[t[136][n]] = 34816 + n;
			e[34816 + n] = t[136][n]
		}
	t[137] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¦ë¨ëªë¬ë­ë¯ë²ë³ëµë¶ë·ë¹ëºë»ë¼ë½ë¾ë¿ëŽ‚ëŽ†ëŽ‡ëŽˆëŽ‰ëŽŠëŽ‹ëŽï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëŽŽëŽëŽ‘ëŽ’ëŽ“ëŽ•ëŽ–ëŽ—ëŽ˜ëŽ™ëŽšëŽ›ëŽœëŽëŽžëŽŸëŽ¢ëŽ£ëŽ¤ëŽ¥ëŽ¦ëŽ§ëŽ©ëŽªëŽ«ëŽ­ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëŽ®ëŽ¯ëŽ°ëŽ±ëŽ²ëŽ³ëŽ´ëŽµëŽ¶ëŽ·ëŽ¸ëŽ¹ëŽºëŽ»ëŽ¼ëŽ½ëŽ¾ëŽ¿ë€ëë‚ëƒë†ë‡ë‰ëŠëëë‘ë’ë“ë–ë˜ëšëœëžëŸë¡ë¢ë£ë¥ë¦ë§ë©ëªë«ë¬ë­ë®ë¯ë°ë±ë²ë³ë´ëµë¶ë·ë¸ë¹ëºë»ë½ë¾ë¿ë€ëë‚ëƒë„ë…ë†ë‡ëˆë‰ëŠë‹ëŒëëŽëë‘ë’ë“ë”ë•ë–ë—ë™ëšë›ëëžëŸë¡ë¢ë£ë¤ë¥ë¦ë§ëªë¬ë­ë®ë¯ë°ë±ë²ë³ëµë¶ë·ë¸ë¹ëºë»ë¼ë½ë¾ë¿ë‘€ë‘ë‘‚ë‘ƒë‘„ï¿½"
		.split("");
	for (n = 0; n != t[137].length; ++n)
		if (t[137][n].charCodeAt(0) !== 65533) {
			r[t[137][n]] = 35072 + n;
			e[35072 + n] = t[137][n]
		}
	t[138] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë‘…ë‘†ë‘‡ë‘ˆë‘‰ë‘Šë‘‹ë‘Œë‘ë‘Žë‘ë‘’ë‘“ë‘•ë‘–ë‘—ë‘™ë‘šë‘›ë‘œë‘ë‘žë‘Ÿë‘¢ë‘¤ë‘¦ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë‘§ë‘¨ë‘©ë‘ªë‘«ë‘­ë‘®ë‘¯ë‘°ë‘±ë‘²ë‘³ë‘´ë‘µë‘¶ë‘·ë‘¸ë‘¹ë‘ºë‘»ë‘¼ë‘½ë‘¾ë‘¿ë’ë’‚ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë’ƒë’„ë’…ë’†ë’‡ë’‰ë’Šë’‹ë’Œë’ë’Žë’ë’ë’‘ë’’ë’“ë’”ë’•ë’–ë’—ë’˜ë’™ë’šë’›ë’œë’žë’Ÿë’ ë’¡ë’¢ë’£ë’¥ë’¦ë’§ë’©ë’ªë’«ë’­ë’®ë’¯ë’°ë’±ë’²ë’³ë’´ë’¶ë’¸ë’ºë’»ë’¼ë’½ë’¾ë’¿ë“ë“‚ë“ƒë“…ë“†ë“‡ë“‰ë“Šë“‹ë“Œë“ë“Žë“ë“‘ë“’ë““ë“”ë“–ë“—ë“˜ë“™ë“šë“›ë“žë“Ÿë“¡ë“¢ë“¥ë“§ë“¨ë“©ë“ªë“«ë“®ë“°ë“²ë“³ë“´ë“µë“¶ë“·ë“¹ë“ºë“»ë“¼ë“½ë“¾ë“¿ë”€ë”ë”‚ë”ƒë”„ë”…ë”†ë”‡ë”ˆë”‰ë”Šë”‹ë”Œë”ë”Žë”ë”ë”‘ë”’ë”“ë”–ë”—ë”™ë”šë”ï¿½"
		.split("");
	for (n = 0; n != t[138].length; ++n)
		if (t[138][n].charCodeAt(0) !== 65533) {
			r[t[138][n]] = 35328 + n;
			e[35328 + n] = t[138][n]
		}
	t[139] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë”žë”Ÿë” ë”¡ë”¢ë”£ë”¦ë”«ë”¬ë”­ë”®ë”¯ë”²ë”³ë”µë”¶ë”·ë”¹ë”ºë”»ë”¼ë”½ë”¾ë”¿ë•‚ë•†ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë•‡ë•ˆë•‰ë•Šë•Žë•ë•‘ë•’ë•“ë••ë•–ë•—ë•˜ë•™ë•šë•›ë•žë•¢ë•£ë•¤ë•¥ë•¦ë•§ë•¨ë•©ë•ªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë•«ë•¬ë•­ë•®ë•¯ë•°ë•±ë•²ë•³ë•´ë•µë•¶ë•·ë•¸ë•¹ë•ºë•»ë•¼ë•½ë•¾ë•¿ë–€ë–ë–‚ë–ƒë–„ë–…ë–†ë–‡ë–ˆë–‰ë–Šë–‹ë–Œë–ë–Žë–ë–ë–‘ë–’ë–“ë–”ë–•ë––ë–—ë–˜ë–™ë–šë–›ë–œë–ë–žë–Ÿë–¢ë–£ë–¥ë–¦ë–§ë–©ë–¬ë–­ë–®ë–¯ë–²ë–¶ë–·ë–¸ë–¹ë–ºë–¾ë–¿ë—ë—‚ë—ƒë—…ë—†ë—‡ë—ˆë—‰ë—Šë—‹ë—Žë—’ë—“ë—”ë—•ë—–ë——ë—™ë—šë—›ë—œë—ë—žë—Ÿë— ë—¡ë—¢ë—£ë—¤ë—¥ë—¦ë—§ë—¨ë—©ë—ªë—«ë—­ë—®ë—¯ë—°ë—±ë—²ë—³ë—´ë—µë—¶ë—·ë—¸ë—¹ë—ºë—»ë—¼ë—½ë—¾ë—¿ï¿½"
		.split("");
	for (n = 0; n != t[139].length; ++n)
		if (t[139][n].charCodeAt(0) !== 65533) {
			r[t[139][n]] = 35584 + n;
			e[35584 + n] = t[139][n]
		}
	t[140] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë˜€ë˜ë˜‚ë˜ƒë˜„ë˜…ë˜†ë˜‡ë˜ˆë˜‰ë˜Šë˜‹ë˜Œë˜ë˜Žë˜ë˜’ë˜“ë˜•ë˜–ë˜—ë˜™ë˜šë˜›ë˜œë˜ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë˜žë˜Ÿë˜ ë˜¡ë˜¢ë˜£ë˜¤ë˜¦ë˜§ë˜¨ë˜©ë˜ªë˜«ë˜­ë˜®ë˜¯ë˜°ë˜±ë˜²ë˜³ë˜µë˜¶ë˜·ë˜¸ë˜¹ë˜ºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë˜»ë˜¼ë˜½ë˜¾ë˜¿ë™€ë™ë™‚ë™ƒë™„ë™…ë™†ë™‡ë™‰ë™Šë™‹ë™Œë™ë™Žë™ë™ë™‘ë™’ë™“ë™”ë™•ë™–ë™—ë™˜ë™™ë™šë™›ë™œë™ë™žë™Ÿë™ ë™¡ë™¢ë™£ë™¥ë™¦ë™§ë™©ë™ªë™«ë™¬ë™­ë™®ë™¯ë™°ë™±ë™²ë™³ë™´ë™µë™¶ë™·ë™¸ë™¹ë™ºë™»ë™¼ë™½ë™¾ë™¿ëš€ëšëš‚ëšƒëš„ëš…ëš†ëš‡ëšˆëš‰ëšŠëš‹ëšŒëšëšŽëšëšëš‘ëš’ëš“ëš”ëš•ëš–ëš—ëš˜ëš™ëššëš›ëšžëšŸëš¡ëš¢ëš£ëš¥ëš¦ëš§ëš¨ëš©ëšªëš­ëš®ëš¯ëš°ëš²ëš³ëš´ëšµëš¶ëš·ëš¸ëš¹ëšºëš»ëš¼ëš½ëš¾ëš¿ë›€ë›ë›‚ï¿½"
		.split("");
	for (n = 0; n != t[140].length; ++n)
		if (t[140][n].charCodeAt(0) !== 65533) {
			r[t[140][n]] = 35840 + n;
			e[35840 + n] = t[140][n]
		}
	t[141] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë›ƒë›„ë›…ë›†ë›‡ë›ˆë›‰ë›Šë›‹ë›Œë›ë›Žë›ë›ë›‘ë›’ë›“ë›•ë›–ë›—ë›˜ë›™ë›šë››ë›œë›ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë›žë›Ÿë› ë›¡ë›¢ë›£ë›¤ë›¥ë›¦ë›§ë›¨ë›©ë›ªë›«ë›¬ë›­ë›®ë›¯ë›±ë›²ë›³ë›µë›¶ë›·ë›¹ë›ºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë›»ë›¼ë›½ë›¾ë›¿ëœ‚ëœƒëœ„ëœ†ëœ‡ëœˆëœ‰ëœŠëœ‹ëœŒëœëœŽëœëœëœ‘ëœ’ëœ“ëœ”ëœ•ëœ–ëœ—ëœ˜ëœ™ëœšëœ›ëœœëœëœžëœŸëœ ëœ¡ëœ¢ëœ£ëœ¤ëœ¥ëœ¦ëœ§ëœªëœ«ëœ­ëœ®ëœ±ëœ²ëœ³ëœ´ëœµëœ¶ëœ·ëœºëœ¼ëœ½ëœ¾ëœ¿ë€ëë‚ëƒë…ë†ë‡ë‰ëŠë‹ëëŽëëë‘ë’ë“ë–ë—ë˜ë™ëšë›ëœëëžëŸë¡ë¢ë£ë¥ë¦ë§ë©ëªë«ë¬ë­ë®ë¯ë²ë´ë¶ë·ë¸ë¹ëºë»ë¾ë¿ëžëž‚ëžƒëž…ëž†ëž‡ëžˆëž‰ëžŠëž‹ëžŽëž“ëž”ëž•ëžšëž›ëžëžžï¿½"
		.split("");
	for (n = 0; n != t[141].length; ++n)
		if (t[141][n].charCodeAt(0) !== 65533) {
			r[t[141][n]] = 36096 + n;
			e[36096 + n] = t[141][n]
		}
	t[142] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëžŸëž¡ëž¢ëž£ëž¤ëž¥ëž¦ëž§ëžªëž®ëž¯ëž°ëž±ëž²ëž³ëž¶ëž·ëž¹ëžºëž»ëž¼ëž½ëž¾ëž¿ëŸ€ëŸï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëŸ‚ëŸƒëŸ„ëŸ…ëŸ†ëŸˆëŸŠëŸ‹ëŸŒëŸëŸŽëŸëŸëŸ‘ëŸ’ëŸ“ëŸ”ëŸ•ëŸ–ëŸ—ëŸ˜ëŸ™ëŸšëŸ›ëŸœëŸï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëŸžëŸŸëŸ ëŸ¡ëŸ¢ëŸ£ëŸ¤ëŸ¥ëŸ¦ëŸ§ëŸ¨ëŸ©ëŸªëŸ«ëŸ®ëŸ¯ëŸ±ëŸ²ëŸ³ëŸµëŸ¶ëŸ·ëŸ¸ëŸ¹ëŸºëŸ»ëŸ¾ë ‚ë ƒë „ë …ë †ë Šë ‹ë ë Žë ë ‘ë ’ë “ë ”ë •ë –ë —ë šë œë žë Ÿë  ë ¡ë ¢ë £ë ¦ë §ë ©ë ªë «ë ­ë ®ë ¯ë °ë ±ë ²ë ³ë ¶ë ºë »ë ¼ë ½ë ¾ë ¿ë¡ë¡‚ë¡ƒë¡…ë¡†ë¡‡ë¡ˆë¡‰ë¡Šë¡‹ë¡Œë¡ë¡Žë¡ë¡ë¡’ë¡”ë¡•ë¡–ë¡—ë¡˜ë¡™ë¡šë¡›ë¡žë¡Ÿë¡¡ë¡¢ë¡£ë¡¥ë¡¦ë¡§ë¡¨ë¡©ë¡ªë¡«ë¡®ë¡°ë¡²ë¡³ë¡´ë¡µë¡¶ë¡·ë¡¹ë¡ºë¡»ë¡½ë¡¾ë¡¿ë¢€ë¢ë¢‚ë¢ƒë¢„ï¿½"
		.split("");
	for (n = 0; n != t[142].length; ++n)
		if (t[142][n].charCodeAt(0) !== 65533) {
			r[t[142][n]] = 36352 + n;
			e[36352 + n] = t[142][n]
		}
	t[143] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¢…ë¢†ë¢‡ë¢ˆë¢‰ë¢Šë¢‹ë¢Œë¢Žë¢ë¢ë¢‘ë¢’ë¢“ë¢”ë¢•ë¢–ë¢—ë¢˜ë¢™ë¢šë¢›ë¢œë¢ë¢žë¢Ÿï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¢ ë¢¡ë¢¢ë¢£ë¢¤ë¢¥ë¢¦ë¢§ë¢©ë¢ªë¢«ë¢¬ë¢­ë¢®ë¢¯ë¢±ë¢²ë¢³ë¢µë¢¶ë¢·ë¢¹ë¢ºë¢»ë¢¼ë¢½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¢¾ë¢¿ë£‚ë£„ë£†ë£‡ë£ˆë£‰ë£Šë£‹ë£ë£Žë£ë£‘ë£’ë£“ë£•ë£–ë£—ë£˜ë£™ë£šë£›ë£œë£žë£ ë£¢ë££ë£¤ë£¥ë£¦ë£§ë£ªë£«ë£­ë£®ë£¯ë£±ë£²ë£³ë£´ë£µë£¶ë£·ë£ºë£¼ë£¾ë£¿ë¤€ë¤ë¤‚ë¤ƒë¤…ë¤†ë¤‡ë¤ˆë¤‰ë¤Šë¤‹ë¤Œë¤ë¤Žë¤ë¤ë¤‘ë¤’ë¤“ë¤”ë¤•ë¤–ë¤—ë¤™ë¤šë¤›ë¤œë¤ë¤žë¤Ÿë¤¡ë¤¢ë¤£ë¤¤ë¤¥ë¤¦ë¤§ë¤¨ë¤©ë¤ªë¤«ë¤¬ë¤­ë¤®ë¤¯ë¤°ë¤±ë¤²ë¤³ë¤´ë¤µë¤¶ë¤·ë¤¸ë¤¹ë¤ºë¤»ë¤¾ë¤¿ë¥ë¥‚ë¥ƒë¥…ë¥†ë¥‡ë¥ˆë¥‰ë¥Šë¥‹ë¥ë¥Žë¥ë¥’ë¥“ë¥”ë¥•ë¥–ë¥—ï¿½"
		.split("");
	for (n = 0; n != t[143].length; ++n)
		if (t[143][n].charCodeAt(0) !== 65533) {
			r[t[143][n]] = 36608 + n;
			e[36608 + n] = t[143][n]
		}
	t[144] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¥šë¥›ë¥ë¥žë¥Ÿë¥¡ë¥¢ë¥£ë¥¤ë¥¥ë¥¦ë¥§ë¥ªë¥¬ë¥®ë¥¯ë¥°ë¥±ë¥²ë¥³ë¥¶ë¥·ë¥¹ë¥ºë¥»ë¥½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¥¾ë¥¿ë¦€ë¦ë¦‚ë¦ƒë¦†ë¦ˆë¦‹ë¦Œë¦ë¦ë¦‘ë¦’ë¦“ë¦”ë¦•ë¦–ë¦—ë¦˜ë¦™ë¦šë¦›ë¦œë¦ë¦žï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¦Ÿë¦ ë¦¡ë¦¢ë¦£ë¦¤ë¦¥ë¦¦ë¦§ë¦¨ë¦©ë¦ªë¦«ë¦®ë¦¯ë¦±ë¦²ë¦³ë¦µë¦¶ë¦·ë¦¸ë¦¹ë¦ºë¦»ë¦¾ë§€ë§‚ë§ƒë§„ë§…ë§†ë§‡ë§Šë§‹ë§ë§“ë§”ë§•ë§–ë§—ë§šë§œë§Ÿë§ ë§¢ë§¦ë§§ë§©ë§ªë§«ë§­ë§®ë§¯ë§°ë§±ë§²ë§³ë§¶ë§»ë§¼ë§½ë§¾ë§¿ë¨‚ë¨ƒë¨„ë¨…ë¨†ë¨‡ë¨‰ë¨Šë¨‹ë¨Œë¨ë¨Žë¨ë¨ë¨‘ë¨’ë¨“ë¨”ë¨–ë¨—ë¨˜ë¨™ë¨šë¨›ë¨œë¨ë¨žë¨Ÿë¨ ë¨¡ë¨¢ë¨£ë¨¤ë¨¥ë¨¦ë¨§ë¨¨ë¨©ë¨ªë¨«ë¨¬ë¨­ë¨®ë¨¯ë¨°ë¨±ë¨²ë¨³ë¨´ë¨µë¨¶ë¨·ë¨ºë¨»ë¨½ë¨¾ë¨¿ë©ë©ƒë©„ë©…ë©†ï¿½"
		.split("");
	for (n = 0; n != t[144].length; ++n)
		if (t[144][n].charCodeAt(0) !== 65533) {
			r[t[144][n]] = 36864 + n;
			e[36864 + n] = t[144][n]
		}
	t[145] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë©‡ë©Šë©Œë©ë©ë©‘ë©’ë©–ë©—ë©™ë©šë©›ë©ë©žë©Ÿë© ë©¡ë©¢ë©£ë©¦ë©ªë©«ë©¬ë©­ë©®ë©¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë©²ë©³ë©µë©¶ë©·ë©¹ë©ºë©»ë©¼ë©½ë©¾ë©¿ëª€ëªëª‚ëª†ëªˆëª‰ëªŠëª‹ëªëªŽëªëªëª‘ëª’ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëª“ëª”ëª•ëª–ëª—ëª˜ëª™ëªšëª›ëªœëªëªžëªŸëª ëª¡ëª¢ëª£ëª¤ëª¥ëª¦ëª§ëªªëª­ëª®ëª¯ëª±ëª³ëª´ëªµëª¶ëª·ëªºëª¼ëª¾ëª¿ë«€ë«ë«‚ë«ƒë«…ë«†ë«‡ë«‰ë«Šë«‹ë«Œë«ë«Žë«ë«ë«‘ë«’ë«“ë«”ë«•ë«–ë«—ë«šë«›ë«œë«ë«žë«Ÿë« ë«¡ë«¢ë«£ë«¤ë«¥ë«¦ë«§ë«¨ë«©ë«ªë««ë«¬ë«­ë«®ë«¯ë«°ë«±ë«²ë«³ë«´ë«µë«¶ë«·ë«¸ë«¹ë«ºë«»ë«½ë«¾ë«¿ë¬ë¬‚ë¬ƒë¬…ë¬†ë¬‡ë¬ˆë¬‰ë¬Šë¬‹ë¬Œë¬Žë¬ë¬’ë¬“ë¬”ë¬•ë¬–ë¬—ë¬™ë¬šë¬›ë¬ë¬žë¬Ÿë¬¡ë¬¢ë¬£ë¬¤ë¬¥ë¬¦ë¬§ï¿½"
		.split("");
	for (n = 0; n != t[145].length; ++n)
		if (t[145][n].charCodeAt(0) !== 65533) {
			r[t[145][n]] = 37120 + n;
			e[37120 + n] = t[145][n]
		}
	t[146] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¬¨ë¬ªë¬¬ë¬­ë¬®ë¬¯ë¬°ë¬±ë¬²ë¬³ë¬·ë¬¹ë¬ºë¬¿ë­€ë­ë­‚ë­ƒë­†ë­ˆë­Šë­‹ë­Œë­Žë­‘ë­’ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë­“ë­•ë­–ë­—ë­™ë­šë­›ë­œë­ë­žë­Ÿë­ ë­¢ë­¤ë­¥ë­¦ë­§ë­¨ë­©ë­ªë­«ë­­ë­®ë­¯ë­°ë­±ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë­²ë­³ë­´ë­µë­¶ë­·ë­¸ë­¹ë­ºë­»ë­¼ë­½ë­¾ë­¿ë®€ë®ë®‚ë®ƒë®„ë®…ë®†ë®‡ë®‰ë®Šë®‹ë®ë®Žë®ë®‘ë®’ë®“ë®”ë®•ë®–ë®—ë®˜ë®™ë®šë®›ë®œë®ë®žë®Ÿë® ë®¡ë®¢ë®£ë®¥ë®¦ë®§ë®©ë®ªë®«ë®­ë®®ë®¯ë®°ë®±ë®²ë®³ë®µë®¶ë®¸ë®¹ë®ºë®»ë®¼ë®½ë®¾ë®¿ë¯ë¯‚ë¯ƒë¯…ë¯†ë¯‡ë¯‰ë¯Šë¯‹ë¯Œë¯ë¯Žë¯ë¯‘ë¯’ë¯”ë¯•ë¯–ë¯—ë¯˜ë¯™ë¯šë¯›ë¯œë¯ë¯žë¯Ÿë¯ ë¯¡ë¯¢ë¯£ë¯¤ë¯¥ë¯¦ë¯§ë¯¨ë¯©ë¯ªë¯«ë¯¬ë¯­ë¯®ë¯¯ë¯°ë¯±ë¯²ë¯³ë¯´ë¯µë¯¶ë¯·ë¯ºë¯»ë¯½ë¯¾ë°ï¿½"
		.split("");
	for (n = 0; n != t[146].length; ++n)
		if (t[146][n].charCodeAt(0) !== 65533) {
			r[t[146][n]] = 37376 + n;
			e[37376 + n] = t[146][n]
		}
	t[147] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë°ƒë°„ë°…ë°†ë°‡ë°Šë°Žë°ë°’ë°“ë°™ë°šë° ë°¡ë°¢ë°£ë°¦ë°¨ë°ªë°«ë°¬ë°®ë°¯ë°²ë°³ë°µï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë°¶ë°·ë°¹ë°ºë°»ë°¼ë°½ë°¾ë°¿ë±‚ë±†ë±‡ë±ˆë±Šë±‹ë±Žë±ë±‘ë±’ë±“ë±”ë±•ë±–ë±—ë±˜ë±™ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë±šë±›ë±œë±žë±Ÿë± ë±¡ë±¢ë±£ë±¤ë±¥ë±¦ë±§ë±¨ë±©ë±ªë±«ë±¬ë±­ë±®ë±¯ë±°ë±±ë±²ë±³ë±´ë±µë±¶ë±·ë±¸ë±¹ë±ºë±»ë±¼ë±½ë±¾ë±¿ë²€ë²ë²‚ë²ƒë²†ë²‡ë²‰ë²Šë²ë²ë²ë²‘ë²’ë²“ë²–ë²˜ë²›ë²œë²ë²žë²Ÿë²¢ë²£ë²¥ë²¦ë²©ë²ªë²«ë²¬ë²­ë²®ë²¯ë²²ë²¶ë²·ë²¸ë²¹ë²ºë²»ë²¾ë²¿ë³ë³‚ë³ƒë³…ë³†ë³‡ë³ˆë³‰ë³Šë³‹ë³Œë³Žë³’ë³“ë³”ë³–ë³—ë³™ë³šë³›ë³ë³žë³Ÿë³ ë³¡ë³¢ë³£ë³¤ë³¥ë³¦ë³§ë³¨ë³©ë³ªë³«ë³¬ë³­ë³®ë³¯ë³°ë³±ë³²ë³³ë³·ë³¹ë³ºë³»ë³½ï¿½"
		.split("");
	for (n = 0; n != t[147].length; ++n)
		if (t[147][n].charCodeAt(0) !== 65533) {
			r[t[147][n]] = 37632 + n;
			e[37632 + n] = t[147][n]
		}
	t[148] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë³¾ë³¿ë´€ë´ë´‚ë´ƒë´†ë´ˆë´Šë´‹ë´Œë´ë´Žë´ë´‘ë´’ë´“ë´•ë´–ë´—ë´˜ë´™ë´šë´›ë´œë´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë´žë´Ÿë´ ë´¡ë´¢ë´£ë´¥ë´¦ë´§ë´¨ë´©ë´ªë´«ë´­ë´®ë´¯ë´°ë´±ë´²ë´³ë´´ë´µë´¶ë´·ë´¸ë´¹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë´ºë´»ë´¼ë´½ë´¾ë´¿ëµëµ‚ëµƒëµ„ëµ…ëµ†ëµ‡ëµŠëµ‹ëµëµŽëµëµ‘ëµ’ëµ“ëµ”ëµ•ëµ–ëµ—ëµšëµ›ëµœëµëµžëµŸëµ ëµ¡ëµ¢ëµ£ëµ¥ëµ¦ëµ§ëµ©ëµªëµ«ëµ¬ëµ­ëµ®ëµ¯ëµ°ëµ±ëµ²ëµ³ëµ´ëµµëµ¶ëµ·ëµ¸ëµ¹ëµºëµ»ëµ¼ëµ½ëµ¾ëµ¿ë¶‚ë¶ƒë¶…ë¶†ë¶‹ë¶Œë¶ë¶Žë¶ë¶’ë¶”ë¶–ë¶—ë¶˜ë¶›ë¶ë¶žë¶Ÿë¶ ë¶¡ë¶¢ë¶£ë¶¥ë¶¦ë¶§ë¶¨ë¶©ë¶ªë¶«ë¶¬ë¶­ë¶®ë¶¯ë¶±ë¶²ë¶³ë¶´ë¶µë¶¶ë¶·ë¶¹ë¶ºë¶»ë¶¼ë¶½ë¶¾ë¶¿ë·€ë·ë·‚ë·ƒë·„ë·…ë·†ë·‡ë·ˆë·‰ë·Šë·‹ë·Œë·ë·Žë·ë·ë·‘ï¿½"
		.split("");
	for (n = 0; n != t[148].length; ++n)
		if (t[148][n].charCodeAt(0) !== 65533) {
			r[t[148][n]] = 37888 + n;
			e[37888 + n] = t[148][n]
		}
	t[149] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë·’ë·“ë·–ë·—ë·™ë·šë·›ë·ë·žë·Ÿë· ë·¡ë·¢ë·£ë·¤ë·¥ë·¦ë·§ë·¨ë·ªë·«ë·¬ë·­ë·®ë·¯ë·±ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë·²ë·³ë·µë·¶ë··ë·¹ë·ºë·»ë·¼ë·½ë·¾ë·¿ë¸ë¸‚ë¸„ë¸†ë¸‡ë¸ˆë¸‰ë¸Šë¸‹ë¸Žë¸ë¸‘ë¸’ë¸“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¸•ë¸–ë¸—ë¸˜ë¸™ë¸šë¸›ë¸žë¸ ë¸¡ë¸¢ë¸£ë¸¤ë¸¥ë¸¦ë¸§ë¸¨ë¸©ë¸ªë¸«ë¸¬ë¸­ë¸®ë¸¯ë¸°ë¸±ë¸²ë¸³ë¸´ë¸µë¸¶ë¸·ë¸¸ë¸¹ë¸ºë¸»ë¸¼ë¸½ë¸¾ë¸¿ë¹€ë¹ë¹‚ë¹ƒë¹†ë¹‡ë¹‰ë¹Šë¹‹ë¹ë¹ë¹ë¹‘ë¹’ë¹“ë¹–ë¹˜ë¹œë¹ë¹žë¹Ÿë¹¢ë¹£ë¹¥ë¹¦ë¹§ë¹©ë¹«ë¹¬ë¹­ë¹®ë¹¯ë¹²ë¹¶ë¹·ë¹¸ë¹¹ë¹ºë¹¾ë¹¿ëºëº‚ëºƒëº…ëº†ëº‡ëºˆëº‰ëºŠëº‹ëºŽëº’ëº“ëº”ëº•ëº–ëº—ëºšëº›ëºœëºëºžëºŸëº ëº¡ëº¢ëº£ëº¤ëº¥ëº¦ëº§ëº©ëºªëº«ëº¬ëº­ëº®ëº¯ëº°ëº±ëº²ëº³ëº´ëºµëº¶ëº·ï¿½"
		.split("");
	for (n = 0; n != t[149].length; ++n)
		if (t[149][n].charCodeAt(0) !== 65533) {
			r[t[149][n]] = 38144 + n;
			e[38144 + n] = t[149][n]
		}
	t[150] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ëº¸ëº¹ëººëº»ëº¼ëº½ëº¾ëº¿ë»€ë»ë»‚ë»ƒë»„ë»…ë»†ë»‡ë»ˆë»‰ë»Šë»‹ë»Œë»ë»Žë»ë»’ë»“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë»•ë»–ë»™ë»šë»›ë»œë»ë»žë»Ÿë»¡ë»¢ë»¦ë»§ë»¨ë»©ë»ªë»«ë»­ë»®ë»¯ë»°ë»±ë»²ë»³ë»´ë»µï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë»¶ë»·ë»¸ë»¹ë»ºë»»ë»¼ë»½ë»¾ë»¿ë¼€ë¼‚ë¼ƒë¼„ë¼…ë¼†ë¼‡ë¼Šë¼‹ë¼Œë¼ë¼Žë¼ë¼ë¼‘ë¼’ë¼“ë¼”ë¼•ë¼–ë¼—ë¼šë¼žë¼Ÿë¼ ë¼¡ë¼¢ë¼£ë¼¤ë¼¥ë¼¦ë¼§ë¼¨ë¼©ë¼ªë¼«ë¼¬ë¼­ë¼®ë¼¯ë¼°ë¼±ë¼²ë¼³ë¼´ë¼µë¼¶ë¼·ë¼¸ë¼¹ë¼ºë¼»ë¼¼ë¼½ë¼¾ë¼¿ë½‚ë½ƒë½…ë½†ë½‡ë½‰ë½Šë½‹ë½Œë½ë½Žë½ë½’ë½“ë½”ë½–ë½—ë½˜ë½™ë½šë½›ë½œë½ë½žë½Ÿë½ ë½¡ë½¢ë½£ë½¤ë½¥ë½¦ë½§ë½¨ë½©ë½ªë½«ë½¬ë½­ë½®ë½¯ë½°ë½±ë½²ë½³ë½´ë½µë½¶ë½·ë½¸ë½¹ë½ºë½»ë½¼ë½½ë½¾ë½¿ë¾€ë¾ë¾‚ï¿½"
		.split("");
	for (n = 0; n != t[150].length; ++n)
		if (t[150][n].charCodeAt(0) !== 65533) {
			r[t[150][n]] = 38400 + n;
			e[38400 + n] = t[150][n]
		}
	t[151] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¾ƒë¾„ë¾…ë¾†ë¾‡ë¾ˆë¾‰ë¾Šë¾‹ë¾Œë¾ë¾Žë¾ë¾ë¾‘ë¾’ë¾“ë¾•ë¾–ë¾—ë¾˜ë¾™ë¾šë¾›ë¾œë¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¾žë¾Ÿë¾ ë¾¡ë¾¢ë¾£ë¾¤ë¾¥ë¾¦ë¾§ë¾¨ë¾©ë¾ªë¾«ë¾¬ë¾­ë¾®ë¾¯ë¾±ë¾²ë¾³ë¾´ë¾µë¾¶ë¾·ë¾¸ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë¾¹ë¾ºë¾»ë¾¼ë¾½ë¾¾ë¾¿ë¿€ë¿ë¿‚ë¿ƒë¿„ë¿†ë¿‡ë¿ˆë¿‰ë¿Šë¿‹ë¿Žë¿ë¿‘ë¿’ë¿“ë¿•ë¿–ë¿—ë¿˜ë¿™ë¿šë¿›ë¿ë¿žë¿ ë¿¢ë¿£ë¿¤ë¿¥ë¿¦ë¿§ë¿¨ë¿©ë¿ªë¿«ë¿¬ë¿­ë¿®ë¿¯ë¿°ë¿±ë¿²ë¿³ë¿´ë¿µë¿¶ë¿·ë¿¸ë¿¹ë¿ºë¿»ë¿¼ë¿½ë¿¾ë¿¿ì€€ì€ì€‚ì€ƒì€„ì€…ì€†ì€‡ì€ˆì€‰ì€Šì€‹ì€Œì€ì€Žì€ì€ì€‘ì€’ì€“ì€”ì€•ì€–ì€—ì€˜ì€™ì€šì€›ì€œì€ì€žì€Ÿì€ ì€¡ì€¢ì€£ì€¤ì€¥ì€¦ì€§ì€¨ì€©ì€ªì€«ì€¬ì€­ì€®ì€¯ì€°ì€±ì€²ì€³ì€´ì€µì€¶ì€·ì€¸ì€¹ì€ºì€»ì€½ì€¾ì€¿ï¿½"
		.split("");
	for (n = 0; n != t[151].length; ++n)
		if (t[151][n].charCodeAt(0) !== 65533) {
			r[t[151][n]] = 38656 + n;
			e[38656 + n] = t[151][n]
		}
	t[152] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì€ìì‚ìƒì„ì…ì†ì‡ìˆì‰ìŠì‹ìŒììŽììì’ì“ì”ì•ì–ì—ì™ìšì›ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ììžìŸì¡ì¢ì£ì¤ì¥ì¦ì§ìªì«ì¬ì­ì®ì¯ì°ì±ì²ì³ì´ìµì¶ì·ì¸ì¹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìºì»ì¼ì½ì¾ì¿ì‚€ì‚ì‚‚ì‚ƒì‚„ì‚…ì‚†ì‚‡ì‚ˆì‚‰ì‚Šì‚‹ì‚Œì‚ì‚Žì‚ì‚’ì‚“ì‚•ì‚–ì‚—ì‚™ì‚šì‚›ì‚œì‚ì‚žì‚Ÿì‚¢ì‚¤ì‚¦ì‚§ì‚¨ì‚©ì‚ªì‚«ì‚®ì‚±ì‚²ì‚·ì‚¸ì‚¹ì‚ºì‚»ì‚¾ìƒ‚ìƒƒìƒ„ìƒ†ìƒ‡ìƒŠìƒ‹ìƒìƒŽìƒìƒ‘ìƒ’ìƒ“ìƒ”ìƒ•ìƒ–ìƒ—ìƒšìƒžìƒŸìƒ ìƒ¡ìƒ¢ìƒ£ìƒ¦ìƒ§ìƒ©ìƒªìƒ«ìƒ­ìƒ®ìƒ¯ìƒ°ìƒ±ìƒ²ìƒ³ìƒ¶ìƒ¸ìƒºìƒ»ìƒ¼ìƒ½ìƒ¾ìƒ¿ì„ì„‚ì„ƒì„…ì„†ì„‡ì„‰ì„Šì„‹ì„Œì„ì„Žì„ì„‘ì„’ì„“ì„”ì„–ì„—ì„˜ì„™ì„šì„›ì„¡ì„¢ì„¥ì„¨ì„©ì„ªì„«ì„®ï¿½"
		.split("");
	for (n = 0; n != t[152].length; ++n)
		if (t[152][n].charCodeAt(0) !== 65533) {
			r[t[152][n]] = 38912 + n;
			e[38912 + n] = t[152][n]
		}
	t[153] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì„²ì„³ì„´ì„µì„·ì„ºì„»ì„½ì„¾ì„¿ì…ì…‚ì…ƒì…„ì……ì…†ì…‡ì…Šì…Žì…ì…ì…‘ì…’ì…“ì…–ì…—ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì…™ì…šì…›ì…ì…žì…Ÿì… ì…¡ì…¢ì…£ì…¦ì…ªì…«ì…¬ì…­ì…®ì…¯ì…±ì…²ì…³ì…µì…¶ì…·ì…¹ì…ºì…»ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì…¼ì…½ì…¾ì…¿ì†€ì†ì†‚ì†ƒì†„ì††ì†‡ì†ˆì†‰ì†Šì†‹ì†ì†‘ì†’ì†“ì†•ì†—ì†˜ì†™ì†šì†›ì†žì† ì†¢ì†£ì†¤ì†¦ì†§ì†ªì†«ì†­ì†®ì†¯ì†±ì†²ì†³ì†´ì†µì†¶ì†·ì†¸ì†¹ì†ºì†»ì†¼ì†¾ì†¿ì‡€ì‡ì‡‚ì‡ƒì‡…ì‡†ì‡‡ì‡‰ì‡Šì‡‹ì‡ì‡Žì‡ì‡ì‡‘ì‡’ì‡“ì‡•ì‡–ì‡™ì‡šì‡›ì‡œì‡ì‡žì‡Ÿì‡¡ì‡¢ì‡£ì‡¥ì‡¦ì‡§ì‡©ì‡ªì‡«ì‡¬ì‡­ì‡®ì‡¯ì‡²ì‡´ì‡µì‡¶ì‡·ì‡¸ì‡¹ì‡ºì‡»ì‡¾ì‡¿ìˆìˆ‚ìˆƒìˆ…ìˆ†ìˆ‡ìˆˆìˆ‰ìˆŠìˆ‹ìˆŽìˆìˆ’ìˆ“ìˆ”ìˆ•ìˆ–ìˆ—ìˆšìˆ›ìˆìˆžìˆ¡ìˆ¢ìˆ£ï¿½"
		.split("");
	for (n = 0; n != t[153].length; ++n)
		if (t[153][n].charCodeAt(0) !== 65533) {
			r[t[153][n]] = 39168 + n;
			e[39168 + n] = t[153][n]
		}
	t[154] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìˆ¤ìˆ¥ìˆ¦ìˆ§ìˆªìˆ¬ìˆ®ìˆ°ìˆ³ìˆµìˆ¶ìˆ·ìˆ¸ìˆ¹ìˆºìˆ»ìˆ¼ìˆ½ìˆ¾ìˆ¿ì‰€ì‰ì‰‚ì‰ƒì‰„ì‰…ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì‰†ì‰‡ì‰‰ì‰Šì‰‹ì‰Œì‰ì‰Žì‰ì‰’ì‰“ì‰•ì‰–ì‰—ì‰™ì‰šì‰›ì‰œì‰ì‰žì‰Ÿì‰¡ì‰¢ì‰£ì‰¤ì‰¦ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì‰§ì‰¨ì‰©ì‰ªì‰«ì‰®ì‰¯ì‰±ì‰²ì‰³ì‰µì‰¶ì‰·ì‰¸ì‰¹ì‰ºì‰»ì‰¾ìŠ€ìŠ‚ìŠƒìŠ„ìŠ…ìŠ†ìŠ‡ìŠŠìŠ‹ìŠŒìŠìŠŽìŠìŠ‘ìŠ’ìŠ“ìŠ”ìŠ•ìŠ–ìŠ—ìŠ™ìŠšìŠœìŠžìŠŸìŠ ìŠ¡ìŠ¢ìŠ£ìŠ¦ìŠ§ìŠ©ìŠªìŠ«ìŠ®ìŠ¯ìŠ°ìŠ±ìŠ²ìŠ³ìŠ¶ìŠ¸ìŠºìŠ»ìŠ¼ìŠ½ìŠ¾ìŠ¿ì‹€ì‹ì‹‚ì‹ƒì‹„ì‹…ì‹†ì‹‡ì‹ˆì‹‰ì‹Šì‹‹ì‹Œì‹ì‹Žì‹ì‹ì‹‘ì‹’ì‹“ì‹”ì‹•ì‹–ì‹—ì‹˜ì‹™ì‹šì‹›ì‹žì‹Ÿì‹¡ì‹¢ì‹¥ì‹¦ì‹§ì‹¨ì‹©ì‹ªì‹®ì‹°ì‹²ì‹³ì‹´ì‹µì‹·ì‹ºì‹½ì‹¾ì‹¿ìŒìŒ‚ìŒƒìŒ„ìŒ…ìŒ†ìŒ‡ìŒŠìŒ‹ìŒŽìŒï¿½"
		.split("");
	for (n = 0; n != t[154].length; ++n)
		if (t[154][n].charCodeAt(0) !== 65533) {
			r[t[154][n]] = 39424 + n;
			e[39424 + n] = t[154][n]
		}
	t[155] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìŒìŒ‘ìŒ’ìŒ–ìŒ—ìŒ™ìŒšìŒ›ìŒìŒžìŒŸìŒ ìŒ¡ìŒ¢ìŒ£ìŒ¦ìŒ§ìŒªìŒ«ìŒ¬ìŒ­ìŒ®ìŒ¯ìŒ°ìŒ±ìŒ²ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìŒ³ìŒ´ìŒµìŒ¶ìŒ·ìŒ¸ìŒ¹ìŒºìŒ»ìŒ¼ìŒ½ìŒ¾ìŒ¿ì€ìì‚ìƒì„ì†ì‡ìˆì‰ìŠì‹ìŒìï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìŽììì‘ì’ì“ì”ì•ì–ì—ì˜ì™ìšì›ìœììžìŸì ì¡ì¢ì£ì¤ì¥ì¦ì§ìªì«ì­ì®ì¯ì±ì³ì´ìµì¶ì·ìºì»ì¾ì¿ìŽ€ìŽìŽ‚ìŽƒìŽ…ìŽ†ìŽ‡ìŽ‰ìŽŠìŽ‹ìŽìŽŽìŽìŽìŽ‘ìŽ’ìŽ“ìŽ”ìŽ•ìŽ–ìŽ—ìŽ˜ìŽ™ìŽšìŽ›ìŽœìŽìŽžìŽŸìŽ ìŽ¡ìŽ¢ìŽ£ìŽ¤ìŽ¥ìŽ¦ìŽ§ìŽ¨ìŽ©ìŽªìŽ«ìŽ¬ìŽ­ìŽ®ìŽ¯ìŽ°ìŽ±ìŽ²ìŽ³ìŽ´ìŽµìŽ¶ìŽ·ìŽ¸ìŽ¹ìŽºìŽ»ìŽ¼ìŽ½ìŽ¾ìŽ¿ìì‚ìƒì„ì…ì†ì‡ìˆì‰ìŠì‹ìŒììŽììì‘ì’ì“ì”ì•ì–ì—ìšï¿½"
		.split("");
	for (n = 0; n != t[155].length; ++n)
		if (t[155][n].charCodeAt(0) !== 65533) {
			r[t[155][n]] = 39680 + n;
			e[39680 + n] = t[155][n]
		}
	t[156] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì›ììžì¡ì£ì¤ì¥ì¦ì§ìªì«ì¬ì®ì¯ì°ì±ì²ì³ì¶ì·ì¹ìºì»ì¼ì½ì¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¿ì€ìì‚ìƒì„ì…ì†ì‡ì‰ìŠì‹ìŒììŽìì‘ì’ì“ì”ì•ì–ì—ì˜ì™ìšï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì›ìœììžìŸì ì¡ì¢ì£ì¥ì¦ì§ì¨ì©ìªì«ì­ì®ì¯ì±ì²ì³ìµì¶ì·ì¸ì¹ìºì»ì¾ì¿ì‘€ì‘ì‘‚ì‘ƒì‘„ì‘…ì‘†ì‘‡ì‘‰ì‘Šì‘‹ì‘Œì‘ì‘Žì‘ì‘ì‘‘ì‘’ì‘“ì‘”ì‘•ì‘–ì‘—ì‘˜ì‘™ì‘šì‘›ì‘œì‘ì‘žì‘Ÿì‘ ì‘¡ì‘¢ì‘£ì‘¦ì‘§ì‘©ì‘ªì‘«ì‘­ì‘®ì‘¯ì‘°ì‘±ì‘²ì‘³ì‘¶ì‘·ì‘¸ì‘ºì‘»ì‘¼ì‘½ì‘¾ì‘¿ì’ì’‚ì’ƒì’„ì’…ì’†ì’‡ì’ˆì’‰ì’Šì’‹ì’Œì’ì’Žì’ì’ì’‘ì’’ì’“ì’•ì’–ì’—ì’˜ì’™ì’šì’›ì’ì’žì’Ÿì’ ì’¡ì’¢ì’£ì’¤ì’¥ì’¦ì’§ì’¨ì’©ï¿½"
		.split("");
	for (n = 0; n != t[156].length; ++n)
		if (t[156][n].charCodeAt(0) !== 65533) {
			r[t[156][n]] = 39936 + n;
			e[39936 + n] = t[156][n]
		}
	t[157] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì’ªì’«ì’¬ì’­ì’®ì’¯ì’°ì’±ì’²ì’³ì’´ì’µì’¶ì’·ì’¹ì’ºì’»ì’½ì’¾ì’¿ì“€ì“ì“‚ì“ƒì“„ì“…ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì“†ì“‡ì“ˆì“‰ì“Šì“‹ì“Œì“ì“Žì“ì“ì“‘ì“’ì““ì“”ì“•ì“–ì“—ì“˜ì“™ì“šì“›ì“œì“ì“žì“Ÿï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì“ ì“¡ì“¢ì“£ì“¤ì“¥ì“¦ì“§ì“¨ì“ªì“«ì“¬ì“­ì“®ì“¯ì“²ì“³ì“µì“¶ì“·ì“¹ì“»ì“¼ì“½ì“¾ì”‚ì”ƒì”„ì”…ì”†ì”‡ì”ˆì”‰ì”Šì”‹ì”ì”Žì”ì”‘ì”’ì”“ì”•ì”–ì”—ì”˜ì”™ì”šì”›ì”ì”žì”Ÿì” ì”¡ì”¢ì”£ì”¤ì”¥ì”¦ì”§ì”ªì”«ì”­ì”®ì”¯ì”±ì”²ì”³ì”´ì”µì”¶ì”·ì”ºì”¼ì”¾ì”¿ì•€ì•ì•‚ì•ƒì•†ì•‡ì•‹ì•ì•ì•‘ì•’ì•–ì•šì•›ì•œì•Ÿì•¢ì•£ì•¥ì•¦ì•§ì•©ì•ªì•«ì•¬ì•­ì•®ì•¯ì•²ì•¶ì•·ì•¸ì•¹ì•ºì•»ì•¾ì•¿ì–ì–‚ì–ƒì–…ì–†ì–ˆì–‰ì–Šì–‹ì–Žì–ì–’ì–“ì–”ï¿½"
		.split("");
	for (n = 0; n != t[157].length; ++n)
		if (t[157][n].charCodeAt(0) !== 65533) {
			r[t[157][n]] = 40192 + n;
			e[40192 + n] = t[157][n]
		}
	t[158] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì––ì–™ì–šì–›ì–ì–žì–Ÿì–¡ì–¢ì–£ì–¤ì–¥ì–¦ì–§ì–¨ì–ªì–«ì–¬ì–­ì–®ì–¯ì–°ì–±ì–²ì–³ì–¶ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì–·ì–ºì–¿ì—€ì—ì—‚ì—ƒì—‹ì—ì—ì—’ì—“ì—•ì—–ì——ì—™ì—šì—›ì—œì—ì—žì—Ÿì—¢ì—¤ì—¦ì—§ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì—¨ì—©ì—ªì—«ì—¯ì—±ì—²ì—³ì—µì—¸ì—¹ì—ºì—»ì˜‚ì˜ƒì˜„ì˜‰ì˜Šì˜‹ì˜ì˜Žì˜ì˜‘ì˜’ì˜“ì˜”ì˜•ì˜–ì˜—ì˜šì˜ì˜žì˜Ÿì˜ ì˜¡ì˜¢ì˜£ì˜¦ì˜§ì˜©ì˜ªì˜«ì˜¯ì˜±ì˜²ì˜¶ì˜¸ì˜ºì˜¼ì˜½ì˜¾ì˜¿ì™‚ì™ƒì™…ì™†ì™‡ì™‰ì™Šì™‹ì™Œì™ì™Žì™ì™’ì™–ì™—ì™˜ì™™ì™šì™›ì™žì™Ÿì™¡ì™¢ì™£ì™¤ì™¥ì™¦ì™§ì™¨ì™©ì™ªì™«ì™­ì™®ì™°ì™²ì™³ì™´ì™µì™¶ì™·ì™ºì™»ì™½ì™¾ì™¿ìšìš‚ìšƒìš„ìš…ìš†ìš‡ìšŠìšŒìšŽìšìšìš‘ìš’ìš“ìš–ìš—ìš™ìššìš›ìšìšžìšŸìš ìš¡ìš¢ìš£ìš¦ï¿½"
		.split("");
	for (n = 0; n != t[158].length; ++n)
		if (t[158][n].charCodeAt(0) !== 65533) {
			r[t[158][n]] = 40448 + n;
			e[40448 + n] = t[158][n]
		}
	t[159] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìš¨ìšªìš«ìš¬ìš­ìš®ìš¯ìš²ìš³ìšµìš¶ìš·ìš»ìš¼ìš½ìš¾ìš¿ì›‚ì›„ì›†ì›‡ì›ˆì›‰ì›Šì›‹ì›Žï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì›ì›‘ì›’ì›“ì›•ì›–ì›—ì›˜ì›™ì›šì››ì›žì›Ÿì›¢ì›£ì›¤ì›¥ì›¦ì›§ì›ªì›«ì›­ì›®ì›¯ì›±ì›²ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì›³ì›´ì›µì›¶ì›·ì›ºì›»ì›¼ì›¾ì›¿ìœ€ìœìœ‚ìœƒìœ†ìœ‡ìœ‰ìœŠìœ‹ìœìœŽìœìœìœ‘ìœ’ìœ“ìœ–ìœ˜ìœšìœ›ìœœìœìœžìœŸìœ¢ìœ£ìœ¥ìœ¦ìœ§ìœ©ìœªìœ«ìœ¬ìœ­ìœ®ìœ¯ìœ²ìœ´ìœ¶ìœ¸ìœ¹ìœºìœ»ìœ¾ìœ¿ìì‚ìƒì…ì†ì‡ìˆì‰ì‹ìŽìì™ìšì›ììžìŸì¡ì¢ì£ì¤ì¥ì¦ì§ì©ìªì¬ì­ì®ì¯ì°ì±ì²ì³ì¶ì·ì¹ìºì»ì¿ìž€ìžìž‚ìž†ìž‹ìžŒìžìžìž’ìž“ìž•ìž™ìž›ìžœìžìžžìžŸìž¢ìž§ìž¨ìž©ìžªìž«ìž®ìž¯ìž±ìž²ìž³ìžµìž¶ìž·ï¿½"
		.split("");
	for (n = 0; n != t[159].length; ++n)
		if (t[159][n].charCodeAt(0) !== 65533) {
			r[t[159][n]] = 40704 + n;
			e[40704 + n] = t[159][n]
		}
	t[160] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìž¸ìž¹ìžºìž»ìž¾ìŸ‚ìŸƒìŸ„ìŸ…ìŸ†ìŸ‡ìŸŠìŸ‹ìŸìŸìŸ‘ìŸ’ìŸ“ìŸ”ìŸ•ìŸ–ìŸ—ìŸ™ìŸšìŸ›ìŸœï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìŸžìŸŸìŸ ìŸ¡ìŸ¢ìŸ£ìŸ¥ìŸ¦ìŸ§ìŸ©ìŸªìŸ«ìŸ­ìŸ®ìŸ¯ìŸ°ìŸ±ìŸ²ìŸ³ìŸ´ìŸµìŸ¶ìŸ·ìŸ¸ìŸ¹ìŸºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìŸ»ìŸ¼ìŸ½ìŸ¾ìŸ¿ì ‚ì ƒì …ì †ì ‡ì ‰ì ‹ì Œì ì Žì ì ’ì ”ì —ì ˜ì ™ì šì ›ì žì Ÿì ¡ì ¢ì £ì ¥ì ¦ì §ì ¨ì ©ì ªì «ì ®ì °ì ²ì ³ì ´ì µì ¶ì ·ì ¹ì ºì »ì ½ì ¾ì ¿ì¡ì¡‚ì¡ƒì¡„ì¡…ì¡†ì¡‡ì¡Šì¡‹ì¡Žì¡ì¡ì¡‘ì¡’ì¡“ì¡•ì¡–ì¡—ì¡˜ì¡™ì¡šì¡›ì¡œì¡ì¡žì¡Ÿì¡ ì¡¡ì¡¢ì¡£ì¡¤ì¡¥ì¡¦ì¡§ì¡¨ì¡©ì¡ªì¡«ì¡¬ì¡­ì¡®ì¡¯ì¡²ì¡³ì¡µì¡¶ì¡·ì¡¹ì¡»ì¡¼ì¡½ì¡¾ì¡¿ì¢‚ì¢„ì¢ˆì¢‰ì¢Šì¢Žì¢ì¢ì¢‘ì¢’ì¢“ì¢•ì¢–ì¢—ì¢˜ì¢™ì¢šì¢›ì¢œì¢žì¢ ì¢¢ì¢£ì¢¤ï¿½"
		.split("");
	for (n = 0; n != t[160].length; ++n)
		if (t[160][n].charCodeAt(0) !== 65533) {
			r[t[160][n]] = 40960 + n;
			e[40960 + n] = t[160][n]
		}
	t[161] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¢¥ì¢¦ì¢§ì¢©ì¢ªì¢«ì¢¬ì¢­ì¢®ì¢¯ì¢°ì¢±ì¢²ì¢³ì¢´ì¢µì¢¶ì¢·ì¢¸ì¢¹ì¢ºì¢»ì¢¾ì¢¿ì£€ì£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì£‚ì£ƒì£…ì£†ì£‡ì£‰ì£Šì£‹ì£ì£Žì£ì£ì£‘ì£’ì£“ì£–ì£˜ì£šì£›ì£œì£ì£žì£Ÿì£¢ì££ì£¥ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì£¦ì£§ì£¨ì£©ì£ªì£«ì£¬ì£­ì£®ì£¯ì£°ì£±ì£²ì£³ì£´ì£¶ì£·ì£¸ì£¹ì£ºì£»ì£¾ì£¿ì¤ì¤‚ì¤ƒì¤‡ì¤ˆì¤‰ì¤Šì¤‹ì¤Žã€€ã€ã€‚Â·â€¥â€¦Â¨ã€ƒÂ­â€•âˆ¥ï¼¼âˆ¼â€˜â€™â€œâ€ã€”ã€•ã€ˆã€‰ã€Šã€‹ã€Œã€ã€Žã€ã€ã€‘Â±Ã—Ã·â‰ â‰¤â‰¥âˆžâˆ´Â°â€²â€³â„ƒâ„«ï¿ ï¿¡ï¿¥â™‚â™€âˆ âŠ¥âŒ’âˆ‚âˆ‡â‰¡â‰’Â§â€»â˜†â˜…â—‹â—â—Žâ—‡â—†â–¡â– â–³â–²â–½â–¼â†’â†â†‘â†“â†”ã€“â‰ªâ‰«âˆšâˆ½âˆâˆµâˆ«âˆ¬âˆˆâˆ‹âŠ†âŠ‡âŠ‚âŠƒâˆªâˆ©âˆ§âˆ¨ï¿¢ï¿½"
		.split("");
	for (n = 0; n != t[161].length; ++n)
		if (t[161][n].charCodeAt(0) !== 65533) {
			r[t[161][n]] = 41216 + n;
			e[41216 + n] = t[161][n]
		}
	t[162] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¤ì¤’ì¤“ì¤”ì¤•ì¤–ì¤—ì¤™ì¤šì¤›ì¤œì¤ì¤žì¤Ÿì¤ ì¤¡ì¤¢ì¤£ì¤¤ì¤¥ì¤¦ì¤§ì¤¨ì¤©ì¤ªì¤«ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¤­ì¤®ì¤¯ì¤°ì¤±ì¤²ì¤³ì¤µì¤¶ì¤·ì¤¸ì¤¹ì¤ºì¤»ì¤¼ì¤½ì¤¾ì¤¿ì¥€ì¥ì¥‚ì¥ƒì¥„ì¥…ì¥†ì¥‡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¥ˆì¥‰ì¥Šì¥‹ì¥Œì¥ì¥Žì¥ì¥’ì¥“ì¥•ì¥–ì¥—ì¥™ì¥šì¥›ì¥œì¥ì¥žì¥Ÿì¥¢ì¥¤ì¥¥ì¥¦ì¥§ì¥¨ì¥©ì¥ªì¥«ì¥­ì¥®ì¥¯â‡’â‡”âˆ€âˆƒÂ´ï½žË‡Ë˜ËËšË™Â¸Ë›Â¡Â¿Ëâˆ®âˆ‘âˆÂ¤â„‰â€°â—â—€â–·â–¶â™¤â™ â™¡â™¥â™§â™£âŠ™â—ˆâ–£â—â—‘â–’â–¤â–¥â–¨â–§â–¦â–©â™¨â˜â˜Žâ˜œâ˜žÂ¶â€ â€¡â†•â†—â†™â†–â†˜â™­â™©â™ªâ™¬ã‰¿ãˆœâ„–ã‡â„¢ã‚ã˜â„¡â‚¬Â®ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[162].length; ++n)
		if (t[162][n].charCodeAt(0) !== 65533) {
			r[t[162][n]] = 41472 + n;
			e[41472 + n] = t[162][n]
		}
	t[163] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¥±ì¥²ì¥³ì¥µì¥¶ì¥·ì¥¸ì¥¹ì¥ºì¥»ì¥½ì¥¾ì¥¿ì¦€ì¦ì¦‚ì¦ƒì¦„ì¦…ì¦†ì¦‡ì¦Šì¦‹ì¦ì¦Žì¦ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¦‘ì¦’ì¦“ì¦”ì¦•ì¦–ì¦—ì¦šì¦œì¦žì¦Ÿì¦ ì¦¡ì¦¢ì¦£ì¦¤ì¦¥ì¦¦ì¦§ì¦¨ì¦©ì¦ªì¦«ì¦¬ì¦­ì¦®ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¦¯ì¦°ì¦±ì¦²ì¦³ì¦´ì¦µì¦¶ì¦·ì¦¸ì¦¹ì¦ºì¦»ì¦¼ì¦½ì¦¾ì¦¿ì§‚ì§ƒì§…ì§†ì§‰ì§‹ì§Œì§ì§Žì§ì§’ì§”ì§—ì§˜ì§›ï¼ï¼‚ï¼ƒï¼„ï¼…ï¼†ï¼‡ï¼ˆï¼‰ï¼Šï¼‹ï¼Œï¼ï¼Žï¼ï¼ï¼‘ï¼’ï¼“ï¼”ï¼•ï¼–ï¼—ï¼˜ï¼™ï¼šï¼›ï¼œï¼ï¼žï¼Ÿï¼ ï¼¡ï¼¢ï¼£ï¼¤ï¼¥ï¼¦ï¼§ï¼¨ï¼©ï¼ªï¼«ï¼¬ï¼­ï¼®ï¼¯ï¼°ï¼±ï¼²ï¼³ï¼´ï¼µï¼¶ï¼·ï¼¸ï¼¹ï¼ºï¼»ï¿¦ï¼½ï¼¾ï¼¿ï½€ï½ï½‚ï½ƒï½„ï½…ï½†ï½‡ï½ˆï½‰ï½Šï½‹ï½Œï½ï½Žï½ï½ï½‘ï½’ï½“ï½”ï½•ï½–ï½—ï½˜ï½™ï½šï½›ï½œï½ï¿£ï¿½"
		.split("");
	for (n = 0; n != t[163].length; ++n)
		if (t[163][n].charCodeAt(0) !== 65533) {
			r[t[163][n]] = 41728 + n;
			e[41728 + n] = t[163][n]
		}
	t[164] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì§žì§Ÿì§¡ì§£ì§¥ì§¦ì§¨ì§©ì§ªì§«ì§®ì§²ì§³ì§´ì§µì§¶ì§·ì§ºì§»ì§½ì§¾ì§¿ì¨ì¨‚ì¨ƒì¨„ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¨…ì¨†ì¨‡ì¨Šì¨Žì¨ì¨ì¨‘ì¨’ì¨“ì¨•ì¨–ì¨—ì¨™ì¨šì¨›ì¨œì¨ì¨žì¨Ÿì¨ ì¨¡ì¨¢ì¨£ì¨¤ì¨¥ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¨¦ì¨§ì¨¨ì¨ªì¨«ì¨¬ì¨­ì¨®ì¨¯ì¨°ì¨±ì¨²ì¨³ì¨´ì¨µì¨¶ì¨·ì¨¸ì¨¹ì¨ºì¨»ì¨¼ì¨½ì¨¾ì¨¿ì©€ì©ì©‚ì©ƒì©„ì©…ì©†ã„±ã„²ã„³ã„´ã„µã„¶ã„·ã„¸ã„¹ã„ºã„»ã„¼ã„½ã„¾ã„¿ã…€ã…ã…‚ã…ƒã…„ã……ã…†ã…‡ã…ˆã…‰ã…Šã…‹ã…Œã…ã…Žã…ã…ã…‘ã…’ã…“ã…”ã…•ã…–ã…—ã…˜ã…™ã…šã…›ã…œã…ã…žã…Ÿã… ã…¡ã…¢ã…£ã…¤ã…¥ã…¦ã…§ã…¨ã…©ã…ªã…«ã…¬ã…­ã…®ã…¯ã…°ã…±ã…²ã…³ã…´ã…µã…¶ã…·ã…¸ã…¹ã…ºã…»ã…¼ã…½ã…¾ã…¿ã†€ã†ã†‚ã†ƒã†„ã†…ã††ã†‡ã†ˆã†‰ã†Šã†‹ã†Œã†ã†Žï¿½"
		.split("");
	for (n = 0; n != t[164].length; ++n)
		if (t[164][n].charCodeAt(0) !== 65533) {
			r[t[164][n]] = 41984 + n;
			e[41984 + n] = t[164][n]
		}
	t[165] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì©‡ì©ˆì©‰ì©Šì©‹ì©Žì©ì©‘ì©’ì©“ì©•ì©–ì©—ì©˜ì©™ì©šì©›ì©žì©¢ì©£ì©¤ì©¥ì©¦ì©§ì©©ì©ªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì©«ì©¬ì©­ì©®ì©¯ì©°ì©±ì©²ì©³ì©´ì©µì©¶ì©·ì©¸ì©¹ì©ºì©»ì©¼ì©¾ì©¿ìª€ìªìª‚ìªƒìª…ìª†ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìª‡ìªˆìª‰ìªŠìª‹ìªŒìªìªŽìªìªìª‘ìª’ìª“ìª”ìª•ìª–ìª—ìª™ìªšìª›ìªœìªìªžìªŸìª ìª¡ìª¢ìª£ìª¤ìª¥ìª¦ìª§â…°â…±â…²â…³â…´â…µâ…¶â…·â…¸â…¹ï¿½ï¿½ï¿½ï¿½ï¿½â… â…¡â…¢â…£â…¤â…¥â…¦â…§â…¨â…©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡Î£Î¤Î¥Î¦Î§Î¨Î©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[165].length; ++n)
		if (t[165][n].charCodeAt(0) !== 65533) {
			r[t[165][n]] = 42240 + n;
			e[42240 + n] = t[165][n]
		}
	t[166] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìª¨ìª©ìªªìª«ìª¬ìª­ìª®ìª¯ìª°ìª±ìª²ìª³ìª´ìªµìª¶ìª·ìª¸ìª¹ìªºìª»ìª¾ìª¿ì«ì«‚ì«ƒì«…ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì«†ì«‡ì«ˆì«‰ì«Šì«‹ì«Žì«ì«’ì«”ì«•ì«–ì«—ì«šì«›ì«œì«ì«žì«Ÿì«¡ì«¢ì«£ì«¤ì«¥ì«¦ì«§ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì«¨ì«©ì«ªì««ì«­ì«®ì«¯ì«°ì«±ì«²ì«³ì«µì«¶ì«·ì«¸ì«¹ì«ºì«»ì«¼ì«½ì«¾ì«¿ì¬€ì¬ì¬‚ì¬ƒì¬„ì¬…ì¬†ì¬‡ì¬‰ì¬Šâ”€â”‚â”Œâ”â”˜â””â”œâ”¬â”¤â”´â”¼â”â”ƒâ”â”“â”›â”—â”£â”³â”«â”»â•‹â” â”¯â”¨â”·â”¿â”â”°â”¥â”¸â•‚â”’â”‘â”šâ”™â”–â”•â”Žâ”â”žâ”Ÿâ”¡â”¢â”¦â”§â”©â”ªâ”­â”®â”±â”²â”µâ”¶â”¹â”ºâ”½â”¾â•€â•â•ƒâ•„â•…â•†â•‡â•ˆâ•‰â•Šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[166].length; ++n)
		if (t[166][n].charCodeAt(0) !== 65533) {
			r[t[166][n]] = 42496 + n;
			e[42496 + n] = t[166][n]
		}
	t[167] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¬‹ì¬Œì¬ì¬Žì¬ì¬‘ì¬’ì¬“ì¬•ì¬–ì¬—ì¬™ì¬šì¬›ì¬œì¬ì¬žì¬Ÿì¬¢ì¬£ì¬¤ì¬¥ì¬¦ì¬§ì¬¨ì¬©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¬ªì¬«ì¬¬ì¬­ì¬®ì¬¯ì¬°ì¬±ì¬²ì¬³ì¬´ì¬µì¬¶ì¬·ì¬¸ì¬¹ì¬ºì¬»ì¬¼ì¬½ì¬¾ì¬¿ì­€ì­‚ì­ƒì­„ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì­…ì­†ì­‡ì­Šì­‹ì­ì­Žì­ì­‘ì­’ì­“ì­”ì­•ì­–ì­—ì­šì­›ì­œì­žì­Ÿì­ ì­¡ì­¢ì­£ì­¥ì­¦ì­§ì­¨ì­©ì­ªì­«ì­¬ãŽ•ãŽ–ãŽ—â„“ãŽ˜ã„ãŽ£ãŽ¤ãŽ¥ãŽ¦ãŽ™ãŽšãŽ›ãŽœãŽãŽžãŽŸãŽ ãŽ¡ãŽ¢ãŠãŽãŽŽãŽããŽˆãŽ‰ãˆãŽ§ãŽ¨ãŽ°ãŽ±ãŽ²ãŽ³ãŽ´ãŽµãŽ¶ãŽ·ãŽ¸ãŽ¹ãŽ€ãŽãŽ‚ãŽƒãŽ„ãŽºãŽ»ãŽ¼ãŽ½ãŽ¾ãŽ¿ãŽãŽ‘ãŽ’ãŽ“ãŽ”â„¦ã€ããŽŠãŽ‹ãŽŒã–ã…ãŽ­ãŽ®ãŽ¯ã›ãŽ©ãŽªãŽ«ãŽ¬ããã“ãƒã‰ãœã†ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[167].length; ++n)
		if (t[167][n].charCodeAt(0) !== 65533) {
			r[t[167][n]] = 42752 + n;
			e[42752 + n] = t[167][n]
		}
	t[168] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì­­ì­®ì­¯ì­°ì­±ì­²ì­³ì­´ì­µì­¶ì­·ì­ºì­»ì­¼ì­½ì­¾ì­¿ì®€ì®ì®‚ì®ƒì®„ì®…ì®†ì®‡ì®ˆï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì®‰ì®Šì®‹ì®Œì®ì®Žì®ì®ì®‘ì®’ì®“ì®”ì®•ì®–ì®—ì®˜ì®™ì®šì®›ì®ì®žì®Ÿì® ì®¡ì®¢ì®£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì®¤ì®¥ì®¦ì®§ì®¨ì®©ì®ªì®«ì®¬ì®­ì®®ì®¯ì®°ì®±ì®²ì®³ì®´ì®µì®¶ì®·ì®¹ì®ºì®»ì®¼ì®½ì®¾ì®¿ì¯€ì¯ì¯‚ì¯ƒì¯„Ã†ÃÂªÄ¦ï¿½Ä²ï¿½Ä¿ÅÃ˜Å’ÂºÃžÅ¦ÅŠï¿½ã‰ ã‰¡ã‰¢ã‰£ã‰¤ã‰¥ã‰¦ã‰§ã‰¨ã‰©ã‰ªã‰«ã‰¬ã‰­ã‰®ã‰¯ã‰°ã‰±ã‰²ã‰³ã‰´ã‰µã‰¶ã‰·ã‰¸ã‰¹ã‰ºã‰»â“â“‘â“’â““â“”â“•â“–â“—â“˜â“™â“šâ“›â“œâ“â“žâ“Ÿâ“ â“¡â“¢â“£â“¤â“¥â“¦â“§â“¨â“©â‘ â‘¡â‘¢â‘£â‘¤â‘¥â‘¦â‘§â‘¨â‘©â‘ªâ‘«â‘¬â‘­â‘®Â½â…“â…”Â¼Â¾â…›â…œâ…â…žï¿½"
		.split("");
	for (n = 0; n != t[168].length; ++n)
		if (t[168][n].charCodeAt(0) !== 65533) {
			r[t[168][n]] = 43008 + n;
			e[43008 + n] = t[168][n]
		}
	t[169] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¯…ì¯†ì¯‡ì¯ˆì¯‰ì¯Šì¯‹ì¯Œì¯ì¯Žì¯ì¯ì¯‘ì¯’ì¯“ì¯•ì¯–ì¯—ì¯˜ì¯™ì¯šì¯›ì¯œì¯ì¯žì¯Ÿï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¯ ì¯¡ì¯¢ì¯£ì¯¥ì¯¦ì¯¨ì¯ªì¯«ì¯¬ì¯­ì¯®ì¯¯ì¯°ì¯±ì¯²ì¯³ì¯´ì¯µì¯¶ì¯·ì¯¸ì¯¹ì¯ºì¯»ì¯¼ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¯½ì¯¾ì¯¿ì°€ì°ì°‚ì°ƒì°„ì°…ì°†ì°‡ì°ˆì°‰ì°Šì°‹ì°Žì°ì°‘ì°’ì°“ì°•ì°–ì°—ì°˜ì°™ì°šì°›ì°žì°Ÿì° ì°£ì°¤Ã¦Ä‘Ã°Ä§Ä±Ä³Ä¸Å€Å‚Ã¸Å“ÃŸÃ¾Å§Å‹Å‰ãˆ€ãˆãˆ‚ãˆƒãˆ„ãˆ…ãˆ†ãˆ‡ãˆˆãˆ‰ãˆŠãˆ‹ãˆŒãˆãˆŽãˆãˆãˆ‘ãˆ’ãˆ“ãˆ”ãˆ•ãˆ–ãˆ—ãˆ˜ãˆ™ãˆšãˆ›â’œâ’â’žâ’Ÿâ’ â’¡â’¢â’£â’¤â’¥â’¦â’§â’¨â’©â’ªâ’«â’¬â’­â’®â’¯â’°â’±â’²â’³â’´â’µâ‘´â‘µâ‘¶â‘·â‘¸â‘¹â‘ºâ‘»â‘¼â‘½â‘¾â‘¿â’€â’â’‚Â¹Â²Â³â´â¿â‚â‚‚â‚ƒâ‚„ï¿½"
		.split("");
	for (n = 0; n != t[169].length; ++n)
		if (t[169][n].charCodeAt(0) !== 65533) {
			r[t[169][n]] = 43264 + n;
			e[43264 + n] = t[169][n]
		}
	t[170] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì°¥ì°¦ì°ªì°«ì°­ì°¯ì°±ì°²ì°³ì°´ì°µì°¶ì°·ì°ºì°¿ì±€ì±ì±‚ì±ƒì±†ì±‡ì±‰ì±Šì±‹ì±ì±Žï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì±ì±ì±‘ì±’ì±“ì±–ì±šì±›ì±œì±ì±žì±Ÿì±¡ì±¢ì±£ì±¥ì±§ì±©ì±ªì±«ì±¬ì±­ì±®ì±¯ì±±ì±²ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì±³ì±´ì±¶ì±·ì±¸ì±¹ì±ºì±»ì±¼ì±½ì±¾ì±¿ì²€ì²ì²‚ì²ƒì²„ì²…ì²†ì²‡ì²ˆì²‰ì²Šì²‹ì²Œì²ì²Žì²ì²ì²‘ì²’ì²“ãã‚ãƒã„ã…ã†ã‡ãˆã‰ãŠã‹ãŒããŽããã‘ã’ã“ã”ã•ã–ã—ã˜ã™ãšã›ãœããžãŸã ã¡ã¢ã£ã¤ã¥ã¦ã§ã¨ã©ãªã«ã¬ã­ã®ã¯ã°ã±ã²ã³ã´ãµã¶ã·ã¸ã¹ãºã»ã¼ã½ã¾ã¿ã‚€ã‚ã‚‚ã‚ƒã‚„ã‚…ã‚†ã‚‡ã‚ˆã‚‰ã‚Šã‚‹ã‚Œã‚ã‚Žã‚ã‚ã‚‘ã‚’ã‚“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[170].length; ++n)
		if (t[170][n].charCodeAt(0) !== 65533) {
			r[t[170][n]] = 43520 + n;
			e[43520 + n] = t[170][n]
		}
	t[171] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì²”ì²•ì²–ì²—ì²šì²›ì²ì²žì²Ÿì²¡ì²¢ì²£ì²¤ì²¥ì²¦ì²§ì²ªì²®ì²¯ì²°ì²±ì²²ì²³ì²¶ì²·ì²¹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì²ºì²»ì²½ì²¾ì²¿ì³€ì³ì³‚ì³ƒì³†ì³ˆì³Šì³‹ì³Œì³ì³Žì³ì³‘ì³’ì³“ì³•ì³–ì³—ì³˜ì³™ì³šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì³›ì³œì³ì³žì³Ÿì³ ì³¡ì³¢ì³£ì³¥ì³¦ì³§ì³¨ì³©ì³ªì³«ì³­ì³®ì³¯ì³±ì³²ì³³ì³´ì³µì³¶ì³·ì³¸ì³¹ì³ºì³»ì³¼ì³½ã‚¡ã‚¢ã‚£ã‚¤ã‚¥ã‚¦ã‚§ã‚¨ã‚©ã‚ªã‚«ã‚¬ã‚­ã‚®ã‚¯ã‚°ã‚±ã‚²ã‚³ã‚´ã‚µã‚¶ã‚·ã‚¸ã‚¹ã‚ºã‚»ã‚¼ã‚½ã‚¾ã‚¿ãƒ€ãƒãƒ‚ãƒƒãƒ„ãƒ…ãƒ†ãƒ‡ãƒˆãƒ‰ãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒãƒ‘ãƒ’ãƒ“ãƒ”ãƒ•ãƒ–ãƒ—ãƒ˜ãƒ™ãƒšãƒ›ãƒœãƒãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ£ãƒ¤ãƒ¥ãƒ¦ãƒ§ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ®ãƒ¯ãƒ°ãƒ±ãƒ²ãƒ³ãƒ´ãƒµãƒ¶ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[171].length; ++n)
		if (t[171][n].charCodeAt(0) !== 65533) {
			r[t[171][n]] = 43776 + n;
			e[43776 + n] = t[171][n]
		}
	t[172] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì³¾ì³¿ì´€ì´‚ì´ƒì´„ì´…ì´†ì´‡ì´Šì´‹ì´ì´Žì´ì´‘ì´’ì´“ì´”ì´•ì´–ì´—ì´šì´œì´žì´Ÿì´ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì´¡ì´¢ì´£ì´¥ì´¦ì´§ì´©ì´ªì´«ì´­ì´®ì´¯ì´°ì´±ì´²ì´³ì´´ì´µì´¶ì´·ì´¸ì´ºì´»ì´¼ì´½ì´¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì´¿ìµ€ìµìµ‚ìµƒìµ„ìµ…ìµ†ìµ‡ìµˆìµ‰ìµŠìµ‹ìµŒìµìµŽìµìµìµ‘ìµ’ìµ“ìµ”ìµ•ìµ–ìµ—ìµ˜ìµ™ìµšìµ›ìµìµžìµŸÐÐ‘Ð’Ð“Ð”Ð•ÐÐ–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ð°Ð±Ð²Ð³Ð´ÐµÑ‘Ð¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÑï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[172].length; ++n)
		if (t[172][n].charCodeAt(0) !== 65533) {
			r[t[172][n]] = 44032 + n;
			e[44032 + n] = t[172][n]
		}
	t[173] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìµ¡ìµ¢ìµ£ìµ¥ìµ¦ìµ§ìµ¨ìµ©ìµªìµ«ìµ®ìµ°ìµ²ìµ³ìµ´ìµµìµ¶ìµ·ìµ¹ìµºìµ»ìµ¼ìµ½ìµ¾ìµ¿ì¶€ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¶ì¶‚ì¶ƒì¶„ì¶…ì¶†ì¶‡ì¶‰ì¶Šì¶‹ì¶Œì¶ì¶Žì¶ì¶ì¶‘ì¶’ì¶“ì¶–ì¶—ì¶™ì¶šì¶›ì¶ì¶žì¶Ÿï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¶ ì¶¡ì¶¢ì¶£ì¶¦ì¶¨ì¶ªì¶«ì¶¬ì¶­ì¶®ì¶¯ì¶±ì¶²ì¶³ì¶´ì¶µì¶¶ì¶·ì¶¸ì¶¹ì¶ºì¶»ì¶¼ì¶½ì¶¾ì¶¿ì·€ì·ì·‚ì·ƒì·…ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[173].length; ++n)
		if (t[173][n].charCodeAt(0) !== 65533) {
			r[t[173][n]] = 44288 + n;
			e[44288 + n] = t[173][n]
		}
	t[174] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì·†ì·‡ì·ˆì·‰ì·Šì·‹ì·ì·Žì·ì·‘ì·’ì·“ì·”ì·•ì·–ì·—ì·˜ì·™ì·šì·›ì·œì·ì·žì·Ÿì· ì·¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì·¢ì·£ì·¤ì·¥ì·¦ì·§ì·©ì·ªì·«ì·­ì·®ì·¯ì·±ì·²ì·³ì·´ì·µì·¶ì··ì·ºì·¼ì·¾ì·¿ì¸€ì¸ì¸‚ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¸ƒì¸…ì¸†ì¸‡ì¸‰ì¸Šì¸‹ì¸ì¸Žì¸ì¸ì¸‘ì¸’ì¸“ì¸•ì¸–ì¸—ì¸˜ì¸šì¸›ì¸œì¸ì¸žì¸Ÿì¸¢ì¸£ì¸¥ì¸¦ì¸§ì¸©ì¸ªì¸«ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[174].length; ++n)
		if (t[174][n].charCodeAt(0) !== 65533) {
			r[t[174][n]] = 44544 + n;
			e[44544 + n] = t[174][n]
		}
	t[175] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¸¬ì¸­ì¸®ì¸¯ì¸²ì¸´ì¸¶ì¸·ì¸¸ì¸¹ì¸ºì¸»ì¸¼ì¸½ì¸¾ì¸¿ì¹€ì¹ì¹‚ì¹ƒì¹„ì¹…ì¹†ì¹‡ì¹ˆì¹‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¹Šì¹‹ì¹Œì¹ì¹Žì¹ì¹ì¹‘ì¹’ì¹“ì¹”ì¹•ì¹–ì¹—ì¹šì¹›ì¹ì¹žì¹¢ì¹£ì¹¤ì¹¥ì¹¦ì¹§ì¹ªì¹¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¹®ì¹¯ì¹°ì¹±ì¹²ì¹³ì¹¶ì¹·ì¹¹ì¹ºì¹»ì¹½ì¹¾ì¹¿ìº€ìºìº‚ìºƒìº†ìºˆìºŠìº‹ìºŒìºìºŽìºìº’ìº“ìº•ìº–ìº—ìº™ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[175].length; ++n)
		if (t[175][n].charCodeAt(0) !== 65533) {
			r[t[175][n]] = 44800 + n;
			e[44800 + n] = t[175][n]
		}
	t[176] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìºšìº›ìºœìºìºžìºŸìº¢ìº¦ìº§ìº¨ìº©ìºªìº«ìº®ìº¯ìº°ìº±ìº²ìº³ìº´ìºµìº¶ìº·ìº¸ìº¹ìººï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ìº»ìº¼ìº½ìº¾ìº¿ì»€ì»‚ì»ƒì»„ì»…ì»†ì»‡ì»ˆì»‰ì»Šì»‹ì»Œì»ì»Žì»ì»ì»‘ì»’ì»“ì»”ì»•ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì»–ì»—ì»˜ì»™ì»šì»›ì»œì»ì»žì»Ÿì» ì»¡ì»¢ì»£ì»¦ì»§ì»©ì»ªì»­ì»®ì»¯ì»°ì»±ì»²ì»³ì»¶ì»ºì»»ì»¼ì»½ì»¾ì»¿ê°€ê°ê°„ê°‡ê°ˆê°‰ê°Šê°ê°‘ê°’ê°“ê°”ê°•ê°–ê°—ê°™ê°šê°›ê°œê°ê° ê°¤ê°¬ê°­ê°¯ê°°ê°±ê°¸ê°¹ê°¼ê±€ê±‹ê±ê±”ê±˜ê±œê±°ê±±ê±´ê±·ê±¸ê±ºê²€ê²ê²ƒê²„ê²…ê²†ê²‰ê²Šê²‹ê²Œê²ê²”ê²œê²ê²Ÿê² ê²¡ê²¨ê²©ê²ªê²¬ê²¯ê²°ê²¸ê²¹ê²»ê²¼ê²½ê³ê³„ê³ˆê³Œê³•ê³—ê³ ê³¡ê³¤ê³§ê³¨ê³ªê³¬ê³¯ê³°ê³±ê³³ê³µê³¶ê³¼ê³½ê´€ê´„ê´†ï¿½"
		.split("");
	for (n = 0; n != t[176].length; ++n)
		if (t[176][n].charCodeAt(0) !== 65533) {
			r[t[176][n]] = 45056 + n;
			e[45056 + n] = t[176][n]
		}
	t[177] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¼‚ì¼ƒì¼…ì¼†ì¼‡ì¼‰ì¼Šì¼‹ì¼Œì¼ì¼Žì¼ì¼’ì¼”ì¼–ì¼—ì¼˜ì¼™ì¼šì¼›ì¼ì¼žì¼Ÿì¼¡ì¼¢ì¼£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¼¥ì¼¦ì¼§ì¼¨ì¼©ì¼ªì¼«ì¼®ì¼²ì¼³ì¼´ì¼µì¼¶ì¼·ì¼¹ì¼ºì¼»ì¼¼ì¼½ì¼¾ì¼¿ì½€ì½ì½‚ì½ƒì½„ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì½…ì½†ì½‡ì½ˆì½‰ì½Šì½‹ì½Œì½ì½Žì½ì½ì½‘ì½’ì½“ì½–ì½—ì½™ì½šì½›ì½ì½žì½Ÿì½ ì½¡ì½¢ì½£ì½¦ì½¨ì½ªì½«ì½¬ê´Œê´ê´ê´‘ê´˜ê´œê´ ê´©ê´¬ê´­ê´´ê´µê´¸ê´¼êµ„êµ…êµ‡êµ‰êµêµ”êµ˜êµ¡êµ£êµ¬êµ­êµ°êµ³êµ´êµµêµ¶êµ»êµ¼êµ½êµ¿ê¶ê¶‚ê¶ˆê¶‰ê¶Œê¶ê¶œê¶ê¶¤ê¶·ê·€ê·ê·„ê·ˆê·ê·‘ê·“ê·œê· ê·¤ê·¸ê·¹ê·¼ê·¿ê¸€ê¸ê¸ˆê¸‰ê¸‹ê¸ê¸”ê¸°ê¸±ê¸´ê¸·ê¸¸ê¸ºê¹€ê¹ê¹ƒê¹…ê¹†ê¹Šê¹Œê¹ê¹Žê¹ê¹”ê¹–ê¹œê¹ê¹Ÿê¹ ê¹¡ê¹¥ê¹¨ê¹©ê¹¬ê¹°ê¹¸ï¿½"
		.split("");
	for (n = 0; n != t[177].length; ++n)
		if (t[177][n].charCodeAt(0) !== 65533) {
			r[t[177][n]] = 45312 + n;
			e[45312 + n] = t[177][n]
		}
	t[178] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì½­ì½®ì½¯ì½²ì½³ì½µì½¶ì½·ì½¹ì½ºì½»ì½¼ì½½ì½¾ì½¿ì¾ì¾‚ì¾ƒì¾„ì¾†ì¾‡ì¾ˆì¾‰ì¾Šì¾‹ì¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¾Žì¾ì¾ì¾‘ì¾’ì¾“ì¾”ì¾•ì¾–ì¾—ì¾˜ì¾™ì¾šì¾›ì¾œì¾ì¾žì¾Ÿì¾ ì¾¢ì¾£ì¾¤ì¾¥ì¾¦ì¾§ì¾©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¾ªì¾«ì¾¬ì¾­ì¾®ì¾¯ì¾±ì¾²ì¾³ì¾´ì¾µì¾¶ì¾·ì¾¸ì¾¹ì¾ºì¾»ì¾¼ì¾½ì¾¾ì¾¿ì¿€ì¿ì¿‚ì¿ƒì¿…ì¿†ì¿‡ì¿ˆì¿‰ì¿Šì¿‹ê¹¹ê¹»ê¹¼ê¹½êº„êº…êºŒêº¼êº½êº¾ê»€ê»„ê»Œê»ê»ê»ê»‘ê»˜ê»™ê»œê»¨ê»«ê»­ê»´ê»¸ê»¼ê¼‡ê¼ˆê¼ê¼ê¼¬ê¼­ê¼°ê¼²ê¼´ê¼¼ê¼½ê¼¿ê½ê½‚ê½ƒê½ˆê½‰ê½ê½œê½ê½¤ê½¥ê½¹ê¾€ê¾„ê¾ˆê¾ê¾‘ê¾•ê¾œê¾¸ê¾¹ê¾¼ê¿€ê¿‡ê¿ˆê¿‰ê¿‹ê¿ê¿Žê¿”ê¿œê¿¨ê¿©ê¿°ê¿±ê¿´ê¿¸ë€€ë€ë€„ë€Œë€ë€”ë€œë€ë€¨ë„ë…ëˆëŠëŒëŽë“ë”ë•ë—ë™ï¿½"
		.split("");
	for (n = 0; n != t[178].length; ++n)
		if (t[178][n].charCodeAt(0) !== 65533) {
			r[t[178][n]] = 45568 + n;
			e[45568 + n] = t[178][n]
		}
	t[179] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¿Œì¿ì¿Žì¿ì¿ì¿‘ì¿’ì¿“ì¿”ì¿•ì¿–ì¿—ì¿˜ì¿™ì¿šì¿›ì¿œì¿ì¿žì¿Ÿì¿¢ì¿£ì¿¥ì¿¦ì¿§ì¿©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ì¿ªì¿«ì¿¬ì¿­ì¿®ì¿¯ì¿²ì¿´ì¿¶ì¿·ì¿¸ì¿¹ì¿ºì¿»ì¿½ì¿¾ì¿¿í€í€‚í€ƒí€…í€†í€‡í€ˆí€‰í€Šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í€‹í€Œí€í€Ží€í€í€’í€“í€”í€•í€–í€—í€™í€ší€›í€œí€í€ží€Ÿí€ í€¡í€¢í€£í€¤í€¥í€¦í€§í€¨í€©í€ªí€«í€¬ëë¼ë½ë‚€ë‚„ë‚Œë‚ë‚ë‚‘ë‚˜ë‚™ë‚šë‚œë‚Ÿë‚ ë‚¡ë‚¢ë‚¨ë‚©ë‚«ë‚¬ë‚­ë‚®ë‚¯ë‚±ë‚³ë‚´ë‚µë‚¸ë‚¼ëƒ„ëƒ…ëƒ‡ëƒˆëƒ‰ëƒëƒ‘ëƒ”ëƒ˜ëƒ ëƒ¥ë„ˆë„‰ë„‹ë„Œë„ë„’ë„“ë„˜ë„™ë„›ë„œë„ë„£ë„¤ë„¥ë„¨ë„¬ë„´ë„µë„·ë„¸ë„¹ë…€ë…ë…„ë…ˆë…ë…‘ë…”ë…•ë…˜ë…œë… ë…¸ë…¹ë…¼ë†€ë†‚ë†ˆë†‰ë†‹ë†ë†’ë†“ë†”ë†˜ë†œë†¨ë‡Œë‡ë‡”ë‡œë‡ï¿½"
		.split("");
	for (n = 0; n != t[179].length; ++n)
		if (t[179][n].charCodeAt(0) !== 65533) {
			r[t[179][n]] = 45824 + n;
			e[45824 + n] = t[179][n]
		}
	t[180] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í€®í€¯í€°í€±í€²í€³í€¶í€·í€¹í€ºí€»í€½í€¾í€¿í€íí‚íƒí†íˆíŠí‹íŒííŽíï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‘í’í“í•í–í—í™íší›íœíížíŸí¡í¢í£í¤í¥í¦í§í¨í©íªí«í®í¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í±í²í³íµí¶í·í¸í¹íºí»í¾í¿í‚€í‚‚í‚ƒí‚„í‚…í‚†í‚‡í‚ˆí‚‰í‚Ší‚‹í‚Œí‚í‚Ží‚í‚í‚‘í‚’í‚“í‚”ë‡Ÿë‡¨ë‡©ë‡¬ë‡°ë‡¹ë‡»ë‡½ëˆ„ëˆ…ëˆˆëˆ‹ëˆŒëˆ”ëˆ•ëˆ—ëˆ™ëˆ ëˆ´ëˆ¼ë‰˜ë‰œë‰ ë‰¨ë‰©ë‰´ë‰µë‰¼ëŠ„ëŠ…ëŠ‰ëŠëŠ‘ëŠ”ëŠ˜ëŠ™ëŠšëŠ ëŠ¡ëŠ£ëŠ¥ëŠ¦ëŠªëŠ¬ëŠ°ëŠ´ë‹ˆë‹‰ë‹Œë‹ë‹’ë‹˜ë‹™ë‹›ë‹ë‹¢ë‹¤ë‹¥ë‹¦ë‹¨ë‹«ë‹¬ë‹­ë‹®ë‹¯ë‹³ë‹´ë‹µë‹·ë‹¸ë‹¹ë‹ºë‹»ë‹¿ëŒ€ëŒëŒ„ëŒˆëŒëŒ‘ëŒ“ëŒ”ëŒ•ëŒœë”ë•ë–ë˜ë›ëœëžëŸë¤ë¥ï¿½"
		.split("");
	for (n = 0; n != t[180].length; ++n)
		if (t[180][n].charCodeAt(0) !== 65533) {
			r[t[180][n]] = 46080 + n;
			e[46080 + n] = t[180][n]
		}
	t[181] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‚•í‚–í‚—í‚˜í‚™í‚ší‚›í‚œí‚í‚ží‚Ÿí‚ í‚¡í‚¢í‚£í‚¦í‚§í‚©í‚ªí‚«í‚­í‚®í‚¯í‚°í‚±í‚²ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‚³í‚¶í‚¸í‚ºí‚»í‚¼í‚½í‚¾í‚¿íƒ‚íƒƒíƒ…íƒ†íƒ‡íƒŠíƒ‹íƒŒíƒíƒŽíƒíƒ’íƒ–íƒ—íƒ˜íƒ™íƒšï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íƒ›íƒžíƒŸíƒ¡íƒ¢íƒ£íƒ¥íƒ¦íƒ§íƒ¨íƒ©íƒªíƒ«íƒ®íƒ²íƒ³íƒ´íƒµíƒ¶íƒ·íƒ¹íƒºíƒ»íƒ¼íƒ½íƒ¾íƒ¿í„€í„í„‚í„ƒí„„ë§ë©ë«ë®ë°ë±ë´ë¸ëŽ€ëŽëŽƒëŽ„ëŽ…ëŽŒëŽëŽ”ëŽ ëŽ¡ëŽ¨ëŽ¬ë„ë…ëˆë‹ëŒëŽëë”ë•ë—ë™ë›ëë ë¤ë¨ë¼ëë˜ëœë ë¨ë©ë«ë´ë‘ë‘‘ë‘”ë‘˜ë‘ ë‘¡ë‘£ë‘¥ë‘¬ë’€ë’ˆë’ë’¤ë’¨ë’¬ë’µë’·ë’¹ë“€ë“„ë“ˆë“ë“•ë“œë“ë“ ë“£ë“¤ë“¦ë“¬ë“­ë“¯ë“±ë“¸ë””ë”•ë”˜ë”›ë”œë”¤ë”¥ë”§ë”¨ë”©ë”ªë”°ë”±ë”´ë”¸ï¿½"
		.split("");
	for (n = 0; n != t[181].length; ++n)
		if (t[181][n].charCodeAt(0) !== 65533) {
			r[t[181][n]] = 46336 + n;
			e[46336 + n] = t[181][n]
		}
	t[182] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í„…í„†í„‡í„ˆí„‰í„Ší„‹í„Œí„Ží„í„í„‘í„’í„“í„”í„•í„–í„—í„˜í„™í„ší„›í„œí„í„ží„Ÿï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í„ í„¡í„¢í„£í„¤í„¥í„¦í„§í„¨í„©í„ªí„«í„¬í„­í„®í„¯í„²í„³í„µí„¶í„·í„¹í„»í„¼í„½í„¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í„¿í…‚í…†í…‡í…ˆí…‰í…Ší…‹í…Ží…í…‘í…’í…“í…•í…–í…—í…˜í…™í…ší…›í…ží… í…¢í…£í…¤í…¥í…¦í…§í…©í…ªí…«í…­ë•€ë•ë•ƒë•„ë•…ë•‹ë•Œë•ë•ë•”ë•œë•ë•Ÿë• ë•¡ë– ë–¡ë–¤ë–¨ë–ªë–«ë–°ë–±ë–³ë–´ë–µë–»ë–¼ë–½ë—€ë—„ë—Œë—ë—ë—ë—‘ë—˜ë—¬ë˜ë˜‘ë˜”ë˜˜ë˜¥ë˜¬ë˜´ë™ˆë™¤ë™¨ëšœëšëš ëš¤ëš«ëš¬ëš±ë›”ë›°ë›´ë›¸ëœ€ëœëœ…ëœ¨ëœ©ëœ¬ëœ¯ëœ°ëœ¸ëœ¹ëœ»ë„ëˆëŒë”ë•ë ë¤ë¨ë°ë±ë³ëµë¼ë½ëž€ëž„ëžŒëžëžëžëž‘ëž’ëž–ëž—ï¿½"
		.split("");
	for (n = 0; n != t[182].length; ++n)
		if (t[182][n].charCodeAt(0) !== 65533) {
			r[t[182][n]] = 46592 + n;
			e[46592 + n] = t[182][n]
		}
	t[183] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í…®í…¯í…°í…±í…²í…³í…´í…µí…¶í…·í…¸í…¹í…ºí…»í…½í…¾í…¿í†€í†í†‚í†ƒí†…í††í†‡í†‰í†Šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í†‹í†Œí†í†Ží†í†í†‘í†’í†“í†”í†•í†–í†—í†˜í†™í†ší†›í†œí†í†ží†Ÿí†¢í†£í†¥í†¦í†§ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í†©í†ªí†«í†¬í†­í†®í†¯í†²í†´í†¶í†·í†¸í†¹í†»í†½í†¾í†¿í‡í‡‚í‡ƒí‡„í‡…í‡†í‡‡í‡ˆí‡‰í‡Ší‡‹í‡Œí‡í‡Ží‡ëž˜ëž™ëžœëž ëž¨ëž©ëž«ëž¬ëž­ëž´ëžµëž¸ëŸ‡ëŸ‰ëŸ¬ëŸ­ëŸ°ëŸ´ëŸ¼ëŸ½ëŸ¿ë €ë ë ‡ë ˆë ‰ë Œë ë ˜ë ™ë ›ë ë ¤ë ¥ë ¨ë ¬ë ´ë µë ·ë ¸ë ¹ë¡€ë¡„ë¡‘ë¡“ë¡œë¡ë¡ ë¡¤ë¡¬ë¡­ë¡¯ë¡±ë¡¸ë¡¼ë¢ë¢¨ë¢°ë¢´ë¢¸ë£€ë£ë£ƒë£…ë£Œë£ë£”ë£ë£Ÿë£¡ë£¨ë£©ë£¬ë£°ë£¸ë£¹ë£»ë£½ë¤„ë¤˜ë¤ ë¤¼ë¤½ë¥€ë¥„ë¥Œë¥ë¥‘ë¥˜ë¥™ë¥œë¥ ë¥¨ë¥©ï¿½"
		.split("");
	for (n = 0; n != t[183].length; ++n)
		if (t[183][n].charCodeAt(0) !== 65533) {
			r[t[183][n]] = 46848 + n;
			e[46848 + n] = t[183][n]
		}
	t[184] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‡í‡‘í‡’í‡“í‡”í‡•í‡–í‡—í‡™í‡ší‡›í‡œí‡í‡ží‡Ÿí‡ í‡¡í‡¢í‡£í‡¤í‡¥í‡¦í‡§í‡¨í‡©í‡ªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‡«í‡¬í‡­í‡®í‡¯í‡°í‡±í‡²í‡³í‡µí‡¶í‡·í‡¹í‡ºí‡»í‡¼í‡½í‡¾í‡¿íˆ€íˆíˆ‚íˆƒíˆ„íˆ…íˆ†ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íˆˆíˆŠíˆ‹íˆŒíˆíˆŽíˆíˆ‘íˆ’íˆ“íˆ”íˆ•íˆ–íˆ—íˆ˜íˆ™íˆšíˆ›íˆœíˆíˆžíˆŸíˆ íˆ¡íˆ¢íˆ£íˆ¤íˆ¥íˆ¦íˆ§íˆ¨íˆ©ë¥«ë¥­ë¥´ë¥µë¥¸ë¥¼ë¦„ë¦…ë¦‡ë¦‰ë¦Šë¦ë¦Žë¦¬ë¦­ë¦°ë¦´ë¦¼ë¦½ë¦¿ë§ë§ˆë§‰ë§Œë§Žë§ë§ë§‘ë§’ë§˜ë§™ë§›ë§ë§žë§¡ë§£ë§¤ë§¥ë§¨ë§¬ë§´ë§µë§·ë§¸ë§¹ë§ºë¨€ë¨ë¨ˆë¨•ë¨¸ë¨¹ë¨¼ë©€ë©‚ë©ˆë©‰ë©‹ë©ë©Žë©“ë©”ë©•ë©˜ë©œë©¤ë©¥ë©§ë©¨ë©©ë©°ë©±ë©´ë©¸ëªƒëª„ëª…ëª‡ëªŒëª¨ëª©ëª«ëª¬ëª°ëª²ëª¸ëª¹ëª»ëª½ë«„ë«ˆë«˜ë«™ë«¼ï¿½"
		.split("");
	for (n = 0; n != t[184].length; ++n)
		if (t[184][n].charCodeAt(0) !== 65533) {
			r[t[184][n]] = 47104 + n;
			e[47104 + n] = t[184][n]
		}
	t[185] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íˆªíˆ«íˆ®íˆ¯íˆ±íˆ²íˆ³íˆµíˆ¶íˆ·íˆ¸íˆ¹íˆºíˆ»íˆ¾í‰€í‰‚í‰ƒí‰„í‰…í‰†í‰‡í‰‰í‰Ší‰‹í‰Œï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‰í‰Ží‰í‰í‰‘í‰’í‰“í‰”í‰•í‰–í‰—í‰˜í‰™í‰ší‰›í‰í‰ží‰Ÿí‰ í‰¡í‰¢í‰£í‰¥í‰¦í‰§í‰¨ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‰©í‰ªí‰«í‰¬í‰­í‰®í‰¯í‰°í‰±í‰²í‰³í‰´í‰µí‰¶í‰·í‰¸í‰¹í‰ºí‰»í‰¼í‰½í‰¾í‰¿íŠ‚íŠƒíŠ…íŠ†íŠ‡íŠ‰íŠŠíŠ‹íŠŒë¬€ë¬„ë¬ë¬ë¬‘ë¬˜ë¬œë¬ ë¬©ë¬«ë¬´ë¬µë¬¶ë¬¸ë¬»ë¬¼ë¬½ë¬¾ë­„ë­…ë­‡ë­‰ë­ë­ë­ë­”ë­˜ë­¡ë­£ë­¬ë®ˆë®Œë®ë®¤ë®¨ë®¬ë®´ë®·ë¯€ë¯„ë¯ˆë¯ë¯“ë¯¸ë¯¹ë¯¼ë¯¿ë°€ë°‚ë°ˆë°‰ë°‹ë°Œë°ë°ë°‘ë°”ë°•ë°–ë°—ë°˜ë°›ë°œë°ë°žë°Ÿë°¤ë°¥ë°§ë°©ë°­ë°°ë°±ë°´ë°¸ë±€ë±ë±ƒë±„ë±…ë±‰ë±Œë±ë±ë±ë²„ë²…ë²ˆë²‹ë²Œë²Žë²”ë²•ë²—ï¿½"
		.split("");
	for (n = 0; n != t[185].length; ++n)
		if (t[185][n].charCodeAt(0) !== 65533) {
			r[t[185][n]] = 47360 + n;
			e[47360 + n] = t[185][n]
		}
	t[186] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íŠíŠŽíŠíŠ’íŠ“íŠ”íŠ–íŠ—íŠ˜íŠ™íŠšíŠ›íŠíŠžíŠŸíŠ¡íŠ¢íŠ£íŠ¥íŠ¦íŠ§íŠ¨íŠ©íŠªíŠ«íŠ­ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íŠ®íŠ¯íŠ°íŠ²íŠ³íŠ´íŠµíŠ¶íŠ·íŠºíŠ»íŠ½íŠ¾í‹í‹ƒí‹„í‹…í‹†í‹‡í‹Ší‹Œí‹í‹Ží‹í‹í‹‘ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‹’í‹“í‹•í‹–í‹—í‹™í‹ší‹›í‹í‹ží‹Ÿí‹ í‹¡í‹¢í‹£í‹¦í‹§í‹¨í‹©í‹ªí‹«í‹¬í‹­í‹®í‹¯í‹²í‹³í‹µí‹¶í‹·í‹¹í‹ºë²™ë²šë² ë²¡ë²¤ë²§ë²¨ë²°ë²±ë²³ë²´ë²µë²¼ë²½ë³€ë³„ë³ë³ë³ë³‘ë³•ë³˜ë³œë³´ë³µë³¶ë³¸ë³¼ë´„ë´…ë´‡ë´‰ë´ë´”ë´¤ë´¬ëµ€ëµˆëµ‰ëµŒëµëµ˜ëµ™ëµ¤ëµ¨ë¶€ë¶ë¶„ë¶‡ë¶ˆë¶‰ë¶Šë¶ë¶‘ë¶“ë¶•ë¶™ë¶šë¶œë¶¤ë¶°ë¶¸ë·”ë·•ë·˜ë·œë·©ë·°ë·´ë·¸ë¸€ë¸ƒë¸…ë¸Œë¸ë¸ë¸”ë¸œë¸ë¸Ÿë¹„ë¹…ë¹ˆë¹Œë¹Žë¹”ë¹•ë¹—ë¹™ë¹šë¹›ë¹ ë¹¡ë¹¤ï¿½"
		.split("");
	for (n = 0; n != t[186].length; ++n)
		if (t[186][n].charCodeAt(0) !== 65533) {
			r[t[186][n]] = 47616 + n;
			e[47616 + n] = t[186][n]
		}
	t[187] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‹»í‹¼í‹½í‹¾í‹¿íŒ‚íŒ„íŒ†íŒ‡íŒˆíŒ‰íŒŠíŒ‹íŒíŒ‘íŒ’íŒ“íŒ•íŒ—íŒ˜íŒ™íŒšíŒ›íŒžíŒ¢íŒ£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íŒ¤íŒ¦íŒ§íŒªíŒ«íŒ­íŒ®íŒ¯íŒ±íŒ²íŒ³íŒ´íŒµíŒ¶íŒ·íŒºíŒ¾íŒ¿í€íí‚íƒí†í‡íˆí‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íŠí‹íŒííŽííí‘í’í“í”í•í–í—í˜í™íší›íœíížíŸí í¡í¢í£í¤í¥í¦í§í¨í©ë¹¨ë¹ªë¹°ë¹±ë¹³ë¹´ë¹µë¹»ë¹¼ë¹½ëº€ëº„ëºŒëºëºëºëº‘ëº˜ëº™ëº¨ë»ë»‘ë»”ë»—ë»˜ë» ë»£ë»¤ë»¥ë»¬ë¼ë¼ˆë¼‰ë¼˜ë¼™ë¼›ë¼œë¼ë½€ë½ë½„ë½ˆë½ë½‘ë½•ë¾”ë¾°ë¿…ë¿Œë¿ë¿ë¿”ë¿œë¿Ÿë¿¡ì€¼ì‘ì˜ìœì ì¨ì©ì‚ì‚‘ì‚”ì‚˜ì‚ ì‚¡ì‚£ì‚¥ì‚¬ì‚­ì‚¯ì‚°ì‚³ì‚´ì‚µì‚¶ì‚¼ì‚½ì‚¿ìƒ€ìƒìƒ…ìƒˆìƒ‰ìƒŒìƒìƒ˜ìƒ™ìƒ›ìƒœìƒìƒ¤ï¿½"
		.split("");
	for (n = 0; n != t[187].length; ++n)
		if (t[187][n].charCodeAt(0) !== 65533) {
			r[t[187][n]] = 47872 + n;
			e[47872 + n] = t[187][n]
		}
	t[188] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íªí«í¬í­í®í¯í°í±í²í³í´íµí¶í·í¸í¹íºí»í¾í¿íŽíŽ‚íŽƒíŽ…íŽ†íŽ‡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íŽˆíŽ‰íŽŠíŽ‹íŽŽíŽ’íŽ“íŽ”íŽ•íŽ–íŽ—íŽšíŽ›íŽíŽžíŽŸíŽ¡íŽ¢íŽ£íŽ¤íŽ¥íŽ¦íŽ§íŽªíŽ¬íŽ®ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íŽ¯íŽ°íŽ±íŽ²íŽ³íŽµíŽ¶íŽ·íŽ¹íŽºíŽ»íŽ½íŽ¾íŽ¿í€íí‚íƒí†í‡íŠí‹íŒííŽíí‘í’í“í”í•í–ìƒ¥ìƒ¨ìƒ¬ìƒ´ìƒµìƒ·ìƒ¹ì„€ì„„ì„ˆì„ì„•ì„œì„ì„žì„Ÿì„ ì„£ì„¤ì„¦ì„§ì„¬ì„­ì„¯ì„°ì„±ì„¶ì„¸ì„¹ì„¼ì…€ì…ˆì…‰ì…‹ì…Œì…ì…”ì…•ì…˜ì…œì…¤ì…¥ì…§ì…¨ì…©ì…°ì…´ì…¸ì†…ì†Œì†ì†Žì†ì†”ì†–ì†œì†ì†Ÿì†¡ì†¥ì†¨ì†©ì†¬ì†°ì†½ì‡„ì‡ˆì‡Œì‡”ì‡—ì‡˜ì‡ ì‡¤ì‡¨ì‡°ì‡±ì‡³ì‡¼ì‡½ìˆ€ìˆ„ìˆŒìˆìˆìˆ‘ìˆ˜ìˆ™ìˆœìˆŸìˆ ìˆ¨ìˆ©ìˆ«ìˆ­ï¿½"
		.split("");
	for (n = 0; n != t[188].length; ++n)
		if (t[188][n].charCodeAt(0) !== 65533) {
			r[t[188][n]] = 48128 + n;
			e[48128 + n] = t[188][n]
		}
	t[189] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í—í™íší›íœíížíŸí í¢í¤í¥í¦í§í¨í©íªí«í®í¯í±í²í³íµí¶í·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í¸í¹íºí»í¾í€í‚íƒí„í…í†í‡í‰íŠí‹íŒííŽííí‘í’í“í”í•í–ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í—í˜í™íší›íœížíŸí í¡í¢í£í¤í¥í¦í§í¨í©íªí«í¬í­í®í¯í°í±í²í³í´íµí¶í·ìˆ¯ìˆ±ìˆ²ìˆ´ì‰ˆì‰ì‰‘ì‰”ì‰˜ì‰ ì‰¥ì‰¬ì‰­ì‰°ì‰´ì‰¼ì‰½ì‰¿ìŠìŠˆìŠ‰ìŠìŠ˜ìŠ›ìŠìŠ¤ìŠ¥ìŠ¨ìŠ¬ìŠ­ìŠ´ìŠµìŠ·ìŠ¹ì‹œì‹ì‹ ì‹£ì‹¤ì‹«ì‹¬ì‹­ì‹¯ì‹±ì‹¶ì‹¸ì‹¹ì‹»ì‹¼ìŒ€ìŒˆìŒ‰ìŒŒìŒìŒ“ìŒ”ìŒ•ìŒ˜ìŒœìŒ¤ìŒ¥ìŒ¨ìŒ©ì…ì¨ì©ì¬ì°ì²ì¸ì¹ì¼ì½ìŽ„ìŽˆìŽŒì€ì˜ì™ìœìŸì ì¢ì¨ì©ì­ì´ìµì¸ìˆìì¤ì¬ì°ï¿½"
		.split("");
	for (n = 0; n != t[189].length; ++n)
		if (t[189][n].charCodeAt(0) !== 65533) {
			r[t[189][n]] = 48384 + n;
			e[48384 + n] = t[189][n]
		}
	t[190] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í¸í¹íºí»í¼í½í¾í¿í‘í‘‚í‘ƒí‘…í‘†í‘‡í‘ˆí‘‰í‘Ší‘‹í‘Œí‘í‘Ží‘í‘í‘‘í‘’í‘“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‘”í‘•í‘–í‘—í‘˜í‘™í‘ší‘›í‘í‘ží‘Ÿí‘¡í‘¢í‘£í‘¥í‘¦í‘§í‘¨í‘©í‘ªí‘«í‘¬í‘®í‘°í‘±í‘²ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‘³í‘´í‘µí‘¶í‘·í‘ºí‘»í‘½í‘¾í’í’ƒí’„í’…í’†í’‡í’Ší’Œí’Ží’í’í’‘í’’í’“í’•í’–í’—í’˜í’™í’ší’›í’œí’ì´ì¼ì½ì‘ˆì‘¤ì‘¥ì‘¨ì‘¬ì‘´ì‘µì‘¹ì’€ì’”ì’œì’¸ì’¼ì“©ì“°ì“±ì“´ì“¸ì“ºì“¿ì”€ì”ì”Œì”ì””ì”œì”¨ì”©ì”¬ì”°ì”¸ì”¹ì”»ì”½ì•„ì•…ì•ˆì•‰ì•Šì•Œì•ì•Žì•“ì•”ì••ì•—ì•˜ì•™ì•ì•žì• ì•¡ì•¤ì•¨ì•°ì•±ì•³ì•´ì•µì•¼ì•½ì–€ì–„ì–‡ì–Œì–ì–ì–‘ì–•ì–—ì–˜ì–œì– ì–©ì–´ì–µì–¸ì–¹ì–»ì–¼ì–½ì–¾ì—„ì—…ì—†ì—‡ì—ˆì—‰ì—Šì—Œì—Žï¿½"
		.split("");
	for (n = 0; n != t[190].length; ++n)
		if (t[190][n].charCodeAt(0) !== 65533) {
			r[t[190][n]] = 48640 + n;
			e[48640 + n] = t[190][n]
		}
	t[191] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í’ží’Ÿí’ í’¡í’¢í’£í’¤í’¥í’¦í’§í’¨í’ªí’«í’¬í’­í’®í’¯í’°í’±í’²í’³í’´í’µí’¶í’·í’¸ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í’¹í’ºí’»í’¼í’½í’¾í’¿í“€í“í“‚í“ƒí“„í“…í“†í“‡í“ˆí“‰í“Ší“‹í“í“Ží“í“‘í“’í““í“•ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í“–í“—í“˜í“™í“ší“›í“í“ží“ í“¡í“¢í“£í“¤í“¥í“¦í“§í“©í“ªí“«í“­í“®í“¯í“±í“²í“³í“´í“µí“¶í“·í“¹í“ºí“¼ì—ì—‘ì—”ì—˜ì— ì—¡ì—£ì—¥ì—¬ì—­ì—®ì—°ì—´ì—¶ì—·ì—¼ì—½ì—¾ì—¿ì˜€ì˜ì˜…ì˜†ì˜‡ì˜ˆì˜Œì˜ì˜˜ì˜™ì˜›ì˜œì˜¤ì˜¥ì˜¨ì˜¬ì˜­ì˜®ì˜°ì˜³ì˜´ì˜µì˜·ì˜¹ì˜»ì™€ì™ì™„ì™ˆì™ì™‘ì™“ì™”ì™•ì™œì™ì™ ì™¬ì™¯ì™±ì™¸ì™¹ì™¼ìš€ìšˆìš‰ìš‹ìšìš”ìš•ìš˜ìšœìš¤ìš¥ìš§ìš©ìš°ìš±ìš´ìš¸ìš¹ìšºì›€ì›ì›ƒì›…ì›Œì›ì›ì›”ì›œì›ì› ì›¡ì›¨ï¿½"
		.split("");
	for (n = 0; n != t[191].length; ++n)
		if (t[191][n].charCodeAt(0) !== 65533) {
			r[t[191][n]] = 48896 + n;
			e[48896 + n] = t[191][n]
		}
	t[192] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í“¾í“¿í”€í”í”‚í”ƒí”…í”†í”‡í”‰í”Ší”‹í”í”Ží”í”í”‘í”’í”“í”–í”˜í”™í”ší”›í”œí”ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í”ží”Ÿí” í”¡í”¢í”£í”¤í”¥í”¦í”§í”¨í”©í”ªí”«í”¬í”­í”®í”¯í”°í”±í”²í”³í”´í”µí”¶í”·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í”¸í”¹í”ºí”»í”¾í”¿í•í•‚í•ƒí•…í•†í•‡í•ˆí•‰í•Ší•‹í•Ží•í•’í•“í•”í••í•–í•—í•ší•›í•í•ží•Ÿí•¡í•¢í•£ì›©ì›¬ì›°ì›¸ì›¹ì›½ìœ„ìœ…ìœˆìœŒìœ”ìœ•ìœ—ìœ™ìœ ìœ¡ìœ¤ìœ¨ìœ°ìœ±ìœ³ìœµìœ·ìœ¼ìœ½ì€ì„ìŠìŒììì‘ì’ì“ì”ì•ì–ì—ì˜ìœì ì¨ì«ì´ìµì¸ì¼ì½ì¾ìžƒìž„ìž…ìž‡ìžˆìž‰ìžŠìžŽìžìž‘ìž”ìž–ìž—ìž˜ìžšìž ìž¡ìž£ìž¤ìž¥ìž¦ìž¬ìž­ìž°ìž´ìž¼ìž½ìž¿ìŸ€ìŸìŸˆìŸ‰ìŸŒìŸŽìŸìŸ˜ìŸìŸ¤ìŸ¨ìŸ¬ì €ì ì „ì ˆì Šï¿½"
		.split("");
	for (n = 0; n != t[192].length; ++n)
		if (t[192][n].charCodeAt(0) !== 65533) {
			r[t[192][n]] = 49152 + n;
			e[49152 + n] = t[192][n]
		}
	t[193] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í•¤í•¦í•§í•ªí•¬í•®í•¯í•°í•±í•²í•³í•¶í•·í•¹í•ºí•»í•½í•¾í•¿í–€í–í–‚í–ƒí–†í–Ší–‹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í–Œí–í–Ží–í–‘í–’í–“í–”í–•í––í–—í–˜í–™í–ší–›í–œí–í–ží–Ÿí– í–¡í–¢í–£í–¤í–¦í–§ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í–¨í–©í–ªí–«í–¬í–­í–®í–¯í–°í–±í–²í–³í–´í–µí–¶í–·í–¸í–¹í–ºí–»í–¼í–½í–¾í–¿í—€í—í—‚í—ƒí—„í—…í—†í—‡ì ì ‘ì “ì •ì –ì œì ì  ì ¤ì ¬ì ­ì ¯ì ±ì ¸ì ¼ì¡€ì¡ˆì¡‰ì¡Œì¡ì¡”ì¡°ì¡±ì¡´ì¡¸ì¡ºì¢€ì¢ì¢ƒì¢…ì¢†ì¢‡ì¢‹ì¢Œì¢ì¢”ì¢ì¢Ÿì¢¡ì¢¨ì¢¼ì¢½ì£„ì£ˆì£Œì£”ì£•ì£—ì£™ì£ ì£¡ì£¤ì£µì£¼ì£½ì¤€ì¤„ì¤…ì¤†ì¤Œì¤ì¤ì¤‘ì¤˜ì¤¬ì¤´ì¥ì¥‘ì¥”ì¥˜ì¥ ì¥¡ì¥£ì¥¬ì¥°ì¥´ì¥¼ì¦ˆì¦‰ì¦Œì¦ì¦˜ì¦™ì¦›ì¦ì§€ì§ì§„ì§‡ì§ˆì§Šì§ì§‘ì§“ï¿½"
		.split("");
	for (n = 0; n != t[193].length; ++n)
		if (t[193][n].charCodeAt(0) !== 65533) {
			r[t[193][n]] = 49408 + n;
			e[49408 + n] = t[193][n]
		}
	t[194] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í—Ší—‹í—í—Ží—í—‘í—“í—”í—•í—–í——í—ší—œí—ží—Ÿí— í—¡í—¢í—£í—¦í—§í—©í—ªí—«í—­í—®ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í—¯í—°í—±í—²í—³í—¶í—¸í—ºí—»í—¼í—½í—¾í—¿í˜‚í˜ƒí˜…í˜†í˜‡í˜‰í˜Ší˜‹í˜Œí˜í˜Ží˜í˜’ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í˜–í˜—í˜˜í˜™í˜ší˜›í˜í˜ží˜Ÿí˜¡í˜¢í˜£í˜¥í˜¦í˜§í˜¨í˜©í˜ªí˜«í˜¬í˜®í˜¯í˜°í˜±í˜²í˜³í˜´í˜µí˜¶í˜·í˜ºí˜»ì§•ì§–ì§™ì§šì§œì§ì§ ì§¢ì§¤ì§§ì§¬ì§­ì§¯ì§°ì§±ì§¸ì§¹ì§¼ì¨€ì¨ˆì¨‰ì¨‹ì¨Œì¨ì¨”ì¨˜ì¨©ì©Œì©ì©ì©”ì©œì©ì©Ÿì© ì©¡ì©¨ì©½ìª„ìª˜ìª¼ìª½ì«€ì«„ì«Œì«ì«ì«‘ì«“ì«˜ì«™ì« ì«¬ì«´ì¬ˆì¬ì¬”ì¬˜ì¬ ì¬¡ì­ì­ˆì­‰ì­Œì­ì­˜ì­™ì­ì­¤ì­¸ì­¹ì®œì®¸ì¯”ì¯¤ì¯§ì¯©ì°Œì°ì°ì°”ì°œì°ì°¡ì°¢ì°§ì°¨ì°©ì°¬ì°®ì°°ì°¸ì°¹ì°»ï¿½"
		.split("");
	for (n = 0; n != t[194].length; ++n)
		if (t[194][n].charCodeAt(0) !== 65533) {
			r[t[194][n]] = 49664 + n;
			e[49664 + n] = t[194][n]
		}
	t[195] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í˜½í˜¾í˜¿í™í™‚í™ƒí™„í™†í™‡í™Ší™Œí™Ží™í™í™’í™“í™–í™—í™™í™ší™›í™í™ží™Ÿí™ í™¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í™¢í™£í™¤í™¥í™¦í™¨í™ªí™«í™¬í™­í™®í™¯í™²í™³í™µí™¶í™·í™¸í™¹í™ºí™»í™¼í™½í™¾í™¿íš€ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íšíš‚íš„íš†íš‡íšˆíš‰íšŠíš‹íšŽíšíš‘íš’íš“íš•íš–íš—íš˜íš™íššíš›íšœíšžíš íš¢íš£íš¤íš¥íš¦íš§íš©íšªì°¼ì°½ì°¾ì±„ì±…ì±ˆì±Œì±”ì±•ì±—ì±˜ì±™ì± ì±¤ì±¦ì±¨ì±°ì±µì²˜ì²™ì²œì² ì²¨ì²©ì²«ì²¬ì²­ì²´ì²µì²¸ì²¼ì³„ì³…ì³‡ì³‰ì³ì³”ì³¤ì³¬ì³°ì´ì´ˆì´‰ì´Œì´ì´˜ì´™ì´›ì´ì´¤ì´¨ì´¬ì´¹ìµœìµ ìµ¤ìµ¬ìµ­ìµ¯ìµ±ìµ¸ì¶ˆì¶”ì¶•ì¶˜ì¶œì¶¤ì¶¥ì¶§ì¶©ì¶°ì·„ì·Œì·ì·¨ì·¬ì·°ì·¸ì·¹ì·»ì·½ì¸„ì¸ˆì¸Œì¸”ì¸™ì¸ ì¸¡ì¸¤ì¸¨ì¸°ì¸±ì¸³ì¸µï¿½"
		.split("");
	for (n = 0; n != t[195].length; ++n)
		if (t[195][n].charCodeAt(0) !== 65533) {
			r[t[195][n]] = 49920 + n;
			e[49920 + n] = t[195][n]
		}
	t[196] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íš«íš­íš®íš¯íš±íš²íš³íš´íšµíš¶íš·íš¸íšºíš¼íš½íš¾íš¿í›€í›í›‚í›ƒí›†í›‡í›‰í›Ší›‹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í›í›Ží›í›í›’í›“í›•í›–í›˜í›ší››í›œí›í›ží›Ÿí›¡í›¢í›£í›¥í›¦í›§í›©í›ªí›«í›¬í›­ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í›®í›¯í›±í›²í›³í›´í›¶í›·í›¸í›¹í›ºí›»í›¾í›¿íœíœ‚íœƒíœ…íœ†íœ‡íœˆíœ‰íœŠíœ‹íœŒíœíœŽíœíœíœ’íœ“íœ”ì¹˜ì¹™ì¹œì¹Ÿì¹ ì¹¡ì¹¨ì¹©ì¹«ì¹­ì¹´ì¹µì¹¸ì¹¼ìº„ìº…ìº‡ìº‰ìºìº‘ìº”ìº˜ìº ìº¡ìº£ìº¤ìº¥ìº¬ìº­ì»ì»¤ì»¥ì»¨ì»«ì»¬ì»´ì»µì»·ì»¸ì»¹ì¼€ì¼ì¼„ì¼ˆì¼ì¼‘ì¼“ì¼•ì¼œì¼ ì¼¤ì¼¬ì¼­ì¼¯ì¼°ì¼±ì¼¸ì½”ì½•ì½˜ì½œì½¤ì½¥ì½§ì½©ì½°ì½±ì½´ì½¸ì¾€ì¾…ì¾Œì¾¡ì¾¨ì¾°ì¿„ì¿ ì¿¡ì¿¤ì¿¨ì¿°ì¿±ì¿³ì¿µì¿¼í€€í€„í€‘í€˜í€­í€´í€µí€¸í€¼ï¿½"
		.split("");
	for (n = 0; n != t[196].length; ++n)
		if (t[196][n].charCodeAt(0) !== 65533) {
			r[t[196][n]] = 50176 + n;
			e[50176 + n] = t[196][n]
		}
	t[197] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íœ•íœ–íœ—íœšíœ›íœíœžíœŸíœ¡íœ¢íœ£íœ¤íœ¥íœ¦íœ§íœªíœ¬íœ®íœ¯íœ°íœ±íœ²íœ³íœ¶íœ·íœ¹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íœºíœ»íœ½íœ¾íœ¿í€íí‚íƒí…í†íˆíŠí‹íŒííŽíí’í“í•íší›íœíížï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íŸí¢í¤í¦í§í¨íªí«í­í®í¯í±í²í³íµí¶í·í¸í¹íºí»í¾í¿íž€íž‚ížƒíž„íž…íž†íž‡ížŠíž‹í„í…í‡í‰íí”í˜í í¬í­í°í´í¼í½í‚í‚¤í‚¥í‚¨í‚¬í‚´í‚µí‚·í‚¹íƒ€íƒíƒ„íƒˆíƒ‰íƒíƒ‘íƒ“íƒ”íƒ•íƒœíƒíƒ íƒ¤íƒ¬íƒ­íƒ¯íƒ°íƒ±íƒ¸í„í„°í„±í„´í„¸í„ºí…€í…í…ƒí…„í……í…Œí…í…í…”í…œí…í…Ÿí…¡í…¨í…¬í…¼í†„í†ˆí† í†¡í†¤í†¨í†°í†±í†³í†µí†ºí†¼í‡€í‡˜í‡´í‡¸íˆ‡íˆ‰íˆíˆ¬íˆ­íˆ°íˆ´íˆ¼íˆ½íˆ¿í‰í‰ˆí‰œï¿½"
		.split("");
	for (n = 0; n != t[197].length; ++n)
		if (t[197][n].charCodeAt(0) !== 65533) {
			r[t[197][n]] = 50432 + n;
			e[50432 + n] = t[197][n]
		}
	t[198] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ížížŽížíž‘íž’íž“íž”íž•íž–íž—ížšížœížžížŸíž íž¡íž¢íž£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í‰¤íŠ€íŠíŠ„íŠˆíŠíŠ‘íŠ•íŠœíŠ íŠ¤íŠ¬íŠ±íŠ¸íŠ¹íŠ¼íŠ¿í‹€í‹‚í‹ˆí‹‰í‹‹í‹”í‹˜í‹œí‹¤í‹¥í‹°í‹±í‹´í‹¸íŒ€íŒíŒƒíŒ…íŒŒíŒíŒŽíŒíŒ”íŒ–íŒœíŒíŒŸíŒ íŒ¡íŒ¥íŒ¨íŒ©íŒ¬íŒ°íŒ¸íŒ¹íŒ»íŒ¼íŒ½í„í…í¼í½íŽ€íŽ„íŽŒíŽíŽíŽíŽ‘íŽ˜íŽ™íŽœíŽ íŽ¨íŽ©íŽ«íŽ­íŽ´íŽ¸íŽ¼í„í…íˆí‰íí˜í¡í£í¬í­í°í´í¼í½í¿íï¿½"
		.split("");
	for (n = 0; n != t[198].length; ++n)
		if (t[198][n].charCodeAt(0) !== 65533) {
			r[t[198][n]] = 50688 + n;
			e[50688 + n] = t[198][n]
		}
	t[199] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½íˆíí‘€í‘„í‘œí‘ í‘¤í‘­í‘¯í‘¸í‘¹í‘¼í‘¿í’€í’‚í’ˆí’‰í’‹í’í’”í’©í“Œí“í“”í“œí“Ÿí“¨í“¬í“°í“¸í“»í“½í”„í”ˆí”Œí””í”•í”—í”¼í”½í•€í•„í•Œí•í•í•‘í•˜í•™í•œí• í•¥í•¨í•©í•«í•­í•´í•µí•¸í•¼í–„í–…í–‡í–ˆí–‰í–í–¥í—ˆí—‰í—Œí—í—’í—˜í—™í—›í—í—¤í—¥í—¨í—¬í—´í—µí—·í—¹í˜€í˜í˜„í˜ˆí˜í˜‘í˜“í˜”í˜•í˜œí˜ ï¿½"
		.split("");
	for (n = 0; n != t[199].length; ++n)
		if (t[199][n].charCodeAt(0) !== 65533) {
			r[t[199][n]] = 50944 + n;
			e[50944 + n] = t[199][n]
		}
	t[200] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½í˜¤í˜­í˜¸í˜¹í˜¼í™€í™…í™ˆí™‰í™‹í™í™‘í™”í™•í™˜í™œí™§í™©í™°í™±í™´íšƒíš…íšŒíšíšíš”íšíšŸíš¡íš¨íš¬íš°íš¹íš»í›„í›…í›ˆí›Œí›‘í›”í›—í›™í› í›¤í›¨í›°í›µí›¼í›½íœ€íœ„íœ‘íœ˜íœ™íœœíœ íœ¨íœ©íœ«íœ­íœ´íœµíœ¸íœ¼í„í‡í‰íí‘í”í–í—í˜í™í í¡í£í¥í©í¬í°í´í¼í½ížížˆíž‰ížŒížíž˜íž™íž›ížï¿½"
		.split("");
	for (n = 0; n != t[200].length; ++n)
		if (t[200][n].charCodeAt(0) !== 65533) {
			r[t[200][n]] = 51200 + n;
			e[51200 + n] = t[200][n]
		}
	t[202] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¼½ä½³å‡åƒ¹åŠ å¯å‘µå“¥å˜‰å«å®¶æš‡æž¶æž·æŸ¯æ­Œç‚ç—‚ç¨¼è‹›èŒ„è¡—è¢ˆè¨¶è³ˆè·è»»è¿¦é§•åˆ»å´å„æªæ…¤æ®¼çè„šè¦ºè§’é–£ä¾ƒåˆŠå¢¾å¥¸å§¦å¹²å¹¹æ‡‡æ€æ†æŸ¬æ¡¿æ¾—ç™Žçœ‹ç£µç¨ˆç«¿ç°¡è‚è‰®è‰±è««é–“ä¹«å–æ›·æ¸´ç¢£ç«­è‘›è¤èŽéž¨å‹˜åŽå ªåµŒæ„Ÿæ†¾æˆ¡æ•¢æŸ‘æ©„æ¸›ç”˜ç–³ç›£çž°ç´ºé‚¯é‘‘é‘’é¾•ï¿½"
		.split("");
	for (n = 0; n != t[202].length; ++n)
		if (t[202][n].charCodeAt(0) !== 65533) {
			r[t[202][n]] = 51712 + n;
			e[51712 + n] = t[202][n]
		}
	t[203] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åŒ£å²¬ç”²èƒ›é‰€é–˜å‰›å ˆå§œå²¡å´—åº·å¼ºå½Šæ…·æ±Ÿç•ºç–†ç³ çµ³ç¶±ç¾Œè…”èˆ¡è–‘è¥è¬›é‹¼é™é±‡ä»‹ä»·å€‹å‡±å¡æ„·æ„¾æ…¨æ”¹æ§ªæ¼‘ç–¥çš†ç›–ç®‡èŠ¥è“‹ï¤€éŽ§é–‹å–€å®¢å‘ï¤ç²³ç¾¹é†µå€¨åŽ»å±…å·¨æ‹’æ®æ“šæ“§æ¸ ç‚¬ç¥›è·è¸žï¤‚é½é‰…é‹¸ä¹¾ä»¶å¥å·¾å»ºæ„†æ¥—è…±è™”è¹‡éµé¨«ä¹žå‚‘æ°æ¡€å„‰åŠåŠ’æª¢ï¿½"
		.split("");
	for (n = 0; n != t[203].length; ++n)
		if (t[203][n].charCodeAt(0) !== 65533) {
			r[t[203][n]] = 51968 + n;
			e[51968 + n] = t[203][n]
		}
	t[204] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çž¼éˆé»”åŠ«æ€¯è¿²åˆæ†©æ­æ“Šæ ¼æª„æ¿€è†ˆè¦¡éš”å …ç‰½çŠ¬ç”„çµ¹ç¹­è‚©è¦‹è­´é£éµ‘æŠ‰æ±ºæ½”çµç¼ºè¨£å…¼æ…Šç®è¬™é‰—éŽŒäº¬ä¿“å€žå‚¾å„†å‹å‹å¿å°å¢ƒåºšå¾‘æ…¶æ†¬æ“Žæ•¬æ™¯æš»æ›´æ¢—æ¶‡ç‚…çƒ±ç’Ÿç’¥ç“Šç—™ç¡¬ç£¬ç«Ÿç«¶çµ…ç¶“è€•è€¿è„›èŽ–è­¦è¼•é€•é¡é ƒé ¸é©šé¯¨ä¿‚å•“å ºå¥‘å­£å±†æ‚¸æˆ’æ¡‚æ¢°ï¿½"
		.split("");
	for (n = 0; n != t[204].length; ++n)
		if (t[204][n].charCodeAt(0) !== 65533) {
			r[t[204][n]] = 52224 + n;
			e[52224 + n] = t[204][n]
		}
	t[205] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ£¨æºªç•Œç™¸ç£Žç¨½ç³»ç¹«ç¹¼è¨ˆèª¡è°¿éšŽé·„å¤å©å‘Šå‘±å›ºå§‘å­¤å°»åº«æ‹·æ”·æ•…æ•²æš æž¯æ§æ²½ç—¼çšç¾ç¨¿ç¾”è€ƒè‚¡è†è‹¦è‹½è°è—è ±è¢´èª¥ï¤ƒè¾œéŒ®é›‡é¡§é«˜é¼“å“­æ–›æ›²æ¢ç©€è°·éµ å›°å¤å´‘æ˜†æ¢±æ£æ»¾ç¨è¢žé¯¤æ±¨ï¤„éª¨ä¾›å…¬å…±åŠŸå­”å·¥ææ­æ‹±æŽ§æ”»ç™ç©ºèš£è²¢éžä¸²å¯¡æˆˆæžœç“œï¿½"
		.split("");
	for (n = 0; n != t[205].length; ++n)
		if (t[205][n].charCodeAt(0) !== 65533) {
			r[t[205][n]] = 52480 + n;
			e[52480 + n] = t[205][n]
		}
	t[206] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç§‘è“èª‡èª²è·¨éŽé‹é¡†å»“æ§¨è—¿éƒ­ï¤…å† å®˜å¯¬æ…£æ£ºæ¬¾çŒç¯ç“˜ç®¡ç½è…è§€è²«é—œé¤¨åˆ®ææ‹¬é€‚ä¾Šå…‰åŒ¡å£™å»£æ› æ´¸ç‚šç‹‚ç–ç­èƒ±é‘›å¦æŽ›ç½«ä¹–å‚€å¡Šå£žæ€ªæ„§æ‹æ§é­å®ç´˜è‚±è½Ÿäº¤åƒ‘å’¬å–¬å¬Œå¶ å·§æ”ªæ•Žæ ¡æ©‹ç‹¡çšŽçŸ¯çµžç¿¹è† è•Žè›Ÿè¼ƒè½ŽéƒŠé¤ƒé©•é®«ä¸˜ä¹…ä¹ä»‡ä¿±å…·å‹¾ï¿½"
		.split("");
	for (n = 0; n != t[206].length; ++n)
		if (t[206][n].charCodeAt(0) !== 65533) {
			r[t[206][n]] = 52736 + n;
			e[52736 + n] = t[206][n]
		}
	t[207] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å€å£å¥å’Žå˜”åµåž¢å¯‡å¶‡å»æ‡¼æ‹˜æ•‘æž¸æŸ©æ§‹æ­æ¯†æ¯¬æ±‚æºç¸ç‹—çŽ–çƒçž¿çŸ©ç©¶çµ¿è€‰è‡¼èˆ…èˆŠè‹Ÿè¡¢è¬³è³¼è»€é€‘é‚±é‰¤éŠ¶é§’é©…é³©é·—é¾œåœ‹å±€èŠéž éž«éº´å›çª˜ç¾¤è£™è»éƒ¡å €å±ˆæŽ˜çªŸå®®å¼“ç©¹çª®èŠŽèº¬å€¦åˆ¸å‹¸å·åœˆæ‹³æ²æ¬Šæ·ƒçœ·åŽ¥ç—è•¨è¹¶é—•æœºæ«ƒæ½°è©­è»Œé¥‹ï¤†æ™·æ­¸è²´ï¿½"
		.split("");
	for (n = 0; n != t[207].length; ++n)
		if (t[207][n].charCodeAt(0) !== 65533) {
			r[t[207][n]] = 52992 + n;
			e[52992 + n] = t[207][n]
		}
	t[208] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¬¼ï¤‡å«åœ­å¥Žæ†æ§»çªç¡…çªºç«…ç³¾è‘µè¦èµ³é€µé–¨å‹»å‡ç•‡ç­ èŒéˆžï¤ˆæ©˜å…‹å‰‹åŠ‡æˆŸæ£˜æ¥µéš™åƒ…åŠ¤å‹¤æ‡ƒæ–¤æ ¹æ§¿ç‘¾ç­‹èŠ¹è«è¦²è¬¹è¿‘é¥‰ï¤‰ä»Šå¦—æ“’æ˜‘æªŽç´ç¦ç¦½èŠ©è¡¾è¡¿è¥Ÿï¤ŠéŒ¦ä¼‹åŠæ€¥æ‰±æ±²ç´šçµ¦äº˜å…¢çŸœè‚¯ä¼ä¼Žå…¶å†€å—œå™¨åœ»åŸºåŸ¼å¤”å¥‡å¦“å¯„å²å´Žå·±å¹¾å¿ŒæŠ€æ——æ—£ï¿½"
		.split("");
	for (n = 0; n != t[208].length; ++n)
		if (t[208][n].charCodeAt(0) !== 65533) {
			r[t[208][n]] = 53248 + n;
			e[53248 + n] = t[208][n]
		}
	t[209] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æœžæœŸæžæ£‹æ£„æ©Ÿæ¬ºæ°£æ±½æ²‚æ·‡çŽ˜ç¦çªç’‚ç’£ç•¸ç•¿ç¢ç£¯ç¥ç¥‡ç¥ˆç¥ºç®•ç´€ç¶ºç¾ˆè€†è€­è‚Œè¨˜è­è±ˆèµ·éŒ¡éŒ¤é£¢é¥‘é¨Žé¨é©¥éº’ç·Šä½¶å‰æ‹®æ¡”é‡‘å–«å„ºï¤‹ï¤Œå¨œæ‡¦ï¤æ‹æ‹¿ï¤Žï¤ï¤ï¤‘ï¤’ï¤“é‚£ï¤”ï¤•ï¤–ï¤—ï¤˜è«¾ï¤™ï¤šï¤›ï¤œæš–ï¤ç…–ï¤žï¤Ÿé›£ï¤ ææºå—ï¤¡æžæ¥ æ¹³ï¤¢ç”·ï¤£ï¤¤ï¤¥ï¿½"
		.split("");
	for (n = 0; n != t[209].length; ++n)
		if (t[209][n].charCodeAt(0) !== 65533) {
			r[t[209][n]] = 53504 + n;
			e[53504 + n] = t[209][n]
		}
	t[210] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç´ï¤¦ï¤§è¡²å›Šå¨˜ï¤¨ï¤©ï¤ªï¤«ï¤¬ä¹ƒï¤­å…§å¥ˆæŸ°è€ï¤®å¥³å¹´æ’šç§Šå¿µæ¬æ‹ˆæ»å¯§å¯—åŠªï¤¯å¥´å¼©æ€’ï¤°ï¤±ï¤²ç‘™ï¤³ï¤´ï¤µï¤¶ï¤·ï¤¸é§‘ï¤¹ï¤ºï¤»ï¤¼ï¤½ï¤¾ï¤¿ï¥€ï¥ï¥‚ï¥ƒæ¿ƒï¥„ï¥…è†¿è¾²æƒ±ï¥†ï¥‡è…¦ï¥ˆï¥‰å°¿ï¥Šï¥‹ï¥Œï¥ï¥Žï¥ï¥ï¥‘å«©è¨¥æ»ç´ï¥’ï¥“ï¥”ï¥•ï¥–ï¥—èƒ½ï¥˜ï¥™å°¼æ³¥åŒ¿æººå¤šèŒ¶ï¿½"
		.split("");
	for (n = 0; n != t[210].length; ++n)
		if (t[210][n].charCodeAt(0) !== 65533) {
			r[t[210][n]] = 53760 + n;
			e[53760 + n] = t[210][n]
		}
	t[211] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¸¹äº¶ä½†å–®åœ˜å£‡å½–æ–·æ—¦æª€æ®µæ¹çŸ­ç«¯ç°žç·žè›‹è¢’é„²é›æ’»æ¾¾çºç–¸é”å•–åæ†ºæ“”æ›‡æ·¡æ¹›æ½­æ¾¹ç—°èƒè†½è•è¦ƒè«‡è­šéŒŸæ²“ç•“ç­”è¸éå”å ‚å¡˜å¹¢æˆ‡æ’žæ£ ç•¶ç³–èž³é»¨ä»£åžˆå®å¤§å°å²±å¸¶å¾…æˆ´æ“¡çŽ³è‡ºè¢‹è²¸éšŠé»›å®…å¾·æ‚³å€’åˆ€åˆ°åœ–å µå¡—å°Žå± å³¶å¶‹åº¦å¾’æ‚¼æŒ‘æŽ‰æ—æ¡ƒï¿½"
		.split("");
	for (n = 0; n != t[211].length; ++n)
		if (t[211][n].charCodeAt(0) !== 65533) {
			r[t[211][n]] = 54016 + n;
			e[54016 + n] = t[211][n]
		}
	t[212] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ£¹æ«‚æ·˜æ¸¡æ»”æ¿¤ç‡¾ç›œç¹ç¦±ç¨»è„è¦©è³­è·³è¹ˆé€ƒé€”é“éƒ½éé™¶éŸœæ¯’ç€†ç‰˜çŠ¢ç¨ç£ç¦¿ç¯¤çº›è®€å¢©æƒ‡æ•¦æ—½æš¾æ²Œç„žç‡‰è±šé “ä¹­çªä»å†¬å‡å‹•åŒæ†§æ±æ¡æ£Ÿæ´žæ½¼ç–¼çž³ç«¥èƒ´è‘£éŠ…å…œæ–—æœæž“ç—˜ç«‡è³ï¥šè±†é€—é ­å±¯è‡€èŠšéé¯éˆå¾—å¶æ©™ç‡ˆç™»ç­‰è—¤è¬„é„§é¨°å–‡æ‡¶ï¥›ç™©ç¾…ï¿½"
		.split("");
	for (n = 0; n != t[212].length; ++n)
		if (t[212][n].charCodeAt(0) !== 65533) {
			r[t[212][n]] = 54272 + n;
			e[54272 + n] = t[212][n]
		}
	t[213] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è˜¿èžºè£¸é‚ï¥œæ´›çƒ™çžçµ¡è½ï¥é…ªé§±ï¥žäº‚åµæ¬„æ¬’ç€¾çˆ›è˜­é¸žå‰Œè¾£åµæ“¥æ”¬æ¬–æ¿«ç±ƒçºœè—è¥¤è¦½æ‹‰è‡˜è Ÿå»Šæœ—æµªç‹¼ç…ç‘¯èž‚éƒžä¾†å´å¾ èŠå†·æŽ ç•¥äº®å€†å…©å‡‰æ¢æ¨‘ç²®ç²±ç³§è‰¯è«’è¼›é‡ä¾¶å„·å‹µå‘‚å»¬æ…®æˆ¾æ—…æ«šæ¿¾ç¤ªè—œè £é–­é©¢é©ªéº—é»ŽåŠ›æ›†æ­·ç€ç¤«è½¢é‚æ†æˆ€æ”£æ¼£ï¿½"
		.split("");
	for (n = 0; n != t[213].length; ++n)
		if (t[213][n].charCodeAt(0) !== 65533) {
			r[t[213][n]] = 54528 + n;
			e[54528 + n] = t[213][n]
		}
	t[214] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç…‰ç’‰ç·´è¯è“®è¼¦é€£éŠå†½åˆ—åŠ£æ´Œçƒˆè£‚å»‰æ–‚æ®®æ¿‚ç°¾çµä»¤ä¼¶å›¹ï¥Ÿå²ºå¶ºæ€œçŽ²ç¬­ç¾šç¿Žè†é€žéˆ´é›¶éˆé ˜é½¡ä¾‹æ¾§ç¦®é†´éš·å‹žï¥ æ’ˆæ“„æ«“æ½žç€˜çˆç›§è€è˜†è™œè·¯è¼…éœ²é­¯é·ºé¹µç¢Œç¥¿ç¶ è‰éŒ„é¹¿éº“è«–å£Ÿå¼„æœ§ç€§ç“ç± è¾å„¡ç€¨ç‰¢ç£Šè³‚è³šè³´é›·äº†åƒšå¯®å»–æ–™ç‡Žç™‚çž­èŠè“¼ï¿½"
		.split("");
	for (n = 0; n != t[214].length; ++n)
		if (t[214][n].charCodeAt(0) !== 65533) {
			r[t[214][n]] = 54784 + n;
			e[54784 + n] = t[214][n]
		}
	t[215] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¼é¬§é¾å£˜å©å±¢æ¨“æ·šæ¼ç˜»ç´¯ç¸·è”žè¤¸é¤é™‹åŠ‰æ—’æŸ³æ¦´æµæºœç€ç‰ç‘ ç•™ç˜¤ç¡«è¬¬é¡žå…­æˆ®é™¸ä¾–å€«å´™æ·ªç¶¸è¼ªå¾‹æ…„æ —ï¥¡éš†å‹’è‚‹å‡œå‡Œæ¥žç¨œç¶¾è±é™µä¿šåˆ©åŽ˜åå”Žå±¥æ‚§æŽæ¢¨æµ¬çŠç‹¸ç†ç’ƒï¥¢ç—¢ç±¬ç½¹ç¾¸èŽ‰è£è£¡é‡Œé‡é›¢é¯‰åæ½¾ç‡ç’˜è—ºèºªéš£é±—éºŸæž—æ·‹ç³è‡¨éœ–ç ¬ï¿½"
		.split("");
	for (n = 0; n != t[215].length; ++n)
		if (t[215][n].charCodeAt(0) !== 65533) {
			r[t[215][n]] = 55040 + n;
			e[55040 + n] = t[215][n]
		}
	t[216] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç«‹ç¬ ç²’æ‘©ç‘ªç—²ç¢¼ç£¨é¦¬é­”éº»å¯žå¹•æ¼ è†œèŽ«é‚ˆä¸‡åå¨©å·’å½Žæ…¢æŒ½æ™©æ›¼æ»¿æ¼«ç£çžžè¬è”“è »è¼“é¥…é°»å”œæŠ¹æœ«æ²«èŒ‰è¥ªéºäº¡å¦„å¿˜å¿™æœ›ç¶²ç½”èŠ’èŒ«èŽ½è¼žé‚™åŸ‹å¦¹åª’å¯æ˜§æžšæ¢…æ¯ç…¤ç½µè²·è³£é‚é­…è„ˆè²Šé™Œé©€éº¥å­Ÿæ°“çŒ›ç›²ç›ŸèŒå†ªè¦“å…å†•å‹‰æ£‰æ²”çœ„çœ ç¶¿ç·¬é¢éºµæ»…ï¿½"
		.split("");
	for (n = 0; n != t[216].length; ++n)
		if (t[216][n].charCodeAt(0) !== 65533) {
			r[t[216][n]] = 55296 + n;
			e[55296 + n] = t[216][n]
		}
	t[217] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è”‘å†¥åå‘½æ˜Žæšæ¤§æºŸçš¿çž‘èŒ—è“‚èžŸé…©éŠ˜é³´è¢‚ä¾®å†’å‹Ÿå§†å¸½æ…•æ‘¸æ‘¹æš®æŸæ¨¡æ¯æ¯›ç‰Ÿç‰¡ç‘çœ¸çŸ›è€—èŠ¼èŒ…è¬€è¬¨è²Œæœ¨æ²ç‰§ç›®ç¦ç©†é¶©æ­¿æ²’å¤¢æœ¦è’™å¯å¢“å¦™å»Ÿææ˜´æ³æ¸ºçŒ«ç«—è‹—éŒ¨å‹™å·«æ†®æ‡‹æˆŠæ‹‡æ’«æ— ï¿½ï¿½æ­¦æ¯‹ç„¡ç·ç•ç¹†èˆžèŒ‚è•ªèª£è²¿éœ§éµ¡å¢¨é»˜å€‘åˆŽå»å•æ–‡ï¿½"
		.split("");
	for (n = 0; n != t[217].length; ++n)
		if (t[217][n].charCodeAt(0) !== 65533) {
			r[t[217][n]] = 55552 + n;
			e[55552 + n] = t[217][n]
		}
	t[218] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ±¶ç´Šç´‹èžèšŠé–€é›¯å‹¿æ²•ç‰©å‘³åªšå°¾åµ‹å½Œå¾®æœªæ¢¶æ¥£æ¸¼æ¹„çœ‰ç±³ç¾Žè–‡è¬Žè¿·é¡é»´å²·æ‚¶æ„æ†«æ•æ—»æ—¼æ°‘æ³¯çŽŸç‰ç·¡é–”å¯†èœœè¬å‰åšæ‹ææ’²æœ´æ¨¸æ³Šç€ç’žç®”ç²•ç¸›è†Šèˆ¶è–„è¿«é›¹é§ä¼´åŠåå›æ‹Œæ¬æ”€æ–‘æ§ƒæ³®æ½˜ç­ç•”ç˜¢ç›¤ç›¼ç£ç£»ç¤¬çµ†èˆ¬èŸ è¿”é ’é£¯å‹ƒæ‹”æ’¥æ¸¤æ½‘ï¿½"
		.split("");
	for (n = 0; n != t[218].length; ++n)
		if (t[218][n].charCodeAt(0) !== 65533) {
			r[t[218][n]] = 55808 + n;
			e[55808 + n] = t[218][n]
		}
	t[219] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç™¼è·‹é†±é‰¢é«®é­ƒå€£å‚åŠå¦¨å°¨å¹‡å½·æˆ¿æ”¾æ–¹æ—æ˜‰æž‹æ¦œæ»‚ç£…ç´¡è‚ªè†€èˆ«èŠ³è’¡èšŒè¨ªè¬—é‚¦é˜²é¾å€ä¿³ï¥£åŸ¹å¾˜æ‹œæŽ’æ¯æ¹ƒç„™ç›ƒèƒŒèƒšè£´è£µè¤™è³ è¼©é…é™ªä¼¯ä½°å¸›æŸæ ¢ç™½ç™¾é­„å¹¡æ¨Šç…©ç‡”ç•ªï¥¤ç¹è•ƒè—©é£œä¼ç­ç½°é–¥å‡¡å¸†æ¢µæ°¾æ±Žæ³›çŠ¯ç¯„èŒƒæ³•çºåƒ»åŠˆå£æ“˜æª—ç’§ç™–ï¿½"
		.split("");
	for (n = 0; n != t[219].length; ++n)
		if (t[219][n].charCodeAt(0) !== 65533) {
			r[t[219][n]] = 56064 + n;
			e[56064 + n] = t[219][n]
		}
	t[220] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¢§è˜—é—¢éœ¹ï¥¥åžå¼è®Šè¾¨è¾¯é‚Šåˆ¥çž¥é±‰é¼ˆä¸™å€‚å…µå±›å¹·æ˜žæ˜ºæŸ„æ£…ç‚³ç”ç—…ç§‰ç«è¼§é¤ é¨ˆä¿å ¡å ±å¯¶æ™®æ­¥æ´‘æ¹ºæ½½ç¤ç”«è©è£œè¤“è­œè¼”ä¼åƒ•åŒåœå®“å¾©æœç¦è…¹èŒ¯è””è¤‡è¦†è¼¹è¼»é¦¥é°’æœ¬ä¹¶ä¿¸å¥‰å°å³¯å³°æ§æ£’çƒ½ç†¢ç«ç¸«è“¬èœ‚é€¢é‹’é³³ä¸ä»˜ä¿¯å‚…å‰–å‰¯å¦å’åŸ å¤«å©¦ï¿½"
		.split("");
	for (n = 0; n != t[220].length; ++n)
		if (t[220][n].charCodeAt(0) !== 65533) {
			r[t[220][n]] = 56320 + n;
			e[56320 + n] = t[220][n]
		}
	t[221] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å­šå­µå¯Œåºœï¥¦æ‰¶æ•·æ–§æµ®æº¥çˆ¶ç¬¦ç°¿ç¼¶è…è…‘è†šè‰€èŠ™èŽ©è¨ƒè² è³¦è³»èµ´è¶ºéƒ¨é‡œé˜œé™„é§™é³§åŒ—åˆ†å©å™´å¢³å¥”å¥®å¿¿æ†¤æ‰®æ˜æ±¾ç„šç›†ç²‰ç³žç´›èŠ¬è³é›°ï¥§ä½›å¼—å½¿æ‹‚å´©æœ‹æ£šç¡¼ç¹ƒéµ¬ä¸•å‚™åŒ•åŒªå‘å¦ƒå©¢åº‡æ‚²æ†Šæ‰‰æ‰¹æ–æž‡æ¦§æ¯”æ¯–æ¯—æ¯˜æ²¸ï¥¨çµç—ºç ’ç¢‘ç§•ç§˜ç²ƒç·‹ç¿¡è‚¥ï¿½"
		.split("");
	for (n = 0; n != t[221].length; ++n)
		if (t[221][n].charCodeAt(0) !== 65533) {
			r[t[221][n]] = 56576 + n;
			e[56576 + n] = t[221][n]
		}
	t[222] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è„¾è‡‚è²èœšè£¨èª¹è­¬è²»é„™éžé£›é¼»åš¬å¬ªå½¬æ–Œæª³æ®¯æµœæ¿±ç€•ç‰çŽ­è²§è³“é »æ†‘æ°·è˜é¨ä¹äº‹äº›ä»•ä¼ºä¼¼ä½¿ä¿Ÿåƒ¿å²å¸å”†å—£å››å£«å¥¢å¨‘å¯«å¯ºå°„å·³å¸«å¾™æ€æ¨æ–œæ–¯æŸ¶æŸ»æ¢­æ­»æ²™æ³—æ¸£ç€‰ç…ç ‚ç¤¾ç¥€ç¥ ç§ç¯©ç´—çµ²è‚†èˆèŽŽè“‘è›‡è£Ÿè©è©žè¬è³œèµ¦è¾­é‚ªé£¼é§Ÿéºå‰Šï¥©æœ”ï¥ªï¿½"
		.split("");
	for (n = 0; n != t[222].length; ++n)
		if (t[222][n].charCodeAt(0) !== 65533) {
			r[t[222][n]] = 56832 + n;
			e[56832 + n] = t[222][n]
		}
	t[223] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å‚˜åˆªå±±æ•£æ±•çŠç”£ç–ç®—è’œé…¸éœ°ä¹·æ’’æ®ºç…žè–©ä¸‰ï¥«æ‰æ£®æ¸—èŠŸè”˜è¡«æ·æ¾éˆ’é¢¯ä¸Šå‚·åƒå„Ÿå•†å–ªå˜—å­€å°™å³ å¸¸åºŠåº å»‚æƒ³æ¡‘æ©¡æ¹˜çˆ½ç‰€ç‹€ç›¸ç¥¥ç®±ç¿”è£³è§´è©³è±¡è³žéœœå¡žç’½è³½å—‡ï¥¬ç©¡ç´¢è‰²ç‰²ç”Ÿç”¥ï¥­ç¬™å¢…å£»å¶¼åºåº¶å¾æ•æŠ’æ¿æ•æš‘æ›™æ›¸æ –æ£²çŠ€ç‘žç­®çµ®ç·–ç½²ï¿½"
		.split("");
	for (n = 0; n != t[223].length; ++n)
		if (t[223][n].charCodeAt(0) !== 65533) {
			r[t[223][n]] = 57088 + n;
			e[57088 + n] = t[223][n]
		}
	t[224] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èƒ¥èˆ’è–¯è¥¿èª“é€é‹¤é»é¼ å¤•å¥­å¸­æƒœæ˜”æ™³æžæ±æ·…æ½ŸçŸ³ç¢©è“†é‡‹éŒ«ä»™åƒŠå…ˆå–„å¬‹å®£æ‰‡æ•¾æ—‹æ¸²ç…½çç‘„ç’‡ç’¿ç™¬ç¦ªç·šç¹•ç¾¨è…ºè†³èˆ¹è˜šèŸ¬è©µè·£é¸éŠ‘é¥é¥é®®å¨å±‘æ¥”æ³„æ´©æ¸«èˆŒè–›è¤»è¨­èªªé›ªé½§å‰¡æš¹æ®²çº–èŸ¾è´é–ƒé™æ”æ¶‰ç‡®ï¥®åŸŽå§“å®¬æ€§æƒºæˆæ˜Ÿæ™ŸçŒ©ç¹ç››çœç­¬ï¿½"
		.split("");
	for (n = 0; n != t[224].length; ++n)
		if (t[224][n].charCodeAt(0) !== 65533) {
			r[t[224][n]] = 57344 + n;
			e[57344 + n] = t[224][n]
		}
	t[225] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è–è²è…¥èª é†’ä¸–å‹¢æ­²æ´—ç¨…ç¬¹ç´°ï¥¯è²°å¬å˜¯å¡‘å®µå°å°‘å·¢æ‰€æŽƒæ”æ˜­æ¢³æ²¼æ¶ˆæº¯ç€Ÿç‚¤ç‡’ç”¦ç–ç–Žç˜™ç¬‘ç¯ ç°«ç´ ç´¹è”¬è•­è˜‡è¨´é€é¡é‚µéŠ·éŸ¶é¨·ä¿—å±¬æŸæ¶‘ç²ŸçºŒè¬–è´–é€Ÿå­«å·½æè“€éœé£¡çŽ‡å®‹æ‚šæ¾æ·žè¨Ÿèª¦é€é Œåˆ·ï¥°ç‘ç¢ŽéŽ–è¡°é‡—ä¿®å—å—½å›šåž‚å£½å«‚å®ˆå²«å³€å¸¥æ„ï¿½"
		.split("");
	for (n = 0; n != t[225].length; ++n)
		if (t[225][n].charCodeAt(0) !== 65533) {
			r[t[225][n]] = 57600 + n;
			e[57600 + n] = t[225][n]
		}
	t[226] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æˆæ‰‹æŽˆæœæ”¶æ•¸æ¨¹æ®Šæ°´æ´™æ¼±ç‡§ç‹©ç¸ç‡ç’²ç˜¦ç¡ç§€ç©—ç«ªç²¹ç¶ç¶¬ç¹¡ç¾žè„©èŒ±è’è“šè—ªè¢–èª°è®è¼¸é‚é‚ƒé…¬éŠ–éŠ¹éš‹éš§éš¨é›–éœ€é ˆé¦–é«“é¬šå”å¡¾å¤™å­°å®¿æ·‘æ½šç†Ÿç¡ç’¹è‚…è½å·¡å¾‡å¾ªæ‚æ—¬æ ’æ¥¯æ©“æ®‰æ´µæ·³ç£ç›¾çž¬ç­ç´”è„£èˆœè€è“´è•£è©¢è«„é†‡éŒžé †é¦´æˆŒè¡“è¿°é‰¥å´‡å´§ï¿½"
		.split("");
	for (n = 0; n != t[226].length; ++n)
		if (t[226][n].charCodeAt(0) !== 65533) {
			r[t[226][n]] = 57856 + n;
			e[57856 + n] = t[226][n]
		}
	t[227] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åµ©ç‘Ÿè†è¨æ¿•æ‹¾ç¿’è¤¶è¥²ä¸žä¹˜åƒ§å‹å‡æ‰¿æ˜‡ç¹©è …é™žä¾åŒ™å˜¶å§‹åª¤å°¸å±Žå±å¸‚å¼‘æƒæ–½æ˜¯æ™‚æž¾æŸ´çŒœçŸ¢ç¤ºç¿…è’”è“è¦–è©¦è©©è«¡è±•è±ºåŸ´å¯”å¼æ¯æ‹­æ¤æ®–æ¹œç†„ç¯’è•è­˜è»¾é£Ÿé£¾ä¼¸ä¾ä¿¡å‘»å¨ å®¸æ„¼æ–°æ™¨ç‡¼ç”³ç¥žç´³è…Žè‡£èŽ˜è–ªè—Žèœƒè¨Šèº«è¾›ï¥±è¿…å¤±å®¤å¯¦æ‚‰å¯©å°‹å¿ƒæ²ï¿½"
		.split("");
	for (n = 0; n != t[227].length; ++n)
		if (t[227][n].charCodeAt(0) !== 65533) {
			r[t[227][n]] = 58112 + n;
			e[58112 + n] = t[227][n]
		}
	t[228] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¥²æ·±ç€‹ç”šèŠ¯è«¶ä»€åï¥³é›™æ°äºžä¿„å…’å•žå¨¥å³¨æˆ‘ç‰™èŠ½èŽªè›¾è¡™è¨é˜¿é›…é¤“é´‰éµå Šå²³å¶½å¹„æƒ¡æ„•æ¡æ¨‚æ¸¥é„‚é”é¡Žé°é½·å®‰å²¸æŒ‰æ™æ¡ˆçœ¼é›éžé¡”é®Ÿæ–¡è¬è»‹é–¼å”µå²©å·–åºµæš—ç™Œè´é—‡å£“æŠ¼ç‹Žé´¨ä»°å¤®æ€æ˜»æ®ƒç§§é´¦åŽ“å“€åŸƒå´–æ„›æ›–æ¶¯ç¢è‰¾éš˜é„åŽ„æ‰¼æŽ–æ¶²ç¸Šè…‹é¡ï¿½"
		.split("");
	for (n = 0; n != t[228].length; ++n)
		if (t[228][n].charCodeAt(0) !== 65533) {
			r[t[228][n]] = 58368 + n;
			e[58368 + n] = t[228][n]
		}
	t[229] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ«»ç½Œé¶¯é¸šä¹Ÿå€»å†¶å¤œæƒ¹æ¶æ¤°çˆºè€¶ï¥´é‡Žå¼±ï¥µï¥¶ç´„è‹¥è‘¯è’»è—¥èºï¥·ä½¯ï¥¸ï¥¹å£¤å­ƒæ™æšæ”˜æ•­æš˜ï¥ºæ¥Šæ¨£æ´‹ç€ç…¬ç—’ç˜ç¦³ç©°ï¥»ç¾Šï¥¼è¥„ï¥½è®“é‡€é™½ï¥¾é¤Šåœ„å¾¡æ–¼æ¼ç˜€ç¦¦èªžé¦­é­šé½¬å„„æ†¶æŠ‘æªè‡†åƒå °å½¦ç„‰è¨€è«ºå­¼è˜–ä¿ºå„¼åš´å¥„æŽ©æ·¹å¶ªæ¥­å††äºˆä½™ï¥¿ï¦€ï¦å¦‚ï¦‚ï¿½"
		.split("");
	for (n = 0; n != t[229].length; ++n)
		if (t[229][n].charCodeAt(0) !== 65533) {
			r[t[229][n]] = 58624 + n;
			e[58624 + n] = t[229][n]
		}
	t[230] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¦ƒæ­Ÿæ±ï¦„ç’µç¤–ï¦…èˆ‡è‰…èŒ¹è¼¿è½ï¦†é¤˜ï¦‡ï¦ˆï¦‰äº¦ï¦ŠåŸŸå½¹æ˜“ï¦‹ï¦Œç–«ç¹¹è­¯ï¦é€†é©›åš¥å §å§¸å¨Ÿå®´ï¦Žå»¶ï¦ï¦ææŒ»ï¦‘æ¤½æ²‡æ²¿æ¶Žæ¶“æ·µæ¼”ï¦’çƒŸç„¶ç…™ï¦“ç‡ƒç‡•ï¦”ç¡ç¡¯ï¦•ç­µç·£ï¦–ç¸¯ï¦—è¡è»Ÿï¦˜ï¦™ï¦šé‰›ï¦›é³¶ï¦œï¦ï¦žæ‚…æ¶…ï¦Ÿç†±ï¦ ï¦¡é–±åŽ­ï¦¢ï¦£ï¦¤æŸ“ï¦¥ç‚Žç„°ç°è‰¶è‹’ï¿½"
		.split("");
	for (n = 0; n != t[230].length; ++n)
		if (t[230][n].charCodeAt(0) !== 65533) {
			r[t[230][n]] = 58880 + n;
			e[58880 + n] = t[230][n]
		}
	t[231] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¦¦é–»é«¥é¹½æ›„ï¦§ç‡è‘‰ï¦¨ï¦©å¡‹ï¦ªï¦«å¶¸å½±ï¦¬æ˜ æšŽæ¥¹æ¦®æ°¸æ³³æ¸¶æ½æ¿šç€›ç€¯ç…ç‡Ÿç°ï¦­ç‘›ï¦®ç“”ç›ˆç©Žçº“ï¦¯ï¦°è‹±è© è¿Žï¦±éˆï¦²éœ™ï¦³ï¦´ä¹‚å€ªï¦µåˆˆå¡æ›³æ±­æ¿ŠçŒŠç¿ç©¢èŠ®è—è˜‚ï¦¶è£”è©£è­½è±«ï¦·éŠ³ï¦¸éœ“é äº”ä¼ä¿‰å‚²åˆå¾å³å—šå¡¢å¢ºå¥§å¨›å¯¤æ‚Ÿï¦¹æ‡Šæ•–æ—¿æ™¤æ¢§æ±šæ¾³ï¿½"
		.split("");
	for (n = 0; n != t[231].length; ++n)
		if (t[231][n].charCodeAt(0) !== 65533) {
			r[t[231][n]] = 59136 + n;
			e[59136 + n] = t[231][n]
		}
	t[232] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çƒç†¬ç’ç­½èœˆèª¤é°²é¼‡å±‹æ²ƒç„çŽ‰éˆºæº«ç‘¥ç˜Ÿç©©ç¸•è˜Šå…€å£…æ“ç“®ç”•ç™°ç¿é‚•é›é¥”æ¸¦ç“¦çª©çªªè‡¥è›™è¸è¨›å©‰å®Œå®›æ¢¡æ¤€æµ£çŽ©ç“ç¬ç¢—ç·©ç¿«è„˜è…•èŽžè±Œé˜®é ‘æ›°å¾€æ—ºæž‰æ±ªçŽ‹å€­å¨ƒæ­ªçŸ®å¤–åµ¬å·çŒ¥ç•ï¦ºï¦»åƒ¥å‡¹å ¯å¤­å¦–å§šå¯¥ï¦¼ï¦½å¶¢æ‹—æ–æ’“æ“¾ï¦¾æ›œï¦¿æ©ˆï§€ç‡¿ç‘¤ï§ï¿½"
		.split("");
	for (n = 0; n != t[232].length; ++n)
		if (t[232][n].charCodeAt(0) !== 65533) {
			r[t[232][n]] = 59392 + n;
			e[59392 + n] = t[232][n]
		}
	t[233] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çªˆçª¯ç¹‡ç¹žè€€è…°ï§‚èŸ¯è¦è¬ é™ï§ƒé‚€é¥’æ…¾æ¬²æµ´ç¸Ÿè¤¥è¾±ä¿‘å‚­å†—å‹‡åŸ‡å¢‰å®¹åº¸æ…‚æ¦•æ¶Œæ¹§æº¶ç†”ç‘¢ç”¨ç”¬è³èŒ¸è“‰è¸ŠéŽ”éžï§„äºŽä½‘å¶å„ªåˆå‹å³å®‡å¯“å°¤æ„šæ†‚æ—´ç‰›çŽ—ç‘€ç›‚ç¥ç¦‘ç¦¹ç´†ç¾½èŠ‹è—•è™žè¿‚é‡éƒµé‡ªéš…é›¨é›©å‹–å½§æ—­æ˜±æ ¯ç…œç¨¶éƒé Šäº‘ï§…æ©’æ®žæ¾ç†‰è€˜èŠ¸è•“ï¿½"
		.split("");
	for (n = 0; n != t[233].length; ++n)
		if (t[233][n].charCodeAt(0) !== 65533) {
			r[t[233][n]] = 59648 + n;
			e[59648 + n] = t[233][n]
		}
	t[234] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é‹éš•é›²éŸ»è”šé¬±äºç†Šé›„å…ƒåŽŸå“¡åœ“åœ’åž£åª›å«„å¯ƒæ€¨æ„¿æ´æ²…æ´¹æ¹²æºçˆ°çŒ¿ç‘—è‹‘è¢è½…é ï§†é™¢é¡˜é´›æœˆè¶Šé‰žä½å‰åƒžå±åœå§”å¨å°‰æ…°æšæ¸­çˆ²ç‘‹ç·¯èƒƒèŽè‘¦è”¿èŸè¡›è¤˜è¬‚é•éŸ‹é­ä¹³ä¾‘å„’å…ªï§‡å”¯å–©å­ºå®¥å¹¼å¹½åº¾æ‚ æƒŸæ„ˆæ„‰æ„æ”¸æœ‰ï§ˆæŸ”æŸšï§‰æ¥¡æ¥¢æ²¹æ´§ï§Šæ¸¸ï§‹ï¿½"
		.split("");
	for (n = 0; n != t[234].length; ++n)
		if (t[234][n].charCodeAt(0) !== 65533) {
			r[t[234][n]] = 59904 + n;
			e[59904 + n] = t[234][n]
		}
	t[235] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¿¡çŒ¶çŒ·ï§Œç‘œç”±ï§ç™’ï§Žï§ç¶­è‡¾è¸è£•èª˜è«›è«­è¸°è¹‚éŠé€¾éºé…‰é‡‰é®ï§ï§‘å ‰ï§’æ¯“è‚‰è‚²ï§“ï§”å…å¥«å°¹ï§•ï§–æ½¤çŽ§èƒ¤è´‡ï§—éˆ—é–ï§˜ï§™ï§šï§›è¿æˆŽç€œçµ¨èžï§œåž æ©æ…‡æ®·èª¾éŠ€éš±ä¹™åŸæ·«è”­é™°éŸ³é£®æ–æ³£é‚‘å‡æ‡‰è†ºé·¹ä¾å€šå„€å®œæ„æ‡¿æ“¬æ¤…æ¯…ç–‘çŸ£ç¾©è‰¤è–èŸ»è¡£èª¼ï¿½"
		.split("");
	for (n = 0; n != t[235].length; ++n)
		if (t[235][n].charCodeAt(0) !== 65533) {
			r[t[235][n]] = 60160 + n;
			e[60160 + n] = t[235][n]
		}
	t[236] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è­°é†«äºŒä»¥ä¼Šï§ï§žå¤·å§¨ï§Ÿå·²å¼›å½›æ€¡ï§ ï§¡ï§¢ï§£çˆ¾ç¥ï§¤ç•°ç—ï§¥ç§»ï§¦è€Œè€³è‚„è‹¡è‘ï§§ï§¨è²½è²³é‚‡ï§©ï§ªé£´é¤Œï§«ï§¬ç€·ç›Šç¿Šç¿Œç¿¼è¬šäººä»åˆƒå°ï§­å’½å› å§»å¯…å¼•å¿æ¹®ï§®ï§¯çµªèŒµï§°èš“èªï§±é­é·ï§²ï§³ä¸€ä½šä½¾å£¹æ—¥æº¢é€¸éŽ°é¦¹ä»»å£¬å¦Šå§™æï§´ï§µç¨”ï§¶èè³ƒå…¥å„ï¿½"
		.split("");
	for (n = 0; n != t[236].length; ++n)
		if (t[236][n].charCodeAt(0) !== 65533) {
			r[t[236][n]] = 60416 + n;
			e[60416 + n] = t[236][n]
		}
	t[237] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï§·ï§¸ï§¹ä»å‰©å­•èŠ¿ä»”åˆºå’¨å§‰å§¿å­å­—å­œæ£æ…ˆæ»‹ç‚™ç…®çŽ†ç“·ç–µç£ç´«è€…è‡ªèŒ¨è”—è—‰è«®è³‡é›Œä½œå‹ºåš¼æ–«æ˜¨ç¼ç‚¸çˆµç¶½èŠé…Œé›€éµ²å­±æ£§æ®˜æ½ºç›žå²‘æš«æ½›ç®´ç°ªè ¶é›œä¸ˆä»—åŒ å ´å¢»å£¯å¥¬å°‡å¸³åº„å¼µæŽŒæš²æ–æ¨Ÿæª£æ¬Œæ¼¿ç‰†ï§ºçç’‹ç« ç²§è…¸è‡Ÿè‡§èŽŠè‘¬è”£è–”è—è£è´“é†¬é•·ï¿½"
		.split("");
	for (n = 0; n != t[237].length; ++n)
		if (t[237][n].charCodeAt(0) !== 65533) {
			r[t[237][n]] = 60672 + n;
			e[60672 + n] = t[237][n]
		}
	t[238] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éšœå†å“‰åœ¨å®°æ‰ææ ½æ¢“æ¸½æ»“ç½ç¸¡è£è²¡è¼‰é½‹é½Žçˆ­ç®è«éŒšä½‡ä½Žå„²å’€å§åº•æŠµæµæ¥®æ¨—æ²®æ¸šç‹™çŒªç–½ç®¸ç´µè‹§è¹è‘—è—·è©›è²¯èº‡é€™é‚¸é›Žé½Ÿå‹£åŠå«¡å¯‚æ‘˜æ•µæ»´ç‹„ï§»çš„ç©ç¬›ç±ç¸¾ç¿Ÿè»è¬«è³Šèµ¤è·¡è¹Ÿè¿ªè¿¹é©é‘ä½ƒä½ºå‚³å…¨å…¸å‰å‰ªå¡¡å¡¼å¥ å°ˆå±•å»›æ‚›æˆ°æ “æ®¿æ°ˆæ¾±ï¿½"
		.split("");
	for (n = 0; n != t[238].length; ++n)
		if (t[238][n].charCodeAt(0) !== 65533) {
			r[t[238][n]] = 60928 + n;
			e[60928 + n] = t[238][n]
		}
	t[239] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç…Žç ç”°ç”¸ç•‘ç™²ç­Œç®‹ç®­ç¯†çºè©®è¼¾è½‰éˆ¿éŠ“éŒ¢é«é›»é¡šé¡«é¤žåˆ‡æˆªæŠ˜æµ™ç™¤ç«Šç¯€çµ¶å å²¾åº—æ¼¸ç‚¹ç²˜éœ‘é®Žé»žæŽ¥æ‘ºè¶ä¸äº•äº­åœåµå‘ˆå§ƒå®šå¹€åº­å»·å¾æƒ…æŒºæ”¿æ•´æ—Œæ™¶æ™¸æŸ¾æ¥¨æª‰æ­£æ±€æ·€æ·¨æ¸Ÿæ¹žç€žç‚¡çŽŽç½ç”ºç›ç¢‡ç¦Žç¨‹ç©½ç²¾ç¶Žè‰‡è¨‚è«ªè²žé„­é…Šé‡˜é‰¦é‹ŒéŒ éœ†é–ï¿½"
		.split("");
	for (n = 0; n != t[239].length; ++n)
		if (t[239][n].charCodeAt(0) !== 65533) {
			r[t[239][n]] = 61184 + n;
			e[61184 + n] = t[239][n]
		}
	t[240] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éœé ‚é¼Žåˆ¶åŠ‘å•¼å ¤å¸å¼Ÿæ‚Œææ¢¯æ¿Ÿç¥­ç¬¬è‡è–ºè£½è«¸è¹„é†é™¤éš›éœ½é¡Œé½Šä¿Žå…†å‡‹åŠ©å˜²å¼”å½«æŽªæ“æ—©æ™æ›ºæ›¹æœæ¢æ£—æ§½æ¼•æ½®ç…§ç‡¥çˆªç’ªçœºç¥–ç¥šç§Ÿç¨ çª•ç²—ç³Ÿçµ„ç¹°è‚‡è—»èš¤è©”èª¿è¶™èºé€ é­é‡£é˜»é›•é³¥æ—ç°‡è¶³éƒå­˜å°Šå’æ‹™çŒå€§å®—å¾žæ‚°æ…«æ£•æ·™ç®ç¨®çµ‚ç¶œç¸±è…«ï¿½"
		.split("");
	for (n = 0; n != t[240].length; ++n)
		if (t[240][n].charCodeAt(0) !== 65533) {
			r[t[240][n]] = 61440 + n;
			e[61440 + n] = t[240][n]
		}
	t[241] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¸ªè¸µé¾é˜ä½åå·¦åº§æŒ«ç½ªä¸»ä½ä¾åšå§èƒ„å‘ªå‘¨å—¾å¥å®™å·žå»šæ™æœ±æŸ±æ ªæ³¨æ´²æ¹Šæ¾ç‚·ç ç–‡ç±Œç´‚ç´¬ç¶¢èˆŸè››è¨»èª…èµ°èºŠè¼³é€±é…Žé…’é‘„é§ç«¹ç²¥ä¿Šå„å‡†åŸˆå¯¯å³»æ™™æ¨½æµšæº–æ¿¬ç„Œç•¯ç«£è ¢é€¡éµé›‹é§¿èŒä¸­ä»²è¡†é‡å½æ«›æ¥«æ±è‘ºå¢žæ†Žæ›¾æ‹¯çƒç”‘ç—‡ç¹’è’¸è­‰è´ˆä¹‹åªï¿½"
		.split("");
	for (n = 0; n != t[241].length; ++n)
		if (t[241][n].charCodeAt(0) !== 65533) {
			r[t[241][n]] = 61696 + n;
			e[61696 + n] = t[241][n]
		}
	t[242] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å’«åœ°å€å¿—æŒæŒ‡æ‘¯æ”¯æ—¨æ™ºæžæž³æ­¢æ± æ²šæ¼¬çŸ¥ç ¥ç¥‰ç¥—ç´™è‚¢è„‚è‡³èŠèŠ·èœ˜èªŒï§¼è´„è¶¾é²ç›´ç¨™ç¨·ç¹”è·å”‡å—”å¡µæŒ¯æ¢æ™‰æ™‹æ¡­æ¦›æ®„æ´¥æº±çç‘¨ç’¡ç•›ç–¹ç›¡çœžçž‹ç§¦ç¸‰ç¸è‡»è”¯è¢—è¨ºè³‘è»«è¾°é€²éŽ­é™£é™³éœ‡ä¾„å±å§ªå«‰å¸™æ¡Žç“†ç–¾ç§©çª’è†£è›­è³ªè·Œè¿­æ–Ÿæœ•ï§½åŸ·æ½—ç·è¼¯ï¿½"
		.split("");
	for (n = 0; n != t[242].length; ++n)
		if (t[242][n].charCodeAt(0) !== 65533) {
			r[t[242][n]] = 61952 + n;
			e[61952 + n] = t[242][n]
		}
	t[243] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¶é›†å¾µæ‡²æ¾„ä¸”ä¾˜å€Ÿå‰å—Ÿåµ¯å·®æ¬¡æ­¤ç£‹ç®šï§¾è¹‰è»Šé®æ‰æ¾ç€çª„éŒ¯é‘¿é½ªæ’°æ¾¯ç‡¦ç’¨ç“šç«„ç°’çº‚ç²²çº˜è®šè´Šé‘½é¤é¥Œåˆ¹å¯Ÿæ“¦æœ­ç´®åƒ­åƒå¡¹æ…˜æ…™æ‡ºæ–¬ç«™è®’è®–å€‰å€¡å‰µå”±å¨¼å» å½°æ„´æ•žæ˜Œæ˜¶æš¢æ§æ»„æ¼²çŒ–ç˜¡çª“è„¹è‰™è–è’¼å‚µåŸ°å¯€å¯¨å½©æŽ¡ç ¦ç¶µèœè”¡é‡‡é‡µå†ŠæŸµç­–ï¿½"
		.split("");
	for (n = 0; n != t[243].length; ++n)
		if (t[243][n].charCodeAt(0) !== 65533) {
			r[t[243][n]] = 62208 + n;
			e[62208 + n] = t[243][n]
		}
	t[244] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è²¬å‡„å¦»æ‚½è™•å€œï§¿å‰”å°ºæ…½æˆšæ‹“æ“²æ–¥æ»Œç˜ è„Šè¹ é™Ÿéš»ä»Ÿåƒå–˜å¤©å·æ“…æ³‰æ·ºçŽ”ç©¿èˆ›è–¦è³¤è¸é·é‡§é—¡é˜¡éŸ†å‡¸å“²å–†å¾¹æ’¤æ¾ˆç¶´è¼Ÿè½éµåƒ‰å°–æ²¾æ·»ç”›çž»ç°½ç±¤è©¹è«‚å žå¦¾å¸–æ·ç‰’ç–Šç«è«œè²¼è¼’å»³æ™´æ·¸è½èè«‹é‘é¯–ï¨€å‰ƒæ›¿æ¶•æ»¯ç· è«¦é€®éžé«”åˆå‰¿å“¨æ†”æŠ„æ‹›æ¢¢ï¿½"
		.split("");
	for (n = 0; n != t[244].length; ++n)
		if (t[244][n].charCodeAt(0) !== 65533) {
			r[t[244][n]] = 62464 + n;
			e[62464 + n] = t[244][n]
		}
	t[245] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¤’æ¥šæ¨µç‚’ç„¦ç¡ç¤ç¤Žç§’ç¨è‚–è‰¸è‹•è‰è•‰è²‚è¶…é…¢é†‹é†®ä¿ƒå›‘ç‡­çŸ—èœ€è§¸å¯¸å¿–æ‘é‚¨å¢å¡šå¯µæ‚¤æ†æ‘ ç¸½è°è”¥éŠƒæ’®å‚¬å´”æœ€å¢œæŠ½æŽ¨æ¤Žæ¥¸æ¨žæ¹«çšºç§‹èŠ»è©è«è¶¨è¿½é„’é…‹é†œéŒéŒ˜éŽšé››é¨¶é°ä¸‘ç•œç¥ç«ºç­‘ç¯‰ç¸®è“„è¹™è¹´è»¸é€æ˜¥æ¤¿ç‘ƒå‡ºæœ®é»œå……å¿ æ²–èŸ²è¡è¡·æ‚´è†µèƒï¿½"
		.split("");
	for (n = 0; n != t[245].length; ++n)
		if (t[245][n].charCodeAt(0) !== 65533) {
			r[t[245][n]] = 62720 + n;
			e[62720 + n] = t[245][n]
		}
	t[246] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è´…å–å¹å˜´å¨¶å°±ç‚Šç¿ èšè„†è‡­è¶£é†‰é©Ÿé·²å´ä»„åŽ æƒ»æ¸¬å±¤ä¾ˆå€¤å—¤å³™å¹Ÿæ¥æ¢”æ²»æ·„ç†¾ç—”ç—´ç™¡ç¨šç©‰ç·‡ç·»ç½®è‡´èš©è¼œé›‰é¦³é½’å‰‡å‹…é£­è¦ªä¸ƒæŸ’æ¼†ä¾µå¯¢æž•æ²ˆæµ¸ç›ç §é‡é¼èŸ„ç§¤ç¨±å¿«ä»–å’¤å”¾å¢®å¦¥æƒ°æ‰“æ‹–æœ¶æ¥•èˆµé™€é¦±é§å€¬å“å•„å¼ï¨æ‰˜ï¨‚æ“¢æ™«æŸæ¿æ¿¯ç¢ç¸è¨—ï¿½"
		.split("");
	for (n = 0; n != t[246].length; ++n)
		if (t[246][n].charCodeAt(0) !== 65533) {
			r[t[246][n]] = 62976 + n;
			e[62976 + n] = t[246][n]
		}
	t[247] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¸å‘‘å˜†å¦å½ˆæ†šæ­Žç˜ç‚­ç¶»èª•å¥ªè„«æŽ¢çœˆè€½è²ªå¡”æ­æ¦»å®•å¸‘æ¹¯ï¨ƒè•©å…Œå°å¤ªæ€ æ…‹æ®†æ±°æ³°ç¬žèƒŽè‹”è·†é‚°é¢±ï¨„æ“‡æ¾¤æ’‘æ”„å…ŽååœŸè¨Žæ…Ÿæ¡¶ï¨…ç—›ç­’çµ±é€šå †æ§Œè…¿è¤ªé€€é ¹å¸å¥—å¦¬æŠ•é€é¬ªæ…ç‰¹é—–å¡å©†å·´æŠŠæ’­æ“ºæ·æ³¢æ´¾çˆ¬ç¶ç ´ç½·èŠ­è·›é —åˆ¤å‚æ¿ç‰ˆç“£è²©è¾¦éˆ‘ï¿½"
		.split("");
	for (n = 0; n != t[247].length; ++n)
		if (t[247][n].charCodeAt(0) !== 65533) {
			r[t[247][n]] = 63232 + n;
			e[63232 + n] = t[247][n]
		}
	t[248] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é˜ªå…«å­æŒä½©å”„æ‚–æ•—æ²›æµ¿ç‰Œç‹½ç¨—è¦‡è²å½­æ¾Žçƒ¹è†¨æ„Žä¾¿åæ‰ç‰‡ç¯‡ç·¨ç¿©ééž­é¨™è²¶åªå¹³æž°èè©•å å¬–å¹£å»¢å¼Šæ–ƒè‚ºè”½é–‰é™›ä½ˆåŒ…åŒåŒå’†å“ºåœƒå¸ƒæ€–æŠ›æŠ±æ•ï¨†æ³¡æµ¦ç–±ç ²èƒžè„¯è‹žè‘¡è’²è¢è¤’é€‹é‹ªé£½é®‘å¹…æš´æ›ç€‘çˆ†ï¨‡ä¿µå‰½å½ªæ…“æ“æ¨™æ¼‚ç“¢ç¥¨è¡¨è±¹é£‡é£„é©ƒï¿½"
		.split("");
	for (n = 0; n != t[248].length; ++n)
		if (t[248][n].charCodeAt(0) !== 65533) {
			r[t[248][n]] = 63488 + n;
			e[63488 + n] = t[248][n]
		}
	t[249] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å“ç¨Ÿæ¥“è«·è±Šé¢¨é¦®å½¼æŠ«ç–²çš®è¢«é¿é™‚åŒ¹å¼¼å¿…æ³ŒçŒç•¢ç–‹ç­†è‹¾é¦ä¹é€¼ä¸‹ä½•åŽ¦å¤å»ˆæ˜°æ²³ç‘•è·è¦è³€ééœžé°•å£‘å­¸è™è¬”é¶´å¯’æ¨æ‚æ—±æ±—æ¼¢æ¾£ç€šç½•ç¿°é–‘é–’é™éŸ“å‰²è½„å‡½å«å’¸å•£å–Šæª»æ¶µç·˜è‰¦éŠœé™·é¹¹åˆå“ˆç›’è›¤é–¤é—”é™œäº¢ä¼‰å§®å«¦å··æ’æŠ—æ­æ¡æ²†æ¸¯ç¼¸è‚›èˆªï¿½"
		.split("");
	for (n = 0; n != t[249].length; ++n)
		if (t[249][n].charCodeAt(0) !== 65533) {
			r[t[249][n]] = 63744 + n;
			e[63744 + n] = t[249][n]
		}
	t[250] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¨ˆï¨‰é …äº¥å•å’³åž“å¥šå­©å®³æ‡ˆæ¥·æµ·ç€£èŸ¹è§£è©²è«§é‚‚é§­éª¸åŠ¾æ ¸å€–å¹¸æè‡è¡Œäº«å‘åš®ç¦é„•éŸ¿é¤‰é¥—é¦™å™“å¢Ÿè™›è¨±æ†²æ«¶ç»è»’æ­‡éšªé©—å¥•çˆ€èµ«é©ä¿”å³´å¼¦æ‡¸æ™›æ³«ç‚«çŽ„çŽ¹ç¾çœ©ççµƒçµ¢ç¸£èˆ·è¡’ï¨Šè³¢é‰‰é¡¯å­‘ç©´è¡€é å«Œä¿ å”å¤¾å³½æŒ¾æµ¹ç‹¹è„…è„‡èŽ¢é‹é °äº¨å…„åˆ‘åž‹ï¿½"
		.split("");
	for (n = 0; n != t[250].length; ++n)
		if (t[250][n].charCodeAt(0) !== 65533) {
			r[t[250][n]] = 64e3 + n;
			e[64e3 + n] = t[250][n]
		}
	t[251] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å½¢æ³‚æ»Žç€…çç‚¯ç†’ç©ç‘©èŠèž¢è¡¡é€ˆé‚¢éŽ£é¦¨å…®å½—æƒ æ…§æš³è•™è¹Šé†¯éž‹ä¹Žäº’å‘¼å£•å£ºå¥½å²µå¼§æˆ¶æ‰ˆæ˜Šæ™§æ¯«æµ©æ·æ¹–æ»¸æ¾”æ¿ æ¿©çç‹ç¥ç‘šç“ çš“ç¥œç³Šç¸žèƒ¡èŠ¦è‘«è’¿è™Žè™Ÿè´è­·è±ªéŽ¬é €é¡¥æƒ‘æˆ–é…·å©šæ˜æ··æ¸¾ç¿é­‚å¿½æƒšç¬å“„å¼˜æ±žæ³“æ´ªçƒ˜ç´…è™¹è¨Œé´»åŒ–å’Œå¬…æ¨ºç«ç•µï¿½"
		.split("");
	for (n = 0; n != t[251].length; ++n)
		if (t[251][n].charCodeAt(0) !== 65533) {
			r[t[251][n]] = 64256 + n;
			e[64256 + n] = t[251][n]
		}
	t[252] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¦ç¦¾èŠ±è¯è©±è­è²¨é´ï¨‹æ“´æ”«ç¢ºç¢»ç©«ä¸¸å–šå¥å®¦å¹»æ‚£æ›æ­¡æ™¥æ¡“æ¸™ç…¥ç’°ç´ˆé‚„é©©é°¥æ´»æ»‘çŒ¾è±é—Šå‡°å¹Œå¾¨ææƒ¶æ„°æ…Œæ™ƒæ™„æ¦¥æ³æ¹Ÿæ»‰æ½¢ç…Œç’œçš‡ç¯ç°§è’è—é‘éšé»ƒåŒ¯å›žå»»å¾Šæ¢æ‚”æ‡·æ™¦æœƒæªœæ·®æ¾®ç°çªç¹ªè†¾èŒ´è›”èª¨è³„åŠƒç²å®–æ©«é„å“®åš†å­æ•ˆæ–…æ›‰æ¢Ÿæ¶æ·†ï¿½"
		.split("");
	for (n = 0; n != t[252].length; ++n)
		if (t[252][n].charCodeAt(0) !== 65533) {
			r[t[252][n]] = 64512 + n;
			e[64512 + n] = t[252][n]
		}
	t[253] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çˆ»è‚´é…µé©ä¾¯å€™åŽšåŽå¼å–‰å—…å¸¿å¾Œæœ½ç…¦çé€…å‹›å‹³å¡¤å£Žç„„ç†ç‡»è–°è¨“æšˆè–¨å–§æš„ç…Šè±å‰å–™æ¯å½™å¾½æ®æš‰ç…‡è«±è¼éº¾ä¼‘æºçƒ‹ç•¦è™§æ¤è­Žé·¸å…‡å‡¶åŒˆæ´¶èƒ¸é»‘æ˜•æ¬£ç‚˜ç—•åƒå±¹ç´‡è¨–æ¬ æ¬½æ­†å¸æ°æ´½ç¿•èˆˆåƒ–å‡žå–œå™«å›å§¬å¬‰å¸Œæ†™æ†˜æˆ±æ™žæ›¦ç†™ç†¹ç†ºçŠ§ç¦§ç¨€ç¾²è©°ï¿½"
		.split("");
	for (n = 0; n != t[253].length; ++n)
		if (t[253][n].charCodeAt(0) !== 65533) {
			r[t[253][n]] = 64768 + n;
			e[64768 + n] = t[253][n]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[950] = function () {
	var e = [],
		r = {},
		t = [],
		n;
	t[0] =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[0].length; ++n)
		if (t[0][n].charCodeAt(0) !== 65533) {
			r[t[0][n]] = 0 + n;
			e[0 + n] = t[0][n]
		}
	t[161] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã€€ï¼Œã€ã€‚ï¼Žâ€§ï¼›ï¼šï¼Ÿï¼ï¸°â€¦â€¥ï¹ï¹‘ï¹’Â·ï¹”ï¹•ï¹–ï¹—ï½œâ€“ï¸±â€”ï¸³â•´ï¸´ï¹ï¼ˆï¼‰ï¸µï¸¶ï½›ï½ï¸·ï¸¸ã€”ã€•ï¸¹ï¸ºã€ã€‘ï¸»ï¸¼ã€Šã€‹ï¸½ï¸¾ã€ˆã€‰ï¸¿ï¹€ã€Œã€ï¹ï¹‚ã€Žã€ï¹ƒï¹„ï¹™ï¹šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¹›ï¹œï¹ï¹žâ€˜â€™â€œâ€ã€ã€žâ€µâ€²ï¼ƒï¼†ï¼Šâ€»Â§ã€ƒâ—‹â—â–³â–²â—Žâ˜†â˜…â—‡â—†â–¡â– â–½â–¼ãŠ£â„…Â¯ï¿£ï¼¿Ëï¹‰ï¹Šï¹ï¹Žï¹‹ï¹Œï¹Ÿï¹ ï¹¡ï¼‹ï¼Ã—Ã·Â±âˆšï¼œï¼žï¼â‰¦â‰§â‰ âˆžâ‰’â‰¡ï¹¢ï¹£ï¹¤ï¹¥ï¹¦ï½žâˆ©âˆªâŠ¥âˆ âˆŸâŠ¿ã’ã‘âˆ«âˆ®âˆµâˆ´â™€â™‚âŠ•âŠ™â†‘â†“â†â†’â†–â†—â†™â†˜âˆ¥âˆ£ï¼ï¿½"
		.split("");
	for (n = 0; n != t[161].length; ++n)
		if (t[161][n].charCodeAt(0) !== 65533) {
			r[t[161][n]] = 41216 + n;
			e[41216 + n] = t[161][n]
		}
	t[162] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¼¼âˆ•ï¹¨ï¼„ï¿¥ã€’ï¿ ï¿¡ï¼…ï¼ â„ƒâ„‰ï¹©ï¹ªï¹«ã•ãŽœãŽãŽžãŽãŽ¡ãŽŽãŽã„Â°å…™å…›å…žå…å…¡å…£å—§ç“©ç³Žâ–â–‚â–ƒâ–„â–…â–†â–‡â–ˆâ–â–Žâ–â–Œâ–‹â–Šâ–‰â”¼â”´â”¬â”¤â”œâ–”â”€â”‚â–•â”Œâ”â””â”˜â•­ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â•®â•°â•¯â•â•žâ•ªâ•¡â—¢â—£â—¥â—¤â•±â•²â•³ï¼ï¼‘ï¼’ï¼“ï¼”ï¼•ï¼–ï¼—ï¼˜ï¼™â… â…¡â…¢â…£â…¤â…¥â…¦â…§â…¨â…©ã€¡ã€¢ã€£ã€¤ã€¥ã€¦ã€§ã€¨ã€©åå„å…ï¼¡ï¼¢ï¼£ï¼¤ï¼¥ï¼¦ï¼§ï¼¨ï¼©ï¼ªï¼«ï¼¬ï¼­ï¼®ï¼¯ï¼°ï¼±ï¼²ï¼³ï¼´ï¼µï¼¶ï¼·ï¼¸ï¼¹ï¼ºï½ï½‚ï½ƒï½„ï½…ï½†ï½‡ï½ˆï½‰ï½Šï½‹ï½Œï½ï½Žï½ï½ï½‘ï½’ï½“ï½”ï½•ï½–ï¿½"
		.split("");
	for (n = 0; n != t[162].length; ++n)
		if (t[162][n].charCodeAt(0) !== 65533) {
			r[t[162][n]] = 41472 + n;
			e[41472 + n] = t[162][n]
		}
	t[163] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï½—ï½˜ï½™ï½šÎ‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡Î£Î¤Î¥Î¦Î§Î¨Î©Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰ã„…ã„†ã„‡ã„ˆã„‰ã„Šã„‹ã„Œã„ã„Žã„ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã„ã„‘ã„’ã„“ã„”ã„•ã„–ã„—ã„˜ã„™ã„šã„›ã„œã„ã„žã„Ÿã„ ã„¡ã„¢ã„£ã„¤ã„¥ã„¦ã„§ã„¨ã„©Ë™Ë‰ËŠË‡Ë‹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â‚¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[163].length; ++n)
		if (t[163][n].charCodeAt(0) !== 65533) {
			r[t[163][n]] = 41728 + n;
			e[41728 + n] = t[163][n]
		}
	t[164] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¸€ä¹™ä¸ä¸ƒä¹ƒä¹äº†äºŒäººå„¿å…¥å…«å‡ åˆ€åˆåŠ›åŒ•ååœåˆä¸‰ä¸‹ä¸ˆä¸Šä¸«ä¸¸å‡¡ä¹…ä¹ˆä¹Ÿä¹žäºŽäº¡å…€åˆƒå‹ºåƒå‰å£åœŸå£«å¤•å¤§å¥³å­å­‘å­“å¯¸å°å°¢å°¸å±±å·å·¥å·±å·²å·³å·¾å¹²å»¾å¼‹å¼“æ‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¸‘ä¸ä¸ä¸­ä¸°ä¸¹ä¹‹å°¹äºˆäº‘äº•äº’äº”äº¢ä»ä»€ä»ƒä»†ä»‡ä»ä»Šä»‹ä»„å…ƒå…å…§å…­å…®å…¬å†—å‡¶åˆ†åˆ‡åˆˆå‹»å‹¾å‹¿åŒ–åŒ¹åˆå‡å…åžåŽ„å‹åŠåå£¬å¤©å¤«å¤ªå¤­å­”å°‘å°¤å°ºå±¯å·´å¹»å»¿å¼”å¼•å¿ƒæˆˆæˆ¶æ‰‹æ‰Žæ”¯æ–‡æ–—æ–¤æ–¹æ—¥æ›°æœˆæœ¨æ¬ æ­¢æ­¹æ¯‹æ¯”æ¯›æ°æ°´ç«çˆªçˆ¶çˆ»ç‰‡ç‰™ç‰›çŠ¬çŽ‹ä¸™ï¿½"
		.split("");
	for (n = 0; n != t[164].length; ++n)
		if (t[164][n].charCodeAt(0) !== 65533) {
			r[t[164][n]] = 41984 + n;
			e[41984 + n] = t[164][n]
		}
	t[165] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¸–ä¸•ä¸”ä¸˜ä¸»ä¹ä¹ä¹Žä»¥ä»˜ä»”ä»•ä»–ä»—ä»£ä»¤ä»™ä»žå……å…„å†‰å†Šå†¬å‡¹å‡ºå‡¸åˆŠåŠ åŠŸåŒ…åŒ†åŒ—åŒä»ŸåŠå‰å¡å å¯å®åŽ»å¯å¤å³å¬å®å©å¨å¼å¸åµå«å¦åªå²å±å°å¥å­å»å››å›šå¤–ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¤®å¤±å¥´å¥¶å­•å®ƒå°¼å·¨å·§å·¦å¸‚å¸ƒå¹³å¹¼å¼å¼˜å¼—å¿…æˆŠæ‰“æ‰”æ‰’æ‰‘æ–¥æ—¦æœ®æœ¬æœªæœ«æœ­æ­£æ¯æ°‘æ°æ°¸æ±æ±€æ°¾çŠ¯çŽ„çŽ‰ç“œç“¦ç”˜ç”Ÿç”¨ç”©ç”°ç”±ç”²ç”³ç–‹ç™½çš®çš¿ç›®çŸ›çŸ¢çŸ³ç¤ºç¦¾ç©´ç«‹ä¸žä¸Ÿä¹’ä¹“ä¹©äº™äº¤äº¦äº¥ä»¿ä¼‰ä¼™ä¼Šä¼•ä¼ä¼ä¼‘ä¼ä»²ä»¶ä»»ä»°ä»³ä»½ä¼ä¼‹å…‰å…‡å…†å…ˆå…¨ï¿½"
		.split("");
	for (n = 0; n != t[165].length; ++n)
		if (t[165][n].charCodeAt(0) !== 65533) {
			r[t[165][n]] = 42240 + n;
			e[42240 + n] = t[165][n]
		}
	t[166] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å…±å†å†°åˆ—åˆ‘åˆ’åˆŽåˆ–åŠ£åŒˆåŒ¡åŒ å°å±å‰ååŒåŠååå‹å„å‘ååˆåƒåŽå†å’å› å›žå›åœ³åœ°åœ¨åœ­åœ¬åœ¯åœ©å¤™å¤šå¤·å¤¸å¦„å¥¸å¦ƒå¥½å¥¹å¦‚å¦å­—å­˜å®‡å®ˆå®…å®‰å¯ºå°–å±¹å·žå¸†å¹¶å¹´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¼å¼›å¿™å¿–æˆŽæˆŒæˆæˆæ‰£æ‰›æ‰˜æ”¶æ—©æ—¨æ—¬æ—­æ›²æ›³æœ‰æœ½æœ´æœ±æœµæ¬¡æ­¤æ­»æ°–æ±æ±—æ±™æ±Ÿæ± æ±æ±•æ±¡æ±›æ±æ±Žç°ç‰Ÿç‰ç™¾ç«¹ç±³ç³¸ç¼¶ç¾Šç¾½è€è€ƒè€Œè€’è€³è¿è‚‰è‚‹è‚Œè‡£è‡ªè‡³è‡¼èˆŒèˆ›èˆŸè‰®è‰²è‰¾è™«è¡€è¡Œè¡£è¥¿é˜¡ä¸²äº¨ä½ä½ä½‡ä½—ä½žä¼´ä½›ä½•ä¼°ä½ä½‘ä¼½ä¼ºä¼¸ä½ƒä½”ä¼¼ä½†ä½£ï¿½"
		.split("");
	for (n = 0; n != t[166].length; ++n)
		if (t[166][n].charCodeAt(0) !== 65533) {
			r[t[166][n]] = 42496 + n;
			e[42496 + n] = t[166][n]
		}
	t[167] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä½œä½ ä¼¯ä½Žä¼¶ä½™ä½ä½ˆä½šå…Œå…‹å…å…µå†¶å†·åˆ¥åˆ¤åˆ©åˆªåˆ¨åŠ«åŠ©åŠªåŠ¬åŒ£å³åµåå­åžå¾å¦å‘Žå§å‘†å‘ƒå³å‘ˆå‘‚å›å©å‘Šå¹å»å¸å®åµå¶å å¼å‘€å±å«åŸå¬å›ªå›°å›¤å›«åŠå‘å€åï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å‡åŽåœ¾åååœ»å£¯å¤¾å¦å¦’å¦¨å¦žå¦£å¦™å¦–å¦å¦¤å¦“å¦Šå¦¥å­å­œå­šå­›å®Œå®‹å®å°¬å±€å±å°¿å°¾å²å²‘å²”å²Œå·«å¸Œåºåº‡åºŠå»·å¼„å¼Ÿå½¤å½¢å½·å½¹å¿˜å¿Œå¿—å¿å¿±å¿«å¿¸å¿ªæˆ’æˆ‘æŠ„æŠ—æŠ–æŠ€æ‰¶æŠ‰æ‰­æŠŠæ‰¼æ‰¾æ‰¹æ‰³æŠ’æ‰¯æŠ˜æ‰®æŠ•æŠ“æŠ‘æŠ†æ”¹æ”»æ”¸æ—±æ›´æŸæŽæææ‘æœæ–æžæ‰æ†æ ï¿½"
		.split("");
	for (n = 0; n != t[167].length; ++n)
		if (t[167][n].charCodeAt(0) !== 65533) {
			r[t[167][n]] = 42752 + n;
			e[42752 + n] = t[167][n]
		}
	t[168] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ“æ—æ­¥æ¯æ±‚æ±žæ²™æ²æ²ˆæ²‰æ²…æ²›æ±ªæ±ºæ²æ±°æ²Œæ±¨æ²–æ²’æ±½æ²ƒæ±²æ±¾æ±´æ²†æ±¶æ²æ²”æ²˜æ²‚ç¶ç¼ç½ç¸ç‰¢ç‰¡ç‰ ç‹„ç‹‚çŽ–ç”¬ç”«ç”·ç”¸çš‚ç›¯çŸ£ç§ç§€ç¦¿ç©¶ç³»ç½•è‚–è‚“è‚è‚˜è‚›è‚šè‚²è‰¯èŠ’ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èŠ‹èŠè¦‹è§’è¨€è°·è±†è±•è²èµ¤èµ°è¶³èº«è»Šè¾›è¾°è¿‚è¿†è¿…è¿„å·¡é‚‘é‚¢é‚ªé‚¦é‚£é…‰é‡†é‡Œé˜²é˜®é˜±é˜ªé˜¬ä¸¦ä¹–ä¹³äº‹äº›äºžäº«äº¬ä½¯ä¾ä¾ä½³ä½¿ä½¬ä¾›ä¾‹ä¾†ä¾ƒä½°ä½µä¾ˆä½©ä½»ä¾–ä½¾ä¾ä¾‘ä½ºå…”å…’å…•å…©å…·å…¶å…¸å†½å‡½åˆ»åˆ¸åˆ·åˆºåˆ°åˆ®åˆ¶å‰åŠ¾åŠ»å’å”å“å‘å¦å·å¸å¹å–å”å—å‘³å‘µï¿½"
		.split("");
	for (n = 0; n != t[168].length; ++n)
		if (t[168][n].charCodeAt(0) !== 65533) {
			r[t[168][n]] = 43008 + n;
			e[43008 + n] = t[168][n]
		}
	t[169] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å’–å‘¸å’•å’€å‘»å‘·å’„å’’å’†å‘¼å’å‘±å‘¶å’Œå’šå‘¢å‘¨å’‹å‘½å’Žå›ºåžƒå·åªå©å¡å¦å¤å¼å¤œå¥‰å¥‡å¥ˆå¥„å¥”å¦¾å¦»å§”å¦¹å¦®å§‘å§†å§å§å§‹å§“å§Šå¦¯å¦³å§’å§…å­Ÿå­¤å­£å®—å®šå®˜å®œå®™å®›å°šå±ˆå±…ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å±†å²·å²¡å²¸å²©å²«å²±å²³å¸˜å¸šå¸–å¸•å¸›å¸‘å¹¸åºšåº—åºœåº•åº–å»¶å¼¦å¼§å¼©å¾€å¾å½¿å½¼å¿å¿ å¿½å¿µå¿¿æ€æ€”æ€¯æ€µæ€–æ€ªæ€•æ€¡æ€§æ€©æ€«æ€›æˆ–æˆ•æˆ¿æˆ¾æ‰€æ‰¿æ‹‰æ‹Œæ‹„æŠ¿æ‹‚æŠ¹æ‹’æ‹›æŠ«æ‹“æ‹”æ‹‹æ‹ˆæŠ¨æŠ½æŠ¼æ‹æ‹™æ‹‡æ‹æŠµæ‹šæŠ±æ‹˜æ‹–æ‹—æ‹†æŠ¬æ‹Žæ”¾æ–§æ–¼æ—ºæ˜”æ˜“æ˜Œæ˜†æ˜‚æ˜Žæ˜€æ˜æ˜•æ˜Šï¿½"
		.split("");
	for (n = 0; n != t[169].length; ++n)
		if (t[169][n].charCodeAt(0) !== 65533) {
			r[t[169][n]] = 43264 + n;
			e[43264 + n] = t[169][n]
		}
	t[170] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ˜‡æœæœ‹æ­æž‹æž•æ±æžœæ³æ·æž‡æžæž—æ¯æ°æ¿æž‰æ¾æžæµæžšæž“æ¼æªæ²æ¬£æ­¦æ­§æ­¿æ°“æ°›æ³£æ³¨æ³³æ²±æ³Œæ³¥æ²³æ²½æ²¾æ²¼æ³¢æ²«æ³•æ³“æ²¸æ³„æ²¹æ³æ²®æ³—æ³…æ³±æ²¿æ²»æ³¡æ³›æ³Šæ²¬æ³¯æ³œæ³–æ³ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç‚•ç‚Žç‚’ç‚Šç‚™çˆ¬çˆ­çˆ¸ç‰ˆç‰§ç‰©ç‹€ç‹Žç‹™ç‹—ç‹çŽ©çŽ¨çŽŸçŽ«çŽ¥ç”½ç–ç–™ç–šçš„ç›‚ç›²ç›´çŸ¥çŸ½ç¤¾ç¥€ç¥ç§‰ç§ˆç©ºç©¹ç«ºç³¾ç½”ç¾Œç¾‹è€…è‚ºè‚¥è‚¢è‚±è‚¡è‚«è‚©è‚´è‚ªè‚¯è‡¥è‡¾èˆèŠ³èŠèŠ™èŠ­èŠ½èŠŸèŠ¹èŠ±èŠ¬èŠ¥èŠ¯èŠ¸èŠ£èŠ°èŠ¾èŠ·è™Žè™±åˆè¡¨è»‹è¿Žè¿”è¿‘é‚µé‚¸é‚±é‚¶é‡‡é‡‘é•·é–€é˜œé™€é˜¿é˜»é™„ï¿½"
		.split("");
	for (n = 0; n != t[170].length; ++n)
		if (t[170][n].charCodeAt(0) !== 65533) {
			r[t[170][n]] = 43520 + n;
			e[43520 + n] = t[170][n]
		}
	t[171] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é™‚éš¹é›¨é’éžäºŸäº­äº®ä¿¡ä¾µä¾¯ä¾¿ä¿ ä¿‘ä¿ä¿ä¿ƒä¾¶ä¿˜ä¿Ÿä¿Šä¿—ä¾®ä¿ä¿„ä¿‚ä¿šä¿Žä¿žä¾·å…—å†’å†‘å† å‰Žå‰ƒå‰Šå‰å‰Œå‰‹å‰‡å‹‡å‹‰å‹ƒå‹åŒå—å»åŽšå›å’¬å“€å’¨å“Žå“‰å’¸å’¦å’³å“‡å“‚å’½å’ªå“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å“„å“ˆå’¯å’«å’±å’»å’©å’§å’¿å›¿åž‚åž‹åž åž£åž¢åŸŽåž®åž“å¥•å¥‘å¥å¥Žå¥å§œå§˜å§¿å§£å§¨å¨ƒå§¥å§ªå§šå§¦å¨å§»å­©å®£å®¦å®¤å®¢å®¥å°å±Žå±å±å±‹å³™å³’å··å¸å¸¥å¸Ÿå¹½åº åº¦å»ºå¼ˆå¼­å½¥å¾ˆå¾…å¾Šå¾‹å¾‡å¾Œå¾‰æ€’æ€æ€ æ€¥æ€Žæ€¨ææ°æ¨æ¢æ†æƒæ¬æ«æªæ¤æ‰æ‹œæŒ–æŒ‰æ‹¼æ‹­æŒæ‹®æ‹½æŒ‡æ‹±æ‹·ï¿½"
		.split("");
	for (n = 0; n != t[171].length; ++n)
		if (t[171][n].charCodeAt(0) !== 65533) {
			r[t[171][n]] = 43776 + n;
			e[43776 + n] = t[171][n]
		}
	t[172] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ‹¯æ‹¬æ‹¾æ‹´æŒ‘æŒ‚æ”¿æ•…æ–«æ–½æ—¢æ˜¥æ˜­æ˜ æ˜§æ˜¯æ˜Ÿæ˜¨æ˜±æ˜¤æ›·æŸ¿æŸ“æŸ±æŸ”æŸæŸ¬æž¶æž¯æŸµæŸ©æŸ¯æŸ„æŸ‘æž´æŸšæŸ¥æž¸æŸæŸžæŸ³æž°æŸ™æŸ¢æŸæŸ’æ­ªæ®ƒæ®†æ®µæ¯’æ¯—æ°Ÿæ³‰æ´‹æ´²æ´ªæµæ´¥æ´Œæ´±æ´žæ´—ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ´»æ´½æ´¾æ´¶æ´›æ³µæ´¹æ´§æ´¸æ´©æ´®æ´µæ´Žæ´«ç‚«ç‚ºç‚³ç‚¬ç‚¯ç‚­ç‚¸ç‚®ç‚¤çˆ°ç‰²ç‰¯ç‰´ç‹©ç‹ ç‹¡çŽ·çŠçŽ»çŽ²çç€çŽ³ç”šç”­ç•ç•Œç•Žç•‹ç–«ç–¤ç–¥ç–¢ç–£ç™¸çš†çš‡çšˆç›ˆç›†ç›ƒç›…çœç›¹ç›¸çœ‰çœ‹ç›¾ç›¼çœ‡çŸœç ‚ç ”ç Œç ç¥†ç¥‰ç¥ˆç¥‡ç¦¹ç¦ºç§‘ç§’ç§‹ç©¿çªç«¿ç«½ç±½ç´‚ç´…ç´€ç´‰ç´‡ç´„ç´†ç¼¸ç¾Žç¾¿è€„ï¿½"
		.split("");
	for (n = 0; n != t[172].length; ++n)
		if (t[172][n].charCodeAt(0) !== 65533) {
			r[t[172][n]] = 44032 + n;
			e[44032 + n] = t[172][n]
		}
	t[173] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è€è€è€‘è€¶èƒ–èƒ¥èƒšèƒƒèƒ„èƒŒèƒ¡èƒ›èƒŽèƒžèƒ¤èƒè‡´èˆ¢è‹§èŒƒèŒ…è‹£è‹›è‹¦èŒ„è‹¥èŒ‚èŒ‰è‹’è‹—è‹±èŒè‹œè‹”è‹‘è‹žè‹“è‹Ÿè‹¯èŒ†è™è™¹è™»è™ºè¡è¡«è¦è§”è¨ˆè¨‚è¨ƒè²žè² èµ´èµ³è¶´è»è»Œè¿°è¿¦è¿¢è¿ªè¿¥ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¿­è¿«è¿¤è¿¨éƒŠéƒŽéƒéƒƒé…‹é…Šé‡é–‚é™é™‹é™Œé™é¢é©éŸ‹éŸ­éŸ³é é¢¨é£›é£Ÿé¦–é¦™ä¹˜äº³å€Œå€å€£ä¿¯å€¦å€¥ä¿¸å€©å€–å€†å€¼å€Ÿå€šå€’å€‘ä¿ºå€€å€”å€¨ä¿±å€¡å€‹å€™å€˜ä¿³ä¿®å€­å€ªä¿¾å€«å€‰å…¼å†¤å†¥å†¢å‡å‡Œå‡†å‡‹å‰–å‰œå‰”å‰›å‰åŒªå¿åŽŸåŽåŸå“¨å”å”å”·å“¼å“¥å“²å”†å“ºå””å“©å“­å“¡å”‰å“®å“ªï¿½"
		.split("");
	for (n = 0; n != t[173].length; ++n)
		if (t[173][n].charCodeAt(0) !== 65533) {
			r[t[173][n]] = 44288 + n;
			e[44288 + n] = t[173][n]
		}
	t[174] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å“¦å”§å”‡å“½å”åœƒåœ„åŸ‚åŸ”åŸ‹åŸƒå ‰å¤å¥—å¥˜å¥šå¨‘å¨˜å¨œå¨Ÿå¨›å¨“å§¬å¨ å¨£å¨©å¨¥å¨Œå¨‰å­«å±˜å®°å®³å®¶å®´å®®å®µå®¹å®¸å°„å±‘å±•å±å³­å³½å³»å³ªå³¨å³°å³¶å´å³´å·®å¸­å¸«åº«åº­åº§å¼±å¾’å¾‘å¾æ™ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ£æ¥ææ•æ­æ©æ¯æ‚„æ‚Ÿæ‚šæ‚æ‚”æ‚Œæ‚…æ‚–æ‰‡æ‹³æŒˆæ‹¿æŽæŒ¾æŒ¯æ•æ‚æ†ææ‰æŒºææŒ½æŒªæŒ«æŒ¨ææŒæ•ˆæ•‰æ–™æ—æ—…æ™‚æ™‰æ™æ™ƒæ™’æ™Œæ™…æ™æ›¸æœ”æœ•æœ—æ ¡æ ¸æ¡ˆæ¡†æ¡“æ ¹æ¡‚æ¡”æ ©æ¢³æ —æ¡Œæ¡‘æ ½æŸ´æ¡æ¡€æ ¼æ¡ƒæ ªæ¡…æ “æ ˜æ¡æ®Šæ®‰æ®·æ°£æ°§æ°¨æ°¦æ°¤æ³°æµªæ¶•æ¶ˆæ¶‡æµ¦æµ¸æµ·æµ™æ¶“ï¿½"
		.split("");
	for (n = 0; n != t[174].length; ++n)
		if (t[174][n].charCodeAt(0) !== 65533) {
			r[t[174][n]] = 44544 + n;
			e[44544 + n] = t[174][n]
		}
	t[175] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æµ¬æ¶‰æµ®æµšæµ´æµ©æ¶Œæ¶Šæµ¹æ¶…æµ¥æ¶”çƒŠçƒ˜çƒ¤çƒ™çƒˆçƒçˆ¹ç‰¹ç‹¼ç‹¹ç‹½ç‹¸ç‹·çŽ†ç­ç‰ç®ç çªçžç•”ç•ç•œç•šç•™ç–¾ç—…ç—‡ç–²ç–³ç–½ç–¼ç–¹ç—‚ç–¸çš‹çš°ç›Šç›ç›Žçœ©çœŸçœ çœ¨çŸ©ç °ç §ç ¸ç ç ´ç ·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç ¥ç ­ç  ç Ÿç ²ç¥•ç¥ç¥ ç¥Ÿç¥–ç¥žç¥ç¥—ç¥šç§¤ç§£ç§§ç§Ÿç§¦ç§©ç§˜çª„çªˆç«™ç¬†ç¬‘ç²‰ç´¡ç´—ç´‹ç´Šç´ ç´¢ç´”ç´ç´•ç´šç´œç´ç´™ç´›ç¼ºç½Ÿç¾”ç¿…ç¿è€†è€˜è€•è€™è€—è€½è€¿èƒ±è„‚èƒ°è„…èƒ­èƒ´è„†èƒ¸èƒ³è„ˆèƒ½è„Šèƒ¼èƒ¯è‡­è‡¬èˆ€èˆèˆªèˆ«èˆ¨èˆ¬èŠ»èŒ«è’è”èŠèŒ¸èè‰èŒµèŒ´èèŒ²èŒ¹èŒ¶èŒ—è€èŒ±èŒ¨èƒï¿½"
		.split("");
	for (n = 0; n != t[175].length; ++n)
		if (t[175][n].charCodeAt(0) !== 65533) {
			r[t[175][n]] = 44800 + n;
			e[44800 + n] = t[175][n]
		}
	t[176] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è™”èšŠèšªèš“èš¤èš©èšŒèš£èšœè¡°è¡·è¢è¢‚è¡½è¡¹è¨˜è¨è¨Žè¨Œè¨•è¨Šè¨—è¨“è¨–è¨è¨‘è±ˆè±ºè±¹è²¡è²¢èµ·èº¬è»’è»”è»è¾±é€é€†è¿·é€€è¿ºè¿´é€ƒè¿½é€…è¿¸é‚•éƒ¡éƒéƒ¢é…’é…é…Œé‡˜é‡é‡—é‡œé‡™é–ƒé™¢é™£é™¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é™›é™é™¤é™˜é™žéš»é£¢é¦¬éª¨é«˜é¬¥é¬²é¬¼ä¹¾åºå½åœå‡åƒåŒåšå‰å¥å¶åŽå•åµå´å·åå€å¯å­å…œå†•å‡°å‰ªå‰¯å‹’å‹™å‹˜å‹•åŒåŒåŒ™åŒ¿å€åŒ¾åƒæ›¼å•†å•ªå•¦å•„å•žå•¡å•ƒå•Šå”±å•–å•å••å”¯å•¤å”¸å”®å•œå”¬å•£å”³å•å•—åœˆåœ‹åœ‰åŸŸå …å Šå †åŸ åŸ¤åŸºå ‚å µåŸ·åŸ¹å¤ å¥¢å¨¶å©å©‰å©¦å©ªå©€ï¿½"
		.split("");
	for (n = 0; n != t[176].length; ++n)
		if (t[176][n].charCodeAt(0) !== 65533) {
			r[t[176][n]] = 45056 + n;
			e[45056 + n] = t[176][n]
		}
	t[177] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¨¼å©¢å©šå©†å©Šå­°å¯‡å¯…å¯„å¯‚å®¿å¯†å°‰å°ˆå°‡å± å±œå±å´‡å´†å´Žå´›å´–å´¢å´‘å´©å´”å´™å´¤å´§å´—å·¢å¸¸å¸¶å¸³å¸·åº·åº¸åº¶åºµåº¾å¼µå¼·å½—å½¬å½©å½«å¾—å¾™å¾žå¾˜å¾¡å¾ å¾œæ¿æ‚£æ‚‰æ‚ æ‚¨æƒ‹æ‚´æƒ¦æ‚½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æƒ…æ‚»æ‚µæƒœæ‚¼æƒ˜æƒ•æƒ†æƒŸæ‚¸æƒšæƒ‡æˆšæˆ›æ‰ˆæŽ æŽ§æ²æŽ–æŽ¢æŽ¥æ·æ§æŽ˜æŽªæ±æŽ©æŽ‰æŽƒæŽ›æ«æŽ¨æŽ„æŽˆæŽ™æŽ¡æŽ¬æŽ’æŽæŽ€æ»æ©æ¨æºæ•æ•–æ•‘æ•™æ•—å•Ÿæ•æ•˜æ••æ•”æ–œæ–›æ–¬æ—æ—‹æ—Œæ—Žæ™æ™šæ™¤æ™¨æ™¦æ™žæ›¹å‹—æœ›æ¢æ¢¯æ¢¢æ¢“æ¢µæ¡¿æ¡¶æ¢±æ¢§æ¢—æ¢°æ¢ƒæ£„æ¢­æ¢†æ¢…æ¢”æ¢æ¢¨æ¢Ÿæ¢¡æ¢‚æ¬²æ®ºï¿½"
		.split("");
	for (n = 0; n != t[177].length; ++n)
		if (t[177][n].charCodeAt(0) !== 65533) {
			r[t[177][n]] = 45312 + n;
			e[45312 + n] = t[177][n]
		}
	t[178] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¯«æ¯¬æ°«æ¶Žæ¶¼æ·³æ·™æ¶²æ·¡æ·Œæ·¤æ·»æ·ºæ¸…æ·‡æ·‹æ¶¯æ·‘æ¶®æ·žæ·¹æ¶¸æ··æ·µæ·…æ·’æ¸šæ¶µæ·šæ·«æ·˜æ·ªæ·±æ·®æ·¨æ·†æ·„æ¶ªæ·¬æ¶¿æ·¦çƒ¹ç„‰ç„Šçƒ½çƒ¯çˆ½ç‰½çŠçŒœçŒ›çŒ–çŒ“çŒ™çŽ‡ç…çŠçƒç†ç¾çç“ ç“¶ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç“·ç”œç”¢ç•¥ç•¦ç•¢ç•°ç–ç—”ç—•ç–µç—Šç—çšŽç›”ç›’ç››çœ·çœ¾çœ¼çœ¶çœ¸çœºç¡«ç¡ƒç¡Žç¥¥ç¥¨ç¥­ç§»çª’çª•ç¬ ç¬¨ç¬›ç¬¬ç¬¦ç¬™ç¬žç¬®ç²’ç²—ç²•çµ†çµƒçµ±ç´®ç´¹ç´¼çµ€ç´°ç´³çµ„ç´¯çµ‚ç´²ç´±ç¼½ç¾žç¾šç¿Œç¿Žç¿’è€œèŠè†è„¯è„–è„£è„«è„©è„°è„¤èˆ‚èˆµèˆ·èˆ¶èˆ¹èŽŽèŽžèŽ˜è¸èŽ¢èŽ–èŽ½èŽ«èŽ’èŽŠèŽ“èŽ‰èŽ è·è»è¼ï¿½"
		.split("");
	for (n = 0; n != t[178].length; ++n)
		if (t[178][n].charCodeAt(0) !== 65533) {
			r[t[178][n]] = 45568 + n;
			e[45568 + n] = t[178][n]
		}
	t[179] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èŽ†èŽ§è™•å½ªè›‡è›€èš¶è›„èšµè›†è›‹èš±èš¯è›‰è¡“è¢žè¢ˆè¢«è¢’è¢–è¢è¢‹è¦“è¦è¨ªè¨è¨£è¨¥è¨±è¨­è¨Ÿè¨›è¨¢è±‰è±šè²©è²¬è²«è²¨è²ªè²§èµ§èµ¦è¶¾è¶ºè»›è»Ÿé€™é€é€šé€—é€£é€Ÿé€é€é€•é€žé€ é€é€¢é€–é€›é€”ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éƒ¨éƒ­éƒ½é…—é‡Žé‡µé‡¦é‡£é‡§é‡­é‡©é–‰é™ªé™µé™³é™¸é™°é™´é™¶é™·é™¬é›€é›ªé›©ç« ç«Ÿé ‚é ƒé­šé³¥é¹µé¹¿éº¥éº»å‚¢å‚å‚…ï¿½ï¿½å‚‘å‚€å‚–å‚˜å‚šæœ€å‡±å‰²å‰´å‰µå‰©å‹žå‹å‹›åšåŽ¥å•»å–€å–§å•¼å–Šå–å–˜å–‚å–œå–ªå–”å–‡å–‹å–ƒå–³å–®å–Ÿå”¾å–²å–šå–»å–¬å–±å•¾å–‰å–«å–™åœå ¯å ªå ´å ¤å °å ±å ¡å å  å£¹å£ºå¥ ï¿½"
		.split("");
	for (n = 0; n != t[179].length; ++n)
		if (t[179][n].charCodeAt(0) !== 65533) {
			r[t[179][n]] = 45824 + n;
			e[45824 + n] = t[179][n]
		}
	t[180] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å©·åªšå©¿åª’åª›åª§å­³å­±å¯’å¯Œå¯“å¯å°Šå°‹å°±åµŒåµå´´åµ‡å·½å¹…å¸½å¹€å¹ƒå¹¾å»Šå»å»‚å»„å¼¼å½­å¾©å¾ªå¾¨æƒ‘æƒ¡æ‚²æ‚¶æƒ æ„œæ„£æƒºæ„•æƒ°æƒ»æƒ´æ…¨æƒ±æ„Žæƒ¶æ„‰æ„€æ„’æˆŸæ‰‰æŽ£æŽŒææ€æ©æ‰æ†æï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ’æ£ææ¡æ–æ­æ®æ¶æ´æªæ›æ‘’æšæ¹æ•žæ•¦æ•¢æ•£æ–‘æ–æ–¯æ™®æ™°æ™´æ™¶æ™¯æš‘æ™ºæ™¾æ™·æ›¾æ›¿æœŸæœæ£ºæ£•æ£ æ£˜æ£—æ¤…æ£Ÿæ£µæ£®æ£§æ£¹æ£’æ£²æ££æ£‹æ£æ¤æ¤’æ¤Žæ£‰æ£šæ¥®æ£»æ¬¾æ¬ºæ¬½æ®˜æ®–æ®¼æ¯¯æ°®æ°¯æ°¬æ¸¯æ¸¸æ¹”æ¸¡æ¸²æ¹§æ¹Šæ¸ æ¸¥æ¸£æ¸›æ¹›æ¹˜æ¸¤æ¹–æ¹®æ¸­æ¸¦æ¹¯æ¸´æ¹æ¸ºæ¸¬æ¹ƒæ¸æ¸¾æ»‹ï¿½"
		.split("");
	for (n = 0; n != t[180].length; ++n)
		if (t[180][n].charCodeAt(0) !== 65533) {
			r[t[180][n]] = 46080 + n;
			e[46080 + n] = t[180][n]
		}
	t[181] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æº‰æ¸™æ¹Žæ¹£æ¹„æ¹²æ¹©æ¹Ÿç„™ç„šç„¦ç„°ç„¡ç„¶ç…®ç„œç‰ŒçŠ„çŠ€çŒ¶çŒ¥çŒ´çŒ©çºçªç³ç¢ç¥çµç¶ç´ç¯ç›ç¦ç¨ç”¥ç”¦ç•«ç•ªç—¢ç—›ç—£ç—™ç—˜ç—žç— ç™»ç™¼çš–çš“çš´ç›œççŸ­ç¡ç¡¬ç¡¯ç¨ç¨ˆç¨‹ç¨…ç¨€çª˜ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çª—çª–ç«¥ç«£ç­‰ç­–ç­†ç­ç­’ç­”ç­ç­‹ç­ç­‘ç²Ÿç²¥çµžçµçµ¨çµ•ç´«çµ®çµ²çµ¡çµ¦çµ¢çµ°çµ³å–„ç¿”ç¿•è€‹è’è‚…è…•è…”è…‹è…‘è…Žè„¹è…†è„¾è…Œè…“è…´èˆ’èˆœè©èƒè¸èè è…è‹èè¯è±è´è‘—èŠè°èŒèŒè½è²èŠè¸èŽè„èœè‡è”èŸè™›è›Ÿè›™è›­è›”è››è›¤è›è›žè¡—è£è£‚è¢±è¦ƒè¦–è¨»è© è©•è©žè¨¼è©ï¿½"
		.split("");
	for (n = 0; n != t[181].length; ++n)
		if (t[181][n].charCodeAt(0) !== 65533) {
			r[t[181][n]] = 46336 + n;
			e[46336 + n] = t[181][n]
		}
	t[182] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è©”è©›è©è©†è¨´è¨ºè¨¶è©–è±¡è²‚è²¯è²¼è²³è²½è³è²»è³€è²´è²·è²¶è²¿è²¸è¶Šè¶…è¶è·Žè·è·‹è·šè·‘è·Œè·›è·†è»»è»¸è»¼è¾œé€®é€µé€±é€¸é€²é€¶é„‚éƒµé„‰éƒ¾é…£é…¥é‡éˆ”éˆ•éˆ£éˆ‰éˆžéˆéˆéˆ‡éˆ‘é–”é–é–‹é–‘ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é–“é–’é–ŽéšŠéšŽéš‹é™½éš…éš†éšé™²éš„é›é›…é›„é›†é›‡é›¯é›²éŸŒé …é †é ˆé£§é£ªé£¯é£©é£²é£­é¦®é¦­é»ƒé»é»‘äº‚å‚­å‚µå‚²å‚³åƒ…å‚¾å‚¬å‚·å‚»å‚¯åƒ‡å‰¿å‰·å‰½å‹Ÿå‹¦å‹¤å‹¢å‹£åŒ¯å—Ÿå—¨å—“å—¦å—Žå—œå—‡å—‘å—£å—¤å—¯å—šå—¡å—…å—†å—¥å—‰åœ’åœ“å¡žå¡‘å¡˜å¡—å¡šå¡”å¡«å¡Œå¡­å¡Šå¡¢å¡’å¡‹å¥§å«å«‰å«Œåª¾åª½åª¼ï¿½"
		.split("");
	for (n = 0; n != t[182].length; ++n)
		if (t[182][n].charCodeAt(0) !== 65533) {
			r[t[182][n]] = 46592 + n;
			e[46592 + n] = t[182][n]
		}
	t[183] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åª³å«‚åª²åµ©åµ¯å¹Œå¹¹å»‰å»ˆå¼’å½™å¾¬å¾®æ„šæ„æ…ˆæ„Ÿæƒ³æ„›æƒ¹æ„æ„ˆæ…Žæ…Œæ…„æ…æ„¾æ„´æ„§æ„æ„†æ„·æˆ¡æˆ¢æ“æ¾æžæªæ­æ½æ¬ææœæ”ææ¶æ–æ—æ†æ•¬æ–Ÿæ–°æš—æš‰æš‡æšˆæš–æš„æš˜æšæœƒæ¦”æ¥­ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¥šæ¥·æ¥ æ¥”æ¥µæ¤°æ¦‚æ¥Šæ¥¨æ¥«æ¥žæ¥“æ¥¹æ¦†æ¥æ¥£æ¥›æ­‡æ­²æ¯€æ®¿æ¯“æ¯½æº¢æº¯æ»“æº¶æ»‚æºæºæ»‡æ»…æº¥æº˜æº¼æººæº«æ»‘æº–æºœæ»„æ»”æºªæº§æº´ç…Žç…™ç…©ç…¤ç…‰ç…§ç…œç…¬ç…¦ç…Œç…¥ç…žç…†ç…¨ç…–çˆºç‰’çŒ·ç…çŒ¿çŒ¾ç‘¯ç‘šç‘•ç‘Ÿç‘žç‘ç¿ç‘™ç‘›ç‘œç•¶ç•¸ç˜€ç—°ç˜ç—²ç—±ç—ºç—¿ç—´ç—³ç›žç›Ÿç›ç«ç¦çžç£ï¿½"
		.split("");
	for (n = 0; n != t[183].length; ++n)
		if (t[183][n].charCodeAt(0) !== 65533) {
			r[t[183][n]] = 46848 + n;
			e[46848 + n] = t[183][n]
		}
	t[184] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¹çªç¬çœç¥ç¨ç¢çŸ®ç¢Žç¢°ç¢—ç¢˜ç¢Œç¢‰ç¡¼ç¢‘ç¢“ç¡¿ç¥ºç¥¿ç¦è¬ç¦½ç¨œç¨šç¨ ç¨”ç¨Ÿç¨žçªŸçª ç­·ç¯€ç­ ç­®ç­§ç²±ç²³ç²µç¶“çµ¹ç¶‘ç¶ç¶çµ›ç½®ç½©ç½ªç½²ç¾©ç¾¨ç¾¤è–è˜è‚†è‚„è…±è…°è…¸è…¥è…®è…³è…«ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è…¹è…ºè…¦èˆ…è‰‡è’‚è‘·è½è±è‘µè‘¦è‘«è‘‰è‘¬è‘›è¼èµè‘¡è‘£è‘©è‘­è‘†è™žè™œè™Ÿè›¹èœ“èœˆèœ‡èœ€è›¾è›»èœ‚èœƒèœ†èœŠè¡™è£Ÿè£”è£™è£œè£˜è£è£¡è£Šè£•è£’è¦œè§£è©«è©²è©³è©¦è©©è©°èª‡è©¼è©£èª è©±èª…è©­è©¢è©®è©¬è©¹è©»è¨¾è©¨è±¢è²Šè²‰è³Šè³‡è³ˆè³„è²²è³ƒè³‚è³…è·¡è·Ÿè·¨è·¯è·³è·ºè·ªè·¤è·¦èº²è¼ƒè¼‰è»¾è¼Šï¿½"
		.split("");
	for (n = 0; n != t[184].length; ++n)
		if (t[184][n].charCodeAt(0) !== 65533) {
			r[t[184][n]] = 47104 + n;
			e[47104 + n] = t[184][n]
		}
	t[185] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¾Ÿè¾²é‹éŠé“é‚é”é€¼é•éé‡ééŽéé‘é€¾éé„’é„—é…¬é…ªé…©é‡‰éˆ·é‰—éˆ¸éˆ½é‰€éˆ¾é‰›é‰‹é‰¤é‰‘éˆ´é‰‰é‰é‰…éˆ¹éˆ¿é‰šé–˜éš˜éš”éš•é›é›‹é›‰é›Šé›·é›»é›¹é›¶é–é´é¶é é ‘é “é Šé ’é Œé£¼é£´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é£½é£¾é¦³é¦±é¦´é«¡é³©éº‚é¼Žé¼“é¼ åƒ§åƒ®åƒ¥åƒ–åƒ­åƒšåƒ•åƒåƒ‘åƒ±åƒŽåƒ©å…¢å‡³åŠƒåŠ‚åŒ±åŽ­å—¾å˜€å˜›å˜—å—½å˜”å˜†å˜‰å˜å˜Žå—·å˜–å˜Ÿå˜ˆå˜å—¶åœ˜åœ–å¡µå¡¾å¢ƒå¢“å¢Šå¡¹å¢…å¡½å£½å¤¥å¤¢å¤¤å¥ªå¥©å«¡å«¦å«©å«—å«–å«˜å«£å­µå¯žå¯§å¯¡å¯¥å¯¦å¯¨å¯¢å¯¤å¯Ÿå°å±¢å¶„å¶‡å¹›å¹£å¹•å¹—å¹”å»“å»–å¼Šå½†å½°å¾¹æ…‡ï¿½"
		.split("");
	for (n = 0; n != t[185].length; ++n)
		if (t[185][n].charCodeAt(0) !== 65533) {
			r[t[185][n]] = 47360 + n;
			e[47360 + n] = t[185][n]
		}
	t[186] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ„¿æ…‹æ…·æ…¢æ…£æ…Ÿæ…šæ…˜æ…µæˆªæ’‡æ‘˜æ‘”æ’¤æ‘¸æ‘Ÿæ‘ºæ‘‘æ‘§æ´æ‘­æ‘»æ•²æ–¡æ——æ—–æš¢æš¨æšæ¦œæ¦¨æ¦•æ§æ¦®æ§“æ§‹æ¦›æ¦·æ¦»æ¦«æ¦´æ§æ§æ¦­æ§Œæ¦¦æ§ƒæ¦£æ­‰æ­Œæ°³æ¼³æ¼”æ»¾æ¼“æ»´æ¼©æ¼¾æ¼ æ¼¬æ¼æ¼‚æ¼¢ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ»¿æ»¯æ¼†æ¼±æ¼¸æ¼²æ¼£æ¼•æ¼«æ¼¯æ¾ˆæ¼ªæ»¬æ¼æ»²æ»Œæ»·ç†”ç†™ç…½ç†Šç†„ç†’çˆ¾çŠ’çŠ–ç„çç‘¤ç‘£ç‘ªç‘°ç‘­ç”„ç–‘ç˜§ç˜ç˜‹ç˜‰ç˜“ç›¡ç›£çž„ç½ç¿ç¡ç£ç¢Ÿç¢§ç¢³ç¢©ç¢£ç¦Žç¦ç¦ç¨®ç¨±çªªçª©ç«­ç«¯ç®¡ç®•ç®‹ç­µç®—ç®ç®”ç®ç®¸ç®‡ç®„ç²¹ç²½ç²¾ç¶»ç¶°ç¶œç¶½ç¶¾ç¶ ç·Šç¶´ç¶²ç¶±ç¶ºç¶¢ç¶¿ç¶µç¶¸ç¶­ç·’ç·‡ç¶¬ï¿½"
		.split("");
	for (n = 0; n != t[186].length; ++n)
		if (t[186][n].charCodeAt(0) !== 65533) {
			r[t[186][n]] = 47616 + n;
			e[47616 + n] = t[186][n]
		}
	t[187] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç½°ç¿ ç¿¡ç¿Ÿèžèšè‚‡è…è†€è†è†ˆè†Šè…¿è†‚è‡§è‡ºèˆ‡èˆ”èˆžè‰‹è“‰è’¿è“†è“„è’™è’žè’²è’œè“‹è’¸è“€è““è’è’¼è“‘è“Šèœ¿èœœèœ»èœ¢èœ¥èœ´èœ˜è•èœ·èœ©è£³è¤‚è£´è£¹è£¸è£½è£¨è¤šè£¯èª¦èªŒèªžèª£èªèª¡èª“èª¤ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èªªèª¥èª¨èª˜èª‘èªšèª§è±ªè²è²Œè³“è³‘è³’èµ«è¶™è¶•è·¼è¼”è¼’è¼•è¼“è¾£é é˜éœé£é™éžé¢éé›é„™é„˜é„žé…µé…¸é…·é…´é‰¸éŠ€éŠ…éŠ˜éŠ–é‰»éŠ“éŠœéŠ¨é‰¼éŠ‘é–¡é–¨é–©é–£é–¥é–¤éš™éšœéš›é›Œé›’éœ€é¼éž…éŸ¶é —é ˜é¢¯é¢±é¤ƒé¤…é¤Œé¤‰é§éª¯éª°é«¦é­é­‚é³´é³¶é³³éº¼é¼»é½Šå„„å„€åƒ»åƒµåƒ¹å„‚å„ˆå„‰å„…å‡œï¿½"
		.split("");
	for (n = 0; n != t[187].length; ++n)
		if (t[187][n].charCodeAt(0) !== 65533) {
			r[t[187][n]] = 47872 + n;
			e[47872 + n] = t[187][n]
		}
	t[188] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åŠ‡åŠˆåŠ‰åŠåŠŠå‹°åŽ²å˜®å˜»å˜¹å˜²å˜¿å˜´å˜©å™“å™Žå™—å™´å˜¶å˜¯å˜°å¢€å¢Ÿå¢žå¢³å¢œå¢®å¢©å¢¦å¥­å¬‰å«»å¬‹å«µå¬Œå¬ˆå¯®å¯¬å¯©å¯«å±¤å±¥å¶å¶”å¹¢å¹Ÿå¹¡å»¢å»šå»Ÿå»å»£å» å½ˆå½±å¾·å¾µæ…¶æ…§æ…®æ…æ…•æ†‚ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ…¼æ…°æ…«æ…¾æ†§æ†æ†«æ†Žæ†¬æ†šæ†¤æ†”æ†®æˆ®æ‘©æ‘¯æ‘¹æ’žæ’²æ’ˆæ’æ’°æ’¥æ’“æ’•æ’©æ’’æ’®æ’­æ’«æ’šæ’¬æ’™æ’¢æ’³æ•µæ•·æ•¸æš®æš«æš´æš±æ¨£æ¨Ÿæ§¨æ¨æ¨žæ¨™æ§½æ¨¡æ¨“æ¨Šæ§³æ¨‚æ¨…æ§­æ¨‘æ­æ­Žæ®¤æ¯…æ¯†æ¼¿æ½¼æ¾„æ½‘æ½¦æ½”æ¾†æ½­æ½›æ½¸æ½®æ¾Žæ½ºæ½°æ½¤æ¾—æ½˜æ»•æ½¯æ½ æ½Ÿç†Ÿç†¬ç†±ç†¨ç‰–çŠ›çŽç—ç‘©ç’‹ç’ƒï¿½"
		.split("");
	for (n = 0; n != t[188].length; ++n)
		if (t[188][n].charCodeAt(0) !== 65533) {
			r[t[188][n]] = 48128 + n;
			e[48128 + n] = t[188][n]
		}
	t[189] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç‘¾ç’€ç•¿ç˜ ç˜©ç˜Ÿç˜¤ç˜¦ç˜¡ç˜¢çššçšºç›¤çžŽçž‡çžŒçž‘çž‹ç£‹ç£…ç¢ºç£Šç¢¾ç£•ç¢¼ç£ç¨¿ç¨¼ç©€ç¨½ç¨·ç¨»çª¯çª®ç®­ç®±ç¯„ç®´ç¯†ç¯‡ç¯ç® ç¯Œç³Šç· ç·´ç·¯ç·»ç·˜ç·¬ç·ç·¨ç·£ç·šç·žç·©ç¶žç·™ç·²ç·¹ç½µç½·ç¾¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¿©è€¦è†›è†œè†è† è†šè†˜è”—è”½è”šè“®è”¬è”­è”“è”‘è”£è”¡è””è“¬è”¥è“¿è”†èž‚è´è¶è è¦è¸è¨è™è—èŒè“è¡›è¡è¤è¤‡è¤’è¤“è¤•è¤Šèª¼è«’è«‡è«„èª•è«‹è«¸èª²è«‰è«‚èª¿èª°è«–è«èª¶èª¹è«›è±Œè±Žè±¬è³ è³žè³¦è³¤è³¬è³­è³¢è³£è³œè³ªè³¡èµ­è¶Ÿè¶£è¸«è¸è¸è¸¢è¸è¸©è¸Ÿè¸¡è¸žèººè¼è¼›è¼Ÿè¼©è¼¦è¼ªè¼œè¼žï¿½"
		.split("");
	for (n = 0; n != t[189].length; ++n)
		if (t[189][n].charCodeAt(0) !== 65533) {
			r[t[189][n]] = 48384 + n;
			e[48384 + n] = t[189][n]
		}
	t[190] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¼¥é©é®é¨é­é·é„°é„­é„§é„±é†‡é†‰é†‹é†ƒé‹…éŠ»éŠ·é‹ªéŠ¬é‹¤é‹éŠ³éŠ¼é‹’é‹‡é‹°éŠ²é–­é–±éœ„éœ†éœ‡éœ‰é éžéž‹éžé ¡é «é œé¢³é¤Šé¤“é¤’é¤˜é§é§é§Ÿé§›é§‘é§•é§’é§™éª·é«®é«¯é¬§é­…é­„é­·é­¯é´†é´‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é´ƒéº©éº¾é»Žå¢¨é½’å„’å„˜å„”å„å„•å†€å†ªå‡åŠ‘åŠ“å‹³å™™å™«å™¹å™©å™¤å™¸å™ªå™¨å™¥å™±å™¯å™¬å™¢å™¶å£å¢¾å£‡å£…å¥®å¬å¬´å­¸å¯°å°Žå½Šæ†²æ†‘æ†©æ†Šæ‡æ†¶æ†¾æ‡Šæ‡ˆæˆ°æ“…æ“æ“‹æ’»æ’¼æ“šæ“„æ“‡æ“‚æ“æ’¿æ“’æ“”æ’¾æ•´æ›†æ›‰æš¹æ›„æ›‡æš¸æ¨½æ¨¸æ¨ºæ©™æ©«æ©˜æ¨¹æ©„æ©¢æ©¡æ©‹æ©‡æ¨µæ©Ÿæ©ˆæ­™æ­·æ°…æ¿‚æ¾±æ¾¡ï¿½"
		.split("");
	for (n = 0; n != t[190].length; ++n)
		if (t[190][n].charCodeAt(0) !== 65533) {
			r[t[190][n]] = 48640 + n;
			e[48640 + n] = t[190][n]
		}
	t[191] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¿ƒæ¾¤æ¿æ¾§æ¾³æ¿€æ¾¹æ¾¶æ¾¦æ¾ æ¾´ç†¾ç‡‰ç‡ç‡’ç‡ˆç‡•ç†¹ç‡Žç‡™ç‡œç‡ƒç‡„ç¨ç’œç’£ç’˜ç’Ÿç’žç“¢ç”Œç”ç˜´ç˜¸ç˜ºç›§ç›¥çž çžžçžŸçž¥ç£¨ç£šç£¬ç£§ç¦¦ç©ç©Žç©†ç©Œç©‹çªºç¯™ç°‘ç¯‰ç¯¤ç¯›ç¯¡ç¯©ç¯¦ç³•ç³–ç¸Šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¸‘ç¸ˆç¸›ç¸£ç¸žç¸ç¸‰ç¸ç½¹ç¾²ç¿°ç¿±ç¿®è€¨è†³è†©è†¨è‡»èˆˆè‰˜è‰™è•Šè•™è•ˆè•¨è•©è•ƒè•‰è•­è•ªè•žèžƒèžŸèžžèž¢èžè¡¡è¤ªè¤²è¤¥è¤«è¤¡è¦ªè¦¦è«¦è«ºè««è«±è¬€è«œè«§è«®è«¾è¬è¬‚è«·è«­è«³è«¶è«¼è±«è±­è²“è³´è¹„è¸±è¸´è¹‚è¸¹è¸µè¼»è¼¯è¼¸è¼³è¾¨è¾¦éµé´é¸é²é¼éºé„´é†’éŒ éŒ¶é‹¸éŒ³éŒ¯éŒ¢é‹¼éŒ«éŒ„éŒšï¿½"
		.split("");
	for (n = 0; n != t[191].length; ++n)
		if (t[191][n].charCodeAt(0) !== 65533) {
			r[t[191][n]] = 48896 + n;
			e[48896 + n] = t[191][n]
		}
	t[192] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŒéŒ¦éŒ¡éŒ•éŒ®éŒ™é–»éš§éš¨éšªé›•éœŽéœ‘éœ–éœéœ“éœé›éœé¦éž˜é °é ¸é »é ·é ­é ¹é ¤é¤é¤¨é¤žé¤›é¤¡é¤šé§­é§¢é§±éª¸éª¼é«»é«­é¬¨é®‘é´•é´£é´¦é´¨é´’é´›é»˜é»”é¾é¾œå„ªå„Ÿå„¡å„²å‹µåšŽåš€åšåš…åš‡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åšå£•å£“å£‘å£Žå¬°å¬ªå¬¤å­ºå°·å±¨å¶¼å¶ºå¶½å¶¸å¹«å½Œå¾½æ‡‰æ‡‚æ‡‡æ‡¦æ‡‹æˆ²æˆ´æ“Žæ“Šæ“˜æ“ æ“°æ“¦æ“¬æ“±æ“¢æ“­æ–‚æ–ƒæ›™æ›–æª€æª”æª„æª¢æªœæ«›æª£æ©¾æª—æªæª æ­œæ®®æ¯šæ°ˆæ¿˜æ¿±æ¿Ÿæ¿ æ¿›æ¿¤æ¿«æ¿¯æ¾€æ¿¬æ¿¡æ¿©æ¿•æ¿®æ¿°ç‡§ç‡Ÿç‡®ç‡¦ç‡¥ç‡­ç‡¬ç‡´ç‡ çˆµç‰†ç°ç²ç’©ç’°ç’¦ç’¨ç™†ç™‚ç™Œç›ªçž³çžªçž°çž¬ï¿½"
		.split("");
	for (n = 0; n != t[192].length; ++n)
		if (t[192][n].charCodeAt(0) !== 65533) {
			r[t[192][n]] = 49152 + n;
			e[49152 + n] = t[192][n]
		}
	t[193] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çž§çž­çŸ¯ç£·ç£ºç£´ç£¯ç¤ç¦§ç¦ªç©—çª¿ç°‡ç°ç¯¾ç¯·ç°Œç¯ ç³ ç³œç³žç³¢ç³Ÿç³™ç³ç¸®ç¸¾ç¹†ç¸·ç¸²ç¹ƒç¸«ç¸½ç¸±ç¹…ç¹ç¸´ç¸¹ç¹ˆç¸µç¸¿ç¸¯ç½„ç¿³ç¿¼è±è²è°è¯è³è‡†è‡ƒè†ºè‡‚è‡€è†¿è†½è‡‰è†¾è‡¨èˆ‰è‰±è–ªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è–„è•¾è–œè–‘è–”è–¯è–›è–‡è–¨è–Šè™§èŸ€èŸ‘èž³èŸ’èŸ†èž«èž»èžºèŸˆèŸ‹è¤»è¤¶è¥„è¤¸è¤½è¦¬è¬Žè¬—è¬™è¬›è¬Šè¬ è¬è¬„è¬è±è°¿è±³è³ºè³½è³¼è³¸è³»è¶¨è¹‰è¹‹è¹ˆè¹Šè½„è¼¾è½‚è½…è¼¿é¿é½é‚„é‚é‚‚é‚€é„¹é†£é†žé†œééŽ‚éŒ¨éµéŠé¥é‹éŒ˜é¾é¬é›é°éšé”é—Šé—‹é—Œé—ˆé—†éš±éš¸é›–éœœéœžéž éŸ“é¡†é¢¶é¤µé¨ï¿½"
		.split("");
	for (n = 0; n != t[193].length; ++n)
		if (t[193][n].charCodeAt(0) !== 65533) {
			r[t[193][n]] = 49408 + n;
			e[49408 + n] = t[193][n]
		}
	t[194] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é§¿é®®é®«é®ªé®­é´»é´¿éº‹é»é»žé»œé»é»›é¼¾é½‹å¢åš•åš®å£™å£˜å¬¸å½æ‡£æˆ³æ“´æ“²æ“¾æ”†æ“ºæ“»æ“·æ–·æ›œæœ¦æª³æª¬æ«ƒæª»æª¸æ«‚æª®æª¯æ­Ÿæ­¸æ®¯ç€‰ç€‹æ¿¾ç€†æ¿ºç€‘ç€ç‡»ç‡¼ç‡¾ç‡¸ç·çµç’§ç’¿ç”•ç™–ç™˜ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç™’çž½çž¿çž»çž¼ç¤Žç¦®ç©¡ç©¢ç© ç«„ç«…ç°«ç°§ç°ªç°žç°£ç°¡ç³§ç¹”ç¹•ç¹žç¹šç¹¡ç¹’ç¹™ç½ˆç¿¹ç¿»è·è¶è‡è‡èˆŠè—è–©è—è—è—‰è–°è–ºè–¹è–¦èŸ¯èŸ¬èŸ²èŸ è¦†è¦²è§´è¬¨è¬¹è¬¬è¬«è±è´…è¹™è¹£è¹¦è¹¤è¹Ÿè¹•è»€è½‰è½é‚‡é‚ƒé‚ˆé†«é†¬é‡éŽ”éŽŠéŽ–éŽ¢éŽ³éŽ®éŽ¬éŽ°éŽ˜éŽšéŽ—é—”é—–é—é—•é›¢é›œé›™é››é›žéœ¤éž£éž¦ï¿½"
		.split("");
	for (n = 0; n != t[194].length; ++n)
		if (t[194][n].charCodeAt(0) !== 65533) {
			r[t[194][n]] = 49664 + n;
			e[49664 + n] = t[194][n]
		}
	t[195] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éž­éŸ¹é¡é¡é¡Œé¡Žé¡“é¢ºé¤¾é¤¿é¤½é¤®é¦¥é¨Žé«é¬ƒé¬†é­é­Žé­é¯Šé¯‰é¯½é¯ˆé¯€éµ‘éµéµ é» é¼•é¼¬å„³åš¥å£žå£Ÿå£¢å¯µé¾å»¬æ‡²æ‡·æ‡¶æ‡µæ”€æ”æ› æ›æ«¥æ«æ«šæ«“ç€›ç€Ÿç€¨ç€šç€ç€•ç€˜çˆ†çˆç‰˜çŠ¢ç¸ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çºç’½ç“Šç“£ç–‡ç–†ç™Ÿç™¡çŸ‡ç¤™ç¦±ç©«ç©©ç°¾ç°¿ç°¸ç°½ç°·ç±€ç¹«ç¹­ç¹¹ç¹©ç¹ªç¾…ç¹³ç¾¶ç¾¹ç¾¸è‡˜è—©è—è—ªè—•è—¤è—¥è—·èŸ»è …è èŸ¹èŸ¾è¥ è¥Ÿè¥–è¥žè­è­œè­˜è­‰è­šè­Žè­è­†è­™è´ˆè´Šè¹¼è¹²èº‡è¹¶è¹¬è¹ºè¹´è½”è½Žè¾­é‚Šé‚‹é†±é†®é¡é‘éŸéƒéˆéœéé–é¢éé˜é¤é—é¨é—œéš´é›£éœªéœ§é¡éŸœéŸ»é¡žï¿½"
		.split("");
	for (n = 0; n != t[195].length; ++n)
		if (t[195][n].charCodeAt(0) !== 65533) {
			r[t[195][n]] = 49920 + n;
			e[49920 + n] = t[195][n]
		}
	t[196] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¡˜é¡›é¢¼é¥…é¥‰é¨–é¨™é¬é¯¨é¯§é¯–é¯›é¶‰éµ¡éµ²éµªéµ¬éº’éº—éº“éº´å‹¸åš¨åš·åš¶åš´åš¼å£¤å­€å­ƒå­½å¯¶å·‰æ‡¸æ‡ºæ”˜æ””æ”™æ›¦æœ§æ«¬ç€¾ç€°ç€²çˆç»ç“ç™¢ç™¥ç¤¦ç¤ªç¤¬ç¤«ç«‡ç«¶ç±Œç±ƒç±ç³¯ç³°è¾®ç¹½ç¹¼ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çº‚ç½Œè€€è‡šè‰¦è—»è—¹è˜‘è—ºè˜†è˜‹è˜‡è˜Šè ”è •è¥¤è¦ºè§¸è­°è­¬è­¦è­¯è­Ÿè­«è´è´èº‰èºèº…èº‚é†´é‡‹é˜éƒé½é—¡éœ°é£„é¥’é¥‘é¦¨é¨«é¨°é¨·é¨µé°“é°é¹¹éºµé»¨é¼¯é½Ÿé½£é½¡å„·å„¸å›å›€å›‚å¤”å±¬å·æ‡¼æ‡¾æ”æ”œæ–•æ›©æ«»æ¬„æ«ºæ®²çŒçˆ›çŠ§ç“–ç“”ç™©çŸ“ç±çºçºŒç¾¼è˜—è˜­è˜šè £è ¢è ¡è Ÿè¥ªè¥¬è¦½è­´ï¿½"
		.split("");
	for (n = 0; n != t[196].length; ++n)
		if (t[196][n].charCodeAt(0) !== 65533) {
			r[t[196][n]] = 50176 + n;
			e[50176 + n] = t[196][n]
		}
	t[197] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è­·è­½è´“èºŠèºèº‹è½Ÿè¾¯é†ºé®é³éµéºé¸é²é«é—¢éœ¸éœ¹éœ²éŸ¿é¡§é¡¥é¥—é©…é©ƒé©€é¨¾é«é­”é­‘é°­é°¥é¶¯é¶´é·‚é¶¸éºé»¯é¼™é½œé½¦é½§å„¼å„»å›ˆå›Šå›‰å­¿å·”å·’å½Žæ‡¿æ”¤æ¬Šæ­¡ç‘ç˜çŽ€ç“¤ç–Šç™®ç™¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¦³ç± ç±Ÿè¾è½è‡Ÿè¥²è¥¯è§¼è®€è´–è´—èº‘èº“è½¡é…ˆé‘„é‘‘é‘’éœ½éœ¾éŸƒéŸé¡«é¥•é©•é©é«’é¬šé±‰é°±é°¾é°»é·“é·—é¼´é½¬é½ªé¾”å›Œå·–æˆ€æ”£æ”«æ”ªæ›¬æ¬ç“šç«Šç±¤ç±£ç±¥çº“çº–çº”è‡¢è˜¸è˜¿è ±è®Šé‚é‚é‘£é‘ é‘¤é¨é¡¯é¥œé©šé©›é©—é«“é«”é«‘é±”é±—é±–é·¥éºŸé»´å›‘å£©æ”¬çžç™±ç™²çŸ—ç½ç¾ˆè ¶è ¹è¡¢è®“è®’ï¿½"
		.split("");
	for (n = 0; n != t[197].length; ++n)
		if (t[197][n].charCodeAt(0) !== 65533) {
			r[t[197][n]] = 50432 + n;
			e[50432 + n] = t[197][n]
		}
	t[198] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è®–è‰·è´›é‡€é‘ªé‚éˆé„éŸ†é¡°é©Ÿé¬¢é­˜é±Ÿé·¹é·ºé¹¼é¹½é¼‡é½·é½²å»³æ¬–ç£ç±¬ç±®è »è§€èº¡é‡é‘²é‘°é¡±é¥žé«–é¬£é»Œç¤çŸšè®šé‘·éŸ‰é©¢é©¥çºœè®œèºªé‡…é‘½é‘¾é‘¼é±·é±¸é»·è±”é‘¿é¸šçˆ¨é©ªé¬±é¸›é¸žç±²ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[198].length; ++n)
		if (t[198][n].charCodeAt(0) !== 65533) {
			r[t[198][n]] = 50688 + n;
			e[50688 + n] = t[198][n]
		}
	t[201] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¹‚ä¹œå‡µåŒšåŽ‚ä¸‡ä¸Œä¹‡äºå›—ï¨Œå±®å½³ä¸å†‡ä¸Žä¸®äº“ä»‚ä»‰ä»ˆå†˜å‹¼å¬åŽ¹åœ å¤ƒå¤¬å°å·¿æ—¡æ®³æ¯Œæ°”çˆ¿ä¸±ä¸¼ä»¨ä»œä»©ä»¡ä»ä»šåˆŒåŒœåŒåœ¢åœ£å¤—å¤¯å®å®„å°’å°»å±´å±³å¸„åº€åº‚å¿‰æˆ‰æ‰æ°•ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ°¶æ±ƒæ°¿æ°»çŠ®çŠ°çŽŠç¦¸è‚Šé˜žä¼Žä¼˜ä¼¬ä»µä¼”ä»±ä¼€ä»·ä¼ˆä¼ä¼‚ä¼…ä¼¢ä¼“ä¼„ä»´ä¼’å†±åˆ“åˆ‰åˆåŠ¦åŒ¢åŒŸååŽŠå‡å›¡å›Ÿåœ®åœªåœ´å¤¼å¦€å¥¼å¦…å¥»å¥¾å¥·å¥¿å­–å°•å°¥å±¼å±ºå±»å±¾å·Ÿå¹µåº„å¼‚å¼šå½´å¿•å¿”å¿æ‰œæ‰žæ‰¤æ‰¡æ‰¦æ‰¢æ‰™æ‰ æ‰šæ‰¥æ—¯æ—®æœ¾æœ¹æœ¸æœ»æœºæœ¿æœ¼æœ³æ°˜æ±†æ±’æ±œæ±æ±Šæ±”æ±‹ï¿½"
		.split("");
	for (n = 0; n != t[201].length; ++n)
		if (t[201][n].charCodeAt(0) !== 65533) {
			r[t[201][n]] = 51456 + n;
			e[51456 + n] = t[201][n]
		}
	t[202] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ±Œç±ç‰žçŠ´çŠµçŽŽç”ªç™¿ç©µç½‘è‰¸è‰¼èŠ€è‰½è‰¿è™è¥¾é‚™é‚—é‚˜é‚›é‚”é˜¢é˜¤é˜ é˜£ä½–ä¼»ä½¢ä½‰ä½“ä½¤ä¼¾ä½§ä½’ä½Ÿä½ä½˜ä¼­ä¼³ä¼¿ä½¡å†å†¹åˆœåˆžåˆ¡åŠ­åŠ®åŒ‰å£å²åŽŽåŽå°å·åªå‘”å‘…å™åœå¥å˜ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å½å‘å‘å¨å¤å‘‡å›®å›§å›¥åå…åŒå‰å‹å’å¤†å¥€å¦¦å¦˜å¦ å¦—å¦Žå¦¢å¦å¦å¦§å¦¡å®Žå®’å°¨å°ªå²å²å²ˆå²‹å²‰å²’å²Šå²†å²“å²•å· å¸Šå¸Žåº‹åº‰åºŒåºˆåºå¼…å¼å½¸å½¶å¿’å¿‘å¿å¿­å¿¨å¿®å¿³å¿¡å¿¤å¿£å¿ºå¿¯å¿·å¿»æ€€å¿´æˆºæŠƒæŠŒæŠŽæŠæŠ”æŠ‡æ‰±æ‰»æ‰ºæ‰°æŠæŠˆæ‰·æ‰½æ‰²æ‰´æ”·æ—°æ—´æ—³æ—²æ—µæ…æ‡ï¿½"
		.split("");
	for (n = 0; n != t[202].length; ++n)
		if (t[202][n].charCodeAt(0) !== 65533) {
			r[t[202][n]] = 51712 + n;
			e[51712 + n] = t[202][n]
		}
	t[203] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ™æ•æŒæˆæææšæ‹æ¯æ°™æ°šæ±¸æ±§æ±«æ²„æ²‹æ²æ±±æ±¯æ±©æ²šæ±­æ²‡æ²•æ²œæ±¦æ±³æ±¥æ±»æ²Žç´çºç‰£çŠ¿çŠ½ç‹ƒç‹†ç‹çŠºç‹…çŽ•çŽ—çŽ“çŽ”çŽ’ç”ºç”¹ç–”ç–•çšç¤½è€´è‚•è‚™è‚è‚’è‚œèŠèŠèŠ…èŠŽèŠ‘èŠ“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èŠŠèŠƒèŠ„è±¸è¿‰è¾¿é‚Ÿé‚¡é‚¥é‚žé‚§é‚ é˜°é˜¨é˜¯é˜­ä¸³ä¾˜ä½¼ä¾…ä½½ä¾€ä¾‡ä½¶ä½´ä¾‰ä¾„ä½·ä½Œä¾—ä½ªä¾šä½¹ä¾ä½¸ä¾ä¾œä¾”ä¾žä¾’ä¾‚ä¾•ä½«ä½®å†žå†¼å†¾åˆµåˆ²åˆ³å‰†åˆ±åŠ¼åŒŠåŒ‹åŒ¼åŽ’åŽ”å’‡å‘¿å’å’‘å’‚å’ˆå‘«å‘ºå‘¾å‘¥å‘¬å‘´å‘¦å’å‘¯å‘¡å‘ å’˜å‘£å‘§å‘¤å›·å›¹å¯å²å­å«å±å°å¶åž€åµå»å³å´å¢ï¿½"
		.split("");
	for (n = 0; n != t[203].length; ++n)
		if (t[203][n].charCodeAt(0) !== 65533) {
			r[t[203][n]] = 51968 + n;
			e[51968 + n] = t[203][n]
		}
	t[204] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¨å½å¤Œå¥…å¦µå¦ºå§å§Žå¦²å§Œå§å¦¶å¦¼å§ƒå§–å¦±å¦½å§€å§ˆå¦´å§‡å­¢å­¥å®“å®•å±„å±‡å²®å²¤å² å²µå²¯å²¨å²¬å²Ÿå²£å²­å²¢å²ªå²§å²å²¥å²¶å²°å²¦å¸—å¸”å¸™å¼¨å¼¢å¼£å¼¤å½”å¾‚å½¾å½½å¿žå¿¥æ€­æ€¦æ€™æ€²æ€‹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ€´æ€Šæ€—æ€³æ€šæ€žæ€¬æ€¢æ€æ€æ€®æ€“æ€‘æ€Œæ€‰æ€œæˆ”æˆ½æŠ­æŠ´æ‹‘æŠ¾æŠªæŠ¶æ‹ŠæŠ®æŠ³æŠ¯æŠ»æŠ©æŠ°æŠ¸æ”½æ–¨æ–»æ˜‰æ—¼æ˜„æ˜’æ˜ˆæ—»æ˜ƒæ˜‹æ˜æ˜…æ—½æ˜‘æ˜æ›¶æœŠæž…æ¬æžŽæž’æ¶æ»æž˜æž†æž„æ´æžæžŒæºæžŸæž‘æž™æžƒæ½æžæ¸æ¹æž”æ¬¥æ®€æ­¾æ¯žæ°æ²“æ³¬æ³«æ³®æ³™æ²¶æ³”æ²­æ³§æ²·æ³æ³‚æ²ºæ³ƒæ³†æ³­æ³²ï¿½"
		.split("");
	for (n = 0; n != t[204].length; ++n)
		if (t[204][n].charCodeAt(0) !== 65533) {
			r[t[204][n]] = 52224 + n;
			e[52224 + n] = t[204][n]
		}
	t[205] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ³’æ³æ²´æ²Šæ²æ²€æ³žæ³€æ´°æ³æ³‡æ²°æ³¹æ³æ³©æ³‘ç‚”ç‚˜ç‚…ç‚“ç‚†ç‚„ç‚‘ç‚–ç‚‚ç‚šç‚ƒç‰ªç‹–ç‹‹ç‹˜ç‹‰ç‹œç‹’ç‹”ç‹šç‹Œç‹‘çŽ¤çŽ¡çŽ­çŽ¦çŽ¢çŽ çŽ¬çŽç“ç“¨ç”¿ç•€ç”¾ç–Œç–˜çš¯ç›³ç›±ç›°ç›µçŸ¸çŸ¼çŸ¹çŸ»çŸºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çŸ·ç¥‚ç¤¿ç§…ç©¸ç©»ç«»ç±µç³½è€µè‚è‚®è‚£è‚¸è‚µè‚­èˆ èŠ è‹€èŠ«èŠšèŠ˜èŠ›èŠµèŠ§èŠ®èŠ¼èŠžèŠºèŠ´èŠ¨èŠ¡èŠ©è‹‚èŠ¤è‹ƒèŠ¶èŠ¢è™°è™¯è™­è™®è±–è¿’è¿‹è¿“è¿è¿–è¿•è¿—é‚²é‚´é‚¯é‚³é‚°é˜¹é˜½é˜¼é˜ºé™ƒä¿ä¿…ä¿“ä¾²ä¿‰ä¿‹ä¿ä¿”ä¿œä¿™ä¾»ä¾³ä¿›ä¿‡ä¿–ä¾ºä¿€ä¾¹ä¿¬å‰„å‰‰å‹€å‹‚åŒ½å¼åŽ—åŽ–åŽ™åŽ˜å’ºå’¡å’­å’¥å“ï¿½"
		.split("");
	for (n = 0; n != t[205].length; ++n)
		if (t[205][n].charCodeAt(0) !== 65533) {
			r[t[205][n]] = 52480 + n;
			e[52480 + n] = t[205][n]
		}
	t[206] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å“ƒèŒå’·å’®å“–å’¶å“…å“†å’ å‘°å’¼å’¢å’¾å‘²å“žå’°åžµåžžåžŸåž¤åžŒåž—åžåž›åž”åž˜åžåž™åž¥åžšåž•å£´å¤å¥“å§¡å§žå§®å¨€å§±å§å§ºå§½å§¼å§¶å§¤å§²å§·å§›å§©å§³å§µå§ å§¾å§´å§­å®¨å±Œå³å³˜å³Œå³—å³‹å³›ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å³žå³šå³‰å³‡å³Šå³–å³“å³”å³å³ˆå³†å³Žå³Ÿå³¸å·¹å¸¡å¸¢å¸£å¸ å¸¤åº°åº¤åº¢åº›åº£åº¥å¼‡å¼®å½–å¾†æ€·æ€¹æ”æ²æžæ…æ“æ‡æ‰æ›æŒæ€æ‚æŸæ€¤æ„æ˜æ¦æ®æ‰‚æ‰ƒæ‹æŒæŒ‹æ‹µæŒŽæŒƒæ‹«æ‹¹æŒæŒŒæ‹¸æ‹¶æŒ€æŒ“æŒ”æ‹ºæŒ•æ‹»æ‹°æ•æ•ƒæ–ªæ–¿æ˜¶æ˜¡æ˜²æ˜µæ˜œæ˜¦æ˜¢æ˜³æ˜«æ˜ºæ˜æ˜´æ˜¹æ˜®æœæœæŸæŸ²æŸˆæžºï¿½"
		.split("");
	for (n = 0; n != t[206].length; ++n)
		if (t[206][n].charCodeAt(0) !== 65533) {
			r[t[206][n]] = 52736 + n;
			e[52736 + n] = t[206][n]
		}
	t[207] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æŸœæž»æŸ¸æŸ˜æŸ€æž·æŸ…æŸ«æŸ¤æŸŸæžµæŸæž³æŸ·æŸ¶æŸ®æŸ£æŸ‚æž¹æŸŽæŸ§æŸ°æž²æŸ¼æŸ†æŸ­æŸŒæž®æŸ¦æŸ›æŸºæŸ‰æŸŠæŸƒæŸªæŸ‹æ¬¨æ®‚æ®„æ®¶æ¯–æ¯˜æ¯ æ° æ°¡æ´¨æ´´æ´­æ´Ÿæ´¼æ´¿æ´’æ´Šæ³šæ´³æ´„æ´™æ´ºæ´šæ´‘æ´€æ´æµ‚ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ´æ´˜æ´·æ´ƒæ´æµ€æ´‡æ´ æ´¬æ´ˆæ´¢æ´‰æ´ç‚·ç‚Ÿç‚¾ç‚±ç‚°ç‚¡ç‚´ç‚µç‚©ç‰ç‰‰ç‰Šç‰¬ç‰°ç‰³ç‰®ç‹Šç‹¤ç‹¨ç‹«ç‹Ÿç‹ªç‹¦ç‹£çŽ…çŒç‚çˆç…çŽ¹çŽ¶çŽµçŽ´ç«çŽ¿ç‡çŽ¾çƒç†çŽ¸ç‹ç“¬ç“®ç”®ç•‡ç•ˆç–§ç–ªç™¹ç›„çœˆçœƒçœ„çœ…çœŠç›·ç›»ç›ºçŸ§çŸ¨ç †ç ‘ç ’ç …ç ç ç Žç ‰ç ƒç “ç¥Šç¥Œç¥‹ç¥…ç¥„ç§•ç§ç§ç§–ç§Žçª€ï¿½"
		.split("");
	for (n = 0; n != t[207].length; ++n)
		if (t[207][n].charCodeAt(0) !== 65533) {
			r[t[207][n]] = 52992 + n;
			e[52992 + n] = t[207][n]
		}
	t[208] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç©¾ç«‘ç¬€ç¬ç±ºç±¸ç±¹ç±¿ç²€ç²ç´ƒç´ˆç´ç½˜ç¾‘ç¾ç¾¾è€‡è€Žè€è€”è€·èƒ˜èƒ‡èƒ èƒ‘èƒˆèƒ‚èƒèƒ…èƒ£èƒ™èƒœèƒŠèƒ•èƒ‰èƒèƒ—èƒ¦èƒè‡¿èˆ¡èŠ”è‹™è‹¾è‹¹èŒ‡è‹¨èŒ€è‹•èŒºè‹«è‹–è‹´è‹¬è‹¡è‹²è‹µèŒŒè‹»è‹¶è‹°è‹ªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‹¤è‹ è‹ºè‹³è‹­è™·è™´è™¼è™³è¡è¡Žè¡§è¡ªè¡©è§“è¨„è¨‡èµ²è¿£è¿¡è¿®è¿ éƒ±é‚½é‚¿éƒ•éƒ…é‚¾éƒ‡éƒ‹éƒˆé‡”é‡“é™”é™é™‘é™“é™Šé™Žå€žå€…å€‡å€“å€¢å€°å€›ä¿µä¿´å€³å€·å€¬ä¿¶ä¿·å€—å€œå€ å€§å€µå€¯å€±å€Žå…šå†”å†“å‡Šå‡„å‡…å‡ˆå‡Žå‰¡å‰šå‰’å‰žå‰Ÿå‰•å‰¢å‹åŒŽåŽžå”¦å“¢å”—å”’å“§å“³å“¤å”šå“¿å”„å”ˆå“«å”‘å”…å“±ï¿½"
		.split("");
	for (n = 0; n != t[208].length; ++n)
		if (t[208][n].charCodeAt(0) !== 65533) {
			r[t[208][n]] = 53248 + n;
			e[53248 + n] = t[208][n]
		}
	t[209] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å”Šå“»å“·å“¸å“ å”Žå”ƒå”‹åœåœ‚åŸŒå ²åŸ•åŸ’åžºåŸ†åž½åž¼åž¸åž¶åž¿åŸ‡åŸåž¹åŸå¤Žå¥Šå¨™å¨–å¨­å¨®å¨•å¨å¨—å¨Šå¨žå¨³å­¬å®§å®­å®¬å°ƒå±–å±”å³¬å³¿å³®å³±å³·å´€å³¹å¸©å¸¨åº¨åº®åºªåº¬å¼³å¼°å½§ææšæ§ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ææ‚¢æ‚ˆæ‚€æ‚’æ‚æ‚æ‚ƒæ‚•æ‚›æ‚—æ‚‡æ‚œæ‚Žæˆ™æ‰†æ‹²æŒæ–æŒ¬æ„æ…æŒ¶æƒæ¤æŒ¹æ‹æŠæŒ¼æŒ©ææŒ´æ˜æ”æ™æŒ­æ‡æŒ³æšæ‘æŒ¸æ—æ€æˆæ•Šæ•†æ—†æ—ƒæ—„æ—‚æ™Šæ™Ÿæ™‡æ™‘æœ’æœ“æ Ÿæ šæ¡‰æ ²æ ³æ »æ¡‹æ¡æ –æ ±æ œæ µæ «æ ­æ ¯æ¡Žæ¡„æ ´æ æ ’æ ”æ ¦æ ¨æ ®æ¡æ ºæ ¥æ  æ¬¬æ¬¯æ¬­æ¬±æ¬´æ­­è‚‚æ®ˆæ¯¦æ¯¤ï¿½"
		.split("");
	for (n = 0; n != t[209].length; ++n)
		if (t[209][n].charCodeAt(0) !== 65533) {
			r[t[209][n]] = 53504 + n;
			e[53504 + n] = t[209][n]
		}
	t[210] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¯¨æ¯£æ¯¢æ¯§æ°¥æµºæµ£æµ¤æµ¶æ´æµ¡æ¶’æµ˜æµ¢æµ­æµ¯æ¶‘æ¶æ·¯æµ¿æ¶†æµžæµ§æµ æ¶—æµ°æµ¼æµŸæ¶‚æ¶˜æ´¯æµ¨æ¶‹æµ¾æ¶€æ¶„æ´–æ¶ƒæµ»æµ½æµµæ¶çƒœçƒ“çƒ‘çƒçƒ‹ç¼¹çƒ¢çƒ—çƒ’çƒžçƒ çƒ”çƒçƒ…çƒ†çƒ‡çƒšçƒŽçƒ¡ç‰‚ç‰¸ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç‰·ç‰¶çŒ€ç‹ºç‹´ç‹¾ç‹¶ç‹³ç‹»çŒç“ç™ç¥ç–çŽ¼ç§ç£ç©çœç’ç›ç”ççšç—ç˜ç¨ç“žç“Ÿç“´ç“µç”¡ç•›ç•Ÿç–°ç—ç–»ç—„ç—€ç–¿ç–¶ç–ºçšŠç›‰çœçœ›çœçœ“çœ’çœ£çœ‘çœ•çœ™çœšçœ¢çœ§ç £ç ¬ç ¢ç µç ¯ç ¨ç ®ç «ç ¡ç ©ç ³ç ªç ±ç¥”ç¥›ç¥ç¥œç¥“ç¥’ç¥‘ç§«ç§¬ç§ ç§®ç§­ç§ªç§œç§žç§çª†çª‰çª…çª‹çªŒçªŠçª‡ç«˜ç¬ï¿½"
		.split("");
	for (n = 0; n != t[210].length; ++n)
		if (t[210][n].charCodeAt(0) !== 65533) {
			r[t[210][n]] = 53760 + n;
			e[53760 + n] = t[210][n]
		}
	t[211] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¬„ç¬“ç¬…ç¬ç¬ˆç¬Šç¬Žç¬‰ç¬’ç²„ç²‘ç²Šç²Œç²ˆç²ç²…ç´žç´ç´‘ç´Žç´˜ç´–ç´“ç´Ÿç´’ç´ç´Œç½œç½¡ç½žç½ ç½ç½›ç¾–ç¾’ç¿ƒç¿‚ç¿€è€–è€¾è€¹èƒºèƒ²èƒ¹èƒµè„èƒ»è„€èˆèˆ¯èˆ¥èŒ³èŒ­è„èŒ™è‘èŒ¥è–èŒ¿èèŒ¦èŒœèŒ¢ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‚èŽèŒ›èŒªèŒˆèŒ¼èèŒ–èŒ¤èŒ èŒ·èŒ¯èŒ©è‡è…èŒè“èŒžèŒ¬è‹èŒ§èˆè™“è™’èš¢èš¨èš–èšèš‘èšžèš‡èš—èš†èš‹èššèš…èš¥èš™èš¡èš§èš•èš˜èšŽèšèšèš”è¡ƒè¡„è¡­è¡µè¡¶è¡²è¢€è¡±è¡¿è¡¯è¢ƒè¡¾è¡´è¡¼è¨’è±‡è±—è±»è²¤è²£èµ¶èµ¸è¶µè¶·è¶¶è»‘è»“è¿¾è¿µé€‚è¿¿è¿»é€„è¿¼è¿¶éƒ–éƒ éƒ™éƒšéƒ£éƒŸéƒ¥éƒ˜éƒ›éƒ—éƒœéƒ¤é…ï¿½"
		.split("");
	for (n = 0; n != t[211].length; ++n)
		if (t[211][n].charCodeAt(0) !== 65533) {
			r[t[211][n]] = 54016 + n;
			e[54016 + n] = t[211][n]
		}
	t[212] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é…Žé…é‡•é‡¢é‡šé™œé™Ÿéš¼é££é«Ÿé¬¯ä¹¿å°åªå¡åžå å“å‹åå²åˆååå›åŠå¢å€•å…åŸå©å«å£å¤å†å€å®å³å—å‘å‡å‰«å‰­å‰¬å‰®å‹–å‹“åŒ­åŽœå•µå•¶å”¼å•å•å”´å”ªå•‘å•¢å”¶å”µå”°å•’å•…ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å”Œå”²å•¥å•Žå”¹å•ˆå”­å”»å•€å•‹åœŠåœ‡åŸ»å ”åŸ¢åŸ¶åŸœåŸ´å €åŸ­åŸ½å ˆåŸ¸å ‹åŸ³åŸå ‡åŸ®åŸ£åŸ²åŸ¥åŸ¬åŸ¡å ŽåŸ¼å åŸ§å å ŒåŸ±åŸ©åŸ°å å „å¥œå© å©˜å©•å©§å©žå¨¸å¨µå©­å©å©Ÿå©¥å©¬å©“å©¤å©—å©ƒå©å©’å©„å©›å©ˆåªŽå¨¾å©å¨¹å©Œå©°å©©å©‡å©‘å©–å©‚å©œå­²å­®å¯å¯€å±™å´žå´‹å´å´šå´ å´Œå´¨å´å´¦å´¥å´ï¿½"
		.split("");
	for (n = 0; n != t[212].length; ++n)
		if (t[212][n].charCodeAt(0) !== 65533) {
			r[t[212][n]] = 54272 + n;
			e[54272 + n] = t[212][n]
		}
	t[213] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å´°å´’å´£å´Ÿå´®å¸¾å¸´åº±åº´åº¹åº²åº³å¼¶å¼¸å¾›å¾–å¾Ÿæ‚Šæ‚æ‚†æ‚¾æ‚°æ‚ºæƒ“æƒ”æƒæƒ¤æƒ™æƒæƒˆæ‚±æƒ›æ‚·æƒŠæ‚¿æƒƒæƒæƒ€æŒ²æ¥æŽŠæŽ‚æ½æŽ½æŽžæŽ­æŽæŽ—æŽ«æŽŽæ¯æŽ‡æŽæ®æŽ¯æµæŽœæ­æŽ®æ¼æŽ¤æŒ»æŽŸï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¸æŽ…æŽæŽ‘æŽæ°æ•“æ—æ™¥æ™¡æ™›æ™™æ™œæ™¢æœ˜æ¡¹æ¢‡æ¢æ¢œæ¡­æ¡®æ¢®æ¢«æ¥–æ¡¯æ¢£æ¢¬æ¢©æ¡µæ¡´æ¢²æ¢æ¡·æ¢’æ¡¼æ¡«æ¡²æ¢ªæ¢€æ¡±æ¡¾æ¢›æ¢–æ¢‹æ¢ æ¢‰æ¢¤æ¡¸æ¡»æ¢‘æ¢Œæ¢Šæ¡½æ¬¶æ¬³æ¬·æ¬¸æ®‘æ®æ®æ®Žæ®Œæ°ªæ·€æ¶«æ¶´æ¶³æ¹´æ¶¬æ·©æ·¢æ¶·æ·¶æ·”æ¸€æ·ˆæ· æ·Ÿæ·–æ¶¾æ·¥æ·œæ·æ·›æ·´æ·Šæ¶½æ·­æ·°æ¶ºæ·•æ·‚æ·æ·‰ï¿½"
		.split("");
	for (n = 0; n != t[213].length; ++n)
		if (t[213][n].charCodeAt(0) !== 65533) {
			r[t[213][n]] = 54528 + n;
			e[54528 + n] = t[213][n]
		}
	t[214] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ·æ·²æ·“æ·½æ·—æ·æ·£æ¶»çƒºç„çƒ·ç„—çƒ´ç„Œçƒ°ç„„çƒ³ç„çƒ¼çƒ¿ç„†ç„“ç„€çƒ¸çƒ¶ç„‹ç„‚ç„Žç‰¾ç‰»ç‰¼ç‰¿çŒçŒ—çŒ‡çŒ‘çŒ˜çŒŠçŒˆç‹¿çŒçŒžçŽˆç¶ç¸çµç„çç½ç‡ç€çºç¼ç¿çŒç‹ç´çˆç•¤ç•£ç—Žç—’ç—ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç—‹ç—Œç—‘ç—çšçš‰ç›“çœ¹çœ¯çœ­çœ±çœ²çœ´çœ³çœ½çœ¥çœ»çœµç¡ˆç¡’ç¡‰ç¡ç¡Šç¡Œç ¦ç¡…ç¡ç¥¤ç¥§ç¥©ç¥ªç¥£ç¥«ç¥¡ç¦»ç§ºç§¸ç§¶ç§·çªçª”çªç¬µç­‡ç¬´ç¬¥ç¬°ç¬¢ç¬¤ç¬³ç¬˜ç¬ªç¬ç¬±ç¬«ç¬­ç¬¯ç¬²ç¬¸ç¬šç¬£ç²”ç²˜ç²–ç²£ç´µç´½ç´¸ç´¶ç´ºçµ…ç´¬ç´©çµçµ‡ç´¾ç´¿çµŠç´»ç´¨ç½£ç¾•ç¾œç¾ç¾›ç¿Šç¿‹ç¿ç¿ç¿‘ç¿‡ç¿ç¿‰è€Ÿï¿½"
		.split("");
	for (n = 0; n != t[214].length; ++n)
		if (t[214][n].charCodeAt(0) !== 65533) {
			r[t[214][n]] = 54784 + n;
			e[54784 + n] = t[214][n]
		}
	t[215] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è€žè€›è‡èƒèˆè„˜è„¥è„™è„›è„­è„Ÿè„¬è„žè„¡è„•è„§è„è„¢èˆ‘èˆ¸èˆ³èˆºèˆ´èˆ²è‰´èŽèŽ£èŽ¨èŽèºè³èŽ¤è´èŽèŽèŽ•èŽ™èµèŽ”èŽ©è½èŽƒèŽŒèŽèŽ›èŽªèŽ‹è¾èŽ¥èŽ¯èŽˆèŽ—èŽ°è¿èŽ¦èŽ‡èŽ®è¶èŽšè™™è™–èš¿èš·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è›‚è›è›…èšºèš°è›ˆèš¹èš³èš¸è›Œèš´èš»èš¼è›ƒèš½èš¾è¡’è¢‰è¢•è¢¨è¢¢è¢ªè¢šè¢‘è¢¡è¢Ÿè¢˜è¢§è¢™è¢›è¢—è¢¤è¢¬è¢Œè¢“è¢Žè¦‚è§–è§™è§•è¨°è¨§è¨¬è¨žè°¹è°»è±œè±è±½è²¥èµ½èµ»èµ¹è¶¼è·‚è¶¹è¶¿è·è»˜è»žè»è»œè»—è» è»¡é€¤é€‹é€‘é€œé€Œé€¡éƒ¯éƒªéƒ°éƒ´éƒ²éƒ³éƒ”éƒ«éƒ¬éƒ©é…–é…˜é…šé…“é…•é‡¬é‡´é‡±é‡³é‡¸é‡¤é‡¹é‡ªï¿½"
		.split("");
	for (n = 0; n != t[215].length; ++n)
		if (t[215][n].charCodeAt(0) !== 65533) {
			r[t[215][n]] = 55040 + n;
			e[55040 + n] = t[215][n]
		}
	t[216] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é‡«é‡·é‡¨é‡®é•ºé–†é–ˆé™¼é™­é™«é™±é™¯éš¿éªé „é£¥é¦—å‚›å‚•å‚”å‚žå‚‹å‚£å‚ƒå‚Œå‚Žå‚å¨å‚œå‚’å‚‚å‚‡å…Ÿå‡”åŒ’åŒ‘åŽ¤åŽ§å–‘å–¨å–¥å–­å•·å™…å–¢å–“å–ˆå–å–µå–å–£å–’å–¤å•½å–Œå–¦å•¿å–•å–¡å–ŽåœŒå ©å ·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å ™å žå §å £å ¨åŸµå¡ˆå ¥å œå ›å ³å ¿å ¶å ®å ¹å ¸å ­å ¬å »å¥¡åª¯åª”åªŸå©ºåª¢åªžå©¸åª¦å©¼åª¥åª¬åª•åª®å¨·åª„åªŠåª—åªƒåª‹åª©å©»å©½åªŒåªœåªåª“åªå¯ªå¯å¯‹å¯”å¯‘å¯Šå¯Žå°Œå°°å´·åµƒåµ«åµåµ‹å´¿å´µåµ‘åµŽåµ•å´³å´ºåµ’å´½å´±åµ™åµ‚å´¹åµ‰å´¸å´¼å´²å´¶åµ€åµ…å¹„å¹å½˜å¾¦å¾¥å¾«æƒ‰æ‚¹æƒŒæƒ¢æƒŽæƒ„æ„”ï¿½"
		.split("");
	for (n = 0; n != t[216].length; ++n)
		if (t[216][n].charCodeAt(0) !== 65533) {
			r[t[216][n]] = 55296 + n;
			e[55296 + n] = t[216][n]
		}
	t[217] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æƒ²æ„Šæ„–æ„…æƒµæ„“æƒ¸æƒ¼æƒ¾æƒæ„ƒæ„˜æ„æ„æƒ¿æ„„æ„‹æ‰ŠæŽ”æŽ±æŽ°æŽæ¥æ¨æ¯æƒæ’æ³æŠæ æ¶æ•æ²æµæ‘¡æŸæŽ¾ææœæ„æ˜æ“æ‚æ‡æŒæ‹æˆæ°æ—æ™æ”²æ•§æ•ªæ•¤æ•œæ•¨æ•¥æ–Œæ–æ–žæ–®æ—æ—’ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ™¼æ™¬æ™»æš€æ™±æ™¹æ™ªæ™²æœæ¤Œæ£“æ¤„æ£œæ¤ªæ£¬æ£ªæ£±æ¤æ£–æ£·æ£«æ£¤æ£¶æ¤“æ¤æ£³æ£¡æ¤‡æ£Œæ¤ˆæ¥°æ¢´æ¤‘æ£¯æ£†æ¤”æ£¸æ£æ£½æ£¼æ£¨æ¤‹æ¤Šæ¤—æ£Žæ£ˆæ£æ£žæ£¦æ£´æ£‘æ¤†æ£”æ£©æ¤•æ¤¥æ£‡æ¬¹æ¬»æ¬¿æ¬¼æ®”æ®—æ®™æ®•æ®½æ¯°æ¯²æ¯³æ°°æ·¼æ¹†æ¹‡æ¸Ÿæ¹‰æºˆæ¸¼æ¸½æ¹…æ¹¢æ¸«æ¸¿æ¹æ¹æ¹³æ¸œæ¸³æ¹‹æ¹€æ¹‘æ¸»æ¸ƒæ¸®æ¹žï¿½"
		.split("");
	for (n = 0; n != t[217].length; ++n)
		if (t[217][n].charCodeAt(0) !== 65533) {
			r[t[217][n]] = 55552 + n;
			e[55552 + n] = t[217][n]
		}
	t[218] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¹¨æ¹œæ¹¡æ¸±æ¸¨æ¹ æ¹±æ¹«æ¸¹æ¸¢æ¸°æ¹“æ¹¥æ¸§æ¹¸æ¹¤æ¹·æ¹•æ¹¹æ¹’æ¹¦æ¸µæ¸¶æ¹šç„ ç„žç„¯çƒ»ç„®ç„±ç„£ç„¥ç„¢ç„²ç„Ÿç„¨ç„ºç„›ç‰‹ç‰šçŠˆçŠ‰çŠ†çŠ…çŠ‹çŒ’çŒ‹çŒ°çŒ¢çŒ±çŒ³çŒ§çŒ²çŒ­çŒ¦çŒ£çŒµçŒŒç®ç¬ç°ç«ç–ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çšç¡ç­ç±ç¤ç£çç©ç ç²ç“»ç”¯ç•¯ç•¬ç—§ç—šç—¡ç—¦ç—ç—Ÿç—¤ç——çš•çš’ç›šç†ç‡ç„çç…çŠçŽç‹çŒçŸžçŸ¬ç¡ ç¡¤ç¡¥ç¡œç¡­ç¡±ç¡ªç¡®ç¡°ç¡©ç¡¨ç¡žç¡¢ç¥´ç¥³ç¥²ç¥°ç¨‚ç¨Šç¨ƒç¨Œç¨„çª™ç«¦ç«¤ç­Šç¬»ç­„ç­ˆç­Œç­Žç­€ç­˜ç­…ç²¢ç²žç²¨ç²¡çµ˜çµ¯çµ£çµ“çµ–çµ§çµªçµçµ­çµœçµ«çµ’çµ”çµ©çµ‘çµŸçµŽç¼¾ç¼¿ç½¥ï¿½"
		.split("");
	for (n = 0; n != t[218].length; ++n)
		if (t[218][n].charCodeAt(0) !== 65533) {
			r[t[218][n]] = 55808 + n;
			e[55808 + n] = t[218][n]
		}
	t[219] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç½¦ç¾¢ç¾ ç¾¡ç¿—è‘èèèƒ¾èƒ”è…ƒè…Šè…’è…è…‡è„½è…è„ºè‡¦è‡®è‡·è‡¸è‡¹èˆ„èˆ¼èˆ½èˆ¿è‰µèŒ»èè¹è£è€è¨è’è§è¤è¼è¶èè†èˆè«è£èŽ¿èèè¥è˜è¿è¡è‹èŽè–èµè‰è‰èèžè‘è†è‚è³ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è•èºè‡è‘èªè“èƒè¬è®è„è»è—è¢è›è›è¾è›˜è›¢è›¦è›“è›£è›šè›ªè›è›«è›œè›¬è›©è›—è›¨è›‘è¡ˆè¡–è¡•è¢ºè£—è¢¹è¢¸è£€è¢¾è¢¶è¢¼è¢·è¢½è¢²è¤è£‰è¦•è¦˜è¦—è§è§šè§›è©Žè©è¨¹è©™è©€è©—è©˜è©„è©…è©’è©ˆè©‘è©Šè©Œè©è±Ÿè²è²€è²ºè²¾è²°è²¹è²µè¶„è¶€è¶‰è·˜è·“è·è·‡è·–è·œè·è·•è·™è·ˆè·—è·…è»¯è»·è»ºï¿½"
		.split("");
	for (n = 0; n != t[219].length; ++n)
		if (t[219][n].charCodeAt(0) !== 65533) {
			r[t[219][n]] = 56064 + n;
			e[56064 + n] = t[219][n]
		}
	t[220] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è»¹è»¦è»®è»¥è»µè»§è»¨è»¶è»«è»±è»¬è»´è»©é€­é€´é€¯é„†é„¬é„„éƒ¿éƒ¼é„ˆéƒ¹éƒ»é„é„€é„‡é„…é„ƒé…¡é…¤é…Ÿé…¢é… éˆéˆŠéˆ¥éˆƒéˆšéˆ¦éˆéˆŒéˆ€éˆ’é‡¿é‡½éˆ†éˆ„éˆ§éˆ‚éˆœéˆ¤éˆ™éˆ—éˆ…éˆ–é•»é–é–Œé–éš‡é™¾éšˆï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éš‰éšƒéš€é›‚é›ˆé›ƒé›±é›°é¬é°é®é ‡é¢©é£«é³¦é»¹äºƒäº„äº¶å‚½å‚¿åƒ†å‚®åƒ„åƒŠå‚´åƒˆåƒ‚å‚°åƒå‚ºå‚±åƒ‹åƒ‰å‚¶å‚¸å‡—å‰ºå‰¸å‰»å‰¼å—ƒå—›å—Œå—å—‹å—Šå—å—€å—”å—„å—©å–¿å—’å–å—å—•å—¢å—–å—ˆå—²å—å—™å—‚åœ”å¡“å¡¨å¡¤å¡å¡å¡‰å¡¯å¡•å¡Žå¡å¡™å¡¥å¡›å ½å¡£å¡±å£¼å«‡å«„å«‹åªºåª¸åª±åªµåª°åª¿å«ˆåª»å«†ï¿½"
		.split("");
	for (n = 0; n != t[220].length; ++n)
		if (t[220][n].charCodeAt(0) !== 65533) {
			r[t[220][n]] = 56320 + n;
			e[56320 + n] = t[220][n]
		}
	t[221] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åª·å«€å«Šåª´åª¶å«åª¹åªå¯–å¯˜å¯™å°Ÿå°³åµ±åµ£åµŠåµ¥åµ²åµ¬åµžåµ¨åµ§åµ¢å·°å¹å¹Žå¹Šå¹å¹‹å»…å»Œå»†å»‹å»‡å½€å¾¯å¾­æƒ·æ…‰æ…Šæ„«æ……æ„¶æ„²æ„®æ…†æ„¯æ…æ„©æ…€æˆ é…¨æˆ£æˆ¥æˆ¤æ…æ±æ«ææ’æ‰æ æ¤ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ³æ‘ƒæŸæ•æ˜æ¹æ·æ¢æ£æŒæ¦æ°æ¨æ‘æµæ¯æŠæšæ‘€æ¥æ§æ‹æ§æ›æ®æ¡æŽæ•¯æ–’æ—“æš†æšŒæš•æšæš‹æšŠæš™æš”æ™¸æœ æ¥¦æ¥Ÿæ¤¸æ¥Žæ¥¢æ¥±æ¤¿æ¥…æ¥ªæ¤¹æ¥‚æ¥—æ¥™æ¥ºæ¥ˆæ¥‰æ¤µæ¥¬æ¤³æ¤½æ¥¥æ£°æ¥¸æ¤´æ¥©æ¥€æ¥¯æ¥„æ¥¶æ¥˜æ¥æ¥´æ¥Œæ¤»æ¥‹æ¤·æ¥œæ¥æ¥‘æ¤²æ¥’æ¤¯æ¥»æ¤¼æ­†æ­…æ­ƒæ­‚æ­ˆæ­æ®›ï¨æ¯»æ¯¼ï¿½"
		.split("");
	for (n = 0; n != t[221].length; ++n)
		if (t[221][n].charCodeAt(0) !== 65533) {
			r[t[221][n]] = 56576 + n;
			e[56576 + n] = t[221][n]
		}
	t[222] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¯¹æ¯·æ¯¸æº›æ»–æ»ˆæºæ»€æºŸæº“æº”æº æº±æº¹æ»†æ»’æº½æ»æºžæ»‰æº·æº°æ»æº¦æ»æº²æº¾æ»ƒæ»œæ»˜æº™æº’æºŽæºæº¤æº¡æº¿æº³æ»æ»Šæº—æº®æº£ç…‡ç…”ç…’ç…£ç… ç…ç…ç…¢ç…²ç…¸ç…ªç…¡ç…‚ç…˜ç…ƒç…‹ç…°ç…Ÿç…ç…“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç…„ç…ç…šç‰çŠçŠŒçŠ‘çŠçŠŽçŒ¼ç‚çŒ»çŒºç€çŠç‰ç‘„ç‘Šç‘‹ç‘’ç‘‘ç‘—ç‘€ç‘ç‘ç‘Žç‘‚ç‘†ç‘ç‘”ç“¡ç“¿ç“¾ç“½ç”ç•¹ç•·æ¦ƒç—¯ç˜ç˜ƒç—·ç—¾ç—¼ç—¹ç—¸ç˜ç—»ç—¶ç—­ç—µç—½çš™çšµç›ç•çŸç ç’ç–çšç©ç§ç”ç™ç­çŸ ç¢‡ç¢šç¢”ç¢ç¢„ç¢•ç¢…ç¢†ç¢¡ç¢ƒç¡¹ç¢™ç¢€ç¢–ç¡»ç¥¼ç¦‚ç¥½ç¥¹ç¨‘ç¨˜ç¨™ç¨’ç¨—ç¨•ç¨¢ç¨“ï¿½"
		.split("");
	for (n = 0; n != t[222].length; ++n)
		if (t[222][n].charCodeAt(0) !== 65533) {
			r[t[222][n]] = 56832 + n;
			e[56832 + n] = t[222][n]
		}
	t[223] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¨›ç¨çª£çª¢çªžç««ç­¦ç­¤ç­­ç­´ç­©ç­²ç­¥ç­³ç­±ç­°ç­¡ç­¸ç­¶ç­£ç²²ç²´ç²¯ç¶ˆç¶†ç¶€ç¶çµ¿ç¶…çµºç¶Žçµ»ç¶ƒçµ¼ç¶Œç¶”ç¶„çµ½ç¶’ç½­ç½«ç½§ç½¨ç½¬ç¾¦ç¾¥ç¾§ç¿›ç¿œè€¡è…¤è… è…·è…œè…©è…›è…¢è…²æœ¡è…žè…¶è…§è…¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è…„è…¡èˆè‰‰è‰„è‰€è‰‚è‰…è“±è¿è‘–è‘¶è‘¹è’è’è‘¥è‘‘è‘€è’†è‘§è°è‘è‘½è‘šè‘™è‘´è‘³è‘è”‡è‘žè·èºè´è‘ºè‘ƒè‘¸è²è‘…è©è™è‘‹è¯è‘‚è­è‘Ÿè‘°è¹è‘Žè‘Œè‘’è‘¯è“…è’Žè»è‘‡è¶è³è‘¨è‘¾è‘„è«è‘ è‘”è‘®è‘èœ‹èœ„è›·èœŒè›ºè›–è›µèè›¸èœŽèœ‰èœè›¶èœèœ…è£–è£‹è£è£Žè£žè£›è£šè£Œè£è¦…è¦›è§Ÿè§¥è§¤ï¿½"
		.split("");
	for (n = 0; n != t[223].length; ++n)
		if (t[223][n].charCodeAt(0) !== 65533) {
			r[t[223][n]] = 57088 + n;
			e[57088 + n] = t[223][n]
		}
	t[224] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è§¡è§ è§¢è§œè§¦è©¶èª†è©¿è©¡è¨¿è©·èª‚èª„è©µèªƒèªè©´è©ºè°¼è±‹è±Šè±¥è±¤è±¦è²†è²„è²…è³Œèµ¨èµ©è¶‘è¶Œè¶Žè¶è¶è¶“è¶”è¶è¶’è·°è· è·¬è·±è·®è·è·©è·£è·¢è·§è·²è·«è·´è¼†è»¿è¼è¼€è¼…è¼‡è¼ˆè¼‚è¼‹é’é€¿ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é„é‰é€½é„é„é„é„‘é„–é„”é„‹é„Žé…®é…¯é‰ˆé‰’éˆ°éˆºé‰¦éˆ³é‰¥é‰žéŠƒéˆ®é‰Šé‰†é‰­é‰¬é‰é‰ é‰§é‰¯éˆ¶é‰¡é‰°éˆ±é‰”é‰£é‰é‰²é‰Žé‰“é‰Œé‰–éˆ²é–Ÿé–œé–žé–›éš’éš“éš‘éš—é›Žé›ºé›½é›¸é›µé³é·é¸é²é é é Žé¢¬é£¶é£¹é¦¯é¦²é¦°é¦µéª­éª«é­›é³ªé³­é³§éº€é»½åƒ¦åƒ”åƒ—åƒ¨åƒ³åƒ›åƒªåƒåƒ¤åƒ“åƒ¬åƒ°åƒ¯åƒ£åƒ ï¿½"
		.split("");
	for (n = 0; n != t[224].length; ++n)
		if (t[224][n].charCodeAt(0) !== 65533) {
			r[t[224][n]] = 57344 + n;
			e[57344 + n] = t[224][n]
		}
	t[225] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å‡˜åŠ€åŠå‹©å‹«åŒ°åŽ¬å˜§å˜•å˜Œå˜’å—¼å˜å˜œå˜å˜“å˜‚å—ºå˜å˜„å—¿å—¹å¢‰å¡¼å¢å¢˜å¢†å¢å¡¿å¡´å¢‹å¡ºå¢‡å¢‘å¢Žå¡¶å¢‚å¢ˆå¡»å¢”å¢å£¾å¥«å«œå«®å«¥å«•å«ªå«šå«­å««å«³å«¢å« å«›å«¬å«žå«å«™å«¨å«Ÿå­·å¯ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¯£å±£å¶‚å¶€åµ½å¶†åµºå¶åµ·å¶Šå¶‰å¶ˆåµ¾åµ¼å¶åµ¹åµ¿å¹˜å¹™å¹“å»˜å»‘å»—å»Žå»œå»•å»™å»’å»”å½„å½ƒå½¯å¾¶æ„¬æ„¨æ…æ…žæ…±æ…³æ…’æ…“æ…²æ…¬æ†€æ…´æ…”æ…ºæ…›æ…¥æ„»æ…ªæ…¡æ…–æˆ©æˆ§æˆ«æ«æ‘æ‘›æ‘æ‘´æ‘¶æ‘²æ‘³æ‘½æ‘µæ‘¦æ’¦æ‘Žæ’‚æ‘žæ‘œæ‘‹æ‘“æ‘ æ‘æ‘¿æ¿æ‘¬æ‘«æ‘™æ‘¥æ‘·æ•³æ– æš¡æš æšŸæœ…æœ„æœ¢æ¦±æ¦¶æ§‰ï¿½"
		.split("");
	for (n = 0; n != t[225].length; ++n)
		if (t[225][n].charCodeAt(0) !== 65533) {
			r[t[225][n]] = 57600 + n;
			e[57600 + n] = t[225][n]
		}
	t[226] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¦ æ§Žæ¦–æ¦°æ¦¬æ¦¼æ¦‘æ¦™æ¦Žæ¦§æ¦æ¦©æ¦¾æ¦¯æ¦¿æ§„æ¦½æ¦¤æ§”æ¦¹æ§Šæ¦šæ§æ¦³æ¦“æ¦ªæ¦¡æ¦žæ§™æ¦—æ¦æ§‚æ¦µæ¦¥æ§†æ­Šæ­æ­‹æ®žæ®Ÿæ® æ¯ƒæ¯„æ¯¾æ»Žæ»µæ»±æ¼ƒæ¼¥æ»¸æ¼·æ»»æ¼®æ¼‰æ½Žæ¼™æ¼šæ¼§æ¼˜æ¼»æ¼’æ»­æ¼Šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¼¶æ½³æ»¹æ»®æ¼­æ½€æ¼°æ¼¼æ¼µæ»«æ¼‡æ¼Žæ½ƒæ¼…æ»½æ»¶æ¼¹æ¼œæ»¼æ¼ºæ¼Ÿæ¼æ¼žæ¼ˆæ¼¡ç†‡ç†ç†‰ç†€ç†…ç†‚ç†ç…»ç††ç†ç†—ç‰„ç‰“çŠ—çŠ•çŠ“çƒçç‘çŒç‘¢ç‘³ç‘±ç‘µç‘²ç‘§ç‘®ç”€ç”‚ç”ƒç•½ç–ç˜–ç˜ˆç˜Œç˜•ç˜‘ç˜Šç˜”çš¸çžç¼çž…çž‚ç®çž€ç¯ç¾çžƒç¢²ç¢ªç¢´ç¢­ç¢¨ç¡¾ç¢«ç¢žç¢¥ç¢ ç¢¬ç¢¢ç¢¤ç¦˜ç¦Šç¦‹ç¦–ç¦•ç¦”ç¦“ï¿½"
		.split("");
	for (n = 0; n != t[226].length; ++n)
		if (t[226][n].charCodeAt(0) !== 65533) {
			r[t[226][n]] = 57856 + n;
			e[57856 + n] = t[226][n]
		}
	t[227] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¦—ç¦ˆç¦’ç¦ç¨«ç©Šç¨°ç¨¯ç¨¨ç¨¦çª¨çª«çª¬ç«®ç®ˆç®œç®Šç®‘ç®ç®–ç®ç®Œç®›ç®Žç®…ç®˜åŠ„ç®™ç®¤ç®‚ç²»ç²¿ç²¼ç²ºç¶§ç¶·ç·‚ç¶£ç¶ªç·ç·€ç·…ç¶ç·Žç·„ç·†ç·‹ç·Œç¶¯ç¶¹ç¶–ç¶¼ç¶Ÿç¶¦ç¶®ç¶©ç¶¡ç·‰ç½³ç¿¢ç¿£ç¿¥ç¿žï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è€¤èèœè†‰è††è†ƒè†‡è†è†Œè†‹èˆ•è’—è’¤è’¡è’Ÿè’ºè“Žè“‚è’¬è’®è’«è’¹è’´è“è“è’ªè’šè’±è“è’è’§è’»è’¢è’”è“‡è“Œè’›è’©è’¯è’¨è“–è’˜è’¶è“è’ è“—è“”è“’è“›è’°è’‘è™¡èœ³èœ£èœ¨è«è€èœ®èœžèœ¡èœ™èœ›èƒèœ¬èèœ¾è†èœ èœ²èœªèœ­èœ¼èœ’èœºèœ±èœµè‚èœ¦èœ§èœ¸èœ¤èœšèœ°èœ‘è£·è£§è£±è£²è£ºè£¾è£®è£¼è£¶è£»ï¿½"
		.split("");
	for (n = 0; n != t[227].length; ++n)
		if (t[227][n].charCodeAt(0) !== 65533) {
			r[t[227][n]] = 58112 + n;
			e[58112 + n] = t[227][n]
		}
	t[228] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è£°è£¬è£«è¦è¦¡è¦Ÿè¦žè§©è§«è§¨èª«èª™èª‹èª’èªèª–è°½è±¨è±©è³•è³è³—è¶–è¸‰è¸‚è·¿è¸è·½è¸Šè¸ƒè¸‡è¸†è¸…è·¾è¸€è¸„è¼è¼‘è¼Žè¼é„£é„œé„ é„¢é„Ÿé„é„šé„¤é„¡é„›é…ºé…²é…¹é…³éŠ¥éŠ¤é‰¶éŠ›é‰ºéŠ éŠ”éŠªéŠï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŠ¦éŠšéŠ«é‰¹éŠ—é‰¿éŠ£é‹®éŠŽéŠ‚éŠ•éŠ¢é‰½éŠˆéŠ¡éŠŠéŠ†éŠŒéŠ™éŠ§é‰¾éŠ‡éŠ©éŠéŠ‹éˆ­éšžéš¡é›¿é˜é½éºé¾éžƒéž€éž‚é»éž„éžé¿éŸŽéŸé –é¢­é¢®é¤‚é¤€é¤‡é¦é¦œé§ƒé¦¹é¦»é¦ºé§‚é¦½é§‡éª±é«£é«§é¬¾é¬¿é­ é­¡é­Ÿé³±é³²é³µéº§åƒ¿å„ƒå„°åƒ¸å„†å„‡åƒ¶åƒ¾å„‹å„Œåƒ½å„ŠåŠ‹åŠŒå‹±å‹¯å™ˆå™‚å™Œå˜µå™å™Šå™‰å™†å™˜ï¿½"
		.split("");
	for (n = 0; n != t[228].length; ++n)
		if (t[228][n].charCodeAt(0) !== 65533) {
			r[t[228][n]] = 58368 + n;
			e[58368 + n] = t[228][n]
		}
	t[229] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å™šå™€å˜³å˜½å˜¬å˜¾å˜¸å˜ªå˜ºåœšå¢«å¢å¢±å¢ å¢£å¢¯å¢¬å¢¥å¢¡å£¿å«¿å«´å«½å«·å«¶å¬ƒå«¸å¬‚å«¹å¬å¬‡å¬…å¬å±§å¶™å¶—å¶Ÿå¶’å¶¢å¶“å¶•å¶ å¶œå¶¡å¶šå¶žå¹©å¹å¹ å¹œç·³å»›å»žå»¡å½‰å¾²æ†‹æ†ƒæ…¹æ†±æ†°æ†¢æ†‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ†›æ†“æ†¯æ†­æ†Ÿæ†’æ†ªæ†¡æ†æ…¦æ†³æˆ­æ‘®æ‘°æ’–æ’ æ’…æ’—æ’œæ’æ’‹æ’Šæ’Œæ’£æ’Ÿæ‘¨æ’±æ’˜æ•¶æ•ºæ•¹æ•»æ–²æ–³æšµæš°æš©æš²æš·æšªæš¯æ¨€æ¨†æ¨—æ§¥æ§¸æ¨•æ§±æ§¤æ¨ æ§¿æ§¬æ§¢æ¨›æ¨æ§¾æ¨§æ§²æ§®æ¨”æ§·æ§§æ©€æ¨ˆæ§¦æ§»æ¨æ§¼æ§«æ¨‰æ¨„æ¨˜æ¨¥æ¨æ§¶æ¨¦æ¨‡æ§´æ¨–æ­‘æ®¥æ®£æ®¢æ®¦æ°æ°€æ¯¿æ°‚æ½æ¼¦æ½¾æ¾‡æ¿†æ¾’ï¿½"
		.split("");
	for (n = 0; n != t[229].length; ++n)
		if (t[229][n].charCodeAt(0) !== 65533) {
			r[t[229][n]] = 58624 + n;
			e[58624 + n] = t[229][n]
		}
	t[230] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¾æ¾‰æ¾Œæ½¢æ½æ¾…æ½šæ¾–æ½¶æ½¬æ¾‚æ½•æ½²æ½’æ½æ½—æ¾”æ¾“æ½æ¼€æ½¡æ½«æ½½æ½§æ¾æ½“æ¾‹æ½©æ½¿æ¾•æ½£æ½·æ½ªæ½»ç†²ç†¯ç†›ç†°ç† ç†šç†©ç†µç†ç†¥ç†žç†¤ç†¡ç†ªç†œç†§ç†³çŠ˜çŠšç˜ç’çžçŸç çç›ç¡çšç™ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¢ç’‡ç’‰ç’Šç’†ç’ç‘½ç’…ç’ˆç‘¼ç‘¹ç”ˆç”‡ç•¾ç˜¥ç˜žç˜™ç˜ç˜œç˜£ç˜šç˜¨ç˜›çšœçšçšžçš›çžçžçž‰çžˆç£ç¢»ç£ç£Œç£‘ç£Žç£”ç£ˆç£ƒç£„ç£‰ç¦šç¦¡ç¦ ç¦œç¦¢ç¦›æ­¶ç¨¹çª²çª´çª³ç®·ç¯‹ç®¾ç®¬ç¯Žç®¯ç®¹ç¯Šç®µç³…ç³ˆç³Œç³‹ç··ç·›ç·ªç·§ç·—ç·¡ç¸ƒç·ºç·¦ç·¶ç·±ç·°ç·®ç·Ÿç½¶ç¾¬ç¾°ç¾­ç¿­ç¿«ç¿ªç¿¬ç¿¦ç¿¨è¤è§è†£è†Ÿï¿½"
		.split("");
	for (n = 0; n != t[230].length; ++n)
		if (t[230][n].charCodeAt(0) !== 65533) {
			r[t[230][n]] = 58880 + n;
			e[58880 + n] = t[230][n]
		}
	t[231] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è†žè†•è†¢è†™è†—èˆ–è‰è‰“è‰’è‰è‰Žè‰‘è”¤è”»è”è”€è”©è”Žè”‰è”è”Ÿè”Šè”§è”œè“»è”«è“ºè”ˆè”Œè“´è”ªè“²è”•è“·è“«è“³è“¼è”’è“ªè“©è”–è“¾è”¨è”è”®è”‚è“½è”žè“¶è”±è”¦è“§è“¨è“°è“¯è“¹è”˜è” è”°è”‹è”™è”¯è™¢ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è–è£è¤è·èŸ¡è³è˜è”è›è’è¡èšè‘èžè­èªèèŽèŸèè¯è¬èºè®èœè¥èè»èµè¢è§è©è¡šè¤…è¤Œè¤”è¤‹è¤—è¤˜è¤™è¤†è¤–è¤‘è¤Žè¤‰è¦¢è¦¤è¦£è§­è§°è§¬è«è«†èª¸è«“è«‘è«”è«•èª»è«—èª¾è«€è«…è«˜è«ƒèªºèª½è«™è°¾è±è²è³¥è³Ÿè³™è³¨è³šè³è³§è¶ è¶œè¶¡è¶›è¸ è¸£è¸¥è¸¤è¸®è¸•è¸›è¸–è¸‘è¸™è¸¦è¸§ï¿½"
		.split("");
	for (n = 0; n != t[231].length; ++n)
		if (t[231][n].charCodeAt(0) !== 65533) {
			r[t[231][n]] = 59136 + n;
			e[59136 + n] = t[231][n]
		}
	t[232] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¸”è¸’è¸˜è¸“è¸œè¸—è¸šè¼¬è¼¤è¼˜è¼šè¼ è¼£è¼–è¼—é³é°é¯é§é«é„¯é„«é„©é„ªé„²é„¦é„®é†…é††é†Šé†é†‚é†„é†€é‹é‹ƒé‹„é‹€é‹™éŠ¶é‹é‹±é‹Ÿé‹˜é‹©é‹—é‹é‹Œé‹¯é‹‚é‹¨é‹Šé‹ˆé‹Žé‹¦é‹é‹•é‹‰é‹ é‹žé‹§é‹‘é‹“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŠµé‹¡é‹†éŠ´é•¼é–¬é–«é–®é–°éš¤éš¢é›“éœ…éœˆéœ‚éšéžŠéžŽéžˆéŸéŸé žé é ¦é ©é ¨é  é ›é §é¢²é¤ˆé£ºé¤‘é¤”é¤–é¤—é¤•é§œé§é§é§“é§”é§Žé§‰é§–é§˜é§‹é§—é§Œéª³é«¬é««é«³é«²é«±é­†é­ƒé­§é­´é­±é­¦é­¶é­µé­°é­¨é­¤é­¬é³¼é³ºé³½é³¿é³·é´‡é´€é³¹é³»é´ˆé´…é´„éºƒé»“é¼é¼å„œå„“å„—å„šå„‘å‡žåŒ´å¡å™°å™ å™®ï¿½"
		.split("");
	for (n = 0; n != t[232].length; ++n)
		if (t[232][n].charCodeAt(0) !== 65533) {
			r[t[232][n]] = 59392 + n;
			e[59392 + n] = t[232][n]
		}
	t[233] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å™³å™¦å™£å™­å™²å™žå™·åœœåœ›å£ˆå¢½å£‰å¢¿å¢ºå£‚å¢¼å£†å¬—å¬™å¬›å¬¡å¬”å¬“å¬å¬–å¬¨å¬šå¬ å¬žå¯¯å¶¬å¶±å¶©å¶§å¶µå¶°å¶®å¶ªå¶¨å¶²å¶­å¶¯å¶´å¹§å¹¨å¹¦å¹¯å»©å»§å»¦å»¨å»¥å½‹å¾¼æ†æ†¨æ†–æ‡…æ†´æ‡†æ‡æ‡Œæ†ºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ†¿æ†¸æ†Œæ“—æ“–æ“æ“æ“‰æ’½æ’‰æ“ƒæ“›æ“³æ“™æ”³æ•¿æ•¼æ–¢æ›ˆæš¾æ›€æ›Šæ›‹æ›æš½æš»æšºæ›Œæœ£æ¨´æ©¦æ©‰æ©§æ¨²æ©¨æ¨¾æ©æ©­æ©¶æ©›æ©‘æ¨¨æ©šæ¨»æ¨¿æ©æ©ªæ©¤æ©æ©æ©”æ©¯æ©©æ© æ¨¼æ©žæ©–æ©•æ©æ©Žæ©†æ­•æ­”æ­–æ®§æ®ªæ®«æ¯ˆæ¯‡æ°„æ°ƒæ°†æ¾­æ¿‹æ¾£æ¿‡æ¾¼æ¿Žæ¿ˆæ½žæ¿„æ¾½æ¾žæ¿Šæ¾¨ç€„æ¾¥æ¾®æ¾ºæ¾¬æ¾ªæ¿æ¾¿æ¾¸ï¿½"
		.split("");
	for (n = 0; n != t[233].length; ++n)
		if (t[233][n].charCodeAt(0) !== 65533) {
			r[t[233][n]] = 59648 + n;
			e[59648 + n] = t[233][n]
		}
	t[234] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¾¢æ¿‰æ¾«æ¿æ¾¯æ¾²æ¾°ç‡…ç‡‚ç†¿ç†¸ç‡–ç‡€ç‡ç‡‹ç‡”ç‡Šç‡‡ç‡ç†½ç‡˜ç†¼ç‡†ç‡šç‡›çŠçŠžç©ç¦ç§ç¬ç¥ç«çªç‘¿ç’šç’ ç’”ç’’ç’•ç’¡ç”‹ç–€ç˜¯ç˜­ç˜±ç˜½ç˜³ç˜¼ç˜µç˜²ç˜°çš»ç›¦çžšçžçž¡çžœçž›çž¢çž£çž•çž™ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çž—ç£ç£©ç£¥ç£ªç£žç££ç£›ç£¡ç£¢ç£­ç£Ÿç£ ç¦¤ç©„ç©ˆç©‡çª¶çª¸çªµçª±çª·ç¯žç¯£ç¯§ç¯ç¯•ç¯¥ç¯šç¯¨ç¯¹ç¯”ç¯ªç¯¢ç¯œç¯«ç¯˜ç¯Ÿç³’ç³”ç³—ç³ç³‘ç¸’ç¸¡ç¸—ç¸Œç¸Ÿç¸ ç¸“ç¸Žç¸œç¸•ç¸šç¸¢ç¸‹ç¸ç¸–ç¸ç¸”ç¸¥ç¸¤ç½ƒç½»ç½¼ç½ºç¾±ç¿¯è€ªè€©è¬è†±è†¦è†®è†¹è†µè†«è†°è†¬è†´è†²è†·è†§è‡²è‰•è‰–è‰—è•–è•…è•«è•è•“è•¡è•˜ï¿½"
		.split("");
	for (n = 0; n != t[234].length; ++n)
		if (t[234][n].charCodeAt(0) !== 65533) {
			r[t[234][n]] = 59904 + n;
			e[59904 + n] = t[234][n]
		}
	t[235] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è•€è•†è•¤è•è•¢è•„è•‘è•‡è•£è”¾è•›è•±è•Žè•®è•µè••è•§è• è–Œè•¦è•è•”è•¥è•¬è™£è™¥è™¤èž›èžèž—èž“èž’èžˆèžèž–èž˜è¹èž‡èž£èž…èžèž‘èžèž„èž”èžœèžšèž‰è¤žè¤¦è¤°è¤­è¤®è¤§è¤±è¤¢è¤©è¤£è¤¯è¤¬è¤Ÿè§±è« ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è«¢è«²è«´è«µè«è¬”è«¤è«Ÿè«°è«ˆè«žè«¡è«¨è«¿è«¯è«»è²‘è²’è²è³µè³®è³±è³°è³³èµ¬èµ®è¶¥è¶§è¸³è¸¾è¸¸è¹€è¹…è¸¶è¸¼è¸½è¹è¸°è¸¿èº½è¼¶è¼®è¼µè¼²è¼¹è¼·è¼´é¶é¹é»é‚†éƒºé„³é„µé„¶é†“é†é†‘é†é†éŒ§éŒžéŒˆéŒŸéŒ†éŒéºéŒ¸éŒ¼éŒ›éŒ£éŒ’éŒé†éŒ­éŒŽéŒé‹‹éŒé‹ºéŒ¥éŒ“é‹¹é‹·éŒ´éŒ‚éŒ¤é‹¿éŒ©éŒ¹éŒµéŒªéŒ”éŒŒï¿½"
		.split("");
	for (n = 0; n != t[235].length; ++n)
		if (t[235][n].charCodeAt(0) !== 65533) {
			r[t[235][n]] = 60160 + n;
			e[60160 + n] = t[235][n]
		}
	t[236] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éŒ‹é‹¾éŒ‰éŒ€é‹»éŒ–é–¼é—é–¾é–¹é–ºé–¶é–¿é–µé–½éš©é›”éœ‹éœ’éœéž™éž—éž”éŸ°éŸ¸é µé ¯é ²é¤¤é¤Ÿé¤§é¤©é¦žé§®é§¬é§¥é§¤é§°é§£é§ªé§©é§§éª¹éª¿éª´éª»é«¶é«ºé«¹é«·é¬³é®€é®…é®‡é­¼é­¾é­»é®‚é®“é®’é®é­ºé®•ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é­½é®ˆé´¥é´—é´ é´žé´”é´©é´é´˜é´¢é´é´™é´Ÿéºˆéº†éº‡éº®éº­é»•é»–é»ºé¼’é¼½å„¦å„¥å„¢å„¤å„ å„©å‹´åš“åšŒåšåš†åš„åšƒå™¾åš‚å™¿åšå£–å£”å£å£’å¬­å¬¥å¬²å¬£å¬¬å¬§å¬¦å¬¯å¬®å­»å¯±å¯²å¶·å¹¬å¹ªå¾¾å¾»æ‡ƒæ†µæ†¼æ‡§æ‡ æ‡¥æ‡¤æ‡¨æ‡žæ“¯æ“©æ“£æ“«æ“¤æ“¨æ–æ–€æ–¶æ—šæ›’æªæª–æªæª¥æª‰æªŸæª›æª¡æªžæª‡æª“æªŽï¿½"
		.split("");
	for (n = 0; n != t[236].length; ++n)
		if (t[236][n].charCodeAt(0) !== 65533) {
			r[t[236][n]] = 60416 + n;
			e[60416 + n] = t[236][n]
		}
	t[237] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æª•æªƒæª¨æª¤æª‘æ©¿æª¦æªšæª…æªŒæª’æ­›æ®­æ°‰æ¿Œæ¾©æ¿´æ¿”æ¿£æ¿œæ¿­æ¿§æ¿¦æ¿žæ¿²æ¿æ¿¢æ¿¨ç‡¡ç‡±ç‡¨ç‡²ç‡¤ç‡°ç‡¢ç³ç®ç¯ç’—ç’²ç’«ç’ç’ªç’­ç’±ç’¥ç’¯ç”ç”‘ç”’ç”ç–„ç™ƒç™ˆç™‰ç™‡çš¤ç›©çžµçž«çž²çž·çž¶ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çž´çž±çž¨çŸ°ç£³ç£½ç¤‚ç£»ç£¼ç£²ç¤…ç£¹ç£¾ç¤„ç¦«ç¦¨ç©œç©›ç©–ç©˜ç©”ç©šçª¾ç«€ç«ç°…ç°ç¯²ç°€ç¯¿ç¯»ç°Žç¯´ç°‹ç¯³ç°‚ç°‰ç°ƒç°ç¯¸ç¯½ç°†ç¯°ç¯±ç°ç°Šç³¨ç¸­ç¸¼ç¹‚ç¸³é¡ˆç¸¸ç¸ªç¹‰ç¹€ç¹‡ç¸©ç¹Œç¸°ç¸»ç¸¶ç¹„ç¸ºç½…ç½¿ç½¾ç½½ç¿´ç¿²è€¬è†»è‡„è‡Œè‡Šè‡…è‡‡è†¼è‡©è‰›è‰šè‰œè–ƒè–€è–è–§è–•è– è–‹è–£è•»è–¤è–šè–žï¿½"
		.split("");
	for (n = 0; n != t[237].length; ++n)
		if (t[237][n].charCodeAt(0) !== 65533) {
			r[t[237][n]] = 60672 + n;
			e[60672 + n] = t[237][n]
		}
	t[238] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è•·è•¼è–‰è–¡è•ºè•¸è•—è–Žè––è–†è–è–™è–è–è–¢è–‚è–ˆè–…è•¹è•¶è–˜è–è–Ÿè™¨èž¾èžªèž­èŸ…èž°èž¬èž¹èžµèž¼èž®èŸ‰èŸƒèŸ‚èŸŒèž·èž¯èŸ„èŸŠèž´èž¶èž¿èž¸èž½èŸžèž²è¤µè¤³è¤¼è¤¾è¥è¥’è¤·è¥‚è¦­è¦¯è¦®è§²è§³è¬žï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¬˜è¬–è¬‘è¬…è¬‹è¬¢è¬è¬’è¬•è¬‡è¬è¬ˆè¬†è¬œè¬“è¬šè±è±°è±²è±±è±¯è²•è²”è³¹èµ¯è¹Žè¹è¹“è¹è¹Œè¹‡è½ƒè½€é‚…é¾é„¸é†šé†¢é†›é†™é†Ÿé†¡é†é† éŽ¡éŽƒéŽ¯é¤é–é‡é¼é˜éœé¶é‰éé‘é é­éŽéŒéªé¹é—é•é’éé±é·é»é¡éžé£é§éŽ€éŽé™é—‡é—€é—‰é—ƒé—…é–·éš®éš°éš¬éœ éœŸéœ˜éœéœ™éžšéž¡éžœï¿½"
		.split("");
	for (n = 0; n != t[238].length; ++n)
		if (t[238][n].charCodeAt(0) !== 65533) {
			r[t[238][n]] = 60928 + n;
			e[60928 + n] = t[238][n]
		}
	t[239] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éžžéžéŸ•éŸ”éŸ±é¡é¡„é¡Šé¡‰é¡…é¡ƒé¤¥é¤«é¤¬é¤ªé¤³é¤²é¤¯é¤­é¤±é¤°é¦˜é¦£é¦¡é¨‚é§ºé§´é§·é§¹é§¸é§¶é§»é§½é§¾é§¼é¨ƒéª¾é«¾é«½é¬é«¼é­ˆé®šé®¨é®žé®›é®¦é®¡é®¥é®¤é®†é®¢é® é®¯é´³éµéµ§é´¶é´®é´¯é´±é´¸é´°ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éµ…éµ‚éµƒé´¾é´·éµ€é´½ç¿µé´­éºŠéº‰éºéº°é»ˆé»šé»»é»¿é¼¤é¼£é¼¢é½”é¾ å„±å„­å„®åš˜åšœåš—åššåšåš™å¥°å¬¼å±©å±ªå·€å¹­å¹®æ‡˜æ‡Ÿæ‡­æ‡®æ‡±æ‡ªæ‡°æ‡«æ‡–æ‡©æ“¿æ”„æ“½æ“¸æ”æ”ƒæ“¼æ–”æ—›æ›šæ››æ›˜æ«…æª¹æª½æ«¡æ«†æªºæª¶æª·æ«‡æª´æª­æ­žæ¯‰æ°‹ç€‡ç€Œç€ç€ç€…ç€”ç€Žæ¿¿ç€€æ¿»ç€¦æ¿¼æ¿·ç€Šçˆç‡¿ç‡¹çˆƒç‡½ç¶ï¿½"
		.split("");
	for (n = 0; n != t[239].length; ++n)
		if (t[239][n].charCodeAt(0) !== 65533) {
			r[t[239][n]] = 61184 + n;
			e[61184 + n] = t[239][n]
		}
	t[240] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç’¸ç“€ç’µç“ç’¾ç’¶ç’»ç“‚ç””ç”“ç™œç™¤ç™™ç™ç™“ç™—ç™šçš¦çš½ç›¬çŸ‚çžºç£¿ç¤Œç¤“ç¤”ç¤‰ç¤ç¤’ç¤‘ç¦­ç¦¬ç©Ÿç°œç°©ç°™ç° ç°Ÿç°­ç°ç°¦ç°¨ç°¢ç°¥ç°°ç¹œç¹ç¹–ç¹£ç¹˜ç¹¢ç¹Ÿç¹‘ç¹ ç¹—ç¹“ç¾µç¾³ç¿·ç¿¸èµè‡‘è‡’ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‡è‰Ÿè‰žè–´è—†è—€è—ƒè—‚è–³è–µè–½è—‡è—„è–¿è—‹è—Žè—ˆè—…è–±è–¶è—’è˜¤è–¸è–·è–¾è™©èŸ§èŸ¦èŸ¢èŸ›èŸ«èŸªèŸ¥èŸŸèŸ³èŸ¤èŸ”èŸœèŸ“èŸ­èŸ˜èŸ£èž¤èŸ—èŸ™è èŸ´èŸ¨èŸè¥“è¥‹è¥è¥Œè¥†è¥è¥‘è¥‰è¬ªè¬§è¬£è¬³è¬°è¬µè­‡è¬¯è¬¼è¬¾è¬±è¬¥è¬·è¬¦è¬¶è¬®è¬¤è¬»è¬½è¬ºè±‚è±µè²™è²˜è²—è³¾è´„è´‚è´€è¹œè¹¢è¹ è¹—è¹–è¹žè¹¥è¹§ï¿½"
		.split("");
	for (n = 0; n != t[240].length; ++n)
		if (t[240][n].charCodeAt(0) !== 65533) {
			r[t[240][n]] = 61440 + n;
			e[61440 + n] = t[240][n]
		}
	t[241] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¹›è¹šè¹¡è¹è¹©è¹”è½†è½‡è½ˆè½‹é„¨é„ºé„»é„¾é†¨é†¥é†§é†¯é†ªéŽµéŽŒéŽ’éŽ·éŽ›éŽéŽ‰éŽ§éŽŽéŽªéŽžéŽ¦éŽ•éŽˆéŽ™éŽŸéŽéŽ±éŽ‘éŽ²éŽ¤éŽ¨éŽ´éŽ£éŽ¥é—’é—“é—‘éš³é›—é›šå·‚é›Ÿé›˜é›éœ£éœ¢éœ¥éž¬éž®éž¨éž«éž¤éžªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éž¢éž¥éŸ—éŸ™éŸ–éŸ˜éŸºé¡é¡‘é¡’é¢¸é¥é¤¼é¤ºé¨é¨‹é¨‰é¨é¨„é¨‘é¨Šé¨…é¨‡é¨†é«€é«œé¬ˆé¬„é¬…é¬©é¬µé­Šé­Œé­‹é¯‡é¯†é¯ƒé®¿é¯é®µé®¸é¯“é®¶é¯„é®¹é®½éµœéµ“éµéµŠéµ›éµ‹éµ™éµ–éµŒéµ—éµ’éµ”éµŸéµ˜éµšéºŽéºŒé»Ÿé¼é¼€é¼–é¼¥é¼«é¼ªé¼©é¼¨é½Œé½•å„´å„µåŠ–å‹·åŽ´åš«åš­åš¦åš§åšªåš¬å£šå£å£›å¤’å¬½å¬¾å¬¿å·ƒå¹°ï¿½"
		.split("");
	for (n = 0; n != t[241].length; ++n)
		if (t[241][n].charCodeAt(0) !== 65533) {
			r[t[241][n]] = 61696 + n;
			e[61696 + n] = t[241][n]
		}
	t[242] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¾¿æ‡»æ”‡æ”æ”æ”‰æ”Œæ”Žæ–„æ—žæ—æ›žæ«§æ« æ«Œæ«‘æ«™æ«‹æ«Ÿæ«œæ«æ««æ«æ«æ«žæ­ æ®°æ°Œç€™ç€§ç€ ç€–ç€«ç€¡ç€¢ç€£ç€©ç€—ç€¤ç€œç€ªçˆŒçˆŠçˆ‡çˆ‚çˆ…çŠ¥çŠ¦çŠ¤çŠ£çŠ¡ç“‹ç“…ç’·ç“ƒç”–ç™ çŸ‰çŸŠçŸ„çŸ±ç¤ç¤›ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¤¡ç¤œç¤—ç¤žç¦°ç©§ç©¨ç°³ç°¼ç°¹ç°¬ç°»ç³¬ç³ªç¹¶ç¹µç¹¸ç¹°ç¹·ç¹¯ç¹ºç¹²ç¹´ç¹¨ï¿½ï¿½ç½Šç¾ƒç¾†ç¾·ç¿½ç¿¾è¸è‡—è‡•è‰¤è‰¡è‰£è—«è—±è—­è—™è—¡è—¨è—šè——è—¬è—²è—¸è—˜è—Ÿè—£è—œè—‘è—°è—¦è—¯è—žè—¢è €èŸºè ƒèŸ¶èŸ·è ‰è Œè ‹è †èŸ¼è ˆèŸ¿è Šè ‚è¥¢è¥šè¥›è¥—è¥¡è¥œè¥˜è¥è¥™è¦ˆè¦·è¦¶è§¶è­è­ˆè­Šè­€è­“è­–è­”è­‹è­•ï¿½"
		.split("");
	for (n = 0; n != t[242].length; ++n)
		if (t[242][n].charCodeAt(0) !== 65533) {
			r[t[242][n]] = 61952 + n;
			e[61952 + n] = t[242][n]
		}
	t[243] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è­‘è­‚è­’è­—è±ƒè±·è±¶è²šè´†è´‡è´‰è¶¬è¶ªè¶­è¶«è¹­è¹¸è¹³è¹ªè¹¯è¹»è»‚è½’è½‘è½è½è½“è¾´é…€é„¿é†°é†­éžé‡éé‚éšéé¹é¬éŒé™éŽ©é¦éŠé”é®é£é•é„éŽé€é’é§é•½é—šé—›é›¡éœ©éœ«éœ¬éœ¨éœ¦ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éž³éž·éž¶éŸéŸžéŸŸé¡œé¡™é¡é¡—é¢¿é¢½é¢»é¢¾é¥ˆé¥‡é¥ƒé¦¦é¦§é¨šé¨•é¨¥é¨é¨¤é¨›é¨¢é¨ é¨§é¨£é¨žé¨œé¨”é«‚é¬‹é¬Šé¬Žé¬Œé¬·é¯ªé¯«é¯ é¯žé¯¤é¯¦é¯¢é¯°é¯”é¯—é¯¬é¯œé¯™é¯¥é¯•é¯¡é¯šéµ·é¶é¶Šé¶„é¶ˆéµ±é¶€éµ¸é¶†é¶‹é¶Œéµ½éµ«éµ´éµµéµ°éµ©é¶…éµ³éµ»é¶‚éµ¯éµ¹éµ¿é¶‡éµ¨éº”éº‘é»€é»¼é¼­é½€é½é½é½–é½—é½˜åŒ·åš²ï¿½"
		.split("");
	for (n = 0; n != t[243].length; ++n)
		if (t[243][n].charCodeAt(0) !== 65533) {
			r[t[243][n]] = 62208 + n;
			e[62208 + n] = t[243][n]
		}
	t[244] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åšµåš³å££å­…å·†å·‡å»®å»¯å¿€å¿æ‡¹æ”—æ”–æ”•æ”“æ—Ÿæ›¨æ›£æ›¤æ«³æ«°æ«ªæ«¨æ«¹æ«±æ«®æ«¯ç€¼ç€µç€¯ç€·ç€´ç€±ç‚ç€¸ç€¿ç€ºç€¹ç€ç€»ç€³ççˆ“çˆ”çŠ¨ç½ç¼ç’ºçš«çšªçš¾ç›­çŸŒçŸŽçŸçŸçŸ²ç¤¥ç¤£ç¤§ç¤¨ç¤¤ç¤©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¦²ç©®ç©¬ç©­ç«·ç±‰ç±ˆç±Šç±‡ç±…ç³®ç¹»ç¹¾çºçº€ç¾ºç¿¿è¹è‡›è‡™èˆ‹è‰¨è‰©è˜¢è—¿è˜è—¾è˜›è˜€è—¶è˜„è˜‰è˜…è˜Œè—½è ™è è ‘è —è “è –è¥£è¥¦è¦¹è§·è­ è­ªè­è­¨è­£è­¥è­§è­­è¶®èº†èºˆèº„è½™è½–è½—è½•è½˜è½šé‚é…ƒé…é†·é†µé†²é†³é‹é“é»é éé”é¾é•éé¨é™ééµé€é·é‡éŽé–é’éºé‰é¸éŠé¿ï¿½"
		.split("");
	for (n = 0; n != t[244].length; ++n)
		if (t[244][n].charCodeAt(0) !== 65533) {
			r[t[244][n]] = 62464 + n;
			e[62464 + n] = t[244][n]
		}
	t[245] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¼éŒé¶é‘é†é—žé— é—Ÿéœ®éœ¯éž¹éž»éŸ½éŸ¾é¡ é¡¢é¡£é¡Ÿé£é£‚é¥é¥Žé¥™é¥Œé¥‹é¥“é¨²é¨´é¨±é¨¬é¨ªé¨¶é¨©é¨®é¨¸é¨­é«‡é«Šé«†é¬é¬’é¬‘é°‹é°ˆé¯·é°…é°’é¯¸é±€é°‡é°Žé°†é°—é°”é°‰é¶Ÿé¶™é¶¤é¶é¶’é¶˜é¶é¶›ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¶ é¶”é¶œé¶ªé¶—é¶¡é¶šé¶¢é¶¨é¶žé¶£é¶¿é¶©é¶–é¶¦é¶§éº™éº›éºšé»¥é»¤é»§é»¦é¼°é¼®é½›é½ é½žé½é½™é¾‘å„ºå„¹åŠ˜åŠ—å›ƒåš½åš¾å­ˆå­‡å·‹å·å»±æ‡½æ”›æ¬‚æ«¼æ¬ƒæ«¸æ¬€çƒç„çŠçˆç‰ç…ç†çˆçˆšçˆ™ç¾ç”—ç™ªçŸç¤­ç¤±ç¤¯ç±”ç±“ç³²çºŠçº‡çºˆçº‹çº†çºç½ç¾»è€°è‡è˜˜è˜ªè˜¦è˜Ÿè˜£è˜œè˜™è˜§è˜®è˜¡è˜ è˜©è˜žè˜¥ï¿½"
		.split("");
	for (n = 0; n != t[245].length; ++n)
		if (t[245][n].charCodeAt(0) !== 65533) {
			r[t[245][n]] = 62720 + n;
			e[62720 + n] = t[245][n]
		}
	t[246] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è ©è è ›è  è ¤è œè «è¡Šè¥­è¥©è¥®è¥«è§ºè­¹è­¸è­…è­ºè­»è´è´”è¶¯èºŽèºŒè½žè½›è½é…†é…„é……é†¹é¿é»é¶é©é½é¼é°é¹éªé·é¬é‘€é±é—¥é—¤é—£éœµéœºéž¿éŸ¡é¡¤é£‰é£†é£€é¥˜é¥–é¨¹é¨½é©†é©„é©‚é©é¨ºï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¨¿é«é¬•é¬—é¬˜é¬–é¬ºé­’é°«é°é°œé°¬é°£é°¨é°©é°¤é°¡é¶·é¶¶é¶¼é·é·‡é·Šé·é¶¾é·…é·ƒé¶»é¶µé·Žé¶¹é¶ºé¶¬é·ˆé¶±é¶­é·Œé¶³é·é¶²é¹ºéºœé»«é»®é»­é¼›é¼˜é¼šé¼±é½Žé½¥é½¤é¾’äº¹å›†å›…å›‹å¥±å­‹å­Œå·•å·‘å»²æ”¡æ” æ”¦æ”¢æ¬‹æ¬ˆæ¬‰æ°ç•ç–ç—ç’çˆžçˆŸçŠ©ç¿ç“˜ç“•ç“™ç“—ç™­çš­ç¤µç¦´ç©°ç©±ç±—ç±œç±™ç±›ç±šï¿½"
		.split("");
	for (n = 0; n != t[246].length; ++n)
		if (t[246][n].charCodeAt(0) !== 65533) {
			r[t[246][n]] = 62976 + n;
			e[62976 + n] = t[246][n]
		}
	t[247] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç³´ç³±çº‘ç½ç¾‡è‡žè‰«è˜´è˜µè˜³è˜¬è˜²è˜¶è ¬è ¨è ¦è ªè ¥è¥±è¦¿è¦¾è§»è­¾è®„è®‚è®†è®…è­¿è´•èº•èº”èºšèº’èºèº–èº—è½ è½¢é…‡é‘Œé‘é‘Šé‘‹é‘é‘‡é‘…é‘ˆé‘‰é‘†éœ¿éŸ£é¡ªé¡©é£‹é¥”é¥›é©Žé©“é©”é©Œé©é©ˆé©Šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é©‰é©’é©é«é¬™é¬«é¬»é­–é­•é±†é±ˆé°¿é±„é°¹é°³é±é°¼é°·é°´é°²é°½é°¶é·›é·’é·žé·šé·‹é·é·œé·‘é·Ÿé·©é·™é·˜é·–é·µé·•é·éº¶é»°é¼µé¼³é¼²é½‚é½«é¾•é¾¢å„½åŠ™å£¨å£§å¥²å­å·˜è ¯å½æˆæˆƒæˆ„æ”©æ”¥æ––æ›«æ¬‘æ¬’æ¬æ¯Šç›çšçˆ¢çŽ‚çŽçŽƒç™°çŸ”ç±§ç±¦çº•è‰¬è˜ºè™€è˜¹è˜¼è˜±è˜»è˜¾è °è ²è ®è ³è¥¶è¥´è¥³è§¾ï¿½"
		.split("");
	for (n = 0; n != t[247].length; ++n)
		if (t[247][n].charCodeAt(0) !== 65533) {
			r[t[247][n]] = 63232 + n;
			e[63232 + n] = t[247][n]
		}
	t[248] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è®Œè®Žè®‹è®ˆè±…è´™èº˜è½¤è½£é†¼é‘¢é‘•é‘é‘—é‘žéŸ„éŸ…é €é©–é©™é¬žé¬Ÿé¬ é±’é±˜é±é±Šé±é±‹é±•é±™é±Œé±Žé·»é··é·¯é·£é·«é·¸é·¤é·¶é·¡é·®é·¦é·²é·°é·¢é·¬é·´é·³é·¨é·­é»‚é»é»²é»³é¼†é¼œé¼¸é¼·é¼¶é½ƒé½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é½±é½°é½®é½¯å›“å›å­Žå±­æ”­æ›­æ›®æ¬“çŸç¡çç çˆ£ç“›ç“¥çŸ•ç¤¸ç¦·ç¦¶ç±ªçº—ç¾‰è‰­è™ƒè ¸è ·è µè¡‹è®”è®•èºžèºŸèº èºé†¾é†½é‡‚é‘«é‘¨é‘©é›¥é†éƒé‡éŸ‡éŸ¥é©žé«•é­™é±£é±§é±¦é±¢é±žé± é¸‚é·¾é¸‡é¸ƒé¸†é¸…é¸€é¸é¸‰é·¿é·½é¸„éº é¼žé½†é½´é½µé½¶å›”æ”®æ–¸æ¬˜æ¬™æ¬—æ¬šç¢çˆ¦çŠªçŸ˜çŸ™ç¤¹ç±©ç±«ç³¶çºšï¿½"
		.split("");
	for (n = 0; n != t[248].length; ++n)
		if (t[248][n].charCodeAt(0) !== 65533) {
			r[t[248][n]] = 63488 + n;
			e[63488 + n] = t[248][n]
		}
	t[249] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çº˜çº›çº™è‡ è‡¡è™†è™‡è™ˆè¥¹è¥ºè¥¼è¥»è§¿è®˜è®™èº¥èº¤èº£é‘®é‘­é‘¯é‘±é‘³é‰é¡²é¥Ÿé±¨é±®é±­é¸‹é¸é¸é¸é¸’é¸‘éº¡é»µé¼‰é½‡é½¸é½»é½ºé½¹åœžç¦ç±¯è ¼è¶²èº¦é‡ƒé‘´é‘¸é‘¶é‘µé© é±´é±³é±±é±µé¸”é¸“é»¶é¼Šï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¾¤ç¨ç¥ç³·è™ªè ¾è ½è ¿è®žè²œèº©è»‰é‹é¡³é¡´é£Œé¥¡é¦«é©¤é©¦é©§é¬¤é¸•é¸—é½ˆæˆ‡æ¬žçˆ§è™Œèº¨é’‚é’€é’é©©é©¨é¬®é¸™çˆ©è™‹è®Ÿé’ƒé±¹éº·ç™µé©«é±ºé¸ç©çªéº¤é½¾é½‰é¾˜ç¢éŠ¹è£å¢»æ’ç²§å«ºâ•”â•¦â•—â• â•¬â•£â•šâ•©â•â•’â•¤â••â•žâ•ªâ•¡â•˜â•§â•›â•“â•¥â•–â•Ÿâ•«â•¢â•™â•¨â•œâ•‘â•â•­â•®â•°â•¯â–“ï¿½"
		.split("");
	for (n = 0; n != t[249].length; ++n)
		if (t[249][n].charCodeAt(0) !== 65533) {
			r[t[249][n]] = 63744 + n;
			e[63744 + n] = t[249][n]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[1250] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½â€šï¿½â€žâ€¦â€ â€¡ï¿½â€°Å â€¹ÅšÅ¤Å½Å¹ï¿½â€˜â€™â€œâ€â€¢â€“â€”ï¿½â„¢Å¡â€ºÅ›Å¥Å¾Åº Ë‡Ë˜ÅÂ¤Ä„Â¦Â§Â¨Â©ÅžÂ«Â¬Â­Â®Å»Â°Â±Ë›Å‚Â´ÂµÂ¶Â·Â¸Ä…ÅŸÂ»Ä½ËÄ¾Å¼Å”ÃÃ‚Ä‚Ã„Ä¹Ä†Ã‡ÄŒÃ‰Ä˜Ã‹ÄšÃÃŽÄŽÄÅƒÅ‡Ã“Ã”ÅÃ–Ã—Å˜Å®ÃšÅ°ÃœÃÅ¢ÃŸÅ•Ã¡Ã¢ÄƒÃ¤ÄºÄ‡Ã§ÄÃ©Ä™Ã«Ä›Ã­Ã®ÄÄ‘Å„ÅˆÃ³Ã´Å‘Ã¶Ã·Å™Å¯ÃºÅ±Ã¼Ã½Å£Ë™",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1251] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ð‚Ðƒâ€šÑ“â€žâ€¦â€ â€¡â‚¬â€°Ð‰â€¹ÐŠÐŒÐ‹ÐÑ’â€˜â€™â€œâ€â€¢â€“â€”ï¿½â„¢Ñ™â€ºÑšÑœÑ›ÑŸ ÐŽÑžÐˆÂ¤ÒÂ¦Â§ÐÂ©Ð„Â«Â¬Â­Â®Ð‡Â°Â±Ð†Ñ–Ò‘ÂµÂ¶Â·Ñ‘â„–Ñ”Â»Ñ˜Ð…Ñ•Ñ—ÐÐ‘Ð’Ð“Ð”Ð•Ð–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯Ð°Ð±Ð²Ð³Ð´ÐµÐ¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÑ",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1252] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½â€šÆ’â€žâ€¦â€ â€¡Ë†â€°Å â€¹Å’ï¿½Å½ï¿½ï¿½â€˜â€™â€œâ€â€¢â€“â€”Ëœâ„¢Å¡â€ºÅ“ï¿½Å¾Å¸ Â¡Â¢Â£Â¤Â¥Â¦Â§Â¨Â©ÂªÂ«Â¬Â­Â®Â¯Â°Â±Â²Â³Â´ÂµÂ¶Â·Â¸Â¹ÂºÂ»Â¼Â½Â¾Â¿Ã€ÃÃ‚ÃƒÃ„Ã…Ã†Ã‡ÃˆÃ‰ÃŠÃ‹ÃŒÃÃŽÃÃÃ‘Ã’Ã“Ã”Ã•Ã–Ã—Ã˜Ã™ÃšÃ›ÃœÃÃžÃŸÃ Ã¡Ã¢Ã£Ã¤Ã¥Ã¦Ã§Ã¨Ã©ÃªÃ«Ã¬Ã­Ã®Ã¯Ã°Ã±Ã²Ã³Ã´ÃµÃ¶Ã·Ã¸Ã¹ÃºÃ»Ã¼Ã½Ã¾Ã¿",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1253] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½â€šÆ’â€žâ€¦â€ â€¡ï¿½â€°ï¿½â€¹ï¿½ï¿½ï¿½ï¿½ï¿½â€˜â€™â€œâ€â€¢â€“â€”ï¿½â„¢ï¿½â€ºï¿½ï¿½ï¿½ï¿½ Î…Î†Â£Â¤Â¥Â¦Â§Â¨Â©ï¿½Â«Â¬Â­Â®â€•Â°Â±Â²Â³Î„ÂµÂ¶Â·ÎˆÎ‰ÎŠÂ»ÎŒÂ½ÎŽÎÎÎ‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡ï¿½Î£Î¤Î¥Î¦Î§Î¨Î©ÎªÎ«Î¬Î­Î®Î¯Î°Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏ‚ÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰ÏŠÏ‹ÏŒÏÏŽï¿½",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1254] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½â€šÆ’â€žâ€¦â€ â€¡Ë†â€°Å â€¹Å’ï¿½ï¿½ï¿½ï¿½â€˜â€™â€œâ€â€¢â€“â€”Ëœâ„¢Å¡â€ºÅ“ï¿½ï¿½Å¸ Â¡Â¢Â£Â¤Â¥Â¦Â§Â¨Â©ÂªÂ«Â¬Â­Â®Â¯Â°Â±Â²Â³Â´ÂµÂ¶Â·Â¸Â¹ÂºÂ»Â¼Â½Â¾Â¿Ã€ÃÃ‚ÃƒÃ„Ã…Ã†Ã‡ÃˆÃ‰ÃŠÃ‹ÃŒÃÃŽÃÄžÃ‘Ã’Ã“Ã”Ã•Ã–Ã—Ã˜Ã™ÃšÃ›ÃœÄ°ÅžÃŸÃ Ã¡Ã¢Ã£Ã¤Ã¥Ã¦Ã§Ã¨Ã©ÃªÃ«Ã¬Ã­Ã®Ã¯ÄŸÃ±Ã²Ã³Ã´ÃµÃ¶Ã·Ã¸Ã¹ÃºÃ»Ã¼Ä±ÅŸÃ¿",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1255] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½â€šÆ’â€žâ€¦â€ â€¡Ë†â€°ï¿½â€¹ï¿½ï¿½ï¿½ï¿½ï¿½â€˜â€™â€œâ€â€¢â€“â€”Ëœâ„¢ï¿½â€ºï¿½ï¿½ï¿½ï¿½ Â¡Â¢Â£â‚ªÂ¥Â¦Â§Â¨Â©Ã—Â«Â¬Â­Â®Â¯Â°Â±Â²Â³Â´ÂµÂ¶Â·Â¸Â¹Ã·Â»Â¼Â½Â¾Â¿Ö°Ö±Ö²Ö³Ö´ÖµÖ¶Ö·Ö¸Ö¹ï¿½Ö»Ö¼Ö½Ö¾Ö¿×€××‚×ƒ×°×±×²×³×´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½××‘×’×“×”×•×–×—×˜×™×š×›×œ××ž×Ÿ× ×¡×¢×£×¤×¥×¦×§×¨×©×ªï¿½ï¿½â€Žâ€ï¿½",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1256] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬Ù¾â€šÆ’â€žâ€¦â€ â€¡Ë†â€°Ù¹â€¹Å’Ú†Ú˜ÚˆÚ¯â€˜â€™â€œâ€â€¢â€“â€”Ú©â„¢Ú‘â€ºÅ“â€Œâ€Úº ØŒÂ¢Â£Â¤Â¥Â¦Â§Â¨Â©Ú¾Â«Â¬Â­Â®Â¯Â°Â±Â²Â³Â´ÂµÂ¶Â·Â¸Â¹Ø›Â»Â¼Â½Â¾ØŸÛØ¡Ø¢Ø£Ø¤Ø¥Ø¦Ø§Ø¨Ø©ØªØ«Ø¬Ø­Ø®Ø¯Ø°Ø±Ø²Ø³Ø´ØµØ¶Ã—Ø·Ø¸Ø¹ØºÙ€ÙÙ‚ÙƒÃ Ù„Ã¢Ù…Ù†Ù‡ÙˆÃ§Ã¨Ã©ÃªÃ«Ù‰ÙŠÃ®Ã¯Ù‹ÙŒÙÙŽÃ´ÙÙÃ·Ù‘Ã¹Ù’Ã»Ã¼â€Žâ€Û’",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1257] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½â€šï¿½â€žâ€¦â€ â€¡ï¿½â€°ï¿½â€¹ï¿½Â¨Ë‡Â¸ï¿½â€˜â€™â€œâ€â€¢â€“â€”ï¿½â„¢ï¿½â€ºï¿½Â¯Ë›ï¿½ ï¿½Â¢Â£Â¤ï¿½Â¦Â§Ã˜Â©Å–Â«Â¬Â­Â®Ã†Â°Â±Â²Â³Â´ÂµÂ¶Â·Ã¸Â¹Å—Â»Â¼Â½Â¾Ã¦Ä„Ä®Ä€Ä†Ã„Ã…Ä˜Ä’ÄŒÃ‰Å¹Ä–Ä¢Ä¶ÄªÄ»Å ÅƒÅ…Ã“ÅŒÃ•Ã–Ã—Å²ÅÅšÅªÃœÅ»Å½ÃŸÄ…Ä¯ÄÄ‡Ã¤Ã¥Ä™Ä“ÄÃ©ÅºÄ—Ä£Ä·Ä«Ä¼Å¡Å„Å†Ã³ÅÃµÃ¶Ã·Å³Å‚Å›Å«Ã¼Å¼Å¾Ë™",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1258] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~â‚¬ï¿½â€šÆ’â€žâ€¦â€ â€¡Ë†â€°ï¿½â€¹Å’ï¿½ï¿½ï¿½ï¿½â€˜â€™â€œâ€â€¢â€“â€”Ëœâ„¢ï¿½â€ºÅ“ï¿½ï¿½Å¸ Â¡Â¢Â£Â¤Â¥Â¦Â§Â¨Â©ÂªÂ«Â¬Â­Â®Â¯Â°Â±Â²Â³Â´ÂµÂ¶Â·Â¸Â¹ÂºÂ»Â¼Â½Â¾Â¿Ã€ÃÃ‚Ä‚Ã„Ã…Ã†Ã‡ÃˆÃ‰ÃŠÃ‹Ì€ÃÃŽÃÄÃ‘Ì‰Ã“Ã”Æ Ã–Ã—Ã˜Ã™ÃšÃ›ÃœÆ¯ÌƒÃŸÃ Ã¡Ã¢ÄƒÃ¤Ã¥Ã¦Ã§Ã¨Ã©ÃªÃ«ÌÃ­Ã®Ã¯Ä‘Ã±Ì£Ã³Ã´Æ¡Ã¶Ã·Ã¸Ã¹ÃºÃ»Ã¼Æ°â‚«Ã¿",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[1e4] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã„Ã…Ã‡Ã‰Ã‘Ã–ÃœÃ¡Ã Ã¢Ã¤Ã£Ã¥Ã§Ã©Ã¨ÃªÃ«Ã­Ã¬Ã®Ã¯Ã±Ã³Ã²Ã´Ã¶ÃµÃºÃ¹Ã»Ã¼â€ Â°Â¢Â£Â§â€¢Â¶ÃŸÂ®Â©â„¢Â´Â¨â‰ Ã†Ã˜âˆžÂ±â‰¤â‰¥Â¥Âµâˆ‚âˆ‘âˆÏ€âˆ«ÂªÂºâ„¦Ã¦Ã¸Â¿Â¡Â¬âˆšÆ’â‰ˆâˆ†Â«Â»â€¦ Ã€ÃƒÃ•Å’Å“â€“â€”â€œâ€â€˜â€™Ã·â—ŠÃ¿Å¸â„Â¤â€¹â€ºï¬ï¬‚â€¡Â·â€šâ€žâ€°Ã‚ÃŠÃÃ‹ÃˆÃÃŽÃÃŒÃ“Ã”ï¿½Ã’ÃšÃ›Ã™Ä±Ë†ËœÂ¯Ë˜Ë™ËšÂ¸ËË›Ë‡",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10006] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã„Â¹Â²Ã‰Â³Ã–ÃœÎ…Ã Ã¢Ã¤Î„Â¨Ã§Ã©Ã¨ÃªÃ«Â£â„¢Ã®Ã¯â€¢Â½â€°Ã´Ã¶Â¦Â­Ã¹Ã»Ã¼â€ Î“Î”Î˜Î›ÎžÎ ÃŸÂ®Â©Î£ÎªÂ§â‰ Â°Î‡Î‘Â±â‰¤â‰¥Â¥Î’Î•Î–Î—Î™ÎšÎœÎ¦Î«Î¨Î©Î¬ÎÂ¬ÎŸÎ¡â‰ˆÎ¤Â«Â»â€¦ Î¥Î§Î†ÎˆÅ“â€“â€•â€œâ€â€˜â€™Ã·Î‰ÎŠÎŒÎŽÎ­Î®Î¯ÏŒÎÏÎ±Î²ÏˆÎ´ÎµÏ†Î³Î·Î¹Î¾ÎºÎ»Î¼Î½Î¿Ï€ÏŽÏÏƒÏ„Î¸Ï‰Ï‚Ï‡Ï…Î¶ÏŠÏ‹ÎÎ°ï¿½",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10007] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÐÐ‘Ð’Ð“Ð”Ð•Ð–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯â€ Â°Â¢Â£Â§â€¢Â¶Ð†Â®Â©â„¢Ð‚Ñ’â‰ ÐƒÑ“âˆžÂ±â‰¤â‰¥Ñ–Âµâˆ‚ÐˆÐ„Ñ”Ð‡Ñ—Ð‰Ñ™ÐŠÑšÑ˜Ð…Â¬âˆšÆ’â‰ˆâˆ†Â«Â»â€¦ Ð‹Ñ›ÐŒÑœÑ•â€“â€”â€œâ€â€˜â€™Ã·â€žÐŽÑžÐÑŸâ„–ÐÑ‘ÑÐ°Ð±Ð²Ð³Ð´ÐµÐ¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÂ¤",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10008] = function () {
	var e = [],
		r = {},
		t = [],
		n;
	t[0] =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Â€ï£˜ï£™ï£šï£›ï£œï£ï£žï£Ÿï£ ï£¡ï£¢ï££ï£¤ï£¥ï£¦ï£§ï£¨ï£©ï£ªï£«ï£¬ï£­ï£®ï£¯ï£°ï£±ï£²ï£³ï£´ï£µï£¶ï£·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï£¸ï£¹ï£ºï£»ï£¼ï£½ï£¾ï£¿"
		.split("");
	for (n = 0; n != t[0].length; ++n)
		if (t[0][n].charCodeAt(0) !== 65533) {
			r[t[0][n]] = 0 + n;
			e[0 + n] = t[0][n]
		}
	t[161] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã€€ã€ã€‚ãƒ»Ë‰Ë‡Â¨ã€ƒã€…â€•ï½žï¿½â€¦â€˜â€™â€œâ€ã€”ã€•ã€ˆã€‰ã€Šã€‹ã€Œã€ã€Žã€ã€–ã€—ã€ã€‘Â±Ã—Ã·âˆ¶âˆ§âˆ¨âˆ‘âˆâˆªâˆ©âˆˆâˆ·âˆšâŠ¥âˆ¥âˆ âŒ’âŠ™âˆ«âˆ®â‰¡â‰Œâ‰ˆâˆ½âˆâ‰ â‰®â‰¯â‰¤â‰¥âˆžâˆµâˆ´â™‚â™€Â°â€²â€³â„ƒï¼„Â¤ï¿ ï¿¡â€°Â§â„–â˜†â˜…â—‹â—â—Žâ—‡â—†â–¡â– â–³â–²â€»â†’â†â†‘â†“ã€“ï¿½"
		.split("");
	for (n = 0; n != t[161].length; ++n)
		if (t[161][n].charCodeAt(0) !== 65533) {
			r[t[161][n]] = 41216 + n;
			e[41216 + n] = t[161][n]
		}
	t[162] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â’ˆâ’‰â’Šâ’‹â’Œâ’â’Žâ’â’â’‘â’’â’“â’”â’•â’–â’—â’˜â’™â’šâ’›â‘´â‘µâ‘¶â‘·â‘¸â‘¹â‘ºâ‘»â‘¼â‘½â‘¾â‘¿â’€â’â’‚â’ƒâ’„â’…â’†â’‡â‘ â‘¡â‘¢â‘£â‘¤â‘¥â‘¦â‘§â‘¨â‘©ï¿½ï¿½ãˆ ãˆ¡ãˆ¢ãˆ£ãˆ¤ãˆ¥ãˆ¦ãˆ§ãˆ¨ãˆ©ï¿½ï¿½â… â…¡â…¢â…£â…¤â…¥â…¦â…§â…¨â…©â…ªâ…«ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[162].length; ++n)
		if (t[162][n].charCodeAt(0) !== 65533) {
			r[t[162][n]] = 41472 + n;
			e[41472 + n] = t[162][n]
		}
	t[163] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¼ï¼‚ï¼ƒï¿¥ï¼…ï¼†ï¼‡ï¼ˆï¼‰ï¼Šï¼‹ï¼Œï¼ï¼Žï¼ï¼ï¼‘ï¼’ï¼“ï¼”ï¼•ï¼–ï¼—ï¼˜ï¼™ï¼šï¼›ï¼œï¼ï¼žï¼Ÿï¼ ï¼¡ï¼¢ï¼£ï¼¤ï¼¥ï¼¦ï¼§ï¼¨ï¼©ï¼ªï¼«ï¼¬ï¼­ï¼®ï¼¯ï¼°ï¼±ï¼²ï¼³ï¼´ï¼µï¼¶ï¼·ï¼¸ï¼¹ï¼ºï¼»ï¼¼ï¼½ï¼¾ï¼¿ï½€ï½ï½‚ï½ƒï½„ï½…ï½†ï½‡ï½ˆï½‰ï½Šï½‹ï½Œï½ï½Žï½ï½ï½‘ï½’ï½“ï½”ï½•ï½–ï½—ï½˜ï½™ï½šï½›ï½œï½ï¿£ï¿½"
		.split("");
	for (n = 0; n != t[163].length; ++n)
		if (t[163][n].charCodeAt(0) !== 65533) {
			r[t[163][n]] = 41728 + n;
			e[41728 + n] = t[163][n]
		}
	t[164] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ãã‚ãƒã„ã…ã†ã‡ãˆã‰ãŠã‹ãŒããŽããã‘ã’ã“ã”ã•ã–ã—ã˜ã™ãšã›ãœããžãŸã ã¡ã¢ã£ã¤ã¥ã¦ã§ã¨ã©ãªã«ã¬ã­ã®ã¯ã°ã±ã²ã³ã´ãµã¶ã·ã¸ã¹ãºã»ã¼ã½ã¾ã¿ã‚€ã‚ã‚‚ã‚ƒã‚„ã‚…ã‚†ã‚‡ã‚ˆã‚‰ã‚Šã‚‹ã‚Œã‚ã‚Žã‚ã‚ã‚‘ã‚’ã‚“ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[164].length; ++n)
		if (t[164][n].charCodeAt(0) !== 65533) {
			r[t[164][n]] = 41984 + n;
			e[41984 + n] = t[164][n]
		}
	t[165] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã‚¡ã‚¢ã‚£ã‚¤ã‚¥ã‚¦ã‚§ã‚¨ã‚©ã‚ªã‚«ã‚¬ã‚­ã‚®ã‚¯ã‚°ã‚±ã‚²ã‚³ã‚´ã‚µã‚¶ã‚·ã‚¸ã‚¹ã‚ºã‚»ã‚¼ã‚½ã‚¾ã‚¿ãƒ€ãƒãƒ‚ãƒƒãƒ„ãƒ…ãƒ†ãƒ‡ãƒˆãƒ‰ãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒãƒ‘ãƒ’ãƒ“ãƒ”ãƒ•ãƒ–ãƒ—ãƒ˜ãƒ™ãƒšãƒ›ãƒœãƒãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ£ãƒ¤ãƒ¥ãƒ¦ãƒ§ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ®ãƒ¯ãƒ°ãƒ±ãƒ²ãƒ³ãƒ´ãƒµãƒ¶ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[165].length; ++n)
		if (t[165][n].charCodeAt(0) !== 65533) {
			r[t[165][n]] = 42240 + n;
			e[42240 + n] = t[165][n]
		}
	t[166] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡Î£Î¤Î¥Î¦Î§Î¨Î©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[166].length; ++n)
		if (t[166][n].charCodeAt(0) !== 65533) {
			r[t[166][n]] = 42496 + n;
			e[42496 + n] = t[166][n]
		}
	t[167] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ÐÐ‘Ð’Ð“Ð”Ð•ÐÐ–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©ÐªÐ«Ð¬Ð­Ð®Ð¯ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ð°Ð±Ð²Ð³Ð´ÐµÑ‘Ð¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŠÑ‹ÑŒÑÑŽÑï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[167].length; ++n)
		if (t[167][n].charCodeAt(0) !== 65533) {
			r[t[167][n]] = 42752 + n;
			e[42752 + n] = t[167][n]
		}
	t[168] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ÄÃ¡ÇŽÃ Ä“Ã©Ä›Ã¨Ä«Ã­ÇÃ¬ÅÃ³Ç’Ã²Å«ÃºÇ”Ã¹Ç–Ç˜ÇšÇœÃ¼Ãªï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã„…ã„†ã„‡ã„ˆã„‰ã„Šã„‹ã„Œã„ã„Žã„ã„ã„‘ã„’ã„“ã„”ã„•ã„–ã„—ã„˜ã„™ã„šã„›ã„œã„ã„žã„Ÿã„ ã„¡ã„¢ã„£ã„¤ã„¥ã„¦ã„§ã„¨ã„©ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[168].length; ++n)
		if (t[168][n].charCodeAt(0) !== 65533) {
			r[t[168][n]] = 43008 + n;
			e[43008 + n] = t[168][n]
		}
	t[169] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½â”€â”â”‚â”ƒâ”„â”…â”†â”‡â”ˆâ”‰â”Šâ”‹â”Œâ”â”Žâ”â”â”‘â”’â”“â””â”•â”–â”—â”˜â”™â”šâ”›â”œâ”â”žâ”Ÿâ” â”¡â”¢â”£â”¤â”¥â”¦â”§â”¨â”©â”ªâ”«â”¬â”­â”®â”¯â”°â”±â”²â”³â”´â”µâ”¶â”·â”¸â”¹â”ºâ”»â”¼â”½â”¾â”¿â•€â•â•‚â•ƒâ•„â•…â•†â•‡â•ˆâ•‰â•Šâ•‹ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[169].length; ++n)
		if (t[169][n].charCodeAt(0) !== 65533) {
			r[t[169][n]] = 43264 + n;
			e[43264 + n] = t[169][n]
		}
	t[176] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å•Šé˜¿åŸƒæŒ¨å“Žå”‰å“€çš‘ç™Œè”¼çŸ®è‰¾ç¢çˆ±éš˜éžæ°¨å®‰ä¿ºæŒ‰æš—å²¸èƒºæ¡ˆè‚®æ˜‚ç›Žå‡¹æ•–ç†¬ç¿±è¢„å‚²å¥¥æ‡Šæ¾³èŠ­æŒæ‰’å­å§ç¬†å…«ç–¤å·´æ‹”è·‹é¶æŠŠè€™åéœ¸ç½¢çˆ¸ç™½æŸç™¾æ‘†ä½°è´¥æ‹œç¨—æ–‘ç­æ¬æ‰³èˆ¬é¢æ¿ç‰ˆæ‰®æ‹Œä¼´ç“£åŠåŠžç»Šé‚¦å¸®æ¢†æ¦œè†€ç»‘æ£’ç£…èšŒé•‘å‚è°¤è‹žèƒžåŒ…è¤’å‰¥ï¿½"
		.split("");
	for (n = 0; n != t[176].length; ++n)
		if (t[176][n].charCodeAt(0) !== 65533) {
			r[t[176][n]] = 45056 + n;
			e[45056 + n] = t[176][n]
		}
	t[177] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è–„é›¹ä¿å ¡é¥±å®æŠ±æŠ¥æš´è±¹é²çˆ†æ¯ç¢‘æ‚²å‘åŒ—è¾ˆèƒŒè´é’¡å€ç‹ˆå¤‡æƒ«ç„™è¢«å¥”è‹¯æœ¬ç¬¨å´©ç»·ç”­æ³µè¹¦è¿¸é€¼é¼»æ¯”é„™ç¬”å½¼ç¢§è“–è”½æ¯•æ¯™æ¯–å¸åº‡ç—¹é—­æ•å¼Šå¿…è¾Ÿå£è‡‚é¿é™›éž­è¾¹ç¼–è´¬æ‰ä¾¿å˜åžè¾¨è¾©è¾«éæ ‡å½ªè†˜è¡¨é³–æ†‹åˆ«ç˜ªå½¬æ–Œæ¿’æ»¨å®¾æ‘ˆå…µå†°æŸ„ä¸™ç§‰é¥¼ç‚³ï¿½"
		.split("");
	for (n = 0; n != t[177].length; ++n)
		if (t[177][n].charCodeAt(0) !== 65533) {
			r[t[177][n]] = 45312 + n;
			e[45312 + n] = t[177][n]
		}
	t[178] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç—…å¹¶çŽ»è æ’­æ‹¨é’µæ³¢åšå‹ƒæé“‚ç®”ä¼¯å¸›èˆ¶è„–è†Šæ¸¤æ³Šé©³æ•åœå“ºè¡¥åŸ ä¸å¸ƒæ­¥ç°¿éƒ¨æ€–æ“¦çŒœè£ææ‰è´¢ç¬è¸©é‡‡å½©èœè”¡é¤å‚èš•æ®‹æƒ­æƒ¨ç¿è‹èˆ±ä»“æ²§è—æ“ç³™æ§½æ›¹è‰åŽ•ç­–ä¾§å†Œæµ‹å±‚è¹­æ’å‰èŒ¬èŒ¶æŸ¥ç¢´æ½å¯Ÿå²”å·®è¯§æ‹†æŸ´è±ºæ€æŽºè‰é¦‹è°—ç¼ é“²äº§é˜é¢¤æ˜ŒçŒ–ï¿½"
		.split("");
	for (n = 0; n != t[178].length; ++n)
		if (t[178][n].charCodeAt(0) !== 65533) {
			r[t[178][n]] = 45568 + n;
			e[45568 + n] = t[178][n]
		}
	t[179] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åœºå°å¸¸é•¿å¿è‚ åŽ‚æ•žç•…å”±å€¡è¶…æŠ„é’žæœå˜²æ½®å·¢åµç‚’è½¦æ‰¯æ’¤æŽ£å½»æ¾ˆéƒ´è‡£è¾°å°˜æ™¨å¿±æ²‰é™ˆè¶è¡¬æ’‘ç§°åŸŽæ©™æˆå‘ˆä¹˜ç¨‹æƒ©æ¾„è¯šæ‰¿é€žéª‹ç§¤åƒç—´æŒåŒ™æ± è¿Ÿå¼›é©°è€»é½¿ä¾ˆå°ºèµ¤ç¿…æ–¥ç‚½å……å†²è™«å´‡å® æŠ½é…¬ç•´è¸Œç¨ æ„ç­¹ä»‡ç»¸çž…ä¸‘è‡­åˆå‡ºæ©±åŽ¨èº‡é”„é›æ»é™¤æ¥šï¿½"
		.split("");
	for (n = 0; n != t[179].length; ++n)
		if (t[179][n].charCodeAt(0) !== 65533) {
			r[t[179][n]] = 45824 + n;
			e[45824 + n] = t[179][n]
		}
	t[180] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¡€å‚¨çŸ—æè§¦å¤„æ£å·ç©¿æ¤½ä¼ èˆ¹å–˜ä¸²ç–®çª—å¹¢åºŠé—¯åˆ›å¹ç‚Šæ¶é”¤åž‚æ˜¥æ¤¿é†‡å”‡æ·³çº¯è ¢æˆ³ç»°ç–µèŒ¨ç£é›Œè¾žæ…ˆç“·è¯æ­¤åˆºèµæ¬¡èªè‘±å›±åŒ†ä»Žä¸›å‡‘ç²—é†‹ç°‡ä¿ƒè¹¿ç¯¡çªœæ‘§å´”å‚¬è„†ç˜ç²¹æ·¬ç¿ æ‘å­˜å¯¸ç£‹æ’®æ“æŽªæŒ«é”™æ­è¾¾ç­”ç˜©æ‰“å¤§å‘†æ­¹å‚£æˆ´å¸¦æ®†ä»£è´·è¢‹å¾…é€®ï¿½"
		.split("");
	for (n = 0; n != t[180].length; ++n)
		if (t[180][n].charCodeAt(0) !== 65533) {
			r[t[180][n]] = 46080 + n;
			e[46080 + n] = t[180][n]
		}
	t[181] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ€ è€½æ‹…ä¸¹å•éƒ¸æŽ¸èƒ†æ—¦æ°®ä½†æƒ®æ·¡è¯žå¼¹è›‹å½“æŒ¡å…šè¡æ¡£åˆ€æ£è¹ˆå€’å²›ç¥·å¯¼åˆ°ç¨»æ‚¼é“ç›—å¾·å¾—çš„è¹¬ç¯ç™»ç­‰çžªå‡³é‚“å ¤ä½Žæ»´è¿ªæ•Œç¬›ç‹„æ¶¤ç¿Ÿå«¡æŠµåº•åœ°è’‚ç¬¬å¸å¼Ÿé€’ç¼”é¢ æŽ‚æ»‡ç¢˜ç‚¹å…¸é›åž«ç”µä½ƒç”¸åº—æƒ¦å¥ æ·€æ®¿ç¢‰å¼é›•å‡‹åˆæŽ‰åŠé’“è°ƒè·Œçˆ¹ç¢Ÿè¶è¿­è°å ï¿½"
		.split("");
	for (n = 0; n != t[181].length; ++n)
		if (t[181][n].charCodeAt(0) !== 65533) {
			r[t[181][n]] = 46336 + n;
			e[46336 + n] = t[181][n]
		}
	t[182] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¸ç›¯å®é’‰é¡¶é¼Žé”­å®šè®¢ä¸¢ä¸œå†¬è‘£æ‡‚åŠ¨æ ‹ä¾—æ«å†»æ´žå…œæŠ–æ–—é™¡è±†é€—ç—˜éƒ½ç£æ¯’çŠŠç‹¬è¯»å µç¹èµŒæœé•€è‚šåº¦æ¸¡å¦’ç«¯çŸ­é”»æ®µæ–­ç¼Žå †å…‘é˜Ÿå¯¹å¢©å¨è¹²æ•¦é¡¿å›¤é’ç›¾éæŽ‡å“†å¤šå¤ºåž›èº²æœµè·ºèˆµå‰æƒ°å •è›¾å³¨é¹…ä¿„é¢è®¹å¨¥æ¶åŽ„æ‰¼éé„‚é¥¿æ©è€Œå„¿è€³å°”é¥µæ´±äºŒï¿½"
		.split("");
	for (n = 0; n != t[182].length; ++n)
		if (t[182][n].charCodeAt(0) !== 65533) {
			r[t[182][n]] = 46592 + n;
			e[46592 + n] = t[182][n]
		}
	t[183] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è´°å‘ç½šç­ä¼ä¹é˜€æ³•çè—©å¸†ç•ªç¿»æ¨ŠçŸ¾é’’ç¹å‡¡çƒ¦åè¿”èŒƒè´©çŠ¯é¥­æ³›åŠèŠ³æ–¹è‚ªæˆ¿é˜²å¦¨ä»¿è®¿çººæ”¾è²éžå•¡é£žè‚¥åŒªè¯½å è‚ºåºŸæ²¸è´¹èŠ¬é…šå©æ°›åˆ†çº·åŸç„šæ±¾ç²‰å¥‹ä»½å¿¿æ„¤ç²ªä¸°å°æž«èœ‚å³°é”‹é£Žç–¯çƒ½é€¢å†¯ç¼è®½å¥‰å‡¤ä½›å¦å¤«æ•·è‚¤å­µæ‰¶æ‹‚è¾å¹…æ°Ÿç¬¦ä¼ä¿˜æœï¿½"
		.split("");
	for (n = 0; n != t[183].length; ++n)
		if (t[183][n].charCodeAt(0) !== 65533) {
			r[t[183][n]] = 46848 + n;
			e[46848 + n] = t[183][n]
		}
	t[184] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æµ®æ¶ªç¦è¢±å¼—ç”«æŠšè¾…ä¿¯é‡œæ–§è„¯è…‘åºœè…èµ´å‰¯è¦†èµ‹å¤å‚…ä»˜é˜œçˆ¶è…¹è´Ÿå¯Œè®£é™„å¦‡ç¼šå’å™¶å˜Žè¯¥æ”¹æ¦‚é’™ç›–æº‰å¹²ç”˜æ†æŸ‘ç«¿è‚èµ¶æ„Ÿç§†æ•¢èµ£å†ˆåˆšé’¢ç¼¸è‚›çº²å²—æ¸¯æ ç¯™çš‹é«˜è†ç¾”ç³•æžé•ç¨¿å‘Šå“¥æ­Œææˆˆé¸½èƒ³ç–™å‰²é©è‘›æ ¼è›¤é˜éš”é“¬ä¸ªå„ç»™æ ¹è·Ÿè€•æ›´åºšç¾¹ï¿½"
		.split("");
	for (n = 0; n != t[184].length; ++n)
		if (t[184][n].charCodeAt(0) !== 65533) {
			r[t[184][n]] = 47104 + n;
			e[47104 + n] = t[184][n]
		}
	t[185] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½åŸ‚è€¿æ¢—å·¥æ”»åŠŸæ­é¾šä¾›èº¬å…¬å®«å¼“å·©æ±žæ‹±è´¡å…±é’©å‹¾æ²Ÿè‹Ÿç‹—åž¢æž„è´­å¤Ÿè¾œè‡å’•ç®ä¼°æ²½å­¤å§‘é¼“å¤è›Šéª¨è°·è‚¡æ•…é¡¾å›ºé›‡åˆ®ç“œå‰å¯¡æŒ‚è¤‚ä¹–æ‹æ€ªæ£ºå…³å®˜å† è§‚ç®¡é¦†ç½æƒ¯çŒè´¯å…‰å¹¿é€›ç‘°è§„åœ­ç¡…å½’é¾Ÿé—ºè½¨é¬¼è¯¡ç™¸æ¡‚æŸœè·ªè´µåˆ½è¾Šæ»šæ£é”…éƒ­å›½æžœè£¹è¿‡å“ˆï¿½"
		.split("");
	for (n = 0; n != t[185].length; ++n)
		if (t[185][n].charCodeAt(0) !== 65533) {
			r[t[185][n]] = 47360 + n;
			e[47360 + n] = t[185][n]
		}
	t[186] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éª¸å­©æµ·æ°¦äº¥å®³éª‡é…£æ†¨é‚¯éŸ©å«æ¶µå¯’å‡½å–Šç½•ç¿°æ’¼ææ—±æ†¾æ‚ç„Šæ±—æ±‰å¤¯æ­èˆªå£•åšŽè±ªæ¯«éƒå¥½è€—å·æµ©å‘µå–è·èæ ¸ç¦¾å’Œä½•åˆç›’è²‰é˜‚æ²³æ¶¸èµ«è¤é¹¤è´ºå˜¿é»‘ç—•å¾ˆç‹ æ¨å“¼äº¨æ¨ªè¡¡æ’è½°å“„çƒ˜è™¹é¸¿æ´ªå®å¼˜çº¢å–‰ä¾¯çŒ´å¼åŽšå€™åŽå‘¼ä¹Žå¿½ç‘šå£¶è‘«èƒ¡è´ç‹ç³Šæ¹–ï¿½"
		.split("");
	for (n = 0; n != t[186].length; ++n)
		if (t[186][n].charCodeAt(0) !== 65533) {
			r[t[186][n]] = 47616 + n;
			e[47616 + n] = t[186][n]
		}
	t[187] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¼§è™Žå”¬æŠ¤äº’æ²ªæˆ·èŠ±å“—åŽçŒ¾æ»‘ç”»åˆ’åŒ–è¯æ§å¾Šæ€€æ·®åæ¬¢çŽ¯æ¡“è¿˜ç¼“æ¢æ‚£å”¤ç—ªè±¢ç„•æ¶£å®¦å¹»è’æ…Œé»„ç£ºè—ç°§çš‡å‡°æƒ¶ç…Œæ™ƒå¹Œæè°Žç°æŒ¥è¾‰å¾½æ¢è›”å›žæ¯æ‚”æ…§å‰æƒ æ™¦è´¿ç§½ä¼šçƒ©æ±‡è®³è¯²ç»˜è¤æ˜å©šé­‚æµ‘æ··è±æ´»ä¼™ç«èŽ·æˆ–æƒ‘éœè´§ç¥¸å‡»åœ¾åŸºæœºç•¸ç¨½ç§¯ç®•ï¿½"
		.split("");
	for (n = 0; n != t[187].length; ++n)
		if (t[187][n].charCodeAt(0) !== 65533) {
			r[t[187][n]] = 47872 + n;
			e[47872 + n] = t[187][n]
		}
	t[188] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‚Œé¥¥è¿¹æ¿€è®¥é¸¡å§¬ç»©ç¼‰å‰æžæ£˜è¾‘ç±é›†åŠæ€¥ç–¾æ±²å³å«‰çº§æŒ¤å‡ è„Šå·±è“ŸæŠ€å†€å­£ä¼Žç¥­å‰‚æ‚¸æµŽå¯„å¯‚è®¡è®°æ—¢å¿Œé™…å¦“ç»§çºªå˜‰æž·å¤¹ä½³å®¶åŠ èšé¢Šè´¾ç”²é’¾å‡ç¨¼ä»·æž¶é©¾å«æ­¼ç›‘åšå°–ç¬ºé—´ç…Žå…¼è‚©è‰°å¥¸ç¼„èŒ§æ£€æŸ¬ç¢±ç¡·æ‹£æ¡ç®€ä¿­å‰ªå‡èæ§›é‰´è·µè´±è§é”®ç®­ä»¶ï¿½"
		.split("");
	for (n = 0; n != t[188].length; ++n)
		if (t[188][n].charCodeAt(0) !== 65533) {
			r[t[188][n]] = 48128 + n;
			e[48128 + n] = t[188][n]
		}
	t[189] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¥èˆ°å‰‘é¥¯æ¸æº…æ¶§å»ºåƒµå§œå°†æµ†æ±Ÿç–†è’‹æ¡¨å¥–è®²åŒ é…±é™è•‰æ¤’ç¤ç„¦èƒ¶äº¤éƒŠæµ‡éª„å¨‡åš¼æ…é“°çŸ«ä¾¥è„šç‹¡è§’é¥ºç¼´ç»žå‰¿æ•™é…µè½¿è¾ƒå«çª–æ­æŽ¥çš†ç§¸è¡—é˜¶æˆªåŠ«èŠ‚æ¡”æ°æ·ç«ç«­æ´ç»“è§£å§æˆ’è—‰èŠ¥ç•Œå€Ÿä»‹ç–¥è¯«å±Šå·¾ç­‹æ–¤é‡‘ä»Šæ´¥è¥Ÿç´§é”¦ä»…è°¨è¿›é³æ™‹ç¦è¿‘çƒ¬æµ¸ï¿½"
		.split("");
	for (n = 0; n != t[189].length; ++n)
		if (t[189][n].charCodeAt(0) !== 65533) {
			r[t[189][n]] = 48384 + n;
			e[48384 + n] = t[189][n]
		}
	t[190] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å°½åŠ²è†å…¢èŒŽç›æ™¶é²¸äº¬æƒŠç²¾ç²³ç»äº•è­¦æ™¯é¢ˆé™å¢ƒæ•¬é•œå¾„ç—‰é–ç«Ÿç«žå‡€ç‚¯çª˜æªç©¶çº çŽ–éŸ­ä¹…ç¸ä¹é…’åŽ©æ•‘æ—§è‡¼èˆ…å’Žå°±ç–šéž æ‹˜ç‹™ç–½å±…é©¹èŠå±€å’€çŸ©ä¸¾æ²®èšæ‹’æ®å·¨å…·è·è¸žé”¯ä¿±å¥æƒ§ç‚¬å‰§æé¹ƒå¨Ÿå€¦çœ·å·ç»¢æ’…æ”«æŠ‰æŽ˜å€”çˆµè§‰å†³è¯€ç»å‡èŒé’§å†›å›å³»ï¿½"
		.split("");
	for (n = 0; n != t[190].length; ++n)
		if (t[190][n].charCodeAt(0) !== 65533) {
			r[t[190][n]] = 48640 + n;
			e[48640 + n] = t[190][n]
		}
	t[191] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¿Šç«£æµšéƒ¡éªå–€å’–å¡å’¯å¼€æ©æ¥·å‡¯æ…¨åˆŠå ªå‹˜åŽç çœ‹åº·æ…·ç³ æ‰›æŠ—äº¢ç‚•è€ƒæ‹·çƒ¤é å·è‹›æŸ¯æ£µç£•é¢—ç§‘å£³å’³å¯æ¸´å…‹åˆ»å®¢è¯¾è‚¯å•ƒåž¦æ³å‘å­ç©ºæå­”æŽ§æŠ å£æ‰£å¯‡æž¯å“­çªŸè‹¦é…·åº“è£¤å¤¸åž®æŒŽè·¨èƒ¯å—ç­·ä¾©å¿«å®½æ¬¾åŒ¡ç­ç‹‚æ¡†çŸ¿çœ¶æ—·å†µäºç›”å²¿çª¥è‘µå¥Žé­å‚€ï¿½"
		.split("");
	for (n = 0; n != t[191].length; ++n)
		if (t[191][n].charCodeAt(0) !== 65533) {
			r[t[191][n]] = 48896 + n;
			e[48896 + n] = t[191][n]
		}
	t[192] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¦ˆæ„§æºƒå¤æ˜†æ†å›°æ‹¬æ‰©å»“é˜”åžƒæ‹‰å–‡èœ¡è…Šè¾£å•¦èŽ±æ¥èµ–è“å©ªæ æ‹¦ç¯®é˜‘å…°æ¾œè°°æ½è§ˆæ‡’ç¼†çƒ‚æ»¥ç…æ¦”ç‹¼å»ŠéƒŽæœ—æµªæžåŠ³ç‰¢è€ä½¬å§¥é…ªçƒ™æ¶å‹’ä¹é›·é•­è•¾ç£Šç´¯å„¡åž’æ“‚è‚‹ç±»æ³ªæ£±æ¥žå†·åŽ˜æ¢¨çŠé»Žç¯±ç‹¸ç¦»æ¼“ç†æŽé‡Œé²¤ç¤¼èŽ‰è”åæ —ä¸½åŽ‰åŠ±ç ¾åŽ†åˆ©å‚ˆä¾‹ä¿ï¿½"
		.split("");
	for (n = 0; n != t[192].length; ++n)
		if (t[192][n].charCodeAt(0) !== 65533) {
			r[t[192][n]] = 49152 + n;
			e[49152 + n] = t[192][n]
		}
	t[193] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç—¢ç«‹ç²’æ²¥éš¶åŠ›ç’ƒå“©ä¿©è”èŽ²è¿žé•°å»‰æ€œæ¶Ÿå¸˜æ•›è„¸é“¾æ‹ç‚¼ç»ƒç²®å‡‰æ¢ç²±è‰¯ä¸¤è¾†é‡æ™¾äº®è°…æ’©èŠåƒšç–—ç‡Žå¯¥è¾½æ½¦äº†æ’‚é•£å»–æ–™åˆ—è£‚çƒˆåŠ£çŒŽç³æž—ç£·éœ–ä¸´é‚»é³žæ·‹å‡›èµåæ‹ŽçŽ²è±é›¶é¾„é“ƒä¼¶ç¾šå‡Œçµé™µå²­é¢†å¦ä»¤æºœç‰æ¦´ç¡«é¦ç•™åˆ˜ç˜¤æµæŸ³å…­é¾™è‹å’™ç¬¼çª¿ï¿½"
		.split("");
	for (n = 0; n != t[193].length; ++n)
		if (t[193][n].charCodeAt(0) !== 65533) {
			r[t[193][n]] = 49408 + n;
			e[49408 + n] = t[193][n]
		}
	t[194] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½éš†åž„æ‹¢é™‡æ¥¼å¨„æ‚ç¯“æ¼é™‹èŠ¦å¢é¢…åºç‚‰æŽ³å¤è™é²éº“ç¢Œéœ²è·¯èµ‚é¹¿æ½žç¦„å½•é™†æˆ®é©´å•é“ä¾£æ—…å±¥å±¡ç¼•è™‘æ°¯å¾‹çŽ‡æ»¤ç»¿å³¦æŒ›å­ªæ»¦åµä¹±æŽ ç•¥æŠ¡è½®ä¼¦ä»‘æ²¦çº¶è®ºèèžºç½—é€»é”£ç®©éª¡è£¸è½æ´›éª†ç»œå¦ˆéº»çŽ›ç èš‚é©¬éª‚å˜›å—åŸ‹ä¹°éº¦å–è¿ˆè„‰çž’é¦’è›®æ»¡è”“æ›¼æ…¢æ¼«ï¿½"
		.split("");
	for (n = 0; n != t[194].length; ++n)
		if (t[194][n].charCodeAt(0) !== 65533) {
			r[t[194][n]] = 49664 + n;
			e[49664 + n] = t[194][n]
		}
	t[195] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è°©èŠ’èŒ«ç›²æ°“å¿™èŽ½çŒ«èŒ…é”šæ¯›çŸ›é“†å¯èŒ‚å†’å¸½è²Œè´¸ä¹ˆçŽ«æžšæ¢…é…¶éœ‰ç…¤æ²¡çœ‰åª’é•æ¯ç¾Žæ˜§å¯å¦¹åªšé—¨é—·ä»¬èŒè’™æª¬ç›Ÿé”°çŒ›æ¢¦å­Ÿçœ¯é†šé¡ç³œè¿·è°œå¼¥ç±³ç§˜è§…æ³Œèœœå¯†å¹‚æ£‰çœ ç»µå†•å…å‹‰å¨©ç¼…é¢è‹—æçž„è—ç§’æ¸ºåº™å¦™è”‘ç­æ°‘æŠ¿çš¿æ•æ‚¯é—½æ˜ŽèžŸé¸£é“­åå‘½è°¬æ‘¸ï¿½"
		.split("");
	for (n = 0; n != t[195].length; ++n)
		if (t[195][n].charCodeAt(0) !== 65533) {
			r[t[195][n]] = 49920 + n;
			e[49920 + n] = t[195][n]
		}
	t[196] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ‘¹è˜‘æ¨¡è†œç£¨æ‘©é­”æŠ¹æœ«èŽ«å¢¨é»˜æ²«æ¼ å¯žé™Œè°‹ç‰ŸæŸæ‹‡ç‰¡äº©å§†æ¯å¢“æš®å¹•å‹Ÿæ…•æœ¨ç›®ç¦ç‰§ç©†æ‹¿å“ªå‘é’ é‚£å¨œçº³æ°–ä¹ƒå¥¶è€å¥ˆå—ç”·éš¾å›ŠæŒ è„‘æ¼é—¹æ·–å‘¢é¦å†…å«©èƒ½å¦®éœ“å€ªæ³¥å°¼æ‹Ÿä½ åŒ¿è…»é€†æººè”«æ‹ˆå¹´ç¢¾æ’µæ»å¿µå¨˜é…¿é¸Ÿå°¿æè‚å­½å•®é•Šé•æ¶…æ‚¨æŸ ç‹žå‡å®ï¿½"
		.split("");
	for (n = 0; n != t[196].length; ++n)
		if (t[196][n].charCodeAt(0) !== 65533) {
			r[t[196][n]] = 50176 + n;
			e[50176 + n] = t[196][n]
		}
	t[197] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ‹§æ³žç‰›æ‰­é’®çº½è„“æµ“å†œå¼„å¥´åŠªæ€’å¥³æš–è™ç–ŸæŒªæ‡¦ç³¯è¯ºå“¦æ¬§é¸¥æ®´è—•å‘•å¶æ²¤å•ªè¶´çˆ¬å¸•æ€•ç¶æ‹æŽ’ç‰Œå¾˜æ¹ƒæ´¾æ”€æ½˜ç›˜ç£ç›¼ç•”åˆ¤å›ä¹“åºžæ—è€ªèƒ–æŠ›å’†åˆ¨ç‚®è¢è·‘æ³¡å‘¸èƒšåŸ¹è£´èµ”é™ªé…ä½©æ²›å–·ç›†ç °æŠ¨çƒ¹æ¾Žå½­è“¬æ£šç¡¼ç¯·è†¨æœ‹é¹æ§ç¢°å¯ç ’éœ¹æ‰¹æŠ«åŠˆçµæ¯—ï¿½"
		.split("");
	for (n = 0; n != t[197].length; ++n)
		if (t[197][n].charCodeAt(0) !== 65533) {
			r[t[197][n]] = 50432 + n;
			e[50432 + n] = t[197][n]
		}
	t[198] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å•¤è„¾ç–²çš®åŒ¹ç—žåƒ»å±è­¬ç¯‡åç‰‡éª—é£˜æ¼‚ç“¢ç¥¨æ’‡çž¥æ‹¼é¢‘è´«å“è˜ä¹’åªè‹¹èå¹³å‡­ç“¶è¯„å±å¡æ³¼é¢‡å©†ç ´é­„è¿«ç²•å‰–æ‰‘é“ºä»†èŽ†è‘¡è©è’²åŸ”æœ´åœƒæ™®æµ¦è°±æ›ç€‘æœŸæ¬ºæ –æˆšå¦»ä¸ƒå‡„æ¼†æŸ’æ²å…¶æ£‹å¥‡æ­§ç•¦å´Žè„é½æ——ç¥ˆç¥éª‘èµ·å²‚ä¹žä¼å¯å¥‘ç Œå™¨æ°”è¿„å¼ƒæ±½æ³£è®«æŽï¿½"
		.split("");
	for (n = 0; n != t[198].length; ++n)
		if (t[198][n].charCodeAt(0) !== 65533) {
			r[t[198][n]] = 50688 + n;
			e[50688 + n] = t[198][n]
		}
	t[199] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ°æ´½ç‰µæ‰¦é’Žé“…åƒè¿ç­¾ä»Ÿè°¦ä¹¾é»”é’±é’³å‰æ½œé£æµ…è°´å ‘åµŒæ¬ æ­‰æžªå‘›è…”ç¾Œå¢™è”·å¼ºæŠ¢æ©‡é”¹æ•²æ‚„æ¡¥çž§ä¹”ä¾¨å·§éž˜æ’¬ç¿˜å³­ä¿çªåˆ‡èŒ„ä¸”æ€¯çªƒé’¦ä¾µäº²ç§¦ç´å‹¤èŠ¹æ“’ç¦½å¯æ²é’è½»æ°¢å€¾å¿æ¸…æ“Žæ™´æ°°æƒ…é¡·è¯·åº†ç¼ç©·ç§‹ä¸˜é‚±çƒæ±‚å›šé…‹æ³…è¶‹åŒºè›†æ›²èº¯å±ˆé©±æ¸ ï¿½"
		.split("");
	for (n = 0; n != t[199].length; ++n)
		if (t[199][n].charCodeAt(0) !== 65533) {
			r[t[199][n]] = 50944 + n;
			e[50944 + n] = t[199][n]
		}
	t[200] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å–å¨¶é¾‹è¶£åŽ»åœˆé¢§æƒé†›æ³‰å…¨ç—Šæ‹³çŠ¬åˆ¸åŠç¼ºç‚”ç˜¸å´é¹Šæ¦·ç¡®é›€è£™ç¾¤ç„¶ç‡ƒå†‰æŸ“ç“¤å£¤æ”˜åš·è®©é¥¶æ‰°ç»•æƒ¹çƒ­å£¬ä»äººå¿éŸ§ä»»è®¤åˆƒå¦Šçº«æ‰”ä»æ—¥æˆŽèŒ¸è“‰è£èžç†”æº¶å®¹ç»’å†—æ‰æŸ”è‚‰èŒ¹è •å„’å­ºå¦‚è¾±ä¹³æ±å…¥è¤¥è½¯é˜®è•Šç‘žé”é—°æ¶¦è‹¥å¼±æ’’æ´’è¨è…®é³ƒå¡žèµ›ä¸‰åï¿½"
		.split("");
	for (n = 0; n != t[200].length; ++n)
		if (t[200][n].charCodeAt(0) !== 65533) {
			r[t[200][n]] = 51200 + n;
			e[51200 + n] = t[200][n]
		}
	t[201] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä¼žæ•£æ¡‘å—“ä¸§æ”éªšæ‰«å«‚ç‘Ÿè‰²æ¶©æ£®åƒ§èŽŽç ‚æ€åˆ¹æ²™çº±å‚»å•¥ç…žç­›æ™’çŠè‹«æ‰å±±åˆ ç…½è¡«é—ªé™•æ“…èµ¡è†³å–„æ±•æ‰‡ç¼®å¢’ä¼¤å•†èµæ™Œä¸Šå°šè£³æ¢¢æŽç¨çƒ§èŠå‹ºéŸ¶å°‘å“¨é‚µç»å¥¢èµŠè›‡èˆŒèˆèµ¦æ‘„å°„æ…‘æ¶‰ç¤¾è®¾ç ·ç”³å‘»ä¼¸èº«æ·±å¨ ç»…ç¥žæ²ˆå®¡å©¶ç”šè‚¾æ…Žæ¸—å£°ç”Ÿç”¥ç‰²å‡ç»³ï¿½"
		.split("");
	for (n = 0; n != t[201].length; ++n)
		if (t[201][n].charCodeAt(0) !== 65533) {
			r[t[201][n]] = 51456 + n;
			e[51456 + n] = t[201][n]
		}
	t[202] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çœç››å‰©èƒœåœ£å¸ˆå¤±ç‹®æ–½æ¹¿è¯—å°¸è™±åçŸ³æ‹¾æ—¶ä»€é£Ÿèš€å®žè¯†å²çŸ¢ä½¿å±Žé©¶å§‹å¼ç¤ºå£«ä¸–æŸ¿äº‹æ‹­èª“é€åŠ¿æ˜¯å—œå™¬é€‚ä»•ä¾é‡Šé¥°æ°å¸‚æƒå®¤è§†è¯•æ”¶æ‰‹é¦–å®ˆå¯¿æŽˆå”®å—ç˜¦å…½è”¬æž¢æ¢³æ®ŠæŠ’è¾“å”èˆ’æ·‘ç–ä¹¦èµŽå­°ç†Ÿè–¯æš‘æ›™ç½²èœ€é»é¼ å±žæœ¯è¿°æ ‘æŸæˆç«–å¢…åº¶æ•°æ¼±ï¿½"
		.split("");
	for (n = 0; n != t[202].length; ++n)
		if (t[202][n].charCodeAt(0) !== 65533) {
			r[t[202][n]] = 51712 + n;
			e[51712 + n] = t[202][n]
		}
	t[203] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ•åˆ·è€æ‘”è¡°ç”©å¸…æ “æ‹´éœœåŒçˆ½è°æ°´ç¡ç¨Žå®çž¬é¡ºèˆœè¯´ç¡•æœ”çƒæ–¯æ’•å˜¶æ€ç§å¸ä¸æ­»è‚†å¯ºå—£å››ä¼ºä¼¼é¥²å·³æ¾è€¸æ€‚é¢‚é€å®‹è®¼è¯µæœè‰˜æ“žå—½è‹é…¥ä¿—ç´ é€Ÿç²Ÿåƒ³å¡‘æº¯å®¿è¯‰è‚ƒé…¸è’œç®—è™½éš‹éšç»¥é«“ç¢Žå²ç©—é‚éš§ç¥Ÿå­™æŸç¬‹è“‘æ¢­å”†ç¼©çç´¢é”æ‰€å¡Œä»–å®ƒå¥¹å¡”ï¿½"
		.split("");
	for (n = 0; n != t[203].length; ++n)
		if (t[203][n].charCodeAt(0) !== 65533) {
			r[t[203][n]] = 51968 + n;
			e[51968 + n] = t[203][n]
		}
	t[204] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç­æŒžè¹‹è¸èƒŽè‹”æŠ¬å°æ³°é…žå¤ªæ€æ±°åæ‘Šè´ªç˜«æ»©å›æª€ç—°æ½­è°­è°ˆå¦æ¯¯è¢’ç¢³æŽ¢å¹ç‚­æ±¤å¡˜æªå ‚æ£ è†›å”ç³–å€˜èººæ·Œè¶Ÿçƒ«æŽæ¶›æ»”ç»¦è„æ¡ƒé€ƒæ·˜é™¶è®¨å¥—ç‰¹è—¤è…¾ç–¼èªŠæ¢¯å‰”è¸¢é”‘æé¢˜è¹„å•¼ä½“æ›¿åšæƒ•æ¶•å‰ƒå±‰å¤©æ·»å¡«ç”°ç”œæ¬èˆ”è…†æŒ‘æ¡è¿¢çœºè·³è´´é“å¸–åŽ…å¬çƒƒï¿½"
		.split("");
	for (n = 0; n != t[204].length; ++n)
		if (t[204][n].charCodeAt(0) !== 65533) {
			r[t[204][n]] = 52224 + n;
			e[52224 + n] = t[204][n]
		}
	t[205] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ±€å»·åœäº­åº­æŒºè‰‡é€šæ¡é…®çž³åŒé“œå½¤ç«¥æ¡¶æ…ç­’ç»Ÿç—›å·æŠ•å¤´é€å‡¸ç§ƒçªå›¾å¾’é€”æ¶‚å± åœŸåå…”æ¹å›¢æŽ¨é¢“è…¿èœ•è¤ªé€€åžå±¯è‡€æ‹–æ‰˜è„±é¸µé™€é©®é©¼æ¤­å¦¥æ‹“å”¾æŒ–å“‡è›™æ´¼å¨ƒç“¦è¢œæ­ªå¤–è±Œå¼¯æ¹¾çŽ©é¡½ä¸¸çƒ·å®Œç¢—æŒ½æ™šçš–æƒ‹å®›å©‰ä¸‡è…•æ±ªçŽ‹äº¡æž‰ç½‘å¾€æ—ºæœ›å¿˜å¦„å¨ï¿½"
		.split("");
	for (n = 0; n != t[205].length; ++n)
		if (t[205][n].charCodeAt(0) !== 65533) {
			r[t[205][n]] = 52480 + n;
			e[52480 + n] = t[205][n]
		}
	t[206] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å·å¾®å±éŸ¦è¿æ¡…å›´å”¯æƒŸä¸ºæ½ç»´è‹‡èŽå§”ä¼Ÿä¼ªå°¾çº¬æœªè”šå‘³ç•èƒƒå–‚é­ä½æ¸­è°“å°‰æ…°å«ç˜Ÿæ¸©èšŠæ–‡é—»çº¹å»ç¨³ç´Šé—®å—¡ç¿ç“®æŒèœ—æ¶¡çªæˆ‘æ–¡å§æ¡æ²ƒå·«å‘œé’¨ä¹Œæ±¡è¯¬å±‹æ— èŠœæ¢§å¾å´æ¯‹æ­¦äº”æ‚åˆèˆžä¼ä¾®åžæˆŠé›¾æ™¤ç‰©å‹¿åŠ¡æ‚Ÿè¯¯æ˜”ç†™æžè¥¿ç¡’çŸ½æ™°å˜»å¸é”¡ç‰ºï¿½"
		.split("");
	for (n = 0; n != t[206].length; ++n)
		if (t[206][n].charCodeAt(0) !== 65533) {
			r[t[206][n]] = 52736 + n;
			e[52736 + n] = t[206][n]
		}
	t[207] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¨€æ¯å¸Œæ‚‰è†å¤•æƒœç†„çƒ¯æºªæ±çŠ€æª„è¢­å¸­ä¹ åª³å–œé“£æ´—ç³»éš™æˆç»†çžŽè™¾åŒ£éœžè¾–æš‡å³¡ä¾ ç‹­ä¸‹åŽ¦å¤å“æŽ€é”¨å…ˆä»™é²œçº¤å’¸è´¤è¡”èˆ·é—²æ¶Žå¼¦å«Œæ˜¾é™©çŽ°çŒ®åŽ¿è…ºé¦…ç¾¡å®ªé™·é™çº¿ç›¸åŽ¢é•¶é¦™ç®±è¥„æ¹˜ä¹¡ç¿”ç¥¥è¯¦æƒ³å“äº«é¡¹å··æ©¡åƒå‘è±¡è§ç¡éœ„å‰Šå“®åš£é”€æ¶ˆå®µæ·†æ™“ï¿½"
		.split("");
	for (n = 0; n != t[207].length; ++n)
		if (t[207][n].charCodeAt(0) !== 65533) {
			r[t[207][n]] = 52992 + n;
			e[52992 + n] = t[207][n]
		}
	t[208] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å°å­æ ¡è‚–å•¸ç¬‘æ•ˆæ¥”äº›æ­‡èŽéž‹åæŒŸæºé‚ªæ–œèƒè°å†™æ¢°å¸èŸ¹æ‡ˆæ³„æ³»è°¢å±‘è–ªèŠ¯é”Œæ¬£è¾›æ–°å¿»å¿ƒä¿¡è¡…æ˜Ÿè…¥çŒ©æƒºå…´åˆ‘åž‹å½¢é‚¢è¡Œé†’å¹¸ææ€§å§“å…„å‡¶èƒ¸åŒˆæ±¹é›„ç†Šä¼‘ä¿®ç¾žæœ½å—…é”ˆç§€è¢–ç»£å¢ŸæˆŒéœ€è™šå˜˜é¡»å¾è®¸è“„é…—å™æ—­åºç•œæ¤çµ®å©¿ç»ªç»­è½©å–§å®£æ‚¬æ—‹çŽ„ï¿½"
		.split("");
	for (n = 0; n != t[208].length; ++n)
		if (t[208][n].charCodeAt(0) !== 65533) {
			r[t[208][n]] = 53248 + n;
			e[53248 + n] = t[208][n]
		}
	t[209] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é€‰ç™£çœ©ç»šé´è–›å­¦ç©´é›ªè¡€å‹‹ç†å¾ªæ—¬è¯¢å¯»é©¯å·¡æ®‰æ±›è®­è®¯é€Šè¿…åŽ‹æŠ¼é¸¦é¸­å‘€ä¸«èŠ½ç‰™èšœå´–è¡™æ¶¯é›…å“‘äºšè®¶ç„‰å’½é˜‰çƒŸæ·¹ç›ä¸¥ç ”èœ’å²©å»¶è¨€é¢œé˜Žç‚Žæ²¿å¥„æŽ©çœ¼è¡æ¼”è‰³å °ç‡•åŽŒç šé›å”å½¦ç„°å®´è°šéªŒæ®ƒå¤®é¸¯ç§§æ¨æ‰¬ä½¯ç–¡ç¾Šæ´‹é˜³æ°§ä»°ç—’å…»æ ·æ¼¾é‚€è…°å¦–ç‘¶ï¿½"
		.split("");
	for (n = 0; n != t[209].length; ++n)
		if (t[209][n].charCodeAt(0) !== 65533) {
			r[t[209][n]] = 53504 + n;
			e[53504 + n] = t[209][n]
		}
	t[210] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ‘‡å°§é¥çª‘è°£å§šå’¬èˆ€è¯è¦è€€æ¤°å™Žè€¶çˆ·é‡Žå†¶ä¹Ÿé¡µæŽ–ä¸šå¶æ›³è…‹å¤œæ¶²ä¸€å£¹åŒ»æ–é“±ä¾ä¼Šè¡£é¢å¤·é—ç§»ä»ªèƒ°ç–‘æ²‚å®œå§¨å½æ¤…èšå€šå·²ä¹™çŸ£ä»¥è‰ºæŠ‘æ˜“é‚‘å±¹äº¿å½¹è‡†é€¸è‚„ç–«äº¦è£”æ„æ¯…å¿†ä¹‰ç›Šæº¢è¯£è®®è°Šè¯‘å¼‚ç¿¼ç¿Œç»ŽèŒµè«å› æ®·éŸ³é˜´å§»åŸé“¶æ·«å¯…é¥®å°¹å¼•éšï¿½"
		.split("");
	for (n = 0; n != t[210].length; ++n)
		if (t[210][n].charCodeAt(0) !== 65533) {
			r[t[210][n]] = 53760 + n;
			e[53760 + n] = t[210][n]
		}
	t[211] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å°è‹±æ¨±å©´é¹°åº”ç¼¨èŽ¹è¤è¥è§è‡è¿Žèµ¢ç›ˆå½±é¢–ç¡¬æ˜ å“Ÿæ‹¥ä½£è‡ƒç—ˆåº¸é›è¸Šè›¹å’æ³³æ¶Œæ°¸æ¿å‹‡ç”¨å¹½ä¼˜æ‚ å¿§å°¤ç”±é‚®é“€çŠ¹æ²¹æ¸¸é…‰æœ‰å‹å³ä½‘é‡‰è¯±åˆå¹¼è¿‚æ·¤äºŽç›‚æ¦†è™žæ„šèˆ†ä½™ä¿žé€¾é±¼æ„‰æ¸æ¸”éš…äºˆå¨±é›¨ä¸Žå±¿ç¦¹å®‡è¯­ç¾½çŽ‰åŸŸèŠ‹éƒåé‡å–»å³ªå¾¡æ„ˆæ¬²ç‹±è‚²èª‰ï¿½"
		.split("");
	for (n = 0; n != t[211].length; ++n)
		if (t[211][n].charCodeAt(0) !== 65533) {
			r[t[211][n]] = 54016 + n;
			e[54016 + n] = t[211][n]
		}
	t[212] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æµ´å¯“è£•é¢„è±«é©­é¸³æ¸Šå†¤å…ƒåž£è¢åŽŸæ´è¾•å›­å‘˜åœ†çŒ¿æºç¼˜è¿œè‹‘æ„¿æ€¨é™¢æ›°çº¦è¶Šè·ƒé’¥å²³ç²¤æœˆæ‚¦é˜…è€˜äº‘éƒ§åŒ€é™¨å…è¿è•´é…æ™•éŸµå­•åŒç ¸æ‚æ ½å“‰ç¾å®°è½½å†åœ¨å’±æ”’æš‚èµžèµƒè„è‘¬é­ç³Ÿå‡¿è—»æž£æ—©æ¾¡èš¤èºå™ªé€ çš‚ç¶ç‡¥è´£æ‹©åˆ™æ³½è´¼æ€Žå¢žæ†Žæ›¾èµ æ‰Žå–³æ¸£æœ­è½§ï¿½"
		.split("");
	for (n = 0; n != t[212].length; ++n)
		if (t[212][n].charCodeAt(0) !== 65533) {
			r[t[212][n]] = 54272 + n;
			e[54272 + n] = t[212][n]
		}
	t[213] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é“¡é—¸çœ¨æ …æ¦¨å’‹ä¹ç‚¸è¯ˆæ‘˜æ–‹å®…çª„å€ºå¯¨çž»æ¯¡è©¹ç²˜æ²¾ç›æ–©è¾—å´­å±•è˜¸æ ˆå æˆ˜ç«™æ¹›ç»½æ¨Ÿç« å½°æ¼³å¼ æŽŒæ¶¨æ–ä¸ˆå¸è´¦ä»—èƒ€ç˜´éšœæ‹›æ˜­æ‰¾æ²¼èµµç…§ç½©å…†è‚‡å¬é®æŠ˜å“²è›°è¾™è€…é”—è”—è¿™æµ™çæ–ŸçœŸç”„ç §è‡»è´žé’ˆä¾¦æž•ç–¹è¯Šéœ‡æŒ¯é•‡é˜µè’¸æŒ£çå¾ç‹°äº‰æ€”æ•´æ‹¯æ­£æ”¿ï¿½"
		.split("");
	for (n = 0; n != t[213].length; ++n)
		if (t[213][n].charCodeAt(0) !== 65533) {
			r[t[213][n]] = 54528 + n;
			e[54528 + n] = t[213][n]
		}
	t[214] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¸§ç—‡éƒ‘è¯èŠæžæ”¯å±èœ˜çŸ¥è‚¢è„‚æ±ä¹‹ç»‡èŒç›´æ¤æ®–æ‰§å€¼ä¾„å€æŒ‡æ­¢è¶¾åªæ—¨çº¸å¿—æŒšæŽ·è‡³è‡´ç½®å¸œå³™åˆ¶æ™ºç§©ç¨šè´¨ç‚™ç—”æ»žæ²»çª’ä¸­ç›…å¿ é’Ÿè¡·ç»ˆç§è‚¿é‡ä»²ä¼—èˆŸå‘¨å·žæ´²è¯Œç²¥è½´è‚˜å¸šå’’çš±å®™æ˜¼éª¤ç æ ªè››æœ±çŒªè¯¸è¯›é€ç«¹çƒ›ç…®æ‹„çž©å˜±ä¸»è‘—æŸ±åŠ©è›€è´®é“¸ç­‘ï¿½"
		.split("");
	for (n = 0; n != t[214].length; ++n)
		if (t[214][n].charCodeAt(0) !== 65533) {
			r[t[214][n]] = 54784 + n;
			e[54784 + n] = t[214][n]
		}
	t[215] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä½æ³¨ç¥é©»æŠ“çˆªæ‹½ä¸“ç –è½¬æ’°èµšç¯†æ¡©åº„è£…å¦†æ’žå£®çŠ¶æ¤Žé”¥è¿½èµ˜å ç¼€è°†å‡†æ‰æ‹™å“æ¡Œç¢èŒé…Œå•„ç€ç¼æµŠå…¹å’¨èµ„å§¿æ»‹æ·„å­œç´«ä»”ç±½æ»“å­è‡ªæ¸å­—é¬ƒæ£•è¸ªå®—ç»¼æ€»çºµé‚¹èµ°å¥æç§Ÿè¶³å’æ—ç¥–è¯…é˜»ç»„é’»çº‚å˜´é†‰æœ€ç½ªå°Šéµæ˜¨å·¦ä½æŸžåšä½œååº§ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½"
		.split("");
	for (n = 0; n != t[215].length; ++n)
		if (t[215][n].charCodeAt(0) !== 65533) {
			r[t[215][n]] = 55040 + n;
			e[55040 + n] = t[215][n]
		}
	t[216] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½äºä¸Œå…€ä¸å»¿å…ä¸•äº˜ä¸žé¬²å­¬å™©ä¸¨ç¦ºä¸¿åŒ•ä¹‡å¤­çˆ»å®æ°å›Ÿèƒ¤é¦—æ¯“ç¾é¼—ä¸¶äºŸé¼ä¹œä¹©äº“èŠˆå­›å•¬å˜ä»„åŽåŽåŽ£åŽ¥åŽ®é¥èµåŒšåµåŒ¦åŒ®åŒ¾èµœå¦å£åˆ‚åˆˆåˆŽåˆ­åˆ³åˆ¿å‰€å‰Œå‰žå‰¡å‰œè’¯å‰½åŠ‚åŠåŠåŠ“å†‚ç½”äº»ä»ƒä»‰ä»‚ä»¨ä»¡ä»«ä»žä¼›ä»³ä¼¢ä½¤ä»µä¼¥ä¼§ä¼‰ä¼«ä½žä½§æ”¸ä½šä½ï¿½"
		.split("");
	for (n = 0; n != t[216].length; ++n)
		if (t[216][n].charCodeAt(0) !== 65533) {
			r[t[216][n]] = 55296 + n;
			e[55296 + n] = t[216][n]
		}
	t[217] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ä½Ÿä½—ä¼²ä¼½ä½¶ä½´ä¾‘ä¾‰ä¾ƒä¾ä½¾ä½»ä¾ªä½¼ä¾¬ä¾”ä¿¦ä¿¨ä¿ªä¿…ä¿šä¿£ä¿œä¿‘ä¿Ÿä¿¸å€©åŒä¿³å€¬å€å€®å€­ä¿¾å€œå€Œå€¥å€¨å¾åƒå•åˆåŽå¬å»å‚¥å‚§å‚©å‚ºåƒ–å„†åƒ­åƒ¬åƒ¦åƒ®å„‡å„‹ä»æ°½ä½˜ä½¥ä¿Žé¾ æ±†ç±´å…®å·½é»‰é¦˜å†å¤”å‹¹åŒè¨‡åŒå‡«å¤™å…•äº å…–äº³è¡®è¢¤äºµè„”è£’ç¦€å¬´è ƒç¾¸å†«å†±å†½å†¼ï¿½"
		.split("");
	for (n = 0; n != t[217].length; ++n)
		if (t[217][n].charCodeAt(0) !== 65533) {
			r[t[217][n]] = 55552 + n;
			e[55552 + n] = t[217][n]
		}
	t[218] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å‡‡å†–å†¢å†¥è® ï¿½ï¿½è®§è®ªè®´è®µè®·è¯‚è¯ƒè¯‹è¯è¯Žè¯’è¯“è¯”è¯–è¯˜è¯™è¯œè¯Ÿè¯ è¯¤è¯¨è¯©è¯®è¯°è¯³è¯¶è¯¹è¯¼è¯¿è°€è°‚è°„è°‡è°Œè°è°‘è°’è°”è°•è°–è°™è°›è°˜è°è°Ÿè° è°¡è°¥è°§è°ªè°«è°®è°¯è°²è°³è°µè°¶å©åºé˜é˜¢é˜¡é˜±é˜ªé˜½é˜¼é™‚é™‰é™”é™Ÿé™§é™¬é™²é™´éšˆéšéš—éš°é‚—é‚›é‚é‚™é‚¬é‚¡é‚´é‚³é‚¶é‚ºï¿½"
		.split("");
	for (n = 0; n != t[218].length; ++n)
		if (t[218][n].charCodeAt(0) !== 65533) {
			r[t[218][n]] = 55808 + n;
			e[55808 + n] = t[218][n]
		}
	t[219] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é‚¸é‚°éƒéƒ…é‚¾éƒéƒ„éƒ‡éƒ“éƒ¦éƒ¢éƒœéƒ—éƒ›éƒ«éƒ¯éƒ¾é„„é„¢é„žé„£é„±é„¯é„¹é…ƒé…†åˆå¥‚åŠ¢åŠ¬åŠ­åŠ¾å“¿å‹å‹–å‹°åŸç‡®çŸå»´å‡µå‡¼é¬¯åŽ¶å¼ç•šå·¯åŒåž©åž¡å¡¾å¢¼å£…å£‘åœ©åœ¬åœªåœ³åœ¹åœ®åœ¯åœåœ»å‚å©åž…å«åž†å¼å»å¨å­å¶å³åž­åž¤åžŒåž²åŸåž§åž´åž“åž åŸ•åŸ˜åŸšåŸ™åŸ’åž¸åŸ´åŸ¯åŸ¸åŸ¤åŸï¿½"
		.split("");
	for (n = 0; n != t[219].length; ++n)
		if (t[219][n].charCodeAt(0) !== 65533) {
			r[t[219][n]] = 56064 + n;
			e[56064 + n] = t[219][n]
		}
	t[220] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å ‹å åŸ½åŸ­å €å žå ™å¡„å  å¡¥å¡¬å¢å¢‰å¢šå¢€é¦¨é¼™æ‡¿è‰¹è‰½è‰¿èŠèŠŠèŠ¨èŠ„èŠŽèŠ‘èŠ—èŠ™èŠ«èŠ¸èŠ¾èŠ°è‹ˆè‹Šè‹£èŠ˜èŠ·èŠ®è‹‹è‹Œè‹èŠ©èŠ´èŠ¡èŠªèŠŸè‹„è‹ŽèŠ¤è‹¡èŒ‰è‹·è‹¤èŒèŒ‡è‹œè‹´è‹’è‹˜èŒŒè‹»è‹“èŒ‘èŒšèŒ†èŒ”èŒ•è‹ è‹•èŒœè‘è›èœèŒˆèŽ’èŒ¼èŒ´èŒ±èŽ›èžèŒ¯èè‡èƒèŸè€èŒ—è èŒ­èŒºèŒ³è¦è¥ï¿½"
		.split("");
	for (n = 0; n != t[220].length; ++n)
		if (t[220][n].charCodeAt(0) !== 65533) {
			r[t[220][n]] = 56320 + n;
			e[56320 + n] = t[220][n]
		}
	t[221] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¨èŒ›è©è¬èªè­è®èŽ°è¸èŽ³èŽ´èŽ èŽªèŽ“èŽœèŽ…è¼èŽ¶èŽ©è½èŽ¸è»èŽ˜èŽžèŽ¨èŽºèŽ¼èèè¥è˜å ‡è˜è‹èè½è–èœè¸è‘è†è”èŸèèƒè¸è¹èªè…è€è¦è°è¡è‘œè‘‘è‘šè‘™è‘³è’‡è’ˆè‘ºè’‰è‘¸è¼è‘†è‘©è‘¶è’Œè’Žè±è‘­è“è“è“è“¦è’½è““è“Šè’¿è’ºè“ è’¡è’¹è’´è’—è“¥è“£è”Œç”è”¸è“°è”¹è”Ÿè”ºï¿½"
		.split("");
	for (n = 0; n != t[221].length; ++n)
		if (t[221][n].charCodeAt(0) !== 65533) {
			r[t[221][n]] = 56576 + n;
			e[56576 + n] = t[221][n]
		}
	t[222] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è•–è”»è“¿è“¼è•™è•ˆè•¨è•¤è•žè•ºçž¢è•ƒè•²è•»è–¤è–¨è–‡è–è•¹è–®è–œè–…è–¹è–·è–°è—“è—è—œè—¿è˜§è˜…è˜©è˜–è˜¼å»¾å¼ˆå¤¼å¥è€·å¥•å¥šå¥˜åŒå°¢å°¥å°¬å°´æ‰Œæ‰ªæŠŸæŠ»æ‹Šæ‹šæ‹—æ‹®æŒ¢æ‹¶æŒ¹æ‹æƒæŽ­æ¶æ±æºæŽŽæŽ´æ­æŽ¬æŽŠæ©æŽ®æŽ¼æ²æ¸æ æ¿æ„æžæŽæ‘’æ†æŽ¾æ‘…æ‘æ‹æ›æ æŒæ¦æ¡æ‘žæ’„æ‘­æ’–ï¿½"
		.split("");
	for (n = 0; n != t[222].length; ++n)
		if (t[222][n].charCodeAt(0) !== 65533) {
			r[t[222][n]] = 56832 + n;
			e[56832 + n] = t[222][n]
		}
	t[223] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ‘ºæ’·æ’¸æ’™æ’ºæ“€æ“æ“—æ“¤æ“¢æ”‰æ”¥æ”®å¼‹å¿’ç”™å¼‘åŸå±å½å©å¨å»å’å–å†å‘‹å‘’å‘“å‘”å‘–å‘ƒå¡å‘—å‘™å£å²å’‚å’”å‘·å‘±å‘¤å’šå’›å’„å‘¶å‘¦å’å“å’­å“‚å’´å“’å’§å’¦å““å“”å‘²å’£å“•å’»å’¿å“Œå“™å“šå“œå’©å’ªå’¤å“å“å“žå”›å“§å” å“½å””å“³å”¢å”£å”å”‘å”§å”ªå•§å–å–µå•‰å•­å•å••å”¿å•å”¼ï¿½"
		.split("");
	for (n = 0; n != t[223].length; ++n)
		if (t[223][n].charCodeAt(0) !== 65533) {
			r[t[223][n]] = 57088 + n;
			e[57088 + n] = t[223][n]
		}
	t[224] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å”·å•–å•µå•¶å•·å”³å”°å•œå–‹å—’å–ƒå–±å–¹å–ˆå–å–Ÿå•¾å—–å–‘å•»å—Ÿå–½å–¾å–”å–™å—ªå—·å—‰å˜Ÿå—‘å—«å—¬å—”å—¦å—å—„å—¯å—¥å—²å—³å—Œå—å—¨å—µå—¤è¾”å˜žå˜ˆå˜Œå˜å˜¤å˜£å—¾å˜€å˜§å˜­å™˜å˜¹å™—å˜¬å™å™¢å™™å™œå™Œå™”åš†å™¤å™±å™«å™»å™¼åš…åš“åš¯å›”å›—å›å›¡å›µå›«å›¹å›¿åœ„åœŠåœ‰åœœå¸å¸™å¸”å¸‘å¸±å¸»å¸¼ï¿½"
		.split("");
	for (n = 0; n != t[224].length; ++n)
		if (t[224][n].charCodeAt(0) !== 65533) {
			r[t[224][n]] = 57344 + n;
			e[57344 + n] = t[224][n]
		}
	t[225] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¸·å¹„å¹”å¹›å¹žå¹¡å²Œå±ºå²å²å²–å²ˆå²˜å²™å²‘å²šå²œå²µå²¢å²½å²¬å²«å²±å²£å³å²·å³„å³’å³¤å³‹å³¥å´‚å´ƒå´§å´¦å´®å´¤å´žå´†å´›åµ˜å´¾å´´å´½åµ¬åµ›åµ¯åµåµ«åµ‹åµŠåµ©åµ´å¶‚å¶™å¶è±³å¶·å·…å½³å½·å¾‚å¾‡å¾‰å¾Œå¾•å¾™å¾œå¾¨å¾­å¾µå¾¼è¡¢å½¡çŠ­çŠ°çŠ´çŠ·çŠ¸ç‹ƒç‹ç‹Žç‹ç‹’ç‹¨ç‹¯ç‹©ç‹²ç‹´ç‹·çŒç‹³çŒƒç‹ºï¿½"
		.split("");
	for (n = 0; n != t[225].length; ++n)
		if (t[225][n].charCodeAt(0) !== 65533) {
			r[t[225][n]] = 57600 + n;
			e[57600 + n] = t[225][n]
		}
	t[226] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç‹»çŒ—çŒ“çŒ¡çŒŠçŒžçŒçŒ•çŒ¢çŒ¹çŒ¥çŒ¬çŒ¸çŒ±ççç—ç ç¬ç¯ç¾èˆ›å¤¥é£§å¤¤å¤‚é¥£é¥§é¥¨é¥©é¥ªé¥«é¥¬é¥´é¥·é¥½é¦€é¦„é¦‡é¦Šé¦é¦é¦‘é¦“é¦”é¦•åº€åº‘åº‹åº–åº¥åº åº¹åºµåº¾åº³èµ“å»’å»‘å»›å»¨å»ªè†ºå¿„å¿‰å¿–å¿æ€ƒå¿®æ€„å¿¡å¿¤å¿¾æ€…æ€†å¿ªå¿­å¿¸æ€™æ€µæ€¦æ€›æ€æ€æ€©æ€«æ€Šæ€¿æ€¡æ¸æ¹æ»æºæ‚ï¿½"
		.split("");
	for (n = 0; n != t[226].length; ++n)
		if (t[226][n].charCodeAt(0) !== 65533) {
			r[t[226][n]] = 57856 + n;
			e[57856 + n] = t[226][n]
		}
	t[227] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æªæ½æ‚–æ‚šæ‚­æ‚æ‚ƒæ‚’æ‚Œæ‚›æƒ¬æ‚»æ‚±æƒæƒ˜æƒ†æƒšæ‚´æ„ æ„¦æ„•æ„£æƒ´æ„€æ„Žæ„«æ…Šæ…µæ†¬æ†”æ†§æ†·æ‡”æ‡µå¿éš³é—©é—«é—±é—³é—µé—¶é—¼é—¾é˜ƒé˜„é˜†é˜ˆé˜Šé˜‹é˜Œé˜é˜é˜’é˜•é˜–é˜—é˜™é˜šä¸¬çˆ¿æˆ•æ°µæ±”æ±œæ±Šæ²£æ²…æ²æ²”æ²Œæ±¨æ±©æ±´æ±¶æ²†æ²©æ³æ³”æ²­æ³·æ³¸æ³±æ³—æ²²æ³ æ³–æ³ºæ³«æ³®æ²±æ³“æ³¯æ³¾ï¿½"
		.split("");
	for (n = 0; n != t[227].length; ++n)
		if (t[227][n].charCodeAt(0) !== 65533) {
			r[t[227][n]] = 58112 + n;
			e[58112 + n] = t[227][n]
		}
	t[228] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ´¹æ´§æ´Œæµƒæµˆæ´‡æ´„æ´™æ´Žæ´«æµæ´®æ´µæ´šæµæµ’æµ”æ´³æ¶‘æµ¯æ¶žæ¶ æµžæ¶“æ¶”æµœæµ æµ¼æµ£æ¸šæ·‡æ·…æ·žæ¸Žæ¶¿æ· æ¸‘æ·¦æ·æ·™æ¸–æ¶«æ¸Œæ¶®æ¸«æ¹®æ¹Žæ¹«æº²æ¹Ÿæº†æ¹“æ¹”æ¸²æ¸¥æ¹„æ»Ÿæº±æº˜æ» æ¼­æ»¢æº¥æº§æº½æº»æº·æ»—æº´æ»æºæ»‚æºŸæ½¢æ½†æ½‡æ¼¤æ¼•æ»¹æ¼¯æ¼¶æ½‹æ½´æ¼ªæ¼‰æ¼©æ¾‰æ¾æ¾Œæ½¸æ½²æ½¼æ½ºæ¿‘ï¿½"
		.split("");
	for (n = 0; n != t[228].length; ++n)
		if (t[228][n].charCodeAt(0) !== 65533) {
			r[t[228][n]] = 58368 + n;
			e[58368 + n] = t[228][n]
		}
	t[229] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¿‰æ¾§æ¾¹æ¾¶æ¿‚æ¿¡æ¿®æ¿žæ¿ æ¿¯ç€šç€£ç€›ç€¹ç€µççžå®€å®„å®•å®“å®¥å®¸ç”¯éªžæ´å¯¤å¯®è¤°å¯°è¹‡è¬‡è¾¶è¿“è¿•è¿¥è¿®è¿¤è¿©è¿¦è¿³è¿¨é€…é€„é€‹é€¦é€‘é€é€–é€¡é€µé€¶é€­é€¯é„é‘é’éé¨é˜é¢é›æš¹é´é½é‚‚é‚ˆé‚ƒé‚‹å½å½—å½–å½˜å°»å’«å±å±™å­±å±£å±¦ç¾¼å¼ªå¼©å¼­è‰´å¼¼é¬»å±®å¦å¦ƒå¦å¦©å¦ªå¦£ï¿½"
		.split("");
	for (n = 0; n != t[229].length; ++n)
		if (t[229][n].charCodeAt(0) !== 65533) {
			r[t[229][n]] = 58624 + n;
			e[58624 + n] = t[229][n]
		}
	t[230] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½å¦—å§Šå¦«å¦žå¦¤å§’å¦²å¦¯å§—å¦¾å¨…å¨†å§å¨ˆå§£å§˜å§¹å¨Œå¨‰å¨²å¨´å¨‘å¨£å¨“å©€å©§å©Šå©•å¨¼å©¢å©µèƒ¬åªªåª›å©·å©ºåª¾å««åª²å«’å«”åª¸å« å«£å«±å«–å«¦å«˜å«œå¬‰å¬—å¬–å¬²å¬·å­€å°•å°œå­šå­¥å­³å­‘å­“å­¢é©µé©·é©¸é©ºé©¿é©½éª€éªéª…éªˆéªŠéªéª’éª“éª–éª˜éª›éªœéªéªŸéª éª¢éª£éª¥éª§çºŸçº¡çº£çº¥çº¨çº©ï¿½"
		.split("");
	for (n = 0; n != t[230].length; ++n)
		if (t[230][n].charCodeAt(0) !== 65533) {
			r[t[230][n]] = 58880 + n;
			e[58880 + n] = t[230][n]
		}
	t[231] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½çº­çº°çº¾ç»€ç»ç»‚ç»‰ç»‹ç»Œç»ç»”ç»—ç»›ç» ç»¡ç»¨ç»«ç»®ç»¯ç»±ç»²ç¼ç»¶ç»ºç»»ç»¾ç¼ç¼‚ç¼ƒç¼‡ç¼ˆç¼‹ç¼Œç¼ç¼‘ç¼’ç¼—ç¼™ç¼œç¼›ç¼Ÿç¼¡ç¼¢ç¼£ç¼¤ç¼¥ç¼¦ç¼§ç¼ªç¼«ç¼¬ç¼­ç¼¯ç¼°ç¼±ç¼²ç¼³ç¼µå¹ºç•¿å·›ç”¾é‚•çŽŽçŽ‘çŽ®çŽ¢çŽŸçç‚ç‘çŽ·çŽ³ç€ç‰çˆç¥ç™é¡¼çŠç©ç§çžçŽºç²ççªç‘›ç¦ç¥ç¨ç°ç®ç¬ï¿½"
		.split("");
	for (n = 0; n != t[231].length; ++n)
		if (t[231][n].charCodeAt(0) !== 65533) {
			r[t[231][n]] = 59136 + n;
			e[59136 + n] = t[231][n]
		}
	t[232] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç›çšç‘ç‘œç‘—ç‘•ç‘™ç‘·ç‘­ç‘¾ç’œç’Žç’€ç’ç’‡ç’‹ç’žç’¨ç’©ç’ç’§ç“’ç’ºéŸªéŸ«éŸ¬æŒæ“æžæˆæ©æž¥æž‡æªæ³æž˜æž§æµæž¨æžžæž­æž‹æ·æ¼æŸ°æ ‰æŸ˜æ ŠæŸ©æž°æ ŒæŸ™æžµæŸšæž³æŸæ €æŸƒæž¸æŸ¢æ ŽæŸæŸ½æ ²æ ³æ¡ æ¡¡æ¡Žæ¡¢æ¡„æ¡¤æ¢ƒæ æ¡•æ¡¦æ¡æ¡§æ¡€æ ¾æ¡Šæ¡‰æ ©æ¢µæ¢æ¡´æ¡·æ¢“æ¡«æ£‚æ¥®æ£¼æ¤Ÿæ¤ æ£¹ï¿½"
		.split("");
	for (n = 0; n != t[232].length; ++n)
		if (t[232][n].charCodeAt(0) !== 65533) {
			r[t[232][n]] = 59392 + n;
			e[59392 + n] = t[232][n]
		}
	t[233] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¤¤æ£°æ¤‹æ¤æ¥—æ££æ¤æ¥±æ¤¹æ¥ æ¥‚æ¥æ¦„æ¥«æ¦€æ¦˜æ¥¸æ¤´æ§Œæ¦‡æ¦ˆæ§Žæ¦‰æ¥¦æ¥£æ¥¹æ¦›æ¦§æ¦»æ¦«æ¦­æ§”æ¦±æ§æ§Šæ§Ÿæ¦•æ§ æ¦æ§¿æ¨¯æ§­æ¨—æ¨˜æ©¥æ§²æ©„æ¨¾æª æ©æ©›æ¨µæªŽæ©¹æ¨½æ¨¨æ©˜æ©¼æª‘æªæª©æª—æª«çŒ·ç’æ®æ®‚æ®‡æ®„æ®’æ®“æ®æ®šæ®›æ®¡æ®ªè½«è½­è½±è½²è½³è½µè½¶è½¸è½·è½¹è½ºè½¼è½¾è¾è¾‚è¾„è¾‡è¾‹ï¿½"
		.split("");
	for (n = 0; n != t[233].length; ++n)
		if (t[233][n].charCodeAt(0) !== 65533) {
			r[t[233][n]] = 59648 + n;
			e[59648 + n] = t[233][n]
		}
	t[234] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è¾è¾Žè¾è¾˜è¾šè»Žæˆ‹æˆ—æˆ›æˆŸæˆ¢æˆ¡æˆ¥æˆ¤æˆ¬è‡§ç“¯ç“´ç“¿ç”ç”‘ç”“æ”´æ—®æ—¯æ—°æ˜Šæ˜™æ²æ˜ƒæ˜•æ˜€ç‚…æ›·æ˜æ˜´æ˜±æ˜¶æ˜µè€†æ™Ÿæ™”æ™æ™æ™–æ™¡æ™—æ™·æš„æšŒæš§æšæš¾æ››æ›œæ›¦æ›©è´²è´³è´¶è´»è´½èµ€èµ…èµ†èµˆèµ‰èµ‡èµèµ•èµ™è§‡è§Šè§‹è§Œè§Žè§è§è§‘ç‰®çŠŸç‰ç‰¦ç‰¯ç‰¾ç‰¿çŠ„çŠ‹çŠçŠçŠ’æŒˆæŒ²æŽ°ï¿½"
		.split("");
	for (n = 0; n != t[234].length; ++n)
		if (t[234][n].charCodeAt(0) !== 65533) {
			r[t[234][n]] = 59904 + n;
			e[59904 + n] = t[234][n]
		}
	t[235] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ¿æ“˜è€„æ¯ªæ¯³æ¯½æ¯µæ¯¹æ°…æ°‡æ°†æ°æ°•æ°˜æ°™æ°šæ°¡æ°©æ°¤æ°ªæ°²æ”µæ••æ•«ç‰ç‰’ç‰–çˆ°è™¢åˆ–è‚Ÿè‚œè‚“è‚¼æœŠè‚½è‚±è‚«è‚­è‚´è‚·èƒ§èƒ¨èƒ©èƒªèƒ›èƒ‚èƒ„èƒ™èƒèƒ—æœèƒèƒ«èƒ±èƒ´èƒ­è„è„Žèƒ²èƒ¼æœ•è„’è±šè„¶è„žè„¬è„˜è„²è…ˆè…Œè…“è…´è…™è…šè…±è… è…©è…¼è…½è…­è…§å¡åªµè†ˆè†‚è†‘æ»•è†£è†ªè‡Œæœ¦è‡Šè†»ï¿½"
		.split("");
	for (n = 0; n != t[235].length; ++n)
		if (t[235][n].charCodeAt(0) !== 65533) {
			r[t[235][n]] = 60160 + n;
			e[60160 + n] = t[235][n]
		}
	t[236] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è‡è†¦æ¬¤æ¬·æ¬¹æ­ƒæ­†æ­™é£‘é£’é£“é£•é£™é£šæ®³å½€æ¯‚è§³æ–é½‘æ–“æ–¼æ—†æ—„æ—ƒæ—Œæ—Žæ—’æ—–ç‚€ç‚œç‚–ç‚ç‚»çƒ€ç‚·ç‚«ç‚±çƒ¨çƒŠç„ç„“ç„–ç„¯ç„±ç…³ç…œç…¨ç……ç…²ç…Šç…¸ç…ºç†˜ç†³ç†µç†¨ç† ç‡ ç‡”ç‡§ç‡¹çˆçˆ¨ç¬ç„˜ç…¦ç†¹æˆ¾æˆ½æ‰ƒæ‰ˆæ‰‰ç¤»ç¥€ç¥†ç¥‰ç¥›ç¥œç¥“ç¥šç¥¢ç¥—ç¥ ç¥¯ç¥§ç¥ºç¦…ç¦Šç¦šç¦§ç¦³å¿‘å¿ï¿½"
		.split("");
	for (n = 0; n != t[236].length; ++n)
		if (t[236][n].charCodeAt(0) !== 65533) {
			r[t[236][n]] = 60416 + n;
			e[60416 + n] = t[236][n]
		}
	t[237] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½æ€¼ææšæ§ææ™æ£æ‚«æ„†æ„æ…æ†©æ†æ‡‹æ‡‘æˆ†è‚€è¿æ²“æ³¶æ·¼çŸ¶çŸ¸ç €ç ‰ç —ç ˜ç ‘æ–«ç ­ç œç ç ¹ç ºç »ç Ÿç ¼ç ¥ç ¬ç £ç ©ç¡Žç¡­ç¡–ç¡—ç ¦ç¡ç¡‡ç¡Œç¡ªç¢›ç¢“ç¢šç¢‡ç¢œç¢¡ç¢£ç¢²ç¢¹ç¢¥ç£”ç£™ç£‰ç£¬ç£²ç¤…ç£´ç¤“ç¤¤ç¤žç¤´é¾›é»¹é»»é»¼ç›±çœ„çœç›¹çœ‡çœˆçœšçœ¢çœ™çœ­çœ¦çœµçœ¸çç‘ç‡çƒçšç¨ï¿½"
		.split("");
	for (n = 0; n != t[237].length; ++n)
		if (t[237][n].charCodeAt(0) !== 65533) {
			r[t[237][n]] = 60672 + n;
			e[60672 + n] = t[237][n]
		}
	t[238] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¢ç¥ç¿çžç½çž€çžŒçž‘çžŸçž çž°çžµçž½ç”ºç•€ç•Žç•‹ç•ˆç•›ç•²ç•¹ç–ƒç½˜ç½¡ç½Ÿè©ˆç½¨ç½´ç½±ç½¹ç¾ç½¾ç›ç›¥è ²é’…é’†é’‡é’‹é’Šé’Œé’é’é’é’”é’—é’•é’šé’›é’œé’£é’¤é’«é’ªé’­é’¬é’¯é’°é’²é’´é’¶é’·é’¸é’¹é’ºé’¼é’½é’¿é“„é“ˆé“‰é“Šé“‹é“Œé“é“Žé“é“‘é“’é“•é“–é“—é“™é“˜é“›é“žé“Ÿé“ é“¢é“¤é“¥é“§é“¨é“ªï¿½"
		.split("");
	for (n = 0; n != t[238].length; ++n)
		if (t[238][n].charCodeAt(0) !== 65533) {
			r[t[238][n]] = 60928 + n;
			e[60928 + n] = t[238][n]
		}
	t[239] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é“©é“«é“®é“¯é“³é“´é“µé“·é“¹é“¼é“½é“¿é”ƒé”‚é”†é”‡é”‰é”Šé”é”Žé”é”’é”“é””é”•é”–é”˜é”›é”é”žé”Ÿé”¢é”ªé”«é”©é”¬é”±é”²é”´é”¶é”·é”¸é”¼é”¾é”¿é•‚é”µé•„é•…é•†é•‰é•Œé•Žé•é•’é•“é•”é•–é•—é•˜é•™é•›é•žé•Ÿé•é•¡é•¢é•¤é•¥é•¦é•§é•¨é•©é•ªé•«é•¬é•¯é•±é•²é•³é”ºçŸ§çŸ¬é›‰ç§•ç§­ç§£ç§«ç¨†åµ‡ç¨ƒç¨‚ç¨žç¨”ï¿½"
		.split("");
	for (n = 0; n != t[239].length; ++n)
		if (t[239][n].charCodeAt(0) !== 65533) {
			r[t[239][n]] = 61184 + n;
			e[61184 + n] = t[239][n]
		}
	t[240] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç¨¹ç¨·ç©‘é»é¦¥ç©°çšˆçšŽçš“çš™çš¤ç“žç“ ç”¬é¸ é¸¢é¸¨é¸©é¸ªé¸«é¸¬é¸²é¸±é¸¶é¸¸é¸·é¸¹é¸ºé¸¾é¹é¹‚é¹„é¹†é¹‡é¹ˆé¹‰é¹‹é¹Œé¹Žé¹‘é¹•é¹—é¹šé¹›é¹œé¹žé¹£é¹¦é¹§é¹¨é¹©é¹ªé¹«é¹¬é¹±é¹­é¹³ç–’ç–”ç––ç– ç–ç–¬ç–£ç–³ç–´ç–¸ç—„ç–±ç–°ç—ƒç—‚ç—–ç—ç—£ç—¨ç—¦ç—¤ç—«ç—§ç˜ƒç—±ç—¼ç—¿ç˜ç˜€ç˜…ç˜Œç˜—ç˜Šç˜¥ç˜˜ç˜•ç˜™ï¿½"
		.split("");
	for (n = 0; n != t[240].length; ++n)
		if (t[240][n].charCodeAt(0) !== 65533) {
			r[t[240][n]] = 61440 + n;
			e[61440 + n] = t[240][n]
		}
	t[241] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç˜›ç˜¼ç˜¢ç˜ ç™€ç˜­ç˜°ç˜¿ç˜µç™ƒç˜¾ç˜³ç™ç™žç™”ç™œç™–ç™«ç™¯ç¿Šç«¦ç©¸ç©¹çª€çª†çªˆçª•çª¦çª çª¬çª¨çª­çª³è¡¤è¡©è¡²è¡½è¡¿è¢‚è¢¢è£†è¢·è¢¼è£‰è£¢è£Žè££è£¥è£±è¤šè£¼è£¨è£¾è£°è¤¡è¤™è¤“è¤›è¤Šè¤´è¤«è¤¶è¥è¥¦è¥»ç–‹èƒ¥çš²çš´çŸœè€’è€”è€–è€œè€ è€¢è€¥è€¦è€§è€©è€¨è€±è€‹è€µèƒè†èè’è©è±è¦ƒé¡¸é¢€é¢ƒï¿½"
		.split("");
	for (n = 0; n != t[241].length; ++n)
		if (t[241][n].charCodeAt(0) !== 65533) {
			r[t[241][n]] = 61696 + n;
			e[61696 + n] = t[241][n]
		}
	t[242] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é¢‰é¢Œé¢é¢é¢”é¢šé¢›é¢žé¢Ÿé¢¡é¢¢é¢¥é¢¦è™è™”è™¬è™®è™¿è™ºè™¼è™»èš¨èšèš‹èš¬èšèš§èš£èšªèš“èš©èš¶è›„èšµè›Žèš°èšºèš±èš¯è›‰è›èš´è›©è›±è›²è›­è›³è›èœ“è›žè›´è›Ÿè›˜è›‘èœƒèœ‡è›¸èœˆèœŠèœèœ‰èœ£èœ»èœžèœ¥èœ®èœšèœ¾èˆèœ´èœ±èœ©èœ·èœ¿èž‚èœ¢è½è¾è»è è°èŒè®èž‹è“è£è¼è¤è™è¥èž“èž¯èž¨èŸ’ï¿½"
		.split("");
	for (n = 0; n != t[242].length; ++n)
		if (t[242][n].charCodeAt(0) !== 65533) {
			r[t[242][n]] = 61952 + n;
			e[61952 + n] = t[242][n]
		}
	t[243] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½èŸ†èžˆèž…èž­èž—èžƒèž«èŸ¥èž¬èžµèž³èŸ‹èŸ“èž½èŸ‘èŸ€èŸŠèŸ›èŸªèŸ èŸ®è –è “èŸ¾è Šè ›è ¡è ¹è ¼ç¼¶ç½‚ç½„ç½…èˆç«ºç«½ç¬ˆç¬ƒç¬„ç¬•ç¬Šç¬«ç¬ç­‡ç¬¸ç¬ªç¬™ç¬®ç¬±ç¬ ç¬¥ç¬¤ç¬³ç¬¾ç¬žç­˜ç­šç­…ç­µç­Œç­ç­ ç­®ç­»ç­¢ç­²ç­±ç®ç®¦ç®§ç®¸ç®¬ç®ç®¨ç®…ç®ªç®œç®¢ç®«ç®´ç¯‘ç¯ç¯Œç¯ç¯šç¯¥ç¯¦ç¯ªç°Œç¯¾ç¯¼ç°ç°–ç°‹ï¿½"
		.split("");
	for (n = 0; n != t[243].length; ++n)
		if (t[243][n].charCodeAt(0) !== 65533) {
			r[t[243][n]] = 62208 + n;
			e[62208 + n] = t[243][n]
		}
	t[244] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ç°Ÿç°ªç°¦ç°¸ç±ç±€è‡¾èˆèˆ‚èˆ„è‡¬è¡„èˆ¡èˆ¢èˆ£èˆ­èˆ¯èˆ¨èˆ«èˆ¸èˆ»èˆ³èˆ´èˆ¾è‰„è‰‰è‰‹è‰è‰šè‰Ÿè‰¨è¡¾è¢…è¢ˆè£˜è£Ÿè¥žç¾ç¾Ÿç¾§ç¾¯ç¾°ç¾²ç±¼æ•‰ç²‘ç²ç²œç²žç²¢ç²²ç²¼ç²½ç³ç³‡ç³Œç³ç³ˆç³…ç³—ç³¨è‰®æš¨ç¾¿ç¿Žç¿•ç¿¥ç¿¡ç¿¦ç¿©ç¿®ç¿³ç³¸çµ·ç¶¦ç¶®ç¹‡çº›éº¸éº´èµ³è¶„è¶”è¶‘è¶±èµ§èµ­è±‡è±‰é…Šé…é…Žé…é…¤ï¿½"
		.split("");
	for (n = 0; n != t[244].length; ++n)
		if (t[244][n].charCodeAt(0) !== 65533) {
			r[t[244][n]] = 62464 + n;
			e[62464 + n] = t[244][n]
		}
	t[245] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é…¢é…¡é…°é…©é…¯é…½é…¾é…²é…´é…¹é†Œé†…é†é†é†‘é†¢é†£é†ªé†­é†®é†¯é†µé†´é†ºè±•é¹¾è¶¸è·«è¸…è¹™è¹©è¶µè¶¿è¶¼è¶ºè·„è·–è·—è·šè·žè·Žè·è·›è·†è·¬è··è·¸è·£è·¹è·»è·¤è¸‰è·½è¸”è¸è¸Ÿè¸¬è¸®è¸£è¸¯è¸ºè¹€è¸¹è¸µè¸½è¸±è¹‰è¹è¹‚è¹‘è¹’è¹Šè¹°è¹¶è¹¼è¹¯è¹´èº…èºèº”èºèºœèºžè±¸è²‚è²Šè²…è²˜è²”æ–›è§–è§žè§šè§œï¿½"
		.split("");
	for (n = 0; n != t[245].length; ++n)
		if (t[245][n].charCodeAt(0) !== 65533) {
			r[t[245][n]] = 62720 + n;
			e[62720 + n] = t[245][n]
		}
	t[246] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½è§¥è§«è§¯è¨¾è¬¦é“é›©é›³é›¯éœ†éœéœˆéœéœŽéœªéœ­éœ°éœ¾é¾€é¾ƒé¾…é¾†é¾‡é¾ˆé¾‰é¾Šé¾Œé»¾é¼‹é¼éš¹éš¼éš½é›Žé›’çž¿é› éŠŽéŠ®é‹ˆéŒ¾éªéŠéŽé¾é‘«é±¿é²‚é²…é²†é²‡é²ˆç¨£é²‹é²Žé²é²‘é²’é²”é²•é²šé²›é²žé²Ÿé² é²¡é²¢é²£é²¥é²¦é²§é²¨é²©é²«é²­é²®é²°é²±é²²é²³é²´é²µé²¶é²·é²ºé²»é²¼é²½é³„é³…é³†é³‡é³Šé³‹ï¿½"
		.split("");
	for (n = 0; n != t[246].length; ++n)
		if (t[246][n].charCodeAt(0) !== 65533) {
			r[t[246][n]] = 62976 + n;
			e[62976 + n] = t[246][n]
		}
	t[247] =
		"ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½é³Œé³é³Žé³é³é³“é³”é³•é³—é³˜é³™é³œé³é³Ÿé³¢é¼éž…éž‘éž’éž”éž¯éž«éž£éž²éž´éª±éª°éª·é¹˜éª¶éªºéª¼é«é«€é«…é«‚é«‹é«Œé«‘é­…é­ƒé­‡é­‰é­ˆé­é­‘é£¨é¤é¤®é¥•é¥”é«Ÿé«¡é«¦é«¯é««é«»é«­é«¹é¬ˆé¬é¬“é¬Ÿé¬£éº½éº¾ç¸»éº‚éº‡éºˆéº‹éº’é–éºéºŸé»›é»œé»é» é»Ÿé»¢é»©é»§é»¥é»ªé»¯é¼¢é¼¬é¼¯é¼¹é¼·é¼½é¼¾é½„ï¿½"
		.split("");
	for (n = 0; n != t[247].length; ++n)
		if (t[247][n].charCodeAt(0) !== 65533) {
			r[t[247][n]] = 63232 + n;
			e[63232 + n] = t[247][n]
		}
	return {
		enc: r,
		dec: e
	}
}();
cptable[10029] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã„Ä€ÄÃ‰Ä„Ã–ÃœÃ¡Ä…ÄŒÃ¤ÄÄ†Ä‡Ã©Å¹ÅºÄŽÃ­ÄÄ’Ä“Ä–Ã³Ä—Ã´Ã¶ÃµÃºÄšÄ›Ã¼â€ Â°Ä˜Â£Â§â€¢Â¶ÃŸÂ®Â©â„¢Ä™Â¨â‰ Ä£Ä®Ä¯Äªâ‰¤â‰¥Ä«Ä¶âˆ‚âˆ‘Å‚Ä»Ä¼Ä½Ä¾Ä¹ÄºÅ…Å†ÅƒÂ¬âˆšÅ„Å‡âˆ†Â«Â»â€¦ ÅˆÅÃ•Å‘ÅŒâ€“â€”â€œâ€â€˜â€™Ã·â—ŠÅÅ”Å•Å˜â€¹â€ºÅ™Å–Å—Å â€šâ€žÅ¡ÅšÅ›ÃÅ¤Å¥ÃÅ½Å¾ÅªÃ“Ã”Å«Å®ÃšÅ¯Å°Å±Å²Å³ÃÃ½Ä·Å»ÅÅ¼Ä¢Ë‡",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10079] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã„Ã…Ã‡Ã‰Ã‘Ã–ÃœÃ¡Ã Ã¢Ã¤Ã£Ã¥Ã§Ã©Ã¨ÃªÃ«Ã­Ã¬Ã®Ã¯Ã±Ã³Ã²Ã´Ã¶ÃµÃºÃ¹Ã»Ã¼ÃÂ°Â¢Â£Â§â€¢Â¶ÃŸÂ®Â©â„¢Â´Â¨â‰ Ã†Ã˜âˆžÂ±â‰¤â‰¥Â¥Âµâˆ‚âˆ‘âˆÏ€âˆ«ÂªÂºâ„¦Ã¦Ã¸Â¿Â¡Â¬âˆšÆ’â‰ˆâˆ†Â«Â»â€¦ Ã€ÃƒÃ•Å’Å“â€“â€”â€œâ€â€˜â€™Ã·â—ŠÃ¿Å¸â„Â¤ÃÃ°ÃžÃ¾Ã½Â·â€šâ€žâ€°Ã‚ÃŠÃÃ‹ÃˆÃÃŽÃÃŒÃ“Ã”ï¿½Ã’ÃšÃ›Ã™Ä±Ë†ËœÂ¯Ë˜Ë™ËšÂ¸ËË›Ë‡",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
cptable[10081] = function () {
	var e =
		"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ã„Ã…Ã‡Ã‰Ã‘Ã–ÃœÃ¡Ã Ã¢Ã¤Ã£Ã¥Ã§Ã©Ã¨ÃªÃ«Ã­Ã¬Ã®Ã¯Ã±Ã³Ã²Ã´Ã¶ÃµÃºÃ¹Ã»Ã¼â€ Â°Â¢Â£Â§â€¢Â¶ÃŸÂ®Â©â„¢Â´Â¨â‰ Ã†Ã˜âˆžÂ±â‰¤â‰¥Â¥Âµâˆ‚âˆ‘âˆÏ€âˆ«ÂªÂºâ„¦Ã¦Ã¸Â¿Â¡Â¬âˆšÆ’â‰ˆâˆ†Â«Â»â€¦ Ã€ÃƒÃ•Å’Å“â€“â€”â€œâ€â€˜â€™Ã·â—ŠÃ¿Å¸ÄžÄŸÄ°Ä±ÅžÅŸâ€¡Â·â€šâ€žâ€°Ã‚ÃŠÃÃ‹ÃˆÃÃŽÃÃŒÃ“Ã”ï¿½Ã’ÃšÃ›Ã™ï¿½Ë†ËœÂ¯Ë˜Ë™ËšÂ¸ËË›Ë‡",
		r = [],
		t = {};
	for (var n = 0; n != e.length; ++n) {
		if (e.charCodeAt(n) !== 65533) t[e.charAt(n)] = n;
		r[n] = e.charAt(n)
	}
	return {
		enc: t,
		dec: r
	}
}();
if (typeof module !== "undefined" && module.exports && typeof DO_NOT_EXPORT_CODEPAGE === "undefined") module.exports = cptable;
(function (e, r) {
	"use strict";
	if (typeof cptable === "undefined") {
		if (typeof require !== "undefined") {
			var t = cptable;
			if (typeof module !== "undefined" && module.exports && typeof DO_NOT_EXPORT_CODEPAGE === "undefined") module.exports = r(t);
			else e.cptable = r(t)
		} else throw new Error("cptable not found")
	} else cptable = r(cptable)
})(this, function (e) {
	"use strict";
	var r = {
		1200: "utf16le",
		1201: "utf16be",
		12e3: "utf32le",
		12001: "utf32be",
		16969: "utf64le",
		20127: "ascii",
		65e3: "utf7",
		65001: "utf8"
	};
	var t = [874, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1e4];
	var n = [932, 936, 949, 950];
	var a = [65001];
	var i = {};
	var s = {};
	var o = {};
	var l = {};
	var f = function e(r) {
		return String.fromCharCode(r)
	};
	var c = function e(r) {
		return r.charCodeAt(0)
	};
	var u = typeof Buffer !== "undefined";
	var h = function () {};
	if (u) {
		var d = !Buffer.from;
		if (!d) try {
			Buffer.from("foo", "utf8")
		} catch (e) {
			d = true
		}
		h = d ? function (e, r) {
			return r ? new Buffer(e, r) : new Buffer(e)
		} : Buffer.from.bind(Buffer);
		if (!Buffer.allocUnsafe) Buffer.allocUnsafe = function (e) {
			return new Buffer(e)
		};
		var p = 1024,
			v = Buffer.allocUnsafe(p);
		var g = function e(r) {
			var t = Buffer.allocUnsafe(65536);
			for (var n = 0; n < 65536; ++n) t[n] = 0;
			var a = Object.keys(r),
				i = a.length;
			for (var s = 0, o = a[s]; s < i; ++s) {
				if (!(o = a[s])) continue;
				t[o.charCodeAt(0)] = r[o]
			}
			return t
		};
		var m = function r(t) {
			var n = g(e[t].enc);
			return function e(r, t) {
				var e = r.length;
				var a, i = 0,
					s = 0,
					o = 0,
					l = 0;
				if (typeof r === "string") {
					a = Buffer.allocUnsafe(e);
					for (i = 0; i < e; ++i) a[i] = n[r.charCodeAt(i)]
				} else if (Buffer.isBuffer(r)) {
					a = Buffer.allocUnsafe(2 * e);
					s = 0;
					for (i = 0; i < e; ++i) {
						o = r[i];
						if (o < 128) a[s++] = n[o];
						else if (o < 224) {
							a[s++] = n[((o & 31) << 6) + (r[i + 1] & 63)];
							++i
						} else if (o < 240) {
							a[s++] = n[((o & 15) << 12) + ((r[i + 1] & 63) << 6) + (r[i + 2] & 63)];
							i += 2
						} else {
							l = ((o & 7) << 18) + ((r[i + 1] & 63) << 12) + ((r[i + 2] & 63) << 6) + (r[i + 3] & 63);
							i += 3;
							if (l < 65536) a[s++] = n[l];
							else {
								l -= 65536;
								a[s++] = n[55296 + (l >> 10 & 1023)];
								a[s++] = n[56320 + (l & 1023)]
							}
						}
					}
					a = a.slice(0, s)
				} else {
					a = Buffer.allocUnsafe(e);
					for (i = 0; i < e; ++i) a[i] = n[r[i].charCodeAt(0)]
				}
				if (!t || t === "buf") return a;
				if (t !== "arr") return a.toString("binary");
				return [].slice.call(a)
			}
		};
		var b = function r(t) {
			var n = e[t].dec;
			var a = Buffer.allocUnsafe(131072),
				i = 0,
				s = "";
			for (i = 0; i < n.length; ++i) {
				if (!(s = n[i])) continue;
				var o = s.charCodeAt(0);
				a[2 * i] = o & 255;
				a[2 * i + 1] = o >> 8
			}
			return function e(r) {
				var t = r.length,
					n = 0,
					i = 0;
				if (2 * t > p) {
					p = 2 * t;
					v = Buffer.allocUnsafe(p)
				}
				if (Buffer.isBuffer(r)) {
					for (n = 0; n < t; n++) {
						i = 2 * r[n];
						v[2 * n] = a[i];
						v[2 * n + 1] = a[i + 1]
					}
				} else if (typeof r === "string") {
					for (n = 0; n < t; n++) {
						i = 2 * r.charCodeAt(n);
						v[2 * n] = a[i];
						v[2 * n + 1] = a[i + 1]
					}
				} else {
					for (n = 0; n < t; n++) {
						i = 2 * r[n];
						v[2 * n] = a[i];
						v[2 * n + 1] = a[i + 1]
					}
				}
				return v.slice(0, 2 * t).toString("ucs2")
			}
		};
		var C = function r(t) {
			var n = e[t].enc;
			var a = Buffer.allocUnsafe(131072);
			for (var i = 0; i < 131072; ++i) a[i] = 0;
			var s = Object.keys(n);
			for (var o = 0, l = s[o]; o < s.length; ++o) {
				if (!(l = s[o])) continue;
				var f = l.charCodeAt(0);
				a[2 * f] = n[l] & 255;
				a[2 * f + 1] = n[l] >> 8
			}
			return function e(r, t) {
				var n = r.length,
					i = Buffer.allocUnsafe(2 * n),
					s = 0,
					o = 0,
					l = 0,
					f = 0,
					e = 0;
				if (typeof r === "string") {
					for (s = f = 0; s < n; ++s) {
						o = r.charCodeAt(s) * 2;
						i[f++] = a[o + 1] || a[o];
						if (a[o + 1] > 0) i[f++] = a[o]
					}
					i = i.slice(0, f)
				} else if (Buffer.isBuffer(r)) {
					for (s = f = 0; s < n; ++s) {
						e = r[s];
						if (e < 128) o = e;
						else if (e < 224) {
							o = ((e & 31) << 6) + (r[s + 1] & 63);
							++s
						} else if (e < 240) {
							o = ((e & 15) << 12) + ((r[s + 1] & 63) << 6) + (r[s + 2] & 63);
							s += 2
						} else {
							o = ((e & 7) << 18) + ((r[s + 1] & 63) << 12) + ((r[s + 2] & 63) << 6) + (r[s + 3] & 63);
							s += 3
						}
						if (o < 65536) {
							o *= 2;
							i[f++] = a[o + 1] || a[o];
							if (a[o + 1] > 0) i[f++] = a[o]
						} else {
							l = o - 65536;
							o = 2 * (55296 + (l >> 10 & 1023));
							i[f++] = a[o + 1] || a[o];
							if (a[o + 1] > 0) i[f++] = a[o];
							o = 2 * (56320 + (l & 1023));
							i[f++] = a[o + 1] || a[o];
							if (a[o + 1] > 0) i[f++] = a[o]
						}
					}
					i = i.slice(0, f)
				} else {
					for (s = f = 0; s < n; s++) {
						o = r[s].charCodeAt(0) * 2;
						i[f++] = a[o + 1] || a[o];
						if (a[o + 1] > 0) i[f++] = a[o]
					}
				}
				if (!t || t === "buf") return i;
				if (t !== "arr") return i.toString("binary");
				return [].slice.call(i)
			}
		};
		var E = function r(t) {
			var n = e[t].dec;
			var a = Buffer.allocUnsafe(131072),
				i = 0,
				s, o = 0,
				l = 0,
				f = 0;
			for (f = 0; f < 65536; ++f) {
				a[2 * f] = 255;
				a[2 * f + 1] = 253
			}
			for (i = 0; i < n.length; ++i) {
				if (!(s = n[i])) continue;
				o = s.charCodeAt(0);
				l = 2 * i;
				a[l] = o & 255;
				a[l + 1] = o >> 8
			}
			return function e(r) {
				var t = r.length,
					n = Buffer.allocUnsafe(2 * t),
					i = 0,
					s = 0,
					o = 0;
				if (Buffer.isBuffer(r)) {
					for (i = 0; i < t; i++) {
						s = 2 * r[i];
						if (a[s] === 255 && a[s + 1] === 253) {
							s = 2 * ((r[i] << 8) + r[i + 1]);
							++i
						}
						n[o++] = a[s];
						n[o++] = a[s + 1]
					}
				} else if (typeof r === "string") {
					for (i = 0; i < t; i++) {
						s = 2 * r.charCodeAt(i);
						if (a[s] === 255 && a[s + 1] === 253) {
							s = 2 * ((r.charCodeAt(i) << 8) + r.charCodeAt(i + 1));
							++i
						}
						n[o++] = a[s];
						n[o++] = a[s + 1]
					}
				} else {
					for (i = 0; i < t; i++) {
						s = 2 * r[i];
						if (a[s] === 255 && a[s + 1] === 253) {
							s = 2 * ((r[i] << 8) + r[i + 1]);
							++i
						}
						n[o++] = a[s];
						n[o++] = a[s + 1]
					}
				}
				return n.slice(0, o).toString("ucs2")
			}
		};
		i[65001] = function e(r) {
			if (typeof r === "string") return e(r.split("").map(c));
			var t = r.length,
				n = 0,
				a = 0;
			if (4 * t > p) {
				p = 4 * t;
				v = Buffer.allocUnsafe(p)
			}
			var i = 0;
			if (t >= 3 && r[0] == 239)
				if (r[1] == 187 && r[2] == 191) i = 3;
			for (var s = 1, o = 0, l = 0; i < t; i += s) {
				s = 1;
				l = r[i];
				if (l < 128) n = l;
				else if (l < 224) {
					n = (l & 31) * 64 + (r[i + 1] & 63);
					s = 2
				} else if (l < 240) {
					n = ((l & 15) << 12) + (r[i + 1] & 63) * 64 + (r[i + 2] & 63);
					s = 3
				} else {
					n = (l & 7) * 262144 + ((r[i + 1] & 63) << 12) + (r[i + 2] & 63) * 64 + (r[i + 3] & 63);
					s = 4
				}
				if (n < 65536) {
					v[o++] = n & 255;
					v[o++] = n >> 8
				} else {
					n -= 65536;
					a = 55296 + (n >> 10 & 1023);
					n = 56320 + (n & 1023);
					v[o++] = a & 255;
					v[o++] = a >>> 8;
					v[o++] = n & 255;
					v[o++] = n >>> 8 & 255
				}
			}
			return v.slice(0, o).toString("ucs2")
		};
		s[65001] = function e(r, t) {
			if (u && Buffer.isBuffer(r)) {
				if (!t || t === "buf") return r;
				if (t !== "arr") return r.toString("binary");
				return [].slice.call(r)
			}
			var n = r.length,
				a = 0,
				i = 0,
				s = 0;
			var o = typeof r === "string";
			if (4 * n > p) {
				p = 4 * n;
				v = Buffer.allocUnsafe(p)
			}
			for (var l = 0; l < n; ++l) {
				a = o ? r.charCodeAt(l) : r[l].charCodeAt(0);
				if (a <= 127) v[s++] = a;
				else if (a <= 2047) {
					v[s++] = 192 + (a >> 6);
					v[s++] = 128 + (a & 63)
				} else if (a >= 55296 && a <= 57343) {
					a -= 55296;
					++l;
					i = (o ? r.charCodeAt(l) : r[l].charCodeAt(0)) - 56320 + (a << 10);
					v[s++] = 240 + (i >>> 18 & 7);
					v[s++] = 144 + (i >>> 12 & 63);
					v[s++] = 128 + (i >>> 6 & 63);
					v[s++] = 128 + (i & 63)
				} else {
					v[s++] = 224 + (a >> 12);
					v[s++] = 128 + (a >> 6 & 63);
					v[s++] = 128 + (a & 63)
				}
			}
			if (!t || t === "buf") return v.slice(0, s);
			if (t !== "arr") return v.slice(0, s).toString("binary");
			return [].slice.call(v, 0, s)
		}
	}
	var k = function r() {
		if (u) {
			if (o[t[0]]) return;
			var f = 0,
				c = 0;
			for (f = 0; f < t.length; ++f) {
				c = t[f];
				if (e[c]) {
					o[c] = b(c);
					l[c] = m(c)
				}
			}
			for (f = 0; f < n.length; ++f) {
				c = n[f];
				if (e[c]) {
					o[c] = E(c);
					l[c] = C(c)
				}
			}
			for (f = 0; f < a.length; ++f) {
				c = a[f];
				if (i[c]) o[c] = i[c];
				if (s[c]) l[c] = s[c]
			}
		}
	};
	var S = function (e, r) {
		void r;
		return ""
	};
	var w = function e(r) {
		delete o[r];
		delete l[r]
	};
	var A = function e() {
		if (u) {
			if (!o[t[0]]) return;
			t.forEach(w);
			n.forEach(w);
			a.forEach(w)
		}
		T = S;
		y = 0
	};
	var _ = {
		encache: k,
		decache: A,
		sbcs: t,
		dbcs: n
	};
	k();
	var R = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'(),-./:?";
	var T = S,
		y = 0;
	var x = function t(n, a, i) {
		if (n === y && T) {
			return T(a, i)
		}
		if (l[n]) {
			T = l[y = n];
			return T(a, i)
		}
		if (u && Buffer.isBuffer(a)) a = a.toString("utf8");
		var s = a.length;
		var o = u ? Buffer.allocUnsafe(4 * s) : [],
			c = 0,
			d = 0,
			p = 0,
			v = 0;
		var g = e[n],
			m, b = "";
		var C = typeof a === "string";
		if (g && (m = g.enc))
			for (d = 0; d < s; ++d, ++p) {
				c = m[C ? a.charAt(d) : a[d]];
				if (c > 255) {
					o[p] = c >> 8;
					o[++p] = c & 255
				} else o[p] = c & 255
			} else if (b = r[n]) switch (b) {
			case "utf8":
				if (u && C) {
					o = h(a, b);
					p = o.length;
					break
				}
				for (d = 0; d < s; ++d, ++p) {
					c = C ? a.charCodeAt(d) : a[d].charCodeAt(0);
					if (c <= 127) o[p] = c;
					else if (c <= 2047) {
						o[p] = 192 + (c >> 6);
						o[++p] = 128 + (c & 63)
					} else if (c >= 55296 && c <= 57343) {
						c -= 55296;
						v = (C ? a.charCodeAt(++d) : a[++d].charCodeAt(0)) - 56320 + (c << 10);
						o[p] = 240 + (v >>> 18 & 7);
						o[++p] = 144 + (v >>> 12 & 63);
						o[++p] = 128 + (v >>> 6 & 63);
						o[++p] = 128 + (v & 63)
					} else {
						o[p] = 224 + (c >> 12);
						o[++p] = 128 + (c >> 6 & 63);
						o[++p] = 128 + (c & 63)
					}
				}
				break;
			case "ascii":
				if (u && typeof a === "string") {
					o = h(a, b);
					p = o.length;
					break
				}
				for (d = 0; d < s; ++d, ++p) {
					c = C ? a.charCodeAt(d) : a[d].charCodeAt(0);
					if (c <= 127) o[p] = c;
					else throw new Error("bad ascii " + c)
				}
				break;
			case "utf16le":
				if (u && typeof a === "string") {
					o = h(a, b);
					p = o.length;
					break
				}
				for (d = 0; d < s; ++d) {
					c = C ? a.charCodeAt(d) : a[d].charCodeAt(0);
					o[p++] = c & 255;
					o[p++] = c >> 8
				}
				break;
			case "utf16be":
				for (d = 0; d < s; ++d) {
					c = C ? a.charCodeAt(d) : a[d].charCodeAt(0);
					o[p++] = c >> 8;
					o[p++] = c & 255
				}
				break;
			case "utf32le":
				for (d = 0; d < s; ++d) {
					c = C ? a.charCodeAt(d) : a[d].charCodeAt(0);
					if (c >= 55296 && c <= 57343) c = 65536 + (c - 55296 << 10) + (a[++d].charCodeAt(0) - 56320);
					o[p++] = c & 255;
					c >>= 8;
					o[p++] = c & 255;
					c >>= 8;
					o[p++] = c & 255;
					c >>= 8;
					o[p++] = c & 255
				}
				break;
			case "utf32be":
				for (d = 0; d < s; ++d) {
					c = C ? a.charCodeAt(d) : a[d].charCodeAt(0);
					if (c >= 55296 && c <= 57343) c = 65536 + (c - 55296 << 10) + (a[++d].charCodeAt(0) - 56320);
					o[p + 3] = c & 255;
					c >>= 8;
					o[p + 2] = c & 255;
					c >>= 8;
					o[p + 1] = c & 255;
					c >>= 8;
					o[p] = c & 255;
					p += 4
				}
				break;
			case "utf7":
				for (d = 0; d < s; d++) {
					var E = C ? a.charAt(d) : a[d].charAt(0);
					if (E === "+") {
						o[p++] = 43;
						o[p++] = 45;
						continue
					}
					if (B.indexOf(E) > -1) {
						o[p++] = E.charCodeAt(0);
						continue
					}
					var k = t(1201, E);
					o[p++] = 43;
					o[p++] = R.charCodeAt(k[0] >> 2);
					o[p++] = R.charCodeAt(((k[0] & 3) << 4) + ((k[1] || 0) >> 4));
					o[p++] = R.charCodeAt(((k[1] & 15) << 2) + ((k[2] || 0) >> 6));
					o[p++] = 45
				}
				break;
			default:
				throw new Error("Unsupported magic: " + n + " " + r[n])
			} else throw new Error("Unrecognized CP: " + n);
		o = o.slice(0, p);
		if (!u) return i == "str" ? o.map(f).join("") : o;
		if (!i || i === "buf") return o;
		if (i !== "arr") return o.toString("binary");
		return [].slice.call(o)
	};
	var I = function t(n, a) {
		var i;
		if (i = o[n]) return i(a);
		if (typeof a === "string") return t(n, a.split("").map(c));
		var s = a.length,
			l = new Array(s),
			f = "",
			h = 0,
			d = 0,
			p = 1,
			v = 0,
			g = 0;
		var m = e[n],
			b, C = "";
		if (m && (b = m.dec)) {
			for (d = 0; d < s; d += p) {
				p = 2;
				f = b[(a[d] << 8) + a[d + 1]];
				if (!f) {
					p = 1;
					f = b[a[d]]
				}
				if (!f) throw new Error("Unrecognized code: " + a[d] + " " + a[d + p - 1] + " " + d + " " + p + " " + b[a[d]]);
				l[v++] = f
			}
		} else if (C = r[n]) switch (C) {
		case "utf8":
			if (s >= 3 && a[0] == 239)
				if (a[1] == 187 && a[2] == 191) d = 3;
			for (; d < s; d += p) {
				p = 1;
				if (a[d] < 128) h = a[d];
				else if (a[d] < 224) {
					h = (a[d] & 31) * 64 + (a[d + 1] & 63);
					p = 2
				} else if (a[d] < 240) {
					h = ((a[d] & 15) << 12) + (a[d + 1] & 63) * 64 + (a[d + 2] & 63);
					p = 3
				} else {
					h = (a[d] & 7) * 262144 + ((a[d + 1] & 63) << 12) + (a[d + 2] & 63) * 64 + (a[d + 3] & 63);
					p = 4
				}
				if (h < 65536) {
					l[v++] = String.fromCharCode(h)
				} else {
					h -= 65536;
					g = 55296 + (h >> 10 & 1023);
					h = 56320 + (h & 1023);
					l[v++] = String.fromCharCode(g);
					l[v++] = String.fromCharCode(h)
				}
			}
			break;
		case "ascii":
			if (u && Buffer.isBuffer(a)) return a.toString(C);
			for (d = 0; d < s; d++) l[d] = String.fromCharCode(a[d]);
			v = s;
			break;
		case "utf16le":
			if (s >= 2 && a[0] == 255)
				if (a[1] == 254) d = 2;
			if (u && Buffer.isBuffer(a)) return a.toString(C);
			p = 2;
			for (; d + 1 < s; d += p) {
				l[v++] = String.fromCharCode((a[d + 1] << 8) + a[d])
			}
			break;
		case "utf16be":
			if (s >= 2 && a[0] == 254)
				if (a[1] == 255) d = 2;
			p = 2;
			for (; d + 1 < s; d += p) {
				l[v++] = String.fromCharCode((a[d] << 8) + a[d + 1])
			}
			break;
		case "utf32le":
			if (s >= 4 && a[0] == 255)
				if (a[1] == 254 && a[2] === 0 && a[3] === 0) d = 4;
			p = 4;
			for (; d < s; d += p) {
				h = (a[d + 3] << 24) + (a[d + 2] << 16) + (a[d + 1] << 8) + a[d];
				if (h > 65535) {
					h -= 65536;
					l[v++] = String.fromCharCode(55296 + (h >> 10 & 1023));
					l[v++] = String.fromCharCode(56320 + (h & 1023))
				} else l[v++] = String.fromCharCode(h)
			}
			break;
		case "utf32be":
			if (s >= 4 && a[3] == 255)
				if (a[2] == 254 && a[1] === 0 && a[0] === 0) d = 4;
			p = 4;
			for (; d < s; d += p) {
				h = (a[d] << 24) + (a[d + 1] << 16) + (a[d + 2] << 8) + a[d + 3];
				if (h > 65535) {
					h -= 65536;
					l[v++] = String.fromCharCode(55296 + (h >> 10 & 1023));
					l[v++] = String.fromCharCode(56320 + (h & 1023))
				} else l[v++] = String.fromCharCode(h)
			}
			break;
		case "utf7":
			if (s >= 4 && a[0] == 43 && a[1] == 47 && a[2] == 118) {
				if (s >= 5 && a[3] == 56 && a[4] == 45) d = 5;
				else if (a[3] == 56 || a[3] == 57 || a[3] == 43 || a[3] == 47) d = 4
			}
			for (; d < s; d += p) {
				if (a[d] !== 43) {
					p = 1;
					l[v++] = String.fromCharCode(a[d]);
					continue
				}
				p = 1;
				if (a[d + 1] === 45) {
					p = 2;
					l[v++] = "+";
					continue
				}
				while (String.fromCharCode(a[d + p]).match(/[A-Za-z0-9+\/]/)) p++;
				var E = 0;
				if (a[d + p] === 45) {
					++p;
					E = 1
				}
				var k = [];
				var S = "";
				var w = 0,
					A = 0,
					_ = 0;
				var B = 0,
					T = 0,
					y = 0,
					x = 0;
				for (var I = 1; I < p - E;) {
					B = R.indexOf(String.fromCharCode(a[d + I++]));
					T = R.indexOf(String.fromCharCode(a[d + I++]));
					w = B << 2 | T >> 4;
					k.push(w);
					y = R.indexOf(String.fromCharCode(a[d + I++]));
					if (y === -1) break;
					A = (T & 15) << 4 | y >> 2;
					k.push(A);
					x = R.indexOf(String.fromCharCode(a[d + I++]));
					if (x === -1) break;
					_ = (y & 3) << 6 | x;
					if (x < 64) k.push(_)
				}
				S = t(1201, k);
				for (I = 0; I < S.length; ++I) l[v++] = S.charAt(I)
			}
			break;
		default:
			throw new Error("Unsupported magic: " + n + " " + r[n])
		} else throw new Error("Unrecognized CP: " + n);
		return l.slice(0, v).join("")
	};
	var D = function t(n) {
		return !!(e[n] || r[n])
	};
	e.utils = {
		decode: I,
		encode: x,
		hascp: D,
		magic: r,
		cache: _
	};
	return e
});
var XLSX = {};

function make_xlsx_lib(e) {
	e.version = "0.14.3";
	var r = 1200,
		t = 1252;
	if (typeof module !== "undefined" && typeof require !== "undefined") {
		if (typeof cptable === "undefined") {
			if (typeof global !== "undefined") global.cptable = undefined;
			else if (typeof window !== "undefined") window.cptable = undefined
		}
	}
	var n = [874, 932, 936, 949, 950];
	for (var a = 0; a <= 8; ++a) n.push(1250 + a);
	var i = {
		0: 1252,
		1: 65001,
		2: 65001,
		77: 1e4,
		128: 932,
		129: 949,
		130: 1361,
		134: 936,
		136: 950,
		161: 1253,
		162: 1254,
		163: 1258,
		177: 1255,
		178: 1256,
		186: 1257,
		204: 1251,
		222: 874,
		238: 1250,
		255: 1252,
		69: 6969
	};
	var s = function (e) {
		if (n.indexOf(e) == -1) return;
		t = i[0] = e
	};

	function o() {
		s(1252)
	}
	var l = function (e) {
		r = e;
		s(e)
	};

	function f() {
		l(1200);
		o()
	}

	function c(e) {
		var r = [];
		for (var t = 0, n = e.length; t < n; ++t) r[t] = e.charCodeAt(t);
		return r
	}

	function u(e) {
		var r = [];
		for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t) + (e.charCodeAt(2 * t + 1) << 8));
		return r.join("")
	}

	function h(e) {
		var r = [];
		for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8));
		return r.join("")
	}
	var d = function (e) {
		var r = e.charCodeAt(0),
			t = e.charCodeAt(1);
		if (r == 255 && t == 254) return u(e.slice(2));
		if (r == 254 && t == 255) return h(e.slice(2));
		if (r == 65279) return e.slice(1);
		return e
	};
	var p = function e(r) {
		return String.fromCharCode(r)
	};
	if (typeof cptable !== "undefined") {
		l = function (e) {
			r = e
		};
		d = function (e) {
			if (e.charCodeAt(0) === 255 && e.charCodeAt(1) === 254) {
				return cptable.utils.decode(1200, c(e.slice(2)))
			}
			return e
		};
		p = function e(t) {
			if (r === 1200) return String.fromCharCode(t);
			return cptable.utils.decode(r, [t & 255, t >> 8])[0]
		}
	}
	var v = null;
	var g = true;
	var m = function e() {
		var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		return {
			encode: function (e) {
				var t = "";
				var n = 0,
					a = 0,
					i = 0,
					s = 0,
					o = 0,
					l = 0,
					f = 0;
				for (var c = 0; c < e.length;) {
					n = e.charCodeAt(c++);
					s = n >> 2;
					a = e.charCodeAt(c++);
					o = (n & 3) << 4 | a >> 4;
					i = e.charCodeAt(c++);
					l = (a & 15) << 2 | i >> 6;
					f = i & 63;
					if (isNaN(a)) {
						l = f = 64
					} else if (isNaN(i)) {
						f = 64
					}
					t += r.charAt(s) + r.charAt(o) + r.charAt(l) + r.charAt(f)
				}
				return t
			},
			decode: function e(t) {
				var n = "";
				var a = 0,
					i = 0,
					s = 0,
					o = 0,
					l = 0,
					f = 0,
					c = 0;
				t = t.replace(/[^\w\+\/\=]/g, "");
				for (var u = 0; u < t.length;) {
					o = r.indexOf(t.charAt(u++));
					l = r.indexOf(t.charAt(u++));
					a = o << 2 | l >> 4;
					n += String.fromCharCode(a);
					f = r.indexOf(t.charAt(u++));
					i = (l & 15) << 4 | f >> 2;
					if (f !== 64) {
						n += String.fromCharCode(i)
					}
					c = r.indexOf(t.charAt(u++));
					s = (f & 3) << 6 | c;
					if (c !== 64) {
						n += String.fromCharCode(s)
					}
				}
				return n
			}
		}
	}();
	var b = typeof Buffer !== "undefined" && typeof process !== "undefined" && typeof process.versions !== "undefined" && !!process.versions.node;
	var C = function () {};
	if (typeof Buffer !== "undefined") {
		var E = !Buffer.from;
		if (!E) try {
			Buffer.from("foo", "utf8")
		} catch (e) {
			E = true
		}
		C = E ? function (e, r) {
			return r ? new Buffer(e, r) : new Buffer(e)
		} : Buffer.from.bind(Buffer);
		if (!Buffer.alloc) Buffer.alloc = function (e) {
			return new Buffer(e)
		};
		if (!Buffer.allocUnsafe) Buffer.allocUnsafe = function (e) {
			return new Buffer(e)
		}
	}

	function k(e) {
		return b ? Buffer.alloc(e) : new Array(e)
	}

	function S(e) {
		return b ? Buffer.allocUnsafe(e) : new Array(e)
	}
	var w = function e(r) {
		if (b) return C(r, "binary");
		return r.split("").map(function (e) {
			return e.charCodeAt(0) & 255
		})
	};

	function A(e) {
		if (typeof ArrayBuffer === "undefined") return w(e);
		var r = new ArrayBuffer(e.length),
			t = new Uint8Array(r);
		for (var n = 0; n != e.length; ++n) t[n] = e.charCodeAt(n) & 255;
		return r
	}

	function _(e) {
		if (Array.isArray(e)) return e.map(Tp).join("");
		var r = [];
		for (var t = 0; t < e.length; ++t) r[t] = Tp(e[t]);
		return r.join("")
	}

	function R(e) {
		if (typeof Uint8Array === "undefined") throw new Error("Unsupported");
		return new Uint8Array(e)
	}

	function B(e) {
		if (typeof ArrayBuffer == "undefined") throw new Error("Unsupported");
		if (e instanceof ArrayBuffer) return B(new Uint8Array(e));
		var r = new Array(e.length);
		for (var t = 0; t < e.length; ++t) r[t] = e[t];
		return r
	}
	var T = function (e) {
		return [].concat.apply([], e)
	};
	var y = /\u0000/g,
		x = /[\u0001-\u0006]/g;
	var I = {};
	var D = function e(r) {
		r.version = "0.10.2";

		function t(e) {
			var r = "",
				t = e.length - 1;
			while (t >= 0) r += e.charAt(t--);
			return r
		}

		function n(e, r) {
			var t = "";
			while (t.length < r) t += e;
			return t
		}

		function a(e, r) {
			var t = "" + e;
			return t.length >= r ? t : n("0", r - t.length) + t
		}

		function i(e, r) {
			var t = "" + e;
			return t.length >= r ? t : n(" ", r - t.length) + t
		}

		function s(e, r) {
			var t = "" + e;
			return t.length >= r ? t : t + n(" ", r - t.length)
		}

		function o(e, r) {
			var t = "" + Math.round(e);
			return t.length >= r ? t : n("0", r - t.length) + t
		}

		function l(e, r) {
			var t = "" + e;
			return t.length >= r ? t : n("0", r - t.length) + t
		}
		var f = Math.pow(2, 32);

		function c(e, r) {
			if (e > f || e < -f) return o(e, r);
			var t = Math.round(e);
			return l(t, r)
		}

		function u(e, r) {
			r = r || 0;
			return e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 &&
				(e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) |
					32) === 108
		}
		var h = [
			["Sun", "Sunday"],
			["Mon", "Monday"],
			["Tue", "Tuesday"],
			["Wed", "Wednesday"],
			["Thu", "Thursday"],
			["Fri", "Friday"],
			["Sat", "Saturday"]
		];
		var d = [
			["J", "Jan", "January"],
			["F", "Feb", "February"],
			["M", "Mar", "March"],
			["A", "Apr", "April"],
			["M", "May", "May"],
			["J", "Jun", "June"],
			["J", "Jul", "July"],
			["A", "Aug", "August"],
			["S", "Sep", "September"],
			["O", "Oct", "October"],
			["N", "Nov", "November"],
			["D", "Dec", "December"]
		];

		function p(e) {
			e[0] = "General";
			e[1] = "0";
			e[2] = "0.00";
			e[3] = "#,##0";
			e[4] = "#,##0.00";
			e[9] = "0%";
			e[10] = "0.00%";
			e[11] = "0.00E+00";
			e[12] = "# ?/?";
			e[13] = "# ??/??";
			e[14] = "m/d/yy";
			e[15] = "d-mmm-yy";
			e[16] = "d-mmm";
			e[17] = "mmm-yy";
			e[18] = "h:mm AM/PM";
			e[19] = "h:mm:ss AM/PM";
			e[20] = "h:mm";
			e[21] = "h:mm:ss";
			e[22] = "m/d/yy h:mm";
			e[37] = "#,##0 ;(#,##0)";
			e[38] = "#,##0 ;[Red](#,##0)";
			e[39] = "#,##0.00;(#,##0.00)";
			e[40] = "#,##0.00;[Red](#,##0.00)";
			e[45] = "mm:ss";
			e[46] = "[h]:mm:ss";
			e[47] = "mmss.0";
			e[48] = "##0.0E+0";
			e[49] = "@";
			e[56] = '"ä¸Šåˆ/ä¸‹åˆ "hh"æ™‚"mm"åˆ†"ss"ç§’ "';
			e[65535] = "General"
		}
		var v = {};
		p(v);

		function g(e, r, t) {
			var n = e < 0 ? -1 : 1;
			var a = e * n;
			var i = 0,
				s = 1,
				o = 0;
			var l = 1,
				f = 0,
				c = 0;
			var u = Math.floor(a);
			while (f < r) {
				u = Math.floor(a);
				o = u * s + i;
				c = u * f + l;
				if (a - u < 5e-8) break;
				a = 1 / (a - u);
				i = s;
				s = o;
				l = f;
				f = c
			}
			if (c > r) {
				if (f > r) {
					c = l;
					o = i
				} else {
					c = f;
					o = s
				}
			}
			if (!t) return [0, n * o, c];
			var h = Math.floor(n * o / c);
			return [h, n * o - h * c, c]
		}

		function m(e, r, t) {
			if (e > 2958465 || e < 0) return null;
			var n = e | 0,
				a = Math.floor(86400 * (e - n)),
				i = 0;
			var s = [];
			var o = {
				D: n,
				T: a,
				u: 86400 * (e - n) - a,
				y: 0,
				m: 0,
				d: 0,
				H: 0,
				M: 0,
				S: 0,
				q: 0
			};
			if (Math.abs(o.u) < 1e-6) o.u = 0;
			if (r && r.date1904) n += 1462;
			if (o.u > .9999) {
				o.u = 0;
				if (++a == 86400) {
					o.T = a = 0;
					++n;
					++o.D
				}
			}
			if (n === 60) {
				s = t ? [1317, 10, 29] : [1900, 2, 29];
				i = 3
			} else if (n === 0) {
				s = t ? [1317, 8, 29] : [1900, 1, 0];
				i = 6
			} else {
				if (n > 60) --n;
				var l = new Date(1900, 0, 1);
				l.setDate(l.getDate() + n - 1);
				s = [l.getFullYear(), l.getMonth() + 1, l.getDate()];
				i = l.getDay();
				if (n < 60) i = (i + 6) % 7;
				if (t) i = _(l, s)
			}
			o.y = s[0];
			o.m = s[1];
			o.d = s[2];
			o.S = a % 60;
			a = Math.floor(a / 60);
			o.M = a % 60;
			a = Math.floor(a / 60);
			o.H = a;
			o.q = i;
			return o
		}
		r.parse_date_code = m;
		var b = new Date(1899, 11, 31, 0, 0, 0);
		var C = b.getTime();
		var E = new Date(1900, 2, 1, 0, 0, 0);

		function k(e, r) {
			var t = e.getTime();
			if (r) t -= 1461 * 24 * 60 * 60 * 1e3;
			else if (e >= E) t += 24 * 60 * 60 * 1e3;
			return (t - (C + (e.getTimezoneOffset() - b.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3)
		}

		function S(e) {
			return e.toString(10)
		}
		r._general_int = S;
		var w = function e() {
			var r = /\.(\d*[1-9])0+$/,
				t = /\.0*$/,
				n = /\.(\d*[1-9])0+/,
				a = /\.0*[Ee]/,
				i = /(E[+-])(\d)$/;

			function s(e) {
				var r = e < 0 ? 12 : 11;
				var t = f(e.toFixed(12));
				if (t.length <= r) return t;
				t = e.toPrecision(10);
				if (t.length <= r) return t;
				return e.toExponential(5)
			}

			function o(e) {
				var t = e.toFixed(11).replace(r, ".$1");
				if (t.length > (e < 0 ? 12 : 11)) t = e.toPrecision(6);
				return t
			}

			function l(e) {
				for (var r = 0; r != e.length; ++r)
					if ((e.charCodeAt(r) | 32) === 101) return e.replace(n, ".$1").replace(a, "E").replace("e", "E").replace(i, "$10$2");
				return e
			}

			function f(e) {
				return e.indexOf(".") > -1 ? e.replace(t, "").replace(r, ".$1") : e
			}
			return function e(r) {
				var t = Math.floor(Math.log(Math.abs(r)) * Math.LOG10E),
					n;
				if (t >= -4 && t <= -1) n = r.toPrecision(10 + t);
				else if (Math.abs(t) <= 9) n = s(r);
				else if (t === 10) n = r.toFixed(10).substr(0, 12);
				else n = o(r);
				return f(l(n))
			}
		}();
		r._general_num = w;

		function A(e, r) {
			switch (typeof e) {
			case "string":
				return e;
			case "boolean":
				return e ? "TRUE" : "FALSE";
			case "number":
				return (e | 0) === e ? S(e) : w(e);
			case "undefined":
				return "";
			case "object":
				if (e == null) return "";
				if (e instanceof Date) return L(14, k(e, r && r.date1904), r)
			}
			throw new Error("unsupported value in General format: " + e)
		}
		r._general = A;

		function _() {
			return 0
		}

		function R(e, r, t, n) {
			var i = "",
				s = 0,
				o = 0,
				l = t.y,
				f, c = 0;
			switch (e) {
			case 98:
				l = t.y + 543;
			case 121:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = l % 100;
					c = 2;
					break;
				default:
					f = l % 1e4;
					c = 4;
					break
				}
				break;
			case 109:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.m;
					c = r.length;
					break;
				case 3:
					return d[t.m - 1][1];
				case 5:
					return d[t.m - 1][0];
				default:
					return d[t.m - 1][2]
				}
				break;
			case 100:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.d;
					c = r.length;
					break;
				case 3:
					return h[t.q][0];
				default:
					return h[t.q][1]
				}
				break;
			case 104:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = 1 + (t.H + 11) % 12;
					c = r.length;
					break;
				default:
					throw "bad hour format: " + r
				}
				break;
			case 72:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.H;
					c = r.length;
					break;
				default:
					throw "bad hour format: " + r
				}
				break;
			case 77:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.M;
					c = r.length;
					break;
				default:
					throw "bad minute format: " + r
				}
				break;
			case 115:
				if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
				if (t.u === 0 && (r == "s" || r == "ss")) return a(t.S, r.length);
				if (n >= 2) o = n === 3 ? 1e3 : 100;
				else o = n === 1 ? 10 : 1;
				s = Math.round(o * (t.S + t.u));
				if (s >= 60 * o) s = 0;
				if (r === "s") return s === 0 ? "0" : "" + s / o;
				i = a(s, 2 + n);
				if (r === "ss") return i.substr(0, 2);
				return "." + i.substr(2, r.length - 1);
			case 90:
				switch (r) {
				case "[h]":
					;
				case "[hh]":
					f = t.D * 24 + t.H;
					break;
				case "[m]":
					;
				case "[mm]":
					f = (t.D * 24 + t.H) * 60 + t.M;
					break;
				case "[s]":
					;
				case "[ss]":
					f = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
					break;
				default:
					throw "bad abstime format: " + r
				}
				c = r.length === 3 ? 1 : 2;
				break;
			case 101:
				f = l;
				c = 1
			}
			if (c > 0) return a(f, c);
			else return ""
		}

		function B(e) {
			var r = 3;
			if (e.length <= r) return e;
			var t = e.length % r,
				n = e.substr(0, t);
			for (; t != e.length; t += r) n += (n.length > 0 ? "," : "") + e.substr(t, r);
			return n
		}
		var T = function e() {
			var r = /%/g;

			function o(e, t, a) {
				var i = t.replace(r, ""),
					s = t.length - i.length;
				return T(e, i, a * Math.pow(10, 2 * s)) + n("%", s)
			}

			function l(e, r, t) {
				var n = r.length - 1;
				while (r.charCodeAt(n - 1) === 44) --n;
				return T(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)))
			}

			function f(e, r) {
				var t;
				var n = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (r == 0) return "0.0E+0";
					else if (r < 0) return "-" + f(e, -r);
					var a = e.indexOf(".");
					if (a === -1) a = e.indexOf("E");
					var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
					if (i < 0) i += a;
					t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a);
					if (t.indexOf("e") === -1) {
						var s = Math.floor(Math.log(r) * Math.LOG10E);
						if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
						else t += "E+" + (s - i);
						while (t.substr(0, 2) === "0.") {
							t = t.charAt(0) + t.substr(2, a) + "." + t.substr(2 + a);
							t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.")
						}
						t = t.replace(/\+-/, "-")
					}
					t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, r, t, n) {
						return r + t + n.substr(0, (a + i) % a) + "." + n.substr(i) + "E"
					})
				} else t = r.toExponential(n);
				if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
				if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
				return t.replace("e", "E")
			}
			var u = /# (\?+)( ?)\/( ?)(\d+)/;

			function h(e, r, t) {
				var s = parseInt(e[4], 10),
					o = Math.round(r * s),
					l = Math.floor(o / s);
				var f = o - l * s,
					c = s;
				return t + (l === 0 ? "" : "" + l) + " " + (f === 0 ? n(" ", e[1].length + 1 + e[4].length) : i(f, e[1].length) + e[2] + "/" + e[3] +
					a(c, e[4].length))
			}

			function d(e, r, t) {
				return t + (r === 0 ? "" : "" + r) + n(" ", e[1].length + 2 + e[4].length)
			}
			var p = /^#*0*\.([0#]+)/;
			var v = /\).*[0#]/;
			var m = /\(###\) ###\\?-####/;

			function b(e) {
				var r = "",
					t;
				for (var n = 0; n != e.length; ++n) switch (t = e.charCodeAt(n)) {
				case 35:
					break;
				case 63:
					r += " ";
					break;
				case 48:
					r += "0";
					break;
				default:
					r += String.fromCharCode(t)
				}
				return r
			}

			function C(e, r) {
				var t = Math.pow(10, r);
				return "" + Math.round(e * t) / t
			}

			function E(e, r) {
				if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
					return 0
				}
				return Math.round((e - Math.floor(e)) * Math.pow(10, r))
			}

			function k(e, r) {
				if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
					return 1
				}
				return 0
			}

			function S(e) {
				if (e < 2147483647 && e > -2147483648) return "" + (e >= 0 ? e | 0 : e - 1 | 0);
				return "" + Math.floor(e)
			}

			function w(e, r, d) {
				if (e.charCodeAt(0) === 40 && !r.match(v)) {
					var A = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (d >= 0) return w("n", A, d);
					return "(" + w("n", A, -d) + ")"
				}
				if (r.charCodeAt(r.length - 1) === 44) return l(e, r, d);
				if (r.indexOf("%") !== -1) return o(e, r, d);
				if (r.indexOf("E") !== -1) return f(r, d);
				if (r.charCodeAt(0) === 36) return "$" + w(e, r.substr(r.charAt(1) == " " ? 2 : 1), d);
				var _;
				var R, y, x, I = Math.abs(d),
					D = d < 0 ? "-" : "";
				if (r.match(/^00+$/)) return D + c(I, r.length);
				if (r.match(/^[#?]+$/)) {
					_ = c(d, 0);
					if (_ === "0") _ = "";
					return _.length > r.length ? _ : b(r.substr(0, r.length - _.length)) + _
				}
				if (R = r.match(u)) return h(R, I, D);
				if (r.match(/^#+0+$/)) return D + c(I, r.length - r.indexOf("0"));
				if (R = r.match(p)) {
					_ = C(d, R[1].length).replace(/^([^\.]+)$/, "$1." + b(R[1])).replace(/\.$/, "." + b(R[1])).replace(/\.(\d*)$/, function (e, r) {
						return "." + r + n("0", b(R[1]).length - r.length)
					});
					return r.indexOf("0.") !== -1 ? _ : _.replace(/^0\./, ".")
				}
				r = r.replace(/^#+([0.])/, "$1");
				if (R = r.match(/^(0*)\.(#*)$/)) {
					return D + C(I, R[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, R[1].length ? "0." : ".")
				}
				if (R = r.match(/^#{1,3},##0(\.?)$/)) return D + B(c(I, 0));
				if (R = r.match(/^#,##0\.([#0]*0)$/)) {
					return d < 0 ? "-" + w(e, r, -d) : B("" + (Math.floor(d) + k(d, R[1].length))) + "." + a(E(d, R[1].length), R[1].length)
				}
				if (R = r.match(/^#,#*,#0/)) return w(e, r.replace(/^#,#*,/, ""), d);
				if (R = r.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					_ = t(w(e, r.replace(/[\\-]/g, ""), d));
					y = 0;
					return t(t(r.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
						return y < _.length ? _.charAt(y++) : e === "0" ? "0" : ""
					}))
				}
				if (r.match(m)) {
					_ = w(e, "##########", d);
					return "(" + _.substr(0, 3) + ") " + _.substr(3, 3) + "-" + _.substr(6)
				}
				var F = "";
				if (R = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					y = Math.min(R[4].length, 7);
					x = g(I, Math.pow(10, y) - 1, false);
					_ = "" + D;
					F = T("n", R[1], x[1]);
					if (F.charAt(F.length - 1) == " ") F = F.substr(0, F.length - 1) + "0";
					_ += F + R[2] + "/" + R[3];
					F = s(x[2], y);
					if (F.length < R[4].length) F = b(R[4].substr(R[4].length - F.length)) + F;
					_ += F;
					return _
				}
				if (R = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					y = Math.min(Math.max(R[1].length, R[4].length), 7);
					x = g(I, Math.pow(10, y) - 1, true);
					return D + (x[0] || (x[1] ? "" : "0")) + " " + (x[1] ? i(x[1], y) + R[2] + "/" + R[3] + s(x[2], y) : n(" ", 2 * y + 1 + R[2].length +
						R[3].length))
				}
				if (R = r.match(/^[#0?]+$/)) {
					_ = c(d, 0);
					if (r.length <= _.length) return _;
					return b(r.substr(0, r.length - _.length)) + _
				}
				if (R = r.match(/^([#0?]+)\.([#0]+)$/)) {
					_ = "" + d.toFixed(Math.min(R[2].length, 10)).replace(/([^0])0+$/, "$1");
					y = _.indexOf(".");
					var O = r.indexOf(".") - y,
						P = r.length - _.length - O;
					return b(r.substr(0, O) + _ + r.substr(r.length - P))
				}
				if (R = r.match(/^00,000\.([#0]*0)$/)) {
					y = E(d, R[1].length);
					return d < 0 ? "-" + w(e, r, -d) : B(S(d)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(y, R[1].length)
				}
				switch (r) {
				case "###,##0.00":
					return w(e, "#,##0.00", d);
				case "###,###":
					;
				case "##,###":
					;
				case "#,###":
					var N = B(c(I, 0));
					return N !== "0" ? D + N : "";
				case "###,###.00":
					return w(e, "###,##0.00", d).replace(/^0\./, ".");
				case "#,###.00":
					return w(e, "#,##0.00", d).replace(/^0\./, ".");
				default:
					;
				}
				throw new Error("unsupported format |" + r + "|")
			}

			function A(e, r, t) {
				var n = r.length - 1;
				while (r.charCodeAt(n - 1) === 44) --n;
				return T(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)))
			}

			function _(e, t, a) {
				var i = t.replace(r, ""),
					s = t.length - i.length;
				return T(e, i, a * Math.pow(10, 2 * s)) + n("%", s)
			}

			function R(e, r) {
				var t;
				var n = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (r == 0) return "0.0E+0";
					else if (r < 0) return "-" + R(e, -r);
					var a = e.indexOf(".");
					if (a === -1) a = e.indexOf("E");
					var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
					if (i < 0) i += a;
					t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a);
					if (!t.match(/[Ee]/)) {
						var s = Math.floor(Math.log(r) * Math.LOG10E);
						if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
						else t += "E+" + (s - i);
						t = t.replace(/\+-/, "-")
					}
					t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, r, t, n) {
						return r + t + n.substr(0, (a + i) % a) + "." + n.substr(i) + "E"
					})
				} else t = r.toExponential(n);
				if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
				if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
				return t.replace("e", "E")
			}

			function y(e, r, o) {
				if (e.charCodeAt(0) === 40 && !r.match(v)) {
					var l = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (o >= 0) return y("n", l, o);
					return "(" + y("n", l, -o) + ")"
				}
				if (r.charCodeAt(r.length - 1) === 44) return A(e, r, o);
				if (r.indexOf("%") !== -1) return _(e, r, o);
				if (r.indexOf("E") !== -1) return R(r, o);
				if (r.charCodeAt(0) === 36) return "$" + y(e, r.substr(r.charAt(1) == " " ? 2 : 1), o);
				var f;
				var c, h, C, E = Math.abs(o),
					k = o < 0 ? "-" : "";
				if (r.match(/^00+$/)) return k + a(E, r.length);
				if (r.match(/^[#?]+$/)) {
					f = "" + o;
					if (o === 0) f = "";
					return f.length > r.length ? f : b(r.substr(0, r.length - f.length)) + f
				}
				if (c = r.match(u)) return d(c, E, k);
				if (r.match(/^#+0+$/)) return k + a(E, r.length - r.indexOf("0"));
				if (c = r.match(p)) {
					f = ("" + o).replace(/^([^\.]+)$/, "$1." + b(c[1])).replace(/\.$/, "." + b(c[1]));
					f = f.replace(/\.(\d*)$/, function (e, r) {
						return "." + r + n("0", b(c[1]).length - r.length)
					});
					return r.indexOf("0.") !== -1 ? f : f.replace(/^0\./, ".")
				}
				r = r.replace(/^#+([0.])/, "$1");
				if (c = r.match(/^(0*)\.(#*)$/)) {
					return k + ("" + E).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, c[1].length ? "0." : ".")
				}
				if (c = r.match(/^#{1,3},##0(\.?)$/)) return k + B("" + E);
				if (c = r.match(/^#,##0\.([#0]*0)$/)) {
					return o < 0 ? "-" + y(e, r, -o) : B("" + o) + "." + n("0", c[1].length)
				}
				if (c = r.match(/^#,#*,#0/)) return y(e, r.replace(/^#,#*,/, ""), o);
				if (c = r.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					f = t(y(e, r.replace(/[\\-]/g, ""), o));
					h = 0;
					return t(t(r.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
						return h < f.length ? f.charAt(h++) : e === "0" ? "0" : ""
					}))
				}
				if (r.match(m)) {
					f = y(e, "##########", o);
					return "(" + f.substr(0, 3) + ") " + f.substr(3, 3) + "-" + f.substr(6)
				}
				var S = "";
				if (c = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					h = Math.min(c[4].length, 7);
					C = g(E, Math.pow(10, h) - 1, false);
					f = "" + k;
					S = T("n", c[1], C[1]);
					if (S.charAt(S.length - 1) == " ") S = S.substr(0, S.length - 1) + "0";
					f += S + c[2] + "/" + c[3];
					S = s(C[2], h);
					if (S.length < c[4].length) S = b(c[4].substr(c[4].length - S.length)) + S;
					f += S;
					return f
				}
				if (c = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					h = Math.min(Math.max(c[1].length, c[4].length), 7);
					C = g(E, Math.pow(10, h) - 1, true);
					return k + (C[0] || (C[1] ? "" : "0")) + " " + (C[1] ? i(C[1], h) + c[2] + "/" + c[3] + s(C[2], h) : n(" ", 2 * h + 1 + c[2].length +
						c[3].length))
				}
				if (c = r.match(/^[#0?]+$/)) {
					f = "" + o;
					if (r.length <= f.length) return f;
					return b(r.substr(0, r.length - f.length)) + f
				}
				if (c = r.match(/^([#0]+)\.([#0]+)$/)) {
					f = "" + o.toFixed(Math.min(c[2].length, 10)).replace(/([^0])0+$/, "$1");
					h = f.indexOf(".");
					var w = r.indexOf(".") - h,
						x = r.length - f.length - w;
					return b(r.substr(0, w) + f + r.substr(r.length - x))
				}
				if (c = r.match(/^00,000\.([#0]*0)$/)) {
					return o < 0 ? "-" + y(e, r, -o) : B("" + o).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(0, c[1].length)
				}
				switch (r) {
				case "###,###":
					;
				case "##,###":
					;
				case "#,###":
					var I = B("" + E);
					return I !== "0" ? k + I : "";
				default:
					if (r.match(/\.[0#?]*$/)) return y(e, r.slice(0, r.lastIndexOf(".")), o) + b(r.slice(r.lastIndexOf(".")))
				}
				throw new Error("unsupported format |" + r + "|")
			}
			return function e(r, t, n) {
				return (n | 0) === n ? y(r, t, n) : w(r, t, n)
			}
		}();

		function y(e) {
			var r = [];
			var t = false;
			for (var n = 0, a = 0; n < e.length; ++n) switch (e.charCodeAt(n)) {
			case 34:
				t = !t;
				break;
			case 95:
				;
			case 42:
				;
			case 92:
				++n;
				break;
			case 59:
				r[r.length] = e.substr(a, n - a);
				a = n + 1
			}
			r[r.length] = e.substr(a);
			if (t === true) throw new Error("Format |" + e + "| unterminated string ");
			return r
		}
		r._split = y;
		var x = /\[[HhMmSs]*\]/;

		function I(e) {
			var r = 0,
				t = "",
				n = "";
			while (r < e.length) {
				switch (t = e.charAt(r)) {
				case "G":
					if (u(e, r)) r += 6;
					r++;
					break;
				case '"':
					for (; e.charCodeAt(++r) !== 34 && r < e.length;) ++r;
					++r;
					break;
				case "\\":
					r += 2;
					break;
				case "_":
					r += 2;
					break;
				case "@":
					++r;
					break;
				case "B":
					;
				case "b":
					if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return true;
				case "M":
					;
				case "D":
					;
				case "Y":
					;
				case "H":
					;
				case "S":
					;
				case "E":
					;
				case "m":
					;
				case "d":
					;
				case "y":
					;
				case "h":
					;
				case "s":
					;
				case "e":
					;
				case "g":
					return true;
				case "A":
					;
				case "a":
					if (e.substr(r, 3).toUpperCase() === "A/P") return true;
					if (e.substr(r, 5).toUpperCase() === "AM/PM") return true;
					++r;
					break;
				case "[":
					n = t;
					while (e.charAt(r++) !== "]" && r < e.length) n += e.charAt(r);
					if (n.match(x)) return true;
					break;
				case ".":
					;
				case "0":
					;
				case "#":
					while (r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r +
							2)) > -1)) {}
					break;
				case "?":
					while (e.charAt(++r) === t) {}
					break;
				case "*":
					++r;
					if (e.charAt(r) == " " || e.charAt(r) == "*") ++r;
					break;
				case "(":
					;
				case ")":
					++r;
					break;
				case "1":
					;
				case "2":
					;
				case "3":
					;
				case "4":
					;
				case "5":
					;
				case "6":
					;
				case "7":
					;
				case "8":
					;
				case "9":
					while (r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1) {}
					break;
				case " ":
					++r;
					break;
				default:
					++r;
					break
				}
			}
			return false
		}
		r.is_date = I;

		function D(e, r, t, n) {
			var a = [],
				i = "",
				s = 0,
				o = "",
				l = "t",
				f, c, h;
			var d = "H";
			while (s < e.length) {
				switch (o = e.charAt(s)) {
				case "G":
					if (!u(e, s)) throw new Error("unrecognized character " + o + " in " + e);
					a[a.length] = {
						t: "G",
						v: "General"
					};
					s += 7;
					break;
				case '"':
					for (i = "";
						(h = e.charCodeAt(++s)) !== 34 && s < e.length;) i += String.fromCharCode(h);
					a[a.length] = {
						t: "t",
						v: i
					};
					++s;
					break;
				case "\\":
					var p = e.charAt(++s),
						v = p === "(" || p === ")" ? p : "t";
					a[a.length] = {
						t: v,
						v: p
					};
					++s;
					break;
				case "_":
					a[a.length] = {
						t: "t",
						v: " "
					};
					s += 2;
					break;
				case "@":
					a[a.length] = {
						t: "T",
						v: r
					};
					++s;
					break;
				case "B":
					;
				case "b":
					if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
						if (f == null) {
							f = m(r, t, e.charAt(s + 1) === "2");
							if (f == null) return ""
						}
						a[a.length] = {
							t: "X",
							v: e.substr(s, 2)
						};
						l = o;
						s += 2;
						break
					};
				case "M":
					;
				case "D":
					;
				case "Y":
					;
				case "H":
					;
				case "S":
					;
				case "E":
					o = o.toLowerCase();
				case "m":
					;
				case "d":
					;
				case "y":
					;
				case "h":
					;
				case "s":
					;
				case "e":
					;
				case "g":
					if (r < 0) return "";
					if (f == null) {
						f = m(r, t);
						if (f == null) return ""
					}
					i = o;
					while (++s < e.length && e.charAt(s).toLowerCase() === o) i += o;
					if (o === "m" && l.toLowerCase() === "h") o = "M";
					if (o === "h") o = d;
					a[a.length] = {
						t: o,
						v: i
					};
					l = o;
					break;
				case "A":
					;
				case "a":
					var g = {
						t: o,
						v: o
					};
					if (f == null) f = m(r, t);
					if (e.substr(s, 3).toUpperCase() === "A/P") {
						if (f != null) g.v = f.H >= 12 ? "P" : "A";
						g.t = "T";
						d = "h";
						s += 3
					} else if (e.substr(s, 5).toUpperCase() === "AM/PM") {
						if (f != null) g.v = f.H >= 12 ? "PM" : "AM";
						g.t = "T";
						s += 5;
						d = "h"
					} else {
						g.t = "t";
						++s
					}
					if (f == null && g.t === "T") return "";
					a[a.length] = g;
					l = o;
					break;
				case "[":
					i = o;
					while (e.charAt(s++) !== "]" && s < e.length) i += e.charAt(s);
					if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
					if (i.match(x)) {
						if (f == null) {
							f = m(r, t);
							if (f == null) return ""
						}
						a[a.length] = {
							t: "Z",
							v: i.toLowerCase()
						};
						l = i.charAt(1)
					} else if (i.indexOf("$") > -1) {
						i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$";
						if (!I(e)) a[a.length] = {
							t: "t",
							v: i
						}
					}
					break;
				case ".":
					if (f != null) {
						i = o;
						while (++s < e.length && (o = e.charAt(s)) === "0") i += o;
						a[a.length] = {
							t: "s",
							v: i
						};
						break
					};
				case "0":
					;
				case "#":
					i = o;
					while (++s < e.length && "0#?.,E+-%".indexOf(o = e.charAt(s)) > -1 || o == "\\" && e.charAt(s + 1) == "-" && s < e.length - 2 && "0#"
						.indexOf(e.charAt(s + 2)) > -1) i += o;
					a[a.length] = {
						t: "n",
						v: i
					};
					break;
				case "?":
					i = o;
					while (e.charAt(++s) === o) i += o;
					a[a.length] = {
						t: o,
						v: i
					};
					l = o;
					break;
				case "*":
					++s;
					if (e.charAt(s) == " " || e.charAt(s) == "*") ++s;
					break;
				case "(":
					;
				case ")":
					a[a.length] = {
						t: n === 1 ? "t" : o,
						v: o
					};
					++s;
					break;
				case "1":
					;
				case "2":
					;
				case "3":
					;
				case "4":
					;
				case "5":
					;
				case "6":
					;
				case "7":
					;
				case "8":
					;
				case "9":
					i = o;
					while (s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1) i += e.charAt(s);
					a[a.length] = {
						t: "D",
						v: i
					};
					break;
				case " ":
					a[a.length] = {
						t: o,
						v: o
					};
					++s;
					break;
				default:
					if (",$-+/():!^&'~{}<>=â‚¬acfijklopqrtuvwxzP".indexOf(o) === -1) throw new Error("unrecognized character " + o + " in " + e);
					a[a.length] = {
						t: "t",
						v: o
					};
					++s;
					break
				}
			}
			var b = 0,
				C = 0,
				E;
			for (s = a.length - 1, l = "t"; s >= 0; --s) {
				switch (a[s].t) {
				case "h":
					;
				case "H":
					a[s].t = d;
					l = "h";
					if (b < 1) b = 1;
					break;
				case "s":
					if (E = a[s].v.match(/\.0+$/)) C = Math.max(C, E[0].length - 1);
					if (b < 3) b = 3;
				case "d":
					;
				case "y":
					;
				case "M":
					;
				case "e":
					l = a[s].t;
					break;
				case "m":
					if (l === "s") {
						a[s].t = "M";
						if (b < 2) b = 2
					}
					break;
				case "X":
					break;
				case "Z":
					if (b < 1 && a[s].v.match(/[Hh]/)) b = 1;
					if (b < 2 && a[s].v.match(/[Mm]/)) b = 2;
					if (b < 3 && a[s].v.match(/[Ss]/)) b = 3
				}
			}
			switch (b) {
			case 0:
				break;
			case 1:
				if (f.u >= .5) {
					f.u = 0;
					++f.S
				}
				if (f.S >= 60) {
					f.S = 0;
					++f.M
				}
				if (f.M >= 60) {
					f.M = 0;
					++f.H
				}
				break;
			case 2:
				if (f.u >= .5) {
					f.u = 0;
					++f.S
				}
				if (f.S >= 60) {
					f.S = 0;
					++f.M
				}
				break
			}
			var k = "",
				S;
			for (s = 0; s < a.length; ++s) {
				switch (a[s].t) {
				case "t":
					;
				case "T":
					;
				case " ":
					;
				case "D":
					break;
				case "X":
					a[s].v = "";
					a[s].t = ";";
					break;
				case "d":
					;
				case "m":
					;
				case "y":
					;
				case "h":
					;
				case "H":
					;
				case "M":
					;
				case "s":
					;
				case "e":
					;
				case "b":
					;
				case "Z":
					a[s].v = R(a[s].t.charCodeAt(0), a[s].v, f, C);
					a[s].t = "t";
					break;
				case "n":
					;
				case "(":
					;
				case "?":
					S = s + 1;
					while (a[S] != null && ((o = a[S].t) === "?" || o === "D" || (o === " " || o === "t") && a[S + 1] != null && (a[S + 1].t === "?" || a[
							S + 1].t === "t" && a[S + 1].v === "/") || a[s].t === "(" && (o === " " || o === "n" || o === ")") || o === "t" && (a[S].v === "/" ||
							a[S].v === " " && a[S + 1] != null && a[S + 1].t == "?"))) {
						a[s].v += a[S].v;
						a[S] = {
							v: "",
							t: ";"
						};
						++S
					}
					k += a[s].v;
					s = S - 1;
					break;
				case "G":
					a[s].t = "t";
					a[s].v = A(r, t);
					break
				}
			}
			var w = "",
				_, B;
			if (k.length > 0) {
				if (k.charCodeAt(0) == 40) {
					_ = r < 0 && k.charCodeAt(0) === 45 ? -r : r;
					B = T("(", k, _)
				} else {
					_ = r < 0 && n > 1 ? -r : r;
					B = T("n", k, _);
					if (_ < 0 && a[0] && a[0].t == "t") {
						B = B.substr(1);
						a[0].v = "-" + a[0].v
					}
				}
				S = B.length - 1;
				var y = a.length;
				for (s = 0; s < a.length; ++s)
					if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
						y = s;
						break
					}
				var D = a.length;
				if (y === a.length && B.indexOf("E") === -1) {
					for (s = a.length - 1; s >= 0; --s) {
						if (a[s] == null || "n?(".indexOf(a[s].t) === -1) continue;
						if (S >= a[s].v.length - 1) {
							S -= a[s].v.length;
							a[s].v = B.substr(S + 1, a[s].v.length)
						} else if (S < 0) a[s].v = "";
						else {
							a[s].v = B.substr(0, S + 1);
							S = -1
						}
						a[s].t = "t";
						D = s
					}
					if (S >= 0 && D < a.length) a[D].v = B.substr(0, S + 1) + a[D].v
				} else if (y !== a.length && B.indexOf("E") === -1) {
					S = B.indexOf(".") - 1;
					for (s = y; s >= 0; --s) {
						if (a[s] == null || "n?(".indexOf(a[s].t) === -1) continue;
						c = a[s].v.indexOf(".") > -1 && s === y ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1;
						w = a[s].v.substr(c + 1);
						for (; c >= 0; --c) {
							if (S >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#")) w = B.charAt(S--) + w
						}
						a[s].v = w;
						a[s].t = "t";
						D = s
					}
					if (S >= 0 && D < a.length) a[D].v = B.substr(0, S + 1) + a[D].v;
					S = B.indexOf(".") + 1;
					for (s = y; s < a.length; ++s) {
						if (a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== y) continue;
						c = a[s].v.indexOf(".") > -1 && s === y ? a[s].v.indexOf(".") + 1 : 0;
						w = a[s].v.substr(0, c);
						for (; c < a[s].v.length; ++c) {
							if (S < B.length) w += B.charAt(S++)
						}
						a[s].v = w;
						a[s].t = "t";
						D = s
					}
				}
			}
			for (s = 0; s < a.length; ++s)
				if (a[s] != null && "n(?".indexOf(a[s].t) > -1) {
					_ = n > 1 && r < 0 && s > 0 && a[s - 1].v === "-" ? -r : r;
					a[s].v = T(a[s].t, a[s].v, _);
					a[s].t = "t"
				}
			var F = "";
			for (s = 0; s !== a.length; ++s)
				if (a[s] != null) F += a[s].v;
			return F
		}
		r._eval = D;
		var F = /\[[=<>]/;
		var O = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;

		function P(e, r) {
			if (r == null) return false;
			var t = parseFloat(r[2]);
			switch (r[1]) {
			case "=":
				if (e == t) return true;
				break;
			case ">":
				if (e > t) return true;
				break;
			case "<":
				if (e < t) return true;
				break;
			case "<>":
				if (e != t) return true;
				break;
			case ">=":
				if (e >= t) return true;
				break;
			case "<=":
				if (e <= t) return true;
				break
			}
			return false
		}

		function N(e, r) {
			var t = y(e);
			var n = t.length,
				a = t[n - 1].indexOf("@");
			if (n < 4 && a > -1) --n;
			if (t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
			if (typeof r !== "number") return [4, t.length === 4 || a > -1 ? t[t.length - 1] : "@"];
			switch (t.length) {
			case 1:
				t = a > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
				break;
			case 2:
				t = a > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
				break;
			case 3:
				t = a > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
				break;
			case 4:
				break
			}
			var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
			if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [n, i];
			if (t[0].match(F) != null || t[1].match(F) != null) {
				var s = t[0].match(O);
				var o = t[1].match(O);
				return P(r, s) ? [n, t[0]] : P(r, o) ? [n, t[1]] : [n, t[s != null && o != null ? 2 : 1]]
			}
			return [n, i]
		}

		function L(e, r, t) {
			if (t == null) t = {};
			var n = "";
			switch (typeof e) {
			case "string":
				if (e == "m/d/yy" && t.dateNF) n = t.dateNF;
				else n = e;
				break;
			case "number":
				if (e == 14 && t.dateNF) n = t.dateNF;
				else n = (t.table != null ? t.table : v)[e];
				break
			}
			if (u(n, 0)) return A(r, t);
			if (r instanceof Date) r = k(r, t.date1904);
			var a = N(n, r);
			if (u(a[1])) return A(r, t);
			if (r === true) r = "TRUE";
			else if (r === false) r = "FALSE";
			else if (r === "" || r == null) return "";
			return D(a[1], r, t, a[0])
		}

		function M(e, r) {
			if (typeof r != "number") {
				r = +r || -1;
				for (var t = 0; t < 392; ++t) {
					if (v[t] == undefined) {
						if (r < 0) r = t;
						continue
					}
					if (v[t] == e) {
						r = t;
						break
					}
				}
				if (r < 0) r = 391
			}
			v[r] = e;
			return r
		}
		r.load = M;
		r._table = v;
		r.get_table = function e() {
			return v
		};
		r.load_table = function e(r) {
			for (var t = 0; t != 392; ++t)
				if (r[t] !== undefined) M(r[t], t)
		};
		r.init_table = p;
		r.format = L
	};
	D(I);
	var F = {
		"General Number": "General",
		"General Date": I._table[22],
		"Long Date": "dddd, mmmm dd, yyyy",
		"Medium Date": I._table[15],
		"Short Date": I._table[14],
		"Long Time": I._table[19],
		"Medium Time": I._table[18],
		"Short Time": I._table[20],
		Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		Fixed: I._table[2],
		Standard: I._table[4],
		Percent: I._table[10],
		Scientific: I._table[11],
		"Yes/No": '"Yes";"Yes";"No";@',
		"True/False": '"True";"True";"False";@',
		"On/Off": '"Yes";"Yes";"No";@'
	};
	var O = {
		5: '"$"#,##0_);\\("$"#,##0\\)',
		6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
		7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
		8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		23: "General",
		24: "General",
		25: "General",
		26: "General",
		27: "m/d/yy",
		28: "m/d/yy",
		29: "m/d/yy",
		30: "m/d/yy",
		31: "m/d/yy",
		32: "h:mm:ss",
		33: "h:mm:ss",
		34: "h:mm:ss",
		35: "h:mm:ss",
		36: "m/d/yy",
		41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
		42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
		43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
		44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
		50: "m/d/yy",
		51: "m/d/yy",
		52: "m/d/yy",
		53: "m/d/yy",
		54: "m/d/yy",
		55: "m/d/yy",
		56: "m/d/yy",
		57: "m/d/yy",
		58: "m/d/yy",
		59: "0",
		60: "0.00",
		61: "#,##0",
		62: "#,##0.00",
		63: '"$"#,##0_);\\("$"#,##0\\)',
		64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
		65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
		66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		67: "0%",
		68: "0.00%",
		69: "# ?/?",
		70: "# ??/??",
		71: "m/d/yy",
		72: "m/d/yy",
		73: "d-mmm-yy",
		74: "d-mmm",
		75: "mmm-yy",
		76: "h:mm",
		77: "h:mm:ss",
		78: "m/d/yy h:mm",
		79: "mm:ss",
		80: "[h]:mm:ss",
		81: "mmss.0"
	};
	var P = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;

	function N(e) {
		var r = typeof e == "number" ? I._table[e] : e;
		r = r.replace(P, "(\\d+)");
		return new RegExp("^" + r + "$")
	}

	function L(e, r, t) {
		var n = -1,
			a = -1,
			i = -1,
			s = -1,
			o = -1,
			l = -1;
		(r.match(P) || []).forEach(function (e, r) {
			var f = parseInt(t[r + 1], 10);
			switch (e.toLowerCase().charAt(0)) {
			case "y":
				n = f;
				break;
			case "d":
				i = f;
				break;
			case "h":
				s = f;
				break;
			case "s":
				l = f;
				break;
			case "m":
				if (s >= 0) o = f;
				else a = f;
				break
			}
		});
		if (l >= 0 && o == -1 && a >= 0) {
			o = a;
			a = -1
		}
		var f = ("" + (n >= 0 ? n : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i :
			1)).slice(-2);
		if (f.length == 7) f = "0" + f;
		if (f.length == 8) f = "20" + f;
		var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2);
		if (s == -1 && o == -1 && l == -1) return f;
		if (n == -1 && a == -1 && i == -1) return c;
		return f + "T" + c
	}
	var M = true;
	var W;
	(function (e) {
		e(W = {})
	})(function (e) {
		e.version = "1.2.0";

		function r() {
			var e = 0,
				r = new Array(256);
			for (var t = 0; t != 256; ++t) {
				e = t;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
				r[t] = e
			}
			return typeof Int32Array !== "undefined" ? new Int32Array(r) : r
		}
		var t = r();

		function n(e, r) {
			var n = r ^ -1,
				a = e.length - 1;
			for (var i = 0; i < a;) {
				n = n >>> 8 ^ t[(n ^ e.charCodeAt(i++)) & 255];
				n = n >>> 8 ^ t[(n ^ e.charCodeAt(i++)) & 255]
			}
			if (i === a) n = n >>> 8 ^ t[(n ^ e.charCodeAt(i)) & 255];
			return n ^ -1
		}

		function a(e, r) {
			if (e.length > 1e4) return i(e, r);
			var n = r ^ -1,
				a = e.length - 3;
			for (var s = 0; s < a;) {
				n = n >>> 8 ^ t[(n ^ e[s++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[s++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[s++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[s++]) & 255]
			}
			while (s < a + 3) n = n >>> 8 ^ t[(n ^ e[s++]) & 255];
			return n ^ -1
		}

		function i(e, r) {
			var n = r ^ -1,
				a = e.length - 7;
			for (var i = 0; i < a;) {
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
				n = n >>> 8 ^ t[(n ^ e[i++]) & 255]
			}
			while (i < a + 7) n = n >>> 8 ^ t[(n ^ e[i++]) & 255];
			return n ^ -1
		}

		function s(e, r) {
			var n = r ^ -1;
			for (var a = 0, i = e.length, s, o; a < i;) {
				s = e.charCodeAt(a++);
				if (s < 128) {
					n = n >>> 8 ^ t[(n ^ s) & 255]
				} else if (s < 2048) {
					n = n >>> 8 ^ t[(n ^ (192 | s >> 6 & 31)) & 255];
					n = n >>> 8 ^ t[(n ^ (128 | s & 63)) & 255]
				} else if (s >= 55296 && s < 57344) {
					s = (s & 1023) + 64;
					o = e.charCodeAt(a++) & 1023;
					n = n >>> 8 ^ t[(n ^ (240 | s >> 8 & 7)) & 255];
					n = n >>> 8 ^ t[(n ^ (128 | s >> 2 & 63)) & 255];
					n = n >>> 8 ^ t[(n ^ (128 | o >> 6 & 15 | (s & 3) << 4)) & 255];
					n = n >>> 8 ^ t[(n ^ (128 | o & 63)) & 255]
				} else {
					n = n >>> 8 ^ t[(n ^ (224 | s >> 12 & 15)) & 255];
					n = n >>> 8 ^ t[(n ^ (128 | s >> 6 & 63)) & 255];
					n = n >>> 8 ^ t[(n ^ (128 | s & 63)) & 255]
				}
			}
			return n ^ -1
		}
		e.table = t;
		e.bstr = n;
		e.buf = a;
		e.str = s
	});
	var U = function e() {
		var r = {};
		r.version = "1.1.0";

		function t(e, r) {
			var t = e.split("/"),
				n = r.split("/");
			for (var a = 0, i = 0, s = Math.min(t.length, n.length); a < s; ++a) {
				if (i = t[a].length - n[a].length) return i;
				if (t[a] != n[a]) return t[a] < n[a] ? -1 : 1
			}
			return t.length - n.length
		}

		function n(e) {
			if (e.charAt(e.length - 1) == "/") return e.slice(0, -1).indexOf("/") === -1 ? e : n(e.slice(0, -1));
			var r = e.lastIndexOf("/");
			return r === -1 ? e : e.slice(0, r + 1)
		}

		function a(e) {
			if (e.charAt(e.length - 1) == "/") return a(e.slice(0, -1));
			var r = e.lastIndexOf("/");
			return r === -1 ? e : e.slice(r + 1)
		}

		function i(e, r) {
			if (typeof r === "string") r = new Date(r);
			var t = r.getHours();
			t = t << 6 | r.getMinutes();
			t = t << 5 | r.getSeconds() >>> 1;
			e._W(2, t);
			var n = r.getFullYear() - 1980;
			n = n << 4 | r.getMonth() + 1;
			n = n << 5 | r.getDate();
			e._W(2, n)
		}

		function s(e) {
			var r = e._R(2) & 65535;
			var t = e._R(2) & 65535;
			var n = new Date;
			var a = t & 31;
			t >>>= 5;
			var i = t & 15;
			t >>>= 4;
			n.setMilliseconds(0);
			n.setFullYear(t + 1980);
			n.setMonth(i - 1);
			n.setDate(a);
			var s = r & 31;
			r >>>= 5;
			var o = r & 63;
			r >>>= 6;
			n.setHours(r);
			n.setMinutes(o);
			n.setSeconds(s << 1);
			return n
		}

		function o(e) {
			Vr(e, 0);
			var r = {};
			var t = 0;
			while (e.l <= e.length - 4) {
				var n = e._R(2);
				var a = e._R(2),
					i = e.l + a;
				var s = {};
				switch (n) {
				case 21589:
					{
						t = e._R(1);
						if (t & 1) s.mtime = e._R(4);
						if (a > 5) {
							if (t & 2) s.atime = e._R(4);
							if (t & 4) s.ctime = e._R(4)
						}
						if (s.mtime) s.mt = new Date(s.mtime * 1e3)
					}
					break
				}
				e.l = i;
				r[n] = s
			}
			return r
		}
		var l;

		function f() {
			return l || (l = require("fs"))
		}

		function c(e, r) {
			if (e[0] == 80 && e[1] == 75) return Be(e, r);
			if (e.length < 512) throw new Error("CFB file size " + e.length + " < 512");
			var t = 3;
			var n = 512;
			var a = 0;
			var i = 0;
			var s = 0;
			var o = 0;
			var l = 0;
			var f = [];
			var c = e.slice(0, 512);
			Vr(c, 0);
			var v = u(c);
			t = v[0];
			switch (t) {
			case 3:
				n = 512;
				break;
			case 4:
				n = 4096;
				break;
			case 0:
				if (v[1] == 0) return Be(e, r);
			default:
				throw new Error("Major Version: Expected 3 or 4 saw " + t)
			}
			if (n !== 512) {
				c = e.slice(0, n);
				Vr(c, 28)
			}
			var m = e.slice(0, n);
			h(c, t);
			var b = c._R(4, "i");
			if (t === 3 && b !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + b);
			c.l += 4;
			s = c._R(4, "i");
			c.l += 4;
			c.chk("00100000", "Mini Stream Cutoff Size: ");
			o = c._R(4, "i");
			a = c._R(4, "i");
			l = c._R(4, "i");
			i = c._R(4, "i");
			for (var C = -1, k = 0; k < 109; ++k) {
				C = c._R(4, "i");
				if (C < 0) break;
				f[k] = C
			}
			var S = d(e, n);
			g(l, i, S, n, f);
			var w = E(S, s, f, n);
			w[s].name = "!Directory";
			if (a > 0 && o !== L) w[o].name = "!MiniFAT";
			w[f[0]].name = "!FAT";
			w.fat_addrs = f;
			w.ssz = n;
			var _ = {},
				R = [],
				B = [],
				T = [];
			A(s, w, S, R, a, _, B, o);
			p(B, T, R);
			R.shift();
			var y = {
				FileIndex: B,
				FullPaths: T
			};
			if (r && r.raw) y.raw = {
				header: m,
				sectors: S
			};
			return y
		}

		function u(e) {
			if (e[e.l] == 80 && e[e.l + 1] == 75) return [0, 0];
			e.chk(M, "Header Signature: ");
			e.chk(V, "CLSID: ");
			var r = e._R(2, "u");
			return [e._R(2, "u"), r]
		}

		function h(e, r) {
			var t = 9;
			e.l += 2;
			switch (t = e._R(2)) {
			case 9:
				if (r != 3) throw new Error("Sector Shift: Expected 9 saw " + t);
				break;
			case 12:
				if (r != 4) throw new Error("Sector Shift: Expected 12 saw " + t);
				break;
			default:
				throw new Error("Sector Shift: Expected 9 or 12 saw " + t)
			}
			e.chk("0600", "Mini Sector Shift: ");
			e.chk("000000000000", "Reserved: ")
		}

		function d(e, r) {
			var t = Math.ceil(e.length / r) - 1;
			var n = [];
			for (var a = 1; a < t; ++a) n[a - 1] = e.slice(a * r, (a + 1) * r);
			n[t - 1] = e.slice(t * r);
			return n
		}

		function p(e, r, t) {
			var n = 0,
				a = 0,
				i = 0,
				s = 0,
				o = 0,
				l = t.length;
			var f = [],
				c = [];
			for (; n < l; ++n) {
				f[n] = c[n] = n;
				r[n] = t[n]
			}
			for (; o < c.length; ++o) {
				n = c[o];
				a = e[n].L;
				i = e[n].R;
				s = e[n].C;
				if (f[n] === n) {
					if (a !== -1 && f[a] !== a) f[n] = f[a];
					if (i !== -1 && f[i] !== i) f[n] = f[i]
				}
				if (s !== -1) f[s] = n;
				if (a !== -1) {
					f[a] = f[n];
					if (c.lastIndexOf(a) < o) c.push(a)
				}
				if (i !== -1) {
					f[i] = f[n];
					if (c.lastIndexOf(i) < o) c.push(i)
				}
			}
			for (n = 1; n < l; ++n)
				if (f[n] === n) {
					if (i !== -1 && f[i] !== i) f[n] = f[i];
					else if (a !== -1 && f[a] !== a) f[n] = f[a]
				}
			for (n = 1; n < l; ++n) {
				if (e[n].type === 0) continue;
				o = f[n];
				if (o === 0) r[n] = r[0] + "/" + r[n];
				else
					while (o !== 0 && o !== f[o]) {
						r[n] = r[o] + "/" + r[n];
						o = f[o]
					}
				f[n] = 0
			}
			r[0] += "/";
			for (n = 1; n < l; ++n) {
				if (e[n].type !== 2) r[n] += "/"
			}
		}

		function v(e, r, t) {
			var n = e.start,
				a = e.size;
			var i = [];
			var s = n;
			while (t && a > 0 && s >= 0) {
				i.push(r.slice(s * N, s * N + N));
				a -= N;
				s = Or(t, s * 4)
			}
			if (i.length === 0) return Xr(0);
			return T(i).slice(0, e.size)
		}

		function g(e, r, t, n, a) {
			var i = L;
			if (e === L) {
				if (r !== 0) throw new Error("DIFAT chain shorter than expected")
			} else if (e !== -1) {
				var s = t[e],
					o = (n >>> 2) - 1;
				if (!s) return;
				for (var l = 0; l < o; ++l) {
					if ((i = Or(s, l * 4)) === L) break;
					a.push(i)
				}
				g(Or(s, n - 4), r - 1, t, n, a)
			}
		}

		function C(e, r, t, n, a) {
			var i = [],
				s = [];
			if (!a) a = [];
			var o = n - 1,
				l = 0,
				f = 0;
			for (l = r; l >= 0;) {
				a[l] = true;
				i[i.length] = l;
				s.push(e[l]);
				var c = t[Math.floor(l * 4 / n)];
				f = l * 4 & o;
				if (n < 4 + f) throw new Error("FAT boundary crossed: " + l + " 4 " + n);
				if (!e[c]) break;
				l = Or(e[c], f)
			}
			return {
				nodes: i,
				data: fr([s])
			}
		}

		function E(e, r, t, n) {
			var a = e.length,
				i = [];
			var s = [],
				o = [],
				l = [];
			var f = n - 1,
				c = 0,
				u = 0,
				h = 0,
				d = 0;
			for (c = 0; c < a; ++c) {
				o = [];
				h = c + r;
				if (h >= a) h -= a;
				if (s[h]) continue;
				l = [];
				for (u = h; u >= 0;) {
					s[u] = true;
					o[o.length] = u;
					l.push(e[u]);
					var p = t[Math.floor(u * 4 / n)];
					d = u * 4 & f;
					if (n < 4 + d) throw new Error("FAT boundary crossed: " + u + " 4 " + n);
					if (!e[p]) break;
					u = Or(e[p], d)
				}
				i[h] = {
					nodes: o,
					data: fr([l])
				}
			}
			return i
		}

		function A(e, r, t, n, a, i, s, o) {
			var l = 0,
				f = n.length ? 2 : 0;
			var c = r[e].data;
			var u = 0,
				h = 0,
				d;
			for (; u < c.length; u += 128) {
				var p = c.slice(u, u + 128);
				Vr(p, 64);
				h = p._R(2);
				d = ur(p, 0, h - f);
				n.push(d);
				var g = {
					name: d,
					type: p._R(1),
					color: p._R(1),
					L: p._R(4, "i"),
					R: p._R(4, "i"),
					C: p._R(4, "i"),
					clsid: p._R(16),
					state: p._R(4, "i"),
					start: 0,
					size: 0
				};
				var m = p._R(2) + p._R(2) + p._R(2) + p._R(2);
				if (m !== 0) g.ct = _(p, p.l - 8);
				var b = p._R(2) + p._R(2) + p._R(2) + p._R(2);
				if (b !== 0) g.mt = _(p, p.l - 8);
				g.start = p._R(4, "i");
				g.size = p._R(4, "i");
				if (g.size < 0 && g.start < 0) {
					g.size = g.type = 0;
					g.start = L;
					g.name = ""
				}
				if (g.type === 5) {
					l = g.start;
					if (a > 0 && l !== L) r[l].name = "!StreamData"
				} else if (g.size >= 4096) {
					g.storage = "fat";
					if (r[g.start] === undefined) r[g.start] = C(t, g.start, r.fat_addrs, r.ssz);
					r[g.start].name = g.name;
					g.content = r[g.start].data.slice(0, g.size)
				} else {
					g.storage = "minifat";
					if (g.size < 0) g.size = 0;
					else if (l !== L && g.start !== L && r[l]) {
						g.content = v(g, r[l].data, (r[o] || {}).data)
					}
				}
				if (g.content) Vr(g.content, 0);
				i[d] = g;
				s.push(g)
			}
		}

		function _(e, r) {
			return new Date((Fr(e, r + 4) / 1e7 * Math.pow(2, 32) + Fr(e, r) / 1e7 - 11644473600) * 1e3)
		}

		function R(e, r) {
			f();
			return c(l.readFileSync(e), r)
		}

		function B(e, r) {
			switch (r && r.type || "base64") {
			case "file":
				return R(e, r);
			case "base64":
				return c(w(m.decode(e)), r);
			case "binary":
				return c(w(e), r)
			}
			return c(e, r)
		}

		function I(e, r) {
			var t = r || {},
				n = t.root || "Root Entry";
			if (!e.FullPaths) e.FullPaths = [];
			if (!e.FileIndex) e.FileIndex = [];
			if (e.FullPaths.length !== e.FileIndex.length) throw new Error("inconsistent CFB structure");
			if (e.FullPaths.length === 0) {
				e.FullPaths[0] = n + "/";
				e.FileIndex[0] = {
					name: n,
					type: 5
				}
			}
			if (t.CLSID) e.FileIndex[0].clsid = t.CLSID;
			D(e)
		}

		function D(e) {
			var r = "Sh33tJ5";
			if (U.find(e, "/" + r)) return;
			var t = Xr(4);
			t[0] = 55;
			t[1] = t[3] = 50;
			t[2] = 54;
			e.FileIndex.push({
				name: r,
				type: 2,
				content: t,
				size: 4,
				L: 69,
				R: 69,
				C: 69
			});
			e.FullPaths.push(e.FullPaths[0] + r);
			F(e)
		}

		function F(e, r) {
			I(e);
			var i = false,
				s = false;
			for (var o = e.FullPaths.length - 1; o >= 0; --o) {
				var l = e.FileIndex[o];
				switch (l.type) {
				case 0:
					if (s) i = true;
					else {
						e.FileIndex.pop();
						e.FullPaths.pop()
					}
					break;
				case 1:
					;
				case 2:
					;
				case 5:
					s = true;
					if (isNaN(l.R * l.L * l.C)) i = true;
					if (l.R > -1 && l.L > -1 && l.R == l.L) i = true;
					break;
				default:
					i = true;
					break
				}
			}
			if (!i && !r) return;
			var f = new Date(1987, 1, 19),
				c = 0;
			var u = [];
			for (o = 0; o < e.FullPaths.length; ++o) {
				if (e.FileIndex[o].type === 0) continue;
				u.push([e.FullPaths[o], e.FileIndex[o]])
			}
			for (o = 0; o < u.length; ++o) {
				var h = n(u[o][0]);
				s = false;
				for (c = 0; c < u.length; ++c)
					if (u[c][0] === h) s = true;
				if (!s) u.push([h, {
					name: a(h).replace("/", ""),
					type: 1,
					clsid: V,
					ct: f,
					mt: f,
					content: null
				}])
			}
			u.sort(function (e, r) {
				return t(e[0], r[0])
			});
			e.FullPaths = [];
			e.FileIndex = [];
			for (o = 0; o < u.length; ++o) {
				e.FullPaths[o] = u[o][0];
				e.FileIndex[o] = u[o][1]
			}
			for (o = 0; o < u.length; ++o) {
				var d = e.FileIndex[o];
				var p = e.FullPaths[o];
				d.name = a(p).replace("/", "");
				d.L = d.R = d.C = -(d.color = 1);
				d.size = d.content ? d.content.length : 0;
				d.start = 0;
				d.clsid = d.clsid || V;
				if (o === 0) {
					d.C = u.length > 1 ? 1 : -1;
					d.size = 0;
					d.type = 5
				} else if (p.slice(-1) == "/") {
					for (c = o + 1; c < u.length; ++c)
						if (n(e.FullPaths[c]) == p) break;
					d.C = c >= u.length ? -1 : c;
					for (c = o + 1; c < u.length; ++c)
						if (n(e.FullPaths[c]) == n(p)) break;
					d.R = c >= u.length ? -1 : c;
					d.type = 1
				} else {
					if (n(e.FullPaths[o + 1] || "") == n(p)) d.R = o + 1;
					d.type = 2
				}
			}
		}

		function O(e, r) {
			var t = r || {};
			F(e);
			if (t.fileType == "zip") return ye(e, t);
			var n = function (e) {
				var r = 0,
					t = 0;
				for (var n = 0; n < e.FileIndex.length; ++n) {
					var a = e.FileIndex[n];
					if (!a.content) continue;
					var i = a.content.length;
					if (i > 0) {
						if (i < 4096) r += i + 63 >> 6;
						else t += i + 511 >> 9
					}
				}
				var s = e.FullPaths.length + 3 >> 2;
				var o = r + 7 >> 3;
				var l = r + 127 >> 7;
				var f = o + t + s + l;
				var c = f + 127 >> 7;
				var u = c <= 109 ? 0 : Math.ceil((c - 109) / 127);
				while (f + c + u + 127 >> 7 > c) u = ++c <= 109 ? 0 : Math.ceil((c - 109) / 127);
				var h = [1, u, c, l, s, t, r, 0];
				e.FileIndex[0].size = r << 6;
				h[7] = (e.FileIndex[0].start = h[0] + h[1] + h[2] + h[3] + h[4] + h[5]) + (h[6] + 7 >> 3);
				return h
			}(e);
			var a = Xr(n[7] << 9);
			var i = 0,
				s = 0; {
				for (i = 0; i < 8; ++i) a._W(1, H[i]);
				for (i = 0; i < 8; ++i) a._W(2, 0);
				a._W(2, 62);
				a._W(2, 3);
				a._W(2, 65534);
				a._W(2, 9);
				a._W(2, 6);
				for (i = 0; i < 3; ++i) a._W(2, 0);
				a._W(4, 0);
				a._W(4, n[2]);
				a._W(4, n[0] + n[1] + n[2] + n[3] - 1);
				a._W(4, 0);
				a._W(4, 1 << 12);
				a._W(4, n[3] ? n[0] + n[1] + n[2] - 1 : L);
				a._W(4, n[3]);
				a._W(-4, n[1] ? n[0] - 1 : L);
				a._W(4, n[1]);
				for (i = 0; i < 109; ++i) a._W(-4, i < n[2] ? n[1] + i : -1)
			}
			if (n[1]) {
				for (s = 0; s < n[1]; ++s) {
					for (; i < 236 + s * 127; ++i) a._W(-4, i < n[2] ? n[1] + i : -1);
					a._W(-4, s === n[1] - 1 ? L : s + 1)
				}
			}
			var o = function (e) {
				for (s += e; i < s - 1; ++i) a._W(-4, i + 1);
				if (e) {
					++i;
					a._W(-4, L)
				}
			};
			s = i = 0;
			for (s += n[1]; i < s; ++i) a._W(-4, z.DIFSECT);
			for (s += n[2]; i < s; ++i) a._W(-4, z.FATSECT);
			o(n[3]);
			o(n[4]);
			var l = 0,
				f = 0;
			var c = e.FileIndex[0];
			for (; l < e.FileIndex.length; ++l) {
				c = e.FileIndex[l];
				if (!c.content) continue;
				f = c.content.length;
				if (f < 4096) continue;
				c.start = s;
				o(f + 511 >> 9)
			}
			o(n[6] + 7 >> 3);
			while (a.l & 511) a._W(-4, z.ENDOFCHAIN);
			s = i = 0;
			for (l = 0; l < e.FileIndex.length; ++l) {
				c = e.FileIndex[l];
				if (!c.content) continue;
				f = c.content.length;
				if (!f || f >= 4096) continue;
				c.start = s;
				o(f + 63 >> 6)
			}
			while (a.l & 511) a._W(-4, z.ENDOFCHAIN);
			for (i = 0; i < n[4] << 2; ++i) {
				var u = e.FullPaths[i];
				if (!u || u.length === 0) {
					for (l = 0; l < 17; ++l) a._W(4, 0);
					for (l = 0; l < 3; ++l) a._W(4, -1);
					for (l = 0; l < 12; ++l) a._W(4, 0);
					continue
				}
				c = e.FileIndex[i];
				if (i === 0) c.start = c.size ? c.start - 1 : L;
				var h = i === 0 && t.root || c.name;
				f = 2 * (h.length + 1);
				a._W(64, h, "utf16le");
				a._W(2, f);
				a._W(1, c.type);
				a._W(1, c.color);
				a._W(-4, c.L);
				a._W(-4, c.R);
				a._W(-4, c.C);
				if (!c.clsid)
					for (l = 0; l < 4; ++l) a._W(4, 0);
				else a._W(16, c.clsid, "hex");
				a._W(4, c.state || 0);
				a._W(4, 0);
				a._W(4, 0);
				a._W(4, 0);
				a._W(4, 0);
				a._W(4, c.start);
				a._W(4, c.size);
				a._W(4, 0)
			}
			for (i = 1; i < e.FileIndex.length; ++i) {
				c = e.FileIndex[i];
				if (c.size >= 4096) {
					a.l = c.start + 1 << 9;
					for (l = 0; l < c.size; ++l) a._W(1, c.content[l]);
					for (; l & 511; ++l) a._W(1, 0)
				}
			}
			for (i = 1; i < e.FileIndex.length; ++i) {
				c = e.FileIndex[i];
				if (c.size > 0 && c.size < 4096) {
					for (l = 0; l < c.size; ++l) a._W(1, c.content[l]);
					for (; l & 63; ++l) a._W(1, 0)
				}
			}
			while (a.l < a.length) a._W(1, 0);
			return a
		}

		function P(e, r) {
			var t = e.FullPaths.map(function (e) {
				return e.toUpperCase()
			});
			var n = t.map(function (e) {
				var r = e.split("/");
				return r[r.length - (e.slice(-1) == "/" ? 2 : 1)]
			});
			var a = false;
			if (r.charCodeAt(0) === 47) {
				a = true;
				r = t[0].slice(0, -1) + r
			} else a = r.indexOf("/") !== -1;
			var i = r.toUpperCase();
			var s = a === true ? t.indexOf(i) : n.indexOf(i);
			if (s !== -1) return e.FileIndex[s];
			var o = !i.match(x);
			i = i.replace(y, "");
			if (o) i = i.replace(x, "!");
			for (s = 0; s < t.length; ++s) {
				if ((o ? t[s].replace(x, "!") : t[s]).replace(y, "") == i) return e.FileIndex[s];
				if ((o ? n[s].replace(x, "!") : n[s]).replace(y, "") == i) return e.FileIndex[s]
			}
			return null
		}
		var N = 64;
		var L = -2;
		var M = "d0cf11e0a1b11ae1";
		var H = [208, 207, 17, 224, 161, 177, 26, 225];
		var V = "00000000000000000000000000000000";
		var z = {
			MAXREGSECT: -6,
			DIFSECT: -4,
			FATSECT: -3,
			ENDOFCHAIN: L,
			FREESECT: -1,
			HEADER_SIGNATURE: M,
			HEADER_MINOR_VERSION: "3e00",
			MAXREGSID: -6,
			NOSTREAM: -1,
			HEADER_CLSID: V,
			EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
		};

		function X(e, r, t) {
			f();
			var n = O(e, t);
			l.writeFileSync(r, n)
		}

		function G(e) {
			var r = new Array(e.length);
			for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
			return r.join("")
		}

		function j(e, r) {
			var t = O(e, r);
			switch (r && r.type) {
			case "file":
				f();
				l.writeFileSync(r.filename, t);
				return t;
			case "binary":
				return G(t);
			case "base64":
				return m.encode(G(t))
			}
			return t
		}
		var K;

		function Y(e) {
			try {
				var r = e.InflateRaw;
				var t = new r;
				t._processChunk(new Uint8Array([3, 0]), t._finishFlushFlag);
				if (t.bytesRead) K = e;
				else throw new Error("zlib does not expose bytesRead")
			} catch (e) {
				console.error("cannot use native zlib: " + (e.message || e))
			}
		}

		function $(e, r) {
			if (!K) return _e(e, r);
			var t = K.InflateRaw;
			var n = new t;
			var a = n._processChunk(e.slice(e.l), n._finishFlushFlag);
			e.l += n.bytesRead;
			return a
		}

		function Z(e) {
			return K ? K.deflateRawSync(e) : de(e)
		}
		var Q = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
		var J = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
		var q = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289,
			16385, 24577
		];

		function ee(e) {
			var r = (e << 1 | e << 11) & 139536 | (e << 5 | e << 15) & 558144;
			return (r >> 16 | r >> 8 | r) & 255
		}
		var re = typeof Uint8Array !== "undefined";
		var te = re ? new Uint8Array(1 << 8) : [];
		for (var ne = 0; ne < 1 << 8; ++ne) te[ne] = ee(ne);

		function ae(e, r) {
			var t = te[e & 255];
			if (r <= 8) return t >>> 8 - r;
			t = t << 8 | te[e >> 8 & 255];
			if (r <= 16) return t >>> 16 - r;
			t = t << 8 | te[e >> 16 & 255];
			return t >>> 24 - r
		}

		function ie(e, r) {
			var t = r & 7,
				n = r >>> 3;
			return (e[n] | (t <= 6 ? 0 : e[n + 1] << 8)) >>> t & 3
		}

		function se(e, r) {
			var t = r & 7,
				n = r >>> 3;
			return (e[n] | (t <= 5 ? 0 : e[n + 1] << 8)) >>> t & 7
		}

		function oe(e, r) {
			var t = r & 7,
				n = r >>> 3;
			return (e[n] | (t <= 4 ? 0 : e[n + 1] << 8)) >>> t & 15
		}

		function le(e, r) {
			var t = r & 7,
				n = r >>> 3;
			return (e[n] | (t <= 3 ? 0 : e[n + 1] << 8)) >>> t & 31
		}

		function fe(e, r) {
			var t = r & 7,
				n = r >>> 3;
			return (e[n] | (t <= 1 ? 0 : e[n + 1] << 8)) >>> t & 127
		}

		function ce(e, r, t) {
			var n = r & 7,
				a = r >>> 3,
				i = (1 << t) - 1;
			var s = e[a] >>> n;
			if (t < 8 - n) return s & i;
			s |= e[a + 1] << 8 - n;
			if (t < 16 - n) return s & i;
			s |= e[a + 2] << 16 - n;
			if (t < 24 - n) return s & i;
			s |= e[a + 3] << 24 - n;
			return s & i
		}

		function ue(e, r) {
			var t = e.length,
				n = 2 * t > r ? 2 * t : r + 5,
				a = 0;
			if (t >= r) return e;
			if (b) {
				var i = S(n);
				if (e.copy) e.copy(i);
				else
					for (; a < e.length; ++a) i[a] = e[a];
				return i
			} else if (re) {
				var s = new Uint8Array(n);
				if (s.set) s.set(e);
				else
					for (; a < e.length; ++a) s[a] = e[a];
				return s
			}
			e.length = n;
			return e
		}

		function he(e) {
			var r = new Array(e);
			for (var t = 0; t < e; ++t) r[t] = 0;
			return r
		}
		var de = function () {
			var e = function () {
				return function e(r, t) {
					var n = 0;
					while (n < r.length) {
						var a = Math.min(65535, r.length - n);
						var i = n + a == r.length;
						t._W(1, +i);
						t._W(2, a);
						t._W(2, ~a & 65535);
						while (a-- > 0) t[t.l++] = r[n++]
					}
					return t.l
				}
			}();
			return function (r) {
				var t = Xr(50 + Math.floor(r.length * 1.1));
				var n = e(r, t);
				return t.slice(0, n)
			}
		}();

		function pe(e, r, t) {
			var n = 1,
				a = 0,
				i = 0,
				s = 0,
				o = 0,
				l = e.length;
			var f = re ? new Uint16Array(32) : he(32);
			for (i = 0; i < 32; ++i) f[i] = 0;
			for (i = l; i < t; ++i) e[i] = 0;
			l = e.length;
			var c = re ? new Uint16Array(l) : he(l);
			for (i = 0; i < l; ++i) {
				f[a = e[i]]++;
				if (n < a) n = a;
				c[i] = 0
			}
			f[0] = 0;
			for (i = 1; i <= n; ++i) f[i + 16] = o = o + f[i - 1] << 1;
			for (i = 0; i < l; ++i) {
				o = e[i];
				if (o != 0) c[i] = f[o + 16]++
			}
			var u = 0;
			for (i = 0; i < l; ++i) {
				u = e[i];
				if (u != 0) {
					o = ae(c[i], n) >> n - u;
					for (s = (1 << n + 4 - u) - 1; s >= 0; --s) r[o | s << u] = u & 15 | i << 4
				}
			}
			return n
		}
		var ve = re ? new Uint16Array(512) : he(512);
		var ge = re ? new Uint16Array(32) : he(32);
		if (!re) {
			for (var me = 0; me < 512; ++me) ve[me] = 0;
			for (me = 0; me < 32; ++me) ge[me] = 0
		}(function () {
			var e = [];
			var r = 0;
			for (; r < 32; r++) e.push(5);
			pe(e, ge, 32);
			var t = [];
			r = 0;
			for (; r <= 143; r++) t.push(8);
			for (; r <= 255; r++) t.push(9);
			for (; r <= 279; r++) t.push(7);
			for (; r <= 287; r++) t.push(8);
			pe(t, ve, 288)
		})();
		var be = re ? new Uint16Array(32768) : he(32768);
		var Ce = re ? new Uint16Array(32768) : he(32768);
		var Ee = re ? new Uint16Array(128) : he(128);
		var ke = 1,
			Se = 1;

		function we(e, r) {
			var t = le(e, r) + 257;
			r += 5;
			var n = le(e, r) + 1;
			r += 5;
			var a = oe(e, r) + 4;
			r += 4;
			var i = 0;
			var s = re ? new Uint8Array(19) : he(19);
			var o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			var l = 1;
			var f = re ? new Uint8Array(8) : he(8);
			var c = re ? new Uint8Array(8) : he(8);
			var u = s.length;
			for (var h = 0; h < a; ++h) {
				s[Q[h]] = i = se(e, r);
				if (l < i) l = i;
				f[i]++;
				r += 3
			}
			var d = 0;
			f[0] = 0;
			for (h = 1; h <= l; ++h) c[h] = d = d + f[h - 1] << 1;
			for (h = 0; h < u; ++h)
				if ((d = s[h]) != 0) o[h] = c[d]++;
			var p = 0;
			for (h = 0; h < u; ++h) {
				p = s[h];
				if (p != 0) {
					d = te[o[h]] >> 8 - p;
					for (var v = (1 << 7 - p) - 1; v >= 0; --v) Ee[d | v << p] = p & 7 | h << 3
				}
			}
			var g = [];
			l = 1;
			for (; g.length < t + n;) {
				d = Ee[fe(e, r)];
				r += d & 7;
				switch (d >>>= 3) {
				case 16:
					i = 3 + ie(e, r);
					r += 2;
					d = g[g.length - 1];
					while (i-- > 0) g.push(d);
					break;
				case 17:
					i = 3 + se(e, r);
					r += 3;
					while (i-- > 0) g.push(0);
					break;
				case 18:
					i = 11 + fe(e, r);
					r += 7;
					while (i-- > 0) g.push(0);
					break;
				default:
					g.push(d);
					if (l < d) l = d;
					break
				}
			}
			var m = g.slice(0, t),
				b = g.slice(t);
			for (h = t; h < 286; ++h) m[h] = 0;
			for (h = n; h < 30; ++h) b[h] = 0;
			ke = pe(m, be, 286);
			Se = pe(b, Ce, 30);
			return r
		}

		function Ae(e, r) {
			if (e[0] == 3 && !(e[1] & 3)) {
				return [k(r), 2]
			}
			var t = 0;
			var n = 0;
			var a = S(r ? r : 1 << 18);
			var i = 0;
			var s = a.length >>> 0;
			var o = 0,
				l = 0;
			while ((n & 1) == 0) {
				n = se(e, t);
				t += 3;
				if (n >>> 1 == 0) {
					if (t & 7) t += 8 - (t & 7);
					var f = e[t >>> 3] | e[(t >>> 3) + 1] << 8;
					t += 32;
					if (!r && s < i + f) {
						a = ue(a, i + f);
						s = a.length
					}
					if (typeof e.copy === "function") {
						e.copy(a, i, t >>> 3, (t >>> 3) + f);
						i += f;
						t += 8 * f
					} else
						while (f-- > 0) {
							a[i++] = e[t >>> 3];
							t += 8
						}
					continue
				} else if (n >>> 1 == 1) {
					o = 9;
					l = 5
				} else {
					t = we(e, t);
					o = ke;
					l = Se
				}
				if (!r && s < i + 32767) {
					a = ue(a, i + 32767);
					s = a.length
				}
				for (;;) {
					var c = ce(e, t, o);
					var u = n >>> 1 == 1 ? ve[c] : be[c];
					t += u & 15;
					u >>>= 4;
					if ((u >>> 8 & 255) === 0) a[i++] = u;
					else if (u == 256) break;
					else {
						u -= 257;
						var h = u < 8 ? 0 : u - 4 >> 2;
						if (h > 5) h = 0;
						var d = i + J[u];
						if (h > 0) {
							d += ce(e, t, h);
							t += h
						}
						c = ce(e, t, l);
						u = n >>> 1 == 1 ? ge[c] : Ce[c];
						t += u & 15;
						u >>>= 4;
						var p = u < 4 ? 0 : u - 2 >> 1;
						var v = q[u];
						if (p > 0) {
							v += ce(e, t, p);
							t += p
						}
						if (!r && s < d) {
							a = ue(a, d);
							s = a.length
						}
						while (i < d) {
							a[i] = a[i - v];
							++i
						}
					}
				}
			}
			return [r ? a : a.slice(0, i), t + 7 >>> 3]
		}

		function _e(e, r) {
			var t = e.slice(e.l || 0);
			var n = Ae(t, r);
			e.l += n[1];
			return n[0]
		}

		function Re(e, r) {
			if (e) {
				if (typeof console !== "undefined") console.error(r)
			} else throw new Error(r)
		}

		function Be(e, r) {
			var t = e;
			Vr(t, 0);
			var n = [],
				a = [];
			var i = {
				FileIndex: n,
				FullPaths: a
			};
			I(i, {
				root: r.root
			});
			var s = t.length - 4;
			while ((t[s] != 80 || t[s + 1] != 75 || t[s + 2] != 5 || t[s + 3] != 6) && s >= 0) --s;
			t.l = s + 4;
			t.l += 4;
			var l = t._R(2);
			t.l += 6;
			var f = t._R(4);
			t.l = f;
			for (s = 0; s < l; ++s) {
				t.l += 20;
				var c = t._R(4);
				var u = t._R(4);
				var h = t._R(2);
				var d = t._R(2);
				var p = t._R(2);
				t.l += 8;
				var v = t._R(4);
				var g = o(t.slice(t.l + h, t.l + h + d));
				t.l += h + d + p;
				var m = t.l;
				t.l = v + 4;
				Te(t, c, u, i, g);
				t.l = m
			}
			return i
		}

		function Te(e, r, t, n, a) {
			e.l += 2;
			var i = e._R(2);
			var l = e._R(2);
			var f = s(e);
			if (i & 8257) throw new Error("Unsupported ZIP encryption");
			var c = e._R(4);
			var u = e._R(4);
			var h = e._R(4);
			var d = e._R(2);
			var p = e._R(2);
			var v = "";
			for (var g = 0; g < d; ++g) v += String.fromCharCode(e[e.l++]);
			if (p) {
				var m = o(e.slice(e.l, e.l + p));
				if ((m[21589] || {}).mt) f = m[21589].mt;
				if (((a || {})[21589] || {}).mt) f = a[21589].mt
			}
			e.l += p;
			var b = e.slice(e.l, e.l + u);
			switch (l) {
			case 8:
				b = $(e, h);
				break;
			case 0:
				break;
			default:
				throw new Error("Unsupported ZIP Compression method " + l)
			}
			var C = false;
			if (i & 8) {
				c = e._R(4);
				if (c == 134695760) {
					c = e._R(4);
					C = true
				}
				u = e._R(4);
				h = e._R(4)
			}
			if (u != r) Re(C, "Bad compressed size: " + r + " != " + u);
			if (h != t) Re(C, "Bad uncompressed size: " + t + " != " + h);
			var E = W.buf(b, 0);
			if (c != E) Re(C, "Bad CRC32 checksum: " + c + " != " + E);
			Ie(n, v, b, {
				unsafe: true,
				mt: f
			})
		}

		function ye(e, r) {
			var t = r || {};
			var n = [],
				a = [];
			var s = Xr(1);
			var o = t.compression ? 8 : 0,
				l = 0;
			var f = false;
			if (f) l |= 8;
			var c = 0,
				u = 0;
			var h = 0,
				d = 0;
			var p = e.FullPaths[0],
				v = p,
				g = e.FileIndex[0];
			var m = [];
			var b = 0;
			for (c = 1; c < e.FullPaths.length; ++c) {
				v = e.FullPaths[c].slice(p.length);
				g = e.FileIndex[c];
				if (!g.size || !g.content || v == "Sh33tJ5") continue;
				var C = h;
				var E = Xr(v.length);
				for (u = 0; u < v.length; ++u) E._W(1, v.charCodeAt(u) & 127);
				E = E.slice(0, E.l);
				m[d] = W.buf(g.content, 0);
				var k = g.content;
				if (o == 8) k = Z(k);
				s = Xr(30);
				s._W(4, 67324752);
				s._W(2, 20);
				s._W(2, l);
				s._W(2, o);
				if (g.mt) i(s, g.mt);
				else s._W(4, 0);
				s._W(-4, l & 8 ? 0 : m[d]);
				s._W(4, l & 8 ? 0 : k.length);
				s._W(4, l & 8 ? 0 : g.content.length);
				s._W(2, E.length);
				s._W(2, 0);
				h += s.length;
				n.push(s);
				h += E.length;
				n.push(E);
				h += k.length;
				n.push(k);
				if (l & 8) {
					s = Xr(12);
					s._W(-4, m[d]);
					s._W(4, k.length);
					s._W(4, g.content.length);
					h += s.l;
					n.push(s)
				}
				s = Xr(46);
				s._W(4, 33639248);
				s._W(2, 0);
				s._W(2, 20);
				s._W(2, l);
				s._W(2, o);
				s._W(4, 0);
				s._W(-4, m[d]);
				s._W(4, k.length);
				s._W(4, g.content.length);
				s._W(2, E.length);
				s._W(2, 0);
				s._W(2, 0);
				s._W(2, 0);
				s._W(2, 0);
				s._W(4, 0);
				s._W(4, C);
				b += s.l;
				a.push(s);
				b += E.length;
				a.push(E);
				++d
			}
			s = Xr(22);
			s._W(4, 101010256);
			s._W(2, 0);
			s._W(2, 0);
			s._W(2, d);
			s._W(2, d);
			s._W(4, b);
			s._W(4, h);
			s._W(2, 0);
			return T([T(n), T(a), s])
		}

		function xe(e) {
			var r = {};
			I(r, e);
			return r
		}

		function Ie(e, r, t, n) {
			var i = n && n.unsafe;
			if (!i) I(e);
			var s = !i && U.find(e, r);
			if (!s) {
				var o = e.FullPaths[0];
				if (r.slice(0, o.length) == o) o = r;
				else {
					if (o.slice(-1) != "/") o += "/";
					o = (o + r).replace("//", "/")
				}
				s = {
					name: a(r),
					type: 2
				};
				e.FileIndex.push(s);
				e.FullPaths.push(o);
				if (!i) U.utils.cfb_gc(e)
			}
			s.content = t;
			s.size = t ? t.length : 0;
			if (n) {
				if (n.CLSID) s.clsid = n.CLSID;
				if (n.mt) s.mt = n.mt;
				if (n.ct) s.ct = n.ct
			}
			return s
		}

		function De(e, r) {
			I(e);
			var t = U.find(e, r);
			if (t)
				for (var n = 0; n < e.FileIndex.length; ++n)
					if (e.FileIndex[n] == t) {
						e.FileIndex.splice(n, 1);
						e.FullPaths.splice(n, 1);
						return true
					}
			return false
		}

		function Fe(e, r, t) {
			I(e);
			var n = U.find(e, r);
			if (n)
				for (var i = 0; i < e.FileIndex.length; ++i)
					if (e.FileIndex[i] == n) {
						e.FileIndex[i].name = a(t);
						e.FullPaths[i] = t;
						return true
					}
			return false
		}

		function Oe(e) {
			F(e, true)
		}
		r.find = P;
		r.read = B;
		r.parse = c;
		r.write = j;
		r.writeFile = X;
		r.utils = {
			cfb_new: xe,
			cfb_add: Ie,
			cfb_del: De,
			cfb_mov: Fe,
			cfb_gc: Oe,
			ReadShift: Nr,
			CheckField: Hr,
			prep_blob: Vr,
			bconcat: T,
			use_zlib: Y,
			_deflateRaw: de,
			_inflateRaw: _e,
			consts: z
		};
		return r
	}();
	if (typeof require !== "undefined" && typeof module !== "undefined" && typeof M === "undefined") {
		module.exports = U
	}
	var H;
	if (typeof require !== "undefined") try {
		H = require("fs")
	} catch (e) {}

	function V(e) {
		if (typeof e === "string") return A(e);
		if (Array.isArray(e)) return R(e);
		return e
	}

	function z(e, r, t) {
		if (typeof H !== "undefined" && H.writeFileSync) return t ? H.writeFileSync(e, r, t) : H.writeFileSync(e, r);
		var n = t == "utf8" ? ze(r) : r;
		if (typeof IE_SaveFile !== "undefined") return IE_SaveFile(n, e);
		if (typeof Blob !== "undefined") {
			var a = new Blob([V(n)], {
				type: "application/octet-stream"
			});
			if (typeof navigator !== "undefined" && navigator.msSaveBlob) return navigator.msSaveBlob(a, e);
			if (typeof saveAs !== "undefined") return saveAs(a, e);
			if (typeof URL !== "undefined" && typeof document !== "undefined" && document.createElement && URL.createObjectURL) {
				var i = URL.createObjectURL(a);
				if (typeof chrome === "object" && typeof (chrome.downloads || {}).download == "function") {
					if (URL.revokeObjectURL && typeof setTimeout !== "undefined") setTimeout(function () {
						URL.revokeObjectURL(i)
					}, 6e4);
					return chrome.downloads.download({
						url: i,
						filename: e,
						saveAs: true
					})
				}
				var s = document.createElement("a");
				if (s.download != null) {
					s.download = e;
					s.href = i;
					document.body.appendChild(s);
					s.click();
					document.body.removeChild(s);
					if (URL.revokeObjectURL && typeof setTimeout !== "undefined") setTimeout(function () {
						URL.revokeObjectURL(i)
					}, 6e4);
					return i
				}
			}
		}
		if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
			var o = File(e);
			o.open("w");
			o.encoding = "binary";
			if (Array.isArray(r)) r = _(r);
			o.write(r);
			o.close();
			return r
		} catch (e) {
			if (!e.message || !e.message.match(/onstruct/)) throw e
		}
		throw new Error("cannot save file " + e)
	}

	function X(e) {
		if (typeof H !== "undefined") return H.readFileSync(e);
		if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
			var r = File(e);
			r.open("r");
			r.encoding = "binary";
			var t = r.read();
			r.close();
			return t
		} catch (e) {
			if (!e.message || !e.message.match(/onstruct/)) throw e
		}
		throw new Error("Cannot access file " + e)
	}

	function G(e) {
		var r = Object.keys(e),
			t = [];
		for (var n = 0; n < r.length; ++n)
			if (e.hasOwnProperty(r[n])) t.push(r[n]);
		return t
	}

	function j(e, r) {
		var t = [],
			n = G(e);
		for (var a = 0; a !== n.length; ++a)
			if (t[e[n[a]][r]] == null) t[e[n[a]][r]] = n[a];
		return t
	}

	function K(e) {
		var r = [],
			t = G(e);
		for (var n = 0; n !== t.length; ++n) r[e[t[n]]] = t[n];
		return r
	}

	function Y(e) {
		var r = [],
			t = G(e);
		for (var n = 0; n !== t.length; ++n) r[e[t[n]]] = parseInt(t[n], 10);
		return r
	}

	function Z(e) {
		var r = [],
			t = G(e);
		for (var n = 0; n !== t.length; ++n) {
			if (r[e[t[n]]] == null) r[e[t[n]]] = [];
			r[e[t[n]]].push(t[n])
		}
		return r
	}
	var Q = new Date(1899, 11, 30, 0, 0, 0);
	var J = Q.getTime() + ((new Date).getTimezoneOffset() - Q.getTimezoneOffset()) * 6e4;

	function q(e, r) {
		var t = e.getTime();
		if (r) t -= 1462 * 24 * 60 * 60 * 1e3;
		return (t - J) / (24 * 60 * 60 * 1e3)
	}

	function ee(e) {
		var r = new Date;
		r.setTime(e * 24 * 60 * 60 * 1e3 + J);
		return r
	}

	function re(e) {
		var r = 0,
			t = 0,
			n = false;
		var a = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
		if (!a) throw new Error("|" + e + "| is not an ISO8601 Duration");
		for (var i = 1; i != a.length; ++i) {
			if (!a[i]) continue;
			t = 1;
			if (i > 3) n = true;
			switch (a[i].slice(a[i].length - 1)) {
			case "Y":
				throw new Error("Unsupported ISO Duration Field: " + a[i].slice(a[i].length - 1));
			case "D":
				t *= 24;
			case "H":
				t *= 60;
			case "M":
				if (!n) throw new Error("Unsupported ISO Duration Field: M");
				else t *= 60;
			case "S":
				break
			}
			r += t * parseInt(a[i], 10)
		}
		return r
	}
	var te = new Date("2017-02-19T19:06:09.000Z");
	if (isNaN(te.getFullYear())) te = new Date("2/19/17");
	var ne = te.getFullYear() == 2017;

	function ae(e, r) {
		var t = new Date(e);
		if (ne) {
			if (r > 0) t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3);
			else if (r < 0) t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3);
			return t
		}
		if (e instanceof Date) return e;
		if (te.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
			var n = t.getFullYear();
			if (e.indexOf("" + n) > -1) return t;
			t.setFullYear(t.getFullYear() + 100);
			return t
		}
		var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"];
		var i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
		if (e.indexOf("Z") > -1) i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3);
		return i
	}

	function ie(e) {
		var r = "";
		for (var t = 0; t != e.length; ++t) r += String.fromCharCode(e[t]);
		return r
	}

	function se(e) {
		if (typeof JSON != "undefined" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
		if (typeof e != "object" || e == null) return e;
		if (e instanceof Date) return new Date(e.getTime());
		var r = {};
		for (var t in e)
			if (e.hasOwnProperty(t)) r[t] = se(e[t]);
		return r
	}

	function oe(e, r) {
		var t = "";
		while (t.length < r) t += e;
		return t
	}

	function le(e) {
		var r = Number(e);
		if (!isNaN(r)) return r;
		var t = 1;
		var n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function () {
			t *= 100;
			return ""
		});
		if (!isNaN(r = Number(n))) return r / t;
		n = n.replace(/[(](.*)[)]/, function (e, r) {
			t = -t;
			return r
		});
		if (!isNaN(r = Number(n))) return r / t;
		return r
	}

	function fe(e) {
		var r = new Date(e),
			t = new Date(NaN);
		var n = r.getYear(),
			a = r.getMonth(),
			i = r.getDate();
		if (isNaN(i)) return t;
		if (n < 0 || n > 8099) return t;
		if ((a > 0 || i > 1) && n != 101) return r;
		if (e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) return r;
		if (e.match(/[^-0-9:,\/\\]/)) return t;
		return r
	}
	var ce = "abacaba".split(/(:?b)/i).length == 5;

	function ue(e, r, t) {
		if (ce || typeof r == "string") return e.split(r);
		var n = e.split(r),
			a = [n[0]];
		for (var i = 1; i < n.length; ++i) {
			a.push(t);
			a.push(n[i])
		}
		return a
	}

	function he(e) {
		if (!e) return null;
		if (e.data) return d(e.data);
		if (e.asNodeBuffer && b) return d(e.asNodeBuffer().toString("binary"));
		if (e.asBinary) return d(e.asBinary());
		if (e._data && e._data.getContent) return d(ie(Array.prototype.slice.call(e._data.getContent(), 0)));
		return null
	}

	function de(e) {
		if (!e) return null;
		if (e.data) return c(e.data);
		if (e.asNodeBuffer && b) return e.asNodeBuffer();
		if (e._data && e._data.getContent) {
			var r = e._data.getContent();
			if (typeof r == "string") return c(r);
			return Array.prototype.slice.call(r)
		}
		return null
	}

	function pe(e) {
		return e && e.name.slice(-4) === ".bin" ? de(e) : he(e)
	}

	function ve(e, r) {
		var t = G(e.files);
		var n = r.toLowerCase(),
			a = n.replace(/\//g, "\\");
		for (var i = 0; i < t.length; ++i) {
			var s = t[i].toLowerCase();
			if (n == s || a == s) return e.files[t[i]]
		}
		return null
	}

	function ge(e, r) {
		var t = ve(e, r);
		if (t == null) throw new Error("Cannot find file " + r + " in zip");
		return t
	}

	function me(e, r, t) {
		if (!t) return pe(ge(e, r));
		if (!r) return null;
		try {
			return me(e, r)
		} catch (e) {
			return null
		}
	}

	function be(e, r, t) {
		if (!t) return he(ge(e, r));
		if (!r) return null;
		try {
			return be(e, r)
		} catch (e) {
			return null
		}
	}

	function Ce(e) {
		var r = G(e.files),
			t = [];
		for (var n = 0; n < r.length; ++n)
			if (r[n].slice(-1) != "/") t.push(r[n]);
		return t.sort()
	}
	var Ee;
	if (typeof JSZipSync !== "undefined") Ee = JSZipSync;
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			if (typeof Ee === "undefined") Ee = undefined
		}
	}

	function ke(e, r) {
		var t = r.split("/");
		if (r.slice(-1) != "/") t.pop();
		var n = e.split("/");
		while (n.length !== 0) {
			var a = n.shift();
			if (a === "..") t.pop();
			else if (a !== ".") t.push(a)
		}
		return t.join("/")
	}
	var Se = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';
	var we = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;
	var Ae = /<[\/\?]?[a-zA-Z0-9:]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s?[\/\?]?>/g;
	if (!Se.match(Ae)) Ae = /<[^>]*>/g;
	var _e = /<\w*:/,
		Re = /<(\/?)\w+:/;

	function Be(e, r) {
		var t = {};
		var n = 0,
			a = 0;
		for (; n !== e.length; ++n)
			if ((a = e.charCodeAt(n)) === 32 || a === 10 || a === 13) break;
		if (!r) t[0] = e.slice(0, n);
		if (n === e.length) return t;
		var i = e.match(we),
			s = 0,
			o = "",
			l = 0,
			f = "",
			c = "",
			u = 1;
		if (i)
			for (l = 0; l != i.length; ++l) {
				c = i[l];
				for (a = 0; a != c.length; ++a)
					if (c.charCodeAt(a) === 61) break;
				f = c.slice(0, a).trim();
				while (c.charCodeAt(a + 1) == 32) ++a;
				u = (n = c.charCodeAt(a + 1)) == 34 || n == 39 ? 1 : 0;
				o = c.slice(a + 1 + u, c.length - u);
				for (s = 0; s != f.length; ++s)
					if (f.charCodeAt(s) === 58) break;
				if (s === f.length) {
					if (f.indexOf("_") > 0) f = f.slice(0, f.indexOf("_"));
					t[f] = o;
					t[f.toLowerCase()] = o
				} else {
					var h = (s === 5 && f.slice(0, 5) === "xmlns" ? "xmlns" : "") + f.slice(s + 1);
					if (t[h] && f.slice(s - 3, s) == "ext") continue;
					t[h] = o;
					t[h.toLowerCase()] = o
				}
			}
		return t
	}

	function Te(e) {
		return e.replace(Re, "<$1")
	}
	var ye = {
		"&quot;": '"',
		"&apos;": "'",
		"&gt;": ">",
		"&lt;": "<",
		"&amp;": "&"
	};
	var xe = K(ye);
	var Ie = function () {
		var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/g,
			r = /_x([\da-fA-F]{4})_/g;
		return function t(n) {
			var a = n + "",
				i = a.indexOf("<![CDATA[");
			if (i == -1) return a.replace(e, function (e, r) {
				return ye[e] || String.fromCharCode(parseInt(r, e.indexOf("x") > -1 ? 16 : 10)) || e
			}).replace(r, function (e, r) {
				return String.fromCharCode(parseInt(r, 16))
			});
			var s = a.indexOf("]]>");
			return t(a.slice(0, i)) + a.slice(i + 9, s) + t(a.slice(s + 3))
		}
	}();
	var De = /[&<>'"]/g,
		Fe = /[\u0000-\u0008\u000b-\u001f]/g;

	function Oe(e) {
		var r = e + "";
		return r.replace(De, function (e) {
			return xe[e]
		}).replace(Fe, function (e) {
			return "_x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + "_"
		})
	}

	function Pe(e) {
		return Oe(e).replace(/ /g, "_x0020_")
	}
	var Ne = /[\u0000-\u001f]/g;

	function Le(e) {
		var r = e + "";
		return r.replace(De, function (e) {
			return xe[e]
		}).replace(/\n/g, "<br/>").replace(Ne, function (e) {
			return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + ";"
		})
	}

	function Me(e) {
		var r = e + "";
		return r.replace(De, function (e) {
			return xe[e]
		}).replace(Ne, function (e) {
			return "&#x" + e.charCodeAt(0).toString(16).toUpperCase() + ";"
		})
	}
	var We = function () {
		var e = /&#(\d+);/g;

		function r(e, r) {
			return String.fromCharCode(parseInt(r, 10))
		}
		return function t(n) {
			return n.replace(e, r)
		}
	}();
	var Ue = function () {
		return function e(r) {
			return r.replace(/(\r\n|[\r\n])/g, "&#10;")
		}
	}();

	function He(e) {
		switch (e) {
		case 1:
			;
		case true:
			;
		case "1":
			;
		case "true":
			;
		case "TRUE":
			return true;
		default:
			return false
		}
	}
	var Ve = function e(r) {
		var t = "",
			n = 0,
			a = 0,
			i = 0,
			s = 0,
			o = 0,
			l = 0;
		while (n < r.length) {
			a = r.charCodeAt(n++);
			if (a < 128) {
				t += String.fromCharCode(a);
				continue
			}
			i = r.charCodeAt(n++);
			if (a > 191 && a < 224) {
				o = (a & 31) << 6;
				o |= i & 63;
				t += String.fromCharCode(o);
				continue
			}
			s = r.charCodeAt(n++);
			if (a < 240) {
				t += String.fromCharCode((a & 15) << 12 | (i & 63) << 6 | s & 63);
				continue
			}
			o = r.charCodeAt(n++);
			l = ((a & 7) << 18 | (i & 63) << 12 | (s & 63) << 6 | o & 63) - 65536;
			t += String.fromCharCode(55296 + (l >>> 10 & 1023));
			t += String.fromCharCode(56320 + (l & 1023))
		}
		return t
	};
	var ze = function (e) {
		var r = [],
			t = 0,
			n = 0,
			a = 0;
		while (t < e.length) {
			n = e.charCodeAt(t++);
			switch (true) {
			case n < 128:
				r.push(String.fromCharCode(n));
				break;
			case n < 2048:
				r.push(String.fromCharCode(192 + (n >> 6)));
				r.push(String.fromCharCode(128 + (n & 63)));
				break;
			case n >= 55296 && n < 57344:
				n -= 55296;
				a = e.charCodeAt(t++) - 56320 + (n << 10);
				r.push(String.fromCharCode(240 + (a >> 18 & 7)));
				r.push(String.fromCharCode(144 + (a >> 12 & 63)));
				r.push(String.fromCharCode(128 + (a >> 6 & 63)));
				r.push(String.fromCharCode(128 + (a & 63)));
				break;
			default:
				r.push(String.fromCharCode(224 + (n >> 12)));
				r.push(String.fromCharCode(128 + (n >> 6 & 63)));
				r.push(String.fromCharCode(128 + (n & 63)))
			}
		}
		return r.join("")
	};
	if (b) {
		var Xe = function e(r) {
			var t = Buffer.alloc(2 * r.length),
				n, a, i = 1,
				s = 0,
				o = 0,
				l;
			for (a = 0; a < r.length; a += i) {
				i = 1;
				if ((l = r.charCodeAt(a)) < 128) n = l;
				else if (l < 224) {
					n = (l & 31) * 64 + (r.charCodeAt(a + 1) & 63);
					i = 2
				} else if (l < 240) {
					n = (l & 15) * 4096 + (r.charCodeAt(a + 1) & 63) * 64 + (r.charCodeAt(a + 2) & 63);
					i = 3
				} else {
					i = 4;
					n = (l & 7) * 262144 + (r.charCodeAt(a + 1) & 63) * 4096 + (r.charCodeAt(a + 2) & 63) * 64 + (r.charCodeAt(a + 3) & 63);
					n -= 65536;
					o = 55296 + (n >>> 10 & 1023);
					n = 56320 + (n & 1023)
				}
				if (o !== 0) {
					t[s++] = o & 255;
					t[s++] = o >>> 8;
					o = 0
				}
				t[s++] = n % 256;
				t[s++] = n >>> 8
			}
			return t.slice(0, s).toString("ucs2")
		};
		var Ge = "foo bar bazÃ¢Â˜ÂƒÃ°ÂŸÂÂ£";
		if (Ve(Ge) == Xe(Ge)) Ve = Xe;
		var je = function e(r) {
			return C(r, "binary").toString("utf8")
		};
		if (Ve(Ge) == je(Ge)) Ve = je;
		ze = function (e) {
			return C(e, "utf8").toString("binary")
		}
	}
	var Ke = function () {
		var e = {};
		return function r(t, n) {
			var a = t + "|" + (n || "");
			if (e[a]) return e[a];
			return e[a] = new RegExp("<(?:\\w+:)?" + t + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + t + ">", n || "")
		}
	}();
	var Ye = function () {
		var e = [
			["nbsp", " "],
			["middot", "Â·"],
			["quot", '"'],
			["apos", "'"],
			["gt", ">"],
			["lt", "<"],
			["amp", "&"]
		].map(function (e) {
			return [new RegExp("&" + e[0] + ";", "g"), e[1]]
		});
		return function r(t) {
			var n = t.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(
				/<[^>]*>/g, "");
			for (var a = 0; a < e.length; ++a) n = n.replace(e[a][0], e[a][1]);
			return n
		}
	}();
	var $e = function () {
		var e = {};
		return function r(t) {
			if (e[t] !== undefined) return e[t];
			return e[t] = new RegExp("<(?:vt:)?" + t + ">([\\s\\S]*?)</(?:vt:)?" + t + ">", "g")
		}
	}();
	var Ze = /<\/?(?:vt:)?variant>/g,
		Qe = /<(?:vt:)([^>]*)>([\s\S]*)</;

	function Je(e, r) {
		var t = Be(e);
		var n = e.match($e(t.baseType)) || [];
		var a = [];
		if (n.length != t.size) {
			if (r.WTF) throw new Error("unexpected vector length " + n.length + " != " + t.size);
			return a
		}
		n.forEach(function (e) {
			var r = e.replace(Ze, "").match(Qe);
			if (r) a.push({
				v: Ve(r[2]),
				t: r[1]
			})
		});
		return a
	}
	var qe = /(^\s|\s$|\n)/;

	function er(e, r) {
		return "<" + e + (r.match(qe) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">"
	}

	function rr(e) {
		return G(e).map(function (r) {
			return " " + r + '="' + e[r] + '"'
		}).join("")
	}

	function tr(e, r, t) {
		return "<" + e + (t != null ? rr(t) : "") + (r != null ? (r.match(qe) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">"
	}

	function nr(e, r) {
		try {
			return e.toISOString().replace(/\.\d*/, "")
		} catch (e) {
			if (r) throw e
		}
		return ""
	}

	function ar(e) {
		switch (typeof e) {
		case "string":
			return tr("vt:lpwstr", e);
		case "number":
			return tr((e | 0) == e ? "vt:i4" : "vt:r8", String(e));
		case "boolean":
			return tr("vt:bool", e ? "true" : "false")
		}
		if (e instanceof Date) return tr("vt:filetime", nr(e));
		throw new Error("Unable to serialize " + e)
	}
	var ir = {
		dc: "http://purl.org/dc/elements/1.1/",
		dcterms: "http://purl.org/dc/terms/",
		dcmitype: "http://purl.org/dc/dcmitype/",
		mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
		r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
		sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
		vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
		xsi: "http://www.w3.org/2001/XMLSchema-instance",
		xsd: "http://www.w3.org/2001/XMLSchema"
	};
	ir.main = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main",
		"http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"
	];
	var sr = {
		o: "urn:schemas-microsoft-com:office:office",
		x: "urn:schemas-microsoft-com:office:excel",
		ss: "urn:schemas-microsoft-com:office:spreadsheet",
		dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
		mv: "http://macVmlSchemaUri",
		v: "urn:schemas-microsoft-com:vml",
		html: "http://www.w3.org/TR/REC-html40"
	};

	function or(e, r) {
		var t = 1 - 2 * (e[r + 7] >>> 7);
		var n = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15);
		var a = e[r + 6] & 15;
		for (var i = 5; i >= 0; --i) a = a * 256 + e[r + i];
		if (n == 2047) return a == 0 ? t * Infinity : NaN;
		if (n == 0) n = -1022;
		else {
			n -= 1023;
			a += Math.pow(2, 52)
		}
		return t * Math.pow(2, n - 52) * a
	}

	function lr(e, r, t) {
		var n = (r < 0 || 1 / r == -Infinity ? 1 : 0) << 7,
			a = 0,
			i = 0;
		var s = n ? -r : r;
		if (!isFinite(s)) {
			a = 2047;
			i = isNaN(r) ? 26985 : 0
		} else if (s == 0) a = i = 0;
		else {
			a = Math.floor(Math.log(s) / Math.LN2);
			i = s * Math.pow(2, 52 - a);
			if (a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))) {
				a = -1022
			} else {
				i -= Math.pow(2, 52);
				a += 1023
			}
		}
		for (var o = 0; o <= 5; ++o, i /= 256) e[t + o] = i & 255;
		e[t + 6] = (a & 15) << 4 | i & 15;
		e[t + 7] = a >> 4 | n
	}
	var fr = function (e) {
		var r = [],
			t = 10240;
		for (var n = 0; n < e[0].length; ++n)
			if (e[0][n])
				for (var a = 0, i = e[0][n].length; a < i; a += t) r.push.apply(r, e[0][n].slice(a, a + t));
		return r
	};
	var cr = fr;
	var ur = function (e, r, t) {
		var n = [];
		for (var a = r; a < t; a += 2) n.push(String.fromCharCode(Ir(e, a)));
		return n.join("").replace(y, "")
	};
	var hr = ur;
	var dr = function (e, r, t) {
		var n = [];
		for (var a = r; a < r + t; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
		return n.join("")
	};
	var pr = dr;
	var vr = function (e, r, t) {
		var n = [];
		for (var a = r; a < t; a++) n.push(String.fromCharCode(xr(e, a)));
		return n.join("")
	};
	var gr = vr;
	var mr = function (e, r) {
		var t = Fr(e, r);
		return t > 0 ? vr(e, r + 4, r + 4 + t - 1) : ""
	};
	var br = mr;
	var Cr = function (e, r) {
		var t = Fr(e, r);
		return t > 0 ? vr(e, r + 4, r + 4 + t - 1) : ""
	};
	var Er = Cr;
	var kr = function (e, r) {
		var t = 2 * Fr(e, r);
		return t > 0 ? vr(e, r + 4, r + 4 + t - 1) : ""
	};
	var Sr = kr;
	var wr, Ar;
	wr = Ar = function e(r, t) {
		var n = Fr(r, t);
		return n > 0 ? ur(r, t + 4, t + 4 + n) : ""
	};
	var _r = function (e, r) {
		var t = Fr(e, r);
		return t > 0 ? vr(e, r + 4, r + 4 + t) : ""
	};
	var Rr = _r;
	var Br, Tr;
	Br = Tr = function (e, r) {
		return or(e, r)
	};
	var yr = function e(r) {
		return Array.isArray(r)
	};
	if (b) {
		ur = function (e, r, t) {
			if (!Buffer.isBuffer(e)) return hr(e, r, t);
			return e.toString("utf16le", r, t).replace(y, "")
		};
		dr = function (e, r, t) {
			return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : pr(e, r, t)
		};
		mr = function e(r, t) {
			if (!Buffer.isBuffer(r)) return br(r, t);
			var n = r.readUInt32LE(t);
			return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : ""
		};
		Cr = function e(r, t) {
			if (!Buffer.isBuffer(r)) return Er(r, t);
			var n = r.readUInt32LE(t);
			return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : ""
		};
		kr = function e(r, t) {
			if (!Buffer.isBuffer(r)) return Sr(r, t);
			var n = 2 * r.readUInt32LE(t);
			return r.toString("utf16le", t + 4, t + 4 + n - 1)
		};
		wr = function e(r, t) {
			if (!Buffer.isBuffer(r)) return Ar(r, t);
			var n = r.readUInt32LE(t);
			return r.toString("utf16le", t + 4, t + 4 + n)
		};
		_r = function e(r, t) {
			if (!Buffer.isBuffer(r)) return Rr(r, t);
			var n = r.readUInt32LE(t);
			return r.toString("utf8", t + 4, t + 4 + n)
		};
		vr = function e(r, t, n) {
			return Buffer.isBuffer(r) ? r.toString("utf8", t, n) : gr(r, t, n)
		};
		fr = function (e) {
			return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0]) : cr(e)
		};
		T = function (e) {
			return Buffer.isBuffer(e[0]) ? Buffer.concat(e) : [].concat.apply([], e)
		};
		Br = function e(r, t) {
			if (Buffer.isBuffer(r)) return r.readDoubleLE(t);
			return Tr(r, t)
		};
		yr = function e(r) {
			return Buffer.isBuffer(r) || Array.isArray(r)
		}
	}
	if (typeof cptable !== "undefined") {
		ur = function (e, r, t) {
			return cptable.utils.decode(1200, e.slice(r, t)).replace(y, "")
		};
		vr = function (e, r, t) {
			return cptable.utils.decode(65001, e.slice(r, t))
		};
		mr = function (e, r) {
			var n = Fr(e, r);
			return n > 0 ? cptable.utils.decode(t, e.slice(r + 4, r + 4 + n - 1)) : ""
		};
		Cr = function (e, t) {
			var n = Fr(e, t);
			return n > 0 ? cptable.utils.decode(r, e.slice(t + 4, t + 4 + n - 1)) : ""
		};
		kr = function (e, r) {
			var t = 2 * Fr(e, r);
			return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t - 1)) : ""
		};
		wr = function (e, r) {
			var t = Fr(e, r);
			return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t)) : ""
		};
		_r = function (e, r) {
			var t = Fr(e, r);
			return t > 0 ? cptable.utils.decode(65001, e.slice(r + 4, r + 4 + t)) : ""
		}
	}
	var xr = function (e, r) {
		return e[r]
	};
	var Ir = function (e, r) {
		return e[r + 1] * (1 << 8) + e[r]
	};
	var Dr = function (e, r) {
		var t = e[r + 1] * (1 << 8) + e[r];
		return t < 32768 ? t : (65535 - t + 1) * -1
	};
	var Fr = function (e, r) {
		return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r]
	};
	var Or = function (e, r) {
		return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r]
	};
	var Pr = function (e, r) {
		return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]
	};

	function Nr(e, t) {
		var n = "",
			a, i, s = [],
			o, l, f, c;
		switch (t) {
		case "dbcs":
			c = this.l;
			if (b && Buffer.isBuffer(this)) n = this.slice(this.l, this.l + 2 * e).toString("utf16le");
			else
				for (f = 0; f < e; ++f) {
					n += String.fromCharCode(Ir(this, c));
					c += 2
				}
			e *= 2;
			break;
		case "utf8":
			n = vr(this, this.l, this.l + e);
			break;
		case "utf16le":
			e *= 2;
			n = ur(this, this.l, this.l + e);
			break;
		case "wstr":
			if (typeof cptable !== "undefined") n = cptable.utils.decode(r, this.slice(this.l, this.l + 2 * e));
			else return Nr.call(this, e, "dbcs");
			e = 2 * e;
			break;
		case "lpstr-ansi":
			n = mr(this, this.l);
			e = 4 + Fr(this, this.l);
			break;
		case "lpstr-cp":
			n = Cr(this, this.l);
			e = 4 + Fr(this, this.l);
			break;
		case "lpwstr":
			n = kr(this, this.l);
			e = 4 + 2 * Fr(this, this.l);
			break;
		case "lpp4":
			e = 4 + Fr(this, this.l);
			n = wr(this, this.l);
			if (e & 2) e += 2;
			break;
		case "8lpp4":
			e = 4 + Fr(this, this.l);
			n = _r(this, this.l);
			if (e & 3) e += 4 - (e & 3);
			break;
		case "cstr":
			e = 0;
			n = "";
			while ((o = xr(this, this.l + e++)) !== 0) s.push(p(o));
			n = s.join("");
			break;
		case "_wstr":
			e = 0;
			n = "";
			while ((o = Ir(this, this.l + e)) !== 0) {
				s.push(p(o));
				e += 2
			}
			e += 2;
			n = s.join("");
			break;
		case "dbcs-cont":
			n = "";
			c = this.l;
			for (f = 0; f < e; ++f) {
				if (this.lens && this.lens.indexOf(c) !== -1) {
					o = xr(this, c);
					this.l = c + 1;
					l = Nr.call(this, e - f, o ? "dbcs-cont" : "sbcs-cont");
					return s.join("") + l
				}
				s.push(p(Ir(this, c)));
				c += 2
			}
			n = s.join("");
			e *= 2;
			break;
		case "cpstr":
			if (typeof cptable !== "undefined") {
				n = cptable.utils.decode(r, this.slice(this.l, this.l + e));
				break
			};
		case "sbcs-cont":
			n = "";
			c = this.l;
			for (f = 0; f != e; ++f) {
				if (this.lens && this.lens.indexOf(c) !== -1) {
					o = xr(this, c);
					this.l = c + 1;
					l = Nr.call(this, e - f, o ? "dbcs-cont" : "sbcs-cont");
					return s.join("") + l
				}
				s.push(p(xr(this, c)));
				c += 1
			}
			n = s.join("");
			break;
		default:
			switch (e) {
			case 1:
				a = xr(this, this.l);
				this.l++;
				return a;
			case 2:
				a = (t === "i" ? Dr : Ir)(this, this.l);
				this.l += 2;
				return a;
			case 4:
				;
			case -4:
				if (t === "i" || (this[this.l + 3] & 128) === 0) {
					a = (e > 0 ? Or : Pr)(this, this.l);
					this.l += 4;
					return a
				} else {
					i = Fr(this, this.l);
					this.l += 4
				}
				return i;
			case 8:
				;
			case -8:
				if (t === "f") {
					if (e == 8) i = Br(this, this.l);
					else i = Br([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l +
						1], this[this.l + 0]], 0);
					this.l += 8;
					return i
				} else e = 8;
			case 16:
				n = dr(this, this.l, e);
				break
			}
		}
		this.l += e;
		return n
	}
	var Lr = function (e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >>> 8 & 255;
		e[t + 2] = r >>> 16 & 255;
		e[t + 3] = r >>> 24 & 255
	};
	var Mr = function (e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >> 8 & 255;
		e[t + 2] = r >> 16 & 255;
		e[t + 3] = r >> 24 & 255
	};
	var Wr = function (e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >>> 8 & 255
	};

	function Ur(e, r, t) {
		var n = 0,
			a = 0;
		if (t === "dbcs") {
			for (a = 0; a != r.length; ++a) Wr(this, r.charCodeAt(a), this.l + 2 * a);
			n = 2 * r.length
		} else if (t === "sbcs") {
			r = r.replace(/[^\x00-\x7F]/g, "_");
			for (a = 0; a != r.length; ++a) this[this.l + a] = r.charCodeAt(a) & 255;
			n = r.length
		} else if (t === "hex") {
			for (; a < e; ++a) {
				this[this.l++] = parseInt(r.slice(2 * a, 2 * a + 2), 16) || 0
			}
			return this
		} else if (t === "utf16le") {
			var i = Math.min(this.l + e, this.length);
			for (a = 0; a < Math.min(r.length, e); ++a) {
				var s = r.charCodeAt(a);
				this[this.l++] = s & 255;
				this[this.l++] = s >> 8
			}
			while (this.l < i) this[this.l++] = 0;
			return this
		} else switch (e) {
		case 1:
			n = 1;
			this[this.l] = r & 255;
			break;
		case 2:
			n = 2;
			this[this.l] = r & 255;
			r >>>= 8;
			this[this.l + 1] = r & 255;
			break;
		case 3:
			n = 3;
			this[this.l] = r & 255;
			r >>>= 8;
			this[this.l + 1] = r & 255;
			r >>>= 8;
			this[this.l + 2] = r & 255;
			break;
		case 4:
			n = 4;
			Lr(this, r, this.l);
			break;
		case 8:
			n = 8;
			if (t === "f") {
				lr(this, r, this.l);
				break
			};
		case 16:
			break;
		case -4:
			n = 4;
			Mr(this, r, this.l);
			break
		}
		this.l += n;
		return this
	}

	function Hr(e, r) {
		var t = dr(this, this.l, e.length >> 1);
		if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
		this.l += e.length >> 1
	}

	function Vr(e, r) {
		e.l = r;
		e._R = Nr;
		e.chk = Hr;
		e._W = Ur
	}

	function zr(e, r) {
		e.l += r
	}

	function Xr(e) {
		var r = k(e);
		Vr(r, 0);
		return r
	}

	function Gr(e, r, t) {
		if (!e) return;
		var n, a, i;
		Vr(e, e.l || 0);
		var s = e.length,
			o = 0,
			l = 0;
		while (e.l < s) {
			o = e._R(1);
			if (o & 128) o = (o & 127) + ((e._R(1) & 127) << 7);
			var f = cv[o] || cv[65535];
			n = e._R(1);
			i = n & 127;
			for (a = 1; a < 4 && n & 128; ++a) i += ((n = e._R(1)) & 127) << 7 * a;
			l = e.l + i;
			var c = (f.f || zr)(e, i, t);
			e.l = l;
			if (r(c, f.n, o)) return
		}
	}

	function jr() {
		var e = [],
			r = b ? 256 : 2048;
		var t = function e(r) {
			var t = Xr(r);
			Vr(t, 0);
			return t
		};
		var n = t(r);
		var a = function r() {
			if (!n) return;
			if (n.length > n.l) {
				n = n.slice(0, n.l);
				n.l = n.length
			}
			if (n.length > 0) e.push(n);
			n = null
		};
		var i = function e(i) {
			if (n && i < n.length - n.l) return n;
			a();
			return n = t(Math.max(i + 1, r))
		};
		var s = function r() {
			a();
			return fr([e])
		};
		var o = function e(t) {
			a();
			n = t;
			if (n.l == null) n.l = n.length;
			i(r)
		};
		return {
			next: i,
			push: o,
			end: s,
			_bufs: e
		}
	}

	function Kr(e, r, t, n) {
		var a = +uv[r],
			i;
		if (isNaN(a)) return;
		if (!n) n = cv[a].p || (t || []).length || 0;
		i = 1 + (a >= 128 ? 1 : 0) + 1;
		if (n >= 128) ++i;
		if (n >= 16384) ++i;
		if (n >= 2097152) ++i;
		var s = e.next(i);
		if (a <= 127) s._W(1, a);
		else {
			s._W(1, (a & 127) + 128);
			s._W(1, a >> 7)
		}
		for (var o = 0; o != 4; ++o) {
			if (n >= 128) {
				s._W(1, (n & 127) + 128);
				n >>= 7
			} else {
				s._W(1, n);
				break
			}
		}
		if (n > 0 && yr(t)) e.push(t)
	}

	function Yr(e, r, t) {
		var n = se(e);
		if (r.s) {
			if (n.cRel) n.c += r.s.c;
			if (n.rRel) n.r += r.s.r
		} else {
			if (n.cRel) n.c += r.c;
			if (n.rRel) n.r += r.r
		}
		if (!t || t.biff < 12) {
			while (n.c >= 256) n.c -= 256;
			while (n.r >= 65536) n.r -= 65536
		}
		return n
	}

	function $r(e, r, t) {
		var n = se(e);
		n.s = Yr(n.s, r.s, t);
		n.e = Yr(n.e, r.s, t);
		return n
	}

	function Zr(e, r) {
		if (e.cRel && e.c < 0) {
			e = se(e);
			e.c += r > 8 ? 16384 : 256
		}
		if (e.rRel && e.r < 0) {
			e = se(e);
			e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384
		}
		var t = ct(e);
		if (e.cRel === 0) t = st(t);
		if (e.rRel === 0) t = tt(t);
		return t
	}

	function Qr(e, r) {
		if (e.s.r == 0 && !e.s.rRel) {
			if (e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel) {
				return (e.s.cRel ? "" : "$") + it(e.s.c) + ":" + (e.e.cRel ? "" : "$") + it(e.e.c)
			}
		}
		if (e.s.c == 0 && !e.s.cRel) {
			if (e.e.c == (r.biff >= 12 ? 65535 : 255) && !e.e.cRel) {
				return (e.s.rRel ? "" : "$") + rt(e.s.r) + ":" + (e.e.rRel ? "" : "$") + rt(e.e.r)
			}
		}
		return Zr(e.s, r.biff) + ":" + Zr(e.e, r.biff)
	}
	var Jr = {};
	var qr = function (e, r) {
		var t;
		if (typeof r !== "undefined") t = r;
		else if (typeof require !== "undefined") {
			try {
				t = undefined
			} catch (e) {
				t = null
			}
		}
		e.rc4 = function (e, r) {
			var t = new Array(256);
			var n = 0,
				a = 0,
				i = 0,
				s = 0;
			for (a = 0; a != 256; ++a) t[a] = a;
			for (a = 0; a != 256; ++a) {
				i = i + t[a] + e[a % e.length].charCodeAt(0) & 255;
				s = t[a];
				t[a] = t[i];
				t[i] = s
			}
			a = i = 0;
			var o = Buffer(r.length);
			for (n = 0; n != r.length; ++n) {
				a = a + 1 & 255;
				i = (i + t[a]) % 256;
				s = t[a];
				t[a] = t[i];
				t[i] = s;
				o[n] = r[n] ^ t[t[a] + t[i] & 255]
			}
			return o
		};
		e.md5 = function (e) {
			if (!t) throw new Error("Unsupported crypto");
			return t.createHash("md5").update(e).digest("hex")
		}
	};
	qr(Jr, typeof crypto !== "undefined" ? crypto : undefined);

	function et(e) {
		return parseInt(nt(e), 10) - 1
	}

	function rt(e) {
		return "" + (e + 1)
	}

	function tt(e) {
		return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
	}

	function nt(e) {
		return e.replace(/\$(\d+)$/, "$1")
	}

	function at(e) {
		var r = ot(e),
			t = 0,
			n = 0;
		for (; n !== r.length; ++n) t = 26 * t + r.charCodeAt(n) - 64;
		return t - 1
	}

	function it(e) {
		var r = "";
		for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
		return r
	}

	function st(e) {
		return e.replace(/^([A-Z])/, "$$$1")
	}

	function ot(e) {
		return e.replace(/^\$([A-Z])/, "$1")
	}

	function lt(e) {
		return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
	}

	function ft(e) {
		var r = lt(e);
		return {
			c: at(r[0]),
			r: et(r[1])
		}
	}

	function ct(e) {
		return it(e.c) + rt(e.r)
	}

	function ut(e) {
		var r = e.split(":").map(ft);
		return {
			s: r[0],
			e: r[r.length - 1]
		}
	}

	function ht(e, r) {
		if (typeof r === "undefined" || typeof r === "number") {
			return ht(e.s, e.e)
		}
		if (typeof e !== "string") e = ct(e);
		if (typeof r !== "string") r = ct(r);
		return e == r ? e : e + ":" + r
	}

	function dt(e) {
		var r = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		var t = 0,
			n = 0,
			a = 0;
		var i = e.length;
		for (t = 0; n < i; ++n) {
			if ((a = e.charCodeAt(n) - 64) < 1 || a > 26) break;
			t = 26 * t + a
		}
		r.s.c = --t;
		for (t = 0; n < i; ++n) {
			if ((a = e.charCodeAt(n) - 48) < 0 || a > 9) break;
			t = 10 * t + a
		}
		r.s.r = --t;
		if (n === i || e.charCodeAt(++n) === 58) {
			r.e.c = r.s.c;
			r.e.r = r.s.r;
			return r
		}
		for (t = 0; n != i; ++n) {
			if ((a = e.charCodeAt(n) - 64) < 1 || a > 26) break;
			t = 26 * t + a
		}
		r.e.c = --t;
		for (t = 0; n != i; ++n) {
			if ((a = e.charCodeAt(n) - 48) < 0 || a > 9) break;
			t = 10 * t + a
		}
		r.e.r = --t;
		return r
	}

	function pt(e, r) {
		var t = e.t == "d" && r instanceof Date;
		if (e.z != null) try {
			return e.w = I.format(e.z, t ? q(r) : r)
		} catch (e) {}
		try {
			return e.w = I.format((e.XF || {}).numFmtId || (t ? 14 : 0), t ? q(r) : r)
		} catch (e) {
			return "" + r
		}
	}

	function vt(e, r, t) {
		if (e == null || e.t == null || e.t == "z") return "";
		if (e.w !== undefined) return e.w;
		if (e.t == "d" && !e.z && t && t.dateNF) e.z = t.dateNF;
		if (r == undefined) return pt(e, e.v);
		return pt(e, r)
	}

	function gt(e, r) {
		var t = r && r.sheet ? r.sheet : "Sheet1";
		var n = {};
		n[t] = e;
		return {
			SheetNames: [t],
			Sheets: n
		}
	}

	function mt(e, r, t) {
		var n = t || {};
		var a = e ? Array.isArray(e) : n.dense;
		if (v != null && a == null) a = v;
		var i = e || (a ? [] : {});
		var s = 0,
			o = 0;
		if (i && n.origin != null) {
			if (typeof n.origin == "number") s = n.origin;
			else {
				var l = typeof n.origin == "string" ? ft(n.origin) : n.origin;
				s = l.r;
				o = l.c
			}
		}
		var f = {
			s: {
				c: 1e7,
				r: 1e7
			},
			e: {
				c: 0,
				r: 0
			}
		};
		if (i["!ref"]) {
			var c = dt(i["!ref"]);
			f.s.c = c.s.c;
			f.s.r = c.s.r;
			f.e.c = Math.max(f.e.c, c.e.c);
			f.e.r = Math.max(f.e.r, c.e.r);
			if (s == -1) f.e.r = s = c.e.r + 1
		}
		for (var u = 0; u != r.length; ++u) {
			if (!r[u]) continue;
			if (!Array.isArray(r[u])) throw new Error("aoa_to_sheet expects an array of arrays");
			for (var h = 0; h != r[u].length; ++h) {
				if (typeof r[u][h] === "undefined") continue;
				var d = {
					v: r[u][h]
				};
				var p = s + u,
					g = o + h;
				if (f.s.r > p) f.s.r = p;
				if (f.s.c > g) f.s.c = g;
				if (f.e.r < p) f.e.r = p;
				if (f.e.c < g) f.e.c = g;
				if (r[u][h] && typeof r[u][h] === "object" && !Array.isArray(r[u][h]) && !(r[u][h] instanceof Date)) d = r[u][h];
				else {
					if (Array.isArray(d.v)) {
						d.f = r[u][h][1];
						d.v = d.v[0]
					}
					if (d.v === null) {
						if (d.f) d.t = "n";
						else if (!n.sheetStubs) continue;
						else d.t = "z"
					} else if (typeof d.v === "number") d.t = "n";
					else if (typeof d.v === "boolean") d.t = "b";
					else if (d.v instanceof Date) {
						d.z = n.dateNF || I._table[14];
						if (n.cellDates) {
							d.t = "d";
							d.w = I.format(d.z, q(d.v))
						} else {
							d.t = "n";
							d.v = q(d.v);
							d.w = I.format(d.z, d.v)
						}
					} else d.t = "s"
				}
				if (a) {
					if (!i[p]) i[p] = [];
					i[p][g] = d
				} else {
					var m = ct({
						c: g,
						r: p
					});
					i[m] = d
				}
			}
		}
		if (f.s.c < 1e7) i["!ref"] = ht(f);
		return i
	}

	function bt(e, r) {
		return mt(null, e, r)
	}

	function Ct(e, r) {
		if (!r) r = Xr(4);
		r._W(4, e);
		return r
	}

	function Et(e) {
		var r = e._R(4);
		return r === 0 ? "" : e._R(r, "dbcs")
	}

	function kt(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Xr(4 + 2 * e.length)
		}
		r._W(4, e.length);
		if (e.length > 0) r._W(0, e, "dbcs");
		return t ? r.slice(0, r.l) : r
	}

	function St(e) {
		return {
			ich: e._R(2),
			ifnt: e._R(2)
		}
	}

	function wt(e, r) {
		if (!r) r = Xr(4);
		r._W(2, e.ich || 0);
		r._W(2, e.ifnt || 0);
		return r
	}

	function At(e, r) {
		var t = e.l;
		var n = e._R(1);
		var a = Et(e);
		var i = [];
		var s = {
			t: a,
			h: a
		};
		if ((n & 1) !== 0) {
			var o = e._R(4);
			for (var l = 0; l != o; ++l) i.push(St(e));
			s.r = i
		} else s.r = [{
			ich: 0,
			ifnt: 0
		}];
		e.l = t + r;
		return s
	}

	function _t(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Xr(15 + 4 * e.t.length)
		}
		r._W(1, 0);
		kt(e.t, r);
		return t ? r.slice(0, r.l) : r
	}
	var Rt = At;

	function Bt(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Xr(23 + 4 * e.t.length)
		}
		r._W(1, 1);
		kt(e.t, r);
		r._W(4, 1);
		wt({
			ich: 0,
			ifnt: 0
		}, r);
		return t ? r.slice(0, r.l) : r
	}

	function Tt(e) {
		var r = e._R(4);
		var t = e._R(2);
		t += e._R(1) << 16;
		e.l++;
		return {
			c: r,
			iStyleRef: t
		}
	}

	function yt(e, r) {
		if (r == null) r = Xr(8);
		r._W(-4, e.c);
		r._W(3, e.iStyleRef || e.s);
		r._W(1, 0);
		return r
	}
	var xt = Et;
	var It = kt;

	function Dt(e) {
		var r = e._R(4);
		return r === 0 || r === 4294967295 ? "" : e._R(r, "dbcs")
	}

	function Ft(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Xr(127)
		}
		r._W(4, e.length > 0 ? e.length : 4294967295);
		if (e.length > 0) r._W(0, e, "dbcs");
		return t ? r.slice(0, r.l) : r
	}
	var Ot = Et;
	var Pt = Dt;
	var Nt = Ft;

	function Lt(e) {
		var r = e.slice(e.l, e.l + 4);
		var t = r[0] & 1,
			n = r[0] & 2;
		e.l += 4;
		r[0] &= 252;
		var a = n === 0 ? Br([0, 0, 0, 0, r[0], r[1], r[2], r[3]], 0) : Or(r, 0) >> 2;
		return t ? a / 100 : a
	}

	function Mt(e, r) {
		if (r == null) r = Xr(4);
		var t = 0,
			n = 0,
			a = e * 100;
		if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29) {
			n = 1
		} else if (a == (a | 0) && a >= -(1 << 29) && a < 1 << 29) {
			n = 1;
			t = 1
		}
		if (n) r._W(-4, ((t ? a : e) << 2) + (t + 2));
		else throw new Error("unsupported RkNumber " + e)
	}

	function Wt(e) {
		var r = {
			s: {},
			e: {}
		};
		r.s.r = e._R(4);
		r.e.r = e._R(4);
		r.s.c = e._R(4);
		r.e.c = e._R(4);
		return r
	}

	function Ut(e, r) {
		if (!r) r = Xr(16);
		r._W(4, e.s.r);
		r._W(4, e.e.r);
		r._W(4, e.s.c);
		r._W(4, e.e.c);
		return r
	}
	var Ht = Wt;
	var Vt = Ut;

	function zt(e) {
		return e._R(8, "f")
	}

	function Xt(e, r) {
		return (r || Xr(8))._W(8, e, "f")
	}
	var Gt = {
		0: "#NULL!",
		7: "#DIV/0!",
		15: "#VALUE!",
		23: "#REF!",
		29: "#NAME?",
		36: "#NUM!",
		42: "#N/A",
		43: "#GETTING_DATA",
		255: "#WTF?"
	};
	var jt = Y(Gt);

	function Kt(e) {
		var r = {};
		var t = e._R(1);
		var n = t >>> 1;
		var a = e._R(1);
		var i = e._R(2, "i");
		var s = e._R(1);
		var o = e._R(1);
		var l = e._R(1);
		e.l++;
		switch (n) {
		case 0:
			r.auto = 1;
			break;
		case 1:
			r.index = a;
			var f = Sn[a];
			if (f) r.rgb = Ko(f);
			break;
		case 2:
			r.rgb = Ko([s, o, l]);
			break;
		case 3:
			r.theme = a;
			break
		}
		if (i != 0) r.tint = i > 0 ? i / 32767 : i / 32768;
		return r
	}

	function Yt(e, r) {
		if (!r) r = Xr(8);
		if (!e || e.auto) {
			r._W(4, 0);
			r._W(4, 0);
			return r
		}
		if (e.index) {
			r._W(1, 2);
			r._W(1, e.index)
		} else if (e.theme) {
			r._W(1, 6);
			r._W(1, e.theme)
		} else {
			r._W(1, 5);
			r._W(1, 0)
		}
		var t = e.tint || 0;
		if (t > 0) t *= 32767;
		else if (t < 0) t *= 32768;
		r._W(2, t);
		if (!e.rgb) {
			r._W(2, 0);
			r._W(1, 0);
			r._W(1, 0)
		} else {
			var n = e.rgb || "FFFFFF";
			r._W(1, parseInt(n.slice(0, 2), 16));
			r._W(1, parseInt(n.slice(2, 4), 16));
			r._W(1, parseInt(n.slice(4, 6), 16));
			r._W(1, 255)
		}
		return r
	}

	function $t(e) {
		var r = e._R(1);
		e.l++;
		var t = {
			fItalic: r & 2,
			fStrikeout: r & 8,
			fOutline: r & 16,
			fShadow: r & 32,
			fCondense: r & 64,
			fExtend: r & 128
		};
		return t
	}

	function Zt(e, r) {
		if (!r) r = Xr(2);
		var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 :
			0);
		r._W(1, t);
		r._W(1, 0);
		return r
	}

	function Qt(e, r) {
		var t = {
			2: "BITMAP",
			3: "METAFILEPICT",
			8: "DIB",
			14: "ENHMETAFILE"
		};
		var n = e._R(4);
		switch (n) {
		case 0:
			return "";
		case 4294967295:
			;
		case 4294967294:
			return t[e._R(4)] || ""
		}
		if (n > 400) throw new Error("Unsupported Clipboard: " + n.toString(16));
		e.l -= 4;
		return e._R(0, r == 1 ? "lpstr" : "lpwstr")
	}

	function Jt(e) {
		return Qt(e, 1)
	}

	function qt(e) {
		return Qt(e, 2)
	}
	var en = 2;
	var rn = 3;
	var tn = 11;
	var nn = 12;
	var an = 19;
	var sn = 30;
	var on = 64;
	var ln = 65;
	var fn = 71;
	var cn = 4096;
	var un = 80;
	var hn = 81;
	var dn = [un, hn];
	var pn = {
		1: {
			n: "CodePage",
			t: en
		},
		2: {
			n: "Category",
			t: un
		},
		3: {
			n: "PresentationFormat",
			t: un
		},
		4: {
			n: "ByteCount",
			t: rn
		},
		5: {
			n: "LineCount",
			t: rn
		},
		6: {
			n: "ParagraphCount",
			t: rn
		},
		7: {
			n: "SlideCount",
			t: rn
		},
		8: {
			n: "NoteCount",
			t: rn
		},
		9: {
			n: "HiddenCount",
			t: rn
		},
		10: {
			n: "MultimediaClipCount",
			t: rn
		},
		11: {
			n: "ScaleCrop",
			t: tn
		},
		12: {
			n: "HeadingPairs",
			t: cn | nn
		},
		13: {
			n: "TitlesOfParts",
			t: cn | sn
		},
		14: {
			n: "Manager",
			t: un
		},
		15: {
			n: "Company",
			t: un
		},
		16: {
			n: "LinksUpToDate",
			t: tn
		},
		17: {
			n: "CharacterCount",
			t: rn
		},
		19: {
			n: "SharedDoc",
			t: tn
		},
		22: {
			n: "HyperlinksChanged",
			t: tn
		},
		23: {
			n: "AppVersion",
			t: rn,
			p: "version"
		},
		24: {
			n: "DigSig",
			t: ln
		},
		26: {
			n: "ContentType",
			t: un
		},
		27: {
			n: "ContentStatus",
			t: un
		},
		28: {
			n: "Language",
			t: un
		},
		29: {
			n: "Version",
			t: un
		},
		255: {}
	};
	var vn = {
		1: {
			n: "CodePage",
			t: en
		},
		2: {
			n: "Title",
			t: un
		},
		3: {
			n: "Subject",
			t: un
		},
		4: {
			n: "Author",
			t: un
		},
		5: {
			n: "Keywords",
			t: un
		},
		6: {
			n: "Comments",
			t: un
		},
		7: {
			n: "Template",
			t: un
		},
		8: {
			n: "LastAuthor",
			t: un
		},
		9: {
			n: "RevNumber",
			t: un
		},
		10: {
			n: "EditTime",
			t: on
		},
		11: {
			n: "LastPrinted",
			t: on
		},
		12: {
			n: "CreatedDate",
			t: on
		},
		13: {
			n: "ModifiedDate",
			t: on
		},
		14: {
			n: "PageCount",
			t: rn
		},
		15: {
			n: "WordCount",
			t: rn
		},
		16: {
			n: "CharCount",
			t: rn
		},
		17: {
			n: "Thumbnail",
			t: fn
		},
		18: {
			n: "Application",
			t: un
		},
		19: {
			n: "DocSecurity",
			t: rn
		},
		255: {}
	};
	var gn = {
		2147483648: {
			n: "Locale",
			t: an
		},
		2147483651: {
			n: "Behavior",
			t: an
		},
		1919054434: {}
	};
	(function () {
		for (var e in gn)
			if (gn.hasOwnProperty(e)) pn[e] = vn[e] = gn[e]
	})();
	var mn = j(pn, "n");
	var bn = j(vn, "n");
	var Cn = {
		1: "US",
		2: "CA",
		3: "",
		7: "RU",
		20: "EG",
		30: "GR",
		31: "NL",
		32: "BE",
		33: "FR",
		34: "ES",
		36: "HU",
		39: "IT",
		41: "CH",
		43: "AT",
		44: "GB",
		45: "DK",
		46: "SE",
		47: "NO",
		48: "PL",
		49: "DE",
		52: "MX",
		55: "BR",
		61: "AU",
		64: "NZ",
		66: "TH",
		81: "JP",
		82: "KR",
		84: "VN",
		86: "CN",
		90: "TR",
		105: "JS",
		213: "DZ",
		216: "MA",
		218: "LY",
		351: "PT",
		354: "IS",
		358: "FI",
		420: "CZ",
		886: "TW",
		961: "LB",
		962: "JO",
		963: "SY",
		964: "IQ",
		965: "KW",
		966: "SA",
		971: "AE",
		972: "IL",
		974: "QA",
		981: "IR",
		65535: "US"
	};
	var En = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid",
		"darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"
	];

	function kn(e) {
		return e.map(function (e) {
			return [e >> 16 & 255, e >> 8 & 255, e & 255]
		})
	}
	var Sn = kn([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535,
		8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316,
		13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052,
		13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392,
		10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	]);
	var wn = {
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
		"application/vnd.ms-excel.binIndexWs": "TODO",
		"application/vnd.ms-excel.intlmacrosheet": "TODO",
		"application/vnd.ms-excel.binIndexMs": "TODO",
		"application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
		"application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
		"application/vnd.ms-excel.pivotTable": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
		"application/vnd.ms-office.chartcolorstyle+xml": "TODO",
		"application/vnd.ms-office.chartstyle+xml": "TODO",
		"application/vnd.ms-excel.calcChain": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
		"application/vnd.ms-office.activeX": "TODO",
		"application/vnd.ms-office.activeX+xml": "TODO",
		"application/vnd.ms-excel.attachedToolbars": "TODO",
		"application/vnd.ms-excel.connections": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
		"application/vnd.ms-excel.externalLink": "links",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
		"application/vnd.ms-excel.sheetMetadata": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "TODO",
		"application/vnd.ms-excel.pivotCacheDefinition": "TODO",
		"application/vnd.ms-excel.pivotCacheRecords": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
		"application/vnd.ms-excel.queryTable": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
		"application/vnd.ms-excel.userNames": "TODO",
		"application/vnd.ms-excel.revisionHeaders": "TODO",
		"application/vnd.ms-excel.revisionLog": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
		"application/vnd.ms-excel.tableSingleCells": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
		"application/vnd.ms-excel.slicer": "TODO",
		"application/vnd.ms-excel.slicerCache": "TODO",
		"application/vnd.ms-excel.slicer+xml": "TODO",
		"application/vnd.ms-excel.slicerCache+xml": "TODO",
		"application/vnd.ms-excel.wsSortMap": "TODO",
		"application/vnd.ms-excel.table": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.theme+xml": "themes",
		"application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
		"application/vnd.ms-excel.Timeline+xml": "TODO",
		"application/vnd.ms-excel.TimelineCache+xml": "TODO",
		"application/vnd.ms-office.vbaProject": "vba",
		"application/vnd.ms-office.vbaProjectSignature": "vba",
		"application/vnd.ms-office.volatileDependencies": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
		"application/vnd.ms-excel.controlproperties+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.model+data": "TODO",
		"application/vnd.ms-excel.Survey+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
		"application/vnd.openxmlformats-package.relationships+xml": "rels",
		"application/vnd.openxmlformats-officedocument.oleObject": "TODO",
		"image/png": "TODO",
		sheet: "js"
	};
	var An = function () {
		var e = {
			workbooks: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
				xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
				xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
				xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
				xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
			},
			strs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
				xlsb: "application/vnd.ms-excel.sharedStrings"
			},
			comments: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
				xlsb: "application/vnd.ms-excel.comments"
			},
			sheets: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
				xlsb: "application/vnd.ms-excel.worksheet"
			},
			charts: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
				xlsb: "application/vnd.ms-excel.chartsheet"
			},
			dialogs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
				xlsb: "application/vnd.ms-excel.dialogsheet"
			},
			macros: {
				xlsx: "application/vnd.ms-excel.macrosheet+xml",
				xlsb: "application/vnd.ms-excel.macrosheet"
			},
			styles: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
				xlsb: "application/vnd.ms-excel.styles"
			}
		};
		G(e).forEach(function (r) {
			["xlsm", "xlam"].forEach(function (t) {
				if (!e[r][t]) e[r][t] = e[r].xlsx
			})
		});
		G(e).forEach(function (r) {
			G(e[r]).forEach(function (t) {
				wn[e[r][t]] = r
			})
		});
		return e
	}();
	var _n = Z(wn);
	ir.CT = "http://schemas.openxmlformats.org/package/2006/content-types";

	function Rn() {
		return {
			workbooks: [],
			sheets: [],
			charts: [],
			dialogs: [],
			macros: [],
			rels: [],
			strs: [],
			comments: [],
			links: [],
			coreprops: [],
			extprops: [],
			custprops: [],
			themes: [],
			styles: [],
			calcchains: [],
			vba: [],
			drawings: [],
			TODO: [],
			xmlns: ""
		}
	}

	function Bn(e) {
		var r = Rn();
		if (!e || !e.match) return r;
		var t = {};
		(e.match(Ae) || []).forEach(function (e) {
			var n = Be(e);
			switch (n[0].replace(_e, "<")) {
			case "<?xml":
				break;
			case "<Types":
				r.xmlns = n["xmlns" + (n[0].match(/<(\w+):/) || ["", ""])[1]];
				break;
			case "<Default":
				t[n.Extension] = n.ContentType;
				break;
			case "<Override":
				if (r[wn[n.ContentType]] !== undefined) r[wn[n.ContentType]].push(n.PartName);
				break
			}
		});
		if (r.xmlns !== ir.CT) throw new Error("Unknown Namespace: " + r.xmlns);
		r.calcchain = r.calcchains.length > 0 ? r.calcchains[0] : "";
		r.sst = r.strs.length > 0 ? r.strs[0] : "";
		r.style = r.styles.length > 0 ? r.styles[0] : "";
		r.defaults = t;
		delete r.calcchains;
		return r
	}
	var Tn = tr("Types", null, {
		xmlns: ir.CT,
		"xmlns:xsd": ir.xsd,
		"xmlns:xsi": ir.xsi
	});
	var yn = [
		["xml", "application/xml"],
		["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
		["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
		["bmp", "image/bmp"],
		["png", "image/png"],
		["gif", "image/gif"],
		["emf", "image/x-emf"],
		["wmf", "image/x-wmf"],
		["jpg", "image/jpeg"],
		["jpeg", "image/jpeg"],
		["tif", "image/tiff"],
		["tiff", "image/tiff"],
		["pdf", "application/pdf"],
		["rels", _n.rels[0]]
	].map(function (e) {
		return tr("Default", null, {
			Extension: e[0],
			ContentType: e[1]
		})
	});

	function xn(e, r) {
		var t = [],
			n;
		t[t.length] = Se;
		t[t.length] = Tn;
		t = t.concat(yn);
		var a = function (a) {
			if (e[a] && e[a].length > 0) {
				n = e[a][0];
				t[t.length] = tr("Override", null, {
					PartName: (n[0] == "/" ? "" : "/") + n,
					ContentType: An[a][r.bookType || "xlsx"]
				})
			}
		};
		var i = function (n) {
			(e[n] || []).forEach(function (e) {
				t[t.length] = tr("Override", null, {
					PartName: (e[0] == "/" ? "" : "/") + e,
					ContentType: An[n][r.bookType || "xlsx"]
				})
			})
		};
		var s = function (r) {
			(e[r] || []).forEach(function (e) {
				t[t.length] = tr("Override", null, {
					PartName: (e[0] == "/" ? "" : "/") + e,
					ContentType: _n[r][0]
				})
			})
		};
		a("workbooks");
		i("sheets");
		i("charts");
		s("themes");
		["strs", "styles"].forEach(a);
		["coreprops", "extprops", "custprops"].forEach(s);
		s("vba");
		s("comments");
		s("drawings");
		if (t.length > 2) {
			t[t.length] = "</Types>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	var In = {
		WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
		VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
		VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
	};

	function Dn(e) {
		var r = e.lastIndexOf("/");
		return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels"
	}

	function Fn(e, r) {
		if (!e) return e;
		if (r.charAt(0) !== "/") {
			r = "/" + r
		}
		var t = {};
		var n = {};
		(e.match(Ae) || []).forEach(function (e) {
			var a = Be(e);
			if (a[0] === "<Relationship") {
				var i = {};
				i.Type = a.Type;
				i.Target = a.Target;
				i.Id = a.Id;
				i.TargetMode = a.TargetMode;
				var s = a.TargetMode === "External" ? a.Target : ke(a.Target, r);
				t[s] = i;
				n[a.Id] = i
			}
		});
		t["!id"] = n;
		return t
	}
	ir.RELS = "http://schemas.openxmlformats.org/package/2006/relationships";
	var On = tr("Relationships", null, {
		xmlns: ir.RELS
	});

	function Pn(e) {
		var r = [Se, On];
		G(e["!id"]).forEach(function (t) {
			r[r.length] = tr("Relationship", null, e["!id"][t])
		});
		if (r.length > 2) {
			r[r.length] = "</Relationships>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}

	function Nn(e, r, t, n, a) {
		if (!a) a = {};
		if (!e["!id"]) e["!id"] = {};
		if (r < 0)
			for (r = 1; e["!id"]["rId" + r]; ++r) {}
		a.Id = "rId" + r;
		a.Type = n;
		a.Target = t;
		if (a.Type == In.HLINK) a.TargetMode = "External";
		if (e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + r);
		e["!id"][a.Id] = a;
		e[("/" + a.Target).replace("//", "/")] = a;
		return r
	}
	var Ln = "application/vnd.oasis.opendocument.spreadsheet";

	function Mn(e, r) {
		var t = Lp(e);
		var n;
		var a;
		while (n = Mp.exec(t)) switch (n[3]) {
		case "manifest":
			break;
		case "file-entry":
			a = Be(n[0], false);
			if (a.path == "/" && a.type !== Ln) throw new Error("This OpenDocument is not a spreadsheet");
			break;
		case "encryption-data":
			;
		case "algorithm":
			;
		case "start-key-generation":
			;
		case "key-derivation":
			throw new Error("Unsupported ODS Encryption");
		default:
			if (r && r.WTF) throw n
		}
	}

	function Wn(e) {
		var r = [Se];
		r.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');
		r.push(
			'  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n'
		);
		for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] +
			'"/>\n');
		r.push("</manifest:manifest>");
		return r.join("")
	}

	function Un(e, r, t) {
		return ['  <rdf:Description rdf:about="' + e + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t ||
			"odf") + "#" + r + '"/>\n', "  </rdf:Description>\n"].join("")
	}

	function Hn(e, r) {
		return ['  <rdf:Description rdf:about="' + e + '">\n',
			'    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + '"/>\n',
			"  </rdf:Description>\n"
		].join("")
	}

	function Vn(e) {
		var r = [Se];
		r.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');
		for (var t = 0; t != e.length; ++t) {
			r.push(Un(e[t][0], e[t][1]));
			r.push(Hn("", e[t][0]))
		}
		r.push(Un("", "Document", "pkg"));
		r.push("</rdf:RDF>");
		return r.join("")
	}
	var zn = function () {
		var r =
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet' +
			"JS " + e.version + "</meta:generator></office:meta></office:document-meta>";
		return function e() {
			return r
		}
	}();
	var Xn = [
		["cp:category", "Category"],
		["cp:contentStatus", "ContentStatus"],
		["cp:keywords", "Keywords"],
		["cp:lastModifiedBy", "LastAuthor"],
		["cp:lastPrinted", "LastPrinted"],
		["cp:revision", "RevNumber"],
		["cp:version", "Version"],
		["dc:creator", "Author"],
		["dc:description", "Comments"],
		["dc:identifier", "Identifier"],
		["dc:language", "Language"],
		["dc:subject", "Subject"],
		["dc:title", "Title"],
		["dcterms:created", "CreatedDate", "date"],
		["dcterms:modified", "ModifiedDate", "date"]
	];
	ir.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
	In.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
	var Gn = function () {
		var e = new Array(Xn.length);
		for (var r = 0; r < Xn.length; ++r) {
			var t = Xn[r];
			var n = "(?:" + t[0].slice(0, t[0].indexOf(":")) + ":)" + t[0].slice(t[0].indexOf(":") + 1);
			e[r] = new RegExp("<" + n + "[^>]*>([\\s\\S]*?)</" + n + ">")
		}
		return e
	}();

	function jn(e) {
		var r = {};
		e = Ve(e);
		for (var t = 0; t < Xn.length; ++t) {
			var n = Xn[t],
				a = e.match(Gn[t]);
			if (a != null && a.length > 0) r[n[1]] = a[1];
			if (n[2] === "date" && r[n[1]]) r[n[1]] = ae(r[n[1]])
		}
		return r
	}
	var Kn = tr("cp:coreProperties", null, {
		"xmlns:cp": ir.CORE_PROPS,
		"xmlns:dc": ir.dc,
		"xmlns:dcterms": ir.dcterms,
		"xmlns:dcmitype": ir.dcmitype,
		"xmlns:xsi": ir.xsi
	});

	function Yn(e, r, t, n, a) {
		if (a[e] != null || r == null || r === "") return;
		a[e] = r;
		n[n.length] = t ? tr(e, r, t) : er(e, r)
	}

	function $n(e, r) {
		var t = r || {};
		var n = [Se, Kn],
			a = {};
		if (!e && !t.Props) return n.join("");
		if (e) {
			if (e.CreatedDate != null) Yn("dcterms:created", typeof e.CreatedDate === "string" ? e.CreatedDate : nr(e.CreatedDate, t.WTF), {
				"xsi:type": "dcterms:W3CDTF"
			}, n, a);
			if (e.ModifiedDate != null) Yn("dcterms:modified", typeof e.ModifiedDate === "string" ? e.ModifiedDate : nr(e.ModifiedDate, t.WTF), {
				"xsi:type": "dcterms:W3CDTF"
			}, n, a)
		}
		for (var i = 0; i != Xn.length; ++i) {
			var s = Xn[i];
			var o = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
			if (o === true) o = "1";
			else if (o === false) o = "0";
			else if (typeof o == "number") o = String(o);
			if (o != null) Yn(s[0], o, null, n, a)
		}
		if (n.length > 2) {
			n[n.length] = "</cp:coreProperties>";
			n[1] = n[1].replace("/>", ">")
		}
		return n.join("")
	}
	var Zn = [
		["Application", "Application", "string"],
		["AppVersion", "AppVersion", "string"],
		["Company", "Company", "string"],
		["DocSecurity", "DocSecurity", "string"],
		["Manager", "Manager", "string"],
		["HyperlinksChanged", "HyperlinksChanged", "bool"],
		["SharedDoc", "SharedDoc", "bool"],
		["LinksUpToDate", "LinksUpToDate", "bool"],
		["ScaleCrop", "ScaleCrop", "bool"],
		["HeadingPairs", "HeadingPairs", "raw"],
		["TitlesOfParts", "TitlesOfParts", "raw"]
	];
	ir.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";
	In.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
	var Qn = ["Worksheets", "SheetNames", "NamedRanges", "DefinedNames", "Chartsheets", "ChartNames"];

	function Jn(e, r, t, n) {
		var a = [];
		if (typeof e == "string") a = Je(e, n);
		else
			for (var i = 0; i < e.length; ++i) a = a.concat(e[i].map(function (e) {
				return {
					v: e
				}
			}));
		var s = typeof r == "string" ? Je(r, n).map(function (e) {
			return e.v
		}) : r;
		var o = 0,
			l = 0;
		if (s.length > 0)
			for (var f = 0; f !== a.length; f += 2) {
				l = +a[f + 1].v;
				switch (a[f].v) {
				case "Worksheets":
					;
				case "å·¥ä½œè¡¨":
					;
				case "Ð›Ð¸ÑÑ‚Ñ‹":
					;
				case "Ø£ÙˆØ±Ø§Ù‚ Ø§Ù„Ø¹Ù…Ù„":
					;
				case "ãƒ¯ãƒ¼ã‚¯ã‚·ãƒ¼ãƒˆ":
					;
				case "×’×œ×™×•× ×•×ª ×¢×‘×•×“×”":
					;
				case "ArbeitsblÃ¤tter":
					;
				case "Ã‡alÄ±ÅŸma SayfalarÄ±":
					;
				case "Feuilles de calcul":
					;
				case "Fogli di lavoro":
					;
				case "Folhas de cÃ¡lculo":
					;
				case "Planilhas":
					;
				case "Regneark":
					;
				case "Werkbladen":
					t.Worksheets = l;
					t.SheetNames = s.slice(o, o + l);
					break;
				case "Named Ranges":
					;
				case "åå‰ä»˜ãä¸€è¦§":
					;
				case "Benannte Bereiche":
					;
				case "Navngivne omrÃ¥der":
					t.NamedRanges = l;
					t.DefinedNames = s.slice(o, o + l);
					break;
				case "Charts":
					;
				case "Diagramme":
					t.Chartsheets = l;
					t.ChartNames = s.slice(o, o + l);
					break
				}
				o += l
			}
	}

	function qn(e, r, t) {
		var n = {};
		if (!r) r = {};
		e = Ve(e);
		Zn.forEach(function (t) {
			switch (t[2]) {
			case "string":
				r[t[1]] = (e.match(Ke(t[0])) || [])[1];
				break;
			case "bool":
				r[t[1]] = (e.match(Ke(t[0])) || [])[1] === "true";
				break;
			case "raw":
				var a = e.match(new RegExp("<" + t[0] + "[^>]*>([\\s\\S]*?)</" + t[0] + ">"));
				if (a && a.length > 0) n[t[1]] = a[1];
				break
			}
		});
		if (n.HeadingPairs && n.TitlesOfParts) Jn(n.HeadingPairs, n.TitlesOfParts, r, t);
		return r
	}
	var ea = tr("Properties", null, {
		xmlns: ir.EXT_PROPS,
		"xmlns:vt": ir.vt
	});

	function ra(e) {
		var r = [],
			t = tr;
		if (!e) e = {};
		e.Application = "SheetJS";
		r[r.length] = Se;
		r[r.length] = ea;
		Zn.forEach(function (n) {
			if (e[n[1]] === undefined) return;
			var a;
			switch (n[2]) {
			case "string":
				a = String(e[n[1]]);
				break;
			case "bool":
				a = e[n[1]] ? "true" : "false";
				break
			}
			if (a !== undefined) r[r.length] = t(n[0], a)
		});
		r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), {
			size: 2,
			baseType: "variant"
		}));
		r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function (e) {
			return "<vt:lpstr>" + Oe(e) + "</vt:lpstr>"
		}).join(""), {
			size: e.Worksheets,
			baseType: "lpstr"
		}));
		if (r.length > 2) {
			r[r.length] = "</Properties>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	ir.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
	In.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
	var ta = /<[^>]+>[^<]*/g;

	function na(e, r) {
		var t = {},
			n = "";
		var a = e.match(ta);
		if (a)
			for (var i = 0; i != a.length; ++i) {
				var s = a[i],
					o = Be(s);
				switch (o[0]) {
				case "<?xml":
					break;
				case "<Properties":
					break;
				case "<property":
					n = o.name;
					break;
				case "</property>":
					n = null;
					break;
				default:
					if (s.indexOf("<vt:") === 0) {
						var l = s.split(">");
						var f = l[0].slice(4),
							c = l[1];
						switch (f) {
						case "lpstr":
							;
						case "bstr":
							;
						case "lpwstr":
							t[n] = Ie(c);
							break;
						case "bool":
							t[n] = He(c);
							break;
						case "i1":
							;
						case "i2":
							;
						case "i4":
							;
						case "i8":
							;
						case "int":
							;
						case "uint":
							t[n] = parseInt(c, 10);
							break;
						case "r4":
							;
						case "r8":
							;
						case "decimal":
							t[n] = parseFloat(c);
							break;
						case "filetime":
							;
						case "date":
							t[n] = ae(c);
							break;
						case "cy":
							;
						case "error":
							t[n] = Ie(c);
							break;
						default:
							if (f.slice(-1) == "/") break;
							if (r.WTF && typeof console !== "undefined") console.warn("Unexpected", s, f, l)
						}
					} else if (s.slice(0, 2) === "</") {} else if (r.WTF) throw new Error(s)
				}
			}
		return t
	}
	var aa = tr("Properties", null, {
		xmlns: ir.CUST_PROPS,
		"xmlns:vt": ir.vt
	});

	function ia(e) {
		var r = [Se, aa];
		if (!e) return r.join("");
		var t = 1;
		G(e).forEach(function n(a) {
			++t;
			r[r.length] = tr("property", ar(e[a]), {
				fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
				pid: t,
				name: a
			})
		});
		if (r.length > 2) {
			r[r.length] = "</Properties>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	var sa = {
		Title: "Title",
		Subject: "Subject",
		Author: "Author",
		Keywords: "Keywords",
		Comments: "Description",
		LastAuthor: "LastAuthor",
		RevNumber: "Revision",
		Application: "AppName",
		LastPrinted: "LastPrinted",
		CreatedDate: "Created",
		ModifiedDate: "LastSaved",
		Category: "Category",
		Manager: "Manager",
		Company: "Company",
		AppVersion: "Version",
		ContentStatus: "ContentStatus",
		Identifier: "Identifier",
		Language: "Language"
	};
	var oa = K(sa);

	function la(e, r, t) {
		r = oa[r] || r;
		e[r] = t
	}

	function fa(e, r) {
		var t = [];
		G(sa).map(function (e) {
			for (var r = 0; r < Xn.length; ++r)
				if (Xn[r][1] == e) return Xn[r];
			for (r = 0; r < Zn.length; ++r)
				if (Zn[r][1] == e) return Zn[r];
			throw e
		}).forEach(function (n) {
			if (e[n[1]] == null) return;
			var a = r && r.Props && r.Props[n[1]] != null ? r.Props[n[1]] : e[n[1]];
			switch (n[2]) {
			case "date":
				a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
				break
			}
			if (typeof a == "number") a = String(a);
			else if (a === true || a === false) {
				a = a ? "1" : "0"
			} else if (a instanceof Date) a = new Date(a).toISOString().replace(/\.\d*Z/, "");
			t.push(er(sa[n[1]] || n[1], a))
		});
		return tr("DocumentProperties", t.join(""), {
			xmlns: sr.o
		})
	}

	function ca(e, r) {
		var t = ["Worksheets", "SheetNames"];
		var n = "CustomDocumentProperties";
		var a = [];
		if (e) G(e).forEach(function (r) {
			if (!e.hasOwnProperty(r)) return;
			for (var n = 0; n < Xn.length; ++n)
				if (r == Xn[n][1]) return;
			for (n = 0; n < Zn.length; ++n)
				if (r == Zn[n][1]) return;
			for (n = 0; n < t.length; ++n)
				if (r == t[n]) return;
			var i = e[r];
			var s = "string";
			if (typeof i == "number") {
				s = "float";
				i = String(i)
			} else if (i === true || i === false) {
				s = "boolean";
				i = i ? "1" : "0"
			} else i = String(i);
			a.push(tr(Pe(r), i, {
				"dt:dt": s
			}))
		});
		if (r) G(r).forEach(function (t) {
			if (!r.hasOwnProperty(t)) return;
			if (e && e.hasOwnProperty(t)) return;
			var n = r[t];
			var i = "string";
			if (typeof n == "number") {
				i = "float";
				n = String(n)
			} else if (n === true || n === false) {
				i = "boolean";
				n = n ? "1" : "0"
			} else if (n instanceof Date) {
				i = "dateTime.tz";
				n = n.toISOString()
			} else n = String(n);
			a.push(tr(Pe(t), n, {
				"dt:dt": i
			}))
		});
		return "<" + n + ' xmlns="' + sr.o + '">' + a.join("") + "</" + n + ">"
	}

	function ua(e) {
		var r = e._R(4),
			t = e._R(4);
		return new Date((t / 1e7 * Math.pow(2, 32) + r / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "")
	}

	function ha(e) {
		var r = typeof e == "string" ? new Date(Date.parse(e)) : e;
		var t = r.getTime() / 1e3 + 11644473600;
		var n = t % Math.pow(2, 32),
			a = (t - n) / Math.pow(2, 32);
		n *= 1e7;
		a *= 1e7;
		var i = n / Math.pow(2, 32) | 0;
		if (i > 0) {
			n = n % Math.pow(2, 32);
			a += i
		}
		var s = Xr(8);
		s._W(4, n);
		s._W(4, a);
		return s
	}

	function da(e, r, t) {
		var n = e.l;
		var a = e._R(0, "lpstr-cp");
		if (t)
			while (e.l - n & 3) ++e.l;
		return a
	}

	function pa(e, r, t) {
		var n = e._R(0, "lpwstr");
		if (t) e.l += 4 - (n.length + 1 & 3) & 3;
		return n
	}

	function va(e, r, t) {
		if (r === 31) return pa(e);
		return da(e, r, t)
	}

	function ga(e, r, t) {
		return va(e, r, t === false ? 0 : 4)
	}

	function ma(e, r) {
		if (!r) throw new Error("VtUnalignedString must have positive length");
		return va(e, r, 0)
	}

	function ba(e) {
		var r = e._R(4);
		var t = [];
		for (var n = 0; n != r; ++n) t[n] = e._R(0, "lpstr-cp").replace(y, "");
		return t
	}

	function Ca(e) {
		return ba(e)
	}

	function Ea(e) {
		var r = Ra(e, hn);
		var t = Ra(e, rn);
		return [r, t]
	}

	function ka(e) {
		var r = e._R(4);
		var t = [];
		for (var n = 0; n != r / 2; ++n) t.push(Ea(e));
		return t
	}

	function Sa(e) {
		return ka(e)
	}

	function wa(e, r) {
		var t = e._R(4);
		var n = {};
		for (var a = 0; a != t; ++a) {
			var i = e._R(4);
			var s = e._R(4);
			n[i] = e._R(s, r === 1200 ? "utf16le" : "utf8").replace(y, "").replace(x, "!");
			if (r === 1200 && s % 2) e.l += 2
		}
		if (e.l & 3) e.l = e.l >> 2 + 1 << 2;
		return n
	}

	function Aa(e) {
		var r = e._R(4);
		var t = e.slice(e.l, e.l + r);
		e.l += r;
		if ((r & 3) > 0) e.l += 4 - (r & 3) & 3;
		return t
	}

	function _a(e) {
		var r = {};
		r.Size = e._R(4);
		e.l += r.Size + 3 - (r.Size - 1) % 4;
		return r
	}

	function Ra(e, r, t) {
		var n = e._R(2),
			a, i = t || {};
		e.l += 2;
		if (r !== nn)
			if (n !== r && dn.indexOf(r) === -1) throw new Error("Expected type " + r + " saw " + n);
		switch (r === nn ? n : r) {
		case 2:
			a = e._R(2, "i");
			if (!i.raw) e.l += 2;
			return a;
		case 3:
			a = e._R(4, "i");
			return a;
		case 11:
			return e._R(4) !== 0;
		case 19:
			a = e._R(4);
			return a;
		case 30:
			return da(e, n, 4).replace(y, "");
		case 31:
			return pa(e);
		case 64:
			return ua(e);
		case 65:
			return Aa(e);
		case 71:
			return _a(e);
		case 80:
			return ga(e, n, !i.raw).replace(y, "");
		case 81:
			return ma(e, n).replace(y, "");
		case 4108:
			return Sa(e);
		case 4126:
			return Ca(e);
		default:
			throw new Error("TypedPropertyValue unrecognized type " + r + " " + n)
		}
	}

	function Ba(e, r) {
		var t = Xr(4),
			n = Xr(4);
		t._W(4, e == 80 ? 31 : e);
		switch (e) {
		case 3:
			n._W(-4, r);
			break;
		case 5:
			n = Xr(8);
			n._W(8, r, "f");
			break;
		case 11:
			n._W(4, r ? 1 : 0);
			break;
		case 64:
			n = ha(r);
			break;
		case 31:
			;
		case 80:
			n = Xr(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2));
			n._W(4, r.length + 1);
			n._W(0, r, "dbcs");
			while (n.l != n.length) n._W(1, 0);
			break;
		default:
			throw new Error("TypedPropertyValue unrecognized type " + e + " " + r)
		}
		return T([t, n])
	}

	function Ta(e, r) {
		var t = e.l;
		var n = e._R(4);
		var a = e._R(4);
		var i = [],
			s = 0;
		var o = 0;
		var f = -1,
			c = {};
		for (s = 0; s != a; ++s) {
			var u = e._R(4);
			var h = e._R(4);
			i[s] = [u, h + t]
		}
		i.sort(function (e, r) {
			return e[1] - r[1]
		});
		var d = {};
		for (s = 0; s != a; ++s) {
			if (e.l !== i[s][1]) {
				var p = true;
				if (s > 0 && r) switch (r[i[s - 1][0]].t) {
				case 2:
					if (e.l + 2 === i[s][1]) {
						e.l += 2;
						p = false
					}
					break;
				case 80:
					if (e.l <= i[s][1]) {
						e.l = i[s][1];
						p = false
					}
					break;
				case 4108:
					if (e.l <= i[s][1]) {
						e.l = i[s][1];
						p = false
					}
					break
				}
				if ((!r || s == 0) && e.l <= i[s][1]) {
					p = false;
					e.l = i[s][1]
				}
				if (p) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s)
			}
			if (r) {
				var v = r[i[s][0]];
				d[v.n] = Ra(e, v.t, {
					raw: true
				});
				if (v.p === "version") d[v.n] = String(d[v.n] >> 16) + "." + ("0000" + String(d[v.n] & 65535)).slice(-4);
				if (v.n == "CodePage") switch (d[v.n]) {
				case 0:
					d[v.n] = 1252;
				case 874:
					;
				case 932:
					;
				case 936:
					;
				case 949:
					;
				case 950:
					;
				case 1250:
					;
				case 1251:
					;
				case 1253:
					;
				case 1254:
					;
				case 1255:
					;
				case 1256:
					;
				case 1257:
					;
				case 1258:
					;
				case 1e4:
					;
				case 1200:
					;
				case 1201:
					;
				case 1252:
					;
				case 65e3:
					;
				case -536:
					;
				case 65001:
					;
				case -535:
					l(o = d[v.n] >>> 0 & 65535);
					break;
				default:
					throw new Error("Unsupported CodePage: " + d[v.n])
				}
			} else {
				if (i[s][0] === 1) {
					o = d.CodePage = Ra(e, en);
					l(o);
					if (f !== -1) {
						var g = e.l;
						e.l = i[f][1];
						c = wa(e, o);
						e.l = g
					}
				} else if (i[s][0] === 0) {
					if (o === 0) {
						f = s;
						e.l = i[s + 1][1];
						continue
					}
					c = wa(e, o)
				} else {
					var m = c[i[s][0]];
					var b;
					switch (e[e.l]) {
					case 65:
						e.l += 4;
						b = Aa(e);
						break;
					case 30:
						e.l += 4;
						b = ga(e, e[e.l - 4]).replace(/\u0000+$/, "");
						break;
					case 31:
						e.l += 4;
						b = ga(e, e[e.l - 4]).replace(/\u0000+$/, "");
						break;
					case 3:
						e.l += 4;
						b = e._R(4, "i");
						break;
					case 19:
						e.l += 4;
						b = e._R(4);
						break;
					case 5:
						e.l += 4;
						b = e._R(8, "f");
						break;
					case 11:
						e.l += 4;
						b = La(e, 4);
						break;
					case 64:
						e.l += 4;
						b = ae(ua(e));
						break;
					default:
						throw new Error("unparsed value: " + e[e.l])
					}
					d[m] = b
				}
			}
		}
		e.l = t + n;
		return d
	}
	var ya = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"].concat(Qn);

	function xa(e) {
		switch (typeof e) {
		case "boolean":
			return 11;
		case "number":
			return (e | 0) == e ? 3 : 5;
		case "string":
			return 31;
		case "object":
			if (e instanceof Date) return 64;
			break
		}
		return -1
	}

	function Ia(e, r, t) {
		var n = Xr(8),
			a = [],
			i = [];
		var s = 8,
			o = 0;
		var l = Xr(8),
			f = Xr(8);
		l._W(4, 2);
		l._W(4, 1200);
		f._W(4, 1);
		i.push(l);
		a.push(f);
		s += 8 + l.length;
		if (!r) {
			f = Xr(8);
			f._W(4, 0);
			a.unshift(f);
			var c = [Xr(4)];
			c[0]._W(4, e.length);
			for (o = 0; o < e.length; ++o) {
				var u = e[o][0];
				l = Xr(4 + 4 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2));
				l._W(4, o + 2);
				l._W(4, u.length + 1);
				l._W(0, u, "dbcs");
				while (l.l != l.length) l._W(1, 0);
				c.push(l)
			}
			l = T(c);
			i.unshift(l);
			s += 8 + l.length
		}
		for (o = 0; o < e.length; ++o) {
			if (r && !r[e[o][0]]) continue;
			if (ya.indexOf(e[o][0]) > -1) continue;
			if (e[o][1] == null) continue;
			var h = e[o][1],
				d = 0;
			if (r) {
				d = +r[e[o][0]];
				var p = t[d];
				if (p.p == "version" && typeof h == "string") {
					var v = h.split(".");
					h = (+v[0] << 16) + (+v[1] || 0)
				}
				l = Ba(p.t, h)
			} else {
				var g = xa(h);
				if (g == -1) {
					g = 31;
					h = String(h)
				}
				l = Ba(g, h)
			}
			i.push(l);
			f = Xr(8);
			f._W(4, !r ? 2 + o : d);
			a.push(f);
			s += 8 + l.length
		}
		var m = 8 * (i.length + 1);
		for (o = 0; o < i.length; ++o) {
			a[o]._W(4, m);
			m += i[o].length
		}
		n._W(4, s);
		n._W(4, i.length);
		return T([n].concat(a).concat(i))
	}

	function Da(e, r, t) {
		var n = e.content;
		if (!n) return {};
		Vr(n, 0);
		var a, i, s, o, l = 0;
		n.chk("feff", "Byte Order: ");
		n._R(2);
		var f = n._R(4);
		var c = n._R(16);
		if (c !== U.utils.consts.HEADER_CLSID && c !== t) throw new Error("Bad PropertySet CLSID " + c);
		a = n._R(4);
		if (a !== 1 && a !== 2) throw new Error("Unrecognized #Sets: " + a);
		i = n._R(16);
		o = n._R(4);
		if (a === 1 && o !== n.l) throw new Error("Length mismatch: " + o + " !== " + n.l);
		else if (a === 2) {
			s = n._R(16);
			l = n._R(4)
		}
		var u = Ta(n, r);
		var h = {
			SystemIdentifier: f
		};
		for (var d in u) h[d] = u[d];
		h.FMTID = i;
		if (a === 1) return h;
		if (l - n.l == 2) n.l += 2;
		if (n.l !== l) throw new Error("Length mismatch 2: " + n.l + " !== " + l);
		var p;
		try {
			p = Ta(n, null)
		} catch (e) {}
		for (d in p) h[d] = p[d];
		h.FMTID = [i, s];
		return h
	}

	function Fa(e, r, t, n, a, i) {
		var s = Xr(a ? 68 : 48);
		var o = [s];
		s._W(2, 65534);
		s._W(2, 0);
		s._W(4, 842412599);
		s._W(16, U.utils.consts.HEADER_CLSID, "hex");
		s._W(4, a ? 2 : 1);
		s._W(16, r, "hex");
		s._W(4, a ? 68 : 48);
		var l = Ia(e, t, n);
		o.push(l);
		if (a) {
			var f = Ia(a, null, null);
			s._W(16, i, "hex");
			s._W(4, 68 + l.length);
			o.push(f)
		}
		return T(o)
	}

	function Oa(e, r) {
		e._R(r);
		return null
	}

	function Pa(e, r) {
		if (!r) r = Xr(e);
		for (var t = 0; t < e; ++t) r._W(1, 0);
		return r
	}

	function Na(e, r, t) {
		var n = [],
			a = e.l + r;
		while (e.l < a) n.push(t(e, a - e.l));
		if (a !== e.l) throw new Error("Slurp error");
		return n
	}

	function La(e, r) {
		return e._R(r) === 1
	}

	function Ma(e, r) {
		if (!r) r = Xr(2);
		r._W(2, +!!e);
		return r
	}

	function Wa(e) {
		return e._R(2, "u")
	}

	function Ua(e, r) {
		if (!r) r = Xr(2);
		r._W(2, e);
		return r
	}

	function Ha(e, r) {
		return Na(e, r, Wa)
	}

	function Va(e) {
		var r = e._R(1),
			t = e._R(1);
		return t === 1 ? r : r === 1
	}

	function za(e, r, t) {
		if (!t) t = Xr(2);
		t._W(1, +e);
		t._W(1, r == "e" ? 1 : 0);
		return t
	}

	function Xa(e, t, n) {
		var a = e._R(n && n.biff >= 12 ? 2 : 1);
		var i = "sbcs-cont";
		var s = r;
		if (n && n.biff >= 8) r = 1200;
		if (!n || n.biff == 8) {
			var o = e._R(1);
			if (o) {
				i = "dbcs-cont"
			}
		} else if (n.biff == 12) {
			i = "wstr"
		}
		if (n.biff >= 2 && n.biff <= 5) i = "cpstr";
		var l = a ? e._R(a, i) : "";
		r = s;
		return l
	}

	function Ga(e) {
		var t = r;
		r = 1200;
		var n = e._R(2),
			a = e._R(1);
		var i = a & 4,
			s = a & 8;
		var o = 1 + (a & 1);
		var l = 0,
			f;
		var c = {};
		if (s) l = e._R(2);
		if (i) f = e._R(4);
		var u = o == 2 ? "dbcs-cont" : "sbcs-cont";
		var h = n === 0 ? "" : e._R(n, u);
		if (s) e.l += 4 * l;
		if (i) e.l += f;
		c.t = h;
		if (!s) {
			c.raw = "<t>" + c.t + "</t>";
			c.r = c.t
		}
		r = t;
		return c
	}

	function ja(e, r, t) {
		var n;
		if (t) {
			if (t.biff >= 2 && t.biff <= 5) return e._R(r, "cpstr");
			if (t.biff >= 12) return e._R(r, "dbcs-cont")
		}
		var a = e._R(1);
		if (a === 0) {
			n = e._R(r, "sbcs-cont")
		} else {
			n = e._R(r, "dbcs-cont")
		}
		return n
	}

	function Ka(e, r, t) {
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		if (n === 0) {
			e.l++;
			return ""
		}
		return ja(e, n, t)
	}

	function Ya(e, r, t) {
		if (t.biff > 5) return Ka(e, r, t);
		var n = e._R(1);
		if (n === 0) {
			e.l++;
			return ""
		}
		return e._R(n, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont")
	}

	function $a(e, r, t) {
		if (!t) t = Xr(3 + 2 * e.length);
		t._W(2, e.length);
		t._W(1, 1);
		t._W(31, e, "utf16le");
		return t
	}

	function Za(e) {
		var r = e._R(1);
		e.l++;
		var t = e._R(2);
		e.l += 2;
		return [r, t]
	}

	function Qa(e) {
		var r = e._R(4),
			t = e.l;
		var n = false;
		if (r > 24) {
			e.l += r - 24;
			if (e._R(16) === "795881f43b1d7f48af2c825dc4852763") n = true;
			e.l = t
		}
		var a = e._R((n ? r - 24 : r) >> 1, "utf16le").replace(y, "");
		if (n) e.l += 24;
		return a
	}

	function Ja(e) {
		e.l += 2;
		var r = e._R(0, "lpstr-ansi");
		e.l += 2;
		if (e._R(2) != 57005) throw new Error("Bad FileMoniker");
		var t = e._R(4);
		if (t === 0) return r.replace(/\\/g, "/");
		var n = e._R(4);
		if (e._R(2) != 3) throw new Error("Bad FileMoniker");
		var a = e._R(n >> 1, "utf16le").replace(y, "");
		return a
	}

	function qa(e, r) {
		var t = e._R(16);
		r -= 16;
		switch (t) {
		case "e0c9ea79f9bace118c8200aa004ba90b":
			return Qa(e, r);
		case "0303000000000000c000000000000046":
			return Ja(e, r);
		default:
			throw new Error("Unsupported Moniker " + t)
		}
	}

	function ei(e) {
		var r = e._R(4);
		var t = r > 0 ? e._R(r, "utf16le").replace(y, "") : "";
		return t
	}

	function ri(e, r) {
		var t = e.l + r;
		var n = e._R(4);
		if (n !== 2) throw new Error("Unrecognized streamVersion: " + n);
		var a = e._R(2);
		e.l += 2;
		var i, s, o, l, f = "",
			c, u;
		if (a & 16) i = ei(e, t - e.l);
		if (a & 128) s = ei(e, t - e.l);
		if ((a & 257) === 257) o = ei(e, t - e.l);
		if ((a & 257) === 1) l = qa(e, t - e.l);
		if (a & 8) f = ei(e, t - e.l);
		if (a & 32) c = e._R(16);
		if (a & 64) u = ua(e);
		e.l = t;
		var h = s || o || l || "";
		if (h && f) h += "#" + f;
		if (!h) h = "#" + f;
		var d = {
			Target: h
		};
		if (c) d.guid = c;
		if (u) d.time = u;
		if (i) d.Tooltip = i;
		return d
	}

	function ti(e) {
		var r = Xr(512),
			t = 0;
		var n = e.Target;
		var a = n.indexOf("#") > -1 ? 31 : 23;
		switch (n.charAt(0)) {
		case "#":
			a = 28;
			break;
		case ".":
			a &= ~2;
			break
		}
		r._W(4, 2);
		r._W(4, a);
		var i = [8, 6815827, 6619237, 4849780, 83];
		for (t = 0; t < i.length; ++t) r._W(4, i[t]);
		if (a == 28) {
			n = n.slice(1);
			r._W(4, n.length + 1);
			for (t = 0; t < n.length; ++t) r._W(2, n.charCodeAt(t));
			r._W(2, 0)
		} else if (a & 2) {
			i = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
			for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16));
			r._W(4, 2 * (n.length + 1));
			for (t = 0; t < n.length; ++t) r._W(2, n.charCodeAt(t));
			r._W(2, 0)
		} else {
			i = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" ");
			for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16));
			var s = 0;
			while (n.slice(s * 3, s * 3 + 3) == "../" || n.slice(s * 3, s * 3 + 3) == "..\\") ++s;
			r._W(2, s);
			r._W(4, n.length + 1);
			for (t = 0; t < n.length; ++t) r._W(1, n.charCodeAt(t) & 255);
			r._W(1, 0);
			r._W(2, 65535);
			r._W(2, 57005);
			for (t = 0; t < 6; ++t) r._W(4, 0)
		}
		return r.slice(0, r.l)
	}

	function ni(e) {
		var r = e._R(1),
			t = e._R(1),
			n = e._R(1),
			a = e._R(1);
		return [r, t, n, a]
	}

	function ai(e, r) {
		var t = ni(e, r);
		t[3] = 0;
		return t
	}

	function ii(e) {
		var r = e._R(2);
		var t = e._R(2);
		var n = e._R(2);
		return {
			r: r,
			c: t,
			ixfe: n
		}
	}

	function si(e, r, t, n) {
		if (!n) n = Xr(6);
		n._W(2, e);
		n._W(2, r);
		n._W(2, t || 0);
		return n
	}

	function oi(e) {
		var r = e._R(2);
		var t = e._R(2);
		e.l += 8;
		return {
			type: r,
			flags: t
		}
	}

	function li(e, r, t) {
		return r === 0 ? "" : Ya(e, r, t)
	}

	function fi(e, r, t) {
		var n = t.biff > 8 ? 4 : 2;
		var a = e._R(n),
			i = e._R(n, "i"),
			s = e._R(n, "i");
		return [a, i, s]
	}

	function ci(e) {
		var r = e._R(2);
		var t = Lt(e);
		return [r, t]
	}

	function ui(e, r, t) {
		e.l += 4;
		r -= 4;
		var n = e.l + r;
		var a = Xa(e, r, t);
		var i = e._R(2);
		n -= e.l;
		if (i !== n) throw new Error("Malformed AddinUdf: padding = " + n + " != " + i);
		e.l += i;
		return a
	}

	function hi(e) {
		var r = e._R(2);
		var t = e._R(2);
		var n = e._R(2);
		var a = e._R(2);
		return {
			s: {
				c: n,
				r: r
			},
			e: {
				c: a,
				r: t
			}
		}
	}

	function di(e, r) {
		if (!r) r = Xr(8);
		r._W(2, e.s.r);
		r._W(2, e.e.r);
		r._W(2, e.s.c);
		r._W(2, e.e.c);
		return r
	}

	function pi(e) {
		var r = e._R(2);
		var t = e._R(2);
		var n = e._R(1);
		var a = e._R(1);
		return {
			s: {
				c: n,
				r: r
			},
			e: {
				c: a,
				r: t
			}
		}
	}
	var vi = pi;

	function gi(e) {
		e.l += 4;
		var r = e._R(2);
		var t = e._R(2);
		var n = e._R(2);
		e.l += 12;
		return [t, r, n]
	}

	function mi(e) {
		var r = {};
		e.l += 4;
		e.l += 16;
		r.fSharedNote = e._R(2);
		e.l += 4;
		return r
	}

	function bi(e) {
		var r = {};
		e.l += 4;
		e.cf = e._R(2);
		return r
	}

	function Ci(e) {
		e.l += 2;
		e.l += e._R(2)
	}
	var Ei = {
		0: Ci,
		4: Ci,
		5: Ci,
		6: Ci,
		7: bi,
		8: Ci,
		9: Ci,
		10: Ci,
		11: Ci,
		12: Ci,
		13: mi,
		14: Ci,
		15: Ci,
		16: Ci,
		17: Ci,
		18: Ci,
		19: Ci,
		20: Ci,
		21: gi
	};

	function ki(e, r) {
		var t = e.l + r;
		var n = [];
		while (e.l < t) {
			var a = e._R(2);
			e.l -= 2;
			try {
				n.push(Ei[a](e, t - e.l))
			} catch (r) {
				e.l = t;
				return n
			}
		}
		if (e.l != t) e.l = t;
		return n
	}

	function Si(e, r) {
		var t = {
			BIFFVer: 0,
			dt: 0
		};
		t.BIFFVer = e._R(2);
		r -= 2;
		if (r >= 2) {
			t.dt = e._R(2);
			e.l -= 2
		}
		switch (t.BIFFVer) {
		case 1536:
			;
		case 1280:
			;
		case 1024:
			;
		case 768:
			;
		case 512:
			;
		case 2:
			;
		case 7:
			break;
		default:
			if (r > 6) throw new Error("Unexpected BIFF Ver " + t.BIFFVer)
		}
		e._R(r);
		return t
	}

	function wi(e, r, t) {
		var n = 1536,
			a = 16;
		switch (t.bookType) {
		case "biff8":
			break;
		case "biff5":
			n = 1280;
			a = 8;
			break;
		case "biff4":
			n = 4;
			a = 6;
			break;
		case "biff3":
			n = 3;
			a = 6;
			break;
		case "biff2":
			n = 2;
			a = 4;
			break;
		case "xla":
			break;
		default:
			throw new Error("unsupported BIFF version")
		}
		var i = Xr(a);
		i._W(2, n);
		i._W(2, r);
		if (a > 4) i._W(2, 29282);
		if (a > 6) i._W(2, 1997);
		if (a > 8) {
			i._W(2, 49161);
			i._W(2, 1);
			i._W(2, 1798);
			i._W(2, 0)
		}
		return i
	}

	function Ai(e, r) {
		if (r === 0) return 1200;
		if (e._R(2) !== 1200) {}
		return 1200
	}

	function _i(e, r, t) {
		if (t.enc) {
			e.l += r;
			return ""
		}
		var n = e.l;
		var a = Ya(e, 0, t);
		e._R(r + n - e.l);
		return a
	}

	function Ri(e, r) {
		var t = !r || r.biff == 8;
		var n = Xr(t ? 112 : 54);
		n._W(r.biff == 8 ? 2 : 1, 7);
		if (t) n._W(1, 0);
		n._W(4, 859007059);
		n._W(4, 5458548 | (t ? 0 : 536870912));
		while (n.l < n.length) n._W(1, t ? 0 : 32);
		return n
	}

	function Bi(e, r, t) {
		var n = t && t.biff == 8 || r == 2 ? e._R(2) : (e.l += r, 0);
		return {
			fDialog: n & 16
		}
	}

	function Ti(e, r, t) {
		var n = e._R(4);
		var a = e._R(1) & 3;
		var i = e._R(1);
		switch (i) {
		case 0:
			i = "Worksheet";
			break;
		case 1:
			i = "Macrosheet";
			break;
		case 2:
			i = "Chartsheet";
			break;
		case 6:
			i = "VBAModule";
			break
		}
		var s = Xa(e, 0, t);
		if (s.length === 0) s = "Sheet1";
		return {
			pos: n,
			hs: a,
			dt: i,
			name: s
		}
	}

	function yi(e, r) {
		var t = !r || r.biff >= 8 ? 2 : 1;
		var n = Xr(8 + t * e.name.length);
		n._W(4, e.pos);
		n._W(1, e.hs || 0);
		n._W(1, e.dt);
		n._W(1, e.name.length);
		if (r.biff >= 8) n._W(1, 1);
		n._W(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
		var a = n.slice(0, n.l);
		a.l = n.l;
		return a
	}

	function xi(e, r) {
		var t = e.l + r;
		var n = e._R(4);
		var a = e._R(4);
		var i = [];
		for (var s = 0; s != a && e.l < t; ++s) {
			i.push(Ga(e))
		}
		i.Count = n;
		i.Unique = a;
		return i
	}

	function Ii(e, r) {
		var t = {};
		t.dsst = e._R(2);
		e.l += r - 2;
		return t
	}

	function Di(e) {
		var r = {};
		r.r = e._R(2);
		r.c = e._R(2);
		r.cnt = e._R(2) - r.c;
		var t = e._R(2);
		e.l += 4;
		var n = e._R(1);
		e.l += 3;
		if (n & 7) r.level = n & 7;
		if (n & 32) r.hidden = true;
		if (n & 64) r.hpt = t / 20;
		return r
	}

	function Fi(e) {
		var r = oi(e);
		if (r.type != 2211) throw new Error("Invalid Future Record " + r.type);
		var t = e._R(4);
		return t !== 0
	}

	function Oi(e) {
		e._R(2);
		return e._R(4)
	}

	function Pi(e, r, t) {
		var n = 0;
		if (!(t && t.biff == 2)) {
			n = e._R(2)
		}
		var a = e._R(2);
		if (t && t.biff == 2) {
			n = 1 - (a >> 15);
			a &= 32767
		}
		var i = {
			Unsynced: n & 1,
			DyZero: (n & 2) >> 1,
			ExAsc: (n & 4) >> 2,
			ExDsc: (n & 8) >> 3
		};
		return [i, a]
	}

	function Ni(e) {
		var r = e._R(2),
			t = e._R(2),
			n = e._R(2),
			a = e._R(2);
		var i = e._R(2),
			s = e._R(2),
			o = e._R(2);
		var l = e._R(2),
			f = e._R(2);
		return {
			Pos: [r, t],
			Dim: [n, a],
			Flags: i,
			CurTab: s,
			FirstTab: o,
			Selected: l,
			TabRatio: f
		}
	}

	function Li() {
		var e = Xr(18);
		e._W(2, 0);
		e._W(2, 0);
		e._W(2, 29280);
		e._W(2, 17600);
		e._W(2, 56);
		e._W(2, 0);
		e._W(2, 0);
		e._W(2, 1);
		e._W(2, 500);
		return e
	}

	function Mi(e, r, t) {
		if (t && t.biff >= 2 && t.biff < 8) return {};
		var n = e._R(2);
		return {
			RTL: n & 64
		}
	}

	function Wi(e) {
		var r = Xr(18),
			t = 1718;
		if (e && e.RTL) t |= 64;
		r._W(2, t);
		r._W(4, 0);
		r._W(4, 64);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}

	function Ui(e, r, t) {
		var n = {
			dyHeight: e._R(2),
			fl: e._R(2)
		};
		switch (t && t.biff || 8) {
		case 2:
			break;
		case 3:
			;
		case 4:
			e.l += 2;
			break;
		default:
			e.l += 10;
			break
		}
		n.name = Xa(e, 0, t);
		return n
	}

	function Hi(e, r) {
		var t = e.name || "Arial";
		var n = r && r.biff == 5,
			a = n ? 15 + t.length : 16 + 2 * t.length;
		var i = Xr(a);
		i._W(2, (e.sz || 12) * 20);
		i._W(4, 0);
		i._W(2, 400);
		i._W(4, 0);
		i._W(2, 0);
		i._W(1, t.length);
		if (!n) i._W(1, 1);
		i._W((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le");
		return i
	}

	function Vi(e) {
		var r = ii(e);
		r.isst = e._R(4);
		return r
	}

	function zi(e, r, t) {
		var n = e.l + r;
		var a = ii(e, 6);
		if (t.biff == 2) e.l++;
		var i = Ka(e, n - e.l, t);
		a.val = i;
		return a
	}

	function Xi(e, r, t, n, a) {
		var i = !a || a.biff == 8;
		var s = Xr(6 + 2 + +i + (1 + i) * t.length);
		si(e, r, n, s);
		s._W(2, t.length);
		if (i) s._W(1, 1);
		s._W((1 + i) * t.length, t, i ? "utf16le" : "sbcs");
		return s
	}

	function Gi(e, r, t) {
		var n = e._R(2);
		var a = Ya(e, 0, t);
		return [n, a]
	}

	function ji(e, r, t, n) {
		var a = t && t.biff == 5;
		if (!n) n = Xr(a ? 3 + r.length : 5 + 2 * r.length);
		n._W(2, e);
		n._W(a ? 1 : 2, r.length);
		if (!a) n._W(1, 1);
		n._W((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le");
		var i = n.length > n.l ? n.slice(0, n.l) : n;
		if (i.l == null) i.l = i.length;
		return i
	}
	var Ki = Ya;

	function Yi(e, r, t) {
		var n = e.l + r;
		var a = t.biff == 8 || !t.biff ? 4 : 2;
		var i = e._R(a),
			s = e._R(a);
		var o = e._R(2),
			l = e._R(2);
		e.l = n;
		return {
			s: {
				r: i,
				c: o
			},
			e: {
				r: s,
				c: l
			}
		}
	}

	function $i(e, r) {
		var t = r.biff == 8 || !r.biff ? 4 : 2;
		var n = Xr(2 * t + 6);
		n._W(t, e.s.r);
		n._W(t, e.e.r + 1);
		n._W(2, e.s.c);
		n._W(2, e.e.c + 1);
		n._W(2, 0);
		return n
	}

	function Zi(e) {
		var r = e._R(2),
			t = e._R(2);
		var n = ci(e);
		return {
			r: r,
			c: t,
			ixfe: n[0],
			rknum: n[1]
		}
	}

	function Qi(e, r) {
		var t = e.l + r - 2;
		var n = e._R(2),
			a = e._R(2);
		var i = [];
		while (e.l < t) i.push(ci(e));
		if (e.l !== t) throw new Error("MulRK read error");
		var s = e._R(2);
		if (i.length != s - a + 1) throw new Error("MulRK length mismatch");
		return {
			r: n,
			c: a,
			C: s,
			rkrec: i
		}
	}

	function Ji(e, r) {
		var t = e.l + r - 2;
		var n = e._R(2),
			a = e._R(2);
		var i = [];
		while (e.l < t) i.push(e._R(2));
		if (e.l !== t) throw new Error("MulBlank read error");
		var s = e._R(2);
		if (i.length != s - a + 1) throw new Error("MulBlank length mismatch");
		return {
			r: n,
			c: a,
			C: s,
			ixfe: i
		}
	}

	function qi(e, r, t, n) {
		var a = {};
		var i = e._R(4),
			s = e._R(4);
		var o = e._R(4),
			l = e._R(2);
		a.patternType = En[o >> 26];
		if (!n.cellStyles) return a;
		a.alc = i & 7;
		a.fWrap = i >> 3 & 1;
		a.alcV = i >> 4 & 7;
		a.fJustLast = i >> 7 & 1;
		a.trot = i >> 8 & 255;
		a.cIndent = i >> 16 & 15;
		a.fShrinkToFit = i >> 20 & 1;
		a.iReadOrder = i >> 22 & 2;
		a.fAtrNum = i >> 26 & 1;
		a.fAtrFnt = i >> 27 & 1;
		a.fAtrAlc = i >> 28 & 1;
		a.fAtrBdr = i >> 29 & 1;
		a.fAtrPat = i >> 30 & 1;
		a.fAtrProt = i >> 31 & 1;
		a.dgLeft = s & 15;
		a.dgRight = s >> 4 & 15;
		a.dgTop = s >> 8 & 15;
		a.dgBottom = s >> 12 & 15;
		a.icvLeft = s >> 16 & 127;
		a.icvRight = s >> 23 & 127;
		a.grbitDiag = s >> 30 & 3;
		a.icvTop = o & 127;
		a.icvBottom = o >> 7 & 127;
		a.icvDiag = o >> 14 & 127;
		a.dgDiag = o >> 21 & 15;
		a.icvFore = l & 127;
		a.icvBack = l >> 7 & 127;
		a.fsxButton = l >> 14 & 1;
		return a
	}

	function es(e, r, t) {
		var n = {};
		n.ifnt = e._R(2);
		n.numFmtId = e._R(2);
		n.flags = e._R(2);
		n.fStyle = n.flags >> 2 & 1;
		r -= 6;
		n.data = qi(e, r, n.fStyle, t);
		return n
	}

	function rs(e, r, t, n) {
		var a = t && t.biff == 5;
		if (!n) n = Xr(a ? 16 : 20);
		n._W(2, 0);
		if (e.style) {
			n._W(2, e.numFmtId || 0);
			n._W(2, 65524)
		} else {
			n._W(2, e.numFmtId || 0);
			n._W(2, r << 4)
		}
		n._W(4, 0);
		n._W(4, 0);
		if (!a) n._W(4, 0);
		n._W(2, 0);
		return n
	}

	function ts(e) {
		e.l += 4;
		var r = [e._R(2), e._R(2)];
		if (r[0] !== 0) r[0]--;
		if (r[1] !== 0) r[1]--;
		if (r[0] > 7 || r[1] > 7) throw new Error("Bad Gutters: " + r.join("|"));
		return r
	}

	function ns(e) {
		var r = Xr(8);
		r._W(4, 0);
		r._W(2, e[0] ? e[0] + 1 : 0);
		r._W(2, e[1] ? e[1] + 1 : 0);
		return r
	}

	function as(e, r, t) {
		var n = ii(e, 6);
		if (t.biff == 2) ++e.l;
		var a = Va(e, 2);
		n.val = a;
		n.t = a === true || a === false ? "b" : "e";
		return n
	}

	function is(e, r, t, n, a, i) {
		var s = Xr(8);
		si(e, r, n, s);
		za(t, i, s);
		return s
	}

	function ss(e) {
		var r = ii(e, 6);
		var t = zt(e, 8);
		r.val = t;
		return r
	}

	function os(e, r, t, n) {
		var a = Xr(14);
		si(e, r, n, a);
		Xt(t, a);
		return a
	}
	var ls = li;

	function fs(e, r, t) {
		var n = e.l + r;
		var a = e._R(2);
		var i = e._R(2);
		t.sbcch = i;
		if (i == 1025 || i == 14849) return [i, a];
		if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
		var s = ja(e, i);
		var o = [];
		while (n > e.l) o.push(Ka(e));
		return [i, a, s, o]
	}

	function cs(e, r, t) {
		var n = e._R(2);
		var a;
		var i = {
			fBuiltIn: n & 1,
			fWantAdvise: n >>> 1 & 1,
			fWantPict: n >>> 2 & 1,
			fOle: n >>> 3 & 1,
			fOleLink: n >>> 4 & 1,
			cf: n >>> 5 & 1023,
			fIcon: n >>> 15 & 1
		};
		if (t.sbcch === 14849) a = ui(e, r - 2, t);
		i.body = a || e._R(r - 2);
		if (typeof a === "string") i.Name = a;
		return i
	}
	var us = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria",
		"_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate",
		"_xlnm.Sheet_Title", "_xlnm._FilterDatabase"
	];

	function hs(e, r, t) {
		var n = e.l + r;
		var a = e._R(2);
		var i = e._R(1);
		var s = e._R(1);
		var o = e._R(t && t.biff == 2 ? 1 : 2);
		var l = 0;
		if (!t || t.biff >= 5) {
			if (t.biff != 5) e.l += 2;
			l = e._R(2);
			if (t.biff == 5) e.l += 2;
			e.l += 4
		}
		var f = ja(e, s, t);
		if (a & 32) f = us[f.charCodeAt(0)];
		var c = n - e.l;
		if (t && t.biff == 2) --c;
		var u = n == e.l || o === 0 ? [] : Bu(e, c, t, o);
		return {
			chKey: i,
			Name: f,
			itab: l,
			rgce: u
		}
	}

	function ds(e, r, t) {
		if (t.biff < 8) return ps(e, r, t);
		var n = [],
			a = e.l + r,
			i = e._R(t.biff > 8 ? 4 : 2);
		while (i-- !== 0) n.push(fi(e, t.biff > 8 ? 12 : 6, t));
		if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
		return n
	}

	function ps(e, r, t) {
		if (e[e.l + 1] == 3) e[e.l]++;
		var n = Xa(e, r, t);
		return n.charCodeAt(0) == 3 ? n.slice(1) : n
	}

	function vs(e, r, t) {
		if (t.biff < 8) {
			e.l += r;
			return
		}
		var n = e._R(2);
		var a = e._R(2);
		var i = ja(e, n, t);
		var s = ja(e, a, t);
		return [i, s]
	}

	function gs(e, r, t) {
		var n = pi(e, 6);
		e.l++;
		var a = e._R(1);
		r -= 8;
		return [Tu(e, r, t), a, n]
	}

	function ms(e, r, t) {
		var n = vi(e, 6);
		switch (t.biff) {
		case 2:
			e.l++;
			r -= 7;
			break;
		case 3:
			;
		case 4:
			e.l += 2;
			r -= 8;
			break;
		default:
			e.l += 6;
			r -= 12
		}
		return [n, _u(e, r, t, n)]
	}

	function bs(e) {
		var r = e._R(4) !== 0;
		var t = e._R(4) !== 0;
		var n = e._R(4);
		return [r, t, n]
	}

	function Cs(e, r, t) {
		if (t.biff < 8) return;
		var n = e._R(2),
			a = e._R(2);
		var i = e._R(2),
			s = e._R(2);
		var o = Ya(e, 0, t);
		if (t.biff < 8) e._R(1);
		return [{
			r: n,
			c: a
		}, o, s, i]
	}

	function Es(e, r, t) {
		return Cs(e, r, t)
	}

	function ks(e, r) {
		var t = [];
		var n = e._R(2);
		while (n--) t.push(hi(e, r));
		return t
	}

	function Ss(e) {
		var r = Xr(2 + e.length * 8);
		r._W(2, e.length);
		for (var t = 0; t < e.length; ++t) di(e[t], r);
		return r
	}

	function ws(e, r, t) {
		if (t && t.biff < 8) return _s(e, r, t);
		var n = gi(e, 22);
		var a = ki(e, r - 22, n[1]);
		return {
			cmo: n,
			ft: a
		}
	}
	var As = [];
	As[8] = function (e, r) {
		var t = e.l + r;
		e.l += 10;
		var n = e._R(2);
		e.l += 4;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 4;
		var a = e._R(1);
		e.l += a;
		e.l = t;
		return {
			fmt: n
		}
	};

	function _s(e, r, t) {
		e.l += 4;
		var n = e._R(2);
		var a = e._R(2);
		var i = e._R(2);
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 2;
		e.l += 6;
		r -= 36;
		var s = [];
		s.push((As[n] || zr)(e, r, t));
		return {
			cmo: [a, n, i],
			ft: s
		}
	}

	function Rs(e, r, t) {
		var n = e.l;
		var a = "";
		try {
			e.l += 4;
			var i = (t.lastobj || {
				cmo: [0, 0]
			}).cmo[1];
			var s;
			if ([0, 5, 7, 11, 12, 14].indexOf(i) == -1) e.l += 6;
			else s = Za(e, 6, t);
			var o = e._R(2);
			e._R(2);
			Wa(e, 2);
			var l = e._R(2);
			e.l += l;
			for (var f = 1; f < e.lens.length - 1; ++f) {
				if (e.l - n != e.lens[f]) throw new Error("TxO: bad continue record");
				var c = e[e.l];
				var u = ja(e, e.lens[f + 1] - e.lens[f] - 1);
				a += u;
				if (a.length >= (c ? o : 2 * o)) break
			}
			if (a.length !== o && a.length !== o * 2) {
				throw new Error("cchText: " + o + " != " + a.length)
			}
			e.l = n + r;
			return {
				t: a
			}
		} catch (t) {
			e.l = n + r;
			return {
				t: a
			}
		}
	}

	function Bs(e, r) {
		var t = hi(e, 8);
		e.l += 16;
		var n = ri(e, r - 24);
		return [t, n]
	}

	function Ts(e) {
		var r = Xr(24);
		var t = ft(e[0]);
		r._W(2, t.r);
		r._W(2, t.r);
		r._W(2, t.c);
		r._W(2, t.c);
		var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
		for (var a = 0; a < 16; ++a) r._W(1, parseInt(n[a], 16));
		return T([r, ti(e[1])])
	}

	function ys(e, r) {
		e._R(2);
		var t = hi(e, 8);
		var n = e._R((r - 10) / 2, "dbcs-cont");
		n = n.replace(y, "");
		return [t, n]
	}

	function xs(e) {
		var r = e[1].Tooltip;
		var t = Xr(10 + 2 * (r.length + 1));
		t._W(2, 2048);
		var n = ft(e[0]);
		t._W(2, n.r);
		t._W(2, n.r);
		t._W(2, n.c);
		t._W(2, n.c);
		for (var a = 0; a < r.length; ++a) t._W(2, r.charCodeAt(a));
		t._W(2, 0);
		return t
	}

	function Is(e) {
		var r = [0, 0],
			t;
		t = e._R(2);
		r[0] = Cn[t] || t;
		t = e._R(2);
		r[1] = Cn[t] || t;
		return r
	}

	function Ds(e) {
		if (!e) e = Xr(4);
		e._W(2, 1);
		e._W(2, 1);
		return e
	}

	function Fs(e) {
		var r = e._R(2);
		var t = [];
		while (r-- > 0) t.push(ai(e, 8));
		return t
	}

	function Os(e) {
		var r = e._R(2);
		var t = [];
		while (r-- > 0) t.push(ai(e, 8));
		return t
	}

	function Ps(e) {
		e.l += 2;
		var r = {
			cxfs: 0,
			crc: 0
		};
		r.cxfs = e._R(2);
		r.crc = e._R(4);
		return r
	}

	function Ns(e, r, t) {
		if (!t.cellStyles) return zr(e, r);
		var n = t && t.biff >= 12 ? 4 : 2;
		var a = e._R(n);
		var i = e._R(n);
		var s = e._R(n);
		var o = e._R(n);
		var l = e._R(2);
		if (n == 2) e.l += 2;
		return {
			s: a,
			e: i,
			w: s,
			ixfe: o,
			flags: l
		}
	}

	function Ls(e, r) {
		var t = {};
		if (r < 32) return t;
		e.l += 16;
		t.header = zt(e, 8);
		t.footer = zt(e, 8);
		e.l += 2;
		return t
	}

	function Ms(e, r, t) {
		var n = {
			area: false
		};
		if (t.biff != 5) {
			e.l += r;
			return n
		}
		var a = e._R(1);
		e.l += 3;
		if (a & 16) n.area = true;
		return n
	}

	function Ws(e) {
		var r = Xr(2 * e);
		for (var t = 0; t < e; ++t) r._W(2, t + 1);
		return r
	}
	var Us = ii;
	var Hs = Ha;
	var Vs = Ka;

	function zs(e) {
		var r = e._R(2);
		var t = e._R(2);
		var n = e._R(4);
		var a = {
			fmt: r,
			env: t,
			len: n,
			data: e.slice(e.l, e.l + n)
		};
		e.l += n;
		return a
	}

	function Xs(e, r, t) {
		var n = ii(e, 6);
		++e.l;
		var a = Ya(e, r - 7, t);
		n.t = "str";
		n.val = a;
		return n
	}

	function Gs(e) {
		var r = ii(e, 6);
		++e.l;
		var t = zt(e, 8);
		r.t = "n";
		r.val = t;
		return r
	}

	function js(e, r, t) {
		var n = Xr(15);
		vv(n, e, r);
		n._W(8, t, "f");
		return n
	}

	function Ks(e) {
		var r = ii(e, 6);
		++e.l;
		var t = e._R(2);
		r.t = "n";
		r.val = t;
		return r
	}

	function Ys(e, r, t) {
		var n = Xr(9);
		vv(n, e, r);
		n._W(2, t);
		return n
	}

	function $s(e) {
		var r = e._R(1);
		if (r === 0) {
			e.l++;
			return ""
		}
		return e._R(r, "sbcs-cont")
	}

	function Zs(e, r) {
		e.l += 6;
		e.l += 2;
		e.l += 1;
		e.l += 3;
		e.l += 1;
		e.l += r - 13
	}

	function Qs(e, r, t) {
		var n = e.l + r;
		var a = ii(e, 6);
		var i = e._R(2);
		var s = ja(e, i, t);
		e.l = n;
		a.t = "str";
		a.val = s;
		return a
	}
	var Js = function () {
		var e = {
			1: 437,
			2: 850,
			3: 1252,
			4: 1e4,
			100: 852,
			101: 866,
			102: 865,
			103: 861,
			104: 895,
			105: 620,
			106: 737,
			107: 857,
			120: 950,
			121: 949,
			122: 936,
			123: 932,
			124: 874,
			125: 1255,
			126: 1256,
			150: 10007,
			151: 10029,
			152: 10006,
			200: 1250,
			201: 1251,
			202: 1254,
			203: 1253,
			0: 20127,
			8: 865,
			9: 437,
			10: 850,
			11: 437,
			13: 437,
			14: 850,
			15: 437,
			16: 850,
			17: 437,
			18: 850,
			19: 932,
			20: 850,
			21: 437,
			22: 850,
			23: 865,
			24: 437,
			25: 437,
			26: 850,
			27: 437,
			28: 863,
			29: 850,
			31: 852,
			34: 852,
			35: 852,
			36: 860,
			37: 850,
			38: 866,
			55: 850,
			64: 852,
			77: 936,
			78: 949,
			79: 950,
			80: 874,
			87: 1252,
			88: 1252,
			89: 1252,
			255: 16969
		};

		function r(r, t) {
			var n = [];
			var a = k(1);
			switch (t.type) {
			case "base64":
				a = w(m.decode(r));
				break;
			case "binary":
				a = w(r);
				break;
			case "buffer":
				;
			case "array":
				a = r;
				break
			}
			Vr(a, 0);
			var i = a._R(1);
			var s = false;
			var o = false,
				l = false;
			switch (i) {
			case 2:
				;
			case 3:
				break;
			case 48:
				o = true;
				s = true;
				break;
			case 49:
				o = true;
				break;
			case 131:
				s = true;
				break;
			case 139:
				s = true;
				break;
			case 140:
				s = true;
				l = true;
				break;
			case 245:
				s = true;
				break;
			default:
				throw new Error("DBF Unsupported Version: " + i.toString(16))
			}
			var f = 0,
				c = 0;
			if (i == 2) f = a._R(2);
			a.l += 3;
			if (i != 2) f = a._R(4);
			if (i != 2) c = a._R(2);
			var u = a._R(2);
			var h = 1252;
			if (i != 2) {
				a.l += 16;
				a._R(1);
				if (a[a.l] !== 0) h = e[a[a.l]];
				a.l += 1;
				a.l += 2
			}
			if (l) a.l += 36;
			var d = [],
				p = {};
			var v = c - 10 - (o ? 264 : 0),
				g = l ? 32 : 11;
			while (i == 2 ? a.l < a.length && a[a.l] != 13 : a.l < v) {
				p = {};
				p.name = cptable.utils.decode(h, a.slice(a.l, a.l + g)).replace(/[\u0000\r\n].*$/g, "");
				a.l += g;
				p.type = String.fromCharCode(a._R(1));
				if (i != 2 && !l) p.offset = a._R(4);
				p.len = a._R(1);
				if (i == 2) p.offset = a._R(2);
				p.dec = a._R(1);
				if (p.name.length) d.push(p);
				if (i != 2) a.l += l ? 13 : 14;
				switch (p.type) {
				case "B":
					if ((!o || p.len != 8) && t.WTF) console.log("Skipping " + p.name + ":" + p.type);
					break;
				case "G":
					;
				case "P":
					if (t.WTF) console.log("Skipping " + p.name + ":" + p.type);
					break;
				case "C":
					;
				case "D":
					;
				case "F":
					;
				case "I":
					;
				case "L":
					;
				case "M":
					;
				case "N":
					;
				case "O":
					;
				case "T":
					;
				case "Y":
					;
				case "0":
					;
				case "@":
					;
				case "+":
					break;
				default:
					throw new Error("Unknown Field Type: " + p.type)
				}
			}
			if (a[a.l] !== 13) a.l = c - 1;
			else if (i == 2) a.l = 521;
			if (i != 2) {
				if (a._R(1) !== 13) throw new Error("DBF Terminator not found " + a.l + " " + a[a.l]);
				a.l = c
			}
			var b = 0,
				C = 0;
			n[0] = [];
			for (C = 0; C != d.length; ++C) n[0][C] = d[C].name;
			while (f-- > 0) {
				if (a[a.l] === 42) {
					a.l += u;
					continue
				}++a.l;
				n[++b] = [];
				C = 0;
				for (C = 0; C != d.length; ++C) {
					var E = a.slice(a.l, a.l + d[C].len);
					a.l += d[C].len;
					Vr(E, 0);
					var S = cptable.utils.decode(h, E);
					switch (d[C].type) {
					case "C":
						n[b][C] = cptable.utils.decode(h, E);
						n[b][C] = n[b][C].trim();
						break;
					case "D":
						if (S.length === 8) n[b][C] = new Date(+S.slice(0, 4), +S.slice(4, 6) - 1, +S.slice(6, 8));
						else n[b][C] = S;
						break;
					case "F":
						n[b][C] = parseFloat(S.trim());
						break;
					case "+":
						;
					case "I":
						n[b][C] = l ? E._R(-4, "i") ^ 2147483648 : E._R(4, "i");
						break;
					case "L":
						switch (S.toUpperCase()) {
						case "Y":
							;
						case "T":
							n[b][C] = true;
							break;
						case "N":
							;
						case "F":
							n[b][C] = false;
							break;
						case " ":
							;
						case "?":
							n[b][C] = false;
							break;
						default:
							throw new Error("DBF Unrecognized L:|" + S + "|")
						}
						break;
					case "M":
						if (!s) throw new Error("DBF Unexpected MEMO for type " + i.toString(16));
						n[b][C] = "##MEMO##" + (l ? parseInt(S.trim(), 10) : E._R(4));
						break;
					case "N":
						n[b][C] = +S.replace(/\u0000/g, "").trim();
						break;
					case "@":
						n[b][C] = new Date(E._R(-8, "f") - 621356832e5);
						break;
					case "T":
						n[b][C] = new Date((E._R(4) - 2440588) * 864e5 + E._R(4));
						break;
					case "Y":
						n[b][C] = E._R(4, "i") / 1e4;
						break;
					case "O":
						n[b][C] = -E._R(-8, "f");
						break;
					case "B":
						if (o && d[C].len == 8) {
							n[b][C] = E._R(8, "f");
							break
						};
					case "G":
						;
					case "P":
						E.l += d[C].len;
						break;
					case "0":
						if (d[C].name === "_NullFlags") break;
					default:
						throw new Error("DBF Unsupported data type " + d[C].type)
					}
				}
			}
			if (i != 2)
				if (a.l < a.length && a[a.l++] != 26) throw new Error("DBF EOF Marker missing " + (a.l - 1) + " of " + a.length + " " + a[a.l - 1].toString(
					16));
			if (t && t.sheetRows) n = n.slice(0, t.sheetRows);
			return n
		}

		function t(e, t) {
			var n = t || {};
			if (!n.dateNF) n.dateNF = "yyyymmdd";
			return bt(r(e, n), n)
		}

		function n(e, r) {
			try {
				return gt(t(e, r), r)
			} catch (e) {
				if (r && r.WTF) throw e
			}
			return {
				SheetNames: [],
				Sheets: {}
			}
		}
		var a = {
			B: 8,
			C: 250,
			L: 1,
			D: 8,
			"?": 0,
			"": 0
		};

		function i(e, r) {
			var t = r || {};
			if (t.type == "string") throw new Error("Cannot write DBF to JS string");
			var n = jr();
			var i = xg(e, {
				header: 1,
				cellDates: true
			});
			var s = i[0],
				o = i.slice(1);
			var l = 0,
				f = 0,
				c = 0,
				u = 1;
			for (l = 0; l < s.length; ++l) {
				if (l == null) continue;
				++c;
				if (typeof s[l] === "number") s[l] = s[l].toString(10);
				if (typeof s[l] !== "string") throw new Error("DBF Invalid column name " + s[l] + " |" + typeof s[l] + "|");
				if (s.indexOf(s[l]) !== l)
					for (f = 0; f < 1024; ++f)
						if (s.indexOf(s[l] + "_" + f) == -1) {
							s[l] += "_" + f;
							break
						}
			}
			var h = dt(e["!ref"]);
			var d = [];
			for (l = 0; l <= h.e.c - h.s.c; ++l) {
				var p = [];
				for (f = 0; f < o.length; ++f) {
					if (o[f][l] != null) p.push(o[f][l])
				}
				if (p.length == 0 || s[l] == null) {
					d[l] = "?";
					continue
				}
				var v = "",
					g = "";
				for (f = 0; f < p.length; ++f) {
					switch (typeof p[f]) {
					case "number":
						g = "B";
						break;
					case "string":
						g = "C";
						break;
					case "boolean":
						g = "L";
						break;
					case "object":
						g = p[f] instanceof Date ? "D" : "C";
						break;
					default:
						g = "C"
					}
					v = v && v != g ? "C" : g;
					if (v == "C") break
				}
				u += a[v] || 0;
				d[l] = v
			}
			var m = n.next(32);
			m._W(4, 318902576);
			m._W(4, o.length);
			m._W(2, 296 + 32 * c);
			m._W(2, u);
			for (l = 0; l < 4; ++l) m._W(4, 0);
			m._W(4, 768);
			for (l = 0, f = 0; l < s.length; ++l) {
				if (s[l] == null) continue;
				var b = n.next(32);
				var C = (s[l].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
				b._W(1, C, "sbcs");
				b._W(1, d[l] == "?" ? "C" : d[l], "sbcs");
				b._W(4, f);
				b._W(1, a[d[l]] || 0);
				b._W(1, 0);
				b._W(1, 2);
				b._W(4, 0);
				b._W(1, 0);
				b._W(4, 0);
				b._W(4, 0);
				f += a[d[l]] || 0
			}
			var E = n.next(264);
			E._W(4, 13);
			for (l = 0; l < 65; ++l) E._W(4, 0);
			for (l = 0; l < o.length; ++l) {
				var k = n.next(u);
				k._W(1, 0);
				for (f = 0; f < s.length; ++f) {
					if (s[f] == null) continue;
					switch (d[f]) {
					case "L":
						k._W(1, o[l][f] == null ? 63 : o[l][f] ? 84 : 70);
						break;
					case "B":
						k._W(8, o[l][f] || 0, "f");
						break;
					case "D":
						if (!o[l][f]) k._W(8, "00000000", "sbcs");
						else {
							k._W(4, ("0000" + o[l][f].getFullYear()).slice(-4), "sbcs");
							k._W(2, ("00" + (o[l][f].getMonth() + 1)).slice(-2), "sbcs");
							k._W(2, ("00" + o[l][f].getDate()).slice(-2), "sbcs")
						}
						break;
					case "C":
						var S = String(o[l][f] || "");
						k._W(1, S, "sbcs");
						for (c = 0; c < 250 - S.length; ++c) k._W(1, 32);
						break
					}
				}
			}
			n.next(1)._W(1, 26);
			return n.end()
		}
		return {
			to_workbook: n,
			to_sheet: t,
			from_sheet: i
		}
	}();
	var qs = function () {
		function e(e, t) {
			switch (t.type) {
			case "base64":
				return r(m.decode(e), t);
			case "binary":
				return r(e, t);
			case "buffer":
				return r(e.toString("binary"), t);
			case "array":
				return r(ie(e), t)
			}
			throw new Error("Unrecognized type " + t.type)
		}

		function r(e, r) {
			var t = e.split(/[\n\r]+/),
				n = -1,
				a = -1,
				i = 0,
				s = 0,
				o = [];
			var l = [];
			var f = null;
			var c = {},
				u = [],
				h = [],
				d = [];
			var p = 0,
				v;
			for (; i !== t.length; ++i) {
				p = 0;
				var g = t[i].trim();
				var m = g.replace(/;;/g, "").split(";").map(function (e) {
					return e.replace(/\u0001/g, ";")
				});
				var b = m[0],
					C;
				if (g.length > 0) switch (b) {
				case "ID":
					break;
				case "E":
					break;
				case "B":
					break;
				case "O":
					break;
				case "P":
					if (m[1].charAt(0) == "P") l.push(g.slice(3).replace(/;;/g, ";"));
					break;
				case "C":
					var E = false,
						k = false;
					for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
					case "X":
						a = parseInt(m[s].slice(1)) - 1;
						k = true;
						break;
					case "Y":
						n = parseInt(m[s].slice(1)) - 1;
						if (!k) a = 0;
						for (v = o.length; v <= n; ++v) o[v] = [];
						break;
					case "K":
						C = m[s].slice(1);
						if (C.charAt(0) === '"') C = C.slice(1, C.length - 1);
						else if (C === "TRUE") C = true;
						else if (C === "FALSE") C = false;
						else if (!isNaN(le(C))) {
							C = le(C);
							if (f !== null && I.is_date(f)) C = ee(C)
						} else if (!isNaN(fe(C).getDate())) {
							C = ae(C)
						}
						if (typeof cptable !== "undefined" && typeof C == "string" && (r || {}).type != "string" && (r || {}).codepage) C = cptable.utils.decode(
							r.codepage, C);
						E = true;
						break;
					case "E":
						var S = zf(m[s].slice(1), {
							r: n,
							c: a
						});
						o[n][a] = [o[n][a], S];
						break;
					default:
						if (r && r.WTF) throw new Error("SYLK bad record " + g)
					}
					if (E) {
						o[n][a] = C;
						f = null
					}
					break;
				case "F":
					var w = 0;
					for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
					case "X":
						a = parseInt(m[s].slice(1)) - 1;
						++w;
						break;
					case "Y":
						n = parseInt(m[s].slice(1)) - 1;
						for (v = o.length; v <= n; ++v) o[v] = [];
						break;
					case "M":
						p = parseInt(m[s].slice(1)) / 20;
						break;
					case "F":
						break;
					case "G":
						break;
					case "P":
						f = l[parseInt(m[s].slice(1))];
						break;
					case "S":
						break;
					case "D":
						break;
					case "N":
						break;
					case "W":
						d = m[s].slice(1).split(" ");
						for (v = parseInt(d[0], 10); v <= parseInt(d[1], 10); ++v) {
							p = parseInt(d[2], 10);
							h[v - 1] = p === 0 ? {
								hidden: true
							} : {
								wch: p
							};
							sl(h[v - 1])
						}
						break;
					case "C":
						a = parseInt(m[s].slice(1)) - 1;
						if (!h[a]) h[a] = {};
						break;
					case "R":
						n = parseInt(m[s].slice(1)) - 1;
						if (!u[n]) u[n] = {};
						if (p > 0) {
							u[n].hpt = p;
							u[n].hpx = cl(p)
						} else if (p === 0) u[n].hidden = true;
						break;
					default:
						if (r && r.WTF) throw new Error("SYLK bad record " + g)
					}
					if (w < 1) f = null;
					break;
				default:
					if (r && r.WTF) throw new Error("SYLK bad record " + g)
				}
			}
			if (u.length > 0) c["!rows"] = u;
			if (h.length > 0) c["!cols"] = h;
			if (r && r.sheetRows) o = o.slice(0, r.sheetRows);
			return [o, c]
		}

		function t(r, t) {
			var n = e(r, t);
			var a = n[0],
				i = n[1];
			var s = bt(a, t);
			G(i).forEach(function (e) {
				s[e] = i[e]
			});
			return s
		}

		function n(e, r) {
			return gt(t(e, r), r)
		}

		function a(e, r, t, n) {
			var a = "C;Y" + (t + 1) + ";X" + (n + 1) + ";K";
			switch (e.t) {
			case "n":
				a += e.v || 0;
				if (e.f && !e.F) a += ";E" + Gf(e.f, {
					r: t,
					c: n
				});
				break;
			case "b":
				a += e.v ? "TRUE" : "FALSE";
				break;
			case "e":
				a += e.w || e.v;
				break;
			case "d":
				a += '"' + (e.w || e.v) + '"';
				break;
			case "s":
				a += '"' + e.v.replace(/"/g, "") + '"';
				break
			}
			return a
		}

		function i(e, r) {
			r.forEach(function (r, t) {
				var n = "F;W" + (t + 1) + " " + (t + 1) + " ";
				if (r.hidden) n += "0";
				else {
					if (typeof r.width == "number") r.wpx = rl(r.width);
					if (typeof r.wpx == "number") r.wch = tl(r.wpx);
					if (typeof r.wch == "number") n += Math.round(r.wch)
				}
				if (n.charAt(n.length - 1) != " ") e.push(n)
			})
		}

		function s(e, r) {
			r.forEach(function (r, t) {
				var n = "F;";
				if (r.hidden) n += "M0;";
				else if (r.hpt) n += "M" + 20 * r.hpt + ";";
				else if (r.hpx) n += "M" + 20 * fl(r.hpx) + ";";
				if (n.length > 2) e.push(n + "R" + (t + 1))
			})
		}

		function o(e, r) {
			var t = ["ID;PWXL;N;E"],
				n = [];
			var o = dt(e["!ref"]),
				l;
			var f = Array.isArray(e);
			var c = "\r\n";
			t.push("P;PGeneral");
			t.push("F;P0;DG0G8;M255");
			if (e["!cols"]) i(t, e["!cols"]);
			if (e["!rows"]) s(t, e["!rows"]);
			t.push("B;Y" + (o.e.r - o.s.r + 1) + ";X" + (o.e.c - o.s.c + 1) + ";D" + [o.s.c, o.s.r, o.e.c, o.e.r].join(" "));
			for (var u = o.s.r; u <= o.e.r; ++u) {
				for (var h = o.s.c; h <= o.e.c; ++h) {
					var d = ct({
						r: u,
						c: h
					});
					l = f ? (e[u] || [])[h] : e[d];
					if (!l || l.v == null && (!l.f || l.F)) continue;
					n.push(a(l, e, u, h, r))
				}
			}
			return t.join(c) + c + n.join(c) + c + "E" + c
		}
		return {
			to_workbook: n,
			to_sheet: t,
			from_sheet: o
		}
	}();
	var eo = function () {
		function e(e, t) {
			switch (t.type) {
			case "base64":
				return r(m.decode(e), t);
			case "binary":
				return r(e, t);
			case "buffer":
				return r(e.toString("binary"), t);
			case "array":
				return r(ie(e), t)
			}
			throw new Error("Unrecognized type " + t.type)
		}

		function r(e, r) {
			var t = e.split("\n"),
				n = -1,
				a = -1,
				i = 0,
				s = [];
			for (; i !== t.length; ++i) {
				if (t[i].trim() === "BOT") {
					s[++n] = [];
					a = 0;
					continue
				}
				if (n < 0) continue;
				var o = t[i].trim().split(",");
				var l = o[0],
					f = o[1];
				++i;
				var c = t[i].trim();
				switch (+l) {
				case -1:
					if (c === "BOT") {
						s[++n] = [];
						a = 0;
						continue
					} else if (c !== "EOD") throw new Error("Unrecognized DIF special command " + c);
					break;
				case 0:
					if (c === "TRUE") s[n][a] = true;
					else if (c === "FALSE") s[n][a] = false;
					else if (!isNaN(le(f))) s[n][a] = le(f);
					else if (!isNaN(fe(f).getDate())) s[n][a] = ae(f);
					else s[n][a] = f;
					++a;
					break;
				case 1:
					c = c.slice(1, c.length - 1);
					s[n][a++] = c !== "" ? c : null;
					break
				}
				if (c === "EOD") break
			}
			if (r && r.sheetRows) s = s.slice(0, r.sheetRows);
			return s
		}

		function t(r, t) {
			return bt(e(r, t), t)
		}

		function n(e, r) {
			return gt(t(e, r), r)
		}
		var a = function () {
			var e = function e(r, t, n, a, i) {
				r.push(t);
				r.push(n + "," + a);
				r.push('"' + i.replace(/"/g, '""') + '"')
			};
			var r = function e(r, t, n, a) {
				r.push(t + "," + n);
				r.push(t == 1 ? '"' + a.replace(/"/g, '""') + '"' : a)
			};
			return function t(n) {
				var a = [];
				var t = dt(n["!ref"]),
					i;
				var s = Array.isArray(n);
				e(a, "TABLE", 0, 1, "sheetjs");
				e(a, "VECTORS", 0, t.e.r - t.s.r + 1, "");
				e(a, "TUPLES", 0, t.e.c - t.s.c + 1, "");
				e(a, "DATA", 0, 0, "");
				for (var o = t.s.r; o <= t.e.r; ++o) {
					r(a, -1, 0, "BOT");
					for (var l = t.s.c; l <= t.e.c; ++l) {
						var f = ct({
							r: o,
							c: l
						});
						i = s ? (n[o] || [])[l] : n[f];
						if (!i) {
							r(a, 1, 0, "");
							continue
						}
						switch (i.t) {
						case "n":
							var c = g ? i.w : i.v;
							if (!c && i.v != null) c = i.v;
							if (c == null) {
								if (g && i.f && !i.F) r(a, 1, 0, "=" + i.f);
								else r(a, 1, 0, "")
							} else r(a, 0, c, "V");
							break;
						case "b":
							r(a, 0, i.v ? 1 : 0, i.v ? "TRUE" : "FALSE");
							break;
						case "s":
							r(a, 1, 0, !g || isNaN(i.v) ? i.v : '="' + i.v + '"');
							break;
						case "d":
							if (!i.w) i.w = I.format(i.z || I._table[14], q(ae(i.v)));
							if (g) r(a, 0, i.w, "V");
							else r(a, 1, 0, i.w);
							break;
						default:
							r(a, 1, 0, "")
						}
					}
				}
				r(a, -1, 0, "EOD");
				var u = "\r\n";
				var h = a.join(u);
				return h
			}
		}();
		return {
			to_workbook: n,
			to_sheet: t,
			from_sheet: a
		}
	}();
	var ro = function () {
		function e(e) {
			return e.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n")
		}

		function r(e) {
			return e.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n")
		}

		function t(r, t) {
			var n = r.split("\n"),
				a = -1,
				i = -1,
				s = 0,
				o = [];
			for (; s !== n.length; ++s) {
				var l = n[s].trim().split(":");
				if (l[0] !== "cell") continue;
				var f = ft(l[1]);
				if (o.length <= f.r)
					for (a = o.length; a <= f.r; ++a)
						if (!o[a]) o[a] = [];
				a = f.r;
				i = f.c;
				switch (l[2]) {
				case "t":
					o[a][i] = e(l[3]);
					break;
				case "v":
					o[a][i] = +l[3];
					break;
				case "vtf":
					var c = l[l.length - 1];
				case "vtc":
					switch (l[3]) {
					case "nl":
						o[a][i] = +l[4] ? true : false;
						break;
					default:
						o[a][i] = +l[4];
						break
					}
					if (l[2] == "vtf") o[a][i] = [o[a][i], c]
				}
			}
			if (t && t.sheetRows) o = o.slice(0, t.sheetRows);
			return o
		}

		function n(e, r) {
			return bt(t(e, r), r)
		}

		function a(e, r) {
			return gt(n(e, r), r)
		}
		var i = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join(
			"\n");
		var s = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join("\n") + "\n";
		var o = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join("\n");
		var l = "--SocialCalcSpreadsheetControlSave--";

		function f(e) {
			if (!e || !e["!ref"]) return "";
			var t = [],
				n = [],
				a, i = "";
			var s = ut(e["!ref"]);
			var o = Array.isArray(e);
			for (var l = s.s.r; l <= s.e.r; ++l) {
				for (var f = s.s.c; f <= s.e.c; ++f) {
					i = ct({
						r: l,
						c: f
					});
					a = o ? (e[l] || [])[f] : e[i];
					if (!a || a.v == null || a.t === "z") continue;
					n = ["cell", i, "t"];
					switch (a.t) {
					case "s":
						;
					case "str":
						n.push(r(a.v));
						break;
					case "n":
						if (!a.f) {
							n[2] = "v";
							n[3] = a.v
						} else {
							n[2] = "vtf";
							n[3] = "n";
							n[4] = a.v;
							n[5] = r(a.f)
						}
						break;
					case "b":
						n[2] = "vt" + (a.f ? "f" : "c");
						n[3] = "nl";
						n[4] = a.v ? "1" : "0";
						n[5] = r(a.f || (a.v ? "TRUE" : "FALSE"));
						break;
					case "d":
						var c = q(ae(a.v));
						n[2] = "vtc";
						n[3] = "nd";
						n[4] = "" + c;
						n[5] = a.w || I.format(a.z || I._table[14], c);
						break;
					case "e":
						continue
					}
					t.push(n.join(":"))
				}
			}
			t.push("sheet:c:" + (s.e.c - s.s.c + 1) + ":r:" + (s.e.r - s.s.r + 1) + ":tvf:1");
			t.push("valueformat:1:text-wiki");
			return t.join("\n")
		}

		function c(e) {
			return [i, s, o, s, f(e), l].join("\n")
		}
		return {
			to_workbook: a,
			to_sheet: n,
			from_sheet: c
		}
	}();
	var to = function () {
		function e(e, r, t, n, a) {
			if (a.raw) r[t][n] = e;
			else if (e === "TRUE") r[t][n] = true;
			else if (e === "FALSE") r[t][n] = false;
			else if (e === "") {} else if (!isNaN(le(e))) r[t][n] = le(e);
			else if (!isNaN(fe(e).getDate())) r[t][n] = ae(e);
			else r[t][n] = e
		}

		function r(r, t) {
			var n = t || {};
			var a = [];
			if (!r || r.length === 0) return a;
			var i = r.split(/[\r\n]/);
			var s = i.length - 1;
			while (s >= 0 && i[s].length === 0) --s;
			var o = 10,
				l = 0;
			var f = 0;
			for (; f <= s; ++f) {
				l = i[f].indexOf(" ");
				if (l == -1) l = i[f].length;
				else l++;
				o = Math.max(o, l)
			}
			for (f = 0; f <= s; ++f) {
				a[f] = [];
				var c = 0;
				e(i[f].slice(0, o).trim(), a, f, c, n);
				for (c = 1; c <= (i[f].length - o) / 10 + 1; ++c) e(i[f].slice(o + (c - 1) * 10, o + c * 10).trim(), a, f, c, n)
			}
			if (n.sheetRows) a = a.slice(0, n.sheetRows);
			return a
		}
		var t = {
			44: ",",
			9: "\t",
			59: ";"
		};
		var n = {
			44: 3,
			9: 2,
			59: 1
		};

		function a(e) {
			var r = {},
				a = false,
				i = 0,
				s = 0;
			for (; i < e.length; ++i) {
				if ((s = e.charCodeAt(i)) == 34) a = !a;
				else if (!a && s in t) r[s] = (r[s] || 0) + 1
			}
			s = [];
			for (i in r)
				if (r.hasOwnProperty(i)) {
					s.push([r[i], i])
				}
			if (!s.length) {
				r = n;
				for (i in r)
					if (r.hasOwnProperty(i)) {
						s.push([r[i], i])
					}
			}
			s.sort(function (e, r) {
				return e[0] - r[0] || n[e[1]] - n[r[1]]
			});
			return t[s.pop()[1]]
		}

		function i(e, r) {
			var t = r || {};
			var n = "";
			if (v != null && t.dense == null) t.dense = v;
			var i = t.dense ? [] : {};
			var s = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			if (e.slice(0, 4) == "sep=" && e.charCodeAt(5) == 10) {
				n = e.charAt(4);
				e = e.slice(6)
			} else n = a(e.slice(0, 1024));
			var o = 0,
				l = 0,
				f = 0;
			var c = 0,
				u = 0,
				h = n.charCodeAt(0),
				d = false,
				p = 0;
			e = e.replace(/\r\n/gm, "\n");
			var g = t.dateNF != null ? N(t.dateNF) : null;

			function m() {
				var r = e.slice(c, u);
				var n = {};
				if (r.charAt(0) == '"' && r.charAt(r.length - 1) == '"') r = r.slice(1, -1).replace(/""/g, '"');
				if (r.length === 0) n.t = "z";
				else if (t.raw) {
					n.t = "s";
					n.v = r
				} else if (r.trim().length === 0) {
					n.t = "s";
					n.v = r
				} else if (r.charCodeAt(0) == 61) {
					if (r.charCodeAt(1) == 34 && r.charCodeAt(r.length - 1) == 34) {
						n.t = "s";
						n.v = r.slice(2, -1).replace(/""/g, '"')
					} else if (Yf(r)) {
						n.t = "n";
						n.f = r.slice(1)
					} else {
						n.t = "s";
						n.v = r
					}
				} else if (r == "TRUE") {
					n.t = "b";
					n.v = true
				} else if (r == "FALSE") {
					n.t = "b";
					n.v = false
				} else if (!isNaN(f = le(r))) {
					n.t = "n";
					if (t.cellText !== false) n.w = r;
					n.v = f
				} else if (!isNaN(fe(r).getDate()) || g && r.match(g)) {
					n.z = t.dateNF || I._table[14];
					var a = 0;
					if (g && r.match(g)) {
						r = L(r, t.dateNF, r.match(g) || []);
						a = 1
					}
					if (t.cellDates) {
						n.t = "d";
						n.v = ae(r, a)
					} else {
						n.t = "n";
						n.v = q(ae(r, a))
					}
					if (t.cellText !== false) n.w = I.format(n.z, n.v instanceof Date ? q(n.v) : n.v);
					if (!t.cellNF) delete n.z
				} else {
					n.t = "s";
					n.v = r
				}
				if (n.t == "z") {} else if (t.dense) {
					if (!i[o]) i[o] = [];
					i[o][l] = n
				} else i[ct({
					c: l,
					r: o
				})] = n;
				c = u + 1;
				if (s.e.c < l) s.e.c = l;
				if (s.e.r < o) s.e.r = o;
				if (p == h) ++l;
				else {
					l = 0;
					++o;
					if (t.sheetRows && t.sheetRows <= o) return true
				}
			}
			e: for (; u < e.length; ++u) switch (p = e.charCodeAt(u)) {
			case 34:
				d = !d;
				break;
			case h:
				;
			case 10:
				;
			case 13:
				if (!d && m()) break e;
				break;
			default:
				break
			}
			if (u - c > 0) m();
			i["!ref"] = ht(s);
			return i
		}

		function s(e, t) {
			if (e.slice(0, 4) == "sep=") return i(e, t);
			if (e.indexOf("\t") >= 0 || e.indexOf(",") >= 0 || e.indexOf(";") >= 0) return i(e, t);
			return bt(r(e, t), t)
		}

		function o(e, r) {
			var t = "",
				n = r.type == "string" ? [0, 0, 0, 0] : fg(e, r);
			switch (r.type) {
			case "base64":
				t = m.decode(e);
				break;
			case "binary":
				t = e;
				break;
			case "buffer":
				if (r.codepage == 65001) t = e.toString("utf8");
				else if (r.codepage && typeof cptable !== "undefined") t = cptable.utils.decode(r.codepage, e);
				else t = e.toString("binary");
				break;
			case "array":
				t = ie(e);
				break;
			case "string":
				t = e;
				break;
			default:
				throw new Error("Unrecognized type " + r.type)
			}
			if (n[0] == 239 && n[1] == 187 && n[2] == 191) t = Ve(t.slice(3));
			else if (r.type == "binary" && typeof cptable !== "undefined" && r.codepage) t = cptable.utils.decode(r.codepage, cptable.utils.encode(
				1252, t));
			if (t.slice(0, 19) == "socialcalc:version:") return ro.to_sheet(r.type == "string" ? t : Ve(t), r);
			return s(t, r)
		}

		function l(e, r) {
			return gt(o(e, r), r)
		}

		function f(e) {
			var r = [];
			var t = dt(e["!ref"]),
				n;
			var a = Array.isArray(e);
			for (var i = t.s.r; i <= t.e.r; ++i) {
				var s = [];
				for (var o = t.s.c; o <= t.e.c; ++o) {
					var l = ct({
						r: i,
						c: o
					});
					n = a ? (e[i] || [])[o] : e[l];
					if (!n || n.v == null) {
						s.push("          ");
						continue
					}
					var f = (n.w || (vt(n), n.w) || "").slice(0, 10);
					while (f.length < 10) f += " ";
					s.push(f + (o === 0 ? " " : ""))
				}
				r.push(s.join(""))
			}
			return r.join("\n")
		}
		return {
			to_workbook: l,
			to_sheet: o,
			from_sheet: f
		}
	}();

	function no(e, r) {
		var t = r || {},
			n = !!t.WTF;
		t.WTF = true;
		try {
			var a = qs.to_workbook(e, t);
			t.WTF = n;
			return a
		} catch (a) {
			t.WTF = n;
			if (!a.message.match(/SYLK bad record ID/) && n) throw a;
			return to.to_workbook(e, r)
		}
	}
	var ao = function () {
		function e(e, r, t) {
			if (!e) return;
			Vr(e, e.l || 0);
			var n = t.Enum || C;
			while (e.l < e.length) {
				var a = e._R(2);
				var i = n[a] || n[255];
				var s = e._R(2);
				var o = e.l + s;
				var l = (i.f || zr)(e, s, t);
				e.l = o;
				if (r(l, i.n, a)) return
			}
		}

		function r(e, r) {
			switch (r.type) {
			case "base64":
				return t(w(m.decode(e)), r);
			case "binary":
				return t(w(e), r);
			case "buffer":
				;
			case "array":
				return t(e, r)
			}
			throw "Unsupported type " + r.type
		}

		function t(r, t) {
			if (!r) return r;
			var n = t || {};
			if (v != null && n.dense == null) n.dense = v;
			var a = n.dense ? [] : {},
				i = "Sheet1",
				s = 0;
			var o = {},
				l = [i];
			var f = {
				s: {
					r: 0,
					c: 0
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var c = n.sheetRows || 0;
			if (r[2] == 2) n.Enum = C;
			else if (r[2] == 26) n.Enum = E;
			else if (r[2] == 14) {
				n.Enum = E;
				n.qpro = true;
				r.l = 0
			} else throw new Error("Unrecognized LOTUS BOF " + r[2]);
			e(r, function (e, t, u) {
				if (r[2] == 2) switch (u) {
				case 0:
					n.vers = e;
					if (e >= 4096) n.qpro = true;
					break;
				case 6:
					f = e;
					break;
				case 15:
					if (!n.qpro) e[1].v = e[1].v.slice(1);
				case 13:
					;
				case 14:
					;
				case 16:
					;
				case 51:
					if (u == 14 && (e[2] & 112) == 112 && (e[2] & 15) > 1 && (e[2] & 15) < 15) {
						e[1].z = n.dateNF || I._table[14];
						if (n.cellDates) {
							e[1].t = "d";
							e[1].v = ee(e[1].v)
						}
					}
					if (n.dense) {
						if (!a[e[0].r]) a[e[0].r] = [];
						a[e[0].r][e[0].c] = e[1]
					} else a[ct(e[0])] = e[1];
					break
				} else switch (u) {
				case 22:
					e[1].v = e[1].v.slice(1);
				case 23:
					;
				case 24:
					;
				case 25:
					;
				case 37:
					;
				case 39:
					;
				case 40:
					if (e[3] > s) {
						a["!ref"] = ht(f);
						o[i] = a;
						a = n.dense ? [] : {};
						f = {
							s: {
								r: 0,
								c: 0
							},
							e: {
								r: 0,
								c: 0
							}
						};
						s = e[3];
						i = "Sheet" + (s + 1);
						l.push(i)
					}
					if (c > 0 && e[0].r >= c) break;
					if (n.dense) {
						if (!a[e[0].r]) a[e[0].r] = [];
						a[e[0].r][e[0].c] = e[1]
					} else a[ct(e[0])] = e[1];
					if (f.e.c < e[0].c) f.e.c = e[0].c;
					if (f.e.r < e[0].r) f.e.r = e[0].r;
					break;
				default:
					break
				}
			}, n);
			a["!ref"] = ht(f);
			o[i] = a;
			return {
				SheetNames: l,
				Sheets: o
			}
		}

		function n(e) {
			var r = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			r.s.c = e._R(2);
			r.s.r = e._R(2);
			r.e.c = e._R(2);
			r.e.r = e._R(2);
			if (r.s.c == 65535) r.s.c = r.e.c = r.s.r = r.e.r = 0;
			return r
		}

		function a(e, r, t) {
			var n = [{
				c: 0,
				r: 0
			}, {
				t: "n",
				v: 0
			}, 0];
			if (t.qpro && t.vers != 20768) {
				n[0].c = e._R(1);
				e.l++;
				n[0].r = e._R(2);
				e.l += 2
			} else {
				n[2] = e._R(1);
				n[0].c = e._R(2);
				n[0].r = e._R(2)
			}
			return n
		}

		function i(e, r, t) {
			var n = e.l + r;
			var i = a(e, r, t);
			i[1].t = "s";
			if (t.vers == 20768) {
				e.l++;
				var s = e._R(1);
				i[1].v = e._R(s, "utf8");
				return i
			}
			if (t.qpro) e.l++;
			i[1].v = e._R(n - e.l, "cstr");
			return i
		}

		function s(e, r, t) {
			var n = a(e, r, t);
			n[1].v = e._R(2, "i");
			return n
		}

		function o(e, r, t) {
			var n = a(e, r, t);
			n[1].v = e._R(8, "f");
			return n
		}

		function l(e, r, t) {
			var n = e.l + r;
			var i = a(e, r, t);
			i[1].v = e._R(8, "f");
			if (t.qpro) e.l = n;
			else {
				var s = e._R(2);
				e.l += s
			}
			return i
		}

		function f(e) {
			var r = [{
				c: 0,
				r: 0
			}, {
				t: "n",
				v: 0
			}, 0];
			r[0].r = e._R(2);
			r[3] = e[e.l++];
			r[0].c = e[e.l++];
			return r
		}

		function c(e, r) {
			var t = f(e, r);
			t[1].t = "s";
			t[1].v = e._R(r - 4, "cstr");
			return t
		}

		function u(e, r) {
			var t = f(e, r);
			t[1].v = e._R(2);
			var n = t[1].v >> 1;
			if (t[1].v & 1) {
				switch (n & 7) {
				case 1:
					n = (n >> 3) * 500;
					break;
				case 2:
					n = (n >> 3) / 20;
					break;
				case 4:
					n = (n >> 3) / 2e3;
					break;
				case 6:
					n = (n >> 3) / 16;
					break;
				case 7:
					n = (n >> 3) / 64;
					break;
				default:
					throw "unknown NUMBER_18 encoding " + (n & 7)
				}
			}
			t[1].v = n;
			return t
		}

		function h(e, r) {
			var t = f(e, r);
			var n = e._R(4);
			var a = e._R(4);
			var i = e._R(2);
			if (i == 65535) {
				t[1].v = 0;
				return t
			}
			var s = i & 32768;
			i = (i & 32767) - 16446;
			t[1].v = (s * 2 - 1) * ((i > 0 ? a << i : a >>> -i) + (i > -32 ? n << i + 32 : n >>> -(i + 32)));
			return t
		}

		function d(e, r) {
			var t = h(e, 14);
			e.l += r - 14;
			return t
		}

		function p(e, r) {
			var t = f(e, r);
			var n = e._R(4);
			t[1].v = n >> 6;
			return t
		}

		function g(e, r) {
			var t = f(e, r);
			var n = e._R(8, "f");
			t[1].v = n;
			return t
		}

		function b(e, r) {
			var t = g(e, 14);
			e.l += r - 10;
			return t
		}
		var C = {
			0: {
				n: "BOF",
				f: Wa
			},
			1: {
				n: "EOF"
			},
			2: {
				n: "CALCMODE"
			},
			3: {
				n: "CALCORDER"
			},
			4: {
				n: "SPLIT"
			},
			5: {
				n: "SYNC"
			},
			6: {
				n: "RANGE",
				f: n
			},
			7: {
				n: "WINDOW1"
			},
			8: {
				n: "COLW1"
			},
			9: {
				n: "WINTWO"
			},
			10: {
				n: "COLW2"
			},
			11: {
				n: "NAME"
			},
			12: {
				n: "BLANK"
			},
			13: {
				n: "INTEGER",
				f: s
			},
			14: {
				n: "NUMBER",
				f: o
			},
			15: {
				n: "LABEL",
				f: i
			},
			16: {
				n: "FORMULA",
				f: l
			},
			24: {
				n: "TABLE"
			},
			25: {
				n: "ORANGE"
			},
			26: {
				n: "PRANGE"
			},
			27: {
				n: "SRANGE"
			},
			28: {
				n: "FRANGE"
			},
			29: {
				n: "KRANGE1"
			},
			32: {
				n: "HRANGE"
			},
			35: {
				n: "KRANGE2"
			},
			36: {
				n: "PROTEC"
			},
			37: {
				n: "FOOTER"
			},
			38: {
				n: "HEADER"
			},
			39: {
				n: "SETUP"
			},
			40: {
				n: "MARGINS"
			},
			41: {
				n: "LABELFMT"
			},
			42: {
				n: "TITLES"
			},
			43: {
				n: "SHEETJS"
			},
			45: {
				n: "GRAPH"
			},
			46: {
				n: "NGRAPH"
			},
			47: {
				n: "CALCCOUNT"
			},
			48: {
				n: "UNFORMATTED"
			},
			49: {
				n: "CURSORW12"
			},
			50: {
				n: "WINDOW"
			},
			51: {
				n: "STRING",
				f: i
			},
			55: {
				n: "PASSWORD"
			},
			56: {
				n: "LOCKED"
			},
			60: {
				n: "QUERY"
			},
			61: {
				n: "QUERYNAME"
			},
			62: {
				n: "PRINT"
			},
			63: {
				n: "PRINTNAME"
			},
			64: {
				n: "GRAPH2"
			},
			65: {
				n: "GRAPHNAME"
			},
			66: {
				n: "ZOOM"
			},
			67: {
				n: "SYMSPLIT"
			},
			68: {
				n: "NSROWS"
			},
			69: {
				n: "NSCOLS"
			},
			70: {
				n: "RULER"
			},
			71: {
				n: "NNAME"
			},
			72: {
				n: "ACOMM"
			},
			73: {
				n: "AMACRO"
			},
			74: {
				n: "PARSE"
			},
			255: {
				n: "",
				f: zr
			}
		};
		var E = {
			0: {
				n: "BOF"
			},
			1: {
				n: "EOF"
			},
			3: {
				n: "??"
			},
			4: {
				n: "??"
			},
			5: {
				n: "??"
			},
			6: {
				n: "??"
			},
			7: {
				n: "??"
			},
			9: {
				n: "??"
			},
			10: {
				n: "??"
			},
			11: {
				n: "??"
			},
			12: {
				n: "??"
			},
			14: {
				n: "??"
			},
			15: {
				n: "??"
			},
			16: {
				n: "??"
			},
			17: {
				n: "??"
			},
			18: {
				n: "??"
			},
			19: {
				n: "??"
			},
			21: {
				n: "??"
			},
			22: {
				n: "LABEL16",
				f: c
			},
			23: {
				n: "NUMBER17",
				f: h
			},
			24: {
				n: "NUMBER18",
				f: u
			},
			25: {
				n: "FORMULA19",
				f: d
			},
			26: {
				n: "??"
			},
			27: {
				n: "??"
			},
			28: {
				n: "??"
			},
			29: {
				n: "??"
			},
			30: {
				n: "??"
			},
			31: {
				n: "??"
			},
			33: {
				n: "??"
			},
			37: {
				n: "NUMBER25",
				f: p
			},
			39: {
				n: "NUMBER27",
				f: g
			},
			40: {
				n: "FORMULA28",
				f: b
			},
			255: {
				n: "",
				f: zr
			}
		};
		return {
			to_workbook: r
		}
	}();
	var io = function e() {
		var r = Ke("t"),
			t = Ke("rPr"),
			n = /<(?:\w+:)?r>/g,
			a = /<\/(?:\w+:)?r>/,
			s = /\r\n/g;
		var o = function e(r, t, n) {
			var a = {},
				s = 65001,
				o = "";
			var l = false;
			var e = r.match(Ae),
				f = 0;
			if (e)
				for (; f != e.length; ++f) {
					var c = Be(e[f]);
					switch (c[0].replace(/\w*:/g, "")) {
					case "<condense":
						break;
					case "<extend":
						break;
					case "<shadow":
						if (!c.val) break;
					case "<shadow>":
						;
					case "<shadow/>":
						a.shadow = 1;
						break;
					case "</shadow>":
						break;
					case "<charset":
						if (c.val == "1") break;
						s = i[parseInt(c.val, 10)];
						break;
					case "<outline":
						if (!c.val) break;
					case "<outline>":
						;
					case "<outline/>":
						a.outline = 1;
						break;
					case "</outline>":
						break;
					case "<rFont":
						a.name = c.val;
						break;
					case "<sz":
						a.sz = c.val;
						break;
					case "<strike":
						if (!c.val) break;
					case "<strike>":
						;
					case "<strike/>":
						a.strike = 1;
						break;
					case "</strike>":
						break;
					case "<u":
						if (!c.val) break;
						switch (c.val) {
						case "double":
							a.uval = "double";
							break;
						case "singleAccounting":
							a.uval = "single-accounting";
							break;
						case "doubleAccounting":
							a.uval = "double-accounting";
							break
						};
					case "<u>":
						;
					case "<u/>":
						a.u = 1;
						break;
					case "</u>":
						break;
					case "<b":
						if (c.val == "0") break;
					case "<b>":
						;
					case "<b/>":
						a.b = 1;
						break;
					case "</b>":
						break;
					case "<i":
						if (c.val == "0") break;
					case "<i>":
						;
					case "<i/>":
						a.i = 1;
						break;
					case "</i>":
						break;
					case "<color":
						if (c.rgb) a.color = c.rgb.slice(2, 8);
						break;
					case "<family":
						a.family = c.val;
						break;
					case "<vertAlign":
						o = c.val;
						break;
					case "<scheme":
						break;
					case "<extLst":
						;
					case "<extLst>":
						;
					case "</extLst>":
						break;
					case "<ext":
						l = true;
						break;
					case "</ext>":
						l = false;
						break;
					default:
						if (c[0].charCodeAt(1) !== 47 && !l) throw new Error("Unrecognized rich format " + c[0])
					}
				}
			var u = [];
			if (a.u) u.push("text-decoration: underline;");
			if (a.uval) u.push("text-underline-style:" + a.uval + ";");
			if (a.sz) u.push("font-size:" + a.sz + "pt;");
			if (a.outline) u.push("text-effect: outline;");
			if (a.shadow) u.push("text-shadow: auto;");
			t.push('<span style="' + u.join("") + '">');
			if (a.b) {
				t.push("<b>");
				n.push("</b>")
			}
			if (a.i) {
				t.push("<i>");
				n.push("</i>")
			}
			if (a.strike) {
				t.push("<s>");
				n.push("</s>")
			}
			if (o == "superscript") o = "sup";
			else if (o == "subscript") o = "sub";
			if (o != "") {
				t.push("<" + o + ">");
				n.push("</" + o + ">")
			}
			n.push("</span>");
			return s
		};

		function l(e) {
			var n = [
				[], "", []
			];
			var a = e.match(r);
			if (!a) return "";
			n[1] = a[1];
			var i = e.match(t);
			if (i) o(i[1], n[0], n[2]);
			return n[0].join("") + n[1].replace(s, "<br/>") + n[2].join("")
		}
		return function e(r) {
			return r.replace(n, "").split(a).map(l).join("")
		}
	}();
	var so = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
		oo = /<(?:\w+:)?r>/;
	var lo = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;

	function fo(e, r) {
		var t = r ? r.cellHTML : true;
		var n = {};
		if (!e) return null;
		if (e.match(/^\s*<(?:\w+:)?t[^>]*>/)) {
			n.t = Ie(Ve(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""));
			n.r = Ve(e);
			if (t) n.h = Le(n.t)
		} else if (e.match(oo)) {
			n.r = Ve(e);
			n.t = Ie(Ve((e.replace(lo, "").match(so) || []).join("").replace(Ae, "")));
			if (t) n.h = io(n.r)
		}
		return n
	}
	var co = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;
	var uo = /<(?:\w+:)?(?:si|sstItem)>/g;
	var ho = /<\/(?:\w+:)?(?:si|sstItem)>/;

	function po(e, r) {
		var t = [],
			n = "";
		if (!e) return t;
		var a = e.match(co);
		if (a) {
			n = a[2].replace(uo, "").split(ho);
			for (var i = 0; i != n.length; ++i) {
				var s = fo(n[i].trim(), r);
				if (s != null) t[t.length] = s
			}
			a = Be(a[1]);
			t.Count = a.count;
			t.Unique = a.uniqueCount
		}
		return t
	}
	In.SST = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
	var vo = /^\s|\s$|[\t\n\r]/;

	function go(e, r) {
		if (!r.bookSST) return "";
		var t = [Se];
		t[t.length] = tr("sst", null, {
			xmlns: ir.main[0],
			count: e.Count,
			uniqueCount: e.Unique
		});
		for (var n = 0; n != e.length; ++n) {
			if (e[n] == null) continue;
			var a = e[n];
			var i = "<si>";
			if (a.r) i += a.r;
			else {
				i += "<t";
				if (!a.t) a.t = "";
				if (a.t.match(vo)) i += ' xml:space="preserve"';
				i += ">" + Oe(a.t) + "</t>"
			}
			i += "</si>";
			t[t.length] = i
		}
		if (t.length > 2) {
			t[t.length] = "</sst>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}

	function mo(e) {
		return [e._R(4), e._R(4)]
	}

	function bo(e, r) {
		var t = [];
		var n = false;
		Gr(e, function e(a, i, s) {
			switch (s) {
			case 159:
				t.Count = a[0];
				t.Unique = a[1];
				break;
			case 19:
				t.push(a);
				break;
			case 160:
				return true;
			case 35:
				n = true;
				break;
			case 36:
				n = false;
				break;
			default:
				if (i.indexOf("Begin") > 0) {} else if (i.indexOf("End") > 0) {}
				if (!n || r.WTF) throw new Error("Unexpected record " + s + " " + i)
			}
		});
		return t
	}

	function Co(e, r) {
		if (!r) r = Xr(8);
		r._W(4, e.Count);
		r._W(4, e.Unique);
		return r
	}
	var Eo = _t;

	function ko(e) {
		var r = jr();
		Kr(r, "BrtBeginSst", Co(e));
		for (var t = 0; t < e.length; ++t) Kr(r, "BrtSSTItem", Eo(e[t]));
		Kr(r, "BrtEndSst");
		return r.end()
	}

	function So(e) {
		if (typeof cptable !== "undefined") return cptable.utils.encode(t, e);
		var r = [],
			n = e.split("");
		for (var a = 0; a < n.length; ++a) r[a] = n[a].charCodeAt(0);
		return r
	}

	function wo(e, r) {
		var t = {};
		t.Major = e._R(2);
		t.Minor = e._R(2);
		if (r >= 4) e.l += r - 4;
		return t
	}

	function Ao(e) {
		var r = {};
		r.id = e._R(0, "lpp4");
		r.R = wo(e, 4);
		r.U = wo(e, 4);
		r.W = wo(e, 4);
		return r
	}

	function _o(e) {
		var r = e._R(4);
		var t = e.l + r - 4;
		var n = {};
		var a = e._R(4);
		var i = [];
		while (a-- > 0) i.push({
			t: e._R(4),
			v: e._R(0, "lpp4")
		});
		n.name = e._R(0, "lpp4");
		n.comps = i;
		if (e.l != t) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + t);
		return n
	}

	function Ro(e) {
		var r = [];
		e.l += 4;
		var t = e._R(4);
		while (t-- > 0) r.push(_o(e));
		return r
	}

	function Bo(e) {
		var r = [];
		e.l += 4;
		var t = e._R(4);
		while (t-- > 0) r.push(e._R(0, "lpp4"));
		return r
	}

	function To(e) {
		var r = {};
		e._R(4);
		e.l += 4;
		r.id = e._R(0, "lpp4");
		r.name = e._R(0, "lpp4");
		r.R = wo(e, 4);
		r.U = wo(e, 4);
		r.W = wo(e, 4);
		return r
	}

	function yo(e) {
		var r = To(e);
		r.ename = e._R(0, "8lpp4");
		r.blksz = e._R(4);
		r.cmode = e._R(4);
		if (e._R(4) != 4) throw new Error("Bad !Primary record");
		return r
	}

	function xo(e, r) {
		var t = e.l + r;
		var n = {};
		n.Flags = e._R(4) & 63;
		e.l += 4;
		n.AlgID = e._R(4);
		var a = false;
		switch (n.AlgID) {
		case 26126:
			;
		case 26127:
			;
		case 26128:
			a = n.Flags == 36;
			break;
		case 26625:
			a = n.Flags == 4;
			break;
		case 0:
			a = n.Flags == 16 || n.Flags == 4 || n.Flags == 36;
			break;
		default:
			throw "Unrecognized encryption algorithm: " + n.AlgID
		}
		if (!a) throw new Error("Encryption Flags/AlgID mismatch");
		n.AlgIDHash = e._R(4);
		n.KeySize = e._R(4);
		n.ProviderType = e._R(4);
		e.l += 8;
		n.CSPName = e._R(t - e.l >> 1, "utf16le");
		e.l = t;
		return n
	}

	function Io(e, r) {
		var t = {},
			n = e.l + r;
		e.l += 4;
		t.Salt = e.slice(e.l, e.l + 16);
		e.l += 16;
		t.Verifier = e.slice(e.l, e.l + 16);
		e.l += 16;
		e._R(4);
		t.VerifierHash = e.slice(e.l, n);
		e.l = n;
		return t
	}

	function Do(e) {
		var r = wo(e);
		switch (r.Minor) {
		case 2:
			return [r.Minor, Fo(e, r)];
		case 3:
			return [r.Minor, Oo(e, r)];
		case 4:
			return [r.Minor, Po(e, r)]
		}
		throw new Error("ECMA-376 Encrypted file unrecognized Version: " + r.Minor)
	}

	function Fo(e) {
		var r = e._R(4);
		if ((r & 63) != 36) throw new Error("EncryptionInfo mismatch");
		var t = e._R(4);
		var n = xo(e, t);
		var a = Io(e, e.length - e.l);
		return {
			t: "Std",
			h: n,
			v: a
		}
	}

	function Oo() {
		throw new Error("File is password-protected: ECMA-376 Extensible")
	}

	function Po(e) {
		var r = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
		e.l += 4;
		var t = e._R(e.length - e.l, "utf8");
		var n = {};
		t.replace(Ae, function e(t) {
			var a = Be(t);
			switch (Te(a[0])) {
			case "<?xml":
				break;
			case "<encryption":
				;
			case "</encryption>":
				break;
			case "<keyData":
				r.forEach(function (e) {
					n[e] = a[e]
				});
				break;
			case "<dataIntegrity":
				n.encryptedHmacKey = a.encryptedHmacKey;
				n.encryptedHmacValue = a.encryptedHmacValue;
				break;
			case "<keyEncryptors>":
				;
			case "<keyEncryptors":
				n.encs = [];
				break;
			case "</keyEncryptors>":
				break;
			case "<keyEncryptor":
				n.uri = a.uri;
				break;
			case "</keyEncryptor>":
				break;
			case "<encryptedKey":
				n.encs.push(a);
				break;
			default:
				throw a[0]
			}
		});
		return n
	}

	function No(e, r) {
		var t = {};
		var n = t.EncryptionVersionInfo = wo(e, 4);
		r -= 4;
		if (n.Minor != 2) throw new Error("unrecognized minor version code: " + n.Minor);
		if (n.Major > 4 || n.Major < 2) throw new Error("unrecognized major version code: " + n.Major);
		t.Flags = e._R(4);
		r -= 4;
		var a = e._R(4);
		r -= 4;
		t.EncryptionHeader = xo(e, a);
		r -= a;
		t.EncryptionVerifier = Io(e, r);
		return t
	}

	function Lo(e) {
		var r = {};
		var t = r.EncryptionVersionInfo = wo(e, 4);
		if (t.Major != 1 || t.Minor != 1) throw "unrecognized version code " + t.Major + " : " + t.Minor;
		r.Salt = e._R(16);
		r.EncryptedVerifier = e._R(16);
		r.EncryptedVerifierHash = e._R(16);
		return r
	}

	function Mo(e) {
		var r = 0,
			t;
		var n = So(e);
		var a = n.length + 1,
			i, s;
		var o, l, f;
		t = k(a);
		t[0] = n.length;
		for (i = 1; i != a; ++i) t[i] = n[i - 1];
		for (i = a - 1; i >= 0; --i) {
			s = t[i];
			o = (r & 16384) === 0 ? 0 : 1;
			l = r << 1 & 32767;
			f = o | l;
			r = f ^ s
		}
		return r ^ 52811
	}
	var Wo = function () {
		var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0];
		var r = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163];
		var t = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906,
			5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341,
			19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201,
			24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456,
			30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766,
			3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628
		];
		var n = function (e) {
			return (e / 2 | e * 128) & 255
		};
		var a = function (e, r) {
			return n(e ^ r)
		};
		var i = function (e) {
			var n = r[e.length - 1];
			var a = 104;
			for (var i = e.length - 1; i >= 0; --i) {
				var s = e[i];
				for (var o = 0; o != 7; ++o) {
					if (s & 64) n ^= t[a];
					s *= 2;
					--a
				}
			}
			return n
		};
		return function (r) {
			var t = So(r);
			var n = i(t);
			var s = t.length;
			var o = k(16);
			for (var l = 0; l != 16; ++l) o[l] = 0;
			var f, c, u;
			if ((s & 1) === 1) {
				f = n >> 8;
				o[s] = a(e[0], f);
				--s;
				f = n & 255;
				c = t[t.length - 1];
				o[s] = a(c, f)
			}
			while (s > 0) {
				--s;
				f = n >> 8;
				o[s] = a(t[s], f);
				--s;
				f = n & 255;
				o[s] = a(t[s], f)
			}
			s = 15;
			u = 15 - t.length;
			while (u > 0) {
				f = n >> 8;
				o[s] = a(e[u], f);
				--s;
				--u;
				f = n & 255;
				o[s] = a(t[s], f);
				--s;
				--u
			}
			return o
		}
	}();
	var Uo = function (e, r, t, n, a) {
		if (!a) a = r;
		if (!n) n = Wo(e);
		var i, s;
		for (i = 0; i != r.length; ++i) {
			s = r[i];
			s ^= n[t];
			s = (s >> 5 | s << 3) & 255;
			a[i] = s;
			++t
		}
		return [a, t, n]
	};
	var Ho = function (e) {
		var r = 0,
			t = Wo(e);
		return function (e) {
			var n = Uo("", e, r, t);
			r = n[1];
			return n[0]
		}
	};

	function Vo(e, r, t, n) {
		var a = {
			key: Wa(e),
			verificationBytes: Wa(e)
		};
		if (t.password) a.verifier = Mo(t.password);
		n.valid = a.verificationBytes === a.verifier;
		if (n.valid) n.insitu = Ho(t.password);
		return a
	}

	function zo(e, r, t) {
		var n = t || {};
		n.Info = e._R(2);
		e.l -= 2;
		if (n.Info === 1) n.Data = Lo(e, r);
		else n.Data = No(e, r);
		return n
	}

	function Xo(e, r, t) {
		var n = {
			Type: t.biff >= 8 ? e._R(2) : 0
		};
		if (n.Type) zo(e, r - 2, n);
		else Vo(e, t.biff >= 8 ? r : r - 2, t, n);
		return n
	}
	var Go = function () {
		function e(e, t) {
			switch (t.type) {
			case "base64":
				return r(m.decode(e), t);
			case "binary":
				return r(e, t);
			case "buffer":
				return r(e.toString("binary"), t);
			case "array":
				return r(ie(e), t)
			}
			throw new Error("Unrecognized type " + t.type)
		}

		function r(e, r) {
			var t = r || {};
			var n = t.dense ? [] : {};
			var a = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			if (!e.match(/\\trowd/)) throw new Error("RTF missing table");
			n["!ref"] = ht(a);
			return n
		}

		function t(r, t) {
			return gt(e(r, t), t)
		}

		function n(e) {
			var r = ["{\\rtf1\\ansi"];
			var t = dt(e["!ref"]),
				n;
			var a = Array.isArray(e);
			for (var i = t.s.r; i <= t.e.r; ++i) {
				r.push("\\trowd\\trautofit1");
				for (var s = t.s.c; s <= t.e.c; ++s) r.push("\\cellx" + (s + 1));
				r.push("\\pard\\intbl");
				for (s = t.s.c; s <= t.e.c; ++s) {
					var o = ct({
						r: i,
						c: s
					});
					n = a ? (e[i] || [])[s] : e[o];
					if (!n || n.v == null && (!n.f || n.F)) continue;
					r.push(" " + (n.w || (vt(n), n.w)));
					r.push("\\cell")
				}
				r.push("\\pard\\intbl\\row")
			}
			return r.join("") + "}"
		}
		return {
			to_workbook: t,
			to_sheet: e,
			from_sheet: n
		}
	}();

	function jo(e) {
		var r = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
		return [parseInt(r.slice(0, 2), 16), parseInt(r.slice(2, 4), 16), parseInt(r.slice(4, 6), 16)]
	}

	function Ko(e) {
		for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
		return t.toString(16).toUpperCase().slice(1)
	}

	function Yo(e) {
		var r = e[0] / 255,
			t = e[1] / 255,
			n = e[2] / 255;
		var a = Math.max(r, t, n),
			i = Math.min(r, t, n),
			s = a - i;
		if (s === 0) return [0, 0, r];
		var o = 0,
			l = 0,
			f = a + i;
		l = s / (f > 1 ? 2 - f : f);
		switch (a) {
		case r:
			o = ((t - n) / s + 6) % 6;
			break;
		case t:
			o = (n - r) / s + 2;
			break;
		case n:
			o = (r - t) / s + 4;
			break
		}
		return [o / 6, l, f / 2]
	}

	function $o(e) {
		var r = e[0],
			t = e[1],
			n = e[2];
		var a = t * 2 * (n < .5 ? n : 1 - n),
			i = n - a / 2;
		var s = [i, i, i],
			o = 6 * r;
		var l;
		if (t !== 0) switch (o | 0) {
		case 0:
			;
		case 6:
			l = a * o;
			s[0] += a;
			s[1] += l;
			break;
		case 1:
			l = a * (2 - o);
			s[0] += l;
			s[1] += a;
			break;
		case 2:
			l = a * (o - 2);
			s[1] += a;
			s[2] += l;
			break;
		case 3:
			l = a * (4 - o);
			s[1] += l;
			s[2] += a;
			break;
		case 4:
			l = a * (o - 4);
			s[2] += a;
			s[0] += l;
			break;
		case 5:
			l = a * (6 - o);
			s[2] += l;
			s[0] += a;
			break
		}
		for (var f = 0; f != 3; ++f) s[f] = Math.round(s[f] * 255);
		return s
	}

	function Zo(e, r) {
		if (r === 0) return e;
		var t = Yo(jo(e));
		if (r < 0) t[2] = t[2] * (1 + r);
		else t[2] = 1 - (1 - t[2]) * (1 - r);
		return Ko($o(t))
	}
	var Qo = 6,
		Jo = 15,
		qo = 1,
		el = Qo;

	function rl(e) {
		return Math.floor((e + Math.round(128 / el) / 256) * el)
	}

	function tl(e) {
		return Math.floor((e - 5) / el * 100 + .5) / 100
	}

	function nl(e) {
		return Math.round((e * el + 5) / el * 256) / 256
	}

	function al(e) {
		return nl(tl(rl(e)))
	}

	function il(e) {
		var r = Math.abs(e - al(e)),
			t = el;
		if (r > .005)
			for (el = qo; el < Jo; ++el)
				if (Math.abs(e - al(e)) <= r) {
					r = Math.abs(e - al(e));
					t = el
				}
		el = t
	}

	function sl(e) {
		if (e.width) {
			e.wpx = rl(e.width);
			e.wch = tl(e.wpx);
			e.MDW = el
		} else if (e.wpx) {
			e.wch = tl(e.wpx);
			e.width = nl(e.wch);
			e.MDW = el
		} else if (typeof e.wch == "number") {
			e.width = nl(e.wch);
			e.wpx = rl(e.width);
			e.MDW = el
		}
		if (e.customWidth) delete e.customWidth
	}
	var ol = 96,
		ll = ol;

	function fl(e) {
		return e * 96 / ll
	}

	function cl(e) {
		return e * ll / 96
	}
	var ul = {
		None: "none",
		Solid: "solid",
		Gray50: "mediumGray",
		Gray75: "darkGray",
		Gray25: "lightGray",
		HorzStripe: "darkHorizontal",
		VertStripe: "darkVertical",
		ReverseDiagStripe: "darkDown",
		DiagStripe: "darkUp",
		DiagCross: "darkGrid",
		ThickDiagCross: "darkTrellis",
		ThinHorzStripe: "lightHorizontal",
		ThinVertStripe: "lightVertical",
		ThinReverseDiagStripe: "lightDown",
		ThinHorzCross: "lightGrid"
	};

	function hl(e, r, t, n) {
		r.Borders = [];
		var a = {};
		var i = false;
		e[0].match(Ae).forEach(function (e) {
			var t = Be(e);
			switch (Te(t[0])) {
			case "<borders":
				;
			case "<borders>":
				;
			case "</borders>":
				break;
			case "<border":
				;
			case "<border>":
				;
			case "<border/>":
				a = {};
				if (t.diagonalUp) {
					a.diagonalUp = t.diagonalUp
				}
				if (t.diagonalDown) {
					a.diagonalDown = t.diagonalDown
				}
				r.Borders.push(a);
				break;
			case "</border>":
				break;
			case "<left/>":
				break;
			case "<left":
				;
			case "<left>":
				break;
			case "</left>":
				break;
			case "<right/>":
				break;
			case "<right":
				;
			case "<right>":
				break;
			case "</right>":
				break;
			case "<top/>":
				break;
			case "<top":
				;
			case "<top>":
				break;
			case "</top>":
				break;
			case "<bottom/>":
				break;
			case "<bottom":
				;
			case "<bottom>":
				break;
			case "</bottom>":
				break;
			case "<diagonal":
				;
			case "<diagonal>":
				;
			case "<diagonal/>":
				break;
			case "</diagonal>":
				break;
			case "<horizontal":
				;
			case "<horizontal>":
				;
			case "<horizontal/>":
				break;
			case "</horizontal>":
				break;
			case "<vertical":
				;
			case "<vertical>":
				;
			case "<vertical/>":
				break;
			case "</vertical>":
				break;
			case "<start":
				;
			case "<start>":
				;
			case "<start/>":
				break;
			case "</start>":
				break;
			case "<end":
				;
			case "<end>":
				;
			case "<end/>":
				break;
			case "</end>":
				break;
			case "<color":
				;
			case "<color>":
				break;
			case "<color/>":
				;
			case "</color>":
				break;
			case "<extLst":
				;
			case "<extLst>":
				;
			case "</extLst>":
				break;
			case "<ext":
				i = true;
				break;
			case "</ext>":
				i = false;
				break;
			default:
				if (n && n.WTF) {
					if (!i) throw new Error("unrecognized " + t[0] + " in borders")
				}
			}
		})
	}

	function dl(e, r, t, n) {
		r.Fills = [];
		var a = {};
		var i = false;
		e[0].match(Ae).forEach(function (e) {
			var t = Be(e);
			switch (Te(t[0])) {
			case "<fills":
				;
			case "<fills>":
				;
			case "</fills>":
				break;
			case "<fill>":
				;
			case "<fill":
				;
			case "<fill/>":
				a = {};
				r.Fills.push(a);
				break;
			case "</fill>":
				break;
			case "<gradientFill>":
				break;
			case "<gradientFill":
				;
			case "</gradientFill>":
				r.Fills.push(a);
				a = {};
				break;
			case "<patternFill":
				;
			case "<patternFill>":
				if (t.patternType) a.patternType = t.patternType;
				break;
			case "<patternFill/>":
				;
			case "</patternFill>":
				break;
			case "<bgColor":
				if (!a.bgColor) a.bgColor = {};
				if (t.indexed) a.bgColor.indexed = parseInt(t.indexed, 10);
				if (t.theme) a.bgColor.theme = parseInt(t.theme, 10);
				if (t.tint) a.bgColor.tint = parseFloat(t.tint);
				if (t.rgb) a.bgColor.rgb = t.rgb.slice(-6);
				break;
			case "<bgColor/>":
				;
			case "</bgColor>":
				break;
			case "<fgColor":
				if (!a.fgColor) a.fgColor = {};
				if (t.theme) a.fgColor.theme = parseInt(t.theme, 10);
				if (t.tint) a.fgColor.tint = parseFloat(t.tint);
				if (t.rgb) a.fgColor.rgb = t.rgb.slice(-6);
				break;
			case "<fgColor/>":
				;
			case "</fgColor>":
				break;
			case "<stop":
				;
			case "<stop/>":
				break;
			case "</stop>":
				break;
			case "<color":
				;
			case "<color/>":
				break;
			case "</color>":
				break;
			case "<extLst":
				;
			case "<extLst>":
				;
			case "</extLst>":
				break;
			case "<ext":
				i = true;
				break;
			case "</ext>":
				i = false;
				break;
			default:
				if (n && n.WTF) {
					if (!i) throw new Error("unrecognized " + t[0] + " in fills")
				}
			}
		})
	}

	function pl(e, r, t, n) {
		r.Fonts = [];
		var a = {};
		var s = false;
		e[0].match(Ae).forEach(function (e) {
			var o = Be(e);
			switch (Te(o[0])) {
			case "<fonts":
				;
			case "<fonts>":
				;
			case "</fonts>":
				break;
			case "<font":
				;
			case "<font>":
				break;
			case "</font>":
				;
			case "<font/>":
				r.Fonts.push(a);
				a = {};
				break;
			case "<name":
				if (o.val) a.name = o.val;
				break;
			case "<name/>":
				;
			case "</name>":
				break;
			case "<b":
				a.bold = o.val ? He(o.val) : 1;
				break;
			case "<b/>":
				a.bold = 1;
				break;
			case "<i":
				a.italic = o.val ? He(o.val) : 1;
				break;
			case "<i/>":
				a.italic = 1;
				break;
			case "<u":
				switch (o.val) {
				case "none":
					a.underline = 0;
					break;
				case "single":
					a.underline = 1;
					break;
				case "double":
					a.underline = 2;
					break;
				case "singleAccounting":
					a.underline = 33;
					break;
				case "doubleAccounting":
					a.underline = 34;
					break
				}
				break;
			case "<u/>":
				a.underline = 1;
				break;
			case "<strike":
				a.strike = o.val ? He(o.val) : 1;
				break;
			case "<strike/>":
				a.strike = 1;
				break;
			case "<outline":
				a.outline = o.val ? He(o.val) : 1;
				break;
			case "<outline/>":
				a.outline = 1;
				break;
			case "<shadow":
				a.shadow = o.val ? He(o.val) : 1;
				break;
			case "<shadow/>":
				a.shadow = 1;
				break;
			case "<condense":
				a.condense = o.val ? He(o.val) : 1;
				break;
			case "<condense/>":
				a.condense = 1;
				break;
			case "<extend":
				a.extend = o.val ? He(o.val) : 1;
				break;
			case "<extend/>":
				a.extend = 1;
				break;
			case "<sz":
				if (o.val) a.sz = +o.val;
				break;
			case "<sz/>":
				;
			case "</sz>":
				break;
			case "<vertAlign":
				if (o.val) a.vertAlign = o.val;
				break;
			case "<vertAlign/>":
				;
			case "</vertAlign>":
				break;
			case "<family":
				if (o.val) a.family = parseInt(o.val, 10);
				break;
			case "<family/>":
				;
			case "</family>":
				break;
			case "<scheme":
				if (o.val) a.scheme = o.val;
				break;
			case "<scheme/>":
				;
			case "</scheme>":
				break;
			case "<charset":
				if (o.val == "1") break;
				o.codepage = i[parseInt(o.val, 10)];
				break;
			case "<color":
				if (!a.color) a.color = {};
				if (o.auto) a.color.auto = He(o.auto);
				if (o.rgb) a.color.rgb = o.rgb.slice(-6);
				else if (o.indexed) {
					a.color.index = parseInt(o.indexed, 10);
					var l = Sn[a.color.index];
					if (a.color.index == 81) l = Sn[1];
					if (!l) throw new Error(e);
					a.color.rgb = l[0].toString(16) + l[1].toString(16) + l[2].toString(16)
				} else if (o.theme) {
					a.color.theme = parseInt(o.theme, 10);
					if (o.tint) a.color.tint = parseFloat(o.tint);
					if (o.theme && t.themeElements && t.themeElements.clrScheme) {
						a.color.rgb = Zo(t.themeElements.clrScheme[a.color.theme].rgb, a.color.tint || 0)
					}
				}
				break;
			case "<color/>":
				;
			case "</color>":
				break;
			case "<extLst":
				;
			case "<extLst>":
				;
			case "</extLst>":
				break;
			case "<ext":
				s = true;
				break;
			case "</ext>":
				s = false;
				break;
			default:
				if (n && n.WTF) {
					if (!s) throw new Error("unrecognized " + o[0] + " in fonts")
				}
			}
		})
	}

	function vl(e, r, t) {
		r.NumberFmt = [];
		var n = G(I._table);
		for (var a = 0; a < n.length; ++a) r.NumberFmt[n[a]] = I._table[n[a]];
		var i = e[0].match(Ae);
		if (!i) return;
		for (a = 0; a < i.length; ++a) {
			var s = Be(i[a]);
			switch (Te(s[0])) {
			case "<numFmts":
				;
			case "</numFmts>":
				;
			case "<numFmts/>":
				;
			case "<numFmts>":
				break;
			case "<numFmt":
				{
					var o = Ie(Ve(s.formatCode)),
						l = parseInt(s.numFmtId, 10);r.NumberFmt[l] = o;
					if (l > 0) {
						if (l > 392) {
							for (l = 392; l > 60; --l)
								if (r.NumberFmt[l] == null) break;
							r.NumberFmt[l] = o
						}
						I.load(o, l)
					}
				}
				break;
			case "</numFmt>":
				break;
			default:
				if (t.WTF) throw new Error("unrecognized " + s[0] + " in numFmts")
			}
		}
	}

	function gl(e) {
		var r = ["<numFmts>"];
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function (t) {
			for (var n = t[0]; n <= t[1]; ++n)
				if (e[n] != null) r[r.length] = tr("numFmt", null, {
					numFmtId: n,
					formatCode: Oe(e[n])
				})
		});
		if (r.length === 1) return "";
		r[r.length] = "</numFmts>";
		r[0] = tr("numFmts", null, {
			count: r.length - 2
		}).replace("/>", ">");
		return r.join("")
	}
	var ml = ["numFmtId", "fillId", "fontId", "borderId", "xfId"];
	var bl = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];

	function Cl(e, r, t) {
		r.CellXf = [];
		var n;
		var a = false;
		e[0].match(Ae).forEach(function (e) {
			var i = Be(e),
				s = 0;
			switch (Te(i[0])) {
			case "<cellXfs":
				;
			case "<cellXfs>":
				;
			case "<cellXfs/>":
				;
			case "</cellXfs>":
				break;
			case "<xf":
				;
			case "<xf/>":
				n = i;
				delete n[0];
				for (s = 0; s < ml.length; ++s)
					if (n[ml[s]]) n[ml[s]] = parseInt(n[ml[s]], 10);
				for (s = 0; s < bl.length; ++s)
					if (n[bl[s]]) n[bl[s]] = He(n[bl[s]]);
				if (n.numFmtId > 392) {
					for (s = 392; s > 60; --s)
						if (r.NumberFmt[n.numFmtId] == r.NumberFmt[s]) {
							n.numFmtId = s;
							break
						}
				}
				r.CellXf.push(n);
				break;
			case "</xf>":
				break;
			case "<alignment":
				;
			case "<alignment/>":
				var o = {};
				if (i.vertical) o.vertical = i.vertical;
				if (i.horizontal) o.horizontal = i.horizontal;
				if (i.textRotation != null) o.textRotation = i.textRotation;
				if (i.indent) o.indent = i.indent;
				if (i.wrapText) o.wrapText = i.wrapText;
				n.alignment = o;
				break;
			case "</alignment>":
				break;
			case "<protection":
				;
			case "</protection>":
				;
			case "<protection/>":
				break;
			case "<extLst":
				;
			case "<extLst>":
				;
			case "</extLst>":
				break;
			case "<ext":
				a = true;
				break;
			case "</ext>":
				a = false;
				break;
			default:
				if (t && t.WTF) {
					if (!a) throw new Error("unrecognized " + i[0] + " in cellXfs")
				}
			}
		})
	}

	function El(e) {
		var r = [];
		r[r.length] = tr("cellXfs", null);
		e.forEach(function (e) {
			r[r.length] = tr("xf", null, e)
		});
		r[r.length] = "</cellXfs>";
		if (r.length === 2) return "";
		r[0] = tr("cellXfs", null, {
			count: r.length - 2
		}).replace("/>", ">");
		return r.join("")
	}
	var kl = function e() {
		var r = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/;
		var t = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/;
		var n = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/;
		var a = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/;
		var i = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
		return function e(s, o, l) {
			var f = {};
			if (!s) return f;
			s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			var c;
			if (c = s.match(r)) vl(c, f, l);
			if (c = s.match(a)) pl(c, f, o, l);
			if (c = s.match(n)) dl(c, f, o, l);
			if (c = s.match(i)) hl(c, f, o, l);
			if (c = s.match(t)) Cl(c, f, l);
			return f
		}
	}();
	var Sl = tr("styleSheet", null, {
		xmlns: ir.main[0],
		"xmlns:vt": ir.vt
	});
	In.STY = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";

	function wl(e, r) {
		var t = [Se, Sl],
			n;
		if (e.SSF && (n = gl(e.SSF)) != null) t[t.length] = n;
		t[t.length] =
			'<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';
		t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';
		t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';
		t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
		if (n = El(r.cellXfs)) t[t.length] = n;
		t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
		t[t.length] = '<dxfs count="0"/>';
		t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';
		if (t.length > 2) {
			t[t.length] = "</styleSheet>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}

	function Al(e, r) {
		var t = e._R(2);
		var n = Et(e, r - 2);
		return [t, n]
	}

	function _l(e, r, t) {
		if (!t) t = Xr(6 + 4 * r.length);
		t._W(2, e);
		kt(r, t);
		var n = t.length > t.l ? t.slice(0, t.l) : t;
		if (t.l == null) t.l = t.length;
		return n
	}

	function Rl(e, r, t) {
		var n = {};
		n.sz = e._R(2) / 20;
		var a = $t(e, 2, t);
		if (a.fCondense) n.condense = 1;
		if (a.fExtend) n.extend = 1;
		if (a.fShadow) n.shadow = 1;
		if (a.fOutline) n.outline = 1;
		if (a.fStrikeout) n.strike = 1;
		if (a.fItalic) n.italic = 1;
		var i = e._R(2);
		if (i === 700) n.bold = 1;
		switch (e._R(2)) {
		case 1:
			n.vertAlign = "superscript";
			break;
		case 2:
			n.vertAlign = "subscript";
			break
		}
		var s = e._R(1);
		if (s != 0) n.underline = s;
		var o = e._R(1);
		if (o > 0) n.family = o;
		var l = e._R(1);
		if (l > 0) n.charset = l;
		e.l++;
		n.color = Kt(e, 8);
		switch (e._R(1)) {
		case 1:
			n.scheme = "major";
			break;
		case 2:
			n.scheme = "minor";
			break
		}
		n.name = Et(e, r - 21);
		return n
	}

	function Bl(e, r) {
		if (!r) r = Xr(25 + 4 * 32);
		r._W(2, e.sz * 20);
		Zt(e, r);
		r._W(2, e.bold ? 700 : 400);
		var t = 0;
		if (e.vertAlign == "superscript") t = 1;
		else if (e.vertAlign == "subscript") t = 2;
		r._W(2, t);
		r._W(1, e.underline || 0);
		r._W(1, e.family || 0);
		r._W(1, e.charset || 0);
		r._W(1, 0);
		Yt(e.color, r);
		var n = 0;
		if (e.scheme == "major") n = 1;
		if (e.scheme == "minor") n = 2;
		r._W(1, n);
		kt(e.name, r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	var Tl = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid",
		"darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"
	];
	var yl = K(Tl);
	var xl = zr;

	function Il(e, r) {
		if (!r) r = Xr(4 * 3 + 8 * 7 + 16 * 1);
		var t = yl[e.patternType];
		if (t == null) t = 40;
		r._W(4, t);
		var n = 0;
		if (t != 40) {
			Yt({
				auto: 1
			}, r);
			Yt({
				auto: 1
			}, r);
			for (; n < 12; ++n) r._W(4, 0)
		} else {
			for (; n < 4; ++n) r._W(4, 0);
			for (; n < 12; ++n) r._W(4, 0)
		}
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function Dl(e, r) {
		var t = e.l + r;
		var n = e._R(2);
		var a = e._R(2);
		e.l = t;
		return {
			ixfe: n,
			numFmtId: a
		}
	}

	function Fl(e, r, t) {
		if (!t) t = Xr(16);
		t._W(2, r || 0);
		t._W(2, e.numFmtId || 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		return t
	}

	function Ol(e, r) {
		if (!r) r = Xr(10);
		r._W(1, 0);
		r._W(1, 0);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}
	var Pl = zr;

	function Nl(e, r) {
		if (!r) r = Xr(51);
		r._W(1, 0);
		Ol(null, r);
		Ol(null, r);
		Ol(null, r);
		Ol(null, r);
		Ol(null, r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function Ll(e, r) {
		if (!r) r = Xr(12 + 4 * 10);
		r._W(4, e.xfId);
		r._W(2, 1);
		r._W(1, +e.builtinId);
		r._W(1, 0);
		Ft(e.name || "", r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function Ml(e, r, t) {
		var n = Xr(4 + 256 * 2 * 4);
		n._W(4, e);
		Ft(r, n);
		Ft(t, n);
		return n.length > n.l ? n.slice(0, n.l) : n
	}

	function Wl(e, r, t) {
		var n = {};
		n.NumberFmt = [];
		for (var a in I._table) n.NumberFmt[a] = I._table[a];
		n.CellXf = [];
		n.Fonts = [];
		var i = [];
		var s = false;
		Gr(e, function e(a, o, l) {
			switch (l) {
			case 44:
				n.NumberFmt[a[0]] = a[1];
				I.load(a[1], a[0]);
				break;
			case 43:
				n.Fonts.push(a);
				if (a.color.theme != null && r && r.themeElements && r.themeElements.clrScheme) {
					a.color.rgb = Zo(r.themeElements.clrScheme[a.color.theme].rgb, a.color.tint || 0)
				}
				break;
			case 1025:
				break;
			case 45:
				break;
			case 46:
				break;
			case 47:
				if (i[i.length - 1] == "BrtBeginCellXFs") {
					n.CellXf.push(a)
				}
				break;
			case 48:
				;
			case 507:
				;
			case 572:
				;
			case 475:
				break;
			case 1171:
				;
			case 2102:
				;
			case 1130:
				;
			case 512:
				;
			case 2095:
				;
			case 3072:
				break;
			case 35:
				s = true;
				break;
			case 36:
				s = false;
				break;
			case 37:
				i.push(o);
				break;
			case 38:
				i.pop();
				break;
			default:
				if ((o || "").indexOf("Begin") > 0) i.push(o);
				else if ((o || "").indexOf("End") > 0) i.pop();
				else if (!s || t.WTF) throw new Error("Unexpected record " + l + " " + o)
			}
		});
		return n
	}

	function Ul(e, r) {
		if (!r) return;
		var t = 0;
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function (e) {
			for (var n = e[0]; n <= e[1]; ++n)
				if (r[n] != null) ++t
		});
		if (t == 0) return;
		Kr(e, "BrtBeginFmts", Ct(t));
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function (t) {
			for (var n = t[0]; n <= t[1]; ++n)
				if (r[n] != null) Kr(e, "BrtFmt", _l(n, r[n]))
		});
		Kr(e, "BrtEndFmts")
	}

	function Hl(e) {
		var r = 1;
		if (r == 0) return;
		Kr(e, "BrtBeginFonts", Ct(r));
		Kr(e, "BrtFont", Bl({
			sz: 12,
			color: {
				theme: 1
			},
			name: "Calibri",
			family: 2,
			scheme: "minor"
		}));
		Kr(e, "BrtEndFonts")
	}

	function Vl(e) {
		var r = 2;
		if (r == 0) return;
		Kr(e, "BrtBeginFills", Ct(r));
		Kr(e, "BrtFill", Il({
			patternType: "none"
		}));
		Kr(e, "BrtFill", Il({
			patternType: "gray125"
		}));
		Kr(e, "BrtEndFills")
	}

	function zl(e) {
		var r = 1;
		if (r == 0) return;
		Kr(e, "BrtBeginBorders", Ct(r));
		Kr(e, "BrtBorder", Nl({}));
		Kr(e, "BrtEndBorders")
	}

	function Xl(e) {
		var r = 1;
		Kr(e, "BrtBeginCellStyleXFs", Ct(r));
		Kr(e, "BrtXF", Fl({
			numFmtId: 0,
			fontId: 0,
			fillId: 0,
			borderId: 0
		}, 65535));
		Kr(e, "BrtEndCellStyleXFs")
	}

	function Gl(e, r) {
		Kr(e, "BrtBeginCellXFs", Ct(r.length));
		r.forEach(function (r) {
			Kr(e, "BrtXF", Fl(r, 0))
		});
		Kr(e, "BrtEndCellXFs")
	}

	function jl(e) {
		var r = 1;
		Kr(e, "BrtBeginStyles", Ct(r));
		Kr(e, "BrtStyle", Ll({
			xfId: 0,
			builtinId: 0,
			name: "Normal"
		}));
		Kr(e, "BrtEndStyles")
	}

	function Kl(e) {
		var r = 0;
		Kr(e, "BrtBeginDXFs", Ct(r));
		Kr(e, "BrtEndDXFs")
	}

	function Yl(e) {
		var r = 0;
		Kr(e, "BrtBeginTableStyles", Ml(r, "TableStyleMedium9", "PivotStyleMedium4"));
		Kr(e, "BrtEndTableStyles")
	}

	function $l() {
		return
	}

	function Zl(e, r) {
		var t = jr();
		Kr(t, "BrtBeginStyleSheet");
		Ul(t, e.SSF);
		Hl(t, e);
		Vl(t, e);
		zl(t, e);
		Xl(t, e);
		Gl(t, r.cellXfs);
		jl(t, e);
		Kl(t, e);
		Yl(t, e);
		$l(t, e);
		Kr(t, "BrtEndStyleSheet");
		return t.end()
	}
	In.THEME = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";

	function Ql(e, r, t) {
		r.themeElements.clrScheme = [];
		var n = {};
		(e[0].match(Ae) || []).forEach(function (e) {
			var a = Be(e);
			switch (a[0]) {
			case "<a:clrScheme":
				;
			case "</a:clrScheme>":
				break;
			case "<a:srgbClr":
				n.rgb = a.val;
				break;
			case "<a:sysClr":
				n.rgb = a.lastClr;
				break;
			case "<a:dk1>":
				;
			case "</a:dk1>":
				;
			case "<a:lt1>":
				;
			case "</a:lt1>":
				;
			case "<a:dk2>":
				;
			case "</a:dk2>":
				;
			case "<a:lt2>":
				;
			case "</a:lt2>":
				;
			case "<a:accent1>":
				;
			case "</a:accent1>":
				;
			case "<a:accent2>":
				;
			case "</a:accent2>":
				;
			case "<a:accent3>":
				;
			case "</a:accent3>":
				;
			case "<a:accent4>":
				;
			case "</a:accent4>":
				;
			case "<a:accent5>":
				;
			case "</a:accent5>":
				;
			case "<a:accent6>":
				;
			case "</a:accent6>":
				;
			case "<a:hlink>":
				;
			case "</a:hlink>":
				;
			case "<a:folHlink>":
				;
			case "</a:folHlink>":
				if (a[0].charAt(1) === "/") {
					r.themeElements.clrScheme.push(n);
					n = {}
				} else {
					n.name = a[0].slice(3, a[0].length - 1)
				}
				break;
			default:
				if (t && t.WTF) throw new Error("Unrecognized " + a[0] + " in clrScheme")
			}
		})
	}

	function Jl() {}

	function ql() {}
	var ef = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;
	var rf = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;
	var tf = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;

	function nf(e, r, t) {
		r.themeElements = {};
		var n;
		[
			["clrScheme", ef, Ql],
			["fontScheme", rf, Jl],
			["fmtScheme", tf, ql]
		].forEach(function (a) {
			if (!(n = e.match(a[1]))) throw new Error(a[0] + " not found in themeElements");
			a[2](n, r, t)
		})
	}
	var af = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;

	function sf(e, r) {
		if (!e || e.length === 0) return sf(of());
		var t;
		var n = {};
		if (!(t = e.match(af))) throw new Error("themeElements not found in theme");
		nf(t[0], n, r);
		return n
	}

	function of(e, r) {
		if (r && r.themeXLSX) return r.themeXLSX;
		var t = [Se];
		t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';
		t[t.length] = "<a:themeElements>";
		t[t.length] = '<a:clrScheme name="Office">';
		t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';
		t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';
		t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';
		t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';
		t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';
		t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';
		t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';
		t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';
		t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';
		t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>';
		t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';
		t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';
		t[t.length] = "</a:clrScheme>";
		t[t.length] = '<a:fontScheme name="Office">';
		t[t.length] = "<a:majorFont>";
		t[t.length] = '<a:latin typeface="Cambria"/>';
		t[t.length] = '<a:ea typeface=""/>';
		t[t.length] = '<a:cs typeface=""/>';
		t[t.length] = '<a:font script="Jpan" typeface="ï¼­ï¼³ ï¼°ã‚´ã‚·ãƒƒã‚¯"/>';
		t[t.length] = '<a:font script="Hang" typeface="ë§‘ì€ ê³ ë”•"/>';
		t[t.length] = '<a:font script="Hans" typeface="å®‹ä½“"/>';
		t[t.length] = '<a:font script="Hant" typeface="æ–°ç´°æ˜Žé«”"/>';
		t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>';
		t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
		t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
		t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
		t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
		t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
		t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		t[t.length] = "</a:majorFont>";
		t[t.length] = "<a:minorFont>";
		t[t.length] = '<a:latin typeface="Calibri"/>';
		t[t.length] = '<a:ea typeface=""/>';
		t[t.length] = '<a:cs typeface=""/>';
		t[t.length] = '<a:font script="Jpan" typeface="ï¼­ï¼³ ï¼°ã‚´ã‚·ãƒƒã‚¯"/>';
		t[t.length] = '<a:font script="Hang" typeface="ë§‘ì€ ê³ ë”•"/>';
		t[t.length] = '<a:font script="Hans" typeface="å®‹ä½“"/>';
		t[t.length] = '<a:font script="Hant" typeface="æ–°ç´°æ˜Žé«”"/>';
		t[t.length] = '<a:font script="Arab" typeface="Arial"/>';
		t[t.length] = '<a:font script="Hebr" typeface="Arial"/>';
		t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>';
		t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
		t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
		t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
		t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
		t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
		t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		t[t.length] = '<a:font script="Viet" typeface="Arial"/>';
		t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		t[t.length] = "</a:minorFont>";
		t[t.length] = "</a:fontScheme>";
		t[t.length] = '<a:fmtScheme name="Office">';
		t[t.length] = "<a:fillStyleLst>";
		t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:lin ang="16200000" scaled="1"/>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] =
			'<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';
		t[t.length] =
			'<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:lin ang="16200000" scaled="0"/>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = "</a:fillStyleLst>";
		t[t.length] = "<a:lnStyleLst>";
		t[t.length] =
			'<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] =
			'<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] =
			'<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] = "</a:lnStyleLst>";
		t[t.length] = "<a:effectStyleLst>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] =
			'<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] =
			'<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] =
			'<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] =
			'<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';
		t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "</a:effectStyleLst>";
		t[t.length] = "<a:bgFillStyleLst>";
		t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] =
			'<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = "</a:bgFillStyleLst>";
		t[t.length] = "</a:fmtScheme>";
		t[t.length] = "</a:themeElements>";
		t[t.length] = "<a:objectDefaults>";
		t[t.length] = "<a:spDef>";
		t[t.length] =
			'<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';
		t[t.length] = "</a:spDef>";
		t[t.length] = "<a:lnDef>";
		t[t.length] =
			'<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';
		t[t.length] = "</a:lnDef>";
		t[t.length] = "</a:objectDefaults>";
		t[t.length] = "<a:extraClrSchemeLst/>";
		t[t.length] = "</a:theme>";
		return t.join("")
	}

	function lf(e, r, t) {
		var n = e.l + r;
		var a = e._R(4);
		if (a === 124226) return;
		if (!t.cellStyles || !Ee) {
			e.l = n;
			return
		}
		var i = e.slice(e.l);
		e.l = n;
		var s;
		try {
			s = new Ee(i)
		} catch (e) {
			return
		}
		var o = be(s, "theme/theme/theme1.xml", true);
		if (!o) return;
		return sf(o, t)
	}

	function ff(e) {
		return e._R(4)
	}

	function cf(e) {
		var r = {};
		r.xclrType = e._R(2);
		r.nTintShade = e._R(2);
		switch (r.xclrType) {
		case 0:
			e.l += 4;
			break;
		case 1:
			r.xclrValue = uf(e, 4);
			break;
		case 2:
			r.xclrValue = ni(e, 4);
			break;
		case 3:
			r.xclrValue = ff(e, 4);
			break;
		case 4:
			e.l += 4;
			break
		}
		e.l += 8;
		return r
	}

	function uf(e, r) {
		return zr(e, r)
	}

	function hf(e, r) {
		return zr(e, r)
	}

	function df(e) {
		var r = e._R(2);
		var t = e._R(2) - 4;
		var n = [r];
		switch (r) {
		case 4:
			;
		case 5:
			;
		case 7:
			;
		case 8:
			;
		case 9:
			;
		case 10:
			;
		case 11:
			;
		case 13:
			n[1] = cf(e, t);
			break;
		case 6:
			n[1] = hf(e, t);
			break;
		case 14:
			;
		case 15:
			n[1] = e._R(t === 1 ? 1 : 2);
			break;
		default:
			throw new Error("Unrecognized ExtProp type: " + r + " " + t)
		}
		return n
	}

	function pf(e, r) {
		var t = e.l + r;
		e.l += 2;
		var n = e._R(2);
		e.l += 2;
		var a = e._R(2);
		var i = [];
		while (a-- > 0) i.push(df(e, t - e.l));
		return {
			ixfe: n,
			ext: i
		}
	}

	function vf(e, r) {
		r.forEach(function (e) {
			switch (e[0]) {
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10:
				break;
			case 11:
				break;
			case 13:
				break;
			case 14:
				break;
			case 15:
				break
			}
		})
	}

	function gf(e) {
		var r = [];
		if (!e) return r;
		var t = 1;
		(e.match(Ae) || []).forEach(function (e) {
			var n = Be(e);
			switch (n[0]) {
			case "<?xml":
				break;
			case "<calcChain":
				;
			case "<calcChain>":
				;
			case "</calcChain>":
				break;
			case "<c":
				delete n[0];
				if (n.i) t = n.i;
				else n.i = t;
				r.push(n);
				break
			}
		});
		return r
	}

	function mf(e) {
		var r = {};
		r.i = e._R(4);
		var t = {};
		t.r = e._R(4);
		t.c = e._R(4);
		r.r = ct(t);
		var n = e._R(1);
		if (n & 2) r.l = "1";
		if (n & 8) r.a = "1";
		return r
	}

	function bf(e, r, t) {
		var n = [];
		var a = false;
		Gr(e, function e(r, i, s) {
			switch (s) {
			case 63:
				n.push(r);
				break;
			default:
				if ((i || "").indexOf("Begin") > 0) {} else if ((i || "").indexOf("End") > 0) {} else if (!a || t.WTF) throw new Error(
					"Unexpected record " + s + " " + i)
			}
		});
		return n
	}

	function Cf() {}

	function Ef(e, r, t) {
		if (!e) return e;
		var n = t || {};
		var a = false,
			i = false;
		Gr(e, function e(r, t, s) {
			if (i) return;
			switch (s) {
			case 359:
				;
			case 363:
				;
			case 364:
				;
			case 366:
				;
			case 367:
				;
			case 368:
				;
			case 369:
				;
			case 370:
				;
			case 371:
				;
			case 472:
				;
			case 577:
				;
			case 578:
				;
			case 579:
				;
			case 580:
				;
			case 581:
				;
			case 582:
				;
			case 583:
				;
			case 584:
				;
			case 585:
				;
			case 586:
				;
			case 587:
				break;
			case 35:
				a = true;
				break;
			case 36:
				a = false;
				break;
			default:
				if ((t || "").indexOf("Begin") > 0) {} else if ((t || "").indexOf("End") > 0) {} else if (!a || n.WTF) throw new Error(
					"Unexpected record " + s.toString(16) + " " + t)
			}
		}, n)
	}
	In.IMG = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
	In.DRAW = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";

	function kf(e, r) {
		if (!e) return "??";
		var t = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
		return r["!id"][t].Target
	}
	var Sf = 1024;

	function wf(e, r) {
		var t = [21600, 21600];
		var n = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(",");
		var a = [tr("xml", null, {
			"xmlns:v": sr.v,
			"xmlns:o": sr.o,
			"xmlns:x": sr.x,
			"xmlns:mv": sr.mv
		}).replace(/\/>/, ">"), tr("o:shapelayout", tr("o:idmap", null, {
			"v:ext": "edit",
			data: e
		}), {
			"v:ext": "edit"
		}), tr("v:shapetype", [tr("v:stroke", null, {
			joinstyle: "miter"
		}), tr("v:path", null, {
			gradientshapeok: "t",
			"o:connecttype": "rect"
		})].join(""), {
			id: "_x0000_t202",
			"o:spt": 202,
			coordsize: t.join(","),
			path: n
		})];
		while (Sf < e * 1e3) Sf += 1e3;
		r.forEach(function (e) {
			var r = ft(e[0]);
			a = a.concat(["<v:shape" + rr({
					id: "_x0000_s" + ++Sf,
					type: "#_x0000_t202",
					style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (e[1].hidden ?
						";visibility:hidden" : ""),
					fillcolor: "#ECFAD4",
					strokecolor: "#edeaa1"
				}) + ">", tr("v:fill", tr("o:fill", null, {
					type: "gradientUnscaled",
					"v:ext": "view"
				}), {
					color2: "#BEFF82",
					angle: "-180",
					type: "gradient"
				}), tr("v:shadow", null, {
					on: "t",
					obscured: "t"
				}), tr("v:path", null, {
					"o:connecttype": "none"
				}), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>",
				"<x:SizeWithCells/>", er("x:Anchor", [r.c, 0, r.r, 0, r.c + 3, 100, r.r + 5, 100].join(",")), er("x:AutoFill", "False"), er("x:Row",
					String(r.r)), er("x:Column", String(r.c)), e[1].hidden ? "" : "<x:Visible/>", "</x:ClientData>", "</v:shape>"
			])
		});
		a.push("</xml>");
		return a.join("")
	}
	In.CMNT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";

	function Af(e, r, t, n, a) {
		for (var i = 0; i != r.length; ++i) {
			var s = r[i];
			var o = mp(me(e, s.replace(/^\//, ""), true), s, a);
			if (!o || !o.length) continue;
			var l = G(t);
			for (var f = 0; f != l.length; ++f) {
				var c = l[f];
				var u = n[c];
				if (u) {
					var h = u[s];
					if (h) _f(c, t[c], o)
				}
			}
		}
	}

	function _f(e, r, t) {
		var n = Array.isArray(r);
		var a;
		t.forEach(function (e) {
			var t = ft(e.ref);
			if (n) {
				if (!r[t.r]) r[t.r] = [];
				a = r[t.r][t.c]
			} else a = r[e.ref];
			if (!a) {
				a = {};
				if (n) r[t.r][t.c] = a;
				else r[e.ref] = a;
				var i = dt(r["!ref"] || "BDWGO1000001:A1");
				if (i.s.r > t.r) i.s.r = t.r;
				if (i.e.r < t.r) i.e.r = t.r;
				if (i.s.c > t.c) i.s.c = t.c;
				if (i.e.c < t.c) i.e.c = t.c;
				var s = ht(i);
				if (s !== r["!ref"]) r["!ref"] = s
			}
			if (!a.c) a.c = [];
			var o = {
				a: e.author,
				t: e.t,
				r: e.r
			};
			if (e.h) o.h = e.h;
			a.c.push(o)
		})
	}

	function Rf(e, r) {
		if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
		var t = [];
		var n = [];
		var a = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
		if (a && a[1]) a[1].split(/<\/\w*:?author>/).forEach(function (e) {
			if (e === "" || e.trim() === "") return;
			var r = e.match(/<(?:\w+:)?author[^>]*>(.*)/);
			if (r) t.push(r[1])
		});
		var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
		if (i && i[1]) i[1].split(/<\/\w*:?comment>/).forEach(function (e) {
			if (e === "" || e.trim() === "") return;
			var a = e.match(/<(?:\w+:)?comment[^>]*>/);
			if (!a) return;
			var i = Be(a[0]);
			var s = {
				author: i.authorId && t[i.authorId] || "sheetjsghost",
				ref: i.ref,
				guid: i.guid
			};
			var o = ft(i.ref);
			if (r.sheetRows && r.sheetRows <= o.r) return;
			var l = e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);
			var f = !!l && !!l[1] && fo(l[1]) || {
				r: "",
				t: "",
				h: ""
			};
			s.r = f.r;
			if (f.r == "<t></t>") f.t = f.h = "";
			s.t = f.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
			if (r.cellHTML) s.h = f.h;
			n.push(s)
		});
		return n
	}
	var Bf = tr("comments", null, {
		xmlns: ir.main[0]
	});

	function Tf(e) {
		var r = [Se, Bf];
		var t = [];
		r.push("<authors>");
		e.forEach(function (e) {
			e[1].forEach(function (e) {
				var n = Oe(e.a);
				if (t.indexOf(n) > -1) return;
				t.push(n);
				r.push("<author>" + n + "</author>")
			})
		});
		r.push("</authors>");
		r.push("<commentList>");
		e.forEach(function (e) {
			e[1].forEach(function (n) {
				r.push('<comment ref="' + e[0] + '" authorId="' + t.indexOf(Oe(n.a)) + '"><text>');
				r.push(er("t", n.t == null ? "" : Oe(n.t)));
				r.push("</text></comment>")
			})
		});
		r.push("</commentList>");
		if (r.length > 2) {
			r[r.length] = "</comments>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}

	function yf(e) {
		var r = {};
		r.iauthor = e._R(4);
		var t = Ht(e, 16);
		r.rfx = t.s;
		r.ref = ct(t.s);
		e.l += 16;
		return r
	}

	function xf(e, r) {
		if (r == null) r = Xr(36);
		r._W(4, e[1].iauthor);
		Vt(e[0], r);
		r._W(4, 0);
		r._W(4, 0);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}
	var If = Et;

	function Df(e) {
		return kt(e.slice(0, 54))
	}

	function Ff(e, r) {
		var t = [];
		var n = [];
		var a = {};
		var i = false;
		Gr(e, function e(s, o, l) {
			switch (l) {
			case 632:
				n.push(s);
				break;
			case 635:
				a = s;
				break;
			case 637:
				a.t = s.t;
				a.h = s.h;
				a.r = s.r;
				break;
			case 636:
				a.author = n[a.iauthor];
				delete a.iauthor;
				if (r.sheetRows && r.sheetRows <= a.rfx.r) break;
				if (!a.t) a.t = "";
				delete a.rfx;
				t.push(a);
				break;
			case 3072:
				break;
			case 35:
				i = true;
				break;
			case 36:
				i = false;
				break;
			case 37:
				break;
			case 38:
				break;
			default:
				if ((o || "").indexOf("Begin") > 0) {} else if ((o || "").indexOf("End") > 0) {} else if (!i || r.WTF) throw new Error(
					"Unexpected record " + l + " " + o)
			}
		});
		return t
	}

	function Of(e) {
		var r = jr();
		var t = [];
		Kr(r, "BrtBeginComments");
		Kr(r, "BrtBeginCommentAuthors");
		e.forEach(function (e) {
			e[1].forEach(function (e) {
				if (t.indexOf(e.a) > -1) return;
				t.push(e.a.slice(0, 54));
				Kr(r, "BrtCommentAuthor", Df(e.a))
			})
		});
		Kr(r, "BrtEndCommentAuthors");
		Kr(r, "BrtBeginCommentList");
		e.forEach(function (e) {
			e[1].forEach(function (n) {
				n.iauthor = t.indexOf(n.a);
				var a = {
					s: ft(e[0]),
					e: ft(e[0])
				};
				Kr(r, "BrtBeginComment", xf([a, n]));
				if (n.t && n.t.length > 0) Kr(r, "BrtCommentText", Bt(n));
				Kr(r, "BrtEndComment");
				delete n.iauthor
			})
		});
		Kr(r, "BrtEndCommentList");
		Kr(r, "BrtEndComments");
		return r.end()
	}
	var Pf = "application/vnd.ms-office.vbaProject";

	function Nf(e) {
		var r = U.utils.cfb_new({
			root: "R"
		});
		e.FullPaths.forEach(function (t, n) {
			if (t.slice(-1) === "/" || !t.match(/_VBA_PROJECT_CUR/)) return;
			var a = t.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
			U.utils.cfb_add(r, a, e.FileIndex[n].content)
		});
		return U.write(r)
	}

	function Lf(e, r) {
		r.FullPaths.forEach(function (t, n) {
			if (n == 0) return;
			var a = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
			if (a.slice(-1) !== "/") U.utils.cfb_add(e, a, r.FileIndex[n].content)
		})
	}
	var Mf = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
	In.DS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet";
	In.MS = "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";

	function Wf() {
		return {
			"!type": "dialog"
		}
	}

	function Uf() {
		return {
			"!type": "dialog"
		}
	}

	function Hf() {
		return {
			"!type": "macro"
		}
	}

	function Vf() {
		return {
			"!type": "macro"
		}
	}
	var zf = function () {
		var e = /(^|[^A-Za-z])R(\[?)(-?\d+|)\]?C(\[?)(-?\d+|)\]?/g;
		var r = {
			r: 0,
			c: 0
		};

		function t(e, t, n, a, i, s) {
			var o = a.length > 0 ? parseInt(a, 10) | 0 : 0,
				l = s.length > 0 ? parseInt(s, 10) | 0 : 0;
			if (l < 0 && i.length === 0) l = 0;
			var f = false,
				c = false;
			if (i.length > 0 || s.length == 0) f = true;
			if (f) l += r.c;
			else --l;
			if (n.length > 0 || a.length == 0) c = true;
			if (c) o += r.r;
			else --o;
			return t + (f ? "" : "$") + it(l) + (c ? "" : "$") + rt(o)
		}
		return function n(a, i) {
			r = i;
			return a.replace(e, t)
		}
	}();
	var Xf =
		/(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;
	var Gf = function () {
		return function e(r, t) {
			return r.replace(Xf, function (e, r, n, a, i, s) {
				var o = at(a) - (n ? 0 : t.c);
				var l = et(s) - (i ? 0 : t.r);
				var f = l == 0 ? "" : !i ? "[" + l + "]" : l + 1;
				var c = o == 0 ? "" : !n ? "[" + o + "]" : o + 1;
				return r + "R" + f + "C" + c
			})
		}
	}();

	function jf(e, r) {
		return e.replace(Xf, function (e, t, n, a, i, s) {
			return t + (n == "$" ? n + a : it(at(a) + r.c)) + (i == "$" ? i + s : rt(et(s) + r.r))
		})
	}

	function Kf(e, r, t) {
		var n = ut(r),
			a = n.s,
			i = ft(t);
		var s = {
			r: i.r - a.r,
			c: i.c - a.c
		};
		return jf(e, s)
	}

	function Yf(e) {
		if (e.length == 1) return false;
		return true
	}

	function $f(e) {
		return e.replace(/_xlfn\./g, "")
	}

	function Zf(e) {
		e.l += 1;
		return
	}

	function Qf(e, r) {
		var t = e._R(r == 1 ? 1 : 2);
		return [t & 16383, t >> 14 & 1, t >> 15 & 1]
	}

	function Jf(e, r, t) {
		var n = 2;
		if (t) {
			if (t.biff >= 2 && t.biff <= 5) return qf(e, r, t);
			else if (t.biff == 12) n = 4
		}
		var a = e._R(n),
			i = e._R(n);
		var s = Qf(e, 2);
		var o = Qf(e, 2);
		return {
			s: {
				r: a,
				c: s[0],
				cRel: s[1],
				rRel: s[2]
			},
			e: {
				r: i,
				c: o[0],
				cRel: o[1],
				rRel: o[2]
			}
		}
	}

	function qf(e) {
		var r = Qf(e, 2),
			t = Qf(e, 2);
		var n = e._R(1);
		var a = e._R(1);
		return {
			s: {
				r: r[0],
				c: n,
				cRel: r[1],
				rRel: r[2]
			},
			e: {
				r: t[0],
				c: a,
				cRel: t[1],
				rRel: t[2]
			}
		}
	}

	function ec(e, r, t) {
		if (t.biff < 8) return qf(e, r, t);
		var n = e._R(t.biff == 12 ? 4 : 2),
			a = e._R(t.biff == 12 ? 4 : 2);
		var i = Qf(e, 2);
		var s = Qf(e, 2);
		return {
			s: {
				r: n,
				c: i[0],
				cRel: i[1],
				rRel: i[2]
			},
			e: {
				r: a,
				c: s[0],
				cRel: s[1],
				rRel: s[2]
			}
		}
	}

	function rc(e, r, t) {
		if (t && t.biff >= 2 && t.biff <= 5) return tc(e, r, t);
		var n = e._R(t && t.biff == 12 ? 4 : 2);
		var a = Qf(e, 2);
		return {
			r: n,
			c: a[0],
			cRel: a[1],
			rRel: a[2]
		}
	}

	function tc(e) {
		var r = Qf(e, 2);
		var t = e._R(1);
		return {
			r: r[0],
			c: t,
			cRel: r[1],
			rRel: r[2]
		}
	}

	function nc(e) {
		var r = e._R(2);
		var t = e._R(2);
		return {
			r: r,
			c: t & 255,
			fQuoted: !!(t & 16384),
			cRel: t >> 15,
			rRel: t >> 15
		}
	}

	function ac(e, r, t) {
		var n = t && t.biff ? t.biff : 8;
		if (n >= 2 && n <= 5) return ic(e, r, t);
		var a = e._R(n >= 12 ? 4 : 2);
		var i = e._R(2);
		var s = (i & 16384) >> 14,
			o = (i & 32768) >> 15;
		i &= 16383;
		if (o == 1)
			while (a > 524287) a -= 1048576;
		if (s == 1)
			while (i > 8191) i = i - 16384;
		return {
			r: a,
			c: i,
			cRel: s,
			rRel: o
		}
	}

	function ic(e) {
		var r = e._R(2);
		var t = e._R(1);
		var n = (r & 32768) >> 15,
			a = (r & 16384) >> 14;
		r &= 16383;
		if (n == 1 && r >= 8192) r = r - 16384;
		if (a == 1 && t >= 128) t = t - 256;
		return {
			r: r,
			c: t,
			cRel: a,
			rRel: n
		}
	}

	function sc(e, r, t) {
		var n = (e[e.l++] & 96) >> 5;
		var a = Jf(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
		return [n, a]
	}

	function oc(e, r, t) {
		var n = (e[e.l++] & 96) >> 5;
		var a = e._R(2, "i");
		var i = 8;
		if (t) switch (t.biff) {
		case 5:
			e.l += 12;
			i = 6;
			break;
		case 12:
			i = 12;
			break
		}
		var s = Jf(e, i, t);
		return [n, a, s]
	}

	function lc(e, r, t) {
		var n = (e[e.l++] & 96) >> 5;
		e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8;
		return [n]
	}

	function fc(e, r, t) {
		var n = (e[e.l++] & 96) >> 5;
		var a = e._R(2);
		var i = 8;
		if (t) switch (t.biff) {
		case 5:
			e.l += 12;
			i = 6;
			break;
		case 12:
			i = 12;
			break
		}
		e.l += i;
		return [n, a]
	}

	function cc(e, r, t) {
		var n = (e[e.l++] & 96) >> 5;
		var a = ec(e, r - 1, t);
		return [n, a]
	}

	function uc(e, r, t) {
		var n = (e[e.l++] & 96) >> 5;
		e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7;
		return [n]
	}

	function hc(e) {
		var r = e[e.l + 1] & 1;
		var t = 1;
		e.l += 4;
		return [r, t]
	}

	function dc(e, r, t) {
		e.l += 2;
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		var a = [];
		for (var i = 0; i <= n; ++i) a.push(e._R(t && t.biff == 2 ? 1 : 2));
		return a
	}

	function pc(e, r, t) {
		var n = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [n, e._R(t && t.biff == 2 ? 1 : 2)]
	}

	function vc(e, r, t) {
		var n = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [n, e._R(t && t.biff == 2 ? 1 : 2)]
	}

	function gc(e) {
		var r = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [r, e._R(2)]
	}

	function mc(e, r, t) {
		var n = e[e.l + 1] & 255 ? 1 : 0;
		e.l += t && t.biff == 2 ? 3 : 4;
		return [n]
	}

	function bc(e) {
		var r = e._R(1),
			t = e._R(1);
		return [r, t]
	}

	function Cc(e) {
		e._R(2);
		return bc(e, 2)
	}

	function Ec(e) {
		e._R(2);
		return bc(e, 2)
	}

	function kc(e, r, t) {
		var n = (e[e.l] & 96) >> 5;
		e.l += 1;
		var a = rc(e, 0, t);
		return [n, a]
	}

	function Sc(e, r, t) {
		var n = (e[e.l] & 96) >> 5;
		e.l += 1;
		var a = ac(e, 0, t);
		return [n, a]
	}

	function wc(e, r, t) {
		var n = (e[e.l] & 96) >> 5;
		e.l += 1;
		var a = e._R(2);
		if (t && t.biff == 5) e.l += 12;
		var i = rc(e, 0, t);
		return [n, a, i]
	}

	function Ac(e, r, t) {
		var n = (e[e.l] & 96) >> 5;
		e.l += 1;
		var a = e._R(t && t.biff <= 3 ? 1 : 2);
		return [Mu[a], Lu[a], n]
	}

	function _c(e, r, t) {
		var n = e[e.l++];
		var a = e._R(1),
			i = t && t.biff <= 3 ? [n == 88 ? -1 : 0, e._R(1)] : Rc(e);
		return [a, (i[0] === 0 ? Lu : Nu)[i[1]]]
	}

	function Rc(e) {
		return [e[e.l + 1] >> 7, e._R(2) & 32767]
	}

	function Bc(e, r, t) {
		e.l += t && t.biff == 2 ? 3 : 4;
		return
	}

	function Tc(e, r, t) {
		e.l++;
		if (t && t.biff == 12) return [e._R(4, "i"), 0];
		var n = e._R(2);
		var a = e._R(t && t.biff == 2 ? 1 : 2);
		return [n, a]
	}

	function yc(e) {
		e.l++;
		return Gt[e._R(1)]
	}

	function xc(e) {
		e.l++;
		return e._R(2)
	}

	function Ic(e) {
		e.l++;
		return e._R(1) !== 0
	}

	function Dc(e) {
		e.l++;
		return zt(e, 8)
	}

	function Fc(e, r, t) {
		e.l++;
		return Xa(e, r - 1, t)
	}

	function Oc(e, r) {
		var t = [e._R(1)];
		if (r == 12) switch (t[0]) {
		case 2:
			t[0] = 4;
			break;
		case 4:
			t[0] = 16;
			break;
		case 0:
			t[0] = 1;
			break;
		case 1:
			t[0] = 2;
			break
		}
		switch (t[0]) {
		case 4:
			t[1] = La(e, 1) ? "TRUE" : "FALSE";
			if (r != 12) e.l += 7;
			break;
		case 37:
			;
		case 16:
			t[1] = Gt[e[e.l]];
			e.l += r == 12 ? 4 : 8;
			break;
		case 0:
			e.l += 8;
			break;
		case 1:
			t[1] = zt(e, 8);
			break;
		case 2:
			t[1] = Ya(e, 0, {
				biff: r > 0 && r < 8 ? 2 : r
			});
			break;
		default:
			throw new Error("Bad SerAr: " + t[0])
		}
		return t
	}

	function Pc(e, r, t) {
		var n = e._R(t.biff == 12 ? 4 : 2);
		var a = [];
		for (var i = 0; i != n; ++i) a.push((t.biff == 12 ? Ht : hi)(e, 8));
		return a
	}

	function Nc(e, r, t) {
		var n = 0,
			a = 0;
		if (t.biff == 12) {
			n = e._R(4);
			a = e._R(4)
		} else {
			a = 1 + e._R(1);
			n = 1 + e._R(2)
		}
		if (t.biff >= 2 && t.biff < 8) {
			--n;
			if (--a == 0) a = 256
		}
		for (var i = 0, s = []; i != n && (s[i] = []); ++i)
			for (var o = 0; o != a; ++o) s[i][o] = Oc(e, t.biff);
		return s
	}

	function Lc(e, r, t) {
		var n = e._R(1) >>> 5 & 3;
		var a = !t || t.biff >= 8 ? 4 : 2;
		var i = e._R(a);
		switch (t.biff) {
		case 2:
			e.l += 5;
			break;
		case 3:
			;
		case 4:
			e.l += 8;
			break;
		case 5:
			e.l += 12;
			break
		}
		return [n, 0, i]
	}

	function Mc(e, r, t) {
		if (t.biff == 5) return Wc(e, r, t);
		var n = e._R(1) >>> 5 & 3;
		var a = e._R(2);
		var i = e._R(4);
		return [n, a, i]
	}

	function Wc(e) {
		var r = e._R(1) >>> 5 & 3;
		var t = e._R(2, "i");
		e.l += 8;
		var n = e._R(2);
		e.l += 12;
		return [r, t, n]
	}

	function Uc(e, r, t) {
		var n = e._R(1) >>> 5 & 3;
		e.l += t && t.biff == 2 ? 3 : 4;
		var a = e._R(t && t.biff == 2 ? 1 : 2);
		return [n, a]
	}

	function Hc(e, r, t) {
		var n = e._R(1) >>> 5 & 3;
		var a = e._R(t && t.biff == 2 ? 1 : 2);
		return [n, a]
	}

	function Vc(e, r, t) {
		var n = e._R(1) >>> 5 & 3;
		e.l += 4;
		if (t.biff < 8) e.l--;
		if (t.biff == 12) e.l += 2;
		return [n]
	}

	function zc(e, r, t) {
		var n = (e[e.l++] & 96) >> 5;
		var a = e._R(2);
		var i = 4;
		if (t) switch (t.biff) {
		case 5:
			i = 15;
			break;
		case 12:
			i = 6;
			break
		}
		e.l += i;
		return [n, a]
	}
	var Xc = zr;
	var Gc = zr;
	var jc = zr;

	function Kc(e, r, t) {
		e.l += 2;
		return [nc(e, 4, t)]
	}

	function Yc(e) {
		e.l += 6;
		return []
	}
	var $c = Kc;
	var Zc = Yc;
	var Qc = Yc;
	var Jc = Kc;

	function qc(e) {
		e.l += 2;
		return [Wa(e), e._R(2) & 1]
	}
	var eu = Kc;
	var ru = qc;
	var tu = Yc;
	var nu = Kc;
	var au = Kc;
	var iu = ["Data", "All", "Headers", "??", "?Data2", "??", "?DataHeaders", "??", "Totals", "??", "??", "??", "?DataTotals", "??", "??",
		"??", "?Current"
	];

	function su(e) {
		e.l += 2;
		var r = e._R(2);
		var t = e._R(2);
		var n = e._R(4);
		var a = e._R(2);
		var i = e._R(2);
		var s = iu[t >> 2 & 31];
		return {
			ixti: r,
			coltype: t & 3,
			rt: s,
			idx: n,
			c: a,
			C: i
		}
	}

	function ou(e) {
		e.l += 2;
		return [e._R(4)]
	}

	function lu(e, r, t) {
		e.l += 5;
		e.l += 2;
		e.l += t.biff == 2 ? 1 : 4;
		return ["PTGSHEET"]
	}

	function fu(e, r, t) {
		e.l += t.biff == 2 ? 4 : 5;
		return ["PTGENDSHEET"]
	}

	function cu(e) {
		var r = e._R(1) >>> 5 & 3;
		var t = e._R(2);
		return [r, t]
	}

	function uu(e) {
		var r = e._R(1) >>> 5 & 3;
		var t = e._R(2);
		return [r, t]
	}

	function hu(e) {
		e.l += 4;
		return [0, 0]
	}
	var du = {
		1: {
			n: "PtgExp",
			f: Tc
		},
		2: {
			n: "PtgTbl",
			f: jc
		},
		3: {
			n: "PtgAdd",
			f: Zf
		},
		4: {
			n: "PtgSub",
			f: Zf
		},
		5: {
			n: "PtgMul",
			f: Zf
		},
		6: {
			n: "PtgDiv",
			f: Zf
		},
		7: {
			n: "PtgPower",
			f: Zf
		},
		8: {
			n: "PtgConcat",
			f: Zf
		},
		9: {
			n: "PtgLt",
			f: Zf
		},
		10: {
			n: "PtgLe",
			f: Zf
		},
		11: {
			n: "PtgEq",
			f: Zf
		},
		12: {
			n: "PtgGe",
			f: Zf
		},
		13: {
			n: "PtgGt",
			f: Zf
		},
		14: {
			n: "PtgNe",
			f: Zf
		},
		15: {
			n: "PtgIsect",
			f: Zf
		},
		16: {
			n: "PtgUnion",
			f: Zf
		},
		17: {
			n: "PtgRange",
			f: Zf
		},
		18: {
			n: "PtgUplus",
			f: Zf
		},
		19: {
			n: "PtgUminus",
			f: Zf
		},
		20: {
			n: "PtgPercent",
			f: Zf
		},
		21: {
			n: "PtgParen",
			f: Zf
		},
		22: {
			n: "PtgMissArg",
			f: Zf
		},
		23: {
			n: "PtgStr",
			f: Fc
		},
		26: {
			n: "PtgSheet",
			f: lu
		},
		27: {
			n: "PtgEndSheet",
			f: fu
		},
		28: {
			n: "PtgErr",
			f: yc
		},
		29: {
			n: "PtgBool",
			f: Ic
		},
		30: {
			n: "PtgInt",
			f: xc
		},
		31: {
			n: "PtgNum",
			f: Dc
		},
		32: {
			n: "PtgArray",
			f: uc
		},
		33: {
			n: "PtgFunc",
			f: Ac
		},
		34: {
			n: "PtgFuncVar",
			f: _c
		},
		35: {
			n: "PtgName",
			f: Lc
		},
		36: {
			n: "PtgRef",
			f: kc
		},
		37: {
			n: "PtgArea",
			f: sc
		},
		38: {
			n: "PtgMemArea",
			f: Uc
		},
		39: {
			n: "PtgMemErr",
			f: Xc
		},
		40: {
			n: "PtgMemNoMem",
			f: Gc
		},
		41: {
			n: "PtgMemFunc",
			f: Hc
		},
		42: {
			n: "PtgRefErr",
			f: Vc
		},
		43: {
			n: "PtgAreaErr",
			f: lc
		},
		44: {
			n: "PtgRefN",
			f: Sc
		},
		45: {
			n: "PtgAreaN",
			f: cc
		},
		46: {
			n: "PtgMemAreaN",
			f: cu
		},
		47: {
			n: "PtgMemNoMemN",
			f: uu
		},
		57: {
			n: "PtgNameX",
			f: Mc
		},
		58: {
			n: "PtgRef3d",
			f: wc
		},
		59: {
			n: "PtgArea3d",
			f: oc
		},
		60: {
			n: "PtgRefErr3d",
			f: zc
		},
		61: {
			n: "PtgAreaErr3d",
			f: fc
		},
		255: {}
	};
	var pu = {
		64: 32,
		96: 32,
		65: 33,
		97: 33,
		66: 34,
		98: 34,
		67: 35,
		99: 35,
		68: 36,
		100: 36,
		69: 37,
		101: 37,
		70: 38,
		102: 38,
		71: 39,
		103: 39,
		72: 40,
		104: 40,
		73: 41,
		105: 41,
		74: 42,
		106: 42,
		75: 43,
		107: 43,
		76: 44,
		108: 44,
		77: 45,
		109: 45,
		78: 46,
		110: 46,
		79: 47,
		111: 47,
		88: 34,
		120: 34,
		89: 57,
		121: 57,
		90: 58,
		122: 58,
		91: 59,
		123: 59,
		92: 60,
		124: 60,
		93: 61,
		125: 61
	};
	(function () {
		for (var e in pu) du[e] = du[pu[e]]
	})();
	var vu = {
		1: {
			n: "PtgElfLel",
			f: qc
		},
		2: {
			n: "PtgElfRw",
			f: nu
		},
		3: {
			n: "PtgElfCol",
			f: $c
		},
		6: {
			n: "PtgElfRwV",
			f: au
		},
		7: {
			n: "PtgElfColV",
			f: Jc
		},
		10: {
			n: "PtgElfRadical",
			f: eu
		},
		11: {
			n: "PtgElfRadicalS",
			f: tu
		},
		13: {
			n: "PtgElfColS",
			f: Zc
		},
		15: {
			n: "PtgElfColSV",
			f: Qc
		},
		16: {
			n: "PtgElfRadicalLel",
			f: ru
		},
		25: {
			n: "PtgList",
			f: su
		},
		29: {
			n: "PtgSxName",
			f: ou
		},
		255: {}
	};
	var gu = {
		0: {
			n: "PtgAttrNoop",
			f: hu
		},
		1: {
			n: "PtgAttrSemi",
			f: mc
		},
		2: {
			n: "PtgAttrIf",
			f: vc
		},
		4: {
			n: "PtgAttrChoose",
			f: dc
		},
		8: {
			n: "PtgAttrGoto",
			f: pc
		},
		16: {
			n: "PtgAttrSum",
			f: Bc
		},
		32: {
			n: "PtgAttrBaxcel",
			f: hc
		},
		64: {
			n: "PtgAttrSpace",
			f: Cc
		},
		65: {
			n: "PtgAttrSpaceSemi",
			f: Ec
		},
		128: {
			n: "PtgAttrIfError",
			f: gc
		},
		255: {}
	};
	gu[33] = gu[32];

	function mu(e, r, t, n) {
		if (n.biff < 8) return zr(e, r);
		var a = e.l + r;
		var i = [];
		for (var s = 0; s !== t.length; ++s) {
			switch (t[s][0]) {
			case "PtgArray":
				t[s][1] = Nc(e, 0, n);
				i.push(t[s][1]);
				break;
			case "PtgMemArea":
				t[s][2] = Pc(e, t[s][1], n);
				i.push(t[s][2]);
				break;
			case "PtgExp":
				if (n && n.biff == 12) {
					t[s][1][1] = e._R(4);
					i.push(t[s][1])
				}
				break;
			case "PtgList":
				;
			case "PtgElfRadicalS":
				;
			case "PtgElfColS":
				;
			case "PtgElfColSV":
				throw "Unsupported " + t[s][0];
			default:
				break
			}
		}
		r = a - e.l;
		if (r !== 0) i.push(zr(e, r));
		return i
	}

	function bu(e, r, t) {
		var n = e.l + r;
		var a, i, s = [];
		while (n != e.l) {
			r = n - e.l;
			i = e[e.l];
			a = du[i];
			if (i === 24 || i === 25) a = (i === 24 ? vu : gu)[e[e.l + 1]];
			if (!a || !a.f) {
				zr(e, r)
			} else {
				s.push([a.n, a.f(e, r, t)])
			}
		}
		return s
	}

	function Cu(e) {
		var r = [];
		for (var t = 0; t < e.length; ++t) {
			var n = e[t],
				a = [];
			for (var i = 0; i < n.length; ++i) {
				var s = n[i];
				if (s) switch (s[0]) {
				case 2:
					a.push('"' + s[1].replace(/"/g, '""') + '"');
					break;
				default:
					a.push(s[1])
				} else a.push("")
			}
			r.push(a.join(","))
		}
		return r.join(";")
	}
	var Eu = {
		PtgAdd: "+",
		PtgConcat: "&",
		PtgDiv: "/",
		PtgEq: "=",
		PtgGe: ">=",
		PtgGt: ">",
		PtgLe: "<=",
		PtgLt: "<",
		PtgMul: "*",
		PtgNe: "<>",
		PtgPower: "^",
		PtgSub: "-"
	};

	function ku(e, r) {
		if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
		if (e.indexOf(" ") > -1) return "'" + e + "'";
		return e
	}

	function Su(e, r, t) {
		if (!e) return "SH33TJSERR0";
		if (t.biff > 8 && (!e.XTI || !e.XTI[r])) return e.SheetNames[r];
		if (!e.XTI) return "SH33TJSERR6";
		var n = e.XTI[r];
		if (t.biff < 8) {
			if (r > 1e4) r -= 65536;
			if (r < 0) r = -r;
			return r == 0 ? "" : e.XTI[r - 1]
		}
		if (!n) return "SH33TJSERR1";
		var a = "";
		if (t.biff > 8) switch (e[n[0]][0]) {
		case 357:
			a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]];
			return n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
		case 358:
			if (t.SID != null) return e.SheetNames[t.SID];
			return "SH33TJSSAME" + e[n[0]][0];
		case 355:
			;
		default:
			return "SH33TJSSRC" + e[n[0]][0]
		}
		switch (e[n[0]][0][0]) {
		case 1025:
			a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3";
			return n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
		case 14849:
			return "SH33TJSERR8";
		default:
			if (!e[n[0]][0][3]) return "SH33TJSERR2";
			a = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4";
			return n[1] == n[2] ? a : a + ":" + e[n[0]][0][3][n[2]]
		}
	}

	function wu(e, r, t) {
		return ku(Su(e, r, t), t)
	}

	function Au(e, r, t, n, a) {
		var i = a && a.biff || 8;
		var s = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		var o = [],
			l, f, c, u = 0,
			h = 0,
			d, p = "";
		if (!e[0] || !e[0][0]) return "";
		var v = -1,
			g = "";
		for (var m = 0, b = e[0].length; m < b; ++m) {
			var C = e[0][m];
			switch (C[0]) {
			case "PtgUminus":
				o.push("-" + o.pop());
				break;
			case "PtgUplus":
				o.push("+" + o.pop());
				break;
			case "PtgPercent":
				o.push(o.pop() + "%");
				break;
			case "PtgAdd":
				;
			case "PtgConcat":
				;
			case "PtgDiv":
				;
			case "PtgEq":
				;
			case "PtgGe":
				;
			case "PtgGt":
				;
			case "PtgLe":
				;
			case "PtgLt":
				;
			case "PtgMul":
				;
			case "PtgNe":
				;
			case "PtgPower":
				;
			case "PtgSub":
				l = o.pop();
				f = o.pop();
				if (v >= 0) {
					switch (e[0][v][1][0]) {
					case 0:
						g = oe(" ", e[0][v][1][1]);
						break;
					case 1:
						g = oe("\r", e[0][v][1][1]);
						break;
					default:
						g = "";
						if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][v][1][0])
					}
					f = f + g;
					v = -1
				}
				o.push(f + Eu[C[0]] + l);
				break;
			case "PtgIsect":
				l = o.pop();
				f = o.pop();
				o.push(f + " " + l);
				break;
			case "PtgUnion":
				l = o.pop();
				f = o.pop();
				o.push(f + "," + l);
				break;
			case "PtgRange":
				l = o.pop();
				f = o.pop();
				o.push(f + ":" + l);
				break;
			case "PtgAttrChoose":
				break;
			case "PtgAttrGoto":
				break;
			case "PtgAttrIf":
				break;
			case "PtgAttrIfError":
				break;
			case "PtgRef":
				c = Yr(C[1][1], s, a);
				o.push(Zr(c, i));
				break;
			case "PtgRefN":
				c = t ? Yr(C[1][1], t, a) : C[1][1];
				o.push(Zr(c, i));
				break;
			case "PtgRef3d":
				u = C[1][1];
				c = Yr(C[1][2], s, a);
				p = wu(n, u, a);
				var E = p;
				o.push(p + "!" + Zr(c, i));
				break;
			case "PtgFunc":
				;
			case "PtgFuncVar":
				var k = C[1][0],
					S = C[1][1];
				if (!k) k = 0;
				k &= 127;
				var w = k == 0 ? [] : o.slice(-k);
				o.length -= k;
				if (S === "User") S = w.shift();
				o.push(S + "(" + w.join(",") + ")");
				break;
			case "PtgBool":
				o.push(C[1] ? "TRUE" : "FALSE");
				break;
			case "PtgInt":
				o.push(C[1]);
				break;
			case "PtgNum":
				o.push(String(C[1]));
				break;
			case "PtgStr":
				o.push('"' + C[1] + '"');
				break;
			case "PtgErr":
				o.push(C[1]);
				break;
			case "PtgAreaN":
				d = $r(C[1][1], t ? {
					s: t
				} : s, a);
				o.push(Qr(d, a));
				break;
			case "PtgArea":
				d = $r(C[1][1], s, a);
				o.push(Qr(d, a));
				break;
			case "PtgArea3d":
				u = C[1][1];
				d = C[1][2];
				p = wu(n, u, a);
				o.push(p + "!" + Qr(d, a));
				break;
			case "PtgAttrSum":
				o.push("SUM(" + o.pop() + ")");
				break;
			case "PtgAttrBaxcel":
				;
			case "PtgAttrSemi":
				break;
			case "PtgName":
				h = C[1][2];
				var A = (n.names || [])[h - 1] || (n[0] || [])[h];
				var _ = A ? A.Name : "SH33TJSNAME" + String(h);
				if (_ in Wu) _ = Wu[_];
				o.push(_);
				break;
			case "PtgNameX":
				var R = C[1][1];
				h = C[1][2];
				var B;
				if (a.biff <= 5) {
					if (R < 0) R = -R;
					if (n[R]) B = n[R][h]
				} else {
					var T = "";
					if (((n[R] || [])[0] || [])[0] == 14849) {} else if (((n[R] || [])[0] || [])[0] == 1025) {
						if (n[R][h] && n[R][h].itab > 0) {
							T = n.SheetNames[n[R][h].itab - 1] + "!"
						}
					} else T = n.SheetNames[h - 1] + "!";
					if (n[R] && n[R][h]) T += n[R][h].Name;
					else if (n[0] && n[0][h]) T += n[0][h].Name;
					else T += "SH33TJSERRX";
					o.push(T);
					break
				}
				if (!B) B = {
					Name: "SH33TJSERRY"
				};
				o.push(B.Name);
				break;
			case "PtgParen":
				var y = "(",
					x = ")";
				if (v >= 0) {
					g = "";
					switch (e[0][v][1][0]) {
					case 2:
						y = oe(" ", e[0][v][1][1]) + y;
						break;
					case 3:
						y = oe("\r", e[0][v][1][1]) + y;
						break;
					case 4:
						x = oe(" ", e[0][v][1][1]) + x;
						break;
					case 5:
						x = oe("\r", e[0][v][1][1]) + x;
						break;
					default:
						if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][v][1][0])
					}
					v = -1
				}
				o.push(y + o.pop() + x);
				break;
			case "PtgRefErr":
				o.push("#REF!");
				break;
			case "PtgRefErr3d":
				o.push("#REF!");
				break;
			case "PtgExp":
				c = {
					c: C[1][1],
					r: C[1][0]
				};
				var I = {
					c: t.c,
					r: t.r
				};
				if (n.sharedf[ct(c)]) {
					var D = n.sharedf[ct(c)];
					o.push(Au(D, s, I, n, a))
				} else {
					var F = false;
					for (l = 0; l != n.arrayf.length; ++l) {
						f = n.arrayf[l];
						if (c.c < f[0].s.c || c.c > f[0].e.c) continue;
						if (c.r < f[0].s.r || c.r > f[0].e.r) continue;
						o.push(Au(f[1], s, I, n, a));
						F = true;
						break
					}
					if (!F) o.push(C[1])
				}
				break;
			case "PtgArray":
				o.push("{" + Cu(C[1]) + "}");
				break;
			case "PtgMemArea":
				break;
			case "PtgAttrSpace":
				;
			case "PtgAttrSpaceSemi":
				v = m;
				break;
			case "PtgTbl":
				break;
			case "PtgMemErr":
				break;
			case "PtgMissArg":
				o.push("");
				break;
			case "PtgAreaErr":
				o.push("#REF!");
				break;
			case "PtgAreaErr3d":
				o.push("#REF!");
				break;
			case "PtgList":
				o.push("Table" + C[1].idx + "[#" + C[1].rt + "]");
				break;
			case "PtgMemAreaN":
				;
			case "PtgMemNoMemN":
				;
			case "PtgAttrNoop":
				;
			case "PtgSheet":
				;
			case "PtgEndSheet":
				break;
			case "PtgMemFunc":
				break;
			case "PtgMemNoMem":
				break;
			case "PtgElfCol":
				;
			case "PtgElfColS":
				;
			case "PtgElfColSV":
				;
			case "PtgElfColV":
				;
			case "PtgElfLel":
				;
			case "PtgElfRadical":
				;
			case "PtgElfRadicalLel":
				;
			case "PtgElfRadicalS":
				;
			case "PtgElfRw":
				;
			case "PtgElfRwV":
				throw new Error("Unsupported ELFs");
			case "PtgSxName":
				throw new Error("Unrecognized Formula Token: " + String(C));
			default:
				throw new Error("Unrecognized Formula Token: " + String(C))
			}
			var O = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
			if (a.biff != 3)
				if (v >= 0 && O.indexOf(e[0][m][0]) == -1) {
					C = e[0][v];
					var P = true;
					switch (C[1][0]) {
					case 4:
						P = false;
					case 0:
						g = oe(" ", C[1][1]);
						break;
					case 5:
						P = false;
					case 1:
						g = oe("\r", C[1][1]);
						break;
					default:
						g = "";
						if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + C[1][0])
					}
					o.push((P ? g : "") + o.pop() + (P ? "" : g));
					v = -1
				}
		}
		if (o.length > 1 && a.WTF) throw new Error("bad formula stack");
		return o[0]
	}

	function _u(e, r, t) {
		var n = e.l + r,
			a = t.biff == 2 ? 1 : 2;
		var i, s = e._R(a);
		if (s == 65535) return [
			[], zr(e, r - 2)
		];
		var o = bu(e, s, t);
		if (r !== s + a) i = mu(e, r - s - a, o, t);
		e.l = n;
		return [o, i]
	}

	function Ru(e, r, t) {
		var n = e.l + r,
			a = t.biff == 2 ? 1 : 2;
		var i, s = e._R(a);
		if (s == 65535) return [
			[], zr(e, r - 2)
		];
		var o = bu(e, s, t);
		if (r !== s + a) i = mu(e, r - s - a, o, t);
		e.l = n;
		return [o, i]
	}

	function Bu(e, r, t, n) {
		var a = e.l + r;
		var i = bu(e, n, t);
		var s;
		if (a !== e.l) s = mu(e, a - e.l, i, t);
		return [i, s]
	}

	function Tu(e, r, t) {
		var n = e.l + r;
		var a, i = e._R(2);
		var s = bu(e, i, t);
		if (i == 65535) return [
			[], zr(e, r - 2)
		];
		if (r !== i + 2) a = mu(e, n - i - 2, s, t);
		return [s, a]
	}

	function yu(e) {
		var r;
		if (Ir(e, e.l + 6) !== 65535) return [zt(e), "n"];
		switch (e[e.l]) {
		case 0:
			e.l += 8;
			return ["String", "s"];
		case 1:
			r = e[e.l + 2] === 1;
			e.l += 8;
			return [r, "b"];
		case 2:
			r = e[e.l + 2];
			e.l += 8;
			return [r, "e"];
		case 3:
			e.l += 8;
			return ["", "s"]
		}
		return []
	}

	function xu(e, r, t) {
		var n = e.l + r;
		var a = ii(e, 6);
		if (t.biff == 2) ++e.l;
		var i = yu(e, 8);
		var s = e._R(1);
		if (t.biff != 2) {
			e._R(1);
			if (t.biff >= 5) {
				e._R(4)
			}
		}
		var o = Ru(e, n - e.l, t);
		return {
			cell: a,
			val: i[0],
			formula: o,
			shared: s >> 3 & 1,
			tt: i[1]
		}
	}

	function Iu(e, r, t) {
		var n = e._R(4);
		var a = bu(e, n, t);
		var i = e._R(4);
		var s = i > 0 ? mu(e, i, a, t) : null;
		return [a, s]
	}
	var Du = Iu;
	var Fu = Iu;
	var Ou = Iu;
	var Pu = Iu;
	var Nu = {
		0: "BEEP",
		1: "OPEN",
		2: "OPEN.LINKS",
		3: "CLOSE.ALL",
		4: "SAVE",
		5: "SAVE.AS",
		6: "FILE.DELETE",
		7: "PAGE.SETUP",
		8: "PRINT",
		9: "PRINTER.SETUP",
		10: "QUIT",
		11: "NEW.WINDOW",
		12: "ARRANGE.ALL",
		13: "WINDOW.SIZE",
		14: "WINDOW.MOVE",
		15: "FULL",
		16: "CLOSE",
		17: "RUN",
		22: "SET.PRINT.AREA",
		23: "SET.PRINT.TITLES",
		24: "SET.PAGE.BREAK",
		25: "REMOVE.PAGE.BREAK",
		26: "FONT",
		27: "DISPLAY",
		28: "PROTECT.DOCUMENT",
		29: "PRECISION",
		30: "A1.R1C1",
		31: "CALCULATE.NOW",
		32: "CALCULATION",
		34: "DATA.FIND",
		35: "EXTRACT",
		36: "DATA.DELETE",
		37: "SET.DATABASE",
		38: "SET.CRITERIA",
		39: "SORT",
		40: "DATA.SERIES",
		41: "TABLE",
		42: "FORMAT.NUMBER",
		43: "ALIGNMENT",
		44: "STYLE",
		45: "BORDER",
		46: "CELL.PROTECTION",
		47: "COLUMN.WIDTH",
		48: "UNDO",
		49: "CUT",
		50: "COPY",
		51: "PASTE",
		52: "CLEAR",
		53: "PASTE.SPECIAL",
		54: "EDIT.DELETE",
		55: "INSERT",
		56: "FILL.RIGHT",
		57: "FILL.DOWN",
		61: "DEFINE.NAME",
		62: "CREATE.NAMES",
		63: "FORMULA.GOTO",
		64: "FORMULA.FIND",
		65: "SELECT.LAST.CELL",
		66: "SHOW.ACTIVE.CELL",
		67: "GALLERY.AREA",
		68: "GALLERY.BAR",
		69: "GALLERY.COLUMN",
		70: "GALLERY.LINE",
		71: "GALLERY.PIE",
		72: "GALLERY.SCATTER",
		73: "COMBINATION",
		74: "PREFERRED",
		75: "ADD.OVERLAY",
		76: "GRIDLINES",
		77: "SET.PREFERRED",
		78: "AXES",
		79: "LEGEND",
		80: "ATTACH.TEXT",
		81: "ADD.ARROW",
		82: "SELECT.CHART",
		83: "SELECT.PLOT.AREA",
		84: "PATTERNS",
		85: "MAIN.CHART",
		86: "OVERLAY",
		87: "SCALE",
		88: "FORMAT.LEGEND",
		89: "FORMAT.TEXT",
		90: "EDIT.REPEAT",
		91: "PARSE",
		92: "JUSTIFY",
		93: "HIDE",
		94: "UNHIDE",
		95: "WORKSPACE",
		96: "FORMULA",
		97: "FORMULA.FILL",
		98: "FORMULA.ARRAY",
		99: "DATA.FIND.NEXT",
		100: "DATA.FIND.PREV",
		101: "FORMULA.FIND.NEXT",
		102: "FORMULA.FIND.PREV",
		103: "ACTIVATE",
		104: "ACTIVATE.NEXT",
		105: "ACTIVATE.PREV",
		106: "UNLOCKED.NEXT",
		107: "UNLOCKED.PREV",
		108: "COPY.PICTURE",
		109: "SELECT",
		110: "DELETE.NAME",
		111: "DELETE.FORMAT",
		112: "VLINE",
		113: "HLINE",
		114: "VPAGE",
		115: "HPAGE",
		116: "VSCROLL",
		117: "HSCROLL",
		118: "ALERT",
		119: "NEW",
		120: "CANCEL.COPY",
		121: "SHOW.CLIPBOARD",
		122: "MESSAGE",
		124: "PASTE.LINK",
		125: "APP.ACTIVATE",
		126: "DELETE.ARROW",
		127: "ROW.HEIGHT",
		128: "FORMAT.MOVE",
		129: "FORMAT.SIZE",
		130: "FORMULA.REPLACE",
		131: "SEND.KEYS",
		132: "SELECT.SPECIAL",
		133: "APPLY.NAMES",
		134: "REPLACE.FONT",
		135: "FREEZE.PANES",
		136: "SHOW.INFO",
		137: "SPLIT",
		138: "ON.WINDOW",
		139: "ON.DATA",
		140: "DISABLE.INPUT",
		142: "OUTLINE",
		143: "LIST.NAMES",
		144: "FILE.CLOSE",
		145: "SAVE.WORKBOOK",
		146: "DATA.FORM",
		147: "COPY.CHART",
		148: "ON.TIME",
		149: "WAIT",
		150: "FORMAT.FONT",
		151: "FILL.UP",
		152: "FILL.LEFT",
		153: "DELETE.OVERLAY",
		155: "SHORT.MENUS",
		159: "SET.UPDATE.STATUS",
		161: "COLOR.PALETTE",
		162: "DELETE.STYLE",
		163: "WINDOW.RESTORE",
		164: "WINDOW.MAXIMIZE",
		166: "CHANGE.LINK",
		167: "CALCULATE.DOCUMENT",
		168: "ON.KEY",
		169: "APP.RESTORE",
		170: "APP.MOVE",
		171: "APP.SIZE",
		172: "APP.MINIMIZE",
		173: "APP.MAXIMIZE",
		174: "BRING.TO.FRONT",
		175: "SEND.TO.BACK",
		185: "MAIN.CHART.TYPE",
		186: "OVERLAY.CHART.TYPE",
		187: "SELECT.END",
		188: "OPEN.MAIL",
		189: "SEND.MAIL",
		190: "STANDARD.FONT",
		191: "CONSOLIDATE",
		192: "SORT.SPECIAL",
		193: "GALLERY.3D.AREA",
		194: "GALLERY.3D.COLUMN",
		195: "GALLERY.3D.LINE",
		196: "GALLERY.3D.PIE",
		197: "VIEW.3D",
		198: "GOAL.SEEK",
		199: "WORKGROUP",
		200: "FILL.GROUP",
		201: "UPDATE.LINK",
		202: "PROMOTE",
		203: "DEMOTE",
		204: "SHOW.DETAIL",
		206: "UNGROUP",
		207: "OBJECT.PROPERTIES",
		208: "SAVE.NEW.OBJECT",
		209: "SHARE",
		210: "SHARE.NAME",
		211: "DUPLICATE",
		212: "APPLY.STYLE",
		213: "ASSIGN.TO.OBJECT",
		214: "OBJECT.PROTECTION",
		215: "HIDE.OBJECT",
		216: "SET.EXTRACT",
		217: "CREATE.PUBLISHER",
		218: "SUBSCRIBE.TO",
		219: "ATTRIBUTES",
		220: "SHOW.TOOLBAR",
		222: "PRINT.PREVIEW",
		223: "EDIT.COLOR",
		224: "SHOW.LEVELS",
		225: "FORMAT.MAIN",
		226: "FORMAT.OVERLAY",
		227: "ON.RECALC",
		228: "EDIT.SERIES",
		229: "DEFINE.STYLE",
		240: "LINE.PRINT",
		243: "ENTER.DATA",
		249: "GALLERY.RADAR",
		250: "MERGE.STYLES",
		251: "EDITION.OPTIONS",
		252: "PASTE.PICTURE",
		253: "PASTE.PICTURE.LINK",
		254: "SPELLING",
		256: "ZOOM",
		259: "INSERT.OBJECT",
		260: "WINDOW.MINIMIZE",
		265: "SOUND.NOTE",
		266: "SOUND.PLAY",
		267: "FORMAT.SHAPE",
		268: "EXTEND.POLYGON",
		269: "FORMAT.AUTO",
		272: "GALLERY.3D.BAR",
		273: "GALLERY.3D.SURFACE",
		274: "FILL.AUTO",
		276: "CUSTOMIZE.TOOLBAR",
		277: "ADD.TOOL",
		278: "EDIT.OBJECT",
		279: "ON.DOUBLECLICK",
		280: "ON.ENTRY",
		281: "WORKBOOK.ADD",
		282: "WORKBOOK.MOVE",
		283: "WORKBOOK.COPY",
		284: "WORKBOOK.OPTIONS",
		285: "SAVE.WORKSPACE",
		288: "CHART.WIZARD",
		289: "DELETE.TOOL",
		290: "MOVE.TOOL",
		291: "WORKBOOK.SELECT",
		292: "WORKBOOK.ACTIVATE",
		293: "ASSIGN.TO.TOOL",
		295: "COPY.TOOL",
		296: "RESET.TOOL",
		297: "CONSTRAIN.NUMERIC",
		298: "PASTE.TOOL",
		302: "WORKBOOK.NEW",
		305: "SCENARIO.CELLS",
		306: "SCENARIO.DELETE",
		307: "SCENARIO.ADD",
		308: "SCENARIO.EDIT",
		309: "SCENARIO.SHOW",
		310: "SCENARIO.SHOW.NEXT",
		311: "SCENARIO.SUMMARY",
		312: "PIVOT.TABLE.WIZARD",
		313: "PIVOT.FIELD.PROPERTIES",
		314: "PIVOT.FIELD",
		315: "PIVOT.ITEM",
		316: "PIVOT.ADD.FIELDS",
		318: "OPTIONS.CALCULATION",
		319: "OPTIONS.EDIT",
		320: "OPTIONS.VIEW",
		321: "ADDIN.MANAGER",
		322: "MENU.EDITOR",
		323: "ATTACH.TOOLBARS",
		324: "VBAActivate",
		325: "OPTIONS.CHART",
		328: "VBA.INSERT.FILE",
		330: "VBA.PROCEDURE.DEFINITION",
		336: "ROUTING.SLIP",
		338: "ROUTE.DOCUMENT",
		339: "MAIL.LOGON",
		342: "INSERT.PICTURE",
		343: "EDIT.TOOL",
		344: "GALLERY.DOUGHNUT",
		350: "CHART.TREND",
		352: "PIVOT.ITEM.PROPERTIES",
		354: "WORKBOOK.INSERT",
		355: "OPTIONS.TRANSITION",
		356: "OPTIONS.GENERAL",
		370: "FILTER.ADVANCED",
		373: "MAIL.ADD.MAILER",
		374: "MAIL.DELETE.MAILER",
		375: "MAIL.REPLY",
		376: "MAIL.REPLY.ALL",
		377: "MAIL.FORWARD",
		378: "MAIL.NEXT.LETTER",
		379: "DATA.LABEL",
		380: "INSERT.TITLE",
		381: "FONT.PROPERTIES",
		382: "MACRO.OPTIONS",
		383: "WORKBOOK.HIDE",
		384: "WORKBOOK.UNHIDE",
		385: "WORKBOOK.DELETE",
		386: "WORKBOOK.NAME",
		388: "GALLERY.CUSTOM",
		390: "ADD.CHART.AUTOFORMAT",
		391: "DELETE.CHART.AUTOFORMAT",
		392: "CHART.ADD.DATA",
		393: "AUTO.OUTLINE",
		394: "TAB.ORDER",
		395: "SHOW.DIALOG",
		396: "SELECT.ALL",
		397: "UNGROUP.SHEETS",
		398: "SUBTOTAL.CREATE",
		399: "SUBTOTAL.REMOVE",
		400: "RENAME.OBJECT",
		412: "WORKBOOK.SCROLL",
		413: "WORKBOOK.NEXT",
		414: "WORKBOOK.PREV",
		415: "WORKBOOK.TAB.SPLIT",
		416: "FULL.SCREEN",
		417: "WORKBOOK.PROTECT",
		420: "SCROLLBAR.PROPERTIES",
		421: "PIVOT.SHOW.PAGES",
		422: "TEXT.TO.COLUMNS",
		423: "FORMAT.CHARTTYPE",
		424: "LINK.FORMAT",
		425: "TRACER.DISPLAY",
		430: "TRACER.NAVIGATE",
		431: "TRACER.CLEAR",
		432: "TRACER.ERROR",
		433: "PIVOT.FIELD.GROUP",
		434: "PIVOT.FIELD.UNGROUP",
		435: "CHECKBOX.PROPERTIES",
		436: "LABEL.PROPERTIES",
		437: "LISTBOX.PROPERTIES",
		438: "EDITBOX.PROPERTIES",
		439: "PIVOT.REFRESH",
		440: "LINK.COMBO",
		441: "OPEN.TEXT",
		442: "HIDE.DIALOG",
		443: "SET.DIALOG.FOCUS",
		444: "ENABLE.OBJECT",
		445: "PUSHBUTTON.PROPERTIES",
		446: "SET.DIALOG.DEFAULT",
		447: "FILTER",
		448: "FILTER.SHOW.ALL",
		449: "CLEAR.OUTLINE",
		450: "FUNCTION.WIZARD",
		451: "ADD.LIST.ITEM",
		452: "SET.LIST.ITEM",
		453: "REMOVE.LIST.ITEM",
		454: "SELECT.LIST.ITEM",
		455: "SET.CONTROL.VALUE",
		456: "SAVE.COPY.AS",
		458: "OPTIONS.LISTS.ADD",
		459: "OPTIONS.LISTS.DELETE",
		460: "SERIES.AXES",
		461: "SERIES.X",
		462: "SERIES.Y",
		463: "ERRORBAR.X",
		464: "ERRORBAR.Y",
		465: "FORMAT.CHART",
		466: "SERIES.ORDER",
		467: "MAIL.LOGOFF",
		468: "CLEAR.ROUTING.SLIP",
		469: "APP.ACTIVATE.MICROSOFT",
		470: "MAIL.EDIT.MAILER",
		471: "ON.SHEET",
		472: "STANDARD.WIDTH",
		473: "SCENARIO.MERGE",
		474: "SUMMARY.INFO",
		475: "FIND.FILE",
		476: "ACTIVE.CELL.FONT",
		477: "ENABLE.TIPWIZARD",
		478: "VBA.MAKE.ADDIN",
		480: "INSERTDATATABLE",
		481: "WORKGROUP.OPTIONS",
		482: "MAIL.SEND.MAILER",
		485: "AUTOCORRECT",
		489: "POST.DOCUMENT",
		491: "PICKLIST",
		493: "VIEW.SHOW",
		494: "VIEW.DEFINE",
		495: "VIEW.DELETE",
		509: "SHEET.BACKGROUND",
		510: "INSERT.MAP.OBJECT",
		511: "OPTIONS.MENONO",
		517: "MSOCHECKS",
		518: "NORMAL",
		519: "LAYOUT",
		520: "RM.PRINT.AREA",
		521: "CLEAR.PRINT.AREA",
		522: "ADD.PRINT.AREA",
		523: "MOVE.BRK",
		545: "HIDECURR.NOTE",
		546: "HIDEALL.NOTES",
		547: "DELETE.NOTE",
		548: "TRAVERSE.NOTES",
		549: "ACTIVATE.NOTES",
		620: "PROTECT.REVISIONS",
		621: "UNPROTECT.REVISIONS",
		647: "OPTIONS.ME",
		653: "WEB.PUBLISH",
		667: "NEWWEBQUERY",
		673: "PIVOT.TABLE.CHART",
		753: "OPTIONS.SAVE",
		755: "OPTIONS.SPELL",
		808: "HIDEALL.INKANNOTS"
	};
	var Lu = {
		0: "COUNT",
		1: "IF",
		2: "ISNA",
		3: "ISERROR",
		4: "SUM",
		5: "AVERAGE",
		6: "MIN",
		7: "MAX",
		8: "ROW",
		9: "COLUMN",
		10: "NA",
		11: "NPV",
		12: "STDEV",
		13: "DOLLAR",
		14: "FIXED",
		15: "SIN",
		16: "COS",
		17: "TAN",
		18: "ATAN",
		19: "PI",
		20: "SQRT",
		21: "EXP",
		22: "LN",
		23: "LOG10",
		24: "ABS",
		25: "INT",
		26: "SIGN",
		27: "ROUND",
		28: "LOOKUP",
		29: "INDEX",
		30: "REPT",
		31: "MID",
		32: "LEN",
		33: "VALUE",
		34: "TRUE",
		35: "FALSE",
		36: "AND",
		37: "OR",
		38: "NOT",
		39: "MOD",
		40: "DCOUNT",
		41: "DSUM",
		42: "DAVERAGE",
		43: "DMIN",
		44: "DMAX",
		45: "DSTDEV",
		46: "VAR",
		47: "DVAR",
		48: "TEXT",
		49: "LINEST",
		50: "TREND",
		51: "LOGEST",
		52: "GROWTH",
		53: "GOTO",
		54: "HALT",
		55: "RETURN",
		56: "PV",
		57: "FV",
		58: "NPER",
		59: "PMT",
		60: "RATE",
		61: "MIRR",
		62: "IRR",
		63: "RAND",
		64: "MATCH",
		65: "DATE",
		66: "TIME",
		67: "DAY",
		68: "MONTH",
		69: "YEAR",
		70: "WEEKDAY",
		71: "HOUR",
		72: "MINUTE",
		73: "SECOND",
		74: "NOW",
		75: "AREAS",
		76: "ROWS",
		77: "COLUMNS",
		78: "OFFSET",
		79: "ABSREF",
		80: "RELREF",
		81: "ARGUMENT",
		82: "SEARCH",
		83: "TRANSPOSE",
		84: "ERROR",
		85: "STEP",
		86: "TYPE",
		87: "ECHO",
		88: "SET.NAME",
		89: "CALLER",
		90: "DEREF",
		91: "WINDOWS",
		92: "SERIES",
		93: "DOCUMENTS",
		94: "ACTIVE.CELL",
		95: "SELECTION",
		96: "RESULT",
		97: "ATAN2",
		98: "ASIN",
		99: "ACOS",
		100: "CHOOSE",
		101: "HLOOKUP",
		102: "VLOOKUP",
		103: "LINKS",
		104: "INPUT",
		105: "ISREF",
		106: "GET.FORMULA",
		107: "GET.NAME",
		108: "SET.VALUE",
		109: "LOG",
		110: "EXEC",
		111: "CHAR",
		112: "LOWER",
		113: "UPPER",
		114: "PROPER",
		115: "LEFT",
		116: "RIGHT",
		117: "EXACT",
		118: "TRIM",
		119: "REPLACE",
		120: "SUBSTITUTE",
		121: "CODE",
		122: "NAMES",
		123: "DIRECTORY",
		124: "FIND",
		125: "CELL",
		126: "ISERR",
		127: "ISTEXT",
		128: "ISNUMBER",
		129: "ISBLANK",
		130: "T",
		131: "N",
		132: "FOPEN",
		133: "FCLOSE",
		134: "FSIZE",
		135: "FREADLN",
		136: "FREAD",
		137: "FWRITELN",
		138: "FWRITE",
		139: "FPOS",
		140: "DATEVALUE",
		141: "TIMEVALUE",
		142: "SLN",
		143: "SYD",
		144: "DDB",
		145: "GET.DEF",
		146: "REFTEXT",
		147: "TEXTREF",
		148: "INDIRECT",
		149: "REGISTER",
		150: "CALL",
		151: "ADD.BAR",
		152: "ADD.MENU",
		153: "ADD.COMMAND",
		154: "ENABLE.COMMAND",
		155: "CHECK.COMMAND",
		156: "RENAME.COMMAND",
		157: "SHOW.BAR",
		158: "DELETE.MENU",
		159: "DELETE.COMMAND",
		160: "GET.CHART.ITEM",
		161: "DIALOG.BOX",
		162: "CLEAN",
		163: "MDETERM",
		164: "MINVERSE",
		165: "MMULT",
		166: "FILES",
		167: "IPMT",
		168: "PPMT",
		169: "COUNTA",
		170: "CANCEL.KEY",
		171: "FOR",
		172: "WHILE",
		173: "BREAK",
		174: "NEXT",
		175: "INITIATE",
		176: "REQUEST",
		177: "POKE",
		178: "EXECUTE",
		179: "TERMINATE",
		180: "RESTART",
		181: "HELP",
		182: "GET.BAR",
		183: "PRODUCT",
		184: "FACT",
		185: "GET.CELL",
		186: "GET.WORKSPACE",
		187: "GET.WINDOW",
		188: "GET.DOCUMENT",
		189: "DPRODUCT",
		190: "ISNONTEXT",
		191: "GET.NOTE",
		192: "NOTE",
		193: "STDEVP",
		194: "VARP",
		195: "DSTDEVP",
		196: "DVARP",
		197: "TRUNC",
		198: "ISLOGICAL",
		199: "DCOUNTA",
		200: "DELETE.BAR",
		201: "UNREGISTER",
		204: "USDOLLAR",
		205: "FINDB",
		206: "SEARCHB",
		207: "REPLACEB",
		208: "LEFTB",
		209: "RIGHTB",
		210: "MIDB",
		211: "LENB",
		212: "ROUNDUP",
		213: "ROUNDDOWN",
		214: "ASC",
		215: "DBCS",
		216: "RANK",
		219: "ADDRESS",
		220: "DAYS360",
		221: "TODAY",
		222: "VDB",
		223: "ELSE",
		224: "ELSE.IF",
		225: "END.IF",
		226: "FOR.CELL",
		227: "MEDIAN",
		228: "SUMPRODUCT",
		229: "SINH",
		230: "COSH",
		231: "TANH",
		232: "ASINH",
		233: "ACOSH",
		234: "ATANH",
		235: "DGET",
		236: "CREATE.OBJECT",
		237: "VOLATILE",
		238: "LAST.ERROR",
		239: "CUSTOM.UNDO",
		240: "CUSTOM.REPEAT",
		241: "FORMULA.CONVERT",
		242: "GET.LINK.INFO",
		243: "TEXT.BOX",
		244: "INFO",
		245: "GROUP",
		246: "GET.OBJECT",
		247: "DB",
		248: "PAUSE",
		251: "RESUME",
		252: "FREQUENCY",
		253: "ADD.TOOLBAR",
		254: "DELETE.TOOLBAR",
		255: "User",
		256: "RESET.TOOLBAR",
		257: "EVALUATE",
		258: "GET.TOOLBAR",
		259: "GET.TOOL",
		260: "SPELLING.CHECK",
		261: "ERROR.TYPE",
		262: "APP.TITLE",
		263: "WINDOW.TITLE",
		264: "SAVE.TOOLBAR",
		265: "ENABLE.TOOL",
		266: "PRESS.TOOL",
		267: "REGISTER.ID",
		268: "GET.WORKBOOK",
		269: "AVEDEV",
		270: "BETADIST",
		271: "GAMMALN",
		272: "BETAINV",
		273: "BINOMDIST",
		274: "CHIDIST",
		275: "CHIINV",
		276: "COMBIN",
		277: "CONFIDENCE",
		278: "CRITBINOM",
		279: "EVEN",
		280: "EXPONDIST",
		281: "FDIST",
		282: "FINV",
		283: "FISHER",
		284: "FISHERINV",
		285: "FLOOR",
		286: "GAMMADIST",
		287: "GAMMAINV",
		288: "CEILING",
		289: "HYPGEOMDIST",
		290: "LOGNORMDIST",
		291: "LOGINV",
		292: "NEGBINOMDIST",
		293: "NORMDIST",
		294: "NORMSDIST",
		295: "NORMINV",
		296: "NORMSINV",
		297: "STANDARDIZE",
		298: "ODD",
		299: "PERMUT",
		300: "POISSON",
		301: "TDIST",
		302: "WEIBULL",
		303: "SUMXMY2",
		304: "SUMX2MY2",
		305: "SUMX2PY2",
		306: "CHITEST",
		307: "CORREL",
		308: "COVAR",
		309: "FORECAST",
		310: "FTEST",
		311: "INTERCEPT",
		312: "PEARSON",
		313: "RSQ",
		314: "STEYX",
		315: "SLOPE",
		316: "TTEST",
		317: "PROB",
		318: "DEVSQ",
		319: "GEOMEAN",
		320: "HARMEAN",
		321: "SUMSQ",
		322: "KURT",
		323: "SKEW",
		324: "ZTEST",
		325: "LARGE",
		326: "SMALL",
		327: "QUARTILE",
		328: "PERCENTILE",
		329: "PERCENTRANK",
		330: "MODE",
		331: "TRIMMEAN",
		332: "TINV",
		334: "MOVIE.COMMAND",
		335: "GET.MOVIE",
		336: "CONCATENATE",
		337: "POWER",
		338: "PIVOT.ADD.DATA",
		339: "GET.PIVOT.TABLE",
		340: "GET.PIVOT.FIELD",
		341: "GET.PIVOT.ITEM",
		342: "RADIANS",
		343: "DEGREES",
		344: "SUBTOTAL",
		345: "SUMIF",
		346: "COUNTIF",
		347: "COUNTBLANK",
		348: "SCENARIO.GET",
		349: "OPTIONS.LISTS.GET",
		350: "ISPMT",
		351: "DATEDIF",
		352: "DATESTRING",
		353: "NUMBERSTRING",
		354: "ROMAN",
		355: "OPEN.DIALOG",
		356: "SAVE.DIALOG",
		357: "VIEW.GET",
		358: "GETPIVOTDATA",
		359: "HYPERLINK",
		360: "PHONETIC",
		361: "AVERAGEA",
		362: "MAXA",
		363: "MINA",
		364: "STDEVPA",
		365: "VARPA",
		366: "STDEVA",
		367: "VARA",
		368: "BAHTTEXT",
		369: "THAIDAYOFWEEK",
		370: "THAIDIGIT",
		371: "THAIMONTHOFYEAR",
		372: "THAINUMSOUND",
		373: "THAINUMSTRING",
		374: "THAISTRINGLENGTH",
		375: "ISTHAIDIGIT",
		376: "ROUNDBAHTDOWN",
		377: "ROUNDBAHTUP",
		378: "THAIYEAR",
		379: "RTD",
		380: "CUBEVALUE",
		381: "CUBEMEMBER",
		382: "CUBEMEMBERPROPERTY",
		383: "CUBERANKEDMEMBER",
		384: "HEX2BIN",
		385: "HEX2DEC",
		386: "HEX2OCT",
		387: "DEC2BIN",
		388: "DEC2HEX",
		389: "DEC2OCT",
		390: "OCT2BIN",
		391: "OCT2HEX",
		392: "OCT2DEC",
		393: "BIN2DEC",
		394: "BIN2OCT",
		395: "BIN2HEX",
		396: "IMSUB",
		397: "IMDIV",
		398: "IMPOWER",
		399: "IMABS",
		400: "IMSQRT",
		401: "IMLN",
		402: "IMLOG2",
		403: "IMLOG10",
		404: "IMSIN",
		405: "IMCOS",
		406: "IMEXP",
		407: "IMARGUMENT",
		408: "IMCONJUGATE",
		409: "IMAGINARY",
		410: "IMREAL",
		411: "COMPLEX",
		412: "IMSUM",
		413: "IMPRODUCT",
		414: "SERIESSUM",
		415: "FACTDOUBLE",
		416: "SQRTPI",
		417: "QUOTIENT",
		418: "DELTA",
		419: "GESTEP",
		420: "ISEVEN",
		421: "ISODD",
		422: "MROUND",
		423: "ERF",
		424: "ERFC",
		425: "BESSELJ",
		426: "BESSELK",
		427: "BESSELY",
		428: "BESSELI",
		429: "XIRR",
		430: "XNPV",
		431: "PRICEMAT",
		432: "YIELDMAT",
		433: "INTRATE",
		434: "RECEIVED",
		435: "DISC",
		436: "PRICEDISC",
		437: "YIELDDISC",
		438: "TBILLEQ",
		439: "TBILLPRICE",
		440: "TBILLYIELD",
		441: "PRICE",
		442: "YIELD",
		443: "DOLLARDE",
		444: "DOLLARFR",
		445: "NOMINAL",
		446: "EFFECT",
		447: "CUMPRINC",
		448: "CUMIPMT",
		449: "EDATE",
		450: "EOMONTH",
		451: "YEARFRAC",
		452: "COUPDAYBS",
		453: "COUPDAYS",
		454: "COUPDAYSNC",
		455: "COUPNCD",
		456: "COUPNUM",
		457: "COUPPCD",
		458: "DURATION",
		459: "MDURATION",
		460: "ODDLPRICE",
		461: "ODDLYIELD",
		462: "ODDFPRICE",
		463: "ODDFYIELD",
		464: "RANDBETWEEN",
		465: "WEEKNUM",
		466: "AMORDEGRC",
		467: "AMORLINC",
		468: "CONVERT",
		724: "SHEETJS",
		469: "ACCRINT",
		470: "ACCRINTM",
		471: "WORKDAY",
		472: "NETWORKDAYS",
		473: "GCD",
		474: "MULTINOMIAL",
		475: "LCM",
		476: "FVSCHEDULE",
		477: "CUBEKPIMEMBER",
		478: "CUBESET",
		479: "CUBESETCOUNT",
		480: "IFERROR",
		481: "COUNTIFS",
		482: "SUMIFS",
		483: "AVERAGEIF",
		484: "AVERAGEIFS"
	};
	var Mu = {
		2: 1,
		3: 1,
		10: 0,
		15: 1,
		16: 1,
		17: 1,
		18: 1,
		19: 0,
		20: 1,
		21: 1,
		22: 1,
		23: 1,
		24: 1,
		25: 1,
		26: 1,
		27: 2,
		30: 2,
		31: 3,
		32: 1,
		33: 1,
		34: 0,
		35: 0,
		38: 1,
		39: 2,
		40: 3,
		41: 3,
		42: 3,
		43: 3,
		44: 3,
		45: 3,
		47: 3,
		48: 2,
		53: 1,
		61: 3,
		63: 0,
		65: 3,
		66: 3,
		67: 1,
		68: 1,
		69: 1,
		70: 1,
		71: 1,
		72: 1,
		73: 1,
		74: 0,
		75: 1,
		76: 1,
		77: 1,
		79: 2,
		80: 2,
		83: 1,
		85: 0,
		86: 1,
		89: 0,
		90: 1,
		94: 0,
		95: 0,
		97: 2,
		98: 1,
		99: 1,
		101: 3,
		102: 3,
		105: 1,
		106: 1,
		108: 2,
		111: 1,
		112: 1,
		113: 1,
		114: 1,
		117: 2,
		118: 1,
		119: 4,
		121: 1,
		126: 1,
		127: 1,
		128: 1,
		129: 1,
		130: 1,
		131: 1,
		133: 1,
		134: 1,
		135: 1,
		136: 2,
		137: 2,
		138: 2,
		140: 1,
		141: 1,
		142: 3,
		143: 4,
		144: 4,
		161: 1,
		162: 1,
		163: 1,
		164: 1,
		165: 2,
		172: 1,
		175: 2,
		176: 2,
		177: 3,
		178: 2,
		179: 1,
		184: 1,
		186: 1,
		189: 3,
		190: 1,
		195: 3,
		196: 3,
		197: 1,
		198: 1,
		199: 3,
		201: 1,
		207: 4,
		210: 3,
		211: 1,
		212: 2,
		213: 2,
		214: 1,
		215: 1,
		225: 0,
		229: 1,
		230: 1,
		231: 1,
		232: 1,
		233: 1,
		234: 1,
		235: 3,
		244: 1,
		247: 4,
		252: 2,
		257: 1,
		261: 1,
		271: 1,
		273: 4,
		274: 2,
		275: 2,
		276: 2,
		277: 3,
		278: 3,
		279: 1,
		280: 3,
		281: 3,
		282: 3,
		283: 1,
		284: 1,
		285: 2,
		286: 4,
		287: 3,
		288: 2,
		289: 4,
		290: 3,
		291: 3,
		292: 3,
		293: 4,
		294: 1,
		295: 3,
		296: 1,
		297: 3,
		298: 1,
		299: 2,
		300: 3,
		301: 3,
		302: 4,
		303: 2,
		304: 2,
		305: 2,
		306: 2,
		307: 2,
		308: 2,
		309: 3,
		310: 2,
		311: 2,
		312: 2,
		313: 2,
		314: 2,
		315: 2,
		316: 4,
		325: 2,
		326: 2,
		327: 2,
		328: 2,
		331: 2,
		332: 2,
		337: 2,
		342: 1,
		343: 1,
		346: 2,
		347: 1,
		350: 4,
		351: 3,
		352: 1,
		353: 2,
		360: 1,
		368: 1,
		369: 1,
		370: 1,
		371: 1,
		372: 1,
		373: 1,
		374: 1,
		375: 1,
		376: 1,
		377: 1,
		378: 1,
		382: 3,
		385: 1,
		392: 1,
		393: 1,
		396: 2,
		397: 2,
		398: 2,
		399: 1,
		400: 1,
		401: 1,
		402: 1,
		403: 1,
		404: 1,
		405: 1,
		406: 1,
		407: 1,
		408: 1,
		409: 1,
		410: 1,
		414: 4,
		415: 1,
		416: 1,
		417: 2,
		420: 1,
		421: 1,
		422: 2,
		424: 1,
		425: 2,
		426: 2,
		427: 2,
		428: 2,
		430: 3,
		438: 3,
		439: 3,
		440: 3,
		443: 2,
		444: 2,
		445: 2,
		446: 2,
		447: 6,
		448: 6,
		449: 2,
		450: 2,
		464: 2,
		468: 3,
		476: 2,
		479: 1,
		480: 2,
		65535: 0
	};
	var Wu = {
		"_xlfn.ACOT": "ACOT",
		"_xlfn.ACOTH": "ACOTH",
		"_xlfn.AGGREGATE": "AGGREGATE",
		"_xlfn.ARABIC": "ARABIC",
		"_xlfn.AVERAGEIF": "AVERAGEIF",
		"_xlfn.AVERAGEIFS": "AVERAGEIFS",
		"_xlfn.BASE": "BASE",
		"_xlfn.BETA.DIST": "BETA.DIST",
		"_xlfn.BETA.INV": "BETA.INV",
		"_xlfn.BINOM.DIST": "BINOM.DIST",
		"_xlfn.BINOM.DIST.RANGE": "BINOM.DIST.RANGE",
		"_xlfn.BINOM.INV": "BINOM.INV",
		"_xlfn.BITAND": "BITAND",
		"_xlfn.BITLSHIFT": "BITLSHIFT",
		"_xlfn.BITOR": "BITOR",
		"_xlfn.BITRSHIFT": "BITRSHIFT",
		"_xlfn.BITXOR": "BITXOR",
		"_xlfn.CEILING.MATH": "CEILING.MATH",
		"_xlfn.CEILING.PRECISE": "CEILING.PRECISE",
		"_xlfn.CHISQ.DIST": "CHISQ.DIST",
		"_xlfn.CHISQ.DIST.RT": "CHISQ.DIST.RT",
		"_xlfn.CHISQ.INV": "CHISQ.INV",
		"_xlfn.CHISQ.INV.RT": "CHISQ.INV.RT",
		"_xlfn.CHISQ.TEST": "CHISQ.TEST",
		"_xlfn.COMBINA": "COMBINA",
		"_xlfn.CONCAT": "CONCAT",
		"_xlfn.CONFIDENCE.NORM": "CONFIDENCE.NORM",
		"_xlfn.CONFIDENCE.T": "CONFIDENCE.T",
		"_xlfn.COT": "COT",
		"_xlfn.COTH": "COTH",
		"_xlfn.COUNTIFS": "COUNTIFS",
		"_xlfn.COVARIANCE.P": "COVARIANCE.P",
		"_xlfn.COVARIANCE.S": "COVARIANCE.S",
		"_xlfn.CSC": "CSC",
		"_xlfn.CSCH": "CSCH",
		"_xlfn.DAYS": "DAYS",
		"_xlfn.DECIMAL": "DECIMAL",
		"_xlfn.ECMA.CEILING": "ECMA.CEILING",
		"_xlfn.ERF.PRECISE": "ERF.PRECISE",
		"_xlfn.ERFC.PRECISE": "ERFC.PRECISE",
		"_xlfn.EXPON.DIST": "EXPON.DIST",
		"_xlfn.F.DIST": "F.DIST",
		"_xlfn.F.DIST.RT": "F.DIST.RT",
		"_xlfn.F.INV": "F.INV",
		"_xlfn.F.INV.RT": "F.INV.RT",
		"_xlfn.F.TEST": "F.TEST",
		"_xlfn.FILTERXML": "FILTERXML",
		"_xlfn.FLOOR.MATH": "FLOOR.MATH",
		"_xlfn.FLOOR.PRECISE": "FLOOR.PRECISE",
		"_xlfn.FORECAST.ETS": "FORECAST.ETS",
		"_xlfn.FORECAST.ETS.CONFINT": "FORECAST.ETS.CONFINT",
		"_xlfn.FORECAST.ETS.SEASONALITY": "FORECAST.ETS.SEASONALITY",
		"_xlfn.FORECAST.ETS.STAT": "FORECAST.ETS.STAT",
		"_xlfn.FORECAST.LINEAR": "FORECAST.LINEAR",
		"_xlfn.FORMULATEXT": "FORMULATEXT",
		"_xlfn.GAMMA": "GAMMA",
		"_xlfn.GAMMA.DIST": "GAMMA.DIST",
		"_xlfn.GAMMA.INV": "GAMMA.INV",
		"_xlfn.GAMMALN.PRECISE": "GAMMALN.PRECISE",
		"_xlfn.GAUSS": "GAUSS",
		"_xlfn.HYPGEOM.DIST": "HYPGEOM.DIST",
		"_xlfn.IFERROR": "IFERROR",
		"_xlfn.IFNA": "IFNA",
		"_xlfn.IFS": "IFS",
		"_xlfn.IMCOSH": "IMCOSH",
		"_xlfn.IMCOT": "IMCOT",
		"_xlfn.IMCSC": "IMCSC",
		"_xlfn.IMCSCH": "IMCSCH",
		"_xlfn.IMSEC": "IMSEC",
		"_xlfn.IMSECH": "IMSECH",
		"_xlfn.IMSINH": "IMSINH",
		"_xlfn.IMTAN": "IMTAN",
		"_xlfn.ISFORMULA": "ISFORMULA",
		"_xlfn.ISO.CEILING": "ISO.CEILING",
		"_xlfn.ISOWEEKNUM": "ISOWEEKNUM",
		"_xlfn.LOGNORM.DIST": "LOGNORM.DIST",
		"_xlfn.LOGNORM.INV": "LOGNORM.INV",
		"_xlfn.MAXIFS": "MAXIFS",
		"_xlfn.MINIFS": "MINIFS",
		"_xlfn.MODE.MULT": "MODE.MULT",
		"_xlfn.MODE.SNGL": "MODE.SNGL",
		"_xlfn.MUNIT": "MUNIT",
		"_xlfn.NEGBINOM.DIST": "NEGBINOM.DIST",
		"_xlfn.NETWORKDAYS.INTL": "NETWORKDAYS.INTL",
		"_xlfn.NIGBINOM": "NIGBINOM",
		"_xlfn.NORM.DIST": "NORM.DIST",
		"_xlfn.NORM.INV": "NORM.INV",
		"_xlfn.NORM.S.DIST": "NORM.S.DIST",
		"_xlfn.NORM.S.INV": "NORM.S.INV",
		"_xlfn.NUMBERVALUE": "NUMBERVALUE",
		"_xlfn.PDURATION": "PDURATION",
		"_xlfn.PERCENTILE.EXC": "PERCENTILE.EXC",
		"_xlfn.PERCENTILE.INC": "PERCENTILE.INC",
		"_xlfn.PERCENTRANK.EXC": "PERCENTRANK.EXC",
		"_xlfn.PERCENTRANK.INC": "PERCENTRANK.INC",
		"_xlfn.PERMUTATIONA": "PERMUTATIONA",
		"_xlfn.PHI": "PHI",
		"_xlfn.POISSON.DIST": "POISSON.DIST",
		"_xlfn.QUARTILE.EXC": "QUARTILE.EXC",
		"_xlfn.QUARTILE.INC": "QUARTILE.INC",
		"_xlfn.QUERYSTRING": "QUERYSTRING",
		"_xlfn.RANK.AVG": "RANK.AVG",
		"_xlfn.RANK.EQ": "RANK.EQ",
		"_xlfn.RRI": "RRI",
		"_xlfn.SEC": "SEC",
		"_xlfn.SECH": "SECH",
		"_xlfn.SHEET": "SHEET",
		"_xlfn.SHEETS": "SHEETS",
		"_xlfn.SKEW.P": "SKEW.P",
		"_xlfn.STDEV.P": "STDEV.P",
		"_xlfn.STDEV.S": "STDEV.S",
		"_xlfn.SUMIFS": "SUMIFS",
		"_xlfn.SWITCH": "SWITCH",
		"_xlfn.T.DIST": "T.DIST",
		"_xlfn.T.DIST.2T": "T.DIST.2T",
		"_xlfn.T.DIST.RT": "T.DIST.RT",
		"_xlfn.T.INV": "T.INV",
		"_xlfn.T.INV.2T": "T.INV.2T",
		"_xlfn.T.TEST": "T.TEST",
		"_xlfn.TEXTJOIN": "TEXTJOIN",
		"_xlfn.UNICHAR": "UNICHAR",
		"_xlfn.UNICODE": "UNICODE",
		"_xlfn.VAR.P": "VAR.P",
		"_xlfn.VAR.S": "VAR.S",
		"_xlfn.WEBSERVICE": "WEBSERVICE",
		"_xlfn.WEIBULL.DIST": "WEIBULL.DIST",
		"_xlfn.WORKDAY.INTL": "WORKDAY.INTL",
		"_xlfn.XOR": "XOR",
		"_xlfn.Z.TEST": "Z.TEST"
	};

	function Uu(e) {
		if (e.slice(0, 3) == "of:") e = e.slice(3);
		if (e.charCodeAt(0) == 61) {
			e = e.slice(1);
			if (e.charCodeAt(0) == 61) e = e.slice(1)
		}
		e = e.replace(/COM\.MICROSOFT\./g, "");
		e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function (e, r) {
			return r.replace(/\./g, "")
		});
		e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1");
		return e.replace(/[;~]/g, ",").replace(/\|/g, ";")
	}

	function Hu(e) {
		var r = "of:=" + e.replace(Xf, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
		return r.replace(/;/g, "|").replace(/,/g, ";")
	}

	function Vu(e) {
		var r = e.split(":");
		var t = r[0].split(".")[0];
		return [t, r[0].split(".")[1] + (r.length > 1 ? ":" + (r[1].split(".")[1] || r[1].split(".")[0]) : "")]
	}

	function zu(e) {
		return e.replace(/\./, "!")
	}
	var Xu = {};
	var Gu = {};
	In.WS = ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
		"http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
	];
	var ju = typeof Map !== "undefined";

	function Ku(e, r, t) {
		var n = 0,
			a = e.length;
		if (t) {
			if (ju ? t.has(r) : t.hasOwnProperty(r)) {
				var i = ju ? t.get(r) : t[r];
				for (; n < i.length; ++n) {
					if (e[i[n]].t === r) {
						e.Count++;
						return i[n]
					}
				}
			}
		} else
			for (; n < a; ++n) {
				if (e[n].t === r) {
					e.Count++;
					return n
				}
			}
		e[a] = {
			t: r
		};
		e.Count++;
		e.Unique++;
		if (t) {
			if (ju) {
				if (!t.has(r)) t.set(r, []);
				t.get(r).push(a)
			} else {
				if (!t.hasOwnProperty(r)) t[r] = [];
				t[r].push(a)
			}
		}
		return a
	}

	function Yu(e, r) {
		var t = {
			min: e + 1,
			max: e + 1
		};
		var n = -1;
		if (r.MDW) el = r.MDW;
		if (r.width != null) t.customWidth = 1;
		else if (r.wpx != null) n = tl(r.wpx);
		else if (r.wch != null) n = r.wch;
		if (n > -1) {
			t.width = nl(n);
			t.customWidth = 1
		} else if (r.width != null) t.width = r.width;
		if (r.hidden) t.hidden = true;
		return t
	}

	function $u(e, r) {
		if (!e) return;
		var t = [.7, .7, .75, .75, .3, .3];
		if (r == "xlml") t = [1, 1, 1, 1, .5, .5];
		if (e.left == null) e.left = t[0];
		if (e.right == null) e.right = t[1];
		if (e.top == null) e.top = t[2];
		if (e.bottom == null) e.bottom = t[3];
		if (e.header == null) e.header = t[4];
		if (e.footer == null) e.footer = t[5]
	}

	function Zu(e, r, t) {
		var n = t.revssf[r.z != null ? r.z : "General"];
		var a = 60,
			i = e.length;
		if (n == null && t.ssf) {
			for (; a < 392; ++a)
				if (t.ssf[a] == null) {
					I.load(r.z, a);
					t.ssf[a] = r.z;
					t.revssf[r.z] = n = a;
					break
				}
		}
		for (a = 0; a != i; ++a)
			if (e[a].numFmtId === n) return a;
		e[i] = {
			numFmtId: n,
			fontId: 0,
			fillId: 0,
			borderId: 0,
			xfId: 0,
			applyNumberFormat: 1
		};
		return i
	}

	function Qu(e, r, t, n, a, i) {
		if (e.t === "z") return;
		if (e.t === "d" && typeof e.v === "string") e.v = ae(e.v);
		try {
			if (n.cellNF) e.z = I._table[r]
		} catch (e) {
			if (n.WTF) throw e
		}
		if (!n || n.cellText !== false) try {
			if (I._table[r] == null) I.load(O[r] || "General", r);
			if (e.t === "e") e.w = e.w || Gt[e.v];
			else if (r === 0) {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = I._general_int(e.v);
					else e.w = I._general_num(e.v)
				} else if (e.t === "d") {
					var s = q(e.v);
					if ((s | 0) === s) e.w = I._general_int(s);
					else e.w = I._general_num(s)
				} else if (e.v === undefined) return "";
				else e.w = I._general(e.v, Gu)
			} else if (e.t === "d") e.w = I.format(r, q(e.v), Gu);
			else e.w = I.format(r, e.v, Gu)
		} catch (e) {
			if (n.WTF) throw e
		}
		if (!n.cellStyles) return;
		if (t != null) try {
			e.s = i.Fills[t];
			if (e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb) {
				e.s.fgColor.rgb = Zo(a.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0);
				if (n.WTF) e.s.fgColor.raw_rgb = a.themeElements.clrScheme[e.s.fgColor.theme].rgb
			}
			if (e.s.bgColor && e.s.bgColor.theme) {
				e.s.bgColor.rgb = Zo(a.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0);
				if (n.WTF) e.s.bgColor.raw_rgb = a.themeElements.clrScheme[e.s.bgColor.theme].rgb
			}
		} catch (e) {
			if (n.WTF && i.Fills) throw e
		}
	}

	function Ju(e, r, t) {
		if (e && e["!ref"]) {
			var n = dt(e["!ref"]);
			if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + t + "): " + e["!ref"])
		}
	}

	function qu(e, r) {
		var t = dt(r);
		if (t.s.r <= t.e.r && t.s.c <= t.e.c && t.s.r >= 0 && t.s.c >= 0) e["!ref"] = ht(t)
	}
	var eh = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;
	var rh = /<(?:\w+:)?sheetData>([\s\S]*)<\/(?:\w+:)?sheetData>/;
	var th = /<(?:\w:)?hyperlink [^>]*>/gm;
	var nh = /"(\w*:\w*)"/;
	var ah = /<(?:\w:)?col\b[^>]*[\/]?>/g;
	var ih = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;
	var sh = /<(?:\w:)?pageMargins[^>]*\/>/g;
	var oh = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/;
	var lh = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;

	function fh(e, r, t, n, a, i, s) {
		if (!e) return e;
		if (v != null && r.dense == null) r.dense = v;
		var o = r.dense ? [] : {};
		var l = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var f = "",
			c = "";
		var u = e.match(rh);
		if (u) {
			f = e.slice(0, u.index);
			c = e.slice(u.index + u[0].length)
		} else f = c = e;
		var h = f.match(oh);
		if (h) uh(h[0], o, a, t);
		var d = (f.match(/<(?:\w*:)?dimension/) || {
			index: -1
		}).index;
		if (d > 0) {
			var p = f.slice(d, d + 50).match(nh);
			if (p) qu(o, p[1])
		}
		var g = f.match(lh);
		if (g && g[1]) kh(g[1], a);
		var m = [];
		if (r.cellStyles) {
			var b = f.match(ah);
			if (b) gh(m, b)
		}
		if (u) Ah(u[1], o, r, l, i, s);
		var C = c.match(ih);
		if (C) o["!autofilter"] = bh(C[0]);
		var E = [];
		var k = c.match(eh);
		if (k)
			for (d = 0; d != k.length; ++d) E[d] = dt(k[d].slice(k[d].indexOf('"') + 1));
		var S = c.match(th);
		if (S) dh(o, S, n);
		var w = c.match(sh);
		if (w) o["!margins"] = ph(Be(w[0]));
		if (!o["!ref"] && l.e.c >= l.s.c && l.e.r >= l.s.r) o["!ref"] = ht(l);
		if (r.sheetRows > 0 && o["!ref"]) {
			var A = dt(o["!ref"]);
			if (r.sheetRows <= +A.e.r) {
				A.e.r = r.sheetRows - 1;
				if (A.e.r > l.e.r) A.e.r = l.e.r;
				if (A.e.r < A.s.r) A.s.r = A.e.r;
				if (A.e.c > l.e.c) A.e.c = l.e.c;
				if (A.e.c < A.s.c) A.s.c = A.e.c;
				o["!fullref"] = o["!ref"];
				o["!ref"] = ht(A)
			}
		}
		if (m.length > 0) o["!cols"] = m;
		if (E.length > 0) o["!merges"] = E;
		return o
	}

	function ch(e) {
		if (e.length === 0) return "";
		var r = '<mergeCells count="' + e.length + '">';
		for (var t = 0; t != e.length; ++t) r += '<mergeCell ref="' + ht(e[t]) + '"/>';
		return r + "</mergeCells>"
	}

	function uh(e, r, t, n) {
		var a = Be(e);
		if (!t.Sheets[n]) t.Sheets[n] = {};
		if (a.codeName) t.Sheets[n].CodeName = a.codeName
	}

	function hh(e) {
		var r = {
			sheet: 1
		};
		var t = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"];
		var n = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows",
			"sort", "autoFilter", "pivotTables"
		];
		t.forEach(function (t) {
			if (e[t] != null && e[t]) r[t] = "1"
		});
		n.forEach(function (t) {
			if (e[t] != null && !e[t]) r[t] = "0"
		});
		if (e.password) r.password = Mo(e.password).toString(16).toUpperCase();
		return tr("sheetProtection", null, r)
	}

	function dh(e, r, t) {
		var n = Array.isArray(e);
		for (var a = 0; a != r.length; ++a) {
			var i = Be(Ve(r[a]), true);
			if (!i.ref) return;
			var s = ((t || {})["!id"] || [])[i.id];
			if (s) {
				i.Target = s.Target;
				if (i.location) i.Target += "#" + i.location
			} else {
				i.Target = "#" + i.location;
				s = {
					Target: i.Target,
					TargetMode: "Internal"
				}
			}
			i.Rel = s;
			if (i.tooltip) {
				i.Tooltip = i.tooltip;
				delete i.tooltip
			}
			var o = dt(i.ref);
			for (var l = o.s.r; l <= o.e.r; ++l)
				for (var f = o.s.c; f <= o.e.c; ++f) {
					var c = ct({
						c: f,
						r: l
					});
					if (n) {
						if (!e[l]) e[l] = [];
						if (!e[l][f]) e[l][f] = {
							t: "z",
							v: undefined
						};
						e[l][f].l = i
					} else {
						if (!e[c]) e[c] = {
							t: "z",
							v: undefined
						};
						e[c].l = i
					}
				}
		}
	}

	function ph(e) {
		var r = {};
		["left", "right", "top", "bottom", "header", "footer"].forEach(function (t) {
			if (e[t]) r[t] = parseFloat(e[t])
		});
		return r
	}

	function vh(e) {
		$u(e);
		return tr("pageMargins", null, e)
	}

	function gh(e, r) {
		var t = false;
		for (var n = 0; n != r.length; ++n) {
			var a = Be(r[n], true);
			if (a.hidden) a.hidden = He(a.hidden);
			var i = parseInt(a.min, 10) - 1,
				s = parseInt(a.max, 10) - 1;
			delete a.min;
			delete a.max;
			a.width = +a.width;
			if (!t && a.width) {
				t = true;
				il(a.width)
			}
			sl(a);
			while (i <= s) e[i++] = se(a)
		}
	}

	function mh(e, r) {
		var t = ["<cols>"],
			n;
		for (var a = 0; a != r.length; ++a) {
			if (!(n = r[a])) continue;
			t[t.length] = tr("col", null, Yu(a, n))
		}
		t[t.length] = "</cols>";
		return t.join("")
	}

	function bh(e) {
		var r = {
			ref: (e.match(/ref="([^"]*)"/) || [])[1]
		};
		return r
	}

	function Ch(e, r, t, n) {
		var a = typeof e.ref == "string" ? e.ref : ht(e.ref);
		if (!t.Workbook) t.Workbook = {};
		if (!t.Workbook.Names) t.Workbook.Names = [];
		var i = t.Workbook.Names;
		var s = ut(a);
		if (s.s.r == s.e.r) {
			s.e.r = ut(r["!ref"]).e.r;
			a = ht(s)
		}
		for (var o = 0; o < i.length; ++o) {
			var l = i[o];
			if (l.Name != "_xlnm._FilterDatabase") continue;
			if (l.Sheet != n) continue;
			l.Ref = "'" + t.SheetNames[n] + "'!" + a;
			break
		}
		if (o == i.length) i.push({
			Name: "_xlnm._FilterDatabase",
			Sheet: n,
			Ref: "'" + t.SheetNames[n] + "'!" + a
		});
		return tr("autoFilter", null, {
			ref: a
		})
	}
	var Eh = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/>/;

	function kh(e, r) {
		(e.match(Eh) || []).forEach(function (e) {
			var t = Be(e);
			if (He(t.rightToLeft)) {
				if (!r.Views) r.Views = [{}];
				if (!r.Views[0]) r.Views[0] = {};
				r.Views[0].RTL = true
			}
		})
	}

	function Sh(e, r, t, n) {
		var a = {
			workbookViewId: "0"
		};
		if ((((n || {}).Workbook || {}).Views || [])[0]) a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0";
		return tr("sheetViews", tr("sheetView", null, a), {})
	}

	function wh(e, r, t, n) {
		if (e.v === undefined && e.f === undefined || e.t === "z") return "";
		var a = "";
		var i = e.t,
			s = e.v;
		switch (e.t) {
		case "b":
			a = e.v ? "1" : "0";
			break;
		case "n":
			a = "" + e.v;
			break;
		case "e":
			a = Gt[e.v];
			break;
		case "d":
			if (n.cellDates) a = ae(e.v, -1).toISOString();
			else {
				e = se(e);
				e.t = "n";
				a = "" + (e.v = q(ae(e.v)))
			}
			if (typeof e.z === "undefined") e.z = I._table[14];
			break;
		default:
			a = e.v;
			break
		}
		var o = er("v", Oe(a)),
			l = {
				r: r
			};
		var f = Zu(n.cellXfs, e, n);
		if (f !== 0) l.s = f;
		switch (e.t) {
		case "n":
			break;
		case "d":
			l.t = "d";
			break;
		case "b":
			l.t = "b";
			break;
		case "e":
			l.t = "e";
			break;
		default:
			if (e.v == null) {
				delete e.t;
				break
			}
			if (n.bookSST) {
				o = er("v", "" + Ku(n.Strings, e.v, n.revStrings));
				l.t = "s";
				break
			}
			l.t = "str";
			break
		}
		if (e.t != i) {
			e.t = i;
			e.v = s
		}
		if (e.f) {
			var c = e.F && e.F.slice(0, r.length) == r ? {
				t: "array",
				ref: e.F
			} : null;
			o = tr("f", Oe(e.f), c) + (e.v != null ? o : "")
		}
		if (e.l) t["!links"].push([r, e.l]);
		if (e.c) t["!comments"].push([r, e.c]);
		return tr("c", o, l)
	}
	var Ah = function () {
		var e = /<(?:\w+:)?c[ >]/,
			r = /<\/(?:\w+:)?row>/;
		var t = /r=["']([^"']*)["']/,
			n = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;
		var a = /ref=["']([^"']*)["']/;
		var i = Ke("v"),
			s = Ke("f");
		return function o(l, f, c, u, h, d) {
			var p = 0,
				v = "",
				g = [],
				m = [],
				b = 0,
				C = 0,
				E = 0,
				k = "",
				S;
			var w, A = 0,
				_ = 0;
			var R, B;
			var T = 0,
				y = 0;
			var x = Array.isArray(d.CellXf),
				D;
			var F = [];
			var O = [];
			var P = Array.isArray(f);
			var N = [],
				L = {},
				M = false;
			for (var W = l.split(r), U = 0, H = W.length; U != H; ++U) {
				v = W[U].trim();
				var V = v.length;
				if (V === 0) continue;
				for (p = 0; p < V; ++p)
					if (v.charCodeAt(p) === 62) break;
					++p;
				w = Be(v.slice(0, p), true);
				A = w.r != null ? parseInt(w.r, 10) : A + 1;
				_ = -1;
				if (c.sheetRows && c.sheetRows < A) continue;
				if (u.s.r > A - 1) u.s.r = A - 1;
				if (u.e.r < A - 1) u.e.r = A - 1;
				if (c && c.cellStyles) {
					L = {};
					M = false;
					if (w.ht) {
						M = true;
						L.hpt = parseFloat(w.ht);
						L.hpx = cl(L.hpt)
					}
					if (w.hidden == "1") {
						M = true;
						L.hidden = true
					}
					if (w.outlineLevel != null) {
						M = true;
						L.level = +w.outlineLevel
					}
					if (M) N[A - 1] = L
				}
				g = v.slice(p).split(e);
				for (p = 0; p != g.length; ++p) {
					v = g[p].trim();
					if (v.length === 0) continue;
					m = v.match(t);
					b = p;
					C = 0;
					E = 0;
					v = "<c " + (v.slice(0, 1) == "<" ? ">" : "") + v;
					if (m != null && m.length === 2) {
						b = 0;
						k = m[1];
						for (C = 0; C != k.length; ++C) {
							if ((E = k.charCodeAt(C) - 64) < 1 || E > 26) break;
							b = 26 * b + E
						}--b;
						_ = b
					} else ++_;
					for (C = 0; C != v.length; ++C)
						if (v.charCodeAt(C) === 62) break;
						++C;
					w = Be(v.slice(0, C), true);
					if (!w.r) w.r = ct({
						r: A - 1,
						c: _
					});
					k = v.slice(C);
					S = {
						t: ""
					};
					if ((m = k.match(i)) != null && m[1] !== "") S.v = Ie(m[1]);
					if (c.cellFormula) {
						if ((m = k.match(s)) != null && m[1] !== "") {
							S.f = $f(Ie(Ve(m[1])));
							if (m[0].indexOf('t="array"') > -1) {
								S.F = (k.match(a) || [])[1];
								if (S.F.indexOf(":") > -1) F.push([dt(S.F), S.F])
							} else if (m[0].indexOf('t="shared"') > -1) {
								B = Be(m[0]);
								O[parseInt(B.si, 10)] = [B, $f(Ie(Ve(m[1]))), w.r]
							}
						} else if (m = k.match(/<f[^>]*\/>/)) {
							B = Be(m[0]);
							if (O[B.si]) S.f = Kf(O[B.si][1], O[B.si][2], w.r)
						}
						var z = ft(w.r);
						for (C = 0; C < F.length; ++C)
							if (z.r >= F[C][0].s.r && z.r <= F[C][0].e.r)
								if (z.c >= F[C][0].s.c && z.c <= F[C][0].e.c) S.F = F[C][1]
					}
					if (w.t == null && S.v === undefined) {
						if (S.f || S.F) {
							S.v = 0;
							S.t = "n"
						} else if (!c.sheetStubs) continue;
						else S.t = "z"
					} else S.t = w.t || "n";
					if (u.s.c > _) u.s.c = _;
					if (u.e.c < _) u.e.c = _;
					switch (S.t) {
					case "n":
						if (S.v == "" || S.v == null) {
							if (!c.sheetStubs) continue;
							S.t = "z"
						} else S.v = parseFloat(S.v);
						break;
					case "s":
						if (typeof S.v == "undefined") {
							if (!c.sheetStubs) continue;
							S.t = "z"
						} else {
							R = Xu[parseInt(S.v, 10)];
							S.v = R.t;
							S.r = R.r;
							if (c.cellHTML) S.h = R.h
						}
						break;
					case "str":
						S.t = "s";
						S.v = S.v != null ? Ve(S.v) : "";
						if (c.cellHTML) S.h = Le(S.v);
						break;
					case "inlineStr":
						m = k.match(n);
						S.t = "s";
						if (m != null && (R = fo(m[1]))) S.v = R.t;
						else S.v = "";
						break;
					case "b":
						S.v = He(S.v);
						break;
					case "d":
						if (c.cellDates) S.v = ae(S.v, 1);
						else {
							S.v = q(ae(S.v, 1));
							S.t = "n"
						}
						break;
					case "e":
						if (!c || c.cellText !== false) S.w = S.v;
						S.v = jt[S.v];
						break
					}
					T = y = 0;
					if (x && w.s !== undefined) {
						D = d.CellXf[w.s];
						if (D != null) {
							if (D.numFmtId != null) T = D.numFmtId;
							if (c.cellStyles) {
								if (D.fillId != null) y = D.fillId
							}
						}
					}
					Qu(S, T, y, c, h, d);
					if (c.cellDates && x && S.t == "n" && I.is_date(I._table[T])) {
						S.t = "d";
						S.v = ee(S.v)
					}
					if (P) {
						var X = ft(w.r);
						if (!f[X.r]) f[X.r] = [];
						f[X.r][X.c] = S
					} else f[w.r] = S
				}
			}
			if (N.length > 0) f["!rows"] = N
		}
	}();

	function _h(e, r, t, n) {
		var a = [],
			i = [],
			s = dt(e["!ref"]),
			o = "",
			l, f = "",
			c = [],
			u = 0,
			h = 0,
			d = e["!rows"];
		var p = Array.isArray(e);
		var v = {
				r: f
			},
			g, m = -1;
		for (h = s.s.c; h <= s.e.c; ++h) c[h] = it(h);
		for (u = s.s.r; u <= s.e.r; ++u) {
			i = [];
			f = rt(u);
			for (h = s.s.c; h <= s.e.c; ++h) {
				l = c[h] + f;
				var b = p ? (e[u] || [])[h] : e[l];
				if (b === undefined) continue;
				if ((o = wh(b, l, e, r, t, n)) != null) i.push(o)
			}
			if (i.length > 0 || d && d[u]) {
				v = {
					r: f
				};
				if (d && d[u]) {
					g = d[u];
					if (g.hidden) v.hidden = 1;
					m = -1;
					if (g.hpx) m = fl(g.hpx);
					else if (g.hpt) m = g.hpt;
					if (m > -1) {
						v.ht = m;
						v.customHeight = 1
					}
					if (g.level) {
						v.outlineLevel = g.level
					}
				}
				a[a.length] = tr("row", i.join(""), v)
			}
		}
		if (d)
			for (; u < d.length; ++u) {
				if (d && d[u]) {
					v = {
						r: u + 1
					};
					g = d[u];
					if (g.hidden) v.hidden = 1;
					m = -1;
					if (g.hpx) m = fl(g.hpx);
					else if (g.hpt) m = g.hpt;
					if (m > -1) {
						v.ht = m;
						v.customHeight = 1
					}
					if (g.level) {
						v.outlineLevel = g.level
					}
					a[a.length] = tr("row", "", v)
				}
			}
		return a.join("")
	}
	var Rh = tr("worksheet", null, {
		xmlns: ir.main[0],
		"xmlns:r": ir.r
	});

	function Bh(e, r, t, n) {
		var a = [Se, Rh];
		var i = t.SheetNames[e],
			s = 0,
			o = "";
		var l = t.Sheets[i];
		if (l == null) l = {};
		var f = l["!ref"] || "A1";
		var c = dt(f);
		if (c.e.c > 16383 || c.e.r > 1048575) {
			if (r.WTF) throw new Error("Range " + f + " exceeds format limit A1:XFD1048576");
			c.e.c = Math.min(c.e.c, 16383);
			c.e.r = Math.min(c.e.c, 1048575);
			f = ht(c)
		}
		if (!n) n = {};
		l["!comments"] = [];
		l["!drawing"] = [];
		if (r.bookType !== "xlsx" && t.vbaraw) {
			var u = t.SheetNames[e];
			try {
				if (t.Workbook) u = t.Workbook.Sheets[e].CodeName || u
			} catch (e) {}
			a[a.length] = tr("sheetPr", null, {
				codeName: Oe(u)
			})
		}
		a[a.length] = tr("dimension", null, {
			ref: f
		});
		a[a.length] = Sh(l, r, e, t);
		if (r.sheetFormat) a[a.length] = tr("sheetFormatPr", null, {
			defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
			baseColWidth: r.sheetFormat.baseColWidth || "10",
			outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
		});
		if (l["!cols"] != null && l["!cols"].length > 0) a[a.length] = mh(l, l["!cols"]);
		a[s = a.length] = "<sheetData/>";
		l["!links"] = [];
		if (l["!ref"] != null) {
			o = _h(l, r, e, t, n);
			if (o.length > 0) a[a.length] = o
		}
		if (a.length > s + 1) {
			a[a.length] = "</sheetData>";
			a[s] = a[s].replace("/>", ">")
		}
		if (l["!protect"] != null) a[a.length] = hh(l["!protect"]);
		if (l["!autofilter"] != null) a[a.length] = Ch(l["!autofilter"], l, t, e);
		if (l["!merges"] != null && l["!merges"].length > 0) a[a.length] = ch(l["!merges"]);
		var h = -1,
			d, p = -1;
		if (l["!links"].length > 0) {
			a[a.length] = "<hyperlinks>";
			l["!links"].forEach(function (e) {
				if (!e[1].Target) return;
				d = {
					ref: e[0]
				};
				if (e[1].Target.charAt(0) != "#") {
					p = Nn(n, -1, Oe(e[1].Target).replace(/#.*$/, ""), In.HLINK);
					d["r:id"] = "rId" + p
				}
				if ((h = e[1].Target.indexOf("#")) > -1) d.location = Oe(e[1].Target.slice(h + 1));
				if (e[1].Tooltip) d.tooltip = Oe(e[1].Tooltip);
				a[a.length] = tr("hyperlink", null, d)
			});
			a[a.length] = "</hyperlinks>"
		}
		delete l["!links"];
		if (l["!margins"] != null) a[a.length] = vh(l["!margins"]);
		a[a.length] = "";
		if (!r || r.ignoreEC || r.ignoreEC == void 0) a[a.length] = er("ignoredErrors", tr("ignoredError", null, {
			numberStoredAsText: 1,
			sqref: f
		}));
		if (l["!drawing"].length > 0) {
			p = Nn(n, -1, "../drawings/drawing" + (e + 1) + ".xml", In.DRAW);
			a[a.length] = tr("drawing", null, {
				"r:id": "rId" + p
			})
		} else delete l["!drawing"];
		if (l["!comments"].length > 0) {
			p = Nn(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", In.VML);
			a[a.length] = tr("legacyDrawing", null, {
				"r:id": "rId" + p
			});
			l["!legacy"] = p
		}
		if (a.length > 2) {
			a[a.length] = "</worksheet>";
			a[1] = a[1].replace("/>", ">")
		}
		return a.join("")
	}

	function Th(e, r) {
		var t = {};
		var n = e.l + r;
		t.r = e._R(4);
		e.l += 4;
		var a = e._R(2);
		e.l += 1;
		var i = e._R(1);
		e.l = n;
		if (i & 7) t.level = i & 7;
		if (i & 16) t.hidden = true;
		if (i & 32) t.hpt = a / 20;
		return t
	}

	function yh(e, r, t) {
		var n = Xr(17 + 8 * 16);
		var a = (t["!rows"] || [])[e] || {};
		n._W(4, e);
		n._W(4, 0);
		var i = 320;
		if (a.hpx) i = fl(a.hpx) * 20;
		else if (a.hpt) i = a.hpt * 20;
		n._W(2, i);
		n._W(1, 0);
		var s = 0;
		if (a.level) s |= a.level;
		if (a.hidden) s |= 16;
		if (a.hpx || a.hpt) s |= 32;
		n._W(1, s);
		n._W(1, 0);
		var o = 0,
			l = n.l;
		n.l += 4;
		var f = {
			r: e,
			c: 0
		};
		for (var c = 0; c < 16; ++c) {
			if (r.s.c > c + 1 << 10 || r.e.c < c << 10) continue;
			var u = -1,
				h = -1;
			for (var d = c << 10; d < c + 1 << 10; ++d) {
				f.c = d;
				var p = Array.isArray(t) ? (t[f.r] || [])[f.c] : t[ct(f)];
				if (p) {
					if (u < 0) u = d;
					h = d
				}
			}
			if (u < 0) continue;
			++o;
			n._W(4, u);
			n._W(4, h)
		}
		var v = n.l;
		n.l = l;
		n._W(4, o);
		n.l = v;
		return n.length > n.l ? n.slice(0, n.l) : n
	}

	function xh(e, r, t, n) {
		var a = yh(n, t, r);
		if (a.length > 17 || (r["!rows"] || [])[n]) Kr(e, "BrtRowHdr", a)
	}
	var Ih = Ht;
	var Dh = Vt;

	function Fh() {}

	function Oh(e, r) {
		var t = {};
		e.l += 19;
		t.name = xt(e, r - 19);
		return t
	}

	function Ph(e, r) {
		if (r == null) r = Xr(84 + 4 * e.length);
		for (var t = 0; t < 3; ++t) r._W(1, 0);
		Yt({
			auto: 1
		}, r);
		r._W(-4, -1);
		r._W(-4, -1);
		It(e, r);
		return r.slice(0, r.l)
	}

	function Nh(e) {
		var r = Tt(e);
		return [r]
	}

	function Lh(e, r, t) {
		if (t == null) t = Xr(8);
		return yt(r, t)
	}

	function Mh(e) {
		var r = Tt(e);
		var t = e._R(1);
		return [r, t, "b"]
	}

	function Wh(e, r, t) {
		if (t == null) t = Xr(9);
		yt(r, t);
		t._W(1, e.v ? 1 : 0);
		return t
	}

	function Uh(e) {
		var r = Tt(e);
		var t = e._R(1);
		return [r, t, "e"]
	}

	function Hh(e) {
		var r = Tt(e);
		var t = e._R(4);
		return [r, t, "s"]
	}

	function Vh(e, r, t) {
		if (t == null) t = Xr(12);
		yt(r, t);
		t._W(4, r.v);
		return t
	}

	function zh(e) {
		var r = Tt(e);
		var t = zt(e);
		return [r, t, "n"]
	}

	function Xh(e, r, t) {
		if (t == null) t = Xr(16);
		yt(r, t);
		Xt(e.v, t);
		return t
	}

	function Gh(e) {
		var r = Tt(e);
		var t = Lt(e);
		return [r, t, "n"]
	}

	function jh(e, r, t) {
		if (t == null) t = Xr(12);
		yt(r, t);
		Mt(e.v, t);
		return t
	}

	function Kh(e) {
		var r = Tt(e);
		var t = Et(e);
		return [r, t, "str"]
	}

	function Yh(e, r, t) {
		if (t == null) t = Xr(12 + 4 * e.v.length);
		yt(r, t);
		kt(e.v, t);
		return t.length > t.l ? t.slice(0, t.l) : t
	}

	function $h(e, r, t) {
		var n = e.l + r;
		var a = Tt(e);
		a.r = t["!row"];
		var i = e._R(1);
		var s = [a, i, "b"];
		if (t.cellFormula) {
			e.l += 2;
			var o = Fu(e, n - e.l, t);
			s[3] = Au(o, null, a, t.supbooks, t)
		} else e.l = n;
		return s
	}

	function Zh(e, r, t) {
		var n = e.l + r;
		var a = Tt(e);
		a.r = t["!row"];
		var i = e._R(1);
		var s = [a, i, "e"];
		if (t.cellFormula) {
			e.l += 2;
			var o = Fu(e, n - e.l, t);
			s[3] = Au(o, null, a, t.supbooks, t)
		} else e.l = n;
		return s
	}

	function Qh(e, r, t) {
		var n = e.l + r;
		var a = Tt(e);
		a.r = t["!row"];
		var i = zt(e);
		var s = [a, i, "n"];
		if (t.cellFormula) {
			e.l += 2;
			var o = Fu(e, n - e.l, t);
			s[3] = Au(o, null, a, t.supbooks, t)
		} else e.l = n;
		return s
	}

	function Jh(e, r, t) {
		var n = e.l + r;
		var a = Tt(e);
		a.r = t["!row"];
		var i = Et(e);
		var s = [a, i, "str"];
		if (t.cellFormula) {
			e.l += 2;
			var o = Fu(e, n - e.l, t);
			s[3] = Au(o, null, a, t.supbooks, t)
		} else e.l = n;
		return s
	}
	var qh = Ht;
	var ed = Vt;

	function rd(e, r) {
		if (r == null) r = Xr(4);
		r._W(4, e);
		return r
	}

	function td(e, r) {
		var t = e.l + r;
		var n = Ht(e, 16);
		var a = Dt(e);
		var i = Et(e);
		var s = Et(e);
		var o = Et(e);
		e.l = t;
		var l = {
			rfx: n,
			relId: a,
			loc: i,
			display: o
		};
		if (s) l.Tooltip = s;
		return l
	}

	function nd(e, r) {
		var t = Xr(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
		Vt({
			s: ft(e[0]),
			e: ft(e[0])
		}, t);
		Nt("rId" + r, t);
		var n = e[1].Target.indexOf("#");
		var a = n == -1 ? "" : e[1].Target.slice(n + 1);
		kt(a || "", t);
		kt(e[1].Tooltip || "", t);
		kt("", t);
		return t.slice(0, t.l)
	}

	function ad(e, r, t) {
		var n = e.l + r;
		var a = Wt(e, 16);
		var i = e._R(1);
		var s = [a];
		s[2] = i;
		if (t.cellFormula) {
			var o = Du(e, n - e.l, t);
			s[1] = o
		} else e.l = n;
		return s
	}

	function id(e, r, t) {
		var n = e.l + r;
		var a = Ht(e, 16);
		var i = [a];
		if (t.cellFormula) {
			var s = Pu(e, n - e.l, t);
			i[1] = s;
			e.l = n
		} else e.l = n;
		return i
	}

	function sd(e, r, t) {
		if (t == null) t = Xr(18);
		var n = Yu(e, r);
		t._W(-4, e);
		t._W(-4, e);
		t._W(4, (n.width || 10) * 256);
		t._W(4, 0);
		var a = 0;
		if (r.hidden) a |= 1;
		if (typeof n.width == "number") a |= 2;
		t._W(1, a);
		t._W(1, 0);
		return t
	}
	var od = ["left", "right", "top", "bottom", "header", "footer"];

	function ld(e) {
		var r = {};
		od.forEach(function (t) {
			r[t] = zt(e, 8)
		});
		return r
	}

	function fd(e, r) {
		if (r == null) r = Xr(6 * 8);
		$u(e);
		od.forEach(function (t) {
			Xt(e[t], r)
		});
		return r
	}

	function cd(e) {
		var r = e._R(2);
		e.l += 28;
		return {
			RTL: r & 32
		}
	}

	function ud(e, r, t) {
		if (t == null) t = Xr(30);
		var n = 924;
		if ((((r || {}).Views || [])[0] || {}).RTL) n |= 32;
		t._W(2, n);
		t._W(4, 0);
		t._W(4, 0);
		t._W(4, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(2, 0);
		t._W(2, 100);
		t._W(2, 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(4, 0);
		return t
	}

	function hd(e) {
		var r = Xr(24);
		r._W(4, 4);
		r._W(4, 1);
		Vt(e, r);
		return r
	}

	function dd(e, r) {
		if (r == null) r = Xr(16 * 4 + 2);
		r._W(2, e.password ? Mo(e.password) : 0);
		r._W(4, 1);
		[
			["objects", false],
			["scenarios", false],
			["formatCells", true],
			["formatColumns", true],
			["formatRows", true],
			["insertColumns", true],
			["insertRows", true],
			["insertHyperlinks", true],
			["deleteColumns", true],
			["deleteRows", true],
			["selectLockedCells", false],
			["sort", true],
			["autoFilter", true],
			["pivotTables", true],
			["selectUnlockedCells", false]
		].forEach(function (t) {
			if (t[1]) r._W(4, e[t[0]] != null && !e[t[0]] ? 1 : 0);
			else r._W(4, e[t[0]] != null && e[t[0]] ? 0 : 1)
		});
		return r
	}

	function pd(e, r, t, n, a, i, s) {
		if (!e) return e;
		var o = r || {};
		if (!n) n = {
			"!id": {}
		};
		if (v != null && o.dense == null) o.dense = v;
		var l = o.dense ? [] : {};
		var f;
		var c = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var u = false,
			h = false;
		var d, p, g, m, b, C, E, k, S;
		var w = [];
		o.biff = 12;
		o["!row"] = 0;
		var A = 0,
			_ = false;
		var R = [];
		var B = {};
		var T = o.supbooks || a.supbooks || [
			[]
		];
		T.sharedf = B;
		T.arrayf = R;
		T.SheetNames = a.SheetNames || a.Sheets.map(function (e) {
			return e.name
		});
		if (!o.supbooks) {
			o.supbooks = T;
			if (a.Names)
				for (var y = 0; y < a.Names.length; ++y) T[0][y + 1] = a.Names[y]
		}
		var x = [],
			D = [];
		var F = false;
		Gr(e, function e(r, v, y) {
			if (h) return;
			switch (y) {
			case 148:
				f = r;
				break;
			case 0:
				d = r;
				if (o.sheetRows && o.sheetRows <= d.r) h = true;
				k = rt(m = d.r);
				o["!row"] = d.r;
				if (r.hidden || r.hpt || r.level != null) {
					if (r.hpt) r.hpx = cl(r.hpt);
					D[r.r] = r
				}
				break;
			case 2:
				;
			case 3:
				;
			case 4:
				;
			case 5:
				;
			case 6:
				;
			case 7:
				;
			case 8:
				;
			case 9:
				;
			case 10:
				;
			case 11:
				p = {
					t: r[2]
				};
				switch (r[2]) {
				case "n":
					p.v = r[1];
					break;
				case "s":
					E = Xu[r[1]];
					p.v = E.t;
					p.r = E.r;
					break;
				case "b":
					p.v = r[1] ? true : false;
					break;
				case "e":
					p.v = r[1];
					if (o.cellText !== false) p.w = Gt[p.v];
					break;
				case "str":
					p.t = "s";
					p.v = r[1];
					break
				}
				if (g = s.CellXf[r[0].iStyleRef]) Qu(p, g.numFmtId, null, o, i, s);
				b = r[0].c;
				if (o.dense) {
					if (!l[m]) l[m] = [];
					l[m][b] = p
				} else l[it(b) + k] = p;
				if (o.cellFormula) {
					_ = false;
					for (A = 0; A < R.length; ++A) {
						var O = R[A];
						if (d.r >= O[0].s.r && d.r <= O[0].e.r)
							if (b >= O[0].s.c && b <= O[0].e.c) {
								p.F = ht(O[0]);
								_ = true
							}
					}
					if (!_ && r.length > 3) p.f = r[3]
				}
				if (c.s.r > d.r) c.s.r = d.r;
				if (c.s.c > b) c.s.c = b;
				if (c.e.r < d.r) c.e.r = d.r;
				if (c.e.c < b) c.e.c = b;
				if (o.cellDates && g && p.t == "n" && I.is_date(I._table[g.numFmtId])) {
					var P = I.parse_date_code(p.v);
					if (P) {
						p.t = "d";
						p.v = new Date(P.y, P.m - 1, P.d, P.H, P.M, P.S, P.u)
					}
				}
				break;
			case 1:
				if (!o.sheetStubs || u) break;
				p = {
					t: "z",
					v: undefined
				};
				b = r[0].c;
				if (o.dense) {
					if (!l[m]) l[m] = [];
					l[m][b] = p
				} else l[it(b) + k] = p;
				if (c.s.r > d.r) c.s.r = d.r;
				if (c.s.c > b) c.s.c = b;
				if (c.e.r < d.r) c.e.r = d.r;
				if (c.e.c < b) c.e.c = b;
				break;
			case 176:
				w.push(r);
				break;
			case 494:
				var e = n["!id"][r.relId];
				if (e) {
					r.Target = e.Target;
					if (r.loc) r.Target += "#" + r.loc;
					r.Rel = e
				} else if (r.relId == "") {
					r.Target = "#" + r.loc
				}
				for (m = r.rfx.s.r; m <= r.rfx.e.r; ++m)
					for (b = r.rfx.s.c; b <= r.rfx.e.c; ++b) {
						if (o.dense) {
							if (!l[m]) l[m] = [];
							if (!l[m][b]) l[m][b] = {
								t: "z",
								v: undefined
							};
							l[m][b].l = r
						} else {
							C = ct({
								c: b,
								r: m
							});
							if (!l[C]) l[C] = {
								t: "z",
								v: undefined
							};
							l[C].l = r
						}
					}
				break;
			case 426:
				if (!o.cellFormula) break;
				R.push(r);
				S = o.dense ? l[m][b] : l[it(b) + k];
				S.f = Au(r[1], c, {
					r: d.r,
					c: b
				}, T, o);
				S.F = ht(r[0]);
				break;
			case 427:
				if (!o.cellFormula) break;
				B[ct(r[0].s)] = r[1];
				S = o.dense ? l[m][b] : l[it(b) + k];
				S.f = Au(r[1], c, {
					r: d.r,
					c: b
				}, T, o);
				break;
			case 60:
				if (!o.cellStyles) break;
				while (r.e >= r.s) {
					x[r.e--] = {
						width: r.w / 256,
						hidden: !!(r.flags & 1)
					};
					if (!F) {
						F = true;
						il(r.w / 256)
					}
					sl(x[r.e + 1])
				}
				break;
			case 161:
				l["!autofilter"] = {
					ref: ht(r)
				};
				break;
			case 476:
				l["!margins"] = r;
				break;
			case 147:
				if (!a.Sheets[t]) a.Sheets[t] = {};
				if (r.name) a.Sheets[t].CodeName = r.name;
				break;
			case 137:
				if (!a.Views) a.Views = [{}];
				if (!a.Views[0]) a.Views[0] = {};
				if (r.RTL) a.Views[0].RTL = true;
				break;
			case 485:
				break;
			case 175:
				;
			case 644:
				;
			case 625:
				;
			case 562:
				;
			case 396:
				;
			case 1112:
				;
			case 1146:
				;
			case 471:
				;
			case 1050:
				;
			case 649:
				;
			case 1105:
				;
			case 49:
				;
			case 589:
				;
			case 607:
				;
			case 564:
				;
			case 1055:
				;
			case 168:
				;
			case 174:
				;
			case 1180:
				;
			case 499:
				;
			case 64:
				;
			case 1053:
				;
			case 550:
				;
			case 171:
				;
			case 167:
				;
			case 1177:
				;
			case 169:
				;
			case 1181:
				;
			case 551:
				;
			case 552:
				;
			case 661:
				;
			case 639:
				;
			case 478:
				;
			case 151:
				;
			case 537:
				;
			case 477:
				;
			case 536:
				;
			case 1103:
				;
			case 680:
				;
			case 1104:
				;
			case 1024:
				;
			case 152:
				;
			case 663:
				;
			case 535:
				;
			case 678:
				;
			case 504:
				;
			case 1043:
				;
			case 428:
				;
			case 170:
				;
			case 3072:
				;
			case 50:
				;
			case 2070:
				;
			case 1045:
				break;
			case 35:
				u = true;
				break;
			case 36:
				u = false;
				break;
			case 37:
				break;
			case 38:
				break;
			default:
				if ((v || "").indexOf("Begin") > 0) {} else if ((v || "").indexOf("End") > 0) {} else if (!u || o.WTF) throw new Error(
					"Unexpected record " + y + " " + v)
			}
		}, o);
		delete o.supbooks;
		delete o["!row"];
		if (!l["!ref"] && (c.s.r < 2e6 || f && (f.e.r > 0 || f.e.c > 0 || f.s.r > 0 || f.s.c > 0))) l["!ref"] = ht(f || c);
		if (o.sheetRows && l["!ref"]) {
			var O = dt(l["!ref"]);
			if (o.sheetRows <= +O.e.r) {
				O.e.r = o.sheetRows - 1;
				if (O.e.r > c.e.r) O.e.r = c.e.r;
				if (O.e.r < O.s.r) O.s.r = O.e.r;
				if (O.e.c > c.e.c) O.e.c = c.e.c;
				if (O.e.c < O.s.c) O.s.c = O.e.c;
				l["!fullref"] = l["!ref"];
				l["!ref"] = ht(O)
			}
		}
		if (w.length > 0) l["!merges"] = w;
		if (x.length > 0) l["!cols"] = x;
		if (D.length > 0) l["!rows"] = D;
		return l
	}

	function vd(e, r, t, n, a, i) {
		if (r.v === undefined) return "";
		var s = "";
		switch (r.t) {
		case "b":
			s = r.v ? "1" : "0";
			break;
		case "d":
			r = se(r);
			r.z = r.z || I._table[14];
			r.v = q(ae(r.v));
			r.t = "n";
			break;
		case "n":
			;
		case "e":
			s = "" + r.v;
			break;
		default:
			s = r.v;
			break
		}
		var o = {
			r: t,
			c: n
		};
		o.s = Zu(a.cellXfs, r, a);
		if (r.l) i["!links"].push([ct(o), r.l]);
		if (r.c) i["!comments"].push([ct(o), r.c]);
		switch (r.t) {
		case "s":
			;
		case "str":
			if (a.bookSST) {
				s = Ku(a.Strings, r.v, a.revStrings);
				o.t = "s";
				o.v = s;
				Kr(e, "BrtCellIsst", Vh(r, o))
			} else {
				o.t = "str";
				Kr(e, "BrtCellSt", Yh(r, o))
			}
			return;
		case "n":
			if (r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3) Kr(e, "BrtCellRk", jh(r, o));
			else Kr(e, "BrtCellReal", Xh(r, o));
			return;
		case "b":
			o.t = "b";
			Kr(e, "BrtCellBool", Wh(r, o));
			return;
		case "e":
			o.t = "e";
			break
		}
		Kr(e, "BrtCellBlank", Lh(r, o))
	}

	function gd(e, r, t, n) {
		var a = dt(r["!ref"] || "A1"),
			i, s = "",
			o = [];
		Kr(e, "BrtBeginSheetData");
		var l = Array.isArray(r);
		var f = a.e.r;
		if (r["!rows"]) f = Math.max(a.e.r, r["!rows"].length - 1);
		for (var c = a.s.r; c <= f; ++c) {
			s = rt(c);
			xh(e, r, a, c);
			if (c <= a.e.r)
				for (var u = a.s.c; u <= a.e.c; ++u) {
					if (c === a.s.r) o[u] = it(u);
					i = o[u] + s;
					var h = l ? (r[c] || [])[u] : r[i];
					if (!h) continue;
					vd(e, h, c, u, n, r)
				}
		}
		Kr(e, "BrtEndSheetData")
	}

	function md(e, r) {
		if (!r || !r["!merges"]) return;
		Kr(e, "BrtBeginMergeCells", rd(r["!merges"].length));
		r["!merges"].forEach(function (r) {
			Kr(e, "BrtMergeCell", ed(r))
		});
		Kr(e, "BrtEndMergeCells")
	}

	function bd(e, r) {
		if (!r || !r["!cols"]) return;
		Kr(e, "BrtBeginColInfos");
		r["!cols"].forEach(function (r, t) {
			if (r) Kr(e, "BrtColInfo", sd(t, r))
		});
		Kr(e, "BrtEndColInfos")
	}

	function Cd(e, r) {
		if (!r || !r["!ref"]) return;
		Kr(e, "BrtBeginCellIgnoreECs");
		Kr(e, "BrtCellIgnoreEC", hd(dt(r["!ref"])));
		Kr(e, "BrtEndCellIgnoreECs")
	}

	function Ed(e, r, t) {
		r["!links"].forEach(function (r) {
			if (!r[1].Target) return;
			var n = Nn(t, -1, r[1].Target.replace(/#.*$/, ""), In.HLINK);
			Kr(e, "BrtHLink", nd(r, n))
		});
		delete r["!links"]
	}

	function kd(e, r, t, n) {
		if (r["!comments"].length > 0) {
			var a = Nn(n, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", In.VML);
			Kr(e, "BrtLegacyDrawing", Nt("rId" + a));
			r["!legacy"] = a
		}
	}

	function Sd(e, r) {
		if (!r["!autofilter"]) return;
		Kr(e, "BrtBeginAFilter", Vt(dt(r["!autofilter"].ref)));
		Kr(e, "BrtEndAFilter")
	}

	function wd(e, r, t) {
		Kr(e, "BrtBeginWsViews"); {
			Kr(e, "BrtBeginWsView", ud(r, t));
			Kr(e, "BrtEndWsView")
		}
		Kr(e, "BrtEndWsViews")
	}

	function Ad() {}

	function _d(e, r) {
		if (!r["!protect"]) return;
		Kr(e, "BrtSheetProtection", dd(r["!protect"]))
	}

	function Rd(e, r, t, n) {
		var a = jr();
		var i = t.SheetNames[e],
			s = t.Sheets[i] || {};
		var o = i;
		try {
			if (t && t.Workbook) o = t.Workbook.Sheets[e].CodeName || o
		} catch (e) {}
		var l = dt(s["!ref"] || "A1");
		if (l.e.c > 16383 || l.e.r > 1048575) {
			if (r.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
			l.e.c = Math.min(l.e.c, 16383);
			l.e.r = Math.min(l.e.c, 1048575)
		}
		s["!links"] = [];
		s["!comments"] = [];
		Kr(a, "BrtBeginSheet");
		if (t.vbaraw) Kr(a, "BrtWsProp", Ph(o));
		Kr(a, "BrtWsDim", Dh(l));
		wd(a, s, t.Workbook);
		Ad(a, s);
		bd(a, s, e, r, t);
		gd(a, s, e, r, t);
		_d(a, s);
		Sd(a, s);
		md(a, s);
		Ed(a, s, n);
		if (s["!margins"]) Kr(a, "BrtMargins", fd(s["!margins"]));
		if (!r || r.ignoreEC || r.ignoreEC == void 0) Cd(a, s);
		kd(a, s, e, n);
		Kr(a, "BrtEndSheet");
		return a.end()
	}

	function Bd(e) {
		var r = [];
		(e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function (e) {
			var t = e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
			if (!t) return;
			r[+t[1]] = +t[2]
		});
		var t = Ie((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
		return [r, t]
	}

	function Td(e, r, t, n, a, i) {
		var s = i || {
			"!type": "chart"
		};
		if (!e) return i;
		var o = 0,
			l = 0,
			f = "A";
		var c = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		(e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function (e) {
			var r = Bd(e);
			c.s.r = c.s.c = 0;
			c.e.c = o;
			f = it(o);
			r[0].forEach(function (e, t) {
				s[f + rt(t)] = {
					t: "n",
					v: e,
					z: r[1]
				};
				l = t
			});
			if (c.e.r < l) c.e.r = l;
			++o
		});
		if (o > 0) s["!ref"] = ht(c);
		return s
	}
	In.CS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";
	var yd = tr("chartsheet", null, {
		xmlns: ir.main[0],
		"xmlns:r": ir.r
	});

	function xd(e, r, t, n, a) {
		if (!e) return e;
		if (!n) n = {
			"!id": {}
		};
		var i = {
			"!type": "chart",
			"!chart": null,
			"!rel": ""
		};
		var s;
		var o = e.match(oh);
		if (o) uh(o[0], i, a, t);
		if (s = e.match(/drawing r:id="(.*?)"/)) i["!rel"] = s[1];
		if (n["!id"][i["!rel"]]) i["!chart"] = n["!id"][i["!rel"]];
		return i
	}

	function Id(e, r, t, n) {
		var a = [Se, yd];
		a[a.length] = tr("drawing", null, {
			"r:id": "rId1"
		});
		Nn(n, -1, "../drawings/drawing" + (e + 1) + ".xml", In.DRAW);
		if (a.length > 2) {
			a[a.length] = "</chartsheet>";
			a[1] = a[1].replace("/>", ">")
		}
		return a.join("")
	}

	function Dd(e, r) {
		e.l += 10;
		var t = Et(e, r - 10);
		return {
			name: t
		}
	}

	function Fd(e, r, t, n, a) {
		if (!e) return e;
		if (!n) n = {
			"!id": {}
		};
		var i = {
			"!type": "chart",
			"!chart": null,
			"!rel": ""
		};
		var s = [];
		var o = false;
		Gr(e, function e(n, l, f) {
			switch (f) {
			case 550:
				i["!rel"] = n;
				break;
			case 651:
				if (!a.Sheets[t]) a.Sheets[t] = {};
				if (n.name) a.Sheets[t].CodeName = n.name;
				break;
			case 562:
				;
			case 652:
				;
			case 669:
				;
			case 679:
				;
			case 551:
				;
			case 552:
				;
			case 476:
				;
			case 3072:
				break;
			case 35:
				o = true;
				break;
			case 36:
				o = false;
				break;
			case 37:
				s.push(l);
				break;
			case 38:
				s.pop();
				break;
			default:
				if ((l || "").indexOf("Begin") > 0) s.push(l);
				else if ((l || "").indexOf("End") > 0) s.pop();
				else if (!o || r.WTF) throw new Error("Unexpected record " + f + " " + l)
			}
		}, r);
		if (n["!id"][i["!rel"]]) i["!chart"] = n["!id"][i["!rel"]];
		return i
	}

	function Od() {
		var e = jr();
		Kr(e, "BrtBeginSheet");
		Kr(e, "BrtEndSheet");
		return e.end()
	}
	var Pd = [
		["allowRefreshQuery", false, "bool"],
		["autoCompressPictures", true, "bool"],
		["backupFile", false, "bool"],
		["checkCompatibility", false, "bool"],
		["CodeName", ""],
		["date1904", false, "bool"],
		["defaultThemeVersion", 0, "int"],
		["filterPrivacy", false, "bool"],
		["hidePivotFieldList", false, "bool"],
		["promptedSolutions", false, "bool"],
		["publishItems", false, "bool"],
		["refreshAllConnections", false, "bool"],
		["saveExternalLinkValues", true, "bool"],
		["showBorderUnselectedTables", true, "bool"],
		["showInkAnnotation", true, "bool"],
		["showObjects", "all"],
		["showPivotChartFilter", false, "bool"],
		["updateLinks", "userSet"]
	];
	var Nd = [
		["activeTab", 0, "int"],
		["autoFilterDateGrouping", true, "bool"],
		["firstSheet", 0, "int"],
		["minimized", false, "bool"],
		["showHorizontalScroll", true, "bool"],
		["showSheetTabs", true, "bool"],
		["showVerticalScroll", true, "bool"],
		["tabRatio", 600, "int"],
		["visibility", "visible"]
	];
	var Ld = [];
	var Md = [
		["calcCompleted", "true"],
		["calcMode", "auto"],
		["calcOnSave", "true"],
		["concurrentCalc", "true"],
		["fullCalcOnLoad", "false"],
		["fullPrecision", "true"],
		["iterate", "false"],
		["iterateCount", "100"],
		["iterateDelta", "0.001"],
		["refMode", "A1"]
	];

	function Wd(e, r) {
		for (var t = 0; t != e.length; ++t) {
			var n = e[t];
			for (var a = 0; a != r.length; ++a) {
				var i = r[a];
				if (n[i[0]] == null) n[i[0]] = i[1];
				else switch (i[2]) {
				case "bool":
					if (typeof n[i[0]] == "string") n[i[0]] = He(n[i[0]]);
					break;
				case "int":
					if (typeof n[i[0]] == "string") n[i[0]] = parseInt(n[i[0]], 10);
					break
				}
			}
		}
	}

	function Ud(e, r) {
		for (var t = 0; t != r.length; ++t) {
			var n = r[t];
			if (e[n[0]] == null) e[n[0]] = n[1];
			else switch (n[2]) {
			case "bool":
				if (typeof e[n[0]] == "string") e[n[0]] = He(e[n[0]]);
				break;
			case "int":
				if (typeof e[n[0]] == "string") e[n[0]] = parseInt(e[n[0]], 10);
				break
			}
		}
	}

	function Hd(e) {
		Ud(e.WBProps, Pd);
		Ud(e.CalcPr, Md);
		Wd(e.WBView, Nd);
		Wd(e.Sheets, Ld);
		Gu.date1904 = He(e.WBProps.date1904)
	}

	function Vd(e) {
		if (!e.Workbook) return "false";
		if (!e.Workbook.WBProps) return "false";
		return He(e.Workbook.WBProps.date1904) ? "true" : "false"
	}
	var zd = "][*?/\\".split("");

	function Xd(e, r) {
		if (e.length > 31) {
			if (r) return false;
			throw new Error("Sheet names cannot exceed 31 chars")
		}
		var t = true;
		zd.forEach(function (n) {
			if (e.indexOf(n) == -1) return;
			if (!r) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
			t = false
		});
		return t
	}

	function Gd(e, r, t) {
		e.forEach(function (n, a) {
			Xd(n);
			for (var i = 0; i < a; ++i)
				if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
			if (t) {
				var s = r && r[a] && r[a].CodeName || n;
				if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s)
			}
		})
	}

	function jd(e) {
		if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
		if (!e.SheetNames.length) throw new Error("Workbook is empty");
		var r = e.Workbook && e.Workbook.Sheets || [];
		Gd(e.SheetNames, r, !!e.vbaraw);
		for (var t = 0; t < e.SheetNames.length; ++t) Ju(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t)
	}
	var Kd = /<\w+:workbook/;

	function Yd(e, r) {
		if (!e) throw new Error("Could not find file");
		var t = {
			AppVersion: {},
			WBProps: {},
			WBView: [],
			Sheets: [],
			CalcPr: {},
			Names: [],
			xmlns: ""
		};
		var n = false,
			a = "xmlns";
		var i = {},
			s = 0;
		e.replace(Ae, function o(l, f) {
			var c = Be(l);
			switch (Te(c[0])) {
			case "<?xml":
				break;
			case "<workbook":
				if (l.match(Kd)) a = "xmlns" + l.match(/<(\w+):/)[1];
				t.xmlns = c[a];
				break;
			case "</workbook>":
				break;
			case "<fileVersion":
				delete c[0];
				t.AppVersion = c;
				break;
			case "<fileVersion/>":
				;
			case "</fileVersion>":
				break;
			case "<fileSharing":
				;
			case "<fileSharing/>":
				break;
			case "<workbookPr":
				;
			case "<workbookPr/>":
				Pd.forEach(function (e) {
					if (c[e[0]] == null) return;
					switch (e[2]) {
					case "bool":
						t.WBProps[e[0]] = He(c[e[0]]);
						break;
					case "int":
						t.WBProps[e[0]] = parseInt(c[e[0]], 10);
						break;
					default:
						t.WBProps[e[0]] = c[e[0]]
					}
				});
				if (c.codeName) t.WBProps.CodeName = c.codeName;
				break;
			case "</workbookPr>":
				break;
			case "<workbookProtection":
				break;
			case "<workbookProtection/>":
				break;
			case "<bookViews":
				;
			case "<bookViews>":
				;
			case "</bookViews>":
				break;
			case "<workbookView":
				;
			case "<workbookView/>":
				delete c[0];
				t.WBView.push(c);
				break;
			case "</workbookView>":
				break;
			case "<sheets":
				;
			case "<sheets>":
				;
			case "</sheets>":
				break;
			case "<sheet":
				switch (c.state) {
				case "hidden":
					c.Hidden = 1;
					break;
				case "veryHidden":
					c.Hidden = 2;
					break;
				default:
					c.Hidden = 0
				}
				delete c.state;
				c.name = Ie(Ve(c.name));
				delete c[0];
				t.Sheets.push(c);
				break;
			case "</sheet>":
				break;
			case "<functionGroups":
				;
			case "<functionGroups/>":
				break;
			case "<functionGroup":
				break;
			case "<externalReferences":
				;
			case "</externalReferences>":
				;
			case "<externalReferences>":
				break;
			case "<externalReference":
				break;
			case "<definedNames/>":
				break;
			case "<definedNames>":
				;
			case "<definedNames":
				n = true;
				break;
			case "</definedNames>":
				n = false;
				break;
			case "<definedName":
				{
					i = {};i.Name = Ve(c.name);
					if (c.comment) i.Comment = c.comment;
					if (c.localSheetId) i.Sheet = +c.localSheetId;
					if (He(c.hidden || "0")) i.Hidden = true;s = f + l.length
				}
				break;
			case "</definedName>":
				{
					i.Ref = Ie(Ve(e.slice(s, f)));t.Names.push(i)
				}
				break;
			case "<definedName/>":
				break;
			case "<calcPr":
				delete c[0];
				t.CalcPr = c;
				break;
			case "<calcPr/>":
				delete c[0];
				t.CalcPr = c;
				break;
			case "</calcPr>":
				break;
			case "<oleSize":
				break;
			case "<customWorkbookViews>":
				;
			case "</customWorkbookViews>":
				;
			case "<customWorkbookViews":
				break;
			case "<customWorkbookView":
				;
			case "</customWorkbookView>":
				break;
			case "<pivotCaches>":
				;
			case "</pivotCaches>":
				;
			case "<pivotCaches":
				break;
			case "<pivotCache":
				break;
			case "<smartTagPr":
				;
			case "<smartTagPr/>":
				break;
			case "<smartTagTypes":
				;
			case "<smartTagTypes>":
				;
			case "</smartTagTypes>":
				break;
			case "<smartTagType":
				break;
			case "<webPublishing":
				;
			case "<webPublishing/>":
				break;
			case "<fileRecoveryPr":
				;
			case "<fileRecoveryPr/>":
				break;
			case "<webPublishObjects>":
				;
			case "<webPublishObjects":
				;
			case "</webPublishObjects>":
				break;
			case "<webPublishObject":
				break;
			case "<extLst":
				;
			case "<extLst>":
				;
			case "</extLst>":
				;
			case "<extLst/>":
				break;
			case "<ext":
				n = true;
				break;
			case "</ext>":
				n = false;
				break;
			case "<ArchID":
				break;
			case "<AlternateContent":
				;
			case "<AlternateContent>":
				n = true;
				break;
			case "</AlternateContent>":
				n = false;
				break;
			case "<revisionPtr":
				break;
			default:
				if (!n && r.WTF) throw new Error("unrecognized " + c[0] + " in workbook")
			}
			return l
		});
		if (ir.main.indexOf(t.xmlns) === -1) throw new Error("Unknown Namespace: " + t.xmlns);
		Hd(t);
		return t
	}
	var $d = tr("workbook", null, {
		xmlns: ir.main[0],
		"xmlns:r": ir.r
	});

	function Zd(e) {
		var r = [Se];
		r[r.length] = $d;
		var t = e.Workbook && (e.Workbook.Names || []).length > 0;
		var n = {
			codeName: "ThisWorkbook"
		};
		if (e.Workbook && e.Workbook.WBProps) {
			Pd.forEach(function (r) {
				if (e.Workbook.WBProps[r[0]] == null) return;
				if (e.Workbook.WBProps[r[0]] == r[1]) return;
				n[r[0]] = e.Workbook.WBProps[r[0]]
			});
			if (e.Workbook.WBProps.CodeName) {
				n.codeName = e.Workbook.WBProps.CodeName;
				delete n.CodeName
			}
		}
		r[r.length] = tr("workbookPr", null, n);
		var a = e.Workbook && e.Workbook.Sheets || [];
		var i = 0;
		r[r.length] = "<sheets>";
		for (i = 0; i != e.SheetNames.length; ++i) {
			var s = {
				name: Oe(e.SheetNames[i].slice(0, 31))
			};
			s.sheetId = "" + (i + 1);
			s["r:id"] = "rId" + (i + 1);
			if (a[i]) switch (a[i].Hidden) {
			case 1:
				s.state = "hidden";
				break;
			case 2:
				s.state = "veryHidden";
				break
			}
			r[r.length] = tr("sheet", null, s)
		}
		r[r.length] = "</sheets>";
		if (t) {
			r[r.length] = "<definedNames>";
			if (e.Workbook && e.Workbook.Names) e.Workbook.Names.forEach(function (e) {
				var t = {
					name: e.Name
				};
				if (e.Comment) t.comment = e.Comment;
				if (e.Sheet != null) t.localSheetId = "" + e.Sheet;
				if (e.Hidden) t.hidden = "1";
				if (!e.Ref) return;
				r[r.length] = tr("definedName", String(e.Ref).replace(/</g, "&lt;").replace(/>/g, "&gt;"), t)
			});
			r[r.length] = "</definedNames>"
		}
		if (r.length > 2) {
			r[r.length] = "</workbook>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}

	function Qd(e, r) {
		var t = {};
		t.Hidden = e._R(4);
		t.iTabID = e._R(4);
		t.strRelID = Pt(e, r - 8);
		t.name = Et(e);
		return t
	}

	function Jd(e, r) {
		if (!r) r = Xr(127);
		r._W(4, e.Hidden);
		r._W(4, e.iTabID);
		Nt(e.strRelID, r);
		kt(e.name.slice(0, 31), r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function qd(e, r) {
		var t = {};
		var n = e._R(4);
		t.defaultThemeVersion = e._R(4);
		var a = r > 8 ? Et(e) : "";
		if (a.length > 0) t.CodeName = a;
		t.autoCompressPictures = !!(n & 65536);
		t.backupFile = !!(n & 64);
		t.checkCompatibility = !!(n & 4096);
		t.date1904 = !!(n & 1);
		t.filterPrivacy = !!(n & 8);
		t.hidePivotFieldList = !!(n & 1024);
		t.promptedSolutions = !!(n & 16);
		t.publishItems = !!(n & 2048);
		t.refreshAllConnections = !!(n & 262144);
		t.saveExternalLinkValues = !!(n & 128);
		t.showBorderUnselectedTables = !!(n & 4);
		t.showInkAnnotation = !!(n & 32);
		t.showObjects = ["all", "placeholders", "none"][n >> 13 & 3];
		t.showPivotChartFilter = !!(n & 32768);
		t.updateLinks = ["userSet", "never", "always"][n >> 8 & 3];
		return t
	}

	function ep(e, r) {
		if (!r) r = Xr(72);
		var t = 0;
		if (e) {
			if (e.filterPrivacy) t |= 8
		}
		r._W(4, t);
		r._W(4, 0);
		It(e && e.CodeName || "ThisWorkbook", r);
		return r.slice(0, r.l)
	}

	function rp(e, r) {
		var t = {};
		e._R(4);
		t.ArchID = e._R(4);
		e.l += r - 8;
		return t
	}

	function tp(e, r, t) {
		var n = e.l + r;
		e.l += 4;
		e.l += 1;
		var a = e._R(4);
		var i = Ot(e);
		var s = Ou(e, 0, t);
		var o = Dt(e);
		e.l = n;
		var l = {
			Name: i,
			Ptg: s
		};
		if (a < 268435455) l.Sheet = a;
		if (o) l.Comment = o;
		return l
	}

	function np(e, r) {
		var t = {
			AppVersion: {},
			WBProps: {},
			WBView: [],
			Sheets: [],
			CalcPr: {},
			xmlns: ""
		};
		var n = [];
		var a = false;
		if (!r) r = {};
		r.biff = 12;
		var i = [];
		var s = [
			[]
		];
		s.SheetNames = [];
		s.XTI = [];
		Gr(e, function e(o, l, f) {
			switch (f) {
			case 156:
				s.SheetNames.push(o.name);
				t.Sheets.push(o);
				break;
			case 153:
				t.WBProps = o;
				break;
			case 39:
				if (o.Sheet != null) r.SID = o.Sheet;
				o.Ref = Au(o.Ptg, null, null, s, r);
				delete r.SID;
				delete o.Ptg;
				i.push(o);
				break;
			case 1036:
				break;
			case 357:
				;
			case 358:
				;
			case 355:
				;
			case 667:
				if (!s[0].length) s[0] = [f, o];
				else s.push([f, o]);
				s[s.length - 1].XTI = [];
				break;
			case 362:
				if (s.length === 0) {
					s[0] = [];
					s[0].XTI = []
				}
				s[s.length - 1].XTI = s[s.length - 1].XTI.concat(o);
				s.XTI = s.XTI.concat(o);
				break;
			case 361:
				break;
			case 3072:
				;
			case 3073:
				;
			case 2071:
				;
			case 534:
				;
			case 677:
				;
			case 158:
				;
			case 157:
				;
			case 610:
				;
			case 2050:
				;
			case 155:
				;
			case 548:
				;
			case 676:
				;
			case 128:
				;
			case 665:
				;
			case 2128:
				;
			case 2125:
				;
			case 549:
				;
			case 2053:
				;
			case 596:
				;
			case 2076:
				;
			case 2075:
				;
			case 2082:
				;
			case 397:
				;
			case 154:
				;
			case 1117:
				;
			case 553:
				;
			case 2091:
				break;
			case 35:
				n.push(l);
				a = true;
				break;
			case 36:
				n.pop();
				a = false;
				break;
			case 37:
				n.push(l);
				a = true;
				break;
			case 38:
				n.pop();
				a = false;
				break;
			case 16:
				break;
			default:
				if ((l || "").indexOf("Begin") > 0) {} else if ((l || "").indexOf("End") > 0) {} else if (!a || r.WTF && n[n.length - 1] !=
					"BrtACBegin" && n[n.length - 1] != "BrtFRTBegin") throw new Error("Unexpected record " + f + " " + l)
			}
		}, r);
		Hd(t);
		t.Names = i;
		t.supbooks = s;
		return t
	}

	function ap(e, r) {
		Kr(e, "BrtBeginBundleShs");
		for (var t = 0; t != r.SheetNames.length; ++t) {
			var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0;
			var a = {
				Hidden: n,
				iTabID: t + 1,
				strRelID: "rId" + (t + 1),
				name: r.SheetNames[t]
			};
			Kr(e, "BrtBundleSh", Jd(a))
		}
		Kr(e, "BrtEndBundleShs")
	}

	function ip(r, t) {
		if (!t) t = Xr(127);
		for (var n = 0; n != 4; ++n) t._W(4, 0);
		kt("SheetJS", t);
		kt(e.version, t);
		kt(e.version, t);
		kt("7262", t);
		t.length = t.l;
		return t.length > t.l ? t.slice(0, t.l) : t
	}

	function sp(e, r) {
		if (!r) r = Xr(29);
		r._W(-4, 0);
		r._W(-4, 460);
		r._W(4, 28800);
		r._W(4, 17600);
		r._W(4, 500);
		r._W(4, e);
		r._W(4, e);
		var t = 120;
		r._W(1, t);
		return r.length > r.l ? r.slice(0, r.l) : r
	}

	function op(e, r) {
		if (!r.Workbook || !r.Workbook.Sheets) return;
		var t = r.Workbook.Sheets;
		var n = 0,
			a = -1,
			i = -1;
		for (; n < t.length; ++n) {
			if (!t[n] || !t[n].Hidden && a == -1) a = n;
			else if (t[n].Hidden == 1 && i == -1) i = n
		}
		if (i > a) return;
		Kr(e, "BrtBeginBookViews");
		Kr(e, "BrtBookView", sp(a));
		Kr(e, "BrtEndBookViews")
	}

	function lp(e, r) {
		var t = jr();
		Kr(t, "BrtBeginBook");
		Kr(t, "BrtFileVersion", ip());
		Kr(t, "BrtWbProp", ep(e.Workbook && e.Workbook.WBProps || null));
		op(t, e, r);
		ap(t, e, r);
		Kr(t, "BrtEndBook");
		return t.end()
	}

	function fp(e, r, t) {
		if (r.slice(-4) === ".bin") return np(e, t);
		return Yd(e, t)
	}

	function cp(e, r, t, n, a, i, s, o) {
		if (r.slice(-4) === ".bin") return pd(e, n, t, a, i, s, o);
		return fh(e, n, t, a, i, s, o)
	}

	function up(e, r, t, n, a, i, s, o) {
		if (r.slice(-4) === ".bin") return Fd(e, n, t, a, i, s, o);
		return xd(e, n, t, a, i, s, o)
	}

	function hp(e, r, t, n, a, i, s, o) {
		if (r.slice(-4) === ".bin") return Hf(e, n, t, a, i, s, o);
		return Vf(e, n, t, a, i, s, o)
	}

	function dp(e, r, t, n, a, i, s, o) {
		if (r.slice(-4) === ".bin") return Wf(e, n, t, a, i, s, o);
		return Uf(e, n, t, a, i, s, o)
	}

	function pp(e, r, t, n) {
		if (r.slice(-4) === ".bin") return Wl(e, t, n);
		return kl(e, t, n)
	}

	function vp(e, r, t) {
		return sf(e, t)
	}

	function gp(e, r, t) {
		if (r.slice(-4) === ".bin") return bo(e, t);
		return po(e, t)
	}

	function mp(e, r, t) {
		if (r.slice(-4) === ".bin") return Ff(e, t);
		return Rf(e, t)
	}

	function bp(e, r, t) {
		if (r.slice(-4) === ".bin") return bf(e, r, t);
		return gf(e, r, t)
	}

	function Cp(e, r, t) {
		if (r.slice(-4) === ".bin") return Ef(e, r, t);
		return Cf(e, r, t)
	}

	function Ep(e, r, t) {
		return (r.slice(-4) === ".bin" ? lp : Zd)(e, t)
	}

	function kp(e, r, t, n, a) {
		return (r.slice(-4) === ".bin" ? Rd : Bh)(e, t, n, a)
	}

	function Sp(e, r, t, n, a) {
		return (r.slice(-4) === ".bin" ? Od : Id)(e, t, n, a)
	}

	function wp(e, r, t) {
		return (r.slice(-4) === ".bin" ? Zl : wl)(e, t)
	}

	function Ap(e, r, t) {
		return (r.slice(-4) === ".bin" ? ko : go)(e, t)
	}

	function _p(e, r, t) {
		return (r.slice(-4) === ".bin" ? Of : Tf)(e, t)
	}
	var Rp = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;
	var Bp = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
	var Tp = function (e) {
		return String.fromCharCode(e)
	};

	function yp(e, r) {
		var t = e.split(/\s+/);
		var n = [];
		if (!r) n[0] = t[0];
		if (t.length === 1) return n;
		var a = e.match(Rp),
			i, s, o, l;
		if (a)
			for (l = 0; l != a.length; ++l) {
				i = a[l].match(Bp);
				if ((s = i[1].indexOf(":")) === -1) n[i[1]] = i[2].slice(1, i[2].length - 1);
				else {
					if (i[1].slice(0, 6) === "xmlns:") o = "xmlns" + i[1].slice(6);
					else o = i[1].slice(s + 1);
					n[o] = i[2].slice(1, i[2].length - 1)
				}
			}
		return n
	}

	function xp(e) {
		var r = e.split(/\s+/);
		var t = {};
		if (r.length === 1) return t;
		var n = e.match(Rp),
			a, i, s, o;
		if (n)
			for (o = 0; o != n.length; ++o) {
				a = n[o].match(Bp);
				if ((i = a[1].indexOf(":")) === -1) t[a[1]] = a[2].slice(1, a[2].length - 1);
				else {
					if (a[1].slice(0, 6) === "xmlns:") s = "xmlns" + a[1].slice(6);
					else s = a[1].slice(i + 1);
					t[s] = a[2].slice(1, a[2].length - 1)
				}
			}
		return t
	}

	function Ip(e, r) {
		var t = F[e] || Ie(e);
		if (t === "General") return I._general(r);
		return I.format(t, r)
	}

	function Dp(e, r, t, n) {
		var a = n;
		switch ((t[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
		case "boolean":
			a = He(n);
			break;
		case "i2":
			;
		case "int":
			a = parseInt(n, 10);
			break;
		case "r4":
			;
		case "float":
			a = parseFloat(n);
			break;
		case "date":
			;
		case "dateTime.tz":
			a = ae(n);
			break;
		case "i8":
			;
		case "string":
			;
		case "fixed":
			;
		case "uuid":
			;
		case "bin.base64":
			break;
		default:
			throw new Error("bad custprop:" + t[0])
		}
		e[Ie(r)] = a
	}

	function Fp(e, r, t) {
		if (e.t === "z") return;
		if (!t || t.cellText !== false) try {
			if (e.t === "e") {
				e.w = e.w || Gt[e.v]
			} else if (r === "General") {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = I._general_int(e.v);
					else e.w = I._general_num(e.v)
				} else e.w = I._general(e.v)
			} else e.w = Ip(r || "General", e.v)
		} catch (e) {
			if (t.WTF) throw e
		}
		try {
			var n = F[r] || r || "General";
			if (t.cellNF) e.z = n;
			if (t.cellDates && e.t == "n" && I.is_date(n)) {
				var a = I.parse_date_code(e.v);
				if (a) {
					e.t = "d";
					e.v = new Date(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u)
				}
			}
		} catch (e) {
			if (t.WTF) throw e
		}
	}

	function Op(e, r, t) {
		if (t.cellStyles) {
			if (r.Interior) {
				var n = r.Interior;
				if (n.Pattern) n.patternType = ul[n.Pattern] || n.Pattern
			}
		}
		e[r.ID] = r
	}

	function Pp(e, r, t, n, a, i, s, o, l, f) {
		var c = "General",
			u = n.StyleID,
			h = {};
		f = f || {};
		var d = [];
		var p = 0;
		if (u === undefined && o) u = o.StyleID;
		if (u === undefined && s) u = s.StyleID;
		while (i[u] !== undefined) {
			if (i[u].nf) c = i[u].nf;
			if (i[u].Interior) d.push(i[u].Interior);
			if (!i[u].Parent) break;
			u = i[u].Parent
		}
		switch (t.Type) {
		case "Boolean":
			n.t = "b";
			n.v = He(e);
			break;
		case "String":
			n.t = "s";
			n.r = We(Ie(e));
			n.v = e.indexOf("<") > -1 ? Ie(r) : n.r;
			break;
		case "DateTime":
			if (e.slice(-1) != "Z") e += "Z";
			n.v = (ae(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3);
			if (n.v !== n.v) n.v = Ie(e);
			else if (n.v < 60) n.v = n.v - 1;
			if (!c || c == "General") c = "yyyy-mm-dd";
		case "Number":
			if (n.v === undefined) n.v = +e;
			if (!n.t) n.t = "n";
			break;
		case "Error":
			n.t = "e";
			n.v = jt[e];
			if (f.cellText !== false) n.w = e;
			break;
		default:
			n.t = "s";
			n.v = We(r || e);
			break
		}
		Fp(n, c, f);
		if (f.cellFormula !== false) {
			if (n.Formula) {
				var v = Ie(n.Formula);
				if (v.charCodeAt(0) == 61) v = v.slice(1);
				n.f = zf(v, a);
				delete n.Formula;
				if (n.ArrayRange == "RC") n.F = zf("RC:RC", a);
				else if (n.ArrayRange) {
					n.F = zf(n.ArrayRange, a);
					l.push([dt(n.F), n.F])
				}
			} else {
				for (p = 0; p < l.length; ++p)
					if (a.r >= l[p][0].s.r && a.r <= l[p][0].e.r)
						if (a.c >= l[p][0].s.c && a.c <= l[p][0].e.c) n.F = l[p][1]
			}
		}
		if (f.cellStyles) {
			d.forEach(function (e) {
				if (!h.patternType && e.patternType) h.patternType = e.patternType
			});
			n.s = h
		}
		if (n.StyleID !== undefined) n.ixfe = n.StyleID
	}

	function Np(e) {
		e.t = e.v || "";
		e.t = e.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		e.v = e.w = e.ixfe = undefined
	}

	function Lp(e) {
		if (b && Buffer.isBuffer(e)) return e.toString("utf8");
		if (typeof e === "string") return e;
		if (typeof Uint8Array !== "undefined" && e instanceof Uint8Array) return Ve(_(B(e)));
		throw new Error("Bad input format: expected Buffer or string")
	}
	var Mp = /<(\/?)([^\s?>!\/:]*:|)([^\s?>:\/]+)[^>]*>/gm;

	function Wp(e, r) {
		var t = r || {};
		D(I);
		var n = d(Lp(e));
		if (t.type == "binary" || t.type == "array" || t.type == "base64") {
			if (typeof cptable !== "undefined") n = cptable.utils.decode(65001, c(n));
			else n = Ve(n)
		}
		var a = n.slice(0, 1024).toLowerCase(),
			i = false;
		if (a.indexOf("<?xml") == -1)["html", "table", "head", "meta", "script", "style", "div"].forEach(function (e) {
			if (a.indexOf("<" + e) >= 0) i = true
		});
		if (i) return Iv.to_workbook(n, t);
		var s;
		var o = [],
			l;
		if (v != null && t.dense == null) t.dense = v;
		var f = {},
			u = [],
			h = t.dense ? [] : {},
			p = "";
		var g = {},
			m = {},
			b = {};
		var C = yp('<Data ss:Type="String">'),
			E = 0;
		var k = 0,
			S = 0;
		var w = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var A = {},
			_ = {};
		var R = "",
			B = 0;
		var T = [];
		var y = {},
			x = {},
			O = 0,
			P = [];
		var N = [],
			L = {};
		var M = [],
			W, U = false;
		var H = [];
		var V = [],
			z = {},
			X = 0,
			G = 0;
		var j = {
				Sheets: [],
				WBProps: {
					date1904: false
				}
			},
			K = {};
		Mp.lastIndex = 0;
		n = n.replace(/<!--([\s\S]*?)-->/gm, "");
		while (s = Mp.exec(n)) switch (s[3]) {
		case "Data":
			if (o[o.length - 1][1]) break;
			if (s[1] === "/") Pp(n.slice(E, s.index), R, C, o[o.length - 1][0] == "Comment" ? L : m, {
				c: k,
				r: S
			}, A, M[k], b, H, t);
			else {
				R = "";
				C = yp(s[0]);
				E = s.index + s[0].length
			}
			break;
		case "Cell":
			if (s[1] === "/") {
				if (N.length > 0) m.c = N;
				if ((!t.sheetRows || t.sheetRows > S) && m.v !== undefined) {
					if (t.dense) {
						if (!h[S]) h[S] = [];
						h[S][k] = m
					} else h[it(k) + rt(S)] = m
				}
				if (m.HRef) {
					m.l = {
						Target: m.HRef
					};
					if (m.HRefScreenTip) m.l.Tooltip = m.HRefScreenTip;
					delete m.HRef;
					delete m.HRefScreenTip
				}
				if (m.MergeAcross || m.MergeDown) {
					X = k + (parseInt(m.MergeAcross, 10) | 0);
					G = S + (parseInt(m.MergeDown, 10) | 0);
					T.push({
						s: {
							c: k,
							r: S
						},
						e: {
							c: X,
							r: G
						}
					})
				}
				if (!t.sheetStubs) {
					if (m.MergeAcross) k = X + 1;
					else ++k
				} else if (m.MergeAcross || m.MergeDown) {
					for (var Y = k; Y <= X; ++Y) {
						for (var $ = S; $ <= G; ++$) {
							if (Y > k || $ > S) {
								if (t.dense) {
									if (!h[$]) h[$] = [];
									h[$][Y] = {
										t: "z"
									}
								} else h[it(Y) + rt($)] = {
									t: "z"
								}
							}
						}
					}
					k = X + 1
				} else ++k
			} else {
				m = xp(s[0]);
				if (m.Index) k = +m.Index - 1;
				if (k < w.s.c) w.s.c = k;
				if (k > w.e.c) w.e.c = k;
				if (s[0].slice(-2) === "/>") ++k;
				N = []
			}
			break;
		case "Row":
			if (s[1] === "/" || s[0].slice(-2) === "/>") {
				if (S < w.s.r) w.s.r = S;
				if (S > w.e.r) w.e.r = S;
				if (s[0].slice(-2) === "/>") {
					b = yp(s[0]);
					if (b.Index) S = +b.Index - 1
				}
				k = 0;
				++S
			} else {
				b = yp(s[0]);
				if (b.Index) S = +b.Index - 1;
				z = {};
				if (b.AutoFitHeight == "0" || b.Height) {
					z.hpx = parseInt(b.Height, 10);
					z.hpt = fl(z.hpx);
					V[S] = z
				}
				if (b.Hidden == "1") {
					z.hidden = true;
					V[S] = z
				}
			}
			break;
		case "Worksheet":
			if (s[1] === "/") {
				if ((l = o.pop())[0] !== s[3]) throw new Error("Bad state: " + l.join("|"));
				u.push(p);
				if (w.s.r <= w.e.r && w.s.c <= w.e.c) {
					h["!ref"] = ht(w);
					if (t.sheetRows && t.sheetRows <= w.e.r) {
						h["!fullref"] = h["!ref"];
						w.e.r = t.sheetRows - 1;
						h["!ref"] = ht(w)
					}
				}
				if (T.length) h["!merges"] = T;
				if (M.length > 0) h["!cols"] = M;
				if (V.length > 0) h["!rows"] = V;
				f[p] = h
			} else {
				w = {
					s: {
						r: 2e6,
						c: 2e6
					},
					e: {
						r: 0,
						c: 0
					}
				};
				S = k = 0;
				o.push([s[3], false]);
				l = yp(s[0]);
				p = Ie(l.Name);
				h = t.dense ? [] : {};
				T = [];
				H = [];
				V = [];
				K = {
					name: p,
					Hidden: 0
				};
				j.Sheets.push(K)
			}
			break;
		case "Table":
			if (s[1] === "/") {
				if ((l = o.pop())[0] !== s[3]) throw new Error("Bad state: " + l.join("|"))
			} else if (s[0].slice(-2) == "/>") break;
			else {
				g = yp(s[0]);
				o.push([s[3], false]);
				M = [];
				U = false
			}
			break;
		case "Style":
			if (s[1] === "/") Op(A, _, t);
			else _ = yp(s[0]);
			break;
		case "NumberFormat":
			_.nf = Ie(yp(s[0]).Format || "General");
			if (F[_.nf]) _.nf = F[_.nf];
			for (var Z = 0; Z != 392; ++Z)
				if (I._table[Z] == _.nf) break;
			if (Z == 392)
				for (Z = 57; Z != 392; ++Z)
					if (I._table[Z] == null) {
						I.load(_.nf, Z);
						break
					}
			break;
		case "Column":
			if (o[o.length - 1][0] !== "Table") break;
			W = yp(s[0]);
			if (W.Hidden) {
				W.hidden = true;
				delete W.Hidden
			}
			if (W.Width) W.wpx = parseInt(W.Width, 10);
			if (!U && W.wpx > 10) {
				U = true;
				el = Qo;
				for (var Q = 0; Q < M.length; ++Q)
					if (M[Q]) sl(M[Q])
			}
			if (U) sl(W);
			M[W.Index - 1 || M.length] = W;
			for (var J = 0; J < +W.Span; ++J) M[M.length] = se(W);
			break;
		case "NamedRange":
			if (!j.Names) j.Names = [];
			var q = Be(s[0]);
			var ee = {
				Name: q.Name,
				Ref: zf(q.RefersTo.slice(1), {
					r: 0,
					c: 0
				})
			};
			if (j.Sheets.length > 0) ee.Sheet = j.Sheets.length - 1;
			j.Names.push(ee);
			break;
		case "NamedCell":
			break;
		case "B":
			break;
		case "I":
			break;
		case "U":
			break;
		case "S":
			break;
		case "Sub":
			break;
		case "Sup":
			break;
		case "Span":
			break;
		case "Border":
			break;
		case "Alignment":
			break;
		case "Borders":
			break;
		case "Font":
			if (s[0].slice(-2) === "/>") break;
			else if (s[1] === "/") R += n.slice(B, s.index);
			else B = s.index + s[0].length;
			break;
		case "Interior":
			if (!t.cellStyles) break;
			_.Interior = yp(s[0]);
			break;
		case "Protection":
			break;
		case "Author":
			;
		case "Title":
			;
		case "Description":
			;
		case "Created":
			;
		case "Keywords":
			;
		case "Subject":
			;
		case "Category":
			;
		case "Company":
			;
		case "LastAuthor":
			;
		case "LastSaved":
			;
		case "LastPrinted":
			;
		case "Version":
			;
		case "Revision":
			;
		case "TotalTime":
			;
		case "HyperlinkBase":
			;
		case "Manager":
			;
		case "ContentStatus":
			;
		case "Identifier":
			;
		case "Language":
			;
		case "AppName":
			if (s[0].slice(-2) === "/>") break;
			else if (s[1] === "/") la(y, s[3], n.slice(O, s.index));
			else O = s.index + s[0].length;
			break;
		case "Paragraphs":
			break;
		case "Styles":
			;
		case "Workbook":
			if (s[1] === "/") {
				if ((l = o.pop())[0] !== s[3]) throw new Error("Bad state: " + l.join("|"))
			} else o.push([s[3], false]);
			break;
		case "Comment":
			if (s[1] === "/") {
				if ((l = o.pop())[0] !== s[3]) throw new Error("Bad state: " + l.join("|"));
				Np(L);
				N.push(L)
			} else {
				o.push([s[3], false]);
				l = yp(s[0]);
				L = {
					a: l.Author
				}
			}
			break;
		case "AutoFilter":
			if (s[1] === "/") {
				if ((l = o.pop())[0] !== s[3]) throw new Error("Bad state: " + l.join("|"))
			} else if (s[0].charAt(s[0].length - 2) !== "/") {
				var re = yp(s[0]);
				h["!autofilter"] = {
					ref: zf(re.Range).replace(/\$/g, "")
				};
				o.push([s[3], true])
			}
			break;
		case "Name":
			break;
		case "ComponentOptions":
			;
		case "DocumentProperties":
			;
		case "CustomDocumentProperties":
			;
		case "OfficeDocumentSettings":
			;
		case "PivotTable":
			;
		case "PivotCache":
			;
		case "Names":
			;
		case "MapInfo":
			;
		case "PageBreaks":
			;
		case "QueryTable":
			;
		case "DataValidation":
			;
		case "Sorting":
			;
		case "Schema":
			;
		case "data":
			;
		case "ConditionalFormatting":
			;
		case "SmartTagType":
			;
		case "SmartTags":
			;
		case "ExcelWorkbook":
			;
		case "WorkbookOptions":
			;
		case "WorksheetOptions":
			if (s[1] === "/") {
				if ((l = o.pop())[0] !== s[3]) throw new Error("Bad state: " + l.join("|"))
			} else if (s[0].charAt(s[0].length - 2) !== "/") o.push([s[3], true]);
			break;
		default:
			if (o.length == 0 && s[3] == "document") return Mv(n, t);
			if (o.length == 0 && s[3] == "UOF") return Mv(n, t);
			var te = true;
			switch (o[o.length - 1][0]) {
			case "OfficeDocumentSettings":
				switch (s[3]) {
				case "AllowPNG":
					break;
				case "RemovePersonalInformation":
					break;
				case "DownloadComponents":
					break;
				case "LocationOfComponents":
					break;
				case "Colors":
					break;
				case "Color":
					break;
				case "Index":
					break;
				case "RGB":
					break;
				case "PixelsPerInch":
					break;
				case "TargetScreenSize":
					break;
				case "ReadOnlyRecommended":
					break;
				default:
					te = false
				}
				break;
			case "ComponentOptions":
				switch (s[3]) {
				case "Toolbar":
					break;
				case "HideOfficeLogo":
					break;
				case "SpreadsheetAutoFit":
					break;
				case "Label":
					break;
				case "Caption":
					break;
				case "MaxHeight":
					break;
				case "MaxWidth":
					break;
				case "NextSheetNumber":
					break;
				default:
					te = false
				}
				break;
			case "ExcelWorkbook":
				switch (s[3]) {
				case "Date1904":
					j.WBProps.date1904 = true;
					break;
				case "WindowHeight":
					break;
				case "WindowWidth":
					break;
				case "WindowTopX":
					break;
				case "WindowTopY":
					break;
				case "TabRatio":
					break;
				case "ProtectStructure":
					break;
				case "ProtectWindows":
					break;
				case "ActiveSheet":
					break;
				case "DisplayInkNotes":
					break;
				case "FirstVisibleSheet":
					break;
				case "SupBook":
					break;
				case "SheetName":
					break;
				case "SheetIndex":
					break;
				case "SheetIndexFirst":
					break;
				case "SheetIndexLast":
					break;
				case "Dll":
					break;
				case "AcceptLabelsInFormulas":
					break;
				case "DoNotSaveLinkValues":
					break;
				case "Iteration":
					break;
				case "MaxIterations":
					break;
				case "MaxChange":
					break;
				case "Path":
					break;
				case "Xct":
					break;
				case "Count":
					break;
				case "SelectedSheets":
					break;
				case "Calculation":
					break;
				case "Uncalced":
					break;
				case "StartupPrompt":
					break;
				case "Crn":
					break;
				case "ExternName":
					break;
				case "Formula":
					break;
				case "ColFirst":
					break;
				case "ColLast":
					break;
				case "WantAdvise":
					break;
				case "Boolean":
					break;
				case "Error":
					break;
				case "Text":
					break;
				case "OLE":
					break;
				case "NoAutoRecover":
					break;
				case "PublishObjects":
					break;
				case "DoNotCalculateBeforeSave":
					break;
				case "Number":
					break;
				case "RefModeR1C1":
					break;
				case "EmbedSaveSmartTags":
					break;
				default:
					te = false
				}
				break;
			case "WorkbookOptions":
				switch (s[3]) {
				case "OWCVersion":
					break;
				case "Height":
					break;
				case "Width":
					break;
				default:
					te = false
				}
				break;
			case "WorksheetOptions":
				switch (s[3]) {
				case "Visible":
					if (s[0].slice(-2) === "/>") {} else if (s[1] === "/") switch (n.slice(O, s.index)) {
					case "SheetHidden":
						K.Hidden = 1;
						break;
					case "SheetVeryHidden":
						K.Hidden = 2;
						break
					} else O = s.index + s[0].length;
					break;
				case "Header":
					if (!h["!margins"]) $u(h["!margins"] = {}, "xlml");
					h["!margins"].header = Be(s[0]).Margin;
					break;
				case "Footer":
					if (!h["!margins"]) $u(h["!margins"] = {}, "xlml");
					h["!margins"].footer = Be(s[0]).Margin;
					break;
				case "PageMargins":
					var ne = Be(s[0]);
					if (!h["!margins"]) $u(h["!margins"] = {}, "xlml");
					if (ne.Top) h["!margins"].top = ne.Top;
					if (ne.Left) h["!margins"].left = ne.Left;
					if (ne.Right) h["!margins"].right = ne.Right;
					if (ne.Bottom) h["!margins"].bottom = ne.Bottom;
					break;
				case "DisplayRightToLeft":
					if (!j.Views) j.Views = [];
					if (!j.Views[0]) j.Views[0] = {};
					j.Views[0].RTL = true;
					break;
				case "Unsynced":
					break;
				case "Print":
					break;
				case "Panes":
					break;
				case "Scale":
					break;
				case "Pane":
					break;
				case "Number":
					break;
				case "Layout":
					break;
				case "PageSetup":
					break;
				case "Selected":
					break;
				case "ProtectObjects":
					break;
				case "EnableSelection":
					break;
				case "ProtectScenarios":
					break;
				case "ValidPrinterInfo":
					break;
				case "HorizontalResolution":
					break;
				case "VerticalResolution":
					break;
				case "NumberofCopies":
					break;
				case "ActiveRow":
					break;
				case "ActiveCol":
					break;
				case "ActivePane":
					break;
				case "TopRowVisible":
					break;
				case "TopRowBottomPane":
					break;
				case "LeftColumnVisible":
					break;
				case "LeftColumnRightPane":
					break;
				case "FitToPage":
					break;
				case "RangeSelection":
					break;
				case "PaperSizeIndex":
					break;
				case "PageLayoutZoom":
					break;
				case "PageBreakZoom":
					break;
				case "FilterOn":
					break;
				case "DoNotDisplayGridlines":
					break;
				case "SplitHorizontal":
					break;
				case "SplitVertical":
					break;
				case "FreezePanes":
					break;
				case "FrozenNoSplit":
					break;
				case "FitWidth":
					break;
				case "FitHeight":
					break;
				case "CommentsLayout":
					break;
				case "Zoom":
					break;
				case "LeftToRight":
					break;
				case "Gridlines":
					break;
				case "AllowSort":
					break;
				case "AllowFilter":
					break;
				case "AllowInsertRows":
					break;
				case "AllowDeleteRows":
					break;
				case "AllowInsertCols":
					break;
				case "AllowDeleteCols":
					break;
				case "AllowInsertHyperlinks":
					break;
				case "AllowFormatCells":
					break;
				case "AllowSizeCols":
					break;
				case "AllowSizeRows":
					break;
				case "NoSummaryRowsBelowDetail":
					break;
				case "TabColorIndex":
					break;
				case "DoNotDisplayHeadings":
					break;
				case "ShowPageLayoutZoom":
					break;
				case "NoSummaryColumnsRightDetail":
					break;
				case "BlackAndWhite":
					break;
				case "DoNotDisplayZeros":
					break;
				case "DisplayPageBreak":
					break;
				case "RowColHeadings":
					break;
				case "DoNotDisplayOutline":
					break;
				case "NoOrientation":
					break;
				case "AllowUsePivotTables":
					break;
				case "ZeroHeight":
					break;
				case "ViewableRange":
					break;
				case "Selection":
					break;
				case "ProtectContents":
					break;
				default:
					te = false
				}
				break;
			case "PivotTable":
				;
			case "PivotCache":
				switch (s[3]) {
				case "ImmediateItemsOnDrop":
					break;
				case "ShowPageMultipleItemLabel":
					break;
				case "CompactRowIndent":
					break;
				case "Location":
					break;
				case "PivotField":
					break;
				case "Orientation":
					break;
				case "LayoutForm":
					break;
				case "LayoutSubtotalLocation":
					break;
				case "LayoutCompactRow":
					break;
				case "Position":
					break;
				case "PivotItem":
					break;
				case "DataType":
					break;
				case "DataField":
					break;
				case "SourceName":
					break;
				case "ParentField":
					break;
				case "PTLineItems":
					break;
				case "PTLineItem":
					break;
				case "CountOfSameItems":
					break;
				case "Item":
					break;
				case "ItemType":
					break;
				case "PTSource":
					break;
				case "CacheIndex":
					break;
				case "ConsolidationReference":
					break;
				case "FileName":
					break;
				case "Reference":
					break;
				case "NoColumnGrand":
					break;
				case "NoRowGrand":
					break;
				case "BlankLineAfterItems":
					break;
				case "Hidden":
					break;
				case "Subtotal":
					break;
				case "BaseField":
					break;
				case "MapChildItems":
					break;
				case "Function":
					break;
				case "RefreshOnFileOpen":
					break;
				case "PrintSetTitles":
					break;
				case "MergeLabels":
					break;
				case "DefaultVersion":
					break;
				case "RefreshName":
					break;
				case "RefreshDate":
					break;
				case "RefreshDateCopy":
					break;
				case "VersionLastRefresh":
					break;
				case "VersionLastUpdate":
					break;
				case "VersionUpdateableMin":
					break;
				case "VersionRefreshableMin":
					break;
				case "Calculation":
					break;
				default:
					te = false
				}
				break;
			case "PageBreaks":
				switch (s[3]) {
				case "ColBreaks":
					break;
				case "ColBreak":
					break;
				case "RowBreaks":
					break;
				case "RowBreak":
					break;
				case "ColStart":
					break;
				case "ColEnd":
					break;
				case "RowEnd":
					break;
				default:
					te = false
				}
				break;
			case "AutoFilter":
				switch (s[3]) {
				case "AutoFilterColumn":
					break;
				case "AutoFilterCondition":
					break;
				case "AutoFilterAnd":
					break;
				case "AutoFilterOr":
					break;
				default:
					te = false
				}
				break;
			case "QueryTable":
				switch (s[3]) {
				case "Id":
					break;
				case "AutoFormatFont":
					break;
				case "AutoFormatPattern":
					break;
				case "QuerySource":
					break;
				case "QueryType":
					break;
				case "EnableRedirections":
					break;
				case "RefreshedInXl9":
					break;
				case "URLString":
					break;
				case "HTMLTables":
					break;
				case "Connection":
					break;
				case "CommandText":
					break;
				case "RefreshInfo":
					break;
				case "NoTitles":
					break;
				case "NextId":
					break;
				case "ColumnInfo":
					break;
				case "OverwriteCells":
					break;
				case "DoNotPromptForFile":
					break;
				case "TextWizardSettings":
					break;
				case "Source":
					break;
				case "Number":
					break;
				case "Decimal":
					break;
				case "ThousandSeparator":
					break;
				case "TrailingMinusNumbers":
					break;
				case "FormatSettings":
					break;
				case "FieldType":
					break;
				case "Delimiters":
					break;
				case "Tab":
					break;
				case "Comma":
					break;
				case "AutoFormatName":
					break;
				case "VersionLastEdit":
					break;
				case "VersionLastRefresh":
					break;
				default:
					te = false
				}
				break;
			case "Sorting":
				;
			case "ConditionalFormatting":
				;
			case "DataValidation":
				switch (s[3]) {
				case "Range":
					break;
				case "Type":
					break;
				case "Min":
					break;
				case "Max":
					break;
				case "Sort":
					break;
				case "Descending":
					break;
				case "Order":
					break;
				case "CaseSensitive":
					break;
				case "Value":
					break;
				case "ErrorStyle":
					break;
				case "ErrorMessage":
					break;
				case "ErrorTitle":
					break;
				case "CellRangeList":
					break;
				case "InputMessage":
					break;
				case "InputTitle":
					break;
				case "ComboHide":
					break;
				case "InputHide":
					break;
				case "Condition":
					break;
				case "Qualifier":
					break;
				case "UseBlank":
					break;
				case "Value1":
					break;
				case "Value2":
					break;
				case "Format":
					break;
				default:
					te = false
				}
				break;
			case "MapInfo":
				;
			case "Schema":
				;
			case "data":
				switch (s[3]) {
				case "Map":
					break;
				case "Entry":
					break;
				case "Range":
					break;
				case "XPath":
					break;
				case "Field":
					break;
				case "XSDType":
					break;
				case "FilterOn":
					break;
				case "Aggregate":
					break;
				case "ElementType":
					break;
				case "AttributeType":
					break;
				case "schema":
					;
				case "element":
					;
				case "complexType":
					;
				case "datatype":
					;
				case "all":
					;
				case "attribute":
					;
				case "extends":
					break;
				case "row":
					break;
				default:
					te = false
				}
				break;
			case "SmartTags":
				break;
			default:
				te = false;
				break
			}
			if (te) break;
			if (!o[o.length - 1][1]) throw "Unrecognized tag: " + s[3] + "|" + o.join("|");
			if (o[o.length - 1][0] === "CustomDocumentProperties") {
				if (s[0].slice(-2) === "/>") break;
				else if (s[1] === "/") Dp(x, s[3], P, n.slice(O, s.index));
				else {
					P = s;
					O = s.index + s[0].length
				}
				break
			}
			if (t.WTF) throw "Unrecognized tag: " + s[3] + "|" + o.join("|")
		}
		var ae = {};
		if (!t.bookSheets && !t.bookProps) ae.Sheets = f;
		ae.SheetNames = u;
		ae.Workbook = j;
		ae.SSF = I.get_table();
		ae.Props = y;
		ae.Custprops = x;
		return ae
	}

	function Up(e, r) {
		eg(r = r || {});
		switch (r.type || "base64") {
		case "base64":
			return Wp(m.decode(e), r);
		case "binary":
			;
		case "buffer":
			;
		case "file":
			return Wp(e, r);
		case "array":
			return Wp(_(e), r)
		}
	}

	function Hp(e, r) {
		var t = [];
		if (e.Props) t.push(fa(e.Props, r));
		if (e.Custprops) t.push(ca(e.Props, e.Custprops, r));
		return t.join("")
	}

	function Vp() {
		return ""
	}

	function zp(e, r) {
		var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
		r.cellXfs.forEach(function (e, r) {
			var n = [];
			n.push(tr("NumberFormat", null, {
				"ss:Format": Oe(I._table[e.numFmtId])
			}));
			t.push(tr("Style", n.join(""), {
				"ss:ID": "s" + (21 + r)
			}))
		});
		return tr("Styles", t.join(""))
	}

	function Xp(e) {
		return tr("NamedRange", null, {
			"ss:Name": e.Name,
			"ss:RefersTo": "=" + Gf(e.Ref, {
				r: 0,
				c: 0
			})
		})
	}

	function Gp(e) {
		if (!((e || {}).Workbook || {}).Names) return "";
		var r = e.Workbook.Names;
		var t = [];
		for (var n = 0; n < r.length; ++n) {
			var a = r[n];
			if (a.Sheet != null) continue;
			if (a.Name.match(/^_xlfn\./)) continue;
			t.push(Xp(a))
		}
		return tr("Names", t.join(""))
	}

	function jp(e, r, t, n) {
		if (!e) return "";
		if (!((n || {}).Workbook || {}).Names) return "";
		var a = n.Workbook.Names;
		var i = [];
		for (var s = 0; s < a.length; ++s) {
			var o = a[s];
			if (o.Sheet != t) continue;
			if (o.Name.match(/^_xlfn\./)) continue;
			i.push(Xp(o))
		}
		return i.join("")
	}

	function Kp(e, r, t, n) {
		if (!e) return "";
		var a = [];
		if (e["!margins"]) {
			a.push("<PageSetup>");
			if (e["!margins"].header) a.push(tr("Header", null, {
				"x:Margin": e["!margins"].header
			}));
			if (e["!margins"].footer) a.push(tr("Footer", null, {
				"x:Margin": e["!margins"].footer
			}));
			a.push(tr("PageMargins", null, {
				"x:Bottom": e["!margins"].bottom || "0.75",
				"x:Left": e["!margins"].left || "0.7",
				"x:Right": e["!margins"].right || "0.7",
				"x:Top": e["!margins"].top || "0.75"
			}));
			a.push("</PageSetup>")
		}
		if (n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[t]) {
			if (n.Workbook.Sheets[t].Hidden) a.push(tr("Visible", n.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
			else {
				for (var i = 0; i < t; ++i)
					if (n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden) break;
				if (i == t) a.push("<Selected/>")
			}
		}
		if (((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL) a.push("<DisplayRightToLeft/>");
		if (e["!protect"]) {
			a.push(er("ProtectContents", "True"));
			if (e["!protect"].objects) a.push(er("ProtectObjects", "True"));
			if (e["!protect"].scenarios) a.push(er("ProtectScenarios", "True"));
			if (e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells) a.push(er("EnableSelection", "NoSelection"));
			else if (e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells) a.push(er("EnableSelection", "UnlockedCells"));
			[
				["formatCells", "AllowFormatCells"],
				["formatColumns", "AllowSizeCols"],
				["formatRows", "AllowSizeRows"],
				["insertColumns", "AllowInsertCols"],
				["insertRows", "AllowInsertRows"],
				["insertHyperlinks", "AllowInsertHyperlinks"],
				["deleteColumns", "AllowDeleteCols"],
				["deleteRows", "AllowDeleteRows"],
				["sort", "AllowSort"],
				["autoFilter", "AllowFilter"],
				["pivotTables", "AllowUsePivotTables"]
			].forEach(function (r) {
				if (e["!protect"][r[0]]) a.push("<" + r[1] + "/>")
			})
		}
		if (a.length == 0) return "";
		return tr("WorksheetOptions", a.join(""), {
			xmlns: sr.x
		})
	}

	function Yp(e) {
		return e.map(function (e) {
			var r = Ue(e.t || "");
			var t = tr("ss:Data", r, {
				xmlns: "http://www.w3.org/TR/REC-html40"
			});
			return tr("Comment", t, {
				"ss:Author": e.a
			})
		}).join("")
	}

	function $p(e, r, t, n, a, i, s) {
		if (!e || e.v == undefined && e.f == undefined) return "";
		var o = {};
		if (e.f) o["ss:Formula"] = "=" + Oe(Gf(e.f, s));
		if (e.F && e.F.slice(0, r.length) == r) {
			var l = ft(e.F.slice(r.length + 1));
			o["ss:ArrayRange"] = "RC:R" + (l.r == s.r ? "" : "[" + (l.r - s.r) + "]") + "C" + (l.c == s.c ? "" : "[" + (l.c - s.c) + "]")
		}
		if (e.l && e.l.Target) {
			o["ss:HRef"] = Oe(e.l.Target);
			if (e.l.Tooltip) o["x:HRefScreenTip"] = Oe(e.l.Tooltip)
		}
		if (t["!merges"]) {
			var f = t["!merges"];
			for (var c = 0; c != f.length; ++c) {
				if (f[c].s.c != s.c || f[c].s.r != s.r) continue;
				if (f[c].e.c > f[c].s.c) o["ss:MergeAcross"] = f[c].e.c - f[c].s.c;
				if (f[c].e.r > f[c].s.r) o["ss:MergeDown"] = f[c].e.r - f[c].s.r
			}
		}
		var u = "",
			h = "";
		switch (e.t) {
		case "z":
			return "";
		case "n":
			u = "Number";
			h = String(e.v);
			break;
		case "b":
			u = "Boolean";
			h = e.v ? "1" : "0";
			break;
		case "e":
			u = "Error";
			h = Gt[e.v];
			break;
		case "d":
			u = "DateTime";
			h = new Date(e.v).toISOString();
			if (e.z == null) e.z = e.z || I._table[14];
			break;
		case "s":
			u = "String";
			h = Me(e.v || "");
			break
		}
		var d = Zu(n.cellXfs, e, n);
		o["ss:StyleID"] = "s" + (21 + d);
		o["ss:Index"] = s.c + 1;
		var p = e.v != null ? h : "";
		var v = '<Data ss:Type="' + u + '">' + p + "</Data>";
		if ((e.c || []).length > 0) v += Yp(e.c);
		return tr("Cell", v, o)
	}

	function Zp(e, r) {
		var t = '<Row ss:Index="' + (e + 1) + '"';
		if (r) {
			if (r.hpt && !r.hpx) r.hpx = cl(r.hpt);
			if (r.hpx) t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"';
			if (r.hidden) t += ' ss:Hidden="1"'
		}
		return t + ">"
	}

	function Qp(e, r, t, n) {
		if (!e["!ref"]) return "";
		var a = dt(e["!ref"]);
		var i = e["!merges"] || [],
			s = 0;
		var o = [];
		if (e["!cols"]) e["!cols"].forEach(function (e, r) {
			sl(e);
			var t = !!e.width;
			var n = Yu(r, e);
			var a = {
				"ss:Index": r + 1
			};
			if (t) a["ss:Width"] = rl(n.width);
			if (e.hidden) a["ss:Hidden"] = "1";
			o.push(tr("Column", null, a))
		});
		var l = Array.isArray(e);
		for (var f = a.s.r; f <= a.e.r; ++f) {
			var c = [Zp(f, (e["!rows"] || [])[f])];
			for (var u = a.s.c; u <= a.e.c; ++u) {
				var h = false;
				for (s = 0; s != i.length; ++s) {
					if (i[s].s.c > u) continue;
					if (i[s].s.r > f) continue;
					if (i[s].e.c < u) continue;
					if (i[s].e.r < f) continue;
					if (i[s].s.c != u || i[s].s.r != f) h = true;
					break
				}
				if (h) continue;
				var d = {
					r: f,
					c: u
				};
				var p = ct(d),
					v = l ? (e[f] || [])[u] : e[p];
				c.push($p(v, p, e, r, t, n, d))
			}
			c.push("</Row>");
			if (c.length > 2) o.push(c.join(""))
		}
		return o.join("")
	}

	function Jp(e, r, t) {
		var n = [];
		var a = t.SheetNames[e];
		var i = t.Sheets[a];
		var s = i ? jp(i, r, e, t) : "";
		if (s.length > 0) n.push("<Names>" + s + "</Names>");
		s = i ? Qp(i, r, e, t) : "";
		if (s.length > 0) n.push("<Table>" + s + "</Table>");
		n.push(Kp(i, r, e, t));
		return n.join("")
	}

	function qp(e, r) {
		if (!r) r = {};
		if (!e.SSF) e.SSF = I.get_table();
		if (e.SSF) {
			D(I);
			I.load_table(e.SSF);
			r.revssf = Y(e.SSF);
			r.revssf[e.SSF[65535]] = 0;
			r.ssf = e.SSF;
			r.cellXfs = [];
			Zu(r.cellXfs, {}, {
				revssf: {
					General: 0
				}
			})
		}
		var t = [];
		t.push(Hp(e, r));
		t.push(Vp(e, r));
		t.push("");
		t.push("");
		for (var n = 0; n < e.SheetNames.length; ++n) t.push(tr("Worksheet", Jp(n, r, e), {
			"ss:Name": Oe(e.SheetNames[n])
		}));
		t[2] = zp(e, r);
		t[3] = Gp(e, r);
		return Se + tr("Workbook", t.join(""), {
			xmlns: sr.ss,
			"xmlns:o": sr.o,
			"xmlns:x": sr.x,
			"xmlns:ss": sr.ss,
			"xmlns:dt": sr.dt,
			"xmlns:html": sr.html
		})
	}

	function ev(e) {
		var r = {};
		var t = e.content;
		t.l = 28;
		r.AnsiUserType = t._R(0, "lpstr-ansi");
		r.AnsiClipboardFormat = Jt(t);
		if (t.length - t.l <= 4) return r;
		var n = t._R(4);
		if (n == 0 || n > 40) return r;
		t.l -= 4;
		r.Reserved1 = t._R(0, "lpstr-ansi");
		if (t.length - t.l <= 4) return r;
		n = t._R(4);
		if (n !== 1907505652) return r;
		r.UnicodeClipboardFormat = qt(t);
		n = t._R(4);
		if (n == 0 || n > 40) return r;
		t.l -= 4;
		r.Reserved2 = t._R(0, "lpwstr")
	}

	function rv(e, r, t, n) {
		var a = t;
		var i = [];
		var s = r.slice(r.l, r.l + a);
		if (n && n.enc && n.enc.insitu) switch (e.n) {
		case "BOF":
			;
		case "FilePass":
			;
		case "FileLock":
			;
		case "InterfaceHdr":
			;
		case "RRDInfo":
			;
		case "RRDHead":
			;
		case "UsrExcl":
			break;
		default:
			if (s.length === 0) break;
			n.enc.insitu(s)
		}
		i.push(s);
		r.l += a;
		var o = hv[Ir(r, r.l)];
		var l = 0;
		while (o != null && o.n.slice(0, 8) === "Continue") {
			a = Ir(r, r.l + 2);
			l = r.l + 4;
			if (o.n == "ContinueFrt") l += 4;
			else if (o.n.slice(0, 11) == "ContinueFrt") l += 12;
			i.push(r.slice(l, r.l + 4 + a));
			r.l += 4 + a;
			o = hv[Ir(r, r.l)]
		}
		var f = T(i);
		Vr(f, 0);
		var c = 0;
		f.lens = [];
		for (var u = 0; u < i.length; ++u) {
			f.lens.push(c);
			c += i[u].length
		}
		return e.f(f, f.length, n)
	}

	function tv(e, r, t) {
		if (e.t === "z") return;
		if (!e.XF) return;
		var n = 0;
		try {
			n = e.z || e.XF.numFmtId || 0;
			if (r.cellNF) e.z = I._table[n]
		} catch (e) {
			if (r.WTF) throw e
		}
		if (!r || r.cellText !== false) try {
			if (e.t === "e") {
				e.w = e.w || Gt[e.v]
			} else if (n === 0 || n == "General") {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = I._general_int(e.v);
					else e.w = I._general_num(e.v)
				} else e.w = I._general(e.v)
			} else e.w = I.format(n, e.v, {
				date1904: !!t
			})
		} catch (e) {
			if (r.WTF) throw e
		}
		if (r.cellDates && n && e.t == "n" && I.is_date(I._table[n] || String(n))) {
			var a = I.parse_date_code(e.v);
			if (a) {
				e.t = "d";
				e.v = new Date(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u)
			}
		}
	}

	function nv(e, r, t) {
		return {
			v: e,
			ixfe: r,
			t: t
		}
	}

	function av(e, r) {
		var t = {
			opts: {}
		};
		var n = {};
		if (v != null && r.dense == null) r.dense = v;
		var a = r.dense ? [] : {};
		var i = {};
		var s = {};
		var o = null;
		var f = [];
		var c = "";
		var u = {};
		var h, d = "",
			p, g, m, b;
		var C = {};
		var E = [];
		var k;
		var S;
		var w = true;
		var A = [];
		var _ = [];
		var R = {
				Sheets: [],
				WBProps: {
					date1904: false
				},
				Views: [{}]
			},
			B = {};
		var T = function e(r) {
			if (r < 8) return Sn[r];
			if (r < 64) return _[r - 8] || Sn[r];
			return Sn[r]
		};
		var y = function e(r, t, n) {
			var a = t.XF.data;
			if (!a || !a.patternType || !n || !n.cellStyles) return;
			t.s = {};
			t.s.patternType = a.patternType;
			var i;
			if (i = Ko(T(a.icvFore))) {
				t.s.fgColor = {
					rgb: i
				}
			}
			if (i = Ko(T(a.icvBack))) {
				t.s.bgColor = {
					rgb: i
				}
			}
		};
		var x = function e(r, t, n) {
			if (z > 1) return;
			if (n.sheetRows && r.r >= n.sheetRows) w = false;
			if (!w) return;
			if (n.cellStyles && t.XF && t.XF.data) y(r, t, n);
			delete t.ixfe;
			delete t.XF;
			h = r;
			d = ct(r);
			if (!s || !s.s || !s.e) s = {
				s: {
					r: 0,
					c: 0
				},
				e: {
					r: 0,
					c: 0
				}
			};
			if (r.r < s.s.r) s.s.r = r.r;
			if (r.c < s.s.c) s.s.c = r.c;
			if (r.r + 1 > s.e.r) s.e.r = r.r + 1;
			if (r.c + 1 > s.e.c) s.e.c = r.c + 1;
			if (n.cellFormula && t.f) {
				for (var i = 0; i < E.length; ++i) {
					if (E[i][0].s.c > r.c || E[i][0].s.r > r.r) continue;
					if (E[i][0].e.c < r.c || E[i][0].e.r < r.r) continue;
					t.F = ht(E[i][0]);
					if (E[i][0].s.c != r.c || E[i][0].s.r != r.r) delete t.f;
					if (t.f) t.f = "" + Au(E[i][1], s, r, H, D);
					break
				}
			} {
				if (n.dense) {
					if (!a[r.r]) a[r.r] = [];
					a[r.r][r.c] = t
				} else a[d] = t
			}
		};
		var D = {
			enc: false,
			sbcch: 0,
			snames: [],
			sharedf: C,
			arrayf: E,
			rrtabid: [],
			lastuser: "",
			biff: 8,
			codepage: 0,
			winlocked: 0,
			cellStyles: !!r && !!r.cellStyles,
			WTF: !!r && !!r.wtf
		};
		if (r.password) D.password = r.password;
		var F;
		var O = [];
		var P = [];
		var N = [],
			L = [];
		var M = 0,
			W = 0;
		var U = false;
		var H = [];
		H.SheetNames = D.snames;
		H.sharedf = D.sharedf;
		H.arrayf = D.arrayf;
		H.names = [];
		H.XTI = [];
		var V = "";
		var z = 0;
		var X = 0,
			j = [];
		var K = [];
		var Y;
		D.codepage = 1200;
		l(1200);
		var $ = false;
		while (e.l < e.length - 1) {
			var Z = e.l;
			var Q = e._R(2);
			if (Q === 0 && V === "EOF") break;
			var J = e.l === e.length ? 0 : e._R(2);
			var q = hv[Q];
			if (q && q.f) {
				if (r.bookSheets) {
					if (V === "BoundSheet8" && q.n !== "BoundSheet8") break
				}
				V = q.n;
				if (q.r === 2 || q.r == 12) {
					var ee = e._R(2);
					J -= 2;
					if (!D.enc && ee !== Q && ((ee & 255) << 8 | ee >> 8) !== Q) throw new Error("rt mismatch: " + ee + "!=" + Q);
					if (q.r == 12) {
						e.l += 10;
						J -= 10
					}
				}
				var re;
				if (q.n === "EOF") re = q.f(e, J, D);
				else re = rv(q, e, J, D);
				var te = q.n;
				if (z == 0 && te != "BOF") continue;
				switch (te) {
				case "Date1904":
					t.opts.Date1904 = R.WBProps.date1904 = re;
					break;
				case "WriteProtect":
					t.opts.WriteProtect = true;
					break;
				case "FilePass":
					if (!D.enc) e.l = 0;
					D.enc = re;
					if (!r.password) throw new Error("File is password-protected");
					if (re.valid == null) throw new Error("Encryption scheme unsupported");
					if (!re.valid) throw new Error("Password is incorrect");
					break;
				case "WriteAccess":
					D.lastuser = re;
					break;
				case "FileSharing":
					break;
				case "CodePage":
					switch (re) {
					case 21010:
						re = 1200;
						break;
					case 32768:
						re = 1e4;
						break;
					case 32769:
						re = 1252;
						break
					}
					l(D.codepage = re);
					$ = true;
					break;
				case "RRTabId":
					D.rrtabid = re;
					break;
				case "WinProtect":
					D.winlocked = re;
					break;
				case "Template":
					break;
				case "BookBool":
					break;
				case "UsesELFs":
					break;
				case "MTRSettings":
					break;
				case "RefreshAll":
					;
				case "CalcCount":
					;
				case "CalcDelta":
					;
				case "CalcIter":
					;
				case "CalcMode":
					;
				case "CalcPrecision":
					;
				case "CalcSaveRecalc":
					t.opts[te] = re;
					break;
				case "CalcRefMode":
					D.CalcRefMode = re;
					break;
				case "Uncalced":
					break;
				case "ForceFullCalculation":
					t.opts.FullCalc = re;
					break;
				case "WsBool":
					if (re.fDialog) a["!type"] = "dialog";
					break;
				case "XF":
					A.push(re);
					break;
				case "ExtSST":
					break;
				case "BookExt":
					break;
				case "RichTextStream":
					break;
				case "BkHim":
					break;
				case "SupBook":
					H.push([re]);
					H[H.length - 1].XTI = [];
					break;
				case "ExternName":
					H[H.length - 1].push(re);
					break;
				case "Index":
					break;
				case "Lbl":
					Y = {
						Name: re.Name,
						Ref: Au(re.rgce, s, null, H, D)
					};
					if (re.itab > 0) Y.Sheet = re.itab - 1;
					H.names.push(Y);
					if (!H[0]) {
						H[0] = [];
						H[0].XTI = []
					}
					H[H.length - 1].push(re);
					if (re.Name == "_xlnm._FilterDatabase" && re.itab > 0)
						if (re.rgce && re.rgce[0] && re.rgce[0][0] && re.rgce[0][0][0] == "PtgArea3d") K[re.itab - 1] = {
							ref: ht(re.rgce[0][0][1][2])
						};
					break;
				case "ExternCount":
					D.ExternCount = re;
					break;
				case "ExternSheet":
					if (H.length == 0) {
						H[0] = [];
						H[0].XTI = []
					}
					H[H.length - 1].XTI = H[H.length - 1].XTI.concat(re);
					H.XTI = H.XTI.concat(re);
					break;
				case "NameCmt":
					if (D.biff < 8) break;
					if (Y != null) Y.Comment = re[1];
					break;
				case "Protect":
					a["!protect"] = re;
					break;
				case "Password":
					if (re !== 0 && D.WTF) console.error("Password verifier: " + re);
					break;
				case "Prot4Rev":
					;
				case "Prot4RevPass":
					break;
				case "BoundSheet8":
					{
						i[re.pos] = re;D.snames.push(re.name)
					}
					break;
				case "EOF":
					{
						if (--z) break;
						if (s.e) {
							if (s.e.r > 0 && s.e.c > 0) {
								s.e.r--;
								s.e.c--;
								a["!ref"] = ht(s);
								if (r.sheetRows && r.sheetRows <= s.e.r) {
									var ne = s.e.r;
									s.e.r = r.sheetRows - 1;
									a["!fullref"] = a["!ref"];
									a["!ref"] = ht(s);
									s.e.r = ne
								}
								s.e.r++;
								s.e.c++
							}
							if (O.length > 0) a["!merges"] = O;
							if (P.length > 0) a["!objects"] = P;
							if (N.length > 0) a["!cols"] = N;
							if (L.length > 0) a["!rows"] = L;
							R.Sheets.push(B)
						}
						if (c === "") u = a;
						else n[c] = a;a = r.dense ? [] : {}
					}
					break;
				case "BOF":
					{
						if (D.biff === 8) D.biff = {
							9: 2,
							521: 3,
							1033: 4
						}[Q] || {
							512: 2,
							768: 3,
							1024: 4,
							1280: 5,
							1536: 8,
							2: 2,
							7: 2
						}[re.BIFFVer] || 8;
						if (D.biff == 8 && re.BIFFVer == 0 && re.dt == 16) D.biff = 2;
						if (z++) break;w = true;a = r.dense ? [] : {};
						if (D.biff < 8 && !$) {
							$ = true;
							l(D.codepage = r.codepage || 1252)
						}
						if (D.biff < 5) {
							if (c === "") c = "Sheet1";
							s = {
								s: {
									r: 0,
									c: 0
								},
								e: {
									r: 0,
									c: 0
								}
							};
							var ae = {
								pos: e.l - J,
								name: c
							};
							i[ae.pos] = ae;
							D.snames.push(c)
						} else c = (i[Z] || {
							name: ""
						}).name;
						if (re.dt == 32) a["!type"] = "chart";
						if (re.dt == 64) a["!type"] = "macro";O = [];P = [];D.arrayf = E = [];N = [];L = [];M = W = 0;U = false;B = {
							Hidden: (i[Z] || {
								hs: 0
							}).hs,
							name: c
						}
					}
					break;
				case "Number":
					;
				case "BIFF2NUM":
					;
				case "BIFF2INT":
					{
						if (a["!type"] == "chart")
							if (r.dense ? (a[re.r] || [])[re.c] : a[ct({
									c: re.c,
									r: re.r
								})]) ++re.c;k = {
							ixfe: re.ixfe,
							XF: A[re.ixfe] || {},
							v: re.val,
							t: "n"
						};
						if (X > 0) k.z = j[k.ixfe >> 8 & 31];tv(k, r, t.opts.Date1904);x({
							c: re.c,
							r: re.r
						}, k, r)
					}
					break;
				case "BoolErr":
					{
						k = {
							ixfe: re.ixfe,
							XF: A[re.ixfe],
							v: re.val,
							t: re.t
						};
						if (X > 0) k.z = j[k.ixfe >> 8 & 31];tv(k, r, t.opts.Date1904);x({
							c: re.c,
							r: re.r
						}, k, r)
					}
					break;
				case "RK":
					{
						k = {
							ixfe: re.ixfe,
							XF: A[re.ixfe],
							v: re.rknum,
							t: "n"
						};
						if (X > 0) k.z = j[k.ixfe >> 8 & 31];tv(k, r, t.opts.Date1904);x({
							c: re.c,
							r: re.r
						}, k, r)
					}
					break;
				case "MulRk":
					{
						for (var ie = re.c; ie <= re.C; ++ie) {
							var se = re.rkrec[ie - re.c][0];
							k = {
								ixfe: se,
								XF: A[se],
								v: re.rkrec[ie - re.c][1],
								t: "n"
							};
							if (X > 0) k.z = j[k.ixfe >> 8 & 31];
							tv(k, r, t.opts.Date1904);
							x({
								c: ie,
								r: re.r
							}, k, r)
						}
					}
					break;
				case "Formula":
					{
						if (re.val == "String") {
							o = re;
							break
						}
						k = nv(re.val, re.cell.ixfe, re.tt);k.XF = A[k.ixfe];
						if (r.cellFormula) {
							var oe = re.formula;
							if (oe && oe[0] && oe[0][0] && oe[0][0][0] == "PtgExp") {
								var le = oe[0][0][1][0],
									fe = oe[0][0][1][1];
								var ce = ct({
									r: le,
									c: fe
								});
								if (C[ce]) k.f = "" + Au(re.formula, s, re.cell, H, D);
								else k.F = ((r.dense ? (a[le] || [])[fe] : a[ce]) || {}).F
							} else k.f = "" + Au(re.formula, s, re.cell, H, D)
						}
						if (X > 0) k.z = j[k.ixfe >> 8 & 31];tv(k, r, t.opts.Date1904);x(re.cell, k, r);o = re
					}
					break;
				case "String":
					{
						if (o) {
							o.val = re;
							k = nv(re, o.cell.ixfe, "s");
							k.XF = A[k.ixfe];
							if (r.cellFormula) {
								k.f = "" + Au(o.formula, s, o.cell, H, D)
							}
							if (X > 0) k.z = j[k.ixfe >> 8 & 31];
							tv(k, r, t.opts.Date1904);
							x(o.cell, k, r);
							o = null
						} else throw new Error("String record expects Formula")
					}
					break;
				case "Array":
					{
						E.push(re);
						var ue = ct(re[0].s);p = r.dense ? (a[re[0].s.r] || [])[re[0].s.c] : a[ue];
						if (r.cellFormula && p) {
							if (!o) break;
							if (!ue || !p) break;
							p.f = "" + Au(re[1], s, re[0], H, D);
							p.F = ht(re[0])
						}
					}
					break;
				case "ShrFmla":
					{
						if (!w) break;
						if (!r.cellFormula) break;
						if (d) {
							if (!o) break;
							C[ct(o.cell)] = re[0];
							p = r.dense ? (a[o.cell.r] || [])[o.cell.c] : a[ct(o.cell)];
							(p || {}).f = "" + Au(re[0], s, h, H, D)
						}
					}
					break;
				case "LabelSst":
					k = nv(f[re.isst].t, re.ixfe, "s");
					k.XF = A[k.ixfe];
					if (X > 0) k.z = j[k.ixfe >> 8 & 31];
					tv(k, r, t.opts.Date1904);
					x({
						c: re.c,
						r: re.r
					}, k, r);
					break;
				case "Blank":
					if (r.sheetStubs) {
						k = {
							ixfe: re.ixfe,
							XF: A[re.ixfe],
							t: "z"
						};
						if (X > 0) k.z = j[k.ixfe >> 8 & 31];
						tv(k, r, t.opts.Date1904);
						x({
							c: re.c,
							r: re.r
						}, k, r)
					}
					break;
				case "MulBlank":
					if (r.sheetStubs) {
						for (var he = re.c; he <= re.C; ++he) {
							var de = re.ixfe[he - re.c];
							k = {
								ixfe: de,
								XF: A[de],
								t: "z"
							};
							if (X > 0) k.z = j[k.ixfe >> 8 & 31];
							tv(k, r, t.opts.Date1904);
							x({
								c: he,
								r: re.r
							}, k, r)
						}
					}
					break;
				case "RString":
					;
				case "Label":
					;
				case "BIFF2STR":
					k = nv(re.val, re.ixfe, "s");
					k.XF = A[k.ixfe];
					if (X > 0) k.z = j[k.ixfe >> 8 & 31];
					tv(k, r, t.opts.Date1904);
					x({
						c: re.c,
						r: re.r
					}, k, r);
					break;
				case "Dimensions":
					{
						if (z === 1) s = re
					}
					break;
				case "SST":
					{
						f = re
					}
					break;
				case "Format":
					{
						if (D.biff == 4) {
							j[X++] = re[1];
							for (var pe = 0; pe < X + 163; ++pe)
								if (I._table[pe] == re[1]) break;
							if (pe >= 163) I.load(re[1], X + 163)
						} else I.load(re[1], re[0])
					}
					break;
				case "BIFF2FORMAT":
					{
						j[X++] = re;
						for (var ve = 0; ve < X + 163; ++ve)
							if (I._table[ve] == re) break;if (ve >= 163) I.load(re, X + 163)
					}
					break;
				case "MergeCells":
					O = O.concat(re);
					break;
				case "Obj":
					P[re.cmo[0]] = D.lastobj = re;
					break;
				case "TxO":
					D.lastobj.TxO = re;
					break;
				case "ImData":
					D.lastobj.ImData = re;
					break;
				case "HLink":
					{
						for (b = re[0].s.r; b <= re[0].e.r; ++b)
							for (m = re[0].s.c; m <= re[0].e.c; ++m) {
								p = r.dense ? (a[b] || [])[m] : a[ct({
									c: m,
									r: b
								})];
								if (p) p.l = re[1]
							}
					}
					break;
				case "HLinkTooltip":
					{
						for (b = re[0].s.r; b <= re[0].e.r; ++b)
							for (m = re[0].s.c; m <= re[0].e.c; ++m) {
								p = r.dense ? (a[b] || [])[m] : a[ct({
									c: m,
									r: b
								})];
								if (p && p.l) p.l.Tooltip = re[1]
							}
					}
					break;
				case "Note":
					{
						if (D.biff <= 5 && D.biff >= 2) break;p = r.dense ? (a[re[0].r] || [])[re[0].c] : a[ct(re[0])];
						var ge = P[re[2]];
						if (!p) break;
						if (!p.c) p.c = [];g = {
							a: re[1],
							t: ge.TxO.t
						};p.c.push(g)
					}
					break;
				default:
					switch (q.n) {
					case "ClrtClient":
						break;
					case "XFExt":
						vf(A[re.ixfe], re.ext);
						break;
					case "DefColWidth":
						M = re;
						break;
					case "DefaultRowHeight":
						W = re[1];
						break;
					case "ColInfo":
						{
							if (!D.cellStyles) break;
							while (re.e >= re.s) {
								N[re.e--] = {
									width: re.w / 256
								};
								if (!U) {
									U = true;
									il(re.w / 256)
								}
								sl(N[re.e + 1])
							}
						}
						break;
					case "Row":
						{
							var me = {};
							if (re.level != null) {
								L[re.r] = me;
								me.level = re.level
							}
							if (re.hidden) {
								L[re.r] = me;
								me.hidden = true
							}
							if (re.hpt) {
								L[re.r] = me;
								me.hpt = re.hpt;
								me.hpx = cl(re.hpt)
							}
						}
						break;
					case "LeftMargin":
						;
					case "RightMargin":
						;
					case "TopMargin":
						;
					case "BottomMargin":
						if (!a["!margins"]) $u(a["!margins"] = {});
						a["!margins"][te.slice(0, -6).toLowerCase()] = re;
						break;
					case "Setup":
						if (!a["!margins"]) $u(a["!margins"] = {});
						a["!margins"].header = re.header;
						a["!margins"].footer = re.footer;
						break;
					case "Window2":
						if (re.RTL) R.Views[0].RTL = true;
						break;
					case "Header":
						break;
					case "Footer":
						break;
					case "HCenter":
						break;
					case "VCenter":
						break;
					case "Pls":
						break;
					case "GCW":
						break;
					case "LHRecord":
						break;
					case "DBCell":
						break;
					case "EntExU2":
						break;
					case "SxView":
						break;
					case "Sxvd":
						break;
					case "SXVI":
						break;
					case "SXVDEx":
						break;
					case "SxIvd":
						break;
					case "SXString":
						break;
					case "Sync":
						break;
					case "Addin":
						break;
					case "SXDI":
						break;
					case "SXLI":
						break;
					case "SXEx":
						break;
					case "QsiSXTag":
						break;
					case "Selection":
						break;
					case "Feat":
						break;
					case "FeatHdr":
						;
					case "FeatHdr11":
						break;
					case "Feature11":
						;
					case "Feature12":
						;
					case "List12":
						break;
					case "Country":
						S = re;
						break;
					case "RecalcId":
						break;
					case "DxGCol":
						break;
					case "Fbi":
						;
					case "Fbi2":
						;
					case "GelFrame":
						break;
					case "Font":
						break;
					case "XFCRC":
						break;
					case "Style":
						break;
					case "StyleExt":
						break;
					case "Palette":
						_ = re;
						break;
					case "Theme":
						F = re;
						break;
					case "ScenarioProtect":
						break;
					case "ObjProtect":
						break;
					case "CondFmt12":
						break;
					case "Table":
						break;
					case "TableStyles":
						break;
					case "TableStyle":
						break;
					case "TableStyleElement":
						break;
					case "SXStreamID":
						break;
					case "SXVS":
						break;
					case "DConRef":
						break;
					case "SXAddl":
						break;
					case "DConBin":
						break;
					case "DConName":
						break;
					case "SXPI":
						break;
					case "SxFormat":
						break;
					case "SxSelect":
						break;
					case "SxRule":
						break;
					case "SxFilt":
						break;
					case "SxItm":
						break;
					case "SxDXF":
						break;
					case "ScenMan":
						break;
					case "DCon":
						break;
					case "CellWatch":
						break;
					case "PrintRowCol":
						break;
					case "PrintGrid":
						break;
					case "PrintSize":
						break;
					case "XCT":
						break;
					case "CRN":
						break;
					case "Scl":
						{}
						break;
					case "SheetExt":
						{}
						break;
					case "SheetExtOptional":
						{}
						break;
					case "ObNoMacros":
						{}
						break;
					case "ObProj":
						{}
						break;
					case "CodeName":
						{
							if (!c) R.WBProps.CodeName = re || "ThisWorkbook";
							else B.CodeName = re || B.name
						}
						break;
					case "GUIDTypeLib":
						{}
						break;
					case "WOpt":
						break;
					case "PhoneticInfo":
						break;
					case "OleObjectSize":
						break;
					case "DXF":
						;
					case "DXFN":
						;
					case "DXFN12":
						;
					case "DXFN12List":
						;
					case "DXFN12NoCB":
						break;
					case "Dv":
						;
					case "DVal":
						break;
					case "BRAI":
						;
					case "Series":
						;
					case "SeriesText":
						break;
					case "DConn":
						break;
					case "DbOrParamQry":
						break;
					case "DBQueryExt":
						break;
					case "OleDbConn":
						break;
					case "ExtString":
						break;
					case "IFmtRecord":
						break;
					case "CondFmt":
						;
					case "CF":
						;
					case "CF12":
						;
					case "CFEx":
						break;
					case "Excel9File":
						break;
					case "Units":
						break;
					case "InterfaceHdr":
						;
					case "Mms":
						;
					case "InterfaceEnd":
						;
					case "DSF":
						break;
					case "BuiltInFnGroupCount":
						break;
					case "Window1":
						;
					case "HideObj":
						;
					case "GridSet":
						;
					case "Guts":
						;
					case "UserBView":
						;
					case "UserSViewBegin":
						;
					case "UserSViewEnd":
						;
					case "Pane":
						break;
					default:
						switch (q.n) {
						case "Dat":
							;
						case "Begin":
							;
						case "End":
							;
						case "StartBlock":
							;
						case "EndBlock":
							;
						case "Frame":
							;
						case "Area":
							;
						case "Axis":
							;
						case "AxisLine":
							;
						case "Tick":
							break;
						case "AxesUsed":
							;
						case "CrtLayout12":
							;
						case "CrtLayout12A":
							;
						case "CrtLink":
							;
						case "CrtLine":
							;
						case "CrtMlFrt":
							;
						case "CrtMlFrtContinue":
							break;
						case "LineFormat":
							;
						case "AreaFormat":
							;
						case "Chart":
							;
						case "Chart3d":
							;
						case "Chart3DBarShape":
							;
						case "ChartFormat":
							;
						case "ChartFrtInfo":
							break;
						case "PlotArea":
							;
						case "PlotGrowth":
							break;
						case "SeriesList":
							;
						case "SerParent":
							;
						case "SerAuxTrend":
							break;
						case "DataFormat":
							;
						case "SerToCrt":
							;
						case "FontX":
							break;
						case "CatSerRange":
							;
						case "AxcExt":
							;
						case "SerFmt":
							break;
						case "ShtProps":
							break;
						case "DefaultText":
							;
						case "Text":
							;
						case "CatLab":
							break;
						case "DataLabExtContents":
							break;
						case "Legend":
							;
						case "LegendException":
							break;
						case "Pie":
							;
						case "Scatter":
							break;
						case "PieFormat":
							;
						case "MarkerFormat":
							break;
						case "StartObject":
							;
						case "EndObject":
							break;
						case "AlRuns":
							;
						case "ObjectLink":
							break;
						case "SIIndex":
							break;
						case "AttachedLabel":
							;
						case "YMult":
							break;
						case "Line":
							;
						case "Bar":
							break;
						case "Surf":
							break;
						case "AxisParent":
							break;
						case "Pos":
							break;
						case "ValueRange":
							break;
						case "SXViewEx9":
							break;
						case "SXViewLink":
							break;
						case "PivotChartBits":
							break;
						case "SBaseRef":
							break;
						case "TextPropsStream":
							break;
						case "LnExt":
							break;
						case "MkrExt":
							break;
						case "CrtCoopt":
							break;
						case "Qsi":
							;
						case "Qsif":
							;
						case "Qsir":
							;
						case "QsiSXTag":
							break;
						case "TxtQry":
							break;
						case "FilterMode":
							break;
						case "AutoFilter":
							;
						case "AutoFilterInfo":
							break;
						case "AutoFilter12":
							break;
						case "DropDownObjIds":
							break;
						case "Sort":
							break;
						case "SortData":
							break;
						case "ShapePropsStream":
							break;
						case "MsoDrawing":
							;
						case "MsoDrawingGroup":
							;
						case "MsoDrawingSelection":
							break;
						case "WebPub":
							;
						case "AutoWebPub":
							break;
						case "HeaderFooter":
							;
						case "HFPicture":
							;
						case "PLV":
							;
						case "HorizontalPageBreaks":
							;
						case "VerticalPageBreaks":
							break;
						case "Backup":
							;
						case "CompressPictures":
							;
						case "Compat12":
							break;
						case "Continue":
							;
						case "ContinueFrt12":
							break;
						case "FrtFontList":
							;
						case "FrtWrapper":
							break;
						default:
							switch (q.n) {
							case "TabIdConf":
								;
							case "Radar":
								;
							case "RadarArea":
								;
							case "DropBar":
								;
							case "Intl":
								;
							case "CoordList":
								;
							case "SerAuxErrBar":
								break;
							case "BIFF2FONTCLR":
								;
							case "BIFF2FMTCNT":
								;
							case "BIFF2FONTXTRA":
								break;
							case "BIFF2XF":
								;
							case "BIFF3XF":
								;
							case "BIFF4XF":
								break;
							case "BIFF4FMTCNT":
								;
							case "BIFF2ROW":
								;
							case "BIFF2WINDOW2":
								break;
							case "SCENARIO":
								;
							case "DConBin":
								;
							case "PicF":
								;
							case "DataLabExt":
								;
							case "Lel":
								;
							case "BopPop":
								;
							case "BopPopCustom":
								;
							case "RealTimeData":
								;
							case "Name":
								break;
							case "LHNGraph":
								;
							case "FnGroupName":
								;
							case "AddMenu":
								;
							case "LPr":
								break;
							case "ListObj":
								;
							case "ListField":
								break;
							case "RRSort":
								break;
							case "BigName":
								break;
							case "ToolbarHdr":
								;
							case "ToolbarEnd":
								break;
							case "DDEObjName":
								break;
							case "FRTArchId$":
								break;
							default:
								if (r.WTF) throw "Unrecognized Record " + q.n
							}
						}
					}
				}
			} else e.l += J
		}
		t.SheetNames = G(i).sort(function (e, r) {
			return Number(e) - Number(r)
		}).map(function (e) {
			return i[e].name
		});
		if (!r.bookSheets) t.Sheets = n;
		if (t.Sheets) K.forEach(function (e, r) {
			t.Sheets[t.SheetNames[r]]["!autofilter"] = e
		});
		t.Preamble = u;
		t.Strings = f;
		t.SSF = I.get_table();
		if (D.enc) t.Encryption = D.enc;
		if (F) t.Themes = F;
		t.Metadata = {};
		if (S !== undefined) t.Metadata.Country = S;
		if (H.names.length > 0) R.Names = H.names;
		t.Workbook = R;
		return t
	}
	var iv = {
		SI: "e0859ff2f94f6810ab9108002b27b3d9",
		DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
		UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
	};

	function sv(e, r, t) {
		var n = U.find(e, "!DocumentSummaryInformation");
		if (n && n.size > 0) try {
			var a = Da(n, pn, iv.DSI);
			for (var i in a) r[i] = a[i]
		} catch (e) {
			if (t.WTF) throw e
		}
		var s = U.find(e, "!SummaryInformation");
		if (s && s.size > 0) try {
			var o = Da(s, vn, iv.SI);
			for (var l in o)
				if (r[l] == null) r[l] = o[l]
		} catch (e) {
			if (t.WTF) throw e
		}
		if (r.HeadingPairs && r.TitlesOfParts) {
			Jn(r.HeadingPairs, r.TitlesOfParts, r, t);
			delete r.HeadingPairs;
			delete r.TitlesOfParts
		}
	}

	function ov(e, r) {
		var t = [],
			n = [],
			a = [];
		var i = 0,
			s;
		if (e.Props) {
			s = G(e.Props);
			for (i = 0; i < s.length; ++i)(mn.hasOwnProperty(s[i]) ? t : bn.hasOwnProperty(s[i]) ? n : a).push([s[i], e.Props[s[i]]])
		}
		if (e.Custprops) {
			s = G(e.Custprops);
			for (i = 0; i < s.length; ++i)
				if (!(e.Props || {}).hasOwnProperty(s[i]))(mn.hasOwnProperty(s[i]) ? t : bn.hasOwnProperty(s[i]) ? n : a).push([s[i], e.Custprops[s[i]]])
		}
		var o = [];
		for (i = 0; i < a.length; ++i) {
			if (ya.indexOf(a[i][0]) > -1) continue;
			if (a[i][1] == null) continue;
			o.push(a[i])
		}
		if (n.length) U.utils.cfb_add(r, "/SummaryInformation", Fa(n, iv.SI, bn, vn));
		if (t.length || o.length) U.utils.cfb_add(r, "/DocumentSummaryInformation", Fa(t, iv.DSI, mn, pn, o.length ? o : null, iv.UDI))
	}

	function lv(e, r) {
		if (!r) r = {};
		eg(r);
		f();
		if (r.codepage) s(r.codepage);
		var t, n;
		if (e.FullPaths) {
			if (U.find(e, "/encryption")) throw new Error("File is password-protected");
			t = U.find(e, "!CompObj");
			n = U.find(e, "/Workbook") || U.find(e, "/Book")
		} else {
			switch (r.type) {
			case "base64":
				e = w(m.decode(e));
				break;
			case "binary":
				e = w(e);
				break;
			case "buffer":
				break;
			case "array":
				if (!Array.isArray(e)) e = Array.prototype.slice.call(e);
				break
			}
			Vr(e, 0);
			n = {
				content: e
			}
		}
		var a;
		var i;
		if (t) ev(t);
		if (r.bookProps && !r.bookSheets) a = {};
		else {
			var o = b ? "buffer" : "array";
			if (n && n.content) a = av(n.content, r);
			else if ((i = U.find(e, "PerfectOffice_MAIN")) && i.content) a = ao.to_workbook(i.content, (r.type = o, r));
			else if ((i = U.find(e, "NativeContent_MAIN")) && i.content) a = ao.to_workbook(i.content, (r.type = o, r));
			else throw new Error("Cannot find Workbook stream");
			if (r.bookVBA && e.FullPaths && U.find(e, "/_VBA_PROJECT_CUR/VBA/dir")) a.vbaraw = Nf(e)
		}
		var l = {};
		if (e.FullPaths) sv(e, l, r);
		a.Props = a.Custprops = l;
		if (r.bookFiles) a.cfb = e;
		return a
	}

	function fv(e, r) {
		var t = r || {};
		var n = U.utils.cfb_new({
			root: "R"
		});
		var a = "/Workbook";
		switch (t.bookType || "xls") {
		case "xls":
			t.bookType = "biff8";
		case "xla":
			if (!t.bookType) t.bookType = "xla";
		case "biff8":
			a = "/Workbook";
			t.biff = 8;
			break;
		case "biff5":
			a = "/Book";
			t.biff = 5;
			break;
		default:
			throw new Error("invalid type " + t.bookType + " for XLS CFB")
		}
		U.utils.cfb_add(n, a, xv(e, t));
		if (t.biff == 8 && (e.Props || e.Custprops)) ov(e, n);
		if (t.biff == 8 && e.vbaraw) Lf(n, U.read(e.vbaraw, {
			type: typeof e.vbaraw == "string" ? "binary" : "buffer"
		}));
		return n
	}
	var cv = {
		0: {
			n: "BrtRowHdr",
			f: Th
		},
		1: {
			n: "BrtCellBlank",
			f: Nh
		},
		2: {
			n: "BrtCellRk",
			f: Gh
		},
		3: {
			n: "BrtCellError",
			f: Uh
		},
		4: {
			n: "BrtCellBool",
			f: Mh
		},
		5: {
			n: "BrtCellReal",
			f: zh
		},
		6: {
			n: "BrtCellSt",
			f: Kh
		},
		7: {
			n: "BrtCellIsst",
			f: Hh
		},
		8: {
			n: "BrtFmlaString",
			f: Jh
		},
		9: {
			n: "BrtFmlaNum",
			f: Qh
		},
		10: {
			n: "BrtFmlaBool",
			f: $h
		},
		11: {
			n: "BrtFmlaError",
			f: Zh
		},
		16: {
			n: "BrtFRTArchID$",
			f: rp
		},
		19: {
			n: "BrtSSTItem",
			f: At
		},
		20: {
			n: "BrtPCDIMissing"
		},
		21: {
			n: "BrtPCDINumber"
		},
		22: {
			n: "BrtPCDIBoolean"
		},
		23: {
			n: "BrtPCDIError"
		},
		24: {
			n: "BrtPCDIString"
		},
		25: {
			n: "BrtPCDIDatetime"
		},
		26: {
			n: "BrtPCDIIndex"
		},
		27: {
			n: "BrtPCDIAMissing"
		},
		28: {
			n: "BrtPCDIANumber"
		},
		29: {
			n: "BrtPCDIABoolean"
		},
		30: {
			n: "BrtPCDIAError"
		},
		31: {
			n: "BrtPCDIAString"
		},
		32: {
			n: "BrtPCDIADatetime"
		},
		33: {
			n: "BrtPCRRecord"
		},
		34: {
			n: "BrtPCRRecordDt"
		},
		35: {
			n: "BrtFRTBegin"
		},
		36: {
			n: "BrtFRTEnd"
		},
		37: {
			n: "BrtACBegin"
		},
		38: {
			n: "BrtACEnd"
		},
		39: {
			n: "BrtName",
			f: tp
		},
		40: {
			n: "BrtIndexRowBlock"
		},
		42: {
			n: "BrtIndexBlock"
		},
		43: {
			n: "BrtFont",
			f: Rl
		},
		44: {
			n: "BrtFmt",
			f: Al
		},
		45: {
			n: "BrtFill",
			f: xl
		},
		46: {
			n: "BrtBorder",
			f: Pl
		},
		47: {
			n: "BrtXF",
			f: Dl
		},
		48: {
			n: "BrtStyle"
		},
		49: {
			n: "BrtCellMeta"
		},
		50: {
			n: "BrtValueMeta"
		},
		51: {
			n: "BrtMdb"
		},
		52: {
			n: "BrtBeginFmd"
		},
		53: {
			n: "BrtEndFmd"
		},
		54: {
			n: "BrtBeginMdx"
		},
		55: {
			n: "BrtEndMdx"
		},
		56: {
			n: "BrtBeginMdxTuple"
		},
		57: {
			n: "BrtEndMdxTuple"
		},
		58: {
			n: "BrtMdxMbrIstr"
		},
		59: {
			n: "BrtStr"
		},
		60: {
			n: "BrtColInfo",
			f: Ns
		},
		62: {
			n: "BrtCellRString"
		},
		63: {
			n: "BrtCalcChainItem$",
			f: mf
		},
		64: {
			n: "BrtDVal"
		},
		65: {
			n: "BrtSxvcellNum"
		},
		66: {
			n: "BrtSxvcellStr"
		},
		67: {
			n: "BrtSxvcellBool"
		},
		68: {
			n: "BrtSxvcellErr"
		},
		69: {
			n: "BrtSxvcellDate"
		},
		70: {
			n: "BrtSxvcellNil"
		},
		128: {
			n: "BrtFileVersion"
		},
		129: {
			n: "BrtBeginSheet"
		},
		130: {
			n: "BrtEndSheet"
		},
		131: {
			n: "BrtBeginBook",
			f: zr,
			p: 0
		},
		132: {
			n: "BrtEndBook"
		},
		133: {
			n: "BrtBeginWsViews"
		},
		134: {
			n: "BrtEndWsViews"
		},
		135: {
			n: "BrtBeginBookViews"
		},
		136: {
			n: "BrtEndBookViews"
		},
		137: {
			n: "BrtBeginWsView",
			f: cd
		},
		138: {
			n: "BrtEndWsView"
		},
		139: {
			n: "BrtBeginCsViews"
		},
		140: {
			n: "BrtEndCsViews"
		},
		141: {
			n: "BrtBeginCsView"
		},
		142: {
			n: "BrtEndCsView"
		},
		143: {
			n: "BrtBeginBundleShs"
		},
		144: {
			n: "BrtEndBundleShs"
		},
		145: {
			n: "BrtBeginSheetData"
		},
		146: {
			n: "BrtEndSheetData"
		},
		147: {
			n: "BrtWsProp",
			f: Oh
		},
		148: {
			n: "BrtWsDim",
			f: Ih,
			p: 16
		},
		151: {
			n: "BrtPane"
		},
		152: {
			n: "BrtSel"
		},
		153: {
			n: "BrtWbProp",
			f: qd
		},
		154: {
			n: "BrtWbFactoid"
		},
		155: {
			n: "BrtFileRecover"
		},
		156: {
			n: "BrtBundleSh",
			f: Qd
		},
		157: {
			n: "BrtCalcProp"
		},
		158: {
			n: "BrtBookView"
		},
		159: {
			n: "BrtBeginSst",
			f: mo
		},
		160: {
			n: "BrtEndSst"
		},
		161: {
			n: "BrtBeginAFilter",
			f: Ht
		},
		162: {
			n: "BrtEndAFilter"
		},
		163: {
			n: "BrtBeginFilterColumn"
		},
		164: {
			n: "BrtEndFilterColumn"
		},
		165: {
			n: "BrtBeginFilters"
		},
		166: {
			n: "BrtEndFilters"
		},
		167: {
			n: "BrtFilter"
		},
		168: {
			n: "BrtColorFilter"
		},
		169: {
			n: "BrtIconFilter"
		},
		170: {
			n: "BrtTop10Filter"
		},
		171: {
			n: "BrtDynamicFilter"
		},
		172: {
			n: "BrtBeginCustomFilters"
		},
		173: {
			n: "BrtEndCustomFilters"
		},
		174: {
			n: "BrtCustomFilter"
		},
		175: {
			n: "BrtAFilterDateGroupItem"
		},
		176: {
			n: "BrtMergeCell",
			f: qh
		},
		177: {
			n: "BrtBeginMergeCells"
		},
		178: {
			n: "BrtEndMergeCells"
		},
		179: {
			n: "BrtBeginPivotCacheDef"
		},
		180: {
			n: "BrtEndPivotCacheDef"
		},
		181: {
			n: "BrtBeginPCDFields"
		},
		182: {
			n: "BrtEndPCDFields"
		},
		183: {
			n: "BrtBeginPCDField"
		},
		184: {
			n: "BrtEndPCDField"
		},
		185: {
			n: "BrtBeginPCDSource"
		},
		186: {
			n: "BrtEndPCDSource"
		},
		187: {
			n: "BrtBeginPCDSRange"
		},
		188: {
			n: "BrtEndPCDSRange"
		},
		189: {
			n: "BrtBeginPCDFAtbl"
		},
		190: {
			n: "BrtEndPCDFAtbl"
		},
		191: {
			n: "BrtBeginPCDIRun"
		},
		192: {
			n: "BrtEndPCDIRun"
		},
		193: {
			n: "BrtBeginPivotCacheRecords"
		},
		194: {
			n: "BrtEndPivotCacheRecords"
		},
		195: {
			n: "BrtBeginPCDHierarchies"
		},
		196: {
			n: "BrtEndPCDHierarchies"
		},
		197: {
			n: "BrtBeginPCDHierarchy"
		},
		198: {
			n: "BrtEndPCDHierarchy"
		},
		199: {
			n: "BrtBeginPCDHFieldsUsage"
		},
		200: {
			n: "BrtEndPCDHFieldsUsage"
		},
		201: {
			n: "BrtBeginExtConnection"
		},
		202: {
			n: "BrtEndExtConnection"
		},
		203: {
			n: "BrtBeginECDbProps"
		},
		204: {
			n: "BrtEndECDbProps"
		},
		205: {
			n: "BrtBeginECOlapProps"
		},
		206: {
			n: "BrtEndECOlapProps"
		},
		207: {
			n: "BrtBeginPCDSConsol"
		},
		208: {
			n: "BrtEndPCDSConsol"
		},
		209: {
			n: "BrtBeginPCDSCPages"
		},
		210: {
			n: "BrtEndPCDSCPages"
		},
		211: {
			n: "BrtBeginPCDSCPage"
		},
		212: {
			n: "BrtEndPCDSCPage"
		},
		213: {
			n: "BrtBeginPCDSCPItem"
		},
		214: {
			n: "BrtEndPCDSCPItem"
		},
		215: {
			n: "BrtBeginPCDSCSets"
		},
		216: {
			n: "BrtEndPCDSCSets"
		},
		217: {
			n: "BrtBeginPCDSCSet"
		},
		218: {
			n: "BrtEndPCDSCSet"
		},
		219: {
			n: "BrtBeginPCDFGroup"
		},
		220: {
			n: "BrtEndPCDFGroup"
		},
		221: {
			n: "BrtBeginPCDFGItems"
		},
		222: {
			n: "BrtEndPCDFGItems"
		},
		223: {
			n: "BrtBeginPCDFGRange"
		},
		224: {
			n: "BrtEndPCDFGRange"
		},
		225: {
			n: "BrtBeginPCDFGDiscrete"
		},
		226: {
			n: "BrtEndPCDFGDiscrete"
		},
		227: {
			n: "BrtBeginPCDSDTupleCache"
		},
		228: {
			n: "BrtEndPCDSDTupleCache"
		},
		229: {
			n: "BrtBeginPCDSDTCEntries"
		},
		230: {
			n: "BrtEndPCDSDTCEntries"
		},
		231: {
			n: "BrtBeginPCDSDTCEMembers"
		},
		232: {
			n: "BrtEndPCDSDTCEMembers"
		},
		233: {
			n: "BrtBeginPCDSDTCEMember"
		},
		234: {
			n: "BrtEndPCDSDTCEMember"
		},
		235: {
			n: "BrtBeginPCDSDTCQueries"
		},
		236: {
			n: "BrtEndPCDSDTCQueries"
		},
		237: {
			n: "BrtBeginPCDSDTCQuery"
		},
		238: {
			n: "BrtEndPCDSDTCQuery"
		},
		239: {
			n: "BrtBeginPCDSDTCSets"
		},
		240: {
			n: "BrtEndPCDSDTCSets"
		},
		241: {
			n: "BrtBeginPCDSDTCSet"
		},
		242: {
			n: "BrtEndPCDSDTCSet"
		},
		243: {
			n: "BrtBeginPCDCalcItems"
		},
		244: {
			n: "BrtEndPCDCalcItems"
		},
		245: {
			n: "BrtBeginPCDCalcItem"
		},
		246: {
			n: "BrtEndPCDCalcItem"
		},
		247: {
			n: "BrtBeginPRule"
		},
		248: {
			n: "BrtEndPRule"
		},
		249: {
			n: "BrtBeginPRFilters"
		},
		250: {
			n: "BrtEndPRFilters"
		},
		251: {
			n: "BrtBeginPRFilter"
		},
		252: {
			n: "BrtEndPRFilter"
		},
		253: {
			n: "BrtBeginPNames"
		},
		254: {
			n: "BrtEndPNames"
		},
		255: {
			n: "BrtBeginPName"
		},
		256: {
			n: "BrtEndPName"
		},
		257: {
			n: "BrtBeginPNPairs"
		},
		258: {
			n: "BrtEndPNPairs"
		},
		259: {
			n: "BrtBeginPNPair"
		},
		260: {
			n: "BrtEndPNPair"
		},
		261: {
			n: "BrtBeginECWebProps"
		},
		262: {
			n: "BrtEndECWebProps"
		},
		263: {
			n: "BrtBeginEcWpTables"
		},
		264: {
			n: "BrtEndECWPTables"
		},
		265: {
			n: "BrtBeginECParams"
		},
		266: {
			n: "BrtEndECParams"
		},
		267: {
			n: "BrtBeginECParam"
		},
		268: {
			n: "BrtEndECParam"
		},
		269: {
			n: "BrtBeginPCDKPIs"
		},
		270: {
			n: "BrtEndPCDKPIs"
		},
		271: {
			n: "BrtBeginPCDKPI"
		},
		272: {
			n: "BrtEndPCDKPI"
		},
		273: {
			n: "BrtBeginDims"
		},
		274: {
			n: "BrtEndDims"
		},
		275: {
			n: "BrtBeginDim"
		},
		276: {
			n: "BrtEndDim"
		},
		277: {
			n: "BrtIndexPartEnd"
		},
		278: {
			n: "BrtBeginStyleSheet"
		},
		279: {
			n: "BrtEndStyleSheet"
		},
		280: {
			n: "BrtBeginSXView"
		},
		281: {
			n: "BrtEndSXVI"
		},
		282: {
			n: "BrtBeginSXVI"
		},
		283: {
			n: "BrtBeginSXVIs"
		},
		284: {
			n: "BrtEndSXVIs"
		},
		285: {
			n: "BrtBeginSXVD"
		},
		286: {
			n: "BrtEndSXVD"
		},
		287: {
			n: "BrtBeginSXVDs"
		},
		288: {
			n: "BrtEndSXVDs"
		},
		289: {
			n: "BrtBeginSXPI"
		},
		290: {
			n: "BrtEndSXPI"
		},
		291: {
			n: "BrtBeginSXPIs"
		},
		292: {
			n: "BrtEndSXPIs"
		},
		293: {
			n: "BrtBeginSXDI"
		},
		294: {
			n: "BrtEndSXDI"
		},
		295: {
			n: "BrtBeginSXDIs"
		},
		296: {
			n: "BrtEndSXDIs"
		},
		297: {
			n: "BrtBeginSXLI"
		},
		298: {
			n: "BrtEndSXLI"
		},
		299: {
			n: "BrtBeginSXLIRws"
		},
		300: {
			n: "BrtEndSXLIRws"
		},
		301: {
			n: "BrtBeginSXLICols"
		},
		302: {
			n: "BrtEndSXLICols"
		},
		303: {
			n: "BrtBeginSXFormat"
		},
		304: {
			n: "BrtEndSXFormat"
		},
		305: {
			n: "BrtBeginSXFormats"
		},
		306: {
			n: "BrtEndSxFormats"
		},
		307: {
			n: "BrtBeginSxSelect"
		},
		308: {
			n: "BrtEndSxSelect"
		},
		309: {
			n: "BrtBeginISXVDRws"
		},
		310: {
			n: "BrtEndISXVDRws"
		},
		311: {
			n: "BrtBeginISXVDCols"
		},
		312: {
			n: "BrtEndISXVDCols"
		},
		313: {
			n: "BrtEndSXLocation"
		},
		314: {
			n: "BrtBeginSXLocation"
		},
		315: {
			n: "BrtEndSXView"
		},
		316: {
			n: "BrtBeginSXTHs"
		},
		317: {
			n: "BrtEndSXTHs"
		},
		318: {
			n: "BrtBeginSXTH"
		},
		319: {
			n: "BrtEndSXTH"
		},
		320: {
			n: "BrtBeginISXTHRws"
		},
		321: {
			n: "BrtEndISXTHRws"
		},
		322: {
			n: "BrtBeginISXTHCols"
		},
		323: {
			n: "BrtEndISXTHCols"
		},
		324: {
			n: "BrtBeginSXTDMPS"
		},
		325: {
			n: "BrtEndSXTDMPs"
		},
		326: {
			n: "BrtBeginSXTDMP"
		},
		327: {
			n: "BrtEndSXTDMP"
		},
		328: {
			n: "BrtBeginSXTHItems"
		},
		329: {
			n: "BrtEndSXTHItems"
		},
		330: {
			n: "BrtBeginSXTHItem"
		},
		331: {
			n: "BrtEndSXTHItem"
		},
		332: {
			n: "BrtBeginMetadata"
		},
		333: {
			n: "BrtEndMetadata"
		},
		334: {
			n: "BrtBeginEsmdtinfo"
		},
		335: {
			n: "BrtMdtinfo"
		},
		336: {
			n: "BrtEndEsmdtinfo"
		},
		337: {
			n: "BrtBeginEsmdb"
		},
		338: {
			n: "BrtEndEsmdb"
		},
		339: {
			n: "BrtBeginEsfmd"
		},
		340: {
			n: "BrtEndEsfmd"
		},
		341: {
			n: "BrtBeginSingleCells"
		},
		342: {
			n: "BrtEndSingleCells"
		},
		343: {
			n: "BrtBeginList"
		},
		344: {
			n: "BrtEndList"
		},
		345: {
			n: "BrtBeginListCols"
		},
		346: {
			n: "BrtEndListCols"
		},
		347: {
			n: "BrtBeginListCol"
		},
		348: {
			n: "BrtEndListCol"
		},
		349: {
			n: "BrtBeginListXmlCPr"
		},
		350: {
			n: "BrtEndListXmlCPr"
		},
		351: {
			n: "BrtListCCFmla"
		},
		352: {
			n: "BrtListTrFmla"
		},
		353: {
			n: "BrtBeginExternals"
		},
		354: {
			n: "BrtEndExternals"
		},
		355: {
			n: "BrtSupBookSrc",
			f: Pt
		},
		357: {
			n: "BrtSupSelf"
		},
		358: {
			n: "BrtSupSame"
		},
		359: {
			n: "BrtSupTabs"
		},
		360: {
			n: "BrtBeginSupBook"
		},
		361: {
			n: "BrtPlaceholderName"
		},
		362: {
			n: "BrtExternSheet",
			f: ds
		},
		363: {
			n: "BrtExternTableStart"
		},
		364: {
			n: "BrtExternTableEnd"
		},
		366: {
			n: "BrtExternRowHdr"
		},
		367: {
			n: "BrtExternCellBlank"
		},
		368: {
			n: "BrtExternCellReal"
		},
		369: {
			n: "BrtExternCellBool"
		},
		370: {
			n: "BrtExternCellError"
		},
		371: {
			n: "BrtExternCellString"
		},
		372: {
			n: "BrtBeginEsmdx"
		},
		373: {
			n: "BrtEndEsmdx"
		},
		374: {
			n: "BrtBeginMdxSet"
		},
		375: {
			n: "BrtEndMdxSet"
		},
		376: {
			n: "BrtBeginMdxMbrProp"
		},
		377: {
			n: "BrtEndMdxMbrProp"
		},
		378: {
			n: "BrtBeginMdxKPI"
		},
		379: {
			n: "BrtEndMdxKPI"
		},
		380: {
			n: "BrtBeginEsstr"
		},
		381: {
			n: "BrtEndEsstr"
		},
		382: {
			n: "BrtBeginPRFItem"
		},
		383: {
			n: "BrtEndPRFItem"
		},
		384: {
			n: "BrtBeginPivotCacheIDs"
		},
		385: {
			n: "BrtEndPivotCacheIDs"
		},
		386: {
			n: "BrtBeginPivotCacheID"
		},
		387: {
			n: "BrtEndPivotCacheID"
		},
		388: {
			n: "BrtBeginISXVIs"
		},
		389: {
			n: "BrtEndISXVIs"
		},
		390: {
			n: "BrtBeginColInfos"
		},
		391: {
			n: "BrtEndColInfos"
		},
		392: {
			n: "BrtBeginRwBrk"
		},
		393: {
			n: "BrtEndRwBrk"
		},
		394: {
			n: "BrtBeginColBrk"
		},
		395: {
			n: "BrtEndColBrk"
		},
		396: {
			n: "BrtBrk"
		},
		397: {
			n: "BrtUserBookView"
		},
		398: {
			n: "BrtInfo"
		},
		399: {
			n: "BrtCUsr"
		},
		400: {
			n: "BrtUsr"
		},
		401: {
			n: "BrtBeginUsers"
		},
		403: {
			n: "BrtEOF"
		},
		404: {
			n: "BrtUCR"
		},
		405: {
			n: "BrtRRInsDel"
		},
		406: {
			n: "BrtRREndInsDel"
		},
		407: {
			n: "BrtRRMove"
		},
		408: {
			n: "BrtRREndMove"
		},
		409: {
			n: "BrtRRChgCell"
		},
		410: {
			n: "BrtRREndChgCell"
		},
		411: {
			n: "BrtRRHeader"
		},
		412: {
			n: "BrtRRUserView"
		},
		413: {
			n: "BrtRRRenSheet"
		},
		414: {
			n: "BrtRRInsertSh"
		},
		415: {
			n: "BrtRRDefName"
		},
		416: {
			n: "BrtRRNote"
		},
		417: {
			n: "BrtRRConflict"
		},
		418: {
			n: "BrtRRTQSIF"
		},
		419: {
			n: "BrtRRFormat"
		},
		420: {
			n: "BrtRREndFormat"
		},
		421: {
			n: "BrtRRAutoFmt"
		},
		422: {
			n: "BrtBeginUserShViews"
		},
		423: {
			n: "BrtBeginUserShView"
		},
		424: {
			n: "BrtEndUserShView"
		},
		425: {
			n: "BrtEndUserShViews"
		},
		426: {
			n: "BrtArrFmla",
			f: ad
		},
		427: {
			n: "BrtShrFmla",
			f: id
		},
		428: {
			n: "BrtTable"
		},
		429: {
			n: "BrtBeginExtConnections"
		},
		430: {
			n: "BrtEndExtConnections"
		},
		431: {
			n: "BrtBeginPCDCalcMems"
		},
		432: {
			n: "BrtEndPCDCalcMems"
		},
		433: {
			n: "BrtBeginPCDCalcMem"
		},
		434: {
			n: "BrtEndPCDCalcMem"
		},
		435: {
			n: "BrtBeginPCDHGLevels"
		},
		436: {
			n: "BrtEndPCDHGLevels"
		},
		437: {
			n: "BrtBeginPCDHGLevel"
		},
		438: {
			n: "BrtEndPCDHGLevel"
		},
		439: {
			n: "BrtBeginPCDHGLGroups"
		},
		440: {
			n: "BrtEndPCDHGLGroups"
		},
		441: {
			n: "BrtBeginPCDHGLGroup"
		},
		442: {
			n: "BrtEndPCDHGLGroup"
		},
		443: {
			n: "BrtBeginPCDHGLGMembers"
		},
		444: {
			n: "BrtEndPCDHGLGMembers"
		},
		445: {
			n: "BrtBeginPCDHGLGMember"
		},
		446: {
			n: "BrtEndPCDHGLGMember"
		},
		447: {
			n: "BrtBeginQSI"
		},
		448: {
			n: "BrtEndQSI"
		},
		449: {
			n: "BrtBeginQSIR"
		},
		450: {
			n: "BrtEndQSIR"
		},
		451: {
			n: "BrtBeginDeletedNames"
		},
		452: {
			n: "BrtEndDeletedNames"
		},
		453: {
			n: "BrtBeginDeletedName"
		},
		454: {
			n: "BrtEndDeletedName"
		},
		455: {
			n: "BrtBeginQSIFs"
		},
		456: {
			n: "BrtEndQSIFs"
		},
		457: {
			n: "BrtBeginQSIF"
		},
		458: {
			n: "BrtEndQSIF"
		},
		459: {
			n: "BrtBeginAutoSortScope"
		},
		460: {
			n: "BrtEndAutoSortScope"
		},
		461: {
			n: "BrtBeginConditionalFormatting"
		},
		462: {
			n: "BrtEndConditionalFormatting"
		},
		463: {
			n: "BrtBeginCFRule"
		},
		464: {
			n: "BrtEndCFRule"
		},
		465: {
			n: "BrtBeginIconSet"
		},
		466: {
			n: "BrtEndIconSet"
		},
		467: {
			n: "BrtBeginDatabar"
		},
		468: {
			n: "BrtEndDatabar"
		},
		469: {
			n: "BrtBeginColorScale"
		},
		470: {
			n: "BrtEndColorScale"
		},
		471: {
			n: "BrtCFVO"
		},
		472: {
			n: "BrtExternValueMeta"
		},
		473: {
			n: "BrtBeginColorPalette"
		},
		474: {
			n: "BrtEndColorPalette"
		},
		475: {
			n: "BrtIndexedColor"
		},
		476: {
			n: "BrtMargins",
			f: ld
		},
		477: {
			n: "BrtPrintOptions"
		},
		478: {
			n: "BrtPageSetup"
		},
		479: {
			n: "BrtBeginHeaderFooter"
		},
		480: {
			n: "BrtEndHeaderFooter"
		},
		481: {
			n: "BrtBeginSXCrtFormat"
		},
		482: {
			n: "BrtEndSXCrtFormat"
		},
		483: {
			n: "BrtBeginSXCrtFormats"
		},
		484: {
			n: "BrtEndSXCrtFormats"
		},
		485: {
			n: "BrtWsFmtInfo",
			f: Fh
		},
		486: {
			n: "BrtBeginMgs"
		},
		487: {
			n: "BrtEndMGs"
		},
		488: {
			n: "BrtBeginMGMaps"
		},
		489: {
			n: "BrtEndMGMaps"
		},
		490: {
			n: "BrtBeginMG"
		},
		491: {
			n: "BrtEndMG"
		},
		492: {
			n: "BrtBeginMap"
		},
		493: {
			n: "BrtEndMap"
		},
		494: {
			n: "BrtHLink",
			f: td
		},
		495: {
			n: "BrtBeginDCon"
		},
		496: {
			n: "BrtEndDCon"
		},
		497: {
			n: "BrtBeginDRefs"
		},
		498: {
			n: "BrtEndDRefs"
		},
		499: {
			n: "BrtDRef"
		},
		500: {
			n: "BrtBeginScenMan"
		},
		501: {
			n: "BrtEndScenMan"
		},
		502: {
			n: "BrtBeginSct"
		},
		503: {
			n: "BrtEndSct"
		},
		504: {
			n: "BrtSlc"
		},
		505: {
			n: "BrtBeginDXFs"
		},
		506: {
			n: "BrtEndDXFs"
		},
		507: {
			n: "BrtDXF"
		},
		508: {
			n: "BrtBeginTableStyles"
		},
		509: {
			n: "BrtEndTableStyles"
		},
		510: {
			n: "BrtBeginTableStyle"
		},
		511: {
			n: "BrtEndTableStyle"
		},
		512: {
			n: "BrtTableStyleElement"
		},
		513: {
			n: "BrtTableStyleClient"
		},
		514: {
			n: "BrtBeginVolDeps"
		},
		515: {
			n: "BrtEndVolDeps"
		},
		516: {
			n: "BrtBeginVolType"
		},
		517: {
			n: "BrtEndVolType"
		},
		518: {
			n: "BrtBeginVolMain"
		},
		519: {
			n: "BrtEndVolMain"
		},
		520: {
			n: "BrtBeginVolTopic"
		},
		521: {
			n: "BrtEndVolTopic"
		},
		522: {
			n: "BrtVolSubtopic"
		},
		523: {
			n: "BrtVolRef"
		},
		524: {
			n: "BrtVolNum"
		},
		525: {
			n: "BrtVolErr"
		},
		526: {
			n: "BrtVolStr"
		},
		527: {
			n: "BrtVolBool"
		},
		528: {
			n: "BrtBeginCalcChain$"
		},
		529: {
			n: "BrtEndCalcChain$"
		},
		530: {
			n: "BrtBeginSortState"
		},
		531: {
			n: "BrtEndSortState"
		},
		532: {
			n: "BrtBeginSortCond"
		},
		533: {
			n: "BrtEndSortCond"
		},
		534: {
			n: "BrtBookProtection"
		},
		535: {
			n: "BrtSheetProtection"
		},
		536: {
			n: "BrtRangeProtection"
		},
		537: {
			n: "BrtPhoneticInfo"
		},
		538: {
			n: "BrtBeginECTxtWiz"
		},
		539: {
			n: "BrtEndECTxtWiz"
		},
		540: {
			n: "BrtBeginECTWFldInfoLst"
		},
		541: {
			n: "BrtEndECTWFldInfoLst"
		},
		542: {
			n: "BrtBeginECTwFldInfo"
		},
		548: {
			n: "BrtFileSharing"
		},
		549: {
			n: "BrtOleSize"
		},
		550: {
			n: "BrtDrawing",
			f: Pt
		},
		551: {
			n: "BrtLegacyDrawing"
		},
		552: {
			n: "BrtLegacyDrawingHF"
		},
		553: {
			n: "BrtWebOpt"
		},
		554: {
			n: "BrtBeginWebPubItems"
		},
		555: {
			n: "BrtEndWebPubItems"
		},
		556: {
			n: "BrtBeginWebPubItem"
		},
		557: {
			n: "BrtEndWebPubItem"
		},
		558: {
			n: "BrtBeginSXCondFmt"
		},
		559: {
			n: "BrtEndSXCondFmt"
		},
		560: {
			n: "BrtBeginSXCondFmts"
		},
		561: {
			n: "BrtEndSXCondFmts"
		},
		562: {
			n: "BrtBkHim"
		},
		564: {
			n: "BrtColor"
		},
		565: {
			n: "BrtBeginIndexedColors"
		},
		566: {
			n: "BrtEndIndexedColors"
		},
		569: {
			n: "BrtBeginMRUColors"
		},
		570: {
			n: "BrtEndMRUColors"
		},
		572: {
			n: "BrtMRUColor"
		},
		573: {
			n: "BrtBeginDVals"
		},
		574: {
			n: "BrtEndDVals"
		},
		577: {
			n: "BrtSupNameStart"
		},
		578: {
			n: "BrtSupNameValueStart"
		},
		579: {
			n: "BrtSupNameValueEnd"
		},
		580: {
			n: "BrtSupNameNum"
		},
		581: {
			n: "BrtSupNameErr"
		},
		582: {
			n: "BrtSupNameSt"
		},
		583: {
			n: "BrtSupNameNil"
		},
		584: {
			n: "BrtSupNameBool"
		},
		585: {
			n: "BrtSupNameFmla"
		},
		586: {
			n: "BrtSupNameBits"
		},
		587: {
			n: "BrtSupNameEnd"
		},
		588: {
			n: "BrtEndSupBook"
		},
		589: {
			n: "BrtCellSmartTagProperty"
		},
		590: {
			n: "BrtBeginCellSmartTag"
		},
		591: {
			n: "BrtEndCellSmartTag"
		},
		592: {
			n: "BrtBeginCellSmartTags"
		},
		593: {
			n: "BrtEndCellSmartTags"
		},
		594: {
			n: "BrtBeginSmartTags"
		},
		595: {
			n: "BrtEndSmartTags"
		},
		596: {
			n: "BrtSmartTagType"
		},
		597: {
			n: "BrtBeginSmartTagTypes"
		},
		598: {
			n: "BrtEndSmartTagTypes"
		},
		599: {
			n: "BrtBeginSXFilters"
		},
		600: {
			n: "BrtEndSXFilters"
		},
		601: {
			n: "BrtBeginSXFILTER"
		},
		602: {
			n: "BrtEndSXFilter"
		},
		603: {
			n: "BrtBeginFills"
		},
		604: {
			n: "BrtEndFills"
		},
		605: {
			n: "BrtBeginCellWatches"
		},
		606: {
			n: "BrtEndCellWatches"
		},
		607: {
			n: "BrtCellWatch"
		},
		608: {
			n: "BrtBeginCRErrs"
		},
		609: {
			n: "BrtEndCRErrs"
		},
		610: {
			n: "BrtCrashRecErr"
		},
		611: {
			n: "BrtBeginFonts"
		},
		612: {
			n: "BrtEndFonts"
		},
		613: {
			n: "BrtBeginBorders"
		},
		614: {
			n: "BrtEndBorders"
		},
		615: {
			n: "BrtBeginFmts"
		},
		616: {
			n: "BrtEndFmts"
		},
		617: {
			n: "BrtBeginCellXFs"
		},
		618: {
			n: "BrtEndCellXFs"
		},
		619: {
			n: "BrtBeginStyles"
		},
		620: {
			n: "BrtEndStyles"
		},
		625: {
			n: "BrtBigName"
		},
		626: {
			n: "BrtBeginCellStyleXFs"
		},
		627: {
			n: "BrtEndCellStyleXFs"
		},
		628: {
			n: "BrtBeginComments"
		},
		629: {
			n: "BrtEndComments"
		},
		630: {
			n: "BrtBeginCommentAuthors"
		},
		631: {
			n: "BrtEndCommentAuthors"
		},
		632: {
			n: "BrtCommentAuthor",
			f: If
		},
		633: {
			n: "BrtBeginCommentList"
		},
		634: {
			n: "BrtEndCommentList"
		},
		635: {
			n: "BrtBeginComment",
			f: yf
		},
		636: {
			n: "BrtEndComment"
		},
		637: {
			n: "BrtCommentText",
			f: Rt
		},
		638: {
			n: "BrtBeginOleObjects"
		},
		639: {
			n: "BrtOleObject"
		},
		640: {
			n: "BrtEndOleObjects"
		},
		641: {
			n: "BrtBeginSxrules"
		},
		642: {
			n: "BrtEndSxRules"
		},
		643: {
			n: "BrtBeginActiveXControls"
		},
		644: {
			n: "BrtActiveX"
		},
		645: {
			n: "BrtEndActiveXControls"
		},
		646: {
			n: "BrtBeginPCDSDTCEMembersSortBy"
		},
		648: {
			n: "BrtBeginCellIgnoreECs"
		},
		649: {
			n: "BrtCellIgnoreEC"
		},
		650: {
			n: "BrtEndCellIgnoreECs"
		},
		651: {
			n: "BrtCsProp",
			f: Dd
		},
		652: {
			n: "BrtCsPageSetup"
		},
		653: {
			n: "BrtBeginUserCsViews"
		},
		654: {
			n: "BrtEndUserCsViews"
		},
		655: {
			n: "BrtBeginUserCsView"
		},
		656: {
			n: "BrtEndUserCsView"
		},
		657: {
			n: "BrtBeginPcdSFCIEntries"
		},
		658: {
			n: "BrtEndPCDSFCIEntries"
		},
		659: {
			n: "BrtPCDSFCIEntry"
		},
		660: {
			n: "BrtBeginListParts"
		},
		661: {
			n: "BrtListPart"
		},
		662: {
			n: "BrtEndListParts"
		},
		663: {
			n: "BrtSheetCalcProp"
		},
		664: {
			n: "BrtBeginFnGroup"
		},
		665: {
			n: "BrtFnGroup"
		},
		666: {
			n: "BrtEndFnGroup"
		},
		667: {
			n: "BrtSupAddin"
		},
		668: {
			n: "BrtSXTDMPOrder"
		},
		669: {
			n: "BrtCsProtection"
		},
		671: {
			n: "BrtBeginWsSortMap"
		},
		672: {
			n: "BrtEndWsSortMap"
		},
		673: {
			n: "BrtBeginRRSort"
		},
		674: {
			n: "BrtEndRRSort"
		},
		675: {
			n: "BrtRRSortItem"
		},
		676: {
			n: "BrtFileSharingIso"
		},
		677: {
			n: "BrtBookProtectionIso"
		},
		678: {
			n: "BrtSheetProtectionIso"
		},
		679: {
			n: "BrtCsProtectionIso"
		},
		680: {
			n: "BrtRangeProtectionIso"
		},
		1024: {
			n: "BrtRwDescent"
		},
		1025: {
			n: "BrtKnownFonts"
		},
		1026: {
			n: "BrtBeginSXTupleSet"
		},
		1027: {
			n: "BrtEndSXTupleSet"
		},
		1028: {
			n: "BrtBeginSXTupleSetHeader"
		},
		1029: {
			n: "BrtEndSXTupleSetHeader"
		},
		1030: {
			n: "BrtSXTupleSetHeaderItem"
		},
		1031: {
			n: "BrtBeginSXTupleSetData"
		},
		1032: {
			n: "BrtEndSXTupleSetData"
		},
		1033: {
			n: "BrtBeginSXTupleSetRow"
		},
		1034: {
			n: "BrtEndSXTupleSetRow"
		},
		1035: {
			n: "BrtSXTupleSetRowItem"
		},
		1036: {
			n: "BrtNameExt"
		},
		1037: {
			n: "BrtPCDH14"
		},
		1038: {
			n: "BrtBeginPCDCalcMem14"
		},
		1039: {
			n: "BrtEndPCDCalcMem14"
		},
		1040: {
			n: "BrtSXTH14"
		},
		1041: {
			n: "BrtBeginSparklineGroup"
		},
		1042: {
			n: "BrtEndSparklineGroup"
		},
		1043: {
			n: "BrtSparkline"
		},
		1044: {
			n: "BrtSXDI14"
		},
		1045: {
			n: "BrtWsFmtInfoEx14"
		},
		1046: {
			n: "BrtBeginConditionalFormatting14"
		},
		1047: {
			n: "BrtEndConditionalFormatting14"
		},
		1048: {
			n: "BrtBeginCFRule14"
		},
		1049: {
			n: "BrtEndCFRule14"
		},
		1050: {
			n: "BrtCFVO14"
		},
		1051: {
			n: "BrtBeginDatabar14"
		},
		1052: {
			n: "BrtBeginIconSet14"
		},
		1053: {
			n: "BrtDVal14"
		},
		1054: {
			n: "BrtBeginDVals14"
		},
		1055: {
			n: "BrtColor14"
		},
		1056: {
			n: "BrtBeginSparklines"
		},
		1057: {
			n: "BrtEndSparklines"
		},
		1058: {
			n: "BrtBeginSparklineGroups"
		},
		1059: {
			n: "BrtEndSparklineGroups"
		},
		1061: {
			n: "BrtSXVD14"
		},
		1062: {
			n: "BrtBeginSXView14"
		},
		1063: {
			n: "BrtEndSXView14"
		},
		1064: {
			n: "BrtBeginSXView16"
		},
		1065: {
			n: "BrtEndSXView16"
		},
		1066: {
			n: "BrtBeginPCD14"
		},
		1067: {
			n: "BrtEndPCD14"
		},
		1068: {
			n: "BrtBeginExtConn14"
		},
		1069: {
			n: "BrtEndExtConn14"
		},
		1070: {
			n: "BrtBeginSlicerCacheIDs"
		},
		1071: {
			n: "BrtEndSlicerCacheIDs"
		},
		1072: {
			n: "BrtBeginSlicerCacheID"
		},
		1073: {
			n: "BrtEndSlicerCacheID"
		},
		1075: {
			n: "BrtBeginSlicerCache"
		},
		1076: {
			n: "BrtEndSlicerCache"
		},
		1077: {
			n: "BrtBeginSlicerCacheDef"
		},
		1078: {
			n: "BrtEndSlicerCacheDef"
		},
		1079: {
			n: "BrtBeginSlicersEx"
		},
		1080: {
			n: "BrtEndSlicersEx"
		},
		1081: {
			n: "BrtBeginSlicerEx"
		},
		1082: {
			n: "BrtEndSlicerEx"
		},
		1083: {
			n: "BrtBeginSlicer"
		},
		1084: {
			n: "BrtEndSlicer"
		},
		1085: {
			n: "BrtSlicerCachePivotTables"
		},
		1086: {
			n: "BrtBeginSlicerCacheOlapImpl"
		},
		1087: {
			n: "BrtEndSlicerCacheOlapImpl"
		},
		1088: {
			n: "BrtBeginSlicerCacheLevelsData"
		},
		1089: {
			n: "BrtEndSlicerCacheLevelsData"
		},
		1090: {
			n: "BrtBeginSlicerCacheLevelData"
		},
		1091: {
			n: "BrtEndSlicerCacheLevelData"
		},
		1092: {
			n: "BrtBeginSlicerCacheSiRanges"
		},
		1093: {
			n: "BrtEndSlicerCacheSiRanges"
		},
		1094: {
			n: "BrtBeginSlicerCacheSiRange"
		},
		1095: {
			n: "BrtEndSlicerCacheSiRange"
		},
		1096: {
			n: "BrtSlicerCacheOlapItem"
		},
		1097: {
			n: "BrtBeginSlicerCacheSelections"
		},
		1098: {
			n: "BrtSlicerCacheSelection"
		},
		1099: {
			n: "BrtEndSlicerCacheSelections"
		},
		1100: {
			n: "BrtBeginSlicerCacheNative"
		},
		1101: {
			n: "BrtEndSlicerCacheNative"
		},
		1102: {
			n: "BrtSlicerCacheNativeItem"
		},
		1103: {
			n: "BrtRangeProtection14"
		},
		1104: {
			n: "BrtRangeProtectionIso14"
		},
		1105: {
			n: "BrtCellIgnoreEC14"
		},
		1111: {
			n: "BrtList14"
		},
		1112: {
			n: "BrtCFIcon"
		},
		1113: {
			n: "BrtBeginSlicerCachesPivotCacheIDs"
		},
		1114: {
			n: "BrtEndSlicerCachesPivotCacheIDs"
		},
		1115: {
			n: "BrtBeginSlicers"
		},
		1116: {
			n: "BrtEndSlicers"
		},
		1117: {
			n: "BrtWbProp14"
		},
		1118: {
			n: "BrtBeginSXEdit"
		},
		1119: {
			n: "BrtEndSXEdit"
		},
		1120: {
			n: "BrtBeginSXEdits"
		},
		1121: {
			n: "BrtEndSXEdits"
		},
		1122: {
			n: "BrtBeginSXChange"
		},
		1123: {
			n: "BrtEndSXChange"
		},
		1124: {
			n: "BrtBeginSXChanges"
		},
		1125: {
			n: "BrtEndSXChanges"
		},
		1126: {
			n: "BrtSXTupleItems"
		},
		1128: {
			n: "BrtBeginSlicerStyle"
		},
		1129: {
			n: "BrtEndSlicerStyle"
		},
		1130: {
			n: "BrtSlicerStyleElement"
		},
		1131: {
			n: "BrtBeginStyleSheetExt14"
		},
		1132: {
			n: "BrtEndStyleSheetExt14"
		},
		1133: {
			n: "BrtBeginSlicerCachesPivotCacheID"
		},
		1134: {
			n: "BrtEndSlicerCachesPivotCacheID"
		},
		1135: {
			n: "BrtBeginConditionalFormattings"
		},
		1136: {
			n: "BrtEndConditionalFormattings"
		},
		1137: {
			n: "BrtBeginPCDCalcMemExt"
		},
		1138: {
			n: "BrtEndPCDCalcMemExt"
		},
		1139: {
			n: "BrtBeginPCDCalcMemsExt"
		},
		1140: {
			n: "BrtEndPCDCalcMemsExt"
		},
		1141: {
			n: "BrtPCDField14"
		},
		1142: {
			n: "BrtBeginSlicerStyles"
		},
		1143: {
			n: "BrtEndSlicerStyles"
		},
		1144: {
			n: "BrtBeginSlicerStyleElements"
		},
		1145: {
			n: "BrtEndSlicerStyleElements"
		},
		1146: {
			n: "BrtCFRuleExt"
		},
		1147: {
			n: "BrtBeginSXCondFmt14"
		},
		1148: {
			n: "BrtEndSXCondFmt14"
		},
		1149: {
			n: "BrtBeginSXCondFmts14"
		},
		1150: {
			n: "BrtEndSXCondFmts14"
		},
		1152: {
			n: "BrtBeginSortCond14"
		},
		1153: {
			n: "BrtEndSortCond14"
		},
		1154: {
			n: "BrtEndDVals14"
		},
		1155: {
			n: "BrtEndIconSet14"
		},
		1156: {
			n: "BrtEndDatabar14"
		},
		1157: {
			n: "BrtBeginColorScale14"
		},
		1158: {
			n: "BrtEndColorScale14"
		},
		1159: {
			n: "BrtBeginSxrules14"
		},
		1160: {
			n: "BrtEndSxrules14"
		},
		1161: {
			n: "BrtBeginPRule14"
		},
		1162: {
			n: "BrtEndPRule14"
		},
		1163: {
			n: "BrtBeginPRFilters14"
		},
		1164: {
			n: "BrtEndPRFilters14"
		},
		1165: {
			n: "BrtBeginPRFilter14"
		},
		1166: {
			n: "BrtEndPRFilter14"
		},
		1167: {
			n: "BrtBeginPRFItem14"
		},
		1168: {
			n: "BrtEndPRFItem14"
		},
		1169: {
			n: "BrtBeginCellIgnoreECs14"
		},
		1170: {
			n: "BrtEndCellIgnoreECs14"
		},
		1171: {
			n: "BrtDxf14"
		},
		1172: {
			n: "BrtBeginDxF14s"
		},
		1173: {
			n: "BrtEndDxf14s"
		},
		1177: {
			n: "BrtFilter14"
		},
		1178: {
			n: "BrtBeginCustomFilters14"
		},
		1180: {
			n: "BrtCustomFilter14"
		},
		1181: {
			n: "BrtIconFilter14"
		},
		1182: {
			n: "BrtPivotCacheConnectionName"
		},
		2048: {
			n: "BrtBeginDecoupledPivotCacheIDs"
		},
		2049: {
			n: "BrtEndDecoupledPivotCacheIDs"
		},
		2050: {
			n: "BrtDecoupledPivotCacheID"
		},
		2051: {
			n: "BrtBeginPivotTableRefs"
		},
		2052: {
			n: "BrtEndPivotTableRefs"
		},
		2053: {
			n: "BrtPivotTableRef"
		},
		2054: {
			n: "BrtSlicerCacheBookPivotTables"
		},
		2055: {
			n: "BrtBeginSxvcells"
		},
		2056: {
			n: "BrtEndSxvcells"
		},
		2057: {
			n: "BrtBeginSxRow"
		},
		2058: {
			n: "BrtEndSxRow"
		},
		2060: {
			n: "BrtPcdCalcMem15"
		},
		2067: {
			n: "BrtQsi15"
		},
		2068: {
			n: "BrtBeginWebExtensions"
		},
		2069: {
			n: "BrtEndWebExtensions"
		},
		2070: {
			n: "BrtWebExtension"
		},
		2071: {
			n: "BrtAbsPath15"
		},
		2072: {
			n: "BrtBeginPivotTableUISettings"
		},
		2073: {
			n: "BrtEndPivotTableUISettings"
		},
		2075: {
			n: "BrtTableSlicerCacheIDs"
		},
		2076: {
			n: "BrtTableSlicerCacheID"
		},
		2077: {
			n: "BrtBeginTableSlicerCache"
		},
		2078: {
			n: "BrtEndTableSlicerCache"
		},
		2079: {
			n: "BrtSxFilter15"
		},
		2080: {
			n: "BrtBeginTimelineCachePivotCacheIDs"
		},
		2081: {
			n: "BrtEndTimelineCachePivotCacheIDs"
		},
		2082: {
			n: "BrtTimelineCachePivotCacheID"
		},
		2083: {
			n: "BrtBeginTimelineCacheIDs"
		},
		2084: {
			n: "BrtEndTimelineCacheIDs"
		},
		2085: {
			n: "BrtBeginTimelineCacheID"
		},
		2086: {
			n: "BrtEndTimelineCacheID"
		},
		2087: {
			n: "BrtBeginTimelinesEx"
		},
		2088: {
			n: "BrtEndTimelinesEx"
		},
		2089: {
			n: "BrtBeginTimelineEx"
		},
		2090: {
			n: "BrtEndTimelineEx"
		},
		2091: {
			n: "BrtWorkBookPr15"
		},
		2092: {
			n: "BrtPCDH15"
		},
		2093: {
			n: "BrtBeginTimelineStyle"
		},
		2094: {
			n: "BrtEndTimelineStyle"
		},
		2095: {
			n: "BrtTimelineStyleElement"
		},
		2096: {
			n: "BrtBeginTimelineStylesheetExt15"
		},
		2097: {
			n: "BrtEndTimelineStylesheetExt15"
		},
		2098: {
			n: "BrtBeginTimelineStyles"
		},
		2099: {
			n: "BrtEndTimelineStyles"
		},
		2100: {
			n: "BrtBeginTimelineStyleElements"
		},
		2101: {
			n: "BrtEndTimelineStyleElements"
		},
		2102: {
			n: "BrtDxf15"
		},
		2103: {
			n: "BrtBeginDxfs15"
		},
		2104: {
			n: "brtEndDxfs15"
		},
		2105: {
			n: "BrtSlicerCacheHideItemsWithNoData"
		},
		2106: {
			n: "BrtBeginItemUniqueNames"
		},
		2107: {
			n: "BrtEndItemUniqueNames"
		},
		2108: {
			n: "BrtItemUniqueName"
		},
		2109: {
			n: "BrtBeginExtConn15"
		},
		2110: {
			n: "BrtEndExtConn15"
		},
		2111: {
			n: "BrtBeginOledbPr15"
		},
		2112: {
			n: "BrtEndOledbPr15"
		},
		2113: {
			n: "BrtBeginDataFeedPr15"
		},
		2114: {
			n: "BrtEndDataFeedPr15"
		},
		2115: {
			n: "BrtTextPr15"
		},
		2116: {
			n: "BrtRangePr15"
		},
		2117: {
			n: "BrtDbCommand15"
		},
		2118: {
			n: "BrtBeginDbTables15"
		},
		2119: {
			n: "BrtEndDbTables15"
		},
		2120: {
			n: "BrtDbTable15"
		},
		2121: {
			n: "BrtBeginDataModel"
		},
		2122: {
			n: "BrtEndDataModel"
		},
		2123: {
			n: "BrtBeginModelTables"
		},
		2124: {
			n: "BrtEndModelTables"
		},
		2125: {
			n: "BrtModelTable"
		},
		2126: {
			n: "BrtBeginModelRelationships"
		},
		2127: {
			n: "BrtEndModelRelationships"
		},
		2128: {
			n: "BrtModelRelationship"
		},
		2129: {
			n: "BrtBeginECTxtWiz15"
		},
		2130: {
			n: "BrtEndECTxtWiz15"
		},
		2131: {
			n: "BrtBeginECTWFldInfoLst15"
		},
		2132: {
			n: "BrtEndECTWFldInfoLst15"
		},
		2133: {
			n: "BrtBeginECTWFldInfo15"
		},
		2134: {
			n: "BrtFieldListActiveItem"
		},
		2135: {
			n: "BrtPivotCacheIdVersion"
		},
		2136: {
			n: "BrtSXDI15"
		},
		2137: {
			n: "BrtBeginModelTimeGroupings"
		},
		2138: {
			n: "BrtEndModelTimeGroupings"
		},
		2139: {
			n: "BrtBeginModelTimeGrouping"
		},
		2140: {
			n: "BrtEndModelTimeGrouping"
		},
		2141: {
			n: "BrtModelTimeGroupingCalcCol"
		},
		3072: {
			n: "BrtUid"
		},
		3073: {
			n: "BrtRevisionPtr"
		},
		5095: {
			n: "BrtBeginCalcFeatures"
		},
		5096: {
			n: "BrtEndCalcFeatures"
		},
		5097: {
			n: "BrtCalcFeature"
		},
		65535: {
			n: ""
		}
	};
	var uv = j(cv, "n");
	var hv = {
		3: {
			n: "BIFF2NUM",
			f: Gs
		},
		4: {
			n: "BIFF2STR",
			f: Xs
		},
		6: {
			n: "Formula",
			f: xu
		},
		9: {
			n: "BOF",
			f: Si
		},
		10: {
			n: "EOF",
			f: Oa
		},
		12: {
			n: "CalcCount",
			f: Wa
		},
		13: {
			n: "CalcMode",
			f: Wa
		},
		14: {
			n: "CalcPrecision",
			f: La
		},
		15: {
			n: "CalcRefMode",
			f: La
		},
		16: {
			n: "CalcDelta",
			f: zt
		},
		17: {
			n: "CalcIter",
			f: La
		},
		18: {
			n: "Protect",
			f: La
		},
		19: {
			n: "Password",
			f: Wa
		},
		20: {
			n: "Header",
			f: ls
		},
		21: {
			n: "Footer",
			f: ls
		},
		23: {
			n: "ExternSheet",
			f: ds
		},
		24: {
			n: "Lbl",
			f: hs
		},
		25: {
			n: "WinProtect",
			f: La
		},
		26: {
			n: "VerticalPageBreaks"
		},
		27: {
			n: "HorizontalPageBreaks"
		},
		28: {
			n: "Note",
			f: Es
		},
		29: {
			n: "Selection"
		},
		34: {
			n: "Date1904",
			f: La
		},
		35: {
			n: "ExternName",
			f: cs
		},
		38: {
			n: "LeftMargin",
			f: zt
		},
		39: {
			n: "RightMargin",
			f: zt
		},
		40: {
			n: "TopMargin",
			f: zt
		},
		41: {
			n: "BottomMargin",
			f: zt
		},
		42: {
			n: "PrintRowCol",
			f: La
		},
		43: {
			n: "PrintGrid",
			f: La
		},
		47: {
			n: "FilePass",
			f: Xo
		},
		49: {
			n: "Font",
			f: Ui
		},
		51: {
			n: "PrintSize",
			f: Wa
		},
		60: {
			n: "Continue"
		},
		61: {
			n: "Window1",
			f: Ni
		},
		64: {
			n: "Backup",
			f: La
		},
		65: {
			n: "Pane"
		},
		66: {
			n: "CodePage",
			f: Wa
		},
		77: {
			n: "Pls"
		},
		80: {
			n: "DCon"
		},
		81: {
			n: "DConRef"
		},
		82: {
			n: "DConName"
		},
		85: {
			n: "DefColWidth",
			f: Wa
		},
		89: {
			n: "XCT"
		},
		90: {
			n: "CRN"
		},
		91: {
			n: "FileSharing"
		},
		92: {
			n: "WriteAccess",
			f: _i
		},
		93: {
			n: "Obj",
			f: ws
		},
		94: {
			n: "Uncalced"
		},
		95: {
			n: "CalcSaveRecalc",
			f: La
		},
		96: {
			n: "Template"
		},
		97: {
			n: "Intl"
		},
		99: {
			n: "ObjProtect",
			f: La
		},
		125: {
			n: "ColInfo",
			f: Ns
		},
		128: {
			n: "Guts",
			f: ts
		},
		129: {
			n: "WsBool",
			f: Bi
		},
		130: {
			n: "GridSet",
			f: Wa
		},
		131: {
			n: "HCenter",
			f: La
		},
		132: {
			n: "VCenter",
			f: La
		},
		133: {
			n: "BoundSheet8",
			f: Ti
		},
		134: {
			n: "WriteProtect"
		},
		140: {
			n: "Country",
			f: Is
		},
		141: {
			n: "HideObj",
			f: Wa
		},
		144: {
			n: "Sort"
		},
		146: {
			n: "Palette",
			f: Os
		},
		151: {
			n: "Sync"
		},
		152: {
			n: "LPr"
		},
		153: {
			n: "DxGCol"
		},
		154: {
			n: "FnGroupName"
		},
		155: {
			n: "FilterMode"
		},
		156: {
			n: "BuiltInFnGroupCount",
			f: Wa
		},
		157: {
			n: "AutoFilterInfo"
		},
		158: {
			n: "AutoFilter"
		},
		160: {
			n: "Scl",
			f: Hs
		},
		161: {
			n: "Setup",
			f: Ls
		},
		174: {
			n: "ScenMan"
		},
		175: {
			n: "SCENARIO"
		},
		176: {
			n: "SxView"
		},
		177: {
			n: "Sxvd"
		},
		178: {
			n: "SXVI"
		},
		180: {
			n: "SxIvd"
		},
		181: {
			n: "SXLI"
		},
		182: {
			n: "SXPI"
		},
		184: {
			n: "DocRoute"
		},
		185: {
			n: "RecipName"
		},
		189: {
			n: "MulRk",
			f: Qi
		},
		190: {
			n: "MulBlank",
			f: Ji
		},
		193: {
			n: "Mms",
			f: Oa
		},
		197: {
			n: "SXDI"
		},
		198: {
			n: "SXDB"
		},
		199: {
			n: "SXFDB"
		},
		200: {
			n: "SXDBB"
		},
		201: {
			n: "SXNum"
		},
		202: {
			n: "SxBool",
			f: La
		},
		203: {
			n: "SxErr"
		},
		204: {
			n: "SXInt"
		},
		205: {
			n: "SXString"
		},
		206: {
			n: "SXDtr"
		},
		207: {
			n: "SxNil"
		},
		208: {
			n: "SXTbl"
		},
		209: {
			n: "SXTBRGIITM"
		},
		210: {
			n: "SxTbpg"
		},
		211: {
			n: "ObProj"
		},
		213: {
			n: "SXStreamID"
		},
		215: {
			n: "DBCell"
		},
		216: {
			n: "SXRng"
		},
		217: {
			n: "SxIsxoper"
		},
		218: {
			n: "BookBool",
			f: Wa
		},
		220: {
			n: "DbOrParamQry"
		},
		221: {
			n: "ScenarioProtect",
			f: La
		},
		222: {
			n: "OleObjectSize"
		},
		224: {
			n: "XF",
			f: es
		},
		225: {
			n: "InterfaceHdr",
			f: Ai
		},
		226: {
			n: "InterfaceEnd",
			f: Oa
		},
		227: {
			n: "SXVS"
		},
		229: {
			n: "MergeCells",
			f: ks
		},
		233: {
			n: "BkHim"
		},
		235: {
			n: "MsoDrawingGroup"
		},
		236: {
			n: "MsoDrawing"
		},
		237: {
			n: "MsoDrawingSelection"
		},
		239: {
			n: "PhoneticInfo"
		},
		240: {
			n: "SxRule"
		},
		241: {
			n: "SXEx"
		},
		242: {
			n: "SxFilt"
		},
		244: {
			n: "SxDXF"
		},
		245: {
			n: "SxItm"
		},
		246: {
			n: "SxName"
		},
		247: {
			n: "SxSelect"
		},
		248: {
			n: "SXPair"
		},
		249: {
			n: "SxFmla"
		},
		251: {
			n: "SxFormat"
		},
		252: {
			n: "SST",
			f: xi
		},
		253: {
			n: "LabelSst",
			f: Vi
		},
		255: {
			n: "ExtSST",
			f: Ii
		},
		256: {
			n: "SXVDEx"
		},
		259: {
			n: "SXFormula"
		},
		290: {
			n: "SXDBEx"
		},
		311: {
			n: "RRDInsDel"
		},
		312: {
			n: "RRDHead"
		},
		315: {
			n: "RRDChgCell"
		},
		317: {
			n: "RRTabId",
			f: Ha
		},
		318: {
			n: "RRDRenSheet"
		},
		319: {
			n: "RRSort"
		},
		320: {
			n: "RRDMove"
		},
		330: {
			n: "RRFormat"
		},
		331: {
			n: "RRAutoFmt"
		},
		333: {
			n: "RRInsertSh"
		},
		334: {
			n: "RRDMoveBegin"
		},
		335: {
			n: "RRDMoveEnd"
		},
		336: {
			n: "RRDInsDelBegin"
		},
		337: {
			n: "RRDInsDelEnd"
		},
		338: {
			n: "RRDConflict"
		},
		339: {
			n: "RRDDefName"
		},
		340: {
			n: "RRDRstEtxp"
		},
		351: {
			n: "LRng"
		},
		352: {
			n: "UsesELFs",
			f: La
		},
		353: {
			n: "DSF",
			f: Oa
		},
		401: {
			n: "CUsr"
		},
		402: {
			n: "CbUsr"
		},
		403: {
			n: "UsrInfo"
		},
		404: {
			n: "UsrExcl"
		},
		405: {
			n: "FileLock"
		},
		406: {
			n: "RRDInfo"
		},
		407: {
			n: "BCUsrs"
		},
		408: {
			n: "UsrChk"
		},
		425: {
			n: "UserBView"
		},
		426: {
			n: "UserSViewBegin"
		},
		427: {
			n: "UserSViewEnd"
		},
		428: {
			n: "RRDUserView"
		},
		429: {
			n: "Qsi"
		},
		430: {
			n: "SupBook",
			f: fs
		},
		431: {
			n: "Prot4Rev",
			f: La
		},
		432: {
			n: "CondFmt"
		},
		433: {
			n: "CF"
		},
		434: {
			n: "DVal"
		},
		437: {
			n: "DConBin"
		},
		438: {
			n: "TxO",
			f: Rs
		},
		439: {
			n: "RefreshAll",
			f: La
		},
		440: {
			n: "HLink",
			f: Bs
		},
		441: {
			n: "Lel"
		},
		442: {
			n: "CodeName",
			f: Ka
		},
		443: {
			n: "SXFDBType"
		},
		444: {
			n: "Prot4RevPass",
			f: Wa
		},
		445: {
			n: "ObNoMacros"
		},
		446: {
			n: "Dv"
		},
		448: {
			n: "Excel9File",
			f: Oa
		},
		449: {
			n: "RecalcId",
			f: Oi,
			r: 2
		},
		450: {
			n: "EntExU2",
			f: Oa
		},
		512: {
			n: "Dimensions",
			f: Yi
		},
		513: {
			n: "Blank",
			f: Us
		},
		515: {
			n: "Number",
			f: ss
		},
		516: {
			n: "Label",
			f: zi
		},
		517: {
			n: "BoolErr",
			f: as
		},
		518: {
			n: "Formula",
			f: xu
		},
		519: {
			n: "String",
			f: Vs
		},
		520: {
			n: "Row",
			f: Di
		},
		523: {
			n: "Index"
		},
		545: {
			n: "Array",
			f: ms
		},
		549: {
			n: "DefaultRowHeight",
			f: Pi
		},
		566: {
			n: "Table"
		},
		574: {
			n: "Window2",
			f: Mi
		},
		638: {
			n: "RK",
			f: Zi
		},
		659: {
			n: "Style"
		},
		1030: {
			n: "Formula",
			f: xu
		},
		1048: {
			n: "BigName"
		},
		1054: {
			n: "Format",
			f: Gi
		},
		1084: {
			n: "ContinueBigName"
		},
		1212: {
			n: "ShrFmla",
			f: gs
		},
		2048: {
			n: "HLinkTooltip",
			f: ys
		},
		2049: {
			n: "WebPub"
		},
		2050: {
			n: "QsiSXTag"
		},
		2051: {
			n: "DBQueryExt"
		},
		2052: {
			n: "ExtString"
		},
		2053: {
			n: "TxtQry"
		},
		2054: {
			n: "Qsir"
		},
		2055: {
			n: "Qsif"
		},
		2056: {
			n: "RRDTQSIF"
		},
		2057: {
			n: "BOF",
			f: Si
		},
		2058: {
			n: "OleDbConn"
		},
		2059: {
			n: "WOpt"
		},
		2060: {
			n: "SXViewEx"
		},
		2061: {
			n: "SXTH"
		},
		2062: {
			n: "SXPIEx"
		},
		2063: {
			n: "SXVDTEx"
		},
		2064: {
			n: "SXViewEx9"
		},
		2066: {
			n: "ContinueFrt"
		},
		2067: {
			n: "RealTimeData"
		},
		2128: {
			n: "ChartFrtInfo"
		},
		2129: {
			n: "FrtWrapper"
		},
		2130: {
			n: "StartBlock"
		},
		2131: {
			n: "EndBlock"
		},
		2132: {
			n: "StartObject"
		},
		2133: {
			n: "EndObject"
		},
		2134: {
			n: "CatLab"
		},
		2135: {
			n: "YMult"
		},
		2136: {
			n: "SXViewLink"
		},
		2137: {
			n: "PivotChartBits"
		},
		2138: {
			n: "FrtFontList"
		},
		2146: {
			n: "SheetExt"
		},
		2147: {
			n: "BookExt",
			r: 12
		},
		2148: {
			n: "SXAddl"
		},
		2149: {
			n: "CrErr"
		},
		2150: {
			n: "HFPicture"
		},
		2151: {
			n: "FeatHdr",
			f: Oa
		},
		2152: {
			n: "Feat"
		},
		2154: {
			n: "DataLabExt"
		},
		2155: {
			n: "DataLabExtContents"
		},
		2156: {
			n: "CellWatch"
		},
		2161: {
			n: "FeatHdr11"
		},
		2162: {
			n: "Feature11"
		},
		2164: {
			n: "DropDownObjIds"
		},
		2165: {
			n: "ContinueFrt11"
		},
		2166: {
			n: "DConn"
		},
		2167: {
			n: "List12"
		},
		2168: {
			n: "Feature12"
		},
		2169: {
			n: "CondFmt12"
		},
		2170: {
			n: "CF12"
		},
		2171: {
			n: "CFEx"
		},
		2172: {
			n: "XFCRC",
			f: Ps,
			r: 12
		},
		2173: {
			n: "XFExt",
			f: pf,
			r: 12
		},
		2174: {
			n: "AutoFilter12"
		},
		2175: {
			n: "ContinueFrt12"
		},
		2180: {
			n: "MDTInfo"
		},
		2181: {
			n: "MDXStr"
		},
		2182: {
			n: "MDXTuple"
		},
		2183: {
			n: "MDXSet"
		},
		2184: {
			n: "MDXProp"
		},
		2185: {
			n: "MDXKPI"
		},
		2186: {
			n: "MDB"
		},
		2187: {
			n: "PLV"
		},
		2188: {
			n: "Compat12",
			f: La,
			r: 12
		},
		2189: {
			n: "DXF"
		},
		2190: {
			n: "TableStyles",
			r: 12
		},
		2191: {
			n: "TableStyle"
		},
		2192: {
			n: "TableStyleElement"
		},
		2194: {
			n: "StyleExt"
		},
		2195: {
			n: "NamePublish"
		},
		2196: {
			n: "NameCmt",
			f: vs,
			r: 12
		},
		2197: {
			n: "SortData"
		},
		2198: {
			n: "Theme",
			f: lf,
			r: 12
		},
		2199: {
			n: "GUIDTypeLib"
		},
		2200: {
			n: "FnGrp12"
		},
		2201: {
			n: "NameFnGrp12"
		},
		2202: {
			n: "MTRSettings",
			f: bs,
			r: 12
		},
		2203: {
			n: "CompressPictures",
			f: Oa
		},
		2204: {
			n: "HeaderFooter"
		},
		2205: {
			n: "CrtLayout12"
		},
		2206: {
			n: "CrtMlFrt"
		},
		2207: {
			n: "CrtMlFrtContinue"
		},
		2211: {
			n: "ForceFullCalculation",
			f: Fi
		},
		2212: {
			n: "ShapePropsStream"
		},
		2213: {
			n: "TextPropsStream"
		},
		2214: {
			n: "RichTextStream"
		},
		2215: {
			n: "CrtLayout12A"
		},
		4097: {
			n: "Units"
		},
		4098: {
			n: "Chart"
		},
		4099: {
			n: "Series"
		},
		4102: {
			n: "DataFormat"
		},
		4103: {
			n: "LineFormat"
		},
		4105: {
			n: "MarkerFormat"
		},
		4106: {
			n: "AreaFormat"
		},
		4107: {
			n: "PieFormat"
		},
		4108: {
			n: "AttachedLabel"
		},
		4109: {
			n: "SeriesText"
		},
		4116: {
			n: "ChartFormat"
		},
		4117: {
			n: "Legend"
		},
		4118: {
			n: "SeriesList"
		},
		4119: {
			n: "Bar"
		},
		4120: {
			n: "Line"
		},
		4121: {
			n: "Pie"
		},
		4122: {
			n: "Area"
		},
		4123: {
			n: "Scatter"
		},
		4124: {
			n: "CrtLine"
		},
		4125: {
			n: "Axis"
		},
		4126: {
			n: "Tick"
		},
		4127: {
			n: "ValueRange"
		},
		4128: {
			n: "CatSerRange"
		},
		4129: {
			n: "AxisLine"
		},
		4130: {
			n: "CrtLink"
		},
		4132: {
			n: "DefaultText"
		},
		4133: {
			n: "Text"
		},
		4134: {
			n: "FontX",
			f: Wa
		},
		4135: {
			n: "ObjectLink"
		},
		4146: {
			n: "Frame"
		},
		4147: {
			n: "Begin"
		},
		4148: {
			n: "End"
		},
		4149: {
			n: "PlotArea"
		},
		4154: {
			n: "Chart3d"
		},
		4156: {
			n: "PicF"
		},
		4157: {
			n: "DropBar"
		},
		4158: {
			n: "Radar"
		},
		4159: {
			n: "Surf"
		},
		4160: {
			n: "RadarArea"
		},
		4161: {
			n: "AxisParent"
		},
		4163: {
			n: "LegendException"
		},
		4164: {
			n: "ShtProps",
			f: Ms
		},
		4165: {
			n: "SerToCrt"
		},
		4166: {
			n: "AxesUsed"
		},
		4168: {
			n: "SBaseRef"
		},
		4170: {
			n: "SerParent"
		},
		4171: {
			n: "SerAuxTrend"
		},
		4174: {
			n: "IFmtRecord"
		},
		4175: {
			n: "Pos"
		},
		4176: {
			n: "AlRuns"
		},
		4177: {
			n: "BRAI"
		},
		4187: {
			n: "SerAuxErrBar"
		},
		4188: {
			n: "ClrtClient",
			f: Fs
		},
		4189: {
			n: "SerFmt"
		},
		4191: {
			n: "Chart3DBarShape"
		},
		4192: {
			n: "Fbi"
		},
		4193: {
			n: "BopPop"
		},
		4194: {
			n: "AxcExt"
		},
		4195: {
			n: "Dat"
		},
		4196: {
			n: "PlotGrowth"
		},
		4197: {
			n: "SIIndex"
		},
		4198: {
			n: "GelFrame"
		},
		4199: {
			n: "BopPopCustom"
		},
		4200: {
			n: "Fbi2"
		},
		0: {
			n: "Dimensions",
			f: Yi
		},
		2: {
			n: "BIFF2INT",
			f: Ks
		},
		5: {
			n: "BoolErr",
			f: as
		},
		7: {
			n: "String",
			f: $s
		},
		8: {
			n: "BIFF2ROW"
		},
		11: {
			n: "Index"
		},
		22: {
			n: "ExternCount",
			f: Wa
		},
		30: {
			n: "BIFF2FORMAT",
			f: Ki
		},
		31: {
			n: "BIFF2FMTCNT"
		},
		32: {
			n: "BIFF2COLINFO"
		},
		33: {
			n: "Array",
			f: ms
		},
		37: {
			n: "DefaultRowHeight",
			f: Pi
		},
		50: {
			n: "BIFF2FONTXTRA",
			f: Zs
		},
		52: {
			n: "DDEObjName"
		},
		62: {
			n: "BIFF2WINDOW2"
		},
		67: {
			n: "BIFF2XF"
		},
		69: {
			n: "BIFF2FONTCLR"
		},
		86: {
			n: "BIFF4FMTCNT"
		},
		126: {
			n: "RK"
		},
		127: {
			n: "ImData",
			f: zs
		},
		135: {
			n: "Addin"
		},
		136: {
			n: "Edg"
		},
		137: {
			n: "Pub"
		},
		145: {
			n: "Sub"
		},
		148: {
			n: "LHRecord"
		},
		149: {
			n: "LHNGraph"
		},
		150: {
			n: "Sound"
		},
		169: {
			n: "CoordList"
		},
		171: {
			n: "GCW"
		},
		188: {
			n: "ShrFmla"
		},
		191: {
			n: "ToolbarHdr"
		},
		192: {
			n: "ToolbarEnd"
		},
		194: {
			n: "AddMenu"
		},
		195: {
			n: "DelMenu"
		},
		214: {
			n: "RString",
			f: Qs
		},
		223: {
			n: "UDDesc"
		},
		234: {
			n: "TabIdConf"
		},
		354: {
			n: "XL5Modify"
		},
		421: {
			n: "FileSharing2"
		},
		521: {
			n: "BOF",
			f: Si
		},
		536: {
			n: "Lbl",
			f: hs
		},
		547: {
			n: "ExternName",
			f: cs
		},
		561: {
			n: "Font"
		},
		579: {
			n: "BIFF3XF"
		},
		1033: {
			n: "BOF",
			f: Si
		},
		1091: {
			n: "BIFF4XF"
		},
		2157: {
			n: "FeatInfo"
		},
		2163: {
			n: "FeatInfo11"
		},
		2177: {
			n: "SXAddl12"
		},
		2240: {
			n: "AutoWebPub"
		},
		2241: {
			n: "ListObj"
		},
		2242: {
			n: "ListField"
		},
		2243: {
			n: "ListDV"
		},
		2244: {
			n: "ListCondFmt"
		},
		2245: {
			n: "ListCF"
		},
		2246: {
			n: "FMQry"
		},
		2247: {
			n: "FMSQry"
		},
		2248: {
			n: "PLV"
		},
		2249: {
			n: "LnExt"
		},
		2250: {
			n: "MkrExt"
		},
		2251: {
			n: "CrtCoopt"
		},
		2262: {
			n: "FRTArchId$",
			r: 12
		},
		29282: {}
	};
	var dv = j(hv, "n");

	function pv(e, r, t, n) {
		var a = +r || +dv[r];
		if (isNaN(a)) return;
		var i = n || (t || []).length || 0;
		var s = e.next(4);
		s._W(2, a);
		s._W(2, i);
		if (i > 0 && yr(t)) e.push(t)
	}

	function vv(e, r, t) {
		if (!e) e = Xr(7);
		e._W(2, r);
		e._W(2, t);
		e._W(2, 0);
		e._W(1, 0);
		return e
	}

	function gv(e, r, t, n) {
		var a = Xr(9);
		vv(a, e, r);
		if (n == "e") {
			a._W(1, t);
			a._W(1, 1)
		} else {
			a._W(1, t ? 1 : 0);
			a._W(1, 0)
		}
		return a
	}

	function mv(e, r, t) {
		var n = Xr(8 + 2 * t.length);
		vv(n, e, r);
		n._W(1, t.length);
		n._W(t.length, t, "sbcs");
		return n.l < n.length ? n.slice(0, n.l) : n
	}

	function bv(e, r, t, n) {
		if (r.v != null) switch (r.t) {
		case "d":
			;
		case "n":
			var a = r.t == "d" ? q(ae(r.v)) : r.v;
			if (a == (a | 0) && a >= 0 && a < 65536) pv(e, 2, Ys(t, n, a));
			else pv(e, 3, js(t, n, a));
			return;
		case "b":
			;
		case "e":
			pv(e, 5, gv(t, n, r.v, r.t));
			return;
		case "s":
			;
		case "str":
			pv(e, 4, mv(t, n, r.v));
			return
		}
		pv(e, 1, vv(null, t, n))
	}

	function Cv(e, r, t, n) {
		var a = Array.isArray(r);
		var i = dt(r["!ref"] || "A1"),
			s, o = "",
			l = [];
		if (i.e.c > 255 || i.e.r > 16383) {
			if (n.WTF) throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
			i.e.c = Math.min(i.e.c, 255);
			i.e.r = Math.min(i.e.c, 16383);
			s = ht(i)
		}
		for (var f = i.s.r; f <= i.e.r; ++f) {
			o = rt(f);
			for (var c = i.s.c; c <= i.e.c; ++c) {
				if (f === i.s.r) l[c] = it(c);
				s = l[c] + o;
				var u = a ? (r[f] || [])[c] : r[s];
				if (!u) continue;
				bv(e, u, f, c, n)
			}
		}
	}

	function Ev(e, r) {
		var t = r || {};
		if (v != null && t.dense == null) t.dense = v;
		var n = jr();
		var a = 0;
		for (var i = 0; i < e.SheetNames.length; ++i)
			if (e.SheetNames[i] == t.sheet) a = i;
		if (a == 0 && !!t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
		pv(n, 9, wi(e, 16, t));
		Cv(n, e.Sheets[e.SheetNames[a]], a, t, e);
		pv(n, 10);
		return n.end()
	}

	function kv(e, r, t) {
		pv(e, "Font", Hi({
			sz: 12,
			color: {
				theme: 1
			},
			name: "Arial",
			family: 2,
			scheme: "minor"
		}, t))
	}

	function Sv(e, r, t) {
		if (!r) return;
		[
			[5, 8],
			[23, 26],
			[41, 44],
			[50, 392]
		].forEach(function (n) {
			for (var a = n[0]; a <= n[1]; ++a)
				if (r[a] != null) pv(e, "Format", ji(a, r[a], t))
		})
	}

	function wv(e, r) {
		var t = Xr(19);
		t._W(4, 2151);
		t._W(4, 0);
		t._W(4, 0);
		t._W(2, 3);
		t._W(1, 1);
		t._W(4, 0);
		pv(e, "FeatHdr", t);
		t = Xr(39);
		t._W(4, 2152);
		t._W(4, 0);
		t._W(4, 0);
		t._W(2, 3);
		t._W(1, 0);
		t._W(4, 0);
		t._W(2, 1);
		t._W(4, 4);
		t._W(2, 0);
		di(dt(r["!ref"] || "A1"), t);
		t._W(4, 4);
		pv(e, "Feat", t)
	}

	function Av(e, r) {
		for (var t = 0; t < 16; ++t) pv(e, "XF", rs({
			numFmtId: 0,
			style: true
		}, 0, r));
		r.cellXfs.forEach(function (t) {
			pv(e, "XF", rs(t, 0, r))
		})
	}

	function _v(e, r) {
		for (var t = 0; t < r["!links"].length; ++t) {
			var n = r["!links"][t];
			pv(e, "HLink", Ts(n));
			if (n[1].Tooltip) pv(e, "HLinkTooltip", xs(n))
		}
		delete r["!links"]
	}

	function Rv(e, r, t, n, a) {
		var i = 16 + Zu(a.cellXfs, r, a);
		if (r.v != null) switch (r.t) {
		case "d":
			;
		case "n":
			var s = r.t == "d" ? q(ae(r.v)) : r.v;
			pv(e, "Number", os(t, n, s, i, a));
			return;
		case "b":
			;
		case "e":
			pv(e, 517, is(t, n, r.v, i, a, r.t));
			return;
		case "s":
			;
		case "str":
			pv(e, "Label", Xi(t, n, r.v, i, a));
			return
		}
		pv(e, "Blank", si(t, n, i))
	}

	function Bv(e, r, t) {
		var n = jr();
		var a = t.SheetNames[e],
			i = t.Sheets[a] || {};
		var s = (t || {}).Workbook || {};
		var o = (s.Sheets || [])[e] || {};
		var l = Array.isArray(i);
		var f = r.biff == 8;
		var c, u = "",
			h = [];
		var d = dt(i["!ref"] || "A1");
		var p = f ? 65536 : 16384;
		if (d.e.c > 255 || d.e.r >= p) {
			if (r.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
			d.e.c = Math.min(d.e.c, 255);
			d.e.r = Math.min(d.e.c, p - 1)
		}
		pv(n, 2057, wi(t, 16, r));
		pv(n, "CalcMode", Ua(1));
		pv(n, "CalcCount", Ua(100));
		pv(n, "CalcRefMode", Ma(true));
		pv(n, "CalcIter", Ma(false));
		pv(n, "CalcDelta", Xt(.001));
		pv(n, "CalcSaveRecalc", Ma(true));
		pv(n, "PrintRowCol", Ma(false));
		pv(n, "PrintGrid", Ma(false));
		pv(n, "GridSet", Ua(1));
		pv(n, "Guts", ns([0, 0]));
		pv(n, "HCenter", Ma(false));
		pv(n, "VCenter", Ma(false));
		pv(n, 512, $i(d, r));
		if (f) i["!links"] = [];
		for (var v = d.s.r; v <= d.e.r; ++v) {
			u = rt(v);
			for (var g = d.s.c; g <= d.e.c; ++g) {
				if (v === d.s.r) h[g] = it(g);
				c = h[g] + u;
				var m = l ? (i[v] || [])[g] : i[c];
				if (!m) continue;
				Rv(n, m, v, g, r);
				if (f && m.l) i["!links"].push([c, m.l])
			}
		}
		var b = o.CodeName || o.name || a;
		if (f && s.Views) pv(n, "Window2", Wi(s.Views[0]));
		if (f && (i["!merges"] || []).length) pv(n, "MergeCells", Ss(i["!merges"]));
		if (f) _v(n, i);
		pv(n, "CodeName", $a(b, r));
		if (f) wv(n, i);
		pv(n, "EOF");
		return n.end()
	}

	function Tv(e, r, t) {
		var n = jr();
		var a = (e || {}).Workbook || {};
		var i = a.Sheets || [];
		var s = a.WBProps || {};
		var o = t.biff == 8,
			l = t.biff == 5;
		pv(n, 2057, wi(e, 5, t));
		if (t.bookType == "xla") pv(n, "Addin");
		pv(n, "InterfaceHdr", o ? Ua(1200) : null);
		pv(n, "Mms", Pa(2));
		if (l) pv(n, "ToolbarHdr");
		if (l) pv(n, "ToolbarEnd");
		pv(n, "InterfaceEnd");
		pv(n, "WriteAccess", Ri("SheetJS", t));
		pv(n, "CodePage", Ua(o ? 1200 : 1252));
		if (o) pv(n, "DSF", Ua(0));
		if (o) pv(n, "Excel9File");
		pv(n, "RRTabId", Ws(e.SheetNames.length));
		if (o && e.vbaraw) {
			pv(n, "ObProj");
			var f = s.CodeName || "ThisWorkbook";
			pv(n, "CodeName", $a(f, t))
		}
		pv(n, "BuiltInFnGroupCount", Ua(17));
		pv(n, "WinProtect", Ma(false));
		pv(n, "Protect", Ma(false));
		pv(n, "Password", Ua(0));
		if (o) pv(n, "Prot4Rev", Ma(false));
		if (o) pv(n, "Prot4RevPass", Ua(0));
		pv(n, "Window1", Li(t));
		pv(n, "Backup", Ma(false));
		pv(n, "HideObj", Ua(0));
		pv(n, "Date1904", Ma(Vd(e) == "true"));
		pv(n, "CalcPrecision", Ma(true));
		if (o) pv(n, "RefreshAll", Ma(false));
		pv(n, "BookBool", Ua(0));
		kv(n, e, t);
		Sv(n, e.SSF, t);
		Av(n, t);
		if (o) pv(n, "UsesELFs", Ma(false));
		var c = n.end();
		var u = jr();
		if (o) pv(u, "Country", Ds());
		pv(u, "EOF");
		var h = u.end();
		var d = jr();
		var p = 0,
			v = 0;
		for (v = 0; v < e.SheetNames.length; ++v) p += (o ? 12 : 11) + (o ? 2 : 1) * e.SheetNames[v].length;
		var g = c.length + p + h.length;
		for (v = 0; v < e.SheetNames.length; ++v) {
			var m = i[v] || {};
			pv(d, "BoundSheet8", yi({
				pos: g,
				hs: m.Hidden || 0,
				dt: 0,
				name: e.SheetNames[v]
			}, t));
			g += r[v].length
		}
		var b = d.end();
		if (p != b.length) throw new Error("BS8 " + p + " != " + b.length);
		var C = [];
		if (c.length) C.push(c);
		if (b.length) C.push(b);
		if (h.length) C.push(h);
		return fr([C])
	}

	function yv(e, r) {
		var t = r || {};
		var n = [];
		if (e && !e.SSF) {
			e.SSF = I.get_table()
		}
		if (e && e.SSF) {
			D(I);
			I.load_table(e.SSF);
			t.revssf = Y(e.SSF);
			t.revssf[e.SSF[65535]] = 0;
			t.ssf = e.SSF
		}
		t.cellXfs = [];
		t.Strings = [];
		t.Strings.Count = 0;
		t.Strings.Unique = 0;
		Zu(t.cellXfs, {}, {
			revssf: {
				General: 0
			}
		});
		for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = Bv(a, t, e);
		n.unshift(Tv(e, n, t));
		return fr([n])
	}

	function xv(e, r) {
		var t = r || {};
		switch (t.biff || 2) {
		case 8:
			;
		case 5:
			return yv(e, r);
		case 4:
			;
		case 3:
			;
		case 2:
			return Ev(e, r)
		}
		throw new Error("invalid type " + t.bookType + " for BIFF")
	}
	var Iv = function () {
		function e(e, r) {
			var t = r || {};
			if (v != null && t.dense == null) t.dense = v;
			var n = t.dense ? [] : {};
			var a = e.match(/<table/i);
			if (!a) throw new Error("Invalid HTML: could not find <table>");
			var i = e.match(/<\/table/i);
			var s = a.index,
				o = i && i.index || e.length;
			var l = ue(e.slice(s, o), /(:?<tr[^>]*>)/i, "<tr>");
			var f = -1,
				c = 0,
				u = 0,
				h = 0;
			var d = {
				s: {
					r: 1e7,
					c: 1e7
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var p = [];
			for (s = 0; s < l.length; ++s) {
				var g = l[s].trim();
				var m = g.slice(0, 3).toLowerCase();
				if (m == "<tr") {
					++f;
					if (t.sheetRows && t.sheetRows <= f) {
						--f;
						break
					}
					c = 0;
					continue
				}
				if (m != "<td" && m != "<th") continue;
				var b = g.split(/<\/t[dh]>/i);
				for (o = 0; o < b.length; ++o) {
					var C = b[o].trim();
					if (!C.match(/<t[dh]/i)) continue;
					var E = C,
						k = 0;
					while (E.charAt(0) == "<" && (k = E.indexOf(">")) > -1) E = E.slice(k + 1);
					var S = Be(C.slice(0, C.indexOf(">")));
					h = S.colspan ? +S.colspan : 1;
					if ((u = +S.rowspan) > 1 || h > 1) p.push({
						s: {
							r: f,
							c: c
						},
						e: {
							r: f + (u || 1) - 1,
							c: c + h - 1
						}
					});
					var w = S.t || "";
					if (!E.length) {
						c += h;
						continue
					}
					E = Ye(E);
					if (d.s.r > f) d.s.r = f;
					if (d.e.r < f) d.e.r = f;
					if (d.s.c > c) d.s.c = c;
					if (d.e.c < c) d.e.c = c;
					if (!E.length) continue;
					var A = {
						t: "s",
						v: E
					};
					if (t.raw || !E.trim().length || w == "s") {} else if (E === "TRUE") A = {
						t: "b",
						v: true
					};
					else if (E === "FALSE") A = {
						t: "b",
						v: false
					};
					else if (!isNaN(le(E))) A = {
						t: "n",
						v: le(E)
					};
					else if (!isNaN(fe(E).getDate())) {
						A = {
							t: "d",
							v: ae(E)
						};
						if (!t.cellDates) A = {
							t: "n",
							v: q(A.v)
						};
						A.z = t.dateNF || I._table[14]
					}
					if (t.dense) {
						if (!n[f]) n[f] = [];
						n[f][c] = A
					} else n[ct({
						r: f,
						c: c
					})] = A;
					c += h
				}
			}
			n["!ref"] = ht(d);
			return n
		}

		function r(r, t) {
			return gt(e(r, t), t)
		}

		function t(e, r, t, n) {
			var a = e["!merges"] || [];
			var i = [];
			for (var s = r.s.c; s <= r.e.c; ++s) {
				var o = 0,
					l = 0;
				for (var f = 0; f < a.length; ++f) {
					if (a[f].s.r > t || a[f].s.c > s) continue;
					if (a[f].e.r < t || a[f].e.c < s) continue;
					if (a[f].s.r < t || a[f].s.c < s) {
						o = -1;
						break
					}
					o = a[f].e.r - a[f].s.r + 1;
					l = a[f].e.c - a[f].s.c + 1;
					break
				}
				if (o < 0) continue;
				var c = ct({
					r: t,
					c: s
				});
				var u = n.dense ? (e[t] || [])[s] : e[c];
				var h = {};
				if (o > 1) h.rowspan = o;
				if (l > 1) h.colspan = l;
				var d = u && u.v != null && (u.h || Le(u.w || (vt(u), u.w) || "")) || "";
				h.t = u && u.t || "z";
				if (n.editable) d = '<span contenteditable="true">' + d + "</span>";
				h.id = "sjs-" + c;
				i.push(tr("td", d, h))
			}
			var p = "<tr>";
			return p + i.join("") + "</tr>"
		}

		function n(e, r, t) {
			var n = [];
			return n.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">"
		}
		var a = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';
		var i = "</body></html>";

		function s(e, r) {
			var s = r || {};
			var o = s.header != null ? s.header : a;
			var l = s.footer != null ? s.footer : i;
			var f = [o];
			var c = ut(e["!ref"]);
			s.dense = Array.isArray(e);
			f.push(n(e, c, s));
			for (var u = c.s.r; u <= c.e.r; ++u) f.push(t(e, c, u, s));
			f.push("</table>" + l);
			return f.join("")
		}
		return {
			to_workbook: r,
			to_sheet: e,
			_row: t,
			BEGIN: a,
			END: i,
			_preamble: n,
			from_sheet: s
		}
	}();

	function Dv(e, r) {
		var t = r || {};
		if (v != null) t.dense = v;
		var n = t.dense ? [] : {};
		var a = e.getElementsByTagName("tr");
		var i = t.sheetRows || 1e7;
		var s = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var o = [],
			l = 0;
		var f = [];
		var c = 0,
			u = 0,
			h, d, p, g;
		for (; c < a.length && u < i; ++c) {
			var m = a[c];
			if (Ov(m)) {
				if (t.display) continue;
				f[u] = {
					hidden: true
				}
			}
			var b = m.children;
			for (h = d = 0; h < b.length; ++h) {
				var C = b[h];
				if (t.display && Ov(C)) continue;
				var E = Ye(C.innerHTML);
				for (l = 0; l < o.length; ++l) {
					var k = o[l];
					if (k.s.c == d && k.s.r <= u && u <= k.e.r) {
						d = k.e.c + 1;
						l = -1
					}
				}
				g = +C.getAttribute("colspan") || 1;
				if ((p = +C.getAttribute("rowspan")) > 0 || g > 1) o.push({
					s: {
						r: u,
						c: d
					},
					e: {
						r: u + (p || 1) - 1,
						c: d + g - 1
					}
				});
				var S = {
					t: "s",
					v: E
				};
				var w = C.getAttribute("t") || "";
				if (E != null) {
					if (E.length == 0) S.t = w || "z";
					else if (t.raw || E.trim().length == 0 || w == "s") {} else if (E === "TRUE") S = {
						t: "b",
						v: true
					};
					else if (E === "FALSE") S = {
						t: "b",
						v: false
					};
					else if (!isNaN(le(E))) S = {
						t: "n",
						v: le(E)
					};
					else if (!isNaN(fe(E).getDate())) {
						S = {
							t: "d",
							v: ae(E)
						};
						if (!t.cellDates) S = {
							t: "n",
							v: q(S.v)
						};
						S.z = t.dateNF || I._table[14]
					}
				}
				if (t.dense) {
					if (!n[u]) n[u] = [];
					n[u][d] = S
				} else n[ct({
					c: d,
					r: u
				})] = S;
				if (s.e.c < d) s.e.c = d;
				d += g
			}++u
		}
		if (o.length) n["!merges"] = o;
		if (f.length) n["!rows"] = f;
		s.e.r = u - 1;
		n["!ref"] = ht(s);
		if (u >= i) n["!fullref"] = ht((s.e.r = a.length - c + u - 1, s));
		return n
	}

	function Fv(e, r) {
		return gt(Dv(e, r), r)
	}

	function Ov(e) {
		var r = "";
		var t = Pv(e);
		if (t) r = t(e).getPropertyValue("display");
		if (!r) r = e.style.display;
		return r === "none"
	}

	function Pv(e) {
		if (e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle === "function") return e.ownerDocument.defaultView
			.getComputedStyle;
		if (typeof getComputedStyle === "function") return getComputedStyle;
		return null
	}
	var Nv = function () {
		var e = function (e) {
			var r = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g,
				function (e, r) {
					return Array(parseInt(r, 10) + 1).join(" ")
				}).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n");
			var t = Ie(r.replace(/<[^>]*>/g, ""));
			return [t]
		};
		var r = {
			day: ["d", "dd"],
			month: ["m", "mm"],
			year: ["y", "yy"],
			hours: ["h", "hh"],
			minutes: ["m", "mm"],
			seconds: ["s", "ss"],
			"am-pm": ["A/P", "AM/PM"],
			"day-of-week": ["ddd", "dddd"],
			era: ["e", "ee"],
			quarter: ["\\Qm", 'm\\"th quarter"']
		};
		return function t(n, a) {
			var i = a || {};
			if (v != null && i.dense == null) i.dense = v;
			var s = Lp(n);
			var o = [],
				l;
			var f;
			var c = {
					name: ""
				},
				u = "",
				h = 0;
			var d;
			var p;
			var g = {},
				m = [];
			var b = i.dense ? [] : {};
			var C, E;
			var k = {
				value: ""
			};
			var S = "",
				w = 0,
				A;
			var _ = [];
			var R = -1,
				B = -1,
				T = {
					s: {
						r: 1e6,
						c: 1e7
					},
					e: {
						r: 0,
						c: 0
					}
				};
			var y = 0;
			var x = {};
			var I = [],
				D = {},
				F = 0,
				O = 0;
			var P = [],
				N = 1,
				L = 1;
			var M = [];
			var W = {
				Names: []
			};
			var U = {};
			var H = ["", ""];
			var V = [],
				z = {};
			var X = "",
				G = 0;
			var j = false,
				K = false;
			var Y = 0;
			Mp.lastIndex = 0;
			s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			while (C = Mp.exec(s)) switch (C[3] = C[3].replace(/_.*$/, "")) {
			case "table":
				;
			case "å·¥ä½œè¡¨":
				if (C[1] === "/") {
					if (T.e.c >= T.s.c && T.e.r >= T.s.r) b["!ref"] = ht(T);
					if (i.sheetRows > 0 && i.sheetRows <= T.e.r) {
						b["!fullref"] = b["!ref"];
						T.e.r = i.sheetRows - 1;
						b["!ref"] = ht(T)
					}
					if (I.length) b["!merges"] = I;
					if (P.length) b["!rows"] = P;
					d.name = d["åç§°"] || d.name;
					if (typeof JSON !== "undefined") JSON.stringify(d);
					m.push(d.name);
					g[d.name] = b;
					K = false
				} else if (C[0].charAt(C[0].length - 2) !== "/") {
					d = Be(C[0], false);
					R = B = -1;
					T.s.r = T.s.c = 1e7;
					T.e.r = T.e.c = 0;
					b = i.dense ? [] : {};
					I = [];
					P = [];
					K = true
				}
				break;
			case "table-row-group":
				if (C[1] === "/") --y;
				else ++y;
				break;
			case "table-row":
				;
			case "è¡Œ":
				if (C[1] === "/") {
					R += N;
					N = 1;
					break
				}
				p = Be(C[0], false);
				if (p["è¡Œå·"]) R = p["è¡Œå·"] - 1;
				else if (R == -1) R = 0;
				N = +p["number-rows-repeated"] || 1;
				if (N < 10)
					for (Y = 0; Y < N; ++Y)
						if (y > 0) P[R + Y] = {
							level: y
						};
				B = -1;
				break;
			case "covered-table-cell":
				if (C[1] !== "/") ++B;
				if (i.sheetStubs) {
					if (i.dense) {
						if (!b[R]) b[R] = [];
						b[R][B] = {
							t: "z"
						}
					} else b[ct({
						r: R,
						c: B
					})] = {
						t: "z"
					}
				}
				S = "";
				_ = [];
				break;
			case "table-cell":
				;
			case "æ•°æ®":
				if (C[0].charAt(C[0].length - 2) === "/") {
					++B;
					k = Be(C[0], false);
					L = parseInt(k["number-columns-repeated"] || "1", 10);
					E = {
						t: "z",
						v: null
					};
					if (k.formula && i.cellFormula != false) E.f = Uu(Ie(k.formula));
					if ((k["æ•°æ®ç±»åž‹"] || k["value-type"]) == "string") {
						E.t = "s";
						E.v = Ie(k["string-value"] || "");
						if (i.dense) {
							if (!b[R]) b[R] = [];
							b[R][B] = E
						} else {
							b[ct({
								r: R,
								c: B
							})] = E
						}
					}
					B += L - 1
				} else if (C[1] !== "/") {
					++B;
					L = 1;
					var $ = N ? R + N - 1 : R;
					if (B > T.e.c) T.e.c = B;
					if (B < T.s.c) T.s.c = B;
					if (R < T.s.r) T.s.r = R;
					if ($ > T.e.r) T.e.r = $;
					k = Be(C[0], false);
					V = [];
					z = {};
					E = {
						t: k["æ•°æ®ç±»åž‹"] || k["value-type"],
						v: null
					};
					if (i.cellFormula) {
						if (k.formula) k.formula = Ie(k.formula);
						if (k["number-matrix-columns-spanned"] && k["number-matrix-rows-spanned"]) {
							F = parseInt(k["number-matrix-rows-spanned"], 10) || 0;
							O = parseInt(k["number-matrix-columns-spanned"], 10) || 0;
							D = {
								s: {
									r: R,
									c: B
								},
								e: {
									r: R + F - 1,
									c: B + O - 1
								}
							};
							E.F = ht(D);
							M.push([D, E.F])
						}
						if (k.formula) E.f = Uu(k.formula);
						else
							for (Y = 0; Y < M.length; ++Y)
								if (R >= M[Y][0].s.r && R <= M[Y][0].e.r)
									if (B >= M[Y][0].s.c && B <= M[Y][0].e.c) E.F = M[Y][1]
					}
					if (k["number-columns-spanned"] || k["number-rows-spanned"]) {
						F = parseInt(k["number-rows-spanned"], 10) || 0;
						O = parseInt(k["number-columns-spanned"], 10) || 0;
						D = {
							s: {
								r: R,
								c: B
							},
							e: {
								r: R + F - 1,
								c: B + O - 1
							}
						};
						I.push(D)
					}
					if (k["number-columns-repeated"]) L = parseInt(k["number-columns-repeated"], 10);
					switch (E.t) {
					case "boolean":
						E.t = "b";
						E.v = He(k["boolean-value"]);
						break;
					case "float":
						E.t = "n";
						E.v = parseFloat(k.value);
						break;
					case "percentage":
						E.t = "n";
						E.v = parseFloat(k.value);
						break;
					case "currency":
						E.t = "n";
						E.v = parseFloat(k.value);
						break;
					case "date":
						E.t = "d";
						E.v = ae(k["date-value"]);
						if (!i.cellDates) {
							E.t = "n";
							E.v = q(E.v)
						}
						E.z = "m/d/yy";
						break;
					case "time":
						E.t = "n";
						E.v = re(k["time-value"]) / 86400;
						break;
					case "number":
						E.t = "n";
						E.v = parseFloat(k["æ•°æ®æ•°å€¼"]);
						break;
					default:
						if (E.t === "string" || E.t === "text" || !E.t) {
							E.t = "s";
							if (k["string-value"] != null) {
								S = Ie(k["string-value"]);
								_ = []
							}
						} else throw new Error("Unsupported value type " + E.t)
					}
				} else {
					j = false;
					if (E.t === "s") {
						E.v = S || "";
						if (_.length) E.R = _;
						j = w == 0
					}
					if (U.Target) E.l = U;
					if (V.length > 0) {
						E.c = V;
						V = []
					}
					if (S && i.cellText !== false) E.w = S;
					if (!j || i.sheetStubs) {
						if (!(i.sheetRows && i.sheetRows <= R)) {
							for (var Z = 0; Z < N; ++Z) {
								L = parseInt(k["number-columns-repeated"] || "1", 10);
								if (i.dense) {
									if (!b[R + Z]) b[R + Z] = [];
									b[R + Z][B] = Z == 0 ? E : se(E);
									while (--L > 0) b[R + Z][B + L] = se(E)
								} else {
									b[ct({
										r: R + Z,
										c: B
									})] = E;
									while (--L > 0) b[ct({
										r: R + Z,
										c: B + L
									})] = se(E)
								}
								if (T.e.c <= B) T.e.c = B
							}
						}
					}
					L = parseInt(k["number-columns-repeated"] || "1", 10);
					B += L - 1;
					L = 0;
					E = {};
					S = "";
					_ = []
				}
				U = {};
				break;
			case "document":
				;
			case "document-content":
				;
			case "ç”µå­è¡¨æ ¼æ–‡æ¡£":
				;
			case "spreadsheet":
				;
			case "ä¸»ä½“":
				;
			case "scripts":
				;
			case "styles":
				;
			case "font-face-decls":
				if (C[1] === "/") {
					if ((l = o.pop())[0] !== C[3]) throw "Bad state: " + l
				} else if (C[0].charAt(C[0].length - 2) !== "/") o.push([C[3], true]);
				break;
			case "annotation":
				if (C[1] === "/") {
					if ((l = o.pop())[0] !== C[3]) throw "Bad state: " + l;
					z.t = S;
					if (_.length) z.R = _;
					z.a = X;
					V.push(z)
				} else if (C[0].charAt(C[0].length - 2) !== "/") {
					o.push([C[3], false])
				}
				X = "";
				G = 0;
				S = "";
				w = 0;
				_ = [];
				break;
			case "creator":
				if (C[1] === "/") {
					X = s.slice(G, C.index)
				} else G = C.index + C[0].length;
				break;
			case "meta":
				;
			case "å…ƒæ•°æ®":
				;
			case "settings":
				;
			case "config-item-set":
				;
			case "config-item-map-indexed":
				;
			case "config-item-map-entry":
				;
			case "config-item-map-named":
				;
			case "shapes":
				;
			case "frame":
				;
			case "text-box":
				;
			case "image":
				;
			case "data-pilot-tables":
				;
			case "list-style":
				;
			case "form":
				;
			case "dde-links":
				;
			case "event-listeners":
				;
			case "chart":
				if (C[1] === "/") {
					if ((l = o.pop())[0] !== C[3]) throw "Bad state: " + l
				} else if (C[0].charAt(C[0].length - 2) !== "/") o.push([C[3], false]);
				S = "";
				w = 0;
				_ = [];
				break;
			case "scientific-number":
				break;
			case "currency-symbol":
				break;
			case "currency-style":
				break;
			case "number-style":
				;
			case "percentage-style":
				;
			case "date-style":
				;
			case "time-style":
				if (C[1] === "/") {
					x[c.name] = u;
					if ((l = o.pop())[0] !== C[3]) throw "Bad state: " + l
				} else if (C[0].charAt(C[0].length - 2) !== "/") {
					u = "";
					c = Be(C[0], false);
					o.push([C[3], true])
				}
				break;
			case "script":
				break;
			case "libraries":
				break;
			case "automatic-styles":
				break;
			case "master-styles":
				break;
			case "default-style":
				;
			case "page-layout":
				break;
			case "style":
				break;
			case "map":
				break;
			case "font-face":
				break;
			case "paragraph-properties":
				break;
			case "table-properties":
				break;
			case "table-column-properties":
				break;
			case "table-row-properties":
				break;
			case "table-cell-properties":
				break;
			case "number":
				switch (o[o.length - 1][0]) {
				case "time-style":
					;
				case "date-style":
					f = Be(C[0], false);
					u += r[C[3]][f.style === "long" ? 1 : 0];
					break
				}
				break;
			case "fraction":
				break;
			case "day":
				;
			case "month":
				;
			case "year":
				;
			case "era":
				;
			case "day-of-week":
				;
			case "week-of-year":
				;
			case "quarter":
				;
			case "hours":
				;
			case "minutes":
				;
			case "seconds":
				;
			case "am-pm":
				switch (o[o.length - 1][0]) {
				case "time-style":
					;
				case "date-style":
					f = Be(C[0], false);
					u += r[C[3]][f.style === "long" ? 1 : 0];
					break
				}
				break;
			case "boolean-style":
				break;
			case "boolean":
				break;
			case "text-style":
				break;
			case "text":
				if (C[0].slice(-2) === "/>") break;
				else if (C[1] === "/") switch (o[o.length - 1][0]) {
				case "number-style":
					;
				case "date-style":
					;
				case "time-style":
					u += s.slice(h, C.index);
					break
				} else h = C.index + C[0].length;
				break;
			case "named-range":
				f = Be(C[0], false);
				H = Vu(f["cell-range-address"]);
				var Q = {
					Name: f.name,
					Ref: H[0] + "!" + H[1]
				};
				if (K) Q.Sheet = m.length;
				W.Names.push(Q);
				break;
			case "text-content":
				break;
			case "text-properties":
				break;
			case "embedded-text":
				break;
			case "body":
				;
			case "ç”µå­è¡¨æ ¼":
				break;
			case "forms":
				break;
			case "table-column":
				break;
			case "table-header-rows":
				break;
			case "table-rows":
				break;
			case "table-column-group":
				break;
			case "table-header-columns":
				break;
			case "table-columns":
				break;
			case "null-date":
				break;
			case "graphic-properties":
				break;
			case "calculation-settings":
				break;
			case "named-expressions":
				break;
			case "label-range":
				break;
			case "label-ranges":
				break;
			case "named-expression":
				break;
			case "sort":
				break;
			case "sort-by":
				break;
			case "sort-groups":
				break;
			case "tab":
				break;
			case "line-break":
				break;
			case "span":
				break;
			case "p":
				;
			case "æ–‡æœ¬ä¸²":
				if (C[1] === "/" && (!k || !k["string-value"])) {
					var J = e(s.slice(w, C.index), A);
					S = (S.length > 0 ? S + "\n" : "") + J[0]
				} else {
					A = Be(C[0], false);
					w = C.index + C[0].length
				}
				break;
			case "s":
				break;
			case "database-range":
				if (C[1] === "/") break;
				try {
					H = Vu(Be(C[0])["target-range-address"]);
					g[H[0]]["!autofilter"] = {
						ref: H[1]
					}
				} catch (e) {}
				break;
			case "date":
				break;
			case "object":
				break;
			case "title":
				;
			case "æ ‡é¢˜":
				break;
			case "desc":
				break;
			case "binary-data":
				break;
			case "table-source":
				break;
			case "scenario":
				break;
			case "iteration":
				break;
			case "content-validations":
				break;
			case "content-validation":
				break;
			case "help-message":
				break;
			case "error-message":
				break;
			case "database-ranges":
				break;
			case "filter":
				break;
			case "filter-and":
				break;
			case "filter-or":
				break;
			case "filter-condition":
				break;
			case "list-level-style-bullet":
				break;
			case "list-level-style-number":
				break;
			case "list-level-properties":
				break;
			case "sender-firstname":
				;
			case "sender-lastname":
				;
			case "sender-initials":
				;
			case "sender-title":
				;
			case "sender-position":
				;
			case "sender-email":
				;
			case "sender-phone-private":
				;
			case "sender-fax":
				;
			case "sender-company":
				;
			case "sender-phone-work":
				;
			case "sender-street":
				;
			case "sender-city":
				;
			case "sender-postal-code":
				;
			case "sender-country":
				;
			case "sender-state-or-province":
				;
			case "author-name":
				;
			case "author-initials":
				;
			case "chapter":
				;
			case "file-name":
				;
			case "template-name":
				;
			case "sheet-name":
				break;
			case "event-listener":
				break;
			case "initial-creator":
				;
			case "creation-date":
				;
			case "print-date":
				;
			case "generator":
				;
			case "document-statistic":
				;
			case "user-defined":
				;
			case "editing-duration":
				;
			case "editing-cycles":
				break;
			case "config-item":
				break;
			case "page-number":
				break;
			case "page-count":
				break;
			case "time":
				break;
			case "cell-range-source":
				break;
			case "detective":
				break;
			case "operation":
				break;
			case "highlighted-range":
				break;
			case "data-pilot-table":
				;
			case "source-cell-range":
				;
			case "source-service":
				;
			case "data-pilot-field":
				;
			case "data-pilot-level":
				;
			case "data-pilot-subtotals":
				;
			case "data-pilot-subtotal":
				;
			case "data-pilot-members":
				;
			case "data-pilot-member":
				;
			case "data-pilot-display-info":
				;
			case "data-pilot-sort-info":
				;
			case "data-pilot-layout-info":
				;
			case "data-pilot-field-reference":
				;
			case "data-pilot-groups":
				;
			case "data-pilot-group":
				;
			case "data-pilot-group-member":
				break;
			case "rect":
				break;
			case "dde-connection-decls":
				;
			case "dde-connection-decl":
				;
			case "dde-link":
				;
			case "dde-source":
				break;
			case "properties":
				break;
			case "property":
				break;
			case "a":
				if (C[1] !== "/") {
					U = Be(C[0], false);
					if (!U.href) break;
					U.Target = U.href;
					delete U.href;
					if (U.Target.charAt(0) == "#" && U.Target.indexOf(".") > -1) {
						H = Vu(U.Target.slice(1));
						U.Target = "#" + H[0] + "!" + H[1]
					}
				}
				break;
			case "table-protection":
				break;
			case "data-pilot-grand-total":
				break;
			case "office-document-common-attrs":
				break;
			default:
				switch (C[2]) {
				case "dc:":
					;
				case "calcext:":
					;
				case "loext:":
					;
				case "ooo:":
					;
				case "chartooo:":
					;
				case "draw:":
					;
				case "style:":
					;
				case "chart:":
					;
				case "form:":
					;
				case "uof:":
					;
				case "è¡¨:":
					;
				case "å­—:":
					break;
				default:
					if (i.WTF) throw new Error(C)
				}
			}
			var ee = {
				Sheets: g,
				SheetNames: m,
				Workbook: W
			};
			if (i.bookSheets) delete ee.Sheets;
			return ee
		}
	}();

	function Lv(e, r) {
		r = r || {};
		var t = !!ve(e, "objectdata");
		if (t) Mn(me(e, "META-INF/manifest.xml"), r);
		var n = be(e, "content.xml");
		if (!n) throw new Error("Missing content.xml in " + (t ? "ODS" : "UOF") + " file");
		var a = Nv(t ? n : Ve(n), r);
		if (ve(e, "meta.xml")) a.Props = jn(me(e, "meta.xml"));
		return a
	}

	function Mv(e, r) {
		return Nv(e, r)
	}
	var Wv = function () {
		var e = "<office:document-styles " + rr({
			"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
			"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
			"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
			"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
			"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
			"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
			"xmlns:xlink": "http://www.w3.org/1999/xlink",
			"xmlns:dc": "http://purl.org/dc/elements/1.1/",
			"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
			"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
			"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
			"office:version": "1.2"
		}) + "></office:document-styles>";
		return function r() {
			return Se + e
		}
	}();
	var Uv = function () {
		var e = function (e) {
			return Oe(e).replace(/  +/g, function (e) {
				return '<text:s text:c="' + e.length + '"/>'
			}).replace(/\t/g, "<text:tab/>").replace(/\n/g, "<text:line-break/>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
		};
		var r = "          <table:table-cell />\n";
		var t = "          <table:covered-table-cell/>\n";
		var n = function (n, a, i) {
			var s = [];
			s.push('      <table:table table:name="' + Oe(a.SheetNames[i]) + '">\n');
			var o = 0,
				l = 0,
				f = ut(n["!ref"]);
			var c = n["!merges"] || [],
				u = 0;
			var h = Array.isArray(n);
			for (o = 0; o < f.s.r; ++o) s.push("        <table:table-row></table:table-row>\n");
			for (; o <= f.e.r; ++o) {
				s.push("        <table:table-row>\n");
				for (l = 0; l < f.s.c; ++l) s.push(r);
				for (; l <= f.e.c; ++l) {
					var d = false,
						p = {},
						v = "";
					for (u = 0; u != c.length; ++u) {
						if (c[u].s.c > l) continue;
						if (c[u].s.r > o) continue;
						if (c[u].e.c < l) continue;
						if (c[u].e.r < o) continue;
						if (c[u].s.c != l || c[u].s.r != o) d = true;
						p["table:number-columns-spanned"] = c[u].e.c - c[u].s.c + 1;
						p["table:number-rows-spanned"] = c[u].e.r - c[u].s.r + 1;
						break
					}
					if (d) {
						s.push(t);
						continue
					}
					var g = ct({
							r: o,
							c: l
						}),
						m = h ? (n[o] || [])[l] : n[g];
					if (m && m.f) {
						p["table:formula"] = Oe(Hu(m.f));
						if (m.F) {
							if (m.F.slice(0, g.length) == g) {
								var b = ut(m.F);
								p["table:number-matrix-columns-spanned"] = b.e.c - b.s.c + 1;
								p["table:number-matrix-rows-spanned"] = b.e.r - b.s.r + 1
							}
						}
					}
					if (!m) {
						s.push(r);
						continue
					}
					switch (m.t) {
					case "b":
						v = m.v ? "TRUE" : "FALSE";
						p["office:value-type"] = "boolean";
						p["office:boolean-value"] = m.v ? "true" : "false";
						break;
					case "n":
						v = m.w || String(m.v || 0);
						p["office:value-type"] = "float";
						p["office:value"] = m.v || 0;
						break;
					case "s":
						;
					case "str":
						v = m.v;
						p["office:value-type"] = "string";
						break;
					case "d":
						v = m.w || ae(m.v).toISOString();
						p["office:value-type"] = "date";
						p["office:date-value"] = ae(m.v).toISOString();
						p["table:style-name"] = "ce1";
						break;
					default:
						s.push(r);
						continue
					}
					var C = e(v);
					if (m.l && m.l.Target) {
						var E = m.l.Target;
						E = E.charAt(0) == "#" ? "#" + zu(E.slice(1)) : E;
						C = tr("text:a", C, {
							"xlink:href": E
						})
					}
					s.push("          " + tr("table:table-cell", tr("text:p", C, {}), p) + "\n")
				}
				s.push("        </table:table-row>\n")
			}
			s.push("      </table:table>\n");
			return s.join("")
		};
		var a = function (e) {
			e.push(" <office:automatic-styles>\n");
			e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');
			e.push('   <number:month number:style="long"/>\n');
			e.push("   <number:text>/</number:text>\n");
			e.push('   <number:day number:style="long"/>\n');
			e.push("   <number:text>/</number:text>\n");
			e.push("   <number:year/>\n");
			e.push("  </number:date-style>\n");
			e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');
			e.push(" </office:automatic-styles>\n")
		};
		return function e(r, t) {
			var i = [Se];
			var e = rr({
				"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
				"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
				"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
				"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
				"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
				"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
				"xmlns:xlink": "http://www.w3.org/1999/xlink",
				"xmlns:dc": "http://purl.org/dc/elements/1.1/",
				"xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
				"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
				"xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
				"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
				"xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
				"xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
				"xmlns:math": "http://www.w3.org/1998/Math/MathML",
				"xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
				"xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
				"xmlns:ooo": "http://openoffice.org/2004/office",
				"xmlns:ooow": "http://openoffice.org/2004/writer",
				"xmlns:oooc": "http://openoffice.org/2004/calc",
				"xmlns:dom": "http://www.w3.org/2001/xml-events",
				"xmlns:xforms": "http://www.w3.org/2002/xforms",
				"xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
				"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
				"xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
				"xmlns:rpt": "http://openoffice.org/2005/report",
				"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
				"xmlns:xhtml": "http://www.w3.org/1999/xhtml",
				"xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
				"xmlns:tableooo": "http://openoffice.org/2009/table",
				"xmlns:drawooo": "http://openoffice.org/2010/draw",
				"xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
				"xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
				"xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
				"xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
				"xmlns:css3t": "http://www.w3.org/TR/css3-text/",
				"office:version": "1.2"
			});
			var s = rr({
				"xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
				"office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
			});
			if (t.bookType == "fods") i.push("<office:document" + e + s + ">\n");
			else i.push("<office:document-content" + e + ">\n");
			a(i);
			i.push("  <office:body>\n");
			i.push("    <office:spreadsheet>\n");
			for (var o = 0; o != r.SheetNames.length; ++o) i.push(n(r.Sheets[r.SheetNames[o]], r, o, t));
			i.push("    </office:spreadsheet>\n");
			i.push("  </office:body>\n");
			if (t.bookType == "fods") i.push("</office:document>");
			else i.push("</office:document-content>");
			return i.join("")
		}
	}();

	function Hv(e, r) {
		if (r.bookType == "fods") return Uv(e, r);
		var t = new Ee;
		var n = "";
		var a = [];
		var i = [];
		n = "mimetype";
		t.file(n, "application/vnd.oasis.opendocument.spreadsheet");
		n = "content.xml";
		t.file(n, Uv(e, r));
		a.push([n, "text/xml"]);
		i.push([n, "ContentFile"]);
		n = "styles.xml";
		t.file(n, Wv(e, r));
		a.push([n, "text/xml"]);
		i.push([n, "StylesFile"]);
		n = "meta.xml";
		t.file(n, zn());
		a.push([n, "text/xml"]);
		i.push([n, "MetadataFile"]);
		n = "manifest.rdf";
		t.file(n, Vn(i));
		a.push([n, "application/rdf+xml"]);
		n = "META-INF/manifest.xml";
		t.file(n, Wn(a));
		return t
	}

	function Vv(e, r) {
		if (!r) return 0;
		var t = e.SheetNames.indexOf(r);
		if (t == -1) throw new Error("Sheet not found: " + r);
		return t
	}

	function zv(e) {
		return function r(t, n) {
			var a = Vv(t, n.sheet);
			return e.from_sheet(t.Sheets[t.SheetNames[a]], n, t)
		}
	}
	var Xv = zv(Iv);
	var Gv = zv({
		from_sheet: Fg
	});
	var jv = zv(qs);
	var Kv = zv(eo);
	var Yv = zv(to);
	var $v = zv(Go);
	var Zv = zv({
		from_sheet: Og
	});
	var Qv = zv(Js);
	var Jv = zv(ro);

	function qv(e) {
		return function r(t) {
			for (var n = 0; n != e.length; ++n) {
				var a = e[n];
				if (t[a[0]] === undefined) t[a[0]] = a[1];
				if (a[2] === "n") t[a[0]] = Number(t[a[0]])
			}
		}
	}
	var eg = qv([
		["cellNF", false],
		["cellHTML", true],
		["cellFormula", true],
		["cellStyles", false],
		["cellText", true],
		["cellDates", false],
		["sheetStubs", false],
		["sheetRows", 0, "n"],
		["bookDeps", false],
		["bookSheets", false],
		["bookProps", false],
		["bookFiles", false],
		["bookVBA", false],
		["password", ""],
		["WTF", false]
	]);
	var rg = qv([
		["cellDates", false],
		["bookSST", false],
		["bookType", "xlsx"],
		["compression", false],
		["WTF", false]
	]);

	function tg(e) {
		if (In.WS.indexOf(e) > -1) return "sheet";
		if (In.CS && e == In.CS) return "chart";
		if (In.DS && e == In.DS) return "dialog";
		if (In.MS && e == In.MS) return "macro";
		return e && e.length ? e : "sheet"
	}

	function ng(e, r) {
		if (!e) return 0;
		try {
			e = r.map(function r(t) {
				if (!t.id) t.id = t.strRelID;
				return [t.name, e["!id"][t.id].Target, tg(e["!id"][t.id].Type)]
			})
		} catch (e) {
			return null
		}
		return !e || e.length === 0 ? null : e
	}

	function ag(e, r, t, n, a, i, s, o, l, f, c, u) {
		try {
			i[n] = Fn(be(e, t, true), r);
			var h = me(e, r);
			var d;
			switch (o) {
			case "sheet":
				d = cp(h, r, a, l, i[n], f, c, u);
				break;
			case "chart":
				d = up(h, r, a, l, i[n], f, c, u);
				if (!d || !d["!chart"]) break;
				var p = ke(d["!chart"].Target, r);
				var v = Dn(p);
				var g = kf(be(e, p, true), Fn(be(e, v, true), p));
				var m = ke(g, p);
				var b = Dn(m);
				d = Td(be(e, m, true), m, l, Fn(be(e, b, true), m), f, d);
				break;
			case "macro":
				d = hp(h, r, a, l, i[n], f, c, u);
				break;
			case "dialog":
				d = dp(h, r, a, l, i[n], f, c, u);
				break
			}
			s[n] = d
		} catch (e) {
			if (l.WTF) throw e
		}
	}

	function ig(e) {
		return e.charAt(0) == "/" ? e.slice(1) : e
	}

	function sg(e, r) {
		D(I);
		r = r || {};
		eg(r);
		if (ve(e, "META-INF/manifest.xml")) return Lv(e, r);
		if (ve(e, "objectdata.xml")) return Lv(e, r);
		if (ve(e, "Index/Document.iwa")) throw new Error("Unsupported NUMBERS file");
		var t = Ce(e);
		var n = Bn(be(e, "[Content_Types].xml"));
		var a = false;
		var i, s;
		if (n.workbooks.length === 0) {
			s = "xl/workbook.xml";
			if (me(e, s, true)) n.workbooks.push(s)
		}
		if (n.workbooks.length === 0) {
			s = "xl/workbook.bin";
			if (!me(e, s, true)) throw new Error("Could not find workbook");
			n.workbooks.push(s);
			a = true
		}
		if (n.workbooks[0].slice(-3) == "bin") a = true;
		var o = {};
		var l = {};
		if (!r.bookSheets && !r.bookProps) {
			Xu = [];
			if (n.sst) try {
				Xu = gp(me(e, ig(n.sst)), n.sst, r)
			} catch (e) {
				if (r.WTF) throw e
			}
			if (r.cellStyles && n.themes.length) o = vp(be(e, n.themes[0].replace(/^\//, ""), true) || "", n.themes[0], r);
			if (n.style) l = pp(me(e, ig(n.style)), n.style, o, r)
		}
		n.links.map(function (t) {
			return Cp(me(e, ig(t)), t, r)
		});
		var f = fp(me(e, ig(n.workbooks[0])), n.workbooks[0], r);
		var c = {},
			u = "";
		if (n.coreprops.length) {
			u = me(e, ig(n.coreprops[0]), true);
			if (u) c = jn(u);
			if (n.extprops.length !== 0) {
				u = me(e, ig(n.extprops[0]), true);
				if (u) qn(u, c, r)
			}
		}
		var h = {};
		if (!r.bookSheets || r.bookProps) {
			if (n.custprops.length !== 0) {
				u = be(e, ig(n.custprops[0]), true);
				if (u) h = na(u, r)
			}
		}
		var d = {};
		if (r.bookSheets || r.bookProps) {
			if (f.Sheets) i = f.Sheets.map(function e(r) {
				return r.name
			});
			else if (c.Worksheets && c.SheetNames.length > 0) i = c.SheetNames;
			if (r.bookProps) {
				d.Props = c;
				d.Custprops = h
			}
			if (r.bookSheets && typeof i !== "undefined") d.SheetNames = i;
			if (r.bookSheets ? d.SheetNames : r.bookProps) return d
		}
		i = {};
		var p = {};
		if (r.bookDeps && n.calcchain) p = bp(me(e, ig(n.calcchain)), n.calcchain, r);
		var v = 0;
		var g = {};
		var m, b; {
			var C = f.Sheets;
			c.Worksheets = C.length;
			c.SheetNames = [];
			for (var E = 0; E != C.length; ++E) {
				c.SheetNames[E] = C[E].name
			}
		}
		var k = a ? "bin" : "xml";
		var S = n.workbooks[0].lastIndexOf("/");
		var w = (n.workbooks[0].slice(0, S + 1) + "_rels/" + n.workbooks[0].slice(S + 1) + ".rels").replace(/^\//, "");
		if (!ve(e, w)) w = "xl/_rels/workbook." + k + ".rels";
		var A = Fn(be(e, w, true), w);
		if (A) A = ng(A, f.Sheets);
		var _ = me(e, "xl/worksheets/sheet.xml", true) ? 1 : 0;
		for (v = 0; v != c.Worksheets; ++v) {
			var R = "sheet";
			if (A && A[v]) {
				m = "xl/" + A[v][1].replace(/[\/]?xl\//, "");
				if (!ve(e, m)) m = A[v][1];
				if (!ve(e, m)) m = w.replace(/_rels\/.*$/, "") + A[v][1];
				R = A[v][2]
			} else {
				m = "xl/worksheets/sheet" + (v + 1 - _) + "." + k;
				m = m.replace(/sheet0\./, "sheet.")
			}
			b = m.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels");
			ag(e, m, b, c.SheetNames[v], v, g, i, R, r, f, o, l)
		}
		if (n.comments) Af(e, n.comments, i, g, r);
		d = {
			Directory: n,
			Workbook: f,
			Props: c,
			Custprops: h,
			Deps: p,
			Sheets: i,
			SheetNames: c.SheetNames,
			Strings: Xu,
			Styles: l,
			Themes: o,
			SSF: I.get_table()
		};
		if (r.bookFiles) {
			d.keys = t;
			d.files = e.files
		}
		if (r.bookVBA) {
			if (n.vba.length > 0) d.vbaraw = me(e, ig(n.vba[0]), true);
			else if (n.defaults && n.defaults.bin === Pf) d.vbaraw = me(e, "xl/vbaProject.bin", true)
		}
		return d
	}

	function og(e, r) {
		var t = r || {};
		var n = "Workbook",
			a = U.find(e, n);
		try {
			n = "/!DataSpaces/Version";
			a = U.find(e, n);
			if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
			Ao(a.content);
			n = "/!DataSpaces/DataSpaceMap";
			a = U.find(e, n);
			if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
			var i = Ro(a.content);
			if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !==
				"EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + n);
			n = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";
			a = U.find(e, n);
			if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
			var s = Bo(a.content);
			if (s.length != 1 || s[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + n);
			n = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";
			a = U.find(e, n);
			if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
			yo(a.content)
		} catch (e) {}
		n = "/EncryptionInfo";
		a = U.find(e, n);
		if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
		var o = Do(a.content);
		n = "/EncryptedPackage";
		a = U.find(e, n);
		if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
		if (o[0] == 4 && typeof decrypt_agile !== "undefined") return decrypt_agile(o[1], a.content, t.password || "", t);
		if (o[0] == 2 && typeof decrypt_std76 !== "undefined") return decrypt_std76(o[1], a.content, t.password || "", t);
		throw new Error("File is password-protected")
	}

	function lg(e, r) {
		Sf = 1024;
		if (r.bookType == "ods") return Hv(e, r);
		if (e && !e.SSF) {
			e.SSF = I.get_table()
		}
		if (e && e.SSF) {
			D(I);
			I.load_table(e.SSF);
			r.revssf = Y(e.SSF);
			r.revssf[e.SSF[65535]] = 0;
			r.ssf = e.SSF
		}
		r.rels = {};
		r.wbrels = {};
		r.Strings = [];
		r.Strings.Count = 0;
		r.Strings.Unique = 0;
		if (ju) r.revStrings = new Map;
		else {
			r.revStrings = {};
			r.revStrings.foo = [];
			delete r.revStrings.foo
		}
		var t = r.bookType == "xlsb" ? "bin" : "xml";
		var n = Mf.indexOf(r.bookType) > -1;
		var a = Rn();
		rg(r = r || {});
		var i = new Ee;
		var s = "",
			o = 0;
		r.cellXfs = [];
		Zu(r.cellXfs, {}, {
			revssf: {
				General: 0
			}
		});
		if (!e.Props) e.Props = {};
		s = "docProps/core.xml";
		i.file(s, $n(e.Props, r));
		a.coreprops.push(s);
		Nn(r.rels, 2, s, In.CORE_PROPS);
		s = "docProps/app.xml";
		if (e.Props && e.Props.SheetNames) {} else if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
		else {
			var l = [];
			for (var f = 0; f < e.SheetNames.length; ++f)
				if ((e.Workbook.Sheets[f] || {}).Hidden != 2) l.push(e.SheetNames[f]);
			e.Props.SheetNames = l
		}
		e.Props.Worksheets = e.Props.SheetNames.length;
		i.file(s, ra(e.Props, r));
		a.extprops.push(s);
		Nn(r.rels, 3, s, In.EXT_PROPS);
		if (e.Custprops !== e.Props && G(e.Custprops || {}).length > 0) {
			s = "docProps/custom.xml";
			i.file(s, ia(e.Custprops, r));
			a.custprops.push(s);
			Nn(r.rels, 4, s, In.CUST_PROPS)
		}
		for (o = 1; o <= e.SheetNames.length; ++o) {
			var c = {
				"!id": {}
			};
			var u = e.Sheets[e.SheetNames[o - 1]];
			var h = (u || {})["!type"] || "sheet";
			switch (h) {
			case "chart":
				;
			default:
				s = "xl/worksheets/sheet" + o + "." + t;
				i.file(s, kp(o - 1, s, r, e, c));
				a.sheets.push(s);
				Nn(r.wbrels, -1, "worksheets/sheet" + o + "." + t, In.WS[0])
			}
			if (u) {
				var d = u["!comments"];
				var p = false;
				if (d && d.length > 0) {
					var v = "xl/comments" + o + "." + t;
					i.file(v, _p(d, v, r));
					a.comments.push(v);
					Nn(c, -1, "../comments" + o + "." + t, In.CMNT);
					p = true
				}
				if (u["!legacy"]) {
					if (p) i.file("xl/drawings/vmlDrawing" + o + ".vml", wf(o, u["!comments"]))
				}
				delete u["!comments"];
				delete u["!legacy"]
			}
			if (c["!id"].rId1) i.file(Dn(s), Pn(c))
		}
		if (r.Strings != null && r.Strings.length > 0) {
			s = "xl/sharedStrings." + t;
			i.file(s, Ap(r.Strings, s, r));
			a.strs.push(s);
			Nn(r.wbrels, -1, "sharedStrings." + t, In.SST)
		}
		s = "xl/workbook." + t;
		i.file(s, Ep(e, s, r));
		a.workbooks.push(s);
		Nn(r.rels, 1, s, In.WB);
		s = "xl/theme/theme1.xml";
		i.file(s, of(e.Themes, r));
		a.themes.push(s);
		Nn(r.wbrels, -1, "theme/theme1.xml", In.THEME);
		s = "xl/styles." + t;
		i.file(s, wp(e, s, r));
		a.styles.push(s);
		Nn(r.wbrels, -1, "styles." + t, In.STY);
		if (e.vbaraw && n) {
			s = "xl/vbaProject.bin";
			i.file(s, e.vbaraw);
			a.vba.push(s);
			Nn(r.wbrels, -1, "vbaProject.bin", In.VBA)
		}
		i.file("[Content_Types].xml", xn(a, r));
		i.file("_rels/.rels", Pn(r.rels));
		i.file("xl/_rels/workbook." + t + ".rels", Pn(r.wbrels));
		delete r.revssf;
		delete r.ssf;
		return i
	}

	function fg(e, r) {
		var t = "";
		switch ((r || {}).type || "base64") {
		case "buffer":
			return [e[0], e[1], e[2], e[3]];
		case "base64":
			t = m.decode(e.slice(0, 24));
			break;
		case "binary":
			t = e;
			break;
		case "array":
			return [e[0], e[1], e[2], e[3]];
		default:
			throw new Error("Unrecognized type " + (r && r.type || "undefined"))
		}
		return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]
	}

	function cg(e, r) {
		if (U.find(e, "EncryptedPackage")) return og(e, r);
		return lv(e, r)
	}

	function ug(e, r) {
		var t, n = e;
		var a = r || {};
		if (!a.type) a.type = b && Buffer.isBuffer(e) ? "buffer" : "base64";
		switch (a.type) {
		case "base64":
			t = new Ee(n, {
				base64: true
			});
			break;
		case "binary":
			;
		case "array":
			t = new Ee(n, {
				base64: false
			});
			break;
		case "buffer":
			t = new Ee(n);
			break;
		default:
			throw new Error("Unrecognized type " + a.type)
		}
		return sg(t, a)
	}

	function hg(e, r) {
		var t = 0;
		e: while (t < e.length) switch (e.charCodeAt(t)) {
		case 10:
			;
		case 13:
			;
		case 32:
			++t;
			break;
		case 60:
			return Up(e.slice(t), r);
		default:
			break e
		}
		return to.to_workbook(e, r)
	}

	function dg(e, r) {
		var t = "",
			n = fg(e, r);
		switch (r.type) {
		case "base64":
			t = m.decode(e);
			break;
		case "binary":
			t = e;
			break;
		case "buffer":
			t = e.toString("binary");
			break;
		case "array":
			t = ie(e);
			break;
		default:
			throw new Error("Unrecognized type " + r.type)
		}
		if (n[0] == 239 && n[1] == 187 && n[2] == 191) t = Ve(t);
		return hg(t, r)
	}

	function pg(e, r) {
		var t = e;
		if (r.type == "base64") t = m.decode(t);
		t = cptable.utils.decode(1200, t.slice(2), "str");
		r.type = "binary";
		return hg(t, r)
	}

	function vg(e) {
		return !e.match(/[^\x00-\x7F]/) ? e : ze(e)
	}

	function gg(e, r, t, n) {
		if (n) {
			t.type = "string";
			return to.to_workbook(e, t)
		}
		return to.to_workbook(r, t)
	}

	function mg(e, r) {
		f();
		if (typeof ArrayBuffer !== "undefined" && e instanceof ArrayBuffer) return mg(new Uint8Array(e), r);
		var t = e,
			n = [0, 0, 0, 0],
			a = false;
		var i = r || {};
		Gu = {};
		if (i.dateNF) Gu.dateNF = i.dateNF;
		if (!i.type) i.type = b && Buffer.isBuffer(e) ? "buffer" : "base64";
		if (i.type == "file") {
			i.type = b ? "buffer" : "binary";
			t = X(e)
		}
		if (i.type == "string") {
			a = true;
			i.type = "binary";
			i.codepage = 65001;
			t = vg(e)
		}
		if (i.type == "array" && typeof Uint8Array !== "undefined" && e instanceof Uint8Array && typeof ArrayBuffer !== "undefined") {
			var s = new ArrayBuffer(3),
				o = new Uint8Array(s);
			o.foo = "bar";
			if (!o.foo) {
				i = se(i);
				i.type = "array";
				return mg(B(t), i)
			}
		}
		switch ((n = fg(t, i))[0]) {
		case 208:
			return cg(U.read(t, i), i);
		case 9:
			return lv(t, i);
		case 60:
			return Up(t, i);
		case 73:
			if (n[1] === 68) return no(t, i);
			break;
		case 84:
			if (n[1] === 65 && n[2] === 66 && n[3] === 76) return eo.to_workbook(t, i);
			break;
		case 80:
			return n[1] === 75 && n[2] < 9 && n[3] < 9 ? ug(t, i) : gg(e, t, i, a);
		case 239:
			return n[3] === 60 ? Up(t, i) : gg(e, t, i, a);
		case 255:
			if (n[1] === 254) {
				return pg(t, i)
			}
			break;
		case 0:
			if (n[1] === 0 && n[2] >= 2 && n[3] === 0) return ao.to_workbook(t, i);
			break;
		case 3:
			;
		case 131:
			;
		case 139:
			;
		case 140:
			return Js.to_workbook(t, i);
		case 123:
			if (n[1] === 92 && n[2] === 114 && n[3] === 116) return Go.to_workbook(t, i);
			break;
		case 10:
			;
		case 13:
			;
		case 32:
			return dg(t, i)
		}
		if (n[2] <= 12 && n[3] <= 31) return Js.to_workbook(t, i);
		return gg(e, t, i, a)
	}

	function bg(e, r) {
		var t = r || {};
		t.type = "file";
		return mg(e, t)
	}

	function Cg(e, r) {
		switch (r.type) {
		case "base64":
			;
		case "binary":
			break;
		case "buffer":
			;
		case "array":
			r.type = "";
			break;
		case "file":
			return z(r.file, U.write(e, {
				type: b ? "buffer" : ""
			}));
		case "string":
			throw new Error("'string' output type invalid for '" + r.bookType + "' files");
		default:
			throw new Error("Unrecognized type " + r.type)
		}
		return U.write(e, r)
	}

	function Eg(e, r) {
		var t = r || {};
		var n = lg(e, t);
		var a = {};
		if (t.compression) a.compression = "DEFLATE";
		if (t.password) a.type = b ? "nodebuffer" : "string";
		else switch (t.type) {
		case "base64":
			a.type = "base64";
			break;
		case "binary":
			a.type = "string";
			break;
		case "string":
			throw new Error("'string' output type invalid for '" + t.bookType + "' files");
		case "buffer":
			;
		case "file":
			a.type = b ? "nodebuffer" : "string";
			break;
		default:
			throw new Error("Unrecognized type " + t.type)
		}
		var i = n.generate(a);
		if (t.password && typeof encrypt_agile !== "undefined") return Cg(encrypt_agile(i, t.password), t);
		if (t.type === "file") return z(t.file, i);
		return t.type == "string" ? Ve(i) : i
	}

	function kg(e, r) {
		var t = r || {};
		var n = fv(e, t);
		return Cg(n, t)
	}

	function Sg(e, r, t) {
		if (!t) t = "";
		var n = t + e;
		switch (r.type) {
		case "base64":
			return m.encode(ze(n));
		case "binary":
			return ze(n);
		case "string":
			return e;
		case "file":
			return z(r.file, n, "utf8");
		case "buffer":
			{
				if (b) return C(n, "utf8");
				else return Sg(n, {
					type: "binary"
				}).split("").map(function (e) {
					return e.charCodeAt(0)
				})
			}
		}
		throw new Error("Unrecognized type " + r.type)
	}

	function wg(e, r) {
		switch (r.type) {
		case "base64":
			return m.encode(e);
		case "binary":
			return e;
		case "string":
			return e;
		case "file":
			return z(r.file, e, "binary");
		case "buffer":
			{
				if (b) return C(e, "binary");
				else return e.split("").map(function (e) {
					return e.charCodeAt(0)
				})
			}
		}
		throw new Error("Unrecognized type " + r.type)
	}

	function Ag(e, r) {
		switch (r.type) {
		case "string":
			;
		case "base64":
			;
		case "binary":
			var t = "";
			for (var n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
			return r.type == "base64" ? m.encode(t) : r.type == "string" ? Ve(t) : t;
		case "file":
			return z(r.file, e);
		case "buffer":
			return e;
		default:
			throw new Error("Unrecognized type " + r.type)
		}
	}

	function _g(e, r) {
		jd(e);
		var t = r || {};
		if (t.type == "array") {
			t.type = "binary";
			var n = _g(e, t);
			t.type = "array";
			return A(n)
		}
		switch (t.bookType || "xlsb") {
		case "xml":
			;
		case "xlml":
			return Sg(qp(e, t), t);
		case "slk":
			;
		case "sylk":
			return Sg(jv(e, t), t);
		case "htm":
			;
		case "html":
			return Sg(Xv(e, t), t);
		case "txt":
			return wg(Zv(e, t), t);
		case "csv":
			return Sg(Gv(e, t), t, "\ufeff");
		case "dif":
			return Sg(Kv(e, t), t);
		case "dbf":
			return Ag(Qv(e, t), t);
		case "prn":
			return Sg(Yv(e, t), t);
		case "rtf":
			return Sg($v(e, t), t);
		case "eth":
			return Sg(Jv(e, t), t);
		case "fods":
			return Sg(Hv(e, t), t);
		case "biff2":
			if (!t.biff) t.biff = 2;
		case "biff3":
			if (!t.biff) t.biff = 3;
		case "biff4":
			if (!t.biff) t.biff = 4;
			return Ag(xv(e, t), t);
		case "biff5":
			if (!t.biff) t.biff = 5;
		case "biff8":
			;
		case "xla":
			;
		case "xls":
			if (!t.biff) t.biff = 8;
			return kg(e, t);
		case "xlsx":
			;
		case "xlsm":
			;
		case "xlam":
			;
		case "xlsb":
			;
		case "ods":
			return Eg(e, t);
		default:
			throw new Error("Unrecognized bookType |" + t.bookType + "|")
		}
	}

	function Rg(e) {
		if (e.bookType) return;
		var r = {
			xls: "biff8",
			htm: "html",
			slk: "sylk",
			socialcalc: "eth",
			Sh33tJS: "WTF"
		};
		var t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
		if (t.match(/^\.[a-z]+$/)) e.bookType = t.slice(1);
		e.bookType = r[e.bookType] || e.bookType
	}

	function Bg(e, r, t) {
		var n = t || {};
		n.type = "file";
		n.file = r;
		Rg(n);
		return _g(e, n)
	}

	function Tg(e, r, t, n) {
		var a = t || {};
		a.type = "file";
		a.file = e;
		Rg(a);
		a.type = "buffer";
		var i = n;
		if (!(i instanceof Function)) i = t;
		return H.writeFile(e, _g(r, a), i)
	}

	function yg(e, r, t, n, a, i, s, o) {
		var l = rt(t);
		var f = o.defval,
			c = o.raw || !o.hasOwnProperty("raw");
		var u = true;
		var h = a === 1 ? [] : {};
		if (a !== 1) {
			if (Object.defineProperty) try {
				Object.defineProperty(h, "__rowNum__", {
					value: t,
					enumerable: false
				})
			} catch (e) {
				h.__rowNum__ = t
			} else h.__rowNum__ = t
		}
		if (!s || e[t])
			for (var d = r.s.c; d <= r.e.c; ++d) {
				var p = s ? e[t][d] : e[n[d] + l];
				if (p === undefined || p.t === undefined) {
					if (f === undefined) continue;
					if (i[d] != null) {
						h[i[d]] = f
					}
					continue
				}
				var v = p.v;
				switch (p.t) {
				case "z":
					if (v == null) break;
					continue;
				case "e":
					v = void 0;
					break;
				case "s":
					;
				case "d":
					;
				case "b":
					;
				case "n":
					break;
				default:
					throw new Error("unrecognized type " + p.t)
				}
				if (i[d] != null) {
					if (v == null) {
						if (f !== undefined) h[i[d]] = f;
						else if (c && v === null) h[i[d]] = null;
						else continue
					} else {
						h[i[d]] = c ? v : vt(p, v, o)
					}
					if (v != null) u = false
				}
			}
		return {
			row: h,
			isempty: u
		}
	}

	function xg(e, r) {
		if (e == null || e["!ref"] == null) return [];
		var t = {
				t: "n",
				v: 0
			},
			n = 0,
			a = 1,
			i = [],
			s = 0,
			o = "";
		var l = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var f = r || {};
		var c = f.range != null ? f.range : e["!ref"];
		if (f.header === 1) n = 1;
		else if (f.header === "A") n = 2;
		else if (Array.isArray(f.header)) n = 3;
		switch (typeof c) {
		case "string":
			l = dt(c);
			break;
		case "number":
			l = dt(e["!ref"]);
			l.s.r = c;
			break;
		default:
			l = c
		}
		if (n > 0) a = 0;
		var u = rt(l.s.r);
		var h = [];
		var d = [];
		var p = 0,
			v = 0;
		var g = Array.isArray(e);
		var m = l.s.r,
			b = 0,
			C = 0;
		if (g && !e[m]) e[m] = [];
		for (b = l.s.c; b <= l.e.c; ++b) {
			h[b] = it(b);
			t = g ? e[m][b] : e[h[b] + u];
			switch (n) {
			case 1:
				i[b] = b - l.s.c;
				break;
			case 2:
				i[b] = h[b];
				break;
			case 3:
				i[b] = f.header[b - l.s.c];
				break;
			default:
				if (t == null) t = {
					w: "__EMPTY",
					t: "s"
				};
				o = s = vt(t, null, f);
				v = 0;
				for (C = 0; C < i.length; ++C)
					if (i[C] == o) o = s + "_" + ++v;
				i[b] = o
			}
		}
		for (m = l.s.r + a; m <= l.e.r; ++m) {
			var E = yg(e, l, m, h, n, i, g, f);
			if (E.isempty === false || (n === 1 ? f.blankrows !== false : !!f.blankrows)) d[p++] = E.row
		}
		d.length = p;
		return d
	}
	var Ig = /"/g;

	function Dg(e, r, t, n, a, i, s, o) {
		var l = true;
		var f = [],
			c = "",
			u = rt(t);
		for (var h = r.s.c; h <= r.e.c; ++h) {
			if (!n[h]) continue;
			var d = o.dense ? (e[t] || [])[h] : e[n[h] + u];
			if (d == null) c = "";
			else if (d.v != null) {
				l = false;
				c = "" + vt(d, null, o);
				for (var p = 0, v = 0; p !== c.length; ++p)
					if ((v = c.charCodeAt(p)) === a || v === i || v === 34) {
						c = '"' + c.replace(Ig, '""') + '"';
						break
					}
				if (c == "ID") c = '"ID"'
			} else if (d.f != null && !d.F) {
				l = false;
				c = "=" + d.f;
				if (c.indexOf(",") >= 0) c = '"' + c.replace(Ig, '""') + '"'
			} else c = "";
			f.push(c)
		}
		if (o.blankrows === false && l) return null;
		return f.join(s)
	}

	function Fg(e, r) {
		var t = [];
		var n = r == null ? {} : r;
		if (e == null || e["!ref"] == null) return "";
		var a = dt(e["!ref"]);
		var i = n.FS !== undefined ? n.FS : ",",
			s = i.charCodeAt(0);
		var o = n.RS !== undefined ? n.RS : "\n",
			l = o.charCodeAt(0);
		var f = new RegExp((i == "|" ? "\\|" : i) + "+$");
		var c = "",
			u = [];
		n.dense = Array.isArray(e);
		var h = n.skipHidden && e["!cols"] || [];
		var d = n.skipHidden && e["!rows"] || [];
		for (var p = a.s.c; p <= a.e.c; ++p)
			if (!(h[p] || {}).hidden) u[p] = it(p);
		for (var v = a.s.r; v <= a.e.r; ++v) {
			if ((d[v] || {}).hidden) continue;
			c = Dg(e, a, v, u, s, l, i, n);
			if (c == null) {
				continue
			}
			if (n.strip) c = c.replace(f, "");
			t.push(c + o)
		}
		delete n.dense;
		return t.join("")
	}

	function Og(e, r) {
		if (!r) r = {};
		r.FS = "\t";
		r.RS = "\n";
		var t = Fg(e, r);
		if (typeof cptable == "undefined" || r.type == "string") return t;
		var n = cptable.utils.encode(1200, t, "str");
		return String.fromCharCode(255) + String.fromCharCode(254) + n
	}

	function Pg(e) {
		var r = "",
			t, n = "";
		if (e == null || e["!ref"] == null) return [];
		var a = dt(e["!ref"]),
			i = "",
			s = [],
			o;
		var l = [];
		var f = Array.isArray(e);
		for (o = a.s.c; o <= a.e.c; ++o) s[o] = it(o);
		for (var c = a.s.r; c <= a.e.r; ++c) {
			i = rt(c);
			for (o = a.s.c; o <= a.e.c; ++o) {
				r = s[o] + i;
				t = f ? (e[c] || [])[o] : e[r];
				n = "";
				if (t === undefined) continue;
				else if (t.F != null) {
					r = t.F;
					if (!t.f) continue;
					n = t.f;
					if (r.indexOf(":") == -1) r = r + ":" + r
				}
				if (t.f != null) n = t.f;
				else if (t.t == "z") continue;
				else if (t.t == "n" && t.v != null) n = "" + t.v;
				else if (t.t == "b") n = t.v ? "TRUE" : "FALSE";
				else if (t.w !== undefined) n = "'" + t.w;
				else if (t.v === undefined) continue;
				else if (t.t == "s") n = "'" + t.v;
				else n = "" + t.v;
				l[l.length] = r + "=" + n
			}
		}
		return l
	}

	function Ng(e, r, t) {
		var n = t || {};
		var a = +!n.skipHeader;
		var i = e || {};
		var s = 0,
			o = 0;
		if (i && n.origin != null) {
			if (typeof n.origin == "number") s = n.origin;
			else {
				var l = typeof n.origin == "string" ? ft(n.origin) : n.origin;
				s = l.r;
				o = l.c
			}
		}
		var f;
		var c = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: o,
				r: s + r.length - 1 + a
			}
		};
		if (i["!ref"]) {
			var u = dt(i["!ref"]);
			c.e.c = Math.max(c.e.c, u.e.c);
			c.e.r = Math.max(c.e.r, u.e.r);
			if (s == -1) {
				s = c.e.r + 1;
				c.e.r = s + r.length - 1 + a
			}
		}
		var h = n.header || [],
			d = 0;
		r.forEach(function (e, r) {
			G(e).forEach(function (t) {
				if ((d = h.indexOf(t)) == -1) h[d = h.length] = t;
				var l = e[t];
				var c = "z";
				var u = "";
				if (l && typeof l === "object" && !(l instanceof Date)) {
					i[ct({
						c: o + d,
						r: s + r + a
					})] = l
				} else {
					if (typeof l == "number") c = "n";
					else if (typeof l == "boolean") c = "b";
					else if (typeof l == "string") c = "s";
					else if (l instanceof Date) {
						c = "d";
						if (!n.cellDates) {
							c = "n";
							l = q(l)
						}
						u = n.dateNF || I._table[14]
					}
					i[ct({
						c: o + d,
						r: s + r + a
					})] = f = {
						t: c,
						v: l
					};
					if (u) f.z = u
				}
			})
		});
		c.e.c = Math.max(c.e.c, o + h.length - 1);
		var p = rt(s);
		if (a)
			for (d = 0; d < h.length; ++d) i[it(d + o) + p] = {
				t: "s",
				v: h[d]
			};
		i["!ref"] = ht(c);
		return i
	}

	function Lg(e, r) {
		return Ng(null, e, r)
	}
	var Mg = {
		encode_col: it,
		encode_row: rt,
		encode_cell: ct,
		encode_range: ht,
		decode_col: at,
		decode_row: et,
		split_cell: lt,
		decode_cell: ft,
		decode_range: ut,
		format_cell: vt,
		get_formulae: Pg,
		make_csv: Fg,
		make_json: xg,
		make_formulae: Pg,
		sheet_add_aoa: mt,
		sheet_add_json: Ng,
		aoa_to_sheet: bt,
		json_to_sheet: Lg,
		table_to_sheet: Dv,
		table_to_book: Fv,
		sheet_to_csv: Fg,
		sheet_to_txt: Og,
		sheet_to_json: xg,
		sheet_to_html: Iv.from_sheet,
		sheet_to_dif: eo.from_sheet,
		sheet_to_slk: qs.from_sheet,
		sheet_to_eth: ro.from_sheet,
		sheet_to_formulae: Pg,
		sheet_to_row_object_array: xg
	};
	(function (e) {
		e.consts = e.consts || {};

		function r(r) {
			r.forEach(function (r) {
				e.consts[r[0]] = r[1]
			})
		}

		function t(e, r, t) {
			return e[r] != null ? e[r] : e[r] = t
		}

		function n(e, r, t) {
			if (typeof r == "string") return e[r] || (e[r] = {
				t: "z"
			});
			if (typeof r != "number") return n(e, ct(r));
			return n(e, ct({
				r: r,
				c: t || 0
			}))
		}

		function a(e, r) {
			if (typeof r == "number") {
				if (r >= 0 && e.SheetNames.length > r) return r;
				throw new Error("Cannot find sheet # " + r)
			} else if (typeof r == "string") {
				var t = e.SheetNames.indexOf(r);
				if (t > -1) return t;
				throw new Error("Cannot find sheet name |" + r + "|")
			} else throw new Error("Cannot find sheet |" + r + "|")
		}
		e.book_new = function () {
			return {
				SheetNames: [],
				Sheets: {}
			}
		};
		e.book_append_sheet = function (e, r, t) {
			if (!t)
				for (var n = 1; n <= 65535; ++n)
					if (e.SheetNames.indexOf(t = "Sheet" + n) == -1) break;
			if (!t) throw new Error("Too many worksheets");
			Xd(t);
			if (e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
			e.SheetNames.push(t);
			e.Sheets[t] = r
		};
		e.book_set_sheet_visibility = function (e, r, n) {
			t(e, "Workbook", {});
			t(e.Workbook, "Sheets", []);
			var i = a(e, r);
			t(e.Workbook.Sheets, i, {});
			switch (n) {
			case 0:
				;
			case 1:
				;
			case 2:
				break;
			default:
				throw new Error("Bad sheet visibility setting " + n)
			}
			e.Workbook.Sheets[i].Hidden = n
		};
		r([
			["SHEET_VISIBLE", 0],
			["SHEET_HIDDEN", 1],
			["SHEET_VERY_HIDDEN", 2]
		]);
		e.cell_set_number_format = function (e, r) {
			e.z = r;
			return e
		};
		e.cell_set_hyperlink = function (e, r, t) {
			if (!r) {
				delete e.l
			} else {
				e.l = {
					Target: r
				};
				if (t) e.l.Tooltip = t
			}
			return e
		};
		e.cell_set_internal_link = function (r, t, n) {
			return e.cell_set_hyperlink(r, "#" + t, n)
		};
		e.cell_add_comment = function (e, r, t) {
			if (!e.c) e.c = [];
			e.c.push({
				t: r,
				a: t || "SheetJS"
			})
		};
		e.sheet_set_array_formula = function (e, r, t) {
			var a = typeof r != "string" ? r : dt(r);
			var i = typeof r == "string" ? r : ht(r);
			for (var s = a.s.r; s <= a.e.r; ++s)
				for (var o = a.s.c; o <= a.e.c; ++o) {
					var l = n(e, s, o);
					l.t = "n";
					l.F = i;
					delete l.v;
					if (s == a.s.r && o == a.s.c) l.f = t
				}
			return e
		};
		return e
	})(Mg);
	if (b && typeof require != "undefined")(function () {
		var r = {}.Readable;
		var t = function (e, t) {
			var n = r();
			var a = t == null ? {} : t;
			if (e == null || e["!ref"] == null) {
				n.push(null);
				return n
			}
			var i = dt(e["!ref"]);
			var s = a.FS !== undefined ? a.FS : ",",
				o = s.charCodeAt(0);
			var l = a.RS !== undefined ? a.RS : "\n",
				f = l.charCodeAt(0);
			var c = new RegExp((s == "|" ? "\\|" : s) + "+$");
			var u = "",
				h = [];
			a.dense = Array.isArray(e);
			var d = a.skipHidden && e["!cols"] || [];
			var p = a.skipHidden && e["!rows"] || [];
			for (var v = i.s.c; v <= i.e.c; ++v)
				if (!(d[v] || {}).hidden) h[v] = it(v);
			var g = i.s.r;
			var m = false;
			n._read = function () {
				if (!m) {
					m = true;
					return n.push("\ufeff")
				}
				if (g > i.e.r) return n.push(null);
				while (g <= i.e.r) {
					++g;
					if ((p[g - 1] || {}).hidden) continue;
					u = Dg(e, i, g - 1, h, o, f, s, a);
					if (u != null) {
						if (a.strip) u = u.replace(c, "");
						n.push(u + l);
						break
					}
				}
			};
			return n
		};
		var n = function (e, t) {
			var n = r();
			var a = t || {};
			var i = a.header != null ? a.header : Iv.BEGIN;
			var s = a.footer != null ? a.footer : Iv.END;
			n.push(i);
			var o = ut(e["!ref"]);
			a.dense = Array.isArray(e);
			n.push(Iv._preamble(e, o, a));
			var l = o.s.r;
			var f = false;
			n._read = function () {
				if (l > o.e.r) {
					if (!f) {
						f = true;
						n.push("</table>" + s)
					}
					return n.push(null)
				}
				while (l <= o.e.r) {
					n.push(Iv._row(e, o, l, a));
					++l;
					break
				}
			};
			return n
		};
		var a = function (e, t) {
			var n = r({
				objectMode: true
			});
			if (e == null || e["!ref"] == null) {
				n.push(null);
				return n
			}
			var a = {
					t: "n",
					v: 0
				},
				i = 0,
				s = 1,
				o = [],
				l = 0,
				f = "";
			var c = {
				s: {
					r: 0,
					c: 0
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var u = t || {};
			var h = u.range != null ? u.range : e["!ref"];
			if (u.header === 1) i = 1;
			else if (u.header === "A") i = 2;
			else if (Array.isArray(u.header)) i = 3;
			switch (typeof h) {
			case "string":
				c = dt(h);
				break;
			case "number":
				c = dt(e["!ref"]);
				c.s.r = h;
				break;
			default:
				c = h
			}
			if (i > 0) s = 0;
			var d = rt(c.s.r);
			var p = [];
			var v = 0;
			var g = Array.isArray(e);
			var m = c.s.r,
				b = 0,
				C = 0;
			if (g && !e[m]) e[m] = [];
			for (b = c.s.c; b <= c.e.c; ++b) {
				p[b] = it(b);
				a = g ? e[m][b] : e[p[b] + d];
				switch (i) {
				case 1:
					o[b] = b - c.s.c;
					break;
				case 2:
					o[b] = p[b];
					break;
				case 3:
					o[b] = u.header[b - c.s.c];
					break;
				default:
					if (a == null) a = {
						w: "__EMPTY",
						t: "s"
					};
					f = l = vt(a, null, u);
					v = 0;
					for (C = 0; C < o.length; ++C)
						if (o[C] == f) f = l + "_" + ++v;
					o[b] = f
				}
			}
			m = c.s.r + s;
			n._read = function () {
				if (m > c.e.r) return n.push(null);
				while (m <= c.e.r) {
					var r = yg(e, c, m, p, i, o, g, u);
					++m;
					if (r.isempty === false || (i === 1 ? u.blankrows !== false : !!u.blankrows)) {
						n.push(r.row);
						break
					}
				}
			};
			return n
		};
		e.stream = {
			to_json: a,
			to_html: n,
			to_csv: t
		}
	})();
	e.parse_xlscfb = lv;
	e.parse_ods = Lv;
	e.parse_fods = Mv;
	e.write_ods = Hv;
	e.parse_zip = sg;
	e.read = mg;
	e.readFile = bg;
	e.readFileSync = bg;
	e.write = _g;
	e.writeFile = Bg;
	e.writeFileSync = Bg;
	e.writeFileAsync = Tg;
	e.utils = Mg;
	e.SSF = I;
	e.CFB = U
}
if (typeof exports !== "undefined") make_xlsx_lib(exports);
else if (typeof module !== "undefined" && module.exports) make_xlsx_lib(module.exports);
else if (typeof define === "function" && define.amd) define("xlsx", function () {
	if (!XLSX.version) make_xlsx_lib(XLSX);
	return XLSX
});
else make_xlsx_lib(XLSX);
var XLS = XLSX,
	ODS = XLSX;