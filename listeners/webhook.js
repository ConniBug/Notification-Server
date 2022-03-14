const l = require('@connibug/js-logging');

const express = require("express")
const bodyParser = require("body-parser")
  
const app = express()
let PORT
app.use(bodyParser.json())

function setupWebhookListener(webhookConfig) {
  let hookPath = webhookConfig.path
  l.debug(`Registered webhook listener on /webhooks/${hookPath}`)
  app.post("/webhooks/" + hookPath, (req, res) => {
    console.log(req.body)
    res.status(200).end()
  });
}

function start() {    
  app.listen(PORT, () => 
    l.log(`Started webhook listener on port ${PORT}`));
}

function stop() {
  l.log(`Stopped webhook listener on port ${PORT}`);
}

function setup(config) {
  PORT = config.port
  console.log("Setting up", config)
}

module.exports = { start, stop, setup }