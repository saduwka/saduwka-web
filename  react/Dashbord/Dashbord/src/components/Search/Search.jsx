import { useState } from "react";
import styles from "./Search.module.css";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch(query);
        }
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search"
                className={styles.searchInput}
            />
            <button onClick={handleSearchClick} className={styles.searchButton}>
                <SearchIcon/>
            </button>
        </div>
    );
};

export default Search;