'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

type Particle = {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function makeParticles(): Particle[] {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 1.8 + 0.5,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.5 + 0.1,
  }));
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const containerRef  = useRef<HTMLElement>(null);
  const tagRef        = useRef<HTMLParagraphElement>(null);
  const nameRef       = useRef<HTMLHeadingElement>(null);
  const subNameRef    = useRef<HTMLHeadingElement>(null);
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const btnsRef       = useRef<HTMLDivElement>(null);
  const photoRef      = useRef<HTMLDivElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setParticles(makeParticles());
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(tagRef.current,     { y: 30, opacity: 0, duration: 0.7 })
        .from(nameRef.current,    { y: 50, opacity: 0, duration: 0.8 }, '-=0.4')
        .from(subNameRef.current, { y: 50, opacity: 0, duration: 0.8 }, '-=0.45')
        .from(taglineRef.current, { y: 25, opacity: 0, duration: 0.6 }, '-=0.35')
        .from(btnsRef.current,    { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from(photoRef.current,   { x: 70, opacity: 0, duration: 1,   ease: 'power2.out' }, '-=0.85')
        .from(scrollRef.current,  { opacity: 0, duration: 0.5 }, '-=0.1');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="hero-section">

      {/* Animated gradient background */}
      <div className="hero-bg" aria-hidden="true" />

      {/* Grid lines */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Star particles — client-only */}
      <div className="stars" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="star"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="hero-inner">

        {/* LEFT: Typography */}
        <div className="hero-text">
          <p ref={tagRef} className="hero-tag">
            ✦ GLOBAL LOGISTICS EXPERT ✦
          </p>

          <h1 ref={nameRef} className="hero-name">
            SYED RAZA
          </h1>

          <h2 ref={subNameRef} className="hero-subname">
            SR LOGISTICS
          </h2>

          <p ref={taglineRef} className="hero-tagline">
            Moving cargo across air, sea and road with<br className="br-desktop" /> precision and reliability.
          </p>

          <div ref={btnsRef} className="hero-btns">
            <a href="#services" className="btn-primary">View My Work</a>
            <a href="#contact"  className="btn-outline">Contact Me</a>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div ref={photoRef} className="hero-photo-outer">
          {/* Teal glow behind */}
          <div className="hero-photo-glow" aria-hidden="true" />

          {/* Solid-background frame — kills any transparency */}
          <div className="hero-photo-frame">
            <div className="hero-photo-bg" aria-hidden="true" />
            <Image
              src="/images/hero-person.jpg"
              alt="Syed Raza — SR Logistics"
              fill
              priority
              className="hero-photo-img"
            />
          </div>

          {/* Corner accent lines */}
          <span className="corner corner-tl" aria-hidden="true" />
          <span className="corner corner-br" aria-hidden="true" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="scroll-indicator">
        <span className="scroll-label">SCROLL TO EXPLORE</span>
        <div className="scroll-chevron" aria-hidden="true">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M1 1l10 11L21 1" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <style jsx>{`
        /* ── Section ── */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: #0a0d12;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ── Animated gradient bg ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #0a0d12;
          animation: bgShift 10s ease-in-out infinite alternate;
        }

        @keyframes bgShift {
          0%   { background: #0a0d12; }
          50%  { background: #091520; }
          100% { background: #0d1a2e; }
        }

        /* ── Grid overlay ── */
        .grid-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image:
            linear-gradient(rgba(8, 145, 178, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8, 145, 178, 0.035) 1px, transparent 1px);
          background-size: 90px 90px;
          pointer-events: none;
        }

        /* ── Stars ── */
        .stars {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: #ffffff;
          animation: starPulse infinite ease-in-out alternate;
        }

        @keyframes starPulse {
          0%   { transform: scale(1);   opacity: inherit; }
          100% { transform: scale(1.8); opacity: 0.05; }
        }

        /* ── Inner layout ── */
        .hero-inner {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 6rem 5rem 2rem;
        }

        /* ── Left text ── */
        .hero-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          max-width: 640px;
        }

        .hero-tag {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.35em;
          color: #0891b2;
          text-transform: uppercase;
        }

        .hero-name {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(72px, 9vw, 120px);
          font-weight: 400;
          line-height: 0.92;
          color: #ffffff;
          letter-spacing: 0.02em;
        }

        .hero-subname {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(52px, 7vw, 100px);
          font-weight: 400;
          line-height: 0.95;
          color: #2563eb;
          letter-spacing: 0.04em;
        }

        .hero-tagline {
          font-family: var(--font-inter), sans-serif;
          font-size: 20px;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 460px;
        }

        .br-desktop { display: inline; }

        /* ── Buttons ── */
        .hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.75rem;
        }

        .btn-primary,
        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 40px;
          font-family: var(--font-bebas), sans-serif;
          font-size: 18px;
          letter-spacing: 0.12em;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.25s ease, color 0.25s ease,
                      border-color 0.25s ease, box-shadow 0.25s ease,
                      transform 0.2s ease;
          cursor: pointer;
          line-height: 1;
        }

        .btn-primary {
          background: #2563eb;
          color: #ffffff;
          border: 2px solid #2563eb;
        }

        .btn-primary:hover {
          background: #3b82f6;
          border-color: #3b82f6;
          box-shadow: 0 0 28px rgba(37, 99, 235, 0.6), 0 6px 20px rgba(37, 99, 235, 0.4);
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
        }

        .btn-outline:hover {
          background: #ffffff;
          color: #0a0d12;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
        }

        /* ── Right photo ── */
        .hero-photo-outer {
          position: relative;
          flex-shrink: 0;
          width: clamp(300px, 32vw, 460px);
          aspect-ratio: 3 / 4;
        }

        /* Teal glow behind the frame */
        .hero-photo-glow {
          position: absolute;
          inset: -20px;
          z-index: 0;
          border-radius: 4px;
          background: radial-gradient(ellipse at center, rgba(8, 145, 178, 0.35) 0%, transparent 68%);
          filter: blur(30px);
          animation: glowPulse 4s ease-in-out infinite alternate;
        }

        @keyframes glowPulse {
          from { opacity: 0.7; transform: scale(0.97); }
          to   { opacity: 1;   transform: scale(1.03); }
        }

        /* Frame with clip path */
        .hero-photo-frame {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
          clip-path: polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%);
          box-shadow: 0 0 80px 20px rgba(8, 145, 178, 0.3);
          overflow: hidden;
        }

        /* Solid background inside frame — eliminates checkerboard */
        .hero-photo-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 40% 30%, #1a2035 0%, #0d1117 60%, #0a0d12 100%);
        }

        .hero-photo-img {
          position: relative;
          z-index: 1;
          object-fit: cover;
          object-position: top center;
        }

        /* Corner accent lines */
        .corner {
          position: absolute;
          z-index: 2;
          width: 36px;
          height: 36px;
          pointer-events: none;
        }

        .corner-tl {
          top: -2px;
          left: -2px;
          border-top: 2px solid #0891b2;
          border-left: 2px solid #0891b2;
        }

        .corner-br {
          bottom: -2px;
          right: -2px;
          border-bottom: 2px solid #0891b2;
          border-right: 2px solid #0891b2;
        }

        /* ── Scroll indicator ── */
        .scroll-indicator {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding-bottom: 2.5rem;
        }

        .scroll-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #0891b2;
          text-transform: uppercase;
        }

        .scroll-chevron {
          animation: chevronBounce 1.5s ease-in-out infinite;
        }

        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0);   opacity: 1;    }
          50%       { transform: translateY(7px); opacity: 0.55; }
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .hero-inner {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
            padding: 5rem 2.5rem 2rem;
            gap: 3rem;
          }

          .hero-text {
            align-items: center;
            max-width: 100%;
          }

          .hero-tagline {
            max-width: 100%;
          }

          .br-desktop { display: none; }

          .hero-photo-outer {
            width: clamp(220px, 60vw, 340px);
          }
        }

        @media (max-width: 480px) {
          .hero-inner {
            padding: 4.5rem 1.5rem 1.5rem;
          }

          .btn-primary,
          .btn-outline {
            padding: 14px 28px;
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
