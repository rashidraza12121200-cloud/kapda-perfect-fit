import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Review } from "@/data/products";

interface ReviewContextType {
  reviews: Review[];
  addReview: (productId: string, userName: string, rating: number, comment: string) => void;
  getProductReviews: (productId: string) => Review[];
  getAverageRating: (productId: string, defaultRating: number) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("kapda_reviews");
    return saved ? JSON.parse(saved, (key, val) => key === "date" ? new Date(val) : val) : [];
  });

  useEffect(() => {
    localStorage.setItem("kapda_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId: string, userName: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName,
      rating,
      comment,
      date: new Date(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getProductReviews = (productId: string) => reviews.filter((r) => r.productId === productId);

  const getAverageRating = (productId: string, defaultRating: number) => {
    const pReviews = getProductReviews(productId);
    if (pReviews.length === 0) return defaultRating;
    return pReviews.reduce((sum, r) => sum + r.rating, 0) / pReviews.length;
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getProductReviews, getAverageRating }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewProvider");
  return ctx;
};
