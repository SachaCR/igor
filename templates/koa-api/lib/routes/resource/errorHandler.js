'use strict'

function errorHandler(err) {
  if (err.code === '23505') {

    const error = {
      code: 'ID_ALDREADY_EXIST',
      details: err.detail,
      status: 409,
      message: 'Resource id already exist',
    }

    return error
  }

  return err
}

module.exports = errorHandler
