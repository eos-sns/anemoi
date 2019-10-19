const util = require('util');
const Memcached = require('memcached');

class MemcacheFacade {
  constructor(client, expireSeconds = MemcacheFacade.defaultExpireSeconds()) {
    this.client = client;
    this.expireSeconds = expireSeconds;

    this.getter = util.promisify(this.client.get).bind(this.client);
    this.setter = util.promisify(this.client.set).bind(this.client);
  }

  static defaultExpireSeconds() {
    return ((60 * 60) * 24) * 14; // 14 days
  }

  get(key) {
    return this.getter(key);
  }

  set(key, val) {
    return this.setter(key, val, this.expireSeconds);
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
