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

const getOrderbook = async (coin) => {
  const id = coinLists[coin].yes_no_ids[1];
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

const getEvents = async (coin) => {
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

export const POST = async (req, { params }) => {
  try {
    // console.log("1", await req.json());
    const { coin } = await req.json();
    // console.log(coin);
    const events = await getEvents(coin);
    const orderbook = await getOrderbook(coin);
    const price = await getPrice(coin);
    const dvol = await getDVOL(coin);
    // console.log(pages);

    return new Response(JSON.stringify({ events, orderbook, price, dvol }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get polymarket", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    // console.log("1", await req.json());
    const { coin } = await req.json();
    // console.log(coin);
    const events = await getEvents(coin);
    const orderbook = await getOrderbook(coin);
    const price = await getPrice(coin);
    const dvol = await getDVOL(coin);
    // console.log(pages);

    return new Response(JSON.stringify({ events, orderbook, price, dvol }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get polymarket", { status: 500 });
  }
};
