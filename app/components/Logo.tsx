import type { CSSProperties } from "react";

/**
 * Logo v3 — Faceted gem/crystal mark (matching uploaded image 2).
 * 3D isometric structure with a central vertex.
 */
export default function Logo({
  className = "w-10 h-10",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer pentagon boundary */}
      <path d="M65 5 L90 60 L60 115 L10 85 L20 45 Z" />
      {/* Inner edges connecting to the center vertex */}
      <path d="M45 65 L65 5" />
      <path d="M45 65 L90 60" />
      <path d="M45 65 L10 85" />
    </svg>
  );
}
