import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, Bell, MapPin, Sparkles, Wrench, Zap, Droplets, Wind,
  Truck, Car, Hammer, Bug, Refrigerator, Brush, Star, ChevronRight,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "GrabFix — Home" },
      { name: "description", content: "Book home service pros in minutes." },
    ],
  }),
  component: Home,
});

const categories = [
  { name: "Cleaning", icon: Brush, tint: "oklch(0.94 0.04 148)" },
  { name: "Plumbing", icon: Droplets, tint: "oklch(0.94 0.04 220)" },
  { name: "Electrical", icon: Zap, tint: "oklch(0.95 0.05 90)" },
  { name: "AC Repair", icon: Wind, tint: "oklch(0.94 0.04 200)" },
  { name: "Appliance", icon: Refrigerator, tint: "oklch(0.94 0.04 300)" },
  { name: "Delivery", icon: Truck, tint: "oklch(0.95 0.05 60)" },
  { name: "Car Wash", icon: Car, tint: "oklch(0.94 0.04 180)" },
  { name: "Handyman", icon: Hammer, tint: "oklch(0.94 0.05 40)" },
  { name: "Pest", icon: Bug, tint: "oklch(0.94 0.04 130)" },
  { name: "More", icon: Sparkles, tint: "oklch(0.94 0.01 150)" },
];

const popular = [
  { title: "Deep Home Cleaning", price: 899, rating: 4.9, jobs: 1240, icon: Brush },
  { title: "Leak Repair & Fix", price: 499, rating: 4.8, jobs: 860, icon: Droplets },
  { title: "AC Cleaning & Tune-up", price: 749, rating: 4.9, jobs: 1532, icon: Wind },
  { title: "Electrical Diagnostic", price: 399, rating: 4.7, jobs: 612, icon: Zap },
];

function Home() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="gradient-primary rounded-b-[2rem] px-5 pb-6 pt-12 text-primary-foreground shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider opacity-80">Welcome to</p>
              <h1 className="text-lg font-bold leading-none">GrabFix</h1>
            </div>
          </div>
          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition hover:bg-white/25"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-warning" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 opacity-90" />
          <span className="opacity-90">Deliver to</span>
          <span className="font-semibold">Makati City, Metro Manila</span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-foreground shadow-soft">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            placeholder="What service do you need today?"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <main className="px-5">
        <section className="-mt-4 animate-fade-up rounded-3xl bg-card p-4 shadow-card">
          <div className="grid grid-cols-5 gap-3">
            {categories.map(({ name, icon: Icon, tint }) => (
              <button
                key={name}
                className="group flex flex-col items-center gap-1.5 rounded-2xl py-2 transition active:scale-95"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105"
                  style={{ backgroundColor: tint }}
                >
                  <Icon className="h-5 w-5 text-foreground/80" />
                </span>
                <span className="text-[11px] font-medium text-foreground/80">{name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 animate-fade-up">
          <div className="relative overflow-hidden rounded-3xl bg-foreground p-5 text-background shadow-soft">
            <div className="relative z-10 max-w-[70%]">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Limited offer</p>
              <h3 className="mt-1 text-xl font-bold leading-tight">Get 20% off your first booking</h3>
              <p className="mt-1 text-xs text-background/70">Use code GRABFIX20 at checkout.</p>
              <button className="mt-3 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft transition hover:brightness-110">
                Claim now
              </button>
            </div>
            <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-primary/30 blur-2xl" />
            <div className="pointer-events-none absolute -right-2 bottom-2 text-6xl">🧰</div>
          </div>
        </section>

        <section className="mt-6 animate-fade-up">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Popular services</h2>
            <button className="flex items-center gap-0.5 text-xs font-semibold text-primary">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {popular.map(({ title, price, rating, jobs, icon: Icon }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card transition hover:shadow-soft"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent">
                  <Icon className="h-6 w-6 text-primary-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate text-sm font-semibold">{title}</h3>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5 font-medium text-foreground">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      {rating}
                    </span>
                    <span>·</span>
                    <span>{jobs.toLocaleString()} jobs</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">from</p>
                  <p className="text-sm font-bold text-primary-dark">₱{price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 animate-fade-up">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Nearby pros</h2>
            <Link to="/home" className="text-xs font-semibold text-primary">View map</Link>
          </div>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { name: "Marco D.", role: "Electrician", rating: 4.9, dist: "0.8 km" },
              { name: "Liza R.", role: "Cleaner", rating: 5.0, dist: "1.2 km" },
              { name: "Jun P.", role: "Plumber", rating: 4.8, dist: "1.6 km" },
              { name: "Ana S.", role: "AC Tech", rating: 4.9, dist: "2.1 km" },
            ].map((w) => (
              <div
                key={w.name}
                className="w-40 shrink-0 rounded-2xl bg-card p-3 shadow-card"
              >
                <div className="flex h-20 w-full items-center justify-center rounded-xl bg-gradient-to-br from-accent to-secondary text-2xl font-bold text-primary-dark">
                  {w.name.charAt(0)}
                </div>
                <p className="mt-2 text-sm font-semibold">{w.name}</p>
                <p className="text-xs text-muted-foreground">{w.role}</p>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-0.5 font-medium">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {w.rating}
                  </span>
                  <span className="text-muted-foreground">{w.dist}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
