"use client";

import { FallbackImage } from "./FallbackImage";
import { getCarAltText, getCarImageUrl } from "@/lib/carMedia";
import type { Car } from "@/lib/inventory";
import { HTMLMotionProps } from "framer-motion";

interface CarImageProps extends Omit<HTMLMotionProps<"img">, "src" | "alt"> {
  car: Pick<Car, "image" | "images" | "make" | "model" | "year">;
}

/** Always shows the image that belongs to this specific car */
export function CarImage({ car, className, ...props }: CarImageProps) {
  const imageUrl = getCarImageUrl(car);

  return (
    <FallbackImage
      key={`${car.make}-${car.model}-${imageUrl}`}
      {...props}
      className={className}
      car={car}
      src={imageUrl}
      alt={getCarAltText(car)}
    />
  );
}
