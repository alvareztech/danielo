import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-bold">{post.frontmatter.title}</h2>
              <p>{post.frontmatter.summary}</p>
              <small>{post.frontmatter.date}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
