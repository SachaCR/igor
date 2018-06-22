'use strict'

module.exports = async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')

  if (ctx.method === 'OPTIONS') {
    ctx.status = 200
  } else {
    await next()
  }
}
