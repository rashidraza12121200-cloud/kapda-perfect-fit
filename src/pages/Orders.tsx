import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import BottomNav from "@/components/BottomNav";

const statusColors: Record<string, string> = {
  confirmed: "bg-primary/15 text-primary",
  processing: "bg-yellow-500/15 text-yellow-600",
  shipped: "bg-blue-500/15 text-blue-600",
  delivered: "bg-green-500/15 text-green-600",
};

const Orders = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">My Orders</h1>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No orders yet</p>
            <button onClick={() => navigate("/")} className="mt-4 gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-14 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.option} • {item.detail} • Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">₹{(item.product.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground">Total: ₹{order.total.toLocaleString()}</p>
                  <button className="flex items-center gap-1 text-xs font-semibold text-primary">
                    Track Order <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Orders;
