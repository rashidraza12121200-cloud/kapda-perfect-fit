import { createContext, useContext, useState, ReactNode } from "react";
import type { CartItem } from "./CartContext";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  address?: string;
  paymentMethod?: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number, address?: string, paymentMethod?: string) => void;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartItem[], total: number, address?: string, paymentMethod?: string) => {
    const newOrder: Order = {
      id: `KPD-${Date.now().toString().slice(-6)}`,
      items: [...items],
      total,
      date: new Date(),
      status: "confirmed",
      address,
      paymentMethod,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: "cancelled" as const } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
