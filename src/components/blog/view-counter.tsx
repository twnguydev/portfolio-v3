'use client';

import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
  slug: string;
  trackView?: boolean;
  className?: string;
}

export default function ViewCounter({ slug, trackView = false, className = '' }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/blog/views?slug=${slug}`);
        const data = await res.json();
        setViews(data.views);
      } catch (error) {
        console.error('Failed to fetch view count:', error);
      }
    };
    
    fetchViews();
    
    const incrementViewCount = async () => {
      if (!trackView) return;
      
      try {
        await fetch('/api/blog/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });
      } catch (error) {
        console.error('Failed to increment view count:', error);
      }
    };
    
    const timer = setTimeout(() => {
      incrementViewCount();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [slug, trackView]);
  
  return (
    <div className={`view-counter ${className}`}>
      <Eye size={16} className="view-counter__icon" />
      <span className="view-counter__text">
        {views === null ? '...' : `${views.toLocaleString()} vue${views !== 1 ? 's' : ''}`}
      </span>
    </div>
  );
}