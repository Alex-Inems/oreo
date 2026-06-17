"use client";

import { useMemo, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { getCarImageUrl, normalizeImageUrl } from "@/lib/carMedia";
import type { Car } from "@/lib/inventory";

interface FallbackImageProps extends HTMLMotionProps<"img"> {
  car?: Pick<Car, "image" | "images" | "make" | "model">;
  fallbackSrc?: string;
}

const PLACEHOLDER =
  "https://via.placeholder.com/800x600/e8e8e8/888888?text=No+Image";

export const FallbackImage = ({ src, car, fallbackSrc, alt, ...props }: FallbackImageProps) => {
  const primary = useMemo(() => {
    const fromSrc = typeof src === "string" ? normalizeImageUrl(src) : "";
    if (fromSrc) return fromSrc;
    if (car) return getCarImageUrl(car);
    return fallbackSrc || PLACEHOLDER;
  }, [src, car, fallbackSrc]);

  const [imgSrc, setImgSrc] = useState(primary);
  const [stage, setStage] = useState(0);

  const handleError = () => {
    if (stage === 0 && car) {
      const mapped = getCarImageUrl({ ...car, image: "", images: [] });
      if (mapped && mapped !== imgSrc) {
        setImgSrc(mapped);
        setStage(1);
        return;
      }
    }
    if (stage < 2) {
      setImgSrc(fallbackSrc || PLACEHOLDER);
      setStage(2);
    }
  };

  return (
    <motion.img
      {...props}
      key={primary}
      src={imgSrc || primary}
      alt={alt}
      onError={handleError}
    />
  );
};
