 




import { NextResponse } from "next/server";

export async function middleware(request) {
  const token1 = request.cookies.get("better-auth.session_token")?.value;
  const token2 = request.cookies.get(
    "__secure-better-auth.session_token",
  )?.value;
  const sessionToken = token1 || token2;

  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isDetailsPage = pathname.startsWith("/all-pets/");
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if ((isDashboard || isDetailsPage) && !sessionToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/all-pets/:path*", "/login", "/register"],
};


