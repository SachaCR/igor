'use strict'

const koajv = require('koajv')

const db = require('../../db')
const errorHandler = require('./errorHandler')

const schema = {
  id: 'createResource',
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'integer'
    },
    title: {
      type: 'string',
    },
    type: {
      type: 'string',
      pattern: '^SEC|FRAIS|SEMI_PULL$'
    },
    category: {
      type: 'string',
      pattern: '^ENTREE|PLAT|DESSERT|PTI_DEJ|JUS|APERO|SNACK|BRUNCH|CHARCUTERIE|BOF|BOULANGERIE|BIERE|BOISSON|VIN|FOURNITURE|KIT|SIDE|BUNDLE|R&D$'
    },
  },
  required: [
    'id',
    'title',
    'type',
    'category',
  ]
}

async function createResourceHandler(ctx) {
  try {
    const resource = await db.createResource(ctx.request.body)
    ctx.status = 201
    ctx.body = resource
  } catch (err) {
    const error = errorHandler(err)
    ctx.throw(error.status, error)
  }
}

module.exports = {
  validator: koajv.bodyValidator(schema,{
    allErrors: true,
    useDefaults: true,
    schemaId: 'auto',
  }),
  handler: createResourceHandler,
}

/**
 * @api {post} /resource Create a new resource
 * @apiGroup Resource
 * @apiName addResource
 *
 * @apiParamExample {json} Request-Body-Example:
 * // All these fields are required
 * {
 *   id: 1000154,
 *   title: 'Burrata',
 *   type: 'FRAIS',
 *   category: 'ENTREE',
 * }
 *
 * @apiSuccessExample Success-Body-Response:
 * HTTP/1.1 201 Created
 * {
 *   id: 1000154,
 *   title: 'Burrata',
 *   type: 'FRAIS',
 *   category: 'ENTREE',
 * }
 *
 * @apiError {String} ID_ALDREADY_EXIST Resource id already exist
 * @apiError {String} INVALID_PAYLOAD Invalid payload
 *
 * @apiErrorExample ID_ALDREADY_EXIST:
 * HTTP/1.1 409 Conflict
 * {
 *    message: 'Resource id already exist',
 *    code: 'ID_ALDREADY_EXIST',
 *    details: 'Key (id)=(1000154) already exists.'
 *  }
 *
 * @apiErrorExample INVALID_PAYLOAD:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     message: 'Invalid Payload',
 *     code: 'INVALID_PAYLOAD',
 *     details: [{
 *       field: '.type',
 *       reason: 'should match pattern "^SEC|FRAIS|SEMI_PULL$"'
 *     }]
 *   }
 */
