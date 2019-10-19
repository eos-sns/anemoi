const util = require('util');
const mongoose = require('mongoose');

const AstraeusLink = require('./astraeus.model');

mongoose.Promise = global.Promise;

class MongoDBBuilder {
  constructor() {
    this.name = '';
    this.port = 27017;
    this.server = 'localhost';
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withPort(port) {
    this.port = port;
    return this;
  }

  withServer(server) {
    this.server = server;
    return this;
  }

  buildUrl() {
    return 'mongodb://localhost/astraeus'  // todo
    // util.format('mongodb://%s:%s/', this.server, this.port);
  }

  build() {
    mongoose.connect(this.buildUrl(), {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    return mongoose.connection;
  }
}

module.exports = {
  MongoDBBuilder: MongoDBBuilder,
};
