#!/usr/bin/env/ node

const fs = require('fs-extra')
const exec = require('child_process').exec
const inquirer = require('inquirer')
const chalk = require('chalk')

const askProjectType = require('./lib/questions/askProjectType')
const askProjectName = require('./lib/questions/askProjectName')
const askAdditonalDeps = require('./lib/questions/askAdditonalDeps')
const askDepsNames = require('./lib/questions/askDepsNames')

const installProject = require('./lib/installProject')
const initFiles = require('./lib/initFiles')
const rollbackOnError = require('./lib/rollbackOnError')

const CURR_DIR = process.cwd()

async function start() {

  const { projectType, projectName, hasAdditionalDeps } = await inquirer.prompt([
    askProjectType,
    askProjectName,
    askAdditonalDeps
  ])

  const templatePath = `${__dirname}/templates/${projectType}`

  try {

    let additionalDeps = []

    if (hasAdditionalDeps) {
      const { depsNames } = await inquirer.prompt([askDepsNames])
      additionalDeps = depsNames.split(',')
    }

    await fs.ensureDir(`${CURR_DIR}/${projectName}`)
    await fs.copy(templatePath, projectName)

    await installProject(projectName, additionalDeps)
    await initFiles(`${CURR_DIR}/${projectName}`, projectName)
  } catch (err) {
    console.log(chalk.red('An Error Occur :'), err)
    await rollbackOnError(`${CURR_DIR}/${projectName}`)
    process.exit(1)
  }
}

start()
