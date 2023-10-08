import React, { useEffect, useState } from "react";
import "./FPSCounter.style.scss";

export function FPSCounter() {
  const [fps, setFPS] = useState(0);

  useEffect(() => {
    const times = [];
    let fps;

    function refreshLoop() {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        fps = times.length;
        setFPS(fps);
        refreshLoop();
      });
    }

    refreshLoop();
  }, []);

  return <p className="fps-counter">FPS: {fps}</p>;
}
