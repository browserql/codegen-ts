"use strict";
exports.__esModule = true;
exports.Union = void 0;
var Name_1 = require("./Name");
var Union = /** @class */ (function () {
    function Union(union) {
        this.union = union;
    }
    Union.prototype.toString = function () {
        var _a = this.union.types, types = _a === void 0 ? [] : _a;
        return "export type " + new Name_1.Name(this.union.name) + " = " + types
            .map(function (type) { return new Name_1.Name(type.name).toString(); })
            .join(' | ');
    };
    return Union;
}());
exports.Union = Union;
