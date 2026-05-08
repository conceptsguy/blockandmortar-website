import { useState, useEffect } from 'react';
import PromptEstimate from './PromptEstimate';
import { openDemoModal } from './DemoModal';

// ---------------------------------------------------------------------------
// Bento sub-animations
// ---------------------------------------------------------------------------

function FileStackAnim() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 8000);
    return () => clearInterval(id);
  }, []);
  const files = [
    { label: 'Riverbend.bm',     val: '$94.7M' },
    { label: 'Mesa-DH-48.bm',    val: '$412M' },
    { label: 'Howell-4th.bm',    val: '$612K' },
    { label: 'Vista-Hotel.bm',   val: '$58.2M' },
  ];
  return (
    <div className="filestack" key={tick}>
      <div className="fs-group">
        <div className="fs-frame">
          <span className="fs-frame-corner tl" />
          <span className="fs-frame-corner tr" />
          <span className="fs-frame-corner bl" />
          <span className="fs-frame-corner br" />
          <span className="fs-frame-label">BENCHMARK SET · 4</span>
        </div>
        {files.map((f, i) => (
          <div className={'fs-card fs-card-' + i} key={f.label}>
            <div className="fs-icon">▢</div>
            <div className="fs-meta">
              <div className="fs-name">{f.label}</div>
              <div className="fs-val">{f.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GisMapAnim() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 6400);
    return () => clearInterval(id);
  }, []);

  const z = 14;
  const baseX = 3888;
  const baseY = 6267;
  const cols = 4, rows = 2;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = baseX + c;
      const y = baseY + r;
      tiles.push({
        x, y,
        url: `https://a.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png`,
        col: c, row: r,
      });
    }
  }

  return (
    <div className="gis-map mono" key={tick} aria-hidden="true">
      <div className="gis-tiles" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {tiles.map(t => (
          <img key={t.x + '-' + t.y} src={t.url} alt="" loading="lazy" className="gis-tile" />
        ))}
      </div>
      <div className="gis-tint" aria-hidden="true" />

      <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" className="gis-svg">
        <defs>
          <radialGradient id="gisPinGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#1a1410" stopOpacity="0.35"/>
            <stop offset="1" stopColor="#1a1410" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="gisVignette" cx="55%" cy="48%" r="65%">
            <stop offset="0" stopColor="#f1ebdf" stopOpacity="0"/>
            <stop offset="1" stopColor="#e4dcc8" stopOpacity="0.55"/>
          </radialGradient>
        </defs>

        <g className="gis-parcel">
          <rect x="280" y="35" width="110" height="50"
                fill="rgba(26,20,16,0.04)"
                stroke="#1a1410" strokeWidth="1" strokeDasharray="3 2" opacity="0.7"/>
        </g>

        <g className="gis-pin" transform="translate(335 60)">
          <circle r="22" fill="url(#gisPinGlow)"/>
          <circle className="gis-pin-pulse" r="10" fill="none" stroke="#1a1410" strokeWidth="1"/>
          <circle r="9" fill="none" stroke="#1a1410" strokeWidth="1" opacity="0.45"/>
          <path d="M0 -14 C -7 -14 -10 -8 -10 -3 C -10 4 0 10 0 10 C 0 10 10 4 10 -3 C 10 -8 7 -14 0 -14 Z"
                fill="#1a1410"/>
          <circle cx="0" cy="-4" r="2.5" fill="#f1ebdf"/>
        </g>

        <g className="gis-labels" fontFamily="ui-monospace, JetBrains Mono, monospace" fontSize="8" fill="#1a1410" opacity="0.78">
          <text x="8" y="230">39.0997° N · 94.5786° W</text>
          <text x="286" y="31">SITE · SCORE 94</text>
          <text x="506" y="230">EL. 902 FT</text>
        </g>

        <rect width="600" height="240" fill="url(#gisVignette)" pointerEvents="none"/>
      </svg>
    </div>
  );
}

