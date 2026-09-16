"use client";

import { useActionState } from "react";
import type { FormState } from "./actions";

function toLocalInputValue(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

type EventRow = {
  title: string;
  description: string | null;
  location_text: string;
  starts_at: string;
  ends_at: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  is_featured: boolean;
};

export function EventForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: Partial<EventRow>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <Field label="Title" name="title" required defaultValue={defaultValues?.title} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-neutral-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={defaultValues?.description ?? ""}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>
      <Field
        label="Location"
        name="location_text"
        defaultValue={defaultValues?.location_text ?? "Ravindra Bhavan Sankhali"}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Starts at"
          name="starts_at"
          type="datetime-local"
          required
          defaultValue={toLocalInputValue(defaultValues?.starts_at)}
        />
        <Field
          label="Ends at (optional)"
          name="ends_at"
          type="datetime-local"
          defaultValue={toLocalInputValue(defaultValues?.ends_at)}
        />
      </div>
      <Field
        label="Cover image URL"
        name="cover_image_url"
        defaultValue={defaultValues?.cover_image_url ?? ""}
        placeholder="https://…"
      />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={defaultValues?.is_published ?? false}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Published (visible in the app)
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={defaultValues?.is_featured ?? false}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Featured
        </label>
      </div>

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

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
      />
    </div>
  );
}
