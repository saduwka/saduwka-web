import axios from "axios";
import { BINANCE_URL } from "../../../../../constants/api";

export const getTrades = async () => {
  try {
    const response = await axios.get(`${BINANCE_URL}/api/v3/trades?symbol=BTCUSDT&limit=100`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
}