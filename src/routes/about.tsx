import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { DownloadAppDialog } from "@/components/DownloadAppDialog";
import {
  ShieldCheck,
  Lock,
  Wallet,
  FileCheck,
  Activity,
  Users,
  Star,
  Download,
  CircleCheckBig,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import worldMap from "@/assets/worldMap.png";
import planefront from "@/assets/plane-front.jpg";
import founder1 from "@/assets/Founder1.png";
import agent1 from "@/assets/agent-1.jpg";
import agent2 from "@/assets/agent-2.jpg";
import agent3 from "@/assets/agent-3.jpg";
import WaitListPromo from "@/components/WaitListPromo";
import Pill from "@/components/Pill";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About - Visa Guard Africa" },
      {
        name: "description",
        content:
          "Built from real experience. Designed to protect millions of African travelers from visa scams.",
      },
    ],
  }),
});

const trustFeatures = [
  {
    icon: Users,
    title: "Verified Agents",
    desc: "Every visa agent is reviewed and verified before operating on the platform.",
    tag: "Verified Agents",
  },
  {
    icon: ShieldCheck,
    title: "Scam Detection",
    desc: "Every feature is designed to improve transparency, accountability and traveler safety.",
    tag: "Real-Time Tracking",
  },
  {
    icon: Lock,
    title: "Secure Transaction",
    desc: "All payments and sensitive information are securely processed and protected.",
    tag: "Verified Payment Gateway",
  },
  {
    icon: Wallet,
    title: "Escrow Protection",
    desc: "Payments remain protected until agreed milestones are completed.",
    tag: "Escrow Backed",
  },
  {
    icon: FileCheck,
    title: "NDPR Compliance",
    desc: "Personal data is handled per NDPR compliance standards.",
    tag: "NDPR Guidance",
  },
  {
    icon: Activity,
    title: "Real Time Tracking",
    desc: "Track visa progress, milestones and updates directly within the app.",
    tag: "Live Status",
  },
];

