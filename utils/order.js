"use server";
import { ethers } from "ethers";
import { ClobClient } from "@polymarket/clob-client";
import { SignatureType } from "@polymarket/order-utils";
import moment from "moment";
const host = "https://clob.polymarket.com";

export const getWallet = async () => {
  let privateKey =
    "d88d128cf16166d5b201ed357c6cf6d8829c5abc057621c350698ffa889c8398";
  let wallet = new ethers.Wallet(privateKey);
  const clobClient = new ClobClient(host, 137, wallet);
  const apiKeys = await clobClient.getApiKeys();
  console.og(apiKeys);
  // const domain = {
  //   name: "ClobAuthDomain",
  //   version: "1",
  //   chainId: 137, // Polygon ChainID 137
  // };

  // console.log(wallet.address);
  // const types = {
  //   ClobAuth: [
  //     { name: "address", type: "address" },
  //     { name: "timestamp", type: "string" },
  //     { name: "nonce", type: "uint256" },
  //     { name: "message", type: "string" },
  //   ],
  // };
  // const value = {
  //   address: wallet.address, // the Signing address
  //   timestamp: moment().unix(), // The CLOB API server timestamp
  //   nonce: 0, // The nonce used
  //   message: "This message attests that I control the given wallet", // A static message indicating that the user controls the wallet
  // };
  const sig = await signer._signTypedData(domain, types, value);
  console.log(sig);

  // console.log("Wallet: " + creds);
  return wallet.address;
};
