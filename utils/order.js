"use server";
import { ethers } from "ethers";
import { ClobClient } from "@polymarket/clob-client";
import { SignatureType } from "@polymarket/order-utils";
import moment from "moment";
const host = "https://clob.polymarket.com" || "http://localhost:3000";

export const getWallet = async () => {
  let provider = ethers.getDefaultProvider();
  console.log(provider);
  let wallet = new ethers.Wallet(process.env.PK, provider);

  const clobClient = new ClobClient(host, 137, wallet, undefined);

  console.log(wallet.address);
  console.log(clobClient);

  console.log(`Response: `);
  // const resp = await clobClient.createApiKey();
  console.log(resp);
  console.log(`Complete!`);

  return wallet.address;
};
