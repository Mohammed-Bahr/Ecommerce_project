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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setCartItems([]);
      setTotalAmount(0);
      setError("");
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await fetch(`${BaseUrl}/cart`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            setError("Please log in to view your cart");
          } else {
            setError("Failed to fetch user cart. Please try again");
          }
          return;
        }

        const cart = await response.json();

        if (!cart || !cart.items) {
          setError("Invalid cart data received");
          return;
        }

        const cartItemsMapped = cart.items.map(
          ({ product, quantity, unitPrice }) => ({
            productId: product?._id,
            title: product?.title,
            image: product?.image,
            quantity,
            unitPrice,
          })
        );

        setCartItems(cartItemsMapped);
        setTotalAmount(cart.totalAmount || 0);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart. Please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId) => {
    try {
      setLoading(true);
      setError("");
      
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
        setError("Failed to add item to cart. Please try again");
        return;
      }

      const cart = await response.json();

      if (!cart || !cart.items) {
        setError("Invalid cart data received");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({ product, quantity, unitPrice }) => ({
          productId: product?._id,
          title: product?.title,
          image: product?.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount || 0);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError("Failed to add item to cart. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const updateItemInCart = async (productId, quantity) => {
    try {
      setLoading(true);
      setError("");
      
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
        setError("Failed to update cart item. Please try again");
        return;
      }

      const cart = await response.json();

      if (!cart || !cart.items) {
        setError("Invalid cart data received");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({ product, quantity, unitPrice }) => ({
          productId: product?._id,
          title: product?.title,
          image: product?.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount || 0);
    } catch (err) {
      console.error("Error updating cart item:", err);
      setError("Failed to update cart item. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const removeItemInCart = async (productId) => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(`${BaseUrl}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to remove item from cart. Please try again");
        return;
      }

      const cart = await response.json();

      if (!cart || !cart.items) {
        setError("Invalid cart data received");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({ product, quantity, unitPrice }) => ({
          productId: product?._id,
          title: product?.title,
          image: product?.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount || 0);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(`${BaseUrl}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to clear cart. Please try again");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        setError("Invalid response received");
        return;
      }

      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError("Failed to clear cart. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        error,
        loading,
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