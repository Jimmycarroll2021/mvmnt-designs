import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

const ALLOWED_SHOPS = ['mvmnt-club.myshopify.com'];
const SHOPIFY_DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/;

/**
 * Initiates Shopify OAuth 2.0 flow
 * Endpoint: GET /api/shopify?shop=mvmnt-club.myshopify.com
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shopParam = searchParams.get('shop') || 'mvmnt-club.myshopify.com';

  // 1. Strict Domain Validation & Whitelist Check
  if (!SHOPIFY_DOMAIN_REGEX.test(shopParam) || !ALLOWED_SHOPS.includes(shopParam.toLowerCase())) {
    return NextResponse.json(
      { error: 'Invalid or unauthorized shop parameter.' },
      { status: 400 }
    );
  }

  const shop = shopParam.toLowerCase();
  const clientId = process.env.SHOPIFY_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json({
      status: 'pending_configuration',
      message: 'MVMNT Growth Engine is ready. Set SHOPIFY_CLIENT_ID in your environment.',
      app_url: 'https://mvmnt-designs.vercel.app/api/shopify',
      callback_url: 'https://mvmnt-designs.vercel.app/api/shopify/callback'
    }, { status: 200 });
  }

  // 2. Generate cryptographically strong random state
  const state = crypto.randomBytes(16).toString('hex');
  const scopes = 'read_products,write_products,read_themes,write_themes,read_content,write_content';
  const redirectUri = 'https://mvmnt-designs.vercel.app/api/shopify/callback';

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

  const response = NextResponse.redirect(authUrl);

  // 3. Store state in HttpOnly, Secure, SameSite=Lax cookie for 10 minutes
  response.cookies.set('shopify_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/shopify',
    maxAge: 600,
  });

  response.cookies.set('shopify_oauth_shop', shop, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/shopify',
    maxAge: 600,
  });

  return response;
}
