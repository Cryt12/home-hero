import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users, CalendarCheck, Wrench, DollarSign, TrendingUp, ShieldCheck,
  LogOut, Activity, AlertTriangle, Plus, Trash2, Pencil, Save, X, Star, Image as ImageIcon,
} from "lucide-react";
import {
  useContent, SERVICE_ICONS, SERVICE_ICON_NAMES, newId,
  type Service, type Review, type HeroImage,
} from "@/lib/content-store";

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

const alerts = [
  { title: "3 pros pending verification", desc: "Review documents and approve background checks.", icon: ShieldCheck },
  { title: "2 disputes need attention", desc: "Customer escalations awaiting admin review.", icon: AlertTriangle },
];

type Tab = "overview" | "services" | "reviews" | "images";

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  const handleSignOut = () => {
    try {
      localStorage.removeItem("gf_role");
      localStorage.removeItem("gf_email");
    } catch {/* ignore */}
    navigate({ to: "/" });
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "reviews", label: "Reviews" },
    { id: "images", label: "Landing images" },
  ];

  return (
    <div className="min-h-screen bg-background">
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
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {tab === "overview" && <Overview />}
        {tab === "services" && <ServicesManager />}
        {tab === "reviews" && <ReviewsManager />}
        {tab === "images" && <ImagesManager />}
      </main>
    </div>
  );
}

function Overview() {
  return (
    <>
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

      <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Needs attention</h2>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            <Activity className="h-3.5 w-3.5" /> Live
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
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
      </section>
    </>
  );
}

