'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { end: 500, suffix: '+', label: 'Shipments',   sub: 'Completed'        },
  { end: 50,  suffix: '+', label: 'Countries',   sub: 'Served'           },
  { end: 99,  suffix: '%', label: 'On-Time Rate', sub: 'Delivery Record' },
  { end: 15,  suffix: '+', label: 'Years',        sub: 'Experience'      },
];

export default function Stats() {
  const sectionRef  = useRef<HTMLElement>(null);
  const numRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const rowRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row slides up
      gsap.from(rowRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Counter animations
      STATS.forEach(({ end }, i) => {
        const el = numRefs.current[i];
        if (!el) return;

        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: end,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            el.textContent = Math.round(proxy.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stats" className="stats-section">
      {/* World map SVG background */}
      <div className="stats-map" aria-hidden="true">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Simplified continent outlines in very faint gray */}
          {/* North America */}
          <path d="M180,120 L220,100 L280,110 L320,90 L340,130 L360,140 L350,180 L320,200 L290,240 L260,270 L230,260 L200,280 L180,260 L160,230 L150,190 L160,160 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* Greenland */}
          <path d="M310,60 L350,50 L380,65 L370,90 L340,95 L315,80 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* South America */}
          <path d="M250,300 L290,290 L320,310 L330,360 L320,420 L290,460 L260,450 L240,400 L230,350 L240,310 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* Europe */}
          <path d="M640,100 L680,90 L710,100 L720,120 L700,140 L680,145 L660,130 L640,130 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* Africa */}
          <path d="M640,160 L700,150 L740,170 L760,220 L750,290 L720,340 L690,360 L660,340 L640,290 L630,230 L620,180 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* Asia */}
          <path d="M740,80 L820,70 L920,80 L980,100 L1020,130 L1000,160 L960,170 L900,160 L850,170 L800,160 L760,140 L740,120 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* India */}
          <path d="M860,170 L900,165 L920,200 L900,250 L870,250 L850,210 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* SE Asia */}
          <path d="M960,160 L1000,155 L1020,175 L1010,200 L980,200 L960,185 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* Australia */}
          <path d="M1000,300 L1080,280 L1140,300 L1160,350 L1140,400 L1080,420 L1020,400 L990,360 L990,330 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
          {/* Route dots */}
          <circle cx="220" cy="160" r="3" fill="rgba(8,145,178,0.15)"/>
          <circle cx="700" cy="120" r="3" fill="rgba(8,145,178,0.15)"/>
          <circle cx="900" cy="130" r="3" fill="rgba(8,145,178,0.15)"/>
          <circle cx="1080" cy="340" r="3" fill="rgba(8,145,178,0.15)"/>
          <circle cx="280" cy="370" r="3" fill="rgba(8,145,178,0.15)"/>
          {/* Route arcs */}
          <path d="M220,160 Q460,60 700,120" fill="none" stroke="rgba(8,145,178,0.07)" strokeWidth="1" strokeDasharray="4 6"/>
          <path d="M700,120 Q800,80 900,130" fill="none" stroke="rgba(8,145,178,0.07)" strokeWidth="1" strokeDasharray="4 6"/>
          <path d="M900,130 Q990,220 1080,340" fill="none" stroke="rgba(8,145,178,0.07)" strokeWidth="1" strokeDasharray="4 6"/>
          <path d="M220,160 Q250,270 280,370" fill="none" stroke="rgba(8,145,178,0.07)" strokeWidth="1" strokeDasharray="4 6"/>
        </svg>
      </div>

      {/* Animated gradient orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      {/* Stats row */}
      <div ref={rowRef} className="stats-inner">
        {STATS.map(({ suffix, label, sub }, i) => (
          <div key={label} className="stats-row-item">
            {/* Divider before every item except first */}
            {i > 0 && <div className="stats-divider" />}

            <div className="stat-block">
              <div className="stat-number">
                <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
                <span className="stat-suffix">{suffix}</span>
              </div>
              <p className="stat-label">{label}</p>
              <p className="stat-sub">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .stats-section {
          position: relative;
          background: linear-gradient(135deg, #060810 0%, #0d1117 50%, #080c14 100%);
          padding: 8rem 0;
          overflow: hidden;
          border-top: 1px solid transparent;
          border-image: linear-gradient(90deg, transparent, #0891b2, transparent) 1;
        }

        /* World map */
        .stats-map {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.9;
        }

        .stats-map svg {
          width: 100%;
          height: 100%;
        }

        /* Glow orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: drift 10s ease-in-out infinite alternate;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: rgba(8, 145, 178, 0.06);
          top: -100px;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 320px;
          height: 320px;
          background: rgba(37, 99, 235, 0.06);
          bottom: -80px;
          right: 15%;
          animation-delay: -4s;
        }

        @keyframes drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(30px, 20px); }
        }

        /* Stats row */
        .stats-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-row-item {
          display: flex;
          align-items: center;
          flex: 1;
        }

        /* Vertical divider */
        .stats-divider {
          width: 1px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, #0891b2 40%, #0891b2 60%, transparent);
          flex-shrink: 0;
        }

        /* Stat block */
        .stat-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          text-align: center;
          padding: 0 1.5rem;
        }

        .stat-number {
          display: flex;
          align-items: flex-start;
          font-family: var(--font-bebas), sans-serif;
          font-size: 96px;
          font-weight: 400;
          color: #2563eb;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .stat-suffix {
          font-family: var(--font-bebas), sans-serif;
          font-size: 60px;
          color: #2563eb;
          line-height: 1.2;
        }

        .stat-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .stat-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          color: #475569;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .stats-inner {
            flex-direction: column;
            gap: 0;
            padding: 0 2rem;
          }

          .stats-row-item {
            flex-direction: column;
            width: 100%;
          }

          .stats-divider {
            width: 80px;
            height: 1px;
            background: linear-gradient(to right, transparent, #0891b2, transparent);
            margin: 1.5rem 0;
          }

          .stat-block {
            padding: 0;
          }

          .stats-section {
            padding: 5rem 0;
          }
        }

        @media (max-width: 480px) {
          .stats-inner {
            padding: 0 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
