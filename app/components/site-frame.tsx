import { getSiteFrameInset, getSiteFrameMax } from "@/lib/site-frame";

export function SiteFrame() {
  const inset = getSiteFrameInset(getSiteFrameMax());

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 z-[55] hidden w-px bg-line min-[896px]:block"
        style={{ left: inset }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 z-[55] hidden w-px bg-line min-[896px]:block"
        style={{ right: inset }}
      />
    </>
  );
}