function PromptInputAnim() {
  const PROMPTS = [
    "12-story mixed-use, 380 units, Denver — Class A, podium parking",
    "120-key boutique hotel, 95k sqft, Nashville — adaptive reuse",
    "48 MW data hall, Phoenix — liquid cooled, Tier IV",
  ];
  const RESULTS = [
    [['GMP', '$94.7M'], ['$/sqft', '$412'], ['Schedule', '27 mo']],
    [['GMP', '$58.2M'], ['$/key', '$485K'], ['Schedule', '22 mo']],
    [['GMP', '$412M'], ['$/MW', '$8.6M'], ['Schedule', '19 mo']],
  ];
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('typing');
  const [typed, setTyped] = useState('');
  const [resultsTyped, setResultsTyped] = useState(['', '', '']);
  const [activeResult, setActiveResult] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    setTyped(''); setResultsTyped(['', '', '']); setActiveResult(-1); setPhase('typing');
    const prompt = PROMPTS[idx];
    const results = RESULTS[idx];

    let i = 0;
    const typePrompt = () => {
      if (cancelled) return;
      i++;
      setTyped(prompt.slice(0, i));
      if (i < prompt.length) {
        setTimeout(typePrompt, 32);
      } else {
        setTimeout(() => { if (!cancelled) setPhase('thinking'); }, 400);
        setTimeout(() => { if (!cancelled) { setPhase('results'); typeResult(0); } }, 1100);
      }
    };
    const typeResult = (r) => {
      if (cancelled || r >= results.length) {
        setActiveResult(-1);
        setTimeout(() => { if (!cancelled) setIdx(i => (i + 1) % PROMPTS.length); }, 2400);
        return;
      }
      setActiveResult(r);
      const full = results[r][1];
      let j = 0;
      const step = () => {
        if (cancelled) return;
        j++;
        setResultsTyped(prev => { const n = prev.slice(); n[r] = full.slice(0, j); return n; });
        if (j < full.length) setTimeout(step, 50);
        else setTimeout(() => typeResult(r + 1), 250);
      };
      step();
    };
    setTimeout(typePrompt, 250);
    return () => { cancelled = true; };
  }, [idx]);

  return (
    <div className="prompt-input-anim">
      <div className="pia-input">
        <div className="pia-icon">✦</div>
        <div className="pia-text">
          {typed}
          <span className="pia-caret" />
        </div>
      </div>
      <div className={'pia-results ' + (phase === 'typing' ? 'hidden' : 'shown')}>
        {phase === 'thinking' ? (
          <div className="pia-thinking">
            <span className="pia-dot" />
            <span className="pia-dot" />
            <span className="pia-dot" />
            <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(26,20,16,0.5)', letterSpacing: '0.08em' }}>ESTIMATING</span>
          </div>
        ) : (
          RESULTS[idx].map(([k, v], i) => {
            const t = resultsTyped[i] || '';
            const started = t.length > 0 || activeResult === i;
            return (
              <div className={'pia-row' + (started ? '' : ' pending')} key={k}>
                <span className="pia-k">{k}</span>
                <span className="pia-v">
                  {started ? t : '—'}
                  {activeResult === i && t !== v ? <span className="pia-caret sm" /> : null}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav helpers
// ---------------------------------------------------------------------------

function smoothScrollTo(hash, e) {
  if (!hash || hash === '#') return;
  const el = document.getElementById(hash.slice(1));
  if (!el) return;
  if (e) e.preventDefault();
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: y, behavior: 'smooth' });
  history.replaceState(null, '', hash);
}

function navClick(hash) {
  const onHome = !!document.getElementById(hash.slice(1));
  if (onHome) return (e) => smoothScrollTo(hash, e);
  return undefined;
}

const NAV_LINKS = [
  { label: 'How it works', hash: '#prompt' },
  { label: 'Platform',     hash: '#bento' },
  { label: 'Verticals',    hash: '#verticals' },
  { label: 'Collaborate',  hash: '#collab' },
];

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const t = Math.min(window.innerHeight * 0.55, 520);
      setScrolled(window.scrollY > t);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const onHomePage = !!document.querySelector('.hero-bg') || window.location.pathname === '/';
  const brandHref = onHomePage ? '#' : '/';
  const onBrandClick = onHomePage ? (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname);
  } : undefined;

  const handleLink = (hash) => (e) => {
    const handler = navClick(hash);
    closeMenu();
    if (handler) handler(e);
  };

  return (
    <>
      <nav className={'nav ' + (scrolled ? 'scrolled' : 'on-hero')}>
        <div className="container nav-inner">
          <a href={brandHref} onClick={onBrandClick} className="brand">
            <img src="/assets/bm-logo-thin.png" alt="Block & Mortar" className="brand-logo brand-logo--dark" />
            <img src="/assets/bm-ligh-logo.png" alt="" aria-hidden="true" className="brand-logo brand-logo--light" />
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.hash} href={'/' + l.hash} onClick={navClick(l.hash)}>{l.label}</a>
            ))}
          </div>
          <div className="nav-right">
            <a href="#" className="nav-login">Log in</a>
            <a href="#" onClick={openDemoModal} className="btn btn-primary">Request a demo <span className="arrow">→</span></a>
          </div>
          <button
            className={'nav-hamburger' + (menuOpen ? ' is-open' : '')}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={'nav-overlay' + (menuOpen ? ' is-open' : '')} aria-hidden={!menuOpen}>
        <button className="nav-overlay-close" onClick={closeMenu} aria-label="Close menu">✕</button>
        <nav className="nav-overlay-links">
          {NAV_LINKS.map(l => (
            <a key={l.hash} href={'/' + l.hash} onClick={handleLink(l.hash)}>{l.label}</a>
          ))}
        </nav>
        <div className="nav-overlay-actions">
          <a href="#" className="nav-overlay-login" onClick={closeMenu}>Log in</a>
          <a href="#" onClick={(e) => { closeMenu(); openDemoModal(e); }} className="btn btn-primary">Request a demo <span className="arrow">→</span></a>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function TypedNum({ value, active, delay = 0 }) {
  const [shown, setShown] = useState('');
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (!active) { setShown(''); setTyping(false); return; }
    let i = 0;
    let charTimer = null;
    const start = setTimeout(() => {
      setTyping(true);
      const step = () => {
        i += 1;
        setShown(value.slice(0, i));
        if (i < value.length) {
          const base = 38;
          const jitter = Math.random() * 30;
          charTimer = setTimeout(step, base + jitter);
        } else {
          setTyping(false);
        }
      };
      step();
    }, delay);
    return () => { clearTimeout(start); clearTimeout(charTimer); };
  }, [active, value, delay]);
  return (
    <span className={'num typed' + (typing ? ' is-typing' : '')}>
      {shown}
      {typing && <span className="type-caret" />}
    </span>
  );
}

