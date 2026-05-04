import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: 'brri6o86',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

// ── PortableText helpers ─────────────────────────────────────────────────────

let _k = 0;
const k = () => `k${++_k}`;

const p = (text: string, marks: string[] = []) => ({
  _type: 'block', _key: k(), style: 'normal',
  children: [{ _type: 'span', _key: k(), text, marks }],
  markDefs: [] as any[],
});

const h3 = (text: string) => ({
  _type: 'block', _key: k(), style: 'h3',
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
  markDefs: [] as any[],
});

const li = (text: string, marks: string[] = []) => ({
  _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
  children: [{ _type: 'span', _key: k(), text, marks }],
  markDefs: [] as any[],
});

/** Block with mixed inline spans — for inline strong/em/links */
const mixed = (
  children: Array<{ text: string; marks?: string[] }>,
  markDefs: any[] = [],
) => ({
  _type: 'block', _key: k(), style: 'normal',
  children: children.map(c => ({ _type: 'span', _key: k(), text: c.text, marks: c.marks ?? [] })),
  markDefs,
});

/** Paragraph containing a single mailto link */
const mailto = (before: string, linkText: string, after = '') => {
  const lk = k();
  return {
    _type: 'block', _key: k(), style: 'normal',
    children: [
      ...(before ? [{ _type: 'span', _key: k(), text: before, marks: [] }] : []),
      { _type: 'span', _key: k(), text: linkText, marks: [lk] },
      ...(after ? [{ _type: 'span', _key: k(), text: after, marks: [] }] : []),
    ],
    markDefs: [{ _key: lk, _type: 'link', href: `mailto:${linkText}` }],
  };
};

// ── Team members ─────────────────────────────────────────────────────────────

