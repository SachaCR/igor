'use strict'

const config = require('config')
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const koaLogger = require('koa-http-log')
const serve = require('koa-static')

const healthcheck = require('./middlewares/healthcheck')
const version = require('./middlewares/version')
const errorHandler = require('./middlewares/error')
const cors = require('./middlewares/cors')

const mainRouter = require('./routes')

const app = new Koa()

// middlewares
app.use(healthcheck)
app.use(version)
app.use(errorHandler)
app.use(bodyparser())
app.use(cors)
app.use(koaLogger(config.logger))

// routes
app.use(serve('apidoc'))
app.use(mainRouter.routes(), mainRouter.allowedMethods())

module.exports = app
