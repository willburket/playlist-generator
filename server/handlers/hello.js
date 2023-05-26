'use strict';

export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'server configured successfully!',
        input: event,
      },
      null,
      2
    )
  };
};