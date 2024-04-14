const sql = require('mysql2');

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'taskmanagerdb',
    password: 'Exe18tyrr'
});

module.exports = pool.promise();