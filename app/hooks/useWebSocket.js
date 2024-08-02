import { useState, useEffect } from "react";

const useWebSocket = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(message);
    };

    // Cleanup function to close the WebSocket when the component unmounts
    return () => {
      ws.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;
