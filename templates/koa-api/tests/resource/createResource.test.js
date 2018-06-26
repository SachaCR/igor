'use strict'

const assert = require('assert')
const request = require('superagent')

const mockResource = require('../mocks/resource')

describe('POST /resource', function () {
  it('should create a resource and return the created resource', async function () {
    const result = await request
      .post('http://localhost:8080/resource')
      .send(mockResource())
      .catch(err => err.response)

    assert.deepEqual(result.body, {
      id: '1000154',
      category: 'ENTREE',
      type: 'FRAIS',
      title: 'Burrata',
    })
    assert.equal(result.statusCode, 201)
  })

  it('should return a 409 error if id already exist', async function () {
    await request
      .post('http://localhost:8080/resource')
      .send(mockResource())

    const response = await request
      .post('http://localhost:8080/resource')
      .send(mockResource())
      .catch(err => err.response)

    assert.deepEqual(response.body, {
      message: 'Resource id already exist',
      code: 'ID_ALDREADY_EXIST',
      details: 'Key (id)=(1000154) already exists.'
    })
    assert.equal(response.statusCode, 409)
  })

  it('should return 400 Bad request because type is not valid', async function () {
    const result = await request
      .post('http://localhost:8080/resource')
      .send(mockResource({type: 'INVALID'}))
      .catch(err => err.response)

    assert.equal(result.body.code, 'INVALID_TYPE_PATTERN')
    assert.equal(result.body.message, 'type should match pattern "^SEC|FRAIS|SEMI_PULL$"')
    assert.equal(result.statusCode, 400)
  })
})
