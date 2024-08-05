import React, { useEffect, useState } from "react";
import moment from "moment";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

function TableDemo({ data, title, color, ab }) {
  return (
    <Table className="h-[400px]  border-b-2">
      <TableHeader className="">
        <TableCaption className="">{title} </TableCaption>
        <TableRow>
          <TableHead className="">PRICE</TableHead>

          <TableHead className="text-left">SIZE</TableHead>

          <TableHead className="text-left">Decimal</TableHead>
          <TableHead className="text-left">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.slice(-5)?.map((d, i) => (
          <TableRow key={i}>
            <TableCell className={`font-medium  w-[150px]`}>
              <p
                className={`${
                  color === "green" ? "text-green-500" : "text-red-500"
                } `}
              >
                {(Number(d.price) * 100).toFixed(1)}
              </p>
            </TableCell>
            <TableCell className="text-left w-[150px]">
              {Number(d.size)}
            </TableCell>

            <TableCell className="text-left w-[150px]">
              <Button variant="outline" className="font-bold cursor-text">
                {(100 / (Number(d.price) * 100)).toFixed(3)}
              </Button>
            </TableCell>
            <TableCell className="text-left w-[150px] ">
              <Button className="font-bold cursor-text">
                {(ab[0] * (100 / (Number(d.price) * 100))).toFixed(1)}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}

const TableComponent = ({ symbol }) => {
  const [orderbook, setOrderbook] = useState({});
  const [event, setEvent] = useState({});
  const [price, setPrice] = useState("");
  const [old_price, setOldPrice] = useState("");
  const [color, setColor] = useState("black");
  const [dvol, setDvol] = useState(null);
  const [aB, setAB] = useState([]);
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
      //   resulta.asks = result.asks.reverse();
      setEvent(data.events);
      setOrderbook(result);
      setPrice(Number(data.price).toFixed(0));
      if (data.dvol) {
        setDvol(Number(data.dvol).toFixed(2));
      }

      //   let dateOne = moment(
      //     moment(data.events?.endDate).format("YYYY-MM-DD 23:59:59")
      //   );
      //   let dateTwo = moment();
      //   console.log(dateOne, dateTwo);
      // Function call
      //   let different = dateOne.diff(dateTwo, "hours");
      //   const abrove_below = await ab(
      //     Number(data.price),
      //     Number(
      //       data.events?.title
      //         ?.split(" ")
      //         .find((r) => r.includes("$"))
      //         .replace(",", "")
      //         .replace("$", "")
      //     ),
      //     different / 24 / 365,
      // (moment(
      //   moment(data.event?.endDate).format("YYYY-MM-DD 23:59:59")
      // ).unix() -
      //   moment().unix()) /
      //   1000 /
      //   60 /
      //   24,
      // data.dvol
      //   );
      //   setAB(abrove_below);
      console.log(data);
      // return result;
    };

    // fetchData();
    setIsLoading(true);
    const intervalId = setInterval(() => {
      fetchData();
      setIsLoading(false);
    }, 5000);

    return () => {
      clearInterval(intervalId); //This is important
    };
  }, [symbol]);

  useEffect(() => {
    let dateOne = moment(moment(event?.endDate).format("YYYY-MM-DD 23:59:59"));
    let dateTwo = moment();
    //   console.log(dateOne, dateTwo);
    // Function call
    let different = dateOne.diff(dateTwo, "hours");
    const abrove_below = ab(
      Number(price),
      Number(
        event?.title
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
      dvol
    );
    setAB(abrove_below);
  }, [dvol]);

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
    <div className="border-r-2 pr-2">
      {isLoading ? (
        <div className="flex flex-col space-y-3 h-screen">
          <Skeleton className="h-4 w-96" />
          <div className="flex justify-between mt-[20px] gap-4 ">
            <Skeleton className="p-5 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 w-24 h-16 rounded-xl " />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          <div className="mt-[20px] ">
            <div className="fold-bold text-[24px] w-full">{event?.title}</div>
          </div>
          <div>
            <div className="flex justify-between">
              <div className=" bg-white shadow-md rounded-md p-5 w-24">
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

              <div className=" bg-white shadow-md rounded-md p-5 w-24">
                <div>Target</div>
                <div className="font-bold">
                  {event?.title?.split(" ").find((r) => r.includes("$"))}
                </div>
              </div>
              <div className=" bg-white shadow-md rounded-md p-5 w-24">
                <div>
                  <div>DVOL</div>
                  <input
                    placeholder="input"
                    className="font-bold w-12"
                    value={dvol}
                    onChange={(e) => setDvol(e.target.value)}
                  />
                </div>
                {/* <div className="font-bold">{dvol}</div> */}
              </div>

              <div className=" bg-white shadow-md rounded-md p-5 w-24">
                <div>RESULT</div>

                <div className="font-bold">{aB[0]}</div>
              </div>
              <div className=" bg-white shadow-md rounded-md p-5   w-24">
                <div>Expiry</div>
                {moment(
                  moment(event?.endDate).format("YYYY-MM-DD 23:59:59")
                ).diff(moment(), "hours")}{" "}
                H
              </div>
            </div>
          </div>
          <TableDemo data={orderbook?.asks} title={"ASK"} color="red" ab={aB} />
          <TableDemo
            data={orderbook?.bids}
            title={"BID"}
            color="green"
            ab={aB}
          />
        </>
      )}
    </div>
  );
};
export default TableComponent;