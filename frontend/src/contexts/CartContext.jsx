// ======= src/contexts/CartContext.js =======
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => setCartItems([...cartItems, item]);
  const removeFromCart = (id) => setCartItems(cartItems.filter(i => i.id !== id));

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}


export const useCart = () => useContext(CartContext);