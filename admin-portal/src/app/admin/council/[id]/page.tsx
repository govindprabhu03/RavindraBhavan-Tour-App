import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MemberForm } from "../MemberForm";
import { updateMember } from "../actions";

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: member } = await supabase.from("council_members").select("*").eq("id", id).single();

  if (!member) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Edit council member</h1>
      <MemberForm
        action={updateMember.bind(null, id)}
        defaultValues={member}
        submitLabel="Save changes"
      />
    </div>
  );
}
