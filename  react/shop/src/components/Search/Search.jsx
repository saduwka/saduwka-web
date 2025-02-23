import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const [inputValue, setInputValue] = useState(search);

    useEffect(() => {
        setInputValue(search);
    }, [search]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Обновляем параметры URL при каждом изменении
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            if (value) {
                newParams.set("search", value);
            } else {
                newParams.delete("search");
            }
            return newParams;
        });
    };

    return (
        <div className={styles.wrapper__search}>
            <input
                type="search"
                placeholder="Search"
                className={styles.search}
                value={inputValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default Search;