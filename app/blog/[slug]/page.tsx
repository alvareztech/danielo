import { getPostBySlug, getPostSlugs } from "@/lib/markdown";

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

  return (
    <article className="prose prose-lg max-w-3xl mx-auto px-4 py-12">
      <h1>{post.frontmatter.title}</h1>
      <p className="text-sm text-gray-500">{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
