const util = require('util');
const Mongo = require('mongodb');

class MongoDBBuilder {
  constructor() {
    this.client = Mongo.MongoClient;
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
    return util.format('mongodb://%s:%s/', this.server, this.port);
  }

  build() {
    this.client.connect(this.buildUrl(), (err, db) => {
      if (err) {
        throw err;
      }

      return db;
    });
  }
}

module.exports = {
  MongoDBBuilder: MongoDBBuilder,
};
