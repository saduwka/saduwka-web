import { createContext, useContext, useState } from "react";
import { CART } from "../../constants/constants"

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {

    const getCart = () => {
		const cart = localStorage.getItem(CART);
		return cart ? JSON.parse(cart) : [];
	};

    const [cart, setCart] = useState(getCart())
    
    console.log(cart);

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem(CART, JSON.stringify(updatedCart))
    }
    

	const addToCart = (product) => {
        

        setCart((prev)=> {
            const existingItem = prev.find(item => item.id === product.id)
            let updatedCart;

            if (existingItem) {
                updatedCart = prev.map(item => 
                    item.id === product.id 
                        ? {...item, quantity: item.quantity + 1 } 
                        : item)
            } else {
                updatedCart = [...prev, { ...product, quantity: 1}]
            }
            updateLocalStorage(updatedCart)
            return updatedCart
        })

    };

    const removeFromCart = (productId) => {
        setCart((prev) => {
            const updatedCart = prev.filter(item => item.id !== productId);
            updateLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    const decreaseItemFromCart = (productId) => {
        setCart((prev) => {
            const updatedCart = prev
                .map(item => 
                    item.id === productId 
                        ? { ...item, quantity: item.quantity - 1 } 
                        : item
                )
                .filter(item => item.quantity > 0);
            updateLocalStorage(updatedCart);
            return updatedCart;
        });
    };  

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseItemFromCart, removeFromCart }}>
             {children}
        </CartContext.Provider>
    )
}

export const userCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("ERROR")
    }

    return context
}