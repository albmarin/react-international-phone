(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function e(e, t) {
  if (t == null || t > e.length) t = e.length;
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function t(e) {
  if (Array.isArray(e)) return e;
}
function r(t) {
  if (Array.isArray(t)) return e(t);
}
function n(e, t, r) {
  if (t in e) {
    Object.defineProperty(e, t, {
      value: r,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = r;
  }
  return e;
}
function a(e) {
  if (typeof Symbol !== "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function o(e, t) {
  var r = e == null ? null : typeof Symbol !== "undefined" && e[Symbol.iterator] || e["@@iterator"];
  if (r == null) return;
  var n = [];
  var a = true;
  var o = false;
  var i, u;
  try {
    for (r = r.call(e); !(a = (i = r.next()).done); a = true) {
      n.push(i.value);
      if (t && n.length === t) break;
    }
  } catch (e) {
    o = true;
    u = e;
  } finally {
    try {
      if (!a && r["return"] != null) r["return"]();
    } finally {
      if (o) throw u;
    }
  }
  return n;
}
function i() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function u() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function l(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    var a = Object.keys(r);
    if (typeof Object.getOwnPropertySymbols === "function") {
      a = a.concat(Object.getOwnPropertySymbols(r).filter(function (e) {
        return Object.getOwnPropertyDescriptor(r, e).enumerable;
      }));
    }
    a.forEach(function (t) {
      n(e, t, r[t]);
    });
  }
  return e;
}
function c(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    if (t) {
      n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      });
    }
    r.push.apply(r, n);
  }
  return r;
}
function d(e, t) {
  t = t != null ? t : {};
  if (Object.getOwnPropertyDescriptors) {
    Object.defineProperties(e, Object.getOwnPropertyDescriptors(t));
  } else {
    c(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function s(e, t) {
  if (e == null) return {};
  var r = f(e, t);
  var n, a;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++) {
      n = o[a];
      if (t.indexOf(n) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(e, n)) continue;
      r[n] = e[n];
    }
  }
  return r;
}
function f(e, t) {
  if (e == null) return {};
  var r = {};
  var n = Object.keys(e);
  var a, o;
  for (o = 0; o < n.length; o++) {
    a = n[o];
    if (t.indexOf(a) >= 0) continue;
    r[a] = e[a];
  }
  return r;
}
function v(e, r) {
  return t(e) || o(e, r) || m(e, r) || i();
}
function y(e) {
  return r(e) || a(e) || m(e) || u();
}
function p(e) {
  "@swc/helpers - typeof";

  return e && typeof Symbol !== "undefined" && e.constructor === Symbol ? "symbol" : _typeof(e);
}
function m(t, r) {
  if (!t) return;
  if (typeof t === "string") return e(t, r);
  var n = Object.prototype.toString.call(t).slice(8, -1);
  if (n === "Object" && t.constructor) n = t.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return e(t, r);
}
var h = Object.create;
var b = Object.defineProperty;
var C = Object.getOwnPropertyDescriptor;
var g = Object.getOwnPropertyNames;
var w = Object.getPrototypeOf,
  D = Object.prototype.hasOwnProperty;
var P = function P(e, t) {
    for (var r in t) b(e, r, {
      get: t[r],
      enumerable: !0
    });
  },
  S = function S(e, t, r, n) {
    var a = true,
      o = false,
      i = undefined;
    if (t && _typeof(t) == "object" || typeof t == "function") try {
      var u = function u() {
        var a = c.value;
        !D.call(e, a) && a !== r && b(e, a, {
          get: function get() {
            return t[a];
          },
          enumerable: !(n = C(t, a)) || n.enumerable
        });
      };
      for (var l = g(t)[Symbol.iterator](), c; !(a = (c = l.next()).done); a = true) u();
    } catch (e) {
      o = true;
      i = e;
    } finally {
      try {
        if (!a && l["return"] != null) {
          l["return"]();
        }
      } finally {
        if (o) {
          throw i;
        }
      }
    }
    return e;
  };
var k = function k(e, t, r) {
    return r = e != null ? h(w(e)) : {}, S(t || !e || !e.__esModule ? b(r, "default", {
      value: e,
      enumerable: !0
    }) : r, e);
  },
  x = function x(e) {
    return S(b({}, "__esModule", {
      value: !0
    }), e);
  };
var N = {};
P(N, {
  CountrySelector: function CountrySelector() {
    return eh;
  },
  CountrySelectorDropdown: function CountrySelectorDropdown() {
    return em;
  },
  DialCodePreview: function DialCodePreview() {
    return eC;
  },
  FlagImage: function FlagImage() {
    return ev;
  },
  PhoneInput: function PhoneInput() {
    return ew;
  },
  buildCountryData: function buildCountryData() {
    return F;
  },
  defaultCountries: function defaultCountries() {
    return E;
  },
  getActiveFormattingMask: function getActiveFormattingMask() {
    return er;
  },
  getCountry: function getCountry() {
    return eo;
  },
  guessCountryByPartialPhoneNumber: function guessCountryByPartialPhoneNumber() {
    return ei;
  },
  parseCountry: function parseCountry() {
    return en;
  },
  removeDialCode: function removeDialCode() {
    return R;
  },
  usePhoneInput: function usePhoneInput() {
    return et;
  }
});
module.exports = x(N);
var A = k(require("react"));
var E = [["Afghanistan", "af", "93"], ["Albania", "al", "355"], ["Algeria", "dz", "213"], ["Andorra", "ad", "376"], ["Angola", "ao", "244"], ["Antigua and Barbuda", "ag", "1268"], ["Argentina", "ar", "54", "(..) ........", 0], ["Armenia", "am", "374", ".. ......"], ["Aruba", "aw", "297"], ["Australia", "au", "61", {
  "default": ". .... ....",
  "/^4/": "... ... ...",
  "/^5(?!50)/": "... ... ...",
  "/^1(3|8)00/": ".... ... ...",
  "/^13/": ".. .. ..",
  "/^180/": "... ...."
}, 0, []], ["Austria", "at", "43"], ["Azerbaijan", "az", "994", "(..) ... .. .."], ["Bahamas", "bs", "1242"], ["Bahrain", "bh", "973"], ["Bangladesh", "bd", "880"], ["Barbados", "bb", "1246"], ["Belarus", "by", "375", "(..) ... .. .."], ["Belgium", "be", "32", "... .. .. .."], ["Belize", "bz", "501"], ["Benin", "bj", "229"], ["Bhutan", "bt", "975"], ["Bolivia", "bo", "591"], ["Bosnia and Herzegovina", "ba", "387"], ["Botswana", "bw", "267"], ["Brazil", "br", "55", "(..) ........."], ["British Indian Ocean Territory", "io", "246"], ["Brunei", "bn", "673"], ["Bulgaria", "bg", "359"], ["Burkina Faso", "bf", "226"], ["Burundi", "bi", "257"], ["Cambodia", "kh", "855"], ["Cameroon", "cm", "237"], ["Canada", "ca", "1", "(...) ...-....", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde", "cv", "238"], ["Caribbean Netherlands", "bq", "599", "", 1], ["Central African Republic", "cf", "236"], ["Chad", "td", "235"], ["Chile", "cl", "56"], ["China", "cn", "86", "... .... ...."], ["Colombia", "co", "57", "... ... ...."], ["Comoros", "km", "269"], ["Congo", "cd", "243"], ["Congo", "cg", "242"], ["Costa Rica", "cr", "506", "....-...."], ["C\xf4te d'Ivoire", "ci", "225", ".. .. .. .. .."], ["Croatia", "hr", "385"], ["Cuba", "cu", "53"], ["Cura\xe7ao", "cw", "599", "", 0], ["Cyprus", "cy", "357", ".. ......"], ["Czech Republic", "cz", "420", "... ... ..."], ["Denmark", "dk", "45", ".. .. .. .."], ["Djibouti", "dj", "253"], ["Dominica", "dm", "1767"], ["Dominican Republic", "do", "1", "", 2], ["Ecuador", "ec", "593"], ["Egypt", "eg", "20"], ["El Salvador", "sv", "503", "....-...."], ["Equatorial Guinea", "gq", "240"], ["Eritrea", "er", "291"], ["Estonia", "ee", "372", ".... ......"], ["Ethiopia", "et", "251"], ["Fiji", "fj", "679"], ["Finland", "fi", "358", ".. ... .. .."], ["France", "fr", "33", ". .. .. .. .."], ["French Guiana", "gf", "594"], ["French Polynesia", "pf", "689"], ["Gabon", "ga", "241"], ["Gambia", "gm", "220"], ["Georgia", "ge", "995"], ["Germany", "de", "49", ".... ........"], ["Ghana", "gh", "233"], ["Greece", "gr", "30"], ["Grenada", "gd", "1473"], ["Guadeloupe", "gp", "590", "", 0], ["Guam", "gu", "1671"], ["Guatemala", "gt", "502", "....-...."], ["Guinea", "gn", "224"], ["Guinea-Bissau", "gw", "245"], ["Guyana", "gy", "592"], ["Haiti", "ht", "509", "....-...."], ["Honduras", "hn", "504"], ["Hong Kong", "hk", "852", ".... ...."], ["Hungary", "hu", "36"], ["Iceland", "is", "354", "... ...."], ["India", "in", "91", ".....-....."], ["Indonesia", "id", "62"], ["Iran", "ir", "98", "... ... ...."], ["Iraq", "iq", "964"], ["Ireland", "ie", "353", ".. ......."], ["Israel", "il", "972", "... ... ...."], ["Italy", "it", "39", "... .......", 0], ["Jamaica", "jm", "1876"], ["Japan", "jp", "81", ".. .... ...."], ["Jordan", "jo", "962"], ["Kazakhstan", "kz", "7", "... ...-..-..", 0], ["Kenya", "ke", "254"], ["Kiribati", "ki", "686"], ["Kosovo", "xk", "383"], ["Kuwait", "kw", "965"], ["Kyrgyzstan", "kg", "996", "... ... ..."], ["Laos", "la", "856"], ["Latvia", "lv", "371", ".. ... ..."], ["Lebanon", "lb", "961"], ["Lesotho", "ls", "266"], ["Liberia", "lr", "231"], ["Libya", "ly", "218"], ["Liechtenstein", "li", "423"], ["Lithuania", "lt", "370"], ["Luxembourg", "lu", "352"], ["Macau", "mo", "853"], ["Macedonia", "mk", "389"], ["Madagascar", "mg", "261"], ["Malawi", "mw", "265"], ["Malaysia", "my", "60", "..-....-...."], ["Maldives", "mv", "960"], ["Mali", "ml", "223"], ["Malta", "mt", "356"], ["Marshall Islands", "mh", "692"], ["Martinique", "mq", "596"], ["Mauritania", "mr", "222"], ["Mauritius", "mu", "230"], ["Mexico", "mx", "52", "... ... ....", 0], ["Micronesia", "fm", "691"], ["Moldova", "md", "373", "(..) ..-..-.."], ["Monaco", "mc", "377"], ["Mongolia", "mn", "976"], ["Montenegro", "me", "382"], ["Morocco", "ma", "212"], ["Mozambique", "mz", "258"], ["Myanmar", "mm", "95"], ["Namibia", "na", "264"], ["Nauru", "nr", "674"], ["Nepal", "np", "977"], ["Netherlands", "nl", "31", ".. ........"], ["New Caledonia", "nc", "687"], ["New Zealand", "nz", "64", "...-...-...."], ["Nicaragua", "ni", "505"], ["Niger", "ne", "227"], ["Nigeria", "ng", "234"], ["North Korea", "kp", "850"], ["Norway", "no", "47", "... .. ..."], ["Oman", "om", "968"], ["Pakistan", "pk", "92", "...-......."], ["Palau", "pw", "680"], ["Palestine", "ps", "970"], ["Panama", "pa", "507"], ["Papua New Guinea", "pg", "675"], ["Paraguay", "py", "595"], ["Peru", "pe", "51"], ["Philippines", "ph", "63", ".... ......."], ["Poland", "pl", "48", "...-...-..."], ["Portugal", "pt", "351"], ["Puerto Rico", "pr", "1", "", 3, ["787", "939"]], ["Qatar", "qa", "974"], ["R\xe9union", "re", "262"], ["Romania", "ro", "40"], ["Russia", "ru", "7", "(...) ...-..-..", 1], ["Rwanda", "rw", "250"], ["Saint Kitts and Nevis", "kn", "1869"], ["Saint Lucia", "lc", "1758"], ["Saint Vincent and the Grenadines", "vc", "1784"], ["Samoa", "ws", "685"], ["San Marino", "sm", "378"], ["S\xe3o Tom\xe9 and Pr\xedncipe", "st", "239"], ["Saudi Arabia", "sa", "966"], ["Senegal", "sn", "221"], ["Serbia", "rs", "381"], ["Seychelles", "sc", "248"], ["Sierra Leone", "sl", "232"], ["Singapore", "sg", "65", "....-...."], ["Slovakia", "sk", "421"], ["Slovenia", "si", "386"], ["Solomon Islands", "sb", "677"], ["Somalia", "so", "252"], ["South Africa", "za", "27"], ["South Korea", "kr", "82", "... .... ...."], ["South Sudan", "ss", "211"], ["Spain", "es", "34", "... ... ..."], ["Sri Lanka", "lk", "94"], ["Sudan", "sd", "249"], ["Suriname", "sr", "597"], ["Swaziland", "sz", "268"], ["Sweden", "se", "46", "... ... ..."], ["Switzerland", "ch", "41", ".. ... .. .."], ["Syria", "sy", "963"], ["Taiwan", "tw", "886"], ["Tajikistan", "tj", "992"], ["Tanzania", "tz", "255"], ["Thailand", "th", "66"], ["Timor-Leste", "tl", "670"], ["Togo", "tg", "228"], ["Tonga", "to", "676"], ["Trinidad and Tobago", "tt", "1868"], ["Tunisia", "tn", "216"], ["Turkey", "tr", "90", "... ... .. .."], ["Turkmenistan", "tm", "993"], ["Tuvalu", "tv", "688"], ["Uganda", "ug", "256"], ["Ukraine", "ua", "380", "(..) ... .. .."], ["United Arab Emirates", "ae", "971"], ["United Kingdom", "gb", "44", ".... ......"], ["United States", "us", "1", "(...) ...-....", 0], ["Uruguay", "uy", "598"], ["Uzbekistan", "uz", "998", ".. ... .. .."], ["Vanuatu", "vu", "678"], ["Vatican City", "va", "39", ".. .... ....", 1], ["Venezuela", "ve", "58"], ["Vietnam", "vn", "84"], ["Yemen", "ye", "967"], ["Zambia", "zm", "260"], ["Zimbabwe", "zw", "263"]];
var M = "react-international-phone-",
  O = function O() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
      t[r] = arguments[r];
    }
    return t.filter(function (e) {
      return !!e;
    }).join(" ").trim();
  },
  j = function j() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
      t[r] = arguments[r];
    }
    return O.apply(void 0, y(t)).split(" ").map(function (e) {
      return "".concat(M).concat(e);
    }).join(" ");
  },
  I = function I(e) {
    var t = e.addPrefix,
      r = e.rawClassNames;
    return O.apply(void 0, [j.apply(void 0, y(t))].concat(y(r)));
  };
