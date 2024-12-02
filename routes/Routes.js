const express = require("express");
const NotesRoute = require("./NotesRoute.js");

const router = express();
const api = "/v1/api";

router.use(api, NotesRoute);
module.exports = router;
