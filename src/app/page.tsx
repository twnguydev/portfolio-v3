'use client';

import React from 'react';
import Header from '@/components/layout/header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ProjectSection from '@/components/projects/section';
import ProgressionSection from '@/components/progression-section';
import AdvantageSection from '@/components/advantage-section';
import TechStackSection from '@/components/tech-stack-section';
import ContactSection from '@/components/contact-section';
import TerminalSection from '@/components/terminal-section';
import Footer from '@/components/layout/footer';

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