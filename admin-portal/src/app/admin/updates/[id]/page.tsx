import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UpdateForm } from "../UpdateForm";
import { updateUpdate } from "../actions";

export default async function EditUpdatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: update } = await supabase.from("updates").select("*").eq("id", id).single();

  if (!update) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Edit update</h1>
      <UpdateForm
        action={updateUpdate.bind(null, id)}
        defaultValues={update}
        submitLabel="Save changes"
      />
    </div>
  );
}