var L = function L(e) {
  var t = e.value,
    r = e.mask,
    n = e.maskSymbol,
    a = e.offset,
    o = a === void 0 ? 0 : a,
    i = e.trimNonMaskCharsLeftover,
    u = i === void 0 ? !1 : i;
  if (t.length < o) return t;
  var l = t.slice(0, o),
    c = t.slice(o),
    d = l,
    s = 0;
  var f = true,
    v = false,
    y = undefined;
  try {
    for (var p = r.split("")[Symbol.iterator](), m; !(f = (m = p.next()).done); f = true) {
      var h = m.value;
      if (s >= c.length) {
        if (!u && h !== n) {
          d += h;
          continue;
        }
        break;
      }
      h === n ? (d += c[s], s += 1) : d += h;
    }
  } catch (e) {
    v = true;
    y = e;
  } finally {
    try {
      if (!f && p["return"] != null) {
        p["return"]();
      }
    } finally {
      if (v) {
        throw y;
      }
    }
  }
  return d;
};
var _ = function _(e) {
  return e ? /^\d+$/.test(e) : !1;
};
var z = function z(e) {
  return e.replace(/\D/g, "");
};
var B = function B(e, t) {
  var r = e.style.display;
  r !== "block" && (e.style.display = "block");
  var n = e.getBoundingClientRect(),
    a = t.getBoundingClientRect(),
    o = a.top - n.top,
    i = n.bottom - a.bottom;
  o >= 0 && i >= 0 || (Math.abs(o) < Math.abs(i) ? e.scrollTop += o : e.scrollTop -= i), e.style.display = r;
};
var F = function F(e) {
  var t = e.name,
    r = e.iso2,
    n = e.dialCode,
    a = e.format,
    o = e.priority,
    i = e.areaCodes,
    u = [t, r, n, a, o, i];
  for (var l = 0; l < u.length; l += 1) {
    if (l === 0) continue;
    var c = u[l - 1],
      d = u[l];
    if (c === void 0 && d !== void 0) {
      var s = JSON.stringify(u, function (e, t) {
        return t === void 0 ? "__undefined" : t;
      }).replace(/"__undefined"/g, "undefined");
      throw new Error("[react-international-phone] invalid country values passed to buildCountryData. Check ".concat(c, " in: ").concat(s));
    }
  }
  return u.filter(function (e) {
    return e !== void 0;
  });
};
var V = require("react");
var R = function R(e) {
  var t = e.phone,
    r = e.dialCode,
    n = e.prefix,
    a = n === void 0 ? "+" : n,
    o = e.charAfterDialCode,
    i = o === void 0 ? " " : o;
  if (!t || !r) return t;
  var u = t;
  return u.startsWith(a) && (u = u.replace(a, "")), u.startsWith(r) ? (u = u.replace(r, ""), u.startsWith(i) && (u = u.replace(i, "")), u) : t;
};
var G = function G(e, t) {
  var r = t.disableDialCodeAndPrefix ? !1 : t.forceDialCode,
    n = t.disableDialCodeAndPrefix ? !1 : t.insertDialCodeOnEmpty,
    a = e,
    o = function o(e) {
      return t.trimNonDigitsEnd ? e.trim() : e;
    };
  if (!a) return n && !a.length || r ? o("".concat(t.prefix).concat(t.dialCode).concat(t.charAfterDialCode)) : o(a);
  if (a = z(a), a === t.dialCode && !t.disableDialCodeAndPrefix) return o("".concat(t.prefix).concat(t.dialCode).concat(t.charAfterDialCode));
  if (t.dialCode.startsWith(a) && !t.disableDialCodeAndPrefix) return o(r ? "".concat(t.prefix).concat(t.dialCode).concat(t.charAfterDialCode) : "".concat(t.prefix).concat(a));
  if (!a.startsWith(t.dialCode) && !t.disableDialCodeAndPrefix) {
    if (r) return o("".concat(t.prefix).concat(t.dialCode).concat(t.charAfterDialCode));
    if (a.length < t.dialCode.length) return o("".concat(t.prefix).concat(a));
  }
  var i = function i() {
      var e = t.dialCode.length,
        r = a.slice(0, e),
        n = a.slice(e);
      return {
        phoneLeftSide: r,
        phoneRightSide: n
      };
    },
    u = i(),
    l = u.phoneLeftSide,
    c = u.phoneRightSide;
  return l = "".concat(t.prefix).concat(l).concat(t.charAfterDialCode), c = L({
    value: c,
    mask: t.mask,
    maskSymbol: t.maskChar,
    trimNonMaskCharsLeftover: t.trimNonDigitsEnd || t.disableDialCodeAndPrefix && c.length === 0
  }), t.disableDialCodeAndPrefix && (l = ""), o("".concat(l).concat(c));
};
var T = function T(e) {
  var t = e.phoneBeforeInput,
    r = e.phoneAfterInput,
    n = e.phoneAfterFormatted,
    a = e.cursorPositionAfterInput,
    o = e.leftOffset,
    i = o === void 0 ? 0 : o,
    u = e.deletion;
  if (a < i) return i;
  if (!t) return n.length;
  var l = null;
  for (var c = a - 1; c >= 0; c -= 1) if (_(r[c])) {
    l = c;
    break;
  }
  if (l === null) {
    for (var d = 0; d < r.length; d += 1) if (_(n[d])) return d;
    return r.length;
  }
  var s = 0;
  for (var f = 0; f < l; f += 1) _(r[f]) && (s += 1);
  var v = 0,
    y = 0;
  for (var p = 0; p < n.length && (v += 1, _(n[p]) && (y += 1), !(y >= s + 1)); p += 1);
  if (u !== "backward") for (; !_(n[v]) && v < n.length;) v += 1;
  return v;
};
var q = function q(e) {
  var t = e.phone,
    r = e.prefix;
  return t ? "".concat(r).concat(z(t)) : "";
};
function K(e) {
  var t = e.value,
    r = e.country,
    n = e.insertDialCodeOnEmpty,
    a = e.trimNonDigitsEnd,
    o = e.countries,
    i = e.prefix,
    u = e.charAfterDialCode,
    l = e.forceDialCode,
    c = e.disableDialCodeAndPrefix,
    d = e.defaultMask,
    s = e.countryGuessingEnabled,
    f = e.disableFormatting;
  var v = t;
  c && (v = v.startsWith("".concat(i)) ? v : "".concat(i).concat(r.dialCode).concat(v));
  var y;
  var p = s ? ei({
      phone: v,
      countries: o,
      currentCountryIso2: r === null || r === void 0 ? void 0 : r.iso2
    }) : void 0,
    m = (y = p === null || p === void 0 ? void 0 : p.country) !== null && y !== void 0 ? y : r,
    h = G(v, {
      prefix: i,
      mask: er({
        phone: v,
        country: m,
        defaultMask: d,
        disableFormatting: f
      }),
      maskChar: X,
      dialCode: m.dialCode,
      trimNonDigitsEnd: a,
      charAfterDialCode: u,
      forceDialCode: l,
      insertDialCodeOnEmpty: n,
      disableDialCodeAndPrefix: c
    }),
    b = s && !(p === null || p === void 0 ? void 0 : p.fullDialCodeMatch) ? r : m;
  return {
    phone: q({
      phone: c ? "".concat(b.dialCode).concat(h) : h,
      prefix: i
    }),
    inputValue: h,
    country: b
  };
}
var W = function W(e) {
    var t;
    if ((t = e === null || e === void 0 ? void 0 : e.toLocaleLowerCase().includes("delete")) !== null && t !== void 0 ? t : !1) return (e === null || e === void 0 ? void 0 : e.toLocaleLowerCase().includes("forward")) ? "forward" : "backward";
  },
  U = function U(e, t) {
    var r = t.country,
      n = t.insertDialCodeOnEmpty,
      a = t.phoneBeforeInput,
      o = t.prefix,
      i = t.charAfterDialCode,
      u = t.forceDialCode,
      l = t.disableDialCodeAndPrefix,
      c = t.countryGuessingEnabled,
      d = t.defaultMask,
      s = t.disableFormatting,
      f = t.countries;
    var v;
    var y = e.nativeEvent,
      p = y.inputType,
      m = W(p),
      h = !!(p === null || p === void 0 ? void 0 : p.startsWith("insertFrom")),
      b = p === "insertText",
      C = (y === null || y === void 0 ? void 0 : y.data) || void 0,
      g = e.target.value,
      w = (v = e.target.selectionStart) !== null && v !== void 0 ? v : 0;
    if (p === null || p === void 0 ? void 0 : p.includes("history")) return {
      inputValue: a,
      phone: q({
        phone: a,
        prefix: o
      }),
      cursorPosition: a.length,
      country: r
    };
    var D;
    if (b && !_(C) && g !== o) return {
      inputValue: a,
      phone: q({
        phone: l ? "".concat(r.dialCode).concat(a) : a,
        prefix: o
      }),
      cursorPosition: w - ((D = C === null || C === void 0 ? void 0 : C.length) !== null && D !== void 0 ? D : 0),
      country: r
    };
    if (u && !g.startsWith("".concat(o).concat(r.dialCode)) && !h) {
      var P = g ? a : "".concat(o).concat(r.dialCode).concat(i);
      return {
        inputValue: P,
        phone: q({
          phone: P,
          prefix: o
        }),
        cursorPosition: o.length + r.dialCode.length + i.length,
        country: r
      };
    }
    var S = K({
        value: g,
        country: r,
        trimNonDigitsEnd: m === "backward",
        insertDialCodeOnEmpty: n,
        countryGuessingEnabled: c,
        countries: f,
        prefix: o,
        charAfterDialCode: i,
        forceDialCode: u,
        disableDialCodeAndPrefix: l,
        disableFormatting: s,
        defaultMask: d
      }),
      k = S.phone,
      x = S.inputValue,
      N = S.country,
      A = T({
        cursorPositionAfterInput: w,
        phoneBeforeInput: a,
        phoneAfterInput: g,
        phoneAfterFormatted: x,
        leftOffset: u ? o.length + r.dialCode.length + i.length : 0,
        deletion: m
      });
    return {
      phone: k,
      inputValue: x,
      cursorPosition: A,
      country: N
    };
  };
