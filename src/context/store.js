import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRODUCTS } from "../data/products.js";

const StoreContext = createContext(undefined);

const STORAGE_KEYS = {
  CART: "toyshop_cart",
  ORDERS: "toyshop_orders",
  WISHLIST: "toyshop_wishlist",
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cartData, ordersData, wishlistData] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.CART),
          AsyncStorage.getItem(STORAGE_KEYS.ORDERS),
          AsyncStorage.getItem(STORAGE_KEYS.WISHLIST),
        ]);

        if (cartData) {
          setCart(JSON.parse(cartData));
        }
        if (ordersData) {
          setOrders(JSON.parse(ordersData));
        }
        if (wishlistData) {
          setWishlist(JSON.parse(wishlistData));
        }
      } catch (error) {
        console.error("Error loading data from storage:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Save orders to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  // Save wishlist to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

  const addToCart = (id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) {
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
      }
      return [...prev, { id, qty }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === id)) {
        return prev; // Already in wishlist
      }
      return [...prev, { id, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = findProduct(item.id);
      return sum + (product?.price || 0) * item.qty;
    }, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const checkout = (customerInfo) => {
    const orderId = `ORD-${Date.now()}`;
    const items = cart.map((ci) => {
      const p = findProduct(ci.id);
      return { 
        id: ci.id, 
        title: p.title, 
        price: p.price, 
        qty: ci.qty,
        image: p.image,
      };
    });
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const order = {
      orderId,
      placedAtISO: new Date().toISOString(),
      items,
      total,
      status: "pending",
      customerInfo,
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return orderId;
  };

  const getFeaturedProducts = () => {
    return PRODUCTS.filter((product) => product.featured).slice(0, 6);
  };

  const getProductsByCategory = (category) => {
    return PRODUCTS.filter((product) => product.category === category);
  };

  const getRecommendations = (productId) => {
    const currentProduct = findProduct(productId);
    if (!currentProduct) return [];

    return PRODUCTS
      .filter((product) => 
        product.id !== productId && 
        (product.category === currentProduct.category || 
         product.tags.some(tag => currentProduct.tags.includes(tag)))
      )
      .slice(0, 4);
  };

  const value = {
    products: PRODUCTS,
    cart,
    orders,
    wishlist,
    cartTotal,
    cartItemCount,
    findProduct,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    checkout,
    getFeaturedProducts,
    getProductsByCategory,
    getRecommendations,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
