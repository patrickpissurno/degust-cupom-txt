/**
 * Valida o cep, retornando-o sem formatação (null caso inválido)
 * @param { string } cep 
 * @returns { string }
 */
function parse(cep){
    if(!cep)
        return null;
    cep = (cep + '').replace(/[^0-9]/g, '');
    if(cep.length !== 8)
        return null;
    return cep;
}

/**
 * Formata o CEP para o padrão XXXXX-XX
 * @param { string } cep 
 * @returns { string }
 */
function format(cep){
    cep = parse(cep);
    if(!cep)
        return null;
    return cep.substr(0, 5) + '-' + cep.substr(5);
}

module.exports = {
    parse,
    format,
};