
const fs = require('fs-extra')

module.exports = {
  name: 'projectType',
  type: 'list',
  message: 'What project template would you like to generate?',
  choices: fs.readdirSync(`${__dirname}/../../templates`)
}
