import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from 'lucide-react';
import { IconButton } from '../common/Button';
import { CarouselControlsProps } from './types';

export const CarouselControls = ({
  activeIndex,
  total,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlaying,
}: CarouselControlsProps) => (
  <div className="carousel__controls">
    <IconButton label="Previous task" variant="secondary" onClick={onPrev}>
      <ChevronLeftIcon />
    </IconButton>

    <span className="carousel__counter" aria-live="polite">
      <strong>{activeIndex + 1}</strong> / {total}
    </span>

    <IconButton
      label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
      variant="secondary"
      onClick={onTogglePlaying}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconButton>

    <IconButton label="Next task" variant="secondary" onClick={onNext}>
      <ChevronRightIcon />
    </IconButton>
  </div>
);
