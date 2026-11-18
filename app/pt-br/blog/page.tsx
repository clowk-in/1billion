import { BlogIndex, blogIndexMetadata } from '@/components/blog/blog-index';

export const metadata = blogIndexMetadata('pt-br');

export default function Blog() {
  return <BlogIndex locale="pt-br" />;
}
