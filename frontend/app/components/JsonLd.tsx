import { graph, organizationNode, websiteNode } from '@/lib/schema';

type Props = {
  /** A complete JSON-LD object. Defaults to the sitewide Organization + WebSite graph. */
  data?: Record<string, unknown>;
};

export default function JsonLd({ data }: Props) {
  const structuredData = data ?? graph([organizationNode(), websiteNode()]);
  // Escape "<" so copy can never close the script element early.
  const json = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
