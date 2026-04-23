import FeatureModule from '@/components/FeatureModule';
import { Smartphone, BarChart3, Sparkles } from 'lucide-react';

export default function Features() {
  const exchangeDetails = [
    "Instant data transfer with NFC technology.",
    "Native support for iOS and Android.",
    "Zero app installation required for recipients."
  ];

  const managementDetails = [
    "Manage team cards from a central dashboard.",
    "Real-time analytics on card taps and clicks.",
    "Fully customizable digital profile layouts."
  ];

  const brandDetails = [
    "Eco-friendly alternative to paper waste.",
    "Premium finishes: Matte, Metal, and Wood.",
    "Custom domain hosting for your profile."
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem' }}>
          Powerful <span className="gradient-text">Modules</span>
        </h1>
        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
          Everything you need to network like a pro in the modern world.
        </p>
      </div>

      <FeatureModule 
        icon={Smartphone}
        title="Seamless Exchange"
        description="The magic of a single tap. High-speed NFC chips ensure your data is transferred securely and instantly to any smartphone, without the need for additional apps."
        details={exchangeDetails}
      />

      <FeatureModule 
        icon={BarChart3}
        title="Network Management"
        description="Take control of your professional connections. Our centralized dashboard gives you the power to manage your team's cards and analyze networking ROI in real-time."
        details={managementDetails}
        reverse={true}
      />

      <FeatureModule 
        icon={Sparkles}
        title="Sustainable Brand"
        description="Make a lasting impression without the environmental cost. Our premium, eco-friendly cards are designed to showcase your unique brand identity with elegance."
        details={brandDetails}
      />
    </div>
  );
}
