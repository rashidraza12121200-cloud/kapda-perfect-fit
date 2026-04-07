import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  option: string;
  detail: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (idx: number) => void;
  updateQty: (idx: number, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.findIndex(
        (i) => i.product.id === newItem.product.id && i.option === newItem.option && i.detail === newItem.detail
      );
      if (existing >= 0) {
        return prev.map((item, i) => i === existing ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  };

  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const updateQty = (idx: number, delta: number) => {
    setItems((prev) =>
      prev.map((item, i) => i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
