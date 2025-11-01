export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="container py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-display text-xl">Kimmy's Fragrance</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Curated niche perfumes crafted to leave a lasting impression.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Best Sellers</li>
            <li>New Arrivals</li>
            <li>Gift Sets</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Join for drops & offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input className="flex-1 w-full rounded-md border px-3 py-2" placeholder="Email address" />
            <button className="rounded-md bg-primary px-4 text-primary-foreground w-full sm:w-auto">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kimmy's Fragrance. All rights reserved.
      </div>
    </footer>
  );
}
