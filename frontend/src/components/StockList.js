import React, { useState, useEffect } from "react";
import axios from "axios";
import APIKey from "../.env.local";

function StockList() {
  const baseURL = "https://www.alphavantage.co/query";
  const symbol = "WEGE3.SA";
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function getPrice() {
      const result = await axios.get(
        `${baseURL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${APIKey}`
      );
      console.log(result.data);
      setPrice(result.data["Global Quote"]["05. price"]);
    }

    getPrice();
  }, []);

  return (
    <div>
      <h1>My Stocks</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{symbol}</td>
              <td>{price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockList;
