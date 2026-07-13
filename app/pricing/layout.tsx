import { ReactNode } from "react";
import { PERSONAL_INFO } from "../data/content";

export const metadata = {
  title: `Pricing & Packages | ${PERSONAL_INFO.name}`,
  description: "Transparent pricing packages for brand identity, packaging, and social media design services in Bangladesh.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
