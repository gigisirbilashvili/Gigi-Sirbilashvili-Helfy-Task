import { Key, ReactNode } from 'react';

export interface CarouselProps<T> {
  items: T[];
  label: string;
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
}

export interface CarouselControlsProps {
  activeIndex: number;
  total: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlaying: () => void;
}
