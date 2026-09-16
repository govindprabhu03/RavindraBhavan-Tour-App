"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { message: string | null; kind: "error" | "success" };

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { message: error.message, kind: "error" };

  redirect("/admin");
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return { message: "Password must be at least 8 characters.", kind: "error" };
  }

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { message: error.message, kind: "error" };

  return {
    message:
      "Account created. It has no admin access yet — tell your developer your email so they can grant it, then sign in.",
    kind: "success",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
