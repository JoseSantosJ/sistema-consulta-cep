import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determina se deve shrink (diminuir)
      setIsScrolled(currentScrollY > 50);
      
      // Determina se deve esconder/mostrar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Rolando para baixo - esconde
        setIsVisible(false);
      } else {
        // Rolando para cima - mostra
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.header 
      className={`main-header ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="header-container">
        <div className="container-fluid">
          <div className="row align-items-center">
            
            {/* VERSÃO COMPACTA - Quando scrolled */}
            {isScrolled ? (
              <div className="col-12">
                <motion.div 
                  className="header-compact"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="compact-brand">
                    <div className="compact-icon">
                      <i className="bi bi-mortarboard-fill"></i>
                    </div>
                    <div className="compact-info">
                      <span className="compact-title">A3 - Usabilidade & Desenvolvimento Web</span>
                      <span className="compact-author">José Antonio Santos Oliveira Junior</span>
                    </div>
                  </div>
                  
                  <div className="compact-actions">
                    <button 
                      className="btn btn-outline-primary btn-sm scroll-to-top"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <i className="bi bi-arrow-up"></i>
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* VERSÃO COMPLETA - Quando no topo */
              <>
                <div className="col-lg-7 col-md-12">
                  <motion.div 
                    className="header-brand"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="brand-icon">
                      <i className="bi bi-mortarboard-fill"></i>
                    </div>
                    <div className="brand-content">
                      <h1 className="brand-title">
                        A3 - Usabilidade & Desenvolvimento Web Mobile e Jogos
                      </h1>
                      <div className="brand-subtitle">
                        <span className="subtitle-label">consulta de endereço por CEP utilizando a API pública do ViaCEP</span>
                        <span className="subtitle-year">2025</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="col-lg-5 col-md-12">
                  <motion.div 
                    className="developer-info"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="developer-avatar">
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <div className="developer-details">
                      <h2 className="developer-name">
                        José Antonio Santos Oliveira Junior
                      </h2>
                      <div className="developer-meta">
                        <span className="meta-item">
                          <i className="bi bi-code-slash me-1"></i>
                          Desenvolvedor
                        </span>
                        <span className="meta-divider">•</span>
                        <span className="meta-item">
                          <i className="bi bi-calendar-event me-1"></i>
                          Junho 2025
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      {/* LINHA DECORATIVA ANIMADA */}
      <motion.div 
        className="header-decoration"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
    </motion.header>
  );
};

export default Header;