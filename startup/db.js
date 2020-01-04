const winston = require('winston');
const mongooose = require('mongoose');

module.exports = function(){
    mongooose.connect('mongodb://localhost/midly', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => winston.info('Connected to MongoDB...'));
}