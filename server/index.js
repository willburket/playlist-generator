// const app = require('express')();
// const fs = require('fs');


// const jwt = require('jsonwebtoken');
// const key = fs.readFileSync('../cert/CA/localhost.decrypted.key');
// const cert = fs.readFileSync('../cert/CA/localhost.crt');
// const apple = require('./handlers/appleMusic');
// const token = require('./handlers/token');
// const https = require('https');
// const server = https.createServer({key, cert}, app);
// const bodyParser = require('body-parser');
// require('dotenv').config()

// app.get("/jwt", (req,res) => {        
//   res.send({token:token.token});
// })

// app.use(bodyParser.text());

// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   next();
// });

// app.post("/music", async (req,res) => {
  
//   const storefront = 'us';   //change later?
//   const genre = req.body;

//     const songs = await apple.fetchCharts(storefront, genre);

//     res.setHeader('Content-Type', 'application/json');
//     res.send(songs);
  
// })


// server.listen(process.env.PORT, () => {
//   console.log(`Server is listening on https://localhost:${process.env.PORT}`);
// });


