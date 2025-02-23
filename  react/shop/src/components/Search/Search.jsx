import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState(searchParams.get("search") || "");


	useEffect(() => {
		if (search) {
			setSearchParams({ search: search });
		} else {
            setSearchParams({});
        }


	}, [search, setSearchParams]);

	return (
			<div className={styles.wrapper__search}>
				<input
					type="search"
					placeholder="search"
					className={styles.search}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
	
	);
};

export default Search;
