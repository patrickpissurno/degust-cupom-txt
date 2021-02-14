class AcrescimoDescontoModel {
    constructor(tipo, valor){
        this.tipo = tipo;
        this.valor = valor;
    }

    isNull(){
        return !this.tipo || !this.valor;
    }
}

module.exports = { AcrescimoDescontoModel };