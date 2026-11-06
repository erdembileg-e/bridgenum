import Link from "next/link";

const links = [
  { href: "/learn", label: "Өгүүлбэр" },
  { href: "/learn#letters", label: "Цагаан толгой" },
  { href: "/#comments", label: "Сэтгэгдэл" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-5">
      <Link href="/" className="text-lg font-extrabold text-accent">
        🤟 Дохионы хэл
      </Link>
      <nav aria-label="Үндсэн цэс" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 text-sm font-semibold">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 shadow-[0_2px_8px_rgba(123,79,214,0.08)] transition hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
