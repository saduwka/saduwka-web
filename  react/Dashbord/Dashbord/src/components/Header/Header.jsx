import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ChevronLeft, Bell, User } from "lucide-react";
import Search from "../Search/Search";

const handleSearch = async (query) => {
  try {
      const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
      const data = await response.json();

      const symbolInfo = data.symbols.find(
          (symbol) => symbol.symbol === query.toUpperCase()
      );

      if (symbolInfo) {
          console.log("Найдено:", symbolInfo);
      } else {
          console.log("Не найдено");
      }
  } catch (error) {
      console.error("Ошибка при поиске:", error);
  }
};

const Header = ({ heading, proccessBack }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to={proccessBack} className={styles.back}>
          <ChevronLeft className={styles.backIcon} />
        </Link>
        <h4 className={styles.heading}>{heading}</h4>
      </div>
      <div className={styles.right}>
        <Search onSearch={handleSearch}/>
        <div className={styles.headerBtns}>
          <button className={styles.notification}>
            <Bell className={styles.notificationIcon} width={16} height={16} />
          </button>
          <button className={styles.profile}>
            <User className={styles.profileIcon} width={16} height={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
