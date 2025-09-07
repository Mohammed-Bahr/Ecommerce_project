import { createContext, useContext } from "react";

// CartContext with default values
export const CartContext = createContext({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
  clearCart: () => {},
});

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);