/**
 * SimpleBar.js - v6.0.0-beta.4
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es.array.for-each'), require('core-js/modules/web.dom-collections.for-each'), require('can-use-dom'), require('core-js/modules/es.array.reduce'), require('core-js/modules/es.function.name'), require('core-js/modules/es.regexp.exec'), require('core-js/modules/es.string.match'), require('core-js/modules/es.string.replace')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/es.array.for-each', 'core-js/modules/web.dom-collections.for-each', 'can-use-dom', 'core-js/modules/es.array.reduce', 'core-js/modules/es.function.name', 'core-js/modules/es.regexp.exec', 'core-js/modules/es.string.match', 'core-js/modules/es.string.replace'], factory) :
  (global = global || self, global.SimpleBar = factory(null, null, global.canUseDOM));
}(this, (function (es_array_forEach, web_domCollections_forEach, canUseDOM) { 'use strict';

  canUseDOM = canUseDOM && Object.prototype.hasOwnProperty.call(canUseDOM, 'default') ? canUseDOM['default'] : canUseDOM;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */

  var Symbol = root.Symbol;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? getRawTag(value) : objectToString(value);
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */

  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** Used as references for various `Number` constants. */

  var NAN = 0 / 0;
  /** Used to match leading and trailing whitespace. */

  var reTrim = /^\s+|\s+$/g;
  /** Used to detect bad signed hexadecimal string values. */

  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  /** Used to detect binary string values. */

  var reIsBinary = /^0b[01]+$/i;
  /** Used to detect octal string values. */

  var reIsOctal = /^0o[0-7]+$/i;
  /** Built-in method references without a dependency on `root`. */

  var freeParseInt = parseInt;
  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */

  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }

    if (isSymbol(value)) {
      return NAN;
    }

    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  /** `Object#toString` result references. */

  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */

  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */

  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$1 = funcProto$1.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */

  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }

    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */

  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  /* Built-in method references that are verified to be native. */

  var nativeCreate = getNative(Object, 'create');

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */

  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used for built-in method references. */

  var objectProto$3 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function hashGet(key) {
    var data = this.__data__;

    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */

  var objectProto$4 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */

  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `Hash`.


  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  /** Used for built-in method references. */

  var arrayProto = Array.prototype;
  /** Built-in value references. */

  var splice = arrayProto.splice;
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */

  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /* Built-in method references that are verified to be native. */

  var Map = getNative(root, 'Map');

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */

  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash(),
      'map': new (Map || ListCache)(),
      'string': new Hash()
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */

  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */

  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Error message constants. */

  var FUNC_ERROR_TEXT = 'Expected a function';
  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */

  function memoize(func, resolver) {
    if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    var memoized = function () {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  } // Expose `MapCache`.


  memoize.Cache = MapCache;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */

  var now = function () {
    return root.Date.now();
  };

  /** Error message constants. */

  var FUNC_ERROR_TEXT$1 = 'Expected a function';
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax = Math.max,
      nativeMin = Math.min;
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */

  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }

    wait = toNumber(wait) || 0;

    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }

        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }

      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }

      return result;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  /** Error message constants. */

  var FUNC_ERROR_TEXT$2 = 'Expected a function';
  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */

  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$2);
    }

    if (isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    return debounce(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }

  /**
   * SimpleBar.js - v1.0.2
   * Scrollbars, simpler.
   * https://grsmto.github.io/simplebar/
   *
   * Made by Adrien Denat from a fork by Jonathan Nicol
   * Under MIT License
   */
  let cachedScrollbarWidth = null;
  let cachedDevicePixelRatio = null;

  if (canUseDOM) {
    window.addEventListener('resize', () => {
      if (cachedDevicePixelRatio !== window.devicePixelRatio) {
        cachedDevicePixelRatio = window.devicePixelRatio;
        cachedScrollbarWidth = null;
      }
    });
  }

  function scrollbarWidth() {
    if (cachedScrollbarWidth === null) {
      if (typeof document === 'undefined') {
        cachedScrollbarWidth = 0;
        return cachedScrollbarWidth;
      }

      const body = document.body;
      const box = document.createElement('div');
      box.classList.add('simplebar-hide-scrollbar');
      body.appendChild(box);
      const width = box.getBoundingClientRect().right;
      body.removeChild(box);
      cachedScrollbarWidth = width;
    }

    return cachedScrollbarWidth;
  }

  function getElementWindow(element) {
    if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) {
      return window;
    }

    return element.ownerDocument.defaultView;
  }

  function getElementDocument(element) {
    if (!element || !element.ownerDocument) {
      return document;
    }

    return element.ownerDocument;
  }

  class SimpleBar {
    constructor(element, options = {}) {
      this.onScroll = () => {
        const elWindow = getElementWindow(this.el);

        if (!this.scrollXTicking) {
          elWindow.requestAnimationFrame(this.scrollX);
          this.scrollXTicking = true;
        }

        if (!this.scrollYTicking) {
          elWindow.requestAnimationFrame(this.scrollY);
          this.scrollYTicking = true;
        }

        if (!this.isScrolling) {
          this.isScrolling = true;
          this.el.classList.add(this.classNames.scrolling);
        }

        this.onStopScrolling();
      };

      this.scrollX = () => {
        if (this.axis.x.isOverflowing) {
          this.positionScrollbar('x');
        }

        this.scrollXTicking = false;
      };

      this.scrollY = () => {
        if (this.axis.y.isOverflowing) {
          this.positionScrollbar('y');
        }

        this.scrollYTicking = false;
      };

      this.onStopScrolling = () => {
        this.el.classList.remove(this.classNames.scrolling);
        this.isScrolling = false;
      };

      this.onMouseEnter = () => {
        if (!this.isMouseEntering) {
          this.el.classList.add(this.classNames.mouseEntered);
          this.isMouseEntering = true;
        }

        this.onMouseEntered();
      };

      this.onMouseEntered = () => {
        this.el.classList.remove(this.classNames.mouseEntered);
        this.isMouseEntering = false;
      };

      this.onMouseMove = e => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
          this.onMouseMoveForAxis('x');
        }

        if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
          this.onMouseMoveForAxis('y');
        }
      };

      this.onMouseLeave = () => {
        this.onMouseMove.cancel();

        if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
          this.onMouseLeaveForAxis('x');
        }

        if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
          this.onMouseLeaveForAxis('y');
        }

        this.mouseX = -1;
        this.mouseY = -1;
      };

      this.onWindowResize = () => {
        // Recalculate scrollbarWidth in case it's a zoom
        this.scrollbarWidth = this.getScrollbarWidth();
        this.hideNativeScrollbar();
      };

      this.onPointerEvent = e => {
        let isWithinTrackXBounds, isWithinTrackYBounds;
        this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
        this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();

        if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
          isWithinTrackXBounds = this.isWithinBounds(this.axis.x.track.rect);
        }

        if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
          isWithinTrackYBounds = this.isWithinBounds(this.axis.y.track.rect);
        } // If any pointer event is called on the scrollbar


        if (isWithinTrackXBounds || isWithinTrackYBounds) {
          // Preventing the event's default action stops text being
          // selectable during the drag.
          e.preventDefault(); // Prevent event leaking

          e.stopPropagation();

          if (e.type === 'mousedown') {
            if (isWithinTrackXBounds) {
              this.axis.x.scrollbar.rect = this.axis.x.scrollbar.el.getBoundingClientRect();

              if (this.isWithinBounds(this.axis.x.scrollbar.rect)) {
                this.onDragStart(e, 'x');
              } else {
                this.onTrackClick(e, 'x');
              }
            }

            if (isWithinTrackYBounds) {
              this.axis.y.scrollbar.rect = this.axis.y.scrollbar.el.getBoundingClientRect();

              if (this.isWithinBounds(this.axis.y.scrollbar.rect)) {
                this.onDragStart(e, 'y');
              } else {
                this.onTrackClick(e, 'y');
              }
            }
          }
        }
      };

      this.drag = e => {
        let eventOffset;
        const track = this.axis[this.draggedAxis].track;
        const trackSize = track.rect[this.axis[this.draggedAxis].sizeAttr];
        const scrollbar = this.axis[this.draggedAxis].scrollbar;
        const contentSize = this.contentWrapperEl[this.axis[this.draggedAxis].scrollSizeAttr];
        const hostSize = parseInt(this.elStyles[this.axis[this.draggedAxis].sizeAttr], 10);
        e.preventDefault();
        e.stopPropagation();

        if (this.draggedAxis === 'y') {
          eventOffset = e.pageY;
        } else {
          eventOffset = e.pageX;
        } // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).


        let dragPos = eventOffset - track.rect[this.axis[this.draggedAxis].offsetAttr] - this.axis[this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

        let dragPerc = dragPos / (trackSize - scrollbar.size); // Scroll the content by the same percentage.

        let scrollPos = dragPerc * (contentSize - hostSize); // Fix browsers inconsistency on RTL

        if (this.draggedAxis === 'x') {
          scrollPos = this.isRtl && SimpleBar.getRtlHelpers().isScrollOriginAtZero ? scrollPos - (trackSize + scrollbar.size) : scrollPos;
        }

        this.contentWrapperEl[this.axis[this.draggedAxis].scrollOffsetAttr] = scrollPos;
      };

      this.onEndDrag = e => {
        const elDocument = getElementDocument(this.el);
        const elWindow = getElementWindow(this.el);
        e.preventDefault();
        e.stopPropagation();
        this.el.classList.remove(this.classNames.dragging);
        elDocument.removeEventListener('mousemove', this.drag, true);
        elDocument.removeEventListener('mouseup', this.onEndDrag, true);
        this.removePreventClickId = elWindow.setTimeout(() => {
          // Remove these asynchronously so we still suppress click events
          // generated simultaneously with mouseup.
          elDocument.removeEventListener('click', this.preventClick, true);
          elDocument.removeEventListener('dblclick', this.preventClick, true);
          this.removePreventClickId = null;
        });
      };

      this.preventClick = e => {
        e.preventDefault();
        e.stopPropagation();
      };

      this.el = element;
      this.minScrollbarWidth = 20;
      this.stopScrollDelay = 175;
      this.options = { ...SimpleBar.defaultOptions,
        ...options
      };
      this.classNames = {
        contentEl: 'simplebar-content',
        contentWrapper: 'simplebar-content-wrapper',
        offset: 'simplebar-offset',
        mask: 'simplebar-mask',
        wrapper: 'simplebar-wrapper',
        placeholder: 'simplebar-placeholder',
        scrollbar: 'simplebar-scrollbar',
        track: 'simplebar-track',
        heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
        heightAutoObserverEl: 'simplebar-height-auto-observer',
        visible: 'simplebar-visible',
        horizontal: 'simplebar-horizontal',
        vertical: 'simplebar-vertical',
        hover: 'simplebar-hover',
        dragging: 'simplebar-dragging',
        scrolling: 'simplebar-scrolling',
        scrollable: 'simplebar-scrollable',
        mouseEntered: 'simplebar-mouse-entered',
        ...this.options.classNames
      };
      this.axis = {
        x: {
          scrollOffsetAttr: 'scrollLeft',
          sizeAttr: 'width',
          scrollSizeAttr: 'scrollWidth',
          offsetSizeAttr: 'offsetWidth',
          offsetAttr: 'left',
          overflowAttr: 'overflowX',
          dragOffset: 0,
          isOverflowing: true,
          isVisible: false,
          forceVisible: false,
          track: {},
          scrollbar: {}
        },
        y: {
          scrollOffsetAttr: 'scrollTop',
          sizeAttr: 'height',
          scrollSizeAttr: 'scrollHeight',
          offsetSizeAttr: 'offsetHeight',
          offsetAttr: 'top',
          overflowAttr: 'overflowY',
          dragOffset: 0,
          isOverflowing: true,
          isVisible: false,
          forceVisible: false,
          track: {},
          scrollbar: {}
        }
      };
      this.removePreventClickId = null;
      this.isScrolling = false;
      this.isMouseEntering = false; // Don't re-instantiate over an existing one

      if (SimpleBar.instances.has(this.el)) {
        return;
      }

      if (options.classNames) {
        console.warn('simplebar: classNames option is deprecated. Please override the styles with CSS instead.');
      }

      if (options.autoHide) {
        console.warn("simplebar: autoHide option is deprecated. Please use CSS instead: '.simplebar-scrollbar::before { opacity: 0.5 };' for autoHide: false");
      }

      this.onMouseMove = throttle(this.onMouseMove, 64);
      this.onWindowResize = debounce(this.onWindowResize, 64, {
        leading: true
      });
      this.onStopScrolling = debounce(this.onStopScrolling, this.stopScrollDelay);
      this.onMouseEntered = debounce(this.onMouseEntered, this.stopScrollDelay);
      SimpleBar.getRtlHelpers = memoize(SimpleBar.getRtlHelpers);
      this.init();
    }
    /**
     * Static properties
     */

    /**
     * Helper to fix browsers inconsistency on RTL:
     *  - Firefox inverts the scrollbar initial position
     *  - IE11 inverts both scrollbar position and scrolling offset
     * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
     */


    static getRtlHelpers() {
      const dummyDiv = document.createElement('div');
      dummyDiv.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
      const scrollbarDummyEl = dummyDiv.firstElementChild;
      const dummyChild = scrollbarDummyEl.firstElementChild;
      document.body.appendChild(scrollbarDummyEl);
      scrollbarDummyEl.scrollLeft = 0;
      const dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
      const dummyChildOffset = SimpleBar.getOffset(dummyChild);
      scrollbarDummyEl.scrollLeft = -999;
      const dummyChildOffsetAfterScroll = SimpleBar.getOffset(dummyChild);
      return {
        // determines if the scrolling is responding with negative values
        isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
        // determines if the origin scrollbar position is inverted or not (positioned on left or right)
        isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
      };
    }

    static getOffset(el) {
      const rect = el.getBoundingClientRect();
      const elDocument = getElementDocument(el);
      const elWindow = getElementWindow(el);
      return {
        top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
        left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
      };
    }

    init() {
      // Save a reference to the instance, so we know this DOM node has already been instancied
      SimpleBar.instances.set(this.el, this); // We stop here on server-side

      if (canUseDOM) {
        this.initDOM();
        this.scrollbarWidth = this.getScrollbarWidth();
        this.recalculate();
        this.initListeners();
      }
    }

    initDOM() {
      // make sure this element doesn't have the elements yet
      if (Array.prototype.filter.call(this.el.children, child => child.classList.contains(this.classNames.wrapper)).length) {
        // assume that element has his DOM already initiated
        this.wrapperEl = this.el.querySelector(`.${this.classNames.wrapper}`);
        this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(`.${this.classNames.contentWrapper}`);
        this.contentEl = this.options.contentNode || this.el.querySelector(`.${this.classNames.contentEl}`);
        this.offsetEl = this.el.querySelector(`.${this.classNames.offset}`);
        this.maskEl = this.el.querySelector(`.${this.classNames.mask}`);
        this.placeholderEl = this.findChild(this.wrapperEl, `.${this.classNames.placeholder}`);
        this.heightAutoObserverWrapperEl = this.el.querySelector(`.${this.classNames.heightAutoObserverWrapperEl}`);
        this.heightAutoObserverEl = this.el.querySelector(`.${this.classNames.heightAutoObserverEl}`);
        this.axis.x.track.el = this.findChild(this.el, `.${this.classNames.track}.${this.classNames.horizontal}`);
        this.axis.y.track.el = this.findChild(this.el, `.${this.classNames.track}.${this.classNames.vertical}`);
      } else {
        // Prepare DOM
        this.wrapperEl = document.createElement('div');
        this.contentWrapperEl = document.createElement('div');
        this.offsetEl = document.createElement('div');
        this.maskEl = document.createElement('div');
        this.contentEl = document.createElement('div');
        this.placeholderEl = document.createElement('div');
        this.heightAutoObserverWrapperEl = document.createElement('div');
        this.heightAutoObserverEl = document.createElement('div');
        this.wrapperEl.classList.add(this.classNames.wrapper);
        this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
        this.offsetEl.classList.add(this.classNames.offset);
        this.maskEl.classList.add(this.classNames.mask);
        this.contentEl.classList.add(this.classNames.contentEl);
        this.placeholderEl.classList.add(this.classNames.placeholder);
        this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
        this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);

        while (this.el.firstChild) {
          this.contentEl.appendChild(this.el.firstChild);
        }

        this.contentWrapperEl.appendChild(this.contentEl);
        this.offsetEl.appendChild(this.contentWrapperEl);
        this.maskEl.appendChild(this.offsetEl);
        this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
        this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
        this.wrapperEl.appendChild(this.maskEl);
        this.wrapperEl.appendChild(this.placeholderEl);
        this.el.appendChild(this.wrapperEl);
      }

      if (!this.axis.x.track.el || !this.axis.y.track.el) {
        const track = document.createElement('div');
        const scrollbar = document.createElement('div');
        track.classList.add(this.classNames.track);
        scrollbar.classList.add(this.classNames.scrollbar);
        track.appendChild(scrollbar);
        this.axis.x.track.el = track.cloneNode(true);
        this.axis.x.track.el.classList.add(this.classNames.horizontal);
        this.axis.y.track.el = track.cloneNode(true);
        this.axis.y.track.el.classList.add(this.classNames.vertical);
        this.el.appendChild(this.axis.x.track.el);
        this.el.appendChild(this.axis.y.track.el);
      }

      this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(`.${this.classNames.scrollbar}`);
      this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(`.${this.classNames.scrollbar}`);

      if (!this.options.autoHide) {
        this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
        this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
      }

      this.el.setAttribute('data-simplebar', 'init');
    }

    initListeners() {
      const elWindow = getElementWindow(this.el); // Event listeners

      this.el.addEventListener('mouseenter', this.onMouseEnter);
      ['mousedown', 'click', 'dblclick'].forEach(e => {
        this.el.addEventListener(e, this.onPointerEvent, true);
      });
      ['touchstart', 'touchend', 'touchmove'].forEach(e => {
        this.el.addEventListener(e, this.onPointerEvent, {
          capture: true,
          passive: true
        });
      });
      this.el.addEventListener('mousemove', this.onMouseMove);
      this.el.addEventListener('mouseleave', this.onMouseLeave);
      this.contentWrapperEl.addEventListener('scroll', this.onScroll); // Browser zoom triggers a window resize

      elWindow.addEventListener('resize', this.onWindowResize);

      if (window.ResizeObserver) {
        // Hack for https://github.com/WICG/ResizeObserver/issues/38
        let resizeObserverStarted = false;
        const resizeObserver = elWindow.ResizeObserver || ResizeObserver;
        this.resizeObserver = new resizeObserver(() => {
          if (!resizeObserverStarted) return;
          elWindow.requestAnimationFrame(() => {
            this.recalculate();
          });
        });
        this.resizeObserver.observe(this.el);
        this.resizeObserver.observe(this.contentEl);
        elWindow.requestAnimationFrame(() => {
          resizeObserverStarted = true;
        });
      } // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.


      this.mutationObserver = new elWindow.MutationObserver(() => {
        elWindow.requestAnimationFrame(() => {
          this.recalculate();
        });
      });
      this.mutationObserver.observe(this.contentEl, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    recalculate() {
      const elWindow = getElementWindow(this.el);
      this.elStyles = elWindow.getComputedStyle(this.el);
      this.isRtl = this.elStyles.direction === 'rtl';
      const contentElOffsetWidth = this.contentEl.offsetWidth;
      const isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
      const isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
      const contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
      const elOverflowX = this.elStyles.overflowX;
      const elOverflowY = this.elStyles.overflowY;
      this.contentEl.style.padding = `${this.elStyles.paddingTop} ${this.elStyles.paddingRight} ${this.elStyles.paddingBottom} ${this.elStyles.paddingLeft}`;
      this.wrapperEl.style.margin = `-${this.elStyles.paddingTop} -${this.elStyles.paddingRight} -${this.elStyles.paddingBottom} -${this.elStyles.paddingLeft}`;
      const contentElScrollHeight = this.contentEl.scrollHeight;
      const contentElScrollWidth = this.contentEl.scrollWidth;
      this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%'; // Determine placeholder size

      this.placeholderEl.style.width = isWidthAuto ? `${contentElOffsetWidth || contentElScrollWidth}px` : 'auto';
      this.placeholderEl.style.height = `${contentElScrollHeight}px`;
      const contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
      this.axis.x.isOverflowing = contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
      this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

      this.axis.x.isOverflowing = elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
      this.axis.y.isOverflowing = elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
      this.axis.x.forceVisible = this.options.forceVisible === 'x' || this.options.forceVisible === true;
      this.axis.y.forceVisible = this.options.forceVisible === 'y' || this.options.forceVisible === true;
      this.hideNativeScrollbar(); // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

      let offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
      let offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
      this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
      this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
      this.axis.x.scrollbar.size = this.getScrollbarSize('x');
      this.axis.y.scrollbar.size = this.getScrollbarSize('y');
      this.axis.x.scrollbar.el.style.width = `${this.axis.x.scrollbar.size}px`;
      this.axis.y.scrollbar.el.style.height = `${this.axis.y.scrollbar.size}px`;
      this.positionScrollbar('x');
      this.positionScrollbar('y');
      this.toggleTrackVisibility('x');
      this.toggleTrackVisibility('y');
    }
    /**
     * Calculate scrollbar size
     */


    getScrollbarSize(axis = 'y') {
      if (!this.axis[axis].isOverflowing) {
        return 0;
      }

      const contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
      const trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
      let scrollbarSize;
      let scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

      scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);

      if (this.options.scrollbarMaxSize) {
        scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
      }

      return scrollbarSize;
    }

    positionScrollbar(axis = 'y') {
      if (!this.axis[axis].isOverflowing) {
        return;
      }

      const contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
      const trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
      const hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
      const scrollbar = this.axis[axis].scrollbar;
      let scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
      scrollOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isScrollOriginAtZero ? -scrollOffset : scrollOffset;
      let scrollPourcent = scrollOffset / (contentSize - hostSize);
      let handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
      handleOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isScrollingToNegative ? -handleOffset + (trackSize - scrollbar.size) : handleOffset;
      scrollbar.el.style.transform = axis === 'x' ? `translate3d(${handleOffset}px, 0, 0)` : `translate3d(0, ${handleOffset}px, 0)`;
    }

    toggleTrackVisibility(axis = 'y') {
      const track = this.axis[axis].track.el;
      const scrollbar = this.axis[axis].scrollbar.el;

      if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
        track.style.visibility = 'visible';
        this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
        this.el.classList.add(`${this.classNames.scrollable}-${axis}`);
      } else {
        track.style.visibility = 'hidden';
        this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
        this.el.classList.remove(`${this.classNames.scrollable}-${axis}`);
      } // Even if forceVisible is enabled, scrollbar itself should be hidden


      if (this.axis[axis].isOverflowing) {
        scrollbar.style.display = 'block';
      } else {
        scrollbar.style.display = 'none';
      }
    }

    hideNativeScrollbar() {
      this.offsetEl.style[this.isRtl ? 'left' : 'right'] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? `-${this.scrollbarWidth}px` : 0;
      this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? `-${this.scrollbarWidth}px` : 0;
    }
    /**
     * On scroll event handling
     */


    onMouseMoveForAxis(axis = 'y') {
      this.axis[axis].track.rect = this.axis[axis].track.el.getBoundingClientRect();
      this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
      const isWithinScrollbarBoundsX = this.isWithinBounds(this.axis[axis].scrollbar.rect);

      if (isWithinScrollbarBoundsX) {
        this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
      } else {
        this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
      }

      if (this.isWithinBounds(this.axis[axis].track.rect)) {
        this.axis[axis].track.el.classList.add(this.classNames.hover);
      } else {
        this.axis[axis].track.el.classList.remove(this.classNames.hover);
      }
    }

    onMouseLeaveForAxis(axis = 'y') {
      this.axis[axis].track.el.classList.remove(this.classNames.hover);
      this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
    }
    /**
     * on scrollbar handle drag movement starts
     */


    onDragStart(e, axis = 'y') {
      const elDocument = getElementDocument(this.el);
      const elWindow = getElementWindow(this.el);
      const scrollbar = this.axis[axis].scrollbar; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

      const eventOffset = axis === 'y' ? e.pageY : e.pageX;
      this.axis[axis].dragOffset = eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
      this.draggedAxis = axis;
      this.el.classList.add(this.classNames.dragging);
      elDocument.addEventListener('mousemove', this.drag, true);
      elDocument.addEventListener('mouseup', this.onEndDrag, true);

      if (this.removePreventClickId === null) {
        elDocument.addEventListener('click', this.preventClick, true);
        elDocument.addEventListener('dblclick', this.preventClick, true);
      } else {
        elWindow.clearTimeout(this.removePreventClickId);
        this.removePreventClickId = null;
      }
    }
    /**
     * Drag scrollbar handle
     */


    onTrackClick(e, axis = 'y') {
      if (!this.options.clickOnTrack) return;
      const elWindow = getElementWindow(this.el);
      this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
      const scrollbar = this.axis[axis].scrollbar;
      const scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
      const hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
      let scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
      const t = axis === 'y' ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
      const dir = t < 0 ? -1 : 1;
      const scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
      const speed = 40;

      const scrollTo = () => {
        if (dir === -1) {
          if (scrolled > scrollSize) {
            scrolled -= speed;
          }
        } else {
          if (scrolled < scrollSize) {
            scrolled += speed;
          }
        }

        this.contentWrapperEl[this.axis[axis].scrollOffsetAttr] = scrolled;
        elWindow.requestAnimationFrame(scrollTo);
      };

      scrollTo();
    }
    /**
     * Getter for content element
     */


    getContentElement() {
      return this.contentEl;
    }
    /**
     * Getter for original scrolling element
     */


    getScrollElement() {
      return this.contentWrapperEl;
    }

    getScrollbarWidth() {
      // Try/catch for FF 56 throwing on undefined computedStyles
      try {
        // Detect browsers supporting CSS scrollbar styling and do not calculate
        if (getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar').display === 'none' || 'scrollbarWidth' in document.documentElement.style || '-ms-overflow-style' in document.documentElement.style) {
          return 0;
        } else {
          return scrollbarWidth();
        }
      } catch (e) {
        return scrollbarWidth();
      }
    }

    removeListeners() {
      const elWindow = getElementWindow(this.el); // Event listeners

      this.el.removeEventListener('mouseenter', this.onMouseEnter);
      ['mousedown', 'click', 'dblclick'].forEach(e => {
        this.el.removeEventListener(e, this.onPointerEvent, true);
      });
      ['touchstart', 'touchend', 'touchmove'].forEach(e => {
        this.el.removeEventListener(e, this.onPointerEvent, {
          capture: true,
          passive: true
        });
      });
      this.el.removeEventListener('mousemove', this.onMouseMove);
      this.el.removeEventListener('mouseleave', this.onMouseLeave);
      this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
      elWindow.removeEventListener('resize', this.onWindowResize);
      this.mutationObserver.disconnect();

      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      } // Cancel all debounced functions


      this.onMouseMove.cancel();
      this.onWindowResize.cancel();
      this.onStopScrolling.cancel();
      this.onMouseEntered.cancel();
    }
    /**
     * UnMount mutation observer and delete SimpleBar instance from DOM element
     */


    unMount() {
      this.removeListeners();
      SimpleBar.instances.delete(this.el);
    }
    /**
     * Check if mouse is within bounds
     */


    isWithinBounds(bbox) {
      return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
    }
    /**
     * Find element children matches query
     */


    findChild(el, query) {
      const matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      return Array.prototype.filter.call(el.children, child => matches.call(child, query))[0];
    }

  }

  SimpleBar.defaultOptions = {
    autoHide: true,
    forceVisible: false,
    clickOnTrack: true,
    scrollbarMinSize: 25,
    scrollbarMaxSize: 0
  };
  SimpleBar.instances = new WeakMap();

  // Helper function to retrieve options from element attributes
  var getOptions = function getOptions(obj) {
    var options = Array.prototype.reduce.call(obj, function (acc, attribute) {
      var option = attribute.name.match(/data-simplebar-(.+)/);

      if (option) {
        var key = option[1].replace(/\W+(.)/g, function (x, chr) {
          return chr.toUpperCase();
        });

        switch (attribute.value) {
          case 'true':
            acc[key] = true;
            break;

          case 'false':
            acc[key] = false;
            break;

          case undefined:
            acc[key] = true;
            break;

          default:
            acc[key] = attribute.value;
        }
      }

      return acc;
    }, {});
    return options;
  };

  SimpleBar.initDOMLoadedElements = function () {
    document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
    window.removeEventListener('load', this.initDOMLoadedElements);
    Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
      if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
    });
  };

  SimpleBar.removeObserver = function () {
    this.globalObserver.disconnect();
  };

  SimpleBar.initHtmlApi = function () {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

    if (typeof MutationObserver !== 'undefined') {
      // Mutation observer to observe dynamically added elements
      this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
      this.globalObserver.observe(document, {
        childList: true,
        subtree: true
      });
    } // Taken from jQuery `ready` function
    // Instantiate elements already present on the page


    if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements);
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
      window.addEventListener('load', this.initDOMLoadedElements);
    }
  };

  SimpleBar.handleMutations = function (mutations) {
    mutations.forEach(function (mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
        if (addedNode.nodeType === 1) {
          if (addedNode.hasAttribute('data-simplebar')) {
            !SimpleBar.instances.has(addedNode) && new SimpleBar(addedNode, getOptions(addedNode.attributes));
          } else {
            Array.prototype.forEach.call(addedNode.querySelectorAll('[data-simplebar]'), function (el) {
              if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
            });
          }
        }
      });
      Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
        if (removedNode.nodeType === 1) {
          if (removedNode.hasAttribute('data-simplebar')) {
            SimpleBar.instances.has(removedNode) && SimpleBar.instances.get(removedNode).unMount();
          } else {
            Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
              SimpleBar.instances.has(el) && SimpleBar.instances.get(el).unMount();
            });
          }
        }
      });
    });
  };

  SimpleBar.getOptions = getOptions;
  SimpleBar.default = SimpleBar;
  /**
   * HTML API
   * Called only in a browser env.
   */

  if (canUseDOM) {
    SimpleBar.initHtmlApi();
  }

  return SimpleBar;

})));
