const MongoClient = require('mongodb').MongoClient;

class MongoDBBuilder {
  constructor() {
    this.client = MongoClient;
    this.name = '';
    this.port = 27017;
    this.server = 'localhost';
    this.url = this.buildMongoUrl()
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withPort(name) {
    this.name = name;
    return this;
  }

  withServer(name) {
    this.name = name;
    return this;
  }

  buildMongoUrl() {
    return util.format('mongodb://%s:%s/', this.server, this.port)
  }

  build() {
    this.client.connect(this.buildMongoUrl(), function (err, db) {
      if (err) {
        throw err;
      }

      return db;
    });
  }
}
