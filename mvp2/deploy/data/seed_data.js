var config = require('../../config');
console.log('SEEDING DATA:', config.mysql.connectionString);
var client = require('../../lib/application/providers/sqlClient');
var fs = require('fs');

var path = process.argv[2];
if(!path) throw new Error('Please pass a sql file to seed with.');
console.log('SEEDING WITH:', path);

var sql = fs.readFileSync(__dirname + '/' + path, { encoding: 'utf-8'});

client.db.query(sql).then(res => {
    console.log('SEEDING COMPLETE');
});