import cn from "classnames";
import React, { useState } from "react";
import { useEmitterConfig } from "src/di/di.hooks";
import "./EmitterConfigEditor.style.scss";

interface Props {
  className?: string;
}

export function EmitterConfigEditor({ className }: Props) {
  const emitterConfig = useEmitterConfig();
  const [value, setValue] = useState<string>(emitterConfig.getStringifyExcludedTexturesConfig());

  return (
    <section className={cn("emitter-config-editor", className)}>
      <h2 className="emitter-config-editor__title">Edit config</h2>
      <textarea
        value={value}
        className="emitter-config-editor__textarea"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={() => {
          emitterConfig.setConfigFromStringAndMergeTextures(value);
        }}
      />
    </section>
  );
}
