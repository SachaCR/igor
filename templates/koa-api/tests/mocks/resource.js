'use strict'

function mockResource(overrideValues) {
  const defaultValues = {
    id: 1000154,
    title: 'Burrata',
    type: 'FRAIS',
    category: 'ENTREE',
  }
  return Object.assign({}, defaultValues, overrideValues)
}

module.exports = mockResource
