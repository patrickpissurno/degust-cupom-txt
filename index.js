const { ClienteModel } = require('./models/cliente');
const { EnderecoModel  } = require('./models/endereco');
const { FormaPagamentoModel } = require('./models/forma-pagamento');
const { VendaItemModel } = require('./models/venda-item');
const { VendaModel } = require('./models/venda');
const { AcrescimoDescontoModel } = require('./models/acrescimo-desconto');

const { parseFixedPoint } = require('./utils/decimal');

const PATTERN_UNICODE_NULL = /\u0000/g;

class CorruptedDataError extends Error {
    /** @param { string } message */
    constructor(message) {
      super(message);
      this.name = "CorruptedDataError";
    }
}

/**
 * Realiza o parsing e extrai os dados de um cupom txt de venda
 * @param { string } txt conteúdo do arquivo txt do cupom de venda
 * @returns { VendaModel } dados do cupom de venda
 * @throws { CorruptedDataError } faz throw deste erro caso o conteúdo do cupom esteja corrompido
 * @author Patrick Pissurno <contato@patrickpissurno.com.br>
*/
module.exports = function(txt){
    let lines;
    try {
        lines = txt.split('\n');

        if(lines.length < 3 || txt.replace(PATTERN_UNICODE_NULL, '').length < 1)
            throw new CorruptedDataError('Arquivo corrompido.');
    }
    catch(ex){
        throw new CorruptedDataError('Arquivo corrompido.');
    }

    let _tmp = lines[0].substr(40, 8);
    const data = _tmp.substr(0, 4) + '-' + _tmp.substr(4, 2) + '-' + _tmp.substr(6, 2);

    _tmp = lines[1].substr(1, 8);
    const data_caixa = _tmp.substr(0, 4) + '-' + _tmp.substr(4, 2) + '-' + _tmp.substr(6, 2);
    
    _tmp = lines[0].substr(48, 6);
    const hora = _tmp.substr(0, 2) + ':' + _tmp.substr(2, 2) + ':' + _tmp.substr(4, 2);

    const loja_cnpj = lines[0].substr(26, 14);

    const tipo_venda = parseInt(lines[1].substr(20, 1));
    const numero_abertura = parseInt(lines[1].substr(34, 2));
    const controle_interno = parseInt(lines[1].substr(9, 10));
    const controle_especifico = parseInt(lines[1].substr(21, 10));
    const codigo_pdv = parseInt(lines[1].substr(31, 3));

    const somatorio_valor_produtos = parseFixedPoint(lines[1].substr(197, 12), 2);
    const ind_acres_desc = lines[1].substr(209, 1).trim() || null;
    const valor_acres_desc = parseFixedPoint(lines[1].substr(210, 12), 2);

    const acrescimo_desconto = new AcrescimoDescontoModel({ tipo: ind_acres_desc, valor: valor_acres_desc });

    const venda_cancelada = lines[1].substr(19, 1) === 'S';

    const linha_5 = lines.find(x => x.startsWith('5'));

    const quantidade_total_de_produtos = parseFixedPoint(linha_5.substr(7, 12), 2);
    const somatorio_valor_unitario = parseFixedPoint(linha_5.substr(21, 14), 2);
    const somatorio_valor_subtotal_item = parseFixedPoint(linha_5.substr(35, 14), 2);
    const somatorio_valor_pagamento = parseFixedPoint(linha_5.substr(49, 14), 2);

    const cliente_tipo = lines[1].substr(62, 1).trim() || null;
    const cliente_cpf = cliente_tipo === 'J' ? null : (lines[2].substr(1, 14).trim() || null);
    const cliente_cnpj = cliente_tipo !== 'J' ? null : (lines[2].substr(1, 14).trim() || null);
    const cliente_email = lines[2].substr(498, 50).trim() || null;
    const cliente_nome = lines[2].substr(15, 100).trim() || null;
    const cliente_telefone = lines[2].substr(548, 20).trim() || null;
    const cliente_sexo = lines[2].substr(970, 1).trim() || null;
    const cliente_observacao = lines[2].substr(675, 40).trim() || null;

    _tmp = lines[2].substr(659, 8).trim() || null;
    const cliente_data_nascimento = !_tmp || parseInt(_tmp.substr(0, 4)) <= 1900 ? null : (_tmp.substr(0, 4) + '-' + _tmp.substr(4, 2) + '-' + _tmp.substr(6, 2));
    _tmp = lines[2].substr(667, 8).trim() || null;
    const cliente_data_cadastro = !_tmp || parseInt(_tmp.substr(0, 4)) <= 2000 ? null : (_tmp.substr(0, 4) + '-' + _tmp.substr(4, 2) + '-' + _tmp.substr(6, 2));

    const cliente_endereco_logradouro = lines[2].substr(115, 255).trim() || null;
    const cliente_endereco_bairro = lines[2].substr(420, 60).trim() || null;
    const cliente_endereco_complemento = lines[2].substr(370, 50).trim() || null;
    const cliente_endereco_numero = lines[2].substr(480, 9).trim() || null;
    const cliente_endereco_cep = lines[2].substr(489, 8).trim() || null;
    const cliente_endereco_municipio = lines[2].substr(568, 80).trim() || null;
    const cliente_endereco_uf = lines[2].substr(648, 2).trim() || null;
    const cliente_endereco_referencia = lines[2].substr(715, 50).trim() || null; //FIXME: confirmar comparando com o extrattor

    const cliente_endereco = new EnderecoModel({ logradouro: cliente_endereco_logradouro, numero: cliente_endereco_numero, complemento: cliente_endereco_complemento, bairro: cliente_endereco_bairro, cep: cliente_endereco_cep, municipio: cliente_endereco_municipio, uf: cliente_endereco_uf, referencia: cliente_endereco_referencia });

    let itens = [];
    let item_found = false;
    for(let i = 3; i < lines.length; i++){
        if(!lines[i].startsWith('3A')){
            if(!item_found)
                continue;
            break;
        }
        item_found = true;

        const sequencia_item = parseInt(lines[i].substr(2, 3));
        const codigo = parseInt(lines[i].substr(5, 10));
        const nome = lines[i].substr(30, 50).trim();
        const cancelado = lines[i].substr(116, 1) === 'S';
        const quantidade = parseInt(lines[i].substr(86, 6));
        const valor_unitario = parseFixedPoint(lines[i].substr(96, 10), 2);
        const subtotal_item = parseFixedPoint(lines[i].substr(106, 10), 2);
        const observacao = lines[i].substr(117).trim() || null;

        itens.push(new VendaItemModel({ sequencia_item, codigo, nome, cancelado, quantidade, valor_unitario, subtotal_item, observacao }));
    }

    let forma_pagamento = [];
    let pagamento_found = false;
    for(let i = 3 + itens.length; i < lines.length; i++){
        if(!lines[i].startsWith('3B')){
            if(!pagamento_found)
                continue;
            break;
        }
        pagamento_found = true;

        const nome = lines[i].substr(7, 20).trim() || null;
        const valor = parseFixedPoint(lines[i].substr(47, 9), 2);

        if(nome && valor != null)
            forma_pagamento.push(new FormaPagamentoModel({ nome, valor }));
    }

    const cliente = new ClienteModel({ cpf: cliente_cpf, cnpj: cliente_cnpj, email: cliente_email, nome: cliente_nome, telefone: cliente_telefone, sexo: cliente_sexo, endereco: cliente_endereco.isNull() ? null : cliente_endereco, observacao: cliente_observacao, data_nascimento: cliente_data_nascimento, data_cadastro: cliente_data_cadastro });
    
    const venda = new VendaModel({ loja_cnpj, data, data_caixa, hora, tipo_venda, numero_abertura, controle_interno, controle_especifico, codigo_pdv, cancelada: venda_cancelada, forma_pagamento, quantidade_total_de_produtos, somatorio_valor_produtos, somatorio_valor_unitario, somatorio_valor_subtotal_item, somatorio_valor_pagamento, acrescimo_desconto: acrescimo_desconto.isNull() ? null : acrescimo_desconto, cliente: cliente.isNull() ? null : cliente, itens });

    return venda;
}

module.exports.ClienteModel = ClienteModel;
module.exports.EnderecoModel = EnderecoModel;
module.exports.FormaPagamentoModel = FormaPagamentoModel;
module.exports.VendaItemModel = VendaItemModel;
module.exports.VendaModel = VendaModel;
module.exports.AcrescimoDescontoModel = AcrescimoDescontoModel;