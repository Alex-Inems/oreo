// ─────────────────────────────────────────────
//  Cars26 · Central Data Store
// ─────────────────────────────────────────────

export interface Car {
  id: number;
  name: string;
  year: number;
  category: "Supercars" | "SUVs" | "Sedans" | "Electric" | "Trucks";
  price: number;         // stored as number, e.g. 120000
  image: string;
  range: string;
  speed: string;
  status: "available" | "sold" | "reserved";
  vin: string;
  mileage: number;
  color: string;
  description: string;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  car: string;
  date: string;
  status: "approved" | "pending" | "rejected";
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  carId?: number;
  carName?: string;
  date: string;
  status: "new" | "contacted" | "closed";
}

// ── Cars ──────────────────────────────────────
export const CARS: Car[] = [
  {
    id: 1,
    name: "Tesla Model X Plaid",
    year: 2025,
    category: "Electric",
    price: 120000,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    range: "300mi",
    speed: "1.9s",
    status: "available",
    vin: "5YJXCAE47NF000001",
    mileage: 120,
    color: "Midnight Silver",
    description: "The ultimate performance SUV with falcon-wing doors and ludicrous acceleration.",
  },
  {
    id: 2,
    name: "Lamborghini Aventador",
    year: 2024,
    category: "Supercars",
    price: 500000,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    range: "N/A",
    speed: "2.5s",
    status: "reserved",
    vin: "ZHWBU4ZF4NLA12345",
    mileage: 55,
    color: "Arancio Borealis",
    description: "Naturally aspirated V12 legend. Raw, unfiltered, breathtaking.",
  },
  {
    id: 3,
    name: "Mercedes G-Wagon",
    year: 2025,
    category: "SUVs",
    price: 180000,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80",
    range: "N/A",
    speed: "4.5s",
    status: "available",
    vin: "WDCYC7HH2NX000003",
    mileage: 210,
    color: "Obsidian Black",
    description: "Iconic off-roader with refined luxury and unmistakable commanding presence.",
  },
  {
    id: 4,
    name: "Porsche 911 GT3",
    year: 2024,
    category: "Supercars",
    price: 200000,
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80",
    range: "N/A",
    speed: "3.2s",
    status: "available",
    vin: "WP0AC2A96NS200100",
    mileage: 88,
    color: "GT Silver Metallic",
    description: "Track-bred precision with naturally-aspirated flat-six perfection.",
  },
  {
    id: 5,
    name: "Tesla Model S Plaid",
    year: 2025,
    category: "Electric",
    price: 110000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    range: "396mi",
    speed: "1.99s",
    status: "available",
    vin: "5YJSA1E40NF000005",
    mileage: 340,
    color: "Deep Blue Metallic",
    description: "World's fastest production sedan with over-the-air software updates.",
  },
  {
    id: 6,
    name: "BMW M5 CS",
    year: 2023,
    category: "Sedans",
    price: 145000,
    image: "https://images.unsplash.com/photo-1555008872-f03b347ffb53?auto=format&fit=crop&w=800&q=80",
    range: "N/A",
    speed: "2.9s",
    status: "sold",
    vin: "WBSJF0C59ND000006",
    mileage: 1200,
    color: "Frozen Brilliant White",
    description: "The most powerful M5 ever built — a driver's sedan at its finest.",
  },
];

// ── Reviews ───────────────────────────────────
export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "James Whitfield",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    text: "Purchased the Porsche 911 GT3 and couldn't be happier. The team made the process seamless — no pressure, just expertise.",
    car: "Porsche 911 GT3",
    date: "2025-02-14",
    status: "approved",
  },
  {
    id: 2,
    author: "Sofia Nakamura",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    text: "My Tesla Model S Plaid arrived in perfect condition. The concierge delivery service was an exceptional touch.",
    car: "Tesla Model S Plaid",
    date: "2025-03-01",
    status: "approved",
  },
  {
    id: 3,
    author: "Marcus Thompson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    rating: 4,
    text: "Very happy with the G-Wagon. Would have given 5 stars but the paperwork felt a bit slow.",
    car: "Mercedes G-Wagon",
    date: "2025-03-10",
    status: "pending",
  },
  {
    id: 4,
    author: "Anya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    rating: 2,
    text: "Car was great but I think it was slightly overpriced. Staff were helpful though.",
    car: "BMW M5 CS",
    date: "2025-03-15",
    status: "rejected",
  },
];

// ── Inquiries ─────────────────────────────────
export const INQUIRIES: Inquiry[] = [
  {
    id: 1,
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "+1 (310) 555-0192",
    message: "Interested in the Lamborghini Aventador. Can we arrange a viewing this weekend?",
    carId: 2,
    carName: "Lamborghini Aventador",
    date: "2025-03-20",
    status: "new",
  },
  {
    id: 2,
    name: "Rachel Moore",
    email: "rmoore@financegroup.com",
    phone: "+1 (212) 555-0344",
    message: "Looking for fleet pricing on 3+ Tesla Model S Plaid units for our executive team.",
    carId: 5,
    carName: "Tesla Model S Plaid",
    date: "2025-03-18",
    status: "contacted",
  },
  {
    id: 3,
    name: "Tyler Brooks",
    email: "tyler.brooks@gmail.com",
    phone: "+1 (415) 555-0721",
    message: "I'd like to trade in my 2023 BMW M3 towards a Porsche 911 GT3. What's my estimate?",
    carId: 4,
    carName: "Porsche 911 GT3",
    date: "2025-03-15",
    status: "closed",
  },
  {
    id: 4,
    name: "Isabelle Laurent",
    email: "ilaurent@luxuryevents.fr",
    phone: "+33 6 12 34 56 78",
    message: "We need two G-Wagons for a film production. Can you accommodate short-term leasing?",
    carId: 3,
    carName: "Mercedes G-Wagon",
    date: "2025-03-22",
    status: "new",
  },
];

// ── Helpers ───────────────────────────────────
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
