import { Item } from "@/lib/types";
import Link from "next/link";

async function fetchStories(): Promise<Item[]> {
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
  const items: Item[] = await fetchStories();
  if (!items) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 border-b border-muted-foreground px-4"
        >
          <div className="pb-2">
            <Link href={item.url}>
              <div className="flex space-x-1 items-baseline">
                <p className="tracking-tight">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  ({item.url.split("/").slice(2, 3).join("")})
                </p>
              </div>
            </Link>
            <div className="flex font-light text-xs text-muted-foreground space-x-1">
              <div className="rounded-2xl bg-primary text-primary-foreground">
                <p className="px-2 ">{item.score}</p>
              </div>
              <p>{item.by}</p>
              <p> / </p>
              <Link href={`/item/${item.id}`}>{item.descendants} Comments</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
