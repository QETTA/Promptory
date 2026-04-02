const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="4" y="4" width="56" height="56" rx="18" fill="#F7F9FC" />
  <rect x="4" y="4" width="56" height="56" rx="18" fill="none" stroke="#D8E1EC" stroke-width="2" />
  <path
    d="M22 46V18H35.6C43.4 18 48.5 22.4 48.5 29.4C48.5 36.5 43.4 41 35.6 41H29V46H22Z"
    fill="#0F172A"
  />
  <path
    d="M29 25V34H35.1C38.7 34 41 32.3 41 29.5C41 26.7 38.7 25 35.1 25H29Z"
    fill="#F7F9FC"
  />
  <rect x="39" y="38" width="9" height="9" rx="3" fill="#275DF6" />
  <path d="M41.5 21.5L46 17" fill="none" stroke="#275DF6" stroke-width="3" stroke-linecap="round" />
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
