const memcache = require('./memcache');

class Anemoi {
  constructor(port = Anemoi.defaultMemcachePort()) {
    const client = memcache.MemcacheClientBuilder().withPort(port).build();
    this.memcache = memcache.MemcacheFacade(client);
  }

  static defaultMemcachePort() {
    return 11211;
  }

  get(key) {
    try {
      return this.memcache.get(key);
    }
    catch (e) {
      return undefined;
    }
  }
}

module.exports = {
  Anemoi: Anemoi,
};
