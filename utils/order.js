"use server";
import { ethers } from "ethers";
import { ClobClient } from "@polymarket/clob-client";
import { SignatureType } from "@polymarket/order-utils";
import moment from "moment";
const host = "https://clob.polymarket.com" || "http://localhost:8080";

export const getWallet = async () => {
  let privateKey =
    "ea1cda17b9042bf524b12d42c14b89194363a15a309752b60a7414195624e7fb";
  let wallet = new ethers.Wallet(privateKey);
  const clobClient = new ClobClient(host, 137, wallet);

  //   const domain = {
  //     name: "ClobAuthDomain",
  //     version: "1",
  //     chainId: chainId, // Polygon ChainID 137
  //   };

  //   const types = {
  //     ClobAuth: [
  //       { name: "address", type: "address" },
  //       { name: "timestamp", type: "string" },
  //       { name: "nonce", type: "uint256" },
  //       { name: "message", type: "string" },
  //     ],
  //   };
  //   const value = {
  //     address: wallet.address, // the Signing address
  //     timestamp: moment().unix(), // The CLOB API server timestamp
  //     nonce: nonce, // The nonce used
  //     message: "This message attests that I control the given wallet", // A static message indicating that the user controls the wallet
  //   };

  const creds = await clobClient.createApiKey();

  //   console.log("Address: " + wallet.address);

  console.log("Wallet: " + creds);
  return wallet.address;
};
