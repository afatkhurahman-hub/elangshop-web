// app/page.tsx
import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import Featrues from "@/components/landing-page/Featrues";
import PopularProducts from "@/components/next-page/PopularProducts";
import Testimonials from "@/components/next-page/Testimonials";
import WhyChooseUs from "@/components/next-page/WhyChooseUs";
import HowToTopUp from "@/components/next-page/HowToTopUp";
import FaqAndFooter from "@/components/next-page/FaqAndFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Featrues />
      <PopularProducts />
      <WhyChooseUs />
      <HowToTopUp />
      <Testimonials />
      <FaqAndFooter />
    </main>
  );
}