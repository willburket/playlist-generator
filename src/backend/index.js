const app = require('express')();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const key = fs.readFileSync('../../cert/CA/localhost.decrypted.key');
const cert = fs.readFileSync('../../cert/CA/localhost.crt')
const apple = require('./AppleMusicApi');
const token = require('./TokenConfig');
const https = require('https')
const server = https.createServer({key, cert}, app);
const bodyParser = require('body-parser');

const PORT = 8080;


app.get("/jwt", (req,res) => {        
  // res.setHeader('Content-Type', 'application/json');  //not sure what this does
  // res.send(JSON.stringify({token: token.token}));
  res.send({token:token.token})
  // res.send(token)    // put developer token here 
})

app.use(bodyParser.text());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
})

app.post("/music", async (req,res) => {
  
  const storefront = 'us'   //change later?
  const genre = req.body

    const songs = await apple.fetchCharts(storefront, genre)

    res.setHeader('Content-Type', 'application/json');
    console.log(songs)
    res.send(songs)
    // res.send(JSON.stringify(songs))
    
  


  // const responseData = {data: chart}
  
  // res.send(JSON.stringify(responseData));
  // res.send(responseData)
  // res.send(JSON.stringify(chart))
  
})


server.listen(PORT, () => {
  console.log(`Server is listening on https://localhost:${PORT}`);
})

// app.listen(
//     PORT,
//     () => {console.log(`Server started on http://localhost:${PORT}`)}
// )

