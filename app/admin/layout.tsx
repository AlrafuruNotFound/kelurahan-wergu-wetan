import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { getJwtSecretKey } from "@/lib/safe-action";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  let userRole: "admin" | "super" = "admin";

  // Double defense: Jika bukan halaman login, verifikasi JWT secara strict di sisi server
  if (pathname !== "/admin/login") {
    if (!token) {
      redirect("/admin/login");
    }
    try {
      const secretKey = getJwtSecretKey();
      const { payload } = await jwtVerify(token, secretKey);
      if (payload.role === "super") {
        userRole = "super";
      }
    } catch (error) {
      console.error("Layout JWT Decode Error, redirecting to login:", error);
      redirect("/admin/login");
    }
  } else if (token) {
    // Jika berada di halaman login tetapi token ada, decode perannya (untuk bypass di client jika diperlukan)
    try {
      const secretKey = getJwtSecretKey();
      const { payload } = await jwtVerify(token, secretKey);
      if (payload.role === "super") {
        userRole = "super";
      }
    } catch (error) {
      console.error("Layout JWT Decode Error for Login Page Role:", error);
    }
  }

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
