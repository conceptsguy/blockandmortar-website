import { Nav, Hero, TrustedBy, PromptSection, Steps, Bento, Verticals, CTA, Footer } from './Sections';
import CollabScene from './CollabScene';
import DemoModal from './DemoModal';

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustedBy />
      <PromptSection />
      <Steps />
      <Bento />
      <section className="section" id="collab" style={{ paddingTop: 80 }}>
        <div className="container">
          <CollabScene />
        </div>
      </section>
      <Verticals />
      <CTA />
      <Footer />
      <DemoModal />
    </>
  );
}
