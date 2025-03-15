import React from 'react';
import { TableOfContents as TOC, TOCItem } from '@/interfaces/blog';

interface TableOfContentsProps {
  toc: TOC;
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  return (
    <nav className="table-of-contents">
      <h2 className="table-of-contents__title">Table des matières</h2>
      <ol className="table-of-contents__list">
        {renderTOCItems(toc.items)}
      </ol>
    </nav>
  );
}

function renderTOCItems(items: TOCItem[]) {
  return items.map((item) => (
    <li 
      key={item.id}
      className={`table-of-contents__item table-of-contents__item--h${item.level}`}
    >
      <a 
        href={`#${item.id}`}
        className="table-of-contents__link"
      >
        {item.text}
      </a>
      {item.items && item.items.length > 0 && (
        <ol className="table-of-contents__nested-list">
          {renderTOCItems(item.items)}
        </ol>
      )}
    </li>
  ));
}