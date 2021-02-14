class VendaModel {
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