// Splits an array into equal-sized groups — used to build one "slide" per
// group of trust cards so the carousel shows N cards per view instead of
// stacking them vertically.
function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items];
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function AboutPage() {
  const [dl, setDl] = useState(false);

  // Trust grid carousel state
  const [activeTrust, setActiveTrust] = useState(0);
  const [trustPerView, setTrustPerView] = useState(1);
  const touchStart = useRef<{ x: number } | null>(null);
  const autoTrustRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const trustPages = chunk(trustFeatures, trustPerView);
  const trustTotal = trustPages.length;
  const safeTrustIndex = Math.min(activeTrust, trustTotal - 1);

  const goToTrust = (index: number) =>
    setActiveTrust(((index % trustTotal) + trustTotal) % trustTotal);

  const startTrustAutoplay = () => {
    if (autoTrustRef.current) clearInterval(autoTrustRef.current);
    autoTrustRef.current = setInterval(() => {
      setActiveTrust((p) => (p + 1) % trustTotal);
    }, 4000);
  };

  // Responsive cards-per-slide: 1 on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const computeTrustPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    };
    const update = () => setTrustPerView(computeTrustPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autoplay, restarts whenever the number of slides changes (e.g. on resize)
  useEffect(() => {
    startTrustAutoplay();
    return () => {
      if (autoTrustRef.current) clearInterval(autoTrustRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trustTotal]);

  const handleTrustTouchStart = (e: React.TouchEvent) => {
    if (autoTrustRef.current) clearInterval(autoTrustRef.current);
    touchStart.current = { x: e.touches[0].clientX };
  };

  const handleTrustTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const THRESHOLD = 40; // min px to count as an intentional swipe

    if (dx <= -THRESHOLD) {
      // swipe left → next
      goToTrust(safeTrustIndex + 1);
    } else if (dx >= THRESHOLD) {
      // swipe right → previous
      goToTrust(safeTrustIndex - 1);
    }

    touchStart.current = null;
    startTrustAutoplay();
  };

  return (
    <PageLayout>
      <section className="bg-white md:bg-hero-cream">
        <div className="mx-auto grid max-w-7xl items-center text-center sm:text-start gap-10 px-6 py-18 md:grid-cols-2">
          <div className="spce-y-3 sm:space-y-5">
            <Pill text="About Visa Guard Africa Technologies" />
            <h1 className="text-2xl text-balance tracking-tight mt-1 mb-2 sm:text-3xl font-bold leading-tight md:text-5xl">
              Built From <span className="italic-serif text-primary">Real Experience</span>
              <br className="md:flex hidden" /> Designed to Protect{" "}
              <span className="italic-serif text-primary">Millions</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-[.7rem] sm:text-xs md:text-sm">
              Visa Guard Africa Technologies LTD was created to help Africans avoid visa and
              relocation scams through trust, transparency, and technology-driven protection.
            </p>
            <WaitListPromo />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setDl(true)}
                className="rounded-lg bg-primary tracking-tight px-5 py-3 text-xs sm:text-sm font-semibold flex items-center gap-1 w-full md:w-fit text-primary-foreground hover:bg-primary/90 justify-center"
              >
                <Download size={15} /> Download App
              </button>
              <Link
                to="/waitlist"
                className="rounded-lg border tracking-tight border-border bg-background px-5 py-3 text-xs sm:text-sm font-semibold justify-center  flex items-center gap-1 w-full md:w-fit hover:bg-accent"
              >
                <Users size={15} /> Join the Waitlist
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-emerald-50 md:p-6">
            <img
              src={worldMap}
              alt="World"
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="pb-5 sm:pb-16">
        <div className="mx-auto max-w-7xl mt-5 text-center sm:text-start px-6">
          <Pill text="The Vision of Visa Guard Africa" />
          <h2 className="sm:mt-3 leading-[1.4rem] max-w-2xl text-balance tracking-tight text-xl sm:text-3xl font-extrabold md:text-4xl">
            Building Africa's <span className="italic-serif text-primary">Travel Protection</span>{" "}
            Ecosystem
          </h2>
          <p className="mt-2 text-[.7rem] sm:text-xs md:text-sm max-w-2xl text-muted-foreground">
            Today, Visa Guard Africa is building a secure ecosystem designed to protect travelers
            while helping verified professionals build trust and credibility. The platform combines
            technology, verification, secure payments and transparent communication to create a
            safer visa and relocation experience across Africa.
          </p>

          {/* Sliding carousel — same behaviour across every screen size, no stacking */}
          <div
            className="relative mt-10"
            onMouseEnter={() => {
              if (autoTrustRef.current) clearInterval(autoTrustRef.current);
            }}
            onMouseLeave={startTrustAutoplay}
          >
            <div
              className="overflow-hidden touch-pan-y select-none"
              onTouchStart={handleTrustTouchStart}
              onTouchEnd={handleTrustTouchEnd}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(-${safeTrustIndex * 100}%)`,
                  transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {trustPages.map((group, i) => (
                  <div key={i} className="w-full shrink-0 px-1.5">
                    <div
                      className="grid gap-5"
                      style={{
                        gridTemplateColumns: `repeat(${trustPerView}, minmax(0, 1fr))`,
                      }}
                    >
                      {group.map((f) => (
                        <div
                          key={f.title}
                          className="relative flex h-full min-h-54 flex-col rounded-2xl border border-border bg-background p-6 text-start shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/10 hover:shadow-md"
                        >
                          <TrustCard f={f} agent1={agent1} agent2={agent2} agent3={agent3} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {trustTotal > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goToTrust(safeTrustIndex - 1)}
                  aria-label="Previous"
                  className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md transition hover:border-primary/40 hover:text-primary sm:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToTrust(safeTrustIndex + 1)}
                  aria-label="Next"
                  className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md transition hover:border-primary/40 hover:text-primary sm:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {trustTotal > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {trustPages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToTrust(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === safeTrustIndex}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === safeTrustIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-accent/40 py-5 md:py-16">
        <div className="mx-auto grid max-w-7xl text-center sm:text-start items-center gap-10 px-6 md:grid-cols-[1fr_280px]">
          <div>
            <Pill text="The Mission of Visa Guard Africa" />
            <h2 className="mt-3 text-xl text-balance sm:text-3xl font-bold md:text-4xl italic-serif">
              "More Than Technology"
            </h2>
            <p className="sm:mt-4 text-sm text-balance sm:text-sm text-muted-foreground">
              Every year, countless travelers fall victim to fraudulent visa agents, fake travel
              offers, and misleading immigration services. These scams often result in financial
              loss, emotional distress, delayed opportunities, and broken dreams. Visa Guard Africa
              was created to help address these challenges by introducing a technology-driven
              ecosystem built on trust, verification, and accountability. Rather than replacing
              licensed travel professionals, Visa Guard Africa serves as the trusted bridge between
              travelers and verified visa agents. We carefully verify agents before they can offer
              services on the platform, giving travelers greater confidence when choosing who to
              work with. Our secure escrow system protects agent service fees, ensuring payments are
              released only after agreed milestones have been completed and verified, while official
              government visa fees continue to be paid directly through authorized embassy or
              immigration portals. Through real-time application tracking, secure in-app
              communication, verified embassy and airline resources, identity verification, fraud
              risk monitoring, and transparent service workflows, we help travelers stay informed
              and protected throughout every stage of their visa journey. Our vision extends beyond
              helping people apply for visas. We are building a trusted travel protection ecosystem
              that promotes integrity, strengthens confidence in genuine travel professionals, and
              creates safer opportunities for Africans pursuing education, employment, business,
              tourism, and family reunification around the world. At Visa Guard Africa, we believe
              every traveler deserves access to verified guidance, secure processes, and the
              confidence to pursue international opportunities without fear of fraud. Because
              protecting journeys begins with building trust—before every payment, every
              application, and every new destination.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={planefront}
              alt="Visa Guard Africa Mission"
              className="h-90 w-full object-cover"
              loading="lazy"
            />

            {/* Bottom Dark Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/90 to-transparent" />

            {/* Mission Statement Label */}
            <div className="absolute bottom-6 left-6">
              <p className="text-white text-extrabold md:text-xl font-semibold tracking-tight">
                Visa Guard Mission Statement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-8 sm:py-16">
        <div className="mx-auto max-w-7xl md:px-6">
          <div className="overflow-hidden md:rounded-4xl bg-primary text-primary-foreground">
            <div className="grid items-center gap-8 p-6 md:grid-cols-[280px_1fr] md:p-14">
              <div className="overflow-hidden border-3 rounded-xl relative">
                <img
                  src={founder1}
                  alt="Founder"
                  className="h-84 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-5 md:bottom-10  md:right-15 px-2 border-l-4 border-l-[#FF6B35] rounded bg-white ">
                  <p className="text-primary py-2 text-center text-[.6rem] md:text-xs font-semibold">
                    Mr. Chukwudi Eze · (Founder)
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
                  Founder Story
                </p>
                <h2 className="mt-2 text-2xl tracking-tight font-extrabold md:text-3xl">
                  Turning Pain Into Purpose
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-primary-foreground/85">
                  <strong>Visa Guard Africa Technologies</strong> was founded by{" "}
                  <strong>Chukwudi Eze</strong> after personally experiencing the devastating impact
                  of visa and relocation scams. Like many Africans pursuing opportunities abroad, he
                  trusted the wrong people, lost money, faced betrayal, and endured moments of
                  uncertainty that could have derailed his dreams. Instead of allowing those
                  experiences to define him, he chose to build a solution to protect others from the
                  same pain. Through embassies, immigration authorities and law enforcement
                  organizations, he discovered a major gap in the African travel industry - the
                  absence of a trusted, technology-driven system focused on transparency,
                  accountability, and traveler protection. That realization became the foundation of
                  Visa Guard Africa Technologies LTD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-footer mx-6 lg:mx-0 mb-12 rounded-md lg:rounded-none mt-3 py-10 sm:py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-xl sm:text-3xl font-extrabold md:text-4xl">
            Start Your Visa Journey Safely
          </h2>
          <p className="mt-3 text-[.7rem] sm:text-xs md:text-sm text-white/70">
            Find verified visa professionals, process your applications with greater confidence, and
            protect yourself from visa scams through a secure and transparent application journey.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setDl(true)}
              className="rounded-lg bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-foreground w-full md:w-fit"
            >
              Download the App
            </button>
            <Link
              to="/waitlist"
              className="flex justify-center items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-xs sm:text-sm font-semibold text-white  w-full md:w-fit hover:bg-white/10"
            >
              <Users className="h-4 w-4" /> Join Waitlist
            </Link>
          </div>
        </div>
      </section>
      <DownloadAppDialog open={dl} onOpenChange={setDl} />
    </PageLayout>
  );
}

function TrustCard({
  f,
  agent1,
  agent2,
  agent3,
}: {
  f: (typeof trustFeatures)[0];
  agent1: string;
  agent2: string;
  agent3: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/90 text-white">
        <f.icon color="#fff" className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>

      {f.tag ? (
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[.65rem] font-medium text-primary md:text-xs">
            <CircleCheckBig size={10} /> {f.tag}
          </span>
        </div>
      ) : (
        <div className="mt-auto flex w-fit items-center gap-3 pt-6">
          <div className="flex -space-x-2">
            {[agent1, agent2, agent3].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <Star className="h-4 w-4 fill-current text-yellow-500" />
          <span className="text-[.65rem] font-medium text-muted-foreground md:text-sm">
            VERIFIED AGENTS
          </span>
        </div>
      )}
    </div>
  );
}
