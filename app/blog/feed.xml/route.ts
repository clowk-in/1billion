import { feedResponse } from '@/lib/feed';

// A static export writes this as out/blog/feed.xml at build time.
export const dynamic = 'force-static';

export function GET() {
  return feedResponse('en');
}
