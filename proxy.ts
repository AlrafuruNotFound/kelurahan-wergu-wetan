import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecretKey } from "./lib/safe-action";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("➡️ [Proxy Interceptor] Pathname:", pathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Hanya periksa rute /admin
  if (pathname.startsWith("/admin")) {
    // Kecualikan rute login
    if (pathname === "/admin/login") {
      // Jika sudah punya token valid, langsung arahkan ke dashboard
      const token = request.cookies.get("admin_token")?.value;
      if (token) {
        try {
          const secretKey = getJwtSecretKey();
          await jwtVerify(token, secretKey);
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        } catch {
          // Token tidak valid, biarkan masuk ke login page
        }
      }
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const secretKey = getJwtSecretKey();
      await jwtVerify(token, secretKey);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Proxy Auth Verification Failed:", error);
      // Hapus cookie token yang tidak valid dan redirect ke login
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Konfigurasi matcher rute admin
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
