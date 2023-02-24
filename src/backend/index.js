const app = require('express')();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const key = fs.readFileSync('../../cert/CA/localhost.decrypted.key');
const cert = fs.readFileSync('../../cert/CA/localhost.crt')
const apple = require('./AppleMusicApi');
const token = require('./TokenConfig');
const https = require('https')
const server = https.createServer({key, cert}, app);

const PORT = 8080;


app.get("/jwt", (req,res) => {        
  // res.setHeader('Content-Type', 'application/json');  //not sure what this does
  // res.send(JSON.stringify({token: token.token}));
  res.send({token:token.token})
  // res.send(token)    // put developer token here 
})

app.get("/music", (req,res) => {

  // const artistId = '1147783278'
  // const artist = apple.fetchArtist(artistId)
  // console.log(artist)
  const storefront = 'us'
  const chart = apple.fetchCharts(storefront)
  res.send(chart)
})


server.listen(PORT, () => {
  console.log(`Server is listening on https://localhost:${PORT}`);
})

// app.listen(
//     PORT,
//     () => {console.log(`Server started on http://localhost:${PORT}`)}
// )

