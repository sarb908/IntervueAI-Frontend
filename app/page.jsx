import Image from "next/image";
import Navigation from "./_components/Navigation";
import Banner from "./_components/Banner";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import Pricing from "./_components/Pricing";

export default function Home() {
  return (
    <div>
    <Navigation />
    <Banner />
    <Features />
    <HowItWorks />
    <Pricing />
    </div>
  );
}
