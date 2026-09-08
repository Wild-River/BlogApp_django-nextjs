export type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export async function getAllPostsData(): Promise<Post[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`,
    { next: { revalidate: 3 } },
  );
  const posts: Post[] = await res.json();
  const filteredPosts = posts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  return filteredPosts;
}

export async function getAllPostIds(): Promise<{ id: string }[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`,
    { next: { revalidate: 3 } },
  );
  const posts: Post[] = await res.json();
  return posts.map((post: Post) => ({ id: String(post.id) }));
}

export async function getPostData(id: number): Promise<Post | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-post/${id}/`,
    { next: { revalidate: 3 } },
  );

  if (res.status === 404) {
    return null; // 見つからなかったことを呼び出し元に伝える
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  const post: Post = await res.json();
  return post;
}
