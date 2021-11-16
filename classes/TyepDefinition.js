"use strict";
exports.__esModule = true;
exports.TypeDefinition = void 0;
var Field_1 = require("./Field");
var Name_1 = require("./Name");
var TypeDefinition = /** @class */ (function () {
    function TypeDefinition(type) {
        this.type = type;
    }
    TypeDefinition.prototype.toString = function () {
        var _a = this.type.fields, fields = _a === void 0 ? [] : _a;
        return "export interface " + new Name_1.Name(this.type.name) + " {\n      " + fields.map(function (field) { return new Field_1.Field(field); }).join('\n') + "\n    }";
    };
    return TypeDefinition;
}());
exports.TypeDefinition = TypeDefinition;
