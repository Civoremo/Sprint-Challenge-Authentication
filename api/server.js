const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const configureRoutes = require("../config/routes.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// {
//   credentials: true,
//   origin: "http://localhost:3300",
// }

configureRoutes(server);

module.exports = {
    server,
};
