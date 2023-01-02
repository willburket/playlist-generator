const app = require('express')();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const apple = require('./AppleMusicApi');
const token = require('./TokenConfig')


const PORT = 8080;


app.get("/jwt", (req,res) => {
  // res.setHeader('Content-Type', 'application/json');  //not sure what this doesd
  // res.send(JSON.stringify({token: token.token}));
  res.send({token:token.token})
  // res.send(token)    // put developer token here 
})

app.get("/artist", (req,res) => {

  const artistId = '1147783278'
  const artist = apple.fetchArtist(artistId)
  console.log(artist)
  res.send(artist)
})


app.listen(
    PORT,
    () => {console.log(`Server started on http://localhost:${PORT}`)}
)

