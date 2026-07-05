import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

//favorites

const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem("favoritesItems");
    return savedFav ? JSON.parse(savedFav) : [];
  });

const addToFavorites = useCallback((item) => {
  setFavorites((prev) => {
    if (prev.some((i) => i.id === item.id)) return prev;
    return [...prev, item];
  });
}, []);

useEffect(() => {
  localStorage.setItem("favoritesItems", JSON.stringify(favorites));
}, [favorites]);

const removeFromFavorites = useCallback((id) => {
  setFavorites((prev) => prev.filter((i) => i.id !== id));
}, []);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const increaseQuantity = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }, []);

  const removeFormCart = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ----- Orders -----
  // No real backend, so past orders are simulated and stored in localStorage.
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = useCallback(() => {
    if (cartItems.length === 0) return null;

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItems,
      total,
      status: "Processing",
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCartItems([]);

    return newOrder;
  }, [cartItems]);

  // Memoize the context value so consumers don't re-render on every
  // CartProvider render — only when the actual data changes.
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFormCart,
      addToFavorites,
      favorites,
      removeFromFavorites,
      orders,
      placeOrder,
    }),
    [
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFormCart,
      addToFavorites,
      favorites,
      removeFromFavorites,
      orders,
      placeOrder,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
