import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="px-4 pt-6 pb-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Kapda<span className="text-primary">+</span></h1>
            <p className="text-xs text-muted-foreground">Fashion. Fabric. Fit.</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Search className="w-4 h-4 text-foreground" />
          </button>
        </header>

        {/* Search Bar */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search salwar suits, kurtis, fabrics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
            />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="px-4 mb-6">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={heroBanner} alt="Kapda+ Banner" width={1024} height={512} className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent flex items-center">
              <div className="pl-5 pr-16">
                <p className="text-primary-foreground text-lg font-serif font-bold leading-tight">
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
          <div className="flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="flex-1 bg-card border border-border rounded-2xl py-4 flex flex-col items-center gap-1.5 hover:border-primary/40 transition-colors"
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
            {search ? `Results for "${search}"` : "Trending Now"}
          </h2>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No products found. Try a different search.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {(search ? filtered : filtered.slice(0, 4)).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Recommended */}
        {!search && (
          <div className="px-4 mb-6">
            <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Recommended for You</h2>
            <div className="grid grid-cols-2 gap-3">
              {products.slice(2).map((product) => (
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
