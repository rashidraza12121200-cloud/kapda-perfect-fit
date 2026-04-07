import { ArrowLeft, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const Payments = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Payment Methods</h1>
        </header>
        <div className="text-center py-20">
          <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No saved payment methods</p>
          <button className="mt-4 gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl">
            Add Payment Method
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Payments;
