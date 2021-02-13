class FormaPagamentoModel {
    constructor(nome, valor){
        this.nome = nome;
        this.valor = valor;
    }

    isNull(){
        return !this.nome || this.valor == null;
    }
}

module.exports = { FormaPagamentoModel };