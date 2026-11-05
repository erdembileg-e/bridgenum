import Image from "next/image";
import type { Step } from "@/lib/signs";

export function StepStrip({ steps }: { steps: Step[] }) {
  return (
    <ol className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
      {steps.map((step, i) => (
        <li key={step.image} className="w-[70%] shrink-0 snap-center sm:w-[31%]">
          <span className="relative block aspect-square overflow-hidden rounded-2xl">
            <Image
              src={step.image}
              alt={step.caption}
              fill
              sizes="(max-width: 448px) 70vw, 150px"
              priority={i === 0}
              className="object-cover object-top"
            />
          </span>
          <p className="mt-2 rounded-xl bg-primary-light px-3 py-2 text-center text-sm font-semibold">
            {step.caption}
          </p>
        </li>
      ))}
    </ol>
  );
}
