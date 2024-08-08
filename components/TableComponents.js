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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function CardWithForm({ price, dvol }) {
  const [target, setTarget] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [result, setResult] = useState([]);

  async function fetchRun() {
    const res = ab(price, target, expiry / 24 / 365, dvol);
    setResult(res);
  }
  return (
    <Card className="w-full mt-2">
      <CardHeader>
        <CardTitle>abrove_below calculator</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Target</Label>
              <Input
                id="target"
                type={"number"}
                placeholder="Target Price"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Expiry (Hours)</Label>
              <Input
                id="expiry"
                type={"number"}
                placeholder="Expiry hours"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button onClick={fetchRun}>Run</Button>

        <div className="flex justify-between">
          {result.map((r) => (
            <div className="bg-white shadow-md px-5 py-2 mx-2 rounded-md ">
              {r}
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
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

function TableDemo({ data, title, color, ab, post }) {
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
                {(Number(d.price) * 100)?.toFixed(1)}
              </p>
            </TableCell>
            <TableCell className="text-left w-[150px]">
              {Number(d.size)}
            </TableCell>

            <TableCell className="text-left w-[150px]">
              <Button variant="outline" className="font-bold cursor-text">
                {(100 / (Number(d.price) * 100))?.toFixed(3)}
              </Button>
            </TableCell>
            <TableCell className="text-left w-[150px] ">
              <Button className="font-bold cursor-text">
                {(
                  (post.side ? ab[1] : ab[0]) *
                  (100 / (Number(d.price) * 100))
                )?.toFixed(1)}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}

const TableComponent = ({ index }) => {
  const [pages, setPages] = useState({});
  //   const [question, setQuestion] = useState("");

  let value = {
    question: "",
    symbol: "",
    target: "",
    side: false,
    ids: [],
    endDate: new Date(),
  };
  if (typeof window !== "undefined") {
    value = JSON.parse(localStorage.getItem(`table${index}`)) || {
      question: "",
      symbol: "",
      target: "",
      side: false,
      ids: [],
      endDate: new Date(),
    };
  }
  // JSON.parse(
  const [orderbook, setOrderbook] = useState({});

  const [event, setEvent] = useState({});
  const [price, setPrice] = useState("");
  const [old_price, setOldPrice] = useState("");
  const [color, setColor] = useState("black");

  const [dvol, setDvol] = useState(null);
  const [fee, setFee] = useState(1);
  const [aB, setAB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [post, setPost] = useState(value);

  const filterSymbol = (question) => {
    console.log(question.toLowerCase());
    if (question.toLowerCase().includes("bitcoin")) {
      return "BTC";
    } else if (question.toLowerCase().includes("ethereum")) {
      return "ETH";
    } else if (question.toLowerCase().includes("solana")) {
      return "SOL";
    }
  };

  const fetchSave = async () => {
    setIsLoading(true);
    console.log(post.question, pages);
    const match = pages.find((r) => r.question === post.question);

    if (match) {
      const result = {
        question: match.question,
        side: post.side,
        symbol: await filterSymbol(match.question),
        target:
          match?.question
            ?.split(" ")
            ?.find((r) => r.includes("$"))
            ?.replace(",", "")
            ?.replace("$", "") || 0,
        ids: JSON.parse(match.clobTokenIds),
        endDate: match.endDate,
      };
      setPost(result);
      window.localStorage.setItem(`table${index}`, JSON.stringify(result));
      //   window.localStorage.setItem(key, JSON.stringify(valueToStore));
      await fetchData(result);
    } else {
      alert("Can't find the post ,please make sure title is correct");
    }

    setIsLoading(false);
    //   console.log(data.pages.find((r) => r.question === question).clobTokenIds);
  };

  //   console.log(post);

  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch("/api/polymarket", {
        method: "GET",
      });
      const data = await response.json();
      // console.log(data);
      //  const questions = "Ethereum above $3,000 on August 9?";
      setPages(data.pages);
    };
    fetchPages();
  }, []);

  const fetchData = async (obj) => {
    const response = await fetch("/api/polymarket", {
      method: "POST",
      body: JSON.stringify({
        // coin: symbol,
        post: obj,
      }),
    });
    const data = await response.json();
    // console.log(data);
    let result = data.orderbook;
    result.bids = result.bids.reverse();
    //   resulta.asks = result.asks.reverse();
    // setEvent(data.events);
    // setQuestion(data.events?.title);
    setOrderbook(result);
    setPrice(Number(data.price)?.toFixed(0));
    if (data.dvol) {
      setDvol(Number(data.dvol * fee)?.toFixed(2));
    }

    console.log(data);
    //
    // return result;
  };

  // console.log(post);
  useEffect(() => {
    if (post.symbol) {
      const fetchData = async () => {
        const response = await fetch("/api/polymarket", {
          method: "POST",
          body: JSON.stringify({
            // coin: symbol,
            post,
          }),
        });
        const data = await response.json();
        // console.log(data);
        let result = data.orderbook;
        result.bids = result.bids.reverse();
        //   resulta.asks = result.asks.reverse();
        // setEvent(data.events);
        // setQuestion(data.events?.title);
        setOrderbook(result);
        setPrice(Number(data.price)?.toFixed(0));
        if (data.dvol) {
          setDvol(Number(data.dvol)?.toFixed(2));
        }
        // console.log(data);
        //
        // return result;
      };
      const intervalId = setInterval(() => {
        fetchData();
        setIsLoading(false);
      }, 5000);
      return () => {
        clearInterval(intervalId); //This is important
      };
    } else {
      setIsLoading(false);
    }
  }, [post]);

  useEffect(() => {
    if (post && dvol) {
      let dateOne = moment(moment(post?.endDate).format("YYYY-MM-DD 23:59:59"));
      let dateTwo = moment();
      //   console.log(dateOne, dateTwo);
      // Function call
      let different = dateOne.diff(dateTwo, "hours");
      const abrove_below = ab(
        Number(price),
        Number(post?.target),
        different / 24 / 365,

        dvol * fee
      );
      setAB(abrove_below);
    }
  }, [dvol, fee]);

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

  //   console.log(post);
  return (
    <div className="border-r-2 pr-2">
      {isLoading ? (
        <div className="flex flex-col space-y-3 h-screen">
          <Skeleton className="h-4 w-96" />
          <div className="flex justify-between mt-[20px] gap-4 ">
            <Skeleton className="p-5 md:w-12 xl:w-24 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 md:w-12 xl:w-24 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 md:w-12 xl:w-24 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 md:w-12 xl:w-24 w-24 h-16 rounded-xl " />
            <Skeleton className="p-5 md:w-12 xl:w-24 w-24 h-16 rounded-xl " />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          <div className="mt-[20px] ">
            <div className="relative ">
              <Input
                className="fold-bold text-[20px] w-full min-w-[400px]  h-12 mb-1"
                value={post.question}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, question: e.target.value }))
                }
              />
              <div className="flex  justify-between  mx-2">
                <div>
                  <Button
                    variant="outline"
                    className={`${
                      post.side && "bg-green-500"
                    } rounded-r-none hover:bg-green-400 `}
                    onClick={(e) =>
                      setPost((prev) => ({
                        ...prev,
                        side: true,
                      }))
                    }
                  >
                    YES
                  </Button>
                  <Button
                    variant="outline"
                    className={`${
                      post.side === false && "bg-red-500"
                    } rounded-l-none  mr-2 hover:bg-red-400`}
                    onClick={(e) =>
                      setPost((prev) => ({
                        ...prev,
                        side: false,
                      }))
                    }
                  >
                    NO
                  </Button>
                </div>
                <Button className="bg-blue-500" onClick={fetchSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
          {post?.symbol && (
            <div>
              <div>
                <div className="flex justify-between">
                  <div className=" bg-white shadow-md rounded-md p-5 md:w-18  w-24 xl:w-24">
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

                  <div className=" bg-white shadow-md rounded-md p-5  md:w-18 md:gap-1 w-24 xl:w-24">
                    <div>Target</div>
                    <div className="font-bold">{post?.target}</div>
                  </div>
                  <div className=" bg-white shadow-md rounded-md p-5  md:w-18   w-24 xl:w-24">
                    <div>
                      <div>DVOL</div>
                      <div className="font-bold w-14 ">
                        {(dvol * fee).toFixed(2)}
                      </div>

                      {post.symbol === "SOL" && (
                        <input
                          placeholder=" x ... "
                          type="number"
                          className=" w-14 "
                          value={fee}
                          onChange={(e) => {
                            // setDvol((prev) => e.target.value * prev);
                            setFee(e.target.value);
                          }}
                        />
                      )}
                    </div>
                    {/* <div className="font-bold">{dvol}</div> */}
                  </div>

                  <div className=" bg-white shadow-md rounded-md p-5  md:w-18 md:gap-1 w-24 xl:w-24">
                    <div>RESULT</div>

                    <div className="font-bold">{post.side ? aB[1] : aB[0]}</div>
                  </div>
                  <div className=" bg-white shadow-md rounded-md p-5    md:w-18  w-24 xl:w-24">
                    <div>Expiry</div>
                    {moment(
                      moment(post?.endDate).format("YYYY-MM-DD 23:59:59")
                    ).diff(moment(), "hours")}{" "}
                    H
                  </div>
                </div>
              </div>
              <TableDemo
                data={orderbook?.asks}
                title={"ASK"}
                color="red"
                ab={aB}
                post={post}
              />
              <TableDemo
                data={orderbook?.bids?.slice(0, 5)}
                title={"BID"}
                color="green"
                ab={aB}
                post={post}
              />
              <CardWithForm price={price} dvol={dvol * fee} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default TableComponent;
