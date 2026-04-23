import Hero from '@/components/Hero';
import FeatureModule from '@/components/FeatureModule';
import { AlertCircle, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
  const problemDetails = [
    "88% of paper cards are discarded within a week.",
    "Outdated information requires costly reprints.",
    "Limited space for digital links and bios."
  ];

  const solutionDetails = [
    "Instant details transfer via NFC tap.",
    "Real-time profile updates 24/7.",
    "Full social and portfolio integration."
  ];

  return (
    <>
      <Hero />
      
      {/* Problem Module */}
      <FeatureModule 
        icon={AlertCircle}
        title="The Paper Trap"
        description="Traditional networking is broken. Paper cards are easy to lose, hard to update, and contribute to significant environmental waste."
        details={problemDetails}
        visualType="cards"
      />

      {/* Solution Module */}
      <FeatureModule 
        icon={Zap}
        title="Digital Freedom"
        description="Experience the future of connecting. One card, infinite possibilities. Seamlessly share your entire professional world with a single tap."
        details={solutionDetails}
        reverse={true}
        visualType="phone"
      />
    </>
  );
}