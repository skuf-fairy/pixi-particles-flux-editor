import React, { useEffect, useRef, useState } from "react";
import { useEditorAppToken } from "src/di/di.hooks";
import { PageLoader } from "../components/PageLoader/PageLoader";
import "./Editor.style.scss";

export function Editor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorApp = useEditorAppToken();
  const [isReady, setReady] = useState(false);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const initApp = async () => {
  //       if (containerRef.current) {
  //         await editorApp.init(containerRef.current);
  //         setReady(true);
  //       }
  //     };

  //     initApp();

  //     return editorApp.destroy;
  //   }
  // }, []);

  return (
    <>
      <div ref={containerRef} className="editor"></div>

      {/* {!isReady && <PageLoader />} */}
    </>
  );
}
