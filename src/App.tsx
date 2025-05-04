import React from 'react';

import {AppDIContainer} from './ui/components/AppDiContainer/AppDIContainer';
import {MainPage} from './ui/components/MainPage/MainPage';

export function App() {
  return (
    <AppDIContainer>
      <MainPage />
    </AppDIContainer>
  );
}
