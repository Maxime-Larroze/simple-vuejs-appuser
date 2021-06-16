console.log("Server started");
const express = require("express");
require("dotenv").config();
const history = require("connect-history-api-fallback");
const path = __dirname + "/build/";
const routes = require("./server/route/index");
var cors = require("cors");

const web = express();
web.use(history());
web.use(express.static(path));
web.listen(
  process.env.SERVER_PORT,
  process.env.SERVER_ADDRESS,
  console.log(
    "Web server running on: http://" +
      process.env.SERVER_ADDRESS +
      ":" +
      process.env.SERVER_PORT
  )
);

const api = new express();
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cors());
api.listen(
  process.env.API_PORT,
  process.env.API_HOST,
  console.log(
    "API server running on: http://" +
      process.env.API_HOST +
      ":" +
      process.env.API_PORT
  )
);
routes(api);
