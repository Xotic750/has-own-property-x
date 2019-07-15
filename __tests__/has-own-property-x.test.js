import noop from 'lodash/noop';
import hasOwnProperty from '../src/has-own-property-x';

/* eslint-disable-next-line compat/compat */
const hasSymbolSupport = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const itHasSymbolSupport = hasSymbolSupport ? it : xit;

describe('hasOwnProperty', function() {
  it('throw', function() {
    expect.assertions(3);
    expect(function() {
      hasOwnProperty();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      /* eslint-disable-next-line no-void */
      hasOwnProperty(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      hasOwnProperty(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('primitive', function() {
    expect.assertions(3);
    expect(hasOwnProperty(1)).toBe(false);
    expect(hasOwnProperty(true)).toBe(false);
    expect(hasOwnProperty('')).toBe(false);
  });

  it('has own property', function() {
    expect.assertions(1);
    const o = {foo: 'bar'};

    expect(hasOwnProperty(o, 'foo')).toBe(true);
  });

  it('does not have own property', function() {
    expect.assertions(13);
    const o = {foo: 'bar'};

    expect(hasOwnProperty(o, 'bar')).toBe(false);
    expect(hasOwnProperty(o, 'propertyIsEnumerable')).toBe(false);
    expect(hasOwnProperty(o)).toBe(false);
    /* eslint-disable-next-line no-void */
    expect(hasOwnProperty(o, void 0)).toBe(false);
    expect(hasOwnProperty(o, null)).toBe(false);
    expect(hasOwnProperty(o, 1)).toBe(false);
    expect(hasOwnProperty(o, true)).toBe(false);
    expect(hasOwnProperty(o, noop)).toBe(false);
    expect(hasOwnProperty(o, [])).toBe(false);
    expect(hasOwnProperty(o, {})).toBe(false);
    expect(hasOwnProperty(o, Object('bar'))).toBe(false);
    expect(hasOwnProperty(o, Object(1))).toBe(false);
    expect(hasOwnProperty(o, Object(true))).toBe(false);
  });

  itHasSymbolSupport('symbol', function() {
    expect.assertions(2);
    /* eslint-disable-next-line compat/compat */
    const s = Symbol('s');
    const o = {};
    o[s] = 'bar';

    expect(hasOwnProperty(o, s)).toBe(true);
    expect(hasOwnProperty(o, Object(s))).toBe(true);
  });
});
