import React from 'react';

import {FPSCounter} from '../FPSCounter/FPSCounter';
import {ParticlesCount} from '../ParticlesCount/ParticlesCount';

import s from './InfoPanel.module.css';

export function InfoPanel() {
  return (
    <div className={s.root}>
      <FPSCounter />
      <ParticlesCount />
    </div>
  );
}
