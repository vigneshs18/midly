const mongoose = require('mongoose');
const Joi = require('joi');

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


function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.number().integer().positive().required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;