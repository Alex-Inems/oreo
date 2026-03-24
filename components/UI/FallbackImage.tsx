"use client";

import { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface FallbackImageProps extends HTMLMotionProps<"img"> {
  fallbackSrc?: string;
}

export const FallbackImage = ({ src, fallbackSrc = "/public/images/car1.jpg", alt, ...props }: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      setImgSrc(fallbackSrc);
      setErrorCount(1);
    } else if (errorCount === 1) {
      // If even the fallback fails, use a completely safe empty one or another
      setImgSrc("https://via.placeholder.com/800x600?text=Image+Unavailable");
      setErrorCount(2);
    }
  };

  return (
    <motion.img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};