var H = require("react");
var J = function J(e, t) {
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  var a = true,
    o = false,
    i = undefined;
  try {
    for (var u = r[Symbol.iterator](), l; !(a = (l = u.next()).done); a = true) {
      var c = l.value;
      if (e[c] !== t[c]) return !1;
    }
  } catch (e) {
    o = true;
    i = e;
  } finally {
    try {
      if (!a && u["return"] != null) {
        u["return"]();
      }
    } finally {
      if (o) {
        throw i;
      }
    }
  }
  return !0;
};
var Z = require("react"),
  $ = function $() {
    var e = (0, Z.useRef)(),
      t = (0, Z.useRef)(Date.now());
    return {
      check: function check() {
        var r = Date.now(),
          n = e.current ? r - t.current : void 0;
        return e.current = t.current, t.current = r, n;
      }
    };
  };
var Q = {
  size: 20,
  overrideLastItemDebounceMS: -1
};
function Y(e, t) {
  var r = l({}, Q, t),
    n = r.size,
    a = r.overrideLastItemDebounceMS,
    o = r.onChange,
    i = v((0, H.useState)(e), 2),
    u = i[0],
    c = i[1],
    d = v((0, H.useState)([u]), 2),
    s = d[0],
    f = d[1],
    p = v((0, H.useState)(0), 2),
    m = p[0],
    h = p[1],
    b = $();
  return [u, function (e, t) {
    if (_typeof(e) == "object" && _typeof(u) == "object" && J(e, u) || e === u) return;
    var r = a > 0,
      i = b.check(),
      l = r && i !== void 0 ? i > a : !0;
    if ((t === null || t === void 0 ? void 0 : t.overrideLastItem) !== void 0 ? t.overrideLastItem : !l) f(function (t) {
      return y(t.slice(0, m)).concat([e]);
    });else {
      var d = s.length >= n;
      f(function (t) {
        return y(t.slice(d ? 1 : 0, m + 1)).concat([e]);
      }), d || h(function (e) {
        return e + 1;
      });
    }
    c(e), o === null || o === void 0 ? void 0 : o(e);
  }, function () {
    if (m <= 0) return {
      success: !1
    };
    var e = s[m - 1];
    return c(e), h(function (e) {
      return e - 1;
    }), o === null || o === void 0 ? void 0 : o(e), {
      success: !0,
      value: e
    };
  }, function () {
    if (m + 1 >= s.length) return {
      success: !1
    };
    var e = s[m + 1];
    return c(e), h(function (e) {
      return e + 1;
    }), o === null || o === void 0 ? void 0 : o(e), {
      success: !0,
      value: e
    };
  }];
}
var X = ".",
  ee = {
    defaultCountry: "us",
    value: "",
    prefix: "+",
    defaultMask: "............",
    charAfterDialCode: " ",
    historySaveDebounceMS: 200,
    disableCountryGuess: !1,
    disableDialCodePrefill: !1,
    forceDialCode: !1,
    disableDialCodeAndPrefix: !1,
    disableFormatting: !1,
    countries: E
  },
  et = function et(e) {
    var t = e.defaultCountry,
      r = t === void 0 ? ee.defaultCountry : t,
      n = e.value,
      a = n === void 0 ? ee.value : n,
      o = e.countries,
      i = o === void 0 ? ee.countries : o,
      u = e.prefix,
      c = u === void 0 ? ee.prefix : u,
      d = e.defaultMask,
      s = d === void 0 ? ee.defaultMask : d,
      f = e.charAfterDialCode,
      y = f === void 0 ? ee.charAfterDialCode : f,
      m = e.historySaveDebounceMS,
      h = m === void 0 ? ee.historySaveDebounceMS : m,
      b = e.disableCountryGuess,
      C = b === void 0 ? ee.disableCountryGuess : b,
      g = e.disableDialCodePrefill,
      w = g === void 0 ? ee.disableDialCodePrefill : g,
      D = e.forceDialCode,
      P = D === void 0 ? ee.forceDialCode : D,
      S = e.disableDialCodeAndPrefix,
      k = S === void 0 ? ee.disableDialCodeAndPrefix : S,
      x = e.disableFormatting,
      N = x === void 0 ? ee.disableFormatting : x,
      A = e.onChange,
      E = e.inputRef;
    var M = {
        countries: i,
        prefix: c,
        charAfterDialCode: y,
        forceDialCode: k ? !1 : P,
        disableDialCodeAndPrefix: k,
        defaultMask: s,
        countryGuessingEnabled: !C,
        disableFormatting: N
      },
      O = (0, V.useRef)(null),
      j = E || O,
      I = function I(e) {
        Promise.resolve().then(function () {
          var t, r;
          (typeof window === "undefined" ? "undefined" : p(window)) > "u" || j.current !== ((t = document) === null || t === void 0 ? void 0 : t.activeElement) || ((r = j.current) === null || r === void 0 ? void 0 : r.setSelectionRange(e, e));
        });
      },
      L = v(Y(function () {
        var e = eo({
          value: r,
          field: "iso2",
          countries: i
        });
        e || console.error('[react-international-phone]: can not find a country with "'.concat(r, '" iso2 code'));
        var t = e || eo({
            value: "us",
            field: "iso2",
            countries: i
          }),
          n = K(l({
            value: a,
            country: t,
            insertDialCodeOnEmpty: !w
          }, M)),
          o = n.phone,
          u = n.inputValue,
          c = n.country;
        return I(u.length), {
          phone: o,
          inputValue: u,
          country: c.iso2
        };
      }, {
        overrideLastItemDebounceMS: h,
        onChange: function onChange(e) {
          var t = e.inputValue,
            r = e.phone,
            n = e.country;
          if (!A) return;
          var a = q(n);
          A({
            phone: r,
            inputValue: t,
            country: a
          });
        }
      }), 4),
      _ = L[0],
      z = _.phone,
      B = _.inputValue,
      F = _.country,
      R = L[1],
      G = L[2],
      T = L[3],
      q = (0, V.useCallback)(function (e) {
        return eo({
          value: e,
          field: "iso2",
          countries: i
        });
      }, [i]),
      W = (0, V.useMemo)(function () {
        return q(F);
      }, [F, q]);
    (0, V.useEffect)(function () {
      var e = j.current;
      if (!e) return;
      var t = function t(e) {
        if (!e.key) return;
        var t = e.ctrlKey,
          r = e.shiftKey,
          n = e.key.toLowerCase() === "z";
        !t || !n || (r ? T() : G());
      };
      return e.addEventListener("keydown", t), function () {
        e.removeEventListener("keydown", t);
      };
    }, [j, G, T]);
    var H = function H(e) {
        e.preventDefault();
        var t = U(e, l({
            country: W,
            phoneBeforeInput: B,
            insertDialCodeOnEmpty: !1
          }, M)),
          r = t.phone,
          n = t.inputValue,
          o = t.country,
          i = t.cursorPosition;
        return R({
          inputValue: n,
          phone: r,
          country: o.iso2
        }), I(i), a;
      },
      J = function J(e) {
        var t = eo({
          value: e,
          field: "iso2",
          countries: i
        });
        if (!t) {
          console.error('[react-international-phone]: can not find a country with "'.concat(e, '" iso2 code'));
          return;
        }
        var r = k ? "" : "".concat(c).concat(t.dialCode).concat(y);
        R({
          inputValue: r,
          phone: "".concat(c).concat(t.dialCode),
          country: t.iso2
        }), Promise.resolve().then(function () {
          var e;
          (e = j.current) === null || e === void 0 ? void 0 : e.focus();
        });
      },
      Z = v((0, V.useState)(!1), 2),
      $ = Z[0],
      Q = Z[1];
    return (0, V.useEffect)(function () {
      if (!$) {
        Q(!0), a !== z && (A === null || A === void 0 ? void 0 : A({
          inputValue: B,
          phone: z,
          country: W
        }));
        return;
      }
      if (a === z) return;
      var e = K(l({
          value: a,
          country: W,
          insertDialCodeOnEmpty: !w
        }, M)),
        t = e.phone,
        r = e.inputValue,
        n = e.country;
      R({
        phone: t,
        inputValue: r,
        country: n.iso2
      });
    }, [a]), {
      phone: z,
      inputValue: B,
      country: W,
      setCountry: J,
      handlePhoneValueChange: H,
      inputRef: j
    };
  };
