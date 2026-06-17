"use client";

import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import BrandStory from "@/components/BrandStory";
import BrandsMarquee from "@/components/BrandsMarquee";
import Inventory from "@/components/Inventory";
import Experience from "@/components/Experience";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Financing from "@/components/Financing";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import NewsletterCTA from "@/components/NewsletterCTA";

export default function CarSalesLanding() {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Hero />
      <Stats />
      <BrandStory />
      <BrandsMarquee />
      <div id="collection">
        <Inventory />
      </div>
      <Experience />
      <WhyChooseUs />
      <Process />
      <Features />
      <Gallery />
      <Financing />
      <Testimonial />
      <FAQ />
      <NewsletterCTA />
    </div>
  );
}
