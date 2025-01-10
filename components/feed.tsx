import { Story } from "@/lib/types";
import Link from "next/link";

async function fetchStories(): Promise<Story[]> {
  try {
    const res = await fetch("http://localhost:3000/api/feed");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const stories = await res.json();
    return stories;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const Feed = async () => {
  const stories: Item[] = await fetchStories();
  if (!stories) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="space-y-2">
      {stories.map((story) => (
        <div
          key={story.id}
          className="flex items-center space-x-4 border-b border-muted-foreground px-4"
        >
          <div className="pb-2">
            <Link href={story.url}>
              <div className="flex space-x-1 items-baseline">
                <p className="tracking-tight">{story.title}</p>
                <p className="text-xs text-muted-foreground">
                  ({story.url.split("/").slice(2, 3).join("")})
                </p>
              </div>
            </Link>
            <div className="flex font-light text-xs text-muted-foreground space-x-1">
              <Link href={story.byUrl}>{story.by}</Link>
              <p> / </p>
              <p className="">{story.score}pts</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
