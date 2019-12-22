const config = require('config');
const express = require('express');
const mongooose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivatekey is not defined.');
    process.exit(1);
}

mongooose.connect('mongodb://localhost/midly', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('could not connect to MongoDB..',err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on post : ${port} ...`));
