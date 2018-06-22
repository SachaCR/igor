const Listr = require('listr')
const execa = require('execa')

module.exports = async function installProject(projectName, deps) {
  console.log('>>>>>>>>>> deps', deps)
  const options = { cwd: `${process.cwd()}/${projectName}` }

  const tasks = new Listr([{
    title: 'Npm init',
    task: () => execa('npm', ['init', '-y'], options)
  }, {
    title: 'Install dependencies',
    task: () => execa('npm', ['install'], options)
  }], {
    concurrent: false
  })

  const optionalTasks = new Listr([{
    title: 'Install user dependencies',
    task: () => {
      return execa('npm', ['install'].concat(deps), options)
    }
  }], {
    concurrent: false
  })

  await tasks.run()

  if (deps.length > 0) {
    await optionalTasks.run()
  }
}
