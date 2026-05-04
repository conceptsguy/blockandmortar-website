import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request, cookies, redirect }) => {
  const PREVIEW_SECRET = import.meta.env.SANITY_PREVIEW_SECRET ?? 'dev-preview-secret';

  // In production, refuse if the secret is the public dev fallback
  if (import.meta.env.PROD && PREVIEW_SECRET === 'dev-preview-secret') {
    console.error('[draft-mode/enable] SANITY_PREVIEW_SECRET is not set in production');
    return new Response('Preview not configured', { status: 500 });
  }

  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  if (secret !== PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 });
  }

  // Reject absolute URLs and protocol-relative URLs to prevent open-redirect abuse
  const raw = url.searchParams.get('redirect') ?? '/';
  const redirectTo = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/';

  // SameSite=None + Secure are required together so the cookie is sent when the
  // page is loaded inside the Sanity Studio iframe (cross-origin).
  // httpOnly is false so client JS in VisualEditing.astro can read it.
  const isProd = import.meta.env.PROD;
  cookies.set('sanity-preview', 'true', {
    path: '/',
    httpOnly: false,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return redirect(redirectTo);
};