// Fallback quotes used when Sanity data is unavailable (e.g. during local
// development before the project is connected to Sanity Cloud).
const FALLBACK_QUOTES = [
  {
    text: 'Block and Mortar allows us to collaborate with developers earlier around cost, schedule, and constructability — leading to better projects and fewer surprises during construction.',
    personName: 'Kevin Goebel',
    personTitle: 'CEO, Goebel Mitts Construction',
  },
  {
    text: 'Block and Mortar gives us earlier visibility into how projects are structured during pre-construction, allowing us to identify risks sooner and align coverage strategies with real project conditions.',
    personName: 'Brian Heast',
    personTitle: 'Managing Director, Aon',
  },
  {
    text: 'With earlier access to project scope and timelines, we can plan equipment strategy more effectively and support contractors with greater efficiency from day one.',
    personName: 'Tony Leopold',
    personTitle: 'SVP, Chief Technology & Strategy Officer, United Rentals',
  },
  {
    text: 'Block and Mortar creates a collaborative framework to model cost, schedule, and design together giving us greater confidence in the decisions we make moving projects forward.',
    personName: 'Mike McKeen',
    personTitle: 'President & CEO, EPC Real Estate',
  },
];

function HeroQuotes({ quotes = [] }) {
  const items = quotes.length > 0 ? quotes : FALLBACK_QUOTES;
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className="hero-quotes" aria-live="polite">
      <div className="hero-quote-stage">
        {items.map((q, i) => (
          <figure
            key={i}
            className={'hero-quote' + (i === idx ? ' is-active' : '')}
            aria-hidden={i !== idx}
          >
            <blockquote>{q.text ?? q.quote}</blockquote>
            <figcaption>
              <span className="hero-quote-name">{q.personName ?? q.name}</span>
              <span className="hero-quote-title">{q.personTitle ?? q.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="hero-quote-dots" role="tablist" aria-label="Testimonials">
        {items.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            aria-label={'Testimonial ' + (i + 1)}
            className={'hero-quote-dot' + (i === idx ? ' is-active' : '')}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero({ heading, subheading, testimonials = [], logos = [] }) {
  const properties = [
    {
      key: 'apartments',
      name: 'Riverbend Apartments',
      type: 'Multifamily',
      meta: '312-unit Multifamily · Kansas City',
      anchor: 'left',
      rows: [['Site & shell', '$52.4M'], ['MEP', '$18.1M'], ['GMP', '$94.7M'], ['Schedule', '27 mo']]
    },
    {
      key: 'datacenter',
      name: 'Mesa Data Hall',
      type: 'Data Center',
      meta: '48 MW Hyperscale · Phoenix',
      anchor: 'right',
      rows: [['Power systems', '$128M'], ['Civil', '$34M'], ['GMP', '$412M'], ['Schedule', '19 mo']]
    },
    {
      key: 'cafe',
      name: 'Howell & 4th Café',
      type: 'Retail',
      meta: '1,800 SF QSR · Atlanta',
      anchor: 'bottom',
      rows: [['TI', '$186K'], ['FF&E', '$98K'], ['GMP', '$612K'], ['Schedule', '14 wk']]
    },
  ];
  const KEYS = properties.map(p => p.key);
  const [active, setActive] = useState(KEYS[0]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive(k => KEYS[(KEYS.indexOf(k) + 1) % KEYS.length]);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  const FALLBACK_LOGOS = [
    { alt: 'AON',            src: '/assets/logo-aon.png' },
    { alt: 'EPC Group',      src: '/assets/logo-epc.png' },
    { alt: 'United Rentals', src: '/assets/logo-united-rentals.png' },
    { alt: 'GM',             src: '/assets/logo-gm.png' },
    { alt: 'Molzer',         src: '/assets/logo-molzer.png' },
  ];
  const displayLogos = logos.length > 0 ? logos : FALLBACK_LOGOS;

  return (
    <section className="hero">
      <div className="hero-bg" />

      {properties.map(p => (
        <div
          key={p.key}
          className={'hero-hotspot anchor-' + p.anchor + (active === p.key ? ' is-hovered' : '')}
          onMouseEnter={() => { setPaused(true); setActive(p.key); }}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="hotspot-btn" aria-label={p.name}>
            <span className="hotspot-pulse" />
            <span className="hotspot-dot" />
          </button>
          <div className="hero-float-card">
            <div className="hero-float-type">{p.type}</div>
            <div className="hero-float-head">
              <div className="hero-float-dot" />
              <div>
                <div className="hero-float-name">{p.name}</div>
                <div className="hero-float-meta">{p.meta}</div>
              </div>
            </div>
            <div className="hero-float-rows">
              {p.rows.map(([k, v], i) => (
                <div className="hero-float-row" key={k}>
                  <span>{k}</span>
                  <TypedNum value={v} active={active === p.key} delay={140 + i * 180} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="hero-center">
        <div className="hero-center-mid">
          <h1>
            {heading ?? 'Clarity and confidence across the real estate development lifecycle.'}
          </h1>
          <p className="hero-sub">
            {subheading ?? 'AI-powered cost intelligence on a single collaborative platform.'}
          </p>
          <div className="hero-cta-row">
            <a href="#" onClick={openDemoModal} className="btn btn-dark">Request a demo <span className="arrow">→</span></a>
            <a href="#prompt" onClick={(e) => smoothScrollTo('#prompt', e)} className="hero-link">See how it works</a>
          </div>
          <HeroQuotes quotes={testimonials} />
        </div>
      </div>

      <div className="hero-trusted">
        <div className="container">
          <div className="trusted-label">Trusted by owners, developers &amp; GCs</div>
          <div className="trusted-marquee" aria-hidden="false">
            <div className="trusted-marquee-track">
              {[0, 1].map(rep => (
                <div className="trusted-marquee-group" key={rep} aria-hidden={rep === 1 ? 'true' : undefined}>
                  {displayLogos.map(l => (
                    <img
                      key={rep + '-' + l.alt}
                      src={l.src}
                      alt={rep === 0 ? l.alt : ''}
                      className="trusted-logo-img"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustedBy() {
  return null;
}

// ---------------------------------------------------------------------------
// PromptSection
// ---------------------------------------------------------------------------

export function PromptSection({ heading, headingEm, description }) {
  return (
    <section className="section" id="prompt" style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" /> Prompt → estimate</div>
            <h2>
              {heading ?? 'A sentence becomes'}{' '}
              <em>{headingEm ?? 'a defensible pro forma.'}</em>
            </h2>
          </div>
          <div className="desc">
            {description ?? 'Describe the project. Block & Mortar returns a buildable massing, schedule, and cost breakdown; updated live as every stakeholder weighs in.'}
          </div>
        </div>
        <PromptEstimate />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

// Visualisations are purely decorative UI — they stay hardcoded.
// Only the text (title + body) comes from Sanity.
const STEP_VIZ = [
  <div className="viz viz-analysis">{Array.from({length:7}).map((_,i)=><div key={i} className="col"><div className="bar" style={{ animationDelay: (i*120)+'ms' }} /></div>)}</div>,
  <div className="viz viz-plan">
    <div className="route" />
    <div className="pin"       style={{ left: '18%', top: '34%' }} />
    <div className="pin cyan"  style={{ left: '62%', top: '32%' }} />
    <div className="pin"       style={{ left: '44%', top: '70%' }} />
  </div>,
  <div className="viz viz-build">{Array.from({length:6}).map((_,i)=><div key={i} className="brick" />)}</div>,
  <div className="viz viz-chart">
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd8d1" stopOpacity="0.35" />
          <stop offset="1" stopColor="#7fd8d1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,80 L20,72 L40,74 L60,60 L80,64 L100,50 L120,40 L140,44 L160,30 L180,22 L200,18 L200,100 L0,100 Z" fill="url(#chart-fill)" />
      <path d="M0,80 L20,72 L40,74 L60,60 L80,64 L100,50 L120,40 L140,44 L160,30 L180,22 L200,18" fill="none" stroke="#7fd8d1" strokeWidth="1.2" />
      <path d="M0,88 L40,84 L80,78 L120,64 L160,52 L200,40" fill="none" stroke="#e8b366" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
    </svg>
    <div className="marker">actual vs. pro forma</div>
  </div>,
];

const FALLBACK_STEPS = [
  { number: '01', title: 'Project Analysis',      body: 'Evaluate the site, pro forma, and schedule. What took months of desk research happens in hours, with stakeholders aligned from day one.' },
  { number: '02', title: 'Planning',               body: 'Navigate rezoning, jurisdictions and code. Block & Mortar consolidates regulatory data and coordinates approvals so viability is confirmed, not guessed.' },
  { number: '03', title: 'Design + Construction',  body: 'Plug into the tools GCs already use. Plans, RFIs, and cost deltas stay coordinated. Execution moves from design through delivery with speed and precision.' },
  { number: '04', title: 'Finance + Operations',   body: 'Benchmark actuals against pro forma in real time. Each completed project sharpens the model for the next. A compounding feedback loop.' },
];

export function Steps({ heading, headingEm, description, steps = [] }) {
  const items = steps.length > 0 ? steps : FALLBACK_STEPS;
  return (
    <section className="section" id="how">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" /> How it works</div>
            <h2>
              {heading ?? 'One platform for'}{' '}
              <em>{headingEm ?? 'every stage of the development lifecycle.'}</em>
            </h2>
          </div>
          <div className="desc">
            {description ?? "A developer's time gets spent analyzing, planning, coordinating, and reconciling. Block & Mortar compresses each of those into a live, connected model."}
          </div>
        </div>
        <div className="steps">
          {items.map((s, i) => (
            <div className="step" key={s.number ?? i}>
              <div className="num">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              {STEP_VIZ[i]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Bento
// ---------------------------------------------------------------------------

const FALLBACK_BOXES = [
  { tag: 'AI ESTIMATOR',  heading: 'A prompt is enough to begin.',              description: 'Describe the building. Block & Mortar produces a buildable massing, schedule, and $-per-sqft breakdown grounded in 14 years of regional cost history.' },
  { tag: '',              heading: 'Score sites before you tour them.',          description: '' },
  { tag: 'PRO FORMA',     heading: 'Live yield-on-cost.',                        description: 'IRR, YoC, and DSCR recompute with every change.' },
  { tag: 'P50',           heading: '27 mo',                                      description: 'Schedule median' },
  { tag: 'P90',           heading: '32 mo',                                      description: 'With contingency' },
  { tag: 'INTEGRATIONS',  heading: 'Plugs into the top AEC platforms.',          description: '' },
  { tag: 'RISK',          heading: 'Risks surfaced early. Data not hidden.',     description: '' },
  { tag: 'BENCHMARKING',  heading: 'Every finished project sharpens the next.',  description: '' },
];

export function Bento({ heading, headingEm, description, boxes = [] }) {
  const b = boxes.length === 8 ? boxes : FALLBACK_BOXES;
  return (
    <section className="section" id="bento">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" /> Platform</div>
            <h2>
              {heading ?? 'Blocks that stack into'}{' '}
              <em>{headingEm ?? 'a defensible estimate.'}</em>
            </h2>
          </div>
          <div className="desc">
            {description ?? 'Each capability is a discrete building block. Composed, swapped, and re-estimated as projects evolve. No black box.'}
          </div>
        </div>

        <div className="bento">
          <div className="block b-hero">
            {b[0].tag && <div className="tag"><span className="sq" /> {b[0].tag}</div>}
            <h4>{b[0].heading}</h4>
            {b[0].description && <p>{b[0].description}</p>}
            <PromptInputAnim />
          </div>

          <div className="block b-top1">
            <GisMapAnim />
            <h4>{b[1].heading}</h4>
          </div>

          <div className="block b-mid1">
            {b[2].tag && <div className="tag"><span className="sq" /> {b[2].tag}</div>}
            <h4>{b[2].heading}</h4>
            {b[2].description && <p style={{ fontSize: 13 }}>{b[2].description}</p>}
            <div className="proforma-metrics">
              <div className="pfm">
                <div className="pfm-k">IRR</div>
                <div className="pfm-v">18.4<span className="pfm-u">%</span></div>
                <div className="pfm-d up">▲ 0.6 vs base</div>
              </div>
              <div className="pfm">
                <div className="pfm-k">YoC</div>
                <div className="pfm-v">7.2<span className="pfm-u">%</span></div>
                <div className="pfm-d up">▲ 0.3</div>
              </div>
              <div className="pfm">
                <div className="pfm-k">DSCR</div>
                <div className="pfm-v">1.42<span className="pfm-u">x</span></div>
                <div className="pfm-d flat">— stable</div>
              </div>
            </div>
          </div>

          <div className="block b-mid2">
            {b[3].tag && <div className="tag"><span className="sq" /> {b[3].tag}</div>}
            <h4 style={{ fontSize: 16 }}>{b[3].heading}</h4>
            {b[3].description && <p style={{ fontSize: 12 }}>{b[3].description}</p>}
          </div>

          <div className="block b-mid3">
            {b[4].tag && <div className="tag"><span className="sq" /> {b[4].tag}</div>}
            <h4 style={{ fontSize: 16, color: 'var(--amber)' }}>{b[4].heading}</h4>
            {b[4].description && <p style={{ fontSize: 12 }}>{b[4].description}</p>}
          </div>

          <div className="block b-bot1">
            {b[5].tag && <div className="tag"><span className="sq" /> {b[5].tag}</div>}
            <h4>{b[5].heading}</h4>
          </div>

          <div className="block b-bot2">
            {b[6].tag && <div className="tag"><span className="sq" /> {b[6].tag}</div>}
            <h4>{b[6].heading}</h4>
          </div>

          <div className="block b-bot3">
            {b[7].tag && <div className="tag"><span className="sq" /> {b[7].tag}</div>}
            <h4>{b[7].heading}</h4>
            <FileStackAnim />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Verticals
// ---------------------------------------------------------------------------

const FALLBACK_VERTICALS = [
  { key: 'apartments',  title: 'Multifamily',      meta: '24 stories · 312 units · Kansas City'   },
  { key: 'datacenter',  title: 'Data Centers',     meta: '48 MW · hyperscale · Phoenix'            },
  { key: 'franchise',   title: 'Franchise Builds', meta: '62 locations · retail · rolled in 14 mo' },
  { key: 'office',      title: 'Office',           meta: '410,000 sqft · Class A · Austin'         },
  { key: 'retail',      title: 'Retail',           meta: 'Anchor + inline · 22-site portfolio'     },
];

const VERTICAL_LABELS = {
  apartments: 'APARTMENT RENDER',
  datacenter: 'DATA CENTER RENDER',
  franchise:  'FRANCHISE RENDER',
  office:     'OFFICE RENDER',
  retail:     'RETAIL RENDER',
};

const VERT_STAMPS = [240, 327, 414, 501, 588];

export function Verticals({ heading, headingEm, description, verticals = [] }) {
  const cards = (verticals.length > 0 ? verticals : FALLBACK_VERTICALS).map((v, i) => ({
    k:     v.key,
    title: v.title,
    meta:  v.meta,
    label: VERTICAL_LABELS[v.key] ?? v.key.toUpperCase() + ' RENDER',
    stamp: VERT_STAMPS[i] ?? 240 + i * 87,
  }));
  return (
    <section className="section" id="verticals" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" /> Verticals</div>
            <h2>
              {heading ?? 'Built for the projects'}{' '}
              <em>{headingEm ?? 'you actually build.'}</em>
            </h2>
          </div>
          <div className="desc">
            {description ?? 'Tuned cost libraries, code sets, and schedule templates per vertical — so the first estimate is already in the right ballpark.'}
          </div>
        </div>

        <div className="verticals">
          {cards.map((c, i) => (
            <div key={c.k} className={'vert' + (i === 0 ? ' tall' : '')}>
              <div className={'vert-bg ' + c.k} />
              <div className="vert-label">{c.label}</div>
              <div className="vert-body">
                <div>
                  <div className="vert-title">{c.title}</div>
                  <div className="vert-meta">{c.meta}</div>
                </div>
                <div className="vert-stamp">EST → {c.stamp}d</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

export function CTA({ heading, headingEm, description }) {
  return (
    <section className="section" id="cta" style={{ paddingBottom: 80 }}>
      <div className="container">
        <div className="cta">
          <div className="eyebrow" style={{ position: 'relative' }}><span className="dot" /> Request a demo</div>
          <h2>
            {heading ?? 'Model your next project'}{' '}
            <em>{headingEm ?? 'in minutes.'}</em>
          </h2>
          <p>{description ?? "Bring your toughest deal. We'll show you a live estimate, a defensible schedule, and the path from prompt to pro forma in one working session."}</p>
          <div className="row">
            <a href="#" onClick={openDemoModal} className="btn btn-primary">Request a demo <span className="arrow">→</span></a>
            <a href="#" onClick={openDemoModal} className="btn btn-ghost">Talk to the team</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-copy">© 2026 BLOCK AND MORTAR, INC.</div>
          <div className="footer-loc">2101 BROADWAY BLVD · KANSAS CITY · MO</div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <div className="footer-col-h">COMPANY</div>
            <ul>
              <li><a href="/team">The team</a></li>
            </ul>
            <div className="footer-social" aria-label="Social links">
              <a
                href="https://www.linkedin.com/company/blockandmortar/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.56 4.78 5.9V21h-4v-5.43c0-1.3-.02-2.97-1.9-2.97-1.9 0-2.2 1.4-2.2 2.87V21h-4V9z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/watch?v=75ZYHcqDRk0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="currentColor" d="M23.5 6.5a3 3 0 0 0-2.1-2.13C19.5 3.88 12 3.88 12 3.88s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.12c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.12C24 15.6 24 12 24 12s0-3.6-.5-5.5zM9.6 15.57V8.43L15.82 12 9.6 15.57z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-h">LEGAL</div>
            <ul>
              <li><a href="/accessibility">Accessibility</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
