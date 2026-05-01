import { useEffect, useState } from 'react';

const IDLES = {
  maya:   [{ x: 88, y: 8 },  { x: 64, y: 6 },  { x: 92, y: 38 }],
  jordan: [{ x: 8, y: 18 },  { x: 14, y: 52 }, { x: 6, y: 88 }],
  tia:    [{ x: 82, y: 4 },  { x: 96, y: 48 }, { x: 70, y: 92 }],
};

const STEPS = [
  {
    cursor: 'maya',
    target: { x: 77, y: 17 },
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
    target: { x: 26, y: 29 },
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
    target: { x: 77, y: 68 },
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
    target: { x: 26, y: 80 },
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

const cursorColor = { jordan: '#7fd8d1', maya: '#e8b366', tia: '#c6c9c4' };
const cursorLabel = { jordan: 'Jordan R · GC', maya: 'Maya K · Owner', tia: 'Tia S · Lender' };

function hoverFor(target) {
  const dx = target.x < 50 ? 6 : -6;
  const dy = target.y < 50 ? -10 : 10;
  return { x: target.x + dx, y: Math.max(4, Math.min(96, target.y + dy)) };
}

export default function CollabScene() {
  const [step, setStep] = useState(0);
  const [idleIdx, setIdleIdx] = useState({ maya: 0, jordan: 0, tia: 0 });
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
    if (name !== active.cursor) return idle;
    if (phase === 'enter' || phase === 'hover') return hover;
    if (phase === 'approach' || phase === 'click' || phase === 'hold') return active.target;
    if (phase === 'exit') return IDLES[name][(idleIdx[name] + 1) % IDLES[name].length];
    return idle;
  };

  const motionFor = (isActive) => {
    if (!isActive) return '1400ms cubic-bezier(.4,.1,.3,1)';
    switch (phase) {
      case 'enter':    return '880ms cubic-bezier(.22,.65,.25,1)';
      case 'hover':    return '240ms cubic-bezier(.4,.1,.3,1)';
      case 'approach': return '540ms cubic-bezier(.55,.1,.2,1)';
      case 'click':    return '120ms ease-out';
      case 'hold':     return '240ms ease-out';
      case 'exit':     return '1100ms cubic-bezier(.4,.1,.3,1)';
      default:         return '500ms ease';
    }
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

          {['jordan', 'maya', 'tia'].map(name => {
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
