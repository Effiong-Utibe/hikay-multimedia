import { useEffect, useState } from "react";

function useCounter(
  end: number,
  startCounting: boolean,
  duration: number = 2000
) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!startCounting) {
      setCount(0); // reset when leaving view
      return;
    }

    let startTime: number | null = null;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const value = Math.floor(percentage * end);
      setCount(value);

      if (percentage < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [end, duration, startCounting]);

  return count;
}

export default useCounter;
