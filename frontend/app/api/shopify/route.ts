import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Initiates Shopify OAuth 2.0 flow
 * Endpoint: GET /api/shopify?shop=mvmnt-club.myshopify.com
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get('shop') || 'mvmnt-club.myshopify.com';
  const clientId = process.env.SHOPIFY_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json({
      status: 'pending_configuration',
      message: 'MVMNT Growth Engine is ready. Set SHOPIFY_CLIENT_ID in your environment.',
      app_url: 'https://mvmnt-designs.vercel.app/api/shopify',
      callback_url: 'https://mvmnt-designs.vercel.app/api/shopify/callback'
    }, { status: 200 });
  }

  const scopes = 'read_products,write_products,read_themes,write_themes,read_content,write_content';
  const redirectUri = 'https://mvmnt-designs.vercel.app/api/shopify/callback';
  const state = Math.random().toString(36).substring(7);

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

  return NextResponse.redirect(authUrl);
}
