/**
 * Created by graemeross on 22/07/2016.
 */

'use strict'

const Joi = require('joi')

exports.CheckQueryParamRequired = Joi.string().required()

exports.CheckQueryParam = Joi.string().allow('')

exports.validatePostcode = postcode => postcode.toUpperCase().replace(/ /g, '').replace(/,+$/, '').trim()

exports.validateAddress = address => address.toUpperCase().replace(/,+$/, '').trim()
