"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enumeration = void 0;
var Name_1 = require("./Name");
var Enumeration = /** @class */ (function () {
    function Enumeration(enumeration) {
        this.enumeration = enumeration;
    }
    Enumeration.prototype.toString = function () {
        var _a = this.enumeration.values, values = _a === void 0 ? [] : _a;
        return __spreadArray(__spreadArray([
            "export enum " + new Name_1.Name(this.enumeration.name) + " {"
        ], values.map(function (value) { return new Name_1.Name(value.name).toString() + " = '" + new Name_1.Name(value.name).toString() + "',"; }), true), [
            '}',
        ], false).join('\n');
    };
    return Enumeration;
}());
exports.Enumeration = Enumeration;
