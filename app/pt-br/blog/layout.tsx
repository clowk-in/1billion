import { BlogLayout } from '@/components/blog/blog-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogLayout locale="pt-br">{children}</BlogLayout>;
}
