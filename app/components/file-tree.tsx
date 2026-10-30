"use client";

import { cn } from "@/lib/utils";

export function TreeElbow({ isLast }: { isLast: boolean }) {
  return (
    <div className="relative w-4 shrink-0 self-stretch">
      <span
        aria-hidden
        className={cn(
          "absolute left-[6px] w-px bg-tree-line",
          isLast ? "top-0 h-[13px]" : "inset-y-0",
        )}
      />
      <span
        aria-hidden
        className="absolute top-[13px] left-[6px] h-px w-2 -translate-y-1/2 bg-tree-line"
      />
    </div>
  );
}

export type FileTreeItem = {
  id: string;
  title: string;
  children?: FileTreeItem[];
};

type FileTreeLinkProps = {
  title: string;
  isActive: boolean;
  href?: string;
  onNavigate?: () => void;
  className: string;
  activeClassName: string;
};

export function FileTreeLink({
  title,
  isActive,
  href,
  onNavigate,
  className,
  activeClassName,
}: FileTreeLinkProps) {
  if (href || onNavigate) {
    return (
      <a
        href={href ?? `#${title}`}
        onClick={
          onNavigate
            ? (event) => {
                event.preventDefault();
                onNavigate();
              }
            : undefined
        }
        className={cn(
          "min-w-0 flex-1 py-1 leading-snug transition-colors",
          isActive ? activeClassName : className,
        )}
      >
        {title}
      </a>
    );
  }

  return (
    <span
      className={cn(
        "min-w-0 flex-1 py-1 leading-snug",
        isActive ? activeClassName : className,
      )}
    >
      {title}
    </span>
  );
}

type FileTreeProps = {
  root: FileTreeItem;
  activeId?: string;
  onNavigate?: (item: FileTreeItem) => void;
  className?: string;
  "aria-label"?: string;
};

export function FileTree({
  root,
  activeId,
  onNavigate,
  className,
  "aria-label": ariaLabel = "Sections",
}: FileTreeProps) {
  const branches = root.children ?? [];

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul>
        <li>
          <FileTreeLink
            title={root.title}
            isActive={activeId === root.id}
            href={onNavigate ? `#${root.id}` : undefined}
            onNavigate={onNavigate ? () => onNavigate(root) : undefined}
            className="text-sm font-medium text-text hover:text-secondary"
            activeClassName="text-sm font-semibold text-text"
          />

          {branches.length > 0 ? (
            <ul>
              {branches.map((branch, branchIndex) => {
                const isBranchLast = branchIndex === branches.length - 1;
                const children = branch.children ?? [];
                const hasChildren = children.length > 0;

                return (
                  <li key={branch.id} className="relative">
                    {!isBranchLast ? (
                      <span
                        aria-hidden
                        className="absolute top-[13px] bottom-0 left-[6px] w-px bg-tree-line"
                      />
                    ) : null}

                    <div className="flex">
                      <TreeElbow isLast={isBranchLast && !hasChildren} />
                      <FileTreeLink
                        title={branch.title}
                        isActive={activeId === branch.id}
                        href={onNavigate ? `#${branch.id}` : undefined}
                        onNavigate={
                          onNavigate ? () => onNavigate(branch) : undefined
                        }
                        className="text-[13px] text-secondary hover:text-text"
                        activeClassName="text-[13px] font-medium text-text"
                      />
                    </div>

                    {hasChildren ? (
                      <ul className="relative ml-4">
                        {!isBranchLast ? (
                          <span
                            aria-hidden
                            className="absolute inset-y-0 left-[-10px] w-px bg-tree-line"
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="absolute top-0 left-[-10px] h-[13px] w-px bg-tree-line"
                          />
                        )}

                        {children.map((child, childIndex) => {
                          const isChildLast = childIndex === children.length - 1;

                          return (
                            <li key={child.id} className="flex">
                              <TreeElbow isLast={isChildLast} />
                              <FileTreeLink
                                title={child.title}
                                isActive={activeId === child.id}
                                href={onNavigate ? `#${child.id}` : undefined}
                                onNavigate={
                                  onNavigate
                                    ? () => onNavigate(child)
                                    : undefined
                                }
                                className="text-xs text-faint hover:text-secondary"
                                activeClassName="text-xs font-medium text-secondary"
                              />
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
