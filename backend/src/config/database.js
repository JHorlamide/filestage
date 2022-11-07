const mongoose = require("mongoose");

const database = module.exports;

database.devDatabase = async function () {
  try {
    await mongoose.connect("mongodb://root:1234@database:27017/");
    console.log("Todo database connected successfully!");
  } catch (error) {
    console.log("Mongoose error: ", error);
  }
};

database.testDatabase = async function testConnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test_db");
    console.log("Todo test database connected!");
  } catch (error) {
    console.log("Mongoose error: ", error);
  }
};

// database.devDatabase = async function connect() {
//   database.client = new MongoClient("mongodb://root:1234@database:27017/");
//   await database.client.connect();
// };

// database.testDatabase = async function connect() {
//   database.client = new MongoClient("mongodb://localhost:27017/test_db");
//  await database.client.connect();
// };