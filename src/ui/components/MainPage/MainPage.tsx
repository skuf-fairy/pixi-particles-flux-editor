import React from 'react';

import {Editor} from '../Editor/Editor';
import {ErrorNotification} from '../ErrorNotification/ErrorNotification';
import {InfoPanel} from '../InfoPanel/InfoPanel';
import {RestartButton} from '../RestartButton/RestartButton';
import {SidePanel} from '../SidePanel/SidePanel';
import {TopBar} from '../TopBar/TopBar';

import s from './MainPage.module.css';

export function MainPage() {
  return (
    <>
      <div className={s.page}>
        <TopBar />
        <div className={s.container}>
          <div className={s.editorContainer}>
            <Editor />
            <RestartButton />
          </div>
          <SidePanel />
        </div>
      </div>
      <InfoPanel />
      <ErrorNotification />
    </>
  );
}
