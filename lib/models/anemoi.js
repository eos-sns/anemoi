const memcache = require('./memcache');
const mongodb = require('./mongodb');
const AstraeusLink = require('./astraeus.model');

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
    mongoDb,
    port = Anemoi.defaultMemcachePort(),
  ) {
    super(port);

    new mongodb.MongoDBBuilder()
      .withName(mongoDb)
      .build();
  }

  async get(key) {
    const val = super.get(key);
    if (val) { // memcached worked perfectly -> no need to fetch it from Mongo
      return val;
    }

    return AstraeusLink.findOne({ key: key }).then((doc, err) => {
       if (err) {
         return undefined;
       }

       return doc.val;
    });
  }
}

module.exports = {
  Anemoi: Anemoi,
  MongoAnemoi: MongoAnemoi,
};
