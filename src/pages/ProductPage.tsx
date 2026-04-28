import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Scissors, Star, Upload, Image } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useReviews } from "@/context/ReviewContext";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

type BuyOption = "readymade" | "fabric" | "custom";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { getProductReviews, addReview, getAverageRating } = useReviews();
  const { name: userName } = useUser();
  const product = products.find((p) => p.id === id);
  const [option, setOption] = useState<BuyOption>("readymade");
  const [selectedSize, setSelectedSize] = useState("M");
  const [fabricLength, setFabricLength] = useState(2.5);
  const [height, setHeight] = useState("");
  const [chest, setChest] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  if (!product) return <div className="p-8 text-center text-muted-foreground">Product not found</div>;

  const productReviews = getProductReviews(product.id);
  const avgRating = getAverageRating(product.id, product.rating);
  const totalReviews = product.reviews + productReviews.length;

  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const wishlisted = isInWishlist(product.id);
  const stitchingCharge = 500;

  const getPrice = () => {
    if (option === "readymade") return product.price;
    if (option === "fabric") return product.fabricPrice * fabricLength;
    return product.fabricPrice * fabricLength + stitchingCharge;
  };

  const allTabs: { key: BuyOption; label: string; icon: React.ReactNode; priceLabel: string }[] = [
    { key: "readymade", label: "Readymade", icon: <ShoppingCart className="w-3.5 h-3.5" />, priceLabel: `₹${product.price.toLocaleString()}` },
    { key: "fabric", label: "Fabric", icon: <span className="text-sm">🧵</span>, priceLabel: `₹${product.fabricPrice.toLocaleString()}/m` },
    { key: "custom", label: "Custom Stitch", icon: <Scissors className="w-3.5 h-3.5" />, priceLabel: `₹${(product.fabricPrice + stitchingCharge).toLocaleString()}+` },
  ];
  const tabs = product.hideFabric ? allTabs.filter((t) => t.key !== "fabric") : allTabs;

  const handleAddToCart = () => {
    let detail = "";
    let optionLabel = "";
    if (option === "readymade") {
      optionLabel = "Readymade";
      detail = `Size: ${selectedSize}`;
    } else if (option === "fabric") {
      optionLabel = "Fabric";
      detail = `${fabricLength}m`;
    } else {
      optionLabel = "Custom Stitch";
      detail = `${fabricLength}m + Stitching | H: ${height || "—"}cm, C: ${chest || "—"}in`;
    }
    if (uploadedImage) detail += " | Custom Design";
    addItem({ product, option: optionLabel, detail });
    toast.success("Added to cart!", { description: `${product.name} — ${optionLabel}` });
  };

  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist ❤️");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        toast.success("Design uploaded! 🎨");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = () => {
    if (!reviewComment.trim()) { toast.error("Please write a comment"); return; }
    addReview(product.id, userName, reviewRating, reviewComment.trim());
    toast.success("Review submitted! ⭐");
    setShowReviewForm(false);
    setReviewComment("");
    setReviewRating(5);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-5xl mx-auto md:flex md:gap-8">
        <div className="relative md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full aspect-[3/4] object-cover md:rounded-2xl md:mt-6" />
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={toggleWishlist} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
            <Heart className={`w-5 h-5 transition-colors ${wishlisted ? "text-red-500 fill-red-500" : "text-foreground"}`} />
          </button>
        </div>

        <div className="px-4 pt-4 -mt-6 md:mt-6 bg-background rounded-t-3xl relative z-10 animate-fade-in md:w-1/2 md:rounded-none md:-mt-0">
          <p className="text-xs text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
          <h1 className="font-serif text-xl font-bold text-foreground mt-1">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(avgRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground">{avgRating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({totalReviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <p className="text-xs text-accent font-medium mt-1">Fabric only: ₹{product.fabricPrice.toLocaleString()}/m</p>
          <p className="text-sm text-muted-foreground mt-2">{product.description}</p>

          {/* Custom Upload for men's printed t-shirt */}
          {product.isCustomUpload && (
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" /> Upload Your Design
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Upload any image and we'll print it on your t-shirt!</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploadedImage ? (
                <div className="flex items-center gap-3">
                  <img src={uploadedImage} alt="Custom design" className="w-16 h-16 rounded-xl object-cover border border-border" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Design uploaded ✓</p>
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs text-primary font-semibold mt-1">Change</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-primary/30 rounded-xl py-4 flex flex-col items-center gap-2 hover:bg-primary/5 transition-colors">
                  <Image className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium text-foreground">Choose Image</span>
                </button>
              )}
            </div>
          )}

          {/* Option Tabs */}
          <div className="mt-5">
            <h3 className="font-semibold text-sm text-foreground mb-2">How would you like it?</h3>
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setOption(tab.key)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    option === tab.key
                      ? "gradient-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <span className="flex items-center gap-1">{tab.icon} {tab.label}</span>
                  <span className="text-[10px] opacity-80">{tab.priceLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {option === "readymade" && (
            <div className="mt-4 animate-fade-in">
              <h3 className="font-semibold text-sm text-foreground mb-2">Select Size</h3>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${selectedSize === s ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {option === "fabric" && (
            <div className="mt-4 animate-fade-in">
              <h3 className="font-semibold text-sm text-foreground mb-2">Select Fabric Length</h3>
              <div className="flex gap-2">
                {[1, 1.5, 2, 2.5, 3].map((m) => (
                  <button key={m} onClick={() => setFabricLength(m)}
                    className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all ${fabricLength === m ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"}`}>
                    {m}m
                  </button>
                ))}
              </div>
              <p className="text-xs text-accent mt-2 font-medium">💡 2.5m recommended for this design</p>
            </div>
          )}

          {option === "custom" && (
            <div className="mt-4 space-y-3 animate-fade-in">
              <h3 className="font-semibold text-sm text-foreground mb-2">Your Measurements</h3>
              <div className="flex gap-2 mb-3">
                {[1.5, 2, 2.5, 3].map((m) => (
                  <button key={m} onClick={() => setFabricLength(m)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${fabricLength === m ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"}`}>
                    {m}m
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="165"
                    className="w-full mt-1 bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Chest (inches)</label>
                  <input type="number" value={chest} onChange={(e) => setChest(e.target.value)} placeholder="36"
                    className="w-full mt-1 bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3 text-xs text-muted-foreground">
                <p>Fabric: ₹{(product.fabricPrice * fabricLength).toLocaleString()} + Stitching: ₹{stitchingCharge}</p>
              </div>
              <button onClick={() => navigate("/tailors")} className="w-full gradient-accent text-accent-foreground font-semibold py-3 rounded-xl text-sm">
                🪡 Find a Tailor Near You
              </button>
            </div>
          )}

          <button onClick={handleAddToCart}
            className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-sm mt-6 shadow-lg active:scale-95 transition-transform">
            Add to Cart — ₹{getPrice().toLocaleString()}
          </button>

          {/* Reviews Section */}
          <div className="mt-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-foreground">Ratings & Reviews</h3>
              <button onClick={() => setShowReviewForm(!showReviewForm)} className="text-xs font-semibold text-primary">
                {showReviewForm ? "Cancel" : "Write Review"}
              </button>
            </div>

            {showReviewForm && (
              <div className="bg-card border border-border rounded-2xl p-4 mb-4 animate-fade-in space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Your Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setReviewRating(s)}>
                        <Star className={`w-6 h-6 transition-colors ${s <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full bg-secondary text-foreground rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20"
                />
                <button onClick={handleSubmitReview} className="w-full gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl text-sm">
                  Submit Review
                </button>
              </div>
            )}

            {productReviews.length > 0 ? (
              <div className="space-y-3">
                {productReviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-2xl p-4 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                          {review.userName[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{review.userName}</p>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProductPage;
