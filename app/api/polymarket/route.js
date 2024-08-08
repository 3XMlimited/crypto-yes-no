import axios from "axios";

const coinLists = {
  BTC: {
    title: "Bitcoin above $65,000 on August 9?",
    id: "11824",
    yes_no_ids: [
      "43318748238157540341064121297803463723958114946530282402334874447290723536672",
      "77316104995725437081111737608694475714207012802290598663859834462864327272644",
    ],
  },
  ETH: {
    title: "Ethereum above $3,000 on August 9?",
    id: "11823",
    yes_no_ids: [
      "46401590573256909488300814895434040634117934887083664237275365971815633019230",
      "20118092201791786436186426325292361841350664267564686541426438482088349327818",
    ],
  },
  SOL: {
    title: "solana-above-160-on-august-9",
    id: "11825",
    yes_no_ids: [
      "65258985485047790632186076701594817650773850369830164448292405043554782818481",
      "63147090341372816091930948044123568158773861858893450189562140363192872419144",
    ],
  },
};

const getDVOL = async (coinId) => {
  if (coinId === "SOL") {
    let bybit_dvol = await getBybitDvol(coinId);
    if (bybit_dvol) {
      return bybit_dvol * 100;
    } else {
      return null;
    }
  } else {
    const start = Date.now();
    const req = await axios.get(
      `https://www.deribit.com/api/v2/public/get_volatility_index_data?currency=${coinId}&start_timestamp=${(
        start - 36000
      ).toString()}&end_timestamp=${start.toString()}&resolution=1`
    );
    try {
      const obj = req?.data;

      let dvol = obj?.result?.data[0];
      // console.log(dvol);
      dvol = dvol[dvol.length - 1];
      return dvol;
    } catch (err) {
      console.log(err.data);
    }
  }
};
const getBybitDvol = async (symbol) => {
  const start = Date.now();
  const req = await axios.get(
    `https://api.bybit.com/v5/market/historical-volatility?category=option&baseCoin=${symbol}&period=30`
  );
  try {
    const obj = req?.data;
    console.log(obj);
    // console.log(obj);
    // let dvol = obj?.result?.data[0];
    // // console.log(dvol);
    // dvol = dvol[dvol.length - 1];
    // return dvol;
    return obj.result[0].value;
  } catch (err) {
    console.log(err.data);
  }
};

// getInstrument();
const getPrice = async (symbol) => {
  let coinId;
  if (symbol === "BTC") {
    coinId = "btc_usd";
  } else {
    if (symbol === "ETH") {
      coinId = "eth_usd";
    } else {
      if (symbol === "SOL") {
        coinId = "sol_usd";
      }
    }
  }
  const req = await axios.get(
    `https://www.deribit.com/api/v2/public/get_index_price?index_name=${coinId}`
  );

  try {
    const obj = req?.data;
    // console.log(obj);
    // console.log(obj.result.index_price);
    return obj.result.index_price;
  } catch (error) {
    console.error(error);
  }
};

const getOrderbook = async (post) => {
  let id = "";

  if (post.side) {
    id = post.ids[0];
  } else {
    id = post.ids[1];
  }

  const uri =
    // "https://clob.polymarket.com/book?token_id=10382206167602821537615393390727190508838830270797400733981332891522737823882";
    "https://clob.polymarket.com/book?token_id=";

  const response = await fetch(uri + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  //   console.log(result);
  return result;
};

const getEvents = async (post) => {
  const uri = "https://gamma-api.polymarket.com/events/";
  const id = coinLists[coin].id;
  const response = await fetch(uri + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  //   console.log(result);
  return result;
};

const getPages = async () => {
  const uri =
    "https://gamma-api.polymarket.com/markets?active=true&closed=false";
  const response = await fetch(uri, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  //   console.log(result);
  return result;
};

export const POST = async (req, { params }) => {
  try {
    // console.log("1", await req.json());
    const { post } = await req.json();
    // console.log(post);
    // console.log(coin);
    // const events = await getEvents(post);
    const orderbook = await getOrderbook(post);
    const price = await getPrice(post.symbol);
    const dvol = await getDVOL(post.symbol);

    //
    return new Response(JSON.stringify({ orderbook, price, dvol }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get polymarket", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    const pages = await getPages();
    return new Response(JSON.stringify({ pages }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get polymarket", { status: 500 });
  }
};

// const getInstrument = async (coinId) => {
//   const start = Date.now();
//   const req = await axios.get(
//     `https://www.deribit.com/api/v2/public/get_instruments?currency=SOL&kind=option`
//   );
//   try {
//     const obj = req?.data;
//     console.log(obj);
//   } catch (err) {
//     console.log(err.data);
//   }
// };
// getInstrument();
