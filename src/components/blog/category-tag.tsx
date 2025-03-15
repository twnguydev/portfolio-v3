import React from 'react';
import Link from 'next/link';

interface CategoryTagProps {
  category: string;
  className?: string;
}

export default function CategoryTag({ category, className = '' }: CategoryTagProps) {
  const slug = category.toLowerCase().replace(/ /g, '-');

  const categoryClass = category.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, '-')
    .replace(/\s+/g, '-');
  
  return (
    <Link 
      href={`/blog/category/${slug}`}
      className={`category-tag category-tag--${categoryClass} ${className}`}
    >
      {category}
    </Link>
  );
}