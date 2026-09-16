import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: eventCount }, { count: publishedEventCount }, { count: updateCount }, { count: councilCount }] =
    await Promise.all([
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }).eq("is_published", true),
      supabase.from("updates").select("*", { count: "exact", head: true }),
      supabase.from("council_members").select("*", { count: "exact", head: true }),
    ]);

  const cards = [
    { label: "Total events", value: eventCount ?? 0, href: "/admin/events" },
    { label: "Published events", value: publishedEventCount ?? 0, href: "/admin/events" },
    { label: "Updates posted", value: updateCount ?? 0, href: "/admin/updates" },
    { label: "Council members", value: councilCount ?? 0, href: "/admin/council" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-300"
          >
            <div className="text-3xl font-semibold text-neutral-900">{c.value}</div>
            <div className="mt-1 text-sm text-neutral-500">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/admin/events/new"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + New event
        </Link>
        <Link
          href="/admin/updates/new"
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:border-neutral-400"
        >
          + New update
        </Link>
      </div>
    </div>
  );
}
