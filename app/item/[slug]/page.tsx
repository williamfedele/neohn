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
    <div className="space-y-8">
      <Link href={root.url}>
        <div className="text-xl tracking-tight">{root.title}</div>
      </Link>

      <div className="space-y-4 text-sm">
        {root.children.map((child) => {
          return <CommentTree key={child.id} comment={child} level={0} />;
        })}
      </div>
    </div>
  );
}

function CommentTree({ comment, level }: { comment: Item; level: number }) {
  if (comment.deleted) return null;

  return (
    <div key={comment.id} style={{ marginLeft: level * 20 }} className="">
      <div className="border-b border-muted-foreground px-4 pb-4">
        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
        <div className="font-light text-xs text-muted-foreground">
          {comment.by}
        </div>
      </div>
      <div className="space-y-4">
        {comment.children.map((child) => (
          <CommentTree key={child.id} comment={child} level={level + 1} />
        ))}
      </div>
    </div>
  );
}
