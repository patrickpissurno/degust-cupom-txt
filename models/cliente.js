const parseTelefone = require('telefone/parse')

const DEFAULT_DDD = '21';

class ClienteModel {
    constructor(cpf, nome, telefone, sexo, endereco){
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = parseTelefone(telefone) || parseTelefone(DEFAULT_DDD + telefone);
        this.sexo = sexo;
        this.endereco = endereco;
    }

    isNull(){
        return this.cpf == null && this.nome == null && this.telefone == null && this.endereco == null;
    }
}

module.exports = { ClienteModel };