//require('winston-mongodb')
require('express-async-errors');
const winston = require('winston');

module.exports = function(){
    // process.on('uncaughtException', (ex) => {
    //     //console.log('WE GOT AN UNCAUGHT EXCEPTION');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });
    // process.on('unhandledRejection', (ex) => {
    //     //console.log('WE GOT AN UNHANDLED REJECTION');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });
    
    //      OR
    
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    );
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    
    winston.add(winston.transports.File, {filename: 'logfile.log'});
    // winston.add(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/midly',
    //     level: 'info'
    // });
    
    //const p = Promise.reject(new Error('Something failed miserably'));
    //p.then(() => console.log('Done'));
    
    //throw new Error('Something failed during startup.');
}
