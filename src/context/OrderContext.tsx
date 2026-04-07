import { createContext, useContext, useState, ReactNode } from "react";
import type { CartItem } from "./CartContext";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: "confirmed" | "processing" | "shipped" | "delivered";
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: `KPD-${Date.now().toString().slice(-6)}`,
      items: [...items],
      total,
      date: new Date(),
      status: "confirmed",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
