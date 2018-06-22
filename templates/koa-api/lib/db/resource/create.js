const db = require('../pool')

async function createResource(resourceData) {
  const {
    id,
    title,
    type,
    category,
  } = resourceData

  return db.query(`
    INSERT INTO resource (
      id, title, type, category
    )
    VALUES($1, $2, $3, $4)
    RETURNING id, title, type, category
  `, [id, title, type, category])
  .then((res) => res.rows[0])
}

module.exports = createResource
