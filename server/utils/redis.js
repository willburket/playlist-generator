const redis = require("redis");
require('dotenv').config();

export const createRedisClient = () => {
    const redisClient = redis.createClient({
        host: process.env.CLUSTER_ENDPOINT,
        port: process.env.REDIS_PORT,
      });
    return redisClient;
};

export const addToHash = async (songs) => {
    const redisClient = createRedisClient();
    try{
        for (const key in songs){
            if(songs.hasOwnProperty(key)){
                const value = songs[key];
                await redisClient.hSet("genre-hash", key, value);
            }
        }
    }
    catch(error){
        console.log(error.message);
    }
    
};

export const addToList = async (songs) => {
    const client = createRedisClient();

    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    await client.set('key', 'value');
    const value = await client.get('key');
    await client.disconnect();
    return value;

}

