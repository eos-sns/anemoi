const memcached = require('memcached');

class MemcacheFacade {
  constructor(client, expireSeconds) {
    this.client = client;
    this.expireSeconds = expireSeconds;
  }

  get(key) {
    this.client.get(key, (err, data) => {
      if (err) {
        throw err;
      }

      return data;
    });
  }

  set(key, val) {
    this.client.set(key, val, this.expireSeconds, (err) => {
      if (err) {
        throw err;
      }

      return true;
    });
  }
}

module.exports = {
  MemcacheFacade: MemcacheFacade,
};
