import { getApprovedComments } from "@/lib/comments/queries";
import { CommentList } from "./CommentList";

export async function CommentsFeed() {
  return <CommentList comments={await getApprovedComments()} />;
}
