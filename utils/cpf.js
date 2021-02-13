/** @type { import('@fnando/cpf/es') } */
const CPF = require('@fnando/cpf/commonjs');

/**
 * Valida o cpf, retornando-o sem formatação (null caso inválido)
 * @param { string } cpf 
 * @returns { string }
 */
function parse(cpf){
    if(!cpf)
        return null;
    cpf = (cpf + '').replace(/[^0-9]/g, '').padStart(11, '0');
    if(cpf.length !== 11 || cpf === '00000000000')
        return null;
    if(!CPF.isValid(cpf, true))
        return null;
    return cpf;
}

module.exports = {
    parse,
};