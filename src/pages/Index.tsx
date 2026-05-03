import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import RnD from "@/components/sections/RnD";
import Reviews from "@/components/sections/Reviews";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <main className="bg-cream">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <RnD />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
