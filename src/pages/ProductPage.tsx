import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Scissors } from "lucide-react";
import { products } from "@/data/products";
import BottomNav from "@/components/BottomNav";

type BuyOption = "readymade" | "fabric" | "custom";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [option, setOption] = useState<BuyOption>("readymade");
  const [selectedSize, setSelectedSize] = useState("M");
  const [fabricLength, setFabricLength] = useState(2.5);
  const [height, setHeight] = useState("");
  const [chest, setChest] = useState("");

  if (!product) return <div className="p-8 text-center text-muted-foreground">Product not found</div>;

  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const tabs: { key: BuyOption; label: string; icon: React.ReactNode }[] = [
    { key: "readymade", label: "Readymade", icon: <ShoppingCart className="w-3.5 h-3.5" /> },
    { key: "fabric", label: "Fabric", icon: <span className="text-sm">🧵</span> },
    { key: "custom", label: "Custom Stitch", icon: <Scissors className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Image */}
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full aspect-[3/4] object-cover" />
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
            <Heart className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Details */}
        <div className="px-4 pt-4 -mt-6 bg-background rounded-t-3xl relative z-10">
          <p className="text-xs text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
          <h1 className="font-serif text-xl font-bold text-foreground mt-1">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{product.description}</p>

          {/* Option Tabs */}
          <div className="mt-5">
            <h3 className="font-semibold text-sm text-foreground mb-2">How would you like it?</h3>
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setOption(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    option === tab.key
                      ? "gradient-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Readymade */}
          {option === "readymade" && (
            <div className="mt-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">Select Size</h3>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${
                      selectedSize === s
                        ? "bg-foreground text-background"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fabric */}
          {option === "fabric" && (
            <div className="mt-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">Select Fabric Length</h3>
              <div className="flex gap-2">
                {[1, 1.5, 2, 2.5, 3].map((m) => (
                  <button
                    key={m}
                    onClick={() => setFabricLength(m)}
                    className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all ${
                      fabricLength === m
                        ? "bg-foreground text-background"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
              <p className="text-xs text-accent mt-2 font-medium">💡 2.5m recommended for this design</p>
            </div>
          )}

          {/* Custom Stitch */}
          {option === "custom" && (
            <div className="mt-4 space-y-3">
              <h3 className="font-semibold text-sm text-foreground mb-2">Your Measurements</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="165"
                    className="w-full mt-1 bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Chest (inches)</label>
                  <input
                    type="number"
                    value={chest}
                    onChange={(e) => setChest(e.target.value)}
                    placeholder="36"
                    className="w-full mt-1 bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <button
                onClick={() => navigate("/tailors")}
                className="w-full gradient-accent text-accent-foreground font-semibold py-3 rounded-xl text-sm"
              >
                🪡 Find a Tailor Near You
              </button>
            </div>
          )}

          {/* Add to Cart */}
          <button className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-sm mt-6 shadow-lg">
            Add to Cart — ₹{option === "fabric" ? (product.price * fabricLength).toLocaleString() : product.price.toLocaleString()}
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProductPage;
