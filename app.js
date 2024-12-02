const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { testConnection } = require("./config/Database.js");
const router = require("./routes/Routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.json());

require("dotenv").config();

app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});
