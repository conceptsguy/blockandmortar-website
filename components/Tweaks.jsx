/* global React */
const { useEffect, useState } = React;

function useTweaks() {
  const [tweaks, setTweaks] = useState(() => (window.__TWEAKS || { blockDepth: 7, animationIntensity: 7 }));
  const [editOn, setEditOn] = useState(false);

  // apply to CSS vars
  useEffect(() => {
    document.documentElement.style.setProperty('--depth', tweaks.blockDepth);
    document.documentElement.style.setProperty('--anim', tweaks.animationIntensity);
  }, [tweaks]);

  // host protocol — register listener BEFORE announcing availability
  useEffect(() => {
    const onMessage = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditOn(true);
      if (d.type === '__deactivate_edit_mode') setEditOn(false);
    };
    window.addEventListener('message', onMessage);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const update = (key, val) => {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
    } catch (_) {}
  };

  return { tweaks, editOn, update };
}

function TweaksPanel({ tweaks, editOn, update }) {
  if (!editOn) return null;
  return (
    <div className="tweaks-panel">
      <h5>Tweaks</h5>
      <div className="tw-sub">BLOCK · MOTION</div>
      <div className="tweak-row">
        <label>Block depth <span className="val">{tweaks.blockDepth}</span></label>
        <input type="range" min="0" max="14" step="1" value={tweaks.blockDepth}
               onChange={e => update('blockDepth', +e.target.value)} />
      </div>
      <div className="tweak-row">
        <label>Animation intensity <span className="val">{tweaks.animationIntensity}</span></label>
        <input type="range" min="0" max="10" step="1" value={tweaks.animationIntensity}
               onChange={e => update('animationIntensity', +e.target.value)} />
      </div>
    </div>
  );
}

Object.assign(window, { useTweaks, TweaksPanel });
