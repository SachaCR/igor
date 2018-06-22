'use strict'

const config = require('config')
const app = require('./lib/app')

app.listen(config.app.port || 80)
