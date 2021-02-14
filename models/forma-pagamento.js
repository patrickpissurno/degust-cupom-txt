class FormaPagamentoModel {
    
    /** @param { FormaPagamentoModel } props */
    constructor(props){
        /** @type { string } nome do método de pagamento */
        this.nome = props.nome;

        /** @type { number } valor pago */
        this.valor = props.valor;
    }

    isNull(){
        return !this.nome || this.valor == null;
    }
}

module.exports = { FormaPagamentoModel };