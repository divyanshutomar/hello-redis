const redis = require('redis');
const { promisify } = require('util');

// By default , it will try to connect localhost:6379
const redisClient = redis.createClient();

const getRedisCachedValue = promisify(redisClient.get).bind(redisClient);
const setRedisCacheValue = promisify(redisClient.setex).bind(redisClient);

const generateUserInfoKey = params => ['USER_INFO_APP', ...params].join(':');

module.exports = {
  setRedisCacheValue,
  getRedisCachedValue,
  generateUserInfoKey,
};
