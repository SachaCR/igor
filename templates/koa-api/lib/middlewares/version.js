'use strict'

module.exports = async(ctx, next) => {
  if (ctx.path === '/version') {
    ctx.status = 200
    ctx.body = require('../../package.json').version
  } else {
    await next()
  }
}
