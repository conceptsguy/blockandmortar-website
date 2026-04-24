/* global React, ReactDOM, Nav, Footer */
// Accessibility Statement — light background, matches Block & Mortar legal page style.

const A11Y_SECTIONS = [
  {
    id: 'commitment',
    num: '01',
    title: 'Our commitment',
    body: (
      <>
        <p className="first">
          Block &amp; Mortar is committed to ensuring our platform is usable by as many people as possible, including those who rely on assistive technology. We believe the built environment — and the tools that shape it — should be accessible to every stakeholder involved in creating it.
        </p>
        <p>
          Accessibility is not a checkbox for us. It's an ongoing practice that informs how we design, build, and ship every feature of blockandmortar.ai.
        </p>
      </>
    ),
  },
  {
    id: 'standards',
    num: '02',
    title: 'Conformance standards',
    body: (
      <>
        <p className="first">
          Our platform is designed and tested against the <strong>Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA</strong>, as published by the W3C. These guidelines define how to make web content more accessible to people with a wide range of disabilities — including visual, auditory, cognitive, motor, and neurological differences.
        </p>
        <p>We align our work with:</p>
        <ul>
          <li>WCAG 2.2 Level AA success criteria</li>
          <li>Section 508 of the U.S. Rehabilitation Act</li>
          <li>EN 301 549 (the EU accessibility standard)</li>
          <li>ADA Title III guidance for digital experiences</li>
        </ul>
      </>
    ),
  },
  {
    id: 'what-we-do',
    num: '03',
    title: 'What we do to support accessibility',
    body: (
      <>
        <h3>a. Design</h3>
        <ul>
          <li>Minimum 4.5:1 contrast ratio for body text, 3:1 for large text and UI components</li>
          <li>A readable type scale with no information conveyed by color alone</li>
          <li>Focus indicators on every interactive element, preserved across themes</li>
          <li>Motion-reduced variants of all animated content, honoring <code>prefers-reduced-motion</code></li>
        </ul>
        <h3>b. Engineering</h3>
        <ul>
          <li>Semantic HTML as a default; ARIA only where semantics fall short</li>
          <li>Full keyboard navigation across modeling tools, estimators, and dashboards</li>
          <li>Descriptive alt text and labels for charts, plans, and model artifacts</li>
          <li>Screen-reader testing with NVDA, JAWS, and VoiceOver on each release</li>
        </ul>
        <h3>c. Process</h3>
        <ul>
          <li>Accessibility review in every design spec and pull request</li>
          <li>Automated axe-core checks in CI, plus quarterly manual audits</li>
          <li>Issue triage that treats accessibility defects as functional bugs, not enhancements</li>
        </ul>
      </>
    ),
  },
  {
    id: 'known-limitations',
    num: '04',
    title: 'Known limitations',
    body: (
      <>
        <p className="first">
          Despite our best efforts, some parts of our platform have known accessibility limitations. We disclose them here in the spirit of transparency, and we are actively working on each.
        </p>
        <ul>
          <li><strong>3D model viewer.</strong> The WebGL viewer for project massing currently has partial keyboard support. A fully keyboard-navigable 2D fallback is in development.</li>
          <li><strong>Complex data tables.</strong> Some pro-forma and schedule tables use custom virtualization; screen-reader announcements for cell-level updates are being improved.</li>
          <li><strong>Legacy embedded reports.</strong> PDFs generated before March 2026 may lack tagged structure. Re-exporting a report from the current platform produces a fully tagged file.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'assistive-tech',
    num: '05',
    title: 'Compatible assistive technology',
    body: (
      <>
        <p className="first">Our platform is designed to work with recent versions of the following screen readers, in combination with the browsers listed below.</p>
        <h3>Screen readers</h3>
        <ul>
          <li>NVDA 2024 or later (Windows)</li>
          <li>JAWS 2024 or later (Windows)</li>
          <li>VoiceOver on macOS 13+ and iOS 16+</li>
          <li>TalkBack on Android 12+</li>
        </ul>
        <h3>Browsers</h3>
        <ul>
          <li>Chrome, Edge, and Firefox (current and previous major versions)</li>
          <li>Safari 16 and later</li>
        </ul>
        <p>If you use a combination that is not listed and encounter an issue, please let us know — we'd like to hear about it.</p>
      </>
    ),
  },
  {
    id: 'alternatives',
    num: '06',
    title: 'Alternatives and accommodations',
    body: (
      <>
        <p className="first">
          If any part of the platform is not accessible to you, we'll provide the underlying information or functionality in an alternative format — at no cost to you. This includes:
        </p>
        <ul>
          <li>Live walkthroughs of model outputs with a Block &amp; Mortar solutions engineer</li>
          <li>Plain-text or audio summaries of estimator reports</li>
          <li>Accessible PDFs, CSVs, or structured data exports on request</li>
          <li>Extended time for any timed workflow</li>
        </ul>
        <p>
          Reach out to <a href="mailto:info@blockandmortar.ai">info@blockandmortar.ai</a> and we'll respond within two business days.
        </p>
      </>
    ),
  },
  {
    id: 'feedback',
    num: '07',
    title: 'Feedback and reporting',
    body: (
      <>
        <p className="first">
          We welcome feedback about the accessibility of our platform. If you run into a barrier, or have a suggestion that would make our tools easier to use, please get in touch.
        </p>
        <p>Please include:</p>
        <ul>
          <li>The page URL or screen where the issue occurred</li>
          <li>A description of the problem and what you expected instead</li>
          <li>Your operating system, browser, and assistive technology (if any)</li>
        </ul>
        <p>We aim to acknowledge reports within two business days, and to provide a substantive response — including a fix or a workaround — within ten business days.</p>
      </>
    ),
  },
  {
    id: 'assessment',
    num: '08',
    title: 'Assessment and review',
    body: (
      <>
        <p className="first">This statement is reviewed at least twice per year, and after any significant platform change. Our most recent independent accessibility audit was completed in <strong>February 2026</strong> by a third-party firm specializing in WCAG conformance testing. The next scheduled audit is in <strong>August 2026</strong>.</p>
        <p>Audit reports are available to enterprise customers on request.</p>
      </>
    ),
  },
  {
    id: 'contact',
    num: '09',
    title: 'Contact',
    body: (
      <>
        <p className="first">For accessibility questions, accommodation requests, or audit reports:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:info@blockandmortar.ai">info@blockandmortar.ai</a></li>
          <li><strong>Phone:</strong> +1 (816) 555-0142 — weekdays, 9am–6pm CT</li>
          <li><strong>Mail:</strong> Block &amp; Mortar, Inc. · Attn: Accessibility · 1832 Main St · Kansas City, MO 64108</li>
        </ul>
      </>
    ),
  },
];

function LegalTOC({ sections, activeId }) {
  return (
    <aside className="legal-toc">
      <div className="legal-toc-label">Contents</div>
      <ol>
        {sections.map(s => (
          <li key={s.id}>
            <a
              href={'#' + s.id}
              className={activeId === s.id ? 'is-active' : ''}
              onClick={(e) => {
                const el = document.getElementById(s.id);
                if (!el) return;
                e.preventDefault();
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
                history.replaceState(null, '', '#' + s.id);
              }}
            >{s.title}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}

function AccessibilityPage() {
  const ids = A11Y_SECTIONS.map(s => s.id);
  const activeId = useActiveSection(ids);

  return (
    <>
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
              <span>Last updated · April 9, 2026</span>
              <span className="sep" />
              <span>WCAG 2.2 · Level AA</span>
            </div>
          </div>
        </section>

        <section className="legal-body">
          <div className="container">
            <LegalTOC sections={A11Y_SECTIONS} activeId={activeId} />
            <div className="legal-prose">
              <p className="lead">
                Everyone involved in shaping the built world deserves tools that work with them, not against them. This statement describes how we build for accessibility, what we've shipped, what we're still improving, and how to reach us.
              </p>

              {A11Y_SECTIONS.map(s => (
                <section key={s.id} id={s.id}>
                  <h2><span className="num">{s.num}</span>{s.title}</h2>
                  {s.body}
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

ReactDOM.createRoot(document.getElementById('root')).render(<AccessibilityPage />);
