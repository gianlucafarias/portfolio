import { ReactNode } from "react";

interface EnglishLayoutProps {
  children: ReactNode;
}

export default function EnglishLayout({ children }: EnglishLayoutProps) {
  return <>{children}</>;
}
