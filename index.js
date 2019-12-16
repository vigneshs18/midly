const express = require('express');
const mongooose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/customers');

const app = express();

mongooose.connect('mongodb://localhost/midly', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('could not connect to MongoDB..',err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on post : ${port} ...`));
