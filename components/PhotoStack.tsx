import Image from "next/image";

const tilt = ["-rotate-[5deg] translate-y-2", "z-10 scale-105", "rotate-[5deg] translate-y-2"];

/** Three decorative step photos, fanned out like stickers. */
export function PhotoStack({ images }: { images: [string, string, string] }) {
  return (
    <div className="flex justify-center gap-2 sm:gap-4" aria-hidden>
      {images.map((src, i) => (
        <span
          key={src}
          className={`relative block aspect-square w-[29vw] max-w-[170px] overflow-hidden rounded-[22px] border-4 border-white bg-primary-light shadow-[0_10px_26px_rgba(123,79,214,0.20)] sm:rounded-3xl sm:border-[6px] ${tilt[i]}`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 30vw, 170px"
            priority={i === 1}
            className="object-cover object-top"
          />
        </span>
      ))}
    </div>
  );
}
