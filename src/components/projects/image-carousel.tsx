import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="project-modal__carousel">
      <div className="project-modal__carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="project-modal__carousel-slide"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              opacity: index === currentIndex ? 1 : 0
            }}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="project-modal__carousel-image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="project-modal__carousel-button project-modal__carousel-button--prev"
            aria-label="Image précédente"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goToNext}
            className="project-modal__carousel-button project-modal__carousel-button--next"
            aria-label="Image suivante"
          >
            <ChevronRight />
          </button>

          <div className="project-modal__carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`project-modal__carousel-dot ${index === currentIndex ? 'project-modal__carousel-dot--active' : ''
                  }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};