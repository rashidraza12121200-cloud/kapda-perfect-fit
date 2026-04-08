import { ArrowLeft, Heart, Trash2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import BottomNav from "@/components/BottomNav";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Wishlist</h1>
          {wishlist.length > 0 && <span className="text-xs text-muted-foreground ml-auto">{wishlist.length} items</span>}
        </header>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Your wishlist is empty</p>
            <button onClick={() => navigate("/")} className="mt-4 gradient-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-2xl p-3 flex gap-3 animate-fade-in">
                <button onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-xl" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-foreground">{product.rating}</span>
                  </div>
                  <p className="font-bold text-foreground mt-1">₹{product.price.toLocaleString()}</p>
                  <button onClick={() => navigate(`/product/${product.id}`)} className="mt-1 text-xs font-semibold text-primary">
                    View Product →
                  </button>
                </div>
                <button onClick={() => removeFromWishlist(product.id)} className="text-destructive self-start">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Wishlist;
