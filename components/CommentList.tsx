"use client";

import { useEffect, useRef, useState } from "react";
import { displayName, type Comment } from "@/lib/comments/rules";

/** How long each card stays put before the row glides on. */
const AUTO_SLIDE_MS = 4000;
/** After someone touches, scrolls or clicks the row, wait this long before gliding again. */
const RESUME_AFTER_MS = 8000;

function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? true;
}

/** Moves the row one card in `direction`; the snap points keep it lined up. */
function slideRow(row: HTMLElement, direction: -1 | 1) {
  const card = row.querySelector("li");
  if (!card) return;
  const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
  row.scrollBy({
    left: direction * (card.offsetWidth + gap),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function CommentList({ comments }: { comments: Comment[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      setAtStart(row.scrollLeft <= 4);
      setAtEnd(row.scrollLeft + row.clientWidth >= row.scrollWidth - 4);
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [comments.length]);

  // Auto-slide: only while the row is on screen, never with reduced motion,
  // and it holds still while someone hovers, focuses or handles the row.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const row = rowRef.current;
    if (!wrapper || !row || comments.length < 2) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;

    let onScreen = false;
    let hovered = false;
    let focused = false;
    let lastTouch = 0;

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    }, { threshold: 0.5 });
    observer.observe(row);

    const touched = () => {
      lastTouch = Date.now();
    };
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    wrapper.addEventListener("pointerdown", touched);
    wrapper.addEventListener("wheel", touched, { passive: true });
    wrapper.addEventListener("keydown", touched);
    wrapper.addEventListener("pointerenter", onEnter);
    wrapper.addEventListener("pointerleave", onLeave);
    wrapper.addEventListener("focusin", onFocusIn);
    wrapper.addEventListener("focusout", onFocusOut);

    const timer = window.setInterval(() => {
      const resting = Date.now() - lastTouch < RESUME_AFTER_MS;
      if (!onScreen || hovered || focused || resting || document.hidden) return;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
      if (atEnd) row.scrollTo({ left: 0, behavior: "smooth" });
      else slideRow(row, 1);
    }, AUTO_SLIDE_MS);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      wrapper.removeEventListener("pointerdown", touched);
      wrapper.removeEventListener("wheel", touched);
      wrapper.removeEventListener("keydown", touched);
      wrapper.removeEventListener("pointerenter", onEnter);
      wrapper.removeEventListener("pointerleave", onLeave);
      wrapper.removeEventListener("focusin", onFocusIn);
      wrapper.removeEventListener("focusout", onFocusOut);
    };
  }, [comments.length]);

  if (comments.length === 0)
    return (
      <p className="rounded-[20px] bg-white/70 px-5 py-6 text-center font-semibold text-ink/70">
        Эхний сэтгэгдлийг та үлдээгээрэй 🙌
      </p>
    );

  function slide(direction: -1 | 1) {
    if (rowRef.current) slideRow(rowRef.current, direction);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <ul
        ref={rowRef}
        aria-label="Сэтгэгдлүүд"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-3 pt-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-accent sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </ul>
      <SlideButton direction={-1} hidden={atStart} onClick={() => slide(-1)} />
      <SlideButton direction={1} hidden={atEnd} onClick={() => slide(1)} />
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  // Only offer «Цааш унших» when the six-line cap actually hides text at this card width.
  const [clipped, setClipped] = useState(false);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body || expanded) return;
    const measure = () => setClipped(body.scrollHeight > body.clientHeight + 1);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [expanded]);

  return (
    <li className="flex w-[85%] shrink-0 snap-start flex-col rounded-[20px] rounded-bl-md bg-white p-4 shadow-[0_4px_14px_rgba(123,79,214,0.08)] sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)]">
      <p className="text-sm font-bold text-accent">{displayName(comment.name)}</p>
      <p
        ref={bodyRef}
        className={`mt-1 whitespace-pre-line break-words leading-relaxed ${expanded ? "" : "line-clamp-6"}`}
      >
        {comment.body}
      </p>
      {(clipped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-2 self-start text-sm font-bold text-accent"
        >
          {expanded ? "Хураах" : "Цааш унших"}
        </button>
      )}
    </li>
  );
}

function SlideButton({
  direction,
  hidden,
  onClick,
}: {
  direction: -1 | 1;
  hidden: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === -1 ? "Өмнөх сэтгэгдэл" : "Дараах сэтгэгдэл"}
      onClick={onClick}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className={`absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl font-bold text-accent shadow-[0_6px_18px_rgba(123,79,214,0.22)] transition hover:scale-105 sm:flex ${
        direction === -1 ? "-left-5" : "-right-5"
      } ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <span aria-hidden>{direction === -1 ? "←" : "→"}</span>
    </button>
  );
}
