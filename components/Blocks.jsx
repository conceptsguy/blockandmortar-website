/* global React */
// Shared 3D block / isometric primitives drawn in pure CSS + SVG.
// No AI-style glows; edges are architectural, lighting is paper-like.

const { useEffect, useRef, useState } = React;

// Small logo cube — abstract "block" for the brand mark
function BrandCube() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
      <defs>
        <linearGradient id="bm-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9ece9" />
          <stop offset="1" stopColor="#b9bdb7" />
        </linearGradient>
        <linearGradient id="bm-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7fd8d1" />
          <stop offset="1" stopColor="#3d8580" />
        </linearGradient>
        <linearGradient id="bm-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e8b366" />
          <stop offset="1" stopColor="#8a6733" />
        </linearGradient>
      </defs>
      {/* top face */}
      <polygon points="14,2 26,9 14,16 2,9" fill="url(#bm-top)" />
      {/* left face */}
      <polygon points="2,9 14,16 14,26 2,19" fill="url(#bm-left)" />
      {/* right face */}
      <polygon points="26,9 14,16 14,26 26,19" fill="url(#bm-right)" />
      {/* edges */}
      <polyline points="2,9 14,2 26,9 14,16 2,9" fill="none" stroke="#0b0d10" strokeWidth="0.6" />
      <line x1="14" y1="16" x2="14" y2="26" stroke="#0b0d10" strokeWidth="0.6" />
    </svg>
  );
}

// An isometric tower built from repeated floor blocks; floors fade in on mount
function AssemblingTower({ floors = 10, delay = 0, highlight = null }) {
  return (
    <div className="building">
      {Array.from({ length: floors }).map((_, i) => {
        const bottom = i * 22;
        const style = {
          bottom: bottom + 'px',
          transform: 'translateX(-50%)',
          left: '50%',
          animation: `floorIn calc(800ms - var(--anim) * 30ms) ease-out both`,
          animationDelay: (delay + i * 120) + 'ms',
          opacity: 0,
        };
        return (
          <div key={i} className="floorblock" style={style}>
            <div className="face front">
              <div className="windows" />
              <div className="lightline" />
            </div>
            <div className="face top" />
            <div className="face right" />
          </div>
        );
      })}
      <style>{`
        @keyframes floorIn {
          0%   { transform: translateX(-50%) translateY(-18px); opacity: 0; }
          60%  { opacity: 1; }
          100% { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Small isometric "stack" art used inside bento cells
function IsoStack({ w = 200, h = 160, variant = 'a' }) {
  // A couple of stylized isometric block compositions
  const sets = {
    a: [
      { x: 40, y: 90, c: '#1e2833', e: '#7fd8d1' },
      { x: 90, y: 60, c: '#232e3a', e: '#7fd8d1' },
      { x: 140, y: 30, c: '#2a3643', e: '#e8b366' },
    ],
    b: [
      { x: 30, y: 70, c: '#1e2833', e: '#7fd8d1' },
      { x: 70, y: 60, c: '#232e3a', e: '#7fd8d1' },
      { x: 110, y: 50, c: '#28323e', e: '#7fd8d1' },
      { x: 150, y: 40, c: '#2c3744', e: '#e8b366' },
    ],
    c: [
      { x: 50, y: 100, c: '#1a232c', e: '#7fd8d1' },
      { x: 50, y: 70,  c: '#1e2833', e: '#7fd8d1' },
      { x: 50, y: 40,  c: '#232e3a', e: '#e8b366' },
      { x: 100, y: 70, c: '#1e2833', e: '#7fd8d1' },
      { x: 100, y: 40, c: '#232e3a', e: '#7fd8d1' },
    ],
  };
  const items = sets[variant];
  const size = 44;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <defs>
        <linearGradient id={`iso-top-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2d3846" />
          <stop offset="1" stopColor="#1a2230" />
        </linearGradient>
      </defs>
      {items.map((it, i) => (
        <g key={i} transform={`translate(${it.x}, ${it.y})`}>
          {/* top */}
          <polygon points={`${size/2},0 ${size},${size/4} ${size/2},${size/2} 0,${size/4}`}
                   fill={`url(#iso-top-${variant})`} stroke="#0b0d10" strokeWidth="0.6" />
          {/* left */}
          <polygon points={`0,${size/4} ${size/2},${size/2} ${size/2},${size*0.9} 0,${size*0.65}`}
                   fill={it.c} stroke="#0b0d10" strokeWidth="0.6" />
          {/* right */}
          <polygon points={`${size},${size/4} ${size/2},${size/2} ${size/2},${size*0.9} ${size},${size*0.65}`}
                   fill="#0f1318" stroke="#0b0d10" strokeWidth="0.6" />
          {/* edge highlight */}
          <line x1={size/2} y1={size/2} x2={size/2} y2={size*0.9} stroke={it.e} strokeWidth="0.6" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

Object.assign(window, { BrandCube, AssemblingTower, IsoStack });
