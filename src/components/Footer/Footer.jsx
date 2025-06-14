import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

export const Footer = () => (
  <motion.footer 
    className="main-footer"
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.8 }}
  >
    <div className="footer-container">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          
          {/* INFORMAÇÕES DO ESTUDANTE CENTRALIZADAS */}
          <div className="col-12">
            <motion.div 
              className="student-info-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className="student-avatar">
                <i className="bi bi-person-badge-fill"></i>
              </div>
              <div className="student-details">
                <h3 className="student-name">
                  José Antonio Santos Oliveira Junior
                </h3>
                <div className="student-meta">
                  <span className="meta-item">
                    <i className="bi bi-credit-card me-2"></i>
                    RA: <span className="ra-code">1292315106</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;