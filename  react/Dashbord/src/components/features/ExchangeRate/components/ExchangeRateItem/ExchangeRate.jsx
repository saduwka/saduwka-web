import React, { useEffect, useState } from "react";
import { fetchMarketData } from "../../api/ExchangeRateApi/ExchangeRateApi";
import styles from "./ExchangeRate.module.css";
import { StepBackIcon } from "lucide-react";
import classNames from "classnames";

const ExchangeRate = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const getMarketData = async () => {
      const data = await fetchMarketData();
      setMarketData(data);
    };

    getMarketData();
  }, []);

  return (
    <div className="exchange-rate">
      <table>
        <thead>
          <h2>Market Trend</h2>
          <tr>
            <th>Name</th>
            <th>Last Price</th>
            <th>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map(({ symbol, lastPrice, priceChangePercent }) => {
            const coinNames = {
              BTCUSDT: "Bitcoin",
              ETHUSDT: "Ethereum",
              BNBUSDT: "BNB",
              LTCUSDT: "Litecoin",
              ADAUSDT: "Cardano",
              CAKEUSDT: "Pancake"
            };

            return (
              <tr key={symbol}>
                <td>
                  <strong>{symbol.replace("USDT", "")}</strong>{" "}
                  {coinNames[symbol] || ""}
                </td>
                <td>${parseFloat(lastPrice).toFixed(2)}</td>
                <td
                  className={`${styles.change} ${
                    priceChangePercent >= 0 ? styles.up : styles.down
                  }`}
                >
                  {parseFloat(priceChangePercent).toFixed(2)}%
                  <StepBackIcon
                    className={classNames(styles.stepBackIcon, {
                      [styles.upIcn]: priceChangePercent >= 0,
                      [styles.downIcn]: priceChangePercent < 0
                    })}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRate;
