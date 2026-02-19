"use client";

import { useState, ReactNode, useRef, useEffect } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: "50%", transform: "translateX(-50%)" });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const tooltip = tooltipRef.current;
      const trigger = triggerRef.current;
      const rect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const margin = 16;

      let left = "50%";
      let transform = "translateX(-50%)";

      if (rect.left + tooltipRect.width / 2 > viewportWidth - margin) {
        left = "auto";
        transform = "none";
        tooltip.style.right = "0";
      } else if (rect.left - tooltipRect.width / 2 < margin) {
        left = "0";
        transform = "none";
        tooltip.style.right = "auto";
      } else {
        tooltip.style.right = "auto";
      }

      setPosition({ left, transform });
    }
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg whitespace-pre-wrap w-[300px] max-w-2xl ${className}`}
          style={{
            bottom: "100%",
            left: position.left,
            transform: position.transform,
            marginBottom: "8px",
          }}
        >
          {content}
          <div
            className="absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"
            style={{
              left: position.left === "50%" ? "50%" : position.left === "0" ? "24px" : "auto",
              right: position.left === "auto" ? "24px" : "auto",
              transform: position.left === "50%" ? "translateX(-50%)" : "none",
            }}
          />
        </div>
      )}
    </div>
  );
}
