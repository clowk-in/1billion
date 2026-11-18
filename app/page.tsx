import { Landing, landingMetadata } from '@/components/site/landing';

export const metadata = landingMetadata('en');

export default function Home() {
  return <Landing locale="en" />;
}
