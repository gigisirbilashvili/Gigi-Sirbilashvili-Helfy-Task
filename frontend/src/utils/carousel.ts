export const wrapIndex = (index: number, length: number): number => {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
};

export const getRenderedSlots = (position: number, perView: number): number[] => {
  const first = position - perView;
  const count = perView * 3;
  return Array.from({ length: count }, (_, offset) => first + offset);
};

export const isSlotVisible = (slot: number, position: number, perView: number): boolean =>
  slot >= position && slot < position + perView;

export const getSwipeDirection = (deltaX: number, threshold = 40): -1 | 0 | 1 => {
  if (Math.abs(deltaX) < threshold) {
    return 0;
  }

  return deltaX < 0 ? 1 : -1;
};

const KEY_DIRECTIONS: Record<string, 1 | -1> = { ArrowRight: 1, ArrowLeft: -1 };

export const getKeyDirection = (key: string): 1 | -1 | undefined => KEY_DIRECTIONS[key];

export const getTrackOffset = (position: number, perView: number): number =>
  (-position * 100) / perView;

export const toTranslateX = (percent: number): string => `translate3d(${percent}%, 0, 0)`;
