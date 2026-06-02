import { Contact } from "@/components/Contact";
import { CurrentlyBrewing } from "@/components/CurrentlyBrewing";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { SectionDivider } from "@/components/SectionDivider";
import { Skills } from "@/components/Skills";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <CurrentlyBrewing />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