function SectionCard({ title, desc, children, action }: { title: string; desc: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold">{title}</h2>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
const btnPrimary = "inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:brightness-110";
const btnGhost = "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted";
const btnDanger = "inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20";

function ServicesManager() {
  const { content, update } = useContent();
  const [editing, setEditing] = useState<Service | null>(null);
  const [adding, setAdding] = useState(false);

  const blank: Service = { id: "", name: "", icon: "Wrench", tint: "oklch(0.94 0.04 148)" };

  const save = (s: Service) => {
    update((c) => {
      const exists = c.services.some((x) => x.id === s.id);
      return {
        ...c,
        services: exists
          ? c.services.map((x) => (x.id === s.id ? s : x))
          : [...c.services, { ...s, id: newId() }],
      };
    });
    setEditing(null);
    setAdding(false);
  };

  const remove = (id: string) => {
    if (!confirm("Remove this service?")) return;
    update((c) => ({ ...c, services: c.services.filter((s) => s.id !== id) }));
  };

  return (
    <SectionCard
      title="Available services"
      desc="Add, edit or remove the service categories shown on the landing page."
      action={
        <button className={btnPrimary} onClick={() => { setAdding(true); setEditing(blank); }}>
          <Plus className="h-3.5 w-3.5" /> Add service
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {content.services.map((s) => {
          const Icon = SERVICE_ICONS[s.icon] ?? Wrench;
          return (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: s.tint }}>
                  <Icon className="h-5 w-5 text-foreground/80" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground">{s.icon}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className={btnGhost} onClick={() => { setAdding(false); setEditing(s); }}>
                  <Pencil className="h-3 w-3" />
                </button>
                <button className={btnDanger} onClick={() => remove(s.id)}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <ServiceEditor
          initial={editing}
          isNew={adding}
          onCancel={() => { setEditing(null); setAdding(false); }}
          onSave={save}
        />
      )}
    </SectionCard>
  );
}

function ServiceEditor({ initial, isNew, onCancel, onSave }: { initial: Service; isNew: boolean; onCancel: () => void; onSave: (s: Service) => void }) {
  const [draft, setDraft] = useState(initial);
  return (
    <div className="mt-5 rounded-xl border border-border bg-background p-4">
      <p className="mb-3 text-sm font-semibold">{isNew ? "New service" : `Edit ${initial.name}`}</p>
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground">Name</label>
          <input className={inputCls} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground">Icon</label>
          <select className={inputCls} value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })}>
            {SERVICE_ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground">Tint (oklch)</label>
          <input className={inputCls} value={draft.tint} onChange={(e) => setDraft({ ...draft, tint: e.target.value })} />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className={btnGhost} onClick={onCancel}><X className="h-3 w-3" /> Cancel</button>
        <button className={btnPrimary} disabled={!draft.name.trim()} onClick={() => onSave(draft)}>
          <Save className="h-3 w-3" /> Save
        </button>
      </div>
    </div>
  );
}

function ReviewsManager() {
  const { content, update } = useContent();
  const [editing, setEditing] = useState<Review | null>(null);
  const [adding, setAdding] = useState(false);

  const blank: Review = { id: "", name: "", rating: 5, text: "" };

  const save = (r: Review) => {
    update((c) => {
      const exists = c.reviews.some((x) => x.id === r.id);
      return {
        ...c,
        reviews: exists
          ? c.reviews.map((x) => (x.id === r.id ? r : x))
          : [...c.reviews, { ...r, id: newId() }],
      };
    });
    setEditing(null);
    setAdding(false);
  };

  const remove = (id: string) => {
    if (!confirm("Remove this review?")) return;
    update((c) => ({ ...c, reviews: c.reviews.filter((r) => r.id !== id) }));
  };

  return (
    <SectionCard
      title="Customer reviews"
      desc="Reviews shown on the landing page."
      action={
        <button className={btnPrimary} onClick={() => { setAdding(true); setEditing(blank); }}>
          <Plus className="h-3.5 w-3.5" /> Add review
        </button>
      }
    >
      <div className="grid gap-3 md:grid-cols-2">
        {content.reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <div className="mt-0.5 flex items-center gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-primary" : "opacity-30"}`} />
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <button className={btnGhost} onClick={() => { setAdding(false); setEditing(r); }}>
                  <Pencil className="h-3 w-3" />
                </button>
                <button className={btnDanger} onClick={() => remove(r.id)}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">"{r.text}"</p>
          </div>
        ))}
      </div>

      {editing && (
        <ReviewEditor
          initial={editing}
          isNew={adding}
          onCancel={() => { setEditing(null); setAdding(false); }}
          onSave={save}
        />
      )}
    </SectionCard>
  );
}

function ReviewEditor({ initial, isNew, onCancel, onSave }: { initial: Review; isNew: boolean; onCancel: () => void; onSave: (r: Review) => void }) {
  const [draft, setDraft] = useState(initial);
  return (
    <div className="mt-5 rounded-xl border border-border bg-background p-4">
      <p className="mb-3 text-sm font-semibold">{isNew ? "New review" : `Edit ${initial.name}`}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground">Name</label>
          <input className={inputCls} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground">Rating (1-5)</label>
          <input
            type="number" min={1} max={5}
            className={inputCls}
            value={draft.rating}
            onChange={(e) => setDraft({ ...draft, rating: Math.max(1, Math.min(5, Number(e.target.value) || 1)) })}
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-[11px] font-semibold uppercase text-muted-foreground">Review</label>
        <textarea
          className={`${inputCls} min-h-[80px]`}
          value={draft.text}
          onChange={(e) => setDraft({ ...draft, text: e.target.value })}
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className={btnGhost} onClick={onCancel}><X className="h-3 w-3" /> Cancel</button>
        <button className={btnPrimary} disabled={!draft.name.trim() || !draft.text.trim()} onClick={() => onSave(draft)}>
          <Save className="h-3 w-3" /> Save
        </button>
      </div>
    </div>
  );
}

function ImagesManager() {
  const { content, update } = useContent();
  const [editing, setEditing] = useState<HeroImage | null>(null);
  const [adding, setAdding] = useState(false);

  const blank: HeroImage = { id: "", url: "", alt: "" };

  const save = (h: HeroImage) => {
    update((c) => {
      const exists = c.heroImages.some((x) => x.id === h.id);
      return {
        ...c,
        heroImages: exists
          ? c.heroImages.map((x) => (x.id === h.id ? h : x))
          : [...c.heroImages, { ...h, id: newId() }],
      };
    });
    setEditing(null);
    setAdding(false);
  };

  const remove = (id: string) => {
    if (!confirm("Remove this image?")) return;
    update((c) => ({ ...c, heroImages: c.heroImages.filter((h) => h.id !== id) }));
  };

  return (
    <SectionCard
      title="Landing page images"
      desc="The first 4 images are shown in the landing hero gallery."
      action={
        <button className={btnPrimary} onClick={() => { setAdding(true); setEditing(blank); }}>
          <Plus className="h-3.5 w-3.5" /> Add image
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {content.heroImages.map((h) => (
          <div key={h.id} className="overflow-hidden rounded-xl border border-border bg-background">
            {h.url ? (
              <img src={h.url} alt={h.alt} className="h-32 w-full object-cover" />
            ) : (
              <div className="flex h-32 w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageIcon className="h-6 w-6" />
              </div>
            )}
            <div className="flex items-center justify-between gap-2 p-2">
              <p className="truncate text-xs text-muted-foreground">{h.alt || "Untitled"}</p>
              <div className="flex gap-1">
                <button className={btnGhost} onClick={() => { setAdding(false); setEditing(h); }}>
                  <Pencil className="h-3 w-3" />
                </button>
                <button className={btnDanger} onClick={() => remove(h.id)}>
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <ImageEditor
          initial={editing}
          isNew={adding}
          onCancel={() => { setEditing(null); setAdding(false); }}
          onSave={save}
        />
      )}
    </SectionCard>
  );
}

function ImageEditor({ initial, isNew, onCancel, onSave }: { initial: HeroImage; isNew: boolean; onCancel: () => void; onSave: (h: HeroImage) => void }) {
  const [draft, setDraft] = useState(initial);
  return (
    <div className="mt-5 rounded-xl border border-border bg-background p-4">
      <p className="mb-3 text-sm font-semibold">{isNew ? "New image" : "Edit image"}</p>
      <div className="grid gap-3">
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground">Image URL</label>
          <input className={inputCls} placeholder="https://..." value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
        </div>
        <div>
          <label className="text-[11px] font-semibold uppercase text-muted-foreground">Alt text</label>
          <input className={inputCls} value={draft.alt} onChange={(e) => setDraft({ ...draft, alt: e.target.value })} />
        </div>
        {draft.url && (
          <img src={draft.url} alt={draft.alt} className="h-40 w-full rounded-lg object-cover" />
        )}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className={btnGhost} onClick={onCancel}><X className="h-3 w-3" /> Cancel</button>
        <button className={btnPrimary} disabled={!draft.url.trim()} onClick={() => onSave(draft)}>
          <Save className="h-3 w-3" /> Save
        </button>
      </div>
    </div>
  );
}
