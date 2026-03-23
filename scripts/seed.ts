import { addCar } from "../lib/inventory";

const SEED_CARS = [
  {
    make: "Lamborghini",
    model: "Aventador SVJ",
    year: 2024,
    price: 550000,
    image: "https://images.unsplash.com/photo-1627454819213-f56f48f5236f?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "New",
    bodyType: "Coupe",
    engine: "V12",
    mileage: 0,
    description: "The peak of Lamborghini's V12 lineage. An aerodynamic masterpiece crafted for the track.",
    specs: [{ label: "0-60", value: "2.8s" }, { label: "Top Speed", value: "217 mph" }, { label: "Horsepower", value: "759 HP" }],
    featured: true
  },
  {
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    price: 295000,
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "New",
    bodyType: "Coupe",
    engine: "Flat-6",
    mileage: 15,
    description: "Uncompromised performance. Born from motorsport engineering, the GT3 RS dominates on the track and excites on the road.",
    specs: [{ label: "0-60", value: "3.0s" }, { label: "Top Speed", value: "184 mph" }, { label: "Horsepower", value: "518 HP" }],
    featured: true
  },
  {
    make: "Mercedes-AMG",
    model: "G63",
    year: 2023,
    price: 195000,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "Used",
    bodyType: "SUV",
    engine: "BiTurbo V8",
    mileage: 4500,
    description: "A timeless icon redefined. The G63 pairs hand-crafted luxury with ferocious off-road capability.",
    specs: [{ label: "0-60", value: "4.5s" }, { label: "Horsepower", value: "577 HP" }],
    featured: false
  },
  {
    make: "Ferrari",
    model: "SF90 Stradale",
    year: 2024,
    price: 625000,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "New",
    bodyType: "Coupe",
    engine: "Hybrid V8",
    mileage: 10,
    description: "Ferrari's most powerful production car ever. Nearly 1000 hybrid horsepower delivering blistering acceleration.",
    specs: [{ label: "0-60", value: "2.5s" }, { label: "Top Speed", value: "211 mph" }, { label: "Horsepower", value: "986 HP" }],
    featured: true
  },
  {
    make: "McLaren",
    model: "765LT",
    year: 2023,
    price: 410000,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "Used",
    bodyType: "Coupe",
    engine: "Twin-Turbo V8",
    mileage: 1200,
    description: "The Longtail legacy continues. Lighter, lower, and more brutally responsive than any McLaren before it.",
    specs: [{ label: "0-60", value: "2.7s" }, { label: "Horsepower", value: "755 HP" }],
    featured: false
  },
  {
    make: "Rolls-Royce",
    model: "Cullinan",
    year: 2024,
    price: 390000,
    image: "https://images.unsplash.com/photo-1631269382218-ec379cb3a73c?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "New",
    bodyType: "SUV",
    engine: "V12",
    mileage: 25,
    description: "Absolute luxury without boundaries. The Cullinan commands respect everywhere it travels.",
    specs: [{ label: "0-60", value: "4.8s" }, { label: "Horsepower", value: "563 HP" }],
    featured: true
  },
  {
    make: "Aston Martin",
    model: "DBS Superleggera",
    year: 2023,
    price: 330000,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "Certified",
    bodyType: "Coupe",
    engine: "V12",
    mileage: 2100,
    description: "British muscular elegance. A sledgehammer in a tailored suit delivering devastating torque.",
    specs: [{ label: "0-60", value: "3.2s" }, { label: "Horsepower", value: "715 HP" }],
    featured: false
  },
  {
    make: "Bentley",
    model: "Continental GT",
    year: 2024,
    price: 285000,
    image: "https://images.unsplash.com/photo-1621285025753-33230a6e0eaf?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "New",
    bodyType: "Coupe",
    engine: "W12",
    mileage: 0,
    description: "The definitive Grand Tourer. Unmatched W12 refinement seamlessly blended with modern dynamic prowess.",
    specs: [{ label: "0-60", value: "3.5s" }, { label: "Horsepower", value: "650 HP" }],
    featured: true
  },
  {
    make: "Audi",
    model: "R8 V10 Performance",
    year: 2023,
    price: 175000,
    image: "https://images.unsplash.com/photo-1614026871583-9b4ea4e70e28?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "Certified",
    bodyType: "Coupe",
    engine: "V10",
    mileage: 5500,
    description: "The everyday supercar. An intoxicating naturally aspirated V10 symphony paired with legendary Quattro performance.",
    specs: [{ label: "0-60", value: "3.1s" }, { label: "Horsepower", value: "602 HP" }],
    featured: false
  },
  {
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 108000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    images: [],
    condition: "New",
    bodyType: "Electric",
    engine: "Tri-Motor",
    mileage: 50,
    description: "Ludicrous speed redefined. The quickest accelerating production car to ever roll off a factory floor.",
    specs: [{ label: "0-60", value: "1.99s" }, { label: "Horsepower", value: "1020 HP" }, { label: "Range", value: "396 mi" }],
    featured: true
  }
];

async function seed() {
  console.log("Seeding started...");
  for (const car of SEED_CARS) {
    try {
      const id = await addCar(car as any);
      console.log(`Added ${car.make} ${car.model} with ID ${id}`);
    } catch (e) {
      console.log(`Failed to add ${car.make}: ${e}`);
    }
  }
  console.log("Seeding complete!");
  process.exit();
}

seed();
