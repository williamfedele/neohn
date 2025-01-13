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

  return items;
}

// Stories, comments, jobs, etc, are all 'Items'
// They each have children which represents comments on the item
// This function traverses the tree of children for a given id
export async function fetchChildrenTree(id: number): Promise<Item> {
  const root = await fetchItem(id);

  async function processLevel(items: Item[]) {
    const childIds = items.map((item) => item.kids || []).flat();

    if (childIds.length === 0) {
      for (const item of items) {
        item.children = [];
      }
      return;
    }

    const children = await Promise.all(
      childIds.map((childId) => fetchItem(childId)),
    );

    let childIndex = 0;
    for (const item of items) {
      if (item.kids) {
        item.children = item.kids.map(() => children[childIndex++]);
      } else {
        item.children = [];
      }
    }
    await processLevel(children);
  }

  root.children = [];

  await processLevel([root]);

  return root;
}
