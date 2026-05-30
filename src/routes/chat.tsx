import { createFileRoute } from "@tanstack/react-router";
import { Search, MessageCircle } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Messages — GrabFix" },
      { name: "description", content: "Chat with your service professionals in real time." },
    ],
  }),
  component: Chat,
});

const threads = [
  { name: "Maria S.", role: "Cleaner", last: "I'm 5 minutes away 🚗", time: "now", unread: 2, online: true },
  { name: "Rahul K.", role: "AC Technician", last: "Sure, confirmed for 10:30 AM tomorrow.", time: "1h", unread: 0, online: true },
  { name: "Anil P.", role: "Plumber", last: "Job complete! Please rate.", time: "Mon", unread: 0, online: false },
  { name: "Sneha R.", role: "Electrician", last: "Thanks for booking 🙏", time: "May 18", unread: 0, online: false },
  { name: "GrabFix Support", role: "Help center", last: "How can we help you today?", time: "May 10", unread: 0, online: true },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function Chat() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-30 bg-background/90 px-5 pt-6 pb-3 backdrop-blur">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search conversations"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <ul className="px-3 pt-2">
        {threads.map((t) => (
          <li key={t.name}>
            <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-muted">
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-semibold text-primary">
                  {initials(t.name)}
                </span>
                {t.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">{t.name}</h3>
                  <span className="shrink-0 text-xs text-muted-foreground">{t.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className={`truncate text-sm ${t.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {t.last}
                  </p>
                  {t.unread > 0 && (
                    <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                      {t.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {threads.length === 0 && (
        <div className="mt-20 flex flex-col items-center text-center px-8">
          <MessageCircle className="h-12 w-12 text-muted-foreground" />
          <p className="mt-3 font-semibold text-foreground">No messages yet</p>
          <p className="text-sm text-muted-foreground">Chats with your pros will show up here</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
