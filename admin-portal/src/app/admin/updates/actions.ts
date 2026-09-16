"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error: string | null };

export async function createUpdate(_prev: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title || !body) return { error: "Title and body are required." };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublished = formData.get("is_published") === "on";

  const { error } = await supabase.from("updates").insert({
    title,
    body,
    cover_image_url: String(formData.get("cover_image_url") ?? "") || null,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
    created_by: user?.id ?? null,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/updates");
  redirect("/admin/updates");
}

export async function updateUpdate(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title || !body) return { error: "Title and body are required." };

  const isPublished = formData.get("is_published") === "on";

  const { data: existing } = await supabase
    .from("updates")
    .select("published_at")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("updates")
    .update({
      title,
      body,
      cover_image_url: String(formData.get("cover_image_url") ?? "") || null,
      is_published: isPublished,
      published_at: isPublished ? (existing?.published_at ?? new Date().toISOString()) : null,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/updates");
  redirect("/admin/updates");
}

export async function deleteUpdate(id: string) {
  const supabase = await createClient();
  await supabase.from("updates").delete().eq("id", id);
  revalidatePath("/admin/updates");
}
