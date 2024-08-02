// "use server";
import { useState, useEffect } from "react";
function api(msg) {
  //   console.log(msg.p);

  // "return"ing a value doesn't do anything, it is unneeded.
  return msg.p;
}

function getPrice() {
  let uri = "wss://stream.binance.com:9443/ws/btcusdt@trade";
  let ws = new WebSocket(uri);

  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
  };
}

module.exports = {
  getPrice,
};
