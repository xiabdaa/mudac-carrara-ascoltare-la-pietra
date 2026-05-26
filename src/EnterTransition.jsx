import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EnterTransition({ active, onComplete }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!active || !overlayRef.current) return undefined;

    let completed = false;
    const complete = () => {
      if (completed) return;
      completed = true;
      onComplete();
    };

    const fallback = window.setTimeout(complete, 2600);
    const timeline = gsap.timeline({ onComplete: complete });
    timeline
      .set(overlayRef.current, { autoAlpha: 0 })
      .to(overlayRef.current, {
        autoAlpha: 1,
        duration: 1.08,
        delay: 0.86,
        ease: "power2.inOut"
      })
      .to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.18
      });

    return () => {
      window.clearTimeout(fallback);
      timeline.kill();
    };
  }, [active, onComplete]);

  return <div ref={overlayRef} className="enter-transition" aria-hidden="true" />;
}
