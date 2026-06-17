import type { Metadata } from "next";
import Link from "next/link";
import { agent } from "@/lib/agent";
import { AgentNav } from "@/components/realestate/profile/AgentNav";
import { AgentHero } from "@/components/realestate/profile/AgentHero";
import { AgentStats } from "@/components/realestate/profile/AgentStats";
import { AgentAbout } from "@/components/realestate/profile/AgentAbout";
import { AgentTimeline } from "@/components/realestate/profile/AgentTimeline";
import { AgentExpertise } from "@/components/realestate/profile/AgentExpertise";
import { AgentProcess } from "@/components/realestate/profile/AgentProcess";
import { AgentListings } from "@/components/realestate/profile/AgentListings";
import { AgentReviews } from "@/components/realestate/profile/AgentReviews";
import { AgentContact } from "@/components/realestate/profile/AgentContact";

export const metadata: Metadata = {
  title: `${agent.name} — ${agent.title} (Sample agent profile)`,
  description:
    "A sample real-estate agent profile — bio, track record, experience, areas served, process and reviews — built by HVR Media House to show what an agent's own website can look like.",
  // Demo with illustrative content — keep it out of search.
  robots: { index: false, follow: true },
};

export default function AgentProfilePage() {
  return (
    <>
      <AgentNav />
      <main>
        <AgentHero />
        <AgentStats />
        <AgentAbout />
        <AgentTimeline />
        <AgentExpertise />
        <AgentProcess />
        <AgentListings />
        <AgentReviews />
        <AgentContact />
      </main>

      <footer className="border-t border-border bg-bg-2">
        <div className="container-page flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-lg font-bold tracking-tight">{agent.name}</div>
            <div className="text-sm text-muted">
              {agent.title} · {agent.brokerage}
            </div>
          </div>
          <p className="text-xs text-muted">
            Sample agent website · built by{" "}
            <Link href="/realestate" className="font-semibold text-brand hover:underline">
              HVR Media House
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
