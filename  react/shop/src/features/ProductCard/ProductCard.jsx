import { useNavigate } from "react-router-dom";
import ProductCardUI from "../../components/ui/ProductCard/ProductCardUI";
// import { CART } from "../../constants/constants";
import { userCart } from "../../contexts/CartContext/CartContext";

const ProductCard = ({
	id,
	cardImage,
	title,
	description,
	price,

}) => {

	const {cart, addToCart} = userCart()

	const navigate = useNavigate()

	console.log(cart);

	const handleCardClick = () => {
		navigate(`/product/${id}`)
	}
	

	return (
		<ProductCardUI
			cardImage={cardImage}
			title={title}
			description={description}
			price={price}
			handleAddToCard={() => addToCart({id, price, title})}
			onClick={handleCardClick}
		/>
	);
};

export default ProductCard;