var er = function er(e) {
  var t = e.phone,
    r = e.country,
    n = e.defaultMask,
    a = n === void 0 ? "............" : n,
    o = e.disableFormatting,
    i = o === void 0 ? !1 : o;
  var u = r.format,
    l = function l(e) {
      return i ? e.replace(new RegExp("[^".concat(X, "]"), "g"), "") : e;
    };
  if (!u) return l(a);
  if (typeof u == "string") return l(u);
  if (!u["default"]) return console.error("[react-international-phone]: default mask for ".concat(r.iso2, " is not provided")), l(a);
  var c = Object.keys(u).find(function (e) {
    if (e === "default") return !1;
    if (!(e.charAt(0) === "/" && e.charAt(e.length - 1) === "/")) return console.error('[react-international-phone]: format regex "'.concat(e, '" for ').concat(r.iso2, " is not valid")), !1;
    var n = new RegExp(e.substring(1, e.length - 1)),
      a = t.replace(r.dialCode, "");
    return n.test(z(a));
  });
  return l(c ? u[c] : u["default"]);
};
var en = function en(e) {
  var t = v(e, 6),
    r = t[0],
    n = t[1],
    a = t[2],
    o = t[3],
    i = t[4],
    u = t[5];
  return {
    name: r,
    iso2: n,
    dialCode: a,
    format: o,
    priority: i,
    areaCodes: u
  };
};
var ea = function ea(e) {
    return 'Field "'.concat(e, '" is not supported');
  },
  eo = function eo(e) {
    var t = e.field,
      r = e.value,
      n = e.countries,
      a = n === void 0 ? E : n;
    if (["priority"].includes(t)) throw new Error(ea(t));
    var o = a.find(function (e) {
      var n = en(e);
      return r === n[t];
    });
    if (o) return en(o);
  };
