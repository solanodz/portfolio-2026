export function getSiteFrameMax() {
  return "56rem";
}

export function getSiteFrameInset(frameMax: string) {
  // Use 100% (layout width) instead of 100vw to avoid scrollbar-driven overflow
  // past the frame lines.
  return `max(0px, calc((100% - min(${frameMax}, 100%)) / 2))`;
}

export function getSiteFrameNavInset(frameMax: string, offset = "1.5rem") {
  return `calc(${getSiteFrameInset(frameMax)} + ${offset})`;
}
