import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

export function initLenis(): () => void {
  if (lenis) return () => {};
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  const loop = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(rafId);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string) {
  if (lenis) {
    lenis.scrollTo(id, { offset: -72, duration: 1.4 });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
}