var ei = function ei(e) {
  var t = e.phone,
    r = e.countries,
    n = r === void 0 ? E : r,
    a = e.currentCountryIso2;
  var o = {
    country: void 0,
    fullDialCodeMatch: !1
  };
  if (!t) return o;
  var i = z(t);
  if (!i) return o;
  var u = o,
    l = function l(e) {
      var t = e.country,
        r = e.fullDialCodeMatch;
      var n, a;
      var o, i;
      var l = t.dialCode === ((n = u.country) === null || n === void 0 ? void 0 : n.dialCode),
        c = ((o = t.priority) !== null && o !== void 0 ? o : 0) < ((i = (a = u.country) === null || a === void 0 ? void 0 : a.priority) !== null && i !== void 0 ? i : 0);
      (!l || c) && (u = {
        country: t,
        fullDialCodeMatch: r
      });
    };
  var c = true,
    d = false,
    s = undefined;
  try {
    for (var f = n[Symbol.iterator](), v; !(c = (v = f.next()).done); c = true) {
      var y = v.value;
      var p = en(y),
        m = p.dialCode,
        h = p.areaCodes;
      if (i.startsWith(m)) {
        var b = u.country ? Number(m) >= Number(u.country.dialCode) : !0;
        if (h) {
          var C = i.substring(m.length);
          var g = true,
            w = false,
            D = undefined;
          try {
            for (var P = h[Symbol.iterator](), S; !(g = (S = P.next()).done); g = true) {
              var k = S.value;
              if (C.startsWith(k)) return {
                country: p,
                fullDialCodeMatch: !0
              };
            }
          } catch (e) {
            w = true;
            D = e;
          } finally {
            try {
              if (!g && P["return"] != null) {
                P["return"]();
              }
            } finally {
              if (w) {
                throw D;
              }
            }
          }
        }
        (b || m === i || !u.fullDialCodeMatch) && l({
          country: p,
          fullDialCodeMatch: !0
        });
      }
      u.fullDialCodeMatch || i.length < m.length && m.startsWith(i) && (!u.country || Number(m) <= Number(u.country.dialCode)) && l({
        country: p,
        fullDialCodeMatch: !1
      });
    }
  } catch (e) {
    d = true;
    s = e;
  } finally {
    try {
      if (!c && f["return"] != null) {
        f["return"]();
      }
    } finally {
      if (d) {
        throw s;
      }
    }
  }
  if (a) {
    var x;
    var N = eo({
      value: a,
      field: "iso2",
      countries: n
    });
    if (!N) return u;
    var A = N ? function (e) {
      if (!(e === null || e === void 0 ? void 0 : e.areaCodes)) return !1;
      var t = i.substring(e.dialCode.length);
      return e.areaCodes.some(function (e) {
        return e.startsWith(t);
      });
    }(N) : !1;
    !!u && ((x = u.country) === null || x === void 0 ? void 0 : x.dialCode) === N.dialCode && u.country !== N && u.fullDialCodeMatch && (!N.areaCodes || A) && (u = {
      country: N,
      fullDialCodeMatch: !0
    });
  }
  return u;
};
var eu = k(require("react"));
var el = function el(e, t) {
    var r = parseInt(e, 16);
    return Number(r + t).toString(16);
  },
  ec = "abcdefghijklmnopqrstuvwxyz",
  ed = "1f1e6",
  es = ec.split("").reduce(function (e, t, r) {
    return d(l({}, e), n({}, t, el(ed, r)));
  }, {}),
  ef = function ef(e) {
    return [es[e[0]], es[e[1]]].join("-");
  },
  ev = function ev(e) {
    var t = e.iso2,
      r = e.size,
      n = e.src,
      a = e.protocol,
      o = a === void 0 ? "https" : a,
      i = e.disableLazyLoading,
      u = e.className,
      c = e.style,
      d = s(e, ["iso2", "size", "src", "protocol", "disableLazyLoading", "className", "style"]);
    if (!t) return eu["default"].createElement("img", l({
      className: I({
        addPrefix: ["flag-emoji"],
        rawClassNames: [u]
      }),
      width: r,
      height: r
    }, d));
    var f = function f() {
      if (n) return n;
      var e = ef(t);
      return "".concat(o, "://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/").concat(e, ".svg");
    };
    return eu["default"].createElement("img", l({
      className: I({
        addPrefix: ["flag-emoji"],
        rawClassNames: [u]
      }),
      src: f(),
      width: r,
      height: r,
      draggable: !1,
      "data-country": t,
      loading: i ? void 0 : "lazy",
      style: l({
        width: r,
        height: r
      }, c),
      alt: ""
    }, d));
  };
var ey = k(require("react"));
var ep = 1e3,
  em = function em(e) {
    var t = e.show,
      r = e.dialCodePrefix,
      n = r === void 0 ? "+" : r,
      a = e.selectedCountry,
      o = e.countries,
      i = o === void 0 ? E : o,
      u = e.flags,
      c = e.onSelect,
      d = e.onClose,
      f = s(e, ["show", "dialCodePrefix", "selectedCountry", "countries", "flags", "onSelect", "onClose"]);
    var y = (0, ey.useRef)(null),
      p = (0, ey.useRef)(),
      m = (0, ey.useRef)({
        updatedAt: void 0,
        value: ""
      }),
      h = function h(e) {
        var t = m.current.updatedAt && new Date().getTime() - m.current.updatedAt.getTime() > ep;
        m.current = {
          value: t ? e : "".concat(m.current.value).concat(e),
          updatedAt: new Date()
        };
        var r = i.findIndex(function (e) {
          return en(e).name.toLowerCase().startsWith(m.current.value);
        });
        r !== -1 && w(r);
      },
      b = (0, ey.useCallback)(function (e) {
        return i.findIndex(function (t) {
          return en(t).iso2 === e;
        });
      }, [i]),
      C = v((0, ey.useState)(b(a)), 2),
      g = C[0],
      w = C[1],
      D = function D() {
        p.current !== a && w(b(a));
      },
      P = (0, ey.useCallback)(function (e) {
        w(b(e.iso2)), c === null || c === void 0 ? void 0 : c(e);
      }, [c, b]),
      S = function S(e) {
        var t = i.length - 1,
          r = function r(_r) {
            return e === "prev" ? _r - 1 : e === "next" ? _r + 1 : e === "last" ? t : 0;
          };
        w(function (e) {
          var n = r(e);
          return n < 0 ? 0 : n > t ? t : n;
        });
      },
      k = function k(e) {
        if (e.stopPropagation(), e.key === "Enter") {
          e.preventDefault();
          var t = en(i[g]);
          P(t);
          return;
        }
        if (e.key === "Escape") {
          d === null || d === void 0 ? void 0 : d();
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault(), S("prev");
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault(), S("next");
          return;
        }
        if (e.key === "PageUp") {
          e.preventDefault(), S("first");
          return;
        }
        if (e.key === "PageDown") {
          e.preventDefault(), S("last");
          return;
        }
        e.key === " " && e.preventDefault(), e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && h(e.key.toLocaleLowerCase());
      },
      x = (0, ey.useCallback)(function () {
        if (!y.current || g === void 0) return;
        var e = en(i[g]).iso2;
        if (e === p.current) return;
        var t = y.current.querySelector('[data-country="'.concat(e, '"]'));
        t && (B(y.current, t), p.current = e);
      }, [g, i]);
    return (0, ey.useEffect)(function () {
      x();
    }, [g, x]), (0, ey.useEffect)(function () {
      y.current && (t ? y.current.focus() : D());
    }, [t]), (0, ey.useEffect)(function () {
      D();
    }, [a]), ey["default"].createElement("ul", {
      ref: y,
      role: "listbox",
      className: I({
        addPrefix: ["country-selector-dropdown"],
        rawClassNames: [f.className]
      }),
      style: l({
        display: t ? "block" : "none"
      }, f.style),
      onKeyDown: k,
      onBlur: d,
      tabIndex: -1,
      "aria-activedescendant": "react-international-phone__".concat(en(i[g]).iso2, "-option")
    }, i.map(function (e, t) {
      var r = en(e),
        o = r.iso2 === a,
        i = t === g,
        l = u === null || u === void 0 ? void 0 : u.find(function (e) {
          return e.iso2 === r.iso2;
        });
      return ey["default"].createElement("li", {
        key: r.iso2,
        "data-country": r.iso2,
        role: "option",
        "aria-selected": o,
        "aria-label": "".concat(r.name, " ").concat(n).concat(r.dialCode),
        id: "react-international-phone__".concat(r.iso2, "-option"),
        className: I({
          addPrefix: ["country-selector-dropdown__list-item", o && "country-selector-dropdown__list-item--selected", i && "country-selector-dropdown__list-item--focused"],
          rawClassNames: [f.listItemClassName]
        }),
        onClick: function onClick() {
          return P(r);
        },
        style: f.listItemStyle,
        title: r.name
      }, ey["default"].createElement(ev, {
        iso2: r.iso2,
        src: l === null || l === void 0 ? void 0 : l.src,
        className: I({
          addPrefix: ["country-selector-dropdown__list-item-flag-emoji"],
          rawClassNames: [f.listItemFlagClassName]
        }),
        style: f.listItemFlagStyle
      }), ey["default"].createElement("span", {
        className: I({
          addPrefix: ["country-selector-dropdown__list-item-country-name"],
          rawClassNames: [f.listItemCountryNameClassName]
        }),
        style: f.listItemCountryNameStyle
      }, r.name), ey["default"].createElement("span", {
        className: I({
          addPrefix: ["country-selector-dropdown__list-item-dial-code"],
          rawClassNames: [f.listItemDialCodeClassName]
        }),
        style: f.listItemDialCodeStyle
      }, n, r.dialCode));
    }));
  };
