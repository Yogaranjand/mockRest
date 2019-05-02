'use strict';
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'mock_db'
});

pool.on('enqueue', () => console.log('Waiting for available connection slot'));
pool.on('error', error => console.error(error));

module.exports = pool;