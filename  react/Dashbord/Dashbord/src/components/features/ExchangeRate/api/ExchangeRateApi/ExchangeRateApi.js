import axios from "axios";
import { coins } from "../ExchangeRate.data";

export const fetchMarketData = async () => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
    return response.data.filter((coin) => coins.includes(coin.symbol));
  } catch (error) {
    console.error("Error fetching market data:", error);
    return [];
  }
};