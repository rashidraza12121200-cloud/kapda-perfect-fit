import { useState } from "react";
import { ArrowLeft, ChevronRight, Heart, Package, MapPin, CreditCard, Bell, HelpCircle, LogOut, Check, X, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: UserCircle, label: "Account Details", desc: "Name, email & phone", path: "/account" },
  { icon: Package, label: "My Orders", desc: "Track & manage orders", path: "/orders" },
  { icon: Heart, label: "Wishlist", desc: "Your saved items", path: "/wishlist" },
  { icon: MapPin, label: "Addresses", desc: "Manage delivery addresses", path: "/addresses" },
  { icon: CreditCard, label: "Payments", desc: "Saved payment methods", path: "/payments" },
  { icon: Bell, label: "Notifications", desc: "Alerts & updates", path: "/notifications" },
  { icon: HelpCircle, label: "Help & Support", desc: "FAQs & contact us", path: "/help" },
];

const Profile = () => {
  const navigate = useNavigate();
  const { name, email, setName, logout } = useUser();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  const handleSaveName = () => {
    if (editName.trim()) {
      setName(editName.trim());
      toast.success("Name updated!");
    }
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Profile</h1>
        </header>

        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            {name[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex items-center gap-2">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus
                  className="bg-secondary text-foreground rounded-lg px-2 py-1 text-sm outline-none flex-1 focus:ring-2 focus:ring-primary/30" />
                <button onClick={handleSaveName} className="text-green-500"><Check className="w-4 h-4" /></button>
                <button onClick={() => setEditing(false)} className="text-destructive"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <h2 className="font-semibold text-foreground">{name}</h2>
            )}
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
          {!editing && <button onClick={() => { setEditName(name); setEditing(true); }} className="text-xs font-semibold text-primary">Edit</button>}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {menuItems.map((item, idx) => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors ${idx < menuItems.length - 1 ? "border-b border-border" : ""}`}>
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <item.icon className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button onClick={handleLogout} className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-semibold">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
