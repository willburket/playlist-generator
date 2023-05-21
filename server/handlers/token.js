const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const tokenSign = async () => {
  const private_key = fs.readFileSync(process.env.API_KEY).toString(); // read your private key from your file system
  const team_id = process.env.TEAM_ID; // your 10 character apple team id, found in https://developer.apple.com/account/#/membership/
  const key_id = process.env.KEY_ID; // your 10 character generated music key id. more info https://help.apple.com/developer-account/#/dev646934554
  const token = jwt.sign({}, private_key, {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: team_id,
    header: {
      alg: 'ES256',
      kid: key_id
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: token, 
      },
      null,
      2
    ),
  }

  return response;

} 



module.exports = {
  handler: tokenSign               //handler: token ??
}