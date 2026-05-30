import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Users, CalendarCheck, Wrench, DollarSign, TrendingUp, ShieldCheck,
  LogOut, Activity, AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — GrabFix" },
      { name: "description", content: "GrabFix admin console." },
    ],
  }),
  component: AdminDashboard,
});

const stats = [
  { label: "Active users", value: "12,480", delta: "+8.2%", icon: Users },
  { label: "Bookings today", value: "1,238", delta: "+12.4%", icon: CalendarCheck },
  { label: "Pros online", value: "342", delta: "+3.1%", icon: Wrench },
  { label: "Revenue (₱)", value: "₱482,910", delta: "+18.6%", icon: DollarSign },
];

const recentBookings = [
  { id: "BK-10241", customer: "Aarav Sharma", service: "Deep Home Cleaning", pro: "Maria S.", status: "In progress" },
  { id: "BK-10240", customer: "Liza Reyes", service: "AC Tune-up", pro: "Rahul K.", status: "Scheduled" },
  { id: "BK-10239", customer: "Marco Dela Cruz", service: "Leak Repair", pro: "Anil P.", status: "Completed" },
  { id: "BK-10238", customer: "Jun Pascual", service: "Electrical Diagnostic", pro: "Sneha R.", status: "Completed" },
  { id: "BK-10237", customer: "Ana Santos", service: "Pest Control", pro: "Karan V.", status: "Cancelled" },
];

const alerts = [
  { title: "3 pros pending verification", desc: "Review documents and approve background checks.", icon: ShieldCheck },
  { title: "2 disputes need attention", desc: "Customer escalations awaiting admin review.", icon: AlertTriangle },
];

function statusTone(status: string) {
  switch (status) {
    case "In progress": return "bg-primary/10 text-primary";
    case "Scheduled": return "bg-accent text-primary-dark";
    case "Completed": return "bg-secondary text-foreground";
    case "Cancelled": return "bg-destructive/10 text-destructive";
    default: return "bg-muted text-foreground";
  }
}

function AdminDashboard() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    try {
      localStorage.removeItem("gf_role");
      localStorage.removeItem("gf_email");
    } catch {/* ignore */}
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">GrabFix</p>
              <h1 className="text-base font-bold leading-none">Admin Dashboard</h1>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft hover:bg-muted"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {/* Stats */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, delta, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  <TrendingUp className="h-3 w-3" /> {delta}
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Recent bookings */}
          <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">Recent bookings</h2>
                <p className="text-xs text-muted-foreground">Latest activity across the platform</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <Activity className="h-3.5 w-3.5" /> Live
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Booking</th>
                    <th className="px-3 py-2 font-semibold">Customer</th>
                    <th className="px-3 py-2 font-semibold">Service</th>
                    <th className="px-3 py-2 font-semibold">Pro</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, i) => (
                    <tr key={b.id} className={i !== recentBookings.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                      <td className="px-3 py-3 font-medium">{b.customer}</td>
                      <td className="px-3 py-3 text-muted-foreground">{b.service}</td>
                      <td className="px-3 py-3 text-muted-foreground">{b.pro}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusTone(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Alerts */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-base font-bold">Needs attention</h2>
            <p className="text-xs text-muted-foreground">Items waiting on admin action</p>
            <div className="mt-4 space-y-3">
              {alerts.map(({ title, desc, icon: Icon }) => (
                <div key={title} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:brightness-110">
              Open admin queue
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
