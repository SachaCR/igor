'use strict'

const assert = require('assert')
const request = require('superagent')

describe('GET /healthcheck', function () {
  it('should get a 200 OK response', async function () {
    const result = await request.get('http://localhost:8080/healthcheck').catch((err) => err.response)
    assert.deepEqual(result.body, {})
    assert.equal(result.statusCode, 200)
  })
})

describe('GET /version', function () {
  it('should get a 200 OK response', async function () {
    const result = await request.get('http://localhost:8080/version').catch((err) => err.response)
    assert.equal(result.text, require('../../package.json').version)
    assert.equal(result.statusCode, 200)
  })
})

describe('OPTIONS /', function () {
  it('should get a 200 OK response', async function () {
    const result = await request.options('http://localhost:8080/').catch((err) => err.response)
    assert.deepEqual(result.body, {})
    assert.equal(result.statusCode, 200)
  })
})
