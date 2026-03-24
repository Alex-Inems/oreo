import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FallbackImage } from "@/components/UI/FallbackImage";

const CARS = [
    { id: 1, name: "Model X Plaid", year: 2025, category: "Electric", price: "$120,000", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80", range: "300mi", speed: "1.9s", power: "1,020 hp", description: "The Model X Plaid is the highest performing SUV ever built. All Model X powertrains, with updated battery architecture, can deliver instant torque at any speed." },
    { id: 2, name: "Lamborghini Aventador", year: 2024, category: "Supercars", price: "$500,000", image: "/public/images/aventador.jpg", range: "N/A", speed: "2.5s", power: "769 hp", description: "The Aventador has been created to anticipate the future, as demonstrated by the use of innovative technology, including a V12 engine and the extensive use of carbon fiber." },
    { id: 3, name: "Mercedes G-Wagon", year: 2025, category: "SUVs", price: "$180,000", image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80", range: "N/A", speed: "4.5s", power: "577 hp", description: "A legendary SUV that continues to master all types of terrain. It blends ruggedness with luxury for an unforgettable driving experience." },
    { id: 4, name: "Porsche 911 GT3", year: 2024, category: "Supercars", price: "$200,000", image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80", range: "N/A", speed: "3.2s", power: "502 hp", description: "A high-performance sports car meant to provide an unfiltered driving experience. Born on the track, perfect on the road." },
    { id: 5, name: "Tesla Model S Plaid", year: 2025, category: "Electric", price: "$110,000", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80", range: "396mi", speed: "1.99s", power: "1,020 hp", description: "The highest performing sedan ever built. With the longest range and quickest acceleration of any electric vehicle in production." },
    { id: 6, name: "BMW M5 CS", year: 2023, category: "Sedans", price: "$145,000", image: "https://images.unsplash.com/photo-1555008872-f03b347ffb53?auto=format&fit=crop&w=800&q=80", range: "N/A", speed: "2.9s", power: "627 hp", description: "The most powerful BMW M5 ever built. Combining incredible performance with luxury and everyday usability." },
];

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    const car = CARS.find(c => c.id === parseInt(id));

    if (!car) {
        return (
            <div className="bg-black text-white min-h-screen pt-32 px-8 text-center flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
                <Link href="/inventory" className="text-red-500 hover:text-white transition flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Inventory
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen pt-32 pb-24 px-8 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
            <Link href="/inventory" className="text-zinc-400 hover:text-white transition flex items-center gap-2 mb-8 uppercase tracking-widest text-sm w-fit">
                <ArrowLeft className="w-4 h-4" /> Back to Inventory
            </Link>

            <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* Image Section */}
                <div className="rounded-lg overflow-hidden border border-zinc-800">
                    <FallbackImage src={car.image} fallbackSrc="/public/images/car1.jpg" alt={car.name} className="w-full h-auto object-cover" />
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter mb-2">{car.name}</h1>
                        <p className="text-xl text-zinc-400 uppercase tracking-widest">{car.year} • {car.category}</p>
                    </div>

                    <p className="text-4xl font-bold text-red-600">{car.price}</p>

                    <p className="text-lg text-zinc-300 leading-relaxed border-t border-b border-zinc-800 py-6">
                        {car.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">0-60 MPH</p>
                            <p className="text-2xl font-bold">{car.speed}</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Power</p>
                            <p className="text-2xl font-bold">{car.power}</p>
                        </div>
                        {car.range !== "N/A" && (
                            <div>
                                <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Range</p>
                                <p className="text-2xl font-bold">{car.range}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Availability</p>
                            <p className="text-2xl font-bold text-green-500">In Stock</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-zinc-800">
                        <Link href={`/support?car=${car.id}`} className="flex-1 block text-center bg-red-600 text-white px-8 py-4 uppercase tracking-widest font-bold hover:bg-white hover:text-black transition">
                            Schedule Test Drive
                        </Link>
                        <Link href="/financing" className="flex-1 block text-center bg-zinc-900 border border-zinc-700 text-white px-8 py-4 uppercase tracking-widest font-bold hover:border-red-600 transition">
                            Calculate Payment
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
