import toObject from 'to-object-x';
import toPropertyKey from 'to-property-key-x';

const hop = {}.hasOwnProperty;

/**
 * The `hasOwnProperty` method returns a boolean indicating whether
 * the `object` has the specified `property`. Does not attempt to fix known
 * issues in older browsers, but does ES6ify the method.
 *
 * @param {!object} object - The object to test.
 * @throws {TypeError} If object is null or undefined.
 * @param {string|number|Symbol} property - The name or Symbol of the property to test.
 * @returns {boolean} `true` if the property is set on `object`, else `false`.
 */
const hasOwnProperty = function hasOwnProperty(object, property) {
  return hop.call(toObject(object), toPropertyKey(property));
};

export default hasOwnProperty;
