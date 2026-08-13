import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import Pill from "@/components/Pill";
import { legalPolicies } from "@/data/legalPolicies";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  validateSearch: (search: Record<string, unknown>) => ({
    tab: typeof search.tab === "string" ? search.tab : legalPolicies[0].slug,
  }),
  head: () => ({
    meta: [
      { title: "Legal & Policies - VGA Technologies ltd" },
      {
        name: "description",
        content: "Terms, privacy, and platform policies for VGA Technologies ltd.",
      },
    ],
  }),
});

function LegalPage() {
  const { tab } = useSearch({ from: "/legal" });
  const navigate = useNavigate({ from: "/legal" });
  const active = legalPolicies.find((p) => p.slug === tab) ?? legalPolicies[0];

  return (
    <PageLayout>
      <section className="bg-white md:bg-hero-cream">
        <div className="mx-auto max-w-7xl mt-7 px-6 py-14 text-center sm:text-start">
          <Pill text="Legal & Policies" />
          <h1 className="mt-3 text-3xl text-balance tracking-tight sm:text-3xl font-bold md:text-4xl">
            Our <span className="italic-serif text-primary">Terms</span> & Policies
          </h1>
          <p className="mt-2 max-w-xl text-[.7rem] sm:text-xs md:text-sm text-muted-foreground">
            Everything governing how travelers and agents use VGA Technologies ltd, in one place.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[240px_1fr]">
          <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            {legalPolicies.map((p) => (
              <button
                key={p.slug}
                onClick={() => navigate({ search: { tab: p.slug } })}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-left text-xs sm:text-sm font-medium transition ${
                  p.slug === active.slug
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-accent"
                }`}
              >
                <p.icon size={15} />
                {p.label}
              </button>
            ))}
          </nav>

          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight">{active.label}</h2>
            <div className="mt-6 space-y-8">{active.content}</div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}