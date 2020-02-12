const winston = require('winston');
const mongooose = require('mongoose');
const config = require('config');

module.exports = function(){
    const db = config.get('db');
    mongooose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => winston.info(`Connected to ${db}...`));
}