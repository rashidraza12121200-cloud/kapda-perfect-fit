import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product9 from "@/assets/product-9.jpg";
import product10 from "@/assets/product-10.jpg";
import product11 from "@/assets/product-11.jpg";
import product12 from "@/assets/product-12.jpg";
import product13 from "@/assets/product-13.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  fabricPrice: number;
  originalPrice?: number;
  image: string;
  category: "salwar-suit" | "kurti" | "saree" | "fabric" | "men";
  description: string;
  fabricLength?: string;
  sizes?: string[];
  rating: number;
  reviews: number;
  isCustomUpload?: boolean;
  hideFabric?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Pink Embroidered Anarkali Suit",
    price: 2499,
    fabricPrice: 1249,
    originalPrice: 3999,
    image: product1,
    category: "salwar-suit",
    description: "Elegant pink anarkali with intricate gold embroidery. Perfect for festive occasions.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "Teal Chikankari Kurti",
    price: 1299,
    fabricPrice: 649,
    originalPrice: 1899,
    image: product2,
    category: "kurti",
    description: "Beautiful teal kurti with delicate chikankari work. Ideal for daily and casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.3,
    reviews: 95,
  },
  {
    id: "3",
    name: "Red Banarasi Silk Saree",
    price: 4999,
    fabricPrice: 2499,
    originalPrice: 7499,
    image: product3,
    category: "saree",
    description: "Classic red Banarasi silk saree with rich gold border. A timeless wedding essential.",
    fabricLength: "5.5m with blouse piece",
    rating: 4.8,
    reviews: 312,
  },
  {
    id: "4",
    name: "Lavender Anarkali Suit",
    price: 2199,
    fabricPrice: 1099,
    originalPrice: 3499,
    image: product4,
    category: "salwar-suit",
    description: "Graceful lavender anarkali with white embroidery. Perfect for parties and celebrations.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 76,
  },
  {
    id: "5",
    name: "Mint Green Cotton Kurti",
    price: 899,
    fabricPrice: 449,
    originalPrice: 1299,
    image: product5,
    category: "kurti",
    description: "Comfortable mint green cotton kurti with elegant chikankari. Great for everyday style.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.2,
    reviews: 203,
  },
  {
    id: "6",
    name: "Navy Blue Silk Fabric",
    price: 799,
    fabricPrice: 399,
    image: product6,
    category: "fabric",
    description: "Premium navy blue silk fabric with golden motifs. Price per meter.",
    fabricLength: "Per meter",
    rating: 4.7,
    reviews: 54,
  },
  {
    id: "7",
    name: "Maroon Embroidered Palazzo Set",
    price: 2899,
    fabricPrice: 1449,
    originalPrice: 4299,
    image: product7,
    category: "salwar-suit",
    description: "Stunning maroon palazzo suit with intricate gold embroidery and matching dupatta.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 167,
  },
  {
    id: "9",
    name: "Navy Blue Printed Kurta (Men)",
    price: 1899,
    fabricPrice: 949,
    originalPrice: 2499,
    image: product9,
    category: "men",
    description: "Elegant navy blue block-print kurta for men. Perfect for festive and casual occasions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviews: 88,
  },
  {
    id: "10",
    name: "Abstract Print T-Shirt (Men)",
    price: 799,
    fabricPrice: 399,
    originalPrice: 1199,
    image: product10,
    category: "men",
    description: "Vibrant abstract geometric printed t-shirt. Upload your own design for custom prints!",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.4,
    reviews: 142,
    isCustomUpload: true,
  },
];

export const categories = [
  { id: "salwar-suit", name: "Salwar Suit", emoji: "👗" },
  { id: "kurti", name: "Kurti", emoji: "👚" },
  { id: "saree", name: "Saree", emoji: "🥻" },
  { id: "fabric", name: "Fabric", emoji: "🧵" },
  { id: "men", name: "Men", emoji: "👔" },
];
