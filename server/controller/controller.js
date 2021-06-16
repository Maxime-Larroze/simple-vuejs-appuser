"use strict";
const fs = require("fs");
const http = require("http");
require("dotenv").config();

exports.test = function(req, res) {
  const data = { information: "ceci est un test de l'API" };
  res.status(202).json(data);
};
