'use client';

import { useId } from 'react';

import { logoBody } from './logo-svg';

// The logo of 1billion: Bila and the wordmark (brand/svg/logo-white.svg, for a
// dark background). It is inline, not an <img>: Safari on iOS draws a masked SVG
// in an <img> at a low resolution, and the logo looks blurry. Each copy gets its
// own mask ids, because the header and the footer show it on one page. The
// width follows the logo ratio, 525 by 120.
export function Logo({ height = 24 }: { height?: number }) {
  const id = useId().replace(/:/g, '');
  const width = Math.round((height * 525) / 120);
  const markup = logoBody.replace(/id="([^"]+)"/g, `id="$1-${id}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${id})`);

  return (
    <svg
      viewBox="0 0 525 120"
      width={width}
      height={height}
      role="img"
      aria-label="1billion"
      className="block"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
