const parseTelefone = require('telefone/parse')
const { parse: parseEmail } = require('../utils/email')
const { parse: parseCpf } = require('../utils/cpf')
const { parse: parseCnpj } = require('../utils/cnpj')

const DEFAULT_DDD = '21';

class ClienteModel {
    constructor(cpf, cnpj, email, nome, telefone, sexo, endereco, observacao, data_nascimento, data_cadastro){
        this.cpf = parseCpf(cpf);
        this.cnpj = parseCnpj(cnpj);
        this.email = parseEmail(email);
        this.nome = nome;
        this.telefone = parseTelefone(telefone) || parseTelefone(DEFAULT_DDD + telefone);
        this.sexo = sexo;
        this.endereco = endereco;
        this.observacao = observacao;
        this.data_nascimento = data_nascimento;
        this.data_cadastro = data_cadastro;
    }

    isNull(){
        return this.cpf == null && this.cnpj == null && this.nome == null && this.telefone == null && this.endereco == null;
    }
}

module.exports = { ClienteModel };