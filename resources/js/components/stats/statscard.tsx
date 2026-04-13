import React, { useEffect, useRef, useState } from "react";
import useCounter from "@/hooks/usecounter";

export default function StatsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const projects = useCounter(200, isVisible);
  const clients = useCounter(100, isVisible);
  const years = useCounter(7, isVisible);
  const team = useCounter(50, isVisible);

  return (
    <div ref={ref} className="mt-20 px-4">
      <div className="max-w-5xl mx-auto bg-slate-100 dark:bg-slate-950 py-12 rounded-2xl shadow-sm">

        <div className="grid grid-cols-2 md:grid-cols-4 text-center">

          <div className="space-y-2 border-r border-gray-200 px-3">
            <h1 className="text-3xl md:text-4xl font-medium">
              {projects}+
            </h1>
            <p className="text-xs md:text-sm text-gray-500 uppercase">
              Projects Completed
            </p>
          </div>

          <div className="space-y-2 md:border-r border-gray-200">
            <h1 className="text-3xl md:text-4xl font-medium">
              {clients}+
            </h1>
            <p className="text-xs md:text-sm text-gray-500 uppercase">
              Happy Clients
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium">
              {team}+
            </h1>
            <p className="text-xs md:text-sm text-gray-500 uppercase">
              Team Member
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium">
              {years}+
            </h1>
            <p className="text-xs md:text-sm text-gray-500 uppercase">
              Years Experience
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
