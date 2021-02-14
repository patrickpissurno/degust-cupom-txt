const { FormaPagamentoModel } = require('./forma-pagamento');
const { AcrescimoDescontoModel } = require('./acrescimo-desconto');
const { ClienteModel } = require('./cliente');
const { VendaItemModel } = require('./venda-item');

class VendaModel {
    /**
     * Cupom de venda
     * @param { string } loja_cnpj cnpj da loja (só números)
     * @param { string } data data da venda (yyyy-MM-dd)
     * @param { string } hora hora da venda (HH:mm:ss)
     * @param { number } tipo_venda 1 = venda balcão, 2 e 8 = delivery, 5 = NF manual, 9 = take out
     * @param { number } numero_abertura número de abertura do caixa no dia
     * @param { number } controle_interno identificador interno da venda no dia
     * @param { number } controle_especifico ?
     * @param { number } codigo_pdv identificador do pdv
     * @param { boolean } cancelada 
     * @param { FormaPagamentoModel[] } forma_pagamento informações relacionadas ao método de pagamento
     * @param { number } quantidade_total_de_produtos quantidade (não valor) total de produtos no cupom
     * @param { number } somatorio_valor_produtos somatório (em reais) do valor de produtos no cupom
     * @param { number } somatorio_valor_unitario somatório (em reais) do valor de produtos no cupom
     * @param { number } somatorio_valor_subtotal_item somatório (em reais) do valor de produtos no cupom
     * @param { number } somatorio_valor_pagamento valor a ser pago pelo cliente (inclui descontos e acréscimos)
     * @param { AcrescimoDescontoModel } [acrescimo_desconto] informações sobre descontos ou acréscimos
     * @param { ClienteModel } [cliente] informações sobre o cliente que fez esta compra
     * @param { VendaItemModel[] } itens lista de itens (produtos) que o cliente comprou
     */
    constructor(loja_cnpj, data, hora, tipo_venda, numero_abertura, controle_interno, controle_especifico, codigo_pdv, cancelada, forma_pagamento, quantidade_total_de_produtos, somatorio_valor_produtos, somatorio_valor_unitario, somatorio_valor_subtotal_item, somatorio_valor_pagamento, acrescimo_desconto, cliente, itens){
        this.loja_cnpj = loja_cnpj;
        this.data = data;
        this.hora = hora;
        this.tipo_venda = tipo_venda;
        this.numero_abertura = numero_abertura;
        this.controle_interno = controle_interno;
        this.controle_especifico = controle_especifico;
        this.codigo_pdv = codigo_pdv;
        this.cancelada = cancelada;
        this.forma_pagamento = forma_pagamento;
        this.quantidade_total_de_produtos = quantidade_total_de_produtos;
        this.somatorio_valor_produtos = somatorio_valor_produtos;
        this.somatorio_valor_unitario = somatorio_valor_unitario;
        this.somatorio_valor_subtotal_item = somatorio_valor_subtotal_item;
        this.somatorio_valor_pagamento = somatorio_valor_pagamento;
        this.acrescimo_desconto = acrescimo_desconto;
        this.cliente = cliente;
        this.itens = itens;
    }
}

module.exports = { VendaModel };