import { BlogPost, postMetadata, postParams } from '@/components/blog/blog-post';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return postParams('pt-br');
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;

  return postMetadata('pt-br', slug);
}

export default async function Post(props: Props) {
  const { slug } = await props.params;

  return <BlogPost locale="pt-br" slug={slug} />;
}
