import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import BeritaDetailView from "@/components/user/BeritaDetailView";

export const dynamic = "force-dynamic";

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Ambil data kegiatan (berita) berdasarkan slug
  const berita = await prisma.kegiatan.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!berita) {
    notFound();
  }

  return <BeritaDetailView berita={berita} />;
}
