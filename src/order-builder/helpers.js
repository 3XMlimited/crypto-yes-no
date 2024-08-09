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
exports.calculateMarketPrice = exports.createMarketBuyOrder = exports.buildMarketBuyOrderCreationArgs = exports.getMarketBuyOrderRawAmounts = exports.createOrder = exports.buildOrderCreationArgs = exports.getOrderRawAmounts = exports.buildOrder = exports.ROUNDING_CONFIG = void 0;
var units_1 = require("@ethersproject/units");
var order_utils_1 = require("@polymarket/order-utils");
var types_1 = require("../types");
var utilities_1 = require("../utilities");
var config_1 = require("../config");
exports.ROUNDING_CONFIG = {
    "0.1": {
        price: 1,
        size: 2,
        amount: 3
    },
    "0.01": {
        price: 2,
        size: 2,
        amount: 4
    },
    "0.001": {
        price: 3,
        size: 2,
        amount: 5
    },
    "0.0001": {
        price: 4,
        size: 2,
        amount: 6
    }
};
/**
 * Generate and sign a order
 *
 * @param signer
 * @param exchangeAddress ctf exchange contract address
 * @param chainId
 * @param OrderData
 * @returns SignedOrder
 */
var buildOrder = function (signer, exchangeAddress, chainId, orderData) { return __awaiter(void 0, void 0, void 0, function () {
    var cTFExchangeOrderBuilder;
    return __generator(this, function (_a) {
        cTFExchangeOrderBuilder = new order_utils_1.ExchangeOrderBuilder(exchangeAddress, chainId, signer);
        return [2 /*return*/, cTFExchangeOrderBuilder.buildSignedOrder(orderData)];
    });
}); };
exports.buildOrder = buildOrder;
var getOrderRawAmounts = function (side, size, price, roundConfig) {
    var rawPrice = (0, utilities_1.roundNormal)(price, roundConfig.price);
    if (side === types_1.Side.BUY) {
        // force 2 decimals places
        var rawTakerAmt = (0, utilities_1.roundDown)(size, roundConfig.size);
        var rawMakerAmt = rawTakerAmt * rawPrice;
        if ((0, utilities_1.decimalPlaces)(rawMakerAmt) > roundConfig.amount) {
            rawMakerAmt = (0, utilities_1.roundUp)(rawMakerAmt, roundConfig.amount + 4);
            if ((0, utilities_1.decimalPlaces)(rawMakerAmt) > roundConfig.amount) {
                rawMakerAmt = (0, utilities_1.roundDown)(rawMakerAmt, roundConfig.amount);
            }
        }
        return {
            side: order_utils_1.Side.BUY,
            rawMakerAmt: rawMakerAmt,
            rawTakerAmt: rawTakerAmt
        };
    }
    else {
        var rawMakerAmt = (0, utilities_1.roundDown)(size, roundConfig.size);
        var rawTakerAmt = rawMakerAmt * rawPrice;
        if ((0, utilities_1.decimalPlaces)(rawTakerAmt) > roundConfig.amount) {
            rawTakerAmt = (0, utilities_1.roundUp)(rawTakerAmt, roundConfig.amount + 4);
            if ((0, utilities_1.decimalPlaces)(rawTakerAmt) > roundConfig.amount) {
                rawTakerAmt = (0, utilities_1.roundDown)(rawTakerAmt, roundConfig.amount);
            }
        }
        return {
            side: order_utils_1.Side.SELL,
            rawMakerAmt: rawMakerAmt,
            rawTakerAmt: rawTakerAmt
        };
    }
};
exports.getOrderRawAmounts = getOrderRawAmounts;
/**
 * Translate simple user order to args used to generate Orders
 */
