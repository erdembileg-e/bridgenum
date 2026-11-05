"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Sign } from "@/lib/signs";
import { move } from "@/lib/story";

const SWIPE_MIN_PX = 50;
const STAGE_SIZES = "(max-width: 448px) 100vw, 448px";

type Props = {
  sign: Sign;
  /** 1-based position among published signs of this kind. */
  position: number;
  count: number;
  nextHref: string | null;
  prevHref: string | null;
  closeHref: string;
};

export function StoryViewer({ sign, position, count, nextHref, prevHref, closeHref }: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const steps = sign.steps;
  const step = steps[index];
  const nextStep = steps[index + 1];

  const go = useCallback(
    (dir: 1 | -1) => {
      const result = move(index, steps.length, dir, nextHref !== null, prevHref !== null);
      if (result.type === "step") {
        setIndex(result.index);
        setFinished(false);
      } else if (result.type === "next-sign" && nextHref) {
        router.push(nextHref);
      } else if (result.type === "prev-sign" && prevHref) {
        router.push(prevHref);
      } else if (result.type === "finished") {
        setFinished(true);
      }
    },
    [index, steps.length, nextHref, prevHref, router],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  function onPointerDown(event: React.PointerEvent) {
    swipeStart.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  }

  function onPointerUp(event: React.PointerEvent) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dy) > Math.abs(dx)) return;
    swiped.current = true;
    go(dx < 0 ? 1 : -1);
  }

  // A swipe ends with a click on a tap zone; don't count it twice.
  function tap(dir: 1 | -1) {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    go(dir);
  }

  return (
    <main className="flex min-h-dvh flex-col bg-story px-4 pb-6 pt-3 text-white">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="flex gap-1" aria-label="Алхмууд">
          {steps.map((s, i) => (
            <span
              key={s.image}
              data-testid="progress-bar"
              aria-current={i === index ? "step" : undefined}
              className={`h-1 flex-1 rounded-full ${i <= index ? "bg-white" : "bg-white/25"}`}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-white/75">
          <span>
            {position} / {count}
          </span>
          <Link href={closeHref} aria-label="Хаах" className="px-2 py-1 text-lg text-white">
            ✕
          </Link>
        </div>
        <h1 className="mb-3 mt-1 text-2xl font-bold">{sign.title}</h1>

        <div
          data-testid="story-stage"
          className="relative aspect-square w-full touch-pan-y select-none overflow-hidden rounded-2xl bg-white/10"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <Image
            key={step.image}
            src={step.image}
            alt={step.caption}
            fill
            sizes={STAGE_SIZES}
            priority={index === 0}
            className="object-cover object-top"
            draggable={false}
          />
          <button
            type="button"
            aria-label="Өмнөх"
            onClick={() => tap(-1)}
            className="absolute inset-y-0 left-0 w-1/3"
          />
          <button
            type="button"
            aria-label="Дараах"
            onClick={() => tap(1)}
            className="absolute inset-y-0 right-0 w-2/3"
          />
        </div>
        {nextStep && (
          // Same sizes as the stage so the browser fetches the variant it will show next.
          <span className="relative hidden aspect-square w-full" aria-hidden>
            <Image src={nextStep.image} alt="" fill sizes={STAGE_SIZES} loading="eager" />
          </span>
        )}

        <p className="mt-3 rounded-xl bg-primary-light px-4 py-3 text-center font-semibold text-ink">
          {step.caption}
        </p>

        {finished && (
          <Link
            href={closeHref}
            className="mt-4 rounded-xl bg-primary px-4 py-3 text-center font-bold text-white"
          >
            Бүх дохиог үзэх
          </Link>
        )}
      </div>
    </main>
  );
}
