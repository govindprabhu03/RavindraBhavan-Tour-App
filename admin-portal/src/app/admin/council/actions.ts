"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error: string | null };

export async function createMember(_prev: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required." };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("council_members").insert({
    committee: String(formData.get("committee") ?? "general_council"),
    name,
    role: String(formData.get("role") ?? "Member").trim() || "Member",
    display_order: Number(formData.get("display_order") ?? 0),
    is_published: formData.get("is_published") === "on",
    created_by: user?.id ?? null,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/council");
  redirect("/admin/council");
}

export async function updateMember(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required." };

  const { error } = await supabase
    .from("council_members")
    .update({
      committee: String(formData.get("committee") ?? "general_council"),
      name,
      role: String(formData.get("role") ?? "Member").trim() || "Member",
      display_order: Number(formData.get("display_order") ?? 0),
      is_published: formData.get("is_published") === "on",
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/council");
  redirect("/admin/council");
}

export async function deleteMember(id: string) {
  const supabase = await createClient();
  await supabase.from("council_members").delete().eq("id", id);
  revalidatePath("/admin/council");
}
