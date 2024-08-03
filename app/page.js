"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TableDemo({ data, title, color, ab }) {
  return (
    <Table>
      <TableHeader>
        <TableCaption>{title} </TableCaption>
        <TableRow>
          <TableHead className="">PRICE</TableHead>

          <TableHead className="text-left">SIZE</TableHead>
          <TableHead className="text-left">TOTAL</TableHead>
          <TableHead className="text-left">Decimal</TableHead>
          <TableHead className="text-left">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.slice(-5)?.map((d, i) => (
          <TableRow key={i}>
            <TableCell className={`font-medium  w-[200px]`}>
              <p
                className={`${
                  color === "green" ? "text-green-500" : "text-red-500"
                } `}
              >
                {(Number(d.price) * 100).toFixed(1)}
              </p>
            </TableCell>
            <TableCell className="text-left w-[200px]">
              {Number(d.size)}
            </TableCell>
            <TableCell className="text-left w-[200px]">
              {(Number(d.price) * Number(d.size) * 100).toFixed(0)}
            </TableCell>

            <TableCell className="text-left w-[200px]">
              {(100 / (Number(d.price) * 100)).toFixed(3)}
            </TableCell>
            <TableCell className="text-left w-[200px]">
              {(ab[0] * (100 / (Number(d.price) * 100))).toFixed(3)},
              {(ab[1] * (100 / (Number(d.price) * 100))).toFixed(3)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-left">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  );
}

function ab(price, strike, time, value) {
  console.log(price, strike, time, value);
  let p = price;
  let q = strike;
  //   let t = time / 24 / 365;
  let t = time;
  let v = value / 100;

  let vt = v * Math.sqrt(t);
  let lnpq = Math.log(q / p);
  let d1 = lnpq / vt;

  let y = Math.floor((1 / (1 + 0.2316419 * Math.abs(d1))) * 100000) / 100000;
  let z = Math.floor(0.3989423 * Math.exp(-((d1 * d1) / 2)) * 100000) / 100000;
  let y5 = 1.330274 * Math.pow(y, 5);
  let y4 = 1.821256 * Math.pow(y, 4);
  let y3 = 1.781478 * Math.pow(y, 3);
  let y2 = 0.356538 * Math.pow(y, 2);
  let y1 = 0.3193815 * y;
  let x = 1 - z * (y5 - y4 + y3 - y2 + y1);
  x = Math.floor(x * 100000) / 100000;

  if (d1 < 0) x = 1 - x;

  let pabove = Math.floor(x * 1000) / 10;
  let pbelow = Math.floor((1 - x) * 1000) / 10;

  return [pabove, pbelow];
}

export default function Home() {
  const [orderbook, setOrderbook] = useState({});
  const [event, setEvent] = useState({});
  const [price, setPrice] = useState("");
  const [old_price, setOldPrice] = useState("");
  const [color, setColor] = useState("black");
  const [dvol, setDvol] = useState("");
  const [aB, setAB] = useState([]);
  const [symbol, setSymbol] = useState("BTC");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/polymarket", {
        method: "POST",
        body: JSON.stringify({
          coin: symbol,
        }),
      });
      const data = await response.json();
      // console.log(data);
      let result = data.orderbook;
      result.bids = result.bids.reverse();
      setEvent(data.events);
      setOrderbook(result);
      setPrice(Number(data.price).toFixed(0));
      setDvol(Number(data.dvol).toFixed(2));
      let dateOne = moment(
        moment(data.events?.endDate).format("YYYY-MM-DD 23:59:59")
      );
      let dateTwo = moment();
      console.log(dateOne, dateTwo);
      // Function call
      let different = dateOne.diff(dateTwo, "hours");
      const abrove_below = await ab(
        Number(data.price),
        Number(
          data.events?.title
            ?.split(" ")
            .find((r) => r.includes("$"))
            .replace(",", "")
            .replace("$", "")
        ),
        different / 24 / 365,
        // (moment(
        //   moment(data.event?.endDate).format("YYYY-MM-DD 23:59:59")
        // ).unix() -
        //   moment().unix()) /
        //   1000 /
        //   60 /
        //   24,
        data.dvol
      );
      setAB(abrove_below);
      console.log(data);
      // return result;
    };

    // fetchData();
    setIsLoading(true);
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    setIsLoading(false);
    return () => {
      clearInterval(intervalId); //This is important
    };
  }, [symbol]);

  useEffect(() => {
    if (price > old_price) {
      setColor("green");
    } else if (price === old_price) {
      setColor("black");
    } else {
      setColor("red");
    }
    setOldPrice(price);
  }, [price]);

  return (
    <div className="m-12">
      <div className="flex justify-start fixed top-[10px]">
        <div className="flex justify-between w-full gap-4">
          <button
            className={`p-10 bg-white shadow-md font-bold text-[24px] ${
              symbol === "BTC" ? "text-blue-500" : "text-black"
            }`}
            onClick={() => setSymbol("BTC")}
          >
            BTC
          </button>
          <button
            className={` p-10 bg-white shadow-md font-bold text-[24px] ${
              symbol === "ETH" ? "text-blue-500" : "text-black"
            }`}
            onClick={() => setSymbol("ETH")}
          >
            ETH
          </button>
          <button
            className={` p-10 bg-white shadow-md font-bold text-[24px] ${
              symbol === "SOL" ? "text-blue-500" : "text-black"
            }`}
            onClick={() => setSymbol("SOL")}
          >
            SOL
          </button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between mt-[200px]">
            <div className="fold-bold text-[36px]">{event?.title}</div>
          </div>
          <div>
            <div className="flex justify-between">
              <div className=" bg-white shadow-md rounded-md p-10">
                <div>Price </div>
                <div
                  className={`${
                    color === "green"
                      ? "text-green-500"
                      : color === "red"
                      ? "text-red-500"
                      : "text-black"
                  } font-bold`}
                >
                  {price}
                </div>
              </div>

              <div className=" bg-white shadow-md rounded-md p-10">
                <div>Target</div>
                <div className="font-bold">
                  {event?.title?.split(" ").find((r) => r.includes("$"))}
                </div>
              </div>
              <div className=" bg-white shadow-md rounded-md p-10">
                <div>DVOL</div>
                <div className="font-bold">{dvol}</div>
              </div>

              <div className=" bg-white shadow-md rounded-md p-10">
                <div>RESULT</div>

                <div className="font-bold">{aB.toString()}</div>
              </div>
              <div className=" bg-white shadow-md rounded-md p-10 flex justify-center items-center font-bold">
                {moment(moment(event?.endDate).format("YYYY-MM-DD 23:59:59"))
                  .endOf("H")
                  .fromNow()}
              </div>
            </div>
          </div>
          <TableDemo data={orderbook?.asks} title={"ASK"} color="red" ab={aB} />
          <TableDemo
            data={orderbook?.bids?.slice(0, 5)}
            title={"BID"}
            color="green"
            ab={aB}
          />
        </>
      )}
    </div>
  );
}
