let MONGO = {
  HOST: process.env.MONGO_HOST || '127.0.0.1',
  PORT: process.env.MONGO_PORT || 27017,
  DB: process.env.MONGO_DB || 'onlinepeerlearning'
};

MONGO.URL = 'mongodb://' + MONGO.HOST + ':' + MONGO.PORT + '/' + MONGO.DB;

module.exports = {
  MONGO: MONGO
};