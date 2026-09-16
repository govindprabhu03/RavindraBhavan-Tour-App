"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type FormState = { error: string | null };

export async function createEvent(_prev: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };

  const startsAt = String(formData.get("starts_at") ?? "");
  if (!startsAt) return { error: "Start date/time is required." };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("events").insert({
    slug: `${slugify(title)}-${Date.now().toString(36)}`,
    title,
    description: String(formData.get("description") ?? "") || null,
    location_text: String(formData.get("location_text") ?? "Ravindra Bhavan Sankhali"),
    starts_at: new Date(startsAt).toISOString(),
    ends_at: formData.get("ends_at") ? new Date(String(formData.get("ends_at"))).toISOString() : null,
    cover_image_url: String(formData.get("cover_image_url") ?? "") || null,
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
    created_by: user?.id ?? null,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };

  const startsAt = String(formData.get("starts_at") ?? "");
  if (!startsAt) return { error: "Start date/time is required." };

  const { error } = await supabase
    .from("events")
    .update({
      title,
      description: String(formData.get("description") ?? "") || null,
      location_text: String(formData.get("location_text") ?? "Ravindra Bhavan Sankhali"),
      starts_at: new Date(startsAt).toISOString(),
      ends_at: formData.get("ends_at")
        ? new Date(String(formData.get("ends_at"))).toISOString()
        : null,
      cover_image_url: String(formData.get("cover_image_url") ?? "") || null,
      is_published: formData.get("is_published") === "on",
      is_featured: formData.get("is_featured") === "on",
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/events");
}
