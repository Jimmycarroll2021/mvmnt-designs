import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, website, packageTier, scopeNotes, honeypot } = body;

    // Honeypot spam trap
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Please provide both your name and email address.' }, { status: 400 });
    }

    // RFC 5322 simplified email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const receiptId = `MVMNT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    console.log(`[MVMNT STUDIO BOOKING] Receipt: ${receiptId}`, {
      name,
      email,
      website: website || 'None provided',
      packageTier: packageTier || 'Unspecified',
      scopeNotes: scopeNotes ? scopeNotes.slice(0, 200) : 'None',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      receiptId,
      message: 'Discovery consultation request confirmed. Jimmy will reach out within 24 hours to confirm calendar times.',
      details: {
        name,
        email,
        packageTier,
      },
    });

  } catch (err: any) {
    console.error('Error in /api/booking:', err);
    return NextResponse.json({ error: 'Failed to process inquiry. Please try again.' }, { status: 500 });
  }
}
