// This file is used for migrations only.

module.exports = {
  db: {
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USERNAME,
    database: process.env.POSTGRES_DATABASE,
    host:     process.env.IS_LOCAL_REFRESH_ENV==="true" ? "localhost" : process.env.POSTGRES_HOST,
    dialect:  process.env.POSTGRES_DIALECT,
    port:     process.env.POSTGRES_PORT,
  }
}
