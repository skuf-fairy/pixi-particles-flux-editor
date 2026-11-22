import React from 'react';

const paths = {
  play: 'm8 5 11 7-11 7Z',
  pause: 'M8 5v14M16 5v14',
  restart: 'M4 10a8 8 0 1 1 1 8M4 4v6h6',
  step: 'm5 5 10 7-10 7ZM19 5v14',
  burst: 'm12 2 2.4 6.5L21 7l-4.3 5 4.3 5-6.6-1.5L12 22l-2.4-6.5L3 17l4.3-5L3 7l6.6 1.5Z',
  undo: 'M9 5 4 10l5 5M4 10h10a6 6 0 0 1 6 6v3',
  redo: 'm15 5 5 5-5 5M20 10H10a6 6 0 0 0-6 6v3',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  upload: 'M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5',
  grid: 'M3 3h18v18H3ZM3 9h18M3 15h18M9 3v18M15 3v18',
  target: 'M12 2v4m0 12v4M2 12h4m12 0h4M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  close: 'm6 6 12 12M6 18 18 6',
  search: 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1 5 6 6',
};
export function Icon({name}: {name: keyof typeof paths}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
