import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRenderedSlots, wrapIndex } from '../utils/carousel';
import { useMediaQuery } from './useMediaQuery';

interface CarouselOptions {
  length: number;
  perView: number;
  autoplayDelay?: number;
}

export const useCarousel = ({ length, perView, autoplayDelay = 4500 }: CarouselOptions) => {
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const canLoop = length > perView;
  const shouldAutoplay = canLoop && isPlaying && !isPaused && !prefersReducedMotion;

  const goNext = useCallback(() => setPosition((current) => current + 1), []);
  const goPrev = useCallback(() => setPosition((current) => current - 1), []);
  const togglePlaying = useCallback(() => setIsPlaying((current) => !current), []);

  useEffect(() => {
    if (!shouldAutoplay) return undefined;
    const timer = window.setTimeout(goNext, autoplayDelay);
    return () => window.clearTimeout(timer);
  }, [position, shouldAutoplay, autoplayDelay, goNext]);

  const slots = useMemo(
    () => (canLoop ? getRenderedSlots(position, perView) : []),
    [canLoop, position, perView],
  );

  return {
    position,
    slots,
    canLoop,
    activeIndex: wrapIndex(position, length),
    isPlaying,
    goNext,
    goPrev,
    togglePlaying,
    setIsPaused,
  };
};
