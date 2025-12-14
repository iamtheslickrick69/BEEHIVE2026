import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { AboutSection } from "@/components/home/about-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { ServicesBento } from "@/components/home/services-bento"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { ContactSection } from "@/components/home/contact-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <CategoriesSection />
      <ServicesBento />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
