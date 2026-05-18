import Image from "next/image";
import Navigation from "./_components/Navigation";
import Banner from "./_components/Banner";
import Features from "./_components/Features";
export default function Home() {
  return (
    <div>
    <Navigation />
    <Banner />
    <Features />
    </div>
  );
}
