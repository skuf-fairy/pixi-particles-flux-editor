import {useEditorAppToken, useInitializeUseCaseToken} from 'src/di/di.hooks';

import React, {useEffect, useRef, useState} from 'react';

import {PageLoader} from '../PageLoader/PageLoader';

import s from './Editor.module.css';

export function Editor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initUseCase = useInitializeUseCaseToken();
  const editorApp = useEditorAppToken();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const initApp = async () => {
        await initUseCase.init();

        if (containerRef.current) {
          await editorApp.init(containerRef.current);
          setReady(true);
        }
      };

      initApp();

      return editorApp.destroy;
    }
  }, []);

  return (
    <>
      <div ref={containerRef} className={s.editor}></div>

      {!isReady && <PageLoader />}
    </>
  );
}
