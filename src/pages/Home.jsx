import React, { useState, useCallback, useEffect } from 'react';
import '../styles/global.css';

import useScrollSnap from '../hooks/useScrollSnap';
import useSectionAnimation from '../hooks/useSectionAnimation';

import DotNav from '../components/DotNav';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ToolsSection from '../components/ToolsSection';
import ShowcaseSection from '../components/ShowcaseSection';

const DARK_SECTIONS = [1, 3];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );

  const SECTION_IDS = isMobile
    ? ['hero', 'about', 'tools', 'showcase']
    : ['hero', 'about', 'tools'];

  /* 화면 크기 변경 감지 */
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleIndexChange = useCallback((idx) => setActiveIndex(idx), []);

  const { containerRef, scrollTo } = useScrollSnap({
    sectionIds: SECTION_IDS,
    onIndexChange: handleIndexChange,
  });

  /* showcase 진입 시 dot 4번 활성화 (데스크탑) */
  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const showcase = document.getElementById('showcase');
      if (!showcase) return;
      const rect = showcase.getBoundingClientRect();
      if (rect.top <= 1) setActiveIndex(3);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  useSectionAnimation();

  return (
    <>
      <DotNav
        activeIndex={activeIndex}
        onDotClick={(i) => {
          if (!isMobile && i === 3) {
            document
              .getElementById('showcase')
              ?.scrollIntoView({ behavior: 'smooth' });
          } else {
            scrollTo(i);
          }
        }}
        darkSections={DARK_SECTIONS}
      />

      <main
        className="scroll-container"
        ref={containerRef}
        tabIndex={0}
        aria-label="포트폴리오 메인"
      >
        <HeroSection />
        <AboutSection />
        <ToolsSection />
        {isMobile && <ShowcaseSection />}
      </main>

      {!isMobile && <ShowcaseSection />}
    </>
  );
}
