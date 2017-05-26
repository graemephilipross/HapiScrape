/**
 * Created by graemeross on 21/11/2016.
 */

'use strict'

const Joi = require('joi').extend(require('joi-postcode'))

exports.CheckQueryParamRequired = Joi.postcode()

exports.validatePostcode = postcode => postcode.toUpperCase().replace(/ /g, '').replace(/,+$/, '').trim()
