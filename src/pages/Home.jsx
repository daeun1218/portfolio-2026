import React, { useState, useCallback, useEffect } from 'react';
import '../styles/global.css';

import useScrollSnap from '../hooks/useScrollSnap';
import useSectionAnimation from '../hooks/useSectionAnimation';

import DotNav from '../components/DotNav';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ToolsSection from '../components/ToolsSection';
import ShowcaseSection from '../components/ShowcaseSection';

const SECTION_IDS_MOBILE = ['hero', 'about', 'about-exp', 'tools', 'showcase'];
const SECTION_IDS_DESKTOP = ['hero', 'about', 'about-exp', 'tools'];

const DARK_SECTIONS = [1, 2, 4]; /* about, about-exp, showcase */

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );

  const SECTION_IDS = isMobile ? SECTION_IDS_MOBILE : SECTION_IDS_DESKTOP;

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

  /* 데스크탑: showcase 진입/이탈 시 dot 동기화 */
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      const showcase = document.getElementById('showcase');
      if (!showcase) return;
      const rect = showcase.getBoundingClientRect();

      if (rect.top <= 1) {
        // showcase 진입
        setActiveIndex(4);
      } else {
        // showcase 벗어남 → scroll-container 기준으로 현재 섹션 계산
        const sections = SECTION_IDS_DESKTOP.map((id) => document.getElementById(id));
        const container = document.querySelector('.scroll-container');
        if (!container) return;
        const mid = container.scrollTop + container.clientHeight / 2;
        let closest = 0;
        let minDist = Infinity;
        sections.forEach((sec, i) => {
          if (!sec) return;
          const dist = Math.abs(sec.offsetTop + sec.clientHeight / 2 - mid);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
      }
    };

    const container = document.querySelector('.scroll-container');
    window.addEventListener('scroll', onScroll, { passive: true });
    container?.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      container?.removeEventListener('scroll', onScroll);
    };
  }, [isMobile]);

  useSectionAnimation();

  return (
    <>
      <DotNav
        activeIndex={activeIndex}
        onDotClick={(i) => {
          if (!isMobile && i === 4) {
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
