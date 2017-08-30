'use strict';

var hasOwnProperty;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  hasOwnProperty = require('../../index.js');
} else {
  hasOwnProperty = returnExports;
}

var hasSymbolSupport = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var itHasSymbolSupport = hasSymbolSupport ? it : xit;

describe('hasOwnProperty', function () {
  it('throw', function () {
    expect(function () {
      hasOwnProperty();
    }).toThrow();

    expect(function () {
      hasOwnProperty(void 0);
    }).toThrow();

    expect(function () {
      hasOwnProperty(null);
    }).toThrow();
  });

  it('primitive', function () {
    expect(hasOwnProperty(1)).toBe(false);
    expect(hasOwnProperty(true)).toBe(false);
    expect(hasOwnProperty('')).toBe(false);
  });

  it('has own property', function () {
    var o = { foo: 'bar' };

    expect(hasOwnProperty(o, 'foo')).toBe(true);
  });

  it('does not have own property', function () {
    var o = { foo: 'bar' };

    expect(hasOwnProperty(o, 'bar')).toBe(false);
    expect(hasOwnProperty(o, 'propertyIsEnumerable')).toBe(false);
    expect(hasOwnProperty(o)).toBe(false);
    expect(hasOwnProperty(o, void 0)).toBe(false);
    expect(hasOwnProperty(o, null)).toBe(false);
    expect(hasOwnProperty(o, 1)).toBe(false);
    expect(hasOwnProperty(o, true)).toBe(false);
    expect(hasOwnProperty(o, function () {})).toBe(false);
    expect(hasOwnProperty(o, [])).toBe(false);
    expect(hasOwnProperty(o, {})).toBe(false);
    expect(hasOwnProperty(o, Object('bar'))).toBe(false);
    expect(hasOwnProperty(o, Object(1))).toBe(false);
    expect(hasOwnProperty(o, Object(true))).toBe(false);
  });

  itHasSymbolSupport('symbol', function () {
    var s = Symbol('s');
    var o = {};
    o[s] = 'bar';

    expect(hasOwnProperty(o, s)).toBe(true);
    expect(hasOwnProperty(o, Object(s))).toBe(true);
  });
});
