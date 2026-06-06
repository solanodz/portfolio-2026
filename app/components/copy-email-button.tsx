"use client";

import { Check, Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type CopyEmailButtonProps = {
  email: string;
  className?: string;
  children?: React.ReactNode;
  iconOnly?: boolean;
  iconClassName?: string;
};

export function CopyEmailButton({
  email,
  className,
  children,
  iconOnly = false,
  iconClassName = "h-3.5 w-3.5",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      window.location.href = `mailto:${email}`;
    }
  }, [email]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn("group disabled:opacity-100", className)}
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy email to clipboard"}
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
                  className="size-full text-emerald-400"
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
                <Mail
                  className={cn(
                    "size-full transition-colors",
                    iconOnly
                      ? "text-muted group-hover:text-black dark:group-hover:text-white"
                      : "text-faint group-hover:text-black dark:group-hover:text-white",
                  )}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            </span>
            {!iconOnly ? (copied ? "Email copied" : children) : null}
          </button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          {copied ? "Copied" : "Click to copy"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
