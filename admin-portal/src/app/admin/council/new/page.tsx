import { MemberForm } from "../MemberForm";
import { createMember } from "../actions";

export default function NewMemberPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">New council member</h1>
      <MemberForm action={createMember} submitLabel="Add member" />
    </div>
  );
}
