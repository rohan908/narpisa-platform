import { appConfig, teamPrinciples } from "@narpisa/config";
import { createSourceDocumentInputSchema } from "@narpisa/types";
import { SectionCard } from "@narpisa/ui";

const deploymentCards = [
  {
    eyebrow: "Frontend",
    title: "Vercel-hosted Next.js workspace",
    description:
      "The web app owns researcher workflows, source registration, and future dashboards for document intelligence and trading data.",
  },
  {
    eyebrow: "Parsing",
    title: "Render-backed FastAPI worker",
    description:
      "The worker fetches source PDFs on demand, extracts structured content, and discards binary files after parsing to keep storage costs low.",
  },
  {
    eyebrow: "Data",
    title: "Supabase for auth and structured records",
    description:
      "Supabase stores source metadata, processing job status, and extracted records while keeping source attribution visible in the product.",
  },
] as const;

const sampleSource = createSourceDocumentInputSchema.safeParse({
  title: "Haib Copper PEA",
  sourceUrl: "https://documents.example.org/haib-copper-pea.pdf",
  attribution: "Deep-South Resources public study",
  notes: "Pilot fixture for parser and source-governance workflows.",
});

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
            {appConfig.name}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Source-led document intelligence for mineral value addition.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Register source links, parse PDFs on demand, and retain only the
            structured records needed for research, policymaking, and trading
            workflows across Namibia and future African market expansion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
            >
              Connect web to Vercel
            </a>
            <a
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              href="https://render.com"
              target="_blank"
              rel="noreferrer"
            >
              Deploy worker on Render
            </a>
          </div>
        </div>

        <SectionCard
          eyebrow="Validated input"
          title="Source registration contract"
          description="The frontend already validates the core source payload shape shared across the monorepo."
          footer={
            sampleSource.success
              ? "Schema validation passes for the reference source."
              : "Schema validation failed for the reference source."
          }
        >
          <dl className="grid gap-3 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-900">Reference title</dt>
              <dd>Haib Copper PEA</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Storage model</dt>
              <dd>Source URL plus attribution, no persistent PDF binaries.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Team default</dt>
              <dd>Typed contracts, explicit reviews, and CI-first changes.</dd>
            </div>
          </dl>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {deploymentCards.map((card) => (
          <SectionCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <SectionCard
          eyebrow="Operating principles"
          title="How the team should build"
          description={appConfig.tagline}
        >
          <ul className="space-y-3 text-sm leading-6 text-slate-700">
            {teamPrinciples.map((principle) => (
              <li key={principle} className="rounded-2xl bg-slate-50 px-4 py-3">
                {principle}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          eyebrow="Next milestones"
          title="Immediate product slices"
          description="The starter repo is structured for a feature-first roadmap that a four-person team can divide cleanly."
        >
          <ol className="space-y-3 text-sm leading-6 text-slate-700">
            <li>Build authenticated source registration and review queues.</li>
            <li>Persist parsing results into Supabase with job history.</li>
            <li>Add a query and analytics surface for extracted records.</li>
            <li>Introduce trading and investment hub modules behind feature flags.</li>
          </ol>
        </SectionCard>
      </section>
    </main>
  );
}
