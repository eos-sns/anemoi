const memcache = require('./memcache');
const mongodb = require('./mongodb');

class Anemoi {
  constructor(port = Anemoi.defaultMemcachePort()) {
    const client = new memcache.MemcacheClientBuilder()
      .withPort(port)
      .build();
    this.memcache = new memcache.MemcacheFacade(client);
  }

  static defaultMemcachePort() {
    return 11211;
  }

  get(key) {
    return this.memcache.get(key);
  }
}

class MongoAnemoi extends Anemoi {
  constructor(
    mongoCollection,
    mongoDb = MongoAnemoi.defaultMongoDb(),
    port = Anemoi.defaultMemcachePort(),
  ) {
    super(port);
    const mongo = new mongodb.MongoDBBuilder()
      .withName(mongoDb)
      .withPort(port)
      .build();
    this.mongo = mongo.collection(mongoCollection);
  }

  static defaultMongoDb() {
    return 'astraeus';
  }

  async get(key) {
    const val = super.get(key);
    if (val) { // memcached worked perfectly -> no need to fetch it from Mongo
      return val;
    }

    this.mongo.find({ key: key }, (err, results) => {
      if (err) {
        return undefined;
      }

      if (results) {
        const found = results.toArray();
        let mostRecent;
        let mostRecentTime;

        found.forEach((x) => {
          if (x.time > mostRecentTime) {
            mostRecent = x;
            mostRecentTime = x.time;
          }
        });

        return mostRecent.val;
      }

      return undefined;
    });

    return undefined;
  }
}

module.exports = {
  Anemoi: Anemoi,
  MongoAnemoi: MongoAnemoi,
};
