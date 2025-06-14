import { CEPUtils } from '../utils/CEPUtils';

export const CEPService = {
  async consultarCEP(cep) {
    const cleanCEP = CEPUtils.cleanCEP(cep);
    const url = `https://viacep.com.br/ws/${cleanCEP}/json/`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
      
      return data;
    } catch (error) {
      throw new Error(`Erro ao consultar CEP: ${error.message}`);
    }
  }
};