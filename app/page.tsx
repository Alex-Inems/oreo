"use client";

import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Inventory from "@/components/Inventory";
import Financing from "@/components/Financing";
import Features from "@/components/Features";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Testimonial from "@/components/Testimonial";

export default function CarSalesLanding() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Stats />
      <Inventory />
      <Financing />
      <Features />
      <WhyChooseUs />
      <Process />
      <Gallery />
      <FAQ />
      <Testimonial />
    </div>
  );
}
