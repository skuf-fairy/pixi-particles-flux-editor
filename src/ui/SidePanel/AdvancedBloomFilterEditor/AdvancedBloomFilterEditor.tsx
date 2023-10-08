import cn from "classnames";
import React, { useState } from "react";
import { useAdvancedBloomFilterConfig } from "src/di/di.hooks";
import "./AdvancedBloomFilterEditor.style.scss";

interface Props {
  className?: string;
}

export function AdvancedBloomFilterEditor({ className }: Props) {
  const advancedBloomFilterConfig = useAdvancedBloomFilterConfig();
  const [value, setValue] = useState<string>(advancedBloomFilterConfig.getStringifyConfig());

  return (
    <section className={cn("advanced-bloom-filter-editor", className)}>
      <h2 className="advanced-bloom-filter-editor__title">Bloom Filter Options</h2>
      <textarea
        value={value}
        className="advanced-bloom-filter-editor__textarea"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={() => {
          advancedBloomFilterConfig.setConfigFromString(value);
        }}
      />
    </section>
  );
}
