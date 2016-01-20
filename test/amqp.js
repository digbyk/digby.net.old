require('dotenv').load({ silent: true });

var winston = require('winston');
require('winston-loggly');

winston.level = 'silly';

winston.add(winston.transports.Loggly, {
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: ["testing"],
    json: true,
    level: process.env.LOGGLY_LEVEL
});

winston.log('info', "Hello World from Node.js again!");

var q = 'logs';

var amqp = require('amqplib').connect(process.env.AMQP_URL);

// Publisher
amqp.then(function (conn) {
    var ok = conn.createChannel();
    ok = ok.then(function (ch) {
        ch.assertQueue(q);
        ch.sendToQueue(q, new Buffer('something to do'));
    });
    return ok;
}).then(null, console.warn);

// Consumer
amqp.then(function (conn) {
    var ok = conn.createChannel();
    ok = ok.then(function (ch) {
        ch.assertQueue(q);
        ch.consume(q, function (msg) {
            if (msg !== null) {
                console.log(msg.content.toString());
                winston.log('silly', msg.content.toString());

                ch.ack(msg);
            }
        });
    });
    return ok;
}).then(null, console.warn);