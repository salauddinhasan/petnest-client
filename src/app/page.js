import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhyAdopt from "@/components/WhyAdopt";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Featured/>
      <WhyAdopt />
    </div>
  );
}
