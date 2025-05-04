import React from 'react';

import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import {AppOptions} from './AppOptions/AppOptions';
import {AlphaBehavior} from './Behaviors/AlphaBehavior/AlphaBehavior';
import {ColorBehavior} from './Behaviors/ColorBehavior/ColorBehavior';
import {DirectionBehavior} from './Behaviors/DirectionBehavior/DirectionBehavior';
import {GravityBehavior} from './Behaviors/GravityBehavior/GravityBehavior';
import {LifetimeBehavior} from './Behaviors/LifetimeBehavior/LifetimeBehavior';
import {PathBehavior} from './Behaviors/PathBehavior/PathBehavior';
import {RotationBehavior} from './Behaviors/RotationBehavior/RotationBehavior';
import {ScaleBehavior} from './Behaviors/ScaleBehavior/ScaleBehavior';
import {SpawnShapeBehavior} from './Behaviors/SpawnShapeBehavior/SpawnShapeBehavior';
import {SpeedBehavior} from './Behaviors/SpeedBehavior/SpeedBehavior';
import {BloomFilterConfig} from './BloomFilterConfig/BloomFilterConfig';
import {Properties} from './Properties/Properties';
import {TexturesConfig} from './TexturesConfig/TexturesConfig';

import s from './SidePanel.module.css';

export function SidePanel() {
  return (
    <div className={s.root}>
      <div className={s.config}>
        <div className={s.options}>
          <AppOptions />
        </div>
        <TexturesConfig />
      </div>

      <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H2} className={s.title}>
        Properties
      </Typography>

      <div className={s.properties}>
        <Properties />
      </div>

      <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H2} className={s.title}>
        Spawn properties
      </Typography>

      <div className={s.behaviorsItem}>
        <LifetimeBehavior />
      </div>

      <div className={s.behaviorsItem}>
        <DirectionBehavior />
      </div>

      <div className={s.behaviorsItem}>
        <SpawnShapeBehavior />
      </div>

      <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H2} className={s.title}>
        Behaviors
      </Typography>

      <div className={s.behaviors}>
        <div className={s.behaviorsItem}>
          <ScaleBehavior />
        </div>
        <div className={s.behaviorsItem}>
          <AlphaBehavior />
        </div>
        <div className={s.behaviorsItem}>
          <SpeedBehavior />
        </div>
        <div className={s.behaviorsItem}>
          <ColorBehavior />
        </div>
        <div className={s.behaviorsItem}>
          <RotationBehavior />
        </div>
        <div className={s.behaviorsItem}>
          <GravityBehavior />
        </div>
        <div className={s.behaviorsItem}>
          <PathBehavior />
        </div>
      </div>

      <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H2} className={s.title}>
        Filters
      </Typography>

      <BloomFilterConfig />
    </div>
  );
}
