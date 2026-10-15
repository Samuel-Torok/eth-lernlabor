/**
 * Schieberegler mit KaTeX-Beschriftung und Live-Wert.
 * Gibt ein Element zurück; onInput(value) wird sofort einmal aufgerufen.
 */
export function slider({ label, min, max, step, value, format = (v) => v, onInput }) {
  const wrap = document.createElement('label');
  wrap.className = 'slider';
  wrap.innerHTML = `<span class="slider-label">${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}"><output></output>`;
  const input = wrap.querySelector('input');
  const out = wrap.querySelector('output');
  const update = () => {
    const v = Number(input.value);
    out.innerHTML = format(v);
    onInput(v);
  };
  input.addEventListener('input', update);
  wrap.setValue = (v) => { input.value = v; update(); };
  queueMicrotask(update);
  return wrap;
}

export function buttonRow(buttons) {
  const row = document.createElement('div');
  row.className = 'btn-row';
  for (const { label, onClick } of buttons) {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = label;
    b.addEventListener('click', () => {
      row.querySelectorAll('button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      onClick();
    });
    row.appendChild(b);
  }
  return row;
}
