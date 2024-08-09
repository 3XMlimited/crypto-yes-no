"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";

import TableComponent from "@/components/TableComponents";
// import OrderComponent from "@/components/OrderComponents";

export default function Home() {
  // const [pages, setPages] = useState({});

  const [wallet, setWallet] = useState({
    address: "",
    balance: 0,
  });
  useEffect(() => {
    const fetchWallet = async () => {
      const response = await fetch("/api/polymarket/order", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setWallet((prev) => ({ ...prev, address: data.data.address }));
    };
    fetchWallet();
  }, []);
  return (
    <div className="m-12">
      <div className="mt-5 flex  items-center text-gray-700 font-mono  gap-2">
        <div className="rounded-full bg-blue-500 w-12 h-12"></div>
        <p>{wallet.address}</p>
      </div>

      <div className="flex justify-between gap-4">
        <TableComponent index={"1"} />
        <TableComponent index={"2"} />
        <TableComponent index={"3"} />
        {/* <OrderComponent /> */}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
