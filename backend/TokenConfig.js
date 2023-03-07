const fs = require('fs');
const jwt = require('jsonwebtoken');


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

module.exports = {
  token
}