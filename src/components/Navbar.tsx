'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  const navRef       = useRef<HTMLElement>(null);
  const menuRef      = useRef<HTMLDivElement>(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Background change on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, []);

  // Mobile menu slide
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (menuOpen) {
      gsap.fromTo(
        el,
        { y: -12, opacity: 0, pointerEvents: 'none' },
        { y: 0, opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(el, {
        y: -8,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [menuOpen]);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          aria-label="SR Logistics — Home"
        >
          <span className="logo-sr">SR</span>
          <span className="logo-text">LOGISTICS</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                className="nav-link"
                onClick={() => handleNavClick(href)}
              >
                {label}
                <span className="nav-link-underline" />
              </button>
            </li>
          ))}
          <li>
            <button
              className="nav-cta"
              onClick={() => handleNavClick('#contact')}
            >
              Get a Quote
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div ref={menuRef} className="mobile-menu" aria-hidden={!menuOpen}>
        {NAV_LINKS.map(({ label, href }) => (
          <button
            key={href}
            className="mobile-link"
            onClick={() => handleNavClick(href)}
            tabIndex={menuOpen ? 0 : -1}
          >
            {label}
          </button>
        ))}
        <button
          className="mobile-cta"
          onClick={() => handleNavClick('#contact')}
          tabIndex={menuOpen ? 0 : -1}
        >
          Get a Quote
        </button>
      </div>

      <style jsx>{`
        /* ── Navbar ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4rem;
          height: 70px;
          background: transparent;
          transition: background 0.35s ease, backdrop-filter 0.35s ease,
                      box-shadow 0.35s ease;
        }

        .navbar.scrolled {
          background: rgba(10, 13, 18, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05),
                      0 4px 24px rgba(0, 0, 0, 0.4);
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-sr {
          font-family: var(--font-bebas), sans-serif;
          font-size: 32px;
          color: #2563eb;
          letter-spacing: 0.04em;
          line-height: 1;
          text-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
        }

        .logo-text {
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          color: #ffffff;
          letter-spacing: 0.18em;
          line-height: 1;
        }

        /* ── Desktop links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
        }

        .nav-link {
          position: relative;
          background: none;
          border: none;
          padding: 0.5rem 0.9rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link-underline {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #0891b2, #2563eb);
          border-radius: 1px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 6px rgba(8, 145, 178, 0.6);
        }

        .nav-link:hover .nav-link-underline {
          width: calc(100% - 1.8rem);
        }

        .nav-cta {
          margin-left: 0.75rem;
          padding: 0.55rem 1.3rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #ffffff;
          background: #2563eb;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .nav-cta:hover {
          background: #1d4ed8;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
          transform: translateY(-1px);
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 101;
        }

        .bar {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #ffffff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open .bar:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hamburger.open .bar:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .hamburger.open .bar:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ── Mobile menu drawer ── */
        .mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          z-index: 99;
          background: rgba(10, 13, 18, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid #1f2937;
          display: none;
          flex-direction: column;
          padding: 1.5rem 2rem 2rem;
          gap: 0.25rem;
          opacity: 0;
          pointer-events: none;
        }

        .mobile-link {
          background: none;
          border: none;
          padding: 0.85rem 0;
          font-family: var(--font-inter), sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #94a3b8;
          cursor: pointer;
          text-align: left;
          border-bottom: 1px solid #1f2937;
          transition: color 0.2s ease;
        }

        .mobile-link:hover {
          color: #ffffff;
        }

        .mobile-cta {
          margin-top: 1rem;
          padding: 0.85rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          background: #2563eb;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-align: center;
          transition: background 0.2s ease;
        }

        .mobile-cta:hover {
          background: #1d4ed8;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .navbar {
            padding: 0 1.5rem;
          }

          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .mobile-menu {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
