#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(error0, conection) {
    if (error0) {
        throw error0;
    }

    conection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1
        }

        var queue = "beneficiary";
        var msgJSON = {
            "Nome": "String",
            "Email": "String",
            "Sexo": "String",
            "TipoBeneficiario": "F",
            "Cpf": "00000000000",
            "Endereco": "String",
            "Bairro": "String",
            "Cidade": "String",
            "Uf": "String",
            "Pais": "String",
            "Ddd": "11",
            "Telefone": "999999999",
            "Ramal": "String",
            "CodigoBanco": "String",
            "Agência": "String",
            "DigitoAgencia": "String",
            "ContaCorrente": "String",
            "DigitoContaCorrente": "String",
            "TipoConta": "String",
            "CodigoMatricula": "String",
            "CodigoINSS": "String",             // - opcional
            "TipoINSS": "String",               // - opcional
            "DataNascimento": "1999-12-31",
            "PaisNascimento": "String",         // - opcional
            "EstadoNascimento": "String",       // - opcional
            "CidadeNascimento": "String",       // - opcional
            "DataAposentadoria": "String",
            "CNPJ": "String",                   // - AVP apenas
            "NomeInstituidora": "String",       // - AVP apenas
            "CodigoConvenio": "String",         // - AVP apenas
            "CodigoFilial": "String",           // - AVP apenas
            "RegimeTributario": "String",
            "NumeroProposta": "String",
            "CodigoEstruturaVendas": "String",
            "ValorReserva": 0000000,
            "Codproduto": "0001"
        };

        var msgString = JSON.stringify(msgJSON);

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msgString));

        console.log(" [x] Sent %s", msgString);
    });

    setTimeout(function() {
        conection.close();
        process.exit(0);
    }, 500);
});