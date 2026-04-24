/* global React, ReactDOM, Nav, Footer */
// Terms & Conditions page — light background, mirrors real Block & Mortar terms content.

const TERMS_SECTIONS = [
  {
    id: 'definitions',
    num: '01',
    title: 'Definitions',
    body: (
      <>
        <p className="first"><strong>"Affiliate"</strong> means any entity that directly or indirectly controls, is controlled by, or is under common control with a party.</p>
        <p><strong>"Agreement"</strong> means these Terms of Service together with any Order Form.</p>
        <p><strong>"Authorized Users"</strong> means employees, contractors, or agents authorized by Customer to access the Services.</p>
        <p><strong>"Customer," "you," or "your"</strong> means the individual or entity accessing or using the Services.</p>
        <p><strong>"Order Form"</strong> means any ordering document, online registration, or subscription agreement referencing this Agreement.</p>
        <p><strong>"Services"</strong> means the software-as-a-service platform made available by Block and Mortar, Inc. via blockandmortar.ai.</p>
        <p><strong>"Customer Data"</strong> means all data, content, and materials submitted to the Services by or on behalf of Customer.</p>
      </>
    )
  },
  {
    id: 'scope',
    num: '02',
    title: 'Scope and structure of agreement',
    body: (
      <p className="first">This Agreement governs Customer's access to and use of the Services. In the event of a conflict between these Terms and an Order Form, the Order Form shall control solely with respect to the applicable Services.</p>
    )
  },
  {
    id: 'access',
    num: '03',
    title: 'Access and use rights',
    body: (
      <>
        <h3>3.1 License grant</h3>
        <p>Subject to the terms of this Agreement, Company grants Customer a limited, non-exclusive, non-transferable, non-sublicensable right during the Term to access and use the Services solely for Customer's internal business purposes.</p>
        <h3>3.2 Authorized users</h3>
        <p>Customer is responsible for all acts and omissions of its Authorized Users and shall ensure compliance with this Agreement.</p>
        <h3>3.3 Restrictions</h3>
        <p>Customer shall not, and shall not permit any third party to:</p>
        <ul>
          <li>Reverse engineer, decompile, or otherwise attempt to derive source code</li>
          <li>Modify, copy, or create derivative works of the Services</li>
          <li>Resell, lease, sublicense, or provide access to the Services to third parties</li>
          <li>Use the Services to build a competing product or service</li>
          <li>Interfere with or disrupt the integrity or performance of the Services</li>
        </ul>
      </>
    )
  },
  {
    id: 'customer-data',
    num: '04',
    title: 'Customer data',
    body: (
      <>
        <h3>4.1 Ownership</h3>
        <p>As between the parties, Customer retains all right, title, and interest in and to Customer Data.</p>
        <h3>4.2 License to Company</h3>
        <p>Customer grants Company a non-exclusive, worldwide, royalty-free license to use, process, store, and transmit Customer Data solely to:</p>
        <ul>
          <li>Provide and maintain the Services</li>
          <li>Improve and enhance the Services (in anonymized or aggregated form)</li>
        </ul>
        <h3>4.3 Responsibility</h3>
        <p>Customer is solely responsible for the accuracy, legality, and appropriateness of Customer Data.</p>
      </>
    )
  },
  {
    id: 'ai',
    num: '05',
    title: 'AI functionality disclaimer',
    body: (
      <>
        <p className="first">The Services may include AI-generated outputs, insights, or recommendations.</p>
        <p>Customer acknowledges and agrees that:</p>
        <ul>
          <li>Outputs are probabilistic and may be incomplete or inaccurate</li>
          <li>Outputs do not constitute professional advice (including legal, financial, engineering, or investment advice)</li>
          <li>Customer is solely responsible for verifying outputs prior to reliance</li>
        </ul>
        <p>Company disclaims all liability arising from Customer's use of AI-generated outputs.</p>
      </>
    )
  },
  {
    id: 'fees',
    num: '06',
    title: 'Fees and payment',
    body: (
      <>
        <h3>6.1 Fees</h3>
        <p>Customer shall pay all fees specified in the applicable Order Form.</p>
        <h3>6.2 Billing and payment</h3>
        <ul>
          <li>Fees are invoiced in advance and are non-cancelable and non-refundable except as required by law</li>
          <li>Payment terms are net 30 days unless otherwise specified</li>
        </ul>
        <h3>6.3 Suspension</h3>
        <p>Company may suspend access to the Services upon written notice for overdue payments.</p>
      </>
    )
  },
  {
    id: 'confidentiality',
    num: '07',
    title: 'Confidentiality',
    body: (
      <>
        <h3>7.1 Definition</h3>
        <p>"Confidential Information" means non-public information disclosed by one party to the other that is designated as confidential or reasonably should be understood as confidential.</p>
        <h3>7.2 Obligations</h3>
        <p>The receiving party shall:</p>
        <ul>
          <li>Use Confidential Information solely to perform under this Agreement</li>
          <li>Not disclose Confidential Information except to personnel with a need to know</li>
          <li>Protect Confidential Information using reasonable care</li>
        </ul>
        <h3>7.3 Exclusions</h3>
        <p>Confidential Information excludes information that:</p>
        <ul>
          <li>Is publicly available without breach</li>
          <li>Was known prior to disclosure</li>
          <li>Is independently developed</li>
        </ul>
      </>
    )
  },
  {
    id: 'ip',
    num: '08',
    title: 'Intellectual property',
    body: (
      <>
        <p className="first">Company retains all right, title, and interest in and to:</p>
        <ul>
          <li>The Services</li>
          <li>All underlying software, models, algorithms, and documentation</li>
        </ul>
        <p>No rights are granted except as expressly set forth in this Agreement.</p>
      </>
    )
  },
  {
    id: 'third-party',
    num: '09',
    title: 'Third-party services',
    body: (
      <>
        <p className="first">The Services may integrate with third-party systems or data sources. Company is not responsible for:</p>
        <ul>
          <li>Third-party availability or performance</li>
          <li>Third-party data accuracy or security</li>
        </ul>
      </>
    )
  },
  {
    id: 'warranties',
    num: '10',
    title: 'Warranties and disclaimers',
    body: (
      <>
        <h3>10.1 Mutual warranty</h3>
        <p>Each party represents that it has the authority to enter into this Agreement.</p>
        <h3>10.2 Disclaimer</h3>
        <p className="caps">To the maximum extent permitted by law, the services are provided "as is" and "as available."</p>
        <p>Company disclaims all warranties, whether express, implied, statutory, or otherwise, including:</p>
        <ul>
          <li>Merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Non-infringement</li>
        </ul>
        <p>Company does not warrant that the Services will be uninterrupted, error-free, or secure.</p>
      </>
    )
  },
  {
    id: 'indemnification',
    num: '11',
    title: 'Indemnification',
    body: (
      <>
        <h3>11.1 By Customer</h3>
        <p>Customer shall indemnify, defend, and hold harmless Company from and against any claims arising out of:</p>
        <ul>
          <li>Customer Data</li>
          <li>Customer's use of the Services in violation of this Agreement</li>
        </ul>
        <h3>11.2 By Company</h3>
        <p>Company shall defend Customer against claims that the Services infringe third-party intellectual property rights, and shall indemnify Customer for damages awarded, provided that Customer:</p>
        <ul>
          <li>Promptly notifies Company</li>
          <li>Provides reasonable cooperation</li>
          <li>Allows Company sole control of defense and settlement</li>
        </ul>
        <p>Company may, at its option:</p>
        <ul>
          <li>Modify the Services</li>
          <li>Replace the Services</li>
          <li>Terminate access and refund prepaid unused fees</li>
        </ul>
      </>
    )
  },
  {
    id: 'liability',
    num: '12',
    title: 'Limitation of liability',
    body: (
      <>
        <p className="first caps">To the maximum extent permitted by law:</p>
        <h3>12.1 Exclusion of damages</h3>
        <p>Neither party shall be liable for:</p>
        <ul>
          <li>Indirect, incidental, special, consequential, or punitive damages</li>
          <li>Loss of profits, revenue, data, or business opportunity</li>
        </ul>
        <h3>12.2 Cap on liability</h3>
        <p>Company's total liability shall not exceed the fees paid by Customer in the twelve (12) months preceding the claim.</p>
      </>
    )
  },
  {
    id: 'term',
    num: '13',
    title: 'Term and termination',
    body: (
      <>
        <h3>13.1 Term</h3>
        <p>This Agreement begins upon acceptance and continues for the duration of any active subscription.</p>
        <h3>13.2 Termination for cause</h3>
        <p>Either party may terminate for material breach if not cured within 30 days of notice.</p>
        <h3>13.3 Effect of termination</h3>
        <p>Upon termination:</p>
        <ul>
          <li>Customer's access rights terminate immediately</li>
          <li>Customer Data may be deleted in accordance with Company policies</li>
        </ul>
      </>
    )
  },
  {
    id: 'governing',
    num: '14',
    title: 'Governing law and dispute resolution',
    body: (
      <>
        <p className="first">This Agreement is governed by the laws of the State of Delaware, without regard to conflict of laws principles.</p>
        <p>Any dispute shall be resolved by binding arbitration in Delaware under the rules of the American Arbitration Association.</p>
        <p>Each party waives the right to a jury trial and to participate in class actions.</p>
      </>
    )
  },
  {
    id: 'general',
    num: '15',
    title: 'General provisions',
    body: (
      <>
        <h3>15.1 Assignment</h3>
        <p>Customer may not assign this Agreement without prior written consent, except in connection with a merger or sale of substantially all assets.</p>
        <h3>15.2 Force majeure</h3>
        <p>Neither party shall be liable for failure to perform due to events beyond reasonable control.</p>
        <h3>15.3 Entire agreement</h3>
        <p>This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements.</p>
        <h3>15.4 Amendments</h3>
        <p>Company may update these Terms from time to time. Continued use constitutes acceptance.</p>
      </>
    )
  },
  {
    id: 'contact',
    num: '16',
    title: 'Contact',
    body: (
      <>
        <p className="first">Block & Mortar, Inc.</p>
        <p>Email: <a href="mailto:info@blockandmortar.ai">info@blockandmortar.ai</a><br />
        Website: <a href="https://www.blockandmortar.ai">https://www.blockandmortar.ai</a></p>
      </>
    )
  }
];


