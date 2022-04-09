const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: process.env.host, 
     user: process.env.user, 
     password: process.env.password,
     connectionLimit: process.env.connectionLimit,
     database : process.env.database
});

module.exports = pool;