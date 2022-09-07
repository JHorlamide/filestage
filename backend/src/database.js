const { MongoClient } = require('mongodb');

const database = module.exports;

database.devDatabase = async function connect() {
  database.client = new MongoClient('mongodb://root:1234@database:27017/');
  await database.client.connect();
};

database.testDatabase = async function testConnect() {
  database.client = new MongoClient('mongodb://localhost:27017/test_db');
  await database.client.connect();
};
