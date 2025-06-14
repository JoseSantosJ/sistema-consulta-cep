import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CEPInput.css';

export const CEPInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  loading, 
  placeholder = "Ex: 01234567" 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setHasValue(newValue.length > 0);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isValidLength = value.replace(/\D/g, '').length === 8;

  return (
    <motion.div 
      className="cep-input-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      
      {/* TÍTULO DA SEÇÃO */}
      <div className="input-section-header">
        <h2 className="input-title">
          <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
          Digite o CEP
        </h2>
        <p className="input-description">
          Insira um CEP válido de 8 dígitos para buscar o endereço completo
        </p>
      </div>

      {/* CONTAINER PRINCIPAL DO INPUT */}
      <motion.div 
        className={`input-container ${isFocused ? 'focused' : ''} ${hasValue ? 'has-value' : ''} ${isValidLength ? 'valid' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        
        {/* LABEL FLUTUANTE */}
        <motion.label 
          htmlFor="cepInput" 
          className={`floating-label ${isFocused || hasValue ? 'active' : ''}`}
          animate={{ 
            y: isFocused || hasValue ? -24 : 0,
            scale: isFocused || hasValue ? 0.85 : 1,
            color: isFocused ? '#0d6efd' : '#6c757d'
          }}
          transition={{ duration: 0.2 }}
        >
          CEP (somente números)
        </motion.label>

        <div className="input-group-enhanced">
          
          {/* ÍCONE INDICADOR */}
          <div className="input-icon">
            <motion.i 
              className={`bi ${loading ? 'bi-hourglass' : isValidLength ? 'bi-check-circle-fill text-success' : 'bi-mailbox'}`}
              animate={{ 
                rotate: loading ? 360 : 0,
                scale: isValidLength ? 1.1 : 1
              }}
              transition={{ 
                rotate: { duration: 1, repeat: loading ? Infinity : 0 },
                scale: { duration: 0.2 }
              }}
            />
          </div>
          
          {/* CAMPO DE INPUT */}
          <input
            id="cepInput"
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? placeholder : ''}
            maxLength="9"
            className="form-control-enhanced"
            disabled={loading}
            autoComplete="postal-code"
            inputMode="numeric"
          />
          
          {/* BOTÃO DE LIMPEZA */}
          {hasValue && !loading && (
            <motion.button
              type="button"
              className="clear-btn"
              onClick={() => {
                onChange('');
                setHasValue(false);
                document.getElementById('cepInput').focus();
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="bi bi-x-circle-fill"></i>
            </motion.button>
          )}
          
        </div>

        {/* INDICADOR DE PROGRESSO */}
        <div className="progress-indicator">
          <motion.div 
            className="progress-bar"
            animate={{ 
              width: `${(value.replace(/\D/g, '').length / 8) * 100}%`,
              backgroundColor: isValidLength ? '#198754' : '#0d6efd'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

      </motion.div>

      {/* BOTÃO DE CONSULTA */}
      <motion.div 
        className="action-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <motion.button 
          onClick={onSubmit}
          className={`btn btn-primary btn-lg submit-btn ${isValidLength ? 'ready' : 'disabled'}`}
          disabled={loading || !isValidLength}
          whileHover={{ 
            scale: (!loading && isValidLength) ? 1.05 : 1,
            boxShadow: (!loading && isValidLength) ? '0 8px 25px rgba(13, 110, 253, 0.4)' : undefined
          }}
          whileTap={{ scale: (!loading && isValidLength) ? 0.95 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            <motion.div 
              className="loading-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              Consultando CEP...
            </motion.div>
          ) : (
            <motion.div 
              className="button-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <i className="bi bi-search me-2"></i>
              Buscar Endereço
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* DICAS DE USO */}
      <motion.div 
        className="usage-tips"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <div className="tips-content">
          <span className="tip-item">
            <i className="bi bi-info-circle me-1 text-info"></i>
            Digite apenas números
          </span>
          <span className="tip-item">
            <i className="bi bi-lightning-charge me-1 text-warning"></i>
            Pressione Enter para buscar
          </span>
          <span className="tip-item">
            <i className="bi bi-shield-check me-1 text-success"></i>
            Dados seguros via HTTPS
          </span>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default CEPInput;