"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";

import TableComponent from "@/components/TableComponents";

export default function Home() {
  // const [pages, setPages] = useState({});

  // useEffect(() => {

  // }, []);
  return (
    <div className="m-12">
      <div className="flex justify-between gap-4">
        <TableComponent index={"1"} />
        <TableComponent index={"2"} />
        <TableComponent index={"3"} />
        {/* <TableComponent symbol={"ETH"} />
        <TableComponent symbol={"SOL"} /> */}
      </div>
    </div>
  );
}
