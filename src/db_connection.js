const knex = require("knex");

const db_connection = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3307,
    user: "ahmed",
    password: "123456",
    database: "shoping_cart",
  },
});

module.exports = db_connection;
