
const db = require('./pool')

module.exports.query = db.query
module.exports.close = db.close
module.exports.connect = db.connect

module.exports.createResource = require('./resource/create')