async function uploadPhoto(filename: string) {
  const filePath = resolve(__dirname, '../public/assets', filename);
  console.log(`  Uploading ${filename}…`);
  const asset = await client.assets.upload(
    'image',
    createReadStream(filePath),
    { filename },
  );
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function seedTeam() {
  console.log('\nSeeding team members…');

  const members = [
    {
      _id: 'team-usman-wajid',
      _type: 'teamMember',
      name: 'Usman Wajid',
      role: 'CEO / Founder',
      initials: 'UW',
      tint: '#7fd8d1',
      photoFile: 'team-usman.jpg',
      bio: 'Two decades building software for owners and operators. Spent the last decade at the intersection of construction technology and the built environment.',
      order: 1,
    },
    {
      _id: 'team-jeet-das',
      _type: 'teamMember',
      name: 'Jeet Das',
      role: 'Chief Technology Officer',
      initials: 'JD',
      tint: '#e8b366',
      photoFile: 'team-jeet.jpg',
      bio: 'Platform architect. Scaled data and ML products across construction, logistics, and real estate — obsessive about the last mile of adoption.',
      order: 2,
    },
    {
      _id: 'team-dan-linhart',
      _type: 'teamMember',
      name: 'Dan Linhart',
      role: 'Board Member / Investor',
      initials: 'DL',
      tint: '#c6c9c4',
      photoFile: 'team-dan.jpg',
      bio: 'Longtime operator and investor in the built environment. Brings decades of perspective on how capital actually moves through development.',
      order: 3,
    },
    {
      _id: 'team-brad-hardin',
      _type: 'teamMember',
      name: 'Brad Hardin',
      role: 'Board Member / Investor',
      initials: 'BH',
      tint: '#a7c8f2',
      photoFile: 'team-brad.jpg',
      bio: 'Construction technology veteran; author and practitioner on integrating digital practice into project delivery at every scale.',
      order: 4,
    },
    {
      _id: 'team-george-brooks',
      _type: 'teamMember',
      name: 'George Brooks',
      role: 'Board Member / Investor',
      initials: 'GB',
      tint: '#d2a7f2',
      photoFile: 'team-george.jpg',
      bio: 'Product and design leader. Helped build software companies that put human-centered tools in the hands of professional operators.',
      order: 5,
    },
  ];

  for (const { photoFile, ...member } of members) {
    const photo = await uploadPhoto(photoFile);
    await client.createOrReplace({ ...member, photo });
    console.log(`  ✓ ${member.name}`);
  }
}

// ── Accessibility page ────────────────────────────────────────────────────────

const A11Y_SECTIONS = [
  {
    _key: 'a11y-commitment', id: { _type: 'slug', current: 'commitment' }, num: '01', title: 'Our commitment',
    body: [
      p('Block & Mortar is committed to ensuring our platform is usable by as many people as possible, including those who rely on assistive technology. We believe the built environment — and the tools that shape it — should be accessible to every stakeholder involved in creating it.'),
      p("Accessibility is not a checkbox for us. It's an ongoing practice that informs how we design, build, and ship every feature of blockandmortar.ai."),
    ],
  },
  {
    _key: 'a11y-standards', id: { _type: 'slug', current: 'standards' }, num: '02', title: 'Conformance standards',
    body: [
      mixed([
        { text: 'Our platform is designed and tested against the ' },
        { text: 'Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA', marks: ['strong'] },
        { text: ', as published by the W3C. These guidelines define how to make web content more accessible to people with a wide range of disabilities — including visual, auditory, cognitive, motor, and neurological differences.' },
      ]),
      p('We align our work with:'),
      li('WCAG 2.2 Level AA success criteria'),
      li('Section 508 of the U.S. Rehabilitation Act'),
      li('EN 301 549 (the EU accessibility standard)'),
      li('ADA Title III guidance for digital experiences'),
    ],
  },
  {
    _key: 'a11y-what-we-do', id: { _type: 'slug', current: 'what-we-do' }, num: '03', title: 'What we do to support accessibility',
    body: [
      h3('a. Design'),
      li('Minimum 4.5:1 contrast ratio for body text, 3:1 for large text and UI components'),
      li('A readable type scale with no information conveyed by color alone'),
      li('Focus indicators on every interactive element, preserved across themes'),
      mixed([
        { text: 'Motion-reduced variants of all animated content, honoring ' },
        { text: 'prefers-reduced-motion', marks: ['code'] },
      ]),
      h3('b. Engineering'),
      li('Semantic HTML as a default; ARIA only where semantics fall short'),
      li('Full keyboard navigation across modeling tools, estimators, and dashboards'),
      li('Descriptive alt text and labels for charts, plans, and model artifacts'),
      li('Screen-reader testing with NVDA, JAWS, and VoiceOver on each release'),
      h3('c. Process'),
      li('Accessibility review in every design spec and pull request'),
      li('Automated axe-core checks in CI, plus quarterly manual audits'),
      li('Issue triage that treats accessibility defects as functional bugs, not enhancements'),
    ],
  },
  {
    _key: 'a11y-limitations', id: { _type: 'slug', current: 'known-limitations' }, num: '04', title: 'Known limitations',
    body: [
      p('Despite our best efforts, some parts of our platform have known accessibility limitations. We disclose them here in the spirit of transparency, and we are actively working on each.'),
      mixed([{ text: '3D model viewer. ', marks: ['strong'] }, { text: 'The WebGL viewer for project massing currently has partial keyboard support. A fully keyboard-navigable 2D fallback is in development.' }]),
      mixed([{ text: 'Complex data tables. ', marks: ['strong'] }, { text: 'Some pro-forma and schedule tables use custom virtualization; screen-reader announcements for cell-level updates are being improved.' }]),
      mixed([{ text: 'Legacy embedded reports. ', marks: ['strong'] }, { text: 'PDFs generated before March 2026 may lack tagged structure. Re-exporting a report from the current platform produces a fully tagged file.' }]),
    ],
  },
  {
    _key: 'a11y-assistive', id: { _type: 'slug', current: 'assistive-tech' }, num: '05', title: 'Compatible assistive technology',
    body: [
      p('Our platform is designed to work with recent versions of the following screen readers, in combination with the browsers listed below.'),
      h3('Screen readers'),
      li('NVDA 2024 or later (Windows)'),
      li('JAWS 2024 or later (Windows)'),
      li('VoiceOver on macOS 13+ and iOS 16+'),
      li('TalkBack on Android 12+'),
      h3('Browsers'),
      li('Chrome, Edge, and Firefox (current and previous major versions)'),
      li('Safari 16 and later'),
      p("If you use a combination that is not listed and encounter an issue, please let us know — we'd like to hear about it."),
    ],
  },
  {
    _key: 'a11y-alternatives', id: { _type: 'slug', current: 'alternatives' }, num: '06', title: 'Alternatives and accommodations',
    body: [
      p("If any part of the platform is not accessible to you, we'll provide the underlying information or functionality in an alternative format — at no cost to you. This includes:"),
      li('Live walkthroughs of model outputs with a Block & Mortar solutions engineer'),
      li('Plain-text or audio summaries of estimator reports'),
      li('Accessible PDFs, CSVs, or structured data exports on request'),
      li('Extended time for any timed workflow'),
      mailto('Reach out to ', 'info@blockandmortar.ai', " and we'll respond within two business days."),
    ],
  },
  {
    _key: 'a11y-feedback', id: { _type: 'slug', current: 'feedback' }, num: '07', title: 'Feedback and reporting',
    body: [
      p('We welcome feedback about the accessibility of our platform. If you run into a barrier, or have a suggestion that would make our tools easier to use, please get in touch.'),
      p('Please include:'),
      li('The page URL or screen where the issue occurred'),
      li('A description of the problem and what you expected instead'),
      li('Your operating system, browser, and assistive technology (if any)'),
      p('We aim to acknowledge reports within two business days, and to provide a substantive response — including a fix or a workaround — within ten business days.'),
    ],
  },
  {
    _key: 'a11y-assessment', id: { _type: 'slug', current: 'assessment' }, num: '08', title: 'Assessment and review',
    body: [
      mixed([
        { text: 'This statement is reviewed at least twice per year, and after any significant platform change. Our most recent independent accessibility audit was completed in ' },
        { text: 'February 2026', marks: ['strong'] },
        { text: ' by a third-party firm specializing in WCAG conformance testing. The next scheduled audit is in ' },
        { text: 'August 2026', marks: ['strong'] },
        { text: '.' },
      ]),
      p('Audit reports are available to enterprise customers on request.'),
    ],
  },
  {
    _key: 'a11y-contact', id: { _type: 'slug', current: 'contact' }, num: '09', title: 'Contact',
    body: [
      p('For accessibility questions, accommodation requests, or audit reports:'),
      mixed([{ text: 'Email: ', marks: ['strong'] }, { text: 'info@blockandmortar.ai' }]),
      mixed([{ text: 'Phone: ', marks: ['strong'] }, { text: '+1 (816) 555-0142 — weekdays, 9am–6pm CT' }]),
      mixed([{ text: 'Mail: ', marks: ['strong'] }, { text: 'Block & Mortar, Inc. · Attn: Accessibility · 1832 Main St · Kansas City, MO 64108' }]),
    ],
  },
];

// ── Privacy page ─────────────────────────────────────────────────────────────

const PRIVACY_SECTIONS = [
  {
    _key: 'priv-collect', id: { _type: 'slug', current: 'information-we-collect' }, num: '01', title: 'Information we collect',
    body: [
      h3('a. Information you provide'),
      p('We may collect information you provide directly, including:'),
      li('Name, email address, phone number, and company information'),
      li('Account credentials'),
      li('Project data, development plans, financial models, and related inputs'),
      li('Communications with us (e.g., support inquiries, demo requests)'),
      h3('b. Automatically collected information'),
      p('When you use our Services, we may collect:'),
      li('IP address and device information'),
      li('Browser type and usage data'),
      li('Pages visited, session duration, and interaction data'),
      li('Cookies and similar tracking technologies'),
      h3('c. AI-generated and processed data'),
      p('Our platform processes user-provided data using artificial intelligence to generate insights, models, and recommendations related to real estate development projects.'),
    ],
  },
  {
    _key: 'priv-use', id: { _type: 'slug', current: 'how-we-use' }, num: '02', title: 'How we use your information',
    body: [
      p('We use your information to:'),
      li('Provide, operate, and improve our Services'),
      li('Generate project insights, analytics, and recommendations'),
      li('Facilitate collaboration between project stakeholders'),
      li('Communicate with you about updates, support, and relevant offerings'),
      li('Ensure security, prevent fraud, and enforce our terms'),
      li('Comply with legal obligations'),
    ],
  },
  {
    _key: 'priv-ownership', id: { _type: 'slug', current: 'data-ownership' }, num: '03', title: 'Data ownership and use of AI',
    body: [
      li('You retain ownership of all data you submit to the platform.'),
      li('We do not sell your data.'),
      li('Your data is not used to train shared or public AI models without your explicit consent.'),
      li('AI outputs are generated specifically for your use and are based on your inputs and system data.'),
    ],
  },
  {
    _key: 'priv-sharing', id: { _type: 'slug', current: 'sharing' }, num: '04', title: 'Sharing of information',
    body: [
      p('We may share information:'),
      li('With service providers (e.g., hosting, analytics, cloud infrastructure) under strict confidentiality obligations'),
      li('With your authorized collaborators and team members'),
      li('As required by law, regulation, or legal process'),
      li('In connection with a business transaction (e.g., merger, acquisition)'),
      p('We do not sell personal data to third parties.'),
    ],
  },
  {
    _key: 'priv-security', id: { _type: 'slug', current: 'data-security' }, num: '05', title: 'Data security',
    body: [
      p('We implement commercially reasonable administrative, technical, and physical safeguards to protect your information, including:'),
      li('Encryption in transit and at rest'),
      li('Access controls and authentication measures'),
      li('Monitoring and security protocols'),
      p('However, no system can be guaranteed to be 100% secure.'),
    ],
  },
  {
    _key: 'priv-retention', id: { _type: 'slug', current: 'retention' }, num: '06', title: 'Data retention',
    body: [
      p('We retain your information for as long as necessary to:'),
      li('Provide the Services'),
      li('Fulfill contractual obligations'),
      li('Comply with legal requirements'),
      li('Resolve disputes and enforce agreements'),
      p('You may request deletion of your data at any time, subject to legal or contractual obligations.'),
    ],
  },
  {
    _key: 'priv-rights', id: { _type: 'slug', current: 'rights' }, num: '07', title: 'Your rights and choices',
    body: [
      p('Depending on your jurisdiction, you may have the right to:'),
      li('Access and review your data'),
      li('Correct inaccurate information'),
      li('Request deletion of your data'),
      li('Restrict or object to processing'),
      li('Request data portability'),
      mailto('To exercise these rights, contact us at ', 'info@blockandmortar.ai', '.'),
    ],
  },
  {
    _key: 'priv-cookies', id: { _type: 'slug', current: 'cookies' }, num: '08', title: 'Cookies and tracking technologies',
    body: [
      p('We use cookies and similar technologies to:'),
      li('Enhance user experience'),
      li('Analyze usage patterns'),
      li('Improve platform performance'),
      p('You can control cookies through your browser settings.'),
    ],
  },
  {
    _key: 'priv-3p', id: { _type: 'slug', current: 'third-party' }, num: '09', title: 'Third-party services',
    body: [p('Our platform may integrate with third-party tools (e.g., construction management systems, financial software). These services are governed by their own privacy policies, and we are not responsible for their practices.')],
  },
  {
    _key: 'priv-intl', id: { _type: 'slug', current: 'international' }, num: '10', title: 'International data transfers',
    body: [p('Your information may be processed and stored in jurisdictions outside your location. We take appropriate measures to ensure data protection consistent with applicable laws.')],
  },
  {
    _key: 'priv-children', id: { _type: 'slug', current: 'children' }, num: '11', title: "Children's privacy",
    body: [p('Our Services are not intended for individuals under 18. We do not knowingly collect personal information from children.')],
  },
  {
    _key: 'priv-changes', id: { _type: 'slug', current: 'changes' }, num: '12', title: 'Changes to this policy',
    body: [p('We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.')],
  },
  {
    _key: 'priv-contact', id: { _type: 'slug', current: 'contact' }, num: '13', title: 'Contact us',
    body: [
      p('If you have questions about this Privacy Policy or our practices, contact us at:'),
      p('Block & Mortar\nSubject: Privacy Policy'),
      mailto('', 'info@blockandmortar.ai'),
    ],
  },
];

// ── Terms page ───────────────────────────────────────────────────────────────

const TERMS_SECTIONS = [
  {
    _key: 'terms-defs', id: { _type: 'slug', current: 'definitions' }, num: '01', title: 'Definitions',
    body: [
      mixed([{ text: '"Affiliate"', marks: ['strong'] }, { text: ' means any entity that directly or indirectly controls, is controlled by, or is under common control with a party.' }]),
      mixed([{ text: '"Agreement"', marks: ['strong'] }, { text: ' means these Terms of Service together with any Order Form.' }]),
      mixed([{ text: '"Authorized Users"', marks: ['strong'] }, { text: ' means employees, contractors, or agents authorized by Customer to access the Services.' }]),
      mixed([{ text: '"Customer," "you," or "your"', marks: ['strong'] }, { text: ' means the individual or entity accessing or using the Services.' }]),
      mixed([{ text: '"Order Form"', marks: ['strong'] }, { text: ' means any ordering document, online registration, or subscription agreement referencing this Agreement.' }]),
      mixed([{ text: '"Services"', marks: ['strong'] }, { text: ' means the software-as-a-service platform made available by Block and Mortar, Inc. via blockandmortar.ai.' }]),
      mixed([{ text: '"Customer Data"', marks: ['strong'] }, { text: ' means all data, content, and materials submitted to the Services by or on behalf of Customer.' }]),
    ],
  },
  {
    _key: 'terms-scope', id: { _type: 'slug', current: 'scope' }, num: '02', title: 'Scope and structure of agreement',
    body: [p("This Agreement governs Customer's access to and use of the Services. In the event of a conflict between these Terms and an Order Form, the Order Form shall control solely with respect to the applicable Services.")],
  },
  {
    _key: 'terms-access', id: { _type: 'slug', current: 'access' }, num: '03', title: 'Access and use rights',
    body: [
      h3('3.1 License grant'),
      p("Subject to the terms of this Agreement, Company grants Customer a limited, non-exclusive, non-transferable, non-sublicensable right during the Term to access and use the Services solely for Customer's internal business purposes."),
      h3('3.2 Authorized users'),
      p('Customer is responsible for all acts and omissions of its Authorized Users and shall ensure compliance with this Agreement.'),
      h3('3.3 Restrictions'),
      p('Customer shall not, and shall not permit any third party to:'),
      li('Reverse engineer, decompile, or otherwise attempt to derive source code'),
      li('Modify, copy, or create derivative works of the Services'),
      li('Resell, lease, sublicense, or provide access to the Services to third parties'),
      li('Use the Services to build a competing product or service'),
      li('Interfere with or disrupt the integrity or performance of the Services'),
    ],
  },
  {
    _key: 'terms-data', id: { _type: 'slug', current: 'customer-data' }, num: '04', title: 'Customer data',
    body: [
      h3('4.1 Ownership'),
      p('As between the parties, Customer retains all right, title, and interest in and to Customer Data.'),
      h3('4.2 License to Company'),
      p('Customer grants Company a non-exclusive, worldwide, royalty-free license to use, process, store, and transmit Customer Data solely to:'),
      li('Provide and maintain the Services'),
      li('Improve and enhance the Services (in anonymized or aggregated form)'),
      h3('4.3 Responsibility'),
      p('Customer is solely responsible for the accuracy, legality, and appropriateness of Customer Data.'),
    ],
  },
  {
    _key: 'terms-ai', id: { _type: 'slug', current: 'ai' }, num: '05', title: 'AI functionality disclaimer',
    body: [
      p('The Services may include AI-generated outputs, insights, or recommendations.'),
      p('Customer acknowledges and agrees that:'),
      li('Outputs are probabilistic and may be incomplete or inaccurate'),
      li('Outputs do not constitute professional advice (including legal, financial, engineering, or investment advice)'),
      li('Customer is solely responsible for verifying outputs prior to reliance'),
      p('Company disclaims all liability arising from Customer\'s use of AI-generated outputs.'),
    ],
  },
  {
    _key: 'terms-fees', id: { _type: 'slug', current: 'fees' }, num: '06', title: 'Fees and payment',
    body: [
      h3('6.1 Fees'),
      p('Customer shall pay all fees specified in the applicable Order Form.'),
      h3('6.2 Billing and payment'),
      li('Fees are invoiced in advance and are non-cancelable and non-refundable except as required by law'),
      li('Payment terms are net 30 days unless otherwise specified'),
      h3('6.3 Suspension'),
      p('Company may suspend access to the Services upon written notice for overdue payments.'),
    ],
  },
  {
    _key: 'terms-conf', id: { _type: 'slug', current: 'confidentiality' }, num: '07', title: 'Confidentiality',
    body: [
      h3('7.1 Definition'),
      p('"Confidential Information" means non-public information disclosed by one party to the other that is designated as confidential or reasonably should be understood as confidential.'),
      h3('7.2 Obligations'),
      p('The receiving party shall:'),
      li('Use Confidential Information solely to perform under this Agreement'),
      li('Not disclose Confidential Information except to personnel with a need to know'),
      li('Protect Confidential Information using reasonable care'),
      h3('7.3 Exclusions'),
      p('Confidential Information excludes information that:'),
      li('Is publicly available without breach'),
      li('Was known prior to disclosure'),
      li('Is independently developed'),
    ],
  },
  {
    _key: 'terms-ip', id: { _type: 'slug', current: 'ip' }, num: '08', title: 'Intellectual property',
    body: [
      p('Company retains all right, title, and interest in and to:'),
      li('The Services'),
      li('All underlying software, models, algorithms, and documentation'),
      p('No rights are granted except as expressly set forth in this Agreement.'),
    ],
  },
  {
    _key: 'terms-3p', id: { _type: 'slug', current: 'third-party' }, num: '09', title: 'Third-party services',
    body: [
      p('The Services may integrate with third-party systems or data sources. Company is not responsible for:'),
      li('Third-party availability or performance'),
      li('Third-party data accuracy or security'),
    ],
  },
  {
    _key: 'terms-warranties', id: { _type: 'slug', current: 'warranties' }, num: '10', title: 'Warranties and disclaimers',
    body: [
      h3('10.1 Mutual warranty'),
      p('Each party represents that it has the authority to enter into this Agreement.'),
      h3('10.2 Disclaimer'),
      p('TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."'),
      p('Company disclaims all warranties, whether express, implied, statutory, or otherwise, including:'),
      li('Merchantability'),
      li('Fitness for a particular purpose'),
      li('Non-infringement'),
      p('Company does not warrant that the Services will be uninterrupted, error-free, or secure.'),
    ],
  },
  {
    _key: 'terms-indem', id: { _type: 'slug', current: 'indemnification' }, num: '11', title: 'Indemnification',
    body: [
      h3('11.1 By Customer'),
      p('Customer shall indemnify, defend, and hold harmless Company from and against any claims arising out of:'),
      li('Customer Data'),
      li("Customer's use of the Services in violation of this Agreement"),
      h3('11.2 By Company'),
      p('Company shall defend Customer against claims that the Services infringe third-party intellectual property rights, and shall indemnify Customer for damages awarded, provided that Customer:'),
      li('Promptly notifies Company'),
      li('Provides reasonable cooperation'),
      li('Allows Company sole control of defense and settlement'),
      p('Company may, at its option:'),
      li('Modify the Services'),
      li('Replace the Services'),
      li('Terminate access and refund prepaid unused fees'),
    ],
  },
  {
    _key: 'terms-liability', id: { _type: 'slug', current: 'liability' }, num: '12', title: 'Limitation of liability',
    body: [
      h3('12.1 Exclusion of damages'),
      p('Neither party shall be liable for:'),
      li('Indirect, incidental, special, consequential, or punitive damages'),
      li('Loss of profits, revenue, data, or business opportunity'),
      h3('12.2 Cap on liability'),
      p('Company\'s total liability shall not exceed the fees paid by Customer in the twelve (12) months preceding the claim.'),
    ],
  },
  {
    _key: 'terms-term', id: { _type: 'slug', current: 'term' }, num: '13', title: 'Term and termination',
    body: [
      h3('13.1 Term'),
      p('This Agreement begins upon acceptance and continues for the duration of any active subscription.'),
      h3('13.2 Termination for cause'),
      p('Either party may terminate for material breach if not cured within 30 days of notice.'),
      h3('13.3 Effect of termination'),
      p('Upon termination:'),
      li("Customer's access rights terminate immediately"),
      li('Customer Data may be deleted in accordance with Company policies'),
    ],
  },
  {
    _key: 'terms-governing', id: { _type: 'slug', current: 'governing' }, num: '14', title: 'Governing law and dispute resolution',
    body: [
      p('This Agreement is governed by the laws of the State of Delaware, without regard to conflict of laws principles.'),
      p('Any dispute shall be resolved by binding arbitration in Delaware under the rules of the American Arbitration Association.'),
      p('Each party waives the right to a jury trial and to participate in class actions.'),
    ],
  },
  {
    _key: 'terms-general', id: { _type: 'slug', current: 'general' }, num: '15', title: 'General provisions',
    body: [
      h3('15.1 Assignment'),
      p('Customer may not assign this Agreement without prior written consent, except in connection with a merger or sale of substantially all assets.'),
      h3('15.2 Force majeure'),
      p('Neither party shall be liable for failure to perform due to events beyond reasonable control.'),
      h3('15.3 Entire agreement'),
      p('This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements.'),
      h3('15.4 Amendments'),
      p('Company may update these Terms from time to time. Continued use constitutes acceptance.'),
    ],
  },
  {
    _key: 'terms-contact', id: { _type: 'slug', current: 'contact' }, num: '16', title: 'Contact',
    body: [
      p('Block & Mortar, Inc.'),
      mailto('Email: ', 'info@blockandmortar.ai'),
    ],
  },
];

// ── Legal pages ───────────────────────────────────────────────────────────────

async function seedLegal() {
  console.log('\nSeeding legal pages…');

  const pages = [
    {
      _id: 'legal-accessibility',
      _type: 'legalPage',
      pageKey: 'accessibility',
      lastUpdated: '2026-04-09',
      subtitle: 'WCAG 2.2 · Level AA',
      leadParagraph: null,
      sections: A11Y_SECTIONS,
    },
    {
      _id: 'legal-privacy',
      _type: 'legalPage',
      pageKey: 'privacy',
      lastUpdated: '2026-04-12',
      subtitle: 'Effective for all users of blockandmortar.ai',
      leadParagraph:
        'Block & Mortar ("Company," "we," "our," or "us") respects your privacy and is committed to protecting your information. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you use our website, platform, and services (collectively, the "Services").',
      sections: PRIVACY_SECTIONS,
    },
    {
      _id: 'legal-terms',
      _type: 'legalPage',
      pageKey: 'terms',
      lastUpdated: '2026-04-09',
      subtitle: 'Effective for all users of blockandmortar.ai',
      leadParagraph:
        "These Terms of Service govern your access to and use of Block & Mortar's platform and services. Please read them carefully — by using the Services, you agree to be bound by these terms.",
      sections: TERMS_SECTIONS,
    },
  ];

  for (const page of pages) {
    await client.createOrReplace(page);
    console.log(`  ✓ ${page.pageKey}`);
  }
}

// ── Homepage + testimonials (unchanged) ──────────────────────────────────────

async function seedHome() {
  console.log('\nSeeding homePage…');
  await client.createOrReplace({
    _id: 'singleton-homePage',
    _type: 'homePage',
    heroHeading: 'Clarity and confidence across the real estate development lifecycle.',
    heroSubheading: 'AI-powered cost intelligence on a single collaborative platform.',
    promptHeading: 'A sentence becomes',
    promptHeadingEm: 'a defensible pro forma.',
    promptDescription: 'Describe the project. Block & Mortar returns a buildable massing, schedule, and cost breakdown; updated live as every stakeholder weighs in.',
    stepsHeading: 'One platform for',
    stepsHeadingEm: 'every stage of the development lifecycle.',
    stepsDescription: "A developer's time gets spent analyzing, planning, coordinating, and reconciling. Block & Mortar compresses each of those into a live, connected model.",
    steps: [
      { _key: 'step-01', number: '01', title: 'Project Analysis', body: 'Evaluate the site, pro forma, and schedule. What took months of desk research happens in hours, with stakeholders aligned from day one.' },
      { _key: 'step-02', number: '02', title: 'Planning', body: 'Navigate rezoning, jurisdictions and code. Block & Mortar consolidates regulatory data and coordinates approvals so viability is confirmed, not guessed.' },
      { _key: 'step-03', number: '03', title: 'Design + Construction', body: 'Plug into the tools GCs already use. Plans, RFIs, and cost deltas stay coordinated. Execution moves from design through delivery with speed and precision.' },
      { _key: 'step-04', number: '04', title: 'Finance + Operations', body: 'Benchmark actuals against pro forma in real time. Each completed project sharpens the model for the next. A compounding feedback loop.' },
    ],
    bentoHeading: 'Blocks that stack into',
    bentoHeadingEm: 'a defensible estimate.',
    bentoDescription: 'Each capability is a discrete building block. Composed, swapped, and re-estimated as projects evolve. No black box.',
    collabHeading: 'Every stakeholder,',
    collabHeadingEm: 'in the same model, at the same moment.',
    collabDescription: 'Owners, GCs, designers, and lenders comment on the same source of truth. Estimates update as the model changes; not three weeks after.',
    collabFeatures: [
      { _key: 'feature-deltas', title: 'Live cost deltas', description: 'every change propagates to pro forma in seconds.' },
      { _key: 'feature-comments', title: 'Real-time Comments', description: 'drop notes directly on a bids, proformas, or projects.' },
      { _key: 'feature-views', title: 'Role-aware views', description: 'lenders see risk, GCs see schedule, owners see returns.' },
    ],
    verticalsHeading: 'Built for the projects',
    verticalsHeadingEm: 'you actually build.',
    verticalsDescription: 'Tuned cost libraries, code sets, and schedule templates per vertical — so the first estimate is already in the right ballpark.',
    verticals: [
      { _key: 'vert-apartments', key: 'apartments', title: 'Multifamily',      meta: '24 stories · 312 units · Kansas City'    },
      { _key: 'vert-datacenter', key: 'datacenter',  title: 'Data Centers',     meta: '48 MW · hyperscale · Phoenix'             },
      { _key: 'vert-franchise',  key: 'franchise',   title: 'Franchise Builds', meta: '62 locations · retail · rolled in 14 mo' },
      { _key: 'vert-office',     key: 'office',      title: 'Office',           meta: '410,000 sqft · Class A · Austin'          },
      { _key: 'vert-retail',     key: 'retail',      title: 'Retail',           meta: 'Anchor + inline · 22-site portfolio'      },
    ],
    ctaHeading: 'Model your next project',
    ctaHeadingEm: 'in minutes.',
    ctaDescription: "Bring your toughest deal. We'll show you a live estimate, a defensible schedule, and the path from prompt to pro forma in one working session.",
  });
  console.log('  ✓ homePage');

  console.log('\nSeeding testimonials…');
  const testimonials = [
    { _id: 'testimonial-kevin-goebel', _type: 'testimonial', order: 1, personName: 'Kevin Goebel', personTitle: 'CEO, Goebel Mitts Construction', quote: 'Block and Mortar allows us to collaborate with developers earlier around cost, schedule, and constructability — leading to better projects and fewer surprises during construction.' },
    { _id: 'testimonial-brian-heast', _type: 'testimonial', order: 2, personName: 'Brian Heast', personTitle: 'Managing Director, Aon', quote: 'Block and Mortar gives us earlier visibility into how projects are structured during pre-construction, allowing us to identify risks sooner and align coverage strategies with real project conditions.' },
    { _id: 'testimonial-tony-leopold', _type: 'testimonial', order: 3, personName: 'Tony Leopold', personTitle: 'SVP, Chief Technology & Strategy Officer, United Rentals', quote: 'With earlier access to project scope and timelines, we can plan equipment strategy more effectively and support contractors with greater efficiency from day one.' },
    { _id: 'testimonial-mike-mckeen', _type: 'testimonial', order: 4, personName: 'Mike McKeen', personTitle: 'President & CEO, EPC Real Estate', quote: 'Block and Mortar creates a collaborative framework to model cost, schedule, and design together giving us greater confidence in the decisions we make moving projects forward.' },
  ];
  for (const t of testimonials) {
    await client.createOrReplace(t);
    console.log(`  ✓ ${t.personName}`);
  }
}

// ── Run ───────────────────────────────────────────────────────────────────────

async function seed() {
  await seedHome();
  await seedTeam();
  await seedLegal();
  console.log('\n✅ All content seeded. Open the Studio to review and publish drafts.');
}

seed().catch(err => { console.error(err); process.exit(1); });
