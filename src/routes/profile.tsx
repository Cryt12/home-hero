import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight, MapPin, CreditCard, Bell, Gift, HelpCircle,
  Shield, Settings, LogOut, Wallet, Heart, Star,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — GrabFix" },
      { name: "description", content: "Manage your account, payments, and preferences." },
    ],
  }),
  component: Profile,
});

const sections: { title: string; items: { label: string; icon: typeof MapPin; hint?: string }[] }[] = [
  {
    title: "Account",
    items: [
      { label: "Saved addresses", icon: MapPin, hint: "3 places" },
      { label: "Payment methods", icon: CreditCard, hint: "•••• 4242" },
      { label: "Notifications", icon: Bell },
    ],
  },
  {
    title: "Rewards",
    items: [
      { label: "Promos & offers", icon: Gift, hint: "2 active" },
      { label: "Favorites", icon: Heart },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help center", icon: HelpCircle },
      { label: "Safety & privacy", icon: Shield },
      { label: "App settings", icon: Settings },
    ],
  },
];

function Profile() {
  const navigate = useNavigate();
  const handleSignOut = () => navigate({ to: "/landing" });
  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      {/* Identity card */}
      <section className="px-5">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.55_0.16_148)] p-5 text-primary-foreground shadow-float">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
              AS
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold">Aarav Sharma</h2>
              <p className="text-sm opacity-90 truncate">aarav.sharma@email.com</p>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                <Star className="h-3 w-3 fill-current" /> 4.9 • Gold member
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-white/15 p-3 text-center backdrop-blur">
            <div>
              <p className="text-lg font-bold">24</p>
              <p className="text-[11px] opacity-90">Bookings</p>
            </div>
            <div className="border-x border-white/20">
              <p className="text-lg font-bold">₹1,240</p>
              <p className="text-[11px] opacity-90">Wallet</p>
            </div>
            <div>
              <p className="text-lg font-bold">850</p>
              <p className="text-[11px] opacity-90">Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet shortcut */}
      <section className="px-5 pt-4">
        <button className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft hover:bg-muted">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
            <Wallet className="h-5 w-5" />
          </span>
          <div className="flex-1 text-left">
            <p className="font-semibold text-foreground">GrabFix Wallet</p>
            <p className="text-xs text-muted-foreground">Top up and pay faster</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </section>

      {/* Sections */}
      {sections.map((s) => (
        <section key={s.title} className="px-5 pt-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {s.title}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {s.items.map((item, idx) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-muted ${
                  idx !== s.items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                  <item.icon className="h-4.5 w-4.5" />
                </span>
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                {item.hint && <span className="text-xs text-muted-foreground">{item.hint}</span>}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      ))}

      <section className="px-5 pt-6">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold text-destructive shadow-soft hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">GrabFix v1.0.0</p>
      </section>

      <BottomNav />
    </div>
  );
}
