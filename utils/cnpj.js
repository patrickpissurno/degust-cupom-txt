/** @type { import('@fnando/cnpj/es') } */
const CNPJ = require('@fnando/cnpj/commonjs');

/**
 * Valida o cnpj, retornando-o sem formatação (null caso inválido)
 * @param { string } cnpj 
 * @returns { string }
 */
function parse(cnpj){
    if(!cnpj)
        return null;
    cnpj = (cnpj + '').replace(/[^0-9]/g, '').padStart(14, '0');
    if(cnpj.length !== 14 || cnpj === '00000000000000')
        return null;
    if(!CNPJ.isValid(cnpj, true))
        return null;
    return cnpj;
}

module.exports = {
    parse,
};