import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/site/ProductCard";
import { productsApi, categoriesApi } from "@/lib/api";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Initialize search query and filters from URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setDebouncedSearch(urlSearch);
    }
    if (urlCategory) {
      setFilterBy(urlCategory);
    }
  }, [searchParams]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.list,
  });

  // Fetch products with filters (using debounced search)
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', filterBy, sortBy, debouncedSearch],
    queryFn: () => {
      const params = {
        category: filterBy !== 'all' ? filterBy : undefined,
        sort_by: sortBy,
        search: debouncedSearch || undefined,
      };
      
      return productsApi.list(params);
    },
    staleTime: 2 * 60 * 1000, // Cache product lists for 2 minutes
  });

  const products = productsData?.results || [];
  
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A-Z" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium Collection
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight animate-slide-up">
              Discover Your
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Signature Scent
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
              Explore our curated collection of luxury fragrances crafted for the modern connoisseur
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto animate-slide-up" style={{animationDelay: "200ms"}}>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={(e) => {
                    console.log('🔤 Search input changed:', e.target.value);
                    setSearchQuery(e.target.value);
                    // Update URL params
                    const newParams = new URLSearchParams(searchParams);
                    if (e.target.value.trim()) {
                      newParams.set('search', e.target.value.trim());
                    } else {
                      newParams.delete('search');
                    }
                    setSearchParams(newParams);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-muted bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Filters & Controls */}
        <div className="mb-8 space-y-6">
          {/* Category Cards with Images */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-muted-foreground">Categories:</span>
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {/* All Category Button */}
              <button
                onClick={() => {
                  setFilterBy('all');
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('category');
                  setSearchParams(newParams);
                }}
                className={`group relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                  filterBy === 'all'
                    ? "ring-2 ring-primary ring-offset-2 shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <span className="text-white text-xs font-medium">All</span>
                </div>
              </button>
              
              {/* Category Cards */}
              {Array.isArray(categoriesData) && categoriesData.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilterBy(cat.name.toLowerCase());
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set('category', cat.name.toLowerCase());
                    setSearchParams(newParams);
                  }}
                  className={`group relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                    filterBy === cat.name.toLowerCase()
                      ? "ring-2 ring-primary ring-offset-2 shadow-lg"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-muted-foreground/50">{cat.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <span className="text-white text-xs font-medium truncate block">{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-muted/30 backdrop-blur-sm border">
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="font-semibold text-foreground">{products.length}</span>
                <span className="text-muted-foreground"> {products.length === 1 ? 'product' : 'products'}</span>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-background border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  title="Grid view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  title="List view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 bg-background hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin" style={{animationDirection: "reverse", animationDuration: "1s"}} />
            </div>
            <p className="mt-6 text-muted-foreground font-medium">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">Oops! Something went wrong</h3>
            <p className="text-muted-foreground mb-6">{error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid/List */}
        {!isLoading && !error && products.length > 0 && (
          <div className={viewMode === "grid" 
            ? "grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
            : "space-y-4"
          }>
            {products.map((p: any, i: number) => (
              <div 
                key={p.id} 
                className="animate-fade-in" 
                style={{animationDelay: `${i * 50}ms`}}
              >
                <ProductCard product={{
                  id: p.slug, // Use slug for URL routing
                  name: p.name,
                  price: parseFloat(p.price),
                  image: p.primary_image || "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
                  tag: p.tag,
                  productId: p.id, // Pass the original numeric ID for cart
                }} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-24 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-display text-3xl font-bold mb-3">No products found</h3>
            <p className="text-muted-foreground text-lg mb-8">
              {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterBy("all");
                setSortBy("featured");
                // Clear URL params
                setSearchParams({});
              }}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        {!isLoading && !error && products.length > 0 && (
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative z-10 p-12 md:p-16 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Need Help?
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold">
                  Can't Find Your Perfect Scent?
                </h3>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Our fragrance experts are here to help you discover your signature scent with personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a 
                    href="/contact" 
                    className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                  >
                    Get Expert Advice
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a 
                    href="/blog" 
                    className="inline-flex items-center gap-2 rounded-xl bg-background border-2 px-8 py-4 font-semibold hover:bg-muted transition-all hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Fragrance Guide
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -left-32 -top-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          </div>
        )}
      </div>
    </main>
  );
}