function LegalTOC({ sections, activeId }) {
  return (
    <aside className="legal-toc">
      <div className="legal-toc-label">Contents</div>
      <ol>
        {sections.map(s => (
          <li key={s.id}>
            <a href={'#' + s.id} className={activeId === s.id ? 'is-active' : ''}>
              {s.title}
            </a>
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
      const top = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= top) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join('|')]);
  return active;
}

function TermsPage() {
  const ids = TERMS_SECTIONS.map(s => s.id);
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
              Terms <em>&</em> Conditions
            </h1>
            <div className="legal-meta">
              <span>Block &amp; Mortar, Inc.</span>
              <span className="sep" />
              <span>Last updated · April 9, 2026</span>
              <span className="sep" />
              <span>Effective for all users of blockandmortar.ai</span>
            </div>
          </div>
        </section>

        <section className="legal-body">
          <div className="container">
            <LegalTOC sections={TERMS_SECTIONS} activeId={activeId} />
            <div className="legal-prose">
              <p className="lead">
                These Terms of Service govern your access to and use of Block &amp; Mortar's platform and services. Please read them carefully — by using the Services, you agree to be bound by these terms.
              </p>

              {TERMS_SECTIONS.map(s => (
                <section key={s.id} id={s.id}>
                  <h2><span className="num">{s.num}</span>{s.title}</h2>
                  {s.body}
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

ReactDOM.createRoot(document.getElementById('root')).render(<TermsPage />);
