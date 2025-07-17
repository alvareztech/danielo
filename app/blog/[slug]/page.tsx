import { getPostBySlug, getPostSlugs } from "@/lib/markdown";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

type Props = {
  params: {
    slug: string;
  };
};

// @ts-expect-error – workaround tipo incorrecto por bug de Next
export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  return (
    <article>
      <h1 className="text-2xl font-bold">{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
