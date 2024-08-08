"use client";

import moment from "moment";
// import React, { useEffect, useState } from "react";

import TableComponent from "@/components/TableComponents";
// import OrderComponent from "@/components/OrderComponents";

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
        {/* <OrderComponent /> */}
      </div>
    </div>
  );
}
