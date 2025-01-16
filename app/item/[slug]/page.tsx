import { fetchChildrenTree } from "@/lib/api";
import { Item } from "@/lib/types";
import Link from "next/link";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const itemId = (await params).slug;
  const root: Item = await fetchChildrenTree(itemId);
  return (
    <div className="space-y-8 max-w-5xl p-6">
      <div className="title">
        <div className="flex space-x-1 items-baseline">
          <Link href={root.url}>
            <p className="tracking-tight title">{root.title}</p>
          </Link>
          <p className="text-xs text-muted-foreground">
            ({root.url.split("/").slice(2, 3).join("")})
          </p>
        </div>
        <div className="text-xs text-secondary-foreground">{root.by}</div>
      </div>
      <div className="space-y-4 border border-foreground rounded-xl p-4">
        <p className="border-b border-foreground pb-2">COMMENTS:</p>
        <div className="text-sm">
          {root.children.map((child) => {
            return <CommentTree key={child.id} comment={child} level={0} />;
          })}
        </div>
        <p className="text-sm text-right">item_{itemId}</p>
      </div>
    </div>
  );
}

//
function CommentTree({ comment, level }: { comment: Item; level: number }) {
  if (comment.deleted || comment.dead) return null;

  return (
    <div
      key={comment.id}
      style={{ marginLeft: level > 0 ? 20 : 0 }}
      className=""
    >
      <div className="border-l border-muted px-4 py-2">
        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
        <div className="text-xs text-secondary-foreground">{comment.by}</div>
      </div>
      <div className="">
        {comment.children.map((child) => (
          <CommentTree key={child.id} comment={child} level={level + 1} />
        ))}
      </div>
    </div>
  );
}
