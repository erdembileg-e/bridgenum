export type Move =
  | { type: "step"; index: number }
  | { type: "next-sign" }
  | { type: "prev-sign" }
  | { type: "finished" };

export function move(
  index: number,
  total: number,
  dir: 1 | -1,
  hasNext: boolean,
  hasPrev: boolean,
): Move {
  const target = index + dir;
  if (target >= total) return hasNext ? { type: "next-sign" } : { type: "finished" };
  if (target < 0) return hasPrev ? { type: "prev-sign" } : { type: "step", index: 0 };
  return { type: "step", index: target };
}
