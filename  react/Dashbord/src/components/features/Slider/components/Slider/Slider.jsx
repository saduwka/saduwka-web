import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { getForSlider } from "../../api/GetForSlider/GetForSlider";
import styles from "./Slider.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const Slider = () => {
  const [data, setData] = useState([]);

  const generatePriceHistory = (lastPrice, changePercent) => {
    const basePrice = parseFloat(lastPrice);
    const variation = basePrice * (parseFloat(changePercent) / 100);

    return Array.from({ length: 6 }, (_, i) =>
      (basePrice + Math.sin(i) * variation).toFixed(2)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getForSlider();

      // Фильтруем только нужные валютные пары
      const filteredData = result.filter((item) =>
        ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT", "DOGEUSDT", "DOTUSDT", "LTCUSDT", "MATICUSDT"].includes(item.symbol)
      );

      console.log("Количество монет после фильтрации:", filteredData.length);
      setData(filteredData.slice(0, 10)); 
    };

    fetchData();
  }, []);

  const getChartData = (item) => ({
    labels: Array.from({ length: 6 }, (_, i) => i + 1),
    datasets: [
      {
        data: generatePriceHistory(item.lastPrice, item.priceChangePercent),
        borderColor: "#A853F0",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
      }
    ]
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false }  
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
  <div className={styles.sliderContainer}>
      <div className={styles.swiperButtonNext}></div>
      <div className={styles.swiperButtonPrev}></div>
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
        modules={[FreeMode, Navigation]}
        className="crypto-slider"
      >
        {data.map((item) => (
          <SwiperSlide key={item.symbol} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.icon}>
                <img src={`/icons/${item.symbol}.png`} alt={item.symbol} />
              </div>
              <div className={styles.content}>
                <h3>{item.symbol} ↔ USD</h3>
                <p className={styles.price}>
                  ${parseFloat(item.lastPrice).toFixed(2)}
                </p>
                <p
                  className={styles.change}
                  style={{
                    color: item.priceChangePercent >= 0 ? "green" : "red"
                  }}
                >
                  {parseFloat(item.priceChangePercent).toFixed(2)}%
                </p>
              </div>
              <div className={styles.chartContainer}>
                <Line data={getChartData(item)} options={chartOptions} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
