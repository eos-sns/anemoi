const util = require('util');
const Memcached = require('memcached');

class MemcacheFacade {
  constructor(client, expireSeconds = MemcacheFacade.defaultExpireSeconds()) {
    this.client = client;
    this.expireSeconds = expireSeconds;
  }

  static defaultExpireSeconds() {
    return ((60 * 60) * 24) * 14; // 14 days
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

class MemcacheClientBuilder {
  constructor() {
    this.port = 11211;
    this.server = 'localhost';
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
    return util.format('%s:%s', this.server, this.port);
  }

  build() {
    return new Memcached(this.buildUrl(), { remove: true });
  }
}

module.exports = {
  MemcacheFacade: MemcacheFacade,
  MemcacheClientBuilder: MemcacheClientBuilder,
};
