const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: "host.docker.internal",
  database: 'school',
  password: 'Frootloop5',
  port: 5432,
});

module.exports = pool;
