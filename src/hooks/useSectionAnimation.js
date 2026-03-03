import { useEffect } from 'react';

/**
 * useSectionAnimation
 * – 섹션 진입 시 .section--visible 클래스 부여 → CSS fade-in + translateY
 * – [data-animate="item"] 자식들은 --delay CSS 변수로 스태거 처리
 */
export default function useSectionAnimation() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* 섹션 자체 옵저버 */
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section--visible');
          } else {
            /* 섹션 벗어나면 리셋 → 재진입 시 다시 애니메이션 */
            entry.target.classList.remove('section--visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    /* [data-animate="item"] 스태거 옵저버 */
    const itemObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('item--visible');
          } else {
            entry.target.classList.remove('item--visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (!prefersReduced) {
      document.querySelectorAll('.section').forEach((sec) => {
        sectionObs.observe(sec);
      });

      document.querySelectorAll('[data-animate="item"]').forEach((el, i) => {
        el.style.setProperty('--delay', `${i * 80}ms`);
        itemObs.observe(el);
      });
    } else {
      /* 모션 감소 환경: 즉시 visible */
      document.querySelectorAll('.section').forEach((s) =>
        s.classList.add('section--visible')
      );
      document.querySelectorAll('[data-animate="item"]').forEach((el) =>
        el.classList.add('item--visible')
      );
    }

    return () => {
      sectionObs.disconnect();
      itemObs.disconnect();
    };
  }, []);
}
