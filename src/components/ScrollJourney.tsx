'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollJourney() {
  const [activeSlide, setActiveSlide] = useState(0);

  const wrapperRef  = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);

  // Image layers
  const image1Ref   = useRef<HTMLDivElement>(null);
  const image2Ref   = useRef<HTMLDivElement>(null);
  const image3Ref   = useRef<HTMLDivElement>(null);

  // Text panels
  const text1Ref    = useRef<HTMLDivElement>(null);
  const text2Ref    = useRef<HTMLDivElement>(null);
  const text3Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(image1Ref.current, { opacity: 1 });
      gsap.set(image2Ref.current, { opacity: 0 });
      gsap.set(image3Ref.current, { opacity: 0 });

      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate(self) {
            const p = self.progress;
            if (p < 0.33)       setActiveSlide(0);
            else if (p < 0.66)  setActiveSlide(1);
            else                setActiveSlide(2);
          },
        },
      });

      // Panel 1 fades in immediately
      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.5 }, 0);

      // → Image 2 transition
      tl.to(text1Ref.current,  { opacity: 0,       duration: 0.3 }, 0.8);
      tl.to(image2Ref.current, { opacity: 1,       duration: 0.5 }, 1);
      tl.to(text2Ref.current,  { opacity: 1, y: 0, duration: 0.5 }, 1.2);

      // → Image 3 transition
      tl.to(text2Ref.current,  { opacity: 0,       duration: 0.3 }, 1.8);
      tl.to(image3Ref.current, { opacity: 1,       duration: 0.5 }, 2);
      tl.to(text3Ref.current,  { opacity: 1, y: 0, duration: 0.5 }, 2.2);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} id="scroll-journey" className="sj-wrapper">
      <div ref={stickyRef} className="sj-sticky">

        {/* ── Image layers ── */}
        <div ref={image1Ref} className="sj-layer">
          <Image
            src="/images/carriers.png"
            alt="Air, sea and road carriers"
            fill
            sizes="100vw"
            priority
            className="sj-img"
          />
        </div>

        <div ref={image2Ref} className="sj-layer">
          <Image
            src="/images/unloading.png"
            alt="Night tarmac precision unloading"
            fill
            sizes="100vw"
            className="sj-img"
          />
        </div>

        <div ref={image3Ref} className="sj-layer">
          <Image
            src="/images/warehouse.png"
            alt="Infinite warehouse shelving"
            fill
            sizes="100vw"
            className="sj-img"
          />
        </div>

        {/* ── Dark gradient overlay ── */}
        <div className="sj-overlay" aria-hidden="true" />

        {/* ── Text panels ── */}
        <div className="sj-texts">
          {/* Panel 1 */}
          <div ref={text1Ref} className="sj-panel">
            <p className="sj-counter">01 / 03</p>
            <h2 className="sj-heading">AIR · SEA · ROAD</h2>
            <div className="sj-rule" />
            <p className="sj-sub">Global Multi-Modal Freight</p>
          </div>

          {/* Panel 2 */}
          <div ref={text2Ref} className="sj-panel">
            <p className="sj-counter">02 / 03</p>
            <h2 className="sj-heading">PRECISION HANDLING</h2>
            <div className="sj-rule" />
            <p className="sj-sub">Expert Ground Operations</p>
          </div>

          {/* Panel 3 */}
          <div ref={text3Ref} className="sj-panel">
            <p className="sj-counter">03 / 03</p>
            <h2 className="sj-heading">SECURE STORAGE</h2>
            <div className="sj-rule" />
            <p className="sj-sub">State of the Art Warehousing</p>
          </div>
        </div>

        {/* ── Progress dots ── */}
        <div className="sj-dots" role="presentation" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`sj-dot${activeSlide === i ? ' active' : ''}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Outer wrapper: 400vh scroll room ── */
        .sj-wrapper {
          position: relative;
          height: 400vh;
          background: #0a0d12;
        }

        /* ── Sticky viewport lock ── */
        .sj-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        /* ── Image layers ── */
        .sj-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .sj-img {
          object-fit: cover;
          object-position: center;
        }

        /* z-index stack */
        .sj-layer:nth-child(1) { z-index: 1; }
        .sj-layer:nth-child(2) { z-index: 2; }
        .sj-layer:nth-child(3) { z-index: 3; }

        /* ── Dark gradient overlay ── */
        .sj-overlay {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.5) 100%
          );
        }

        /* ── Text panels container ── */
        .sj-texts {
          position: absolute;
          inset: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Each panel is absolutely stacked at center */
        .sj-panel {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.1rem;
          padding: 0 2rem;
          will-change: opacity, transform;
        }

        .sj-counter {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.4em;
          color: #0891b2;
          text-transform: uppercase;
        }

        .sj-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(56px, 9vw, 120px);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.05em;
          line-height: 1;
          text-shadow:
            0 2px 40px rgba(0, 0, 0, 0.7),
            0 0 80px rgba(8, 145, 178, 0.15);
        }

        .sj-rule {
          width: 64px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0891b2, transparent);
          border-radius: 1px;
        }

        .sj-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 20px;
          font-weight: 400;
          color: #94a3b8;
          letter-spacing: 0.08em;
        }

        /* ── Progress dots ── */
        .sj-dots {
          position: absolute;
          right: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .sj-dot {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.45);
          background: transparent;
          transition: background 0.35s ease, border-color 0.35s ease,
                      transform 0.35s ease;
        }

        .sj-dot.active {
          background: #0891b2;
          border-color: #0891b2;
          transform: scale(1.35);
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .sj-dots {
            right: 1.2rem;
          }

          .sj-sub {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
