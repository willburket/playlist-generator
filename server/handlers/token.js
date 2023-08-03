const jwt = require('jsonwebtoken');
require('dotenv').config();

export const tokenSign = async () => {

  const base64P8FileContent = process.env.API_KEY;
  const private_key = Buffer.from(base64P8FileContent, 'base64');
  const team_id = process.env.TEAM_ID; // your 10 character apple team id, found in https://developer.apple.com/account/#/membership/
  const key_id = process.env.KEY_ID; // your 10 character generated music key id. more info https://help.apple.com/developer-account/#/dev646934554
  try{
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
      headers:{
        // 'Access-Control-Allow-Origin': 'https://playlinq.io',
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          message: token,
        },
        null,
        2
      ),
    };
    return response;

  } catch(error){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};