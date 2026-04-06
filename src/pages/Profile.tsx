import { ArrowLeft, ChevronRight, Heart, Package, MapPin, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: Package, label: "My Orders", desc: "Track & manage orders" },
  { icon: Heart, label: "Wishlist", desc: "Your saved items" },
  { icon: MapPin, label: "Addresses", desc: "Manage delivery addresses" },
  { icon: CreditCard, label: "Payments", desc: "Saved payment methods" },
  { icon: Bell, label: "Notifications", desc: "Alerts & updates" },
  { icon: HelpCircle, label: "Help & Support", desc: "FAQs & contact us" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Profile</h1>
        </header>

        {/* User Card */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            K
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">Kapda+ User</h2>
            <p className="text-xs text-muted-foreground">kapda.user@example.com</p>
          </div>
          <button className="text-xs font-semibold text-primary">Edit</button>
        </div>

        {/* Menu */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {menuItems.map((item, idx) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors ${
                idx < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
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

        {/* Logout */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-semibold">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
