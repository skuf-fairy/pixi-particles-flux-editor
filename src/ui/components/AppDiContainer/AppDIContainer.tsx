import { ContainerProvider } from "brandi-react";
import React, { PropsWithChildren, useMemo } from "react";
import { getOrCreateDiRootContainer } from "src/di/di.container";

export function AppDIContainer({ children }: PropsWithChildren<{}>) {
  const container = useMemo(() => getOrCreateDiRootContainer(), []);

  return <ContainerProvider container={container}>{children}</ContainerProvider>;
}
