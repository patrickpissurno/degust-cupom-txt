class FormaPagamentoModel {
    constructor(nome, valor){
        this.nome = nome;
        this.valor = valor;
    }

    isNull(){
        return !this.nome || isNaN(this.valor);
    }
}

module.exports = { FormaPagamentoModel };