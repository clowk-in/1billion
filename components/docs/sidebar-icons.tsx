import type { LucideIcon, LucideProps } from 'lucide-react';
import { createElement } from 'react';
import {
  BadgeCheck,
  BellRing,
  BookOpen,
  Braces,
  Cloud,
  CodeXml,
  Coins,
  FileText,
  Folder,
  Gem,
  Globe,
  Hexagon,
  ListX,
  Mail,
  Network,
  Package,
  Rocket,
  Send,
  Zap,
} from 'lucide-react';

// Icons by URL. A section uses the URL of its folder, and a page its own URL.
// A page with no icon here gets the default one, so a new page still works.

const sections: Record<string, LucideIcon> = {
  '/docs/getting-started': Rocket,
  '/docs/api': Braces,
  '/docs/guides': BookOpen,
  '/docs/sdks': Package,
};

const pages: Record<string, LucideIcon> = {
  '/docs': BookOpen,
  '/docs/getting-started': Zap,

  '/docs/api': Braces,
  '/docs/api/send': Send,
  '/docs/api/messages': Mail,
  '/docs/api/suppressions': ListX,
  '/docs/api/validate': BadgeCheck,

  '/docs/guides/webhooks': BellRing,
  '/docs/guides/domains': Globe,
  '/docs/guides/subdomains': Network,
  '/docs/guides/credits': Coins,

  '/docs/sdks': Package,
  '/docs/sdks/ruby': Gem,
  '/docs/sdks/javascript': Hexagon,
  '/docs/sdks/go': CodeXml,
  '/docs/sdks/aws-lambda': Cloud,
};

function sectionIcon(href: string): LucideIcon {
  const folder = href.split('/').slice(0, 3).join('/');

  return sections[folder] ?? Folder;
}

type IconProps = LucideProps & { href: string };

export function SectionIcon({ href, ...props }: IconProps) {
  return createElement(sectionIcon(href), props);
}

export function PageIcon({ href, ...props }: IconProps) {
  return createElement(pages[href] ?? FileText, props);
}
