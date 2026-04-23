/* global React */
const { useEffect, useState } = React;

// Timeline-driven cursor animation. Cursors rotate through rooms, click each one,
// and open a semi-transparent tooltip modal with role-aware context.
function CollabScene() {
  // Each cursor has a set of "idle" positions scattered across the canvas —
  // so they feel present and natural (like teammates waiting their turn)
  // rather than popping in from offscreen. When it's a cursor's turn to
  // act, it moves from its current idle → target → tooltip, then drifts
  // to its NEXT idle spot. Each idle is a distinct spot to avoid stacking.
  const IDLES = {
    // Maya (Owner) idles on the right side, above/near the amenity block
    maya:   [{ x: 88, y: 8 },  { x: 64, y: 6 },  { x: 92, y: 38 }],
    // Jordan (GC) idles on the left, near the core and podium
    jordan: [{ x: 8, y: 18 },  { x: 14, y: 52 }, { x: 6, y: 88 }],
    // Tia (Lender) starts just above the blocks to the right, drifts around the right edge
    tia:    [{ x: 82, y: 4 },  { x: 96, y: 48 }, { x: 70, y: 92 }],
  };

  // Each step: which cursor acts, which room it targets, and the tooltip content.
  const STEPS = [
    {
      cursor: 'maya',
      target: { x: 77, y: 17 },   // AMENITY
      tooltip: {
        title: 'Maya K · Owner',
        color: '#e8b366',
        rows: [
          { k: 'Amenity mix',   v: 'Rooftop + podium' },
          { k: 'GFA change',    v: '+2,400 sqft' },
          { k: 'YoC impact',    v: '+0.4%', cls: 'up' },
        ],
        cta: 'Push to roof',
      },
      pos: { x: 77, y: 30 },
    },
    {
      cursor: 'jordan',
      target: { x: 26, y: 29 },   // CORE
      tooltip: {
        title: 'Jordan R · GC',
        color: '#7fd8d1',
        rows: [
          { k: 'Schedule',      v: '27 mo · P50' },
          { k: 'Crane picks',   v: '142 total' },
          { k: 'Critical path', v: 'Pour 3 → MEP' },
        ],
        cta: 'Request re-sequence',
      },
      pos: { x: 26, y: 42 },
    },
    {
      cursor: 'tia',
      target: { x: 77, y: 68 },   // RESIDENTIAL
      tooltip: {
        title: 'Tia S · Lender',
        color: '#c6c9c4',
        rows: [
          { k: 'Rent PSF',     v: '$3.42' },
          { k: 'DSCR',         v: '1.42×' },
          { k: 'Stabilization', v: 'Mo 33' },
        ],
        cta: 'Send underwriting',
      },
      pos: { x: 77, y: 52 },
    },
    {
      cursor: 'jordan',
      target: { x: 26, y: 80 },   // PODIUM
      tooltip: {
        title: 'Jordan R · GC',
        color: '#7fd8d1',
        rows: [
          { k: 'Stalls',       v: '148' },
          { k: 'Recoverable',  v: '+12 (sub-level)' },
          { k: 'Cost delta',   v: '+$1.8M', cls: 'up' },
        ],
        cta: 'Cost to owner',
      },
      pos: { x: 26, y: 72 },
    },
  ];

  // Hover position: just outside the target, like a cursor drifting in
  // before committing. Sits ~10% offset — close, not on top.
  const hoverFor = (target) => {
    const dx = target.x < 50 ? 6 : -6;
    const dy = target.y < 50 ? -10 : 10;
    return { x: target.x + dx, y: Math.max(4, Math.min(96, target.y + dy)) };
  };

  const [step, setStep] = useState(0);
  // Track which idle slot each cursor currently occupies, so inactive
  // cursors can drift between positions (not stack) while they "wait".
  const [idleIdx, setIdleIdx] = useState({ maya: 0, jordan: 0, tia: 0 });

  // enter    -> active cursor drifts from its idle spot toward hover
  // hover    -> small pause near the target (human deciding)
  // approach -> slower, deliberate move onto the target
  // click    -> brief compression
  // hold     -> tooltip visible
  // exit     -> drift back to a fresh idle position (stays onscreen)
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const timers = [];
    setPhase('enter');
    timers.push(setTimeout(() => setPhase('hover'),    900));
    timers.push(setTimeout(() => setPhase('approach'), 1450));
    timers.push(setTimeout(() => setPhase('click'),    2050));
    timers.push(setTimeout(() => setPhase('hold'),     2220));
    timers.push(setTimeout(() => setPhase('exit'),     4400));
    timers.push(setTimeout(() => {
      // Advance active cursor to its next idle slot, then move to next step.
      const activeName = STEPS[step].cursor;
      setIdleIdx(prev => ({
        ...prev,
        [activeName]: (prev[activeName] + 1) % IDLES[activeName].length,
      }));
      setStep(s => (s + 1) % STEPS.length);
    }, 5000));
    return () => timers.forEach(clearTimeout);
  }, [step]);

  const active = STEPS[step];
  const hover = hoverFor(active.target);

  const cursorAt = (name) => {
    const idle = IDLES[name][idleIdx[name]];
    if (name !== active.cursor) return idle;              // inactive: chill at idle spot
    if (phase === 'enter')    return hover;
    if (phase === 'hover')    return hover;
    if (phase === 'approach' || phase === 'click' || phase === 'hold') return active.target;
    if (phase === 'exit')     return IDLES[name][(idleIdx[name] + 1) % IDLES[name].length];
    return idle;
  };

  // Speed / easing per phase, to imitate natural movement.
  // Non-active cursors drift gently between idle positions.
  const motionFor = (isActive) => {
    if (!isActive) return '1400ms cubic-bezier(.4,.1,.3,1)';
    switch (phase) {
      case 'enter':    return '880ms cubic-bezier(.22,.65,.25,1)';
      case 'hover':    return '240ms cubic-bezier(.4,.1,.3,1)';
      case 'approach': return '540ms cubic-bezier(.55,.1,.2,1)';
      case 'click':    return '120ms ease-out';
      case 'hold':     return '240ms ease-out';
      case 'exit':     return '1100ms cubic-bezier(.4,.1,.3,1)';  // drift to next idle
      default:         return '500ms ease';
    }
  };

  const cursorColor = {
    jordan: '#7fd8d1',
    maya:   '#e8b366',
    tia:    '#c6c9c4',
  };
  const cursorLabel = {
    jordan: 'Jordan R · GC',
    maya:   'Maya K · Owner',
    tia:    'Tia S · Lender',
  };

  return (
    <div className="collab">
      <div className="collab-inner">
        <div className="collab-copy">
          <div className="eyebrow"><span className="dot" /> Real-time collaboration</div>
          <h3>Every stakeholder, <em>in the same model, at the same moment.</em></h3>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, marginTop: 14, maxWidth: '48ch' }}>
            Owners, GCs, designers, and lenders comment on the same source of truth.
            Estimates update as the model changes; not three weeks after.
          </p>
          <ul>
            <li><span className="check">✓</span><span><b>Live cost deltas</b>  every change propagates to pro forma in seconds.</span></li>
            <li><span className="check">✓</span><span><b>Real-time Comments</b>   drop notes directly on a bids, proformas, or projects.</span></li>
            <li><span className="check">✓</span><span><b>Role-aware views</b>  lenders see risk, GCs see schedule, owners see returns.</span></li>
          </ul>
        </div>

        <div className="collab-canvas">
          <div className="plan">
            <div className={'room' + (phase !== 'exit' && active.target.y < 34 && active.target.x > 50 ? ' hit' : '')}
              style={{ left: '0%',  top: '0%',  width: '52%', height: '58%' }}>
              <div className="label">CORE · 12,400 sqft</div>
            </div>
            <div className={'room amber' + (phase !== 'exit' && active.target.y < 34 && active.target.x > 50 ? ' hit' : '')}
              style={{ left: '54%', top: '0%',  width: '46%', height: '34%' }}>
              <div className="label">AMENITY</div>
            </div>
            <div className={'room' + (phase !== 'exit' && active.target.y >= 36 && active.target.x > 50 ? ' hit' : '')}
              style={{ left: '54%', top: '36%', width: '46%', height: '64%' }}>
              <div className="label">RESIDENTIAL · FL 3–24</div>
            </div>
            <div className={'room' + (phase !== 'exit' && active.target.y >= 60 && active.target.x < 50 ? ' hit' : '')}
              style={{ left: '0%',  top: '60%', width: '52%', height: '40%' }}>
              <div className="label">PODIUM PARKING</div>
            </div>
          </div>

          {/* Cursors */}
          {['jordan','maya','tia'].map(name => {
            const at = cursorAt(name);
            const isActive = name === active.cursor;
            const clicking = isActive && phase === 'click';
            const move = motionFor(isActive);
            return (
              <div
                key={name}
                className={'cursor-tag ' + (isActive ? 'is-active' : '')}
                style={{
                  left: at.x + '%',
                  top: at.y + '%',
                  transform: `scale(${clicking ? 0.85 : 1})`,
                  transition: `left ${move}, top ${move}, transform 160ms ease`,
                }}
              >
                <svg className="pointer" viewBox="0 0 14 14">
                  <path d="M1 1 L13 7 L7 8 L5 13 Z" fill={cursorColor[name]} stroke="#0b0d10" strokeWidth="0.5" />
                </svg>
                <span className="pill" style={{ background: cursorColor[name] }}>{cursorLabel[name]}</span>
                {clicking && <span className="click-ring" style={{ borderColor: cursorColor[name] }} />}
              </div>
            );
          })}

          {/* Tooltip modal — appears on click, dismisses on reset */}
          <div
            className={'collab-tooltip ' + (phase === 'hold' || phase === 'click' ? 'visible' : '')}
            style={{
              left: active.pos.x + '%',
              top:  active.pos.y + '%',
              borderColor: active.tooltip.color + '99',
            }}
          >
            <div className="ct-head">
              <span className="ct-dot" style={{ background: active.tooltip.color }} />
              <span className="ct-title">{active.tooltip.title}</span>
            </div>
            <div className="ct-rows">
              {active.tooltip.rows.map(r => (
                <div className="ct-row" key={r.k}>
                  <span className="ct-k">{r.k}</span>
                  <span className={'ct-v ' + (r.cls || '')}>{r.v}</span>
                </div>
              ))}
            </div>
            <div className="ct-cta">{active.tooltip.cta} →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CollabScene });
