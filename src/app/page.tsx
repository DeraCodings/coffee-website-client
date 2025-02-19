// import Header from "@/components/Header";
import CallToActionSection from "@/components/homepage/CallToActionSection";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import Footer from "@/components/homepage/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import OurStory from "@/components/homepage/OurStory";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import Header from "@/components/ResponsiveMenu";

const HomePage = () => {
  return (
    <>
      {/* <Header /> */}
      <Header />
      <HeroSection />
      <OurStory />
      <FeaturedSection />
      <TestimonialSection />
      <CallToActionSection />
      <Footer />
    </>
  );
};

export default HomePage;
