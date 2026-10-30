"use client";

import { Check, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type CopyActionButtonProps = {
  value: string;
  idleIcon: LucideIcon;
  className?: string;
  children?: React.ReactNode;
  iconOnly?: boolean;
  iconClassName?: string;
  idleLabel?: string;
  copiedLabel?: string;
  tooltipIdle?: string;
  tooltipCopied?: string;
  ariaLabel?: string;
};

export function CopyActionButton({
  value,
  idleIcon: IdleIcon,
  className,
  children,
  iconOnly = false,
  iconClassName = "h-3.5 w-3.5",
  idleLabel,
  copiedLabel = "Copied",
  tooltipIdle = "Click to copy",
  tooltipCopied = "Copied",
  ariaLabel,
}: CopyActionButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [value]);

  const label = copied
    ? copiedLabel
    : (children ?? idleLabel);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "group inline-flex items-center gap-1.5 disabled:opacity-100",
              className,
            )}
            onClick={handleCopy}
            aria-label={
              ariaLabel ??
              (copied ? copiedLabel : (idleLabel ?? tooltipIdle))
            }
            disabled={copied}
          >
            <span className={cn("relative inline-flex shrink-0", iconClassName)}>
              <span
                className={cn(
                  "absolute inset-0 transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              >
                <Check
                  className="size-full text-text"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
              <span
                className={cn(
                  "absolute inset-0 transition-all",
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                )}
              >
                <IdleIcon
                  className={cn(
                    "size-full transition-colors",
                    iconOnly
                      ? "text-muted group-hover:text-black dark:group-hover:text-white"
                      : "text-current",
                  )}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            </span>
            {!iconOnly ? label : null}
          </button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          {copied ? tooltipCopied : tooltipIdle}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
