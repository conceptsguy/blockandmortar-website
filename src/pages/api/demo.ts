import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { first, last, email, verticals, role, companySize } = body as Record<string, unknown>;

  if (
    typeof first !== 'string' || !first.trim() ||
    typeof last !== 'string' || !last.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof role !== 'string' || !role.trim()
  ) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toRaw = import.meta.env.DEMO_NOTIFY_EMAILS ?? '';
  const from = import.meta.env.DEMO_FROM_EMAIL ?? 'noreply@blockandmortar.ai';
  const to = toRaw.split(',').map((e: string) => e.trim()).filter(Boolean);

  if (!apiKey || to.length === 0) {
    console.error('Resend not configured: missing RESEND_API_KEY or DEMO_NOTIFY_EMAILS');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const verticalsStr = Array.isArray(verticals) && verticals.length > 0
    ? (verticals as string[]).join(', ')
    : '—';

  const html = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:480px">
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee">${first} ${last}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Role</td><td style="padding:10px 0;border-bottom:1px solid #eee">${role}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Verticals</td><td style="padding:10px 0;border-bottom:1px solid #eee">${verticalsStr}</td></tr>
      <tr><td style="padding:10px 0;color:#666">Company size</td><td style="padding:10px 0">${companySize || '—'}</td></tr>
    </table>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email as string,
    subject: `New demo request — ${first} ${last} (${role})`,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
