'use strict'

const Router = require('koa-router')
const createResource = require('./createResource')
const router = new Router()
router.post('/', createResource.validator, createResource.handler)
module.exports = router
