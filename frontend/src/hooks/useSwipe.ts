import { PointerEvent, useRef } from 'react';
import { getSwipeDirection } from '../utils/carousel';

export const useSwipe = (onSwipe: (direction: 1 | -1) => void) => {
  const startX = useRef<number | null>(null);

  const onPointerDown = (event: PointerEvent) => {
    startX.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent) => {
    if (startX.current === null) return;

    const direction = getSwipeDirection(event.clientX - startX.current);
    startX.current = null;

    if (direction !== 0) onSwipe(direction);
  };

  const onPointerCancel = () => {
    startX.current = null;
  };

  return { onPointerDown, onPointerUp, onPointerCancel };
};
