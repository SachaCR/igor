
const fs = require('fs-extra')

async function initApidoc(projectPath, projectName) {
  return fs.writeJson(`${projectPath}/apidoc.json`, {
    name: projectName,
    version: '1.0.0',
    description: `${projectName} API`,
    title: `${projectName} API`,
  }, {
    spaces: 2
  })

}

module.exports = initApidoc
