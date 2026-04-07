import { ArrowLeft, HelpCircle, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const HelpSupport = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Help & Support</h1>
        </header>
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Email Us</p>
              <p className="text-xs text-muted-foreground">support@kapdaplus.com</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Call Us</p>
              <p className="text-xs text-muted-foreground">+91 1800-123-4567</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <HelpCircle className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground mb-1">FAQs</p>
            <p className="text-xs text-muted-foreground">Find answers to common questions about orders, returns, and custom stitching.</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HelpSupport;
