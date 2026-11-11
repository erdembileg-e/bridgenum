export type SubmitState = {
  status: "idle" | "sent" | "error" | "closed";
  message?: string;
  /** What the visitor typed, echoed back on error so the form does not lose it. */
  values?: { name: string; body: string };
};

export const initialSubmitState: SubmitState = { status: "idle" };
