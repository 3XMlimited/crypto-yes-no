"use strict";
exports.__esModule = true;
exports.priceValid = exports.isTickSizeSmaller = exports.generateOrderBookSummaryHash = exports.decimalPlaces = exports.roundUp = exports.roundDown = exports.roundNormal = exports.orderToJson = void 0;
var order_utils_1 = require("@polymarket/order-utils");
var crypto_1 = require("crypto");
var types_1 = require("./types");
function orderToJson(order, owner, orderType) {
    var side = types_1.Side.BUY;
    if (order.side == order_utils_1.Side.BUY) {
        side = types_1.Side.BUY;
    }
    else {
        side = types_1.Side.SELL;
    }
    return {
        order: {
            salt: parseInt(order.salt, 10),
            maker: order.maker,
            signer: order.signer,
            taker: order.taker,
            tokenId: order.tokenId,
            makerAmount: order.makerAmount,
            takerAmount: order.takerAmount,
            side: side,
            expiration: order.expiration,
            nonce: order.nonce,
            feeRateBps: order.feeRateBps,
            signatureType: order.signatureType,
            signature: order.signature
        },
        owner: owner,
        orderType: orderType
    };
}
exports.orderToJson = orderToJson;
var roundNormal = function (num, decimals) {
    if ((0, exports.decimalPlaces)(num) <= decimals) {
        return num;
    }
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundNormal = roundNormal;
var roundDown = function (num, decimals) {
    if ((0, exports.decimalPlaces)(num) <= decimals) {
        return num;
    }
    return Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundDown = roundDown;
var roundUp = function (num, decimals) {
    if ((0, exports.decimalPlaces)(num) <= decimals) {
        return num;
    }
    return Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundUp = roundUp;
var decimalPlaces = function (num) {
    if (Number.isInteger(num)) {
        return 0;
    }
    var arr = num.toString().split(".");
    if (arr.length <= 1) {
        return 0;
    }
    return arr[1].length;
};
exports.decimalPlaces = decimalPlaces;
/**
 * Calculates the hash for the given orderbook
 * @param orderbook
 * @returns
 */
var generateOrderBookSummaryHash = function (orderbook) {
    orderbook.hash = "";
    var hash = (0, crypto_1.createHash)("sha1").update(JSON.stringify(orderbook)).digest("hex");
    orderbook.hash = hash;
    return hash;
};
exports.generateOrderBookSummaryHash = generateOrderBookSummaryHash;
var isTickSizeSmaller = function (a, b) {
    return parseFloat(a) < parseFloat(b);
};
exports.isTickSizeSmaller = isTickSizeSmaller;
var priceValid = function (price, tickSize) {
    return price >= parseFloat(tickSize) && price <= 1 - parseFloat(tickSize);
};
exports.priceValid = priceValid;
