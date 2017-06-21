/**
 * Created by graemeross on 22/07/2016.
 */

'use strict'

const Joi = require('joi')

exports.queryParamReq = Joi.string().required()

exports.queryParam = Joi.string().allow('')
