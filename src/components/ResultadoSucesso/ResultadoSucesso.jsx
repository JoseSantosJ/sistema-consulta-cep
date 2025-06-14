import React from 'react';
import { motion } from 'framer-motion';
import './ResultadoSucesso.css';

export const ResultadoSucesso = ({ dados }) => {
  const campos = [
    { 
      label: 'CEP', 
      value: dados.cep, 
      icon: 'bi-mailbox-fill', 
      color: 'primary',
      highlight: true
    },
    { 
      label: 'Logradouro', 
      value: dados.logradouro || 'Não informado', 
      icon: 'bi-house-door-fill', 
      color: 'info'
    },
    { 
      label: 'Bairro', 
      value: dados.bairro || 'Não informado', 
      icon: 'bi-buildings-fill', 
      color: 'secondary'
    },
    { 
      label: 'Cidade', 
      value: dados.localidade || 'Não informado', 
      icon: 'bi-geo-alt-fill', 
      color: 'success'
    },
    { 
      label: 'Estado', 
      value: dados.uf || 'Não informado', 
      icon: 'bi-flag-fill', 
      color: 'warning'
    },
    ...(dados.complemento ? [{ 
      label: 'Complemento', 
      value: dados.complemento, 
      icon: 'bi-info-circle-fill', 
      color: 'info'
    }] : []),
    ...(dados.ibge ? [{ 
      label: 'Código IBGE', 
      value: dados.ibge, 
      icon: 'bi-qr-code', 
      color: 'dark'
    }] : [])
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="resultado-sucesso-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* HEADER DE SUCESSO */}
      <motion.div 
        className="success-header"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        <div className="success-icon-container">
          <motion.div 
            className="success-icon"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <i className="bi bi-check-circle-fill"></i>
          </motion.div>
          <div className="success-pulse"></div>
        </div>
        
        <div className="success-content">
          <h2 className="success-title">
            Endereço Encontrado!
          </h2>
          <p className="success-subtitle">
            Informações verificadas e atualizadas dos Correios
          </p>
        </div>
      </motion.div>

      {/* CARDS DE INFORMAÇÕES */}
      <div className="info-grid">
        {campos.map((campo, index) => (
          <motion.div
            key={index}
            className={`info-card ${campo.highlight ? 'highlight' : ''}`}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              y: -2,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="card-header">
              <div className={`card-icon bg-${campo.color}`}>
                <i className={`bi ${campo.icon}`}></i>
              </div>
              <span className="card-label">{campo.label}</span>
            </div>
            
            <div className="card-content">
              {campo.highlight ? (
                <motion.code 
                  className="cep-value"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {campo.value}
                </motion.code>
              ) : (
                <motion.span 
                  className="info-value"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {campo.value}
                </motion.span>
              )}
            </div>

            {/* INDICADOR DE ANIMAÇÃO */}
            <motion.div 
              className="card-indicator"
              animate={{ 
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* FOOTER DE VERIFICAÇÃO */}
      <motion.div 
        className="verification-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <div className="verification-content">
          <div className="verification-badge">
            <i className="bi bi-shield-check-fill text-success me-2"></i>
            <span className="badge-text">Dados Verificados</span>
          </div>
          
          <div className="api-attribution">
            <i className="bi bi-cloud-check-fill text-info me-2"></i>
            <span className="attribution-text">
              Fonte: <strong>ViaCEP API</strong> - Correios do Brasil
            </span>
          </div>
          
          <div className="timestamp">
            <i className="bi bi-clock-fill text-secondary me-2"></i>
            <span className="time-text">
              Consultado em {new Date().toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </motion.div>

      {/* AÇÕES RÁPIDAS */}
      <motion.div 
        className="quick-actions"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <motion.button 
          className="btn btn-outline-primary btn-sm action-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const endereco = `${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}, ${dados.cep}`;
            navigator.clipboard.writeText(endereco);
          }}
        >
          <i className="bi bi-clipboard me-2"></i>
          Copiar Endereço
        </motion.button>
        
        <motion.button 
          className="btn btn-outline-success btn-sm action-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}`)}`;
            window.open(mapsUrl, '_blank');
          }}
        >
          <i className="bi bi-geo-alt me-2"></i>
          Ver no Mapa
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default ResultadoSucesso;