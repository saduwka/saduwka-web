import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userCart } from "../../contexts/CartContext/CartContext";
import { Button } from "@mui/material";
import styles from "./ProductDetails.module.css"

const ProductDetails = () => {
	const { id } = useParams();
	const { addToCart } = userCart();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					`https://dummyjson.com/products/${id}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch product");
				}
				const data = await response.json();
				setProduct(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!product) return <p>Product not found</p>;

	return (
		<div>
			<h2>{product.title}</h2>
			<div className={styles.imgWrapper}>
				{product.images.map((img, index) => (
					<img
                        className={styles.productImg}
						key={index}
						src={img}
						alt={`${product.title} ${index + 1}`}
					/>
				))}
			</div>
			<p>{product.description}</p>
			<p>Price: ${product.price}</p>
			<p>Category: {product.category}</p>
			<p>Rating: ★{product.rating}</p>
			<p>Brand: {product.brand}</p>
			<Button
				variant="contained"
				color="primary"
				onClick={() => addToCart(product)}
			>
				Add to Cart
			</Button>
		</div>
	);
};

export default ProductDetails;
