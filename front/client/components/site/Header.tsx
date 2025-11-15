import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const logoUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F261a98e6df434ad1ad15c1896e5c6aa3%2Fdf532e50700b467496efcdf88eec7598?format=webp&width=800";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-md border hover:bg-accent"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="Kimmy's Fragrance" className="h-10 w-10 rounded-full object-cover" />
            <span className="hidden sm:inline-block font-display text-xl tracking-tight">Kimmy's Fragrance</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/" className={({isActive})=>`text-sm transition-colors hover:text-primary ${isActive?"text-primary font-medium":"text-muted-foreground"}`}>Home</NavLink>
          <NavLink to="/shop" className={({isActive})=>`text-sm transition-colors hover:text-primary ${isActive?"text-primary font-medium":"text-muted-foreground"}`}>Shop</NavLink>
          <NavLink to="/dupes" className={({isActive})=>`text-sm transition-colors hover:text-primary ${isActive?"text-primary font-medium":"text-muted-foreground"}`}>Dupes</NavLink>
          <NavLink to="/perfume-oils" className={({isActive})=>`text-sm transition-colors hover:text-primary ${isActive?"text-primary font-medium":"text-muted-foreground"}`}>Perfume Oils</NavLink>
          <NavLink to="/air-ambience" className={({isActive})=>`text-sm transition-colors hover:text-primary ${isActive?"text-primary font-medium":"text-muted-foreground"}`}>Air & Ambience</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-2 max-w-md w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search fragrances..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* small screen search toggle */}
          <button
            className="md:hidden p-2 rounded-md border"
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Open search"
          >
            <Search className="size-4 text-muted-foreground" />
          </button>

          <Link to="/cart" aria-label="View cart">
            <Button variant="secondary" className="relative">
              <ShoppingBag className="mr-2" /> Cart
              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
                  {items.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {showSearch && (
        <div className="md:hidden absolute left-0 right-0 top-full z-50 border-b bg-white py-3">
          <div className="container flex items-center gap-3">
            <Input 
              placeholder="Search fragrances..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                  setShowSearch(false);
                }
              }}
            />
            <button className="p-2 rounded-md border" onClick={() => setShowSearch(false)} aria-label="Close search">
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}

      {open && (
        <div className="lg:hidden border-t bg-white">
          <div className="container py-3 space-y-2">
            <NavLink to="/" className={({isActive})=>`block py-2 ${isActive?"text-primary font-medium":"text-foreground"}`} onClick={()=>setOpen(false)}>Home</NavLink>
            <NavLink to="/shop" className={({isActive})=>`block py-2 ${isActive?"text-primary font-medium":"text-foreground"}`} onClick={()=>setOpen(false)}>Shop</NavLink>
            <NavLink to="/dupes" className={({isActive})=>`block py-2 ${isActive?"text-primary font-medium":"text-foreground"}`} onClick={()=>setOpen(false)}>Dupes</NavLink>
            <NavLink to="/perfume-oils" className={({isActive})=>`block py-2 ${isActive?"text-primary font-medium":"text-foreground"}`} onClick={()=>setOpen(false)}>Perfume Oils</NavLink>
            <NavLink to="/air-ambience" className={({isActive})=>`block py-2 ${isActive?"text-primary font-medium":"text-foreground"}`} onClick={()=>setOpen(false)}>Air & Ambience</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
