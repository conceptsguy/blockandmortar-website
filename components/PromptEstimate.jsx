/* global React */
const { useEffect, useRef, useState } = React;

// The hero's prompt→estimate animation.
// Prompt types out, then a tower assembles, and estimate rows fade in sequentially.
function PromptEstimate() {
  const SCENARIOS = [
    {
      prompt: "24-story mixed-use apartments, 1.2M sqft, Kansas City — Class A finishes, podium parking.",
      file: "untitled-KC-24A.bm",
      img: "assets/vert-apartments.webp",
      tagL: "N↑   1:1200",
      tagR: "24F · 312 UNITS",
      rows: [
        { label: 'Gross Square Footage',  val: '1,218,400 sqft', delay: 0 },
        { label: 'Schedule',              val: '27 mo · P50',    delay: 180, cls: 'cyan' },
        { label: 'Hard cost',             val: '$382.4M',        delay: 360 },
        { label: 'Soft cost',             val: '$58.1M',         delay: 540 },
        { label: 'Contingency',           val: '8.0%',           delay: 720, cls: 'amber' },
      ],
    },
    {
      prompt: "48 MW hyperscale data hall, Phoenix — Tier IV, liquid cooled, 320k sqft footprint.",
      file: "phx-datahall-48mw.bm",
      img: "assets/vert-datacenter.webp",
      tagL: "N↑   1:2400",
      tagR: "48 MW · TIER IV",
      rows: [
        { label: 'Gross Square Footage',  val: '320,000 sqft',  delay: 0 },
        { label: 'Schedule',              val: '19 mo · P50',   delay: 180, cls: 'cyan' },
        { label: 'Power & cooling',       val: '$214.0M',       delay: 360 },
        { label: 'Civil & shell',         val: '$118.8M',       delay: 540 },
        { label: 'Contingency',           val: '12.0%',         delay: 720, cls: 'amber' },
      ],
    },
    {
      prompt: "120-key boutique hotel, 95k sqft, Nashville — adaptive reuse, ground-floor F&B.",
      file: "nash-bh-120k.bm",
      img: "assets/vert-office.webp",
      tagL: "N↑   1:600",
      tagR: "8F · 120 KEYS",
      rows: [
        { label: 'Gross Square Footage',  val: '95,400 sqft',   delay: 0 },
        { label: 'Schedule',              val: '22 mo · P50',   delay: 180, cls: 'cyan' },
        { label: 'Hard cost',             val: '$48.2M',        delay: 360 },
        { label: 'Soft cost',             val: '$10.0M',        delay: 540 },
        { label: 'Contingency',           val: '7.5%',          delay: 720, cls: 'amber' },
      ],
    },
  ];

  const [scenIdx, setScenIdx] = useState(0);
  const scenario = SCENARIOS[scenIdx];
  const PROMPT = scenario.prompt;

  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState(0); // 0 typing, 1 building, 2 done
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    let i = 0;
    const speed = 28; // per char
    const typer = setInterval(() => {
      i += 1;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        clearInterval(typer);
        setTimeout(() => setPhase(1), 400);
        setTimeout(() => setPhase(2), 2800);
        // loop every 16s — advance scenario AND loopKey
        setTimeout(() => {
          setPhase(0); setTyped('');
          setScenIdx(s => (s + 1) % SCENARIOS.length);
          setLoopKey(k => k + 1);
        }, 16000);
      }
    }, speed);
    return () => clearInterval(typer);
  }, [loopKey]);

  const rows = scenario.rows;

  return (
    <div className="estimate-panel" aria-label="Prompt to estimate demo">
      <div className="estimate-chrome">
        <div className="dots"><span /><span /><span /></div>
        <div className="title">project · {scenario.file}</div>
        <div className="status"><span className="pulse" /> LIVE</div>
      </div>

      <div className="prompt-row" key={loopKey}>
        <span className="caret">›</span>
        <span className="text">{typed}{phase === 0 && <span className="cursor" />}</span>
      </div>

      <div className="estimate-body">
        {/* Building render — refreshes per scenario */}
        <div className="building-stage" key={'stage-' + loopKey} style={{
          backgroundImage: `linear-gradient(180deg, rgba(11,13,16,0) 40%, rgba(11,13,16,0.7) 100%), url("${scenario.img}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div style={{
            position:'absolute', left:14, top:12,
            fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(244,239,230,0.85)', letterSpacing:'0.1em',
            padding: '4px 7px', background:'rgba(11,13,16,0.55)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {scenario.tagL}
          </div>
          <div style={{
            position:'absolute', right:14, bottom:10,
            fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(244,239,230,0.85)', letterSpacing:'0.1em',
            padding: '4px 7px', background:'rgba(11,13,16,0.55)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {scenario.tagR}
          </div>
        </div>

        {/* Estimate readout */}
        <div className="estimate-readout" key={'rd-' + loopKey}>
          {rows.map((r, i) => (
            <div
              className={'row ' + (i === rows.length - 1 ? 'total' : '')}
              key={r.label}
              style={{
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? 'translateY(0)' : 'translateY(4px)',
                transition: `opacity 380ms ease ${r.delay}ms, transform 380ms ease ${r.delay}ms`,
              }}
            >
              <div>
                <div className="label">{r.label}</div>
              </div>
              <div className={'val ' + (r.cls || '')}>{r.val}</div>
            </div>
          ))}
          <div className="collaborators">
            <div className="avatar" style={{ backgroundImage: 'url("https://i.pravatar.cc/80?img=47")' }}>MK</div>
            <div className="avatar" style={{ backgroundImage: 'url("https://i.pravatar.cc/80?img=12")' }}>JR</div>
            <div className="avatar" style={{ backgroundImage: 'url("https://i.pravatar.cc/80?img=33")' }}>TS</div>
            <div className="collab-label">3 collaborating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PromptEstimate });
