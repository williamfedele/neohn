import { Item } from "@/lib/types";
import Link from "next/link";
import { fetchTopStories } from "@/lib/api";

export const Feed = async () => {
  const items: Item[] = await fetchTopStories();
  if (!items) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 border-b border-muted px-4"
        >
          <div className="pb-2">
            <div className="flex space-x-1 items-baseline">
              <Link href={item.url}>
                <p className="tracking-tight title">{item.title}</p>
              </Link>
              <p className="text-xs text-muted-foreground">
                ({item.url.split("/").slice(2, 3).join("")})
              </p>
            </div>
            <div className="flex text-xs text-primary-foreground space-x-1">
              <p>{item.score} pts</p>
              <p> / </p>
              <p className="text-secondary-foreground">{item.by}</p>
              <p> / </p>
              <Link href={`/item/${item.id}`}>{item.descendants} comments</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
