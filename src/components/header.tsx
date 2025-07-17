'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const ticking = useRef(false);
  const scrollThreshold = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Only update if we've scrolled significantly (50px threshold)
          if (Math.abs(currentScrollY - scrollThreshold.current) > 50) {
            if (currentScrollY > scrollThreshold.current && currentScrollY > 150) {
              // Scrolling down significantly - hide header elements
              setIsScrolled(true);
            } else if (currentScrollY < scrollThreshold.current - 50) {
              // Scrolling up significantly - show header elements
              setIsScrolled(false);
            }
            scrollThreshold.current = currentScrollY;
          }
          
          setLastScrollY(currentScrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header${isScrolled ? ' header-compact' : ''} ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <h1>KI Text Studio <span className="logo-byline">by loopnex</span></h1>
          </Link>
          <div className={`header-badge${isScrolled ? ' header-badge-hidden' : ''}`}>
            <div className="launch-badge">
              🚀 Launch-Angebot • 50% Rabatt • Experten-KI
            </div>
          </div>
          <nav className={`nav${isScrolled ? ' nav-hidden' : ''}`}>
            <Link href="/bewerbung" className="nav-link">
              Bewerbung
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 