/**
 * Realiza o parse do número decimal de ponto fixo (equivale a um parseFloat)
 * Retorna null caso não seja um número válido
 * @param { string } str
 * @param { number } [decimal_places=2]
 * @returns { number }
 */
function parseFixedPoint(str, decimal_places = 2){
    if(str == null)
        return null;
    str = str.trim();
    let v = parseFloat(`${str.substr(0, str.length - decimal_places)}.${str.substr(str.length - decimal_places)}`);
    return isNaN(v) ? null : v;
}

module.exports = {
    parseFixedPoint,
};