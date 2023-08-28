"use strict";
var vue = require("vue");
var serverRenderer = require("@vue/server-renderer");
var inertiaVue3 = require("@inertiajs/inertia-vue3");
var createServer = require("@inertiajs/server");
var serverRenderer$1 = require("vue/server-renderer");
var solid = require("@heroicons/vue/solid");
var vue$1 = require("@headlessui/vue");
var outline = require("@heroicons/vue/outline");
function _interopDefaultLegacy(e2) {
  return e2 && typeof e2 === "object" && "default" in e2 ? e2 : { "default": e2 };
}
var createServer__default = /* @__PURE__ */ _interopDefaultLegacy(createServer);
async function resolvePageComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
function t(t4, r2) {
  for (var n2 = 0; n2 < r2.length; n2++) {
    var e2 = r2[n2];
    e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(t4, e2.key, e2);
  }
}
function r(r2, n2, e2) {
  return n2 && t(r2.prototype, n2), e2 && t(r2, e2), Object.defineProperty(r2, "prototype", { writable: false }), r2;
}
function n() {
  return n = Object.assign || function(t4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = arguments[r2];
      for (var e2 in n2)
        Object.prototype.hasOwnProperty.call(n2, e2) && (t4[e2] = n2[e2]);
    }
    return t4;
  }, n.apply(this, arguments);
}
function e(t4) {
  return e = Object.setPrototypeOf ? Object.getPrototypeOf : function(t5) {
    return t5.__proto__ || Object.getPrototypeOf(t5);
  }, e(t4);
}
function o(t4, r2) {
  return o = Object.setPrototypeOf || function(t5, r3) {
    return t5.__proto__ = r3, t5;
  }, o(t4, r2);
}
function i() {
  if (typeof Reflect == "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy == "function")
    return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (t4) {
    return false;
  }
}
function u(t4, r2, n2) {
  return u = i() ? Reflect.construct : function(t5, r3, n3) {
    var e2 = [null];
    e2.push.apply(e2, r3);
    var i2 = new (Function.bind.apply(t5, e2))();
    return n3 && o(i2, n3.prototype), i2;
  }, u.apply(null, arguments);
}
function f(t4) {
  var r2 = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return f = function(t5) {
    if (t5 === null || Function.toString.call(t5).indexOf("[native code]") === -1)
      return t5;
    if (typeof t5 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (r2 !== void 0) {
      if (r2.has(t5))
        return r2.get(t5);
      r2.set(t5, n2);
    }
    function n2() {
      return u(t5, arguments, e(this).constructor);
    }
    return n2.prototype = Object.create(t5.prototype, { constructor: { value: n2, enumerable: false, writable: true, configurable: true } }), o(n2, t5);
  }, f(t4);
}
var a = String.prototype.replace, c = /%20/g, l = { default: "RFC3986", formatters: { RFC1738: function(t4) {
  return a.call(t4, c, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: "RFC3986" }, s = Object.prototype.hasOwnProperty, v = Array.isArray, p = function() {
  for (var t4 = [], r2 = 0; r2 < 256; ++r2)
    t4.push("%" + ((r2 < 16 ? "0" : "") + r2.toString(16)).toUpperCase());
  return t4;
}(), y = function(t4, r2) {
  for (var n2 = r2 && r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, e2 = 0; e2 < t4.length; ++e2)
    t4[e2] !== void 0 && (n2[e2] = t4[e2]);
  return n2;
}, d = { arrayToObject: y, assign: function(t4, r2) {
  return Object.keys(r2).reduce(function(t5, n2) {
    return t5[n2] = r2[n2], t5;
  }, t4);
}, combine: function(t4, r2) {
  return [].concat(t4, r2);
}, compact: function(t4) {
  for (var r2 = [{ obj: { o: t4 }, prop: "o" }], n2 = [], e2 = 0; e2 < r2.length; ++e2)
    for (var o2 = r2[e2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
      var a2 = u2[f2], c2 = i2[a2];
      typeof c2 == "object" && c2 !== null && n2.indexOf(c2) === -1 && (r2.push({ obj: i2, prop: a2 }), n2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var r3 = t5.pop(), n3 = r3.obj[r3.prop];
      if (v(n3)) {
        for (var e3 = [], o3 = 0; o3 < n3.length; ++o3)
          n3[o3] !== void 0 && e3.push(n3[o3]);
        r3.obj[r3.prop] = e3;
      }
    }
  }(r2), t4;
}, decode: function(t4, r2, n2) {
  var e2 = t4.replace(/\+/g, " ");
  if (n2 === "iso-8859-1")
    return e2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(e2);
  } catch (t5) {
    return e2;
  }
}, encode: function(t4, r2, n2, e2, o2) {
  if (t4.length === 0)
    return t4;
  var i2 = t4;
  if (typeof t4 == "symbol" ? i2 = Symbol.prototype.toString.call(t4) : typeof t4 != "string" && (i2 = String(t4)), n2 === "iso-8859-1")
    return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    a2 === 45 || a2 === 46 || a2 === 95 || a2 === 126 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === l.RFC1738 && (a2 === 40 || a2 === 41) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += p[a2] : a2 < 2048 ? u2 += p[192 | a2 >> 6] + p[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += p[224 | a2 >> 12] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += p[240 | a2 >> 18] + p[128 | a2 >> 12 & 63] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(t4) {
  return !(!t4 || typeof t4 != "object" || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return Object.prototype.toString.call(t4) === "[object RegExp]";
}, maybeMap: function(t4, r2) {
  if (v(t4)) {
    for (var n2 = [], e2 = 0; e2 < t4.length; e2 += 1)
      n2.push(r2(t4[e2]));
    return n2;
  }
  return r2(t4);
}, merge: function t2(r2, n2, e2) {
  if (!n2)
    return r2;
  if (typeof n2 != "object") {
    if (v(r2))
      r2.push(n2);
    else {
      if (!r2 || typeof r2 != "object")
        return [r2, n2];
      (e2 && (e2.plainObjects || e2.allowPrototypes) || !s.call(Object.prototype, n2)) && (r2[n2] = true);
    }
    return r2;
  }
  if (!r2 || typeof r2 != "object")
    return [r2].concat(n2);
  var o2 = r2;
  return v(r2) && !v(n2) && (o2 = y(r2, e2)), v(r2) && v(n2) ? (n2.forEach(function(n3, o3) {
    if (s.call(r2, o3)) {
      var i2 = r2[o3];
      i2 && typeof i2 == "object" && n3 && typeof n3 == "object" ? r2[o3] = t2(i2, n3, e2) : r2.push(n3);
    } else
      r2[o3] = n3;
  }), r2) : Object.keys(n2).reduce(function(r3, o3) {
    var i2 = n2[o3];
    return r3[o3] = s.call(r3, o3) ? t2(r3[o3], i2, e2) : i2, r3;
  }, o2);
} }, b = Object.prototype.hasOwnProperty, h = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, r2) {
  return t4 + "[" + r2 + "]";
}, repeat: function(t4) {
  return t4;
} }, m = Array.isArray, g = String.prototype.split, j = Array.prototype.push, w = function(t4, r2) {
  j.apply(t4, m(r2) ? r2 : [r2]);
}, O = Date.prototype.toISOString, E = l.default, R = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: d.encode, encodeValuesOnly: false, format: E, formatter: l.formatters[E], indices: false, serializeDate: function(t4) {
  return O.call(t4);
}, skipNulls: false, strictNullHandling: false }, S = function t3(r2, n2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var b2, h2 = r2;
  if (typeof f2 == "function" ? h2 = f2(n2, h2) : h2 instanceof Date ? h2 = l2(h2) : e2 === "comma" && m(h2) && (h2 = d.maybeMap(h2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), h2 === null) {
    if (o2)
      return u2 && !p2 ? u2(n2, R.encoder, y2, "key", s2) : n2;
    h2 = "";
  }
  if (typeof (b2 = h2) == "string" || typeof b2 == "number" || typeof b2 == "boolean" || typeof b2 == "symbol" || typeof b2 == "bigint" || d.isBuffer(h2)) {
    if (u2) {
      var j2 = p2 ? n2 : u2(n2, R.encoder, y2, "key", s2);
      if (e2 === "comma" && p2) {
        for (var O2 = g.call(String(h2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2)
          E2 += (S2 === 0 ? "" : ",") + v2(u2(O2[S2], R.encoder, y2, "value", s2));
        return [v2(j2) + "=" + E2];
      }
      return [v2(j2) + "=" + v2(u2(h2, R.encoder, y2, "value", s2))];
    }
    return [v2(n2) + "=" + v2(String(h2))];
  }
  var k2, x2 = [];
  if (h2 === void 0)
    return x2;
  if (e2 === "comma" && m(h2))
    k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (m(f2))
    k2 = f2;
  else {
    var C2 = Object.keys(h2);
    k2 = a2 ? C2.sort(a2) : C2;
  }
  for (var N2 = 0; N2 < k2.length; ++N2) {
    var T2 = k2[N2], F2 = typeof T2 == "object" && T2.value !== void 0 ? T2.value : h2[T2];
    if (!i2 || F2 !== null) {
      var D2 = m(h2) ? typeof e2 == "function" ? e2(n2, T2) : n2 : n2 + (c2 ? "." + T2 : "[" + T2 + "]");
      w(x2, t3(F2, D2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return x2;
}, k = Object.prototype.hasOwnProperty, x = Array.isArray, C = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, r2) {
    return String.fromCharCode(parseInt(r2, 10));
  });
}, T = function(t4, r2) {
  return t4 && typeof t4 == "string" && r2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, F = function(t4, r2, n2, e2) {
  if (t4) {
    var o2 = n2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = n2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!n2.plainObjects && k.call(Object.prototype, f2) && !n2.allowPrototypes)
        return;
      a2.push(f2);
    }
    for (var c2 = 0; n2.depth > 0 && (u2 = i2.exec(o2)) !== null && c2 < n2.depth; ) {
      if (c2 += 1, !n2.plainObjects && k.call(Object.prototype, u2[1].slice(1, -1)) && !n2.allowPrototypes)
        return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), function(t5, r3, n3, e3) {
      for (var o3 = e3 ? r3 : T(r3, n3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = t5[i3];
        if (f3 === "[]" && n3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = f3.charAt(0) === "[" && f3.charAt(f3.length - 1) === "]" ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          n3.parseArrays || a3 !== "" ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && n3.parseArrays && c3 <= n3.arrayLimit ? (u3 = [])[c3] = o3 : a3 !== "__proto__" && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(a2, r2, n2, e2);
  }
}, D = function(t4, r2) {
  var n2 = function(t5) {
    if (!t5)
      return C;
    if (t5.decoder != null && typeof t5.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (t5.charset !== void 0 && t5.charset !== "utf-8" && t5.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: t5.allowDots === void 0 ? C.allowDots : !!t5.allowDots, allowPrototypes: typeof t5.allowPrototypes == "boolean" ? t5.allowPrototypes : C.allowPrototypes, arrayLimit: typeof t5.arrayLimit == "number" ? t5.arrayLimit : C.arrayLimit, charset: t5.charset === void 0 ? C.charset : t5.charset, charsetSentinel: typeof t5.charsetSentinel == "boolean" ? t5.charsetSentinel : C.charsetSentinel, comma: typeof t5.comma == "boolean" ? t5.comma : C.comma, decoder: typeof t5.decoder == "function" ? t5.decoder : C.decoder, delimiter: typeof t5.delimiter == "string" || d.isRegExp(t5.delimiter) ? t5.delimiter : C.delimiter, depth: typeof t5.depth == "number" || t5.depth === false ? +t5.depth : C.depth, ignoreQueryPrefix: t5.ignoreQueryPrefix === true, interpretNumericEntities: typeof t5.interpretNumericEntities == "boolean" ? t5.interpretNumericEntities : C.interpretNumericEntities, parameterLimit: typeof t5.parameterLimit == "number" ? t5.parameterLimit : C.parameterLimit, parseArrays: t5.parseArrays !== false, plainObjects: typeof t5.plainObjects == "boolean" ? t5.plainObjects : C.plainObjects, strictNullHandling: typeof t5.strictNullHandling == "boolean" ? t5.strictNullHandling : C.strictNullHandling };
  }(r2);
  if (t4 === "" || t4 == null)
    return n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var e2 = typeof t4 == "string" ? function(t5, r3) {
    var n3, e3 = {}, o3 = (r3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(r3.delimiter, r3.parameterLimit === Infinity ? void 0 : r3.parameterLimit), i3 = -1, u3 = r3.charset;
    if (r3.charsetSentinel)
      for (n3 = 0; n3 < o3.length; ++n3)
        o3[n3].indexOf("utf8=") === 0 && (o3[n3] === "utf8=%E2%9C%93" ? u3 = "utf-8" : o3[n3] === "utf8=%26%2310003%3B" && (u3 = "iso-8859-1"), i3 = n3, n3 = o3.length);
    for (n3 = 0; n3 < o3.length; ++n3)
      if (n3 !== i3) {
        var f3, a3, c2 = o3[n3], l2 = c2.indexOf("]="), s2 = l2 === -1 ? c2.indexOf("=") : l2 + 1;
        s2 === -1 ? (f3 = r3.decoder(c2, C.decoder, u3, "key"), a3 = r3.strictNullHandling ? null : "") : (f3 = r3.decoder(c2.slice(0, s2), C.decoder, u3, "key"), a3 = d.maybeMap(T(c2.slice(s2 + 1), r3), function(t6) {
          return r3.decoder(t6, C.decoder, u3, "value");
        })), a3 && r3.interpretNumericEntities && u3 === "iso-8859-1" && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = x(a3) ? [a3] : a3), e3[f3] = k.call(e3, f3) ? d.combine(e3[f3], a3) : a3;
      }
    return e3;
  }(t4, n2) : t4, o2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(e2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = F(f2, e2[f2], n2, typeof t4 == "string");
    o2 = d.merge(o2, a2, n2);
  }
  return d.compact(o2);
}, $ = /* @__PURE__ */ function() {
  function t4(t5, r2, n3) {
    var e2, o2;
    this.name = t5, this.definition = r2, this.bindings = (e2 = r2.bindings) != null ? e2 : {}, this.wheres = (o2 = r2.wheres) != null ? o2 : {}, this.config = n3;
  }
  var n2 = t4.prototype;
  return n2.matchesUrl = function(t5) {
    var r2 = this;
    if (!this.definition.methods.includes("GET"))
      return false;
    var n3 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(t6, n4, e3, o3) {
      var i3, u3 = "(?<" + e3 + ">" + (((i3 = r2.wheres[e3]) == null ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + n4 + u3 + ")?" : "" + n4 + u3;
    }).replace(/^\w+:\/\//, ""), e2 = t5.replace(/^\w+:\/\//, "").split("?"), o2 = e2[0], i2 = e2[1], u2 = new RegExp("^" + n3 + "/?$").exec(o2);
    return !!u2 && { params: u2.groups, query: D(i2) };
  }, n2.compile = function(t5) {
    var r2 = this, n3 = this.parameterSegments;
    return n3.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(e2, o2, i2) {
      var u2, f2, a2;
      if (!i2 && [null, void 0].includes(t5[o2]))
        throw new Error("Ziggy error: '" + o2 + "' parameter is required for route '" + r2.name + "'.");
      if (n3[n3.length - 1].name === o2 && r2.wheres[o2] === ".*")
        return encodeURIComponent((a2 = t5[o2]) != null ? a2 : "").replace(/%2F/g, "/");
      if (r2.wheres[o2] && !new RegExp("^" + (i2 ? "(" + r2.wheres[o2] + ")?" : r2.wheres[o2]) + "$").test((u2 = t5[o2]) != null ? u2 : ""))
        throw new Error("Ziggy error: '" + o2 + "' parameter does not match required format '" + r2.wheres[o2] + "' for route '" + r2.name + "'.");
      return encodeURIComponent((f2 = t5[o2]) != null ? f2 : "");
    }).replace(/\/+$/, "") : this.template;
  }, r(t4, [{ key: "template", get: function() {
    return ((this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "") + "/" + this.definition.uri).replace(/\/+$/, "");
  } }, { key: "parameterSegments", get: function() {
    var t5, r2;
    return (t5 = (r2 = this.template.match(/{[^}?]+\??}/g)) == null ? void 0 : r2.map(function(t6) {
      return { name: t6.replace(/{|\??}/g, ""), required: !/\?}$/.test(t6) };
    })) != null ? t5 : [];
  } }]), t4;
}(), A = /* @__PURE__ */ function(t4) {
  var e2, i2;
  function u2(r2, e3, o2, i3) {
    var u3;
    if (o2 === void 0 && (o2 = true), (u3 = t4.call(this) || this).t = i3 != null ? i3 : typeof Ziggy != "undefined" ? Ziggy : globalThis == null ? void 0 : globalThis.Ziggy, u3.t = n({}, u3.t, { absolute: o2 }), r2) {
      if (!u3.t.routes[r2])
        throw new Error("Ziggy error: route '" + r2 + "' is not in the route list.");
      u3.i = new $(r2, u3.t.routes[r2], u3.t), u3.u = u3.l(e3);
    }
    return u3;
  }
  i2 = t4, (e2 = u2).prototype = Object.create(i2.prototype), e2.prototype.constructor = e2, o(e2, i2);
  var f2 = u2.prototype;
  return f2.toString = function() {
    var t5 = this, r2 = Object.keys(this.u).filter(function(r3) {
      return !t5.i.parameterSegments.some(function(t6) {
        return t6.name === r3;
      });
    }).filter(function(t6) {
      return t6 !== "_query";
    }).reduce(function(r3, e3) {
      var o2;
      return n({}, r3, ((o2 = {})[e3] = t5.u[e3], o2));
    }, {});
    return this.i.compile(this.u) + function(t6, r3) {
      var n2, e3 = t6, o2 = function(t7) {
        if (!t7)
          return R;
        if (t7.encoder != null && typeof t7.encoder != "function")
          throw new TypeError("Encoder has to be a function.");
        var r4 = t7.charset || R.charset;
        if (t7.charset !== void 0 && t7.charset !== "utf-8" && t7.charset !== "iso-8859-1")
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n3 = l.default;
        if (t7.format !== void 0) {
          if (!b.call(l.formatters, t7.format))
            throw new TypeError("Unknown format option provided.");
          n3 = t7.format;
        }
        var e4 = l.formatters[n3], o3 = R.filter;
        return (typeof t7.filter == "function" || m(t7.filter)) && (o3 = t7.filter), { addQueryPrefix: typeof t7.addQueryPrefix == "boolean" ? t7.addQueryPrefix : R.addQueryPrefix, allowDots: t7.allowDots === void 0 ? R.allowDots : !!t7.allowDots, charset: r4, charsetSentinel: typeof t7.charsetSentinel == "boolean" ? t7.charsetSentinel : R.charsetSentinel, delimiter: t7.delimiter === void 0 ? R.delimiter : t7.delimiter, encode: typeof t7.encode == "boolean" ? t7.encode : R.encode, encoder: typeof t7.encoder == "function" ? t7.encoder : R.encoder, encodeValuesOnly: typeof t7.encodeValuesOnly == "boolean" ? t7.encodeValuesOnly : R.encodeValuesOnly, filter: o3, format: n3, formatter: e4, serializeDate: typeof t7.serializeDate == "function" ? t7.serializeDate : R.serializeDate, skipNulls: typeof t7.skipNulls == "boolean" ? t7.skipNulls : R.skipNulls, sort: typeof t7.sort == "function" ? t7.sort : null, strictNullHandling: typeof t7.strictNullHandling == "boolean" ? t7.strictNullHandling : R.strictNullHandling };
      }(r3);
      typeof o2.filter == "function" ? e3 = (0, o2.filter)("", e3) : m(o2.filter) && (n2 = o2.filter);
      var i3 = [];
      if (typeof e3 != "object" || e3 === null)
        return "";
      var u3 = h[r3 && r3.arrayFormat in h ? r3.arrayFormat : r3 && "indices" in r3 ? r3.indices ? "indices" : "repeat" : "indices"];
      n2 || (n2 = Object.keys(e3)), o2.sort && n2.sort(o2.sort);
      for (var f3 = 0; f3 < n2.length; ++f3) {
        var a2 = n2[f3];
        o2.skipNulls && e3[a2] === null || w(i3, S(e3[a2], a2, u3, o2.strictNullHandling, o2.skipNulls, o2.encode ? o2.encoder : null, o2.filter, o2.sort, o2.allowDots, o2.serializeDate, o2.format, o2.formatter, o2.encodeValuesOnly, o2.charset));
      }
      var c2 = i3.join(o2.delimiter), s2 = o2.addQueryPrefix === true ? "?" : "";
      return o2.charsetSentinel && (s2 += o2.charset === "iso-8859-1" ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? s2 + c2 : "";
    }(n({}, r2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(t6, r3) {
      return typeof t6 == "boolean" ? Number(t6) : r3(t6);
    } });
  }, f2.v = function(t5) {
    var r2 = this;
    t5 ? this.t.absolute && t5.startsWith("/") && (t5 = this.p().host + t5) : t5 = this.h();
    var e3 = {}, o2 = Object.entries(this.t.routes).find(function(n2) {
      return e3 = new $(n2[0], n2[1], r2.t).matchesUrl(t5);
    }) || [void 0, void 0];
    return n({ name: o2[0] }, e3, { route: o2[1] });
  }, f2.h = function() {
    var t5 = this.p(), r2 = t5.pathname, n2 = t5.search;
    return (this.t.absolute ? t5.host + r2 : r2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n2;
  }, f2.current = function(t5, r2) {
    var e3 = this.v(), o2 = e3.name, i3 = e3.params, u3 = e3.query, f3 = e3.route;
    if (!t5)
      return o2;
    var a2 = new RegExp("^" + t5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    var c2 = new $(o2, f3, this.t);
    r2 = this.l(r2, c2);
    var l2 = n({}, i3, u3);
    return !(!Object.values(r2).every(function(t6) {
      return !t6;
    }) || Object.values(l2).some(function(t6) {
      return t6 !== void 0;
    })) || Object.entries(r2).every(function(t6) {
      return l2[t6[0]] == t6[1];
    });
  }, f2.p = function() {
    var t5, r2, n2, e3, o2, i3, u3 = typeof window != "undefined" ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: (t5 = (r2 = this.t.location) == null ? void 0 : r2.host) != null ? t5 : f3 === void 0 ? "" : f3, pathname: (n2 = (e3 = this.t.location) == null ? void 0 : e3.pathname) != null ? n2 : a2 === void 0 ? "" : a2, search: (o2 = (i3 = this.t.location) == null ? void 0 : i3.search) != null ? o2 : c2 === void 0 ? "" : c2 };
  }, f2.has = function(t5) {
    return Object.keys(this.t.routes).includes(t5);
  }, f2.l = function(t5, r2) {
    var e3 = this;
    t5 === void 0 && (t5 = {}), r2 === void 0 && (r2 = this.i), t5 = ["string", "number"].includes(typeof t5) ? [t5] : t5;
    var o2 = r2.parameterSegments.filter(function(t6) {
      return !e3.t.defaults[t6.name];
    });
    if (Array.isArray(t5))
      t5 = t5.reduce(function(t6, r3, e4) {
        var i4, u3;
        return n({}, t6, o2[e4] ? ((i4 = {})[o2[e4].name] = r3, i4) : typeof r3 == "object" ? r3 : ((u3 = {})[r3] = "", u3));
      }, {});
    else if (o2.length === 1 && !t5[o2[0].name] && (t5.hasOwnProperty(Object.values(r2.bindings)[0]) || t5.hasOwnProperty("id"))) {
      var i3;
      (i3 = {})[o2[0].name] = t5, t5 = i3;
    }
    return n({}, this.m(r2), this.g(t5, r2));
  }, f2.m = function(t5) {
    var r2 = this;
    return t5.parameterSegments.filter(function(t6) {
      return r2.t.defaults[t6.name];
    }).reduce(function(t6, e3, o2) {
      var i3, u3 = e3.name;
      return n({}, t6, ((i3 = {})[u3] = r2.t.defaults[u3], i3));
    }, {});
  }, f2.g = function(t5, r2) {
    var e3 = r2.bindings, o2 = r2.parameterSegments;
    return Object.entries(t5).reduce(function(t6, r3) {
      var i3, u3, f3 = r3[0], a2 = r3[1];
      if (!a2 || typeof a2 != "object" || Array.isArray(a2) || !o2.some(function(t7) {
        return t7.name === f3;
      }))
        return n({}, t6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(e3[f3])) {
        if (!a2.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + e3[f3] + "'.");
        e3[f3] = "id";
      }
      return n({}, t6, ((i3 = {})[f3] = a2[e3[f3]], i3));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, f2.check = function(t5) {
    return this.has(t5);
  }, r(u2, [{ key: "params", get: function() {
    var t5 = this.v();
    return n({}, t5.params, t5.query);
  } }]), u2;
}(/* @__PURE__ */ f(String)), I = { install: function(t4, r2) {
  var n2 = function(t5, n3, e2, o2) {
    return o2 === void 0 && (o2 = r2), function(t6, r3, n4, e3) {
      var o3 = new A(t6, r3, n4, e3);
      return t6 ? o3.toString() : o3;
    }(t5, n3, e2, o2);
  };
  t4.mixin({ methods: { route: n2 } }), parseInt(t4.version) > 2 && t4.provide("route", n2);
} };
const appName = "Laravel";
createServer__default["default"]((page) => inertiaVue3.createInertiaApp({
  page,
  render: serverRenderer.renderToString,
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, { "./Pages/Dashboard.vue": () => Promise.resolve().then(function() {
    return Dashboard;
  }), "./Pages/Home.vue": () => Promise.resolve().then(function() {
    return Home;
  }), "./Pages/Auth/ConfirmPassword.vue": () => Promise.resolve().then(function() {
    return ConfirmPassword;
  }), "./Pages/Auth/ForgotPassword.vue": () => Promise.resolve().then(function() {
    return ForgotPassword;
  }), "./Pages/Auth/Login.vue": () => Promise.resolve().then(function() {
    return Login;
  }), "./Pages/Auth/Register.vue": () => Promise.resolve().then(function() {
    return Register;
  }), "./Pages/Auth/ResetPassword.vue": () => Promise.resolve().then(function() {
    return ResetPassword;
  }), "./Pages/Auth/VerifyEmail.vue": () => Promise.resolve().then(function() {
    return VerifyEmail;
  }) }),
  setup({ app, props, plugin }) {
    return vue.createSSRApp({ render: () => vue.h(app, props) }).use(plugin).use(I, {
      ...page.props.ziggy,
      location: new URL(page.props.ziggy.location)
    });
  }
}));
const _sfc_main$o = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      default: "right"
    },
    width: {
      default: "48"
    },
    contentClasses: {
      default: () => ["py-1", "bg-white"]
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e2) => {
      if (open.value && e2.key === "Escape") {
        open.value = false;
      }
    };
    vue.onMounted(() => document.addEventListener("keydown", closeOnEscape));
    vue.onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = vue.computed(() => {
      return {
        "48": "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = vue.computed(() => {
      if (props.align === "left") {
        return "origin-top-left left-0";
      } else if (props.align === "right") {
        return "origin-top-right right-0";
      } else {
        return "origin-top";
      }
    });
    const open = vue.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({ class: "relative" }, _attrs))}><div>`);
      serverRenderer$1.ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${serverRenderer$1.ssrRenderStyle(open.value ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${serverRenderer$1.ssrRenderStyle([
        open.value ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${serverRenderer$1.ssrRenderClass([[vue.unref(widthClass), vue.unref(alignmentClasses)], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${serverRenderer$1.ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      serverRenderer$1.ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), vue.mergeProps({ class: "block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" }, _attrs), {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vue.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = {
  __name: "NavLink",
  __ssrInlineRender: true,
  props: ["href", "active"],
  setup(__props) {
    const props = __props;
    const classes = vue.computed(() => props.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition  duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), vue.mergeProps({
        href: __props.href,
        class: vue.unref(classes)
      }, _attrs), {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vue.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: ["href", "active"],
  setup(__props) {
    const props = __props;
    const classes = vue.computed(() => props.active ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out" : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), vue.mergeProps({
        href: __props.href,
        class: vue.unref(classes)
      }, _attrs), {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vue.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = {
  __name: "Authenticated",
  __ssrInlineRender: true,
  setup(__props) {
    const showingNavigationDropdown = vue.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer$1.ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-100"><nav class="bg-white border-b border-gray-100"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="shrink-0 flex items-center">`);
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
        href: _ctx.route("dashboard")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` logo `);
          } else {
            return [
              vue.createTextVNode(" logo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">`);
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$m, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              vue.createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hidden sm:flex sm:items-center sm:ml-6"><div class="ml-3 relative">`);
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$o, {
        align: "right",
        width: "48"
      }, {
        trigger: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"${_scopeId}>${serverRenderer$1.ssrInterpolate(_ctx.$page.props.auth.user.name)} <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              vue.createVNode("span", { class: "inline-flex rounded-md" }, [
                vue.createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                }, [
                  vue.createTextVNode(vue.toDisplayString(_ctx.$page.props.auth.user.name) + " ", 1),
                  (vue.openBlock(), vue.createBlock("svg", {
                    class: "ml-2 -mr-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    vue.createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$n, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button"
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out `);
                } else {
                  return [
                    vue.createTextVNode(" Log Out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_sfc_main$n, {
                href: _ctx.route("logout"),
                method: "post",
                as: "button"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" Log Out ")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="-mr-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${serverRenderer$1.ssrRenderClass({ "hidden": showingNavigationDropdown.value, "inline-flex": !showingNavigationDropdown.value })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${serverRenderer$1.ssrRenderClass({ "hidden": !showingNavigationDropdown.value, "inline-flex": showingNavigationDropdown.value })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${serverRenderer$1.ssrRenderClass([{ "block": showingNavigationDropdown.value, "hidden": !showingNavigationDropdown.value }, "sm:hidden"])}"><div class="pt-2 pb-3 space-y-1">`);
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$l, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              vue.createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pt-4 pb-1 border-t border-gray-200"><div class="px-4"><div class="font-medium text-base text-gray-800">${serverRenderer$1.ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="font-medium text-sm text-gray-500">${serverRenderer$1.ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div><div class="mt-3 space-y-1">`);
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$l, {
        href: _ctx.route("logout"),
        method: "post",
        as: "button"
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Log Out `);
          } else {
            return [
              vue.createTextVNode(" Log Out ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-white shadow"><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">`);
        serverRenderer$1.ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Authenticated.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Dashboard" }, null, _parent));
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$k, null, {
        header: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Dashboard </h2>`);
          } else {
            return [
              vue.createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Dashboard ")
            ];
          }
        }),
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}> You&#39;re logged in! </div></div></div></div>`);
          } else {
            return [
              vue.createVNode("div", { class: "py-12" }, [
                vue.createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  vue.createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    vue.createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, " You're logged in! ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
var Dashboard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  __name: "Default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.Disclosure), {
        as: "nav",
        class: "bg-gray-800"
      }, {
        default: vue.withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8"${_scopeId}><div class="relative flex items-center justify-between h-16"${_scopeId}><div class="flex items-center"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
              href: "/",
              class: "flex-shrink-0 relative"
            }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img src="/img/funinatl-bg.png" width="395" height="90" class="h-12 lg:h-16 w-auto" alt="Fun In Atlanta"${_scopeId2}><span class="text-white absolute top-1 lg:top-4 left-2 lg:left-6 lg:text-2xl"${_scopeId2}>Fun In ATL</span>`);
                } else {
                  return [
                    vue.createVNode("img", {
                      src: "/img/funinatl-bg.png",
                      width: "395",
                      height: "90",
                      class: "h-12 lg:h-16 w-auto",
                      alt: "Fun In Atlanta"
                    }),
                    vue.createVNode("span", { class: "text-white absolute top-1 lg:top-4 left-2 lg:left-6 lg:text-2xl" }, "Fun In ATL")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="hidden lg:block lg:ml-6"${_scopeId}><div class="flex space-x-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
              href: "/about",
              class: [{
                "bg-gray-900 text-white": _ctx.$page.url === "/about",
                "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/about"
              }, "px-3 py-2 rounded-md text-sm font-medium"]
            }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`About`);
                } else {
                  return [
                    vue.createTextVNode("About")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
              href: "/contact",
              class: ["px-3 py-2 rounded-md text-sm font-medium", {
                "bg-gray-900 text-white": _ctx.$page.url === "/contact",
                "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/contact"
              }]
            }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Contact`);
                } else {
                  return [
                    vue.createTextVNode("Contact")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
              href: "/submit-event",
              class: ["px-3 py-2 rounded-md text-sm font-medium", {
                "bg-gray-900 text-white": _ctx.$page.url === "/submit-event",
                "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/submit-event"
              }]
            }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Submit Event`);
                } else {
                  return [
                    vue.createTextVNode("Submit Event")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
              href: "/subscribe",
              class: ["px-3 py-2 rounded-md text-sm font-medium", {
                "bg-gray-900 text-white": _ctx.$page.url === "/subscribe",
                "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/subscribe"
              }]
            }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Subscribe`);
                } else {
                  return [
                    vue.createTextVNode("Subscribe")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="flex-1 justify-center px-2 lg:ml-6 lg:justify-end hidden lg:flex"${_scopeId}><div class="max-w-lg w-full lg:max-w-xs"${_scopeId}><label for="search" class="sr-only"${_scopeId}>Search</label><div class="relative"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(solid.SearchIcon), {
              class: "h-5 w-5 text-gray-400",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`</div><input id="search" name="search" class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm" placeholder="Search" type="search"${_scopeId}></div></div></div><div class="flex lg:hidden"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), { class: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="sr-only"${_scopeId2}>Open main menu</span>`);
                  if (!open) {
                    _push3(serverRenderer$1.ssrRenderComponent(vue.unref(outline.MenuIcon), {
                      class: "block h-6 w-6",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(serverRenderer$1.ssrRenderComponent(vue.unref(outline.XIcon), {
                      class: "block h-6 w-6",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    vue.createVNode("span", { class: "sr-only" }, "Open main menu"),
                    !open ? (vue.openBlock(), vue.createBlock(vue.unref(outline.MenuIcon), {
                      key: 0,
                      class: "block h-6 w-6",
                      "aria-hidden": "true"
                    })) : (vue.openBlock(), vue.createBlock(vue.unref(outline.XIcon), {
                      key: 1,
                      class: "block h-6 w-6",
                      "aria-hidden": "true"
                    }))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="hidden lg:block lg:ml-4"${_scopeId}><div class="flex items-center"${_scopeId}><button type="button" class="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"${_scopeId}><span class="sr-only"${_scopeId}>View notifications</span>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(outline.BellIcon), {
              class: "h-6 w-6",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.Menu), {
              as: "div",
              class: "ml-4 relative flex-shrink-0"
            }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.MenuButton), { class: "bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="sr-only"${_scopeId3}>Open user menu</span><img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""${_scopeId3}>`);
                      } else {
                        return [
                          vue.createVNode("span", { class: "sr-only" }, "Open user menu"),
                          vue.createVNode("img", {
                            class: "h-8 w-8 rounded-full",
                            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                            alt: ""
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.MenuItems), { class: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.MenuItem), null, {
                          default: vue.withCtx(({ active }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
                                href: "/",
                                class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                              }, {
                                default: vue.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Your Profile`);
                                  } else {
                                    return [
                                      vue.createTextVNode("Your Profile")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue.createVNode(vue.unref(inertiaVue3.Link), {
                                  href: "/",
                                  class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode("Your Profile")
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.MenuItem), null, {
                          default: vue.withCtx(({ active }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
                                href: "/",
                                class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                              }, {
                                default: vue.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Settings`);
                                  } else {
                                    return [
                                      vue.createTextVNode("Settings")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue.createVNode(vue.unref(inertiaVue3.Link), {
                                  href: "/",
                                  class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode("Settings")
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.MenuItem), null, {
                          default: vue.withCtx(({ active }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
                                href: _ctx.route("logout"),
                                class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                              }, {
                                default: vue.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Log Out `);
                                  } else {
                                    return [
                                      vue.createTextVNode(" Log Out ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue.createVNode(vue.unref(inertiaVue3.Link), {
                                  href: _ctx.route("logout"),
                                  class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(" Log Out ")
                                  ]),
                                  _: 2
                                }, 1032, ["href", "class"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                            default: vue.withCtx(({ active }) => [
                              vue.createVNode(vue.unref(inertiaVue3.Link), {
                                href: "/",
                                class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode("Your Profile")
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                            default: vue.withCtx(({ active }) => [
                              vue.createVNode(vue.unref(inertiaVue3.Link), {
                                href: "/",
                                class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode("Settings")
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]),
                            _: 1
                          }),
                          vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                            default: vue.withCtx(({ active }) => [
                              vue.createVNode(vue.unref(inertiaVue3.Link), {
                                href: _ctx.route("logout"),
                                class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(" Log Out ")
                                ]),
                                _: 2
                              }, 1032, ["href", "class"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vue.createVNode("div", null, [
                      vue.createVNode(vue.unref(vue$1.MenuButton), { class: "bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode("span", { class: "sr-only" }, "Open user menu"),
                          vue.createVNode("img", {
                            class: "h-8 w-8 rounded-full",
                            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                            alt: ""
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    vue.createVNode(vue.Transition, {
                      "enter-active-class": "transition ease-out duration-100",
                      "enter-from-class": "transform opacity-0 scale-95",
                      "enter-to-class": "transform opacity-100 scale-100",
                      "leave-active-class": "transition ease-in duration-75",
                      "leave-from-class": "transform opacity-100 scale-100",
                      "leave-to-class": "transform opacity-0 scale-95"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(vue$1.MenuItems), { class: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                              default: vue.withCtx(({ active }) => [
                                vue.createVNode(vue.unref(inertiaVue3.Link), {
                                  href: "/",
                                  class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode("Your Profile")
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                              default: vue.withCtx(({ active }) => [
                                vue.createVNode(vue.unref(inertiaVue3.Link), {
                                  href: "/",
                                  class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode("Settings")
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                              default: vue.withCtx(({ active }) => [
                                vue.createVNode(vue.unref(inertiaVue3.Link), {
                                  href: _ctx.route("logout"),
                                  class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(" Log Out ")
                                  ]),
                                  _: 2
                                }, 1032, ["href", "class"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosurePanel), { class: "lg:hidden" }, {
              default: vue.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-2 pt-2 pb-3 space-y-1"${_scopeId2}>`);
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), {
                    as: "a",
                    href: "/about",
                    class: [{
                      "bg-gray-900 text-white": _ctx.$page.url === "/about",
                      "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/about"
                    }, "px-3 py-2 rounded-md text-sm font-medium"]
                  }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`About`);
                      } else {
                        return [
                          vue.createTextVNode("About")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), {
                    as: "a",
                    href: "/contact",
                    class: ["px-3 py-2 rounded-md text-sm font-medium", {
                      "bg-gray-900 text-white": _ctx.$page.url === "/contact",
                      "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/contact"
                    }]
                  }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Contact`);
                      } else {
                        return [
                          vue.createTextVNode("Contact")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), {
                    as: "a",
                    href: "/submit-event",
                    class: ["px-3 py-2 rounded-md text-sm font-medium", {
                      "bg-gray-900 text-white": _ctx.$page.url === "/submit-event",
                      "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/submit-event"
                    }]
                  }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Submit Event`);
                      } else {
                        return [
                          vue.createTextVNode("Submit Event")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), {
                    as: "a",
                    href: "/subscribe",
                    class: ["px-3 py-2 rounded-md text-sm font-medium", {
                      "bg-gray-900 text-white": _ctx.$page.url === "/subscribe",
                      "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/subscribe"
                    }]
                  }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Subscribe`);
                      } else {
                        return [
                          vue.createTextVNode("Subscribe")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="pt-4 pb-3 border-t border-gray-700"${_scopeId2}><div class="flex items-center px-5"${_scopeId2}><div class="flex-shrink-0"${_scopeId2}><img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""${_scopeId2}></div><div class="ml-3"${_scopeId2}><div class="text-base font-medium text-white"${_scopeId2}>Tom Cook</div><div class="text-sm font-medium text-gray-400"${_scopeId2}>tom@example.com</div></div><button type="button" class="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"${_scopeId2}><span class="sr-only"${_scopeId2}>View notifications</span>`);
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(outline.BellIcon), {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(`</button></div><div class="mt-3 px-2 space-y-1"${_scopeId2}>`);
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), {
                    as: "a",
                    href: "/",
                    class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Your Profile`);
                      } else {
                        return [
                          vue.createTextVNode("Your Profile")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), {
                    as: "a",
                    href: "/",
                    class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Settings`);
                      } else {
                        return [
                          vue.createTextVNode("Settings")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer$1.ssrRenderComponent(vue.unref(vue$1.DisclosureButton), {
                    as: "a",
                    href: _ctx.route("logout"),
                    class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  }, {
                    default: vue.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Sign Out `);
                      } else {
                        return [
                          vue.createTextVNode(" Sign Out ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vue.createVNode("div", { class: "px-2 pt-2 pb-3 space-y-1" }, [
                      vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                        as: "a",
                        href: "/about",
                        class: [{
                          "bg-gray-900 text-white": _ctx.$page.url === "/about",
                          "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/about"
                        }, "px-3 py-2 rounded-md text-sm font-medium"]
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("About")
                        ]),
                        _: 1
                      }, 8, ["class"]),
                      vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                        as: "a",
                        href: "/contact",
                        class: ["px-3 py-2 rounded-md text-sm font-medium", {
                          "bg-gray-900 text-white": _ctx.$page.url === "/contact",
                          "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/contact"
                        }]
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("Contact")
                        ]),
                        _: 1
                      }, 8, ["class"]),
                      vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                        as: "a",
                        href: "/submit-event",
                        class: ["px-3 py-2 rounded-md text-sm font-medium", {
                          "bg-gray-900 text-white": _ctx.$page.url === "/submit-event",
                          "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/submit-event"
                        }]
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("Submit Event")
                        ]),
                        _: 1
                      }, 8, ["class"]),
                      vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                        as: "a",
                        href: "/subscribe",
                        class: ["px-3 py-2 rounded-md text-sm font-medium", {
                          "bg-gray-900 text-white": _ctx.$page.url === "/subscribe",
                          "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/subscribe"
                        }]
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("Subscribe")
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    vue.createVNode("div", { class: "pt-4 pb-3 border-t border-gray-700" }, [
                      vue.createVNode("div", { class: "flex items-center px-5" }, [
                        vue.createVNode("div", { class: "flex-shrink-0" }, [
                          vue.createVNode("img", {
                            class: "h-10 w-10 rounded-full",
                            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                            alt: ""
                          })
                        ]),
                        vue.createVNode("div", { class: "ml-3" }, [
                          vue.createVNode("div", { class: "text-base font-medium text-white" }, "Tom Cook"),
                          vue.createVNode("div", { class: "text-sm font-medium text-gray-400" }, "tom@example.com")
                        ]),
                        vue.createVNode("button", {
                          type: "button",
                          class: "ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        }, [
                          vue.createVNode("span", { class: "sr-only" }, "View notifications"),
                          vue.createVNode(vue.unref(outline.BellIcon), {
                            class: "h-6 w-6",
                            "aria-hidden": "true"
                          })
                        ])
                      ]),
                      vue.createVNode("div", { class: "mt-3 px-2 space-y-1" }, [
                        vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                          as: "a",
                          href: "/",
                          class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("Your Profile")
                          ]),
                          _: 1
                        }),
                        vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                          as: "a",
                          href: "/",
                          class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("Settings")
                          ]),
                          _: 1
                        }),
                        vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                          as: "a",
                          href: _ctx.route("logout"),
                          class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(" Sign Out ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode("div", { class: "max-w-7xl mx-auto px-2 sm:px-2 lg:px-8" }, [
                vue.createVNode("div", { class: "relative flex items-center justify-between h-16" }, [
                  vue.createVNode("div", { class: "flex items-center" }, [
                    vue.createVNode(vue.unref(inertiaVue3.Link), {
                      href: "/",
                      class: "flex-shrink-0 relative"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode("img", {
                          src: "/img/funinatl-bg.png",
                          width: "395",
                          height: "90",
                          class: "h-12 lg:h-16 w-auto",
                          alt: "Fun In Atlanta"
                        }),
                        vue.createVNode("span", { class: "text-white absolute top-1 lg:top-4 left-2 lg:left-6 lg:text-2xl" }, "Fun In ATL")
                      ]),
                      _: 1
                    }),
                    vue.createVNode("div", { class: "hidden lg:block lg:ml-6" }, [
                      vue.createVNode("div", { class: "flex space-x-4" }, [
                        vue.createVNode(vue.unref(inertiaVue3.Link), {
                          href: "/about",
                          class: [{
                            "bg-gray-900 text-white": _ctx.$page.url === "/about",
                            "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/about"
                          }, "px-3 py-2 rounded-md text-sm font-medium"]
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("About")
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        vue.createVNode(vue.unref(inertiaVue3.Link), {
                          href: "/contact",
                          class: ["px-3 py-2 rounded-md text-sm font-medium", {
                            "bg-gray-900 text-white": _ctx.$page.url === "/contact",
                            "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/contact"
                          }]
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("Contact")
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        vue.createVNode(vue.unref(inertiaVue3.Link), {
                          href: "/submit-event",
                          class: ["px-3 py-2 rounded-md text-sm font-medium", {
                            "bg-gray-900 text-white": _ctx.$page.url === "/submit-event",
                            "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/submit-event"
                          }]
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("Submit Event")
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        vue.createVNode(vue.unref(inertiaVue3.Link), {
                          href: "/subscribe",
                          class: ["px-3 py-2 rounded-md text-sm font-medium", {
                            "bg-gray-900 text-white": _ctx.$page.url === "/subscribe",
                            "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/subscribe"
                          }]
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("Subscribe")
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ])
                    ])
                  ]),
                  vue.createVNode("div", { class: "flex-1 justify-center px-2 lg:ml-6 lg:justify-end hidden lg:flex" }, [
                    vue.createVNode("div", { class: "max-w-lg w-full lg:max-w-xs" }, [
                      vue.createVNode("label", {
                        for: "search",
                        class: "sr-only"
                      }, "Search"),
                      vue.createVNode("div", { class: "relative" }, [
                        vue.createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                          vue.createVNode(vue.unref(solid.SearchIcon), {
                            class: "h-5 w-5 text-gray-400",
                            "aria-hidden": "true"
                          })
                        ]),
                        vue.createVNode("input", {
                          id: "search",
                          name: "search",
                          class: "block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm",
                          placeholder: "Search",
                          type: "search"
                        })
                      ])
                    ])
                  ]),
                  vue.createVNode("div", { class: "flex lg:hidden" }, [
                    vue.createVNode(vue.unref(vue$1.DisclosureButton), { class: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode("span", { class: "sr-only" }, "Open main menu"),
                        !open ? (vue.openBlock(), vue.createBlock(vue.unref(outline.MenuIcon), {
                          key: 0,
                          class: "block h-6 w-6",
                          "aria-hidden": "true"
                        })) : (vue.openBlock(), vue.createBlock(vue.unref(outline.XIcon), {
                          key: 1,
                          class: "block h-6 w-6",
                          "aria-hidden": "true"
                        }))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  vue.createVNode("div", { class: "hidden lg:block lg:ml-4" }, [
                    vue.createVNode("div", { class: "flex items-center" }, [
                      vue.createVNode("button", {
                        type: "button",
                        class: "flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      }, [
                        vue.createVNode("span", { class: "sr-only" }, "View notifications"),
                        vue.createVNode(vue.unref(outline.BellIcon), {
                          class: "h-6 w-6",
                          "aria-hidden": "true"
                        })
                      ]),
                      vue.createVNode(vue.unref(vue$1.Menu), {
                        as: "div",
                        class: "ml-4 relative flex-shrink-0"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode("div", null, [
                            vue.createVNode(vue.unref(vue$1.MenuButton), { class: "bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" }, {
                              default: vue.withCtx(() => [
                                vue.createVNode("span", { class: "sr-only" }, "Open user menu"),
                                vue.createVNode("img", {
                                  class: "h-8 w-8 rounded-full",
                                  src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                  alt: ""
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          vue.createVNode(vue.Transition, {
                            "enter-active-class": "transition ease-out duration-100",
                            "enter-from-class": "transform opacity-0 scale-95",
                            "enter-to-class": "transform opacity-100 scale-100",
                            "leave-active-class": "transition ease-in duration-75",
                            "leave-from-class": "transform opacity-100 scale-100",
                            "leave-to-class": "transform opacity-0 scale-95"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(vue$1.MenuItems), { class: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                                    default: vue.withCtx(({ active }) => [
                                      vue.createVNode(vue.unref(inertiaVue3.Link), {
                                        href: "/",
                                        class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                      }, {
                                        default: vue.withCtx(() => [
                                          vue.createTextVNode("Your Profile")
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                                    default: vue.withCtx(({ active }) => [
                                      vue.createVNode(vue.unref(inertiaVue3.Link), {
                                        href: "/",
                                        class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                      }, {
                                        default: vue.withCtx(() => [
                                          vue.createTextVNode("Settings")
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(vue.unref(vue$1.MenuItem), null, {
                                    default: vue.withCtx(({ active }) => [
                                      vue.createVNode(vue.unref(inertiaVue3.Link), {
                                        href: _ctx.route("logout"),
                                        class: [active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"]
                                      }, {
                                        default: vue.withCtx(() => [
                                          vue.createTextVNode(" Log Out ")
                                        ]),
                                        _: 2
                                      }, 1032, ["href", "class"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ]),
              vue.createVNode(vue.unref(vue$1.DisclosurePanel), { class: "lg:hidden" }, {
                default: vue.withCtx(() => [
                  vue.createVNode("div", { class: "px-2 pt-2 pb-3 space-y-1" }, [
                    vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                      as: "a",
                      href: "/about",
                      class: [{
                        "bg-gray-900 text-white": _ctx.$page.url === "/about",
                        "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/about"
                      }, "px-3 py-2 rounded-md text-sm font-medium"]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode("About")
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                      as: "a",
                      href: "/contact",
                      class: ["px-3 py-2 rounded-md text-sm font-medium", {
                        "bg-gray-900 text-white": _ctx.$page.url === "/contact",
                        "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/contact"
                      }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode("Contact")
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                      as: "a",
                      href: "/submit-event",
                      class: ["px-3 py-2 rounded-md text-sm font-medium", {
                        "bg-gray-900 text-white": _ctx.$page.url === "/submit-event",
                        "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/submit-event"
                      }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode("Submit Event")
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                      as: "a",
                      href: "/subscribe",
                      class: ["px-3 py-2 rounded-md text-sm font-medium", {
                        "bg-gray-900 text-white": _ctx.$page.url === "/subscribe",
                        "text-gray-300 hover:bg-gray-700 hover:text-white": _ctx.$page.url !== "/subscribe"
                      }]
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode("Subscribe")
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  vue.createVNode("div", { class: "pt-4 pb-3 border-t border-gray-700" }, [
                    vue.createVNode("div", { class: "flex items-center px-5" }, [
                      vue.createVNode("div", { class: "flex-shrink-0" }, [
                        vue.createVNode("img", {
                          class: "h-10 w-10 rounded-full",
                          src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                          alt: ""
                        })
                      ]),
                      vue.createVNode("div", { class: "ml-3" }, [
                        vue.createVNode("div", { class: "text-base font-medium text-white" }, "Tom Cook"),
                        vue.createVNode("div", { class: "text-sm font-medium text-gray-400" }, "tom@example.com")
                      ]),
                      vue.createVNode("button", {
                        type: "button",
                        class: "ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      }, [
                        vue.createVNode("span", { class: "sr-only" }, "View notifications"),
                        vue.createVNode(vue.unref(outline.BellIcon), {
                          class: "h-6 w-6",
                          "aria-hidden": "true"
                        })
                      ])
                    ]),
                    vue.createVNode("div", { class: "mt-3 px-2 space-y-1" }, [
                      vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                        as: "a",
                        href: "/",
                        class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("Your Profile")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                        as: "a",
                        href: "/",
                        class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("Settings")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(vue$1.DisclosureButton), {
                        as: "a",
                        href: _ctx.route("logout"),
                        class: "block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" Sign Out ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="container mx-auto sm:px-6 lg:px-6 py-6">`);
      serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><footer class="text-center bg-gray-900 text-white"><div class="container mx-auto px-6 pt-6"><div class="flex justify-center mb-6"><a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="w-3 h-full mx-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a><a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="w-3 h-full mx-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a><a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">`);
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(outline.MailIcon), { class: "w-4 h-full mx-auto" }, null, _parent));
      _push(`</a><a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">`);
      _push(serverRenderer$1.ssrRenderComponent(vue.unref(outline.NewspaperIcon), { class: "w-4 h-full mx-auto" }, null, _parent));
      _push(`</a></div></div><div class="text-center p-4" style="${serverRenderer$1.ssrRenderStyle({ "background-color": "rgba(0, 0, 0, 0.2)" })}"> \xA9 2016-2022 <a class="text-whitehite" href="https://www.charlespage.me" target="_blank">Charles Page</a></div></footer><!--]-->`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Default.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
var fakeEvents = [
  {
    title: "Virtual: Olmsted And America's Urban Parks Watch Party And Panel Discussion Event",
    slug: "virtual-olmsted-and-americas-urban-parks-watch-party-and-panel-discussion-event-april-24-2021-other-piedmont-park",
    start_date: "04/24/21",
    start_time: "08:00 AM",
    end_date: "04/26/21",
    end_time: "06:30 PM",
    price: "N/A",
    category: {
      name: "Other",
      slug: "other"
    },
    location: {
      name: "Piedmont Park",
      slug: "piedmont-park",
      images: []
    },
    options: {
      is_family_friendly: true
    },
    tags: [],
    images: [
      {
        srp_thumb_url: "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5946/2642-virtual-olmsted-and-americas-urban-parks-watch-party-and-panel-discussion-event-april-24-2021-other-piedmont-parkpng"
      }
    ],
    tickets_url: "https://www.google.com"
  },
  {
    title: "Aspen Anonda Ep Release 'This One Is About You'",
    slug: "aspen-anonda-ep-release-this-one-is-about-you-april-26-2021-music-eddies-attic",
    start_date: "04/26/21",
    start_time: "07:00 PM",
    end_date: "04/26/21",
    end_time: "10:00 PM",
    price: "$12 - $48",
    category: {
      name: "Music",
      slug: "music"
    },
    location: {
      name: "Eddie's Attic",
      slug: "eddies-attic",
      images: [
        {
          srp_thumb_url: "https://funinatl.nyc3.cdn.digitaloceanspaces.com/528/conversions/eddies-attic-thumb_medium.jpg"
        }
      ]
    },
    options: {
      is_family_friendly: false
    },
    tags: [],
    images: [
      {
        srp_thumb_url: "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5947/2643-green-market-a-local-farmers-market-april-24-2021-other-piedmont-parkpng"
      }
    ],
    tickets_url: "https://www.google.com"
  },
  {
    title: "Green Market (A Local Farmers Market)",
    slug: "https://www.funinatl.com/event/green-market-a-local-farmers-market-april-24-2021-other-piedmont-park",
    start_date: "04/26/21",
    start_time: "09:00 AM",
    end_date: "04/26/21",
    end_time: "01:00 PM",
    price: "$5.00",
    category: {
      name: "Other",
      slug: "other"
    },
    location: {
      name: "Laughing Skull Lounge",
      slug: "piedmont-park",
      images: []
    },
    options: {
      is_family_friendly: true
    },
    tags: [],
    images: [
      {
        srp_thumb_url: "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5948/2644-piedmont-park-guided-history-tour-april-24-2021-other-piedmont-park.jpg"
      }
    ],
    tickets_url: "https://www.google.com"
  }
];
const _sfc_main$h = {
  __name: "CategoryBadge",
  __ssrInlineRender: true,
  props: {
    category: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.category.slug === "other") {
        _push(`<span class="inline-block text-center px-2.5 py-0.5 text-xs font-medium absolute inset-x-0 bottom-0 opacity-75 bg-green-100 text-green-800 hover:bg-green-500 hover:text-black">${serverRenderer$1.ssrInterpolate(__props.category.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.category.slug === "music") {
        _push(`<span class="inline-block text-center px-2.5 py-0.5 text-xs font-medium absolute inset-x-0 bottom-0 opacity-75 bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-black">${serverRenderer$1.ssrInterpolate(__props.category.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.category.slug === "comedy") {
        _push(`<span class="inline-block text-center px-2.5 py-0.5 text-xs font-medium absolute inset-x-0 bottom-0 opacity-75 bg-red-100 text-red-800 hover:bg-red-500 hover:text-black">${serverRenderer$1.ssrInterpolate(__props.category.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Elements/Badges/CategoryBadge.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = {
  __name: "LocationBadge",
  __ssrInlineRender: true,
  props: {
    category: Object,
    location: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.category.slug === "other") {
        _push(`<span class="inline-block text-center px-2.5 py-0.5 rounded-full text-xs font-medium absolute bottom-1 right-1 bg-green-100 text-green-800 hover:bg-green-500 hover:text-black">${serverRenderer$1.ssrInterpolate(__props.location.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.category.slug === "music") {
        _push(`<span class="inline-block text-center px-2.5 py-0.5 rounded-full text-xs font-medium absolute bottom-1 right-1 bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-black">${serverRenderer$1.ssrInterpolate(__props.location.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.category.slug === "comedy") {
        _push(`<span class="inline-block text-center px-2.5 py-0.5 rounded-full text-xs font-medium absolute bottom-1 right-1 bg-red-100 text-red-800 hover:bg-red-500 hover:text-black">${serverRenderer$1.ssrInterpolate(__props.location.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Elements/Badges/LocationBadge.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = {
  __name: "Select",
  __ssrInlineRender: true,
  props: [
    "modelValue",
    "classes",
    "options",
    "emptyLabel"
  ],
  emits: ["update:modelValue"],
  setup(__props) {
    const input = vue.ref(null);
    vue.onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({
        class: ["border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full", __props.classes],
        value: __props.modelValue,
        ref_key: "input",
        ref: input
      }, _attrs))}><option value="">${serverRenderer$1.ssrInterpolate(__props.emptyLabel || "")}</option><!--[-->`);
      serverRenderer$1.ssrRenderList(__props.options, (option) => {
        _push(`<option${serverRenderer$1.ssrRenderAttr("value", option.value)}>${serverRenderer$1.ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/Select.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = {
  __name: "Input",
  __ssrInlineRender: true,
  props: [
    "modelValue",
    "classes",
    "type",
    "placeholder"
  ],
  emits: ["update:modelValue"],
  setup(__props) {
    const input = vue.ref(null);
    vue.onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({
        type: __props.type || "text",
        class: ["border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full", __props.classes],
        value: __props.modelValue,
        ref_key: "input",
        ref: input,
        placeholder: __props.placeholder || ""
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/Input.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    },
    classes: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({
        type: __props.type,
        class: [__props.classes, "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"]
      }, _attrs))}>`);
      serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Form/Button.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "HomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const activity = [
      {
        id: 1,
        category: {
          "name": "Music",
          "slug": "music"
        },
        location: {
          "name": "Bad Earl",
          "slug": "bad-earl",
          "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
        },
        date: "6d ago"
      },
      {
        id: 2,
        category: {
          "name": "Music",
          "slug": "music"
        },
        location: {
          "name": "Bad Earl",
          "slug": "bad-earl",
          "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
        },
        date: "2d ago"
      },
      {
        id: 3,
        category: {
          "name": "Music",
          "slug": "music"
        },
        location: {
          "name": "Bad Earl",
          "slug": "bad-earl",
          "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
        },
        tags: [
          { name: "21+", href: "#", color: "bg-rose-500" },
          { name: "Mask Required", href: "#", color: "bg-indigo-500" }
        ],
        date: "6h ago"
      },
      {
        id: 4,
        category: {
          "name": "Music",
          "slug": "music"
        },
        location: {
          "name": "Bad Earl",
          "slug": "bad-earl",
          "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
        },
        date: "2h ago"
      }
    ];
    const categories = [
      {
        slug: "arts-and-theatre",
        label: "Arts & Theatre"
      },
      {
        slug: "comedy",
        label: "Comedy"
      },
      {
        slug: "food-drinks",
        label: "Food & Drinks"
      },
      {
        slug: "music",
        label: "Music"
      },
      {
        slug: "other",
        label: "Other"
      }
    ];
    const locations = [
      {
        slug: "529",
        label: "529"
      },
      {
        slug: "aisle-5",
        label: "Aisle 5"
      }
    ];
    const searchForm = {
      category: null,
      location: null,
      q: null
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({ class: "mb-40" }, _attrs))}><div class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left rounded-lg"><div class="container mx-auto xl:px-32"><div class="grid lg:grid-cols-2 gap-12 items-center"><div class="mt-12 lg:mt-0"><h1 class="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">Fun In Atlanta<br><span class="text-blue-600">Find things to do!</span></h1><div class="flow-root"><ul role="list" class="-mb-8"><!--[-->`);
      serverRenderer$1.ssrRenderList(activity, (activityItem, activityItemIdx) => {
        _push(`<li><div class="relative pb-8">`);
        if (activityItemIdx !== activity.length - 1) {
          _push(`<span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="relative flex items-start space-x-3"><div><div class="relative px-1"><img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"${serverRenderer$1.ssrRenderAttr("src", activityItem.location.image_url)} alt=""></div></div><div class="min-w-0 flex-1 py-0"><div class="text-sm leading-8 text-gray-500"><span class="mr-0.5"><a href="/" class="font-medium text-gray-900">${serverRenderer$1.ssrInterpolate(activityItem.location.name)}</a> ${serverRenderer$1.ssrInterpolate(" ")} <a href="/">added new event</a></span> ${serverRenderer$1.ssrInterpolate(" ")} <span class="mr-0.5"><!--[-->`);
        serverRenderer$1.ssrRenderList(activityItem.tags, (tag) => {
          _push(`<!--[--><a${serverRenderer$1.ssrRenderAttr("href", tag.href)} class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"><span class="absolute flex-shrink-0 flex items-center justify-center"><span class="${serverRenderer$1.ssrRenderClass([tag.color, "h-1.5 w-1.5 rounded-full"])}" aria-hidden="true"></span></span><span class="ml-3.5 font-medium text-gray-900">${serverRenderer$1.ssrInterpolate(tag.name)}</span></a> ${serverRenderer$1.ssrInterpolate(" ")}<!--]-->`);
        });
        _push(`<!--]--></span><span class="whitespace-nowrap">${serverRenderer$1.ssrInterpolate(activityItem.date)}</span></div></div></div></div></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="mb-12 lg:mb-0"><div class="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12"><form><div class="grid md:grid-cols-2 md:gap-6"><div class="mb-6">`);
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$f, {
        modelValue: searchForm.category,
        "onUpdate:modelValue": ($event) => searchForm.category = $event,
        options: categories,
        emptyLabel: "Category"
      }, null, _parent));
      _push(`</div><div class="mb-6">`);
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$f, {
        modelValue: searchForm.location,
        "onUpdate:modelValue": ($event) => searchForm.location = $event,
        options: locations,
        emptyLabel: "Location"
      }, null, _parent));
      _push(`</div></div>`);
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$e, {
        modelValue: searchForm.q,
        "onUpdate:modelValue": ($event) => searchForm.q = $event,
        placeholder: "Search for Event..."
      }, null, _parent));
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$d, {
        classes: "w-full justify-center mt-4 text-xl bg-blue-500 hover:bg-blue-800",
        type: "button"
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Search`);
          } else {
            return [
              vue.createTextVNode("Search")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Layout/HomeHero.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String
  },
  setup(__props) {
    const events = vue.ref(fakeEvents);
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$i, _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Homepage" }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$c, null, null, _parent2, _scopeId));
            _push2(`<h3 class="uppercase pl-4 text-2xl font-bold leading-5 md:text-center"${_scopeId}>This Weekend</h3><h4 class="uppercase pl-4 text-xl leading-5 pt-8"${_scopeId}>Saturday, April 24th</h4><div class="relative flex flex-col md:flex-row items-top justify-center bg-gray-100 dark:bg-gray-900 sm:items-center pt-6 sm:pt-2"${_scopeId}><!--[-->`);
            serverRenderer$1.ssrRenderList(events.value, (event) => {
              _push2(`<div class="p-4"${_scopeId}><div class="flex justify-center"${_scopeId}><div class="w-full flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg"${_scopeId}><div class="w-full md:w-80 h-64 md:h-72 relative"${_scopeId}><img class="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"${serverRenderer$1.ssrRenderAttr("alt", event.title)}${serverRenderer$1.ssrRenderAttr("src", event.images[0].srp_thumb_url)}${_scopeId}>`);
              if (event.options.is_family_friendly) {
                _push2(`<span class="inline-block text-center bg-yellow-300 text-gray-500 hover:bg-yellow-200 text-xs absolute inset-x-0 top-0 py-1"${_scopeId}>`);
                _push2(serverRenderer$1.ssrRenderComponent(vue.unref(solid.EmojiHappyIcon), { class: "w-4 h-4 inline" }, null, _parent2, _scopeId));
                _push2(` Family Friendly </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$h, {
                category: event.category
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="p-2 flex flex-col justify-start relative"${_scopeId}><h5 class="text-gray-900 text-xl font-medium mb-2"${_scopeId}>${serverRenderer$1.ssrInterpolate(event.title)}</h5><p class="text-gray-700 text-base pb-6"${_scopeId}> This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. </p><p class="block text-gray-400 text-center font-bold text-lg pb-12 md:pb-6"${_scopeId}>${serverRenderer$1.ssrInterpolate(event.price)}</p><p class="text-gray-600 text-sm md:text-xs absolute bottom-1"${_scopeId}> Saturday, June 24th at 9 PM </p>`);
              _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$g, {
                category: event.category,
                location: event.location
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              vue.createVNode(vue.unref(inertiaVue3.Head), { title: "Homepage" }),
              vue.createVNode(_sfc_main$c),
              vue.createVNode("h3", { class: "uppercase pl-4 text-2xl font-bold leading-5 md:text-center" }, "This Weekend"),
              vue.createVNode("h4", { class: "uppercase pl-4 text-xl leading-5 pt-8" }, "Saturday, April 24th"),
              vue.createVNode("div", { class: "relative flex flex-col md:flex-row items-top justify-center bg-gray-100 dark:bg-gray-900 sm:items-center pt-6 sm:pt-2" }, [
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(events.value, (event) => {
                  return vue.openBlock(), vue.createBlock("div", {
                    key: event.slug,
                    class: "p-4"
                  }, [
                    vue.createVNode("div", { class: "flex justify-center" }, [
                      vue.createVNode("div", { class: "w-full flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg" }, [
                        vue.createVNode("div", { class: "w-full md:w-80 h-64 md:h-72 relative" }, [
                          vue.createVNode("img", {
                            class: "w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg",
                            alt: event.title,
                            src: event.images[0].srp_thumb_url
                          }, null, 8, ["alt", "src"]),
                          event.options.is_family_friendly ? (vue.openBlock(), vue.createBlock("span", {
                            key: 0,
                            class: "inline-block text-center bg-yellow-300 text-gray-500 hover:bg-yellow-200 text-xs absolute inset-x-0 top-0 py-1"
                          }, [
                            vue.createVNode(vue.unref(solid.EmojiHappyIcon), { class: "w-4 h-4 inline" }),
                            vue.createTextVNode(" Family Friendly ")
                          ])) : vue.createCommentVNode("", true),
                          vue.createVNode(_sfc_main$h, {
                            category: event.category
                          }, null, 8, ["category"])
                        ]),
                        vue.createVNode("div", { class: "p-2 flex flex-col justify-start relative" }, [
                          vue.createVNode("h5", { class: "text-gray-900 text-xl font-medium mb-2" }, vue.toDisplayString(event.title), 1),
                          vue.createVNode("p", { class: "text-gray-700 text-base pb-6" }, " This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. "),
                          vue.createVNode("p", { class: "block text-gray-400 text-center font-bold text-lg pb-12 md:pb-6" }, vue.toDisplayString(event.price), 1),
                          vue.createVNode("p", { class: "text-gray-600 text-sm md:text-xs absolute bottom-1" }, " Saturday, June 24th at 9 PM "),
                          vue.createVNode(_sfc_main$g, {
                            category: event.category,
                            location: event.location
                          }, null, 8, ["category", "location"])
                        ])
                      ])
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var Home = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
      }, _attrs))}>`);
      serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Button.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  __name: "Input",
  __ssrInlineRender: true,
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(__props) {
    const input = vue.ref(null);
    vue.onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({
        class: "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
        value: __props.modelValue,
        ref_key: "input",
        ref: input
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Input.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "Label",
  __ssrInlineRender: true,
  props: ["value"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${serverRenderer$1.ssrRenderAttrs(vue.mergeProps({ class: "block font-medium text-sm text-gray-700" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${serverRenderer$1.ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<span>`);
        serverRenderer$1.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Label.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "ValidationErrors",
  __ssrInlineRender: true,
  setup(__props) {
    const errors = vue.computed(() => inertiaVue3.usePage().props.value.errors);
    const hasErrors = vue.computed(() => Object.keys(errors.value).length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      if (vue.unref(hasErrors)) {
        _push(`<div${serverRenderer$1.ssrRenderAttrs(_attrs)}><div class="font-medium text-red-600">Whoops! Something went wrong.</div><ul class="mt-3 list-disc list-inside text-sm text-red-600"><!--[-->`);
        serverRenderer$1.ssrRenderList(vue.unref(errors), (error, key) => {
          _push(`<li>${serverRenderer$1.ssrInterpolate(error)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ValidationErrors.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = inertiaVue3.useForm({
      password: ""
    });
    const submit = () => {
      form.post(route("password.confirm"), {
        onFinish: () => form.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$i, _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Confirm Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$7, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).password,
              "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
              required: "",
              autocomplete: "current-password",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$a, {
              class: ["ml-4", { "opacity-25": vue.unref(form).processing }],
              disabled: vue.unref(form).processing
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirm `);
                } else {
                  return [
                    vue.createTextVNode(" Confirm ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vue.createVNode(vue.unref(inertiaVue3.Head), { title: "Confirm Password" }),
              vue.createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " This is a secure area of the application. Please confirm your password before continuing. "),
              vue.createVNode(_sfc_main$7, { class: "mb-4" }),
              vue.createVNode("form", {
                onSubmit: vue.withModifiers(submit, ["prevent"])
              }, [
                vue.createVNode("div", null, [
                  vue.createVNode(_sfc_main$8, {
                    for: "password",
                    value: "Password"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).password,
                    "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "flex justify-end mt-4" }, [
                  vue.createVNode(_sfc_main$a, {
                    class: ["ml-4", { "opacity-25": vue.unref(form).processing }],
                    disabled: vue.unref(form).processing
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Confirm ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var ConfirmPassword = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const form = inertiaVue3.useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$i, _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Forgot Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${serverRenderer$1.ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$7, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).email,
              "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$a, {
              class: { "opacity-25": vue.unref(form).processing },
              disabled: vue.unref(form).processing
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Email Password Reset Link `);
                } else {
                  return [
                    vue.createTextVNode(" Email Password Reset Link ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vue.createVNode(vue.unref(inertiaVue3.Head), { title: "Forgot Password" }),
              vue.createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. "),
              __props.status ? (vue.openBlock(), vue.createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, vue.toDisplayString(__props.status), 1)) : vue.createCommentVNode("", true),
              vue.createVNode(_sfc_main$7, { class: "mb-4" }),
              vue.createVNode("form", {
                onSubmit: vue.withModifiers(submit, ["prevent"])
              }, [
                vue.createVNode("div", null, [
                  vue.createVNode(_sfc_main$8, {
                    for: "email",
                    value: "Email"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).email,
                    "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  vue.createVNode(_sfc_main$a, {
                    class: { "opacity-25": vue.unref(form).processing },
                    disabled: vue.unref(form).processing
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Email Password Reset Link ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ForgotPassword = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit }) {
    const props = __props;
    const proxyChecked = vue.computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${serverRenderer$1.ssrRenderAttrs((_temp0 = vue.mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(vue.unref(proxyChecked)) ? serverRenderer$1.ssrLooseContain(vue.unref(proxyChecked), __props.value) : vue.unref(proxyChecked),
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      }, _attrs), vue.mergeProps(_temp0, serverRenderer$1.ssrGetDynamicModelProps(_temp0, vue.unref(proxyChecked)))))}>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String
  },
  setup(__props) {
    const form = inertiaVue3.useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$i, _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Log in" }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$7, { class: "mb-4" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${serverRenderer$1.ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).email,
              "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).password,
              "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$4, {
              name: "remember",
              checked: vue.unref(form).remember,
              "onUpdate:checked": ($event) => vue.unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm text-gray-600"${_scopeId}>Remember me</span></label></div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            if (__props.canResetPassword) {
              _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
                href: _ctx.route("password.request"),
                class: "underline text-sm text-gray-600 hover:text-gray-900"
              }, {
                default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot your password? `);
                  } else {
                    return [
                      vue.createTextVNode(" Forgot your password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$a, {
              class: ["ml-4", { "opacity-25": vue.unref(form).processing }],
              disabled: vue.unref(form).processing
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log in `);
                } else {
                  return [
                    vue.createTextVNode(" Log in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vue.createVNode(vue.unref(inertiaVue3.Head), { title: "Log in" }),
              vue.createVNode(_sfc_main$7, { class: "mb-4" }),
              __props.status ? (vue.openBlock(), vue.createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, vue.toDisplayString(__props.status), 1)) : vue.createCommentVNode("", true),
              vue.createVNode("form", {
                onSubmit: vue.withModifiers(submit, ["prevent"])
              }, [
                vue.createVNode("div", null, [
                  vue.createVNode(_sfc_main$8, {
                    for: "email",
                    value: "Email"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).email,
                    "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "mt-4" }, [
                  vue.createVNode(_sfc_main$8, {
                    for: "password",
                    value: "Password"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).password,
                    "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "block mt-4" }, [
                  vue.createVNode("label", { class: "flex items-center" }, [
                    vue.createVNode(_sfc_main$4, {
                      name: "remember",
                      checked: vue.unref(form).remember,
                      "onUpdate:checked": ($event) => vue.unref(form).remember = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    vue.createVNode("span", { class: "ml-2 text-sm text-gray-600" }, "Remember me")
                  ])
                ]),
                vue.createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  __props.canResetPassword ? (vue.openBlock(), vue.createBlock(vue.unref(inertiaVue3.Link), {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "underline text-sm text-gray-600 hover:text-gray-900"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Forgot your password? ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : vue.createCommentVNode("", true),
                  vue.createVNode(_sfc_main$a, {
                    class: ["ml-4", { "opacity-25": vue.unref(form).processing }],
                    disabled: vue.unref(form).processing
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Log in ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Login = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = inertiaVue3.useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$i, _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$7, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).name,
              "onUpdate:modelValue": ($event) => vue.unref(form).name = $event,
              required: "",
              autofocus: "",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).email,
              "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
              required: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).password,
              "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => vue.unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
              href: _ctx.route("login"),
              class: "underline text-sm text-gray-600 hover:text-gray-900"
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Already registered? `);
                } else {
                  return [
                    vue.createTextVNode(" Already registered? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$a, {
              class: ["ml-4", { "opacity-25": vue.unref(form).processing }],
              disabled: vue.unref(form).processing
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Register `);
                } else {
                  return [
                    vue.createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vue.createVNode(vue.unref(inertiaVue3.Head), { title: "Register" }),
              vue.createVNode(_sfc_main$7, { class: "mb-4" }),
              vue.createVNode("form", {
                onSubmit: vue.withModifiers(submit, ["prevent"])
              }, [
                vue.createVNode("div", null, [
                  vue.createVNode(_sfc_main$8, {
                    for: "name",
                    value: "Name"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "name",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).name,
                    "onUpdate:modelValue": ($event) => vue.unref(form).name = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "mt-4" }, [
                  vue.createVNode(_sfc_main$8, {
                    for: "email",
                    value: "Email"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).email,
                    "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
                    required: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "mt-4" }, [
                  vue.createVNode(_sfc_main$8, {
                    for: "password",
                    value: "Password"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).password,
                    "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "mt-4" }, [
                  vue.createVNode(_sfc_main$8, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => vue.unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  vue.createVNode(vue.unref(inertiaVue3.Link), {
                    href: _ctx.route("login"),
                    class: "underline text-sm text-gray-600 hover:text-gray-900"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Already registered? ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  vue.createVNode(_sfc_main$a, {
                    class: ["ml-4", { "opacity-25": vue.unref(form).processing }],
                    disabled: vue.unref(form).processing
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Register ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Register = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: String,
    token: String
  },
  setup(__props) {
    const props = __props;
    const form = inertiaVue3.useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.update"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$i, _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$7, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).email,
              "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).password,
              "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$8, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$9, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: vue.unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => vue.unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$a, {
              class: { "opacity-25": vue.unref(form).processing },
              disabled: vue.unref(form).processing
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reset Password `);
                } else {
                  return [
                    vue.createTextVNode(" Reset Password ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vue.createVNode(vue.unref(inertiaVue3.Head), { title: "Reset Password" }),
              vue.createVNode(_sfc_main$7, { class: "mb-4" }),
              vue.createVNode("form", {
                onSubmit: vue.withModifiers(submit, ["prevent"])
              }, [
                vue.createVNode("div", null, [
                  vue.createVNode(_sfc_main$8, {
                    for: "email",
                    value: "Email"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).email,
                    "onUpdate:modelValue": ($event) => vue.unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "mt-4" }, [
                  vue.createVNode(_sfc_main$8, {
                    for: "password",
                    value: "Password"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).password,
                    "onUpdate:modelValue": ($event) => vue.unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "mt-4" }, [
                  vue.createVNode(_sfc_main$8, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  vue.createVNode(_sfc_main$9, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: vue.unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => vue.unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vue.createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  vue.createVNode(_sfc_main$a, {
                    class: { "opacity-25": vue.unref(form).processing },
                    disabled: vue.unref(form).processing
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Reset Password ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ResetPassword = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const props = __props;
    const form = inertiaVue3.useForm();
    const submit = () => {
      form.post(route("verification.send"));
    };
    const verificationLinkSent = vue.computed(() => props.status === "verification-link-sent");
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer$1.ssrRenderComponent(_sfc_main$i, _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Head), { title: "Email Verification" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </div>`);
            if (vue.unref(verificationLinkSent)) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided during registration. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
            _push2(serverRenderer$1.ssrRenderComponent(_sfc_main$a, {
              class: { "opacity-25": vue.unref(form).processing },
              disabled: vue.unref(form).processing
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Resend Verification Email `);
                } else {
                  return [
                    vue.createTextVNode(" Resend Verification Email ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer$1.ssrRenderComponent(vue.unref(inertiaVue3.Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "underline text-sm text-gray-600 hover:text-gray-900"
            }, {
              default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log Out`);
                } else {
                  return [
                    vue.createTextVNode("Log Out")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vue.createVNode(vue.unref(inertiaVue3.Head), { title: "Email Verification" }),
              vue.createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. "),
              vue.unref(verificationLinkSent) ? (vue.openBlock(), vue.createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, " A new verification link has been sent to the email address you provided during registration. ")) : vue.createCommentVNode("", true),
              vue.createVNode("form", {
                onSubmit: vue.withModifiers(submit, ["prevent"])
              }, [
                vue.createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  vue.createVNode(_sfc_main$a, {
                    class: { "opacity-25": vue.unref(form).processing },
                    disabled: vue.unref(form).processing
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" Resend Verification Email ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"]),
                  vue.createVNode(vue.unref(inertiaVue3.Link), {
                    href: _ctx.route("logout"),
                    method: "post",
                    as: "button",
                    class: "underline text-sm text-gray-600 hover:text-gray-900"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("Log Out")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var VerifyEmail = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
