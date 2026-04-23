/* global React, ReactDOM */
function App() {
  const { tweaks, editOn, update } = useTweaks();
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
      <TweaksPanel tweaks={tweaks} editOn={editOn} update={update} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
