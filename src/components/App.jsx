import { Nav, Hero, TrustedBy, PromptSection, Steps, Bento, Verticals, CTA, Footer } from './Sections';
import CollabScene from './CollabScene';
import DemoModal from './DemoModal';

export default function App({
  heroHeading,
  heroSubheading,
  promptHeading,
  promptHeadingEm,
  promptDescription,
  stepsHeading,
  stepsHeadingEm,
  stepsDescription,
  steps = [],
  bentoHeading,
  bentoHeadingEm,
  bentoDescription,
  collabHeading,
  collabHeadingEm,
  collabDescription,
  collabFeatures = [],
  verticalsHeading,
  verticalsHeadingEm,
  verticalsDescription,
  verticals = [],
  ctaHeading,
  ctaHeadingEm,
  ctaDescription,
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
      <PromptSection
        heading={promptHeading}
        headingEm={promptHeadingEm}
        description={promptDescription}
      />
      <Steps
        heading={stepsHeading}
        headingEm={stepsHeadingEm}
        description={stepsDescription}
        steps={steps}
      />
      <Bento
        heading={bentoHeading}
        headingEm={bentoHeadingEm}
        description={bentoDescription}
      />
      <section className="section" id="collab" style={{ paddingTop: 80 }}>
        <div className="container">
          <CollabScene
            heading={collabHeading}
            headingEm={collabHeadingEm}
            description={collabDescription}
            features={collabFeatures}
          />
        </div>
      </section>
      <Verticals
        heading={verticalsHeading}
        headingEm={verticalsHeadingEm}
        description={verticalsDescription}
        verticals={verticals}
      />
      <CTA
        heading={ctaHeading}
        headingEm={ctaHeadingEm}
        description={ctaDescription}
      />
      <Footer />
      <DemoModal />
    </>
  );
}
