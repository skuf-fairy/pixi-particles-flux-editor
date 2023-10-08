import React, { useEffect, useRef } from "react";
import { useEditorApp } from "src/di/di.hooks";
import "./Editor.style.scss";

export function Editor() {
  const containerRef = useRef<HTMLDivElement>();
  const editorApp = useEditorApp();

  useEffect(() => {
    if (containerRef.current) {
      editorApp.init(containerRef.current);

      return editorApp.destroy;
    }
  }, []);

  return <div ref={containerRef} className="editor"></div>;
}
