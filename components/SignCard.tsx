import Image from "next/image";
import Link from "next/link";
import { signHref, type Sign } from "@/lib/signs";

export function SignCard({
  sign,
  sizes,
  priority = false,
}: {
  sign: Sign;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={signHref(sign)}
      className="block h-full rounded-[22px] bg-white p-2 shadow-[0_6px_18px_rgba(123,79,214,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(123,79,214,0.16)] active:scale-[0.98]"
    >
      {/* Crop to the top: the step pictures carry their caption at the bottom. */}
      <span className="relative block aspect-[1.3] overflow-hidden rounded-2xl bg-primary-light">
        <Image
          src={sign.steps[0].image}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </span>
      <span className="flex items-start justify-between gap-2 px-1.5 pb-1 pt-2">
        <span className="text-sm font-bold leading-snug sm:text-base">{sign.title}</span>
        <span className="shrink-0 rounded-full bg-primary-light px-2 py-0.5 text-xs font-semibold text-accent">
          {sign.steps.length} алхам
        </span>
      </span>
    </Link>
  );
}
