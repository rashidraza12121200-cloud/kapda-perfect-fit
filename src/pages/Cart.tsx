import { useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2, MapPin, CreditCard, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const paymentMethods = [
  { id: "upi", label: "UPI / Google Pay", icon: "📱" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
];

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { addresses } = useUser();
  const [step, setStep] = useState<"cart" | "address" | "payment">("cart");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(addresses[0]?.id || null);
  const [selectedPayment, setSelectedPayment] = useState("upi");

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const stitching = items.some((i) => i.option === "Custom Stitch") ? 500 : 0;
  const total = subtotal + stitching;

  const handlePlaceOrder = () => {
    const addr = addresses.find((a) => a.id === selectedAddress);
    const pay = paymentMethods.find((p) => p.id === selectedPayment);
    placeOrder(items, total, addr?.full, pay?.label);
    clearCart();
    toast.success("Order placed successfully! 🎉", { description: "You'll receive a confirmation shortly." });
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => step === "cart" ? navigate(-1) : setStep(step === "payment" ? "address" : "cart")}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">
            {step === "cart" ? "Your Cart" : step === "address" ? "Select Address" : "Payment"}
          </h1>
        </header>

        {/* Step indicators */}
        {items.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            {["Cart", "Address", "Payment"].map((s, i) => {
              const stepKey = ["cart", "address", "payment"][i];
              const active = step === stepKey;
              const done = ["cart", "address", "payment"].indexOf(step) > i;
              return (
                <div key={s} className="flex-1 flex items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${active ? "gradient-primary text-primary-foreground" : done ? "bg-green-500 text-white" : "bg-secondary text-muted-foreground"}`}>
                    {done ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                </div>
              );
            })}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
            <button onClick={() => navigate("/")} className="mt-4 gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl">
              Shop Now
            </button>
          </div>
        ) : step === "cart" ? (
          <>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-3 flex gap-3 animate-fade-in">
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

            <button onClick={() => setStep("address")}
              className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-sm mt-4 shadow-lg flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : step === "address" ? (
          <div className="animate-fade-in">
            {addresses.length === 0 ? (
              <div className="text-center py-10">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-4">No saved addresses</p>
                <button onClick={() => navigate("/addresses")} className="gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl">
                  Add Address
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <button key={addr.id} onClick={() => setSelectedAddress(addr.id)}
                      className={`w-full bg-card border rounded-2xl p-4 flex gap-3 text-left transition-all ${selectedAddress === addr.id ? "border-primary bg-primary/5" : "border-border"}`}>
                      <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${selectedAddress === addr.id ? "text-primary" : "text-muted-foreground"}`} />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{addr.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{addr.full}</p>
                        <p className="text-xs text-muted-foreground">📞 {addr.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={() => navigate("/addresses")} className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold border border-border text-foreground">
                  + Add New Address
                </button>
                <button onClick={() => { if (!selectedAddress) { toast.error("Select an address"); return; } setStep("payment"); }}
                  className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-sm mt-4 shadow-lg flex items-center justify-center gap-2">
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <button key={pm.id} onClick={() => setSelectedPayment(pm.id)}
                  className={`w-full bg-card border rounded-2xl p-4 flex items-center gap-3 text-left transition-all ${selectedPayment === pm.id ? "border-primary bg-primary/5" : "border-border"}`}>
                  <span className="text-xl">{pm.icon}</span>
                  <span className="text-sm font-medium text-foreground">{pm.label}</span>
                  {selectedPayment === pm.id && <CreditCard className="w-4 h-4 text-primary ml-auto" />}
                </button>
              ))}
            </div>

            <div className="mt-4 bg-card border border-border rounded-2xl p-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-foreground">₹{total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">📍 {addresses.find((a) => a.id === selectedAddress)?.full || "—"}</p>
            </div>

            <button onClick={handlePlaceOrder}
              className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-sm mt-4 shadow-lg">
              Place Order — ₹{total.toLocaleString()}
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Cart;
