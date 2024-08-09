"use strict";
exports.__esModule = true;
exports.buildPolyHmacSignature = void 0;
var crypto_1 = require("crypto");
function replaceAll(s, search, replace) {
  return s.split(search).join(replace);
}
/**
 * Builds the canonical Polymarket CLOB HMAC signature
 * @param signer
 * @param key
 * @param secret
 * @param passphrase
 * @returns string
 */
var buildPolyHmacSignature = function (
  secret,
  timestamp,
  method,
  requestPath,
  body
) {
  var message = timestamp + method + requestPath;
  if (body !== undefined) {
    message += body;
  }
  var base64Secret = Buffer.from(secret, "base64");
  var hmac = crypto_1.createHmac("sha256", base64Secret);
  //   var hmac = crypto_1["default"].createHmac("sha256", base64Secret);
  var sig = hmac.update(message).digest("base64");
  // NOTE: Must be url safe base64 encoding, but keep base64 "=" suffix
  // Convert '+' to '-'
  // Convert '/' to '_'
  var sigUrlSafe = replaceAll(replaceAll(sig, "+", "-"), "/", "_");
  return sigUrlSafe;
};
exports.buildPolyHmacSignature = buildPolyHmacSignature;
