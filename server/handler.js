'use strict';

const hello = () => {
  response = {
    "statusCode": 200,
    "body": 'Hello World!'
  }

  return response;
}

module.exports = {
  hello
}