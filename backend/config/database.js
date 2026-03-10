// database.js

const { Client } = require('pg');

const client = new Client({
    user: 'yourUsername',  // replace with your database username
    host: 'localhost',     // replace with your host
    database: 'yourDatabase', // replace with your database name
    password: 'yourPassword', // replace with your password
    port: 5432,            // default port for PostgreSQL
});

client.connect()
    .then(() => console.log('Connected to the database!'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;