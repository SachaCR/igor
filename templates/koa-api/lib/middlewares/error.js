'use strict'

const config = require('config')

module.exports = async(ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = {
      message: err.message,
      code: err.code || 'UNKNOWN_ERROR',
      details: err.details || undefined
    }

    if (process.env.NODE_ENV !== 'test' && (!err.status || err.status >= 500)) {
      console.log(err)
    }

    if (config.display_error_stack === true) {
      ctx.body.stack = err.stack
    }

    ctx.status = err.status || 500
  }
}
