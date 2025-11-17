import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import Reviews from "./pages/Reviews";
import Gallery from "./pages/Gallery";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import GiftCards from "./pages/GiftCards";
import Dupes from "./pages/Dupes";
import PerfumeOils from "./pages/PerfumeOils";
import AirAmbience from "./pages/AirAmbience";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // No retries for faster failure feedback
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes (categories rarely change)
      cacheTime: 15 * 60 * 1000, // Keep unused data in cache for 15 minutes
      refetchOnMount: false, // Don't refetch on component mount if data exists
    },
  },
});

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { CartProvider } from "@/contexts/CartContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/dupes" element={<Dupes />} />
            <Route path="/perfume-oils" element={<PerfumeOils />} />
            <Route path="/air-ambience" element={<AirAmbience />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
