import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, redirect }) => {
  // Mirror the same attributes used when setting the cookie so browsers clear it correctly
  const isProd = import.meta.env.PROD;
  cookies.delete('sanity-preview', {
    path: '/',
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
  });
  return redirect('/');
};
