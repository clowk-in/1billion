import { highlight } from 'fumadocs-core/highlight';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { CodeTabs } from '@/components/site/code-tabs';
import { copy, type Locale } from '@/lib/i18n';

type Snippet = {
  label: string;
  file: string;
  lang: string;
  code: string;
};

// The same mail in each way to send it: a login code, high priority, so it
// goes first in the queue.
const snippets: Snippet[] = [
  {
    label: 'cURL',
    file: 'POST /send',
    lang: 'bash',
    code: `curl https://api.1billion.clowk.in/send \\
  -H "Authorization: Bearer $ONEBILLION_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "Acme <hi@acme.com>",
    "to": "jane@example.com",
    "subject": "Your code",
    "body": { "text": "Your code is 482 913" },
    "priority": "high"
  }'`,
  },
  {
    label: 'Rails',
    file: 'config/environments/production.rb',
    lang: 'ruby',
    code: `# Gemfile: gem "1billion"
config.action_mailer.delivery_method = :onebillion

# Your mailers do not change.
UserMailer.login_code(user, "482913").deliver_later`,
  },
  {
    label: 'Node.js',
    file: 'send.ts',
    lang: 'ts',
    code: `import { OneBillion } from "@clowk/1billion"

const mail = new OneBillion() // ONEBILLION_API_KEY

await mail.emails.send({
  from: "Acme <hi@acme.com>",
  to: "jane@example.com",
  subject: "Your code",
  text: "Your code is 482 913",
  priority: "high",
})`,
  },
  {
    label: 'Go',
    file: 'main.go',
    lang: 'go',
    code: `client := onebillion.New("") // ONEBILLION_API_KEY

_, err := client.Emails.Send(ctx, onebillion.Mail{
	From:     "Acme <hi@acme.com>",
	To:       []string{"jane@example.com"},
	Subject:  "Your code",
	Text:     "Your code is 482 913",
	Priority: "high",
})`,
  },
];

// The answer of POST /send: one message for each recipient.
const answer = `{
  "messages": [
    {
      "id": "9f2c41e8…",
      "to": "jane@example.com",
      "status": "accepted"
    }
  ]
}`;

const theme = 'github-dark-default';

export async function SendExample({ locale }: { locale: Locale }) {
  const t = copy[locale].send;

  const tabs = await Promise.all(
    snippets.map(async snippet => ({
      label: snippet.label,
      file: snippet.file,
      code: await highlight(snippet.code, { lang: snippet.lang, theme }),
    })),
  );

  const response = await highlight(answer, { lang: 'json', theme });

  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-brandtext">{t.eyebrow}</p>

          <h2 className="font-display text-[38px] font-extrabold leading-tight tracking-[-0.035em] text-ink md:text-[56px]">
            {t.title}
          </h2>

          <p className="text-[17px] leading-relaxed text-sub md:text-[19px]">{t.text}</p>

          <Link
            href="/docs/sdks"
            className="mt-2 inline-flex items-center gap-2 rounded-xl border border-line2 px-5 py-2.5 text-[15px] font-semibold text-ink hover:bg-panel2"
          >
            {t.link}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14">
          <CodeTabs tabs={tabs} response={response} responseLabel={t.response} />
        </div>
      </div>
    </section>
  );
}
