class VendaItemModel {

    /** @param { VendaItemModel } props */
    constructor(props){
        /** @type { number } número de sequência do item no cupom (começa no 1) */
        this.sequencia_item = props.sequencia_item;

        /** @type { number } código (identificador) do produto no Degust */
        this.codigo = props.codigo;

        /** @type { string } nome do produto */
        this.nome = props.nome;

        /** @type { boolean } o item foi cancelado? */
        this.cancelado = props.cancelado;

        /** @type { number } número de unidades do produto */
        this.quantidade = props.quantidade;

        /** @type { number } preço de cada unidade */
        this.valor_unitario = props.valor_unitario;

        /** @type { number } subtotal do item (preço unitário x quantidade) */
        this.subtotal_item = props.subtotal_item;

        /** @type { string } observação do cliente */
        this.observacao = props.observacao;
    }
}

module.exports = { VendaItemModel };