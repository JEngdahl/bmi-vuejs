const express = require('express')
const app = express()
let request = require('request');
let rp = require('request-promise');
let port = process.env.PORT || 1337

app.use(express.static('./client'));

app.get('/bmi', function (req, res) {
  res.sendFile(__dirname+'/client/index.html')
  console.log('served')
})
app.post('/sendbmi', function(req, res){
    console.log('got the req',req.query)
    req.query.weight = JSON.parse(req.query.weight)
    req.query.height =JSON.parse(req.query.height)
var options = { method: 'POST',
  url: 'https://bmi.p.mashape.com/',
  headers:
   { 'cache-control': 'no-cache',
     'accept': 'application/json',
     'content-type': 'application/json',
     'x-mashape-key': 'K7qj3dL2vZmsh9wf1xpsLGK5by0vp1wJwsrjsnkwHWp0Vca5eK' },
  body:req.query,
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  res.send(body)
});



})

app.listen(port,function(){
  console.log(`Listening on port ${port}`)
})
