import React from 'react';

interface Props {
  className?: string;
}

export function UploadIcon({className}: Props) {
  return (
    <svg viewBox="0 -2 30 30" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(-571 -676)">
        <path d="M599 692c-1.104 0-2 .896-2 2v4h-22v-4c0-1.104-.896-2-2-2s-2 .896-2 2v7c0 .479.521 1 1 1h28c.604 0 1-.458 1-1v-7c0-1.104-.896-2-2-2zm-17-8h2v9c0 1.104.896 2 2 2s2-.896 2-2v-9h2c.704 0 1.326.095 1.719-.3.391-.393.391-1.032 0-1.426l-4.943-5.991c-.21-.21-.487-.3-.76-.285-.274-.015-.551.075-.76.285l-4.943 5.991c-.392.394-.392 1.033 0 1.426.392.395 1.295.3 1.687.3z" />
      </g>
    </svg>
  );
}
