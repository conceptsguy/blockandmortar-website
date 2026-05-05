import { useQuery, useLiveMode } from '../lib/loader';
import { liveClient } from '../lib/sanity';
import { LEGAL_QUERY } from '../lib/queries';
import { Nav, Footer } from './Sections';
import { LegalTOC, useActiveSection } from './LegalUtils';
import { PortableTextBody } from './PortableTextBody';

function LiveMode() {
  useLiveMode({ client: liveClient });
  return null;
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function AccessibilityPage({ legalInitial, isDraftMode = false }) {
  const { data } = useQuery(LEGAL_QUERY, { pageKey: 'accessibility' }, { initial: legalInitial });
  const sections = data?.sections ?? [];
  const ids = sections.map(s => s.id);
  const activeId = useActiveSection(ids);
  const dateLabel = formatDate(data?.lastUpdated) ?? 'April 9, 2026';

  return (
    <>
      {isDraftMode && liveClient && <LiveMode />}
      <Nav />
      <main>
        <section className="legal-hero">
          <div className="container">
            <div className="eyebrow" style={{ position: 'relative' }}>
              <span className="dot" /> Accessibility
            </div>
            <h1 className="legal-h1">
              Accessibility <em>statement</em>
            </h1>
            <div className="legal-meta">
              <span>Block &amp; Mortar, Inc.</span>
              <span className="sep" />
              <span>Last updated · {dateLabel}</span>
              {data?.subtitle && <><span className="sep" /><span>{data.subtitle}</span></>}
            </div>
          </div>
        </section>

        <section className="legal-body">
          <div className="container">
            <LegalTOC sections={sections} activeId={activeId} />
            <div className="legal-prose">
              {data?.leadParagraph && <p className="lead">{data.leadParagraph}</p>}
              {sections.map(s => (
                <section key={s.id} id={s.id}>
                  <h2><span className="num">{s.num}</span>{s.title}</h2>
                  <PortableTextBody value={s.body} />
                </section>
              ))}
              <div className="legal-contact">
                <div>
                  <div className="legal-contact-k">Report an accessibility issue</div>
                  <div className="legal-contact-v">info@blockandmortar.ai</div>
                </div>
                <a href="mailto:info@blockandmortar.ai" className="btn">
                  Email accessibility team <span className="arrow">→</span>
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
