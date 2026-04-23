/* global React */
// DemoModal — global "Request a demo" form. Opens on any element dispatching
// `document.dispatchEvent(new CustomEvent('bm:request-demo'))`.
// Designed to match the site's Midnight Studio palette (var(--bg), --cyan, etc.).

const { useState, useEffect, useCallback } = React;

const VERTICALS = ['Retail', 'Office', 'Mixed Use', 'Data Centers', 'Infrastructure', 'Industrial'];
const ROLES = ['Developer', 'General Contractor', 'Subcontractor', 'Vendor', 'Investor / Financier', 'Insurer', 'Other'];

function DemoModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    first: '', last: '', email: '', verticals: [], role: ''
  });

  const close = useCallback(() => {
    setOpen(false);
    // give the exit animation a moment before resetting internal state
    setTimeout(() => setSubmitted(false), 320);
  }, []);

  useEffect(() => {
    const openHandler = () => { setSubmitted(false); setOpen(true); };
    document.addEventListener('bm:request-demo', openHandler);
    return () => document.removeEventListener('bm:request-demo', openHandler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const toggleVertical = (v) => {
    setForm(f => ({
      ...f,
      verticals: f.verticals.includes(v) ? f.verticals.filter(x => x !== v) : [...f.verticals, v]
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Demo site — just show a confirmation state.
    setSubmitted(true);
  };

  const valid = form.first.trim() && form.last.trim() && form.email.trim() && form.role;

  return (
    <div className={'dm-root ' + (open ? 'is-open' : '')} aria-hidden={!open}>
      <div className="dm-scrim" onClick={close} />
      <div className="dm-card" role="dialog" aria-modal="true" aria-labelledby="dm-title">
        <button className="dm-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
        </button>

        {!submitted ? (
          <>
            <div className="dm-head">
              <div className="eyebrow" style={{ position: 'relative' }}>
                <span className="dot" /> Request a demo
              </div>
              <h3 id="dm-title" className="dm-title">
                Schedule a product demo with a team member.
              </h3>
              <p className="dm-sub">Tell us a bit about you;  we'll bring a live estimate to the call.</p>
            </div>

            <form className="dm-form" onSubmit={onSubmit}>
              <div className="dm-row">
                <label className="dm-field">
                  <span className="dm-label">First name <em>*</em></span>
                  <input
                    type="text"
                    required
                    value={form.first}
                    onChange={e => setForm(f => ({ ...f, first: e.target.value }))}
                  />
                </label>
                <label className="dm-field">
                  <span className="dm-label">Last name <em>*</em></span>
                  <input
                    type="text"
                    required
                    value={form.last}
                    onChange={e => setForm(f => ({ ...f, last: e.target.value }))}
                  />
                </label>
              </div>

              <label className="dm-field">
                <span className="dm-label">Work email <em>*</em></span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </label>

              <div className="dm-field">
                <span className="dm-label">Vertical(s) of interest</span>
                <div className="dm-checks">
                  {VERTICALS.map(v => (
                    <label key={v} className={'dm-check' + (form.verticals.includes(v) ? ' on' : '')}>
                      <input
                        type="checkbox"
                        checked={form.verticals.includes(v)}
                        onChange={() => toggleVertical(v)}
                      />
                      <span className="dm-check-box">
                        <svg viewBox="0 0 12 12" width="9" height="9"><path d="M2 6.2 L5 9 L10 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="dm-field">
                <span className="dm-label">I'm a <em>*</em></span>
                <div className="dm-select">
                  <select
                    required
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  >
                    <option value="" disabled>Select your role…</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <svg className="dm-select-caret" viewBox="0 0 10 6" width="10" height="6"><path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </label>

              <div className="dm-actions">
                <button type="submit" className={'btn btn-primary' + (valid ? '' : ' is-disabled')} disabled={!valid}>
                  Submit <span className="arrow">→</span>
                </button>
                <div className="dm-contact">
                  <span className="dm-contact-k">info@blockandmortar.ai</span>
                  <span className="dm-contact-dot" />
                  <span className="dm-contact-k">2101 Broadway Blvd · Kansas City, MO</span>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="dm-done">
            <div className="dm-done-mark">
              <svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5 L10 17.5 L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="dm-title">Thanks, {form.first || 'we got it'}.</h3>
            <p className="dm-sub">A team member will reach out within one business day to schedule your demo.</p>
            <button className="btn btn-ghost" onClick={close}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper for any anchor/button: call on click, prevents default nav.
function openDemoModal(e) {
  if (e) e.preventDefault();
  document.dispatchEvent(new CustomEvent('bm:request-demo'));
}

Object.assign(window, { DemoModal, openDemoModal });
