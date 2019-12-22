const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

const { User } = require('../models/user');

const router = express.Router();

// 404- fnf, 400- br

router.post('/', async (req, res) => {
    const { error } = validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne( {email: req.body.email} );
    if(!user) return res.status(400).send('Invalid email and password.');

    const validPassword = await bcryptjs.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email and password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validateAuth(request){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(request, schema);
}

module.exports = router;
