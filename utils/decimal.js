/**
 * Realiza o parse do número decimal de ponto fixo (equivale a um parseFloat)
 * Retorna null caso não seja um número válido
 * @param { string } str
 * @param { number } [decimal_places=2]
 * @returns { number }
 */
function parseFixedPoint(str, decimal_places = 2){
    return str == null ? null : (parseInt(str.trim()) / (Math.pow(10, decimal_places))) || null; //FIXME: remover operação de ponto flutuante
}

module.exports = {
    parseFixedPoint,
};