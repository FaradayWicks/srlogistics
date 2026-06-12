'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'syed@srlogistics.com',
    href: 'mailto:syed@srlogistics.com',
    teal: true,
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+1 (555) 000-0000',
    href: 'tel:+15550000000',
    teal: false,
  },
  {
    Icon: Globe,
    label: 'LinkedIn',
    value: 'linkedin.com/in/syedraza',
    href: 'https://linkedin.com/in/syedraza',
    teal: false,
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: 'Dubai, United Arab Emirates',
    href: null,
    teal: false,
  },
];

const SERVICE_OPTIONS = [
  'Air Freight',
  'Sea Freight',
  'Road Freight',
  'Warehousing',
  'Other',
];

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(rightRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.9,
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-inner">

        {/* ── LEFT ── */}
        <div ref={leftRef} className="contact-left">
          <p className="contact-label">✦ Get In Touch ✦</p>

          <h2 className="contact-heading">
            LET'S WORK<br />TOGETHER
          </h2>

          <p className="contact-pitch">
            Have cargo to move? Let's talk.
          </p>

          <ul className="contact-list">
            {CONTACT_ITEMS.map(({ Icon, label, value, href, teal }) => (
              <li key={label} className="contact-item">
                <div className="contact-icon-wrap">
                  <Icon size={18} strokeWidth={1.6} color="#0891b2" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      className={`contact-item-value${teal ? ' teal' : ''}`}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="contact-item-value">{value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: Form ── */}
        <div ref={rightRef} className="contact-right">
          {submitted ? (
            <div className="form-success">
              <span className="success-icon">✦</span>
              <h3 className="success-heading">Message Sent</h3>
              <p className="success-text">
                Thanks for reaching out. We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Syed Raza"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="service" className="form-label">Service Type</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your shipment — origin, destination, volume, timeline…"
                  value={form.message}
                  onChange={handleChange}
                  className="form-input form-textarea"
                />
              </div>

              <button type="submit" className="form-submit">
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="footer-divider" />
        <p className="footer-copy">
          © 2025 SR Logistics. All Rights Reserved.
        </p>
      </footer>

      <style jsx>{`
        .contact-section {
          background: #0d1117;
          padding: 8rem 0 0;
          border-top: 1px solid transparent;
          border-image: linear-gradient(90deg, transparent, #0891b2, transparent) 1;
        }

        .contact-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 4rem;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 6rem;
          align-items: start;
          padding-bottom: 6rem;
        }

        /* ── LEFT ── */
        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .contact-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #0891b2;
          text-transform: uppercase;
        }

        .contact-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px, 4.5vw, 56px);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.02;
          letter-spacing: 0.02em;
        }

        .contact-pitch {
          font-family: var(--font-inter), sans-serif;
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
        }

        .contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-top: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(8, 145, 178, 0.08);
          border: 1px solid rgba(8, 145, 178, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-item-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .contact-item-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #475569;
          text-transform: uppercase;
        }

        .contact-item-value {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .contact-item-value.teal {
          color: #0891b2;
        }

        a.contact-item-value:hover {
          color: #ffffff;
        }

        /* ── Form ── */
        .contact-right {
          background: rgba(17, 24, 39, 0.6);
          border: 1px solid #1f2937;
          border-radius: 8px;
          padding: 2.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #64748b;
          text-transform: uppercase;
        }

        .form-input {
          background: #111827;
          border: 1px solid #1f2937;
          border-bottom: 2px solid #1f2937;
          border-radius: 6px;
          padding: 0.8rem 1rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          width: 100%;
          transition: border-color 0.25s ease, border-bottom-color 0.25s ease,
                      box-shadow 0.25s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .form-input::placeholder {
          color: #374151;
        }

        .form-input:focus {
          border-color: #1f2937;
          border-bottom-color: #0891b2;
          box-shadow: 0 2px 0 0 rgba(8, 145, 178, 0.15),
                      0 0 0 3px rgba(8, 145, 178, 0.08);
        }

        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23475569' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .form-select option {
          background: #111827;
          color: #ffffff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 130px;
        }

        .form-submit {
          margin-top: 0.5rem;
          width: 100%;
          padding: 1rem;
          font-family: var(--font-bebas), sans-serif;
          font-size: 20px;
          letter-spacing: 0.1em;
          color: #ffffff;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1d4ed8 100%);
          background-size: 200% auto;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-position 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }

        .form-submit:hover {
          background-position: right center;
          box-shadow: 0 0 32px rgba(37, 99, 235, 0.55),
                      0 8px 24px rgba(37, 99, 235, 0.35);
          transform: translateY(-2px) scale(1.01);
        }

        .form-submit:active {
          transform: translateY(0) scale(1);
        }

        /* Success state */
        .form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
          padding: 4rem 2rem;
        }

        .success-icon {
          font-size: 2rem;
          color: #0891b2;
        }

        .success-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: 36px;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        .success-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          color: #64748b;
          max-width: 280px;
          line-height: 1.6;
        }

        /* ── Footer ── */
        .contact-footer {
          border-top: 1px solid #1f2937;
          padding: 2rem 4rem;
          text-align: center;
        }

        .footer-divider {
          display: none;
        }

        .footer-copy {
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          color: #374151;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .contact-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 0 2rem 4rem;
          }

          .contact-section {
            padding-top: 5rem;
          }
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-right {
            padding: 1.75rem;
          }

          .contact-inner,
          .contact-footer {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
