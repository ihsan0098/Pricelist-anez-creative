import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import WeddingPackages from "@/components/WeddingPackages";
import CinemaSection from "@/components/CinemaSection";
import PreweddingSection from "@/components/PreweddingSection";
import Gallery from "@/components/Gallery";
import InstagramSection from "@/components/InstagramSection";
import Calculator from "@/components/Calculator";
import AddonsPrint from "@/components/AddonsPrint";
import Testimonials from "@/components/Testimonials";
import BookingForm from "@/components/BookingForm";
import TermsSection from "@/components/TermsSection";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import { initLenis } from "@/lib/scroll";

export default function Home() {
  useEffect(() => initLenis(), []);

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground antialiased">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Philosophy />
      <WeddingPackages />
      <CinemaSection />
      <PreweddingSection />
      <AddonsPrint />
      <Calculator />
      <Gallery />
      <InstagramSection />
      <Testimonials />
      <BookingForm />
      <TermsSection />
      <Footer />
      <FloatingDock />
    </main>
  );
}
