import { fetchChildrenTree } from "@/lib/api";
import { Item } from "@/lib/types";
import Link from "next/link";

export default async function ItemPage({
  params,
}: {
  params: { slug: number };
}) {
  const itemId = (await params).slug;
  const root: Item = await fetchChildrenTree(itemId);
  return (
    <div className="space-y-8 max-w-5xl pt-6 px-4">
      <div>
        <Link href={root.url}>
          <div className="flex space-x-1 items-baseline">
            <p className="tracking-tight">{root.title}</p>
            <p className="text-xs text-muted-foreground">
              ({root.url.split("/").slice(2, 3).join("")})
            </p>
          </div>
        </Link>
        <div className="font-light text-xs text-muted-foreground">
          {root.by}
        </div>
      </div>
      <div className="space-y-4">
        <p>Comments:</p>
        <div className="text-sm">
          {root.children.map((child) => {
            return <CommentTree key={child.id} comment={child} level={0} />;
          })}
        </div>
      </div>
    </div>
  );
}

//
function CommentTree({ comment, level }: { comment: Item; level: number }) {
  if (comment.deleted || comment.dead) return null;

  return (
    <div key={comment.id} style={{ marginLeft: level > 0 ? 20 : 0 }} className="">
      <div className="border-l border-muted px-4 py-2">
        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
        <div className="font-light text-xs text-muted-foreground">
          {comment.by}
        </div>
      </div>
      <div className="">
        {comment.children.map((child) => (
          <CommentTree key={child.id} comment={child} level={level + 1} />
        ))}
      </div>
    </div>
  );
}
