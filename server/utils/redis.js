const redis = require("redis");
require('dotenv').config();

export const createRedisClient = () => {
    const redisClient = redis.createClient({
        host: process.env.CLUSTER_ENDPOINT,
        port: process.env.REDIS_PORT,
      });
    return redisClient;
};

export const addtoRedisCluster = async (songs) => {
    for (const key in songs){
        if(songs.hasOwnProperty(key)){
            const value = songs[key];
            await redisClient.hSet("genre-hash", key, value);
        }
    }
};

