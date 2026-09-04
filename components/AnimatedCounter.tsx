"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  separator?: boolean;
}

export default function AnimatedCounter({
  from,
  to,
  duration = 1.8,
  suffix = "",
  prefix = "",
  separator = true,
}: AnimatedCounterProps) {
  // CRITICAL FIX: Always default state to target value `to`.
  // This guarantees that SSR HTML, SEO crawlers, and initial paint NEVER display "0 TL", "%0", or "0+".
  const [count, setCount] = useState<number>(to);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);

    // Compute a positive, realistic baseline so animation never dips or flashes 0 TL / %0
    const startVal =
      from !== undefined && from > 0
        ? from
        : Math.max(1, Math.floor(to * 0.72));

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(startVal + (to - startVal) * easeProgress);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, hasAnimated, from, to, duration]);

  const formatted = separator
    ? count.toLocaleString("tr-TR")
    : count.toString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}
