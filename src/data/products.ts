import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "salwar-suit" | "kurti" | "saree" | "fabric";
  description: string;
  fabricLength?: string;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Pink Embroidered Anarkali Suit",
    price: 2499,
    originalPrice: 3999,
    image: product1,
    category: "salwar-suit",
    description: "Elegant pink anarkali with intricate gold embroidery. Perfect for festive occasions.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Teal Chikankari Kurti",
    price: 1299,
    originalPrice: 1899,
    image: product2,
    category: "kurti",
    description: "Beautiful teal kurti with delicate chikankari work. Ideal for daily and casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Red Banarasi Silk Saree",
    price: 4999,
    originalPrice: 7499,
    image: product3,
    category: "saree",
    description: "Classic red Banarasi silk saree with rich gold border. A timeless wedding essential.",
    fabricLength: "5.5m with blouse piece",
  },
  {
    id: "4",
    name: "Lavender Anarkali Suit",
    price: 2199,
    originalPrice: 3499,
    image: product4,
    category: "salwar-suit",
    description: "Graceful lavender anarkali with white embroidery. Perfect for parties and celebrations.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5",
    name: "Mint Green Cotton Kurti",
    price: 899,
    originalPrice: 1299,
    image: product5,
    category: "kurti",
    description: "Comfortable mint green cotton kurti with elegant chikankari. Great for everyday style.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "6",
    name: "Navy Blue Silk Fabric",
    price: 799,
    image: product6,
    category: "fabric",
    description: "Premium navy blue silk fabric with golden motifs. Price per meter.",
    fabricLength: "Per meter",
  },
];

export const categories = [
  { id: "salwar-suit", name: "Salwar Suit", emoji: "👗" },
  { id: "kurti", name: "Kurti", emoji: "👚" },
  { id: "saree", name: "Saree", emoji: "🥻" },
  { id: "fabric", name: "Fabric", emoji: "🧵" },
];
