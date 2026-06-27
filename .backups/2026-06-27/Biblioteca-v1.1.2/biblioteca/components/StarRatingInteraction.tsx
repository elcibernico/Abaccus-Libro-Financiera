import React, { useState } from 'react';

interface StarRatingInteractionProps {
  initialRating: number;
  onRate: (rating: number) => void;
  disabled?: boolean;
}

export default function StarRatingInteraction({
  initialRating,
  onRate,
  disabled = false
}: StarRatingInteractionProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    if (disabled) return;
    setRating(value);
    onRate(value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = hover !== null ? star <= hover : star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: disabled ? 'default' : 'pointer',
              padding: '2px',
              fontSize: '24px',
              outline: 'none',
              transition: 'transform 0.1s ease, color 0.15s ease',
              transform: hover === star ? 'scale(1.2)' : 'scale(1)',
              color: active ? '#FFB800' : '#4E4E5A', // Color oro premium o gris oscuro apagado
            }}
            title={`Calificar con ${star} estrella${star > 1 ? 's' : ''}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
