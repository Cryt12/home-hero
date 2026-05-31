import { useEffect, useState } from "react";
import {
  Brush, Droplets, Zap, Wind, Refrigerator, Truck, Car, Hammer, Bug, Wrench,
  Sparkles, type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Brush, Droplets, Zap, Wind, Refrigerator, Truck, Car, Hammer, Bug, Wrench, Sparkles,
};
export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS);

export type Service = { id: string; name: string; icon: string; tint: string };
export type Review = { id: string; name: string; rating: number; text: string };
export type HeroImage = { id: string; url: string; alt: string };

export type Content = {
  services: Service[];
  reviews: Review[];
  heroImages: HeroImage[];
};

const STORAGE_KEY = "gf_content_v1";

const DEFAULT_CONTENT: Content = {
  services: [
    { id: "s1", name: "Cleaning", icon: "Brush", tint: "oklch(0.94 0.04 148)" },
    { id: "s2", name: "Plumbing", icon: "Droplets", tint: "oklch(0.94 0.04 220)" },
    { id: "s3", name: "Electrical", icon: "Zap", tint: "oklch(0.95 0.05 90)" },
    { id: "s4", name: "AC Repair", icon: "Wind", tint: "oklch(0.94 0.04 200)" },
    { id: "s5", name: "Appliance", icon: "Refrigerator", tint: "oklch(0.94 0.04 300)" },
    { id: "s6", name: "Delivery", icon: "Truck", tint: "oklch(0.95 0.05 60)" },
    { id: "s7", name: "Car Wash", icon: "Car", tint: "oklch(0.94 0.04 180)" },
    { id: "s8", name: "Handyman", icon: "Hammer", tint: "oklch(0.94 0.05 40)" },
    { id: "s9", name: "Pest Control", icon: "Bug", tint: "oklch(0.94 0.04 130)" },
  ],
  reviews: [
    { id: "r1", name: "Aarav Sharma", rating: 5, text: "Booked a cleaner in 5 minutes — house looks brand new. Best service in town!" },
    { id: "r2", name: "Liza Reyes", rating: 5, text: "AC tune-up was fast and affordable. The pro was super professional and on time." },
    { id: "r3", name: "Marco Dela Cruz", rating: 4, text: "Fixed a stubborn leak the same day. Clear pricing, no surprises." },
  ],
  heroImages: [
    { id: "h1", url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format&fit=crop", alt: "Professional cleaner at work" },
    { id: "h2", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop", alt: "Plumber fixing a sink" },
    { id: "h3", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop", alt: "Electrician working" },
    { id: "h4", url: "https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?w=1200&q=80&auto=format&fit=crop", alt: "AC technician" },
  ],
};

function read(): Content {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    const parsed = JSON.parse(raw) as Partial<Content>;
    return {
      services: parsed.services ?? DEFAULT_CONTENT.services,
      reviews: parsed.reviews ?? DEFAULT_CONTENT.reviews,
      heroImages: parsed.heroImages ?? DEFAULT_CONTENT.heroImages,
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

function write(c: Content) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    window.dispatchEvent(new Event("gf_content_change"));
  } catch {/* ignore */}
}

export function useContent() {
  const [content, setContent] = useState<Content>(DEFAULT_CONTENT);
  useEffect(() => {
    setContent(read());
    const onChange = () => setContent(read());
    window.addEventListener("gf_content_change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("gf_content_change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const update = (mut: (c: Content) => Content) => {
    const next = mut(read());
    write(next);
    setContent(next);
  };

  return { content, update, reset: () => { write(DEFAULT_CONTENT); setContent(DEFAULT_CONTENT); } };
}

export const newId = () => Math.random().toString(36).slice(2, 9);
