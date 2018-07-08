# Hello Redis Example

An express application that demonstrates how redis can be utilized for caching data
so that recurrent requests can be fulfilled right away.

### Requirements
* Node >= 8.x
* Redis

### Setup and Running

* Clone this repo.
* Install all the node dependencies using `npm install`.
* Make sure you have local redis server instance running on `localhost:6379`. If not, you can easily start one
by running the following command if you have docker daemon running on your machine.
```
docker run --rm -it --name local-redis -p 6379:6379 redis
```
* Start the node service by running `node index.js`.