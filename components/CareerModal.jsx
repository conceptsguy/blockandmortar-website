/* global React */
// CareerModal — "Join the team" interest form. Opens on dispatch of
// `document.dispatchEvent(new CustomEvent('bm:apply'))`.
// Mirrors DemoModal styling (class prefix `dm-*`) so the design system stays consistent.

const { useState: useStateC, useEffect: useEffectC, useCallback: useCallbackC } = React;

const CM_AREAS = ['Engineering', 'Product', 'Design', 'Estimating / Preconstruction', 'Project Delivery', 'Go-to-market', 'Operations'];
const CM_EXPERIENCE = ['0 – 2 years', '2 – 5 years', '5 – 10 years', '10+ years'];

function CareerModal() {
  const [open, setOpen] = useStateC(false);
  const [submitted, setSubmitted] = useStateC(false);
  const [form, setForm] = useStateC({
    first: '', last: '', email: '', areas: [], experience: '', link: '', note: ''
  });

  const close = useCallbackC(() => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 320);
  }, []);

  useEffectC(() => {
    const openHandler = () => { setSubmitted(false); setOpen(true); };
    document.addEventListener('bm:apply', openHandler);
    return () => document.removeEventListener('bm:apply', openHandler);
  }, []);

  useEffectC(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const toggleArea = (a) => {
    setForm(f => ({
      ...f,
      areas: f.areas.includes(a) ? f.areas.filter(x => x !== a) : [...f.areas, a]
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const valid = form.first.trim() && form.last.trim() && form.email.trim() && form.experience;

  return (
    <div className={'dm-root ' + (open ? 'is-open' : '')} aria-hidden={!open}>
      <div className="dm-scrim" onClick={close} />
      <div className="dm-card" role="dialog" aria-modal="true" aria-labelledby="cm-title">
        <button className="dm-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
        </button>

        {!submitted ? (
          <>
            <div className="dm-head">
              <div className="eyebrow" style={{ position: 'relative' }}>
                <span className="dot" /> Join the team
              </div>
              <h3 id="cm-title" className="dm-title">
                Tell us where you'd want to make an impact.
              </h3>
              <p className="dm-sub">
                We're a small team building the future of real estate development. If your work fits, we'll be in touch.
              </p>
            </div>

            <form className="dm-form" onSubmit={onSubmit}>
              <div className="dm-row">
                <label className="dm-field">
                  <span className="dm-label">First name <em>*</em></span>
                  <input type="text" required value={form.first}
                    onChange={e => setForm(f => ({ ...f, first: e.target.value }))} />
                </label>
                <label className="dm-field">
                  <span className="dm-label">Last name <em>*</em></span>
                  <input type="text" required value={form.last}
                    onChange={e => setForm(f => ({ ...f, last: e.target.value }))} />
                </label>
              </div>

              <label className="dm-field">
                <span className="dm-label">Work email <em>*</em></span>
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </label>

              <div className="dm-field">
                <span className="dm-label">Area(s) of interest</span>
                <div className="dm-checks">
                  {CM_AREAS.map(a => (
                    <label key={a} className={'dm-check' + (form.areas.includes(a) ? ' on' : '')}>
                      <input type="checkbox" checked={form.areas.includes(a)} onChange={() => toggleArea(a)} />
                      <span className="dm-check-box">
                        <svg viewBox="0 0 12 12" width="9" height="9"><path d="M2 6.2 L5 9 L10 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span>{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="dm-field">
                <span className="dm-label">Years of experience <em>*</em></span>
                <div className="dm-select">
                  <select required value={form.experience}
                    onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}>
                    <option value="" disabled>Select experience level…</option>
                    {CM_EXPERIENCE.map(x => <option key={x} value={x}>{x}</option>)}
                  </select>
                  <svg className="dm-select-caret" viewBox="0 0 10 6" width="10" height="6"><path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </label>

              <label className="dm-field">
                <span className="dm-label">LinkedIn or portfolio link</span>
                <input type="url" placeholder="https://linkedin.com/in/…" value={form.link}
                  onChange={e => setForm(f => ({ ...f, link: e.target.value }))} />
              </label>

              <label className="dm-field">
                <span className="dm-label">What are you excited to work on?</span>
                <textarea
                  rows="3"
                  className="dm-textarea"
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                />
              </label>

              <div className="dm-actions">
                <button type="submit" className={'btn btn-primary' + (valid ? '' : ' is-disabled')} disabled={!valid}>
                  Submit <span className="arrow">→</span>
                </button>
                <div className="dm-contact">
                  <span className="dm-contact-k">info@blockandmortar.ai</span>
                  <span className="dm-contact-dot" />
                  <span className="dm-contact-k">Kansas City · MO</span>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="dm-done">
            <div className="dm-done-mark">
              <svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5 L10 17.5 L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="dm-title">Thanks, {form.first || 'we got your interest'}.</h3>
            <p className="dm-sub">We'll review your note and reach out if there's a fit.</p>
            <button className="btn btn-ghost" onClick={close}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function openCareerModal(e) {
  if (e) e.preventDefault();
  document.dispatchEvent(new CustomEvent('bm:apply'));
}

Object.assign(window, { CareerModal, openCareerModal });
