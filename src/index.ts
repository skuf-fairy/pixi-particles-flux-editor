import {createElement} from 'react';
import {createRoot} from 'react-dom/client';

import {App} from './App';

import './ui/styles/index.css';

const rootNode = document.getElementById('page-root');

if (rootNode) {
  const root = createRoot(rootNode);
  root.render(createElement(App));
}
