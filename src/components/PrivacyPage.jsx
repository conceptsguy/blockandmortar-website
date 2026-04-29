import { Nav, Footer } from './Sections';
import { LegalTOC, useActiveSection } from './LegalUtils';

const PRIVACY_SECTIONS = [
  {
    id: 'information-we-collect',
    num: '01',
    title: 'Information we collect',
    body: (
      <>
        <h3>a. Information you provide</h3>
        <p>We may collect information you provide directly, including:</p>
        <ul>
          <li>Name, email address, phone number, and company information</li>
          <li>Account credentials</li>
          <li>Project data, development plans, financial models, and related inputs</li>
          <li>Communications with us (e.g., support inquiries, demo requests)</li>
        </ul>
        <h3>b. Automatically collected information</h3>
        <p>When you use our Services, we may collect:</p>
        <ul>
          <li>IP address and device information</li>
          <li>Browser type and usage data</li>
          <li>Pages visited, session duration, and interaction data</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        <h3>c. AI-generated and processed data</h3>
        <p>Our platform processes user-provided data using artificial intelligence to generate insights, models, and recommendations related to real estate development projects.</p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    num: '02',
    title: 'How we use your information',
    body: (
      <>
        <p className="first">We use your information to:</p>
        <ul>
          <li>Provide, operate, and improve our Services</li>
          <li>Generate project insights, analytics, and recommendations</li>
          <li>Facilitate collaboration between project stakeholders</li>
          <li>Communicate with you about updates, support, and relevant offerings</li>
          <li>Ensure security, prevent fraud, and enforce our terms</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-ownership',
    num: '03',
    title: 'Data ownership and use of AI',
    body: (
      <ul>
        <li>You retain ownership of all data you submit to the platform.</li>
        <li>We do not sell your data.</li>
        <li>Your data is not used to train shared or public AI models without your explicit consent.</li>
        <li>AI outputs are generated specifically for your use and are based on your inputs and system data.</li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    num: '04',
    title: 'Sharing of information',
    body: (
      <>
        <p className="first">We may share information:</p>
        <ul>
          <li>With service providers (e.g., hosting, analytics, cloud infrastructure) under strict confidentiality obligations</li>
          <li>With your authorized collaborators and team members</li>
          <li>As required by law, regulation, or legal process</li>
          <li>In connection with a business transaction (e.g., merger, acquisition)</li>
        </ul>
        <p>We do not sell personal data to third parties.</p>
      </>
    ),
  },
  {
    id: 'data-security',
    num: '05',
    title: 'Data security',
    body: (
      <>
        <p className="first">We implement commercially reasonable administrative, technical, and physical safeguards to protect your information, including:</p>
        <ul>
          <li>Encryption in transit and at rest</li>
          <li>Access controls and authentication measures</li>
          <li>Monitoring and security protocols</li>
        </ul>
        <p>However, no system can be guaranteed to be 100% secure.</p>
      </>
    ),
  },
  {
    id: 'retention',
    num: '06',
    title: 'Data retention',
    body: (
      <>
        <p className="first">We retain your information for as long as necessary to:</p>
        <ul>
          <li>Provide the Services</li>
          <li>Fulfill contractual obligations</li>
          <li>Comply with legal requirements</li>
          <li>Resolve disputes and enforce agreements</li>
        </ul>
        <p>You may request deletion of your data at any time, subject to legal or contractual obligations.</p>
      </>
    ),
  },
  {
    id: 'rights',
    num: '07',
    title: 'Your rights and choices',
    body: (
      <>
        <p className="first">Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access and review your data</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Restrict or object to processing</li>
          <li>Request data portability</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:info@blockandmortar.ai">info@blockandmortar.ai</a>.</p>
      </>
    ),
  },
  {
    id: 'cookies',
    num: '08',
    title: 'Cookies and tracking technologies',
    body: (
      <>
        <p className="first">We use cookies and similar technologies to:</p>
        <ul>
          <li>Enhance user experience</li>
          <li>Analyze usage patterns</li>
          <li>Improve platform performance</li>
        </ul>
        <p>You can control cookies through your browser settings.</p>
      </>
    ),
  },
  {
    id: 'third-party',
    num: '09',
    title: 'Third-party services',
    body: (
      <p className="first">Our platform may integrate with third-party tools (e.g., construction management systems, financial software). These services are governed by their own privacy policies, and we are not responsible for their practices.</p>
    ),
  },
  {
    id: 'international',
    num: '10',
    title: 'International data transfers',
    body: (
      <p className="first">Your information may be processed and stored in jurisdictions outside your location. We take appropriate measures to ensure data protection consistent with applicable laws.</p>
    ),
  },
  {
    id: 'children',
    num: '11',
    title: 'Children’s privacy',
    body: (
      <p className="first">Our Services are not intended for individuals under 18. We do not knowingly collect personal information from children.</p>
    ),
  },
  {
    id: 'changes',
    num: '12',
    title: 'Changes to this policy',
    body: (
      <p className="first">We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.</p>
    ),
  },
  {
    id: 'contact',
    num: '13',
    title: 'Contact us',
    body: (
      <>
        <p className="first">If you have questions about this Privacy Policy or our practices, contact us at:</p>
        <p>Block &amp; Mortar<br />
        Subject: Privacy Policy<br />
        <a href="mailto:info@blockandmortar.ai">info@blockandmortar.ai</a></p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const ids = PRIVACY_SECTIONS.map(s => s.id);
  const activeId = useActiveSection(ids);

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
              Privacy <em>Policy</em>
            </h1>
            <div className="legal-meta">
              <span>Block &amp; Mortar, Inc.</span>
              <span className="sep" />
              <span>Last updated · April 12, 2026</span>
              <span className="sep" />
              <span>Effective for all users of blockandmortar.ai</span>
            </div>
          </div>
        </section>

        <section className="legal-body">
          <div className="container">
            <LegalTOC sections={PRIVACY_SECTIONS} activeId={activeId} />
            <div className="legal-prose">
              <p className="lead">
                Block &amp; Mortar ("Company," "we," "our," or "us") respects your privacy and is committed to protecting your information. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you use our website, platform, and services (collectively, the "Services").
              </p>

              {PRIVACY_SECTIONS.map(s => (
                <section key={s.id} id={s.id}>
                  <h2><span className="num">{s.num}</span>{s.title}</h2>
                  {s.body}
                </section>
              ))}

              <div className="legal-contact">
                <div>
                  <div className="legal-contact-k">Questions about your privacy?</div>
                  <div className="legal-contact-v">info@blockandmortar.ai</div>
                </div>
                <a href="mailto:info@blockandmortar.ai?subject=Privacy%20Policy" className="btn">
                  Contact us <span className="arrow">→</span>
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
