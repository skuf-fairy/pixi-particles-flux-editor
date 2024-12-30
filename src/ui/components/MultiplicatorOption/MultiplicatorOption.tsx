import { Multiplicator } from "particle-flux";
import React from "react";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  mult: Multiplicator;
  onChange(mult: Multiplicator): void;
}

export function MultiplicatorOption({ mult, onChange }: Props) {
  if (typeof mult === "number") {
    return <NumberOption value={mult} text="Mult" onChange={(v) => onChange(mult)} />;
  }

  return (
    <>
      <NumberOption value={mult.min} text="Mult min" onChange={(v) => onChange({ ...mult, min: v })} />
      <NumberOption value={mult.max} text="Mult max" onChange={(v) => onChange({ ...mult, max: v })} />
    </>
  );
}
