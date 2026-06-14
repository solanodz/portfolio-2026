import { getSiteFrameInset, getSiteFrameMax } from "@/lib/site-frame";

export function SiteFrame() {
  const inset = getSiteFrameInset(getSiteFrameMax());

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 z-[55] w-px bg-line"
        style={{ left: inset }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 z-[55] w-px bg-line"
        style={{ right: inset }}
      />
    </>
  );
}