var buildOrderCreationArgs = function (signer, maker, signatureType, userOrder, roundConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, side, rawMakerAmt, rawTakerAmt, makerAmount, takerAmount, taker, feeRateBps, nonce;
    return __generator(this, function (_b) {
        _a = (0, exports.getOrderRawAmounts)(userOrder.side, userOrder.size, userOrder.price, roundConfig), side = _a.side, rawMakerAmt = _a.rawMakerAmt, rawTakerAmt = _a.rawTakerAmt;
        makerAmount = (0, units_1.parseUnits)(rawMakerAmt.toString(), config_1.COLLATERAL_TOKEN_DECIMALS).toString();
        takerAmount = (0, units_1.parseUnits)(rawTakerAmt.toString(), config_1.CONDITIONAL_TOKEN_DECIMALS).toString();
        if (typeof userOrder.taker !== "undefined" && userOrder.taker) {
            taker = userOrder.taker;
        }
        else {
            taker = "0x0000000000000000000000000000000000000000";
        }
        if (typeof userOrder.feeRateBps !== "undefined" && userOrder.feeRateBps) {
            feeRateBps = userOrder.feeRateBps.toString();
        }
        else {
            feeRateBps = "0";
        }
        if (typeof userOrder.nonce !== "undefined" && userOrder.nonce) {
            nonce = userOrder.nonce.toString();
        }
        else {
            nonce = "0";
        }
        return [2 /*return*/, {
                maker: maker,
                taker: taker,
                tokenId: userOrder.tokenID,
                makerAmount: makerAmount,
                takerAmount: takerAmount,
                side: side,
                feeRateBps: feeRateBps,
                nonce: nonce,
                signer: signer,
                expiration: (userOrder.expiration || 0).toString(),
                signatureType: signatureType
            }];
    });
}); };
exports.buildOrderCreationArgs = buildOrderCreationArgs;
var createOrder = function (eoaSigner, chainId, signatureType, funderAddress, userOrder, options) { return __awaiter(void 0, void 0, void 0, function () {
    var eoaSignerAddress, maker, contractConfig, orderData, exchangeContract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, eoaSigner.getAddress()];
            case 1:
                eoaSignerAddress = _a.sent();
                maker = funderAddress === undefined ? eoaSignerAddress : funderAddress;
                contractConfig = (0, config_1.getContractConfig)(chainId);
                return [4 /*yield*/, (0, exports.buildOrderCreationArgs)(eoaSignerAddress, maker, signatureType, userOrder, exports.ROUNDING_CONFIG[options.tickSize])];
            case 2:
                orderData = _a.sent();
                exchangeContract = options.negRisk
                    ? contractConfig.negRiskExchange
                    : contractConfig.exchange;
                return [2 /*return*/, (0, exports.buildOrder)(eoaSigner, exchangeContract, chainId, orderData)];
        }
    });
}); };
exports.createOrder = createOrder;
var getMarketBuyOrderRawAmounts = function (amount, price, roundConfig) {
    // force 2 decimals places
    var rawMakerAmt = (0, utilities_1.roundDown)(amount, roundConfig.size);
    var rawPrice = (0, utilities_1.roundDown)(price, roundConfig.price);
    var rawTakerAmt = rawMakerAmt / rawPrice;
    if ((0, utilities_1.decimalPlaces)(rawTakerAmt) > roundConfig.amount) {
        rawTakerAmt = (0, utilities_1.roundUp)(rawTakerAmt, roundConfig.amount + 4);
        if ((0, utilities_1.decimalPlaces)(rawTakerAmt) > roundConfig.amount) {
            rawTakerAmt = (0, utilities_1.roundDown)(rawTakerAmt, roundConfig.amount);
        }
    }
    return {
        rawMakerAmt: rawMakerAmt,
        rawTakerAmt: rawTakerAmt
    };
};
exports.getMarketBuyOrderRawAmounts = getMarketBuyOrderRawAmounts;
/**
 * Translate simple user market order to args used to generate Orders
 */
var buildMarketBuyOrderCreationArgs = function (signer, maker, signatureType, userMarketOrder, roundConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rawMakerAmt, rawTakerAmt, makerAmount, takerAmount, taker, feeRateBps, nonce;
    return __generator(this, function (_b) {
        _a = (0, exports.getMarketBuyOrderRawAmounts)(userMarketOrder.amount, userMarketOrder.price || 1, roundConfig), rawMakerAmt = _a.rawMakerAmt, rawTakerAmt = _a.rawTakerAmt;
        makerAmount = (0, units_1.parseUnits)(rawMakerAmt.toString(), config_1.COLLATERAL_TOKEN_DECIMALS).toString();
        takerAmount = (0, units_1.parseUnits)(rawTakerAmt.toString(), config_1.CONDITIONAL_TOKEN_DECIMALS).toString();
        if (typeof userMarketOrder.taker !== "undefined" && userMarketOrder.taker) {
            taker = userMarketOrder.taker;
        }
        else {
            taker = "0x0000000000000000000000000000000000000000";
        }
        if (typeof userMarketOrder.feeRateBps !== "undefined" && userMarketOrder.feeRateBps) {
            feeRateBps = userMarketOrder.feeRateBps.toString();
        }
        else {
            feeRateBps = "0";
        }
        if (typeof userMarketOrder.nonce !== "undefined" && userMarketOrder.nonce) {
            nonce = userMarketOrder.nonce.toString();
        }
        else {
            nonce = "0";
        }
        return [2 /*return*/, {
                maker: maker,
                taker: taker,
                tokenId: userMarketOrder.tokenID,
                makerAmount: makerAmount,
                takerAmount: takerAmount,
                side: order_utils_1.Side.BUY,
                feeRateBps: feeRateBps,
                nonce: nonce,
                signer: signer,
                expiration: "0",
                signatureType: signatureType
            }];
    });
}); };
exports.buildMarketBuyOrderCreationArgs = buildMarketBuyOrderCreationArgs;
var createMarketBuyOrder = function (eoaSigner, chainId, signatureType, funderAddress, userMarketOrder, options) { return __awaiter(void 0, void 0, void 0, function () {
    var eoaSignerAddress, maker, contractConfig, orderData, exchangeContract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, eoaSigner.getAddress()];
            case 1:
                eoaSignerAddress = _a.sent();
                maker = funderAddress === undefined ? eoaSignerAddress : funderAddress;
                contractConfig = (0, config_1.getContractConfig)(chainId);
                return [4 /*yield*/, (0, exports.buildMarketBuyOrderCreationArgs)(eoaSignerAddress, maker, signatureType, userMarketOrder, exports.ROUNDING_CONFIG[options.tickSize])];
            case 2:
                orderData = _a.sent();
                exchangeContract = options.negRisk
                    ? contractConfig.negRiskExchange
                    : contractConfig.exchange;
                return [2 /*return*/, (0, exports.buildOrder)(eoaSigner, exchangeContract, chainId, orderData)];
        }
    });
}); };
exports.createMarketBuyOrder = createMarketBuyOrder;
var calculateMarketPrice = function (positions, amountToMatch) {
    var sum = 0;
    for (var i = 0; i < positions.length; i++) {
        var p = positions[i];
        sum += parseFloat(p.size) * parseFloat(p.price);
        if (sum >= amountToMatch) {
            return parseFloat(p.price);
        }
    }
    throw new Error("no match");
};
exports.calculateMarketPrice = calculateMarketPrice;
