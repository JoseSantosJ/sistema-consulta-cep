import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CEPConsultaApp.css';
import { useCEPConsulta } from '../../hooks/useCEPConsulta';
import { CEPInput } from '../CEPInput/CEPInput';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ResultadoSucesso } from '../ResultadoSucesso/ResultadoSucesso';
import { ResultadoErro } from '../ResultadoErro/ResultadoErro';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const CEPConsultaApp = () => {
  const {
    cep,
    resultado,
    erro,
    loading,
    handleCEPChange,
    consultarCEP,
    limparFormulario
  } = useCEPConsulta();

  // Verifica se deve mostrar o formulário ou o resultado
  const showForm = !resultado && !erro && !loading;
  const showResult = resultado || erro;

  return (
    <div className="app-layout">
      {/* HEADER FIXO NO TOPO */}
      <Header />
      
      {/* CONTEÚDO PRINCIPAL */}
      <motion.main 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10 col-12">
              
              <AnimatePresence mode="wait">
                
                {/* SEÇÃO DO FORMULÁRIO - Mostrar apenas quando não há resultado */}
                {showForm && (
                  <motion.section 
                    key="form-section"
                    className="form-section"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.95,
                      y: -20
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="section-header">
                      <div className="section-icon">
                        <i className="bi bi-search"></i>
                      </div>
                      <h1 className="section-title">Consulta de CEP</h1>
                      <p className="section-description">
                        Digite um CEP válido para buscar informações completas do endereço
                      </p>
                    </div>

                    <div className="form-container">
                      <CEPInput
                        value={cep}
                        onChange={handleCEPChange}
                        onSubmit={consultarCEP}
                        loading={loading}
                      />
                    </div>
                  </motion.section>
                )}

                {/* SEÇÃO DE LOADING */}
                {loading && (
                  <motion.section 
                    key="loading-section"
                    className="loading-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <LoadingSpinner />
                  </motion.section>
                )}

                {/* SEÇÃO DE RESULTADO - Substitui completamente o formulário */}
                {showResult && (
                  <motion.section 
                    key="result-section"
                    className="result-section"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    
                    {/* MINI HEADER COM NOVA CONSULTA */}
                    <motion.div 
                      className="result-header"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="result-title-container">
                        <div className="result-icon">
                          <i className="bi bi-geo-alt-fill"></i>
                        </div>
                        <div className="result-info">
                          <h2 className="result-title">
                            {resultado ? 'Endereço Encontrado' : 'Consulta CEP'}
                          </h2>
                          <p className="result-subtitle">
                            CEP consultado: <span className="cep-consulted">{cep}</span>
                          </p>
                        </div>
                      </div>
                      
                      <motion.button 
                        onClick={limparFormulario}
                        className="btn btn-outline-primary btn-sm new-search-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className="bi bi-plus-circle me-2"></i>
                        Nova Consulta
                      </motion.button>
                    </motion.div>

                    {/* RESULTADO */}
                    <motion.div 
                      className="result-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {resultado && <ResultadoSucesso dados={resultado} />}
                      {erro && <ResultadoErro mensagem={erro} />}
                    </motion.div>

                  </motion.section>
                )}

              </AnimatePresence>

            </div>
          </div>
        </div>
      </motion.main>
      
      {/* FOOTER FIXO NO BOTTOM */}
      <Footer />
    </div>
  );
};

export default CEPConsultaApp;