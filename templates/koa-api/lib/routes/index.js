'use strict'

const Router = require('koa-router')
const resourceRouter = require('./resource')
const router = new Router()
router.use('/resource', resourceRouter.routes(), resourceRouter.allowedMethods())
module.exports = router
