/**
 * Valida o email (simples), retornando-o sem formatação (null caso inválido)
 * @param { string } email 
 * @returns { string }
 */
function parse(email){
    if(!email)
        return null;
    email = email.trim().toLowerCase();

    let arr = email.split('@');
    if(arr.length !== 2)
        return null;

    if(arr[0].length < 1 || arr[1].length < 1 || arr[0].includes(' ') || arr[1].includes(' '))
        return null;

    let dom = arr[1].split('.');
    if(dom.length < 2)
        return null;

    if(dom.find(x => x.length < 1))
        return null;

    return email;
}

module.exports = {
    parse,
};