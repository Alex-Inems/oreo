const REVIEWS = [
    {
        name: "Michael R.",
        title: "Unreal Experience",
        content: "Purchasing my GT3 RS from Velocity was seamless. They handled transport, customs, and financing efficiently.",
        image: "1500648767791-00dcc994a43e"
    },
    {
        name: "Sarah J.",
        title: "White Glove Service",
        content: "The attention to detail is unmatched. They didn't just sell me a car; they provided an entry into a lifestyle.",
        image: "1494790108377-be9c29b29330"
    },
    {
        name: "David L.",
        title: "Beyond Expectations",
        content: "I've bought many performance cars, but the transparency here is refreshing. No hidden fees, just pure passion.",
        image: "1507003211169-0a1dd7228f2d"
    },
    {
        name: "Elena S.",
        title: "Efficient & Professional",
        content: "From the first inquiry to the delivery in my driveway, the team at Velocity was top-notch.",
        image: "1438761681033-6461ffad8d80"
    },
    {
        name: "Marcus T.",
        title: "The Real Deal",
        content: "Authenticity matters when buying rare specs. Velocity verified everything. Highly recommended.",
        image: "1472099645785-5658abf4ff4e"
    },
    {
        name: "Chloe W.",
        title: "Game Changer",
        content: "The financing options they provided for my classic 911 were better than any traditional bank.",
        image: "1544005313-94ddf0286df2"
    }
];

const VIDEOS = [
    { id: "1614162692292-7ac56d7f7f1e", title: "GT3 Delivery" },
    { id: "1503376763036-066120622c74", title: "Porsche Handover" },
    { id: "1580273916550-e323be2ebeed", title: "Luxury Pickup" }
];

const INSTAGRAM = [
    "1552519507-da8b1227ec3a",
    "1542362567-b05eac1a67a4",
    "1511919884226-fd3cad34687c",
    "1525609004556-c46c7d6cf048"
];

export default function ReviewsPage() {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* 1. Hero */}
            <section className="pt-32 pb-24 px-8 text-center">
                <h1 className="text-6xl font-black uppercase italic mb-6">Client Stories</h1>
                <p className="text-xl text-zinc-400">Don't just take our word for it.</p>
            </section>

            {/* 2. Aggregate Score */}
            <section className="py-12 border-y border-zinc-800 bg-zinc-900">
                <div className="w-full max-w-[90vw] min-[2000px]:max-w-[1600px] min-[3000px]:max-w-[2000px] mx-auto flex justify-around text-center">
                    <div>
                        <div className="text-5xl font-black text-red-600">4.9/5</div>
                        <div className="text-xs uppercase font-bold tracking-widest mt-2">Google Reviews</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black text-red-600">A+</div>
                        <div className="text-xs uppercase font-bold tracking-widest mt-2">BBB Rating</div>
                    </div>
                </div>
            </section>

            {/* 3. Featured Reviews Masonry */}
            <section className="py-24 px-8 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
                <div className="columns-1 md:columns-3 gap-8 space-y-8">
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 break-inside-avoid hover:border-zinc-600 transition">
                            <div className="flex gap-1 text-red-600 mb-4 text-xs">★★★★★</div>
                            <h4 className="font-bold uppercase text-lg mb-2">"{review.title}"</h4>
                            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                                {review.content}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img
                                        src={`https://images.unsplash.com/photo-${review.image}?auto=format&fit=crop&w=100&q=80`}
                                        alt={review.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-xs font-bold uppercase">{review.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Video Testimonials */}
            <section className="py-24 bg-zinc-950 px-8">
                <h2 className="text-3xl font-black uppercase italic text-center mb-16">Delivery Days</h2>
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto grid md:grid-cols-3 lg:grid-cols-4 min-[2000px]:grid-cols-5 min-[3000px]:grid-cols-6 gap-8">
                    {VIDEOS.map((video, i) => (
                        <div key={i} className="aspect-video bg-zinc-800 border border-zinc-700 relative group cursor-pointer flex items-center justify-center overflow-hidden">
                            <img
                                src={`https://images.unsplash.com/photo-${video.id}?auto=format&fit=crop&w=800&q=80`}
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition duration-700"
                            />
                            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition relative z-10">
                                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Submit Review */}
            <section className="py-24 px-8 bg-zinc-900">
                <div className="w-full max-w-[90vw] min-[2000px]:max-w-[1000px] min-[3000px]:max-w-[1200px] mx-auto text-center">
                    <h2 className="text-3xl font-bold uppercase mb-8">Purchased from us?</h2>
                    <p className="text-zinc-400 mb-8">Share your experience with the community.</p>
                    <button className="border border-white text-white px-10 py-4 font-bold uppercase hover:bg-white hover:text-black transition">Write a Review</button>
                </div>
            </section>

            {/* 6. Instagram Feed */}
            <section className="py-24 px-8 border-t border-zinc-800">
                <div className="flex justify-between items-end mb-8 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
                    <h2 className="text-2xl font-black uppercase italic">#VelocityCars</h2>
                    <a href="#" className="text-red-600 text-xs font-bold uppercase hover:underline">Follow Us</a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
                    {INSTAGRAM.map((imgId, i) => (
                        <div key={i} className="aspect-square bg-zinc-800 hover:opacity-75 transition cursor-pointer overflow-hidden">
                            <img
                                src={`https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=400&q=80`}
                                alt={`Instagram ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
