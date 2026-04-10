import { useState } from "react";
import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

interface PaymentMethod {
  id: string;
  type: "upi" | "card";
  label: string;
  detail: string;
}

const Payments = () => {
  const navigate = useNavigate();
  const [methods, setMethods] = useState<PaymentMethod[]>(() => {
    const saved = localStorage.getItem("kapda_payments");
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<"upi" | "card">("upi");
  const [detail, setDetail] = useState("");

  const saveToStorage = (items: PaymentMethod[]) => {
    localStorage.setItem("kapda_payments", JSON.stringify(items));
  };

  const handleSave = () => {
    if (!detail.trim()) { toast.error("Please enter details"); return; }
    const newMethod: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type,
      label: type === "upi" ? "UPI" : "Card",
      detail: type === "upi" ? detail : `**** **** **** ${detail.slice(-4)}`,
    };
    const updated = [...methods, newMethod];
    setMethods(updated);
    saveToStorage(updated);
    toast.success("Payment method added!");
    setShowForm(false);
    setDetail("");
  };

  const handleRemove = (id: string) => {
    const updated = methods.filter((m) => m.id !== id);
    setMethods(updated);
    saveToStorage(updated);
    toast("Payment method removed");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Payment Methods</h1>
        </header>

        {methods.length > 0 && (
          <div className="space-y-3 mb-4">
            {methods.map((m) => (
              <div key={m.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
                <span className="text-xl">{m.type === "upi" ? "📱" : "💳"}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.detail}</p>
                </div>
                <button onClick={() => handleRemove(m.id)} className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {showForm ? (
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3 animate-fade-in">
            <h3 className="text-sm font-semibold text-foreground">Add Payment Method</h3>
            <div className="flex gap-2">
              {(["upi", "card"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${type === t ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"}`}>
                  {t === "upi" ? "📱 UPI" : "💳 Card"}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder={type === "upi" ? "UPI ID (e.g. name@upi)" : "Card number"}
              className="w-full bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-secondary text-secondary-foreground">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground">Save</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            {methods.length === 0 && (
              <>
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-4">No saved payment methods</p>
              </>
            )}
            <button onClick={() => setShowForm(true)} className="gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Payment Method
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Payments;
