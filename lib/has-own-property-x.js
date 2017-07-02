(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.returnExports = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/has-own-property-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/has-own-property-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/has-own-property-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/has-own-property-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/has-own-property-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/has-own-property-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/has-own-property-x" title="npm version">
 * <img src="https://badge.fury.io/js/has-own-property-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Used to determine whether an object has an own property with the specified property key.
 *
 * Requires ES3 or above.
 *
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-hasownproperty|7.3.11 HasOwnProperty (O, P)}
 *
 * @version 1.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-own-property-x
 */

'use strict';

var toObject = _dereq_('to-object-x');
var toPrimitive = _dereq_('es-to-primitive/es6');
var safeToString = _dereq_('safe-to-string-x');
var hop = Object.prototype.hasOwnProperty;

/**
 * The `hasOwnProperty` method returns a boolean indicating whether
 * the `object` has the specified `property`. Does not attempt to fix known
 * issues in older browsers, but does ES6ify the method.
 *
 * @param {!Object} object - The object to test.
 * @param {string|Symbol} property - The name or Symbol of the property to test.
 * @returns {boolean} `true` if the property is set on `object`, else `false`.
 * @example
 * var hasOwnProperty = require('has-own-property-x');
 * var o = {
 *   foo: 'bar'
 * };
 *
 *
 * hasOwnProperty(o, 'bar'); // false
 * hasOwnProperty(o, 'foo'); // true
 * hasOwnProperty(undefined, 'foo');
 *                   // TypeError: Cannot convert undefined or null to object
 */
module.exports = function hasOwnProperty(object, property) {
  return hop.call(toObject(object), safeToString(toPrimitive(property, String)));
};

},{"es-to-primitive/es6":2,"safe-to-string-x":11,"to-object-x":12}],2:[function(_dereq_,module,exports){
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = _dereq_('./helpers/isPrimitive');
var isCallable = _dereq_('is-callable');
var isDate = _dereq_('is-date-object');
var isSymbol = _dereq_('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

},{"./helpers/isPrimitive":3,"is-callable":5,"is-date-object":6,"is-symbol":8}],3:[function(_dereq_,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],4:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/has-symbol-support-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/has-symbol-support-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/has-symbol-support-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/has-symbol-support-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/has-symbol-support-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/has-symbol-support-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/has-symbol-support-x" title="npm version">
 * <img src="https://badge.fury.io/js/has-symbol-support-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Tests if `Symbol` exists and creates the correct type.
 *
 * Requires ES3 or above.
 *
 * @version 1.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-symbol-support-x
 */

'use strict';

/**
 * Indicates if `Symbol`exists and creates the correct type.
 * `true`, if it exists and creates the correct type, otherwise `false`.
 *
 * @type boolean
 */
module.exports = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';

},{}],5:[function(_dereq_,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],6:[function(_dereq_,module,exports){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

},{}],7:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-nil-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-nil-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-nil-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-nil-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-nil-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-nil-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-nil-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-nil-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Checks if `value` is `null` or `undefined`.
 *
 * @version 1.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-nil-x
 */

'use strict';

var isUndefined = _dereq_('validate.io-undefined');
var isNull = _dereq_('lodash.isnull');

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 * var isNill = require('is-nil-x');
 *
 * isNil(null); // => true
 * isNil(void 0); // => true
 * isNil(NaN); // => false
 */
module.exports = function isNil(value) {
  return isNull(value) || isUndefined(value);
};

},{"lodash.isnull":9,"validate.io-undefined":13}],8:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],9:[function(_dereq_,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],10:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/require-object-coercible-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/require-object-coercible-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/require-object-coercible-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/require-object-coercible-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/require-object-coercible-x#info=devDependencies"
 * title="devDependency status">
 * <img
 * src="https://david-dm.org/Xotic750/require-object-coercible-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a
 * href="https://badge.fury.io/js/require-object-coercible-x"
 * title="npm version">
 * <img src="https://badge.fury.io/js/require-object-coercible-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6-compliant shim for RequireObjectCoercible.
 *
 * Requires ES3 or above.
 *
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-requireobjectcoercible|7.2.1 RequireObjectCoercible ( argument )}
 *
 * @version 1.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module require-object-coercible-x
 */

'use strict';

var isNil = _dereq_('is-nil-x');

