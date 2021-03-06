<a
  href="https://travis-ci.org/Xotic750/has-own-property-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/has-own-property-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/has-own-property-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/has-own-property-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/has-own-property-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/has-own-property-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/has-own-property-x"
  title="npm version">
<img src="https://badge.fury.io/js/has-own-property-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/has-own-property-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/has-own-property-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/has-own-property-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/has-own-property-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/has-own-property-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/has-own-property-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_has-own-property-x"></a>

## has-own-property-x

Used to determine whether an object has an own property with the specified property key.

<a name="exp_module_has-own-property-x--module.exports"></a>

### `module.exports(object, property)` ⇒ <code>boolean</code> ⏏

The `hasOwnProperty` method returns a boolean indicating whether
the `object` has the specified `property`. Does not attempt to fix known
issues in older browsers, but does ES6ify the method.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if the property is set on `object`, else `false`.  
**Throws**:

- <code>TypeError</code> If object is null or undefined.

| Param    | Type                                       | Description                                 |
| -------- | ------------------------------------------ | ------------------------------------------- |
| object   | <code>Object</code>                        | The object to test.                         |
| property | <code>string</code> \| <code>Symbol</code> | The name or Symbol of the property to test. |

**Example**

```js
import hasOwnProperty from 'has-own-property-x';

const o = {
  foo: 'bar',
};

console.log(hasOwnProperty(o, 'bar')); // false
console.log(hasOwnProperty(o, 'foo')); // true
hasOwnProperty(undefined, 'foo'); // TypeError: Cannot convert undefined or null to object
```
