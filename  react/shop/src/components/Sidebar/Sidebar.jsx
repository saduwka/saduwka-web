import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "https://thingproxy.freeboard.io/fetch/https://dummyjson.com/products/categories"
                );
                console.log("Categories:", response.data);
                setCategories(response.data || []);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    return (
        <aside className={styles.sidebar}>
            <h2>Categories:</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <NavLink 
                            to={`/category/${category.slug}`} 
                            activeClassName={styles.active}
                        >
                            {category.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;