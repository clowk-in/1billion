import { BlogPost, postMetadata, postParams } from '@/components/blog/blog-post';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return postParams('en');
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;

  return postMetadata('en', slug);
}

export default async function Post(props: Props) {
  const { slug } = await props.params;

  return <BlogPost locale="en" slug={slug} />;
}
