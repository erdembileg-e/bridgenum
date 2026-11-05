import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto w-full max-w-md px-4 pt-4">
      <Link href="/" className="text-lg font-extrabold text-primary">
        🤟 Дохионы хэл
      </Link>
    </header>
  );
}
