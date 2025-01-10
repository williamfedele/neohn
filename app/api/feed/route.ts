import { fetchTopStories } from "@/lib/api";

export async function GET() {
  return fetchTopStories();
}
