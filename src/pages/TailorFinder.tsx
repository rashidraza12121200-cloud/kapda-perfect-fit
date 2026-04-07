import { ArrowLeft, MapPin, Star, Navigation } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const tailors = [
  { id: 1, name: "Anwar Tailors", rating: 4.8, reviews: 124, price: "₹500", distance: "0.8 km", specialty: "Salwar Suits" },
  { id: 2, name: "Meera Boutique", rating: 4.6, reviews: 89, price: "₹650", distance: "1.2 km", specialty: "Kurtis & Suits" },
  { id: 3, name: "Royal Stitch Studio", rating: 4.9, reviews: 210, price: "₹800", distance: "2.1 km", specialty: "Premium Stitching" },
  { id: 4, name: "Shabnam Fashion", rating: 4.4, reviews: 56, price: "₹450", distance: "3.0 km", specialty: "Budget Friendly" },
];

const TailorFinder = () => {
  const navigate = useNavigate();
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);

  const handleLocate = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocating(false);
          setLocated(true);
          toast.success("Location found!", { description: "Showing tailors near you" });
        },
        () => {
          setLocating(false);
          setLocated(true);
          toast.info("Using default location", { description: "Allow location for better results" });
        },
        { timeout: 5000 }
      );
    } else {
      setLocating(false);
      setLocated(true);
      toast.info("Using default location");
    }
  };

  const handleBook = (tailorName: string) => {
    toast.success(`Booking requested!`, { description: `${tailorName} will contact you shortly` });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">Tailors Near You</h1>
            <p className="text-xs text-muted-foreground">Find the best tailors in your area</p>
          </div>
        </header>

        {/* Map / Location */}
        <div className="rounded-2xl overflow-hidden bg-secondary h-40 flex items-center justify-center mb-4 border border-border">
          {located ? (
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Showing tailors near your location</p>
            </div>
          ) : (
            <button onClick={handleLocate} disabled={locating} className="flex flex-col items-center gap-2">
              <Navigation className={`w-8 h-8 text-primary ${locating ? "animate-pulse" : ""}`} />
              <p className="text-xs font-medium text-foreground">
                {locating ? "Finding your location..." : "Tap to detect your location"}
              </p>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {tailors.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center text-accent-foreground font-bold text-lg shrink-0">
                {t.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.specialty} • {t.distance}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium text-foreground">{t.rating}</span>
                  <span className="text-xs text-muted-foreground">({t.reviews})</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-foreground">{t.price}</p>
                <button
                  onClick={() => handleBook(t.name)}
                  className="mt-1 gradient-primary text-primary-foreground text-[10px] font-semibold px-3 py-1.5 rounded-full"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default TailorFinder;
