import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FallbackImage } from "@/components/UI/FallbackImage";
import { getCarById } from "@/lib/inventory";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const car = await getCarById(resolvedParams.id);

  if (!car) return { title: "Car Not Found · oreo Cars26" };
  return {
    title: `${car.year} ${car.make} ${car.model} · oreo Cars26`,
    description: car.description
  };
}

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    const car = await getCarById(id);

    if (!car) {
        notFound();
    }

    const speedSpec = car.specs?.find((s) => s.label.toLowerCase().includes("0-60"))?.value || "N/A";
    const powerSpec = car.specs?.find((s) => s.label.toLowerCase().includes("power"))?.value || car.engine || "N/A";
    const rangeSpec = car.specs?.find((s) => s.label.toLowerCase().includes("range"))?.value;

    return (
        <div className="bg-black text-white min-h-screen pt-32 pb-24 px-8 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
            <Link href="/inventory" className="text-zinc-400 hover:text-white transition flex items-center gap-2 mb-8 uppercase tracking-widest text-sm w-fit group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Inventory
            </Link>

            <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* Image Section */}
                <div className="rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl relative group">
                    <FallbackImage 
                        src={car.image} 
                        fallbackSrc="/public/images/car1.jpg" 
                        alt={`${car.make} ${car.model}`} 
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Details Section */}
                <div className="space-y-10">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                           <span className="bg-red-600 text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">{car.condition}</span>
                           <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">VIN: Verified</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase leading-none">
                            {car.make} <span className="text-red-600">{car.model}</span>
                        </h1>
                        <p className="text-xl text-zinc-400 uppercase tracking-[0.3em] font-medium">{car.year} • {car.bodyType}</p>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-6xl font-black text-white tracking-tighter">${car.price.toLocaleString()}</span>
                        <span className="text-sm text-zinc-600 font-bold uppercase tracking-widest">Market Value Recovery</span>
                    </div>

                    <p className="text-lg text-zinc-400 leading-relaxed font-sans border-t border-b border-white/5 py-8">
                        {car.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="group">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2 font-black group-hover:text-red-500 transition-colors">Performance 0-60</p>
                            <p className="text-3xl font-black italic">{speedSpec}</p>
                        </div>
                        <div className="group">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2 font-black group-hover:text-red-500 transition-colors">Raw Propulsion</p>
                            <p className="text-3xl font-black italic">{powerSpec}</p>
                        </div>
                        {rangeSpec && (
                            <div className="group">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2 font-black group-hover:text-red-500 transition-colors">Endurance Range</p>
                                <p className="text-3xl font-black italic">{rangeSpec}</p>
                            </div>
                        )}
                        <div className="group">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2 font-black group-hover:text-red-500 transition-colors">Mileage logged</p>
                            <p className="text-3xl font-black italic">{car.mileage.toLocaleString()} <span className="text-sm">MI</span></p>
                        </div>
                        <div className="group">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2 font-black group-hover:text-red-500 transition-colors">Inventory Status</p>
                            <p className={`text-3xl font-black italic ${car.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                                {car.status || 'Available'}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-10">
                        <Link href={`/support?car=${id}`} className="flex-1 block text-center bg-red-600 text-white px-8 py-4 uppercase tracking-[0.3em] font-black text-xs hover:bg-red-700 transition-all transform hover:scale-105 shadow-2xl active:scale-95">
                            {car.status === 'Available' ? 'Initiate Acquisition' : `Asset ${car.status}`}
                        </Link>
                        <Link href={`/support?car=${id}&inquiry=viewing`} className="flex-1 block text-center bg-transparent border-2 border-zinc-800 text-white px-8 py-4 uppercase tracking-[0.3em] font-black text-xs hover:border-red-600 transition-all transform hover:scale-105 shadow-2xl active:scale-95">
                            Inquire for Private viewing
                        </Link>
                    </div>
                    
                    <div className="pt-6">
                         <Link href="/financing" className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:text-white transition flex items-center gap-2">
                            Explore dynamic financing options available for this asset →
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
