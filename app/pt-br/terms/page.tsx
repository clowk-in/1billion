import { TermsPage, termsMetadata } from '@/components/site/terms-page';

export const metadata = termsMetadata('pt-br');

export default function Terms() {
  return <TermsPage locale="pt-br" />;
}
