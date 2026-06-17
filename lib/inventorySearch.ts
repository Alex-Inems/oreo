import type { Car } from "./inventory";

export interface InventorySearchParams {
  condition?: string | null;
  make?: string | null;
  model?: string | null;
  maxPrice?: string | null;
  bodyType?: string | null;
}

const BODY_TYPE_ALIASES: Record<string, string[]> = {
  sedan: ["sedan", "electric"],
  coupe: ["coupe"],
  suv: ["suv"],
  hatchback: ["hatchback"],
  convertible: ["convertible", "coupe"],
};

function matchesCondition(car: Car, condition: string): boolean {
  if (condition === "All") return true;
  if (condition === "New") return car.condition === "New";
  if (condition === "Used") return car.condition === "Used" || car.condition === "Certified";
  return true;
}

function matchesMake(car: Car, make: string): boolean {
  const m = make.toLowerCase();
  const carMake = car.make.toLowerCase();
  return carMake.includes(m) || m.includes(carMake.split("-")[0]);
}

function matchesModel(car: Car, model: string): boolean {
  const m = model.toLowerCase();
  return car.model.toLowerCase().includes(m) || m.includes(car.model.toLowerCase());
}

function matchesBodyType(car: Car, bodyType: string): boolean {
  const key = bodyType.toLowerCase();
  const aliases = BODY_TYPE_ALIASES[key] || [key];
  const carType = car.bodyType.toLowerCase();
  return aliases.some((alias) => carType.includes(alias));
}

export function filterInventory(cars: Car[], params: InventorySearchParams): Car[] {
  return cars.filter((car) => {
    if (car.status === "Sold") return false;

    if (params.condition && !matchesCondition(car, params.condition)) return false;

    if (params.make && params.make !== "All Makes" && !matchesMake(car, params.make)) return false;

    if (params.model && params.model !== "All Models" && !matchesModel(car, params.model)) return false;

    if (params.maxPrice && params.maxPrice !== "Max Price") {
      const max = parseInt(params.maxPrice.replace(/[$,]/g, ""), 10);
      if (!isNaN(max) && car.price > max) return false;
    }

    if (params.bodyType && !matchesBodyType(car, params.bodyType)) return false;

    return true;
  });
}

export function buildMakeOptions(cars: Car[]): string[] {
  const makes = Array.from(new Set(cars.map((c) => c.make).filter(Boolean))).sort();
  return ["All Makes", ...makes];
}

export function buildModelOptions(cars: Car[], selectedMake: string): string[] {
  const filtered =
    selectedMake && selectedMake !== "All Makes"
      ? cars.filter((c) => matchesMake(c, selectedMake))
      : cars;
  const models = Array.from(new Set(filtered.map((c) => c.model).filter(Boolean))).sort();
  return ["All Models", ...models];
}

export function parseSearchParams(searchParams: URLSearchParams): InventorySearchParams {
  return {
    condition: searchParams.get("condition"),
    make: searchParams.get("make"),
    model: searchParams.get("model"),
    maxPrice: searchParams.get("maxPrice"),
    bodyType: searchParams.get("bodyType"),
  };
}

export function buildSearchQuery(params: InventorySearchParams): string {
  const sp = new URLSearchParams();
  if (params.condition && params.condition !== "All") sp.set("condition", params.condition);
  if (params.make && params.make !== "All Makes") sp.set("make", params.make);
  if (params.model && params.model !== "All Models") sp.set("model", params.model);
  if (params.maxPrice && params.maxPrice !== "Max Price") sp.set("maxPrice", params.maxPrice);
  if (params.bodyType) sp.set("bodyType", params.bodyType);
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function describeSearch(params: InventorySearchParams): string {
  const parts: string[] = [];
  if (params.condition && params.condition !== "All") parts.push(params.condition);
  if (params.make && params.make !== "All Makes") parts.push(params.make);
  if (params.model && params.model !== "All Models") parts.push(params.model);
  if (params.maxPrice && params.maxPrice !== "Max Price") {
    const max = parseInt(params.maxPrice.replace(/[$,]/g, ""), 10);
    if (!isNaN(max)) parts.push(`under $${max.toLocaleString()}`);
  }
  if (params.bodyType) parts.push(params.bodyType);
  return parts.length ? parts.join(" · ") : "All vehicles";
}
