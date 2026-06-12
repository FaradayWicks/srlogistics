import Hero from '@/components/Hero';
import ScrollJourney from '@/components/ScrollJourney';
import About from '@/components/About';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />
      <ScrollJourney />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Stats />
      <SectionDivider />
      <Contact />
    </main>
  );
}
