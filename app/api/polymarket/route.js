import axios from "axios";

const getDVOL = async (coinId) => {
  const start = Date.now();
  const req = await axios.get(
    `https://www.deribit.com/api/v2/public/get_volatility_index_data?currency=${coinId}&start_timestamp=${(
      start - 36000
    ).toString()}&end_timestamp=${start.toString()}&resolution=1`
  );
  try {
    const obj = req?.data;
    // console.log(obj);
    let dvol = obj?.result?.data[0];
    // console.log(dvol);
    dvol = dvol[dvol.length - 1];
    return dvol;
  } catch (err) {
    console.log(err.data);
  }
};

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
    console.error(error.data);
  }
};

const getOrderbook = async () => {
  const uri =
    // "https://clob.polymarket.com/book?token_id=10382206167602821537615393390727190508838830270797400733981332891522737823882";
    "https://clob.polymarket.com/book?token_id=100522196974552614472513255957444178131511279940821175422682239546862396152595";

  const response = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  //   console.log(result);
  return result;
};

const getEvents = async () => {
  const uri = "https://gamma-api.polymarket.com/events/";
  const id = "11722";
  const response = await fetch(uri + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  // console.log(result);
  return result;
};

export const GET = async (req, { params }) => {
  try {
    const events = await getEvents();
    const orderbook = await getOrderbook();
    const price = await getPrice("BTC");
    const dvol = await getDVOL("BTC");
    // console.log(pages);

    return new Response(JSON.stringify({ events, orderbook, price, dvol }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get polymarket", { status: 500 });
  }
};
