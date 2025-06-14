import React from 'react';
import { motion } from 'framer-motion';
import './ResultadoErro.css';

export const ResultadoErro = ({ mensagem }) => {
  const dicas = [
    {
      icon: 'bi-1-circle-fill',
      title: 'Verifique o formato',
      description: 'O CEP deve ter exatamente 8 dígitos numéricos',
      example: 'Exemplo: 01234567',
      color: 'primary'
    },
    {
      icon: 'bi-2-circle-fill',
      title: 'Confirme a existência',
      description: 'Certifique-se de que o CEP existe no Brasil',
      example: 'Consulte nos Correios se necessário',
      color: 'warning'
    },
    {
      icon: 'bi-3-circle-fill',
      title: 'Tente novamente',
      description: 'Aguarde alguns instantes e faça uma nova consulta',
      example: 'Pode ser um problema temporário',
      color: 'success'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="resultado-erro-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* HEADER DE ERRO */}
      <motion.div 
        className="error-header"
        variants={shakeVariants}
        animate="shake"
      >
        <div className="error-icon-container">
          <motion.div 
            className="error-icon"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -3, 3, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <i className="bi bi-exclamation-triangle-fill"></i>
          </motion.div>
          <div className="error-pulse"></div>
        </div>
        
        <div className="error-content">
          <h2 className="error-title">
            Ops! Algo deu errado
          </h2>
          <p className="error-subtitle">
            Não foi possível encontrar o endereço solicitado
          </p>
        </div>
      </motion.div>

      {/* MENSAGEM DE ERRO DETALHADA */}
      <motion.div 
        className="error-message-container"
        variants={itemVariants}
      >
        <div className="message-header">
          <i className="bi bi-info-circle-fill text-info"></i>
          <span className="message-label">Detalhes do erro:</span>
        </div>
        <div className="message-content">
          <motion.p 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {mensagem}
          </motion.p>
        </div>
      </motion.div>

      {/* DICAS DE SOLUÇÃO */}
      <motion.div 
        className="solutions-section"
        variants={itemVariants}
      >
        <div className="solutions-header">
          <h3 className="solutions-title">
            <i className="bi bi-lightbulb-fill text-warning me-2"></i>
            Como resolver?
          </h3>
          <p className="solutions-subtitle">
            Siga estas dicas para encontrar o CEP correto
          </p>
        </div>

        <div className="solutions-grid">
          {dicas.map((dica, index) => (
            <motion.div
              key={index}
              className="solution-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                y: -2,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="solution-header">
                <div className={`solution-icon bg-${dica.color}`}>
                  <i className={`bi ${dica.icon}`}></i>
                </div>
                <h4 className="solution-title">{dica.title}</h4>
              </div>
              
              <div className="solution-content">
                <p className="solution-description">
                  {dica.description}
                </p>
                <div className="solution-example">
                  <i className="bi bi-arrow-right-circle text-muted me-2"></i>
                  <span className="example-text">{dica.example}</span>
                </div>
              </div>

              {/* INDICADOR DE ANIMAÇÃO */}
              <motion.div 
                className="solution-indicator"
                animate={{ 
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RECURSOS ADICIONAIS */}
      <motion.div 
        className="additional-resources"
        variants={itemVariants}
      >
        <div className="resources-content">
          
          <div className="resource-item">
            <i className="bi bi-question-circle-fill text-info me-2"></i>
            <span className="resource-text">
              <strong>CEPs comuns:</strong> 01310-100 (Av. Paulista), 20040-020 (Centro RJ)
            </span>
          </div>
          
          <div className="resource-item">
            <i className="bi bi-globe2 text-primary me-2"></i>
            <span className="resource-text">
              <strong>Site oficial:</strong> 
              <a 
                href="https://buscacepinter.correios.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="resource-link"
              >
                Busca CEP - Correios
              </a>
            </span>
          </div>
          
          <div className="resource-item">
            <i className="bi bi-telephone-fill text-success me-2"></i>
            <span className="resource-text">
              <strong>Atendimento:</strong> 3003-0100 (Correios)
            </span>
          </div>
          
        </div>
      </motion.div>

      {/* AÇÕES RÁPIDAS */}
      <motion.div 
        className="error-actions"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <motion.button 
          className="btn btn-outline-primary btn-sm action-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const input = document.getElementById('cepInput');
            if (input) {
              input.focus();
              input.select();
            }
          }}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          Tentar Novamente
        </motion.button>
        
        <motion.button 
          className="btn btn-outline-info btn-sm action-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.open('https://buscacepinter.correios.com.br', '_blank');
          }}
        >
          <i className="bi bi-box-arrow-up-right me-2"></i>
          Buscar nos Correios
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default ResultadoErro;