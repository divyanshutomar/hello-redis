const express = require('express');
const { promisify } = require('util');
const datastore = require('./userdata.json');
const {
  setRedisCacheValue,
  getRedisCachedValue,
  generateUserInfoKey,
} = require('./redisclient');
const port = 3000;

const app = express();

const delay = promisify(setTimeout);

// Fetches user info from data layer
const getUserInfoFromDatastore = async userId => {
  // Adding a 1000ms delay to simulate network latency from datasource
  await delay(1000);
  const userInfo = datastore[userId];
  return userInfo;
};

// Health Check
app.get('/', (req, res) => res.send('API is healthy!'));

// User Info Route Handler
app.get('/users/:userid', async (req, res) => {
  const {
    params: { userid },
  } = req;
  const redisKey = generateUserInfoKey(['userInfo', userid]);
  const cachedValue = await getRedisCachedValue(redisKey);
  if (cachedValue) {
    return res.json(JSON.parse(cachedValue));
  }
  const userInfo = await getUserInfoFromDatastore(userid);
  // caching the stringified JSON value for 30 seconds
  await setRedisCacheValue(redisKey, 30, JSON.stringify(userInfo));
  return res.json(userInfo);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
