"use client";

import { useActionState } from "react";
import type { FormState } from "./actions";

type MemberRow = {
  committee: string;
  name: string;
  role: string;
  display_order: number;
  is_published: boolean;
};

export function MemberForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: Partial<MemberRow>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="committee" className="text-sm font-medium text-neutral-700">
          Committee
        </label>
        <select
          id="committee"
          name="committee"
          defaultValue={defaultValues?.committee ?? "general_council"}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        >
          <option value="general_council">General Council</option>
          <option value="executive_committee">Executive Committee</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-neutral-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="Shri / Smt. Full Name"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="role" className="text-sm font-medium text-neutral-700">
          Role
        </label>
        <input
          id="role"
          name="role"
          defaultValue={defaultValues?.role ?? "Member"}
          placeholder="Chairman, Vice Chairman, Member…"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="display_order" className="text-sm font-medium text-neutral-700">
          Display order
        </label>
        <input
          id="display_order"
          name="display_order"
          type="number"
          defaultValue={defaultValues?.display_order ?? 0}
          className="w-28 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
        <p className="text-xs text-neutral-500">Lower numbers appear first within the committee.</p>
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={defaultValues?.is_published ?? true}
          className="h-4 w-4 rounded border-neutral-300"
        />
        Published (visible in the app)
      </label>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
