/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:6, maxcomplexity:2 */

/*global expect, module, require, describe, it, returnExports */

(function () {
  'use strict';

  var hasOwnProperty;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    hasOwnProperty = require('../../index.js');
  } else {
    hasOwnProperty = returnExports;
  }

  describe('hasOwnProperty', function () {
    it('basic', function () {
      var o = {
          foo: 'bar'
        };

      expect(hasOwnProperty(o, 'foo')).toBe(true);
      expect(hasOwnProperty(o, 'bar')).toBe(false);
      expect(hasOwnProperty(o)).toBe(false);
      expect(hasOwnProperty(1)).toBe(false);
      expect(function () {
        hasOwnProperty(null);
      }).toThrow();
    });
  });
}());
