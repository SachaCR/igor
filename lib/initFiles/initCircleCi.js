
const fs = require('fs-extra')

async function initApidoc(projectPath, projectName) {
  return fs.outputFile(`${projectPath}/.circleci/config.yml`,
  `version: 2
  jobs:
    build:
      working_directory: ~/${projectName}
      docker:
        - image: circleci/node:latest
          environment:
            - PORT=8080
            - NODE_ENV=test
            - POSTGRES_PROD_USER=local
            - POSTGRES_PROD_PASSWORD=local
            - POSTGRES_PROD_DB=test
            - POSTGRES_PROD_HOSTNAME=localhost

        - image: circleci/postgres:9.6
          environment:
            - POSTGRES_USER=local
            - POSTGRES_DB=test
            - POSTGRES_PROD_PASSWORD=local
      steps:
        - checkout
        # Download and cache dependencies
        - restore_cache:
            keys:
            - v1-dependencies-{{ checksum "package.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-
        - run: npm install

        - save_cache:
            paths:
              - node_modules
            key: v1-dependencies-{{ checksum "package.json" }}

        - run: npm test

        - store_artifacts:
            path: /tmp/artifacts`,
  {
    spaces: 2
  })

}

module.exports = initApidoc
