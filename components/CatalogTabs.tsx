"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { signHref, type Sign } from "@/lib/signs";
import { SignCard } from "./SignCard";

type Tab = "sentences" | "letters";

// The hash is only known in the browser; the server renders the sentences tab.
function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export function CatalogTabs({ sentences, letters }: { sentences: Sign[]; letters: Sign[] }) {
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
  const hasLetters = letters.length > 0;
  const tab: Tab = hasLetters && hash === "#letters" ? "letters" : "sentences";

  function select(next: Tab) {
    history.replaceState(null, "", next === "letters" ? "#letters" : location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  const tabClass = (active: boolean) =>
    `rounded-full px-5 py-2.5 text-sm font-bold transition ${
      active
        ? "bg-accent text-white shadow-[0_6px_16px_rgba(123,79,214,0.25)]"
        : "bg-white text-accent shadow-[0_2px_8px_rgba(123,79,214,0.08)]"
    }`;

  return (
    <div>
      <div role="tablist" className="flex gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "sentences"}
          onClick={() => select("sentences")}
          className={tabClass(tab === "sentences")}
        >
          Өгүүлбэр {sentences.length}
        </button>
        {hasLetters && (
          <button
            type="button"
            role="tab"
            aria-selected={tab === "letters"}
            onClick={() => select("letters")}
            className={tabClass(tab === "letters")}
          >
            Үсэг {letters.length}
          </button>
        )}
      </div>

      {tab === "sentences" ? (
        <ul role="tabpanel" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {sentences.map((sign, i) => (
            <li key={sign.slug}>
              <SignCard
                sign={sign}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                priority={i < 4}
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul role="tabpanel" className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-7 sm:gap-3 lg:grid-cols-9">
          {letters.map((sign) => (
            <li key={sign.slug}>
              <Link
                href={signHref(sign)}
                className="flex aspect-square items-center justify-center rounded-2xl bg-white text-2xl font-extrabold text-accent shadow-[0_6px_18px_rgba(123,79,214,0.10)]"
              >
                {sign.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
