const  { createClient } = require('redis');

const client = createClient({
    url: process.env.REDIS_HOST ||  'redis://redis:6379/0',
    password: process.env.REDIS_PASSWORD
});


client.on('error', err => console.log('Redis Client Error', err));
let promise;
module.exports ={
    async getRedisClient () {
        return promise;
    },
    initRedis () {
        promise = new Promise(async (resolve, reject) => {
            client.connect().then(() => {
                console.log("Redis hase been connected!");
                resolve(client)
            });
        
        })
        return promise
    }

}


