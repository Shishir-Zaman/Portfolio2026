"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<"default" | "link" | "glass">("default");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest(".glass")) {
        setHoverState("glass");
      } 
      else if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setHoverState("link");
      } 
      else {
        setHoverState("default");
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Default small dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[var(--color-teal-accent)] rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_10px_rgba(0,245,255,0.8)]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isClicked ? 0.5 : hoverState === "default" ? 1 : 0,
          opacity: hoverState === "default" ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Glassmorphic Cursor (appears on hover) */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.6 : hoverState === "glass" ? 1 : hoverState === "link" ? 0.8 : 0,
            opacity: hoverState !== "default" ? 1 : 0,
          }}
          className={`w-10 h-10 rounded-full absolute -ml-5 -mt-5 ${
            hoverState === "glass" 
              ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(0,245,255,0.15)]" 
              : "border border-[var(--color-teal-accent)] bg-[var(--color-teal-accent)]/5 backdrop-blur-sm"
          }`}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
