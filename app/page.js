"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";

import TableComponent from "@/components/TableComponents";

export default function Home() {
  return (
    <div className="m-12">
      <div className="flex justify-between gap-4">
        <TableComponent symbol={"BTC"} />
        <TableComponent symbol={"ETH"} />
        <TableComponent symbol={"SOL"} />
      </div>
    </div>
  );
}
