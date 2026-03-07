import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Blog
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Notas, guias y referencias tecnicas
        </h1>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group block h-full rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 transition group-hover:text-sky-700 dark:text-zinc-50 dark:group-hover:text-sky-300">
                {post.frontmatter.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {post.frontmatter.summary}
              </p>
              <small className="mt-6 block text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {post.frontmatter.date ?? "Sin fecha"}
              </small>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