var eh = function eh(e) {
  var t = e.selectedCountry,
    r = e.onSelect,
    n = e.disabled,
    a = e.hideDropdown,
    o = e.countries,
    i = o === void 0 ? E : o,
    u = e.flags,
    c = e.renderButtonWrapper,
    f = s(e, ["selectedCountry", "onSelect", "disabled", "hideDropdown", "countries", "flags", "renderButtonWrapper"]);
  var y = v((0, A.useState)(!1), 2),
    p = y[0],
    m = y[1],
    h = (0, A.useMemo)(function () {
      if (t) return eo({
        value: t,
        field: "iso2",
        countries: i
      });
    }, [i, t]),
    b = (0, A.useRef)(null),
    C = function C(e) {
      e.key && ["ArrowUp", "ArrowDown"].includes(e.key) && (e.preventDefault(), m(!0));
    },
    g = function g() {
      var e;
      var r = {
          title: h === null || h === void 0 ? void 0 : h.name,
          onClick: function onClick() {
            return m(function (e) {
              return !e;
            });
          },
          onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          },
          onKeyDown: C,
          disabled: a || n,
          role: "combobox",
          "aria-label": "Country selector",
          "aria-haspopup": "listbox",
          "aria-expanded": p
        },
        o = A["default"].createElement("div", {
          className: I({
            addPrefix: ["country-selector-button__button-content"],
            rawClassNames: [f.buttonContentWrapperClassName]
          }),
          style: f.buttonContentWrapperStyle
        }, A["default"].createElement(ev, {
          iso2: t,
          src: u === null || u === void 0 ? void 0 : (e = u.find(function (e) {
            return e.iso2 === t;
          })) === null || e === void 0 ? void 0 : e.src,
          className: I({
            addPrefix: ["country-selector-button__flag-emoji", n && "country-selector-button__flag-emoji--disabled"],
            rawClassNames: [f.flagClassName]
          }),
          style: l({
            visibility: t ? "visible" : "hidden"
          }, f.flagStyle)
        }), !a && A["default"].createElement("div", {
          className: I({
            addPrefix: ["country-selector-button__dropdown-arrow", n && "country-selector-button__dropdown-arrow--disabled", p && "country-selector-button__dropdown-arrow--active"],
            rawClassNames: [f.dropdownArrowClassName]
          }),
          style: f.dropdownArrowStyle
        }));
      return c ? c({
        children: o,
        rootProps: r
      }) : A["default"].createElement("button", d(l({}, r), {
        type: "button",
        className: I({
          addPrefix: ["country-selector-button", p && "country-selector-button--active", n && "country-selector-button--disabled", a && "country-selector-button--hide-dropdown"],
          rawClassNames: [f.buttonClassName]
        }),
        "data-country": t,
        style: f.buttonStyle
      }), o);
    };
  return A["default"].createElement("div", {
    className: I({
      addPrefix: ["country-selector"],
      rawClassNames: [f.className]
    }),
    style: f.style,
    ref: b
  }, g(), A["default"].createElement(em, l({
    show: p,
    countries: i,
    flags: u,
    onSelect: function onSelect(e) {
      m(!1), r === null || r === void 0 ? void 0 : r(e);
    },
    selectedCountry: t,
    onClose: function onClose() {
      m(!1);
    }
  }, f.dropdownStyleProps)));
};
var eb = k(require("react"));
var eC = function eC(e) {
  var t = e.dialCode,
    r = e.prefix,
    n = e.disabled,
    a = e.style,
    o = e.className;
  return eb["default"].createElement("div", {
    className: I({
      addPrefix: ["dial-code-preview", n && "dial-code-preview--disabled"],
      rawClassNames: [o]
    }),
    style: a
  }, "".concat(r).concat(t));
};
var eg = k(require("react"));
var ew = (0, eg.forwardRef)(function (e, t) {
  var r = e.value,
    n = e.onChange,
    a = e.countries,
    o = a === void 0 ? E : a,
    i = e.hideDropdown,
    u = e.showDisabledDialCodeAndPrefix,
    c = e.flags,
    f = e.style,
    v = e.className,
    y = e.inputStyle,
    p = e.inputClassName,
    m = e.countrySelectorStyleProps,
    h = e.dialCodePreviewStyleProps,
    b = e.inputProps,
    C = e.placeholder,
    g = e.disabled,
    w = e.name,
    D = e.onFocus,
    P = e.onBlur,
    S = e.required,
    k = e.autoFocus,
    x = s(e, ["value", "onChange", "countries", "hideDropdown", "showDisabledDialCodeAndPrefix", "flags", "style", "className", "inputStyle", "inputClassName", "countrySelectorStyleProps", "dialCodePreviewStyleProps", "inputProps", "placeholder", "disabled", "name", "onFocus", "onBlur", "required", "autoFocus"]);
  var N = et(d(l({
      value: r,
      countries: o
    }, x), {
      onChange: function onChange(e) {
        n === null || n === void 0 ? void 0 : n(e.phone, {
          country: e.country,
          inputValue: e.inputValue
        });
      }
    })),
    A = N.phone,
    M = N.inputValue,
    O = N.inputRef,
    j = N.country,
    L = N.setCountry,
    _ = N.handlePhoneValueChange,
    z = x.disableDialCodeAndPrefix && u && (j === null || j === void 0 ? void 0 : j.dialCode);
  var B;
  return (0, eg.useImperativeHandle)(t, function () {
    return O.current ? Object.assign(O.current, {
      setCountry: L,
      state: {
        phone: A,
        inputValue: M,
        country: j
      }
    }) : null;
  }, [O, L, A, M, j]), eg["default"].createElement("div", {
    ref: t,
    className: I({
      addPrefix: ["input-container"],
      rawClassNames: [v]
    }),
    style: f
  }, eg["default"].createElement(eh, l({
    onSelect: function onSelect(e) {
      return L(e.iso2);
    },
    flags: c,
    selectedCountry: j.iso2,
    countries: o,
    disabled: g,
    hideDropdown: i
  }, m)), z && eg["default"].createElement(eC, l({
    dialCode: j.dialCode,
    prefix: (B = x.prefix) !== null && B !== void 0 ? B : "+",
    disabled: g
  }, h)), eg["default"].createElement("input", l({
    onChange: _,
    value: M,
    type: "tel",
    ref: O,
    className: I({
      addPrefix: ["input", g && "input--disabled"],
      rawClassNames: [p]
    }),
    placeholder: C,
    disabled: g,
    style: y,
    name: w,
    onFocus: D,
    onBlur: P,
    autoFocus: k,
    required: S
  }, b)));
});
0 && (module.exports = {
  CountrySelector: CountrySelector,
  CountrySelectorDropdown: CountrySelectorDropdown,
  DialCodePreview: DialCodePreview,
  FlagImage: FlagImage,
  PhoneInput: PhoneInput,
  buildCountryData: buildCountryData,
  defaultCountries: defaultCountries,
  getActiveFormattingMask: getActiveFormattingMask,
  getCountry: getCountry,
  guessCountryByPartialPhoneNumber: guessCountryByPartialPhoneNumber,
  parseCountry: parseCountry,
  removeDialCode: removeDialCode,
  usePhoneInput: usePhoneInput
});

},{"react":5}],3:[function(require,module,exports){
(function (process){(function (){
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== "production") {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var ReactVersion = '18.2.0';

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */
var ReactCurrentBatchConfig = {
  transition: null
};

var ReactCurrentActQueue = {
  current: null,
  // Used to reproduce behavior of `batchedUpdates` in legacy mode.
  isBatchingLegacy: false,
  didScheduleLegacyUpdate: false
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactDebugCurrentFrame = {};
var currentExtraStackFrame = null;
function setExtraStackFrame(stack) {
  {
    currentExtraStackFrame = stack;
  }
}

{
  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
    {
      currentExtraStackFrame = stack;
    }
  }; // Stack implementation injected by the current renderer.


  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = ''; // Add an extra top frame while an element is being validated

    if (currentExtraStackFrame) {
      stack += currentExtraStackFrame;
    } // Delegate to the injected renderer-specific implementation


    var impl = ReactDebugCurrentFrame.getCurrentStack;

    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner
};

{
  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
  ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
}

// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.

function warn(format) {
  {
    {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      printWarning('warn', format, args);
    }
  }
}
function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;

    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }

    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
/**
 * This is the abstract API for an update queue.
 */


var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var assign = Object.assign;

var emptyObject = {};

{
  Object.freeze(emptyObject);
}
/**
 * Base class helpers for the updating state of a component.
 */


function Component(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
  // renderer.

  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */

Component.prototype.setState = function (partialState, callback) {
  if (typeof partialState !== 'object' && typeof partialState !== 'function' && partialState != null) {
    throw new Error('setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.');
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */


Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */


{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };

  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

        return undefined;
      }
    });
  };

  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;
/**
 * Convenience component with default shallow equality check for sCU.
 */

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };

  {
    Object.seal(refObject);
  }

  return refObject;
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    }
  };

  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    }
  };

  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

