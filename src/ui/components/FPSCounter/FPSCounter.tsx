import React, {useEffect, useState} from 'react';


import s from './FPSCounter.module.css';

export function FPSCounter() {
  const [fps, setFPS] = useState(0);


  useEffect(() => {
    const times: number[] = [];
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

  return <p className={s.root}>FPS: {fps}</p>;
}
