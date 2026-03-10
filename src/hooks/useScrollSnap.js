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
      const inShowcase = rect.top <= 1;
      const atTop = rect.top >= -10;
      return { inShowcase, atTop };
    };

    /* snap 섹션용 wheel */
    const onContainerWheel = (e) => {
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
        const showcase = document.getElementById('showcase');
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

    /* showcase용 wheel — window에서 감지 */
    const onWindowWheel = (e) => {
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

    const onKeyDown = (e) => {
      const cur = getActiveIndex();
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        if (cur === sectionIds.length - 1) {
          document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          scrollTo(Math.min(cur + 1, sectionIds.length - 1));
        }
      }
      if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        scrollTo(Math.max(cur - 1, 0));
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
