// The background of the hero: Bila, the mascot of the brand (brand/svg/
// bila-mascot.svg), and the mail routes that start at her backpack.
// Envelopes sit at the nodes, thin lines join them, and a dot travels each
// route, as a mail on its way. It is decoration only, so screen readers skip
// it. A soft light sits behind Bila, so her violet does not sink into the
// violet of the card.

type Envelope = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  fill?: boolean;
};

const envelopes: Envelope[] = [
  { x: 880, y: 170, size: 56, opacity: 0.85 },
  { x: 1130, y: 230, size: 44, opacity: 0.7 },
  { x: 720, y: 230, size: 46, opacity: 0.55, fill: true },
  { x: 760, y: 50, size: 36, opacity: 0.5 },
  { x: 120, y: 90, size: 54, opacity: 0.55 },
  { x: 40, y: 260, size: 34, opacity: 0.4, fill: true },
];

// Each route joins two envelopes or nodes. The first starts at the backpack.
const routes = [
  'M 1086 79 L 908 190',
  'M 908 190 L 1152 245',
  'M 908 190 L 743 246',
  'M 778 63 L 908 190',
  'M 147 117 L 57 277',
  'M 147 117 L 420 30',
];

const nodes = [
  [1086, 79],
  [908, 190],
  [1152, 245],
  [743, 246],
  [778, 63],
  [147, 117],
  [57, 277],
  [620, 40],
  [1190, 330],
];

function EnvelopeShape({ x, y, size, opacity, fill }: Envelope) {
  const h = size * 0.7;
  const r = size * 0.14;
  const flap = `M ${x + size * 0.1} ${y + h * 0.18} L ${x + size / 2} ${y + h * 0.58} L ${x + size * 0.9} ${y + h * 0.18}`;

  return (
    <g opacity={opacity}>
      <rect
        x={x}
        y={y}
        width={size}
        height={h}
        rx={r}
        fill={fill ? '#C9B6FF' : 'none'}
        fillOpacity={fill ? 0.95 : 0}
        stroke="#D9CCFF"
        strokeWidth={2}
      />

      <path d={flap} fill="none" stroke={fill ? '#6A35E6' : '#D9CCFF'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function HeroArt() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bila-light">
          <stop offset="0%" stopColor="#F1ECFE" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#F1ECFE" stopOpacity={0} />
        </radialGradient>
      </defs>

      <circle cx={1070} cy={110} r={190} fill="url(#bila-light)" />

      <g stroke="#B9A2FF" strokeOpacity={0.35} strokeWidth={1.5}>
        {routes.map(route => (
          <path key={route} d={route} fill="none" />
        ))}
      </g>

      <g fill="#B9A2FF" fillOpacity={0.5}>
        {nodes.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} />
        ))}
      </g>

      {envelopes.map(envelope => (
        <EnvelopeShape key={`${envelope.x}-${envelope.y}`} {...envelope} />
      ))}

      <image href="/brand/bila-mascot.svg" x={950} y={-6} width={264} height={220} />

      <g className="hero-dot" fill="#FFFFFF">
        {routes.map((route, index) => (
          <circle key={route} r={4}>
            <animateMotion dur={`${3 + index * 0.7}s`} repeatCount="indefinite" path={route} />
          </circle>
        ))}
      </g>
    </svg>
  );
}
