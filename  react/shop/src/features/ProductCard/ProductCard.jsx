import ProductCardUI from '../../components/ui/ProductCard/ProductCardUI';
import { CART } from '../../constants/constants';

const ProductCard = ({
    cardImage,
    title,
    description,
    price
}) => {

    const getCart = () => {
        const cart = localStorage.getItem(CART);
        return cart ? JSON.parse(cart) : [];
    }

    const handleAddToCard = () => {
        const cart = getCart();
        
        const product = {
            id,
            title,
            price,
            quantity: 1,
        }
        
        const foundedItem = cart.find((item) => item.id === product.id);

        if (foundedItem) {
            foundedItem.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem(CART, JSON.stringify(cart));
    }
   return (
         <ProductCardUI
              cardImage={cardImage}
              title={title}
              description={description}
              price={price}
              handleAddToCard={handleAddToCard}
         />
    )

}

export default ProductCard