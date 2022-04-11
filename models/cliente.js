const { EnderecoModel } = require('./endereco');

const parseTelefone = require('telefone/parse')
const { parse: parseEmail } = require('../utils/email')
const { parse: parseCpf } = require('../utils/cpf')
const { parse: parseCnpj } = require('../utils/cnpj')

const DEFAULT_DDD = '21';

class ClienteModel {

    /** @param { ClienteModel } props */
    constructor(props){
        /** @type { string } CPF (caso seja pessoa física; apenas dígitos) ou null */
        this.cpf = parseCpf(props.cpf);

        /** @type { string } CNPJ (caso seja pessoa jurídica; apenas dígitos) ou null */
        this.cnpj = parseCnpj(props.cnpj);

        /** @type { string } e-mail */
        this.email = parseEmail(props.email);

        /** @type { string } nome */
        this.nome = props.nome;

        /** @type { string } telefone fixo ou celular (com DDD, apenas dígitos) */
        this.telefone = parseTelefone(props.telefone) || parseTelefone(DEFAULT_DDD + props.telefone);
        
        /** @type { string } sexo (M = masculino, F = feminino, ou null) */
        this.sexo = props.sexo;

        /** @type { EnderecoModel } endereço */
        this.endereco = props.endereco;

        /** @type { string } observações sobre o cliente */
        this.observacao = props.observacao;

        /** @type { string } data de nascimento (yyyy-MM-dd) */
        this.data_nascimento = props.data_nascimento;

        /** @type { string } data de cadastro (yyyy-MM-dd) */
        this.data_cadastro = props.data_cadastro;
    }

    isNull(){
        return this.cpf == null && this.cnpj == null && this.email == null && this.nome == null && this.telefone == null && this.endereco == null && this.observacao == null;
    }
}

module.exports = { ClienteModel };