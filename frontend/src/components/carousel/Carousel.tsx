import { CSSProperties, KeyboardEvent } from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import { useSlidesPerView } from '../../hooks/useMediaQuery';
import { useSwipe } from '../../hooks/useSwipe';
import {
  getKeyDirection,
  getTrackOffset,
  isSlotVisible,
  toTranslateX,
  wrapIndex,
} from '../../utils/carousel';
import { CarouselControls } from './CarouselControls';
import { CarouselProps } from './types';
import '../../styles/carousel.css';

export const Carousel = <T,>({ items, label, getKey, renderItem }: CarouselProps<T>) => {
  const perView = useSlidesPerView();
  const carousel = useCarousel({ length: items.length, perView });
  const { position, slots, canLoop, goNext, goPrev, setIsPaused } = carousel;

  const step = (direction: 1 | -1) => (direction === 1 ? goNext() : goPrev());
  const swipeHandlers = useSwipe(step);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const direction = getKeyDirection(event.key);
    if (!direction || event.target !== event.currentTarget) return;
    event.preventDefault();
    step(direction);
  };

  const rootStyle = { '--per-view': perView } as CSSProperties;

  if (!canLoop) {
    return (
      <div className="carousel carousel--static" style={rootStyle}>
        <div className="carousel__row">
          {items.map((item) => (
            <div className="carousel__slide" key={getKey(item)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section
      className="carousel"
      style={rootStyle}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="carousel__viewport" tabIndex={0} onKeyDown={handleKeyDown} {...swipeHandlers}>
        <div
          className="carousel__track"
          style={{ transform: toTranslateX(getTrackOffset(position, perView)) }}
        >
          {slots.map((slot) => {
            const isVisible = isSlotVisible(slot, position, perView);

            return (
              <div
                key={slot}
                className="carousel__slide"
                style={{ transform: toTranslateX(slot * 100) }}
                aria-hidden={!isVisible}
                inert={!isVisible}
              >
                {renderItem(items[wrapIndex(slot, items.length)])}
              </div>
            );
          })}
        </div>
      </div>

      <CarouselControls
        activeIndex={carousel.activeIndex}
        total={items.length}
        isPlaying={carousel.isPlaying}
        onPrev={goPrev}
        onNext={goNext}
        onTogglePlaying={carousel.togglePlaying}
      />
    </section>
  );
};
