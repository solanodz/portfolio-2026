"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";
import { cn } from "@/lib/utils";
import { getSiteFrameInset, getSiteFrameMax, getSiteFrameNavInset } from "@/lib/site-frame";

const navItems = [
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const frameInset = getSiteFrameInset(getSiteFrameMax());
  const navInset = getSiteFrameNavInset(getSiteFrameMax());

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-line bg-bg">
        <div className="relative flex h-12 items-center">
          <Link
            href="/"
            className="absolute left-6 text-sm text-text transition-colors hover:text-secondary"
          >
            solanodz
          </Link>

          <div
            className="flex w-full items-center justify-end gap-5"
            style={{ paddingLeft: frameInset, paddingRight: navInset }}
          >
            <nav aria-label="Main" className="flex items-center gap-5">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm transition-colors",
                      active
                        ? "text-text"
                        : "text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <AnimatedThemeToggle className="size-8 shrink-0 border-0 bg-transparent px-0 text-muted shadow-none hover:bg-transparent hover:text-text" />
          </div>
        </div>
      </header>

      <div aria-hidden="true" className="h-12 shrink-0" />
    </>
  );
}
