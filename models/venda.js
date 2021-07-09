const { FormaPagamentoModel } = require('./forma-pagamento');
const { AcrescimoDescontoModel } = require('./acrescimo-desconto');
const { ClienteModel } = require('./cliente');
const { VendaItemModel } = require('./venda-item');

class VendaModel {
    
    /** @param { VendaModel } props */
    constructor(props){
        /** @type { string } cnpj da loja (só números) */
        this.loja_cnpj = props.loja_cnpj;

        /** @type { string } data real da venda (yyyy-MM-dd) */
        this.data = props.data;

        /** @type { string } data caixa da venda (yyyy-MM-dd) */
        this.data_caixa = props.data_caixa;

        /** @type { string } hora da venda (HH:mm:ss) */
        this.hora = props.hora;

        /** @type { number } 1 = venda balcão, 2 e 8 = delivery, 5 = NF manual, 9 = take out */
        this.tipo_venda = props.tipo_venda;

        /** @type { number } número de abertura do caixa no dia */
        this.numero_abertura = props.numero_abertura;

        /** @type { number } identificador interno da venda no dia */
        this.controle_interno = props.controle_interno;

        /** @type { number } ? */
        this.controle_especifico = props.controle_especifico;

        /** @type { number } identificador do pdv */
        this.codigo_pdv = props.codigo_pdv;

        /** @type { boolean } a venda foi cancelada? */
        this.cancelada = props.cancelada;

        /** @type { FormaPagamentoModel[] } informações relacionadas ao método de pagamento */
        this.forma_pagamento = props.forma_pagamento;

        /** @type { number } quantidade (não valor) total de produtos no cupom */
        this.quantidade_total_de_produtos = props.quantidade_total_de_produtos;

        /** @type { number } somatório (em reais) do valor de produtos no cupom */
        this.somatorio_valor_produtos = props.somatorio_valor_produtos;

        /** @type { number } somatório (em reais) do valor de produtos no cupom */
        this.somatorio_valor_unitario = props.somatorio_valor_unitario;

        /** @type { number } somatório (em reais) do valor de produtos no cupom */
        this.somatorio_valor_subtotal_item = props.somatorio_valor_subtotal_item;

        /** @type { number } valor a ser pago pelo cliente (inclui descontos e acréscimos) */
        this.somatorio_valor_pagamento = props.somatorio_valor_pagamento;

        /** @type { AcrescimoDescontoModel } informações sobre descontos ou acréscimos */
        this.acrescimo_desconto = props.acrescimo_desconto;

        /** @type { ClienteModel } informações sobre o cliente que fez esta compra */
        this.cliente = props.cliente;

        /** @type { VendaItemModel[] } lista de itens (produtos) que o cliente comprou */
        this.itens = props.itens;
    }
}

module.exports = { VendaModel };