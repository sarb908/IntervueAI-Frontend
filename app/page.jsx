import Navigation from "./_components/Navigation";
import Banner from "./_components/Banner";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import Pricing from "./_components/Pricing";
import FAQs from "./_components/FAQs";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
    <Banner />
    <Features />
    <HowItWorks />
    <Pricing />
    <FAQs/>
    <Footer />
    </div>
  );
}
