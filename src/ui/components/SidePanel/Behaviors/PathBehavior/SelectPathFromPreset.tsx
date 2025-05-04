import React from 'react';

import {usePathBehaviorStore} from 'src/hooks/connectors';
import {DropDown, DropDownSize} from 'src/ui/kit/DropDown/DropDown';

import s from './SelectPathFromPreset.module.css';

export const PATH_PRESETS: Record<string, string> = {
  Sin: '1*sin(1*x/1)',
  Cos: '1*cos(1*x/1)',
};

export function SelectPathFromPreset() {
  const store = usePathBehaviorStore();

  return (
    <DropDown
      value={{value: 'Select Path Preset', key: 'default'}}
      options={Object.keys(PATH_PRESETS).map((key) => ({
        value: key,
        key: key,
      }))}
      onChange={(v) => store.setPath(PATH_PRESETS[v.key])}
      size={DropDownSize.Small}
      className={s.root}
    />
  );
}
