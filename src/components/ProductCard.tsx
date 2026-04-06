import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <button
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 text-left w-full"
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 gradient-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
        <h3 className="font-medium text-sm text-foreground mt-0.5 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="mt-2 text-xs font-medium text-primary">View Options →</div>
      </div>
    </button>
  );
};

export default ProductCard;
