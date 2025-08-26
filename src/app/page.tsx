import CallToAction from "@/components/call-to-action";
import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-2";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-7";
import LogoCloud from "@/components/logo-cloud";

export default function Home() {
  return (<>
      <HeroSection />
    <LogoCloud />
    <Features />
    <IntegrationsSection />
    <FAQsThree />
    <CallToAction />
    <FooterSection />
  </>

  );
}
