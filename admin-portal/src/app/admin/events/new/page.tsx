import { EventForm } from "../EventForm";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">New event</h1>
      <EventForm action={createEvent} submitLabel="Create event" />
    </div>
  );
}
