import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import styles from "./ProductsList.module.css";
import ProductCard from "../../ProductCard/ProductCard";
import Search from "../../../components/Search/Search";

const ProductsList = () => {
	const { category } = useParams();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const itemsPerPage = 8;
	const [searchParams, setSearchParams] = useSearchParams();

	const search = searchParams.get("search") || "";


	useEffect(() => {
		setIsLoading(true);
		const url = category
			? `https://dummyjson.com/products/category/${category}`
			: 'https://dummyjson.com/products';
		
		axios
			.get(url)
			.then((response) => {
				if (response.status === 200) {
					setProducts(response.data.products || []);
				}
			})
			.catch((error) => {
				console.error("Error loading products:", error);
				setProducts([]);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [category]);

	if (isLoading) {
		return <p>Loading products...</p>;
	}

	if (!products.length) {
		return <p>No products found</p>;
	}

	const filteredProducts = search
		? products.filter((product) =>
				product.title.toLowerCase().includes(search.toLowerCase())
		  )
		: products;

		const handlePageChange = (_, value) => {
			setPage(value);
			setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: value });
		};
	

	const startIndex = (page - 1) * itemsPerPage;
	const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

	return (
		<div className={styles.wrapper}>
			<h2>Selected category: {category || "Not selected"}</h2>

			<Search />

			<div className={styles.cardsWrapper}>
				{paginatedProducts.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						cardImage={product.thumbnail}
						title={product.title}
						description={product.description}
						price={product.price}
					/>
				))}
			</div>

			<Pagination variant="outlined" 
				count={Math.ceil(products.length / itemsPerPage)}
				page={page}
				onChange={handlePageChange}
				color="primary"
				className={styles.pagination}
			/>
		</div>
	);
};

export default ProductsList;
