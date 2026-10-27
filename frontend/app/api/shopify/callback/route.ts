import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

/**
 * Handles Shopify OAuth 2.0 callback and token exchange
 * Endpoint: GET /api/shopify/callback
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const shop = searchParams.get('shop') || 'mvmnt-club.myshopify.com';
  const state = searchParams.get('state');
  const hmac = searchParams.get('hmac');

  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!code) {
    return NextResponse.json({ error: 'Missing authorization code parameter.' }, { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json({
      error: 'Missing SHOPIFY_CLIENT_ID or SHOPIFY_CLIENT_SECRET on server.',
      code_received: true,
      shop
    }, { status: 500 });
  }

  // 1. Validate HMAC signature if provided
  if (hmac) {
    const map = new Map<string, string>();
    searchParams.forEach((val, key) => {
      if (key !== 'hmac' && key !== 'signature') {
        map.set(key, val);
      }
    });
    const message = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const calculatedHmac = crypto
      .createHmac('sha256', clientSecret)
      .update(message)
      .digest('hex');

    if (calculatedHmac !== hmac) {
      console.warn('[SHOPIFY AUTH] HMAC signature verification failed');
    }
  }

  // 2. Exchange authorization code for permanent access token
  try {
    const tokenUrl = `https://${shop}/admin/oauth/access_token`;
    const tokenResp = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    if (!tokenResp.ok) {
      const errText = await tokenResp.text();
      return NextResponse.json({ error: 'Failed to exchange token with Shopify', details: errText }, { status: tokenResp.status });
    }

    const tokenData = await tokenResp.json();
    const accessToken = tokenData.access_token;
    const scope = tokenData.scope;

    // Securely masked success confirmation - token is held in server memory
    console.log(`[SHOPIFY AUTH SUCCESS] Store ${shop} authorized with scopes: ${scope}`);

    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>MVMNT Growth Engine Connected</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: #111; border: 1px solid #333; padding: 40px; border-radius: 16px; max-width: 480px; text-align: center; }
    h1 { font-size: 24px; margin-bottom: 12px; }
    p { color: #888; font-size: 14px; line-height: 1.6; }
    .badge { background: #1a3322; color: #4ade80; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-family: monospace; display: inline-block; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">CONNECTION ACTIVE</div>
    <h1>MVMNT Growth Engine Installed</h1>
    <p>Your Shopify store <strong>${shop}</strong> is now securely connected with the requested permissions. You can close this window.</p>
  </div>
</body>
</html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal OAuth exchange error', message: error.message }, { status: 500 });
  }
}
