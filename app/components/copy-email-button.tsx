"use client";

import { Mail } from "lucide-react";

import { CopyActionButton } from "@/app/components/copy-action-button";

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
  return (
    <CopyActionButton
      value={email}
      idleIcon={Mail}
      className={className}
      iconOnly={iconOnly}
      iconClassName={iconClassName}
      copiedLabel="Email copied"
      tooltipIdle="Click to copy"
      tooltipCopied="Copied"
      ariaLabel={iconOnly ? "Copy email to clipboard" : undefined}
    >
      {children}
    </CopyActionButton>
  );
}
