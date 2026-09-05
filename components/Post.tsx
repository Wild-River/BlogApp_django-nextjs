import Link from "next/link";
import type { Post as PostType } from "@/lib/posts";

export default function Post({ post }: { post: PostType }) {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/blog/${post.id}`}>
        <span className="cursor-pointer border-b border-gray-500">
          {post.title}
        </span>
      </Link>
    </div>
  );
}