/**
 * The abstract operation RequireObjectCoercible throws an error if argument
 * is a value that cannot be converted to an Object using ToObject.
 *
 * @param {*} value - The `value` to check.
 * @throws {TypeError} If `value` is a `null` or `undefined`.
 * @returns {string} The `value`.
 * @example
 * var RequireObjectCoercible = require('require-object-coercible-x');
 *
 * RequireObjectCoercible(); // TypeError
 * RequireObjectCoercible(null); // TypeError
 * RequireObjectCoercible('abc'); // 'abc'
 * RequireObjectCoercible(true); // true
 * RequireObjectCoercible(Symbol('foo')); // Symbol('foo')
 */
module.exports = function RequireObjectCoercible(value) {
  if (isNil(value)) {
    throw new TypeError('Cannot call method on ' + value);
  }

  return value;
};

},{"is-nil-x":7}],11:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/safe-to-string-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/safe-to-string-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/safe-to-string-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/safe-to-string-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/safe-to-string-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/safe-to-string-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/safe-to-string-x" title="npm version">
 * <img src="https://badge.fury.io/js/safe-to-string-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6 safeToString module. Converts a `Symbol` literal or object to `Symbol()`
 * instead of throwing a `TypeError`. Its primary use is for logging/debugging.
 *
 * Requires ES3 or above.
 *
 * @see {@link https://github.com/Xotic750/to-string-x|to-string-x}
 *
 * @version 1.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module safe-to-string-x
 */

'use strict';

var isSymbol = _dereq_('is-symbol');
var pToString = _dereq_('has-symbol-support-x') && Symbol.prototype.toString;

/**
 * The abstract operation `safeToString` converts a `Symbol` literal or
 * object to `Symbol()` instead of throwing a `TypeError`.
 *
 * @param {*} value - The value to convert to a string.
 * @returns {string} The converted value.
 * @example
 * var safeToString = require('safe-to-string-x');
 *
 * safeToString(); // 'undefined'
 * safeToString(null); // 'null'
 * safeToString('abc'); // 'abc'
 * safeToString(true); // 'true'
 * safeToString(Symbol('foo')); // 'Symbol(foo)'
 * safeToString(Symbol.iterator); // 'Symbol(Symbol.iterator)'
 * safeToString(Object(Symbol.iterator)); // 'Symbol(Symbol.iterator)'
 */
module.exports = function safeToString(value) {
  return pToString && isSymbol(value) ? pToString.call(value) : String(value);
};

},{"has-symbol-support-x":4,"is-symbol":8}],12:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/to-object-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/to-object-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/to-object-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/to-object-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/to-object-x#info=devDependencies"
 * title="devDependency status">
 * <img
 * src="https://david-dm.org/Xotic750/to-object-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a
 * href="https://badge.fury.io/js/to-object-x"
 * title="npm version">
 * <img src="https://badge.fury.io/js/to-object-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6-compliant shim for ToObject.
 *
 * Requires ES3 or above.
 *
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-toobject|7.1.13 ToObject ( argument )}
 *
 * @version 1.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-object-x
 */

'use strict';

var $requireObjectCoercible = _dereq_('require-object-coercible-x');

/**
 * The abstract operation ToObject converts argument to a value of
 * type Object.
 *
 * @param {*} value - The `value` to convert.
 * @throws {TypeError} If `value` is a `null` or `undefined`.
 * @returns {!Object} The `value` converted to an object.
 * @example
 * var ToObject = require('to-object-x');
 *
 * ToObject(); // TypeError
 * ToObject(null); // TypeError
 * ToObject('abc'); // Object('abc')
 * ToObject(true); // Object(true)
 * ToObject(Symbol('foo')); // Object(Symbol('foo'))
 */
module.exports = function ToObject(value) {
  return Object($requireObjectCoercible(value));
};

},{"require-object-coercible-x":10}],13:[function(_dereq_,module,exports){
/**
*
*	VALIDATE: undefined
*
*
*	DESCRIPTION:
*		- Validates if a value is undefined.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isUndefined( value )
*	Validates if a value is undefined.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is undefined
*/
function isUndefined( value ) {
	return value === void 0;
} // end FUNCTION isUndefined()


// EXPORTS //

module.exports = isUndefined;

},{}]},{},[1])(1)
});