"use server";
import { ethers } from "ethers";
import { Side, OrderType, ClobClient } from "../src";
import { SignatureType } from "@polymarket/order-utils";
import moment from "moment";
const host = "https://clob.polymarket.com" || "http://localhost:3000";

export const getWallet = async () => {
  let provider = ethers.getDefaultProvider();
  console.log(provider);
  let Wallet = new ethers.Wallet(process.env.PK, provider);

  const creds = {
    key: `${process.env.CLOB_API_KEY}`,
    secret: `${process.env.CLOB_SECRET}`,
    passphrase: `${process.env.CLOB_PASS_PHRASE}`,
  };
  const chainId = 137;
  console.log(`Address: ${await Wallet.getAddress()}, chainId: ${chainId}`);
  const clobClient = new ClobClient(host, chainId, Wallet, creds);
  console.log(clobClient);
  console.log(`Response: `);

  const YES =
    "77316104995725437081111737608694475714207012802290598663859834462864327272644";
  const order = await clobClient.createOrder(
    {
      tokenID: YES,
      price: 0.5,
      side: Side.BUY,
      size: 100,
      feeRateBps: 0,
    },
    { tickSize: "0.01" }
  );
  console.log("Created Order", order);

  // Send it to the server
  const resp = await clobClient.postOrder(order);
  console.log(resp);

  console.log(`Complete!`);

  return Wallet.address;
};
