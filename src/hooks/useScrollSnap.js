import { useEffect, useRef, useCallback } from 'react';

/**
 * useScrollSnap
 * – CSS scroll-snap 기반 섹션 전환
 * – 트랙패드 관성 보정 (isSnapping 잠금 900ms)
 * – 현재 섹션 인덱스를 콜백으로 전달
 * – prefers-reduced-motion 자동 감지
 */
export default function useScrollSnap({ sectionIds, onIndexChange }) {
  const containerRef  = useRef(null);
  const isSnapping    = useRef(false);
  const rafRef        = useRef(null);
  const prefersReduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  /* ── 현재 활성 인덱스 계산 ── */
  const getActiveIndex = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    const mid = el.scrollTop + el.clientHeight / 2;
    let closest = 0;
    let minDist  = Infinity;
    sectionIds.forEach((id, i) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const dist = Math.abs(sec.offsetTop + sec.clientHeight / 2 - mid);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }, [sectionIds]);

  /* ── 특정 인덱스로 이동 ── */
  const scrollTo = useCallback((idx) => {
    const id  = sectionIds[idx];
    const sec = id && document.getElementById(id);
    if (!sec) return;
    sec.scrollIntoView({ behavior: prefersReduced.current ? 'auto' : 'smooth' });
  }, [sectionIds]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* scroll → dot 동기화 */
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        onIndexChange?.(getActiveIndex());
      });
    };

    /* wheel 보정 */
    const onWheel = (e) => {
      if (prefersReduced.current) return;
      if (isSnapping.current) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 4) return;

      e.preventDefault();
      const cur  = getActiveIndex();
      const next = e.deltaY > 0
        ? Math.min(cur + 1, sectionIds.length - 1)
        : Math.max(cur - 1, 0);
      if (next === cur) return;

      isSnapping.current = true;
      scrollTo(next);
      setTimeout(() => { isSnapping.current = false; }, 900);
    };

    /* 키보드 접근성 */
    const onKeyDown = (e) => {
      const cur = getActiveIndex();
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        scrollTo(Math.min(cur + 1, sectionIds.length - 1));
      }
      if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        scrollTo(Math.max(cur - 1, 0));
      }
    };

    el.addEventListener('scroll',  onScroll,  { passive: true });
    el.addEventListener('wheel',   onWheel,   { passive: false });
    el.addEventListener('keydown', onKeyDown);

    return () => {
      el.removeEventListener('scroll',  onScroll);
      el.removeEventListener('wheel',   onWheel);
      el.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, [sectionIds, getActiveIndex, scrollTo, onIndexChange]);

  return { containerRef, scrollTo };
}
