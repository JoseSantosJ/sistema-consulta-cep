import { useState } from 'react';
import { CEPUtils } from '../utils/CEPUtils';
import { CEPService } from '../services/CEPService';

export const useCEPConsulta = () => {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCEPChange = (value) => {
    const formattedCEP = CEPUtils.formatCEP(value);
    setCep(formattedCEP);
    
    if (erro) setErro(null);
    if (resultado) setResultado(null);
  };

  const consultarCEP = async () => {
    if (!cep.trim()) {
      setErro('Por favor, digite um CEP');
      return;
    }

    if (!CEPUtils.validateCEP(cep)) {
      setErro('CEP inválido. Digite um CEP com 8 dígitos válidos.');
      return;
    }

    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dados = await CEPService.consultarCEP(cep);
      setResultado(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  const limparFormulario = () => {
    setCep('');
    setResultado(null);
    setErro(null);
  };

  return {
    cep,
    resultado,
    erro,
    loading,
    handleCEPChange,
    consultarCEP,
    limparFormulario
  };
};