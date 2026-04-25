import { ArrowLeft, Mail, Phone, User as UserIcon, MapPin, Check, X, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const Account = () => {
  const navigate = useNavigate();
  const { name, email, phone, addresses, isLoggedIn, setName, setEmail, setPhone } = useUser();
  const [editField, setEditField] = useState<null | "name" | "email" | "phone">(null);
  const [draft, setDraft] = useState("");

  const startEdit = (f: "name" | "email" | "phone", current: string) => {
    setEditField(f); setDraft(current);
  };
  const save = () => {
    if (!draft.trim()) { setEditField(null); return; }
    if (editField === "name") setName(draft.trim());
    if (editField === "email") setEmail(draft.trim());
    if (editField === "phone") setPhone(draft.trim());
    toast.success("Updated");
    setEditField(null);
  };

  const Row = ({ icon: Icon, label, value, field }: any) => (
    <div className="flex items-center gap-3 p-4 border-b border-border last:border-b-0">
      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
        <Icon className="w-4 h-4 text-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {editField === field ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
              className="bg-secondary text-foreground rounded-lg px-2 py-1 text-sm outline-none flex-1 focus:ring-2 focus:ring-primary/30"
            />
            <button onClick={save} className="text-green-500"><Check className="w-4 h-4" /></button>
            <button onClick={() => setEditField(null)} className="text-destructive"><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <p className="text-sm font-medium text-foreground truncate">{value || <span className="text-muted-foreground italic">Not set</span>}</p>
        )}
      </div>
      {editField !== field && (
        <button onClick={() => startEdit(field, value || "")} className="text-primary">
          <Edit2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Account Details</h1>
        </header>

        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {name[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{name}</h2>
            <p className="text-xs text-muted-foreground">{isLoggedIn ? "Signed in" : "Guest"}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <Row icon={UserIcon} label="Full Name" value={name} field="name" />
          <Row icon={Mail} label="Email" value={email} field="email" />
          <Row icon={Phone} label="Phone" value={phone} field="phone" />
        </div>

        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Saved Addresses
            </h3>
            <button onClick={() => navigate("/addresses")} className="text-xs text-primary font-semibold">Manage</button>
          </div>
          {addresses.length === 0 ? (
            <p className="text-xs text-muted-foreground">No addresses saved yet.</p>
          ) : (
            <ul className="space-y-2">
              {addresses.map((a) => (
                <li key={a.id} className="text-xs text-foreground bg-secondary/50 rounded-lg p-2">
                  <span className="font-medium">{a.label}</span> — {a.full}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Account;
