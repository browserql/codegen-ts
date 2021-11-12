"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var queries_1 = __importDefault(require("@browserql/fpql/get/queries"));
var name_1 = __importDefault(require("@browserql/fpql/get/name"));
var types_1 = __importDefault(require("@browserql/fpql/get/types"));
var fields_1 = __importDefault(require("@browserql/fpql/get/fields"));
var kind_1 = __importDefault(require("@browserql/fpql/get/kind"));
var kind_2 = __importDefault(require("@browserql/fpql/parse/kind"));
var arguments_1 = __importDefault(require("@browserql/fpql/get/arguments"));
function tsKindType(type) {
    if (type === 'String' || type === 'ID') {
        return 'string';
    }
    if (type === 'Int' || type === 'Float') {
        return 'number';
    }
    if (type === 'Boolean') {
        return 'boolean';
    }
    if (type === 'Date') {
        return 'Date';
    }
}
function tsKind(kind) {
    var parsed = (0, kind_2.default)(kind);
    var type = tsKindType(parsed.type);
    var arrays = '';
    for (var i = 0; i < parsed.depth; i++) {
        arrays += '[]';
    }
    return "" + type + arrays;
}
function handler(_a) {
    var document = _a.document;
    return __awaiter(this, void 0, void 0, function () {
        var types, typesToInterfaces, queries, queriesTs;
        return __generator(this, function (_b) {
            types = (0, types_1.default)(document);
            typesToInterfaces = types.map(function (type) {
                var typeName = (0, name_1.default)(type);
                var fields = (0, fields_1.default)(type);
                return "export interface " + typeName + " {\n      " + fields.map(function (field) {
                    var fieldName = (0, name_1.default)(field);
                    var kind = (0, kind_1.default)(field);
                    var parsed = (0, kind_2.default)(kind);
                    return "" + fieldName + (parsed.required ? '' : '?') + ": " + tsKind(kind);
                }).join('\n') + "\n    }";
            });
            queries = (0, queries_1.default)(document);
            queriesTs = queries.map(function (query) {
                var queryName = (0, name_1.default)(query);
                var args = (0, arguments_1.default)(query);
                return queryName + "(\n      " + args.map(function (arg) {
                    var argName = (0, name_1.default)(arg);
                    // @ts-ignore
                    var kind = (0, kind_1.default)(arg);
                    var parsed = (0, kind_2.default)(kind);
                    return "" + argName + (parsed.required ? '' : '?') + ": " + tsKind(kind);
                }).join('\n') + "\n    ): Promise<any>";
            });
            return [2 /*return*/, __spreadArray(__spreadArray([], typesToInterfaces, true), [
                    "export interface Query {\n      " + queriesTs.join('\n') + "\n    }"
                ], false).join('\n')];
        });
    });
}
exports.handler = handler;
