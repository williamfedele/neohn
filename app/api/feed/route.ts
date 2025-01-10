import { Story } from "@/lib/types";

export async function GET() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const storyIds = await response.json();

  const storyPromises = storyIds
    .slice(0, 30)
    .map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
        (res) => res.json(),
      ),
    );

  const stories: Story[] = await Promise.all(storyPromises);
  stories.forEach((story) => {
    if (!story.url) {
      story.url = `https://news.ycombinator.com/item?id=${story.id}`;
    }
    story.byUrl = `https://news.ycombinator.com/user?id=${story.by}`;
  });

  return Response.json(stories);
}
