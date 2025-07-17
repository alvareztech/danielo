// app/blog/page.tsx
import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2>{post.frontmatter.title}</h2>
              <p>{post.frontmatter.summary}</p>
              <small>{post.frontmatter.date}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
