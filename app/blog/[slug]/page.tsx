import { getPostBySlug, getPostSlugs } from "@/lib/markdown";
import Link from "next/link";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-medium text-zinc-600 transition hover:text-sky-700 dark:text-zinc-300 dark:hover:text-sky-300"
      >
        ← Volver al blog
      </Link>

      <article className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        <header className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {post.frontmatter.date ?? "Sin fecha"}
          </p>
          {tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={String(tag)}
                  className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                >
                  {String(tag)}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div
          className="mt-8 space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-200 [&_a]:font-medium [&_a]:text-sky-700 [&_a]:underline-offset-4 hover:[&_a]:underline dark:[&_a]:text-sky-300 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-zinc-800 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-zinc-950 [&_pre]:p-4 [&_pre]:text-zinc-100 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-zinc-200 dark:[&_table]:border-zinc-700 [&_tbody_tr:nth-child(even)]:bg-zinc-50 dark:[&_tbody_tr:nth-child(even)]:bg-zinc-800/50 [&_td]:border-b [&_td]:border-zinc-200 [&_td]:px-3 [&_td]:py-2 dark:[&_td]:border-zinc-700 [&_th]:border-b [&_th]:border-zinc-300 [&_th]:bg-zinc-100 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold dark:[&_th]:border-zinc-700 dark:[&_th]:bg-zinc-800"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
