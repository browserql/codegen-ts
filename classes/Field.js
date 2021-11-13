"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
var kind_1 = __importDefault(require("@browserql/fpql/get/kind"));
var kind_2 = __importDefault(require("@browserql/fpql/parse/kind"));
var Arg_1 = require("./Arg");
var Name_1 = require("./Name");
var Type_1 = require("./Type");
var Field = /** @class */ (function () {
    function Field(field) {
        this.field = field;
    }
    Field.prototype.toString = function () {
        var _a = this.field.arguments, args = _a === void 0 ? [] : _a;
        var kind = (0, kind_1.default)(this.field);
        var parsed = (0, kind_2.default)(kind);
        var type = new Type_1.Type(kind);
        return "" + new Name_1.Name(this.field.name) + (parsed.required ? '' : '?') + (args.length ? "(variables: {" + args.map(function (arg) { return new Arg_1.Arg(arg); }) + "})" : '') + ": " + (args.length ? "Promise<" + type + ">" : type) + "; // " + kind;
    };
    return Field;
}());
exports.Field = Field;
