class VendaItemModel {
    constructor(sequencia_item, codigo, nome, cancelado, quantidade, valor_unitario, subtotal_item, obs_digitada){
        this.sequencia_item = sequencia_item;
        this.codigo = codigo;
        this.nome = nome;
        this.cancelado = cancelado;
        this.quantidade = quantidade;
        this.valor_unitario = valor_unitario;
        this.subtotal_item = subtotal_item;
        this.obs_digitada = obs_digitada;
    }
}

module.exports = { VendaItemModel };