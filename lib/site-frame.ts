export function getSiteFrameMax() {
  return "56rem";
}

export function getSiteFrameInset(frameMax: string) {
  return `calc((100vw - min(${frameMax}, 100vw)) / 2)`;
}

export function getSiteFrameNavInset(frameMax: string, offset = "1.5rem") {
  return `calc(${getSiteFrameInset(frameMax)} + ${offset})`;
}
