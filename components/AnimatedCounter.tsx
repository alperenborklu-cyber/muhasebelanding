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
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  separator = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(from + (to - from) * easeProgress);
      
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  const formatted = separator
    ? count.toLocaleString("tr-TR")
    : count.toString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}
