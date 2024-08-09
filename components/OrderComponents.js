import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// import { getWallet } from "@/utils/order";
const OrderComponent = ({
  symbol,
  description,
  title,
  tokenID,
  price,
  side,
  size,
}) => {
  const [order, setOrder] = useState({
    tokenID: tokenID,
    price: price,
    side: side,
    size: size,
  });

  const fetchOrder = async () => {
    const response = await fetch("/api/polymarket/order", {
      method: "POST",
      body: JSON.stringify({
        // coin: symbol,
        order,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data) alert(JSON.stringify(data.data.resp));
  };
  return (
    <div>
      {" "}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="none"
            className={`${
              title === "Buy / Sell" && "bg-blue-700 text-white"
            } w-full`}
          >
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{symbol}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="grid gap-2">
              <div className="grid items-center gap-4">
                <Label htmlFor="width">Limit Price ¢</Label>
              </div>
              <div className="grid  items-center gap-4 relative">
                {/* <p className="absolute right-2 mt-0.5">¢</p> */}
                <Input
                  id="price"
                  className=" h-10 text-center "
                  type="Number"
                  value={order.price}
                  onChange={(e) =>
                    setOrder((prev) => ({ ...prev, price: e.target.value }))
                  }
                />
              </div>

              <div className="grid items-center gap-4 mt-4">
                <Label htmlFor="maxWidth">Shares</Label>
              </div>

              <div className="grid items-center gap-4 ">
                <Input
                  id="size"
                  className=" h-12 text-center"
                  type="Number"
                  value={order.size}
                  onChange={(e) =>
                    setOrder((prev) => ({ ...prev, size: e.target.value }))
                  }
                />
                {order.size < 5 && (
                  <p className="text-red-500 underline">
                    Minimum 5 shares for limit orders
                  </p>
                )}
              </div>

              <div className="grid items-center gap-4 mt-2 ">
                <Button
                  disabled={
                    order.size < 5 ||
                    order.price == 0 ||
                    order.size === undefined
                  }
                  onClick={fetchOrder}
                  className="bg-blue-700 hover:bg-blue-600 text-white "
                >
                  Buy
                </Button>
              </div>

              <div className="grid grid-cols-2 items-center gap-4 ">
                <p>Total</p>
                <p className="text-right text-blue-700">
                  {" "}
                  ${((order.price * order.size) / 100)?.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 items-center gap-4 ">
                <p>Potential return</p>
                <p className="text-right text-green-500">
                  $ {order.size}({(100 / order.price)?.toFixed(3)})%
                </p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default OrderComponent;
