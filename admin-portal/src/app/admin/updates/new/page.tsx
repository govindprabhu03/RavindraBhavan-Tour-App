import { UpdateForm } from "../UpdateForm";
import { createUpdate } from "../actions";

export default function NewUpdatePage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">New update</h1>
      <UpdateForm action={createUpdate} submitLabel="Post update" />
    </div>
  );
}
