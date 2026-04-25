'use client';

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

/* ────────────────────────────────────────────────────────────────
   Analytics Bundle
   ────────────────────────────────────────────────────────────────
   1. Google Tag Manager    → GTM-M6VN9GJS (env: 2)
   2. Vercel Analytics      → Web Vitals + real-time traffic
   3. Microsoft Clarity     → Session recordings + heatmaps
   ──────────────────────────────────────────────────────────────── */

const GTM_ID = 'GTM-M6VN9GJS';
const GTM_ENV = '2';
const GTM_AUTH = 'qguvpQXWhB3X9y_aRpzspQ';
const CLARITY_PROJECT_ID = 'pnydlmavwq';

export function AnalyticsScripts() {
  return (
    <>
      {/* ── Google Tag Manager (head + body) ─────────────────── */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+
            '&gtm_auth=${GTM_AUTH}&gtm_preview=env-${GTM_ENV}&gtm_cookies_win=x';
            f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      {/* GTM noscript fallback — rendered via next/script to stay in body */}
      <Script id="gtm-noscript" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}&gtm_auth=${GTM_AUTH}&gtm_preview=env-${GTM_ENV}&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }} />

      {/* ── Microsoft Clarity ──────────────────────────────── */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`}
      </Script>

      {/* ── Vercel Analytics ───────────────────────────────── */}
      <Analytics />
    </>
  );
}
