const jwt = require('jsonwebtoken');
require('dotenv').config();


const base64P8FileContent = process.env.API_KEY;
const private_key = Buffer.from(base64P8FileContent, 'base64');
const team_id = process.env.TEAM_ID; // your 10 character apple team id, found in https://developer.apple.com/account/#/membership/
const key_id = process.env.KEY_ID; // your 10 character generated music key id. more info https://help.apple.com/developer-account/#/dev646934554
export const token = jwt.sign({}, private_key, {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: team_id,
    header: {
      alg: 'ES256',
      kid: key_id
    }
  });