import BiddingTool from "@/components/sections/BiddingTool";
import Demo from "@/components/sections/Demo";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Demo />
      <Testimonials />
      <BiddingTool />
      <Faq />
    </>
  );
}
