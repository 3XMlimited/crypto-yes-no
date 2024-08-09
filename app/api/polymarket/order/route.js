import axios from "axios";
// import { headers } from "next/headers";

import { ethers } from "ethers";
import { Side, OrderType, ClobClient } from "../../../../src";
import moment from "moment";
const host = "https://clob.polymarket.com" || "http://localhost:3000";

let provider = ethers.getDefaultProvider();
let Wallet = new ethers.Wallet(process.env.PK, provider);

const createOrder = async (order) => {
  // console.log(order);

  const creds = {
    key: `${process.env.CLOB_API_KEY}`,
    secret: `${process.env.CLOB_SECRET}`,
    passphrase: `${process.env.CLOB_PASS_PHRASE}`,
  };
  const chainId = 137;
  console.log(`Address: ${await Wallet.getAddress()}, chainId: ${chainId}`);
  const clobClient = new ClobClient(host, chainId, Wallet, creds);

  console.log((order.price / 100).toFixed(2));
  let price = Number((order.price / 100).toFixed(2));
  if (price > 0.99) {
    price = 0.99;
  }

  const orders = await clobClient.createOrder(
    {
      tokenID: order.tokenID,
      price: price, // 0.5,
      side: order.side ? Side.BUY : Side.SELL,
      size: Number(order.size),
      feeRateBps: 0,
    },
    { tickSize: "0.01" }
  );
  // console.log("Created Order", orders);

  // Send it to the server
  const resp = await clobClient.postOrder(orders);
  console.log(resp);

  console.log(`Complete!`);

  return { order: orders, resp };
};

const getBalance = async () => {
  // const balance = await Wallet.getBalance();
  const address = await Wallet.getAddress();
  return { address };
};
export const POST = async (req, { params }) => {
  try {
    const { order } = await req.json();
    console.log("order:", order);
    const data = await createOrder(order);
    //
    return new Response(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get polymarket", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    const data = await getBalance();
    return new Response(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get polymarket", { status: 500 });
  }
};

// const getInstrument = async (coinId) => {
//   const start = Date.now();
//   const req = await axios.get(
//     `https://www.deribit.com/api/v2/public/get_instruments?currency=SOL&kind=option`
//   );
//   try {
//     const obj = req?.data;
//     console.log(obj);
//   } catch (err) {
//     console.log(err.data);
//   }
// };
// getInstrument();
