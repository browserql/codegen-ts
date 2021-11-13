"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
var TyepDefinition_1 = require("./TyepDefinition");
var Definition = /** @class */ (function () {
    function Definition(definition) {
        this.definition = definition;
    }
    Definition.prototype.toString = function () {
        switch (this.definition.kind) {
            case 'ObjectTypeDefinition':
            case 'ObjectTypeExtension': return new TyepDefinition_1.TypeDefinition(this.definition).toString();
        }
        return '';
    };
    return Definition;
}());
exports.Definition = Definition;
