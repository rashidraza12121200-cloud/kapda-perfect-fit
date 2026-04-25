import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { UserProvider } from "@/context/UserContext";
import { ReviewProvider } from "@/context/ReviewContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import AIRecommend from "./pages/AIRecommend";
import TailorFinder from "./pages/TailorFinder";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Addresses from "./pages/Addresses";
import Payments from "./pages/Payments";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <ReviewProvider>

                  <Toaster />
                  <Sonner />

                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                      <Route path="/ai-recommend" element={<AIRecommend />} />
                      <Route path="/tailors" element={<TailorFinder />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/addresses" element={<Addresses />} />
                      <Route path="/payments" element={<Payments />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/help" element={<HelpSupport />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>

                </ReviewProvider>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
