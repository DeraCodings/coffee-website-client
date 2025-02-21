import CallToActionSection from "@/components/homepage/CallToActionSection";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import HeroSection from "@/components/homepage/HeroSection";
import OurStory from "@/components/homepage/OurStory";
import TestimonialSection from "@/components/homepage/TestimonialSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <OurStory />
      <FeaturedSection />
      <TestimonialSection />
      <CallToActionSection />
    </>
  );
};

export default HomePage;
