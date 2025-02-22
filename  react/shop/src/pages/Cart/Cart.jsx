import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuy = async () => {
    try {
      const response = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          products: cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Server response:", data);
  
      alert("Successfully bought items");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      console.error("Error buying items:", error);
      alert("Error buying items");
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <h3>{item.title}</h3>
              <p>Price {item.price} x {item.quantity} = {item.price * item.quantity}$</p>
            </div>
          ))}
          <h3>Total: {totalPrice}₸</h3>
          <Button onClick={handleBuy}>Buy</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;