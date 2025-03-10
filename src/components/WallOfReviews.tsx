/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
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

  // Met à jour les positions des cartes lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (wallRef.current) {
        const newCardSize = {
          width: Math.min(300, wallRef.current.offsetWidth * 0.8),
          height: 200
        };
        setCardSize(newCardSize);
        
        // Recalcule les positions pour toutes les cartes
        setReviews(prev => {
          return prev.map(review => ({
            ...review,
            position: findValidPosition(newCardSize, prev.filter(r => r.id !== review.id))
          }));
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Vérifie si une position est dans les limites du mur
  const isWithinBounds = (pos: { x: number; y: number }, size: CardSize) => {
    if (!wallRef.current) return false;
    const bounds = wallRef.current.getBoundingClientRect();
    return (
      pos.x >= 0 &&
      pos.x + size.width <= bounds.width &&
      pos.y >= 0 &&
      pos.y + size.height <= bounds.height
    );
  };

  // Vérifie les chevauchements avec un padding
  const isOverlapping = (
    pos: { x: number; y: number },
    size: CardSize,
    existingReviews: Review[]
  ) => {
    const padding = 20; // Espace minimum entre les cartes
    return existingReviews.some(review => {
      const xOverlap = Math.abs(pos.x - review.position.x) < (size.width + padding);
      const yOverlap = Math.abs(pos.y - review.position.y) < (size.height + padding);
      return xOverlap && yOverlap;
    });
  };

  // Trouve une position valide pour une nouvelle carte
  const findValidPosition = (size: CardSize, existingReviews: Review[]): { x: number; y: number } => {
    if (!wallRef.current) return { x: 0, y: 0 };

    const bounds = wallRef.current.getBoundingClientRect();
    const grid = 50; // Grille pour les positions possibles
    const positions: { x: number; y: number }[] = [];

    // Génère toutes les positions possibles sur une grille
    for (let x = 0; x <= bounds.width - size.width; x += grid) {
      for (let y = 0; y <= bounds.height - size.height; y += grid) {
        positions.push({ x, y });
      }
    }

    // Mélange les positions
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);

    // Trouve la première position valide
    for (const pos of shuffledPositions) {
      if (!isOverlapping(pos, size, existingReviews)) {
        return pos;
      }
    }

    // Si aucune position n'est trouvée, retourne une position par défaut
    return { x: 0, y: 0 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const position = findValidPosition(cardSize, reviews);
    const rotation = Math.random() * 4 - 2; // Rotation entre -2 et 2 degrés

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
    <div className="wall">
      <div className="wall__header">
        <h1 className="wall__title">
          Le mur des<br />
          <span className="wall__title-accent">collaborations</span>
        </h1>
        <p className="wall__description">
          Découvrez les retours d'expérience de mes collaborateurs et partenaires
        </p>
      </div>

      <div className="wall__content" ref={wallRef}>
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

        {/* Mur d'avis */}
        <div className="wall__reviews">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="wall__card"
              style={{
                transform: `translate(${review.position.x}px, ${review.position.y}px) rotate(${review.rotation}deg)`
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