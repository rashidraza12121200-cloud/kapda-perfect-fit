import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn, name, logout } = useUser();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    return activeCategory ? p.category === activeCategory : true;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="px-4 pt-6 pb-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Kapda<span className="text-primary">+</span></h1>
            <p className="text-xs text-muted-foreground">Fashion. Fabric. Fit.</p>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition"
                >
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {name[0]?.toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-foreground hidden sm:inline">{name.split(" ")[0]}</span>
                </button>
                <button
                  onClick={() => { logout(); toast("Logged out"); }}
                  title="Log out"
                  className="w-9 h-9 rounded-full bg-secondary hover:bg-destructive/10 hover:text-destructive flex items-center justify-center text-foreground transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 gradient-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </header>

        {/* Hero Banner */}
        <div className="px-4 mb-6">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={heroBanner} alt="Kapda+ Banner" width={1024} height={512} className="w-full h-44 md:h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent flex items-center">
              <div className="pl-5 pr-16">
                <p className="text-primary-foreground text-lg md:text-2xl font-serif font-bold leading-tight">
                  Get Perfect Fit<br />with Custom Stitch
                </p>
                <button
                  onClick={() => navigate("/ai-recommend")}
                  className="mt-3 gradient-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full"
                >
                  Try AI Fit →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mb-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Shop by Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`min-w-[72px] flex-1 bg-card border rounded-2xl py-4 flex flex-col items-center gap-1.5 transition-colors ${
                  activeCategory === cat.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium text-foreground">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="px-4 mb-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
            {activeCategory
              ? `${categories.find(c => c.id === activeCategory)?.name || activeCategory.replace("-", " ")}`
              : "Trending Now"}
          </h2>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {(activeCategory ? filtered : filtered.slice(0, 4)).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Recommended */}
        {!activeCategory && (
          <div className="px-4 mb-6">
            <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Recommended for You</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.slice(4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
