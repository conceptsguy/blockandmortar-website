import { Nav, Hero, TrustedBy, PromptSection, Steps, Bento, Verticals, CTA, Footer } from './Sections';
import CollabScene from './CollabScene';
import DemoModal from './DemoModal';

export default function App({
  heroHeading,
  heroSubheading,
  ctaHeading,
  ctaDescription,
  steps = [],
  verticals = [],
  testimonials = [],
}) {
  return (
    <>
      <Nav />
      <Hero
        heading={heroHeading}
        subheading={heroSubheading}
        testimonials={testimonials}
      />
      <TrustedBy />
      <PromptSection />
      <Steps steps={steps} />
      <Bento />
      <section className="section" id="collab" style={{ paddingTop: 80 }}>
        <div className="container">
          <CollabScene />
        </div>
      </section>
      <Verticals verticals={verticals} />
      <CTA heading={ctaHeading} description={ctaDescription} />
      <Footer />
      <DemoModal />
    </>
  );
}
