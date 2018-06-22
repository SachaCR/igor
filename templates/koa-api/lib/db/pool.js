'use strict'

const pg = require('pg')
const config = require('config')

const pool = new pg.Pool({
  user: config.postgres.user,
  database: config.postgres.database,
  password: config.postgres.password,
  host: config.postgres.options.host,
  port: config.postgres.options.port,
  max: 10,
  idleTimeoutMillis: 30000,
  application_name: require('../../package').name,
})

pool.on('error', function (err) {
  console.log(err)
})

function query(query, params) {
  return new Promise((resolve, reject) => {
    pool.connect(function(err, client, done) {
      if (err) {
        return reject(err)
      }
      client.query(query, params, function(err, result) {
        done()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  })
}

async function connect() {
  return new Promise((resolve, reject) => pool.connect((err, client, done) => {
    if (err) {
      return reject(err)
    }

    resolve({
      query: async function query(str, params) {
        return new Promise((resolve, reject) => client.query(str, params, (err, res) => err? reject(err): resolve(res)))
      },
      done: done
    })
  }))
}

module.exports.query = query
module.exports.connect = connect
module.exports.close = () => pool.end()
