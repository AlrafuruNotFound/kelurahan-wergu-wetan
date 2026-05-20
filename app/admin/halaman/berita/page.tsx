import AdminBannerManager from "@/components/admin/AdminBannerManager";
import prisma from "@/lib/db";
export const dynamic = "force-dynamic";

export default async function AdminBeritaBannerPage() {
  const banners = await prisma.bannerHomepage.findMany({
    where: { halaman: "berita" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Banner Berita & Publikasi</h1>
        <p className="text-slate-500">Atur gambar banner utama untuk halaman Pusat Warta Desa.</p>
      </div>

      <section>
        <AdminBannerManager initialData={banners} fixedPage="berita" />
      </section>
    </div>
  );
}
