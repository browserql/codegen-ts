"use strict";
exports.__esModule = true;
exports.Definition = void 0;
var Enumeration_1 = require("./Enumeration");
var TyepDefinition_1 = require("./TyepDefinition");
var Union_1 = require("./Union");
var Definition = /** @class */ (function () {
    function Definition(definition) {
        this.definition = definition;
    }
    Definition.prototype.toString = function () {
        switch (this.definition.kind) {
            case 'ObjectTypeDefinition':
            case 'ObjectTypeExtension':
            case 'InputObjectTypeDefinition':
                return new TyepDefinition_1.TypeDefinition(this.definition).toString();
            case 'EnumTypeDefinition': return new Enumeration_1.Enumeration(this.definition).toString();
            case 'UnionTypeDefinition': return new Union_1.Union(this.definition).toString();
        }
        return '';
    };
    return Definition;
}());
exports.Definition = Definition;
