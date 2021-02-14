# degust-cupom-txt
[![npm-version](https://img.shields.io/npm/v/degust-cupom-txt.svg)](https://www.npmjs.com/package/degust-cupom-txt)
[![build status](https://travis-ci.org/patrickpissurno/degust-cupom-txt.svg?branch=master)](https://travis-ci.org/patrickpissurno/degust-cupom-txt)
[![coverage status](https://coveralls.io/repos/github/patrickpissurno/degust-cupom-txt/badge.svg?branch=master)](https://coveralls.io/github/patrickpissurno/degust-cupom-txt?branch=master)
[![known vulnerabilities](https://snyk.io/test/github/patrickpissurno/degust-cupom-txt/badge.svg)](https://snyk.io/test/github/patrickpissurno/degust-cupom-txt)
[![downloads](https://img.shields.io/npm/dt/degust-cupom-txt.svg)](http://npm-stats.com/~packages/degust-cupom-txt)
[![license](https://img.shields.io/github/license/patrickpissurno/degust-cupom-txt.svg?maxAge=1800)](https://github.com/patrickpissurno/degust-cupom-txt/blob/master/LICENSE)
Biblioteca capaz de extrair os dados dos cupons .txt que o sistema de PDV Linx Degust emite.

### Exemplo

Entrada:
```
0V0010020000003200000000030000000000000020210131234559
1202101310000000001N1000000030700101                          F00000000000000                                                                                                                        000000000600A00000000000000000000000000000000000020210131234559000000000000000 0         NOME TESTE                                             0000000000000  000006000000000000000000000000000000000000000000000000N
2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
3A0010000000008               AGUA SEM GAS                                      UN    000001000000000006000000000600N                                        
3B00001DINHEIRO                                000000600000000000000000                                                                                                                
500000200000000010000000000000006000000000000060000000000000600
9000001000002000007
```

Saída:
```json
{
    "loja_cnpj": "00000000000000",
    "data": "2021-01-31",
    "hora": "23:45:59",
    "tipo_venda": 1,
    "numero_abertura": 1,
    "controle_interno": 1,
    "controle_especifico": 307,
    "codigo_pdv": 1,
    "cancelada": false,
    "forma_pagamento": [
        {
            "nome": "DINHEIRO",
            "valor": 6
        }
    ],
    "quantidade_total_de_produtos": 1,
    "somatorio_valor_produtos": 6,
    "somatorio_valor_unitario": 6,
    "somatorio_valor_subtotal_item": 6,
    "somatorio_valor_pagamento": 6,
    "acrescimo_desconto": null,
    "cliente": null,
    "itens": [
        {
            "sequencia_item": 1,
            "codigo": 8,
            "nome": "AGUA SEM GAS",
            "cancelado": false,
            "quantidade": 1,
            "valor_unitario": 6,
            "subtotal_item": 6,
            "observacao": null
        }
    ]
}
```

### Instalação
```
npm install --save degust-cupom-txt
```

### Como usar
```js
const fs = require('fs');
const parseCupom = require('degust-cupom-txt');

/*
    **** IMPORTANTE ****
    Sempre utilize a opção encoding: 'latin1', pois é o encoding que o sistema
    de PDV Linx Degust usa.
*/
const txt = fs.readFileSync('./cupom.txt', { encoding: 'latin1' }).toString();
const venda = parseCupom(txt);
```

### Informações disponíveis
Observação: muitos campos podem ser retornados como `null`, pois nem todos os dados são obrigatórios.

```json
{
    "loja_cnpj": "00000000000000",
    "data": "2021-01-31",
    "hora": "14:53:55",
    "tipo_venda": 8,
    "numero_abertura": 1,
    "controle_interno": 2,
    "controle_especifico": 843,
    "codigo_pdv": 1,
    "cancelada": false,
    "forma_pagamento": [
        {
            "nome": "DINHEIRO",
            "valor": 41.01
        }
    ],
    "quantidade_total_de_produtos": 4,
    "somatorio_valor_produtos": 49,
    "somatorio_valor_unitario": 49,
    "somatorio_valor_subtotal_item": 49,
    "somatorio_valor_pagamento": 41.01,
    "acrescimo_desconto": {
        "tipo": "D",
        "valor": 7.99
    },
    "cliente": {
        "cpf": "00000000000",
        "cnpj": null,
        "email": "teste@exemplo.com",
        "nome": "Nome Teste",
        "telefone": "21988887777",
        "sexo": "M",
        "endereco": {
            "logradouro": "Av. Lucio Costa",
            "numero": "12060",
            "complemento": "Bloco 7 Apto 101",
            "bairro": "Barra da Tijuca",
            "cep": "22000000",
            "municipio": "RIO DE JANEIRO",
            "uf": "RJ",
            "referencia": "Prédios perto ao shopping center"
        },
        "observacao": "Alérgico a amendoim",
        "data_nascimento": "1995-12-31",
        "data_cadastro": "2020-12-14"
    },
    "itens": [
        {
            "sequencia_item": 1,
            "codigo": 2,
            "nome": "Lanche 1",
            "cancelado": false,
            "quantidade": 1,
            "valor_unitario": 49,
            "subtotal_item": 49,
            "observacao": null
        },
        {
            "sequencia_item": 2,
            "codigo": 80,
            "nome": "Acompanhamento 1",
            "cancelado": false,
            "quantidade": 1,
            "valor_unitario": 0,
            "subtotal_item": 0,
            "observacao": null
        },
        {
            "sequencia_item": 3,
            "codigo": 100,
            "nome": "Acompanhamento 3",
            "cancelado": false,
            "quantidade": 1,
            "valor_unitario": 0,
            "subtotal_item": 0,
            "observacao": "Sem sal, por favor"
        },
        {
            "sequencia_item": 4,
            "codigo": 212,
            "nome": "Bebida 4",
            "cancelado": false,
            "quantidade": 1,
            "valor_unitario": 0,
            "subtotal_item": 0,
            "observacao": null
        }
    ]
}
```

### Documentação
A biblioteca foi 100% documentada usando [@JSDoc](https://jsdoc.app/), de modo que IDEs possam oferecer autocomplete informativo, incluindo tipos e descrição dos campos.
Testado e funcionando com [Visual Studio Code](https://code.visualstudio.com/).

### Unit testing e coverage
Esta biblioteca ainda não teve seus testes implementados, portanto deve ser considerada como experimental.
Os testes serão implementados em breve, visando atingir 100% de cobertura (coverage).

### Licença
```
As marcas Linx® e Degust® são propriedades intelectuais
pertencentes à LINX SISTEMAS E CONSULTORIA LTDA.

CNPJ: 54.517.628/0001-98

Todos os direitos reservados.
```

**Este projeto não possui vínculos com a empresa Linx.**

###### Licença sobre todo o código e artefatos desta biblioteca
```
MIT License

Copyright (c) 2021 Patrick Pissurno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
