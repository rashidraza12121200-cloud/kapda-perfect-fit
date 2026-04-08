import { ArrowLeft, Bell, Package, Tag, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const notifications = [
  { icon: Package, title: "Order Confirmed!", desc: "Your order #KPD-XXXX has been placed successfully.", time: "Just now", color: "text-green-500" },
  { icon: Tag, title: "Flash Sale 🔥", desc: "Up to 50% off on all Salwar Suits. Limited time!", time: "2h ago", color: "text-primary" },
  { icon: Gift, title: "Welcome Offer", desc: "Get ₹200 off on your first custom stitch order.", time: "1d ago", color: "text-accent" },
  { icon: Bell, title: "New Arrivals", desc: "Check out the latest ethnic wear collection.", time: "3d ago", color: "text-yellow-500" },
];

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Notifications</h1>
        </header>
        <div className="space-y-3">
          {notifications.map((n, idx) => (
            <div key={idx} className="bg-card border border-border rounded-2xl p-4 flex gap-3 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <n.icon className={`w-4 h-4 ${n.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Notifications;
