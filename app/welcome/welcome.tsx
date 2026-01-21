import { type ReactNode } from 'react';
import { SupabaseTodoDemo } from './supabase';

type LinkProps = {
  href: string;
  children: ReactNode;
};

function ExtLink({ href, children }: LinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
    >
      {children}
    </a>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
};

function Section({ title, children, collapsible = false }: SectionProps) {
  const baseClasses = 'rounded-2xl border border-zinc-200 bg-white shadow-sm';

  if (!collapsible) {
    return (
      <section className={`${baseClasses} p-6`}>
        <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
        <div className="mt-3 text-sm leading-6 text-zinc-700">{children}</div>
      </section>
    );
  }

  return (
    <details className={`${baseClasses} group`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 select-none">
          {title}
        </h2>
        <span
          aria-hidden
          className="text-xl text-zinc-500 select-none transition-transform duration-150 group-open:rotate-90"
        >
          ›
        </span>
      </summary>
      <div className="px-6 pb-6 pt-3 text-sm leading-6 text-zinc-700">
        {children}
      </div>
    </details>
  );
}

function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warn';
  title: string;
  children: ReactNode;
}) {
  const styles =
    tone === 'warn'
      ? 'border-amber-200 bg-amber-50 text-amber-900'
      : 'border-sky-200 bg-sky-50 text-sky-900';

  return (
    <div className={`mt-4 rounded-xl border p-4 ${styles}`}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm leading-6 opacity-90">{children}</div>
    </div>
  );
}

export function Welcome() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-zinc-600">
            React + Vite + Supabase
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            Web App Starter Kit 🚀
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-700">
            This is the React frontend for your app. Supabase is already
            connected and ready to use.
          </p>
        </header>

        <div className="space-y-6">
          <Section title="Next steps, powered by ⚡ Supabase">
            <SupabaseTodoDemo />
          </Section>

          <Section title="How development works on Diploi" collapsible>
            <ul className="list-disc pl-5">
              <li>
                Your code runs in a cloud dev environment, so no need to install
                anything locally.
              </li>
              <li className="mt-2">
                You can work in a browser-based editor, connect from a local
                editor, or connect via SSH.
              </li>
              <li className="mt-2">
                App processes (like the Vite dev server) run inside their own
                components, not in your dev environment. You can view their logs
                in the Diploi dashboard or via the Diploi CLI.
              </li>
            </ul>
            <Callout tone="warn" title="Heads up">
              <ul className="list-disc pl-5">
                <li>
                  ❌ Don't run{' '}
                  <code className="rounded bg-white/60 px-1.5 py-0.5 text-[0.9em]">
                    npm run dev
                  </code>
                  . App processes are managed via the Diploi dashboard.
                </li>
                <li className="mt-2">
                  ✅ You can run{' '}
                  <code className="rounded bg-white/60 px-1.5 py-0.5 text-[0.9em]">
                    npm install
                  </code>{' '}
                  (or add deps), edit code, and run one-off scripts
                </li>
              </ul>
            </Callout>
            <p className="mt-3">
              Docs:{' '}
              <ExtLink href="https://diploi.com/dev">
                Using Remote Development
              </ExtLink>
            </p>
          </Section>

          <Section title="Infrastructure as Code with diploi.yaml" collapsible>
            <p>
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                diploi.yaml
              </code>{' '}
              is the source of truth for your project. It defines which
              components run (like the web app and Supabase), where they live,
              and what ENV variables they get.
            </p>
            <p className="mt-3">
              Changing{' '}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                diploi.yaml
              </code>{' '}
              updates your environment after confirming the changes on the
              Diploi dashboard.
            </p>
            <p className="mt-3">
              Docs:{' '}
              <ExtLink href="https://diploi.com/yaml">
                diploi.yaml & IaC overview
              </ExtLink>
            </p>
          </Section>

          <Section title="Environment variables (ENV) & secrets" collapsible>
            <p>
              Each component's own environment variables are injected
              automatically. Values from other components can be imported via{' '}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                diploi.yaml
              </code>
              .
            </p>
            <p className="mt-3">
              In this starter kit, connection details from the Supabase
              component are already imported to make integration easy.
            </p>
            <ul className="mt-3 list-disc pl-5">
              <li>
                See & edit values in the Diploi dashboard's "Options" tab.
              </li>
              <li className="mt-2">
                In Vite, use the provided{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                  useEnv.ts
                </code>{' '}
                helper to access runtime environment variables.
              </li>
            </ul>
          </Section>
        </div>

        <footer className="mt-10 text-xs text-zinc-500">
          Built with a Diploi 🚀 starter kit. Customize this page freely.
        </footer>
      </div>
    </main>
  );
}
