/**
 * Open-Source WordPress REST API Client for MVMNT Studio.
 * Fetches structured data directly from WordPress (WP-API) with offline resilience.
 */

export interface WpProject {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  location: string;
  category: string;
  techStack: string;
  imagePrimary: string;
  imageSecondary: string;
  testimonialText?: string;
  testimonialAuthor?: string;
}

const FALLBACK_PROJECTS: WpProject[] = [
  {
    id: 4,
    slug: 'gear-endurance-fuel',
    title: 'GEAR · Endurance Fuel',
    excerpt: 'Pre-launch brand & digital experience',
    content: 'A bold digital presence for an endurance brand built around simplicity. GEAR brings Natural and Love Buzz into a focused pre-launch experience. Distinctive typography, clear product comparison and an editorial journal give the brand room to explain its approach.',
    location: 'Australia',
    category: '01 / GEAR · Endurance Fuel',
    techStack: 'Brand storytelling · Product discovery · Interactive recipe exploration',
    imagePrimary: '/images/gear.jpg',
    imageSecondary: '/images/gear.jpg',
  },
  {
    id: 5,
    slug: 'mvmnt-club-apparel',
    title: 'MVMNT Club Custom Apparel Engine',
    excerpt: 'Digital Flagship · Headless Commerce · Sport',
    content: 'High-performance custom kit engine for Australian cycling clubs and racing teams. Standardising 3D kit visualization, sizing logic, and automated on-demand Shopify fulfillment without club financial inventory risk.',
    location: 'Australia',
    category: 'Digital Flagship · Headless Commerce · Sport',
    techStack: 'Next.js Edge + Shopify Admin GraphQL · Sub-Second Response',
    imagePrimary: '/images/mvmnt_club_solo.png',
    imageSecondary: '/images/mvmnt_club_group.png',
  },
  {
    id: 6,
    slug: 'hali-institute-restorative-medicine',
    title: 'Hali Institute of Restorative Medicine',
    excerpt: 'Featured Use Case · Specialist Practice & Clinical Architecture',
    content: "Elevating a specialist medical practice in Canberra to match the calibre of Dr. Jayne's care. We replaced generic medical stock graphics with high-readability editorial typography, tranquil tones mirroring her physical consulting rooms, AHPRA-aware procedural copywriting, and frictionless mobile appointment pathways.",
    location: 'Canberra, ACT',
    category: 'Featured Use Case · Specialist Practice & Private Rooms',
    techStack: 'Delivered in 10 Days · $8,800 Flagship Studio Build · AHPRA-Aware',
    imagePrimary: '/images/hali_case_study_cover.png',
    imageSecondary: '/images/hali_case_study_hero.png',
    testimonialText: 'The studio understood our medical philosophy from our first conversation. New patients now regularly mention how calm and reassuring the site felt before their initial consultation.',
    testimonialAuthor: 'Dr. Jayne, Founder',
  },
  {
    id: 7,
    slug: 'cartel-2025-ccc-kits',
    title: 'Cartel 2025 & Canberra Cycling Club Team Kits',
    excerpt: 'Spatial Identity · Sports Apparel · Canberra ACT',
    content: 'Complete aerodynamic apparel and spatial identity design for premier Australian cycling teams. Tailored typography, sponsor hierarchy integration, and factory-ready vector production.',
    location: 'Canberra, ACT',
    category: 'Spatial Identity · Sports Apparel',
    techStack: 'Spatial Apparel Art Direction · Vector Master Production',
    imagePrimary: '/images/cartel_kit_design.png',
    imageSecondary: '/images/canberra_ccc_kit.png',
  },
];

export async function getWpProjects(): Promise<WpProject[]> {
  const wpBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://127.0.0.1:9400';

  try {
    const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?_embed&per_page=10`, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`[WordPress] Server returned HTTP ${res.status}. Falling back to cached project store.`);
      return FALLBACK_PROJECTS;
    }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      return FALLBACK_PROJECTS;
    }

    return posts.map((p: any) => {
      // Decode HTML entities
      const title = (p.title?.rendered || '')
        .replace(/&#038;/g, '&')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

      const excerpt = (p.excerpt?.rendered || '')
        .replace(/<[^>]*>?/gm, '')
        .replace(/&#038;/g, '&')
        .replace(/&amp;/g, '&')
        .trim();

      const content = (p.content?.rendered || '')
        .replace(/<[^>]*>?/gm, '')
        .replace(/&#038;/g, '&')
        .replace(/&amp;/g, '&')
        .trim();

      const meta = p.meta || {};

      return {
        id: p.id,
        slug: p.slug,
        title,
        excerpt,
        content,
        location: meta.client_location || 'Australia',
        category: meta.project_category || 'Digital Flagship',
        techStack: meta.tech_stack || 'Next.js Edge Architecture',
        imagePrimary: meta.image_primary || '/images/mvmnt_club_solo.png',
        imageSecondary: meta.image_secondary || '/images/mvmnt_club_group.png',
        testimonialText: meta.testimonial_text || undefined,
        testimonialAuthor: meta.testimonial_author || undefined,
      };
    });
  } catch (error) {
    console.warn('[WordPress] Could not connect to WordPress REST API. Using fallback store.');
    return FALLBACK_PROJECTS;
  }
}
