"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
var Name = /** @class */ (function () {
    function Name(name) {
        this.name = name;
    }
    Name.prototype.toString = function () {
        return this.name.value;
    };
    return Name;
}());
exports.Name = Name;
