import { useEffect, useRef, useCallback } from 'react';

export default function useScrollSnap({ sectionIds, onIndexChange }) {
  const containerRef = useRef(null);
  const isSnapping = useRef(false);
  const rafRef = useRef(null);
  const prefersReduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  /* 모바일 여부 — 터치 디바이스면 JS 스냅 전부 끔 */
  const isMobile = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  const getActiveIndex = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    const mid = el.scrollTop + el.clientHeight / 2;
    let closest = 0;
    let minDist = Infinity;
    sectionIds.forEach((id, i) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const dist = Math.abs(sec.offsetTop + sec.clientHeight / 2 - mid);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    return closest;
  }, [sectionIds]);

  const scrollTo = useCallback(
    (idx) => {
      const id = sectionIds[idx];
      const sec = id && document.getElementById(id);
      if (!sec) return;
      sec.scrollIntoView({ behavior: prefersReduced.current ? 'auto' : 'smooth' });
    },
    [sectionIds]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* scroll → dot 동기화 (모바일 포함) */
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        onIndexChange?.(getActiveIndex());
      });
    };

    const getShowcaseState = () => {
      const showcase = document.getElementById('showcase');
      if (!showcase) return { inShowcase: false, atTop: false };
      const rect = showcase.getBoundingClientRect();
      return {
        inShowcase: rect.top <= 1,
        atTop: rect.top >= -10,
        showcase,
      };
    };

    /* ── 데스크탑 전용: container wheel ── */
    const onContainerWheel = (e) => {
      if (isMobile()) return;
      if (prefersReduced.current) return;
      if (isSnapping.current) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 4) return;

      const { inShowcase } = getShowcaseState();
      if (inShowcase) return;

      const cur = getActiveIndex();
      const isLastSection = cur === sectionIds.length - 1;

      if (isLastSection && e.deltaY > 0) {
        e.preventDefault();
        const { showcase } = getShowcaseState();
        if (showcase) {
          isSnapping.current = true;
          showcase.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            isSnapping.current = false;
          }, 900);
        }
        return;
      }

      e.preventDefault();
      const next =
        e.deltaY > 0
          ? Math.min(cur + 1, sectionIds.length - 1)
          : Math.max(cur - 1, 0);
      if (next === cur) return;

      isSnapping.current = true;
      scrollTo(next);
      setTimeout(() => {
        isSnapping.current = false;
      }, 900);
    };

    /* ── 데스크탑 전용: window wheel (showcase → tools) ── */
    const onWindowWheel = (e) => {
      if (isMobile()) return;
      if (prefersReduced.current) return;
      if (isSnapping.current) return;
      if (Math.abs(e.deltaY) < 4) return;

      const { inShowcase, atTop } = getShowcaseState();
      if (inShowcase && atTop && e.deltaY < 0) {
        e.preventDefault();
        isSnapping.current = true;
        scrollTo(sectionIds.length - 1);
        setTimeout(() => {
          isSnapping.current = false;
        }, 900);
      }
    };

    /* 키보드 접근성 */
    const onKeyDown = (e) => {
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) return;
      e.preventDefault();

      if (isSnapping.current) return;

      const { inShowcase, atTop } = getShowcaseState();
      const cur = getActiveIndex();

      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        if (inShowcase) return; // showcase 안에서는 자유 스크롤
        if (cur === sectionIds.length - 1) {
          // 마지막 snap 섹션 → showcase로
          const showcase = document.getElementById('showcase');
          if (showcase) {
            isSnapping.current = true;
            showcase.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              isSnapping.current = false;
            }, 900);
          }
        } else {
          isSnapping.current = true;
          scrollTo(Math.min(cur + 1, sectionIds.length - 1));
          setTimeout(() => {
            isSnapping.current = false;
          }, 900);
        }
      }

      if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (inShowcase && atTop) {
          // showcase 최상단 → 마지막 snap 섹션으로
          isSnapping.current = true;
          scrollTo(sectionIds.length - 1);
          setTimeout(() => {
            isSnapping.current = false;
          }, 900);
        } else if (!inShowcase) {
          if (cur === 0) return; // 첫 섹션에서 위로 → 아무것도 안 함
          isSnapping.current = true;
          scrollTo(Math.max(cur - 1, 0));
          setTimeout(() => {
            isSnapping.current = false;
          }, 900);
        }
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onContainerWheel, { passive: false });
    el.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onWindowWheel, { passive: false });

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onContainerWheel);
      el.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWindowWheel);
      cancelAnimationFrame(rafRef.current);
    };
  }, [sectionIds, getActiveIndex, scrollTo, onIndexChange]);

  return { containerRef, scrollTo };
}
