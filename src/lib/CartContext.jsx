import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cocoa-and-crust-bag";
const CartContext = createContext(null);

function readBag() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readBag());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — the bag simply stays for this visit */
    }
  }, [items]);

  const add = useCallback((product, quantity = 1) => {
    setItems((current) => {
      const found = current.find((line) => line.slug === product.slug);
      if (found) {
        return current.map((line) =>
          line.slug === product.slug ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [
        ...current,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity,
        },
      ];
    });
  }, []);

  const setQuantity = useCallback((slug, quantity) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) => (line.slug === slug ? { ...line, quantity } : line))
    );
  }, []);

  const remove = useCallback((slug) => {
    setItems((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((total, line) => total + line.quantity, 0);
    const subtotal = items.reduce((total, line) => total + line.price * line.quantity, 0);
    return { items, add, setQuantity, remove, clear, count, subtotal };
  }, [items, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}