import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { BaseUrl } from "../../constants/BaseUrl";
import { useAuth } from "../Auth/AuthContext";
// import { useCart } from "./CartContext";
const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      const response = await fetch(`${BaseUrl}/cart`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart. Please try again");
        return;
      }

      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        ({ product, quantity, unitPrice }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId) => {
    try {
      const response = await fetch(`${BaseUrl}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({ product, quantity, unitPrice }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemInCart = async (productId, quantity) => {
    try {
      const response = await fetch(`${BaseUrl}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        setError("Failed to update to cart");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({ product, quantity, unitPrice }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItemInCart = async (productId) => {
    try {
      const response = await fetch(`${BaseUrl}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to delete to cart");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({ product, quantity, unitPrice }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${BaseUrl}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to empty to cart");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data");
        return;
      }

      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        error,
        addItemToCart,
        updateItemInCart,
        removeItemInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;