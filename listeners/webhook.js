const l = require('@connibug/js-logging');

const express = require("express")
const bodyParser = require("body-parser")
  
const app = express()
let PORT = 1234
app.use(bodyParser.json())

function setupWebhookListener(path) {
  l.debug(`Registered webhook listener on POST/GET on /webhooks/${path}`)
  app.post("/webhooks/" + path, (req, res) => {
    console.log(req.path)
    console.log(req.body)
    res.status(200).end()
  });
  app.get("/webhooks/" + path, (req, res) => {
    console.log(req.body)
    console.log(req.path)
    res.status(200).end()
  });
}

function start() {    

}

function stop() {
  l.log(`Stopped webhook listener on port ${PORT}`);
}

function setup() {
  app.listen(PORT, () => {
    l.log(`Started webhook listener on port ${PORT}`)

    setupWebhookListener("cars")
  });
}

module.exports = { 
  start, stop, setup, 
  info: {
    name: "webhook"
  } 
}