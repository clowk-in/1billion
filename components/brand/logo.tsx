// The logo of 1billion: Bila and the wordmark, from the brand folder of the
// 1billion repo (brand/svg/logo-white.svg, for a dark background). The text is
// outlined, so it needs no font. The width follows the logo ratio, 525 by 120.
export function Logo({ height = 24 }: { height?: number }) {
  const width = Math.round((height * 525) / 120);

  return <img src="/brand/logo-white.svg" alt="1billion" width={width} height={height} className="block" />;
}
