'use client';

import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  const services = [
    {
      id: 'bewerbung',
      title: 'Bewerbung',
      subtitle: 'GPT-4 Prompt-Engineering',
      description: 'Advanced AI-optimierte Anschreiben mit modernsten Language Models für maximale ATS-Kompatibilität',
      price: '29€',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
      color: 'blue'
    },
    {
      id: 'dating',
      title: 'Dating-Profil', 
      subtitle: 'Neural Network Optimierung',
      description: 'Psychologisch-fundierte AI-Texte mit Deep Learning Algorithmen für maximale Match-Rate',
      price: '19€',
      image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=600&h=400&fit=crop',
      color: 'pink'
    },
    {
      id: 'bio',
      title: 'Social Media Bio',
      subtitle: 'NLP-Power Texte',
      description: 'State-of-the-art Natural Language Processing für viral-optimierte Personal Branding',
      price: '15€',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      color: 'green'
    }
  ]

  const features = [
    {
      title: 'Enterprise-Grade AI Models',
      description: 'Cutting-edge GPT-4 & Claude Integration mit kontinuierlichen Model-Updates für state-of-the-art Performance',
      icon: '🚀'
    },
    {
      title: 'Advanced Prompt-Engineering',
      description: 'Propriäre Multi-Layer Prompt-Architekturen mit 1000+ Stunden R&D für optimale Output-Qualität',
      icon: '⚡'
    },
    {
      title: 'Machine Learning Personalisierung',
      description: 'Deep Learning Algorithmen analysieren Zielgruppen-Patterns für maßgeschneiderte Content-Optimierung',
      icon: '🎯'
    }
  ]

  useEffect(() => {
    // Apple-style scroll animations with Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          // Optional: Remove animation when scrolling back up for continuous effect
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animateElements = document.querySelectorAll(
      '.scroll-animate, .section-animate, .hero-stagger, .card-animate, .feature-stagger, .newsletter-animate'
    );
    
    animateElements.forEach((el) => observer.observe(el));

    // Hero elements animate on page load
    setTimeout(() => {
      document.querySelectorAll('.hero-stagger').forEach(el => {
        el.classList.add('animate-in');
      });
    }, 100);

    // Cleanup
    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop" 
            alt="KI Text Studio" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-text">
                <div className="tech-badge hero-stagger hero-stagger-1">
                  🚀 Latest: GPT-4 Turbo Integration • Claude 3.5 Sonnet • Kontinuierliche Model-Updates
                </div>
                <h1 className="hero-title hero-stagger hero-stagger-2">KI Text Studio</h1>
                <h2 className="hero-subtitle hero-stagger hero-stagger-3">Advanced AI. Prompt-Engineering Excellence.</h2>
                <p className="hero-description hero-stagger hero-stagger-4">
                  Modernste Large Language Models treffen auf 1000+ Stunden Prompt-Engineering. 
                  GPT-4, Claude & Neural Networks generieren Texte, die Ihre Konkurrenz übertreffen.
                  State-of-the-art Technology für messbare Erfolge.
                </p>
                <div className="hero-buttons hero-stagger hero-stagger-4">
                  <Link href="#services" className="btn-hero-primary">
                    Services Entdecken
                  </Link>
                  <Link href="#wie-es-funktioniert" className="btn-hero-secondary">
                    Wie es funktioniert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section section-padding">
        <div className="container">
          <div className="section-header section-animate">
            <h2>AI-Powered Text Generation Services</h2>
            <p>Enterprise-Level Language Models mit Advanced Prompt-Engineering für jeden Anwendungsbereich</p>
          </div>
          
          <div className="services-grid grid grid-3">
            {services.map((service, index) => (
              <Link 
                key={service.id}
                href={`/${service.id}`} 
                className={`service-card card card-animate scroll-animate-delay-${index + 1}`}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="service-image"
                />
                <div className="service-info">
                  <p className="service-category">KI-Service</p>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                    <span className="service-price">ab {service.price}</span>
                    <span className="service-cta">Jetzt starten →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header section-animate">
            <h2>Cutting-Edge AI Technology Stack</h2>
            <p>Warum unsere Prompt-Engineering Expertise die Konkurrenz übertrifft</p>
          </div>
          
          <div className="features-grid grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className={`feature-item feature-stagger scroll-animate-delay-${index + 1}`}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="wie-es-funktioniert" className="how-it-works-section section-padding">
        <div className="container">
          <div className="section-header section-animate">
            <h2>So funktioniert's</h2>
            <p>Moderne AI-Technologie, einfach für Sie umgesetzt</p>
          </div>
          
          <div className="steps-grid grid grid-3">
            <div className="step-item feature-stagger scroll-animate-delay-1">
              <div className="step-number">1</div>
              <h3>Service auswählen & Daten eingeben</h3>
              <p>Sie wählen Ihren Service und geben Ihre Anforderungen ein. Unsere AI analysiert automatisch alle Details</p>
            </div>
            <div className="step-item feature-stagger scroll-animate-delay-2">
              <div className="step-number">2</div>
              <h3>AI-Generation & Bezahlung</h3>
              <p>Modernste Language Models (GPT-4, Claude) erstellen Ihre optimierten Texte. Sichere Zahlung über Stripe</p>
            </div>
            <div className="step-item feature-stagger scroll-animate-delay-3">
              <div className="step-number">3</div>
              <h3>Perfekte Texte erhalten</h3>
              <p>Sie erhalten Ihre professionell optimierten Texte per E-Mail - sofort einsatzbereit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content newsletter-animate">
            <h2>AI Innovation Updates</h2>
            <p>Exklusive Einblicke in neue Model-Releases, Advanced Prompt-Strategien und Early Access zu Beta-Features</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Ihre E-Mail-Adresse"
                className="newsletter-input"
              />
              <button type="submit" className="btn-primary">
                Anmelden
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 