require("dotenv").config();
const mysql2 = require("mysql2/promise");

const Database = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

async function testConnection() {
  try {
    const connection = await Database.getConnection();
    console.log("Connection Database Success :)");
    connection.release();
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
}

async function query(command, values) {
  try {
    const [rows] = await Database.query(command, values ?? []);
    return rows;
  } catch (error) {
    console.error("Query Error: ", error);
    throw error;
  }
}

module.exports = { Database, testConnection, query };
