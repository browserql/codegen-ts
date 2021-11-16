"use strict";
exports.__esModule = true;
exports.Type = void 0;
var kind_1 = require("@browserql/fpql/parse/kind");
var emitter_1 = require("../emitter");
var Type = /** @class */ (function () {
    function Type(type) {
        this.type = type;
        this.kind = (0, kind_1["default"])(type);
    }
    Type.prototype.getKind = function () {
        if (this.kind.type === "String" || this.kind.type === "ID") {
            return "string";
        }
        if (this.kind.type === "Int" || this.kind.type === "Float") {
            return "number";
        }
        if (this.kind.type === "Boolean") {
            return "boolean";
        }
        if (this.kind.type === "Date") {
            return "Date";
        }
        return "";
    };
    Type.prototype.toString = function () {
        var parsed = (0, kind_1["default"])(this.type);
        var type = this.getKind();
        var final = type;
        if (!final) {
            emitter_1.emitter.emit('unknown', this.kind.type);
            final = this.kind.type;
        }
        for (var i = 0; i < parsed.depth; i++) {
            final = "Array<" + final + (parsed.nestedRequired[i] ? '' : ' | null') + ">";
        }
        if (!parsed.required) {
            final = final + " | null";
        }
        return final;
    };
    return Type;
}());
exports.Type = Type;
