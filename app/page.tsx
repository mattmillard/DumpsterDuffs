import Hero from "@/components/home/Hero";
import InstantQuote from "@/components/home/InstantQuote";
import SizeOverview from "@/components/home/SizeOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import SocialProof from "@/components/home/SocialProof";
import ServiceAreas from "@/components/home/ServiceAreas";
import FAQTeaser from "@/components/home/FAQTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <InstantQuote />
      <SizeOverview />
      <WhyChooseUs />
      <HowItWorks />
      <SocialProof />
      <ServiceAreas />
      <FAQTeaser />
      <FinalCTA />
    </>
  );
}
