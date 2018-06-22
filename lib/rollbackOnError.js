
const chalk = require('chalk')
const Listr = require('listr')

async function rollbackOnError (projectPath) {
  const tasks = new Listr([{
    title: chalk.green('Rollback : Delete files on error'),
    task: () => fs.remove(projectPath)
  }])
  await tasks.run()
}

module.exports = rollbackOnError
