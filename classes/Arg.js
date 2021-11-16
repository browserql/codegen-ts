"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arg = void 0;
var kind_1 = __importDefault(require("@browserql/fpql/get/kind"));
var kind_2 = __importDefault(require("@browserql/fpql/parse/kind"));
var Name_1 = require("./Name");
var Type_1 = require("./Type");
var Arg = /** @class */ (function () {
    function Arg(arg) {
        this.arg = arg;
    }
    Arg.prototype.toString = function () {
        var kind = (0, kind_1.default)(this.arg);
        var parsed = (0, kind_2.default)(kind);
        var type = new Type_1.Type(kind);
        return "" + new Name_1.Name(this.arg.name) + (parsed.required ? '' : '?') + ": " + type;
    };
    return Arg;
}());
exports.Arg = Arg;
