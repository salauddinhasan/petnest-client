import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import PetCareTips from "@/components/PetCareTips";
import Stats from "@/components/Stats";
import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Featured/>
      <WhyAdopt />
      <SuccessStories/>
      <PetCareTips/>
    </div>
  );
}
