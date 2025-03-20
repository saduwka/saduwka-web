import axios from "axios";
import { BINANCE_URL } from "../../../../../constants/api";

export const getForSlider = async () => {
  try {
    const response = await axios.get(`${BINANCE_URL}/api/v3/ticker/24hr`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};