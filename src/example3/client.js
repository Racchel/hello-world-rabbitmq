var amqp = require("amqplib");

//connecting with rabbitmq
amqp.connect("amqp://localhost")
    .then(function(conn) {
        console.log("🚀 Conected!!")

        //returning the channel created
        return conn.createChannel();
    })
   
    .then(function(ch) {
        console.log("🚀 Channel created!")

        ch.sendToQueue("demo", Buffer.from("Oii"))
    });

