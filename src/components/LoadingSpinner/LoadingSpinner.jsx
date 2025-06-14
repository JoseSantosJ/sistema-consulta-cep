import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

export const LoadingSpinner = ({ message = "Consultando CEP..." }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { 
      icon: 'bi-search', 
      text: 'Iniciando busca...', 
      color: 'primary',
      duration: 800
    },
    { 
      icon: 'bi-cloud-arrow-down', 
      text: 'Conectando com ViaCEP...', 
      color: 'info',
      duration: 1200
    },
    { 
      icon: 'bi-database', 
      text: 'Consultando base de dados...', 
      color: 'warning',
      duration: 1000
    },
    { 
      icon: 'bi-check-circle', 
      text: 'Finalizando consulta...', 
      color: 'success',
      duration: 600
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingStep < steps.length - 1) {
        setLoadingStep(prev => prev + 1);
      }
    }, steps[loadingStep]?.duration || 1000);

    return () => clearTimeout(timer);
  }, [loadingStep, steps]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="loading-container-enhanced"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      
      {/* HEADER DE LOADING */}
      <motion.div 
        className="loading-header"
        variants={itemVariants}
      >
        <div className="loading-icon-container">
          
          {/* SPINNER PRINCIPAL */}
          <motion.div 
            className="main-spinner"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <div className="spinner-ring"></div>
            <div className="spinner-ring delay-1"></div>
            <div className="spinner-ring delay-2"></div>
          </motion.div>

          {/* ÍCONE CENTRAL */}
          <motion.div 
            className="center-icon"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <i className="bi bi-geo-alt-fill"></i>
          </motion.div>

        </div>
        
        <div className="loading-content">
          <h3 className="loading-title">
            {message}
          </h3>
          <p className="loading-subtitle">
            Aguarde enquanto buscamos as informações
          </p>
        </div>
      </motion.div>

      {/* PROGRESSO DOS PASSOS */}
      <motion.div 
        className="loading-steps"
        variants={itemVariants}
      >
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`step-item ${index === loadingStep ? 'active' : ''} ${index < loadingStep ? 'completed' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= loadingStep ? 1 : 0.3,
                x: 0,
                scale: index === loadingStep ? 1.05 : 1
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`step-icon bg-${step.color}`}>
                <motion.i 
                  className={`bi ${step.icon}`}
                  animate={index === loadingStep ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ 
                    duration: 1,
                    repeat: index === loadingStep ? Infinity : 0
                  }}
                />
              </div>
              <div className="step-content">
                <span className="step-text">{step.text}</span>
                {index === loadingStep && (
                  <motion.div 
                    className="step-progress"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: step.duration / 1000 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* BARRA DE PROGRESSO ANIMADA */}
      <motion.div 
        className="progress-section"
        variants={itemVariants}
      >
        <div className="progress-container">
          <div className="progress-track">
            <motion.div 
              className="progress-fill"
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ["0% 0%", "100% 0%"]
              }}
              transition={{ 
                width: { duration: 0.3 },
                backgroundPosition: { duration: 2, repeat: Infinity }
              }}
            />
          </div>
          <div className="progress-info">
            <span className="progress-text">Processando dados...</span>
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>

      {/* INDICADORES VISUAIS */}
      <motion.div 
        className="visual-indicators"
        variants={itemVariants}
      >
        <div className="indicators-grid">
          
          <motion.div 
            className="indicator-item"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <i className="bi bi-wifi text-success"></i>
            <span>Conectado</span>
          </motion.div>
          
          <motion.div 
            className="indicator-item"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <i className="bi bi-shield-check text-primary"></i>
            <span>Seguro</span>
          </motion.div>
          
          <motion.div 
            className="indicator-item"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <i className="bi bi-lightning-charge text-warning"></i>
            <span>Rápido</span>
          </motion.div>
          
        </div>
      </motion.div>

      {/* INFORMAÇÕES ADICIONAIS */}
      <motion.div 
        className="loading-info"
        variants={itemVariants}
      >
        <div className="info-content">
          <div className="info-item">
            <i className="bi bi-cloud-check-fill text-info me-2"></i>
            <span>Dados fornecidos pelos Correios via ViaCEP</span>
          </div>
          <div className="info-item">
            <i className="bi bi-clock-fill text-secondary me-2"></i>
            <span>Tempo médio de resposta: 2-3 segundos</span>
          </div>
        </div>
      </motion.div>

      {/* EFEITOS DE FUNDO */}
      <div className="background-effects">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="floating-particle"
            animate={{
              y: [-20, -100, -20],
              x: [0, 30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + index * 15}%`,
              top: `${70 + (index % 2) * 10}%`
            }}
          >
            <i className="bi bi-circle-fill"></i>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default LoadingSpinner;