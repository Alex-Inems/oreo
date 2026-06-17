import type { Car } from "./inventory";

/** Canonical images keyed to make|model — used when Firebase image is missing or broken */
export const CAR_IMAGE_MAP: Record<string, string> = {
  "Lamborghini|Aventador SVJ": "https://images.unsplash.com/photo-1627454819213-f56f48f5236f?auto=format&fit=crop&w=1200&q=80",
  "Porsche|911 GT3 RS": "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80",
  "Mercedes-AMG|G63": "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
  "Ferrari|SF90 Stradale": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
  "McLaren|765LT": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
  "Rolls-Royce|Cullinan": "https://images.unsplash.com/photo-1631269382218-ec379cb3a73c?auto=format&fit=crop&w=1200&q=80",
  "Aston Martin|DBS Superleggera": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
  "Bentley|Continental GT": "https://images.unsplash.com/photo-1621285025753-33230a6e0eaf?auto=format&fit=crop&w=1200&q=80",
  "Audi|R8 V10 Performance": "https://images.unsplash.com/photo-1614026871583-9b4ea4e70e28?auto=format&fit=crop&w=1200&q=80",
  "Tesla|Model S Plaid": "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
};

export function normalizeImageUrl(url?: string): string {
  if (!url?.trim()) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("/public/")) return trimmed.replace("/public", "");
  return trimmed;
}

export function getCarImageKey(make: string, model: string): string {
  return `${make}|${model}`;
}

/** Primary display image — always tied to this car's make/model */
export function getCarImageUrl(car: Pick<Car, "image" | "images" | "make" | "model">): string {
  const fromField = normalizeImageUrl(car.image) || normalizeImageUrl(car.images?.[0]);
  if (fromField) return fromField;
  return CAR_IMAGE_MAP[getCarImageKey(car.make, car.model)] || "";
}

export function getCarDisplayName(car: Pick<Car, "year" | "make" | "model">): string {
  return `${car.year} ${car.make} ${car.model}`;
}

export function getCarAltText(car: Pick<Car, "year" | "make" | "model">): string {
  return `${car.year} ${car.make} ${car.model}`;
}
