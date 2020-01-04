const winston = require('winston');

function error(err ,req, res, next){
    // Log the exception
    winston.error(err.message, err);

    //error
    //warn
    //info
    //verbose
    //debug
    //silly

    res.status(500).send('Something failed.');
}

module.exports = error;