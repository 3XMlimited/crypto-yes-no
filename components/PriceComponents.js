import React, { useEffect, useState } from "react";
// "use client";

// const PriceComponent = () => {
//   // const [data, setData] = useState(null);
//   let data = "";
//   async function getPrice() {
//     let uri = "wss://stream.binance.com:9443/ws/btcusdt@trade";
//     let ws = new WebSocket(uri);

//     ws.onmessage = (event) => {
//       data = JSON.parse(event.data);
//       console.log(data);
//     };
//   }
//   // getPrice();
//   // useEffect(() => {

//   // });
//   getPrice();
//   // useEffect(() => {
//   // const connectWebSocket = () => {
//   //   const ws = new WebSocket(
//   //     "wss://stream.binance.com:9443/ws/btcusdt@trade"
//   //   );

//   //   ws.onmessage = (event) => {
//   //     const jsonData = JSON.parse(event.data);
//   //     setData(jsonData);
//   //   };

//   //   ws.onerror = (error) => {
//   //     console.error("WebSocket connection failed:", error);
//   //   };

//   // ws.onclose = () => {
//   //   console.log("WebSocket connection closed.");
//   // };

//   // Cleanup function to close the WebSocket when the component unmounts
//   // return () => {
//   //   ws.close();
//   // };
//   // };

//   // connectWebSocket();
//   // }, []);
//   return (
//     <div>
//       {data ? (
//         <div>
//           <p>Price: {data.p}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

export default PriceComponent;
