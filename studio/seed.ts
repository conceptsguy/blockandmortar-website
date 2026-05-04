import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'brri6o86',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log('Seeding homePage...');

  await client.createOrReplace({
    _id: 'singleton-homePage',
    _type: 'homePage',

    // Hero
    heroHeading: 'Clarity and confidence across the real estate development lifecycle.',
    heroSubheading: 'AI-powered cost intelligence on a single collaborative platform.',

    // Prompt section
    promptHeading: 'A sentence becomes',
    promptHeadingEm: 'a defensible pro forma.',
    promptDescription:
      'Describe the project. Block & Mortar returns a buildable massing, schedule, and cost breakdown; updated live as every stakeholder weighs in.',

    // Steps section
    stepsHeading: 'One platform for',
    stepsHeadingEm: 'every stage of the development lifecycle.',
    stepsDescription:
      "A developer's time gets spent analyzing, planning, coordinating, and reconciling. Block & Mortar compresses each of those into a live, connected model.",
    steps: [
      {
        _key: 'step-01',
        number: '01',
        title: 'Project Analysis',
        body: 'Evaluate the site, pro forma, and schedule. What took months of desk research happens in hours, with stakeholders aligned from day one.',
      },
      {
        _key: 'step-02',
        number: '02',
        title: 'Planning',
        body: 'Navigate rezoning, jurisdictions and code. Block & Mortar consolidates regulatory data and coordinates approvals so viability is confirmed, not guessed.',
      },
      {
        _key: 'step-03',
        number: '03',
        title: 'Design + Construction',
        body: 'Plug into the tools GCs already use. Plans, RFIs, and cost deltas stay coordinated. Execution moves from design through delivery with speed and precision.',
      },
      {
        _key: 'step-04',
        number: '04',
        title: 'Finance + Operations',
        body: 'Benchmark actuals against pro forma in real time. Each completed project sharpens the model for the next. A compounding feedback loop.',
      },
    ],

    // Platform / Bento section
    bentoHeading: 'Blocks that stack into',
    bentoHeadingEm: 'a defensible estimate.',
    bentoDescription:
      'Each capability is a discrete building block. Composed, swapped, and re-estimated as projects evolve. No black box.',

    // Collab section
    collabHeading: 'Every stakeholder,',
    collabHeadingEm: 'in the same model, at the same moment.',
    collabDescription:
      'Owners, GCs, designers, and lenders comment on the same source of truth. Estimates update as the model changes; not three weeks after.',
    collabFeatures: [
      {
        _key: 'feature-deltas',
        title: 'Live cost deltas',
        description: 'every change propagates to pro forma in seconds.',
      },
      {
        _key: 'feature-comments',
        title: 'Real-time Comments',
        description: 'drop notes directly on a bids, proformas, or projects.',
      },
      {
        _key: 'feature-views',
        title: 'Role-aware views',
        description: 'lenders see risk, GCs see schedule, owners see returns.',
      },
    ],

    // Verticals section
    verticalsHeading: 'Built for the projects',
    verticalsHeadingEm: 'you actually build.',
    verticalsDescription:
      'Tuned cost libraries, code sets, and schedule templates per vertical — so the first estimate is already in the right ballpark.',
    verticals: [
      { _key: 'vert-apartments', key: 'apartments', title: 'Multifamily',      meta: '24 stories · 312 units · Kansas City'    },
      { _key: 'vert-datacenter', key: 'datacenter',  title: 'Data Centers',     meta: '48 MW · hyperscale · Phoenix'             },
      { _key: 'vert-franchise',  key: 'franchise',   title: 'Franchise Builds', meta: '62 locations · retail · rolled in 14 mo' },
      { _key: 'vert-office',     key: 'office',      title: 'Office',           meta: '410,000 sqft · Class A · Austin'          },
      { _key: 'vert-retail',     key: 'retail',      title: 'Retail',           meta: 'Anchor + inline · 22-site portfolio'      },
    ],

    // CTA section
    ctaHeading: 'Model your next project',
    ctaHeadingEm: 'in minutes.',
    ctaDescription:
      "Bring your toughest deal. We'll show you a live estimate, a defensible schedule, and the path from prompt to pro forma in one working session.",
  });

  console.log('✓ homePage seeded');

  console.log('Seeding testimonials...');

  const testimonials = [
    {
      _id: 'testimonial-kevin-goebel',
      _type: 'testimonial',
      order: 1,
      personName: 'Kevin Goebel',
      personTitle: 'CEO, Goebel Mitts Construction',
      quote:
        'Block and Mortar allows us to collaborate with developers earlier around cost, schedule, and constructability — leading to better projects and fewer surprises during construction.',
    },
    {
      _id: 'testimonial-brian-heast',
      _type: 'testimonial',
      order: 2,
      personName: 'Brian Heast',
      personTitle: 'Managing Director, Aon',
      quote:
        'Block and Mortar gives us earlier visibility into how projects are structured during pre-construction, allowing us to identify risks sooner and align coverage strategies with real project conditions.',
    },
    {
      _id: 'testimonial-tony-leopold',
      _type: 'testimonial',
      order: 3,
      personName: 'Tony Leopold',
      personTitle: 'SVP, Chief Technology & Strategy Officer, United Rentals',
      quote:
        'With earlier access to project scope and timelines, we can plan equipment strategy more effectively and support contractors with greater efficiency from day one.',
    },
    {
      _id: 'testimonial-mike-mckeen',
      _type: 'testimonial',
      order: 4,
      personName: 'Mike McKeen',
      personTitle: 'President & CEO, EPC Real Estate',
      quote:
        'Block and Mortar creates a collaborative framework to model cost, schedule, and design together giving us greater confidence in the decisions we make moving projects forward.',
    },
  ];

  for (const t of testimonials) {
    await client.createOrReplace(t);
    console.log(`✓ testimonial: ${t.personName}`);
  }

  console.log('\nAll done! Open the Studio to review and publish the draft.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
