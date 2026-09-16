import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteEvent } from "./actions";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">Events</h1>
        <Link
          href="/admin/events/new"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + New event
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Starts</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {(events ?? []).map((e) => (
              <tr key={e.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium text-neutral-900">{e.title}</div>
                  <div className="text-xs text-neutral-500">{e.location_text}</div>
                </td>
                <td className="px-4 py-3 text-neutral-600">
                  {new Date(e.starts_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      e.is_published
                        ? "rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
                        : "rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
                    }
                  >
                    {e.is_published ? "Published" : "Draft"}
                  </span>
                  {e.is_featured && (
                    <span className="ml-1.5 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/events/${e.id}`}
                    className="mr-3 text-neutral-600 hover:text-neutral-900 hover:underline"
                  >
                    Edit
                  </Link>
                  <form action={deleteEvent.bind(null, e.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(events ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-neutral-400">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
