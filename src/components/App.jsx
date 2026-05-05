import { useQuery, useLiveMode } from '../lib/loader';
import { HOME_QUERY, TEAM_PAGE_QUERY } from '../lib/queries';
import { liveClient } from '../lib/sanity';
import { Nav, Hero, TrustedBy, PromptSection, Steps, Bento, Verticals, CTA, Footer } from './Sections';
import CollabScene from './CollabScene';
import DemoModal from './DemoModal';

// Mounted only when draft mode is active — useLiveMode can't be called conditionally
function LiveMode() {
  useLiveMode({ client: liveClient });
  return null;
}

export default function App({ homeInitial, isDraftMode = false }) {
  const { data: homeData } = useQuery(HOME_QUERY, {}, { initial: homeInitial });

  return (
    <>
      {isDraftMode && liveClient && <LiveMode />}
      <Nav />
      <Hero
        heading={homeData?.heroHeading}
        subheading={homeData?.heroSubheading}
        testimonials={homeData?.testimonials ?? []}
        logos={homeData?.logos ?? []}
      />
      <TrustedBy />
      <PromptSection
        heading={homeData?.promptHeading}
        headingEm={homeData?.promptHeadingEm}
        description={homeData?.promptDescription}
      />
      <Steps
        heading={homeData?.stepsHeading}
        headingEm={homeData?.stepsHeadingEm}
        description={homeData?.stepsDescription}
        steps={homeData?.steps ?? []}
      />
      <Bento
        heading={homeData?.bentoHeading}
        headingEm={homeData?.bentoHeadingEm}
        description={homeData?.bentoDescription}
        boxes={homeData?.bentoBoxes ?? []}
      />
      <section className="section" id="collab" style={{ paddingTop: 80 }}>
        <div className="container">
          <CollabScene
            heading={homeData?.collabHeading}
            headingEm={homeData?.collabHeadingEm}
            description={homeData?.collabDescription}
            features={homeData?.collabFeatures ?? []}
          />
        </div>
      </section>
      <Verticals
        heading={homeData?.verticalsHeading}
        headingEm={homeData?.verticalsHeadingEm}
        description={homeData?.verticalsDescription}
        verticals={homeData?.verticals ?? []}
      />
      <CTA
        heading={homeData?.ctaHeading}
        headingEm={homeData?.ctaHeadingEm}
        description={homeData?.ctaDescription}
      />
      <Footer />
      <DemoModal />
    </>
  );
}
