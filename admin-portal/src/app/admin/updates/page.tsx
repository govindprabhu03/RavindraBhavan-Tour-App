import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteUpdate } from "./actions";

export default async function UpdatesPage() {
  const supabase = await createClient();
  const { data: updates } = await supabase
    .from("updates")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">Updates</h1>
        <Link
          href="/admin/updates/new"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + New update
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {(updates ?? []).map((u) => (
          <div
            key={u.id}
            className="flex items-start justify-between rounded-lg border border-neutral-200 bg-white p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-900">{u.title}</span>
                <span
                  className={
                    u.is_published
                      ? "rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                      : "rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                  }
                >
                  {u.is_published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 max-w-xl text-sm text-neutral-500">{u.body}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link
                href={`/admin/updates/${u.id}`}
                className="text-neutral-600 hover:text-neutral-900 hover:underline"
              >
                Edit
              </Link>
              <form action={deleteUpdate.bind(null, u.id)}>
                <button type="submit" className="text-red-600 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {(updates ?? []).length === 0 && (
          <div className="rounded-lg border border-dashed border-neutral-300 p-10 text-center text-neutral-400">
            No updates yet.
          </div>
        )}
      </div>
    </div>
  );
}
