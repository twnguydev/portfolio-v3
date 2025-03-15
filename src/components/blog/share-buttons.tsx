'use client';

import React from 'react';
import { Twitter, Linkedin, Facebook, Copy, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export default function ShareButtons({ title, url, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);
  
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || 'https://votreportfolio.com';
  
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter size={16} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
      className: 'share-buttons__button--twitter',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={16} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      className: 'share-buttons__button--linkedin',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={16} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      className: 'share-buttons__button--facebook',
    },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Partager natif (pour mobile)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: fullUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };
  
  return (
    <div className={`share-buttons ${className}`}>
      <div className="share-buttons__container">
        <h3 className="share-buttons__title">
          <Share2 size={16} />
          Partager l'article
        </h3>
        
        <div className="share-buttons__links">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`share-buttons__button ${link.className}`}
              aria-label={`Partager sur ${link.name}`}
            >
              {link.icon}
            </a>
          ))}
          
          <button
            onClick={copyToClipboard}
            className={`share-buttons__button share-buttons__button--copy ${copied ? 'copied' : ''}`}
            aria-label="Copier le lien"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              onClick={handleNativeShare}
              className="share-buttons__button share-buttons__button--native-share"
              aria-label="Partager natif"
            >
              <Share2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Check({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}