function warnIfStringRefCannotBeAutoConverted(config) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */

function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;

      {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */

function cloneElement(element, config, children) {
  if (element === null || element === undefined) {
    throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
  }

  var propName; // Original props are copied

  var props = assign({}, element.props); // Reserved names are extracted

  var key = element.key;
  var ref = element.ref; // Self is preserved since the owner is preserved.

  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.

  var source = element._source; // Owner will be preserved, unless ref is overridden

  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    } // Remaining properties override existing props


    var defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';
/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = key.replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return '$' + escapedString;
}
/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */


var didWarnAboutMaps = false;
var userProvidedKeyEscapeRegex = /\/+/g;

function escapeUserProvidedKey(text) {
  return text.replace(userProvidedKeyEscapeRegex, '$&/');
}
/**
 * Generate a key string that identifies a element within a set.
 *
 * @param {*} element A element that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */


function getElementKey(element, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof element === 'object' && element !== null && element.key != null) {
    // Explicit key
    {
      checkKeyStringCoercion(element.key);
    }

    return escape('' + element.key);
  } // Implicit key determined by the index in the set


  return index.toString(36);
}

function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;

      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }

    }
  }

  if (invokeCallback) {
    var _child = children;
    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows:

    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

    if (isArray(mappedChild)) {
      var escapedChildKey = '';

      if (childKey != null) {
        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
      }

      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        {
          // The `if` statement here prevents auto-disabling of the safe
          // coercion ESLint rule, so we must manually disable it below.
          // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
            checkKeyStringCoercion(mappedChild.key);
          }
        }

        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
        // eslint-disable-next-line react-internal/safe-string-coercion
        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
      }

      array.push(mappedChild);
    }

    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.

  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getElementKey(child, i);
      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
    }
  } else {
    var iteratorFn = getIteratorFn(children);

    if (typeof iteratorFn === 'function') {
      var iterableChildren = children;

      {
        // Warn about using Maps as children
        if (iteratorFn === iterableChildren.entries) {
          if (!didWarnAboutMaps) {
            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
          }

          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(iterableChildren);
      var step;
      var ii = 0;

      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getElementKey(child, ii++);
        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
      }
    } else if (type === 'object') {
      // eslint-disable-next-line react-internal/safe-string-coercion
      var childrenString = String(children);
      throw new Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
    }
  }

  return subtreeCount;
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var result = [];
  var count = 0;
  mapIntoArray(children, result, '', '', function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */


function countChildren(children) {
  var n = 0;
  mapChildren(children, function () {
    n++; // Don't return anything
  });
  return n;
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  mapChildren(children, function () {
    forEachFunc.apply(this, arguments); // Don't return anything.
  }, forEachContext);
}
/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */


function toArray(children) {
  return mapChildren(children, function (child) {
    return child;
  }) || [];
}
/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */


function onlyChild(children) {
  if (!isValidElement(children)) {
    throw new Error('React.Children.only expected to receive a single React element child.');
  }

  return children;
}

function createContext(defaultValue) {
  // TODO: Second argument used to be an optional `calculateChangedBits`
  // function. Warn to reserve for future use?
  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null,
    // Add these to use same hidden class in VM as ServerContext
    _defaultValue: null,
    _globalName: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;
  var hasWarnedAboutDisplayNameOnConsumer = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context
    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;

            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;

            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }

          return context.Consumer;
        }
      },
      displayName: {
        get: function () {
          return context.displayName;
        },
        set: function (displayName) {
          if (!hasWarnedAboutDisplayNameOnConsumer) {
            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);

            hasWarnedAboutDisplayNameOnConsumer = true;
          }
        }
      }
    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

var Uninitialized = -1;
var Pending = 0;
var Resolved = 1;
var Rejected = 2;

function lazyInitializer(payload) {
  if (payload._status === Uninitialized) {
    var ctor = payload._result;
    var thenable = ctor(); // Transition to the next state.
    // This might throw either because it's missing or throws. If so, we treat it
    // as still uninitialized and try again next time. Which is the same as what
    // happens if the ctor or any wrappers processing the ctor throws. This might
    // end up fixing it if the resolution was a concurrency bug.

    thenable.then(function (moduleObject) {
      if (payload._status === Pending || payload._status === Uninitialized) {
        // Transition to the next state.
        var resolved = payload;
        resolved._status = Resolved;
        resolved._result = moduleObject;
      }
    }, function (error) {
      if (payload._status === Pending || payload._status === Uninitialized) {
        // Transition to the next state.
        var rejected = payload;
        rejected._status = Rejected;
        rejected._result = error;
      }
    });

    if (payload._status === Uninitialized) {
      // In case, we're still uninitialized, then we're waiting for the thenable
      // to resolve. Set it as pending in the meantime.
      var pending = payload;
      pending._status = Pending;
      pending._result = thenable;
    }
  }

  if (payload._status === Resolved) {
    var moduleObject = payload._result;

    {
      if (moduleObject === undefined) {
        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))\n\n" + 'Did you accidentally put curly braces around the import?', moduleObject);
      }
    }

    {
      if (!('default' in moduleObject)) {
        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
      }
    }

    return moduleObject.default;
  } else {
    throw payload._result;
  }
}

function lazy(ctor) {
  var payload = {
    // We use these fields to store the result.
    _status: Uninitialized,
    _result: ctor
  };
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: payload,
    _init: lazyInitializer
  };

  {
    // In production, this would just set it on the object.
    var defaultProps;
    var propTypes; // $FlowFixMe

    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          defaultProps = newDefaultProps; // Match production behavior more closely:
          // $FlowFixMe

          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          propTypes = newPropTypes; // Match production behavior more closely:
          // $FlowFixMe

          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      if (render.length !== 0 && render.length !== 2) {
        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
      }
    }

    if (render != null) {
      if (render.defaultProps != null || render.propTypes != null) {
        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
      }
    }
  }

  var elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };

  {
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name; // The inner component shouldn't inherit this display name in most cases,
        // because the component may be used elsewhere.
        // But it's nice for anonymous functions to inherit the name,
        // so that our component-stack generation logic will display their frames.
        // An anonymous function generally suggests a pattern like:
        //   React.forwardRef((props, ref) => {...});
        // This kind of inner function is not used elsewhere so the side effect is okay.

        if (!render.name && !render.displayName) {
          render.displayName = name;
        }
      }
    });
  }

  return elementType;
}

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }

  var elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };

  {
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name; // The inner component shouldn't inherit this display name in most cases,
        // because the component may be used elsewhere.
        // But it's nice for anonymous functions to inherit the name,
        // so that our component-stack generation logic will display their frames.
        // An anonymous function generally suggests a pattern like:
        //   React.memo((props) => {...});
        // This kind of inner function is not used elsewhere so the side effect is okay.

        if (!type.name && !type.displayName) {
          type.displayName = name;
        }
      }
    });
  }

  return elementType;
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;

  {
    if (dispatcher === null) {
      error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
    }
  } // Will result in a null access error if accessed outside render phase. We
  // intentionally don't throw our own error because this is in a hot path.
  // Also helps ensure this is inlined.


  return dispatcher;
}
function useContext(Context) {
  var dispatcher = resolveDispatcher();

  {
    // TODO: add a more generic warning for invalid values.
    if (Context._context !== undefined) {
      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.

      if (realContext.Consumer === Context) {
        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }

  return dispatcher.useContext(Context);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
function useInsertionEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useInsertionEffect(create, deps);
}
function useLayoutEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}
function useCallback(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
function useMemo(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
function useImperativeHandle(ref, create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}
function useTransition() {
  var dispatcher = resolveDispatcher();
  return dispatcher.useTransition();
}
function useDeferredValue(value) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useDeferredValue(value);
}
function useId() {
  var dispatcher = resolveDispatcher();
  return dispatcher.useId();
}
function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher$1.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher$1.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var loggedTypeFailures = {};
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      setExtraStackFrame(stack);
    } else {
      setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentNameFromType(ReactCurrentOwner.current.type);

    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }

  return '';
}

function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }

  return '';
}

