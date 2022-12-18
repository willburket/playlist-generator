const app = require('express')();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const PORT = 8080;

const private_key = fs.readFileSync('AuthKey_PA6274NFYR.p8').toString(); // read your private key from your file system
const team_id = 'S3PHBMG8Q4'; // your 10 character apple team id, found in https://developer.apple.com/account/#/membership/
const key_id = 'PA6274NFYR'; // your 10 character generated music key id. more info https://help.apple.com/developer-account/#/dev646934554
const token = jwt.sign({}, private_key, {
  algorithm: 'ES256',
  expiresIn: '180d',
  issuer: team_id,
  header: {
    alg: 'ES256',
    kid: key_id
  }
});

// export token as cookie 






// frontend:
// document.addEventListener('musickitloaded', async function () {
//     // Call configure() to configure an instance of MusicKit on the Web.
//     try {
//       await MusicKit.configure({
//         developerToken: token,
//         app: {
//           name: 'PlaylistGenerator',
//           build: '1',
//         },
//       });
//     } catch (err) {
//       // Handle configuration error
//     }
  
//     // MusicKit instance is available
//     const music = MusicKit.getInstance();
//   });

app.get("/api", (req,res) => {
  res.json(token)    // put developer token here 
})

app.listen(
    PORT,
    () => {console.log(`Server started on http://localhost:${PORT}`)}
)

