import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SESSION_COOKIE } from "./lib/session-cookie";

const handleI18nRouting = createMiddleware(routing);

// /ar/dashboard/…, /en/dashboard/… — except the login page itself.
const DASHBOARD_PATH = new RegExp(`^/(${routing.locales.join("|")})/dashboard(?:/(?!login(?:/|$)).*)?$`);

export default function proxy(request: NextRequest) {
  // Optimistic check only (cookie present). The dashboard layout and every
  // Server Action verify the session itself.
  const match = request.nextUrl.pathname.match(DASHBOARD_PATH);
  if (match && !request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL(`/${match[1]}/dashboard/login`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
