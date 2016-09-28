var config = require('../../config');

console.log('CREATING SCHEMA:', config.mysql.connectionString);

var client = require('../../lib/application/providers/sqlClient');

client.sync().then(() => {
    console.log('SCHEMA CREATED.');
});