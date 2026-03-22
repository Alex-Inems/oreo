import { Mail, MessageCircle, Facebook } from "lucide-react";
import Link from "next/link";

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const carId = params.car as string | undefined;

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 px-8 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=80" 
                    alt="Support Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Customer Support</h1>
                    <p className="text-xl text-zinc-300 uppercase tracking-widest">
                        We're here to help you {carId ? "with your test drive" : "with your inquiry"}
                    </p>
                </div>

                {/* Contact Options Grid */}
                <div className="grid md:grid-cols-3 gap-8 text-center text-white">
                    
                    {/* Email Option */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/10 hover:border-red-500/50 transition-all duration-500 group flex flex-col items-center justify-center space-y-6 transform hover:-translate-y-2">
                        <div className="p-4 bg-white/5 rounded-full group-hover:bg-red-500/20 transition-colors duration-500">
                            <Mail className="w-10 h-10 text-zinc-300 group-hover:text-red-500 transition-colors duration-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Email Us</h2>
                            <p className="text-sm text-zinc-400 min-h-[40px] leading-relaxed">Detailed responses from our luxury specialist team.</p>
                        </div>
                        <Link 
                            href={`mailto:support@velocity.com${carId ? `?subject=Inquiry regarding Test Drive for Car ID: ${carId}` : ''}`} 
                            className="bg-zinc-800/80 hover:bg-red-600 text-white w-full py-4 rounded-xl uppercase tracking-widest text-sm font-bold transition-all shadow-lg"
                        >
                            Send Email
                        </Link>
                    </div>

                    {/* WhatsApp Option */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/10 hover:border-[#25D366]/50 transition-all duration-500 group flex flex-col items-center justify-center space-y-6 transform hover:-translate-y-2">
                        <div className="p-4 bg-white/5 rounded-full group-hover:bg-[#25D366]/20 transition-colors duration-500">
                            <MessageCircle className="w-10 h-10 text-zinc-300 group-hover:text-[#25D366] transition-colors duration-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">WhatsApp</h2>
                            <p className="text-sm text-zinc-400 min-h-[40px] leading-relaxed">Instant messaging directly with our sales team.</p>
                        </div>
                        <Link 
                            href={`https://wa.me/0+2347082995663${carId ? `?text=I'm interested in scheduling a test drive for Car ID: ${carId}` : ''}`} 
                            target="_blank" rel="noopener noreferrer"
                            className="bg-zinc-800/80 hover:bg-[#25D366] text-white w-full py-4 rounded-xl uppercase tracking-widest text-sm font-bold transition-all shadow-lg hover:shadow-[#25D366]/20"
                        >
                            Open Chat
                        </Link>
                    </div>

                    {/* Facebook Option */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/10 hover:border-[#1877F2]/50 transition-all duration-500 group flex flex-col items-center justify-center space-y-6 transform hover:-translate-y-2">
                        <div className="p-4 bg-white/5 rounded-full group-hover:bg-[#1877F2]/20 transition-colors duration-500">
                            <Facebook className="w-10 h-10 text-zinc-300 group-hover:text-[#1877F2] transition-colors duration-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Messenger</h2>
                            <p className="text-sm text-zinc-400 min-h-[40px] leading-relaxed">Connect with us via Facebook Messenger.</p>
                        </div>
                        <Link 
                            href="https://m.me/velocitycars" target="_blank" rel="noopener noreferrer"
                            className="bg-zinc-800/80 hover:bg-[#1877F2] text-white w-full py-4 rounded-xl uppercase tracking-widest text-sm font-bold transition-all shadow-lg hover:shadow-[#1877F2]/20"
                        >
                            Message Us
                        </Link>
                    </div>
                </div>

                {/* FAQ Prompt */}
                <div className="text-center pt-10 border-t border-white/10">
                    <p className="text-zinc-400 mb-4 text-lg">Looking for general information?</p>
                    <Link href="/#faq" className="text-red-500 hover:text-white uppercase tracking-[0.2em] font-bold text-sm inline-block transition-colors">
                        View our FAQs
                    </Link>
                </div>
            </div>
        </div>
    );
}
