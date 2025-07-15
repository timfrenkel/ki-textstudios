'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsScrolled(true);
        } else if (currentScrollY < lastScrollY) {
          setIsScrolled(false);
        }
      } else {
        setIsScrolled(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  return (
    <header className={`header${isScrolled && isMobile ? ' header-compact' : ''} ${isScrolled ? 'header-scrolled' : ''}`}>
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
            <span className="nav-link nav-link-disabled">
              Dating
            </span>
            <span className="nav-link nav-link-disabled">
              Bio
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
} 