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
exports.__esModule = true;
exports.parseDropNotificationParams = exports.parseOrdersScoringParams = exports.del = exports.get = exports.post = exports.request = exports.PUT = exports.DELETE = exports.POST = exports.GET = void 0;
/* eslint-disable max-depth */
var axios_1 = require("axios");
var browser_or_node_1 = require("browser-or-node");
exports.GET = "GET";
exports.POST = "POST";
exports.DELETE = "DELETE";
exports.PUT = "PUT";
var overloadHeaders = function (method, headers) {
    if (browser_or_node_1.isBrowser) {
        return;
    }
    if (!headers || typeof headers === undefined) {
        headers = {};
    }
    if (headers) {
        headers["User-Agent"] = "@polymarket/clob-client";
        headers["Accept"] = "*/*";
        headers["Connection"] = "keep-alive";
        headers["Content-Type"] = "application/json";
        if (method === exports.GET) {
            headers["Accept-Encoding"] = "gzip";
        }
    }
};
var request = function (endpoint, method, headers, data, params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                overloadHeaders(method, headers);
                return [4 /*yield*/, (0, axios_1["default"])({ method: method, url: endpoint, headers: headers, data: data, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.request = request;
var post = function (endpoint, options) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, exports.request)(endpoint, exports.POST, options === null || options === void 0 ? void 0 : options.headers, options === null || options === void 0 ? void 0 : options.data, options === null || options === void 0 ? void 0 : options.params)];
            case 1:
                resp = _a.sent();
                return [2 /*return*/, resp.data];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, errorHandling(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.post = post;
var get = function (endpoint, options) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, exports.request)(endpoint, exports.GET, options === null || options === void 0 ? void 0 : options.headers, options === null || options === void 0 ? void 0 : options.data, options === null || options === void 0 ? void 0 : options.params)];
            case 1:
                resp = _a.sent();
                return [2 /*return*/, resp.data];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, errorHandling(err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get = get;
var del = function (endpoint, options) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, exports.request)(endpoint, exports.DELETE, options === null || options === void 0 ? void 0 : options.headers, options === null || options === void 0 ? void 0 : options.data, options === null || options === void 0 ? void 0 : options.params)];
            case 1:
                resp = _a.sent();
                return [2 /*return*/, resp.data];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, errorHandling(err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.del = del;
var errorHandling = function (err) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (axios_1["default"].isAxiosError(err)) {
        if (err.response) {
            console.error("[CLOB Client] request error", JSON.stringify({
                status: (_a = err.response) === null || _a === void 0 ? void 0 : _a.status,
                statusText: (_b = err.response) === null || _b === void 0 ? void 0 : _b.statusText,
                data: (_c = err.response) === null || _c === void 0 ? void 0 : _c.data,
                config: (_d = err.response) === null || _d === void 0 ? void 0 : _d.config
            }));
            if ((_e = err.response) === null || _e === void 0 ? void 0 : _e.data) {
                if (typeof ((_f = err.response) === null || _f === void 0 ? void 0 : _f.data) === "string" ||
                    ((_g = err.response) === null || _g === void 0 ? void 0 : _g.data) instanceof String) {
                    return { error: (_h = err.response) === null || _h === void 0 ? void 0 : _h.data };
                }
                if (!Object.prototype.hasOwnProperty.call((_j = err.response) === null || _j === void 0 ? void 0 : _j.data, "error")) {
                    return { error: (_k = err.response) === null || _k === void 0 ? void 0 : _k.data };
                }
                // in this case the field 'error' is included
                return (_l = err.response) === null || _l === void 0 ? void 0 : _l.data;
            }
        }
        if (err.message) {
            console.error("[CLOB Client] request error", JSON.stringify({
                error: err.message
            }));
            return { error: err.message };
        }
    }
    console.error("[CLOB Client] request error", err);
    return { error: err };
};
var parseOrdersScoringParams = function (orderScoringParams) {
    var params = {};
    if (orderScoringParams !== undefined) {
        if (orderScoringParams.orderIds !== undefined) {
            params["order_ids"] = orderScoringParams === null || orderScoringParams === void 0 ? void 0 : orderScoringParams.orderIds.join(",");
        }
    }
    return params;
};
exports.parseOrdersScoringParams = parseOrdersScoringParams;
var parseDropNotificationParams = function (dropNotificationParams) {
    var params = {};
    if (dropNotificationParams !== undefined) {
        if (dropNotificationParams.ids !== undefined) {
            params["ids"] = dropNotificationParams === null || dropNotificationParams === void 0 ? void 0 : dropNotificationParams.ids.join(",");
        }
    }
    return params;
};
exports.parseDropNotificationParams = parseDropNotificationParams;
