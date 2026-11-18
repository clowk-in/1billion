# Writes components/brand/logo-svg.ts from public/brand/logo-white.svg.
import json, re

s = open('public/brand/logo-white.svg').read()
s = re.sub(r'<\?xml[^>]*>', '', s)
s = re.sub(r'<title>.*?</title>', '', s, flags=re.S)
s = re.sub(r'<metadata.*?</metadata>', '', s, flags=re.S)
body = s[s.index('>', s.index('<svg')) + 1:s.rindex('</svg>')].strip()
ns = ''

open('components/brand/logo-svg.ts', 'w').write(
    "// The inner markup of public/brand/logo-white.svg (from brand/svg/logo-white.svg\n"
    "// of the 1billion repo). Run scripts/logo-svg.py again when the logo changes.\n"
    f"export const logoNamespace = {json.dumps(ns)};\n\n"
    f"export const logoBody = {json.dumps(body)};\n")
