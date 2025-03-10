'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WallOfReviews from '@/components/WallOfReviews';

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