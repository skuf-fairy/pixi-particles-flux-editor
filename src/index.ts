import {createElement} from 'react';
import {createRoot} from 'react-dom/client';

import './ui/styles.css';

const rootNode = document.getElementById('page-root');
if (rootNode) {
  const root = createRoot(rootNode);
  root.render(createElement('div', {className: 'app-loading', role: 'status'}, 'Loading Flux Studio…'));
  void import('./App')
    .then(({App}) => root.render(createElement(App)))
    .catch(() =>
      root.render(
        createElement('div', {className: 'app-loading', role: 'alert'}, 'Editor could not be loaded. Reload to retry.'),
      ),
    );
}
