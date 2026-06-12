'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Ship, Truck, Warehouse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    Icon: Plane,
    title: 'Air Freight',
    description:
      'Time-critical cargo delivered fast across global routes. We handle charters, express, and consolidated air shipments with full tracking.',
  },
  {
    Icon: Ship,
    title: 'Sea Freight',
    description:
      'Full container loads and LCL shipments across major ocean lanes. Cost-effective solutions backed by a network of trusted carriers.',
  },
  {
    Icon: Truck,
    title: 'Road Freight',
    description:
      'Cross-border and domestic trucking built on reliability. FTL and LTL moves handled end-to-end with real-time visibility.',
  },
  {
    Icon: Warehouse,
    title: 'Warehousing',
    description:
      'Secure, climate-controlled storage integrated with pick, pack, and distribution services — ready to scale with your operation.',
  },
];

export default function Services() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="services-section">
      {/* Header */}
      <div ref={headerRef} className="services-header">
        <p className="services-label">✦ What I Offer ✦</p>
        <h2 className="services-heading">End-to-End Logistics Solutions</h2>
        <p className="services-sub">
          Four core disciplines, one point of contact.
        </p>
      </div>

      {/* Cards grid */}
      <div className="services-grid">
        {SERVICES.map(({ Icon, title, description }, i) => (
          <div
            key={title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="service-card"
          >
            {/* Corner accent */}
            <span className="card-corner" aria-hidden="true" />

            {/* Icon */}
            <div className="card-icon-wrap">
              <Icon size={32} strokeWidth={1.5} color="#0891b2" />
            </div>

            <h3 className="card-title">{title}</h3>
            <p className="card-desc">{description}</p>

            {/* Bottom teal line on hover (CSS only) */}
            <span className="card-underline" aria-hidden="true" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .services-section {
          background: #0a0d12;
          padding: 8rem 0;
          border-top: 1px solid transparent;
          border-image: linear-gradient(90deg, transparent, #0891b2, transparent) 1;
        }

        /* ── Header ── */
        .services-header {
          max-width: 1280px;
          margin: 0 auto 4.5rem;
          padding: 0 4rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .services-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #0891b2;
          text-transform: uppercase;
        }

        .services-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px, 4.5vw, 56px);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.02em;
          line-height: 1;
        }

        .services-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          color: #475569;
          letter-spacing: 0.05em;
        }

        /* ── Grid ── */
        .services-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 4rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        /* ── Card ── */
        .service-card {
          position: relative;
          background: #111827;
          border: 1px solid #1f2937;
          border-radius: 6px;
          padding: 2.5rem;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        /* Subtle top-left corner teal gradient */
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle at top left, rgba(8,145,178,0.07) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .service-card:hover {
          border-color: #0891b2;
          box-shadow: 0 0 40px rgba(8, 145, 178, 0.22), 0 12px 40px rgba(0, 0, 0, 0.5);
          transform: translateY(-8px);
        }

        /* Top-left corner accent — two thin teal lines */
        .card-corner {
          position: absolute;
          top: 0;
          left: 0;
          width: 28px;
          height: 28px;
          border-top: 2px solid #0891b2;
          border-left: 2px solid #0891b2;
          border-radius: 6px 0 0 0;
        }

        /* Bottom underline that grows on hover */
        .card-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #0891b2, #2563eb);
          border-radius: 0 2px 0 0;
          transition: width 0.35s ease;
        }

        .service-card:hover .card-underline {
          width: 100%;
        }

        /* Icon square */
        .card-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background: #1a2035;
          border: 1px solid rgba(8, 145, 178, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: background 0.3s ease, border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        .service-card:hover .card-icon-wrap {
          background: rgba(8, 145, 178, 0.14);
          border-color: #0891b2;
          box-shadow: 0 0 16px rgba(8, 145, 178, 0.25);
        }

        .card-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.04em;
          line-height: 1;
        }

        .card-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          color: #64748b;
          line-height: 1.75;
          flex: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            padding: 0 2rem;
          }

          .services-header {
            padding: 0 2rem;
            margin-bottom: 3rem;
          }

          .services-section {
            padding: 5rem 0;
          }
        }

        @media (max-width: 480px) {
          .services-grid,
          .services-header {
            padding: 0 1.5rem;
          }

          .service-card {
            padding: 2rem 1.75rem;
          }
        }
      `}</style>
    </section>
  );
}
