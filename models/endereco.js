const { format: formatCep } = require('../utils/cep');

class EnderecoModel {
    constructor(logradouro, numero, complemento, bairro, cep, municipio, uf, referencia){
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cep = cep;
        this.municipio = municipio;
        this.uf = uf;
        this.referencia = referencia;
    }

    toString(){
        let r = [];
        r.push(this.logradouro);
        if(this.numero)
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