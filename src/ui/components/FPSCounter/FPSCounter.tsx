import React, { useEffect, useState } from "react";
// import { useEditorAppToken, usePerformanceStoreToken } from "src/di/di.hooks";
import "./FPSCounter.style.scss";

export function FPSCounter() {
  const [fps, setFPS] = useState(0);
  // const performanceStore = usePerformanceStoreToken();
  // const app = useEditorAppToken();

  useEffect(() => {
    const times: number[] = [];
    let fps;

    // let isLog = false;

    function refreshLoop() {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        fps = times.length;

        // if (fps > 140) {
        //   isLog = true;
        // }

        // if (isLog && fps <= 130) {
        //   app.destroy();
        //   alert(performanceStore.getParticleCount());
        // }

        setFPS(fps);
        refreshLoop();
      });
    }

    refreshLoop();
  }, []);

  return <p className="fps-counter">FPS: {fps}</p>;
}