function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }

  return '';
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }

  return info;
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }

  element._store.validated = true;
  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }

  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.

  var childOwner = '';

  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
  }

  {
    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }

  if (isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];

      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);

    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;

        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.

  if (!validType) {
    var info = '';

    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString;

    if (type === null) {
      typeString = 'null';
    } else if (isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    {
      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
  }

  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.

  if (element == null) {
    return element;
  } // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)


  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}
var didWarnAboutDeprecatedCreateFactory = false;
function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;

  {
    if (!didWarnAboutDeprecatedCreateFactory) {
      didWarnAboutDeprecatedCreateFactory = true;

      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
    } // Legacy hook: remove it


    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}
function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);

  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }

  validatePropTypes(newElement);
  return newElement;
}

function startTransition(scope, options) {
  var prevTransition = ReactCurrentBatchConfig.transition;
  ReactCurrentBatchConfig.transition = {};
  var currentTransition = ReactCurrentBatchConfig.transition;

  {
    ReactCurrentBatchConfig.transition._updatedFibers = new Set();
  }

  try {
    scope();
  } finally {
    ReactCurrentBatchConfig.transition = prevTransition;

    {
      if (prevTransition === null && currentTransition._updatedFibers) {
        var updatedFibersCount = currentTransition._updatedFibers.size;

        if (updatedFibersCount > 10) {
          warn('Detected a large number of updates inside startTransition. ' + 'If this is due to a subscription please re-write it to use React provided hooks. ' + 'Otherwise concurrent mode guarantees are off the table.');
        }

        currentTransition._updatedFibers.clear();
      }
    }
  }
}

var didWarnAboutMessageChannel = false;
var enqueueTaskImpl = null;
function enqueueTask(task) {
  if (enqueueTaskImpl === null) {
    try {
      // read require off the module object to get around the bundlers.
      // we don't want them to detect a require and bundle a Node polyfill.
      var requireString = ('require' + Math.random()).slice(0, 7);
      var nodeRequire = module && module[requireString]; // assuming we're in node, let's try to get node's
      // version of setImmediate, bypassing fake timers if any.

      enqueueTaskImpl = nodeRequire.call(module, 'timers').setImmediate;
    } catch (_err) {
      // we're in a browser
      // we can't use regular timers because they may still be faked
      // so we try MessageChannel+postMessage instead
      enqueueTaskImpl = function (callback) {
        {
          if (didWarnAboutMessageChannel === false) {
            didWarnAboutMessageChannel = true;

            if (typeof MessageChannel === 'undefined') {
              error('This browser does not have a MessageChannel implementation, ' + 'so enqueuing tasks via await act(async () => ...) will fail. ' + 'Please file an issue at https://github.com/facebook/react/issues ' + 'if you encounter this warning.');
            }
          }
        }

        var channel = new MessageChannel();
        channel.port1.onmessage = callback;
        channel.port2.postMessage(undefined);
      };
    }
  }

  return enqueueTaskImpl(task);
}

var actScopeDepth = 0;
var didWarnNoAwaitAct = false;
function act(callback) {
  {
    // `act` calls can be nested, so we track the depth. This represents the
    // number of `act` scopes on the stack.
    var prevActScopeDepth = actScopeDepth;
    actScopeDepth++;

    if (ReactCurrentActQueue.current === null) {
      // This is the outermost `act` scope. Initialize the queue. The reconciler
      // will detect the queue and use it instead of Scheduler.
      ReactCurrentActQueue.current = [];
    }

    var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
    var result;

    try {
      // Used to reproduce behavior of `batchedUpdates` in legacy mode. Only
      // set to `true` while the given callback is executed, not for updates
      // triggered during an async event, because this is how the legacy
      // implementation of `act` behaved.
      ReactCurrentActQueue.isBatchingLegacy = true;
      result = callback(); // Replicate behavior of original `act` implementation in legacy mode,
      // which flushed updates immediately after the scope function exits, even
      // if it's an async function.

      if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
        var queue = ReactCurrentActQueue.current;

        if (queue !== null) {
          ReactCurrentActQueue.didScheduleLegacyUpdate = false;
          flushActQueue(queue);
        }
      }
    } catch (error) {
      popActScope(prevActScopeDepth);
      throw error;
    } finally {
      ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
    }

    if (result !== null && typeof result === 'object' && typeof result.then === 'function') {
      var thenableResult = result; // The callback is an async function (i.e. returned a promise). Wait
      // for it to resolve before exiting the current scope.

      var wasAwaited = false;
      var thenable = {
        then: function (resolve, reject) {
          wasAwaited = true;
          thenableResult.then(function (returnValue) {
            popActScope(prevActScopeDepth);

            if (actScopeDepth === 0) {
              // We've exited the outermost act scope. Recursively flush the
              // queue until there's no remaining work.
              recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            } else {
              resolve(returnValue);
            }
          }, function (error) {
            // The callback threw an error.
            popActScope(prevActScopeDepth);
            reject(error);
          });
        }
      };

      {
        if (!didWarnNoAwaitAct && typeof Promise !== 'undefined') {
          // eslint-disable-next-line no-undef
          Promise.resolve().then(function () {}).then(function () {
            if (!wasAwaited) {
              didWarnNoAwaitAct = true;

              error('You called act(async () => ...) without await. ' + 'This could lead to unexpected testing behaviour, ' + 'interleaving multiple act calls and mixing their ' + 'scopes. ' + 'You should - await act(async () => ...);');
            }
          });
        }
      }

      return thenable;
    } else {
      var returnValue = result; // The callback is not an async function. Exit the current scope
      // immediately, without awaiting.

      popActScope(prevActScopeDepth);

      if (actScopeDepth === 0) {
        // Exiting the outermost act scope. Flush the queue.
        var _queue = ReactCurrentActQueue.current;

        if (_queue !== null) {
          flushActQueue(_queue);
          ReactCurrentActQueue.current = null;
        } // Return a thenable. If the user awaits it, we'll flush again in
        // case additional work was scheduled by a microtask.


        var _thenable = {
          then: function (resolve, reject) {
            // Confirm we haven't re-entered another `act` scope, in case
            // the user does something weird like await the thenable
            // multiple times.
            if (ReactCurrentActQueue.current === null) {
              // Recursively flush the queue until there's no remaining work.
              ReactCurrentActQueue.current = [];
              recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            } else {
              resolve(returnValue);
            }
          }
        };
        return _thenable;
      } else {
        // Since we're inside a nested `act` scope, the returned thenable
        // immediately resolves. The outer scope will flush the queue.
        var _thenable2 = {
          then: function (resolve, reject) {
            resolve(returnValue);
          }
        };
        return _thenable2;
      }
    }
  }
}

function popActScope(prevActScopeDepth) {
  {
    if (prevActScopeDepth !== actScopeDepth - 1) {
      error('You seem to have overlapping act() calls, this is not supported. ' + 'Be sure to await previous act() calls before making a new one. ');
    }

    actScopeDepth = prevActScopeDepth;
  }
}

function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
  {
    var queue = ReactCurrentActQueue.current;

    if (queue !== null) {
      try {
        flushActQueue(queue);
        enqueueTask(function () {
          if (queue.length === 0) {
            // No additional work was scheduled. Finish.
            ReactCurrentActQueue.current = null;
            resolve(returnValue);
          } else {
            // Keep flushing work until there's none left.
            recursivelyFlushAsyncActWork(returnValue, resolve, reject);
          }
        });
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(returnValue);
    }
  }
}

var isFlushing = false;

function flushActQueue(queue) {
  {
    if (!isFlushing) {
      // Prevent re-entrance.
      isFlushing = true;
      var i = 0;

      try {
        for (; i < queue.length; i++) {
          var callback = queue[i];

          do {
            callback = callback(true);
          } while (callback !== null);
        }

        queue.length = 0;
      } catch (error) {
        // If something throws, leave the remaining callbacks on the queue.
        queue = queue.slice(i + 1);
        throw error;
      } finally {
        isFlushing = false;
      }
    }
  }
}

var createElement$1 =  createElementWithValidation ;
var cloneElement$1 =  cloneElementWithValidation ;
var createFactory =  createFactoryWithValidation ;
var Children = {
  map: mapChildren,
  forEach: forEachChildren,
  count: countChildren,
  toArray: toArray,
  only: onlyChild
};

exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.startTransition = startTransition;
exports.unstable_act = act;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useDeferredValue = useDeferredValue;
exports.useEffect = useEffect;
exports.useId = useId;
exports.useImperativeHandle = useImperativeHandle;
exports.useInsertionEffect = useInsertionEffect;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.useSyncExternalStore = useSyncExternalStore;
exports.useTransition = useTransition;
exports.version = ReactVersion;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}

}).call(this)}).call(this,require('_process'))
},{"_process":1}],4:[function(require,module,exports){
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;
exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.");};
exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};
exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};
exports.useTransition=function(){return U.current.useTransition()};exports.version="18.2.0";

},{}],5:[function(require,module,exports){
(function (process){(function (){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}

}).call(this)}).call(this,require('_process'))
},{"./cjs/react.development.js":3,"./cjs/react.production.min.js":4,"_process":1}]},{},[2]);
