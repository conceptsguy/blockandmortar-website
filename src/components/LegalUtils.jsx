import { useState, useEffect } from 'react';

// Sticky sidebar TOC — highlights the section currently in view.
export function LegalTOC({ sections, activeId }) {
  return (
    <aside className="legal-toc">
      <div className="legal-toc-label">Contents</div>
      <ol>
        {sections.map(s => (
          <li key={s.id}>
            <a
              href={'#' + s.id}
              className={activeId === s.id ? 'is-active' : ''}
              onClick={(e) => {
                const el = document.getElementById(s.id);
                if (!el) return;
                e.preventDefault();
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
                history.replaceState(null, '', '#' + s.id);
              }}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

// Tracks which section heading is currently scrolled past.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}
