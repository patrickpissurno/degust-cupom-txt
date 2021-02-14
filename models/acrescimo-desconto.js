class AcrescimoDescontoModel {

    /** @param { AcrescimoDescontoModel } props */
    constructor(props){
        /** @type { string } tipo (A = acréscimo, D = desconto) */
        this.tipo = props.tipo;

        /** @type { number } valor do acréscimo/desconto */
        this.valor = props.valor;
    }

    isNull(){
        return !this.tipo || !this.valor;
    }
}

module.exports = { AcrescimoDescontoModel };