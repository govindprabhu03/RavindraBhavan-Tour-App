import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteMember } from "./actions";

const COMMITTEE_LABELS: Record<string, string> = {
  general_council: "General Council",
  executive_committee: "Executive Committee",
};

export default async function CouncilPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("council_members")
    .select("*")
    .order("committee", { ascending: true })
    .order("display_order", { ascending: true });

  const grouped = (members ?? []).reduce<Record<string, typeof members>>((acc, m) => {
    (acc[m.committee] ??= []).push(m);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">Council</h1>
        <Link
          href="/admin/council/new"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + New member
        </Link>
      </div>

      {Object.entries(COMMITTEE_LABELS).map(([key, label]) => (
        <div key={key} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            {label}
          </h2>
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {(grouped[key] ?? []).map((m) => (
                  <tr key={m.id} className="border-b border-neutral-100 last:border-0">
                    <td className="px-4 py-3 text-neutral-500">{m.display_order}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900">{m.name}</td>
                    <td className="px-4 py-3 text-neutral-600">{m.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          m.is_published
                            ? "rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
                            : "rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
                        }
                      >
                        {m.is_published ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/council/${m.id}`}
                        className="mr-3 text-neutral-600 hover:text-neutral-900 hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteMember.bind(null, m.id)} className="inline">
                        <button type="submit" className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {(grouped[key] ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">
                      No members yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
