'use client';

import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import ProjectSection from '@/components/projects/Section';
import ProgressionSection from '@/components/ProgressionSection';
import AdvantageSection from '@/components/AdvantageSection';
import TechStackSection from '@/components/TechStackSection';
import ContactSection from '@/components/ContactSection';
import TerminalSection from '@/components/TerminalSection';
import Footer from '@/components/Footer';

const Portfolio = (): JSX.Element => {
  return (
    <div className="layout">
      <Header />
      <HeroSection />
      <AboutSection />
      {/* <StatsSection /> */}
      <ProjectSection />
      <ProgressionSection />
      <AdvantageSection />
      <TechStackSection />
      <ContactSection />
      <TerminalSection />
      <Footer />
    </div>
  );
};

export default Portfolio;