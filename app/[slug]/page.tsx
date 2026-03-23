import { getPageBySlug } from "@/lib/pages";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // We await params as strongly recommended in newer Next.js versions before accessing properties like slug.
  // Although in Next 14 you can access directly, in Next 15 it becomes a Promise. Here we assume we can just grab it or await it.
  const resolvedParams = await Promise.resolve(params);
  const page = await getPageBySlug(resolvedParams.slug);
  
  if (!page) return { title: "Page Not Found · Velocity Cars26" };
  return { 
    title: `${page.title} · Velocity Cars26`,
    description: `Velocity Cars26 - ${page.title}`
  };
}

export default async function CustomPageRender({ params }: { params: { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const page = await getPageBySlug(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
      <div className="w-full max-w-4xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight italic uppercase">{page.title}</h1>
        </div>
        
        {/* Render HTML content securely by dangerously setting inner HTML since admin is trusted */}
        <div 
          className="prose prose-invert prose-red max-w-none text-zinc-300 leading-relaxed font-sans prose-headings:font-bold prose-headings:italic prose-a:text-red-500 hover:prose-a:text-red-400 prose-img:rounded-3xl prose-img:border-2"
          dangerouslySetInnerHTML={{ __html: page.content }} 
        />
      </div>
    </div>
  );
}
