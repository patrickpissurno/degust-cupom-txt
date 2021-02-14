const { format: formatCep } = require('../utils/cep');

class EnderecoModel {

    /** @param { EnderecoModel } props */
    constructor(props){
        /** @type { string } Logradouro */
        this.logradouro = props.logradouro;

        /** @type { string } Número do endereço (mas é string) */
        this.numero = props.numero;

        /** @type { string } Complemento */
        this.complemento = props.complemento;

        /** @type { string } Bairro */
        this.bairro = props.bairro;

        /** @type { string } CEP */
        this.cep = props.cep;

        /** @type { string } Município */
        this.municipio = props.municipio;

        /** @type { string } UF (unidade federativa) */
        this.uf = props.uf;

        /** @type { string } Referência */
        this.referencia = props.referencia;
    }

    /**
     * Retorna o endereço formatado
     * @returns { string } string
     */
    toString(){
        let r = [];
        r.push(this.logradouro);
        if(this.logradouro && this.numero)
            r.push('Nº ' + this.numero);
        r.push(this.complemento);
        r.push(this.bairro);
        r.push(this.municipio);
        r.push(this.uf);

        let str = r.filter(x => x != null && x.length > 0).join(', ');

        const cep = formatCep(this.cep);

        let res = [
            str,
            this.referencia,
            cep ? 'CEP: ' + cep : '',
        ].filter(x => x != null && x.length > 0).join('. ').trim();

        return res || null;
    }

    isNull(){
        return this.toString() == null;
    }
}

module.exports = { EnderecoModel };