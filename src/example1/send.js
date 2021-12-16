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
            nome: "String",
            email: "String",
            sexo: "String",
            tipoBeneficiario: "F",
            cpf: "00000000000",
            endereco: "String",
            bairro: "String",
            cidade: "String",
            uf: "String",
            pais: "String",
            ddd: "11",
            telefone: "999999999",
            ramal: "String",
            codigoBanco: "String",
            agencia: "String",
            digitoAgencia: "String",
            contaCorrente: "String",
            digitoContaCorrente: "String",
            tipoConta: "String",
            codigoMatricula: "String",
            codigoINSS: "String",                     // - opcional
            tipoINSS: "String",                       // - opcional
            dataNascimento: "1999-12-31",
            paisNascimento: "String",                 // - opcional
            estadoNascimento: "String",               // - opcional
            cidadeNascimento: "String",               // - opcional
            dataAposentadoria: "String",
            cnpj: "String",                           // - AVP apenas
            nomeInstituidora: "String",               // - AVP apenas
            codigoConvenio: "String",                 // - AVP apenas
            codigoFilial: "String",                   // - AVP apenas
            regimeTributario: "String",
            numeroProposta: "String",
            codigoEstruturaVendas: "String",
            valorReserva: 0000000,
            codproduto: "0001"
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