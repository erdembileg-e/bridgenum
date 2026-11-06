export type SubmitState = {
  status: "idle" | "sent" | "error" | "closed";
  message?: string;
};

export const initialSubmitState: SubmitState = { status: "idle" };
