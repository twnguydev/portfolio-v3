import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';

interface Review {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  content: string;
  position: { x: number; y: number };
  rotation: number;
}

interface CardSize {
  width: number;
  height: number;
}

const WallOfReviews = (): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    content: ''
  });
  const [cardSize, setCardSize] = useState<CardSize>({ width: 300, height: 200 });
  const wallRef = useRef<HTMLDivElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  const findValidPosition = useCallback((size: CardSize, existingReviews: Review[]): { x: number; y: number } => {
    if (!reviewsContainerRef.current) return { x: 0, y: 0 };

    const bounds = reviewsContainerRef.current.getBoundingClientRect();
    const containerWidth = bounds.width;
    const containerHeight = bounds.height;

    if (containerWidth <= 0 || containerHeight <= 0) {
      return { x: 20, y: 20 };
    }

    const grid = 40;
    const padding = 20;
    const positions: { x: number; y: number }[] = [];

    for (let x = padding; x <= containerWidth - size.width - padding; x += grid) {
      for (let y = padding; y <= containerHeight - size.height - padding; y += grid) {
        positions.push({ x, y });
      }
    }

    if (positions.length === 0) {
      return { x: padding, y: padding };
    }

    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);

    const isOverlapping = (pos: { x: number; y: number }, existingReviews: Review[]) => {
      return existingReviews.some(review => {
        const xOverlap = Math.abs(pos.x - review.position.x) < (size.width + padding);
        const yOverlap = Math.abs(pos.y - review.position.y) < (size.height + padding);
        return xOverlap && yOverlap;
      });
    };

    for (const pos of shuffledPositions) {
      if (!isOverlapping(pos, existingReviews)) {
        return pos;
      }
    }

    const posWithLeastOverlaps = shuffledPositions[0];
    return posWithLeastOverlaps || { x: Math.random() * 50, y: Math.random() * 50 };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (wallRef.current && reviewsContainerRef.current) {
        const bounds = reviewsContainerRef.current.getBoundingClientRect();

        const newCardSize = {
          width: Math.min(300, bounds.width * 0.8),
          height: 200
        };
        setCardSize(newCardSize);

        if (Math.abs(bounds.width - previousWidth) > 50) {
          setReviews(prev => {
            const updatedReviews = [...prev];
            return updatedReviews.map((review, index) => ({
              ...review,
              position: findValidPosition(
                newCardSize, 
                updatedReviews.slice(0, index)
              )
            }));
          });
          previousWidth = bounds.width;
        }
      }
    };

    let previousWidth = reviewsContainerRef.current?.getBoundingClientRect().width || 0;
    const timeoutId = setTimeout(handleResize, 100);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [findValidPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.company.trim() || !formData.content.trim()) {
      return;
    }
    
    const position = findValidPosition(cardSize, reviews);
    const rotation = Math.random() * 4 - 2;

    const newReview: Review = {
      id: Date.now().toString(),
      ...formData,
      position,
      rotation
    };

    setReviews(prev => [...prev, newReview]);
    setFormData({ firstName: '', lastName: '', company: '', content: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="wall" ref={wallRef}>
      <div className="wall__header">
        <h1 className="wall__title">
          Le mur des<br />
          <span className="wall__title-accent">collaborations</span>
        </h1>
        <p className="wall__description">
          Découvrez les retours d'expérience de mes collaborateurs et partenaires
        </p>
      </div>

      <div className="wall__content">
        {/* Formulaire d'ajout */}
        <form className="wall__form" onSubmit={handleSubmit}>
          <div className="wall__form-grid">
            <div className="wall__form-group">
              <label htmlFor="firstName" className="wall__form-label">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="wall__form-input"
                required
              />
            </div>
            <div className="wall__form-group">
              <label htmlFor="lastName" className="wall__form-label">Nom</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="wall__form-input"
                required
              />
            </div>
            <div className="wall__form-group">
              <label htmlFor="company" className="wall__form-label">Entreprise</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="wall__form-input"
                required
              />
            </div>
          </div>
          
          <div className="wall__form-group">
            <label htmlFor="content" className="wall__form-label">Votre message</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="wall__form-textarea"
              rows={4}
              required
            />
          </div>

          <button type="submit" className="wall__form-submit">
            <Send className="wall__form-submit-icon" />
            Publier mon avis
          </button>
        </form>

        {/* Mur d'avis avec sa propre référence */}
        <div className="wall__reviews" ref={reviewsContainerRef}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="wall__card"
              style={{
                transform: `translate(${review.position.x}px, ${review.position.y}px) rotate(${review.rotation}deg)`,
                width: `${cardSize.width}px`,
                height: `${cardSize.height}px`
              }}
            >
              <div className="wall__card-content">
                <p className="wall__card-text">{review.content}</p>
                <div className="wall__card-author">
                  <div className="wall__card-name">
                    {review.firstName} {review.lastName}
                  </div>
                  <div className="wall__card-company">{review.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WallOfReviews;