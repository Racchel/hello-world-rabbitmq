var amqp = require("amqplib");

amqp.connect("amqp://localhost")                            // connecting with rabbitmq
    .then(function(conn) {
        console.log("🚀 Conected!!")

        return conn.createChannel();                        // returning the channel created
    })
   
    .then(function(ch) {
        console.log("🚀 Channel created!");

        var queue = "test";                                 // queue name

        ch.assertQueue(queue, {                             // checks for queue, if it doesn't exist then it will create one.
            durable: false                                  // temporary queue: metadata is stored in memory when possible
        });

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

        var msgString = JSON.stringify(msgJSON);            // transforming messages to string

        setInterval(function() {                            // sending messages every 1 second...
            console.log("-> sending messages...");

            ch.sendToQueue(queue, Buffer.from(msgString));  // send message
        }, 1000);
    });

