import { CtaBand } from "@/components/sections/CtaBand";
import { ComingSoonSection } from "@/features/home/components/ComingSoonSection";
import { FeaturedProjectsSection } from "@/features/home/components/FeaturedProjectsSection";
import { Hero } from "@/features/home/components/Hero";
import { ProcessSection } from "@/features/home/components/ProcessSection";
import { ServicesSection } from "@/features/home/components/ServicesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedProjectsSection />
      <ComingSoonSection />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
