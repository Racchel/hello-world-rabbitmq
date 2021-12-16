var amqp = require("amqplib");

amqp.connect("amqp://localhost")                                        //connecting with rabbitmq
    .then(function(conn) {
        console.log("🚀 Connected!");

        return conn.createChannel();                                    // returning the create channel
    })

    .then(function(ch) {
        console.log("🚀 Channel created!");

        var queue = "test";                                             // queue name

        ch.assertQueue(queue, {                                         // checks for queue, if it doesn't exist then it will create one.
            durable: false                                              // temporary queue: metadata is stored in memory when possible
        });
                       
        ch.prefetch(1);

        ch.consume(queue, function(msg) {                               // consuming the messages
            
            setTimeout(function() {
                let msgJSON = JSON.parse(msg.content.toString());       // message to JSON

                console.log("New message receveid! %s", new Date(), msgJSON);

            }, 2000);
        }, {
            noAck: true                                                 // 
        });
    });