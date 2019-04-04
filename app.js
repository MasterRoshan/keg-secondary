const express = require('express')
var request = require('request');

const app = express()
const port = 4001

app.use(express.json())

var temp = 75
var heater = true

function raise(){
  setTimeout(function(){
    temp = temp + Math.floor(Math.random() * 6)
    request({url:'http://localhost:4000', body:{"temp": temp, "created_at": new Date()}, json: true, method: 'post'}, cb)
    if(heater){
      raise()
    }
    else {
      lower()
    }
  }, 1000)
}

function lower(){
  setTimeout(function(){
    temp = temp - Math.floor(Math.random() * 6)
    request({url:'http://localhost:4000', body:{"temp": temp, "created_at": new Date()}, json: true, method: 'post'}, cb)
    if(heater){
      raise()
    }
    else {
      lower()
    }
  }, 1000)
}
raise()

function cb(err, resp, body){
  console.log(body.heater)
  heater = body.heater
}

app.post('/', function(req, res, body){
  console.log(body)
  heater = req.body.heater
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
