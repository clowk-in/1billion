import { Landing, landingMetadata } from '@/components/site/landing';

export const metadata = landingMetadata('pt-br');

export default function Home() {
  return <Landing locale="pt-br" />;
}
