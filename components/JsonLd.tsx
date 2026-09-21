/**
 * Structured data is rendered server-side on purpose: Google reduces crawl
 * frequency for markup that only exists after JavaScript runs, and AI crawlers
 * mostly do not run it at all.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" prevents a product name from closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
