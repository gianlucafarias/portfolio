"use client";

import type { ReactNode } from "react";

interface PortfolioShellProps {
  children: ReactNode;
  project: ReactNode;
}

export default function PortfolioShell({ children, project }: PortfolioShellProps) {
  return (
    <div className="portfolio-shell relative mx-auto w-full flex-1 px-4 pt-20">
      <div className="portfolio-primary">
        {children}
      </div>
      {project}
    </div>
  );
}
