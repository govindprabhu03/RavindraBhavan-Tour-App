"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { signIn, signUp, type AuthState } from "./actions";

const initialState: AuthState = { message: null, kind: "error" };

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, signInPending] = useActionState(signIn, initialState);
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, initialState);

  const state = mode === "signin" ? signInState : signUpState;
  const action = mode === "signin" ? signInAction : signUpAction;
  const pending = mode === "signin" ? signInPending : signUpPending;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0A08] px-4 py-10">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-70"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,10,8,0.55) 0%, rgba(11,10,8,0.35) 35%, rgba(11,10,8,0.88) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1"
        style={{
          background:
            "repeating-linear-gradient(115deg, #C9A24B 0 10px, transparent 10px 20px)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/emblem.png" alt="" width={44} height={53} className="mb-4 drop-shadow-lg" />
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
            Ravindra Bhavan Sankhali
          </div>
          <h1 className="font-display text-3xl font-semibold text-[#F5F1E8]">Admin Portal</h1>
        </div>

        <div className="rounded-sm border border-white/10 bg-[#15130F]/80 p-7 shadow-2xl backdrop-blur-md">
          <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-[#C9A24B]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="rounded-sm border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-[#F5F1E8] outline-none placeholder:text-[#F5F1E8]/30 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-[#C9A24B]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                className="rounded-sm border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-[#F5F1E8] outline-none placeholder:text-[#F5F1E8]/30 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
              />
            </div>

            {state.message && (
              <p
                className={
                  state.kind === "success"
                    ? "text-sm text-emerald-400"
                    : "text-sm text-red-400"
                }
                role={state.kind === "success" ? "status" : "alert"}
              >
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 rounded-sm border border-[#C9A24B] py-2.5 text-sm font-medium tracking-wide text-[#C9A24B] transition hover:bg-[#C9A24B] hover:text-[#0B0A08] disabled:opacity-50"
            >
              {pending ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-5 w-full text-center text-xs tracking-wide text-[#F5F1E8]/50 hover:text-[#F5F1E8]/80"
          >
            {mode === "signin"
              ? "First time setting up? Create an account"
              : "Already have access? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
