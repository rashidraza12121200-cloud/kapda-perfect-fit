import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const AIRecommend = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<null | { size: string; fabric: string; tip: string }>(null);

  const getRecommendation = () => {
    const h = Number(height);
    const w = Number(weight);
    let size = "M";
    let fabric = "2.5m";

    if (w > 80) { size = "XL"; fabric = "3m"; }
    else if (w > 70) { size = "L"; fabric = "2.5m"; }
    else if (w > 55) { size = "M"; fabric = "2.5m"; }
    else { size = "S"; fabric = "2m"; }

    if (h > 170) fabric = (parseFloat(fabric) + 0.5) + "m";

    setResult({
      size,
      fabric,
      tip: h > 165 ? "Longer length recommended for your height!" : "Standard length will fit perfectly.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">AI Size Fit</h1>
            <p className="text-xs text-muted-foreground">Smart recommendations just for you</p>
          </div>
        </header>

        <div className="bg-card border border-border rounded-2xl p-5 mt-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Tell us about you</p>
              <p className="text-xs text-muted-foreground">We'll suggest the best size & fabric</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 160"
                className="w-full mt-1 bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 60"
                className="w-full mt-1 bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              onClick={getRecommendation}
              disabled={!height || !weight}
              className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm disabled:opacity-50 mt-2"
            >
              ✨ Get My Recommendation
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-5 bg-card border border-border rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Your Perfect Fit</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground">Suggested Size</p>
                <p className="text-2xl font-bold text-foreground mt-1">{result.size}</p>
              </div>
              <div className="bg-secondary rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground">Fabric Length</p>
                <p className="text-2xl font-bold text-foreground mt-1">{result.fabric}</p>
              </div>
            </div>
            <div className="bg-accent/10 rounded-xl p-3 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <p className="text-xs text-foreground">{result.tip}</p>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default AIRecommend;
