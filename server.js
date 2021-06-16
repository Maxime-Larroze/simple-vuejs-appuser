console.log('Server started');
const cors = require("cors");
const express = require("express");
require('dotenv').config();
const path = __dirname + '/build/';
const history = require('connect-history-api-fallback');

const corsOptions = {
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(history());
app.use(express.static(path));
app.listen(process.env.SERVER_PORT, process.env.SERVER_ADDRESS,[console.log('API server started on: http://' + process.env.SERVER_ADDRESS+":"+process.env.SERVER_PORT), console.log("Informations API on: http://"+process.env.SERVER_ADDRESS+":"+process.env.SERVER_PORT+"/ (get)")]);
