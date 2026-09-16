import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../login/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0A08] px-4">
        <div className="max-w-sm rounded-sm border border-white/10 bg-[#15130F] p-7 text-center">
          <Image src="/emblem.png" alt="" width={32} height={39} className="mx-auto mb-4 opacity-90" />
          <h1 className="mb-2 font-display text-lg font-semibold text-[#F5F1E8]">Awaiting admin access</h1>
          <p className="mb-5 text-sm text-[#F5F1E8]/60">
            You&rsquo;re signed in as <span className="text-[#F5F1E8]">{user?.email}</span>, but this
            account hasn&rsquo;t been granted admin access yet. Ask whoever manages the database to add
            you.
          </p>
          <form action={signOut}>
            <button type="submit" className="text-sm text-[#C9A24B] underline hover:text-[#E0C27C]">
              Sign out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-white/10 bg-[#0B0A08]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/emblem.png" alt="" width={26} height={31} />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B]">
                Ravindra Bhavan Sankhali
              </div>
              <div className="font-display text-sm font-medium text-[#F5F1E8]">Admin Portal</div>
            </div>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/admin/events" className="text-[#F5F1E8]/70 hover:text-[#F5F1E8]">
              Events
            </Link>
            <Link href="/admin/updates" className="text-[#F5F1E8]/70 hover:text-[#F5F1E8]">
              Updates
            </Link>
            <Link href="/admin/council" className="text-[#F5F1E8]/70 hover:text-[#F5F1E8]">
              Council
            </Link>
            <span className="text-white/15">|</span>
            <span className="text-[#F5F1E8]/50">{user?.email}</span>
            <form action={signOut}>
              <button type="submit" className="text-[#C9A24B] underline hover:text-[#E0C27C]">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
