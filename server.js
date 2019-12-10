const express = require("express")
const router = require('./hubs/router');



const server = express();

server.use(express.json());
server.use('/api/posts', router)

server.get("/", (req, res) => {
    res.send("<h1>NODE API 2 PROJECT!</h1><h3>By Jacob Calvino</h3>")
  })

module.exports = server;