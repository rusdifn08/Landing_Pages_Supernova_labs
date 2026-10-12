"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animasi counter angka dengan easing cubic — requestAnimationFrame murni,
 * tanpa dependency tambahan. Hanya re-render saat nilai berubah.
 */
export function useAnimatedCounter(target: number, duration = 400): number {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    let frame: number;
    const start = displayRef.current;
    const diff = target - start;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(start + diff * eased);
      displayRef.current = value;
      setDisplay(value);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return display;
}
