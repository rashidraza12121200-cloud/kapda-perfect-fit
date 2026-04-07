import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQty, removeItem } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const stitching = items.some((i) => i.option === "Custom Stitch") ? 500 : 0;
  const total = subtotal + stitching;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Your Cart</h1>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
            <button onClick={() => navigate("/")} className="mt-4 gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl">
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-3 flex gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground line-clamp-1">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.option} • {item.detail}</p>
                    <p className="font-bold text-foreground mt-1">₹{(item.product.price * item.qty).toLocaleString()}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(idx, -1)} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                          <Minus className="w-3 h-3 text-foreground" />
                        </button>
                        <span className="text-sm font-semibold text-foreground w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(idx, 1)} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                          <Plus className="w-3 h-3 text-foreground" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(idx)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upsells */}
            <div className="mt-4 bg-accent/10 border border-accent/20 rounded-2xl p-4">
              <p className="text-xs font-semibold text-foreground mb-2">✨ Complete Your Look</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-card border border-border rounded-xl py-2.5 text-xs font-medium text-foreground">
                  + Add Fabric
                </button>
                <button className="flex-1 bg-card border border-border rounded-xl py-2.5 text-xs font-medium text-foreground">
                  + Add Stitching
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-4 bg-card border border-border rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              {stitching > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stitching Charges</span>
                  <span className="text-foreground font-medium">₹{stitching}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-lg text-foreground">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                clearCart();
                toast.success("Order placed successfully! 🎉", { description: "You'll receive a confirmation shortly." });
              }}
              className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-sm mt-4 shadow-lg"
            >
              Place Order — ₹{total.toLocaleString()}
            </button>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Cart;
