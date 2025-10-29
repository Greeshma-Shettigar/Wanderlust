const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().uri().allow('', null),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required()

    }).required(),
});
// This is joi schema to validate the schema for server side.this schema is used to validate the data before saving it to the database. If the data is invalid, an error will be thrown.