require('dotenv').load({ silent: true });

var logger = require('../lib/logging.js');

logger.log('info', "Hello World from Node.js again!");
logger.error('Unknown user', {name: 'digby', 'email': 'REDACTED'});

var q = 'logs';

var amqp = require('amqplib').connect(process.env.CLOUDAMQP_URL);

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
                logger.log('info', msg.content.toString());
                ch.ack(msg);
            }
        });
    });
    return ok;
}).then(null, console.warn);