import Image from "next/image";
import Link from "next/link";
import { getPublished } from "@/lib/signs";

const links = [
  { href: "/learn", label: "Өгүүлбэр" },
  { href: "/learn#letters", label: "Цагаан толгой" },
  { href: "/#comments", label: "Сэтгэгдэл" },
];

const pill =
  "block whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 shadow-[0_2px_8px_rgba(123,79,214,0.08)] transition hover:text-accent";

/** The alphabet link appears by itself once at least one letter has images. */
export function SiteHeader({
  showLetters = getPublished("letter").length > 0,
}: { showLetters?: boolean } = {}) {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-5">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-extrabold text-accent"
      >
        <Image
          src="/logo-mark.png"
          alt=""
          width={40}
          height={42}
          priority
          className="h-10 w-auto"
        />
        Дохионы хэл
      </Link>
      <nav
        aria-label="Үндсэн цэс"
        className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        <ul className="flex gap-2 text-sm font-semibold">
          {links
            .filter((link) => showLetters || link.href !== "/learn#letters")
            .map((link) => (
              <li key={link.href}>
                {/* Next's <Link> changes a #hash with pushState, which fires no hashchange event, so
                  the catalog tabs would not switch when already on /learn. A plain <a> lets the
                  browser handle the hash. */}
                <a href={link.href} className={pill}>
                  {link.label}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}
