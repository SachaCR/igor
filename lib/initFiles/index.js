const Listr = require('listr')
const execa = require('execa')

const initApiDoc = require('./initApidoc')
const initCircleCi = require('./initCircleCi')

module.exports = async function initFiles(projectPath, projectName) {
  const tasks = new Listr([{
    title: 'Create apidoc config',
    task: () => initApiDoc(projectPath, projectName)
  }, {
    title: 'Create Circle CI config',
    task: () => initCircleCi(projectPath, projectName)
  }, {
    title: 'Generate apidoc',
    task: () => execa('npm', ['run', 'doc'], {cwd: projectPath})
  }, {
    title: 'Generate covrage',
    task: () => execa('npm', ['test'], {cwd: projectPath})
  }, {
    title: 'Open coverage',
    task: () => execa('open', ['./coverage/index.html'], {cwd: projectPath})
  }, {
    title: 'Open apidoc',
    task: () => execa('open', ['./apidoc/index.html'], {cwd: projectPath})
  }], {
    concurrent: true
  })

  await tasks.run()
}
