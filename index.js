const { ClienteModel } = require('./models/cliente');
const { EnderecoModel  } = require('./models/endereco');
const { VendaItemModel } = require('./models/venda-item');
const { VendaModel } = require('./models/venda');

/**
 * Realiza o parsing e extrai os dados de um cupom txt de venda
 * @param { string } txt
 * @returns { VendaModel }
*/
module.exports = function(txt){
    const lines = txt.split('\n');

    let _tmp = lines[0].substr(40, 8);
    const data = _tmp.substr(0, 4) + '-' + _tmp.substr(4, 2) + '-' + _tmp.substr(6, 2);
    
    _tmp = lines[0].substr(48, 6);
    const hora = _tmp.substr(0, 2) + ':' + _tmp.substr(2, 2) + ':' + _tmp.substr(4, 2);

    const loja_cnpj = lines[0].substr(26, 14);

    const controle_interno = parseInt(lines[1].substr(9, 10));
    const tipo_venda = parseInt(lines[1].substr(20, 1));

    const venda_cancelada = lines[1].substr(19, 1).trim() || null;
    const forma_pagamento = lines.find(x => x.startsWith('3B')).substr(7, 20).trim() || null;

    const cliente_cpf = lines[2].substr(1, 14).trim() || null;
    const cliente_nome = lines[2].substr(15, 100).trim() || null;
    const cliente_telefone = lines[2].substr(548, 20).trim() || null;

    const cliente_endereco_logradouro = lines[2].substr(115, 255).trim() || null;
    const cliente_endereco_bairro = lines[2].substr(420, 60).trim() || null;
    const cliente_endereco_complemento = lines[2].substr(370, 50).trim() || null;
    const cliente_endereco_numero = lines[2].substr(480, 9).trim() || null;
    const cliente_endereco_cep = lines[2].substr(489, 8).trim() || null;
    const cliente_endereco_municipio = lines[2].substr(568, 80).trim() || null;
    const cliente_endereco_uf = lines[2].substr(648, 2).trim() || null;
    const cliente_endereco_referencia = lines[2].substr(715, 50).trim() || null;

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
        const cancelado = lines[i].substr(116, 1);
        const quantidade = parseInt(lines[i].substr(86, 6));
        const valor_unitario = parseInt(lines[i].substr(96, 10)) / 100;
        const subtotal_item = parseInt(lines[i].substr(106, 10)) / 100;
        const obs_digitada = lines[i].substr(117).trim() || null;

        itens.push(new VendaItemModel(sequencia_item, codigo, nome, cancelado, quantidade, valor_unitario, subtotal_item, obs_digitada));
    }

    const cliente_endereco = new EnderecoModel(cliente_endereco_logradouro, cliente_endereco_numero, cliente_endereco_complemento, cliente_endereco_bairro, cliente_endereco_cep, cliente_endereco_municipio, cliente_endereco_uf, cliente_endereco_referencia);
    const cliente = new ClienteModel(cliente_cpf, cliente_nome, cliente_telefone, cliente_endereco.isNull() ? null : cliente_endereco);
    const venda = new VendaModel(loja_cnpj, data, hora, tipo_venda, controle_interno, venda_cancelada, forma_pagamento, cliente.isNull() ? null : cliente, itens);

    return venda;
}