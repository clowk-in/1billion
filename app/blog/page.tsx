import { BlogIndex, blogIndexMetadata } from '@/components/blog/blog-index';

export const metadata = blogIndexMetadata('en');

export default function Blog() {
  return <BlogIndex locale="en" />;
}
