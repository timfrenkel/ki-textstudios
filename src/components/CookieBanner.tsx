'use client';

import React, { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
    setShowBanner(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Here you would typically also set actual cookies based on preferences
    if (prefs.analytics) {
      // Enable Google Analytics, etc.
      console.log('Analytics cookies enabled');
    }
    if (prefs.marketing) {
      // Enable marketing cookies
      console.log('Marketing cookies enabled');
    }
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const updatePreference = (type: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        {!showSettings ? (
          <>
            <div className="cookie-header">
              <h3>🍪 Cookie-Einstellungen</h3>
              <p>
                Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
                Einige Cookies sind für die Funktionalität der Website erforderlich, andere helfen uns, 
                die Website zu optimieren und Ihnen relevante Inhalte anzuzeigen.
              </p>
            </div>
            
            <div className="cookie-actions">
              <button 
                onClick={acceptNecessary}
                className="btn-cookie btn-cookie-necessary"
              >
                Nur notwendige Cookies
              </button>
              <button 
                onClick={acceptAll}
                className="btn-cookie btn-cookie-all"
              >
                Alle Cookies akzeptieren
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="btn-cookie btn-cookie-settings"
              >
                Einstellungen anpassen
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-header">
              <h3>⚙️ Cookie-Einstellungen anpassen</h3>
              <p>
                Wählen Sie aus, welche Cookies Sie akzeptieren möchten. 
                Notwendige Cookies sind immer aktiviert, da sie für die Grundfunktionen der Website erforderlich sind.
              </p>
            </div>
            
            <div className="cookie-settings">
              <div className="cookie-setting">
                <div className="cookie-setting-header">
                  <label className="cookie-setting-label">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="cookie-checkbox"
                    />
                    <span className="cookie-setting-title">Notwendige Cookies</span>
                  </label>
                  <span className="cookie-setting-status">Immer aktiv</span>
                </div>
                <p className="cookie-setting-description">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                </p>
              </div>

              <div className="cookie-setting">
                <div className="cookie-setting-header">
                  <label className="cookie-setting-label">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="cookie-checkbox"
                    />
                    <span className="cookie-setting-title">Analyse-Cookies</span>
                  </label>
                </div>
                <p className="cookie-setting-description">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, 
                  indem sie Informationen anonym sammeln und melden.
                </p>
              </div>

              <div className="cookie-setting">
                <div className="cookie-setting-header">
                  <label className="cookie-setting-label">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference('marketing', e.target.checked)}
                      className="cookie-checkbox"
                    />
                    <span className="cookie-setting-title">Marketing-Cookies</span>
                  </label>
                </div>
                <p className="cookie-setting-description">
                  Diese Cookies werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen bereitzustellen.
                </p>
              </div>
            </div>

            <div className="cookie-actions">
              <button 
                onClick={() => setShowSettings(false)}
                className="btn-cookie btn-cookie-back"
              >
                Zurück
              </button>
              <button 
                onClick={handleSaveSettings}
                className="btn-cookie btn-cookie-save"
              >
                Einstellungen speichern
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 