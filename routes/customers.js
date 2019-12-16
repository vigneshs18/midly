const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const router = express.Router();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: Number,
        required: true,
        // not working ???
        // validate: {
        //     validator: function(v) {
        //       return /\d{10}/.test(v);
        //     },
        //     message: 'Phone no is not a valid'
        //   }
    },
    isGold:{
        type: Boolean,
        required: true,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('the customer with given id not found');
    
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },
        {new: true}
    );
    if(!customer) return res.status(404).send('the customer with given id not found');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('the customer with given id not found');
    res.send(customer)
});

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.number().integer().positive().required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
}

module.exports = router;