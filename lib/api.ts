import { Item } from "@/lib/types";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

async function fetchItem(itemId: number) {
  const response = await fetch(`${BASE_URL}/item/${itemId}.json`);
  const item: Item = await response.json();
  return item;
}

export async function fetchTopStories() {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  const itemIds = await response.json();

  const itemPromises = itemIds
    .slice(0, 30)
    .map((id: number) =>
      fetch(`${BASE_URL}/item/${id}.json`).then((res) => res.json()),
    );

  const items: Item[] = await Promise.all(itemPromises);
  items.forEach((item) => {
    if (!item.url) {
      item.url = `https://news.ycombinator.com/item?id=${item.id}`;
    }
  });

  return Response.json(items);
}

// Stories, comments, jobs, etc, are all 'Items'
// They each have children which represents comments on the item
// This function traverses the tree of children for a given id
export async function fetchChildrenTree(id: number): Promise<Item> {
  const root = await fetchItem(id);
  var queue: { curr: Item; parent: Item | null }[] = [];
  queue.push({ curr: root, parent: null });

  while (queue.length > 0) {
    const queueItem = queue.shift();
    if (!queueItem) continue;
    const { curr, parent } = queueItem;
    curr.children = [];
    if (curr.kids) {
      for (const childId of curr.kids) {
        const child = await fetchItem(childId);
        curr.children.push(child);
        queue.push({ curr: child, parent: curr });
      }
    }
  }

  return root;
}
