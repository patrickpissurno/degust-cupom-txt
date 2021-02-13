class VendaModel {
    constructor(loja_cnpj, data, hora, tipo_venda, controle_interno, cancelada, cliente, itens){
        this.loja_cnpj = loja_cnpj;
        this.data = data;
        this.hora = hora;
        this.tipo_venda = tipo_venda;
        this.controle_interno = controle_interno;
        this.cancelada = cancelada;
        this.cliente = cliente;
        this.itens = itens;
    }
}

module.exports = { VendaModel };