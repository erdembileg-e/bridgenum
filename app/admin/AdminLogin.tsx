"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function AdminLogin() {
  const [state, action, pending] = useActionState(login, { error: false });
  return (
    <form action={action} className="mx-auto mt-10 max-w-sm rounded-[22px] bg-white p-6 shadow-sm">
      <label className="block font-bold">
        Нууц үг
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl bg-page px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent/40"
        />
      </label>
      {state.error && <p className="mt-2 text-sm text-[#c0392b]">Нууц үг буруу байна.</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-full bg-accent px-6 py-3 font-bold text-white disabled:opacity-60"
      >
        Нэвтрэх
      </button>
    </form>
  );
}
