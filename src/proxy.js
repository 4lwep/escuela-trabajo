// Run on edge
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log(`PROXY`, req.nextUrl.pathname, req.auth);

  if (!req.auth) {
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      req.nextUrl.origin + `/auth/login?callbackUrl=${encodedCallbackUrl}`,
    );
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - images
     * - auth
     * - about
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - $ (home page)
     */
    "/((?!api|images|auth|about|_next/static|_next/image|favicon.ico|sitemap.xml|$).*)",
  ],
};

// export const config = {
//   matcher: [
//     "/dashboard(.*)",
//     "/admin(.*)",
//     "/proveedores(.*)",
//     "/productos(.*)",
//   ],
// };
