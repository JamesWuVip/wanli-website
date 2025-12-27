import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustIndicators from '@/components/TrustIndicators';
import Advantages from '@/components/Advantages';
import AICapabilities from '@/components/AICapabilities';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import ConsultationForm from '@/components/ConsultationForm';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

type PageProps = {
  params: Promise<{locale: string}> | {locale: string};
};

export default async function HomePage(props: PageProps) {
  const params = await Promise.resolve(props.params);

  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <TrustIndicators />
        <Advantages />
        <AICapabilities />
        <Services />
        <Process />
        <Testimonials />
        <ConsultationForm locale={params.locale} />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
