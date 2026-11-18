import { TermsPage, termsMetadata } from '@/components/site/terms-page';

export const metadata = termsMetadata('en');

export default function Terms() {
  return <TermsPage locale="en" />;
}
