import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Wrench, ArrowLeft, Mail, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — GrabFix" },
      { name: "description", content: "Sign in to your GrabFix account." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    // Mock auth: any email containing "admin" is treated as an admin.
    const isAdmin = email.toLowerCase().includes("admin");
    const role = isAdmin ? "admin" : "customer";
    try {
      localStorage.setItem("gf_role", role);
      localStorage.setItem("gf_email", email);
    } catch {
      // ignore (SSR / disabled storage)
    }
    navigate({ to: isAdmin ? "/admin" : "/home" });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wrench className="h-4 w-4" />
            </span>
            <span className="text-base font-bold">GrabFix</span>
          </div>
          <span className="w-12" />
        </div>
      </nav>

      <main className="mx-auto flex max-w-md flex-col px-5 py-10">
        <div className="rounded-3xl bg-card p-6 shadow-card md:p-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to book trusted home service pros.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Password
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-primary/30">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-110"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            New to GrabFix?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Create an account
            </Link>
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/40 p-3 text-[11px] text-muted-foreground">
            <p className="font-semibold text-foreground">Demo accounts</p>
            <p>Customer — any email (e.g. <span className="font-mono">user@grabfix.com</span>)</p>
            <p>Admin — any email containing <span className="font-mono">admin</span> (e.g. <span className="font-mono">admin@grabfix.com</span>)</p>
          </div>
        </div>
      </main>
    </div>
  );
}
