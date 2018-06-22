
const fs = require('fs-extra')

module.exports = {
  name: 'hasAdditionalDeps',
  type: 'confirm',
  message: 'Would you like to install additional dependencies ?',
  default: false,
}
