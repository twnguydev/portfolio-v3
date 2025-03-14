'use client';

import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WallOfReviews from '@/components/wall-of-reviews';

const WallOfReviewsPage = (): JSX.Element => {
  return (
    <div className="layout">
      <Header />
      <WallOfReviews />
      <Footer />
    </div>
  );
};

export default WallOfReviewsPage;