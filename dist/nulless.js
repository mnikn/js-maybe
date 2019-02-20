'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * A value wrapper to handle null/undefined safely
 */
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        if (value === void 0) { value = null; }
        this._value = value;
    }
    /**
     * Return nothing maybe
     */
    Maybe.nothing = function () {
        return new Maybe();
    };
    /**
     * Return async nothing maybe
     */
    Maybe.asyncNothing = function () {
        return new AsyncMaybe();
    };
    /**
     * Return valuable maybe
     * @param value value need to be wrapped
     */
    Maybe.just = function (value) {
        return new Maybe(value);
    };
    /**
     * Return async valuable maybe
     * @param value value need to be wrapped
     */
    Maybe.asyncJust = function (value) {
        return new AsyncMaybe(value);
    };
    /**
     * Check is it nothing
     */
    Maybe.prototype.isNothing = function () {
        return !this._value;
    };
    /**
     * Get value, use this function only if you are 100% sure you can get the not-null value.
     */
    Maybe.prototype.getValue = function () {
        return this._value;
    };
    /**
     * Get danger value, use it if you really want to handle null/undefined by yourself.
     */
    Maybe.prototype.getDangerValue = function () {
        return this._value;
    };
    /**
     * Transform to another maybe if has value
     * @param transform transform function
     */
    Maybe.prototype.transform = function (transform) {
        return this.isNothing() ? Maybe.nothing() : Maybe.just(transform(this.getValue()));
    };
    /**
     * Async transform to another maybe if has value
     * @param transform transform function
     */
    Maybe.prototype.asyncTransform = function (transform) {
        return this.isNothing() ? Maybe.asyncNothing() : Maybe.asyncJust(transform(this.getValue()));
    };
    /**
     * Do something if has value
     * @param doSomething callback function
     */
    Maybe.prototype.do = function (doSomething, defaultValue) {
        if (this.isNothing() && !defaultValue)
            return this;
        var value = this.isNothing() ? defaultValue : this.getValue();
        doSomething(value);
        return this;
    };
    return Maybe;
}());
/**
 * An async value wrapper to handle null/undefined safely
 */
var AsyncMaybe = /** @class */ (function (_super) {
    __extends(AsyncMaybe, _super);
    function AsyncMaybe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncMaybe.prototype.subscribe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.transform(function (value) {
            return value.subscribe.apply(value, args);
        });
    };
    return AsyncMaybe;
}(Maybe));

exports.Maybe = Maybe;
exports.AsyncMaybe = AsyncMaybe;
//# sourceMappingURL=nulless.js.map
