'use strict'

const http = require('http')
const path = require('path')
const fs = require('fs')
const config = require('config')

const db = require('../lib/db')
const app = require('../lib/app')

function loadSQLScripts (filename) {
  return fs.readFileSync(path.resolve(__dirname, filename), 'utf8').toString()
}

const sqlScript = loadSQLScripts('../config/bootstrapDB.sql')

let server
before((done) => {
  server = http.createServer(app.callback()).listen(config.app.port, done)
})

beforeEach(async () => {
  await db.query(sqlScript)
})

after(() => {
  server.close()
  db.close()
})
