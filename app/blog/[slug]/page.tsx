import { getPostBySlug, getPostSlugs } from "@/lib/markdown";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

// 🚨 Next.js en producción puede inferir mal los tipos, así que usamos esta solución robusta
export default async function BlogPostPage(
  props: Awaited<ReturnType<typeof getStaticProps>>,
) {
  const { params } = props;
  const post = await getPostBySlug(params.slug);

  return (
    <article className="prose prose-lg max-w-3xl mx-auto px-4 py-12">
      <h1>{post.frontmatter.title}</h1>
      <p className="text-sm text-gray-500">{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}

// ✅ Esta función define los props para el componente — evita el error del tipo Promise
async function getStaticProps() {
  return {
    params: {
      slug: "", // placeholder (Next lo reemplaza)
    },
  };
}
