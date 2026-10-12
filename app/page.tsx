import { MotionProvider } from "@/lib/animations/motion-config";
import {
  Navbar,
  FluidBackground,
  ScrollProgress,
  WhatsAppFloat,
  Footer,
} from "@/components/organisms";
import {
  HeroSection,
  ProblemSection,
  ProductsSection,
  RoiSection,
  TechStackSection,
  FaqSection,
  LeadFormSection,
} from "@/components/sections";

/**
 * SUPERNOVA LABS STUDIO — Elite Landing Page
 * ============================================================================
 * CRO Psychology Map (Conversion Funnel):
 * 1. Hero         → Hook: "1x Bayar. Milik Anda Selamanya." (Liberation from SaaS)
 * 2. Problem      → Agitate subscription fatigue vs ownership
 * 3. Simulations  → Prove technical superiority (Aha! moments)
 * 4. ROI Calc     → Financial closer (quantify waste)
 * 5. Tech Stack   → Justify premium price with elite stack
 * 6. FAQ          → Overcome final objections
 * 7. Lead Form    → Capture high-ticket leads
 * ============================================================================
 *
 * Arsitektur: Atomic Design (atoms → molecules → organisms → sections).
 * State: Zustand (selector-based, 6 stores). Animasi: framer-motion/m via
 * LazyMotion (MotionProvider) — GPU-only transforms/opacity.
 */
export default function HomePage() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <FluidBackground />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProductsSection />
        <RoiSection />
        <TechStackSection />
        <FaqSection />
        <LeadFormSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MotionProvider>
  );
}
