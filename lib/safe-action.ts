import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export interface SessionUser {
  id: number;
  username: string;
  role: "admin" | "super";
  namaLengkap: string;
}

export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("CRITICAL SECURITY ERROR: JWT_SECRET environment variable is not defined!");
  }
  return new TextEncoder().encode(secret);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;

  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    return {
      id: payload.id as number,
      username: payload.username as string,
      role: payload.role as "admin" | "super",
      namaLengkap: payload.namaLengkap as string,
    };
  } catch (e) {
    console.error("JWT Session verification failed:", e);
    return null;
  }
}

/**
 * Ensures the caller is authenticated as an Admin.
 * Throws an error if not authenticated.
 */
export async function verifySession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized. Sesi Anda tidak valid atau telah berakhir.");
  }
  return session;
}

/**
 * Ensures the caller is authenticated as a Super Admin.
 * Throws an error if not authorized.
 */
export async function verifySuperAdmin(): Promise<SessionUser> {
  const session = await getSession();
  if (!session || session.role !== "super") {
    throw new Error("Forbidden. Akses ditolak, memerlukan peran Super Admin.");
  }
  return session;
}
