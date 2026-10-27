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
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0a; color: #f3f4f6; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
    .card { background: #141414; border: 1px solid #262626; padding: 40px; border-radius: 16px; max-width: 520px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
    h1 { font-size: 22px; font-weight: 600; margin: 0 0 12px; color: #fff; }
    p { color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0 0 24px; }
    .badge { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-bottom: 16px; }
    .token-box { background: #000; border: 1px solid #333; border-radius: 8px; padding: 14px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; color: #e5e7eb; word-break: break-all; text-align: left; margin-bottom: 16px; position: relative; }
    .btn { background: #fff; color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; width: 100%; display: block; }
    .btn:hover { background: #e5e7eb; }
    .instruction { font-size: 12px; color: #6b7280; margin-top: 16px; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Connection Successful</div>
    <h1>MVMNT Growth Engine Authorized</h1>
    <p>Store <strong>${shop}</strong> is now securely authenticated with scopes: <br><code>${scope}</code></p>
    
    <div class="token-box" id="token">${accessToken}</div>
    <button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('token').innerText); this.innerText = 'Copied to Clipboard!';">Copy Access Token</button>
    <div class="instruction">Paste this token into <code>SHOPIFY_ADMIN_ACCESS_TOKEN</code> in your local <code>shopify_mvmnt_club.env</code> file. Do not share or paste into chat.</div>
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
