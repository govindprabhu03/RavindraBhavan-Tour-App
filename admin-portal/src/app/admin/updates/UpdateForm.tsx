"use client";

import { useActionState } from "react";
import type { FormState } from "./actions";

type UpdateRow = {
  title: string;
  body: string;
  cover_image_url: string | null;
  is_published: boolean;
};

export function UpdateForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: Partial<UpdateRow>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-neutral-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="body" className="text-sm font-medium text-neutral-700">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={6}
          defaultValue={defaultValues?.body}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cover_image_url" className="text-sm font-medium text-neutral-700">
          Cover image URL
        </label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          placeholder="https://…"
          defaultValue={defaultValues?.cover_image_url ?? ""}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={defaultValues?.is_published ?? false}
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
