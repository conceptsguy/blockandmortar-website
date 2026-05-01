import { Nav, Footer } from './Sections';
import { LegalTOC, useActiveSection } from './LegalUtils';
import { PortableTextBody } from './PortableTextBody';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TermsPage({ sections = [], lastUpdated, subtitle, leadParagraph }) {
  const ids = sections.map(s => s.id);
  const activeId = useActiveSection(ids);
  const dateLabel = formatDate(lastUpdated) ?? 'April 9, 2026';

  return (
    <>
      <Nav />
      <main>
        <section className="legal-hero">
          <div className="container">
            <div className="eyebrow" style={{ position: 'relative' }}>
              <span className="dot" /> Legal
            </div>
            <h1 className="legal-h1">
              Terms <em>&amp;</em> Conditions
            </h1>
            <div className="legal-meta">
              <span>Block &amp; Mortar, Inc.</span>
              <span className="sep" />
              <span>Last updated · {dateLabel}</span>
              {subtitle && <><span className="sep" /><span>{subtitle}</span></>}
            </div>
          </div>
        </section>

        <section className="legal-body">
          <div className="container">
            <LegalTOC sections={sections} activeId={activeId} />
            <div className="legal-prose">
              {leadParagraph && <p className="lead">{leadParagraph}</p>}

              {sections.map(s => (
                <section key={s.id} id={s.id}>
                  <h2><span className="num">{s.num}</span>{s.title}</h2>
                  <PortableTextBody value={s.body} />
                </section>
              ))}

              <div className="legal-contact">
                <div>
                  <div className="legal-contact-k">Questions about these terms?</div>
                  <div className="legal-contact-v">info@blockandmortar.ai</div>
                </div>
                <a href="mailto:info@blockandmortar.ai" className="btn">
                  Contact legal <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
