export const CEPUtils = {
  formatCEP: (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length > 8) {
      return cleanValue.slice(0, 8);
    }
    if (cleanValue.length > 5) {
      return cleanValue.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    return cleanValue;
  },

  validateCEP: (cep) => {
    const cleanCEP = cep.replace(/\D/g, '');
    if (cleanCEP.length !== 8) return false;
    if (/^(\d)\1{7}$/.test(cleanCEP)) return false;
    return true;
  },

  cleanCEP: (cep) => cep.replace(/\D/g, '')
};