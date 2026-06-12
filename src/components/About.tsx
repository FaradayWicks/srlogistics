'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '500+', label: 'Shipments' },
  { value: '50+',  label: 'Countries' },
  { value: '99%',  label: 'On Time'   },
];

const TAGS = [
  'Air Freight',
  'Sea Freight',
  'Road Freight',
  'Customs Clearance',
  'Warehousing',
  'Supply Chain',
];

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-inner">

        {/* ── LEFT: Photo ── */}
        <div ref={leftRef} className="about-photo-col">
          <div className="about-glow" />
          <div className="about-photo-wrap">
            <Image
              src="/images/hero-person.jpg"
              alt="Syed Raza — SR Logistics"
              fill
              sizes="(max-width: 900px) 90vw, 45vw"
              className="about-photo-img"
            />
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div ref={rightRef} className="about-content">
          <p className="about-label">✦ About Me ✦</p>

          <h2 className="about-heading">
            15 Years Moving<br />the World's Cargo
          </h2>

          <p className="about-para">
            With over a decade and a half in international freight, I've built
            SR Logistics into a trusted name for air, sea, and road cargo
            solutions. From time-critical air charters to full container loads
            at sea, every shipment receives the same meticulous attention to
            routing, documentation, and compliance.
          </p>

          <p className="about-para">
            My network spans more than 50 countries and hundreds of carrier
            partners — giving clients a single, reliable point of contact for
            complex multi-modal moves. Reliability isn't a promise; it's the
            track record.
          </p>

          {/* Stats row */}
          <div className="about-stats">
            {STATS.map((s, i) => (
              <div key={i} className="about-stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Expertise tags */}
          <div className="about-tags">
            {TAGS.map((tag) => (
              <span key={tag} className="about-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background: #0d1117;
          padding: 8rem 0;
          border-top: 1px solid transparent;
          border-image: linear-gradient(90deg, transparent, #0891b2, transparent) 1;
        }

        .about-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        /* ── Photo column ── */
        .about-photo-col {
          position: relative;
        }

        .about-glow {
          position: absolute;
          inset: -30px;
          background: radial-gradient(ellipse at 30% 50%, rgba(8, 145, 178, 0.18) 0%, transparent 65%);
          filter: blur(24px);
          z-index: 0;
          pointer-events: none;
        }

        .about-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-left: 3px solid #0891b2;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 0 80px 20px rgba(8, 145, 178, 0.2),
                      inset 0 0 0 0 transparent;
        }

        /* Solid bg inside photo frame — no checkerboard */
        .about-photo-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 40% 30%, #1a2035 0%, #0d1117 100%);
        }

        .about-photo-img {
          object-fit: cover;
          object-position: top center;
          position: relative;
          z-index: 1;
        }

        /* ── Content column ── */
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #0891b2;
          text-transform: uppercase;
        }

        .about-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px, 4.5vw, 56px);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: 0.02em;
        }

        .about-para {
          font-family: var(--font-inter), sans-serif;
          font-size: 16px;
          color: #94a3b8;
          line-height: 1.8;
        }

        /* ── Stats ── */
        .about-stats {
          display: flex;
          gap: 2.5rem;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .stat-value {
          font-family: var(--font-bebas), sans-serif;
          font-size: 48px;
          color: #2563eb;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        .stat-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          color: #64748b;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* ── Tags ── */
        .about-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .about-tag {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #94a3b8;
          background: rgba(8, 145, 178, 0.06);
          border: 1px solid rgba(8, 145, 178, 0.35);
          border-radius: 100px;
          padding: 0.4rem 1rem;
          text-transform: uppercase;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .about-tag:hover {
          background: rgba(8, 145, 178, 0.15);
          color: #e2e8f0;
          border-color: #0891b2;
          box-shadow: 0 0 12px rgba(8, 145, 178, 0.35);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 0 2rem;
          }

          .about-photo-wrap {
            aspect-ratio: 4 / 3;
          }

          .about-section {
            padding: 5rem 0;
          }
        }

        @media (max-width: 480px) {
          .about-inner {
            padding: 0 1.5rem;
          }

          .about-stats {
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
