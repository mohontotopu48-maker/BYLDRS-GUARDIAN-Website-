import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BYLDRS GUARDIAN – Hire with Certainty',
    short_name: 'BYLDRS GUARDIAN',
    description:
      "California's only platform that audits Pros every 30 days. Find certified, vetted, and verified Pros you can trust.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#3257C2',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
