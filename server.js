const express = require("express");
const projectsRouter = require("./projectsRouter");
const cors = require("cors");
const server = express();

// middleware
server.use(logger);

// place middleware
server.use(express.json());
server.use(cors());

// endpoints
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl}`);

  next();
}

module.exports = server;
