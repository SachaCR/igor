'use strict'

const config = require('config')

module.exports = async(ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = {
      message: err.message,
      code: err.code || 'UNKNOWN_ERROR',
      details: err.details || 'No details'
    }

    if (config.display_error_stack === true) {
      console.log(err)
      ctx.body.stack = err.stack
    }

    ctx.status = err.status || 500
  }
}
