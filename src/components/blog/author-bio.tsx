import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="author-bio">
      <div className="author-bio__container">
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name}
            width={80}
            height={80}
            className="author-bio__image"
          />
        ) : (
          <div className="author-bio__avatar-placeholder">
            {author.name.charAt(0)}
          </div>
        )}
        
        <div className="author-bio__content">
          <h3 className="author-bio__title">À propos de l'auteur</h3>
          <p className="author-bio__name">{author.name}</p>
          
          {author.bio ? (
            <p className="author-bio__bio">{author.bio}</p>
          ) : (
            <p className="author-bio__bio">
              Développeur passionné par le web et la création d'expériences numériques.
              Partagez mes articles, découvrez mes projets et n'hésitez pas à me contacter !
            </p>
          )}
          
          <div>
            <Link 
              href="/contact" 
              className="author-bio__contact-btn"
            >
              Contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}