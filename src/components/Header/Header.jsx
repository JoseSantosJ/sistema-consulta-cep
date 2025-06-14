import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

export const Header = () => (
  <motion.header 
    className="main-header"
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="header-container">
      <div className="container-fluid">
        <div className="row align-items-center">
          
          {/* LADO ESQUERDO - LOGO E TÍTULO */}
          <div className="col-lg-6 col-md-12">
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

          {/* LADO DIREITO - INFORMAÇÕES DO DESENVOLVEDOR */}
          <div className="col-lg-6 col-md-12">
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

export default Header;