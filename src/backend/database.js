const knex = require("knex")({
  client: "pg",
  connection: {
    host: "abs_db",
    user: "postgres",
    password: "password",
    database: "abs_everywhere",
    port: 5432,
    searchPath: ["public",],
  },
});

exports.knex = knex;
