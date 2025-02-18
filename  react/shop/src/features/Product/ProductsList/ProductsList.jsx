import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductsList.module.css";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";

const ProductsList = () => {
	const { category } = useParams();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const url = category
			? `https://thingproxy.freeboard.io/fetch/https://dummyjson.com/products/category/${category}`
			: "https://thingproxy.freeboard.io/fetch/https://dummyjson.com/products";
		
		axios
			.get(url)
			.then((response) => {
				if (response.status === 200) {
					setProducts(response.data.products || []);
				}
			})
			.catch((error) => {
				console.error("Ошибка загрузки товаров:", error);
				setProducts([]);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [category]);

	if (isLoading) {
		return <p>Загрузка товаров...</p>;
	}

	if (!products.length) {
		return <p>Товары не найдены</p>;
	}

	return (
		<div className={styles.wrapper}>
			<h2>Выбрана категория: {category || "Не выбрана"}</h2>

			<div className={styles.cardsWrapper}>
				{products.slice(0, 8).map((product) => (
					<ProductCard
						key={product.id}
						cardImage={product.thumbnail}
						title={product.title}
						description={product.description}
						price={product.price}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductsList;