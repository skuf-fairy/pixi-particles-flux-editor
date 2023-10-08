export function lerp(start: number, end: number, progress: number) {
  return start * (1 - progress) + end * progress;
}
