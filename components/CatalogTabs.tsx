"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { signHref, type Sign } from "@/lib/signs";

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
    `rounded-full px-4 py-2 text-sm font-bold ${
      active ? "bg-primary text-white" : "bg-primary-light text-primary"
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
        <ul role="tabpanel" className="mt-4 grid grid-cols-2 gap-3">
          {sentences.map((sign) => (
            <li key={sign.slug}>
              <Link
                href={signHref(sign)}
                className="block rounded-2xl bg-white p-2 shadow-sm active:scale-[0.98]"
              >
                <span className="relative block aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={sign.steps[0].image}
                    alt=""
                    fill
                    sizes="(max-width: 448px) 50vw, 220px"
                    className="object-cover object-top"
                  />
                </span>
                <span className="mt-2 block px-1 pb-1 text-sm font-bold">{sign.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul role="tabpanel" className="mt-4 grid grid-cols-5 gap-2">
          {letters.map((sign) => (
            <li key={sign.slug}>
              <Link
                href={signHref(sign)}
                className="flex aspect-square items-center justify-center rounded-xl bg-white text-2xl font-extrabold text-primary shadow-sm"
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
