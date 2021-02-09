class VendaModel {
    constructor(loja_cnpj, data, hora, controle_interno, cancelada, cliente, itens){
        this.loja_cnpj = loja_cnpj;
        this.data = data;
        this.hora = hora;
        this.controle_interno = controle_interno;
        this.cancelada = cancelada;
        this.cliente = cliente;
        this.itens = itens;
    }
}

module.exports = { VendaModel };