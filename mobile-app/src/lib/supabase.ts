import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY — copy .env.example to .env.local and fill them in.",
  );
}

// Public, read-only usage from the app (RLS only exposes published rows to
// anon) — no auth session needed here, the admin portal is the only writer.
export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

export type EventRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  location_text: string;
  starts_at: string;
  ends_at: string | null;
  cover_image_url: string | null;
  is_featured: boolean;
};

export type UpdateRow = {
  id: string;
  title: string;
  body: string;
  cover_image_url: string | null;
  published_at: string | null;
};

export async function fetchUpcomingEvents(): Promise<EventRow[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, slug, title, description, location_text, starts_at, ends_at, cover_image_url, is_featured")
    .gte("starts_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString())
    .order("starts_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchEventBySlug(slug: string): Promise<EventRow | null> {
  const { data, error } = await supabase
    .from("events")
    .select("id, slug, title, description, location_text, starts_at, ends_at, cover_image_url, is_featured")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchUpdates(): Promise<UpdateRow[]> {
  const { data, error } = await supabase
    .from("updates")
    .select("id, title, body, cover_image_url, published_at")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export type CouncilMemberRow = {
  id: string;
  committee: "general_council" | "executive_committee";
  name: string;
  role: string;
  display_order: number;
};

export async function fetchCouncil(): Promise<CouncilMemberRow[]> {
  const { data, error } = await supabase
    .from("council_members")
    .select("id, committee, name, role, display_order")
    .order("committee", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
