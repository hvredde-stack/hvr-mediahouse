"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";

const KEY = "hvr-cookie-consent";

/**
 * Cookieless Vercel analytics (always on, no consent needed) plus an optional
 * Meta Pixel that only loads after the visitor accepts cookies. The pixel and
 * its consent banner stay completely off unless site.metaPixelId is set.
 */
export function SiteAnalytics() {
  return (
    <>
      <Analytics />
      {site.metaPixelId ? <PixelConsent pixelId={site.metaPixelId} /> : null}
    </>
  );
}

function PixelConsent({ pixelId }: { pixelId: string }) {
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "granted" || saved === "denied") setChoice(saved);
    setReady(true);
  }, []);

  function decide(value: "granted" | "denied") {
    localStorage.setItem(KEY, value);
    setChoice(value);
  }

  return (
    <>
      {choice === "granted" && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {ready && choice === null && (
        <div className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-2xl border border-border bg-surface/95 p-4 shadow-xl backdrop-blur sm:flex sm:items-center sm:gap-4">
          <p className="text-sm text-muted">
            We use privacy-friendly analytics and, with your consent, a Meta Pixel
            to measure and improve our ads.{" "}
            <a href="/privacy" className="font-medium text-brand">
              Learn more
            </a>
            .
          </p>
          <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
            <button
              onClick={() => decide("denied")}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-bg-2"
            >
              Decline
            </button>
            <button
              onClick={() => decide("granted")}
              className="gradient-bg rounded-full px-4 py-2 text-sm font-semibold text-white"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
