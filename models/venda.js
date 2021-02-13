class VendaModel {
    constructor(loja_cnpj, data, hora, tipo_venda, num_abertura, controle_interno, controle_especifico, cod_pdv, cancelada, forma_pagamento, qnt_total_prod, total_prod_cupom, somatorio_valor_unitario, somatorio_valor_subtotal_item, somatorio_valor_pagamento, ind_acres_desc, valor_acres_desc, cliente, itens){
        this.loja_cnpj = loja_cnpj;
        this.data = data;
        this.hora = hora;
        this.tipo_venda = tipo_venda;
        this.num_abertura = num_abertura;
        this.controle_interno = controle_interno;
        this.controle_especifico = controle_especifico;
        this.cod_pdv = cod_pdv;
        this.cancelada = cancelada;
        this.forma_pagamento = forma_pagamento;
        this.qnt_total_prod = qnt_total_prod;
        this.total_prod_cupom = total_prod_cupom;
        this.somatorio_valor_unitario = somatorio_valor_unitario;
        this.somatorio_valor_subtotal_item = somatorio_valor_subtotal_item;
        this.somatorio_valor_pagamento = somatorio_valor_pagamento;
        this.ind_acres_desc = ind_acres_desc;
        this.valor_acres_desc = valor_acres_desc;
        this.cliente = cliente;
        this.itens = itens;
    }
}

module.exports = { VendaModel };