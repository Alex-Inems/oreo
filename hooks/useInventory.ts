"use client";

import { useState, useEffect } from "react";
import { subscribeInventory, Car } from "@/lib/inventory";

export function useInventory() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeInventory((data) => {
      setCars(data.filter((c) => c.status !== "Sold"));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { cars, loading };
}
