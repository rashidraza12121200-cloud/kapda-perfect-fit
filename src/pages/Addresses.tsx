import { useState } from "react";
import { ArrowLeft, MapPin, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const Addresses = () => {
  const navigate = useNavigate();
  const { addresses, addAddress, removeAddress } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("Home");
  const [full, setFull] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    if (!full.trim() || !phone.trim()) { toast.error("Please fill all fields"); return; }
    addAddress({ label, full, phone });
    toast.success("Address saved!");
    setShowForm(false);
    setFull("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Addresses</h1>
        </header>

        {addresses.length > 0 && (
          <div className="space-y-3 mb-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-card border border-border rounded-2xl p-4 flex gap-3 animate-fade-in">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{addr.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{addr.full}</p>
                  <p className="text-xs text-muted-foreground">📞 {addr.phone}</p>
                </div>
                <button onClick={() => { removeAddress(addr.id); toast("Address removed"); }} className="text-destructive self-start">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {showForm ? (
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3 animate-fade-in">
            <h3 className="text-sm font-semibold text-foreground">New Address</h3>
            <div className="flex gap-2">
              {["Home", "Work", "Other"].map((l) => (
                <button key={l} onClick={() => setLabel(l)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${label === l ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"}`}>{l}</button>
              ))}
            </div>
            <textarea value={full} onChange={(e) => setFull(e.target.value)} placeholder="Full address with pincode"
              className="w-full bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number"
              className="w-full bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-secondary text-secondary-foreground">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-semibold gradient-primary text-primary-foreground">Save</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            {addresses.length === 0 && (
              <>
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-4">No saved addresses</p>
              </>
            )}
            <button onClick={() => setShowForm(true)} className="gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Address
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Addresses;
