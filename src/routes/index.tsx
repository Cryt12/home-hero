import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wrench, Brush, Droplets, Zap, Wind, Refrigerator, Truck, Car, Hammer, Bug,
  Sparkles, ShieldCheck, Clock, Star, ArrowRight, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrabFix — Home services, on demand" },
      { name: "description", content: "Book trusted home service pros in minutes — cleaning, plumbing, electrical, AC repair and more." },
      { property: "og:title", content: "GrabFix — Home services, on demand" },
      { property: "og:description", content: "Trusted pros at your doorstep, in minutes." },
    ],
  }),
  component: Landing,
});

const services = [
  { name: "Cleaning", icon: Brush, tint: "oklch(0.94 0.04 148)" },
  { name: "Plumbing", icon: Droplets, tint: "oklch(0.94 0.04 220)" },
  { name: "Electrical", icon: Zap, tint: "oklch(0.95 0.05 90)" },
  { name: "AC Repair", icon: Wind, tint: "oklch(0.94 0.04 200)" },
  { name: "Appliance", icon: Refrigerator, tint: "oklch(0.94 0.04 300)" },
  { name: "Delivery", icon: Truck, tint: "oklch(0.95 0.05 60)" },
  { name: "Car Wash", icon: Car, tint: "oklch(0.94 0.04 180)" },
  { name: "Handyman", icon: Hammer, tint: "oklch(0.94 0.05 40)" },
  { name: "Pest Control", icon: Bug, tint: "oklch(0.94 0.04 130)" },
];

const perks = [
  { icon: ShieldCheck, title: "Verified pros", desc: "Background-checked and rated by neighbors." },
  { icon: Clock, title: "On-demand", desc: "Book now or schedule for later in seconds." },
  { icon: Sparkles, title: "Quality promise", desc: "Not happy? We'll make it right, guaranteed." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">GrabFix</span>
          </div>
          <Link
            to="/login"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-110"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <header className="gradient-primary px-5 pb-16 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Trusted by 50,000+ homes
          </div>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">
            Home services, on demand.
          </h1>
          <p className="mt-3 max-w-xl text-base opacity-90">
            Cleaning, plumbing, electrical, AC and more — book a verified pro in minutes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft transition hover:brightness-95"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
            >
              Browse services
            </a>
          </div>
        </div>
      </header>

      <section id="services" className="mx-auto -mt-10 max-w-6xl px-5">
        <div className="rounded-3xl bg-card p-5 shadow-card md:p-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">Available services</h2>
              <p className="text-sm text-muted-foreground">Tap any category to see pros near you.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
            {services.map(({ name, icon: Icon, tint }) => (
              <Link
                key={name}
                to="/login"
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-4 transition hover:shadow-soft active:scale-95"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: tint }}
                >
                  <Icon className="h-6 w-6 text-foreground/80" />
                </span>
                <span className="text-xs font-medium text-foreground/80">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { step: "1", title: "Pick a service", desc: "Choose from 9+ home service categories." },
              { step: "2", title: "Match a pro", desc: "We connect you with the nearest verified pro." },
              { step: "3", title: "Sit back", desc: "Track in real-time and pay securely in-app." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-card p-5 shadow-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                  {s.step}
                </span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-foreground p-8 text-background shadow-float md:p-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight">Ready to grab a fix?</h2>
            <p className="mt-2 text-background/70">
              Join 50,000+ homes already using GrabFix for everyday repairs and cleaning.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {["No subscription, pay-per-job", "Free cancellation up to 1 hour before", "24/7 customer support"].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {i}
                </li>
              ))}
            </ul>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-110"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GrabFix. All rights reserved.
      </footer>
    </div>
  );
}
