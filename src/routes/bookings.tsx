import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Clock, MapPin, Star, Brush, Droplets, Wind, Zap } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My Bookings — GrabFix" },
      { name: "description", content: "Track your upcoming and past home service bookings." },
    ],
  }),
  component: Bookings,
});

const upcoming = [
  { title: "Deep Home Cleaning", pro: "Maria S.", when: "Today, 2:00 PM", address: "Bandra West", status: "On the way", icon: Brush },
  { title: "AC Cleaning & Tune-up", pro: "Rahul K.", when: "Tomorrow, 10:30 AM", address: "Andheri East", status: "Confirmed", icon: Wind },
];

const past = [
  { title: "Leak Repair", pro: "Anil P.", when: "May 24", rating: 5, icon: Droplets },
  { title: "Electrical Diagnostic", pro: "Sneha R.", when: "May 18", rating: 4, icon: Zap },
  { title: "Deep Cleaning", pro: "Maria S.", when: "May 9", rating: 5, icon: Brush },
];

function Bookings() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-30 bg-background/90 px-5 pt-6 pb-4 backdrop-blur">
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="text-sm text-muted-foreground">Track and manage your services</p>
      </header>

      <section className="px-5 pt-2">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Upcoming</h2>
        <div className="space-y-3">
          {upcoming.map((b) => (
            <article key={b.title} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                  <b.icon className="h-6 w-6" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-foreground truncate">{b.title}</h3>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {b.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">with {b.pro}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{b.when}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{b.address}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-xl border border-border bg-background py-2 text-sm font-medium hover:bg-muted">
                  Reschedule
                </button>
                <button className="flex-1 rounded-xl bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Track
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Past</h2>
        <div className="space-y-3">
          {past.map((b) => (
            <article key={b.title + b.when} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground">
                <b.icon className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.pro} • {b.when}</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {b.rating}.0
              </div>
            </article>
          ))}
        </div>
      </section>

      {upcoming.length === 0 && past.length === 0 && (
        <div className="mt-20 flex flex-col items-center text-center px-8">
          <CalendarCheck className="h-12 w-12 text-muted-foreground" />
          <p className="mt-3 font-semibold text-foreground">No bookings yet</p>
          <p className="text-sm text-muted-foreground">Book a service from the home screen</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
