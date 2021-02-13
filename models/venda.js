class VendaModel {
    constructor(loja_cnpj, data, hora, tipo_venda, controle_interno, cancelada, forma_pagamento, qnt_total_prod, somatorio_valor_unitario, somatorio_valor_subtotal_item, somatorio_valor_pagamento, cliente, itens){
        this.loja_cnpj = loja_cnpj;
        this.data = data;
        this.hora = hora;
        this.tipo_venda = tipo_venda;
        this.controle_interno = controle_interno;
        this.cancelada = cancelada;
        this.forma_pagamento = forma_pagamento;
        this.qnt_total_prod = qnt_total_prod;
        this.somatorio_valor_unitario = somatorio_valor_unitario;
        this.somatorio_valor_subtotal_item = somatorio_valor_subtotal_item;
        this.somatorio_valor_pagamento = somatorio_valor_pagamento;
        this.cliente = cliente;
        this.itens = itens;
    }
}

module.exports = { VendaModel };