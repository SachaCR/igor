module.exports = {
  name: 'projectName',
  type: 'input',
  message: 'Project name:',
  validate: function (input) {
    if (/^([a-z\-\_\d])+$/.test(input)) return true;
    else return 'Project name may only include lower cased letters, numbers, underscores and hashes.'
  }
}
