// import React from "react";

import { getWallet } from "@/utils/order";
const OrderComponent = async () => {
  //   await clobClient();

  const data = await getWallet();
  console.log(data);
  return <div>OrderComponents</div>;
};

export default OrderComponent;
